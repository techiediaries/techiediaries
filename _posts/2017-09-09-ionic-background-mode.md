---
layout: post
title: "Keep Running Ionic 4/Angular Apps In Background Mode (With Example)"
image: "images/content/ionic.jpg"
excerpt: "This tutorial will cover an example use case of the Cordova background mode plugin with Ionic 4/Angular (also Ionic 3). We'll see how you can keep your app running while it's in the background (minimized)."
tags : ionic 
---

{% include image.html 
    img="images/content/ionic.jpg" 
    title="Keep Running Ionic 2+ Apps In Background Mode (With Example)" 
%}


This tutorial will cover an example use case of the Cordova background mode plugin with Ionic 4/Angular (previously Ionic 3). We'll see how you can keep your app running while it's in the background (minimized).

But first what happens with your Ionic 4/Angular (or Ionic 3) app, once it's hidden or minimized, if it doesn't properly handle background mode? 

Well, simply execution will be interrupted or paused until it becomes in the foreground again so imagine if you have an app that plays music, do you want it to stop playing music when you run another app in the foreground? of course not! what about messaging apps? do you want your app to stop receiving messages once it's in the background? again of course not! How about a GPS tracking app? So I think you get the idea, many apps need to keep executing while it's in the background. So how do you properly handle background mode in your Ionic 2+ app?

We can solve the problem using the Cordova/Ionic Native background mode plugin which can be used in many cases such as:

* Backgound geolocation tracking, 
* Push or local Notifications,
* Media streaming,
* Real-time Messaging etc. 

Now lets see an example for how to use this plugin. We are going to create an Ionic 2+ app that plays audio and keeps playing it even when it's in the background.

So go ahead and create a new Ionic 4/Angular (also Ionic 3) project.

## Create Ionic 4/Angular Project

Using your terminal or command propmt (Windows) run the following command:

    ionic start bg-mode-example blank --type=angular

Next navigate inside the project folder: 

    cd bg-mode-example

Then install the required Cordova plugins and Ionic Native wrappers. 

First let's install the background-mode plugin: 

    $ ionic cordova plugin add cordova-plugin-background-mode
    $ npm install --save @ionic-native/background-mode

Then we need to install the Native Audio plugin: 

    $ ionic cordova plugin add cordova-plugin-nativeaudio
    $ npm install --save @ionic-native/native-audio

Next open let's import and add these plugins to the list of providers in app main module.

Go ahead and open **src/app/app.module.ts**:

    import { BackgroundMode } from '@ionic-native/background-mode';
    import { NativeAudio } from '@ionic-native/native-audio';
    /* ... */
      providers: [
        BackgroundMode,
        NativeAudio,
        SplashScreen,
        StatusBar,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
      ]
    })
    export class AppModule { }

Next open **src/pages/home/home.ts** then import and inject plugins:

    import { Component } from '@angular/core';
    import { NavController } from 'ionic-angular';
    import { BackgroundMode } from '@ionic-native/background-mode';
    import { NativeAudio } from '@ionic-native/native-audio';

    export class HomePage {
    
      constructor(public navCtrl: NavController,public nativeAudio: NativeAudio , public backgroundMode : BackgroundMode) {
      
      }
    }  

Next you need to preload the mp3 to be played before playing it:

    this.nativeAudio.preloadSimple('audio1', 'audio/1.mp3').then((msg)=>{
      console.log("message: " + msg);
    }, (error)=>{
      console.log("error: " + error);
    });

Then you can add the method to play the audio 

      public playAudio(){
        this.backgroundMode.enable();
        this.backgroundMode.on("activate").subscribe(()=>{
          this.nativeAudio.play("audio1");  
        });
        this.nativeAudio.play("audio1"),() => console.log('audio1 is done playing'));
      }
      
As you can see we first enable the background mode before playing the audio and we also subscribe to the activate event of background-mode, once it's activated we play the audio file again.

Finally you can add a button to trigger the playAudio() method:

    <ion-header>
      <ion-navbar>
        <button ion-button menuToggle>
          <ion-icon name="menu"></ion-icon>
        </button>
        <ion-title>Background Mode Example</ion-title>
      </ion-navbar>
    </ion-header>
    
    <ion-content padding>
      
      <button ion-button (click)="playAudio()">Play audio</button>
       
    </ion-content>
    
## Conclusion 

In this tutorial we have see a simple use case of the Cordova/Ionic Native Background Mode plugin to keep your Ionic 4/Angular (also Ionic 3) app  executing when it's in the background mode.

