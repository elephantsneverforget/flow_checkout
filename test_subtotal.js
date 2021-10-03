var USE_BASE_CURRENCY = true
var window = {};
window.dataLayer = [];
function pushDLPurchase(data) {
    // var productList = getProductsInCart(data);
    window.dataLayer.push({
        'event': 'dl_purchase',
        // 'event_id': generateEventID(),
        // 'user_properties': getUserProperties(data),
        'ecommerce': {
            'purchase': {
                'actionField': {
                    'action': "purchase",
                    'affiliation': data.organization,
                    'id': data.order['number'],
                    // This is the order number that shows up in Shopify on the orders list page,
                    'order_name': data.order['number'],
                    'discount_amount': getValue('discount', data),
                    'revenue': USE_BASE_CURRENCY ? data.order.total.base.amount : data.order.total.amount,
                    'shipping': getValue('shipping', data),
                    'sub_total': getSubtotal(data),
                    'tax': getValue('vat', data) + getValue('duty', data),
                },
                // 'products': productList
            },
            'currencyCode': USE_BASE_CURRENCY ? data.order.total.base.currency : data.order.total.currency,
        },
    });
    console.log(window.dataLayer);
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
        "id": "ord-3758c7c8ac0e4895a054d2da9b8cb346",
        "number": "F474679",
        "order_type": "standard",
        "customer": {
            "name": {
                "first": "Jonathan",
                "last": "Cairo"
            },
            "phone": "7809510883",
            "email": "jonathan@getelevar.com",
            "address": {
                "name": {},
                "country": "CAN"
            }
        },
        "delivered_duty": "paid",
        "destination": {
            "streets": [
                "1 - 2560 Pegasus Boulevard NW"
            ],
            "city": "Edmonton",
            "province": "Alberta",
            "postal": "T5E6V4",
            "country": "CAN",
            "contact": {
                "name": {
                    "first": "Jonathan",
                    "last": "Cairo"
                },
                "email": "jonathan@getelevar.com",
                "phone": "7809510883"
            }
        },
        "expires_at": "2021-10-03T21:50:49.924Z",
        "items": [
            {
                "number": "39286585131081",
                "name": "Men's Iconic Slide Deep Brown / White / Cow - DEEP BROWN / WHITE / COW / 9",
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
                                "amount": 149.96,
                                "currency": "USD",
                                "label": "US$149.96"
                            },
                            "includes": {
                                "key": "none",
                                "label": "GST and duty not included"
                            },
                            "key": "localized_item_price"
                        },
                        {
                            "currency": "CAD",
                            "amount": 11.62,
                            "label": "CA$11.62",
                            "base": {
                                "amount": 8.85,
                                "currency": "USD",
                                "label": "US$8.85"
                            },
                            "name": "GST",
                            "accuracy": "calculated",
                            "key": "localized_item_vat"
                        },
                        {
                            "currency": "CAD",
                            "amount": 35.45,
                            "label": "CA$35.45",
                            "base": {
                                "amount": 26.99,
                                "currency": "USD",
                                "label": "US$26.99"
                            },
                            "key": "localized_item_duty"
                        }
                    ],
                    "rates": [],
                    "spot_rates": [],
                    "status": "included",
                    "attributes": {
                        "weight": "1.77",
                        "display_variant_title": "DEEP BROWN / WHITE / COW / 9",
                        "url": "https://www.athleticpropulsionlabs.com/products/mens-iconic-slide-deep-brown-white-cow?variant=39286585131081",
                        "option1": "DEEP BROWN / WHITE / COW",
                        "weight_unit": "lb",
                        "product_handle": "mens-iconic-slide-deep-brown-white-cow",
                        "product_type": "FOOTWEAR - MEN'S",
                        "fulfillment_service": "manual",
                        "taxable": "true",
                        "product_id": "6562263629897",
                        "option2": "9",
                        "vendor": "Athletic Propulsion Labs",
                        "inventory_policy": "deny",
                        "sku": "840222810113",
                        "source": "shopify",
                        "barcode": "840222810113",
                        "inventory_management": "shopify",
                        "product_title": "Men's Iconic Slide Deep Brown / White / Cow",
                        "requires_shipping": "true",
                        "variant_title": "DEEP BROWN / WHITE / COW / 9",
                        "grams": "803.0",
                        "fulfillment_method": "physical"
                    },
                    "price_attributes": {}
                },
                "id": "lin-e3ce99719c724f0dabd02a244ecc995a",
                "attributes": {},
                "price_source": {
                    "price": {
                        "amount": 150,
                        "currency": "USD"
                    },
                    "discriminator": "catalog"
                }
            },
            {
                "number": "39286585819209",
                "name": "Men's Lusso Slide Neon Peach - NEON PEACH / 10",
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
                            "amount": 229.95,
                            "label": "CA$229.95",
                            "base": {
                                "amount": 175.08,
                                "currency": "USD",
                                "label": "US$175.08"
                            },
                            "includes": {
                                "key": "none",
                                "label": "GST and duty not included"
                            },
                            "key": "localized_item_price"
                        },
                        {
                            "currency": "CAD",
                            "amount": 13.57,
                            "label": "CA$13.57",
                            "base": {
                                "amount": 10.34,
                                "currency": "USD",
                                "label": "US$10.34"
                            },
                            "name": "GST",
                            "accuracy": "calculated",
                            "key": "localized_item_vat"
                        },
                        {
                            "currency": "CAD",
                            "amount": 41.39,
                            "label": "CA$41.39",
                            "base": {
                                "amount": 31.52,
                                "currency": "USD",
                                "label": "US$31.52"
                            },
                            "key": "localized_item_duty"
                        }
                    ],
                    "rates": [],
                    "spot_rates": [],
                    "status": "included",
                    "attributes": {
                        "weight": "2.77",
                        "display_variant_title": "NEON PEACH / 10",
                        "url": "https://www.athleticpropulsionlabs.com/products/mens-lusso-slide-neon-peach?variant=39286585819209",
                        "option1": "NEON PEACH",
                        "weight_unit": "lb",
                        "product_handle": "mens-lusso-slide-neon-peach",
                        "product_type": "FOOTWEAR - MEN'S",
                        "fulfillment_service": "manual",
                        "taxable": "true",
                        "product_id": "6562263826505",
                        "option2": "10",
                        "vendor": "Athletic Propulsion Labs",
                        "inventory_policy": "deny",
                        "sku": "840222810045",
                        "source": "shopify",
                        "barcode": "840222810045",
                        "inventory_management": "shopify",
                        "product_title": "Men's Lusso Slide Neon Peach",
                        "requires_shipping": "true",
                        "variant_title": "NEON PEACH / 10",
                        "grams": "1256.0",
                        "fulfillment_method": "physical"
                    },
                    "price_attributes": {}
                },
                "id": "lin-9fa423f65dbc4c24a5b2aa5179ab9450",
                "attributes": {},
                "price_source": {
                    "price": {
                        "amount": 175,
                        "currency": "USD"
                    },
                    "discriminator": "catalog"
                }
            }
        ],
        "deliveries": [
            {
                "id": "del-f042982bcc8a4249adc75a51115c1c06",
                "items": [
                    {
                        "number": "39286585131081",
                        "quantity": 1,
                        "price": {
                            "currency": "CAD",
                            "amount": 196.95,
                            "base": {
                                "amount": 149.96,
                                "currency": "USD"
                            }
                        },
                        "attributes": {
                            "eur_price": "134.19"
                        },
                        "line_number": 0
                    },
                    {
                        "number": "39286585819209",
                        "quantity": 1,
                        "price": {
                            "currency": "CAD",
                            "amount": 229.95,
                            "base": {
                                "amount": 175.08,
                                "currency": "USD"
                            }
                        },
                        "attributes": {
                            "eur_price": "156.68"
                        },
                        "line_number": 1
                    }
                ],
                "options": [
                    {
                        "id": "opt-a01ab186cc74403ea86ce92e07c3eb94",
                        "cost": {
                            "currency": "CAD",
                            "amount": 27.65,
                            "label": "CA$27.65",
                            "base": {
                                "amount": 21.053,
                                "currency": "USD",
                                "label": "US$21.05"
                            },
                            "details": [
                                {
                                    "source": "ratecard",
                                    "currency": "CAD",
                                    "amount": 27.65,
                                    "label": "CA$27.65",
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
                                            "amount": 24.6,
                                            "label": "CA$24.60",
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
                            "amount": 27.65,
                            "label": "CA$27.65",
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
                            "from": "2021-10-06T00:00:00.000Z",
                            "to": "2021-10-11T00:00:00.000Z",
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
                "key": "F474679",
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
                        "amount": 426.9,
                        "label": "CA$426.90",
                        "base": {
                            "amount": 325.04,
                            "currency": "USD",
                            "label": "US$325.04"
                        },
                        "components": [
                            {
                                "key": "item_price",
                                "currency": "CAD",
                                "amount": 426.84,
                                "label": "CA$426.84",
                                "base": {
                                    "amount": 325,
                                    "currency": "USD",
                                    "label": "US$325.00"
                                },
                                "name": "Item price"
                            },
                            {
                                "key": "rounding",
                                "currency": "CAD",
                                "amount": 0.06,
                                "label": "CA$0.06",
                                "base": {
                                    "amount": 0.04,
                                    "currency": "USD",
                                    "label": "US$0.04"
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
                        "amount": 27.65,
                        "label": "CA$27.65",
                        "base": {
                            "amount": 21.05,
                            "currency": "USD",
                            "label": "US$21.05"
                        },
                        "components": [
                            {
                                "key": "shipping",
                                "currency": "CAD",
                                "amount": 27.65,
                                "label": "CA$27.65",
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
                        "key": "duty",
                        "currency": "CAD",
                        "amount": 76.84,
                        "label": "CA$76.84",
                        "base": {
                            "amount": 58.51,
                            "currency": "USD",
                            "label": "US$58.51"
                        },
                        "components": [
                            {
                                "key": "duties_item_price",
                                "currency": "CAD",
                                "amount": 76.84,
                                "label": "CA$76.84",
                                "base": {
                                    "amount": 58.51,
                                    "currency": "USD",
                                    "label": "US$58.51"
                                },
                                "name": "Duties on item price"
                            }
                        ],
                        "accuracy": "calculated",
                        "name": "Duties"
                    },
                    {
                        "key": "vat",
                        "currency": "CAD",
                        "amount": 25.19,
                        "label": "CA$25.19",
                        "base": {
                            "amount": 19.19,
                            "currency": "USD",
                            "label": "US$19.19"
                        },
                        "components": [
                            {
                                "key": "vat_item_price",
                                "currency": "CAD",
                                "amount": 21.35,
                                "label": "CA$21.35",
                                "base": {
                                    "amount": 16.26,
                                    "currency": "USD",
                                    "label": "US$16.26"
                                },
                                "name": "GST on item price"
                            },
                            {
                                "key": "vat_duties_item_price",
                                "currency": "CAD",
                                "amount": 3.84,
                                "label": "CA$3.84",
                                "base": {
                                    "amount": 2.93,
                                    "currency": "USD",
                                    "label": "US$2.93"
                                },
                                "name": "GST on duties on item price"
                            }
                        ],
                        "accuracy": "calculated",
                        "name": "GST"
                    }
                ],
                "total": {
                    "currency": "CAD",
                    "amount": 556.58,
                    "label": "CA$556.58",
                    "base": {
                        "amount": 423.79,
                        "currency": "USD",
                        "label": "US$423.79"
                    },
                    "key": "localized_total"
                },
                "goods_supply": "export",
                "merchant_of_record_flow_entity": "flow-usa",
                "discriminator": "physical_delivery"
            }
        ],
        "selections": [
            "opt-a01ab186cc74403ea86ce92e07c3eb94"
        ],
        "prices": [
            {
                "key": "subtotal",
                "currency": "CAD",
                "amount": 426.9,
                "label": "CA$426.90",
                "base": {
                    "amount": 325.04,
                    "currency": "USD",
                    "label": "US$325.04"
                },
                "components": [
                    {
                        "key": "item_price",
                        "currency": "CAD",
                        "amount": 426.84,
                        "label": "CA$426.84",
                        "base": {
                            "amount": 325,
                            "currency": "USD",
                            "label": "US$325.00"
                        },
                        "name": "Item price"
                    },
                    {
                        "key": "rounding",
                        "currency": "CAD",
                        "amount": 0.06,
                        "label": "CA$0.06",
                        "base": {
                            "amount": 0.04,
                            "currency": "USD",
                            "label": "US$0.04"
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
                "amount": 27.65,
                "label": "CA$27.65",
                "base": {
                    "amount": 21.05,
                    "currency": "USD",
                    "label": "US$21.05"
                },
                "components": [
                    {
                        "key": "shipping",
                        "currency": "CAD",
                        "amount": 27.65,
                        "label": "CA$27.65",
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
                "key": "duty",
                "currency": "CAD",
                "amount": 76.84,
                "label": "CA$76.84",
                "base": {
                    "amount": 58.51,
                    "currency": "USD",
                    "label": "US$58.51"
                },
                "components": [
                    {
                        "key": "duties_item_price",
                        "currency": "CAD",
                        "amount": 76.84,
                        "label": "CA$76.84",
                        "base": {
                            "amount": 58.51,
                            "currency": "USD",
                            "label": "US$58.51"
                        },
                        "name": "Duties on item price"
                    }
                ],
                "accuracy": "calculated",
                "name": "Duties"
            },
            {
                "key": "vat",
                "currency": "CAD",
                "amount": 25.19,
                "label": "CA$25.19",
                "base": {
                    "amount": 19.19,
                    "currency": "USD",
                    "label": "US$19.19"
                },
                "components": [
                    {
                        "key": "vat_item_price",
                        "currency": "CAD",
                        "amount": 21.35,
                        "label": "CA$21.35",
                        "base": {
                            "amount": 16.26,
                            "currency": "USD",
                            "label": "US$16.26"
                        },
                        "name": "GST on item price"
                    },
                    {
                        "key": "vat_duties_item_price",
                        "currency": "CAD",
                        "amount": 3.84,
                        "label": "CA$3.84",
                        "base": {
                            "amount": 2.93,
                            "currency": "USD",
                            "label": "US$2.93"
                        },
                        "name": "GST on duties on item price"
                    }
                ],
                "accuracy": "calculated",
                "name": "GST"
            }
        ],
        "total": {
            "currency": "CAD",
            "amount": 556.58,
            "label": "CA$556.58",
            "base": {
                "amount": 423.79,
                "currency": "USD",
                "label": "US$423.79"
            },
            "key": "localized_total"
        },
        "attributes": {
            "pricing_key": "{\"vat\":\"displayed\",\"duty\":\"displayed\",\"rounding\":{\"type\":\"pattern\",\"method\":\"nearest\",\"value\":0.95}}",
            "_elevar_visitor_info": "{\"gclid\":\"CjwKCAjw-sqKBhBjEiwAVaQ9a_unMpWZ4g1Gb9YvQBlZUjWSsNGLk9VIHPuU-l-YKp8UW7xfizsczxoCPZAQAvD_BwE\"}",
            "flow-policies": "true",
            "flow_vat_name": "GST",
            "_elevar__fbp": "fb.1.1632766375838.1737975042",
            "flow_duty_name": "Duties",
            "flow_checkout_behavior_customer_email_prompt": "incomplete",
            "flow_checkout_behavior_shipping_method_prompt": "multiple",
            "flow_checkout_behavior_shipping_address_prompt": "incomplete",
            "checkout-persistence": "true",
            "_elevar__ga": "GA1.1.296871498.1632575388"
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
            "position": 6,
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
        "submitted_at": "2021-10-03T20:50:50.563Z",
        "lines": [
            {
                "item_number": "39286585131081",
                "quantity": 1,
                "price": {
                    "currency": "CAD",
                    "amount": 196.95,
                    "label": "CA$196.95",
                    "base": {
                        "amount": 149.96,
                        "currency": "USD",
                        "label": "US$149.96"
                    }
                },
                "total": {
                    "currency": "CAD",
                    "amount": 196.95,
                    "label": "CA$196.95",
                    "base": {
                        "amount": 149.96,
                        "currency": "USD",
                        "label": "US$149.96"
                    }
                },
                "id": "lin-e3ce99719c724f0dabd02a244ecc995a",
                "attributes": {}
            },
            {
                "item_number": "39286585819209",
                "quantity": 1,
                "price": {
                    "currency": "CAD",
                    "amount": 229.95,
                    "label": "CA$229.95",
                    "base": {
                        "amount": 175.08,
                        "currency": "USD",
                        "label": "US$175.08"
                    }
                },
                "total": {
                    "currency": "CAD",
                    "amount": 229.95,
                    "label": "CA$229.95",
                    "base": {
                        "amount": 175.08,
                        "currency": "USD",
                        "label": "US$175.08"
                    }
                },
                "id": "lin-9fa423f65dbc4c24a5b2aa5179ab9450",
                "attributes": {}
            }
        ],
        "promotions": {
            "applied": [],
            "available": []
        },
        "payments": [
            {
                "id": "opm-7b1fc7ad0ec545aea48727f53db55235",
                "type": "card",
                "merchant_of_record": "flow",
                "reference": "aut-mRtuK5kRYw7wlIcpksYsxqXcfdZvOh0P",
                "description": "VISA ending with 8367",
                "total": {
                    "currency": "CAD",
                    "amount": 556.58,
                    "label": "CA$556.58",
                    "base": {
                        "amount": 423.79,
                        "currency": "USD",
                        "label": "US$423.79"
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
                "date": "2021-10-03T20:50:39.124Z",
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
                    "id": "cit-908d79544bc447ec842627aa18501495",
                    "number": "39286585819209",
                    "locale": "en-US",
                    "name": "Men's Lusso Slide Neon Peach - NEON PEACH / 10",
                    "price": {
                        "amount": 175,
                        "currency": "USD",
                        "label": "US$175.00"
                    },
                    "categories": [
                        "Color: Neon",
                        "Color: Orange",
                        "Footwear: Lusso Slide",
                        "Footwear: Slide",
                        "Gender: Men",
                        "PF21",
                        "Size: 10",
                        "Size: 11",
                        "Size: 12",
                        "Size: 13",
                        "Size: 14",
                        "Size: 7",
                        "Size: 8",
                        "Size: 9",
                        "Type: Slide",
                        "YGroup_mens-lusso-slide",
                        "FOOTWEAR - MEN'S"
                    ],
                    "attributes": {
                        "weight": "2.77",
                        "display_variant_title": "NEON PEACH / 10",
                        "url": "https://www.athleticpropulsionlabs.com/products/mens-lusso-slide-neon-peach?variant=39286585819209",
                        "option1": "NEON PEACH",
                        "weight_unit": "lb",
                        "product_handle": "mens-lusso-slide-neon-peach",
                        "product_type": "FOOTWEAR - MEN'S",
                        "fulfillment_service": "manual",
                        "taxable": "true",
                        "product_id": "6562263826505",
                        "option2": "10",
                        "vendor": "Athletic Propulsion Labs",
                        "inventory_policy": "deny",
                        "sku": "840222810045",
                        "source": "shopify",
                        "barcode": "840222810045",
                        "inventory_management": "shopify",
                        "product_title": "Men's Lusso Slide Neon Peach",
                        "requires_shipping": "true",
                        "variant_title": "NEON PEACH / 10",
                        "grams": "1256.0",
                        "fulfillment_method": "physical"
                    },
                    "dimensions": {
                        "product": {
                            "weight": {
                                "value": "2.77",
                                "units": "pound"
                            }
                        }
                    },
                    "images": [
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/lussoslide-neonpeach-5_15681c7e-f196-46ce-883f-ab62498ec030.jpg?v=1622666290",
                            "tags": [],
                            "attributes": {
                                "position": "1"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/lussoslide-neonpeach-1_22cad0db-1ca2-4f99-861a-c70894a611ce.jpg?v=1622666292",
                            "tags": [],
                            "attributes": {
                                "position": "2"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/lussoslide-neonpeach-2_f4a2366b-b33f-4848-9bc6-d0aa696629e9.jpg?v=1622666296",
                            "tags": [],
                            "attributes": {
                                "position": "3"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/lussoslide-neonpeach-3_666d82ee-ff38-47c5-b244-cb33ae1f7527.jpg?v=1622666298",
                            "tags": [],
                            "attributes": {
                                "position": "4"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/lussoslide-neonpeach-4_fe1970f9-8ffa-450a-aabb-5d4e83640072.jpg?v=1622666301",
                            "tags": [],
                            "attributes": {
                                "position": "5"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/lussoslide-neonpeach-6_20fc4a3d-236a-41d5-9411-2f853a853c1e.jpg?v=1622666305",
                            "tags": [],
                            "attributes": {
                                "position": "6"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/lussoslide-neonpeach-5_15681c7e-f196-46ce-883f-ab62498ec030_100x100.jpg?v=1622666290",
                            "tags": [
                                "thumbnail",
                                "checkout"
                            ],
                            "attributes": {
                                "position": "1"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/lussoslide-neonpeach-1_22cad0db-1ca2-4f99-861a-c70894a611ce_100x100.jpg?v=1622666292",
                            "tags": [
                                "thumbnail",
                                "checkout"
                            ],
                            "attributes": {
                                "position": "2"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/lussoslide-neonpeach-2_f4a2366b-b33f-4848-9bc6-d0aa696629e9_100x100.jpg?v=1622666296",
                            "tags": [
                                "thumbnail",
                                "checkout"
                            ],
                            "attributes": {
                                "position": "3"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/lussoslide-neonpeach-3_666d82ee-ff38-47c5-b244-cb33ae1f7527_100x100.jpg?v=1622666298",
                            "tags": [
                                "thumbnail",
                                "checkout"
                            ],
                            "attributes": {
                                "position": "4"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/lussoslide-neonpeach-4_fe1970f9-8ffa-450a-aabb-5d4e83640072_100x100.jpg?v=1622666301",
                            "tags": [
                                "thumbnail",
                                "checkout"
                            ],
                            "attributes": {
                                "position": "5"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/lussoslide-neonpeach-6_20fc4a3d-236a-41d5-9411-2f853a853c1e_100x100.jpg?v=1622666305",
                            "tags": [
                                "thumbnail",
                                "checkout"
                            ],
                            "attributes": {
                                "position": "6"
                            }
                        }
                    ],
                    "description": "<p>The APL Lusso Slide is truly the height of luxury and comfort. Featuring a soft Nappa leather intricately, cross-stitched strap and footbed, your feet will thank you every time you slip them on. The 3D molded footbed is accented with a matching APL logo to massage your feet with every step. Our signature midsole/outsole uses our tried and true Propelium® compound offering the same great cushioning and rebound from the running shoes you love. Treat yourself, whether you want to recover after a great stay-at-home workout or add a bit of at-home or around the town style, the APL Lusso Slide has everything you need to relax in style. Wt. 4.0 oz.</p>\n<p>Any APL slide that features natural materials including but not limited to leather, suede, wool, shearling, etc. should not be worn in or around water. The natural materials found in these slides are recommended for casual use in dry climates, and have not been treated for excessive moisture.</p>\n<p><br><strong>All of our slides are unisex. If your size is sold out, simply select a women's size on the site and adjust the fit up by a size and half. For example, a size 7 in men’s is a size 8.5 in women’s.</strong></p>",
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
                                "amount": 229.95,
                                "label": "CA$229.95",
                                "base": {
                                    "amount": 175.08,
                                    "currency": "USD",
                                    "label": "US$175.08"
                                },
                                "includes": {
                                    "key": "none",
                                    "label": "HST and duty not included"
                                },
                                "key": "localized_item_price"
                            },
                            {
                                "currency": "CAD",
                                "amount": 40.71,
                                "label": "CA$40.71",
                                "base": {
                                    "amount": 31,
                                    "currency": "USD",
                                    "label": "US$31.00"
                                },
                                "name": "HST",
                                "accuracy": "calculated",
                                "key": "localized_item_vat"
                            },
                            {
                                "currency": "CAD",
                                "amount": 41.39,
                                "label": "CA$41.39",
                                "base": {
                                    "amount": 31.52,
                                    "currency": "USD",
                                    "label": "US$31.52"
                                },
                                "key": "localized_item_duty"
                            }
                        ],
                        "rates": [],
                        "spot_rates": [],
                        "status": "included",
                        "attributes": {
                            "weight": "2.77",
                            "display_variant_title": "NEON PEACH / 10",
                            "url": "https://www.athleticpropulsionlabs.com/products/mens-lusso-slide-neon-peach?variant=39286585819209",
                            "option1": "NEON PEACH",
                            "weight_unit": "lb",
                            "product_handle": "mens-lusso-slide-neon-peach",
                            "product_type": "FOOTWEAR - MEN'S",
                            "fulfillment_service": "manual",
                            "taxable": "true",
                            "product_id": "6562263826505",
                            "option2": "10",
                            "vendor": "Athletic Propulsion Labs",
                            "inventory_policy": "deny",
                            "sku": "840222810045",
                            "source": "shopify",
                            "barcode": "840222810045",
                            "inventory_management": "shopify",
                            "product_title": "Men's Lusso Slide Neon Peach",
                            "requires_shipping": "true",
                            "variant_title": "NEON PEACH / 10",
                            "grams": "1256.0",
                            "fulfillment_method": "physical"
                        },
                        "price_attributes": {}
                    }
                },
                "name": "Men's Lusso Slide Neon Peach - NEON PEACH / 10",
                "attributes": [],
                "description": "<p>The APL Lusso Slide is truly the height of luxury and comfort. Featuring a soft Nappa leather intricately, cross-stitched strap and footbed, your feet will thank you every time you slip them on. The 3D molded footbed is accented with a matching APL logo to massage your feet with every step. Our signature midsole/outsole uses our tried and true Propelium® compound offering the same great cushioning and rebound from the running shoes you love. Treat yourself, whether you want to recover after a great stay-at-home workout or add a bit of at-home or around the town style, the APL Lusso Slide has everything you need to relax in style. Wt. 4.0 oz.</p>\n<p>Any APL slide that features natural materials including but not limited to leather, suede, wool, shearling, etc. should not be worn in or around water. The natural materials found in these slides are recommended for casual use in dry climates, and have not been treated for excessive moisture.</p>\n<p><br><strong>All of our slides are unisex. If your size is sold out, simply select a women's size on the site and adjust the fit up by a size and half. For example, a size 7 in men’s is a size 8.5 in women’s.</strong></p>",
                "image": {
                    "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/lussoslide-neonpeach-5_15681c7e-f196-46ce-883f-ab62498ec030_100x100.jpg?v=1622666290",
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
                    "id": "cit-e64c764dd462499eba29ebeef9d2f6fb",
                    "number": "39286585131081",
                    "locale": "en-US",
                    "name": "Men's Iconic Slide Deep Brown / White / Cow - DEEP BROWN / WHITE / COW / 9",
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
                        "Gender: Men",
                        "PF21",
                        "Size: 10",
                        "Size: 11",
                        "Size: 12",
                        "Size: 13",
                        "Size: 8",
                        "Size: 9",
                        "Type: Slide",
                        "YGroup_mens-ichs",
                        "FOOTWEAR - MEN'S"
                    ],
                    "attributes": {
                        "weight": "1.77",
                        "display_variant_title": "DEEP BROWN / WHITE / COW / 9",
                        "url": "https://www.athleticpropulsionlabs.com/products/mens-iconic-slide-deep-brown-white-cow?variant=39286585131081",
                        "option1": "DEEP BROWN / WHITE / COW",
                        "weight_unit": "lb",
                        "product_handle": "mens-iconic-slide-deep-brown-white-cow",
                        "product_type": "FOOTWEAR - MEN'S",
                        "fulfillment_service": "manual",
                        "taxable": "true",
                        "product_id": "6562263629897",
                        "option2": "9",
                        "vendor": "Athletic Propulsion Labs",
                        "inventory_policy": "deny",
                        "sku": "840222810113",
                        "source": "shopify",
                        "barcode": "840222810113",
                        "inventory_management": "shopify",
                        "product_title": "Men's Iconic Slide Deep Brown / White / Cow",
                        "requires_shipping": "true",
                        "variant_title": "DEEP BROWN / WHITE / COW / 9",
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
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/iconicslide-deepbrown-white-cow-5_ba97d062-7df5-4d44-b52c-23587fc09369.jpg?v=1622664801",
                            "tags": [],
                            "attributes": {
                                "position": "1"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/iconicslide-deepbrown-white-cow-1_50aef56b-d6ca-4726-9c7f-3eb4e0df671b.jpg?v=1622664802",
                            "tags": [],
                            "attributes": {
                                "position": "2"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/iconicslide-deepbrown-white-cow-2_d80712a9-709c-4929-a2ed-324370716f32.jpg?v=1622664805",
                            "tags": [],
                            "attributes": {
                                "position": "3"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/iconicslide-deepbrown-white-cow-3_c8d0b165-e56d-40a4-95d8-eea9d00cccf9.jpg?v=1622664809",
                            "tags": [],
                            "attributes": {
                                "position": "4"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/iconicslide-deepbrown-white-cow-4_8105be9e-0184-4a7f-a65f-ca25eb4e1ad7.jpg?v=1622664812",
                            "tags": [],
                            "attributes": {
                                "position": "5"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/iconicslide-deepbrown-white-cow-6_97abf726-b0f6-4585-9671-04886f7dbd1e.jpg?v=1622664815",
                            "tags": [],
                            "attributes": {
                                "position": "6"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/iconicslide-deepbrown-white-cow-5_ba97d062-7df5-4d44-b52c-23587fc09369_100x100.jpg?v=1622664801",
                            "tags": [
                                "thumbnail",
                                "checkout"
                            ],
                            "attributes": {
                                "position": "1"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/iconicslide-deepbrown-white-cow-1_50aef56b-d6ca-4726-9c7f-3eb4e0df671b_100x100.jpg?v=1622664802",
                            "tags": [
                                "thumbnail",
                                "checkout"
                            ],
                            "attributes": {
                                "position": "2"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/iconicslide-deepbrown-white-cow-2_d80712a9-709c-4929-a2ed-324370716f32_100x100.jpg?v=1622664805",
                            "tags": [
                                "thumbnail",
                                "checkout"
                            ],
                            "attributes": {
                                "position": "3"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/iconicslide-deepbrown-white-cow-3_c8d0b165-e56d-40a4-95d8-eea9d00cccf9_100x100.jpg?v=1622664809",
                            "tags": [
                                "thumbnail",
                                "checkout"
                            ],
                            "attributes": {
                                "position": "4"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/iconicslide-deepbrown-white-cow-4_8105be9e-0184-4a7f-a65f-ca25eb4e1ad7_100x100.jpg?v=1622664812",
                            "tags": [
                                "thumbnail",
                                "checkout"
                            ],
                            "attributes": {
                                "position": "5"
                            }
                        },
                        {
                            "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/iconicslide-deepbrown-white-cow-6_97abf726-b0f6-4585-9671-04886f7dbd1e_100x100.jpg?v=1622664815",
                            "tags": [
                                "thumbnail",
                                "checkout"
                            ],
                            "attributes": {
                                "position": "6"
                            }
                        }
                    ],
                    "description": "<p>The Iconic Calf Hair Slide offers the same great comfort you know and love, now with a fashionable leather strap. Featuring a dyed, real fur cowhide upper there is a print or pattern to fit your every need. The antimicrobial mesh covers a 3D molded footbed that massages your feet with every step. The newly developed midsole/outsole uses our tried and true Propelium® compound offering the same great cushioning and rebound from the running shoes you love. Whether you want to recover after a great workout or give your feet a break from a long day of errands, the APL Iconic Calf Hair Slide has everything you need to relax in style. Wt. 4.0 oz.</p>\n<p><br><strong>All of our slides are unisex. If your size is sold out, simply select a women's size on the site and adjust the fit up by a size and half. For example, a size 7 in men’s is a size 8.5 in women’s.</strong></p>",
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
                                    "amount": 149.96,
                                    "currency": "USD",
                                    "label": "US$149.96"
                                },
                                "includes": {
                                    "key": "none",
                                    "label": "HST and duty not included"
                                },
                                "key": "localized_item_price"
                            },
                            {
                                "currency": "CAD",
                                "amount": 34.86,
                                "label": "CA$34.86",
                                "base": {
                                    "amount": 26.54,
                                    "currency": "USD",
                                    "label": "US$26.54"
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
                                    "amount": 26.99,
                                    "currency": "USD",
                                    "label": "US$26.99"
                                },
                                "key": "localized_item_duty"
                            }
                        ],
                        "rates": [],
                        "spot_rates": [],
                        "status": "included",
                        "attributes": {
                            "weight": "1.77",
                            "display_variant_title": "DEEP BROWN / WHITE / COW / 9",
                            "url": "https://www.athleticpropulsionlabs.com/products/mens-iconic-slide-deep-brown-white-cow?variant=39286585131081",
                            "option1": "DEEP BROWN / WHITE / COW",
                            "weight_unit": "lb",
                            "product_handle": "mens-iconic-slide-deep-brown-white-cow",
                            "product_type": "FOOTWEAR - MEN'S",
                            "fulfillment_service": "manual",
                            "taxable": "true",
                            "product_id": "6562263629897",
                            "option2": "9",
                            "vendor": "Athletic Propulsion Labs",
                            "inventory_policy": "deny",
                            "sku": "840222810113",
                            "source": "shopify",
                            "barcode": "840222810113",
                            "inventory_management": "shopify",
                            "product_title": "Men's Iconic Slide Deep Brown / White / Cow",
                            "requires_shipping": "true",
                            "variant_title": "DEEP BROWN / WHITE / COW / 9",
                            "grams": "803.0",
                            "fulfillment_method": "physical"
                        },
                        "price_attributes": {}
                    }
                },
                "name": "Men's Iconic Slide Deep Brown / White / Cow - DEEP BROWN / WHITE / COW / 9",
                "attributes": [],
                "description": "<p>The Iconic Calf Hair Slide offers the same great comfort you know and love, now with a fashionable leather strap. Featuring a dyed, real fur cowhide upper there is a print or pattern to fit your every need. The antimicrobial mesh covers a 3D molded footbed that massages your feet with every step. The newly developed midsole/outsole uses our tried and true Propelium® compound offering the same great cushioning and rebound from the running shoes you love. Whether you want to recover after a great workout or give your feet a break from a long day of errands, the APL Iconic Calf Hair Slide has everything you need to relax in style. Wt. 4.0 oz.</p>\n<p><br><strong>All of our slides are unisex. If your size is sold out, simply select a women's size on the site and adjust the fit up by a size and half. For example, a size 7 in men’s is a size 8.5 in women’s.</strong></p>",
                "image": {
                    "url": "https://cdn.shopify.com/s/files/1/0008/8116/4339/products/iconicslide-deepbrown-white-cow-5_ba97d062-7df5-4d44-b52c-23587fc09369_100x100.jpg?v=1622664801",
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

pushDLPurchase(data)