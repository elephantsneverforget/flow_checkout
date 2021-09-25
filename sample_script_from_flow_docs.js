// Sample script from site
// https://docs.flow.io/docs/use-events-and-analytics

(function (w, d, s, l, i) {
  w[l] = w[l] || []; w[l].push({
    'gtm.start':
      new Date().getTime(), event: 'gtm.js'
  }); var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
      'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-PRTHWZW');

window.dataLayer = window.dataLayer || [];

// Fires on contact info page load (checkout step 1)
// Triggers dl_begin_checkout
flow.checkout.onPageView(flow.checkout.enums.pageView.CONTACT_INFO, function handlePageView(data) {
  pushDLBeginCheckout(data);
});

function pushDLBeginCheckout(data) {
  console.log("Begin checkout")
  var cookie = getCookie('__gtm_campaign_url');
  var urlParams = getUrlParams(cookie);

  var productList = getProductsInCart(data);
  window.dataLayer.push({
    // 'pageTitle': 'Checkout: Shipping and Billing Address',
    // 'pageCategory': 'Checkout',
    // 'visitorLoginState': 'flow',
    // 'customerEmail': data.order.customer.email,
    // 'customerOrders': null,
    // 'customerValue': 0,
    // 'Country': data.order.destination.country,
    // 'State': data.order.destination.province,
    'event': 'dl_begin_checkout',
    // TODO: how do we generate this?
    // 'event_id': pass in from previous page? ,
    'ecommerce': {
      'checkout': {
        'actionField': { step: 1, action: 'checkout' },
        'products': productList
      },
      'currencyCode': data.order.total.base.currency
    },
    'marketing': {
      // TODO: Should we modify the script to set cookie duration?
      // currently set to session expiration.
      'utm_campaign': urlParams['utm_campaign'],
      'utm_content': urlParams['utm_content'],
      'utm_medium': urlParams['utm_medium'],
      'utm_source': urlParams['utm_source'],
      'utm_content': urlParams['utm_content'],
    }
  });
}

// Fires on shipping method page load (checkout step 2)
// Triggers dl_add_shipping_info
flow.checkout.onPageView(flow.checkout.enums.pageView.SHIPPING_METHOD, function handlePageView(data) {
  pushDLAddShippingInfo(data);
});

function pushDLAddShippingInfo(data) {
  var cookie = getCookie('__gtm_campaign_url');
  var urlParams = getUrlParams(cookie);
  var productList = getProductsInCart(data);

  window.dataLayer.push({
    // 'pageTitle': 'Checkout: Shipping and Billing Address',
    // 'pageCategory': 'Checkout',
    // 'visitorLoginState': 'flow',
    // 'customerEmail': data.order.customer.email,
    // 'customerOrders': null,
    // 'customerValue': 0,
    // 'Country': data.order.destination.country,
    // 'State': data.order.destination.province,
    'event': 'dl_add_shipping_info',
    // TODO: how do we generate this?
    // 'event_id': pass in from previous page? ,
    'ecommerce': {
      'checkout': {
        'actionField': { step: 2, action: 'checkout' },
        'products': productList
      },
      'currencyCode': data.order.total.base.currency
    },
    'marketing': {
      // TODO: Should we modify the script to set cookie duration?
      // currently set to session expiration.
      'utm_campaign': urlParams['utm_campaign'],
      'utm_content': urlParams['utm_content'],
      'utm_medium': urlParams['utm_medium'],
      'utm_source': urlParams['utm_source'],
      'utm_content': urlParams['utm_content'],
    }
  });
}


// Fires on payment info page load (checkout step 3)
// Triggers dl_add_payment_info
flow.checkout.onPageView(flow.checkout.enums.pageView.PAYMENT_INFO, function handlePageView(data) {
  pushDLAddPaymentInfo(data);
});

function pushDLAddPaymentInfo(data) {
  var cookie = getCookie('__gtm_campaign_url');
  var urlParams = getUrlParams(cookie);
  var productList = getProductsInCart(data);

  window.dataLayer.push({
    // 'pageTitle': 'Checkout: Shipping and Billing Address',
    // 'pageCategory': 'Checkout',
    // 'visitorLoginState': 'flow',
    // 'customerEmail': data.order.customer.email,
    // 'customerOrders': null,
    // 'customerValue': 0,
    // 'Country': data.order.destination.country,
    // 'State': data.order.destination.province,
    'event': 'dl_add_payment_info',
    // TODO: how do we generate this?
    // 'event_id': pass in from previous page? ,
    'ecommerce': {
      'checkout': {
        'actionField': { step: 3, action: 'checkout' },
        'products': productList
      },
      'currencyCode': data.order.total.base.currency
    },
    'marketing': {
      // TODO: Should we modify the script to set cookie duration?
      // currently set to session expiration.
      'utm_campaign': urlParams['utm_campaign'],
      'utm_content': urlParams['utm_content'],
      'utm_medium': urlParams['utm_medium'],
      'utm_source': urlParams['utm_source'],
      'utm_content': urlParams['utm_content'],
    }
  });
}

// Fires once on transaction complete (checkout step 4)
// Triggers dl_purchase
// flow.checkout.onPageView(flow.checkout.enums.pageView.CONFIRMATION, function handlePageView(data) {
flow.checkout.onTransaction(function (data) {
  pushDLPurchase(data);
});

function pushDLPurchase(data) {
  var cookie = getCookie('__gtm_campaign_url');
  var urlParams = getUrlParams(cookie);
  var productList = getProductsInCart(data);

  window.dataLayer.push({
    // 'pageTitle': 'Checkout: Shipping and Billing Address',
    // 'pageCategory': 'Checkout',
    // 'visitorLoginState': 'flow',
    // 'customerEmail': data.order.customer.email,
    // 'customerOrders': null,
    // 'customerValue': 0,
    // 'Country': data.order.destination.country,
    // 'State': data.order.destination.province,
    'event': 'dl_purchase',
    // TODO: how do we generate this?
    // 'event_id': pass in from previous page? ,
    'ecommerce': {
      'checkout': {
        'actionField': {
          'action': "purchase",
          'affiliation': flowSettings.shopify.entities.shop.myshopify_domain,
          // TODO: fill these once you have a sample transaction
          'discount_amount': "0.0",
          'id': 3961501155446,
          'order_name': "#1023",
          'revenue': "234.32",
          'shipping': "41.38",
          'sub_total': "192.94",
          'tax': "0.0",
        },
        'products': productList
      },
      'currencyCode': data.order.total.base.currency
    },
    'marketing': {
      // TODO: Should we modify the script to set cookie duration?
      // currently set to session expiration. 
      // Should this be set to landing_site == something if no utms?
      'utm_campaign': urlParams['utm_campaign'],
      'utm_content': urlParams['utm_content'],
      'utm_medium': urlParams['utm_medium'],
      'utm_source': urlParams['utm_source'],
      'utm_content': urlParams['utm_content'],
    }
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
        // // TODO: This is messy. Last item in array seems to be the top level category. 
        'category': contentItem.categories[contentItem.categories.length - 1],
        'id': contentItem.attributes['sku'],
        'image': contentItem.images[0]['url'],
        // TODO: 'list' : should be something like "/shoes/running" Not sure we have the collection name in this object
        'name': contentItem.name,
        // TODO: Price in checkout currency? Currently USD price. Not
        'price': contentItem.price.amount,
        'product_id': contentItem.attributes['product_id'],
        'quantity': orderItem.quantity,
        'variant': contentItem.attributes['variant_title'],
        'variant_id': contentItem['number'],
      });
    }
  });
  return items;
}

// Returns an object with key/values matching the url params
function getUrlParams(address) {
  var vars = {};
  var parts = address.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  });
  return vars;
}

// Returns the named cookie from the document.cookie string
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
}
