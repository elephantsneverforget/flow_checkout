var data = {
    "discriminator": "checkout_progress",
    "checkout_id": "F6719d86c71873d4cb28ec5da129aa23f95vjMyF",
    "lines": [
        {
            "number": "39286585131081",
            "quantity": 1,
            "brand": "Athletic Propulsion Labs",
            "category": "Color: Beige|Color: Prints|Color: White|FA21|Footwear: Slide|Gender: Men|PF21|Size: 10|Size: 11|Size: 12|Size: 13|Size: 8|Size: 9|Type: Slide|YGroup_mens-ichs|FOOTWEAR - MEN'S",
            "currency": "USD",
            "name": "Men's Iconic Slide Deep Brown / White / Cow - DEEP BROWN / WHITE / COW / 9",
            "price": 149.63
        },
        {
            "number": "39286659711049",
            "quantity": 1,
            "brand": "Athletic Propulsion Labs",
            "category": "Color: Neon|Color: Orange|Footwear: Lusso Slide|Footwear: Slide|Gender: Women|PF21|Size: 10|Size: 11|Size: 5|Size: 6|Size: 7|Size: 8|Size: 9|Type: Slide|YGroup-womens-lusso-slide|FOOTWEAR - WOMEN'S",
            "currency": "USD",
            "name": "Women's Lusso Slide Neon Peach - NEON PEACH / 7",
            "price": 174.83
        }
    ],
    "step": "customer_info",
    "promotion": ""
}

var productsInCart = getProductsInCartBlazeCheckout(data);
console.log(productsInCart);

function getProductsInCartBlazeCheckout(data) {
    var items = [];
    data.lines.forEach((orderItem) => {
        if (orderItem) {
            // This is section is functional and semi tested in the browser
            items.push({
                'brand': orderItem.brand,
                'category': orderItem.category,
                // This is a variant ID and the only product id available here.
                'variant_id': orderItem.number,
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