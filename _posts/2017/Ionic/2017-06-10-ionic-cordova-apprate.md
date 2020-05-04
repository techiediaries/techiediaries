---
layout: bpost
title: "Ionic 5/Angular - Adding App Rates (Review Stars) with Cordova and Ionic Native 5"
image: "images/content/ionic-cordova-apprate.png"
excerpt: "Ionic 5/Angular - Adding App Rates (Review Stars) with Cordova and Ionic Native 5" 
tags: ionic 
date: 2020-05-03
---


In this tutorial we will be covering how to add app rating to our mobile apps created with Ionic 5/Angular and Cordova. 


We are going to create a simple example app which prompts the user to rate the application.

## Why Using App Rating with Ionic 5

App rating allows users to rate your application. Rating is represented by stars which you can find when your visit the app details page on app stores.

As a rule on major app stores, the more good stars and reviews you have the more your app will be ranked high in the app stores search which will increase the downloads and earnings (Via sales, ads etc.)


## Create a New Ionic 5/Angular Project

So let's start by creating a new Ionic 5 app, to demonstrate how to add App Rating, using The Ionic CLI (v5):

    ionic start AppRateExample blank 

## Installing the App Rating Cordova and Ionic Native 5 Plugins

Next, navigate inside your app folder and install Cordova plugin for App Rating and its Ionic Native 5 wrapper as follows:

    cd AppRateExample
    ionic plugin add --save cordova-plugin-apprate
    npm install --save @ionic-native/app-rate


Next, open the <em>src/app/app.module.ts</em> file and add a provider for this plugin:

    import { AppRate } from '@ionic-native/app-rate';

    @NgModule({
    declarations: [
        MyApp,
        HomePage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        AppRate,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
    })
    export class AppModule {}


Next, open the <em>src/pages/home/home.html</em> file and add a button which triggers app the rating functionlity:

    <button ion-button full large (click)="rateMe()">Rate Me</button>

Next, open the <em>src/pages/home/home.ts</em> file and add the `rateMe()` method as follows:

    import { Component } from '@angular/core';
    import { AppRate } from '@ionic-native/app-rate';
    
    @Component({
    selector: 'home',
    templateUrl: 'home.html',
    })
    export class HomePage {

    constructor(private appRate: AppRate) {
    }

    rateMe(){
        this.appRate.preferences.storeAppURL = {
        ios: '< my_app_id >',
        android: 'market://details?id=< package_name >',
        windows: 'ms-windows-store://review/?ProductId=< Store_ID >'
        };
    
        this.appRate.promptForRating(true); 
    }

    }
 
Make sure to replace `<my_app_id>` with your iOS app id and replace `<package_name>` with Android package name. Also replace `<Store_ID>` with your Windows store App ID.


## Conclusion

You can now add a Cordova target platform (Andoroid or iOS), build and run your app using 
an emulator or real device to test app rating in your Ionic 5/Angular application . 