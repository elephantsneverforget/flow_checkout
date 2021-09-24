// Sample script from site
// https://docs.flow.io/docs/use-events-and-analytics

(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXX');

flow.checkout.onPageView(flow.checkout.enums.pageView.CONFIRMATION, function handlePageView(data) {
  var items = [];
  var prices = data.getOrderPrices();

  dataLayer.push({
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

flow.checkout.onPageView(flow.checkout.enums.pageView.CONTACT_INFO, function handlePageView(data) {
  var items = [];

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

  dataLayer.push({
    'pageTitle': 'Checkout: Shipping and Billing Address',
    'pageCategory': 'Checkout',
    'visitorLoginState': 'flow',
    'customerEmail': data.order.customer.email,
    'customerOrders': null,
    'customerValue': 0,
    'Country': data.order.destination.country,
    'State': data.order.destination.province,
    'event': 'checkout',
    'ecommerce': {
      'checkout': {
        'actionField': { step: 2 },
        'products': items
      },
      'currencyCode': data.order.total.base.currency
    }
  });
});

flow.checkout.onPageView(flow.checkout.enums.pageView.SHIPPING_METHOD, function handlePageView(data) {
  var items = [];

  data.order.items.forEach((orderItem) => {
    var contentItem = data.content.getItem(orderItem.number);

    if (contentItem) {
      items.push({
        'brand': '@clientNameReplace',
        'category': contentItem.categories.join(),
        'dimension6': contentItem.attributes['modelSize-x-default'],
        'dimension7': `${contentItem.attributes['product_id']}${contentItem.attributes['color']}-${contentItem.attributes['modelSize-x-default']}`,
        'id': contentItem.attributes['product_id'],
        'name': contentItem.name,
        'price': contentItem.price.amount,
        'quantity': orderItem.quantity,
        'variant': contentItem.attributes['colorName-x-default']
      });
    }
  });

  dataLayer.push({
    'pageTitle': 'Checkout: Shipping method',
    'pageCategory': 'Checkout',
    'visitorLoginState': 'flow',
    'customerEmail': data.order.customer.email,
    'customerOrders': null,
    'customerValue': 0,
    'Country': data.order.destination.country,
    'State': data.order.destination.province,
    'event': 'checkout',
    'ecommerce': {
      'checkout': {
        'actionField': { step: 3 },
        'products': items
      },
      'currencyCode': data.order.total.base.currency
    }
  });
});

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