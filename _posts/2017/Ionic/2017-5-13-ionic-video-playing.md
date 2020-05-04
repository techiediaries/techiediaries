---
layout: bpost
title: "Playing videos with Ionic 5 and Cordova Video Player plugin"
image: "images/content/ionic-video-player.png"
excerpt: "Playing videos Playing videos with Ionic and Cordova Video Player with Ionic and Cordova Video Player"
date: 2020-05-03 
tags : [ionic]
---

{% include image.html 
    img="images/content/ionic-video-player.png" 
    title="Playing videos with Ionic 2/Ionic 3 and Cordova Video Player plugin" 
%}

In this tutorial, we are going to see how play videos in our Ionic 5 apps. We are going to use Ionic 5 and Cordova video player plugin so let's get started .

## Generating a New Ionic 5 Project 


Open your command prompt or terminal and type the following to generate a new Ionic 5 project:

    ionic start ionic-video-player blank 

<div class="note">
I'm using the Ionic CLI v3+ ,if you are using the previous version of CLI you need to add --v2 to scaffold a new Ionic 2/Ionic 3 project.<br>

Also there some changes on how we use other Ionic CLI commands so if you see any changed commands and you are still using the old CLI just use the equivalent ones or better yet ,upgrade to CLI v3. 
</div>    

## Adding the Cordova Video Player

Next navigate inside your new generated project and add the Cordova video player plugin:

    cd ionic-video-player 
    ionic cordova plugin add https://github.com/moust/cordova-plugin-videoplayer --save

## Adding the Ionic Native 5 Plugin for the Video Player

Next install the Ionic Native 5 plugin 

    npm install --save @ionic-native/video-player

Open your project with your prefered text editor or IDE .I'm using Visual Studio Code 

    code .

## Using the Ionic 5 Video Player Plugin

Next we need to add the Ionic video player plugin to the list of providers so open <em>src/app/app.module.ts</em> then add: 

    import { BrowserModule } from '@angular/platform-browser';
    import { ErrorHandler, NgModule } from '@angular/core';
    import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
    import { SplashScreen } from '@ionic-native/splash-screen';
    import { StatusBar } from '@ionic-native/status-bar';
    import { VideoPlayer } from '@ionic-native/video-player';
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
        VideoPlayer,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
    })
    export class AppModule {}


Now you should be able to inject the VideoPlayer in any component and start using it.

Open <em>src/pages/home/home.ts</em> then import VideoPlayer and inject it: 

    import { Component } from '@angular/core';
    import { NavController } from 'ionic-angular';
    import { VideoPlayer } from '@ionic-native/video-player';

    @Component({
    selector: 'page-home',
    templateUrl: 'home.html'
    })
    export class HomePage {

    constructor(public navCtrl: NavController,private videoPlayer : VideoPlayer) {

    }

    } 

After injecting videoPlayer into component constructor, we can now use different APIs of this plugin either to play or stop playing videos.

Let's add two methods, one for playing a video and one for stop playing the video:

    import { Component } from '@angular/core';
    import { NavController } from 'ionic-angular';
    import { VideoPlayer ,VideoOptions } from '@ionic-native/video-player';

    @Component({
    selector: 'page-home',
    templateUrl: 'home.html'
    })
    export class HomePage {
    videoOpts : VideoOptions ;
    constructor(public navCtrl: NavController,private videoPlayer : VideoPlayer) {

    }

    public playVideo(){
        this.videoOpts = {volume : 1.0};
        this.videoPlayer.play('file:///android_asset/www/movie.mp4').then(() => {
        console.log('video completed');
        }).catch(err => {
        console.log(err);
        });    
    }
    public stopPlayingVideo(){
        this.videoPlayer.close();
    }

    }


You can either play a video from your filesysystem or an online video URL.

Now open <em>src/pages/home/home.html</em> and add a two buttons for playing and stop playing our video: 

    <ion-header>
    <ion-navbar>
        <ion-title>
        Video Player Demo
        </ion-title>
    </ion-navbar>
    </ion-header>

    <ion-content padding>
        <button ion-button (click)="playVideo()">Play Video</button>
        <button ion-button (click)="stopPlayingVideo()">Stop playing Video</button>
    </ion-content>
  

## Conclusion


This is a simple demo that shows you how to use the Cordova video player plugin with Ionic 5, Angular, and Ionic Native 5 to play videos inside your apps but of course you can develop it further more to create a full fledged mobile app for Android.



