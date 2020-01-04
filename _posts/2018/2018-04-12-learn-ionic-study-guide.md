---
layout: post
title: "Ionic 4/Angular Tutorial for Beginners: Learn Ionic Properly To Build Native and Progressive Web Apps [Study Guide v0.1]"
image: "images/content/learn-ionic-guide.png"
excerpt: "Learn Ionic 4 Properly (A Study / Learning Guide) " 
tags : [javascript,ionic] 
---

Throughout this Ionic 4/Angular tutorial guide, we're going to show you a detailed study guide to help you learn Ionic quickly and properly if you are new to Ionic or hybrid mobile development generally.

These study guides are designed for beginners and experienced developers.

This Ionic 4 tutorial guide depends on different paid and free online resources designed to teach you how to build a fully fledged hybrid and cross-platform mobile application from scratch with all features you usually find in a mobile application.

The guide will also help experienced developers get started with Ionic 4 to build mobile applications for Android, iOS and Universal Windows Platform by using a set of books, screen casts and online resources.

First let's start by a comprehensive introduction to Ionic 4 in which we're going to talk thoroughly about hybrid mobile apps, Angular and TypeScript so you learn about everything you should know before you can decide if you should invest your time (and maybe money) to master these technologies or that's not a good fit for you.

**Start by reading this Introduction to hybrid mobile apps and Ionic 4**

## Introduction to Ionic 4 and Hybrid Mobile Development

In this introduction to Ionic 4, I'm going to explain:

* What is hybrid mobile development? 
* How it is different from native mobile development? 
* What Ionic 4 is? 
* And how it is related to both TypeScript language and Angular 4|5 framework? 
* What can Ionic 4 offer you as a developer? 
* And what other alternatives you can take into consideration?

We're going also to talk about where you can find Ionic 4 jobs and Ionic 4 resources or developers.

We're also going to cover some frequently asked questions about Ionic 4, TypeScript and Angular, Ionic 4 pros and cons etc.

We're really pleased and exited to teach you about this technology and we hope you are exited to know everything about Ionic 4 and that you find this article helpful with all resources we're going to recommend. But please you can also help us by any type of feedback, using the comments box below, either if it's related to the recommended resources, maybe you have stumbled upon better books, screen casts or free resources and tutorials on the web, or any type of errors. Please don't hesitate to send your feedback by comment or email. After all, we are all here to learn something new, that can add value to our skills.

We're going to honestly provide you with accurate information and best recommended material to learn Ionic 4 based on our own experience but nothing is perfect, so your feedback will be helpful and appreciated either for us or other people who are still in their first steps to learn how to build hybrid mobile apps using web technologies, particularly Ionic 4.

Now let's begin with our introduction to Ionic 4 and hybrid apps.

## What is Hybrid Mobile Development?

Hybrid mobile development refers to the process of developing mobile apps using a mix of web technologies, which were designed on the first place to build web apps, thanks to some clever developers who built tools used to adopt the existing web tools in order to build native-like mobile apps.

A hybrid mobile app is a web application with a mobile-like UI, built using HTML, JavaScript and CSS, and packaged with a native container such as Apache Cordova (the most popular native container) or Capacitor (the new native conatiner by the Ionic team which's designed as a better and modern alternative to Cordova).

Ionic 4 (and its previous versions) is based on Apache Cordova (future versions will use Capacitor by default but will also support Cordova) so what is Cordova and what it does? 

Apache Cordova is by itself a framework to build hybrid mobile apps but also a native web container or more precisely an embedded browser based on Chromium which allows you to package and present users with a web application which has a mobile like user interface, that can be downloaded from app stores, installed on the user device and more importantly have access to native device features such as Geolocation, different sensors and Camera etc.

Cordova makes use of multiple plugins to allow your apps to access native features using only JavaScript instead of native mobile languages such as Java, Swift or C#. Experienced Java, Swift and C# developers can build Cordova plugins to access some native feature so other web developers can use them in their mobile apps without having any knowledge about native languages and the underlying systems features or APIs.

So, do you need to use the device camera in your hybrid mobile app? No problem and no fears, you don't need to know Java (For Android) or Swift (For iOS) or C# (For the Universal Windows Platform) you can just grab a Cordova plugin for Camera access, install it then call the API with JavaScript. Isn't that very awesome? I personally find it very awesome even if I'm not really that bad with Java and C#. I don't know anything about Swift but I don't have to target iOS too. But anyway the idea of Cordova plugins can be of a great help for most developers since you can target many mobile platforms with one plugin i.e one mobile app with the same code base without having to reinvent the wheel to target each mobile platform.

As I said Cordova is not just a native web container but also a framework for building hybrid mobile apps using the three pillars of the web: JavaScript, HTML and CSS. So why using Ionic 4?

Before answering this question, let's answer an important related question:

## What is Ionic?

Ionic is a hybrid mobile framework used to build cross-platform mobile apps that can target Android, iOS and Windows with the same code base. It allows developers to build once and deploy everywhere.

Ionic is based on Cordova which means all interfacing with underlying device system features is done with Cordova. In fact the pure Ionic library is just a mobile User Interface library that offers developers common UI controls and patterns which have two main goals:

* You can build your mobile application without being a mobile UI designer or a CSS guru.

* You can build your mobile application without worrying about best practices and performance issues.

Ionic has two major versions which are both based on Cordova for low level features but uses different stack on top level.

* Ionic 1 is the first version. It uses JavaScript and AngularJS. AngularJS is a JavaScript client side MVC framework built and used by Google to build frontends with best practices, a MVC approach and best design patterns such as Inversion of Control and Dependency Injection.

* Ionic 2/3 is the second major version which is based on Angular 2/4/5, a completely rewritten from scratch framework based mainly on TypeScript, with better performance and more features than AngularJS.

* Ionic 4 is the coming version. It's framework agnostic which means it's no more dependent on Angular. You can use plain JavaScript, TypeScript, React, Vue, Angular and even jQuery to build mobile apps with Ionic. Ionic 4 is based on web components which are supported in major modern browsers so you can also use Ionic 4 to build UIs for your Progressive Web Apps (PWAs).



## Next Steps...

So now that you have a basic understanding of Ionic and hybrid mobile development. Let's learn about the first steps to get started.

Before you can build mobile apps with Ionic, you need to have a development environment with Node.js and NPM installed.   

You can install Node.js with NPM following easy steps in major operating systems. 

The simplest solution is to go to [the official Node.js website](https://nodejs.org/en/download/) and download the installer compatible with your operating system.

If you use Ubuntu, you can also follow [How To Install Node.js on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04).


Once you have installed the requirments. You need to install the Ionic CLI--a Node utility that allows you to generate Ionic projects from the command line interface.

Installing the Ionic Command Line Interface (CLI) is easy. Simply run the following command:

```bash
$ npm install -g ionic@latest
``` 

You can then verify the installation by running:

```bash
$ ionic --version
```

You should get the installed version of Ionic.

You can find more information about the CLI from [this page on the official docs](https://ionicframework.com/docs/cli/).

## How to Use Cordova

In Ionic 4, the only way you have to bring native capabilities to Ionic apps is through Cordova (for Ionic 4+, you'll have Capacitor as the default option and Cordova too). You can install Cordova using:

```bash
$ npm install -g cordova
```

You can use any Cordova command through the `ionic cordova` command.

You can find the Cordova CLI commands from this [link](https://cordova.apache.org/docs/en/latest/reference/cordova-cli/).

For detaild Android and iOS guides make sure you check: the [iOS Platform Guide](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html)
and the [Android Platform Guide](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html).


## Creating your First Ionic 4 Project

After installing the required dependencies. You can now use the Ionic CLI to generate Ionic projects based on various starters: For example for to generate a blank project, simply run the following command: 

```bash
ionic start myapp blank --type=angular
``` 
For detailed instructions about generating Ionic 4 project using the Ionic CLI you need check this [tutorial](https://www.techiediaries.com/ionic-create-first-project-app/).



## Getting the Basics of Ionic 4

Before you can build any real world apps, you need to familiarize yourself with the fundamental concepts of Ionic. This is list beginner's friendly tutorials:

- [Ionic 4-Create and build first project or application (Android and iOS)](https://www.techiediaries.com/ionic-create-first-project-app/)
- [Ionic 2/Ionic 4-Adding Cordova Android Platform](https://www.techiediaries.com/ionic-cordova-add-android-platform/)
- [Ionic 2/Ionic 4-Create, Generate and Add Pages](https://www.techiediaries.com/ionic-create-generate-add-pages/)
- [Ionic CLI v3-start command templates and options](https://www.techiediaries.com/ionic-cli-v3-start-templates/)
- [Ionic 4/Ionic 2 Modals](https://www.techiediaries.com/ionic-modals/)
- [Understanding Ionic 2 Navigation](https://www.techiediaries.com/ionic-2-navigation/)
- [Learn Ionic 4-what is a component and page? and how to use them?](https://www.techiediaries.com/ionic-3-pages-components/)
- [Ionic 4-Lazy Loading Modules](https://www.techiediaries.com/ionic-3-lazy-loading-modules/)
- [Theming and Styling Ionic 2 Apps](https://www.techiediaries.com/ionic2-theming-styling/)
- [Ionic Native 3.x](https://www.techiediaries.com/ionic-native-3-x/)
- [Developing Ionic Apps Entirely in The Browser-Mocking SQLite Native Plugin](https://www.techiediaries.com/mocking-native-sqlite-plugin/)
- [Playing videos with Ionic 2/Ionic 4 and Cordova Video Player plugin](https://www.techiediaries.com/ionic-video-playing/)
- [Using PouchDB and SQLite with Ionic 4: A CRUD Example](https://www.techiediaries.com/ionic-sqlite-pouchdb/)
- [Ionic 4-Create a Nearby Restaurants App with Geolocation Plugin, Google Maps and Places API](https://www.techiediaries.com/barcode-qr-code-scanner-encoder-ionic-3/)  

 







