---
layout: post
title: "Fixing CORS Issues in Your Front-End Angular 7/8 App with Angular CLI Proxy Configuration"
image: "images/content/angular.png"
excerpt: "In this tutorial we'll learn in a few steps how to fix CORS issues in our front-end Angular 8 app using the Angular CLI proxy configuration" 
tags : [angular , angular8] 
---

In this tutorial we'll learn in a few steps how to fix CORS issues in our front-end Angular 8 app using the Angular CLI proxy configuration.
 
[CORS](https://developer.mozilla.org/en-US/docs/Glossary/CORS "CORS: CORS (Cross-Origin Resource Sharing) stands for Cross-Origin Resource Sharing and allows a server to have control over which front-end JavaScript clients can access resources on the server. It works by sending  some HTTP headers with HTTP responses, that tell web browsers to enable or block frontend JavaScript code, from accessing responses.

CORS headers are simply HTTP headers that tell a browser to allow a web application running at some origin (domain) to access specific resources from a server at a different origin.

Browser security disallow you from making cross-domain requests except if the HTTP response has a  `Control-Allow-Origin`  header with a `*` value or the domain of your client. 

CORS issues are framework-agnostic and may occur in any front-end JavaScript application built with plain JS, React or Vue.js, etc. but in our case, we'll see how to solve CORS issues in the context of an Angular 8 application.
 
## Why Do CORS Issues Occur in Angular Development?

 
Angular CLI provides a development server that runs on `localhost:4200` by default so if you are using a back-end server that runs on a different domain, you may have CORS issues if your server is not configured properly.

Even if your backend is running on localhost, it will be listenning on a different port, which is treated as a different domain.

## How to Fix CORS Issues?

Now that we have learned why CORS issues may occur when developing your Angular application. how to fix them?
 
 There are two ways:

- Configure the server to send the appropriate CORS headers
- Configure Angular CLI proxy
- 
The obvious solution is to configure the backend server properly but that's not possible all the time. For example, you may not have access to the server code.

Most server languages and frameworks provide easy APIs to configure CORS. For example, in PHP, you can simply add the following lines to your PHP file:

```php
header('Access-Control-Allow-Origin: *');
```

In Node.js and Express server, you can  use the `cors` package (`npm i cors --save`) as follows:

```js
const cors = require('cors'); 
const express = require('express');
const app = express();app.use(cors());
```

In this tutorial, we will learn step by step  how to use Angular CLI proxy to fix CORS issues. 

## Step 1 - Prepare your Angular Project

At this step, we expect that you alreay have an Angular project with some code to send HTTP requests and CORS. Otherwise, you need to create a project and some code for sending requests to a server. 

Open a new command-line interface and navigate to the root folder of your project.
 
## Step 2 - Create a Proxy Configuration File

Next, create `src/proxy.conf.json` file and add the following content:

```json
{
	"/api/*": {
		"target": "http://localhost:3000",
		"secure": false,
		"logLevel": "debug"
	}
}
```

This configuration file specifies that any HTTP request which starts with the `/app/` path will be sent to the proxy which will redirect it to the `target` hostname.

The `secure` option is used to enforce usage of SSL. 

See all the available options from  [webpack dev server documentation](https://webpack.js.org/configuration/dev-server/#devserver-proxy).


## Step 3 - Add a `proxyConfig` key to `angular.json`

Next, open the `angular.json` file and add a `proxyConfig` key under the `serve->options` that points to the `src/proxy.conf.json` file as follows: 


```json
"architect": {
  "serve": {
    "builder": "@angular-devkit/build-angular:dev-server",
    "options": {
      "browserTarget": "your-application-name:build",
      "proxyConfig": "src/proxy.conf.json"
    },
```

## Step 4 - Serving your Angular App

Finally, you can run the dev server with this proxy configuration using the following command:

```bash
$ ng serve
```

If you do any changes in the proxy configuration file afterwards, make sure to re-run the  `ng serve`  command.

You can find more information about the proxy configuration in the Angular CLI from the  [docs](https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/proxy.md)

