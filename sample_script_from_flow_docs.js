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
    'pageTitle': 'Checkout: Shipping and Billing Address',
    'pageCategory': 'Checkout',
    'visitorLoginState': 'flow',
    'customerEmail': data.order.customer.email,
    'customerOrders': null,
    'customerValue': 0,
    'Country': data.order.destination.country,
    'State': data.order.destination.province,
    'event': 'dl_begin_checkout',
    // TODO: how do we generate this?
    // 'event_id': pass in from previous page? ,
    'ecommerce': {
      'checkout': {
        'actionField': { step: 1, action: 'checkout'},
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
    'pageTitle': 'Checkout: Shipping and Billing Address',
    'pageCategory': 'Checkout',
    'visitorLoginState': 'flow',
    'customerEmail': data.order.customer.email,
    'customerOrders': null,
    'customerValue': 0,
    'Country': data.order.destination.country,
    'State': data.order.destination.province,
    'event': 'dl_add_shipping_info',
    // TODO: how do we generate this?
    // 'event_id': pass in from previous page? ,
    'ecommerce': {
      'checkout': {
        'actionField': { step: 2, action: 'checkout'},
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



flow.checkout.onPageView(flow.checkout.enums.pageView.PAYMENT_INFO, function handlePageView(data) {
  var items = [];
  var prices = data.getOrderPrices();

  data.order.items.forEach((orderItem) => {
    var contentItem = data.content.getItem(orderItem.number);

    if (contentItem) {
      items.push({
        'brand': '@clientNameReplace',
        'category': contentItem.categories.join(),
        'id': contentItem.attributes['product_id'],
        'name': contentItem.name,
        'price': contentItem.price.amount,
        'quantity': orderItem.quantity,
        'variant': contentItem.attributes['colorName-x-default']
      });
    }
  });

});

// flow.checkout.onPageView(flow.checkout.enums.pageView.CONFIRMATION, function handlePageView(data) {
flow.checkout.onTransaction(function (data) {
  var items = [];
  var prices = data.getOrderPrices();

  dataLayer.push({
    'event': 'dl_purchase',
    'ecommerce': {
      'checkout': undefined
    }
  });

  data.order.items.forEach((orderItem) => {
    var contentItem = data.content.getItem(orderItem.number);

    if (contentItem) {
      items.push({
        'brand': '@clientNameReplace',
        'category': contentItem.categories.join(),
        'id': contentItem.attributes['product_id'],
        'name': contentItem.name,
        'price': contentItem.price.amount,
        'quantity': orderItem.quantity,
        'variant': contentItem.attributes['colorName-x-default']
      });
    }
  });

  var dataLayerObj = {
    'pageTitle': 'Checkout: Order Confirmation',
    'pageCategory': 'Checkout',
    'visitorLoginState': 'flow',
    'customerEmail': data.order.customer.email,
    'customerOrders': null,
    'customerValue': 0,
    'Country': data.order.destination.country,
    'State': data.order.destination.province,
    'event': 'flowOrderConfirmation',
    'ecommerce': {
      'purchase': {
        'products': items,
        'actionField': {
          'id': data.order.number,
          'revenue': prices.subtotal ? prices.subtotal.base.amount : -1,
          'shipping': prices.shipping ? prices.shipping.base.amount : -1,
          'tax': prices.duty ? prices.duty.base.amount : -1
        },
      },
      'currencyCode': data.order.total.base.currency
    }
  };

  dataLayer.push(dataLayerObj);

  dataLayerObj.event = 'transaction';

  dataLayer.push(dataLayerObj);
});


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
