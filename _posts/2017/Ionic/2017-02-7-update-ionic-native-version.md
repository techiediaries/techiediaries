---
layout: post
title: "How to Update Ionic Native Version 5"
image: "images/content/update-ionic-native-version.png"
excerpt: "How to update Ionic Native to latest version "
categories : mobiledev
tags : ionic 
---

In this quick post, we are going to see how to check the current version of your Ionic Native module and how to update Ionic Native to the latest version.

At the time of this writing, Ionic Native is in version 5.

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


