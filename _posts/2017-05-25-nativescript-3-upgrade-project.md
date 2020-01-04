---
layout: post
title: "NativeScript 3 - Upgrade your existing project(s) "
image: "images/content/nativescript-3-upgrade-project.png"
excerpt: "Lets see how to upgrade an existing project to the latest NativeScript version 3.0" 
tags : [nativescript]
---

{% include image.html 
    img="images/content/nativescript-3-upgrade-project.png" 
    title="NativeScript 3 ,upgrade a project" 
%}

The NativeScript framework is composed of many parts ,the CLI utility ,the runtimes for Android and iOS then 
the cross platform modules ,so you should make sure to upgrade all these parts ,which is fairly easy ,just follow these steps.

The first thing you need to upgrade is the CLI tool for NativeScript which can be done via npm .So open 
your terminal or command prompt ,make sure you have Node.js and NPM installed then run :

    npm install -g nativescript

If successfully completed ,npm will grab the latest version of NativeScript CLI and install it on your 
machine .

To make sure you have successfully upgraded to the latest version ,run 

    tns --version

If you are creating a new project with the upgraded CLI ,you will have all the other parts updated to their 
latest versions but if you have an existing project created with an older version of NativeScript CLI then 
you should follow the next steps to upgrade your project to use latest versions of different parts .

Navigate to your project root directory and just enter :

    tns update 

This command will upgrade your project with the latest iOS/Android runtimes and cross-platform modules.

Next if you have added an Android platform in your project then you have to remove it using 

    tns platform remove android

Then add it again 

    tns platform add android

You can do the same for iOS 

    tns platform remove ios
    tns platform add ios               

Finally upgrade tns core modules via npm with 

    npm install tns-core-modules@latest --save

These are all the steps which are required to upgrade an existing NativeScript project to the latest 
available version which when writing this guide :NativeScript 3.0.0 

     


