---
layout: bpost
title: "Ionic 5 Phone Calls with Cordova and Ionic Native 5"
image: "images/content/ionic-cordova-phone-call.png"
excerpt: "Make Ionic 5 Phone Calls with Cordova and Ionic Native 5" 
date: 2020-05-03
tags: ionic 
---

The primary task of a phone device is to make calls so being able to make calls in Ionic 5 is a nice feature that can be leveraged to create awesome apps.

In this tutorial, we will be seeing how to use Cordova and Ionic Native 5 to make phone calls from within Ionic 5 mobile apps.

## Create an Ionic 5/Angular Project

As always, you can start by scaffolding a new Ionic 5 application using the Ionic CLI 5.

Head over to your terminal/prompt and run the following command:

    ionic start IonicPhoneCallExample blank 
    cd IonicPhoneCallExample 

## Installing the Cordova and Ionic Native 5 Phone Call Plugins

Now, we need to install Cordova plugin for making phone call and its Ionic Native 5 wrapper as follows:

    ionic plugin add --save call-number
    npm install --save @ionic-native/call-number

## Using the Phone Call Plugin in Ionic 5

Next, head over to the <em>src/app/app.module.ts</em> file and add the following code:

    import { BrowserModule } from '@angular/platform-browser';
    import { ErrorHandler, NgModule } from '@angular/core';
    import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
    import { SplashScreen } from '@ionic-native/splash-screen';
    import { StatusBar } from '@ionic-native/status-bar';
    import { CallNumber } from '@ionic-native/call-number';


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
        CallNumber,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
    })
    export class AppModule {}
        

Next, open the <em>src/pages/home/home.ts</em> file and add a method to make a phone call as follows:

    import { Component } from '@angular/core';
    import { CallNumber } from '@ionic-native/call-number';

    @Component({
    selector: 'home',
    templateUrl: 'home.html',
    })
    export class HomePage {

    constructor(private callNumber: CallNumber) {
    }

    launchDialer(n:string){
            this.callNumber.callNumber(n, true)
            .then(() => console.log('Launched dialer!'))
            .catch(() => console.log('Error launching dialer'));
    }

    }

Finally, open the <em>src/pages/home/home.html</em> file and add a button to launch the dialer:

    <button ion-button (click)="launchDialer('00 00 00 00')">Call 00 00 00 00</button>


## Conclusion 

You can now add a target platform and test your Ionic 5 app in a real mobile device by making a phone call.

    