---
layout: post
url: /bring-node-js-modules-browser
title: Using and Running Node.js Modules in The Browser
author: mrnerd
tags : [javascript , nodejs]
---

In this quick tutorial, we'll learn to use and run Node.js modules in the browser.

Node.js has the largest repository of open source  modules in the world, which solve many common and uncommon development problems. You can easily find a module for almost any functionality you are looking for, so you can concentrate on solving your specific requirments, without re-inventing the wheel, and boost your productivity.

You can take advantage of these modules when you are only working on Node.js environments i.e when you are building a server side JavaScript application. How about when you need to build a client side JavaScript application? 

The Node.js runtime doesn't exist on the client, you have only the browser which can't make use of Node.js modules. We are hearing you saying, what a big waste!

But guess what? Thanks to some clever developers, It's now possible to use Node.js modules in browsers, not directly but can be done. 

Being able to call Node.js modules from JavaScript running on the browser can present many benefits because you can exploit the Node.js modules for your client side JavaScript applications without having to use a server with Node.js just because you need to implement a functionality that's already available as a Node.js module.

Here comes the role of **Browserify** which is itself a Node.js module. Browserify lets you require modules from JavaScript running on the browser so you can exploit already available Node.js modules but also you can use it to exploit the modular system of Node.js to structure your client side JavaScript applications.

Browsers don't have the require/export or the module import system which exists on Node.js platform; Browserify lets use the Node.js import system. 

Browserify is a command line tool which means that you need to convert your scripts written with the Node.js modular system to classic javascript file that can be included with the HTML script tag or any available browser mechanism

Suppose you have written your application source code using require syntax to import a useful Node.js module. Now to be able to use your application in the browser with no error you need to use Browserify and run the following command: 

```bash
browserify app.js -o bundle.js
```

Browserify resolves all dependencies, concatenate and bundle them in one JavaScript file that you can include with a single script tag.

You can also use browserify to take advantage of Node.js modular and import system i.e require end module.exports to structure you client side JavaScript applications especially if you are familiar with this system, so you don't have to learn another importing system for the browser such as requirejs or commonjs.

## How To Use Browserify?

So first of all lauch your command line terminal and type the famous npm install command to install browserify: 

```bash
npm install -g browserify
```

Next create your example project folder 

```bash
mkdir ytdl
```

Create a `main.js` JavaScript file inside ytdl

Next you should install the module you want to use or to convert to browser compatible script

```bash
npm install -g ytdl-core
```

Next in `main.js` require the module as you do normally with node.js modules:

```js
var yt = require('ytdl-core');
console.log(yt);
```

Now let the magic begins, call browserify with the input is `main.js` and give it a name for the output

```js
browserify main.js -o ytdl.js
...
```

Now you can use your script as easily as using a script tag

```html
<script src="ytdl.js"></script>
...
```

## Conclusion

In this tutorial, we have seen how to use Browserify to use Node.js modules in the browser.






