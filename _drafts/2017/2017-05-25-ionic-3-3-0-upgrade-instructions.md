---
layout: post
title: "Upgrading to Ionic 3.3.0 "
image: "images/content/ionic-3-3-0-upgrade.png"
excerpt: "How to upgrade to Ionic 3.3.0 guide" 
tags : [ionic]
---


{% include image.html 
    img="images/content/ionic-3-3-0-upgrade.png" 
    title="Ionic 3.3.0 upgrade" 
%}

Ionic 3.3.0 is released in 24-05-2017 so it's time to upgrade our projects .If you are working with 
an existing project that uses the previous Ionic 3.2.0 version you can simply upgrade to the new version 
following the simple steps in this tutorial .

First what is new with Ionic 3.3.0 ?

the <em>ionic-angular</em> package has now support for the latest Angular 4.1.2 version and also typescript 
2.3.3 

Also this version has fixed numerous bug fixes and some features specifically related to RTL support .


To update your existing Ionic 3.2.0 project all you need to do is :

First remove your existing node_modules folder .

Next update your project package.json project to reflect the new versions of different dependencies 

Here is an example 

    "dependencies": {
    "@angular/common": "4.1.2",
    "@angular/compiler": "4.1.2",
    "@angular/compiler-cli": "4.1.2",
    "@angular/core": "4.1.2",
    "@angular/forms": "4.1.2",
    "@angular/http": "4.1.2",
    "@angular/platform-browser": "4.1.2",
    "@angular/platform-browser-dynamic": "4.1.2",
    "@ionic-native/core": "3.10.2",
    "@ionic-native/splash-screen": "3.10.2",
    "@ionic-native/status-bar": "3.10.2",
    "@ionic/storage": "2.0.1",
    "ionic-angular": "3.3.0",
    "ionicons": "3.0.0",
    "rxjs": "5.1.1",
    "sw-toolbox": "3.6.0",
    "zone.js": "0.8.11"
    },
    "devDependencies": {
    "@ionic/app-scripts": "1.3.7",
    "typescript": "2.3.3"
    }

Next you can optionally get rid of <em>src/declarations.d.ts</em> file which is no longer necessary with 
this new version of TypeScript .By removing this file you'll get better import error messages by TypeScript .


You can also follow this video from Paul Halliday on how to upgrate your existing project to Ionic 3.3.0 version

<iframe width="640" height="360" src="https://www.youtube.com/embed/7IHZF5jSgLw" frameborder="0" allowfullscreen></iframe>
