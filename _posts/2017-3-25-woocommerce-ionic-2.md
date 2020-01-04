---
layout: post
title: "Ionic 4/Angular WooCommerce Tutorial"
image: "images/content/woocommerce-ionic2.png"
excerpt: "In this tutorial ,we are going to see how to build an Ionic 2 app for consuming WooCommerce rest API " 
tags : [ionic , woocommerce , wordpress]
---

{% include image.html 
    img="images/content/woocommerce-ionic2.png" 
    title="Building a WooCommerce app with Ionic 2" 
%}

Throughout this tutorial we are going to build a full **Ionic 4 eCommerce** app with a WooCommerce backend designed for people who need an Android/iOS mobile app for their WooCommerce based store.

We are going to use Ionic 4 for front end and WordPress + WooCommerce for back end 

## Tutorial requirements

This tutorial requires you to have 
<ul>
<li>
A local WordPress installation with WooCommerce installed and configured. 
</li>
<li>
Or a hosted WooCommerce store which you can test with.
</li>
<li>
Node.js and Ionic CLI installed on your development machine. 
</li>
<li>
Some working experience with Ionic 4.
</li>
</ul>

We are not going to cover how to install WordPress and how to add the WooCommerce plugin since you can find many
tutorials on the web already showing that.

## Setting up WooCommerce API?

WooCommerce is a free WordPress plugin which allows you to create an ecommerce website based on WordPress.

WooCommerce provides an API which we can consume via any client side code, in this case our Ionic 4 app but before
we can do that, let's setup WooCommerce to allow authenticated clients to consume the API.

Basically what we need to do is:  

<ul>
<li>Enabling WordPress permalinks </li>
<li>Enabling WooCommerce API </li>
<li>Generating API keys </li>
</ul>

First you need to turn on the WordPress permalinks via  `Admin -> Settings > Permalinks`. 

Next you enable the WooCommerce API by going to `WooCommerce > Settings > API` tab then check the Enable REST API checkbox.


![Building a WooCommerce app with Ionic 4](/images/content/woocommerce-ionic2/woocommerce.jpg)

Select the API tab 


![Building a WooCommerce app with Ionic 4](/images/content/woocommerce-ionic2/woocommerce-api.jpg)

Enable the API 



![Building a WooCommerce app with Ionic 4](images/content/woocommerce-ionic2/enable.jpg)

And finally generate the API keys which control access to your WooCommerce website from any client.

So go to `WooCommerce > Settings > API > Keys/Apps`

Click on Add key link/button.

![Building a WooCommerce app with Ionic 4](/images/content/woocommerce-ionic2/addkey.jpg)

Then fill in the details for generating keys which are 

<ul>
<li>
A description for API keys.
</li>
<li>
The WordPress user for which you want to generate keys 
</li>
<li>
The permissions (Read, Write or Read/Write access)
</li>
</ul>

{% include image.html 
    img="images/content/woocommerce-ionic2/keysapps.jpg" 
    title="Building a WooCommerce app with Ionic 2" 
%}

![](images/content/woocommerce-ionic2/keysapps.jpg)

Next click on generate keys.

You should get two keys, Consumer Key and Consumer Secret,which you need to copy and save somewhere 
because we are going to need them in our Ionic 4 app.

<div class="note">
You should save the keys somewhere until you can copy them in your application since you will not be able
to retrieve them later even from the admin Interface. But don't worry if you've lost them you can generate new ones 
easily.
</div>


## Generating an Ionic 4 Project 

Let's start our journey by generating a new Ionic 4 project based on the sidemenu template so open up your terminal under Linux/MAC system or command prompt under Windows and type:

    ionic start ionic4-woocommerce sidemenu --type=angular 
    cd ionic4-woocommerce
    ionic serve 

We are going to use woocommerce-api which is the official Node.js module for WooCommerce API but since this 
module uses specific Node.js modules which are not available on the Cordova webview we can't use it directly 
with Ionic 4.

## Transfroming a Node.js Module to A Browser Library 

The solution is to use Browserify to bundle the module with all its dependencies inside one JavaScript file so we will not need any external Node.js dependencies which are not available inside the Cordova webview (a headless browser) used by Ionic 4.

Browserify is a Node.js module which can be installed from NPM with: 

    npm install -g browserify

Next create a Node.js project with: 

    mkdir woocommerce-api 
    cd woocommerce-api
    npm init 

Just answer all the questions and hit Enter for NPM to generate a `package.json`.

Next we need to install woocommerce-api module from npm with: 

    npm install woocommerce-api --save 

The next thing is to create a `main.js` file inside our Node.js project:          

    touch main.js 

Then copy this code: 

    var WooCommerceAPI = window.WooCommerceAPI || {};

    // Augment the object with modules that need to be exported.
    // You only need to require the top-level modules, browserify
    // will look for any dependencies and bundle them inside one file.

    WooCommerceAPI.WooCommerceAPI = require('woocommerce-api');


    // Add to the global namespace

    window.WooCommerceAPI = WooCommerceAPI;

So what this code does?

First we have created a JavaScript object, then we required woocommerce-api and stick it to our object 
then exported the object to the global namespace (window) so it becomes available globally after we convert our main.js to a browser library with browserify.

What we need now is to invoke browserify from the CLI to transform `main.js` alongside required module(s) to a 
browser library.

Go ahead and open your terminal ,navigate inside the Node.js project and enter:

    browserify main.js -o woocommerce-api.js

Wait until the command returns, you should find a `woocommerce-api.js` file inside your current folder.

We can now include the woocommerce api library inside our Ionic 4 project via a script tag, just like any browser
based library.

Take `woocommerce-api.js` file and copy it inside the assets folder of your Ionic 4 project then include it in Ionic 4 index.html with: 

```html
    <script src="assets/woocommerce-api.js"> </script>
```

If you find any errors with `woocommerce-api.js`, make sure to include an es6 shim since the module uses ES6 
features which may not be available in Cordova webview.

I used this shim from [here](https://github.com/paulmillr/es6-shim)

```html
      <script src="assets/es6-shim.min.js"> </script>
```

Ionic 4 already includes an ES6 shim but uses a Webpack based workflow with Gulp which generates a final 
bundle `build/main.js` that contains all project source files plus any shims for ES6 support so you need to 
either add your `woocommerce-api.js` library to Ionic 4 workflow so it can be bundled with main.js or just 
include `woocommerce-api.js` and `es6-shim.js` before `main.js`   

You can also try to use Crosswalk which replaces the old system browser used by Cordova with a recent browser 
version which supports ES6 features so you don't need to include any shims. I didn't try that but you can test it 
if you want.

Now we are ready to use the WooCommerce API inside our Ionic 4 project. But we still have a few problems:

Ionic 4 is based on TypeScript so how to include the JavaScript woocommerce api library inside a TypeScript project?

Since we don't have typings for `woocommerce-api.js` we just need to add this line:  

    declare var WooCommerceAPI: any;

In any TypeScript source file before we can use the library.

## Ionic 4 Same Origin Policy and CORS 

If you are testing your Ionic 4 app locally using the Ionic serve command (local server) or even if you are using a device with live sync (--livereload ) you are going to find problems related to the same origin policy,when you connect to a WordPress server.

The same origin policy implemented on browsers states that only clients from the same domain can connect to a server.

So how can you solve this problem when developing your Ionic 4 app that connects to a WooCommerce server?

You have many option, either on the side of Ionic 4 or WordPress server:

<ul>
<li>
Testing only on a real mobile device but without live sync enabled (without --livereload).
</li>
<li>
Using an Ionic 4 proxy.
</li>
<li>
Changing CORS headers on the server to allow all domains (or selected domains) to connect.  
</li>
</ul>       

Testing only on the device without live sync can be time consuming and not effective during development phase 
so we are not going to follow this option.

So you can either use an Ionic 4 proxy which allows you to bypass the CORS issue or, if you have control of your
WordPress server, change the CORS headers on the server.

Since I'm using a local WordPress server I'm just going to change the CORS to allow all domains to connect.

## Setting CORS with Apache  

I'm using the Apache 2 server under a Ubuntu 16 machine. If this is your case too you can follow these steps to change CORS to allow connection from all domains.

You need to do two things:

First enable Apache mod_headers module. Open your command line and type: 

    sudo a2enmod headers

Then restart the apache service with:

    sudo service apache2 restart

Open `.htaccess` and add: 

    <IfModule mod_headers.c>

    Header add Access-Control-Allow-Origin: "*"
    Header add Access-Control-Allow-Methods: "GET,POST,OPTIONS,DELETE,PUT"
    Header add Access-Control-Allow-Headers: "Content-Type"

    </IfModule>

Then save your `.htaccess` file.

## Conclusion 

That is the end of this first part of our tutorial. In the next part we are going to build the actual Ionic 4
that connects to a WordPress + WooCommerce website, fetch things such as categories, products and orders and 
display them to your mobile app users.








