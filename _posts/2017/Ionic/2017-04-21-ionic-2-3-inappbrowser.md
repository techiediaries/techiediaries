---
layout: bpost
title: "Full Ionic 5 Mobile App with Ionic Native and InAppBrowser"
image: "images/content/ionic-3-inappbrowser.png"
excerpt: "Full Ionic 5 mobile app with Ionic Native 5 and InAppBrowser"
date: 2020-05-03
tags : ionic
---

{% include image.html
   img="images/content/ionic-3-inappbrowser.png"
       title="Full Ionic 2/Ionic 3 mobile app with Ionic Native 3.x and InAppBrowser"
%}

In previous post(s), we have wrote about the Cordova InAppBrowser plugin and how to use it with Ionic framework.

Since this is one of the most researched post in our website on Google, we have decided to write an updated tutorial showing you an example demo for how to use InAppBrowser with the latest Ionic 5 and Ionic Native 5, which
has introduced some changes on how to use native plug-ins in order to increase performance and reduce the final app size.

> Note: You can use either Ionic 4/Angular or Ionic 5/Angular with this tutorial.   


As always we have to say that you need to have all development requirements installed and configured on your machine: 

<ul>
<li>
Java and Android SDK installed.
</li>
<li>
JAVA_HOME and ANDROID_HOME environment variables configured.
</li>
<li>
A MAC OS system for targeting iOS.
</li>
<li>
A Windows system for targeting Windows Univesral Platform (UWP).
</li>
<li>
The Node.js platform  and NPM installed.
</li>
<li>
The Cordova CLI installed.
</li>
<li>
The Ionic CLI installed.
</li>
</ul>

We are going to cover how to install the Ionic CLI 5 and Cordova in this tutorial since it is a matter of entering some commands.

## What InAppBrowser plugin can be used for 

If you have landed in this page from a search engine, you must know what is the purpose of InAppBrowser 
and you are looking for how to use it inside your project which is what we are going to show you in this 
tutorial, but let's first see what is InAppBrowser? And the different situations where you may need to use it.

InAppBrowser is a Cordova plugin that allows you to open an in app browser in your Cordova app or in our case 
Ionic 5 app. This in app browser can be used to open external URLs just like any normal web browser from your app.

InAppBrowser can be used to open the system browser, an in app browser which uses its own web-view or even the same webview used by Cordova/Ionic. You can control this behavior by using parameters such as <em>_self ,_system and _blank</em>. 


There are many cases where you may need an in app browser, such as:

<ul>
<li>
Opening external URLs in your app without using the system browser which makes a heavy context switch.
</li>
<li>
Implementing third party authentication and authorization workflows with some services such as Facebook or Google.
</li>
<li>
Transforming a hosted responsive website to a mobile app using the InAppBrowser webview etc.
</li>
<li>
Launch an in app browser that you can do what the hell you want with it.
</li>
</ul>

> Note: If you are looking for a more powerful, customizable and feature rich version of InAppBrowser then you may want to check the ThemeableBrowser which is a fork of InAppBrowser with more features.

## Installing Cordova and Ionic CLI 5

Cordova and Ionic CLI 5 are both NPM modules so you can easily install using npm.

Open your terminal on Linux/MAC OS or command on Windows and run the following commands:

    npm install -g cordova 
    npm install -g ionic 


> Note: On MAC OS and Linux you may need to add sudo before npm install if you want to install modules globally.  

## Generating a new Ionic 5 Project

After installing Cordova and Ionic CLI 5, you can generate a new Ionic 5 project with one command from your terminal/command prompt using the Ionic CLI:

    ionic start myInAppBrowserExampleDemo blank --type=angular

We are using the `blank` template to generate our project which has one home page but you can use one of the many available advanced templates such as the menu or tabs templates.

Now navigate inside your project using: 

    cd myInAppBrowserExampleDemo 

And continue with the tutorial.

## Adding Target Platforms and InAppBrowser Cordova Plugin 

Before you can add the InAppBrowser plugin, you need to add a target platform.

Since I'm using an Ubuntu system I can only target Android platform, but you can also target iOS if you are 
developing using a MAC OS:

    ionic platform add android | ios | windows 

Now you can add Cordova plugins. Let's add the InAppBrowser plugin using:

    ionic plugin add cordova-plugin-inappbrowser

## Installing the Ionic Native Plugin for InAppBrowser 

Now, let's install the Ionic native plug-in for interacting with the InAppBrowser inside Ionic 5/Angular 
project. You can access any Cordova plug-in using the plain old way but using Ionic Native 
allows your plugin to integrate seamlessly with Angular Promises and Observables since this is what an Ionic Native plug-in does - It wraps the Cordova plug-in API with a Promises and Observables interface instead of callbacks.

Ionic have only the Ionic Native core installed so to use individual plug-ins you need to install
them separately using npm. For InAppBrowser, run the following command:

    npm install --save @ionic-native/in-app-browser

Next we need to provide it so open the <em>src/app/app.module.ts</em> file and start by importing the InAppBrowser native plugin:

    import { InAppBrowser } from '@ionic-native/in-app-browser';

Next, add it to the list of providers:

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

## Using InAppBrowser to Open External URLs

So after installing both the Cordova InAppBrowser plugin and its Ionic Native wrapper, let's start using 
it.

You basically need to import the plugin then inject it via the component class constructor.

Open the <em>src/pages/home/home.ts</em> file and add the following code:

    import { Component , OnInit } from '@angular/core';
    import { NavController  } from 'ionic-angular';
    import { InAppBrowser } from '@ionic-native/in-app-browser';

    @Component({
    selector: 'page-home',
    templateUrl: 'home.html'
    })
    export class HomePage implements OnInit{

    constructor(public navCtrl: NavController,private iab: InAppBrowser) {

    }

    ngOnInit(){

        const browser = this.iab.create('https://www.techiediaries.com','_self',{location:'no'}); 

    }

    }

Using the InAppBrowser is fairly simple and straightforward . You can use a few methods 
and parameters to start and control the in app browser.

Visit the official <a href="https://ionicframework.com/docs/native/in-app-browser/" target="_blank" >Ionic Native documentation</a> for more information about the methods and parameters available for use.

Next you can build and run your app in a real device to test it. On the browser the InAppBrowser opens the links 
in a new window so to test your app. 

Attach a device with an USB cable.

Enable the debug mode on  your device.

Finally, run the following command: 

    ionic run android 

> Note: The second parameter of the `create()` method (_self ) instructs the InAppBrowser plugin to open the target URL in the same webview used by Ionic/Cordova to render components views, according to the InAppBrowser documentation on GitHub. But that is not the result we get - A new browser/webview is opened in our case! 

## Using ThemeableBrowser, a custom InAppBrowser fork for more features 

Depending on your needs, If you are just using InAppBrowser to implement a third party auth system or anything else that doesn't need a more customizable in app browser, then it may be sufficient for you.

Sometimes though, we need more control, custom look and actions on the in app browser which are not possible to
achieve using the original plug-in so the awesome community has created a fork of InAppBrowser with more 
features - It's the ThemeableBrowser plugin which allows you to add

- Custom in app browser menus.
- Custom buttons and actions.
- Custom theme colors etc.

You can find a tutorial for [ThemeableBrowser here](/ionic-2-webview-themeablebrowser) 

## Conclusion

The InAppBrowser cordova plug-in can be very useful,especially for using third party services in your mobile app such as social authentication systems and payment processors. Also to open external URLs either with a built in browser or with the system browser.

This tutorial was an updated version, for a previuosly written post, which shows you 
how to use this plugin with Ionic 5 based on Angular.











