---
layout: post
title: "Building Augmented Reality Apps with Ionic 4 and Wikitude Cordova Plugin "
image: "images/content/ionic-ar-wikitude-cordova-plugin.png"
excerpt: "Building augmented reality apps with Ionic and wikitude Cordova plugin"
categories : mobiledev
tags : ionic
---

{% include image.html
   img="images/content/ionic-ar-wikitude-cordova-plugin.png"
       title="Building augmented reality apps with Ionic and wikitude Cordova plugin"
%}

In this post we are going to use Ionicitude to build augmented reality mobile apps using the hybrid Ionic 4 framework.

Ionicitude provides you with a simple to use API on top of the Cordova plugin wikitude for working with AR views.

First of all, what is wikitude Cordova plugin?

It's a plugin for Cordova container that allows developers to build augmented reality apps with Cordova based frameworks such as Ionic 4 in our case. 

Using this plugin you have to the possibility to create augmented reality experiences based either on user's location or camera so you can build all sort of AR apps.

If you have already an experience with Ionic 4 then you know that testing apps that relay on mobile hardware can't be done on the browser and since AR is all about using device hardware such as Camera and other sensors/detectors you have to be prepared to test the app on your own real device.

It's just a matter of pluging in your device with your computer using an USB cable and then build and run your app with Ionic CLI 4.

Now lets get started.

The first thing you need to do is to scaffold a new Ionic project so open up your terminal/command prompt and enter the following command: 

    ionic start ionic-augmented-reality-project --type=angular

Next add your target platform:

    cd ionic-augmented-reality-project
    ionic platform add android@5.0.0

Since we are using Ubuntu we can only target Android. You should be able to add an iOS target if you are using 
A macOS for development.

The Wikitude plugin works with at least version 5 of Android.

Next you should add the plugin using the following command: 

    ionic plugin add https://github.com/Wikitude/wikitude-cordova-plugin.git

Now you should be able to build your project using the following command:

    ionic build android 

If the build is successful then congratulations, the plugin is working correctly.

## Installing Ionicitude

Now we need to install Ionicitude so go ahead and type this with your CLI:

    bower install --save-dev tazaf/ionicitude

 Which will install Ionicitude under www/lib/ionicitude

 Next you need to include it in your project index.html

    <script src="lib/ionicitude/dist/ionicitude.min.js"></script>

Next you need to initialize Ionicitude so open app.ts file and add Ionicitude.init():

    angular.module('app').run(run);

    function run($ionicPlatform, Ionicitude) {
    $ionicPlatform.ready(function () {
        
        Ionicitude.init();
    
    });
    }



## How to launch an AR world 

Under www create a folder with wikitude-worlds name which is used to put AR Worlds files .

Under wikitude-worlds create a subfolder for your world lets call it myworld 

    cd www
    mkdir wikitude-worlds && cd wikitude-worlds
    mkdir myworld && cd myworld

Then create an index.html file for your AR world 

    touch index.html

and copy paste the following minimalistic code for an AR world 


    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta content="width=device-width,initial-scale=1,maximum-scale=1,
        user-scalable=0,target-densitydpi=device-dpi"
            name="viewport">

        <title>Blank ARchitect World</title>
        <!-- This line is mandatory. That's what's 
        loading the Wikitude logic. -->
        <script src="architect://architect.js"></script>

        <!-- Your ARchitect World JS -->
        <script src="main.js"></script>

        <!-- Your ARchitect World CSS -->
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <h1>This is an overlay Title</h1>
    </body>
    </html>


Next to launch myworld you need to add the following code inside your controller

    Ionicitude.ready(function () {
        Ionicitude.launchAR('myworld')
            .then(function (success) {
                // ...
            }
            .catch(function (error) }
                // ...
            }
    });

So these are the minimal steps required to build an AR app with Ionic ,Cordova and wikitude .

For more information 

Visit [Ionicitude repository on Github](https://github.com/Tazaf/ionicitude)

[Wikitude Cordova plugin docs](http://www.wikitude.com/external/doc/documentation/latest/phonegap/targetmanagement.html)

[A Demo application on GitHub ](https://github.com/Tazaf/IonicitudeDemoApp)

[An Ionic 2 starter app which uses Ionic 2 with Wikitude Cordova plugin for building augmented reality apps](https://s3.amazonaws.com/ionic-marketplace/wikitude-ionic-2-starter-app/148542509528600/wikitude-ionic-2-starter-app.zip)

[Ionic 2 augmented reality app with Wikitude](https://github.com/pbreuss/wikitude-ionic-2-starter-app)

