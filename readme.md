# 🌊 Flow Checkout Script

Script needs the GTM web container ID of the client it's used for. Currently I have APLs hardcoded.

We provide a URL to Flow Checkout. They call this url to load the script.

Generate the script url by pasting the github file into jsdelivr [here](https://www.jsdelivr.com/github)

We can seperate the GTM tag from the rest of the script using jsDelivr combine function, We can run the same script for all clients. https://cdn.jsdelivr.net/combine/gh/elephantsneverforget/flow_checkout@main/APL_GTM_include.js,gh/elephantsneverforget/flow_checkout@main/APL_index.js

The script is mostly functioning but still being tested.

I'm using a Simo template for cookie retrieval. That script will need to be installed along with this for proper functioning. Details
[here](https://www.simoahava.com/custom-templates/persist-campaign-data/)

As it stands we have to create a copy of the script for each client (to apply the correct GTM). Ideally we'd accept the GTM container id as a parameter in the URL so we can use a single script.

