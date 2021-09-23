/* To be placed in checkout.liquid
* My understanding is checkout.liquid is run during each stage of the Flow checkout.
* So long as GTM & the Flow script are imported in checkout.liquid 
* all we need to do is parse the data we need for each step
*/

Flow.set('on', 'pageview.checkout_step_1', function (data) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'dl_begin_checkout',
    })
});

Flow.set('on', 'pageview.checkout_step_2', function (data) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'dl_add_shipping_info',
    })
});

Flow.set('on', 'pageview.checkout_step_3', function (data) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'dl_add_payment_info',
    })
});

Flow.set('on', 'pageview.checkout_thank_you', function (data) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'dl_purchase',
        'ecommerce': {
            'purchase': {
                'actionField': {
                    'id': data, // Order ID
                }
            }
        },
    })
});