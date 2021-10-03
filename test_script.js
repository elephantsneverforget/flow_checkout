dataLayer = []
function pushDLPurchase(data) {
    // var cookie = getCookie('__gtm_campaign_url');
    // var urlParams = getUrlParams(cookie);
    var productList = getProductsInCart(data);

    dataLayer.push({
        'event': 'dl_purchase',
        'event_id': generateEventID(),
        'user_properties': getUserProperties(data),
        'ecommerce': {
            'purchase': {
                'actionField': {
                    'action': "purchase",
                    'affiliation': data.organization,
                    'id': data.order['number'], 
                    // This is the order number that shows up in Shopify on orders list page,
                    'order_name': data.order['number'], 
                    // USES BASE CURRENCY BY DEFAULT
                    // COMMENT OUT TO USE BASE CURRENCY
                    // 'discount_amount': data.order.prices[2].amount, 
                    // 'revenue': data.order.prices[0].amount, 
                    // 'shipping': data.order.prices[1].amount, 
                    // 'sub_total': data.order.deliveries[0].total.amount, 
                    // 'tax': data.order.deliveries[0].prices[3].amount, 
                    // UNCOMMENT TO USE BASE CURRENCY
                    'discount_amount': data.order.prices[2].base.amount, 
                    'revenue': data.order.prices[0].base.amount, 
                    'shipping': data.order.prices[1].base.amount, 
                    'sub_total': data.order.deliveries[0].total.base.amount,
                    'tax': data.order.deliveries[0].prices[3].base.amount, 
                },
                'products': productList
            },
            // UNCOMMENT TO USE FOREIGN CURRENCY
            // 'currencyCode': data.order.total.currency, 
            // COMMENT OUT TO USE FOREIGN CURRENCY
            'currencyCode': data.order.total.base.currency 
        },
        // 'marketing' : getMarketingData(urlParams, data),
    });
    console.log(dataLayer)
}

function getProductsInCart(data) {
    var items = [];

    data.order.items.forEach((orderItem) => {
        // var contentItem = data.content.getItem(orderItem.number);

        // if (contentItem) {
        //     // This is section is functional and semi tested in the browser
        //     items.push({
        //         'brand': contentItem.attributes['vendor'],
        //         // // TODO: This is messy. Last item in array seems to be the top level category. 
        //         'category': contentItem.categories[contentItem.categories.length - 1],
        //         'id': contentItem.attributes['sku'],
        //         'image': contentItem.images[0]['url'],
        //         // TODO: 'list' : should be something like "/shoes/running" Not sure we have the collection name in this object
        //         'name': contentItem.name,
        //         // TODO: Price in checkout currency? Currently USD price. Not
        //         'price': contentItem.price.amount,
        //         'product_id': contentItem.attributes['product_id'],
        //         'quantity': orderItem.quantity,
        //         'variant': contentItem.attributes['variant_title'],
        //         'variant_id': contentItem['number'],
        //     });
        // }
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

// Returns a user properties object
function getUserProperties(data) {
    var customerProperties = {
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
    // console.log(customerProperties)
    return customerProperties;
}

// Returns the named cookie from the document.cookie string
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
}

// Sufficient according to Thomas
function generateEventID() {
    return Math.random().toString(36).slice(2)
}

data = {
    "experiment": {
        "key": "global_blaze-rollout-2",
        "variant": {
            "key": "eyJmZWF0dXJlIjp7ImlkIjoiZmVhLTNlZGYwNWJkNjNiNzQ0Njc5YmU5ZjI0NjhkNzA0OGQwIiwia2V5IjoiZ2xvYmFsX2NoZWNrb3V0X2JsYXplIn0sInZhbHVlIjpmYWxzZSwiZGlzY3JpbWluYXRvciI6ImJvb2xlYW4ifQ",
            "name": "Blaze checkout enabled: false"
        }
    },
    "organization": "apl",
    "order": {
        "id": "ord-1c81d1d808a9467c85a49a2e965fad16",
        "number": "F467368",
        "order_type": "standard",
        "customer": {
            "name": {
                "first": "Brad",
                "last": "Redding"
            },
            "phone": "7809510883",
            "email": "joncairo@gmail.com",
            "address": {
                "name": {},
                "country": "CAN"
            }
        },
        "delivered_duty": "paid",
        "destination": {
            "streets": [
                "1 - 2560 Pegasus Boulevard  NW"
            ],
            "city": "Edmonton",
            "province": "British Columbia",
            "postal": "T5E6V4",
            "country": "CAN",
            "contact": {
                "name": {
                    "first": "Brad",
                    "last": "Redding"
                },
                "email": "joncairo@gmail.com",
                "phone": "7809510883"
            }
        },
        "expires_at": "2021-09-25T18:20:49.486Z",
        "items": [
            {
                "number": "39286648275017",
                "name": "Women's TechLoom Tracer Almond / Pristine / Leopard - ALMOND / PRISTINE / LEOPARD / 6",
                "quantity": 1,
                "local": {
                    "experience": {
                        "id": "exp-f0bad7b182b24e0d96d1f23ac55b08c4",
                        "key": "canada",
                        "name": "Canada"
                    },
                    "prices": [
                        {
                            "currency": "CAD",
                            "amount": 301.95,
                            "label": "CA$301.95",
                            "base": {
                                "amount": 230.03,
                                "currency": "USD",
                                "label": "US$230.03"
                            },
                            "includes": {
                                "key": "none",
                                "label": "GST + PST and duty not included"
                            },
                            "key": "localized_item_price"
                        },
                        {
                            "currency": "CAD",
                            "amount": 42.75,
                            "label": "CA$42.75",
                            "base": {
                                "amount": 32.57,
                                "currency": "USD",
                                "label": "US$32.57"
                            },
                            "name": "GST + PST",
                            "accuracy": "calculated",
                            "key": "localized_item_vat"
                        },
                        {
                            "currency": "CAD",
                            "amount": 54.35,
                            "label": "CA$54.35",
                            "base": {
                                "amount": 41.41,
                                "currency": "USD",
                                "label": "US$41.41"
                            },
                            "key": "localized_item_duty"
                        }
                    ],
                    "rates": [],
                    "spot_rates": [],
                    "status": "included",
                    "attributes": {
                        "weight": "2.44",
                        "display_variant_title": "ALMOND / PRISTINE / LEOPARD / 6",
                        "url": "https://www.athleticpropulsionlabs.com/products/womens-techloom-tracer-almond-pristine-leopard?variant=39286648275017",
                        "option1": "ALMOND / PRISTINE / LEOPARD",
                        "weight_unit": "lb",
                        "product_handle": "womens-techloom-tracer-almond-pristine-leopard",
                        "product_type": "FOOTWEAR - WOMEN'S",
                        "fulfillment_service": "manual",
                        "taxable": "true",
                        "product_id": "6562276474953",
                        "option2": "6",
                        "vendor": "Athletic Propulsion Labs",
                        "inventory_policy": "deny",
                        "sku": "840222800640",
                        "source": "shopify",
                        "barcode": "840222800640",
                        "inventory_management": "shopify",
                        "product_title": "Women's TechLoom Tracer Almond / Pristine / Leopard",
                        "requires_shipping": "true",
                        "variant_title": "ALMOND / PRISTINE / LEOPARD / 6",
                        "grams": "1107.0",
                        "fulfillment_method": "physical"
                    },
                    "price_attributes": {}
                },
                "id": "lin-4f4e64b169524d138b09f37d11e4f5b3",
                "discounts": [
                    {
                        "amount": -286.85,
                        "currency": "CAD",
                        "label": "-CA$286.85",
                        "base": {
                            "amount": -218.53,
                            "currency": "USD",
                            "label": "-US$218.53"
                        },
                        "requested": {
                            "amount": 286.85,
                            "currency": "CAD"
                        },
                        "discount_label": "elevar2195"
                    }
                ],
                "attributes": {},
                "price_source": {
                    "price": {
                        "amount": 230,
                        "currency": "USD"
                    },
                    "discriminator": "catalog"
                }
            },
            {
                "number": "39286628089929",
                "name": "Women's Iconic Slide Deep Brown / White / Cow - DEEP BROWN / WHITE / COW / 8",
                "quantity": 1,
                "local": {
                    "experience": {
                        "id": "exp-f0bad7b182b24e0d96d1f23ac55b08c4",
                        "key": "canada",
                        "name": "Canada"
                    },
                    "prices": [
                        {
                            "currency": "CAD",
                            "amount": 196.95,
                            "label": "CA$196.95",
                            "base": {
                                "amount": 150.04,
                                "currency": "USD",
                                "label": "US$150.04"
                            },
                            "includes": {
                                "key": "none",
                                "label": "GST + PST and duty not included"
                            },
                            "key": "localized_item_price"
                        },
                        {
                            "currency": "CAD",
                            "amount": 27.89,
                            "label": "CA$27.89",
                            "base": {
                                "amount": 21.25,
                                "currency": "USD",
                                "label": "US$21.25"
                            },
                            "name": "GST + PST",
                            "accuracy": "calculated",
                            "key": "localized_item_vat"
                        },
                        {
                            "currency": "CAD",
                            "amount": 35.45,
                            "label": "CA$35.45",
                            "base": {
                                "amount": 27.01,
                                "currency": "USD",
                                "label": "US$27.01"
                            },
                            "key": "localized_item_duty"
                        }
                    ],
                    "rates": [],
                    "spot_rates": [],
                    "status": "included",
                    "attributes": {
                        "weight": "1.77",
                        "display_variant_title": "DEEP BROWN / WHITE / COW / 8",
                        "url": "https://www.athleticpropulsionlabs.com/products/womens-iconic-slide-deep-brown-white-cow?variant=39286628089929",
                        "option1": "DEEP BROWN / WHITE / COW",
                        "weight_unit": "lb",
                        "product_handle": "womens-iconic-slide-deep-brown-white-cow",
                        "product_type": "FOOTWEAR - WOMEN'S",
                        "fulfillment_service": "manual",
                        "taxable": "true",
                        "product_id": "6562273984585",
                        "option2": "8",
                        "vendor": "Athletic Propulsion Labs",
                        "inventory_policy": "deny",
                        "sku": "840222802514",
                        "source": "shopify",
                        "barcode": "840222802514",
                        "inventory_management": "shopify",
                        "product_title": "Women's Iconic Slide Deep Brown / White / Cow",
                        "requires_shipping": "true",
                        "variant_title": "DEEP BROWN / WHITE / COW / 8",
                        "grams": "803.0",
                        "fulfillment_method": "physical"
                    },
                    "price_attributes": {}
                },
                "id": "lin-c35f1dec738b469e91821239195f24cd",
                "discounts": [
                    {
                        "amount": -187.1,
                        "currency": "CAD",
                        "label": "-CA$187.10",
                        "base": {
                            "amount": -142.54,
                            "currency": "USD",
                            "label": "-US$142.54"
                        },
                        "requested": {
                            "amount": 187.1,
                            "currency": "CAD"
                        },
                        "discount_label": "elevar2195"
                    }
                ],
                "attributes": {},
                "price_source": {
                    "price": {
                        "amount": 150,
                        "currency": "USD"
                    },
                    "discriminator": "catalog"
                }
            }
        ],
        "deliveries": [
            {
                "id": "del-66549106073747498779431e38fa4026",
                "items": [
                    {
                        "number": "39286648275017",
                        "quantity": 1,
                        "price": {
                            "currency": "CAD",
                            "amount": 301.95,
                            "base": {
                                "amount": 230.03,
                                "currency": "USD"
                            }
                        },
                        "attributes": {
                            "eur_price": "203.62"
                        },
                        "line_number": 0
                    },
                    {
                        "number": "39286628089929",
                        "quantity": 1,
                        "price": {
                            "currency": "CAD",
                            "amount": 196.95,
                            "base": {
                                "amount": 150.04,
                                "currency": "USD"
                            }
                        },
                        "attributes": {
                            "eur_price": "132.82"
                        },
                        "line_number": 1
                    }
                ],
                "options": [
                    {
                        "id": "opt-e4bcbc8ffe3e47fba98afe874f5793fa",
                        "cost": {
                            "currency": "CAD",
                            "amount": 27.64,
                            "label": "CA$27.64",
                            "base": {
                                "amount": 21.053,
                                "currency": "USD",
                                "label": "US$21.05"
                            },
                            "details": [
                                {
                                    "source": "ratecard",
                                    "currency": "CAD",
                                    "amount": 27.64,
                                    "label": "CA$27.64",
                                    "components": [
                                        {
                                            "key": "ratecard_fuel_surcharge",
                                            "currency": "CAD",
                                            "amount": 2.46,
                                            "label": "CA$2.46",
                                            "base": {
                                                "amount": 1.873,
                                                "currency": "USD",
                                                "label": "US$1.87"
                                            }
                                        },
                                        {
                                            "key": "ratecard_emergency_situation_surcharge_fee",
                                            "currency": "CAD",
                                            "amount": 0.59,
                                            "label": "CA$0.59",
                                            "base": {
                                                "amount": 0.44999999999999996,
                                                "currency": "USD",
                                                "label": "US$0.45"
                                            }
                                        },
                                        {
                                            "key": "ratecard_base_cost",
                                            "currency": "CAD",
                                            "amount": 24.59,
                                            "label": "CA$24.59",
                                            "base": {
                                                "amount": 18.73,
                                                "currency": "USD",
                                                "label": "US$18.73"
                                            }
                                        }
                                    ],
                                    "base": {
                                        "amount": 21.053,
                                        "currency": "USD",
                                        "label": "US$21.05"
                                    }
                                }
                            ]
                        },
                        "delivered_duty": "paid",
                        "price": {
                            "currency": "CAD",
                            "amount": 27.64,
                            "label": "CA$27.64",
                            "base": {
                                "amount": 21.05,
                                "currency": "USD",
                                "label": "US$21.05"
                            }
                        },
                        "service": {
                            "id": "dhl-express-worldwide",
                            "carrier": {
                                "id": "dhl"
                            },
                            "name": "Express Worldwide"
                        },
                        "tier": {
                            "id": "tie-dad70c74c1394198a13f9d3683de59be",
                            "integration": "information",
                            "name": "DHL Express Shipping",
                            "services": [
                                "dhl-express-worldwide"
                            ],
                            "strategy": "fastest",
                            "visibility": "public",
                            "currency": "USD",
                            "display": {
                                "estimate": {
                                    "type": "calculated",
                                    "label": "3-6 Business Days"
                                }
                            },
                            "settings": {
                                "availability": "always"
                            }
                        },
                        "window": {
                            "from": "2021-09-29T00:00:00.000Z",
                            "to": "2021-10-04T00:00:00.000Z",
                            "timezone": "America/Toronto",
                            "label": "3-6 Business Days"
                        },
                        "rule_outcome": {
                            "discriminator": "at_cost"
                        },
                        "weight": {
                            "gravitational": {
                                "value": "4.00",
                                "units": "pound"
                            },
                            "dimensional": {
                                "value": "4.68",
                                "units": "inch"
                            }
                        },
                        "ratecard_owner": "flow"
                    }
                ],
                "key": "F467368",
                "center": {
                    "id": "cen-a75f06713f83415bb33899691623e92c",
                    "key": "default",
                    "address": {
                        "contact": {
                            "name": {}
                        },
                        "location": {
                            "streets": [
                                "108 Mayo Ave"
                            ],
                            "city": "City of Industry",
                            "province": "CA",
                            "postal": "91789",
                            "country": "USA"
                        }
                    }
                },
                "prices": [
                    {
                        "key": "subtotal",
                        "currency": "CAD",
                        "amount": 498.9,
                        "label": "CA$498.90",
                        "base": {
                            "amount": 380.07,
                            "currency": "USD",
                            "label": "US$380.07"
                        },
                        "components": [
                            {
                                "key": "item_price",
                                "currency": "CAD",
                                "amount": 498.81,
                                "label": "CA$498.81",
                                "base": {
                                    "amount": 380,
                                    "currency": "USD",
                                    "label": "US$380.00"
                                },
                                "name": "Item price"
                            },
                            {
                                "key": "rounding",
                                "currency": "CAD",
                                "amount": 0.09,
                                "label": "CA$0.09",
                                "base": {
                                    "amount": 0.07,
                                    "currency": "USD",
                                    "label": "US$0.07"
                                },
                                "name": "Rounding"
                            }
                        ],
                        "accuracy": "calculated",
                        "name": "Subtotal"
                    },
                    {
                        "key": "shipping",
                        "currency": "CAD",
                        "amount": 27.64,
                        "label": "CA$27.64",
                        "base": {
                            "amount": 21.05,
                            "currency": "USD",
                            "label": "US$21.05"
                        },
                        "components": [
                            {
                                "key": "shipping",
                                "currency": "CAD",
                                "amount": 27.64,
                                "label": "CA$27.64",
                                "base": {
                                    "amount": 21.05,
                                    "currency": "USD",
                                    "label": "US$21.05"
                                },
                                "name": "Shipping"
                            }
                        ],
                        "accuracy": "calculated",
                        "name": "Shipping"
                    },
                    {
                        "key": "discount",
                        "currency": "CAD",
                        "amount": -473.95,
                        "label": "-CA$473.95",
                        "base": {
                            "amount": -361.07,
                            "currency": "USD",
                            "label": "-US$361.07"
                        },
                        "components": [
                            {
                                "key": "item_discount",
                                "currency": "CAD",
                                "amount": -473.95,
                                "label": "-CA$473.95",
                                "base": {
                                    "amount": -361.07,
                                    "currency": "USD",
                                    "label": "-US$361.07"
                                },
                                "name": "elevar2195"
                            }
                        ],
                        "accuracy": "calculated",
                        "name": "Discount"
                    },
                    {
                        "key": "vat",
                        "currency": "CAD",
                        "amount": 2.99,
                        "label": "CA$2.99",
                        "base": {
                            "amount": 2.28,
                            "currency": "USD",
                            "label": "US$2.28"
                        },
                        "components": [
                            {
                                "key": "vat_item_price",
                                "currency": "CAD",
                                "amount": 2.99,
                                "label": "CA$2.99",
                                "base": {
                                    "amount": 2.28,
                                    "currency": "USD",
                                    "label": "US$2.28"
                                },
                                "name": "GST + PST on item price"
                            },
                            {
                                "key": "vat_duties_item_price",
                                "currency": "CAD",
                                "amount": 0.54,
                                "label": "CA$0.54",
                                "base": {
                                    "amount": 0.41,
                                    "currency": "USD",
                                    "label": "US$0.41"
                                },
                                "name": "GST + PST on duties on item price"
                            },
                            {
                                "key": "vat_deminimis",
                                "currency": "CAD",
                                "amount": -0.54,
                                "label": "-CA$0.54",
                                "base": {
                                    "amount": -0.41,
                                    "currency": "USD",
                                    "label": "-US$0.41"
                                },
                                "name": "GST + PST de minimis adjustment"
                            }
                        ],
                        "accuracy": "calculated",
                        "name": "GST + PST"
                    }
                ],
                "total": {
                    "currency": "CAD",
                    "amount": 55.58,
                    "label": "CA$55.58",
                    "base": {
                        "amount": 42.33,
                        "currency": "USD",
                        "label": "US$42.33"
                    },
                    "key": "localized_total"
                },
                "goods_supply": "export",
                "merchant_of_record_flow_entity": "flow-usa",
                "discriminator": "physical_delivery"
            }
        ],
        "selections": [
            "opt-e4bcbc8ffe3e47fba98afe874f5793fa"
        ],
        "prices": [
            {
                "key": "subtotal",
                "currency": "CAD",
                "amount": 498.9,
                "label": "CA$498.90",
                "base": {
                    "amount": 380.07,
                    "currency": "USD",
                    "label": "US$380.07"
                },
                "components": [
                    {
                        "key": "item_price",
                        "currency": "CAD",
                        "amount": 498.81,
                        "label": "CA$498.81",
                        "base": {
                            "amount": 380,
                            "currency": "USD",
                            "label": "US$380.00"
                        },
                        "name": "Item price"
                    },
                    {
                        "key": "rounding",
                        "currency": "CAD",
                        "amount": 0.09,
                        "label": "CA$0.09",
                        "base": {
                            "amount": 0.07,
                            "currency": "USD",
                            "label": "US$0.07"
                        },
                        "name": "Rounding"
                    }
                ],
                "accuracy": "calculated",
                "name": "Subtotal"
            },
            {
                "key": "shipping",
                "currency": "CAD",
                "amount": 27.64,
                "label": "CA$27.64",
                "base": {
                    "amount": 21.05,
                    "currency": "USD",
                    "label": "US$21.05"
                },
                "components": [
                    {
                        "key": "shipping",
                        "currency": "CAD",
                        "amount": 27.64,
                        "label": "CA$27.64",
                        "base": {
                            "amount": 21.05,
                            "currency": "USD",
                            "label": "US$21.05"
                        },
                        "name": "Shipping"
                    }
                ],
                "accuracy": "calculated",
                "name": "Shipping"
            },
            {
                "key": "discount",
                "currency": "CAD",
                "amount": -473.95,
                "label": "-CA$473.95",
                "base": {
                    "amount": -361.07,
                    "currency": "USD",
                    "label": "-US$361.07"
                },
                "components": [
                    {
                        "key": "item_discount",
                        "currency": "CAD",
                        "amount": -473.95,
                        "label": "-CA$473.95",
                        "base": {
                            "amount": -361.07,
                            "currency": "USD",
                            "label": "-US$361.07"
                        },
                        "name": "elevar2195"
                    }
                ],
                "accuracy": "calculated",
                "name": "Discount"
            },
            {
                "key": "vat",
                "currency": "CAD",
                "amount": 2.99,
                "label": "CA$2.99",
                "base": {
                    "amount": 2.28,
                    "currency": "USD",
                    "label": "US$2.28"
                },
                "components": [
                    {
                        "key": "vat_item_price",
                        "currency": "CAD",
                        "amount": 2.99,
                        "label": "CA$2.99",
                        "base": {
                            "amount": 2.28,
                            "currency": "USD",
                            "label": "US$2.28"
                        },
                        "name": "GST + PST on item price"
                    },
                    {
                        "key": "vat_duties_item_price",
                        "currency": "CAD",
                        "amount": 0.54,
                        "label": "CA$0.54",
                        "base": {
                            "amount": 0.41,
                            "currency": "USD",
                            "label": "US$0.41"
                        },
                        "name": "GST + PST on duties on item price"
                    },
                    {
                        "key": "vat_deminimis",
                        "currency": "CAD",
                        "amount": -0.54,
                        "label": "-CA$0.54",
                        "base": {
                            "amount": -0.41,
                            "currency": "USD",
                            "label": "-US$0.41"
                        },
                        "name": "GST + PST de minimis adjustment"
                    }
                ],
                "accuracy": "calculated",
                "name": "GST + PST"
            }
        ],
        "total": {
            "currency": "CAD",
            "amount": 55.58,
            "label": "CA$55.58",
            "base": {
                "amount": 42.33,
                "currency": "USD",
                "label": "US$42.33"
            },
            "key": "localized_total"
        },
        "attributes": {
            "pricing_key": "{\"vat\":\"displayed\",\"duty\":\"displayed\",\"rounding\":{\"type\":\"pattern\",\"method\":\"nearest\",\"value\":0.95}}",
            "flow-policies": "true",
            "flow_vat_name": "GST + PST",
            "shopify_discount_code": "elevar2195",
            "flow_duty_name": "Duties",
            "flow_checkout_behavior_customer_email_prompt": "incomplete",
            "flow_checkout_behavior_shipping_method_prompt": "multiple",
            "flow_checkout_behavior_shipping_address_prompt": "incomplete",
            "checkout-persistence": "true"
        },
        "merchant_of_record": "flow",
        "experience": {
            "id": "exp-f0bad7b182b24e0d96d1f23ac55b08c4",
            "key": "canada",
            "name": "Canada",
            "delivered_duty": "paid",
            "region": {
                "id": "can"
            },
            "country": "CAN",
            "currency": "CAD",
            "language": "en",
            "measurement_system": "metric",
            "subcatalog": {
                "id": "sca-e61f3a731f2544489cfdb0e8cd2943ca",
                "discriminator": "subcatalog_reference"
            },
            "position": 5,
            "settings": {
                "delivered_duty": {
                    "default": "paid",
                    "available": [
                        "paid"
                    ],
                    "display": "single"
                },
                "pricing_settings": {
                    "editable": true,
                    "default_tax_display": "ignored",
                    "default_duty_display": "ignored"
                },
                "logistics_settings": {
                    "shipping_configuration": {
                        "key": "default"
                    }
                },
                "checkout_settings": {
                    "configuration": {
                        "id": "chc-82a8425a113d4c7fa83a444f69643c29"
                    }
                }
            },
            "status": "active",
            "discriminator": "experience"
        },
        "submitted_at": "2021-09-25T17:20:49.908Z",
        "lines": [
            {
                "item_number": "39286648275017",
                "quantity": 1,
                "price": {
                    "currency": "CAD",
                    "amount": 301.95,
                    "label": "CA$301.95",
                    "base": {
                        "amount": 230.03,
                        "currency": "USD",
                        "label": "US$230.03"
                    }
                },
                "total": {
                    "currency": "CAD",
                    "amount": 301.95,
                    "label": "CA$301.95",
                    "base": {
                        "amount": 230.03,
                        "currency": "USD",
                        "label": "US$230.03"
                    }
                },
                "id": "lin-4f4e64b169524d138b09f37d11e4f5b3",
                "attributes": {}
            },
            {
                "item_number": "39286628089929",
                "quantity": 1,
                "price": {
                    "currency": "CAD",
                    "amount": 196.95,
                    "label": "CA$196.95",
                    "base": {
                        "amount": 150.04,
                        "currency": "USD",
                        "label": "US$150.04"
                    }
                },
                "total": {
                    "currency": "CAD",
                    "amount": 196.95,
                    "label": "CA$196.95",
                    "base": {
                        "amount": 150.04,
                        "currency": "USD",
                        "label": "US$150.04"
                    }
                },
                "id": "lin-c35f1dec738b469e91821239195f24cd",
                "attributes": {}
            }
        ],
        "promotions": {
            "applied": [],
            "available": []
        },
        "payments": [
            {
                "id": "opm-d83486b740e84a1e9c41e39bf08faf9b",
                "type": "card",
                "merchant_of_record": "flow",
                "reference": "aut-u1N14apZ84C7luKtv0eFdO91fe0zZhrB",
                "description": "VISA ending with 8367",
                "total": {
                    "currency": "CAD",
                    "amount": 55.58,
                    "label": "CA$55.58",
                    "base": {
                        "amount": 42.33,
                        "currency": "USD",
                        "label": "US$42.33"
                    }
                },
                "attributes": {},
                "address": {
                    "name": {
                        "first": "Brad",
                        "last": "Redding"
                    },
                    "streets": [
                        "1059 Hills Plantation Drive"
                    ],
                    "city": "Charleston",
                    "province": "South Carolina",
                    "postal": "29412",
                    "country": "USA"
                },
                "date": "2021-09-25T17:20:38.113Z",
                "method": "visa"
            }
        ],
        "balance": {
            "currency": "CAD",
            "amount": 0,
            "label": "CA$0.00",
            "base": {
                "amount": 0,
                "currency": "USD",
                "label": "US$0.00"
            },
            "key": "localized_total"
        },
        "geo": {
            "country": "CAN",
            "ip": "52.20.111.28",
            "currency": "CAD",
            "language": "en"
        },
        "discriminator": "order"
    },
    "content": {
        "itemContents": [
            {
                "item": {
                    "id": "cit-70dfaa0ccd4f402489cdd6d5d18e0862",
                    "number": "39286648275017",
                    "locale": "en-US",
                    "name": "Women's TechLoom Tracer Almond / Pristine / Leopard - ALMOND / PRISTINE / LEOPARD / 6",
                    "price": {
                        "amount": 230,
                        "currency": "USD",
                        "label": "US$230.00"
                    },
                    "categories": [
                        "Color: Beige",
                        "Color: Prints",
                        "Footwear: TechLoom Tracer",
                        "Gender: Women",
                        "PF21",
                        "Size: 10",
                        "Size: 11",
                        "Size: 5",
                        "Size: 6",
                        "Size: 7",
                        "Size: 8",
                        "Size: 9",
                        "Type: Training",
                        "YGroup_womens-tracer",
                        "FOOTWEAR - WOMEN'S"
                    ],
                    "attributes": {
                        "weight": "2.44",
                        "display_variant_title": "ALMOND / PRISTINE / LEOPARD / 6",
                        "url": "https://www.athleticpropulsionlabs.com/products/womens-techloom-tracer-almond-pristine-leopard?variant=39286648275017",
                        "option1": "ALMOND / PRISTINE / LEOPARD",
                        "weight_unit": "lb",
                        "product_handle": "womens-techloom-tracer-almond-pristine-leopard",
                        "product_type": "FOOTWEAR - WOMEN'S",
                        "fulfillment_service": "manual",
                        "taxable": "true",
                        "product_id": "6562276474953",
                        "option2": "6",
                        "vendor": "Athletic Propulsion Labs",
                        "inventory_policy": "deny",
                        "sku": "840222800640",
                        "source": "shopify",
                        "barcode": "840222800640",
                        "inventory_management": "shopify",
                        "product_title": "Women's TechLoom Tracer Almond / Pristine / Leopard",
                        "requires_shipping": "true",
                        "variant_title": "ALMOND / PRISTINE / LEOPARD / 6",
                        "grams": "1107.0",
                        "fulfillment_method": "physical"
                    },
                    "dimensions": {
                        "product": {
                            "weight": {
                                "value": "2.44",
                                "units": "pound"
                            }
                        }
                    },
                    "images": [
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/techloomtracer-almond-pristine-leopard-1_b83d0a55-9390-4501-bb54-c5534b03f85f.jpg?v=1623179383",
                            "tags": [],
                            "attributes": {
                                "position": "1"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/techloomtracer-almond-pristine-leopard-2_8fdfa098-de63-4abc-bcc7-6fde17a6cc1d.jpg?v=1623179385",
                            "tags": [],
                            "attributes": {
                                "position": "2"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/techloomtracer-almond-pristine-leopard-3_4ae9ae5d-0c99-4670-b164-d25aa4c33a8f.jpg?v=1623179388",
                            "tags": [],
                            "attributes": {
                                "position": "3"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/techloomtracer-almond-pristine-leopard-4_c22f7a3e-6d03-47db-b44c-f4b8ad551fc5.jpg?v=1623179391",
                            "tags": [],
                            "attributes": {
                                "position": "4"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/techloomtracer-almond-pristine-leopard-5_4e34abce-9e7f-4aa3-b88e-4302ea8d05d9.jpg?v=1623179394",
                            "tags": [],
                            "attributes": {
                                "position": "5"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/techloomtracer-almond-pristine-leopard-6_70dbf7ce-9459-4485-a2fe-fefa5843b5e3.jpg?v=1623179396",
                            "tags": [],
                            "attributes": {
                                "position": "6"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/techloomtracer-almond-pristine-leopard-1_b83d0a55-9390-4501-bb54-c5534b03f85f_100x100.jpg?v=1623179383",
                            "tags": [
                                "thumbnail",
                                "checkout"
                            ],
                            "attributes": {
                                "position": "1"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/techloomtracer-almond-pristine-leopard-2_8fdfa098-de63-4abc-bcc7-6fde17a6cc1d_100x100.jpg?v=1623179385",
                            "tags": [
                                "thumbnail",
                                "checkout"
                            ],
                            "attributes": {
                                "position": "2"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/techloomtracer-almond-pristine-leopard-3_4ae9ae5d-0c99-4670-b164-d25aa4c33a8f_100x100.jpg?v=1623179388",
                            "tags": [
                                "thumbnail",
                                "checkout"
                            ],
                            "attributes": {
                                "position": "3"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/techloomtracer-almond-pristine-leopard-4_c22f7a3e-6d03-47db-b44c-f4b8ad551fc5_100x100.jpg?v=1623179391",
                            "tags": [
                                "thumbnail",
                                "checkout"
                            ],
                            "attributes": {
                                "position": "4"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/techloomtracer-almond-pristine-leopard-5_4e34abce-9e7f-4aa3-b88e-4302ea8d05d9_100x100.jpg?v=1623179394",
                            "tags": [
                                "thumbnail",
                                "checkout"
                            ],
                            "attributes": {
                                "position": "5"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/techloomtracer-almond-pristine-leopard-6_70dbf7ce-9459-4485-a2fe-fefa5843b5e3_100x100.jpg?v=1623179396",
                            "tags": [
                                "thumbnail",
                                "checkout"
                            ],
                            "attributes": {
                                "position": "6"
                            }
                        }
                    ],
                    "description": "The TechLoom Tracer is APL’s newest entry into training. Our first low top training shoe is designed and engineered with your workout in mind. Aptly named for its performance design, the TechLoom Tracer uses familiar materials from the APL product line but updates them in a modern, performance driven way. To provide exceptional comfort around the ankle we have developed a new molded lycra collar and tongue that allows for easy ingress and egress with a smooth, sculpted heel to offer full range of motion. The TechLoom forefoot is a non-stretch construction to keep your foot centered on the footbed and provide maximum lateral stability. The newly developed lacing system limits lace-loosening during workouts to keep you locked in to perform your best. The Propelium® midsole provides great, low profile cushioning and rebound, with rubber traction pads placed in key high wear areas for durability. Great for every workout intensity, you can be confident the TechLoom Tracer will put up with everything you can throw at it. 8mm drop. Wt. 7.1oz.<br><br><strong>All of our shoes are unisex. If your size is sold out, simply select a men's size on the site and adjust the fit down by a size and half. For example, a size 9 in women's is a size 7.5 in men’s.</strong>",
                    "local": {
                        "experience": {
                            "id": "exp-200711849fc74ef4b7a83833c29f6aab",
                            "key": "canada",
                            "name": "Canada",
                            "country": "CAN",
                            "currency": "CAD",
                            "language": "en"
                        },
                        "prices": [
                            {
                                "currency": "CAD",
                                "amount": 301.95,
                                "label": "CA$301.95",
                                "base": {
                                    "amount": 230.03,
                                    "currency": "USD",
                                    "label": "US$230.03"
                                },
                                "includes": {
                                    "key": "none",
                                    "label": "HST and duty not included"
                                },
                                "key": "localized_item_price"
                            },
                            {
                                "currency": "CAD",
                                "amount": 53.45,
                                "label": "CA$53.45",
                                "base": {
                                    "amount": 40.72,
                                    "currency": "USD",
                                    "label": "US$40.72"
                                },
                                "name": "HST",
                                "accuracy": "calculated",
                                "key": "localized_item_vat"
                            },
                            {
                                "currency": "CAD",
                                "amount": 54.35,
                                "label": "CA$54.35",
                                "base": {
                                    "amount": 41.41,
                                    "currency": "USD",
                                    "label": "US$41.41"
                                },
                                "key": "localized_item_duty"
                            }
                        ],
                        "rates": [],
                        "spot_rates": [],
                        "status": "included",
                        "attributes": {
                            "weight": "2.44",
                            "display_variant_title": "ALMOND / PRISTINE / LEOPARD / 6",
                            "url": "https://www.athleticpropulsionlabs.com/products/womens-techloom-tracer-almond-pristine-leopard?variant=39286648275017",
                            "option1": "ALMOND / PRISTINE / LEOPARD",
                            "weight_unit": "lb",
                            "product_handle": "womens-techloom-tracer-almond-pristine-leopard",
                            "product_type": "FOOTWEAR - WOMEN'S",
                            "fulfillment_service": "manual",
                            "taxable": "true",
                            "product_id": "6562276474953",
                            "option2": "6",
                            "vendor": "Athletic Propulsion Labs",
                            "inventory_policy": "deny",
                            "sku": "840222800640",
                            "source": "shopify",
                            "barcode": "840222800640",
                            "inventory_management": "shopify",
                            "product_title": "Women's TechLoom Tracer Almond / Pristine / Leopard",
                            "requires_shipping": "true",
                            "variant_title": "ALMOND / PRISTINE / LEOPARD / 6",
                            "grams": "1107.0",
                            "fulfillment_method": "physical"
                        },
                        "price_attributes": {}
                    }
                },
                "name": "Women's TechLoom Tracer Almond / Pristine / Leopard - ALMOND / PRISTINE / LEOPARD / 6",
                "attributes": [],
                "description": "The TechLoom Tracer is APL’s newest entry into training. Our first low top training shoe is designed and engineered with your workout in mind. Aptly named for its performance design, the TechLoom Tracer uses familiar materials from the APL product line but updates them in a modern, performance driven way. To provide exceptional comfort around the ankle we have developed a new molded lycra collar and tongue that allows for easy ingress and egress with a smooth, sculpted heel to offer full range of motion. The TechLoom forefoot is a non-stretch construction to keep your foot centered on the footbed and provide maximum lateral stability. The newly developed lacing system limits lace-loosening during workouts to keep you locked in to perform your best. The Propelium® midsole provides great, low profile cushioning and rebound, with rubber traction pads placed in key high wear areas for durability. Great for every workout intensity, you can be confident the TechLoom Tracer will put up with everything you can throw at it. 8mm drop. Wt. 7.1oz.<br><br><strong>All of our shoes are unisex. If your size is sold out, simply select a men's size on the site and adjust the fit down by a size and half. For example, a size 9 in women's is a size 7.5 in men’s.</strong>",
                "image": {
                    "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/techloomtracer-almond-pristine-leopard-1_b83d0a55-9390-4501-bb54-c5534b03f85f_100x100.jpg?v=1623179383",
                    "tags": [
                        "thumbnail",
                        "checkout"
                    ],
                    "attributes": {
                        "position": "1"
                    }
                }
            },
            {
                "item": {
                    "id": "cit-db172a1ddfb04951a6250822734146fd",
                    "number": "39286628089929",
                    "locale": "en-US",
                    "name": "Women's Iconic Slide Deep Brown / White / Cow - DEEP BROWN / WHITE / COW / 8",
                    "price": {
                        "amount": 150,
                        "currency": "USD",
                        "label": "US$150.00"
                    },
                    "categories": [
                        "Color: Beige",
                        "Color: Prints",
                        "Color: White",
                        "FA21",
                        "Footwear: Slide",
                        "Gender: Women",
                        "PF21",
                        "Size: 10",
                        "Size: 11",
                        "Size: 5",
                        "Size: 6",
                        "Size: 7",
                        "Size: 8",
                        "Size: 9",
                        "Type: Slide",
                        "YGroup_womens-ichs",
                        "FOOTWEAR - WOMEN'S"
                    ],
                    "attributes": {
                        "weight": "1.77",
                        "display_variant_title": "DEEP BROWN / WHITE / COW / 8",
                        "url": "https://www.athleticpropulsionlabs.com/products/womens-iconic-slide-deep-brown-white-cow?variant=39286628089929",
                        "option1": "DEEP BROWN / WHITE / COW",
                        "weight_unit": "lb",
                        "product_handle": "womens-iconic-slide-deep-brown-white-cow",
                        "product_type": "FOOTWEAR - WOMEN'S",
                        "fulfillment_service": "manual",
                        "taxable": "true",
                        "product_id": "6562273984585",
                        "option2": "8",
                        "vendor": "Athletic Propulsion Labs",
                        "inventory_policy": "deny",
                        "sku": "840222802514",
                        "source": "shopify",
                        "barcode": "840222802514",
                        "inventory_management": "shopify",
                        "product_title": "Women's Iconic Slide Deep Brown / White / Cow",
                        "requires_shipping": "true",
                        "variant_title": "DEEP BROWN / WHITE / COW / 8",
                        "grams": "803.0",
                        "fulfillment_method": "physical"
                    },
                    "dimensions": {
                        "product": {
                            "weight": {
                                "value": "1.77",
                                "units": "pound"
                            }
                        }
                    },
                    "images": [
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/iconicslide-deepbrown-white-cow-5.jpg?v=1622664776",
                            "tags": [],
                            "attributes": {
                                "position": "1"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/iconicslide-deepbrown-white-cow-1.jpg?v=1622664779",
                            "tags": [],
                            "attributes": {
                                "position": "2"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/iconicslide-deepbrown-white-cow-2.jpg?v=1622664781",
                            "tags": [],
                            "attributes": {
                                "position": "3"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/iconicslide-deepbrown-white-cow-3.jpg?v=1622664783",
                            "tags": [],
                            "attributes": {
                                "position": "4"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/iconicslide-deepbrown-white-cow-4.jpg?v=1622664786",
                            "tags": [],
                            "attributes": {
                                "position": "5"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/iconicslide-deepbrown-white-cow-6.jpg?v=1622664790",
                            "tags": [],
                            "attributes": {
                                "position": "6"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/iconicslide-deepbrown-white-cow-5_100x100.jpg?v=1622664776",
                            "tags": [
                                "thumbnail",
                                "checkout"
                            ],
                            "attributes": {
                                "position": "1"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/iconicslide-deepbrown-white-cow-1_100x100.jpg?v=1622664779",
                            "tags": [
                                "thumbnail",
                                "checkout"
                            ],
                            "attributes": {
                                "position": "2"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/iconicslide-deepbrown-white-cow-2_100x100.jpg?v=1622664781",
                            "tags": [
                                "thumbnail",
                                "checkout"
                            ],
                            "attributes": {
                                "position": "3"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/iconicslide-deepbrown-white-cow-3_100x100.jpg?v=1622664783",
                            "tags": [
                                "thumbnail",
                                "checkout"
                            ],
                            "attributes": {
                                "position": "4"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/iconicslide-deepbrown-white-cow-4_100x100.jpg?v=1622664786",
                            "tags": [
                                "thumbnail",
                                "checkout"
                            ],
                            "attributes": {
                                "position": "5"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/iconicslide-deepbrown-white-cow-6_100x100.jpg?v=1622664790",
                            "tags": [
                                "thumbnail",
                                "checkout"
                            ],
                            "attributes": {
                                "position": "6"
                            }
                        }
                    ],
                    "description": "<p>The Iconic Calf Hair Slide offers the same great comfort you know and love, now with a fashionable leather strap. Featuring a dyed, real fur cowhide upper there is a print or pattern to fit your every need. The antimicrobial mesh covers a 3D molded footbed that massages your feet with every step. The newly developed midsole/outsole uses our tried and true Propelium® compound offering the same great cushioning and rebound from the running shoes you love. Whether you want to recover after a great workout or give your feet a break from a long day of errands, the APL Iconic Calf Hair Slide has everything you need to relax in style. Wt. 4.0 oz.</p>\n<p><br><strong>All of our slides are unisex. If your size is sold out, simply select a men's size on the site and adjust the fit down by a size and half. For example, a size 9 in women's is a size 7.5 in men’s.</strong></p>",
                    "local": {
                        "experience": {
                            "id": "exp-200711849fc74ef4b7a83833c29f6aab",
                            "key": "canada",
                            "name": "Canada",
                            "country": "CAN",
                            "currency": "CAD",
                            "language": "en"
                        },
                        "prices": [
                            {
                                "currency": "CAD",
                                "amount": 196.95,
                                "label": "CA$196.95",
                                "base": {
                                    "amount": 150.04,
                                    "currency": "USD",
                                    "label": "US$150.04"
                                },
                                "includes": {
                                    "key": "none",
                                    "label": "HST and duty not included"
                                },
                                "key": "localized_item_price"
                            },
                            {
                                "currency": "CAD",
                                "amount": 34.87,
                                "label": "CA$34.87",
                                "base": {
                                    "amount": 26.56,
                                    "currency": "USD",
                                    "label": "US$26.56"
                                },
                                "name": "HST",
                                "accuracy": "calculated",
                                "key": "localized_item_vat"
                            },
                            {
                                "currency": "CAD",
                                "amount": 35.45,
                                "label": "CA$35.45",
                                "base": {
                                    "amount": 27.01,
                                    "currency": "USD",
                                    "label": "US$27.01"
                                },
                                "key": "localized_item_duty"
                            }
                        ],
                        "rates": [],
                        "spot_rates": [],
                        "status": "included",
                        "attributes": {
                            "weight": "1.77",
                            "display_variant_title": "DEEP BROWN / WHITE / COW / 8",
                            "url": "https://www.athleticpropulsionlabs.com/products/womens-iconic-slide-deep-brown-white-cow?variant=39286628089929",
                            "option1": "DEEP BROWN / WHITE / COW",
                            "weight_unit": "lb",
                            "product_handle": "womens-iconic-slide-deep-brown-white-cow",
                            "product_type": "FOOTWEAR - WOMEN'S",
                            "fulfillment_service": "manual",
                            "taxable": "true",
                            "product_id": "6562273984585",
                            "option2": "8",
                            "vendor": "Athletic Propulsion Labs",
                            "inventory_policy": "deny",
                            "sku": "840222802514",
                            "source": "shopify",
                            "barcode": "840222802514",
                            "inventory_management": "shopify",
                            "product_title": "Women's Iconic Slide Deep Brown / White / Cow",
                            "requires_shipping": "true",
                            "variant_title": "DEEP BROWN / WHITE / COW / 8",
                            "grams": "803.0",
                            "fulfillment_method": "physical"
                        },
                        "price_attributes": {}
                    }
                },
                "name": "Women's Iconic Slide Deep Brown / White / Cow - DEEP BROWN / WHITE / COW / 8",
                "attributes": [],
                "description": "<p>The Iconic Calf Hair Slide offers the same great comfort you know and love, now with a fashionable leather strap. Featuring a dyed, real fur cowhide upper there is a print or pattern to fit your every need. The antimicrobial mesh covers a 3D molded footbed that massages your feet with every step. The newly developed midsole/outsole uses our tried and true Propelium® compound offering the same great cushioning and rebound from the running shoes you love. Whether you want to recover after a great workout or give your feet a break from a long day of errands, the APL Iconic Calf Hair Slide has everything you need to relax in style. Wt. 4.0 oz.</p>\n<p><br><strong>All of our slides are unisex. If your size is sold out, simply select a men's size on the site and adjust the fit down by a size and half. For example, a size 9 in women's is a size 7.5 in men’s.</strong></p>",
                "image": {
                    "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/iconicslide-deepbrown-white-cow-5_100x100.jpg?v=1622664776",
                    "tags": [
                        "thumbnail",
                        "checkout"
                    ],
                    "attributes": {
                        "position": "1"
                    }
                }
            }
        ]
    },
    "appVersion": {
        "family": "legacy",
        "stage": "release"
    }
}

pushDLPurchase(data);
console.log(dataLayer)