---
layout: post
title: "Upgrading to Ionic 3.2.0"
image: "images/content/ionic-3-2-0-upgrade.png"
excerpt: "How to upgrade to Ionic 3.2.0 guide" 
tags : [ionic]
---


{% include image.html 
    img="images/content/ionic-3-2-0-upgrade.png" 
    title="Ionic 3.2.0 upgrade" 
%}

Today ,we'll be covering the upgrade process to Ionic 3.2.0 .This release contains numerous bug fixes ,features 
and performance improvements ,so we are going to see how to take our current Ionic project and upgrade it to 
Ionic 3.2.0   

Go ahead open your project package.json ,remove all and copy paste the following :

    "dependencies": {
    "@angular/common": "4.1.0",
    "@angular/compiler": "4.1.0",
    "@angular/compiler-cli": "4.1.0",
    "@angular/core": "4.1.0",
    "@angular/forms": "4.1.0",
    "@angular/http": "4.1.0",
    "@angular/platform-browser": "4.1.0",
    "@angular/platform-browser-dynamic": "4.1.0",
    "@ionic-native/core": "3.6.1",
    "@ionic-native/splash-screen": "3.6.1",
    "@ionic-native/status-bar": "3.6.1",
    "@ionic/storage": "2.0.1",
    "ionic-angular": "3.2.1",
    "ionicons": "3.0.0",
    "rxjs": "5.1.1",
    "sw-toolbox": "3.6.0",
    "zone.js": "0.8.10"
    },
    "devDependencies": {
    "@ionic/app-scripts": "1.3.7",
    "typescript": "2.2.1"
    } 

If you are using the version 3 of Ionic CLI ,you should also add these dev dependencies

    "@ionic/cli-plugin-cordova": "1.0.0",
    "@ionic/cli-plugin-ionic-angular": "1.0.0",

Next you should remove your existing node_modules directory and run :

    npm install 

To install the new versions of dependencies .

Now you should be able to serve your project with 

    ionic serve 


You can also watch this video by Paul Halliday on Youtube 

<iframe width="640" height="360" src="https://www.youtube.com/embed/Z-XYM5VcqAQ" frameborder="0" allowfullscreen></iframe>

