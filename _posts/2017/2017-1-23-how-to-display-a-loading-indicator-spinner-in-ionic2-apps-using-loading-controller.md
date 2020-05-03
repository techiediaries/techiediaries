---
layout: bpost
title: "Display a Loading Indicator/Spinner in Ionic 5 With LoadingController"
image: "images/content/how-to-display-a-loading-indicator-spinner-in-ionic2-apps-using-loading-controller.png"
excerpt: "Display a Loading Indicator/Spinner in Ionic 5 With LoadingController"
categories : ionic2
date: 2020-05-03
tags: ionic2  ionic 
---

In this tutorial, we'll learn to how to display a Loading Indicator/Spinner in Ionic 5 With LoadingController.

## Why Using the Loading Controller in your Ionic 5 App?

The user experience is considered as a very important factor for a successful mobile application. Among things that constitute a good user experience is visual feedback which means your users are getting feedback of what is going on with your app every time your app is working on some UI blocking task.

For example if you app is getting some data from a remote database (which may take a significant time) then you should display some visual indicator which tells your users to wait for data to be completely received and in the same time block the UI to prevent users from repeating actions or otherwise they may repeat actions that may cause the app to malfunction instead of waiting the completion of current task.

Ionic 5/Angular has a built-in service for blocking UI and giving visual feedback to users when the app is executing some time consuming activity on background such as loading data from a remote database. 

You can simply use the `LoadingController` which is available from the `@ionic/angular` package.

## Using LoadingController in Ionic 5 by Example
 
So start by importing LoadingController:

    import { LoadingController } from 'ionic-angular';

Then inject it on the class constructor:

    constructor(public loadingController:LoadingController){...}

        let loading = this.loadingController.create({content : "Logging in ,please wait..."});
        loading.present();
        this.auth.login('basic', {'email':this.email, 'password':this.password}).then(()=>{
            loading.dismissAll();
        });

When you are successfully logged in, the `dismissAll()` method hides the loading indicator 
so you can continue interacting with your app normally.
 
Read the official Ionic 5 docs for [LoadingController](https://ionicframework.com/docs/v2/api/components/loading/LoadingController)




