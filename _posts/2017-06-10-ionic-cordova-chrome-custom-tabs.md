---
layout: post
title: "Ionic 2+ : Open URLs in Chrome Custom Tabs with Cordova and Ionic Native 3.x+"
image: "images/content/ionic-cordova-chrome-custom-tabs.png"
excerpt: "Ionic 2+ : Make Phone Calls with Cordova and Ionic Native 3.x+" 
tags: ionic 
---

{% include image.html 
    img="images/content/ionic-cordova-custom-tabs.png" 
    title="Ionic 2+ : Open URLs in Chrome Custom Tabs with Cordova and Ionic Native 3.x+" 
%}

Introduction 
-----------------
-----------------

Chrome custom tabs allows you to open a in app chrome tab in your mobile app to open external URLs and web sites .

In this tutorial we are going to see a simple Ionic example that makes use of Chrome In App Custom tabs .

Creating a new app 
---------------------
---------------------

The first step will be creating a new app using the Ionic CLI .

Simply run :

    ionic start ChromeCustomTabsExample blank 
    cd ChromeCustomTabsExample 

Then install the required plugins from npm :

    $ ionic cordova plugin add cordova-plugin-browsertab --save 
    $ npm install --save @ionic-native/browser-tab    

Now you need to add this plugin to your app main module :

Head over to <em>src/app/app.module.ts</em> : 

    /* ... */
    import { BrowserTab } from '@ionic-native/browser-tab';

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
        BrowserTab,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
    })
    export class AppModule {}        

Now we are ready to use BrowserTab by injecting it in any component from where we want to launch a 
chrome custom tab :

Open <em>src/pages/home/home.ts</em> and add a method to open an url  .

    import { Component } from '@angular/core';
    import { BrowserTab } from '@ionic-native/browser-tab';

    @Component({
    selector: 'home',
    templateUrl: 'home.html',
    })
    export class HomePage {

    constructor(private browserTab: BrowserTab) {
    }

    openUrl(){
        this.browserTab.isAvailable()
            .then((isAvailable: boolean) => {

            if(isAvailable) {

                this.browserTab.openUrl('https://www.techiediaries.com');

            } else {

                // if custom tabs are not available you may  use InAppBrowser

            }

            });        
    }
    }

You can now add a button to trigger this method 

    <button ion-button (click)="openUrl()"> Open Techiediaries</button>


Conclusion 
---------------
---------------

To test your application ,start by adding a target Android platform then build and run your app in a real 
mobile device .

 

