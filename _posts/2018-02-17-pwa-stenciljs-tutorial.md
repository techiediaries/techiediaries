---
layout: post
title: "Building a PWA with Stencil"
image: "images/content/stencil.jpg"
excerpt: "In this tutorial we'll get started using Stencil and learn the very first basics then next we'll build a simple real world PWA." 
tags : [javascript , stencil , pwa] 
---

PWAs or Progressive Web Apps are an app-like web experiences that present many advantages to users such as:

* Reliability 
* Engage-ability 
* Rapidity/Performance

Read more about what makes an app a PWA from [Google developers blog](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/)

You can also read [my article about PWAs in SitePoint](https://www.sitepoint.com/progressive-web-apps-a-crash-course/)

Without further information about PWAs let's learn how we can build a very fast PWA using a new tool created by the Ionic Team [StencilJS](https://stenciljs.com/) 

Stencil is a web components compiler that can be used to build modern and fast front end web applications using web components.

New to this concept of web components? this is an easy to understand definition 

>Web components are a set of web platform APIs that allow you to create new custom, reusable, encapsulated HTML tags to use in web pages and web apps. Custom components and widgets build on the Web Component standards, will work across modern browsers, and can be used with any JavaScript library or framework that works with HTML.[Source](https://www.webcomponents.org/introduction)

So web components are a set of modern browsers to allows developers to create their own HTML tags (i.e they can extend the HTML language), re-use them without re-inventing the wheel each time and share them with other developers.

Once you create a web component you can use it just lie you use any standard HTML tag. For example:

```html
<my-comp></my-comp>
``` 

It goes without saying that you can create web components without Stencil so why using Stencil?

Stencil provides you with

* an easy TypeScript API to create your component and then generate a standard compliant  web component (specifically a *Custom Element*)
* a set of modern APIs such as virtual DOM and JSX 
* 6kb min+gzip runtime, server side rendering
* React Fiber inspired Async rendering 
* Reactive data-binding
* Framework agnostic (web components can be used with any framework or with no framework if you choose)
* live reload and development server like most modern tools
* and helps you easily build PWAs based based on web standards and without a framework

Watch this launch video for more information 
<iframe width="700" height="450" src="https://www.youtube.com/embed/UfD-k7aHkQE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>



## What You Will Learn?

In this tutorial we'll get started using Stencil and learn the very first basics then next we'll build a simple real world PWA.

You'll learn

* how to install Stencil
* how to create your first web component with Stencil and TypeScript 
* how to build and generate your web component
* how to build a simple PWA from scratch using Stencil

## Requirements 

Like most modern JavaScript tooling these days, you'll need Node.js and NPM installed.

If they are not yet installed (maybe your bought a new computer!) just head over to the [official website](https://nodejs.org/en/) for Node.js and grab the installer for your operating system. The installation process is generally simple.   

## Starting a New Stencil Project

Starting a Stencil project involves only cloning  an [official project starter](https://github.com/ionic-team/stencil-app-starter) from GitHub then install the dependencies

So head over to your terminal (or command prompt) and run the following command (you need to have Git installed)

```bash
git clone https://github.com/ionic-team/stencil-app-starter my-stencil-pwa
```

This will create the `my-stencil-pwa` folder and clone the starter project files there.

You'll need to navigate inside the root folder of your project and install dependencies:

```bash
cd my-stencil-pwa
npm install
```   

Next you can start a live-reload local server by running the *npm* start script

```bash
npm start
```  
If you get an error related to Node.js ENOSPC (Error Not Enough Space) on Linux or Mac but still have the enough space on your drive just increase the number of system watchers by running this command: 

```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

The local server is running at http://localhost:3333/

This is the directory structure of the project 
  
![](https://screenshotscdn.firefoxusercontent.com/images/b97b0a37-7a5e-4e19-8505-28cd778e0e8b.png)

If your Stencil app starts with this error: **This Stencil app is disabled for this browser.** just like in the following screen shot 

![](https://screenshotscdn.firefoxusercontent.com/images/2639802d-c94a-4917-bc8d-485526bcd3cc.png)

The error is due to your browser (Firefox in my case) not yet supporting *ES Module Imports* 

You just need to run the following command instead 

```bash
npm run dev --es5
```
You should now be able to see your app up and running 

![](https://screenshotscdn.firefoxusercontent.com/images/8819f2cf-8b85-414a-a18b-7233f76bed28.png)




