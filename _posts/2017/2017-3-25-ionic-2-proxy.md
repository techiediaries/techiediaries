---
layout: post
title: "handling CORS with The Ionic 4 Proxy"
image: "images/content/ionic2-proxy.png"
excerpt: "How to use the Ionic 3 proxy to handle CORS issues" 
tags : [ionic2 , ionic ]
---


Ionic 4 allows you to build hybrid mobile apps using web technologies you usually use to build apps. Since building hybrid mobile apps with Ionic 4 is actually building web apps and then bundle them inside a native container with Apache Cordova, the development workflow starts with a local server which serves a web app that can be tested on the browser then can built using Cordova to run on an actual device where it has access to actual native features.

You can also skip serving the app locally with the *ionic serve* command and use the new Ionic 4 live reload that 
allows you to use an actual device to test the app and continue developing the app, when your source files changes Ionic pushes the changes instantly to device.

On both situations i.e developing locally with *ionic serve* or testing using an actual device with live reload, Ionic 
starts a local development server to serve your app, which can be accessed just like any normal web application 
from `http://localhost:8100/` by default but you can change the port to any available port if you need to.

So how to handle same origin policy and CORS issues related to local development? since Ionic uses a local server 
on both situations we mentionned above so any requests (GET,POST etc.) sent to external servers are marked as sent 
from the origin `localhost:8100`.

The same origin policy implemented on browsers states that only clients from the same domain origin can connect with the server with CORS enabled.

You usually get an error similar to :

**XMLHttpRequest cannot load  [YOUR-SERVER-ENDPOINT].
No 'Access-Control-Allow-Origin' header is present on the requested resource.
Origin 'http://localhost:8100' is therefore not allowed access.** 

## What is CORS?

CORS is an abbreviation for Cross origin resource sharing which allows you to control access to your server resources
from clients with different origins or simply domains.

For security reasons browsers disallow cross origin requests in JavaScript scripts using XMLHttpRequest or any other 
mechanism.

CORS provides a few HTTP headers which allow servers to dictate which origins or domains are allowed to access resources 
from a web browser.

To handle same origin policy and cors issues you can either:

- Test on a real device without live reload enabled but that's time and efforts consuming.
- Use Ionic 4 proxy.
- Changing the CORS headers on the server to allow all or some selected domains to connect to the server.

In this tutorial, we are going to see how to use the second option which is using the Ionic 3 proxy to handle 
CORS issues when developing hybrid mobile apps locally with Ionic 4 framework.

The Ionic 4 proxy can be especially useful when we don't have the control of the target API server so we can not change the CORS headers to allow the server to accept requests from the local development server origin.

So how to use the proxy in Ionic 3?

## Enabling the Ionic 4 Proxy

Using a proxy to bypass the CORS issues with Ionic 4 is actually very easy and straightforward, all you need to 
do is as follows: 

Use a text editor to open `ionic.config.json` which exists inside the root of your project.

Next add a proxies array just like in the following example 

```json
    {
    "name": "ionic4-example",
    "app_id": "id",
    "v2": true,
    "typescript": true,
    "proxies": [{
        "path": "/goto",
        "proxyUrl": "http://target-server.com"
    }]
    }
```

You only need to add the proxies array, leave the other values as they are in your original `ionic.config.json`. 


The *proxyUrl* should contain the server you want to connect to , which presents the CORS issues.

the path is what we are going to use inside our Ionic project to send requests to the target server, the Ionic 3
proxy will take care of proxying the requests to the actual target API server.

Now how to use these values inside project code?

To use the Ionic 4 proxy, you should replace the base of any URL to the target server with the value of the path. And let Ionic 4 do the hard work of routing the API requests to the target server.

## Conclusion

The CORS issues can be annoying if you are developing locally with *ionic serve* or using a real mobile device with 
live reload enabled which are the only viable options in development phase. If you don't have control of the server 
to update the CORS headers, The Ionic 4 proxy can save you a lot of headache by just adding a few lines in the  `ionic.config.json` file. 



