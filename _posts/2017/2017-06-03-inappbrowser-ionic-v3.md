---
layout: bpost
title: "How to use Cordova InAppBrowser Plugin with Ionic 5/Angular and Ionic Native to Open External URLs"
image: "images/content/inappbrowser-ionic-v3.png"
excerpt: "How to use Cordova InAppBrowser Plugin with Ionic 2 (Or 3 ) and Ionic Native 3.x+ to Open External URLs " 
tags : [ionic,android,ios,hybridmobiledev]
date: 2020-05-03
---

{% include image.html 
    img="images/content/inappbrowser-ionic-v3.png" 
    title="Cordova InAppBrowser and Ionic 3" 
%}


In this tutorial, we’ll be learning how you can use the Cordova InAppBrowser plugin to open external URLs in Ionic 5/Angular applications or implement services which require webviews apps built for Android, iOS or Universal Windows Platform (UWP).

See a more detailed tutorial here: 

<a href="https://www.techiediaries.com/ionic-2-3-inappbrowser/" target="_blank">Full Ionic 2/Ionic 3 mobile app with Ionic Native 3.x and InAppBrowser</a>

So lets get started.

First head over to your terminal or command prompt, depending on which system you are using (Unix Like or Windows) 
then create a new Ionic 5/Angular project using the Ionic CLI v4:
 
    $ ionic start InAppBrowserExampleDemo blank --type=angular

We are creating a project based on the blank template and Angular which will give us a starter app with one home page.

Next install the Cordova InAppBrowser and Ionic Native wrapper for InAppBrowser. 

The Ionic Native plugin or wrapper is the recommended way of using Cordova plugins since they provide us with a Promise based API, around the original Cordova plugins that make use of Callback function, which works seamlessly with Ionic 5/Angular.

    $ ionic cordova plugin add cordova-plugin-inappbrowser --save
    $ npm install --save @ionic-native/in-app-browser 

After installing both the Cordova plugin and its wrapper, let's register the InAppBrowser provider with the main app module.

> **Note**: For more advanced, controllable and customizable in app browser you can use the Themable Brower which isa fork of InAppBrowser with advanced features.

You can find a tutorial explaining how to use <a href="/ionic-2-webview-themeablebrowser" target="_blank">Themeablebrowser via this link</a> .

Use your favorite code editor/IDE to open the generated project:

    $ cd InAppBrowserExampleDemo
    $ code .

Open <em>src/app/app.module.ts </em> then import and add InAppBrowser to providers list:

    /* ... */
    import { InAppBrowser } from '@ionic-native/in-app-browser';


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
        InAppBrowser,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
    })
    export class AppModule {}
 
That’s it! You are now ready to use the InAppBrowser, you just need to inject it in your component.

Open <em>src/pages/home/home.ts</em> then import InAppBrowser and inject it in the component constructor:

    import { Component } from '@angular/core';
    import { InAppBrowser } from '@ionic-native/in-app-browser';

    @Component({
    selector: 'page-home',
    templateUrl: 'home.html'
    })
    export class HomePage {

        constructor(private theInAppBrowser: InAppBrowser) {
        }
    }


Now let's open an external URL, say for example: https://www.techiediaries.com 

InAppBrowser provides us with three options, either use the system default browser to open the target URL; use the same webview used by Cordova to display/render our app or use a simple in app browser.

Let's see how to implement the three options in our demo app.

Add three methods to our component:
    
    openWithSystemBrowser(url : string);
    openWithInAppBrowser(url : string);
    openWithCordovaBrowser(url : string);

And here is the full implementation: 

    import { Component } from '@angular/core';
    import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser';

    @Component({
    selector: 'page-home',
    templateUrl: 'home.html'
    })
    export class HomePage {
    options : InAppBrowserOptions = {
        location : 'yes',//Or 'no' 
        hidden : 'no', //Or  'yes'
        clearcache : 'yes',
        clearsessioncache : 'yes',
        zoom : 'yes',//Android only ,shows browser zoom controls 
        hardwareback : 'yes',
        mediaPlaybackRequiresUserAction : 'no',
        shouldPauseOnSuspend : 'no', //Android only 
        closebuttoncaption : 'Close', //iOS only
        disallowoverscroll : 'no', //iOS only 
        toolbar : 'yes', //iOS only 
        enableViewportScale : 'no', //iOS only 
        allowInlineMediaPlayback : 'no',//iOS only 
        presentationstyle : 'pagesheet',//iOS only 
        fullscreen : 'yes',//Windows only    
    };
    constructor(private theInAppBrowser: InAppBrowser) {

    }
    public openWithSystemBrowser(url : string){
        let target = "_system";
        this.theInAppBrowser.create(url,target,this.options);
    }
    public openWithInAppBrowser(url : string){
        let target = "_blank";
        this.theInAppBrowser.create(url,target,this.options);
    }
    public openWithCordovaBrowser(url : string){
        let target = "_self";
        this.theInAppBrowser.create(url,target,this.options);
    }  

    }

The next thing is to add some buttons to invoke these three methods.

Open <em>src/pages/home/home.html</em> then add: 

    <ion-header>
    <ion-navbar>
        <ion-title>
        InAppBrowser Example DEMO Ionic v3 anc Ionic CLI v3
        </ion-title>
    </ion-navbar>
    </ion-header>

    <ion-content padding>
    
        <button ion-button (click)="openWithSystemBrowser('https://www.techiediaries.com')">Open with System browser</button>
        <button ion-button (click)="openWithInAppBrowser('https://www.techiediaries.com')">Open with In App browser</button>
        <button ion-button (click)="openWithCordovaBrowser('https://www.techiediaries.com')">Open with Cordova browser</button>
    
    </ion-content>



For more information, you can visit these websites: 

<a href="https://ionicframework.com/docs/native/in-app-browser/" target="_blank">Ionic Native docs for InAppBrowser</a> 

<a href="https://github.com/apache/cordova-plugin-inappbrowser" target="_blank">The Cordova InAppBrowser GitHub repository</a>

## Conclusion


This is an updated tutorial for a previous [tutorial](https://www.techiediaries.com/ionic-2-3-inappbrowser/) I wrote on the same subject which makes use of the latest Ionic CLI 4 and Angular.