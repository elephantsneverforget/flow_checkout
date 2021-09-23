/* To be placed in checkout.liquid
* My understanding is checkout.liquid is run during each stage of the Flow checkout.
* So long as GTM & the Flow script are imported in checkout.liquid 
* all we need to do is parse the data we need for each step
*/

if (typeof window.Flow === 'undefined') {
    console.error('Flow JS not undefined');
}

Flow.set('on', 'pageview.checkout_step_1', function (data) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'dl_begin_checkout',
        // 'cart_total': data.
        // gtm: { uniqueEventId: 5, start: 1632436729274 },
        // event_id: "e9d0ad2b-64b9-40bd-805f-0cdf8090bf3d",
        cart_total: "138.95",
        user_properties: { visitor_type: "guest", user_consent: "" },
        ecommerce: {
            cart_contents: {
                products: [
                    {
                        id: "2360-013",
                        name: "Allegro Black",
                        brand: "SAS Shoes",
                        category: "Women's Sandals",
                        variant: "Black / 6.5 / Double Wide",
                        price: "138.95000000000002",
                        quantity: "1",
                        list: "/collections/womens-dress",
                        product_id: "1681765597230",
                        variant_id: "15389545234478",
                        image: "https://cdn.shopify.com/s/files/1/0018/7675/4478/pr" +
                            "oducts/allegro-black-womens-sandals-sas-shoes-22067" +
                            "1.png?v=1615263560"
                    }
                ]
            },
            currencyCode: "USD",
            checkout: {
                actionField: { step: "1" },
                products: [
                    {
                        id: "2360-013",
                        name: "Allegro Black",
                        brand: "SAS Shoes",
                        category: "Women's Sandals",
                        variant: "Black / 6.5 / Double Wide",
                        price: "138.95",
                        quantity: "1",
                        list: "/collections/womens-dress",
                        product_id: "1681765597230",
                        variant_id: "15389545234478",
                        image: "//cdn.shopify.com/s/files/1/0018/7675/4478/products" +
                            "/allegro-black-womens-sandals-sas-shoes-220671_smal" +
                            "l.png?v=1615263560"
                    }
                ]
            }
        },
        marketing: {
            utm_source: "google",
            utm_medium: "product_sync",
            utm_campaign: "sag_organic.json",
            utm_content: "sag_organic"
        }

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