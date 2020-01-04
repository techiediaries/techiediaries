---
layout: post
title: "Learn Ionic 3: Easy Steps Tutorial"
image: "images/content/learn-ionic-2.png"
excerpt: "A tutorial to learn Ionic 3 in 7 easy steps" 
tags: [ionic2 , ionic ] 
---

Throughout this **Ionic 2/3** tutorial you'll learn to build hybrid mobile apps with your web development skills and target more than one
mobile platform--Android, iOS and Universal Windows Platform. 

In this tutorial you are going to learn Ionic 3 and how to build hybrid mobile apps using web technologies such as HTML, JavaScript and CSS but before writing code let's start by setting up the development environment.

Just like any awesome framework or library nowadays, the Ionic CLI is based on Node.js so you need to install Node.js on your operating system, the simplest way is to go to the official Node.js website and download the Node.js version compatible with your system.


After successfully installing Node.js you can now install Ionic Command Line Interface using NPM:

```bash
$ npm install -g ionic 
```

If this goes without any errors then you are almost ready to create your first Ionic 3 project.

To create a new Ionic 3 application, you need to use the Ionic CLI we have just installed by running:

```bash
$ ionic start techieApp blank 
```

- `techieApp` is the name of your app/project. 
- `blank` is the name of the template used to generate your application, other templates are *sidemenu, tabs and tutorial*.

<strike>--v2 tells the CLI to generate a new Ionic 2 app. If you don't specify it an Ionic 1 app will be generated.</strike>

Now let's run our blank app.

What is really cool about Ionic 2 and hybrid mobile frameworks is that you can test your app in the browser just like any web app which is a really good thing in development phase so go ahead, navigate into your app folder and execute the `serve` command 

```bash
$ cd techieApp
$ ionic serve 
```

Congratulations, you have launched your first Ionic 3 application.

Ionic CLI serves your app in the browser with live reload which improves your developement workflow but only for testing the parts which don't access native features such as device camera or accelerometer etc. 

To test native features you need to run your app in an actual mobile device or emulator.      

The final resulting app needs to run in a device so you have to build your project for each platform that you want to target. Before you can build your project you need to prepare your local development for that so what exactly you need to do? 

For Android you need to install Java and Android SDK.

For iOS you need to have a MAC with Xcode.

I hope that you have completed this tutorial and successfully started your first Ionic 3 app. See you in the next step of this complete Ionic 3 tutorial in easy steps.





