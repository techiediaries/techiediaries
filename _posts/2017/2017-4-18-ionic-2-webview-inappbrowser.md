---
layout: post
title: "Ionic 4/Angular and InAppBrowser Webview: Create a Cross Platform Mobile App for Your Responsive Website"
image: "images/content/mobile-app-ionic-2-inappbrowser.png"
excerpt: "Create a cross platform (Android ,iOS and Windows ) mobile app for your responsive website with Ionic 4 and InAppBrowser" 
tags : ionic
---

![Create a mobile app for your responsive website with Ionic 4 and InAppBrowser](/images/content/mobile-app-ionic-2-inappbrowser.png)

{% include image.html 
    img="" 
    title="" 
%}

Nowadays a great part of users are using mobile devices to browse the web so having a mobile ready 
website or app is crucial to your business. 

You might think that a responsive website is enough since you can reach mobile users just like using apps and that is correct but a mobile app has more features 
to offer, most importantly: 

- Apps can access all native device features (with users permission).
- Apps are distributed and installable via app stores.

In this tutorial we'll show you how you can turn your responsive website into a mobile app with a few steps then you can upload it to major app stores to reach millions of users, such as:

- The Google store,
 - The Apple store,
 - The Microsoft store 
 - Or the Amazon store.  

Here is the list of all supported platforms:

Amazon

Android

BlackBerry 10

Browser

Firefox OS

iOS

OS X

Ubuntu

Windows

Windows Phone



We are not going to build an app from scratch since the tutorial supposes you already have a responsive 
website so we are going to use Ionic 4 with Angular to create a webview (with Cordova InAppBrowser plugin ) or a web browser which loads your responsive 
website when the user launches the app.

## Tutorial requirements 

We are going to use the Ionic 4 framework which is the most popular hybrid framework for building cross platform
apps for Android, iOS and Windows so you don't need to reinvent the wheel or use different tools and languages
to target multiple platforms but we need to have some requirements before we can proceed with building the 
mobile app.

Basically you need to have:

<ul>
<li>
Node.js installed on your system.
</li>
<li>
Cordova and The Ionic CLI installed.
</li>
<li>
Java and Android SDK (If you want to build for Android)
</li>
<li>
A Mac system if you want to target iOS.
</li>
<li>
A Windows system and Visual Studio installed if you want to target Windows. 
</li>
</ul>

You can install Node.js by going to their official website and download the installer compatible with your 
operating system. For Ubuntu users we have a [tutorial which shows you how to install Node.js on Ubuntu](/how-to-install-node-js-6-on-ubuntu-15/
).

After installing Node.js, you can use NPM (Node Package Manager) to install both Cordova and the Ionic CLI via 
the terminal or command prompt by entering these  commands:

    npm install -g cordova 
    npm install -g ionic 

> Note: You might need to add sudo before the two commands under MAC system.


For [installing Java](http://www.oracle.com/technetwork/java/javase/downloads/index-jsp-138363.html) and [Android](https://developer.android.com/studio/index.html) ,you just need to go to their official websites and grab installers for your OS .
You can also follow this tutorial for [installing Java under Ubuntu](/howtoinstall/how-to-install-java-8-jdk-8u101-on-ubuntu-via-ppa/
).

> Note: Please note that you just need to install Node.js, Cordova and Ionic to develop your app and you can use the browser to test it then you can install the other requirements when you need to build the actual platform specific executable or to test on a real device.


You can also install an emulator and test on it if you don't have a real mobile device at hand when developing.  
## Generating a New Ionic 4/Angular Project

Now if you have both Node.js and Ionic CLI 4 installed,let's proceed by generating a new Ionic 4 project.

Open your terminal under Linux/MAC or your command prompt under Windows and run the following command: 

    ionic start myApp blank --type=angular

You can name your project what you want. We are using myApp as name.

`blank` is the name of the template the Ionic CLI will use to generate our project. It has only one page which 
is enough for us since we need just one to host our webview where our responsive website will be loaded.

To make sure everything is alright serve your app using:

    cd myApp
    ionic serve 

Then visit <em>http://localhost:8100</em> with your browser. You should see your app up and running.

Now we are going to add a target Cordova platform using:

    ionic platform add android | ios | windows     

Next we are going to add the InAppBrowser Cordova plugin which allows you to create a webview or an in app browser
to host your responsive website. Then install Ionic Native plugin which wraps the InAppBrowser 

So go ahead and run: 

    ionic plugin add cordova-plugin-inappbrowser
    
    npm install --save @ionic-native/in-app-browser

Open the `src/app/app.module.ts` file and import the InAppBrowser plugin then add it to list of providers: 

    /* .... */
    import { InAppBrowser } from '@ionic-native/in-app-browser';

    /* ... */

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

If you don't do this you are going to get an error message, when you start using the InAppBrowser plugin,which tells you:

    Error: Uncaught (in promise): Error: No provider for InAppBrowser!


Open the `src/pages/home/home.ts` and add the following code: 

    import { Component , OnInit } from '@angular/core';
    import { NavController  } from 'ionic-angular';
    import { InAppBrowser } from '@ionic-native/in-app-browser'; /* 1 */

    @Component({
    selector: 'page-home',
    templateUrl: 'home.html'
    })
    export class HomePage implements OnInit{

    constructor(public navCtrl: NavController,private iab: InAppBrowser /* 2 */) {}
    ngOnInit(){

        const browser = this.iab.create('https://ionic.io','_self',{location:'no'}); /*3*/

    }

    }

1 - We import the InAppBrowser Ionic native plugin from <em>@ionic-native/in-app-browser</em>

2 - We inject the InAppBrowser native wrapper via the class constructor 

3 - We call the create method of InAppBrowser injected instance with our website URL with target as _self and {location : 'no'} to hide the in app browser location bar.

Next open <em>src/pages/home/home.html</em> and delete everything then add:

    <ion-content padding>
    loading... 
    </ion-content>

You can test you your app in the browser just to make sure there are no syntax erros using the following command: 

    ionic serve 

But you are not going to get the desired behavior because on the browser your website will be opened 
in a new popup. We want the website to be opened on the home page.

To test your final app follow these steps. 

First enable the debug mode on your mobile device.

Next attach your device to your computer with a USB cable.

Next, open your terminal and run:

    ionic run android | ios | windows 

Depending on your device.            

For Android if you get the following error message: 

    Error: Android SDK not found. Make sure that it is installed. If it is not at the default location, set the ANDROID_HOME environment variable.

This means either: 

- You have not installed the Android SDK or
- You have not properly configured environment variable which points to the Android SDK.

So if you have installed the Android SDK and you still get the error you can just run this line before 
building your app: 

    export ANDROID_HOME='/home/to/android/sdk'

On Linux and MAC or its equivalent on Windows.

## Conclusion

You can now wrap your existing responsive mobile website into a mobile app for major mobile platforms 
with minimum efforts using Ionic 4, Angular and Cordova InAppBrowser plugin to reach millions of worldwide users 
on app stores.

You have also other options if you need more features,you can build a full fledged Ionic 4 app which 
consumes RSS feeds of your website.

You may have noticed a bit of performance downgrade (especially on an old mobile device ). That's because apps built with Ionic 4 or any Cordova based framework 
are hybrid apps i.e not true 100% native mobile apps. If you want more performance you may want to check NativeScript which allows you to build truly native apps with native performance with the same features as Ionic 4 such as targeting cross platform devices with the same code base.

       

