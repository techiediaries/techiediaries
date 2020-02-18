---
layout: post
title: "Build Progressive Web Apps (PWA) with Angular 9/8 Tutorial and Example"
image: "images/content/angular.png"
excerpt: "Throughout this tutorial, we'll be learning to build an Angular 9 PWA (Progressive Web Application)" 
categories: angular
tags : [angular, angular-9] 
---

Throughout this tutorial, we'll be learning to build an Angular 9 PWA (Progressive Web Application).

A PWA provides a native-mobile-like expereince for web apps. 

PWAs can be installable in your mobile and desktop web browsers without going through app stores for Windows, Android or Apple.

## Initializing a PWA with Angular 9 CLI

Let's now see how to build our Angular 9 PWA by example.

We need to have Node,js and NPM installed on our development machine before getting started.

Next, open a command-line interface and run the following command:

```bash
npm install -g @angular/cli
```

Next, initialize a new Angular 9 project using the following command:

```bash
ng new angular-9-pwa-example
```


## Adding PWA Features to your App

Turning your Angular 9 app to a PWA is very easy using Angular CLI.

Navigate in your project's folder using the following commands:

```bash
cd angular-9-pwa-example
```

Next, run the following command to automatically add PWA features:

```bash
ng add @angular/pwa
```

The command, adds:

- A manifest file named `manifest.webmanifest` for PWA information, 
- A `ngsw-config.json` file for configuring the service worker,
- default incons with many sizes in the `assets/icons` directory which you may change later,
- A service worker using the `@angular/service-worker` package.

The `index.html` file is also updated with the following content:

```html
<link rel="manifest" href="manifest.webmanifest">
<meta name="theme-color" content="#1976d2">
```

Thanks to these updates, your Angular 9 app is a full-featured PWA.

Finally, you need to audit your PWA using Google's Lighthouse by installing the [extension](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=en). 

## Conclusion

We have seen by example how build an Angular 9 PWA with an example.
