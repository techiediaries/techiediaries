---
layout: post
title: "Ionic 2 / Ionic 3 - Adding App Rates (Review Stars) with Cordova and Ionic Native 3.x+"
image: "images/content/ionic-cordova-apprate.png"
excerpt: "Ionic 2 / Ionic 3 - Adding App Rates (Review Stars) with Cordova and Ionic Native 3.x+" 
tags: ionic 
---

{% include image.html 
    img="images/content/ionic-cordova-apprate.png" 
    title="Ionic 2/3 App Rate" 
%}

Introduction 
----------------
----------------

In this tutorial we will be covering how to add app rating to our mobile apps created with Ionic 2 / Ionic 3 
framework .

We are going to create a simple example app which prompts the user to rate the application .

App rating allows users to rate your application .Rating is represented by stars which you can find when 
your visit the app details page on app stores .

As a rule on major app stores ,the more good stars and reviews you have the more your app will ranked high 
in app stores search which will increases the downloads and earnings (Via sales ,ads etc .)


Getting started 
---------------------
---------------------

So lets start by creating a new Ionic app ,to demonstrate how to add App Rating ,using The Ionic CLI (v3)

    ionic start AppRateExample blank 

Navigate inside your app root folder then install Cordova plugin for App Rating and its Ionic Native wrapper

    cd AppRateExample
    ionic plugin add --save cordova-plugin-apprate
    npm install --save @ionic-native/app-rate


Open <em>src/app/app.module.ts</em> then add a provider for this plugin .

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


Open <em>src/pages/home/home.html</em> then add a button which triggers app rating .

    <button ion-button full large (click)="rateMe()">Rate Me</button>

Open <em>src/pages/home/home.ts</em> then add rateMe() method :

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
 
Replace < my_app_id > with your iOS app id .

Replace < package_name > with Android package name .

Replace < Store_ID > with your Windows store App ID .


Conclusion
-------------
-------------

You can now add a Cordova target platform (Andoroid ,iOS and Windows ) ,build and run your app using 
an emulator or real device to test app rating In your Ionic 2/3 application . 