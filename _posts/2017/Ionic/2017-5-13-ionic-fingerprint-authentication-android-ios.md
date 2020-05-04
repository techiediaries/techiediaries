---
layout: bpost
title: "Ionic 5/Angular - Fingerprint Authentication with Android and iOS"
image: "images/content/ionic-fingerprint-authentication.png"
excerpt: "An Ionic demo app for showing how to use Fingerprint Authentication with Android and iOS if it is available" 
date: 2020-05-03
tags : [ionic]
---

{% include image.html 
    img="images/content/ionic-fingerprint-authentication.png" 
    title="Ionic 2 /Ionic 3 - Fingerprint Authentication with Android and iOS" 
%}


In this tutorial, we are going to cover how to add Fingerprint authentication to Ionic 5/Angular apps for Android and iOS so let's get started.

We are going to use Ionic CLI 5 and Ionic 5 but the steps can be also applied to Ionic 4 projects.

## Generating a new Ionic 5 Project 

Open up your terminal on Linux/MAC systems or command prompt on Windows and type the following to generate a new Ionic 5/Angular project:

    ionic start fingerprint-demo blank --type=angular 

## Installing the Cordova and Ionic Native Fingerprint Plugins

Next navigate inside project directory and add both the Cordova plugin for fingerprint authentication and its Ionic Native 5 wrapper:

    cd fingerprint-demo 
    ionic cordova plugin add cordova-plugin-fingerprint-aio --save 
    npm install --save @ionic-native/fingerprint-aio

Next let's add it the the list of providers. Go ahead open your project with a text editor. We are using Visual Studio Code: 

    code .

## Adding the Fingerprint Functionality

Now open <em>src/app/app.module.ts</em> and import the native wrapper for fingerprint auth and add it: 

    import { BrowserModule } from '@angular/platform-browser';
    import { ErrorHandler, NgModule } from '@angular/core';
    import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
    import { SplashScreen } from '@ionic-native/splash-screen';
    import { StatusBar } from '@ionic-native/status-bar';
    import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
    import { MyApp } from './app.component';
    import { HomePage } from '../pages/home/home';

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
        FingerprintAIO,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
    })
    export class AppModule {}

We can now inject it in our components and start using its API to add Fingerprint auth to our apps.

Open <em>src/pages/home/home.ts</em> and add: 

    import { Component } from '@angular/core';
    import { NavController } from 'ionic-angular';
    import { FingerprintAIO ,FingerprintOptions} from '@ionic-native/fingerprint-aio';

    @Component({
    selector: 'page-home',
    templateUrl: 'home.html'
    })
    export class HomePage {
    fingerprintOptions : FingerprintOptions;
    constructor(public navCtrl: NavController,private fingerAuth: FingerprintAIO) {

    }
    public showFingerprintAuthDlg(){
        this.fingerprintOptions = {
            clientId: 'fingerprint-Demo',
            clientSecret: 'password', //Only necessary for Android
            disableBackup:true  //Only for Android(optional)
        }
        this.fingerAuth.isAvailable().then(result =>{
        if(result === "OK")
        {
            this.fingerAuth.show(this.fingerprintOptions)
            .then((result: any) => console.log(result))
            .catch((error: any) => console.log(error));
        }
        });
    }

    }


So we first check if Fingerprint auth is available on our device if OK we call the show method with some required and optional options such as clientId,clientSecret and disableBackup.

Now let's add a button to trigger the Fingerprint auth dialog so open the <em>src/pages/home/home.html</em> file and add: 

    <ion-header>
    <ion-navbar>
        <ion-title>
        Fingerprint auth demo
        </ion-title>
    </ion-navbar>
    </ion-header>

    <ion-content padding>
    <button ion-button (click)="showFingerprintAuthDlg()">show fingerprint auth dialog  </button>
    
    </ion-content>
 
 That's it! You can now test the Fingerprint auth by using a real device which supports Fingerprint authentication: 

    ionic cordova platform add android 
    ionic  cordova run android 

Make sure to attach a real mobile device with an USB cable before your run your app.

## Conclusion

We have seen how to use the Fingerprint plugin for authentication in your Ionic 5 app.