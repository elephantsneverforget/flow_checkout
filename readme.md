# 🌊 Flow Checkout Data Layer Script

Flow is an international checkout. Integrating our data layer is easy!!

1. Create a snippet in the clients theme called `flow-checkout-tracking.liquid`

2. Copy and paste the contents of flow-checkout-tracking.js, find it [here](https://github.com/elephantsneverforget/flow_checkout/blob/main/flow-checkout-tracking.js), into the snippet file you just created.

3. Open 'theme.liquid' and paste `{% render 'flow-checkout-tracking' %}`  just above the closing body tag.

4. By default we send price data in the default currency (likely USD). If you'd like to change this set the `USE_BASE_CURRENCY` variable at the top of the file to false and you'll get price data in the currency the checkout occurs in.

5. That's it! Get Flow Checkout running, usually by selecting a flag that isn't US, and check to see you get dl_begin_purchase, dl_add_shipping_info, and dl_add_payment_info. If you do, it's been installed correctly. Run a test purchase and make sure you get the dl_purchase event.