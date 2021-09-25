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
    'event': 'dl_begin_checkout',
    // TODO: how do we generate this? just use a UUID link in the GTM suite script?
    // 'event_id': 
    'ecommerce': {
      'checkout': {
        'actionField': { step: 1, action: 'checkout' },
        'products': productList
      },
      'currencyCode': data.order.total.base.currency
    },
    'marketing' : getMarketingData(urlParams, data),
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
    'event': 'dl_add_shipping_info',
    // 'event_id': 
    'ecommerce': {
      'checkout': {
        'actionField': { step: 2, action: 'checkout' },
        'products': productList
      },
      'currencyCode': data.order.total.base.currency
    },
    'marketing' : getMarketingData(urlParams, data),
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
    'event': 'dl_add_payment_info',
    // 'event_id': 
    'ecommerce': {
      'checkout': {
        'actionField': { step: 3, action: 'checkout' },
        'products': productList
      },
      'currencyCode': data.order.total.base.currency
    },
    'marketing' : getMarketingData(urlParams, data),
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
    'event': 'dl_purchase',
    // 'event_id': pass in from previous page? ,
    'ecommerce': {
      'purchase': {
        'actionField': {
          'action': "purchase",
          'affiliation': data.organization,
          'discount_amount': data.order.prices[2].amount, // in foreign currency. In USD use data.order.prices[2].base.amount,
          // TODO: Decide whether we want foreign or USD currency. Figure out 'id'
          'id': '', // If this is the order id that shows in the url in a shopify order it's not in the data object.
          'order_name': data.order['number'], // This is the order number that shows up in Shopify on orders list page,
          'revenue': data.order.prices[0].amount, // in foreign currency. In USD use data.order.prices[0].base.amount,
          'shipping': data.order.prices[1].amount, // in foreign currency. In USD use data.order.prices[1].base.amount,
          'sub_total': data.order.deliveries[0].total.amount, // Subtotal in foreign currency (after discounts but includes shipping and tax, no real subtotal is available, have to calculate) in USD use data.order.deliveries[0].total.base.amount,
          'tax': data.order.deliveries[0].prices[3].amount, // tax in foreign currency. For USD use data.order.deliveries[0].prices[3].base.amount
        },
        'products': productList
      },
      'currencyCode': data.order.total.currency // USD data.order.total.base.currency
    },
    'marketing' : getMarketingData(urlParams, data),
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

// Returns marketing params
function getMarketingData(urlParams, data) {
  return {
    // TODO: Should we modify the script to set cookie duration?
    // currently set to session expiration.
    // What if we have no utms? i've seen landing page: '/' here previously.
    // Should I set that if no UTMS?
    'utm_campaign': urlParams['utm_campaign'],
    'utm_content': urlParams['utm_content'],
    'utm_medium': urlParams['utm_medium'],
    'utm_source': urlParams['utm_source'],
    'utm_content': urlParams['utm_content'],
  }
}