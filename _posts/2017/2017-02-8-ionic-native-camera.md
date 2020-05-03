---
layout: bpost
title: "Using Camera with Ionic 5 and Ionic Native 5"
image: "images/content/ionic-native-camera.png"
excerpt: "In this tutorial,we are going to see an example or demo app for accessing native device camera in Ionic 4 apps."
categories : mobiledev
date: 2020-05-03
tags : ionic 
---

{% include image.html
   img="images/content/ionic-native-camera.png"
       title="How to use Camera in Ionic 2 apps with Ionic Native "
%}

In this tutorial, we are going to see an example demo application for accessing native device camera in Ionic 5 apps based on Angular.

## Why Using the Ionic Native 5 Cemera Plugin?

To access or integrate native device features with Ionic 5 apps or even with pure Apache Cordova/Capacitor apps (and mobile web views) we can use Ionic Native 5 which is a wrapper for Cordova or Capacitor plugins that provide better integration with Angular and TypeScript so instead of using callbacks we can use the powerful Promises and Observables APIs.  

Before starting make sure you have Node.js and NPM installed, and of course the Ionic framework v5

## Ionic Native 5 Camera by Example

Since we are using native device features - The Camera - You need to install Cordova using the following command: 
    
    npm install -g cordova 

We need to test our app on a real device. In order to be able to build for your target platform, Android or iOS
you need to have Java SDK installed in case of Android and you need to have a macOS system and Xcode for iOS. 

## Creating a New Ionic 5 Project

So go ahead, open up your terminal under Linux/Mac or command prompt under Windows and then scaffold a new Ionic 5 app using: 

    ionic start ionic-native-example-camera blank --type=angular 

Go ahead and serve the app using the following command:

    cd ionic-native-example-camera 
    ionic serve

You should be able to visit your app with the browser. 

## Adding the Android Platform to your Ionic 5 Project

Now you need to add the target platform. In our case it's Android but you can target iOS too if you have macOS:     

    ionic platform add android

Next add the camera plugin using the following command:

    ionic plugin add cordova-plugin-camera

## Adding the Camera Functionality to your Ionic 5 App

Now everything is setup, we need to add the code for accessing the native camera so open the `home.ts` file or the file where you want to add the code for taking pictures.

On the head of the file add the import instruction  to import Camera from 'ionic-native':

    import {Camera} from 'ionic-native';

Next inside your TypeScript class, add a public member variable for storing image data  

    public image: string;

And then add the method for taking a picture 

  getPicture(){
    
        Camera.getPicture({
            destinationType: Camera.DestinationType.DATA_URL,
            targetWidth: 320,
            targetHeight: 320
        }).then((data) => {
        
            this.image = "data:image/jpeg;base64," + data;
        
        }, (error) => {

            console.log(error);
        });

  }
 
## Conclusion

In this quick tutorial, we've seen how to use the native device Camera with Ionic 5 based on Angular, Ionic Native and Cordova/Capacitor.