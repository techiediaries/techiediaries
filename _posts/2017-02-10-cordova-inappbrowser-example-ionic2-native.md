---
layout: post
title: "How to Open URLs in Browser with Ionic 4/Angular,Cordova InAppBrowser plugin and Ionic Native"
image: "images/content/cordova-inappbrowser-example-ionic2-native.png"
excerpt: "A simple example for how to open urls in browser with Ionic 2 final ,Cordova InAppBrowser plugin and Ionic Native"
categories : mobiledev
tags : ionic 
---
 
{% include image.html
   img="images/content/cordova-inappbrowser-example-ionic2-native.png"
       title="Cordova InAppBrowser example with Ionic 2 final and Ionic Native"
%}

Throughout this tutorial, we are going to see a detailed example showing how to open external URLs in Ionic 4 mobile 
apps based on Angular using the Cordova plugin InAppBrowser and Ionic Native.


SEE ALSO: 

<a href="/ionic-2-3-inappbrowser" target="_blank">Full Ionic 4/Angular Mobile App with Ionic Native and InAppBrowser</a>

AND 

<a href="/ionic-cordova-sqlite-barcode-scanner-product-inventory-manager" target="_blank">Ionic 2/3 : Using Cordova SQLite and Barcode Scanner plugins to build a product inventory manager </a> 


Now let's get started! 

We will start by generating a new Ionic 4/Angular project with Ionic CLI 4 so open up your terminal if your are developing
under a Linux/MAC system or your command prompt under Windows and type!

    ionic start ionic4-inappbrowser-example blank --type=angular 

> Note: Under Windows the recommended way to work with Ionic 4 is through visual studio.

Next navigate inside your project folder: 

    cd ionic4-inappbrowser-example

Add your target platform using:

    cordova platform add android 

We are developing with Ubuntu so we can only target Android devices. If you are under a MAC you can target iOS too using:

    cordova platform add iOS

> Note : If you don't have Cordova already installed you can easilly install it via npm with

    npm install -g cordova 

Next, you just need to add the InAppBrowser plugin using the following command: 

    cordova plugin add cordova-plugin-inappbrowser

Now we are ready to add some code to our project to open external URLs. So go ahead and open the `home.ts` file
and modify it to look like the following:

    

    import { Component } from '@angular/core';

    import { NavController , Platform} from 'ionic-angular';

    import { InAppBrowser } from 'ionic-native';

    @Component({
    selector: 'page-home',
    templateUrl: 'home.html'
    })
    export class HomePage {

    constructor( public platform: Platform,public navCtrl: NavController) {
        
    }
    openUrl() {

            this.platform.ready().then(() => {
                let browser = new InAppBrowser("https://www.techiediaries.com",'_blank');

            });
    }    
    }


We have started by importing the InAppBrowser plugin from the `ionic-native` module then we have
added the `openUrl()` method that will handle opening the specified URL.

Next open your your template and add the button to test the method: 

  <button ion-button="" large="" color="primary" (click)="openUrl()" >Visit Techiediaries</button>

> Note: Don't use the old `.open()` method

     InAppBrowser.open(url, "_system");

Many developers are getting this error 

<b>
Uncaught Error: Can't resolve all parameters for InAppBrowser: (?, ?, ?).    
</b>

Because it is deprecated with Ionic Native. Instead you should use the following method: 

    let browser = new InAppBrowser('YOUR_URL', "_system");

    
Next, just execute the following command: 

    ionic serve 

You can the play with your demo on the browser by visiting the `http://localhost:8100/` address. 

![Ionic 4 InAppBrowser Example](/images/content/cordova-inappbrowser-example-ionic2-native/example.png)

When you are finished testing, you can build your app for you target platform using the following command:

    ionic build android | iOS
    
You can find the example application we have build in this [GitHub repository](https://github.com/techiediaries/ionic2-inappbrowser-example){target:_blank}




