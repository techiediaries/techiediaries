---
layout: post
title: "Ionic 4 Example App: Build an RSS/Atom Reader with Ionic 4/Angular and InAppBrowser"
image: "images/content/rss-atom-reader-ionic-3.png"
excerpt: "Build an RSS/Atom Reader Application with Ionic 4 and InAppBrowser" 
tags : [ionic]
---

{% include image.html 
    img="images/content/rss-atom-reader-ionic-3.png" 
    title="Build an RSS/Atom Reader Application with Ionic 3" 
%}

![Ionic 4/Angular RSS Reader](/images/content/rss-atom-reader-ionic-3.png)

In this tutorial we'll be covering how to parse RSS and Atom feeds in Ionic 4/Angular applications and we'll demonstrate this by building an Ionic app to parse RSS feeds of a blog.

We will be using the Cordova plugin InAppBrowser via its Ionic Native wrapper to open URLs in the system browser. 

I have gone through many tutorials on the web showing how to read RSS/Atom feeds but all of them either use the 
deprecated Google Feeds API or the Yahoo Query API .In this tutorial we'll be taking another approach which is using 
a JavaScript browser library to parse RSS feeds and display them using the Ionic 4 List component .

So let's get started.

Let's start by creating a new fresh Ionic 4 project based on Angular. Open a new terminal and run the following commands:

```bash
$ cd ~
$ ionic start ionic-rss-reader blank --type=angular
```

Next, navigate inside your project's root folder:

```bash
$ cd ionic-rss-reader
```

Next start the development server using the following command:

```bash
$ ionic serve 
```

Your server will be running from the `http://localhost:8100` address.

Open the `src/app/home/home.page.html` file and add the following code: 

    
    <ion-header>

    <ion-navbar>
        <ion-title>Ionic 4 RSS/ATOM Reader</ion-title>
    </ion-navbar>

    </ion-header>


    <ion-content padding>
    <ion-input [(ngModel)]="targetUrl" placeholder="Please enter an RSS/Atom Feed URL"></ion-input>
    <button ion-button  (click)="parseUrl()">Fetch Feed </button>
    
        <ion-list>
    
            <ion-item-sliding *ngFor="let entry of entries">
    
                <ion-item>
                    <a (click)="openUrl(entry)">{{entry.title}}</a>
                </ion-item>
    
    
            </ion-item-sliding>
    
        </ion-list>
    </ion-content>

So as you can see we have added an <em>ion-input</em> component to get the 
URL of RSS/ATOM feed then bind it the <em>targetUrl</em> using <em>[(ngModel)]</em>.

Next we have added a button and bind its click handler to the <em>parseUrl()</em> method.

## Adding JavaScript browser library for parsing RSS feeds 

First, grab the <a href="https://github.com/bobby-brennan/rss-parser/blob/master/dist/rss-parser.min.js">RSS parser library</a> from this link then copy it to the assets 
folder under a <em>js</em> folder.

Then include it on project <em>src/index.html</em> file before Ionic files 

    <ion-app></ion-app>
    <script src="assets/js/rss-parser.min.js"></script>
    <!-- The polyfills js is generated during the build process -->
    <script src="build/polyfills.js"></script>

    <!-- The bundle js is generated during the build process -->
    <script src="build/main.js"></script>

Since this is a JavaScript file, to be able to use it from a TypeScript project 
you need either to include the typings if they exist otherwise just add 
the following line to your TypeScript file before calling the library API:

    declare var RSSParser;
  
## Parsing RSS/ATOM feeds 

To parse an RSS/ATOM feeds we call <em>parseURL()</em> method with the target feed URL:  

      RSSParser.parseURL(this.targetUrl, function(err, parsed) {
        console.log(parsed.feed.title);
        console.log(parsed.feed.entries);
      }); 

Since the method uses a callback let's convert it to a Promise to play nice with Angular.


## Converting the Callback to a Promise 

Go ahead add this method to your component: 

    parseUrlWrapper(){
        
        return new Promise((resolve,reject)=>{
        RSSParser.parseURL(this.targetUrl, function(err, parsed) {
            console.log(parsed.feed.title);
            console.log(parsed.feed.entries);
            if(err){
            reject(err);
            }
            resolve(parsed.feed.entries);
        });
        });

    }

This wraps the `parseURL()` API method into a JavaScript promise.

If the callback function returns an error, the Promise is rejected with the error.

If the callback function returns a parsed object, the Promise is resolved with the entries from the parsed object.


Also don't forget to add a TypeScript variable of type <em>string</em> to your 
component: 

    @IonicPage()
    @Component({
    selector: 'page-rss-page',
    templateUrl: 'rss-page.html',
    })
    export class Home {
    targetUrl : string ;
    entries : Array<any> = [];

Next add the <em>parseUrl()</em> method 

  parseUrl(){
    this.parseUrlWrapper().then((entries : Array<any>)=>{
        this.entries = entries;
    })

Thi method simply calls the <em>parseUrlWrapper</em> method and puts the result into our 
<em>entries</em> array.            

If you put an RSS feed URL in the text input and click on the button <em>FETCH FEED</em> you are going to see a list of RSS entries.

Depending on the target server configuration i.e if the CORS headers are enabled, you won't be able to fetch the feeds with an error:  

    Fetch API cannot load http://192.168.1.6/feed/. No 'Access-Control-Allow-Origin' header is present on the requested resource.
    Origin 'http://localhost:8100' is therefore not allowed access. 
    If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled

## Solving the CORS issues 

To solve this CORS issue you have many options:

- You can either test your app in a real mobile device where there is no Same Origin Policy like in the case of the browser.
- Or configure an Ionic proxy. It is just a matter of adding some conf values. You can <a href="https://www.techiediaries.com/ionic-2-proxy/">follow this tutorial</a>  
- Or if you have access to target website server, enable the CORS headers.

> Please note that you need to do this just on the test phase since on production you'll be using a real device where there is no CORS issues since the Cordova built-in browser has no Same Origin Policy.

## Opening external URLs using InAppBrowser 

When testing your app on the browser, you can open the RSS links just like normal but on real device you need to use the InAppBrowser Cordova plugin to be able to open external URLs either using an in app browser or the system browser which is what we are going to use in tutorial.

Before you can use the InAppBrowser browser you need to follow these steps:

<ul>
<li>
Add the Cordova plugin <em>cordova-plugin-inappbrowser</em>.
</li>
<li>
Install Ionic Native wrapper for InAppBrowser <em>@ionic-native/in-app-browser</em>.
</li>
<li>
Import and Add InAppBrowser provider to the list of provides at <em>src/app/app.module.ts</em>.
</li>
<li>
Inject InAppBrowser via component constructor to get an instance to work with it.
</li>
</ul>

You can also follow this <a href="https://www.techiediaries.com/mobiledev/cordova-inappbrowser-example-ionic2-native/">tutorial for complete details</a>

So after following the steps to install InAppBrowser, inject it then add the method to open URLs in system browser:

    /* ... */
    import { InAppBrowser } from '@ionic-native/in-app-browser';
    /* ... */

    @IonicPage()
    @Component({
    selector: 'home-page',
    templateUrl: 'home.page.html',
    })
    export class Home {
    targetUrl : string ;
    entries : Array<any> = [];
    constructor(public navCtrl: NavController, public navParams: NavParams , private iab: InAppBrowser) {
        
    }
    openUrl(entry){

        this.iab.create(entry.link,"_system");

    }
    /* ... */


That is it! You can build a more useful app upon this, maybe a complete RSS reader with offline support and other features.

Here is the complete code of <em>home.page.ts</em> component:

    import { Component } from '@angular/core';
    import { IonicPage, NavController, NavParams } from 'ionic-angular';
    import { InAppBrowser } from '@ionic-native/in-app-browser';

    declare var RSSParser;
    @IonicPage()
    @Component({
    selector: 'home-page',
    templateUrl: 'home.page.html',
    })
    export class Home {
    targetUrl : string ;
    entries : Array<any> = [];
    constructor(public navCtrl: NavController, public navParams: NavParams , private iab: InAppBrowser) {
        
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RSSPage');

    }
    openUrl(entry){

        this.iab.create(entry.link,"_system");

    }
    parseUrlWrapper(){
        
        return new Promise((resolve,reject)=>{
        RSSParser.parseURL(this.targetUrl, function(err, parsed) {
            console.log(parsed.feed.title);
            console.log(parsed.feed.entries);
            if(err){
            reject(err);
            }
            resolve(parsed.feed.entries);
        });
        });

    }
    parseUrl(){
        this.parseUrlWrapper().then((entries : Array<any>)=>{
            this.entries = entries;
        })
    }

    }

## Conclusion


In this tutorial, we used Ionic 4 and Angular to build a simple example RSS reader application. We have demonstrated how to open RSS feeds in Ionic mobile apps and how to use the Cordova InAppBrowser native plugin to open external URLs in the system browser of mobile devices.

We have also seen how to convert a JavaScript callback to a JavaScript promise for better integration of any API with Ionic and Angular.

