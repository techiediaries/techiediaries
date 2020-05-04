---
layout: bpost
title: "Ionic 5/Angular - Adding Cordova Android Platform "
image: "images/content/ionic-cordova-add-android-platform.png"
excerpt: " We'll cover how to add a Cordova Android platform to an Ionic 2 / Ionic 3 project and needed requirements" 
tags: ionic 
date: 2020-05-03
---

{% include image.html 
    img="images/content/ionic-cordova-add-android-platform.png" 
    title="Ionic 2/3 add android platform" 
%}

In previous tutorial we created our first Ionic 5/Angular project. Ionic apps are cross platform which mean they can be used to target Android, iOS and Windows phone (UWP) devices but before you can actually target a specific device platform you need to add the platform to your Ionic project so lets cover how to do that for Android.

First, before you can add an Android platform to your Ionic 5 project you need to have some requirements 
installed on your development machine:   

First install Java on your system if its not installed 

You can verify if Java installed on your system by running: 

    java -v 

If the command goes unrecognized then head over to Java official website and download Java then install it.


Setup JAVA_HOME environment variable to point to your Java installation folder:

    export JAVA_HOME='path/to/java'

Next install the Android SDK from Android studio official website (You  can install the whole Android studio or just the Android SDK)

Setup the ANDROID_HOME environment variable to point tou your SDK folder: 

    export ANDROID_HOME='/path/to/android/sdk'

Finally you need to install Cordova if it's not yet installed:

    npm install -g cordova

These are all the requirements you need to have before you can add an Android platform to your project.

Now lets add an android platform to our project.

Navigate to our previously created project then run: 


    ionic cordova platform add android 

That's it! You have now added an android platform to your project which means you can build and run your 
app on Android devices: 

    ionic run android -l 

This command will run your app in your Android device with live reload enabled which means every time 
you make changes to your source code it gets reloaed on the device and the app will be refreshed/restarted which 
is a nice feature if you are developing and testing your app in a real device.

## Conclusion 

We have covered how to add an Android platform to Ionic 5/Angular projects and all the requirements we need to 
have installed before we can do that.
            

    


