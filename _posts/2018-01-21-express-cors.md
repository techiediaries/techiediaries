---
layout: post
title: "Handling CORS in Express 4"
image: "images/content/nodejs.jpg"
excerpt: "So in this tutorial you'll learn how to enable CORS in your Express 4 server to enable your front-end application to bypass the Same Origin Policy enforced by modern web browsers." 
tags : [nodejs, javascript] 
---

CORS stands for Cross Origin Resource Sharing and allows modern web browsers to be able to send AJAX requests and receive HTTP responses for resource from other domains other that the domain serving the client side application.

If you have ever been developing an application which is making XHR requests to a cross-domain origin and getting an error like the following in your browser console?

  XMLHttpRequest cannot load . No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin  is therefore not allowed access. The response had HTTP status code 500.

Your web browser is simply informing you that your web server is not sending back the headers that allow CORS i.e `Access-Control-Allow-Origin` and `Access-Control-Allow-Methods`

So in this tutorial you'll learn how to enable CORS in your Express 4 server to enable your front-end application to bypass the Same Origin Policy enforced by modern web browsers. This is particularly useful when you are locally developing your application, since in many cases you'll have two running development servers (front-end and back-end servers) in different ports, or if you want to enable resource sharing between different domains/hosts.

## How to enable CORS in Express 4

There are many ways that you can use to enable CORS in Express. 

If you are locally developing your application and want a quick way to CORS then you can simply use a middleware with a few lines of code:

```js
var express = require('express');
var server = express();

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())


server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.get('/endpoint', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

server.listen(3000, () => {
  console.log('Listenning at http://localhost:3000' )
})

```

The wildcard  `*` allows resources to be accessed from any origin.

That's it you can now send requests from any origin without getting the same origin policy problems.

You can also use fine grained options without having to deal with HTTP header names for CORS by using the [CORS module installed from npm](https://www.npmjs.com/package/cors).

## Using the CORS Module

Head over to your terminal and install:

```bash
npm install --save cors
``` 

You can then use it as a middleware 

```js
var express = require('express');
var server = express();
var cors = require('cors');

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())

server.get('/endpoint', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

server.use(cors());

server.listen(3000, () => {
  console.log('Listenning at http://localhost:3000' )
})

```

This is equivalent to our previous example and allows resources to be accessed from any origin by adding the `Access-Control-Allow-Origin: *` header to all requests.

## Controlling Allowed Hosts

When your are in production you don't want to allow CORS access for all origins but if you need to allow cross origin requests from some specified host(s) you can do add the following code:

```js
server.use(cors({
  origin: 'https://techiediaries.com'
}));

```

This wil allow `https://techiediaries.com` to send cross origin requests to your Express server without the Same Origin Policy getting in the way.

You can also enable CORS for a single Express route 

```js
server.get('/endpoint', cors(), function (req, res, next) {
  res.json({msg: 'This has CORS-enabled for only this route: /endpoint'})
})
```

## Allowing Dynamic/Multiple Origins 

If you want to allow multiple origins you need to use a function (for origin instead of a string) that dynamically set the CORS header depending on the origin making the request and a white list that you specify which contains the origin to allow.

```javascript
var express = require('express')
var cors = require('cors')
var server = express()
 
var whitelist = ['http://techiediaries.com', 'http://othersite.com']

var options = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

server.use(cors(options))

server.get('endpoint', function (req, res, next) {
  res.json({msg: 'This has CORS enabled'})
})
 
server.listen(3000, () => {
  console.log('Listenning at http://localhost:3000' )
})

```

## Conclusion

In this tutorial we have seen some useful options for adding CORS headers to your web application, developed with Node.js and Express 4, which is particularly useful for development applications with separate front-end and back-end apps or if you want to be able to share resources (via API requests) across many domains.














