---
layout: post
title: "Ionic 2+ - Make Phone Calls with Cordova and Ionic Native 3.x+"
image: "images/content/ionic-cordova-phone-call.png"
excerpt: "Ionic 2+ : Make Phone Calls with Cordova and Ionic Native 3.x+" 
tags: ionic 
---

{% include image.html 
    img="images/content/ionic-cordova-phone-call.png" 
    title="Ionic 2+ - Make Phone Calls with Cordova and Ionic Native 3.x+" 
%}

Introduction 
-----------------
-----------------

The primary task of a phone device is to make calls so being able to make calls in Ionic framework is 
a nice feature that can be leveraged to create awesome apps .

In this tutorial we will be seeing how to use Cordova and Ionic Native 3.x+ to make phone calls from within 
Ionic mobile apps .

Getting started 
------------------------
------------------------

As always you can start by scaffolding a new Ionic 2+ application using the Ionic CLI .

So head over to your terminal/prompt and run :

    ionic start IonicPhoneCallExample blank 
    cd IonicPhoneCallExample 

Now we need to install Cordova plugin for making phone call and its Ionic Native 3.x+ wrapper :

    ionic plugin add --save call-number
    npm install --save @ionic-native/call-number

Head over to <em>src/app/app.module.ts</em> then add :

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
        

Next open <em>src/pages/home/home.ts</em> and add a method to make a phone call .

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

Open <em>src/pages/home/home.html</em> then add a button to launch the dialer .

    <button ion-button (click)="launchDialer('00 00 00 00')">Call 00 00 00 00</button>


Conclusion 
---------------
---------------

You can now add a target platform then test your app in a real mobile device .

    