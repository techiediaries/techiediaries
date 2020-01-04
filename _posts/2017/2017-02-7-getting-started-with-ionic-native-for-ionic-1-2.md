---
layout: post
title: "Getting started with Ionic Native for Ionic 1 and 2 "
image: "images/content/getting-started-ionic-native-ionic-1-2.png"
excerpt: "Getting started with Ionic Native for Ionic 1 and 2 "
categories : mobiledev
tags : ionic 
---


{% include image.html
   img="images/content/getting-started-ionic-native-ionic-1-2.png"
       title="How to update Ionic Native to latest version"
%}

Ionic native is a wrapper for Cordova plugins that adds a better integration with Angular 2 by adding promise
and observable support and also TypeScript support.Ionic native is being defined by Ionic team as a successor to
ngCordova for accessing device native features .

Even if Ionic native is built mainly for Ionic 2 it can also be used within Ionic 1 apps to  integrate Cordova
plugins instead of ngCordova .

You can use Ionic Native to add any native feature (supported by wrapped Cordova plugins ) to your mobile app
built using either 

Ionic framework both versions 1 and 2 ,
    
Apache Cordova app 
    
Or web view mobile app .


How to install Ionic Native ?
-----------------------------
-----------------------------

First create an Ionic project 

    ionic start ionic2-native-app blank --v2
    cd ionic2-native-app

Then install Ionic Native via npm with 

    npm install ionic-native --save

That is it ,you can now use any Cordova plugin supported by Ionic Native but you need to make sure it's 
added to your project .If it's not added ,Ionic Native will warn you and even give you the package name 
to install the required Cordova plugin .

After installing the plugin ,you can import the plugin from ionic-native module and start using it .

Lets install as an example the camera plugin

    ionic plugin add cordova-plugin-camera


    import {Camera} from 'ionic-native';
    import { Component } from '@angular/core';
    import { Platform } from 'ionic-angular';
    import { HomePage } from '../pages/home/home';
    
    @Component({
    template: '<ion-nav [root]="rootPage"></ion-nav>'
    })
    export class MyApp {
    
    rootPage: any = HomePage;
    
    constructor(platform: Platform) {
    
        platform.ready().then(() => {
    
            Camera.getPicture().then(
                    res => console.log("We have taken a picture!"),
                    err => console.error("Error taking picture", err)
            );
        });
        
    }
    }
    
Next just build and run your project then plug in your device with an USB cable .

    ionic run android     

You can see a list of all supported Cordova plugins and examples on how to use them with Ionic Native [here](http://ionicframework.com/docs/v2/native/)


How to use Ionic Native with Ionic 1
------------------------------------
-------------------------------------

As we have said we can use Ionic Native with both Ionic 2 and Ionic 1 .For Ionic 1 it can be used just like 
ngCordova but instead of importing ngCordova we import ionic.native .Just make sure you include ionic.native.js
in your index.html file .

    angular.module('myApp', ['ionic', 'ionic.native'])
    .controller('MyCtrl', function($scope, $cordovaCamera) {
      
            $scope.takePicture = function() {
                $cordovaCamera.getPicture(opts).then(function(p) {
                }, function(err) {
                });
            };
    });



