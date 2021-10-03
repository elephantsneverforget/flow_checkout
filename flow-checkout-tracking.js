<script>
// Defaults to using the base currency of the store
// If you'd like reporting in foreign currency flip this
// variable to false
var USE_BASE_CURRENCY = true;

// Wait for script to load before attaching listeners. 2 parts. Flow does not fire load event for .checkout
var interval = setInterval(function () {
    if (typeof window.flow.checkout !== 'undefined') {
        clearInterval(interval)
        setListeners();
    }
}, 250)

function setListeners() {
    // Fires on contact info page load (checkout step 1)
    flow.checkout.onPageView(flow.checkout.enums.pageView.CONTACT_INFO, function handlePageView(data) {
        pushDLBeginCheckout(data);
    });

    function pushDLBeginCheckout(data) {
        var productList = getProductsInCart(data);
        window.dataLayer.push({
            'event': 'dl_begin_checkout',
            'event_id': generateEventID(),
            'ecommerce': {
                'checkout': {
                    'actionField': { step: 1, action: 'checkout' },
                    'products': productList
                },
                'currencyCode': getCurrency(data),
            },
        });
    }

    // Fires on shipping method page load (checkout step 2)
    flow.checkout.onPageView(flow.checkout.enums.pageView.SHIPPING_METHOD, function handlePageView(data) {
        pushDLAddShippingInfo(data);
    });

    function pushDLAddShippingInfo(data) {
        var productList = getProductsInCart(data);
        window.dataLayer.push({
            'event': 'dl_add_shipping_info',
            'event_id': generateEventID(),
            'ecommerce': {
                'checkout': {
                    'actionField': { step: 2, action: 'checkout' },
                    'products': productList
                },
                'currencyCode': getCurrency(data),
            },
        });
    }

    // Fires on payment info page load (checkout step 3)
    flow.checkout.onPageView(flow.checkout.enums.pageView.PAYMENT_INFO, function handlePageView(data) {
        pushDLAddPaymentInfo(data);
    });

    function pushDLAddPaymentInfo(data) {
        var productList = getProductsInCart(data);
        window.dataLayer.push({
            'event': 'dl_add_payment_info',
            'event_id': generateEventID(),
            'ecommerce': {
                'checkout': {
                    'actionField': { step: 3, action: 'checkout' },
                    'products': productList
                },
                'currencyCode': getCurrency(data),
            },
        });
    }

    // Fires once on transaction complete (checkout step 4)
    flow.checkout.onTransaction(function (data) {
        pushDLPurchase(data);
    });

    function pushDLPurchase(data) {
        var productList = getProductsInCart(data);
        window.dataLayer.push({
            'event': 'dl_purchase',
            'event_id': generateEventID(),
            'user_properties': getUserProperties(data),
            'ecommerce': {
                'purchase': {
                    'actionField': {
                        'action': "purchase",
                        'affiliation': data.organization,
                        'id': data.order['number'],
                        // This is the order number that shows up in Shopify on the orders list page,
                        'order_name': data.order['number'],
                        'discount_amount': -getValue('discount', data),
                        'revenue': USE_BASE_CURRENCY ? data.order.total.base.amount : data.order.total.amount,
                        'shipping': getValue('shipping', data),
                        'sub_total': getSubtotal(data),
                        'tax': getValue('vat', data) + getValue('duty', data),
                    },
                    'products': productList
                },
                'currencyCode': getCurrency(data),
            },
        });
    }

    function getProductsInCart(data) {
        var items = [];

        data.order.items.forEach((orderItem) => {
            var contentItem = data.content.getItem(orderItem.number);

            if (contentItem) {
                // This is section is functional and semi tested in the browser
                items.push({
                    'brand': contentItem.attributes['vendor'],
                    // This is messy. Last item in array seems to be the top level category. 
                    'category': contentItem.categories[contentItem.categories.length - 1],
                    'id': contentItem.attributes['sku'],
                    'image': contentItem.images[0]['url'],
                    // Should be something like "/shoes/running" We don't have a proper collection name in this object
                    'name': contentItem.name,
                    'price': USE_BASE_CURRENCY ? contentItem.price.amount : contentItem.local.prices[0].amount,
                    'product_id': contentItem.attributes['product_id'],
                    'quantity': orderItem.quantity,
                    'variant': contentItem.attributes['variant_title'],
                    'variant_id': contentItem['number'],
                });
            }
        });
        return items;
    }

    // Returns a user properties object
    function getUserProperties(data) {
        return {
            // 'customer_id': not available
            'customer_email': data.order.customer.email,
            'customer_first_name': data.order.customer.name.first,
            'customer_phone': data.order.customer.phone,
            'customer_last_name': data.order.customer.name.last,
            'customer_city': data.order.destination.city,
            'customer_zip': data.order.destination.postal,
            'customer_address_1': data.order.destination.streets[0],
            'customer_address_2': data.order.destination.streets[1],
            'customer_country': data.order.destination.country,
            'customer_province': data.order.destination.province,
        }
    }

    // Sufficient according to Thomas
    function generateEventID() {
        return Math.random().toString(36).slice(2)
    }

    function getCurrency(data) {
        return USE_BASE_CURRENCY ? data.order.total.base.currency : data.order.total.currency; 
    }

    function getSubtotal(data) {
        // total excludes tax/discounts/shipping. Full price of products.
        return getValue('subtotal', data) + getValue('discount', data);
    }
    
    function getValue(valueKey, data) {
        var obj = data.order.prices.find(function (item) { return item.key === valueKey });
        var value;
        if (obj) {
            value = USE_BASE_CURRENCY ? obj.base.amount : obj.amount;
        } else {
            value = 0;
        }
        return value;
    }
    
}
//# sourceURL=flow-checkout-tracking.js
// Shows under sources, no domain, flow-checkout-tracking.js
</script>