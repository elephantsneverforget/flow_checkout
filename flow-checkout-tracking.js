<script>
// Defaults to using the base currency of the store
// If you'd like reporting in foreign currency flip this
// variable to false but be careful, as it stands blaze checkout
// steps only come in the stores base currency.
var USE_BASE_CURRENCY = true;

// For legacy intermediate checkout events
// Wait for script to load before attaching listeners. 2 parts. Flow does not fire load event for .checkout
var interval = setInterval(function () {
    if (typeof window.flow.checkout !== 'undefined') {
        clearInterval(interval)
        setListeners();
    }
}, 250)

// For blaze intermediate checkout events
// fetch calls are neccessary because blaze does not provide us
// with the variant ID or SKU. If they start passing these these fetch calls can be deleted.
Flow.set('on', 'loaded', function () {
    Flow.on('blaze.checkoutProgress', function (data) {
        switch (data.step) {
            case 'customer_info':
                console.log('customer info');
                fetch('/cart.js')
                    .then(function (response) { return response.json() })
                    .then(function (shopifyCartData) {
                        var productsInCart = getProductsInCartBlazeCheckout(data, shopifyCartData)
                        pushDLBeginCheckout(data, productsInCart, true);
                    })
                    .catch(function (error) {
                        errorLogger(error);
                        var productsInCart = getProductsInCartBlazeCheckout(data)
                        pushDLBeginCheckout(data, productsInCart, true);
                    });
                break;
            case 'delivery':
                console.log('delivery');
                fetch('/cart.js')
                    .then(function (response) { return response.json() })
                    .then(function (shopifyCartData) {
                        var productsInCart = getProductsInCartBlazeCheckout(data, shopifyCartData)
                        pushDLAddShippingInfo(data, productsInCart, true);
                    })
                    .catch(function (error) {
                        errorLogger(error);
                        var productsInCart = getProductsInCartBlazeCheckout(data);
                        pushDLAddShippingInfo(data, productsInCart, true);
                    });
                break;
            case 'payment':
                console.log('payment')
                fetch('/cart.js')
                    .then(function (response) { return response.json() })
                    .then(function (shopifyCartData) {
                        var productsInCart = getProductsInCartBlazeCheckout(data, shopifyCartData)
                        pushDLAddPaymentInfo(data, productsInCart, true);
                    })
                    .catch(function (error) {
                        errorLogger(error);
                        var productsInCart = getProductsInCartBlazeCheckout(data);
                        pushDLAddPaymentInfo(data, productsInCart, true);
                    });
                break;
            default:
                console.error('None of the expected checkout steps were provided by Blaze.')
        }
        console.log(data);
    })
    // Although the docs state this event fires on purchase it doesn't.
    // The same purchase event can be used on both legacy and Blaze versions of the checkout.
    // Flow.on('blaze.checkoutComplete', function(data){
    //     console.log('Checkout complete')
    // })
});

function errorLogger(error) {
    console.error('An error occured retrieving the cart contents in Elevar Flow Checkout script.');
    console.error('Using variant ID for product ID and Sku as fall back');
    console.error(error);
}

// Legacy Flow events (still in use as of Oct 2021)
function setListeners() {
    // Fires on contact info page load (checkout step 1)
    flow.checkout.onPageView(flow.checkout.enums.pageView.CONTACT_INFO, function handlePageView(data) {
        var productsInCart = getProductsInCartLegacyCheckout(data);
        pushDLBeginCheckout(data, productsInCart, false);
    });

    // Fires on shipping method page load (checkout step 2)
    flow.checkout.onPageView(flow.checkout.enums.pageView.SHIPPING_METHOD, function handlePageView(data) {
        var productsInCart = getProductsInCartLegacyCheckout(data);
        pushDLAddShippingInfo(data, productsInCart, false);
    });

    // Fires on payment info page load (checkout step 3)
    flow.checkout.onPageView(flow.checkout.enums.pageView.PAYMENT_INFO, function handlePageView(data) {
        var productsInCart = getProductsInCartLegacyCheckout(data);
        pushDLAddPaymentInfo(data, productsInCart, false);
    });

    // Fires once on transaction complete (checkout step 4)
    // This event is used for both Blaze and legacy
    flow.checkout.onTransaction(function (data) {
        var productsInCart = getProductsInCartLegacyCheckout(data);
        pushDLPurchase(data, productsInCart, false);
    });
}

function pushDLBeginCheckout(data, productsInCart, blazeCheckout) {
    window.dataLayer.push({
        'event': 'dl_begin_checkout',
        'event_id': generateEventID(),
        'ecommerce': {
            'checkout': {
                'actionField': { step: 1, action: 'checkout' },
                'products': productsInCart
            },
            'currencyCode': blazeCheckout ? getBlazeCurrency(data) : getCurrency(data),
        },
    });
}

function pushDLAddShippingInfo(data, productsInCart, blazeCheckout) {
    window.dataLayer.push({
        'event': 'dl_add_shipping_info',
        'event_id': generateEventID(),
        'ecommerce': {
            'checkout': {
                'actionField': { step: 2, action: 'checkout' },
                'products': productsInCart
            },
            'currencyCode': blazeCheckout ? getBlazeCurrency(data) : getCurrency(data),
        },
    });
}

function pushDLAddPaymentInfo(data, productsInCart, blazeCheckout) {
    window.dataLayer.push({
        'event': 'dl_add_payment_info',
        'event_id': generateEventID(),
        'ecommerce': {
            'checkout': {
                'actionField': { step: 3, action: 'checkout' },
                'products': productsInCart
            },
            'currencyCode': blazeCheckout ? getBlazeCurrency(data) : getCurrency(data),
        },
    });
}

function pushDLPurchase(data, productsInCart, blazeCheckout) {
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
                'products': productsInCart
            },
            'currencyCode': blazeCheckout ? getBlazeCurrency(data) : getCurrency(data),
        },
    });
}


// The shape of the blaze data object differs from the legacy object
function getProductsInCartBlazeCheckout(data, shopifyCartData) {
    var items = [];
    data.lines.forEach((orderItem) => {
        if (orderItem) {
            // This is section is functional and semi tested in the browser
            variant_id = orderItem.number;
            items.push({
                'brand': orderItem.brand,
                'category': orderItem.category,
                'variant_id': orderItem.number,
                // If we don't have cart data use the variant id as a filler for product id and sku
                'product_id': shopifyCartData ? getProductId(variant_id, shopifyCartData) : orderItem.number,
                'id': shopifyCartData ? getProductSKU(variant_id, shopifyCartData) : orderItem.number,
                // All we have is the order item name no variant info
                // These aren't al formatted the same so tough to seperate out variant from product name
                'variant': orderItem.name,
                // Image is not available
                // 'image': contentItem.images[0]['url'],
                // Should be something like "/shoes/running" We don't have a proper collection name in this object
                'name': orderItem.name,
                // Only Foreign currency is available
                'price': orderItem.price,
                // Not available
                // 'product_id': contentItem.attributes['product_id'],
                'quantity': orderItem.quantity,
            });
        }
    });
    return items;
}

// The shape of the legacy data object differs from the blaze object
function getProductsInCartLegacyCheckout(data) {
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

function getBlazeCurrency(data) {
    return data.lines[0].currency;
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

function getProductId(variantId, shopifyCartData) {
    var shopifyCartItem = shopifyCartData.items.find(function (item) { return item.variant_id === parseInt(variantId); })
    return shopifyCartItem.product_id ? shopifyCartItem.product_id.toString() : variantId;
}

function getProductSKU(variantId, shopifyCartData) {
    var shopifyCartItem = shopifyCartData.items.find(function (item) { return item.variant_id === parseInt(variantId); })
    return shopifyCartItem.sku ? shopifyCartItem.sku : variantId;
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
//# sourceURL=flow-checkout-tracking.js
// Shows under sources, no domain, flow-checkout-tracking.js
</script>