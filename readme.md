# 🌊 Flow Checkout Data Layer Script

Flow is an international checkout. Integrating our data layer is easy!

1. Create a snippet in the clients theme called 'flow-checkout-tracking.liquid'

2. Copy and paste the contents of the flow-checkout-tracking.js into the snippet file you just created and save.

3. Open 'theme.liquid' and paste `{% render 'flow-checkout-tracking' %}`  just above the closing body tag.

4. That's it. Check to see you get dl_begin_purchase, dl_add_shipping_info, and dl_add_payment_info (when using Flow). If you get these events, it's been installed correctly. Run a test purchase and make sure you get the dl_purchase event.

5. NOTE: This defaults to using the base store currency. If you need transactions in the foreign currency search the file for currency, comment out the base currency and uncomment the foreign currency code.