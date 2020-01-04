---
layout: post
title: "How to use Geolocation in Ionic 4/Angular Apps with Ionic Native"
image: "images/content/ionic-native-geolocation.png"
excerpt: "Using Geolocation in Ionic 2 apps with Ionic Native "
categories : mobiledev
tags : ionic 
---

{% include image.html
   img="images/content/ionic-native-geolocation.png"
       title="Using Geolocation in Ionic 2 apps with Ionic Native "
%}


In this tutorial, we are going to build a simple example application with Ionic 4 and Angular which shows you how to use the geolocation native feature of mobile devices.

Lets get started! 

The tutorial assumes you have already installed Node.js and NPM and also the Ionic framework.

If you want to build the app for Android or iOS you have to install the required SDKs.

Unlike the majority of device native features,Geolocation can be tested without using a real mobile device.

By just testing your app with ionic serve on the browser you can work with Geolocation. That's because modern 
browsers implement the HTML5 Geolocation API so Ionic can emulate the native Geolocation of a real mobile device. 

If you have everything installed, open up your terminal under Linux/macOS or your command prompt under Windows
and generate a new Ionic 4 based on Angular project:

    ionic start ionic4-native-geolocation blank --type=angular

Next navigate to your project folder 

    cd ionic4-native-geolocation

If you have not yet installed Cordova, you need to install it using the following command: 

    npm install -g cordova

Then add the target platform to your project

    ionic platform add android

We can also add iOS but since we are developing on Ubuntu we can't target iOS. If you are using a MAC,
you can add the iOS platform too

    ionic platform add ios 

Next you need to add the [Geolocation](http://ionicframework.com/docs/v2/native/Geolocation/) plugin with

    ionic plugin add cordova-plugin-geolocation

Now to use the Geolocation API you have to import it from the `ionic-native` module so go ahead and open the `home.ts` file or wherever you want to your code for accessing Geolocation features and add this line of code: 

    import { Geolocation } from 'ionic-native';

 Here is an example of MyApp component: 

    import { Component } from '@angular/core';
    import { Platform } from 'ionic-angular';
    import { Geolocation } from 'ionic-native';
    import { HomePage } from '../pages/home/home';
 
    @Component({
    template: '<ion-nav [root]="rootPage"></ion-nav>'
    })
    export class MyApp {
    
    rootPage: any = HomePage;
    
    constructor(platform: Platform) {
    
        platform.ready().then(() => {
    
            Geolocation.getCurrentPosition().then((data) => {
                console.log('My latitude : ', data.coords.latitude);
                console.log('My longitude: ', data.coords.longitude);
            });
        
        });
    }
    }   

Make sure you add any code for accessing native features such as Geolocation inside `platform.ready()` method.

After serving this app using:

    ionic serve

You'll get your current latitude and longitude coordinates on the browser console.

## Conclusion

In this tutorial, we've seen how to use Geolocation with Ionic 4 and Angular.



