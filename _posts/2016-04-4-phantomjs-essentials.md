---
layout: post
url : /phantomjs-essentials
title: PhantomJS Headless Browser Tutorial
author: mrnerd
tags : nodejs 
---

This tutorial, you'll learn about PhantomJS.

PhantomJS is a sort of headless browser. Basically it is the same as Chrome and Safari but without the GUI and with some additional modules  to support the functionality it offers. PhantomJS is based on webkit rendering engine which is the same engine powering Chrome and Safari. So why the hell someone needs a browser without a GUI?

Simple answer is to automate some web tasks and test web applications, PhontomJS is considered one of the best headless browsers out there.

PhontomJS is a command line executable tool which executes JavaScript scripts with comes with its own runtime environment

Let's take an example, create a `script.js` file and add the following lines:

```js
console.log('Lets automate the web');
phantom.exit();
```

The first line is very familiar to any JavaScript developer, it prints a log message on the console, but this time to PhantomJS console.

The second line is part of PhantomJS runtime it tells phantomJS to exit, PhantomJS has a powerful library of modules developers can use for many tasks such as testing, rendering and accessing  web pages etc.

Now all you need to do is executing this script with this command:

```bash
phantomjs script.js
```

What can I do with PhantomJS?

- Testing
- Getting and grabbing web pages 
- Taking screenshots of web pages
- Clicking buttons and filling forms automatically
- Injecting JavaScript code into web pages  
- To illustrate some api of PhantomJS, let's take a screenshot of google.com

```js
var page = require("webpage").create();

var homePage = "http://www.google.com/";

page.open(homePage);
page.onLoadFinished = function(status) {
  var url = page.url;

  console.log("Status:  " + status);
  console.log("Loaded:  " + url);

  if (url === homePage) {
    page.evaluate(function() {
      var searchBox = document.querySelector(".lst");
      var searchForm = document.querySelector("form");

      searchBox.value = "JSPro";
      searchForm.submit();
    });
  } else {
    page.render("results.png");
    phantom.exit();
  }
};
```