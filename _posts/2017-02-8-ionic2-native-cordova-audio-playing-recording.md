---
layout: post
title: "Ionic 4/Angular and Cordova Audio Recording & Playing"
image: "images/content/ionic2-native-cordova-audio-playing-recording.png"
excerpt: "Ionic 2 and Cordova audio recording/playing"
categories : mobiledev
tags : [ionic2 , cordova , ionic ]
---

![Ionic 4/Angular and Cordova Audio Recording & Playing](/images/content/ionic2-native-cordova-audio-playing-recording.png)

In this Ionic 4/Angular tutorial, we are going to teach you step by step how to create a hybrid mobile app for Android (And iOS and Windows Phone if you want too) using the latest version of the Ionic framework. 

The cross platform application we are going to build an application that can be used as an audio player and recorder so it needs to access the device microphone and speaker
which can be easily achieved using a Cordova plugin - [MediaPlugin](http://ionicframework.com/docs/v2/native/mediaplugin/){target:_blank}
that allows to play and capture/record audio using native features of your device.

The tutorial assumes you have already installed and configured your environment. Basically you need to have:

- The Latest versions of Node.js and NPM innstalled (so you can install Ionic CLI 4).
- Ionic framework installed.
- Java and Android SDK installed to be able to build your app APK.
- Xcode and a MAC system for iOS .

Now open up your terminal under Linux/MAC or command prompt/power shell under Windows and enter the following
instructions to scaffold a new Ionic 4 project based on Angular:

    ionic start ionic4-audio-recorder-player blank --type=angular

Next, we need to install Cordova. So go ahead and type:

    npm install -g cordova 

Next navigate into your project root folder and add your target platform:

    cd ionic4-audio-recorder-player   
    cordova platform add android 

Next install the `ionic-native` package from npm using the following command:

    npm install ionic-native --save

          
