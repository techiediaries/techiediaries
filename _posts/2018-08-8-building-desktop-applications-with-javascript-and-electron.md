---
layout: post
url: /building-desktop-applications-javascript-electron
title: Electron Tutorial
author: mrnerd
excerpt: "Building desktop apps with Electron" 
tags : electron
---

In this tutorial, we will learn to build desktop applications with Electron and web technologies i.e HTML, CSS and JavaScript.

Electron is a Javascript runtime environment based on Node.js and chromuim which enables developers to build Desktop applications with web technolgoies i.e Javascript,CSS and HTML.

Electron is a web application runtime built on Node.js and the open source Google project Chromuim,which brings web technoglogies to the Desktop allowing developers to build Desktop applications for major operating systems such as Windows,MAC and Linux ,using JavaScript ,HTML and CSS. 

Let's clear some confusion about Electron so what Electron is and what it is not?

What Electron is? 

- It is a JavaScript runtime for building desktop applications
- It is a runtime which provides a native Cross OS API 
It is Node.js but in the Desktop
- It is a chromium browser

What Electron is not?

- It is not a JavaScript binding to GUI libraries of Popular OS such MAC, Windows and Linux 

- It is not a JavaScript framework

- Electron makes use of web technologies such as CSS and HTML to create GUI interfaces and its cross operating system runtime API to access os functionality 

- Electron is a relatively young project created by GitHub to build its Atom Editor, previously was known as Atom Shell. It is free and open source, it's being used by big companies such as Microsoft to build its visual studio IDE and Facebook to build its editor nuclide. 

## Installing Electron

[electron-prebuilt](
https://github.com/mafintosh/electron-prebuilt
) is an npm module that lets you install prebuilt Electron binaries from the command line 

```bash
npm install -g electron-prebuilt
```

## Creating your first Electron App

 https://github.com/atom/electron/blob/master/docs/tutorial/quick-start.md 

Create an electron application inside a folder for example myApp

Now on your command line just type:

electron myApp/
electron-packager - package and distribute your electron app in OS executables (.app, .exe etc)
electron-builder - create installers for Windows and OS X. It's built to work together with electron-packager
menubar - high level way to create menubar desktop applications with electron


Starting with version 0.36 electron can capture desktop screen using desktopCapturer module

https://github.com/atom/electron/blob/master/docs/api/desktop-capturer.md

// In the renderer process.
var desktopCapturer = require('electron').desktopCapturer;

desktopCapturer.getSources({types: ['window', 'screen']}, function(error, sources) {
  if (error) throw error;
  for (var i = 0; i < sources.length; ++i) {
    if (sources[i].name == "Electron") {
      navigator.webkitGetUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: sources[i].id,
            minWidth: 1280,
            maxWidth: 1280,
            minHeight: 720,
            maxHeight: 720
          }
        }
      }, gotStream, getUserMediaError);
      return;
    }
  }
});

function gotStream(stream) {
  document.querySelector('video').src = URL.createObjectURL(stream);
}

function getUserMediaError(e) {
  console.log('getUserMediaError'); }
} 

---
layout: post
title: Electron Tutorial (Part 1)
image: "images/content/building-an-invoice-app-for-desktop-with-javascript--angularjs-and-electron/titleimage.png"
excerpt: "Throughout this tutorial we are going to learn how to build cross Desktop applications with modern web technologies using Electron"
tags : elecron
---

<a data-pin-do="embedPin" data-pin-width="large" href="https://www.pinterest.com/pin/427490189612765470/"></a>



In this tutorial we are going to build an invoice application with Electron which allows users to create invoices, and then export them as PDF files or send them to customers via email. I'm going to show you how to create a Desktop application with modern web technologies such as Angular.js using the awesome GitHub project Electron. With the Electron project web developers can use their web development skills with JavaScript ,CSS and HTML to build cross platform applications for Windows,Linux and MAC .The final source files of this tutorial will be hosted in [GitHub under the MIT license](https://github.com/techiediaries/invoice-electron-angularjs-app) and you will also be able to download and use the compiled app(Available for both Windows and Linux).

Before starting lets talk briefly about the tools and frameworks we are going to use in this tutorial:

## Electron ## 

As I said before Electron was created by GitHub for its Atom editor .It is an open source project which provides a runtime environment so anyone which can build a website can build a Desktop application without using the old classical tools such as Java or C++.Electron is based on Node.js and the chromuim open source project.When writing this tutorial Electron version is 1.1.3 which has many improvements over previous versions.

## Angular.js ##

A client side Javascript framework which follows the Model View Controller (MVC) architectural pattern .It is created by Google and has a great open source community around it,it's used by many JavaScript developers around the world. 

Now lets start building our invoice desktop application.The requirements we need to implement are:

### Gathering invoice information.
The first step is to get the necessary information from users.Things such as the name,address,company,logo and items which need to be invoiced.   

### Exporting  and saving the invoice as a PDF file.
Exporting your invoice as a PDF file is a crucial feature to add to our application since communicating your invoice is the most important step for anyone using the application.

### Sending the invoice via email to customers.
Email is one of the most used and important online communication tools.So Adding the invoice emailing feature to our application makes it more professionnal.With one click of a button,application users can send the final generated invoice as a PDF file to their customers via email.   


Installation and configuration
---------------------------------

Before beginning the development process you need to make sure you have everything installed,starting with the principal platform Node.js and then the necessary modules you need to have to work with Electron itself and the required packages for specific functionality such as working with PDF files and emailing.

I'm not going to show you [how to install Node.js here](/how-to-install-node-js-6-on-ubuntu-15/) so if you haven't installed it yet you can easily find any tutorial on the web to do that ,I recommend you to install it via NVM manager which allows you to install and switch between many versions of Node.js without any conflict.

After you have installed the Node.js platform lets proceed to installing Electron,you can install it easily,typing one command,via the NPM package manager so just execute the following line in your CLI:

		npm install -g  electron-prebuilt

This will install Electron globally ,you can also choose to install it locally per project. 

So first create a Node.js module :

		npm init

and then

		npm install --dev electron-prebuilt

this will install elecron-prebuilt as a dev dependency package 

You can also clone an electron quick start project boilerplate from GitHub 

		git clone https://github.com/electron/electron-quick-start  invoiceapp

		cd invoiceapp

		npm install && npm start


Please make sure you have the latest version of Node.js( version 6.2.0 when writing this tutorial) for this to work successfully .

Running the app in this point gives you a basic desktop application with a hello world sentence.Now we need to build our actual invoice app .The first step is writing the HTML code for our app interface and then styling the app using CSS.

Building and styling the interface 
------------------------------------

Now create a folder inside invoiceapp with css name (cd invoiceapp && mkdir css)
Create a styles.css file inside it (cd css && touch styles.css )

To not reinvent the wheel,we are going to use a responsive html invoice template by Jonathan Neal, available on [via this link](http://www.jonathantneal.com/examples/invoice/invoice.zip) under the MIT license and then tweak it to satisfy our needs.

## Conclusion

So that's the first part of our tutorial .In this part we have talked briefly about the Desktop application we are going to build ,the requirements we need to develop and we have taken the first step of building our project.The next part is about creating the application's splash or welcome screen and then building the Angularjs based app.  





