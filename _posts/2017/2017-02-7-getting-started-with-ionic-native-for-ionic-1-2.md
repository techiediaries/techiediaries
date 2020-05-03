---
layout: bpost
title: "Ionic Native for Ionic 5 with Camera Example"
image: "images/content/getting-started-ionic-native-ionic-1-2.png"
excerpt: "Getting started with Ionic Native for Ionic 5"
categories : mobiledev
date: 2020-05-03
tags : ionic 
---


Ionic native is a wrapper for Cordova and Capacitor plugins that adds a better integration with JavaScript and TypeScript by adding promise and observable support. Ionic native is being defined by Ionic team as a successor to ngCordova for accessing device native features.

Ionic Native 5 is framework-agnostic just like Ionic 4+.

In this post, we are also going to see how to check the current version of your Ionic Native module and how to update Ionic Native to the latest version.

At the time of this writing, Ionic Native is in version 5.

You can use Ionic Native to add any native feature (supported by a Cordova or Capacitor plugin) to your Ionic 5 mobile app.

## What's Ionic Native 5?

[Ionic native](https://ionicframework.com/docs/native) is an Ionic wrapper for Cordova and Capacitor plugins which allows you to interface with mobile device in your 
Ionic 5 app.

From the official docs:

> Build native-powered app experiences with pre-built solutions and a growing library of over 250 Premier and Community plugins. Ionic Native makes it easy to add native device functionality to any Ionic app leveraging Cordova or Capacitor.

Ionic Native 5 offers the following features:

- Native solutions: Complete native solutions for single sign-on, biometrics, and secure offline storage.
- Core Device Features: Core device features like camera, geolocation, keyboard access, contacts, calendar, and more.
- 3rd Party Integrations: Connect to third-party services and cloud providers like Firebase, AWS, and Apple Payment Pass.

These are some common plugins provided by Ionic Native to access the device native features:

- Camera: Take photos, capture video and choose images from the device's image library.
- Keyboard: Configure keyboard behavior (show/hide) and display (sizing/visibility).
- Calendar: Manage mobile device calendar events.
- Contacts: Access to read, write, or select device contacts.
- Geolocation: Device location information, including latitude and longitude.
- File: Common file operations such as read/write and directory access.

## How to Install Ionic Native 5? 

Ionic native is just an NPM module so you can install it and update via npm using your terminal. 

First of all, we need to get the list of all available ionic-native versions so open up your terminal and
type

    npm list ionic-native  

Next you need to verify your currently installed ionic-native version with

    npm info ionic-native version


Next if you have an old version you just need to type this command to update your ionic-native to the latest
version 

    npm update ionic-native


## How to Use Ionic Native 5 by Example?


First create an Ionic 5 project 

    ionic start ionic-native-app blank 
    cd ionic-native-app

Next, install Ionic Native via npm using the following command: 

    npm install ionic-native --save

That is it, you can now use any Cordova/Capacitor plugin supported by Ionic Native 5 but you need to make sure it's added to your project. If it's not added, Ionic Native will warn you and even give you the package name to install the required Cordova or Capacitor plugin.

After installing the plugin, you can import the plugin from the `ionic-native` module and start using it.

Let's install as an example the camera plugin:


    ionic plugin add cordova-plugin-camera


Next, add the following code:

    import {Camera} from 'ionic-native';
    import { Component } from '@angular/core';
    import { Platform } from 'ionic-angular';
    import { HomePage } from '../pages/home/home';
    
    @Component({
    template: '<ion-nav [root]="rootPage"></ion-nav>'
    })
    export class MyApp {
    
    rootPage: any = HomePage;
    
    constructor(platform: Platform) {
    
        platform.ready().then(() => {
    
            Camera.getPicture().then(
                    res => console.log("We have taken a picture!"),
                    err => console.error("Error taking picture", err)
            );
        });
        
    }
    }
    
Next, just build and run your Ionic 5 project and plug in your device with an USB cable:

    ionic run android     

You can see a list of all supported Cordova plugins and examples on how to use them with Ionic Native [here](http://ionicframework.com/docs/v2/native/).