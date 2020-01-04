---
layout: post
title: "Cordova Tutorial: Learn Cordova for Android & iOS"
image: "images/content/cordova-tutorial.png"
excerpt: "A Cordova tutorial for building hybrid mobile apps for Android and iOS"
tags : cordova
---

{% include image.html 
    img="images/content/cordova-tutorial.png" 
    title="A Cordova tutorial for building hybrid mobile apps for Android and iOS" 
%}

In this step by step **Cordova** tutorial, for beginners you are going to learn how to build a cross platform mobile application for Android or/and iOS (and even UWP) from scratch.

If you have a responsive web application that you want to convert to a mobile application or if you want to build one from scratch using only web technologies namely HTML, CSS and JavaScript then this tutorial is for you.
No Java, Swift or C# skills are required, in the same time you can target the three most popular mobile platforms with 
the same code base.

But first of all, let's start with an overview of Cordova.

So what is Cordova and what it can do for you?

Apache Cordova is simply a platform for building hybrid mobile apps with web technologies. It allows you to take
a bunch of HTML files (with CSS and JavaScript) and wrap them in a container,which is a headless web browser.
Not just that, you know mobile apps need access to native device features such as the Camera, the SIM card or the contacts list,just to name a few of them, Cordova has a set of API which allows you to access native features from JavaScript code.

Many developers ask, what is the difference between a responsive web app and a mobile app,the key differences are:

A mobile app can be distributed from the app store where responsive web apps are delivered from a web server.       

Also a mobile app has access to native device features where web apps can not (well they can use the HTML5 API for acessing some 
features such as Camera and Geolocation with user permission) or have very limited access.

So if you  app needs one of these two requirements then you can use Apache Cordova to build it or convert your
responsive web app to a mobile app very easilly.

If you are a web developer (a front end developer) who knows HTML, CSS and JavaScript and you don't want to
spend time and efforts learning a native language such as Java or Swift and your app requirements don't need
to use extensive CPU or GPU power, this tutorial is for you. We are going to show you how to get started
with Cordova from scratch also we will learn how to use the most useful Cordova plugins for accessing native 
device features such as the Camera and the filesystem.

What you need to know?

If you have ever built a client side JavaScript application with or without a client side framework such as Angular that 
will be enough to get started with Cordova to build hybrid mobile apps.
But you can benefit from some knowledge of CSS styles or maybe a framework such as Bootstrap or any other styling
framework so you can build a catching UI for your mobile application.

Also if you have some knowledge of some client side JavaScript framework such as Angular, Backbone or even Emberjs
that will be of a great help for you if you need to structure your app code in the most efficient way.

On the section, we have introduced Cordova and we have said that It's an open source platform or tool for building hybrid and cross platform mobile apps using the web technologies 
you are already familiar with them if you are a front end web developer

Even if you are not a web developer, learning HTML, CSS and JavaScript is much easier
than learning Java, Swift or C#.

Even worst than that, you need to learn the three languages and their mobile related SDKs if you want to build apps to target Android,iOS and Windows Universal Platform 

Thanks to Cordova you learn just HTML, CSS and JavaScript (But I guess you already know them ) and you can build for the three 
platforms with the same code base.

But don't forget, depending on your app requirements sometimes you'll be obliged to use native platforms languages
for example for apps that has extensive use of GPU or CPU.

Now enough theory about Cordova. Let's see get started!

## What you will learn?
<ul>
<li>
How to generate a Cordova project using the Apache Cordova CLI 
</li>
<li>
How to store data with a SQLITE database 
</li>
<li>
How to access and use some important native features such as the Camera, The Geolocation and Contacts list.
</li>
<li>
How to handle mobile related tasks such as scrolling and touch events.
</li>
<li>
How to use Angular and Bootstrap for respectively code structure and UI styling. 
</li>
</ul>

## Tutorial requirements 

As we have said previously you need to have some knowledge of HTML, CSS and JavaScript.

You need to have Node.js and NPM installed so you can install and use the Cordova CLI 

If you want to build your app for Android, you need to have Java and the Android SDK installed  on your system.

If you want to build for iOS, you need to have a MAC system and Xcode installed.

For development you can create your app and test it on the browser without any platform requirement (except for Nodejs)

But for testing native features you need a real device attached to your computer with an USB cable.

Before we start ,make sure you have both Node.js and NPM installed because just like any awesome tool these days, Cordova is based on Node.js and can be installed via NPM 

In case you don't have Node.js installed on your system ,you can go to the official Node.js website and grab the Nodejs installer for your system.

Now let's install Cordova.

## Installing Cordova 

Open your terminal under Linux / MAC or your command prompt /power shell under Windows and run the following
command to install Cordova via NPM: 

    npm install -g cordova
    
 On some systems (MAC) you need to add sudo to be able to install cordova globally: 

    sudo npm install -g cordova

 Next navigate to your chosen working directory: 

    cd into-working-directory

 Then enter the following command to scaffold a new Cordova project using the installed Cordova CLI: 

    cordova create app com.techiediaries.hello myApp

The first argument is the name of your project folder.

The second argument is the package name, make sure it is unique.

The third argument is the name of your app.
     

For now, we are going to test our project on the browser so we need to add the browser platform:

     cd app
     cordova platform add browser

Next just serve your app with:

     cordova serve 

You should be able to visit your app by going to http://localhost:8000 

Since you have added nothing to your project. If you visit your app you will just see a bunch of meta information about your project such as the package name, supported platforms and added plugins.

## Building Cordova project for Android 

Now to build your project to target Android you need to add the Android platform with: 

    cordova platform add android 

Make sure you have installed Java and Android SDK and make sure you have ANDROID_HOME environment variable set to your Android SDK location.

Now let's build our app.

Again use your terminal or command prompt to run: 

    cordova build android       

If you have an emulator installed on your system, you can easilly emulate your app with:

    cordova emulate android 

If you want to test on a real device ,use an USB cable to attache your mobile device to your machine and then run the following command: 

    cordova run android 

## Building Cordova project for iOS

Before you can build for iOS you need a MAC system with Xcode IDE. If you fulfill the requirement then just open up your terminal and enter: 

    cordova build ios 

For emulating your app run

    cordova emulate ios

For running your app on a real device enter

    cordova run ios



That is the end of this section, we have seen how to install the Cordova CLI and what requirements you need to have either to install the CLI or to build your project for target platforms.

We have also seen how to build, emulate and run your Cordova project on Android and iOS and how to test the Cordova app on the browser by adding the browser platform and execute cordova serve.

## Conclusion

See you on the next post where we are going to see how to access and use some key native features of mobile
devices with Cordova such as the Camera, the Geolocation API and the contacts list etc.

We are going also to see how to use Bootstrap to style our app and Angular framework to handle business logic 
for our application.

Then how to handle scrolling and touch events.





