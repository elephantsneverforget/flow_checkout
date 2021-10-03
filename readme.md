# 🌊 Flow Checkout Data Layer Script

Flow is an international checkout. Integrating our data layer is easy!

1. Create a snippet in the clients theme called 'flow-checkout-tracking.liquid'

2. Copy and paste the contents of flow-checkout-tracking.js, find it [here](https://github.com/elephantsneverforget/flow_checkout/blob/main/flow-checkout-tracking.js), into the snippet file you just created.

3. Open 'theme.liquid' and paste `{% render 'flow-checkout-tracking' %}`  just above the closing body tag.

4. That's it! Get the Flow Checkout running, usually by selecting a flag that isn't US, and check to see you get dl_begin_purchase, dl_add_shipping_info, and dl_add_payment_info. If you do, it's been installed correctly. Run a test purchase and make sure you get the dl_purchase event.

5. NOTE: This script defaults to using the base store currency. If you need transactions in the foreign currency search the file for currency, comment out the base currency and uncomment the foreign currency code.