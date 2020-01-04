---
layout: post
title: "Fix for Ionic 2 and TypeScript cannot find name cordova"
image: "images/content/ionic2-typescript-cannot-find-name-cordova.png"
excerpt: "Fix for Ionic 2 and TypeScript cannot find name cordova"
categories : mobiledev
tags : [ionic,typescript] 
---

{% include image.html
   img="images/content/ionic2-typescript-cannot-find-name-cordova.png"
       title="Fix for Ionic 2 and TypeScript cannot find name cordova"
%}

You can access many Cordova plugins in Ionic 2 apps based on TypeScript with Ionic Native but there are 
also other Cordova plugins that are not supported by Ionic native .In this case all you have to do it to use 
the unsupported plugin directly but you need to have access to the cordova object .

Basically there are two options : 

If the cordova plugin is supported by Ionic Native you can use the plugin 
by just importing it from ionic-native module .For example

Lets suppose we have added a plugin with 

    cordova plugin add cordova-plugin-inappbrowser

All you need to do to access it from your component or TypeScript class is 

Import the plugin from 'ionic-native'

    import { InAppBrowser } from 'ionic-native';

And then call any api 

    let browser = new InAppBrowser(url,'_system');

If the Cordova plugin is not supported ,in this case you need access to cordova object from TypeScript code

If you try you will get this error :

<b>
Cannot find name 'cordova'
</b>

So how to fix this error ?

First you need to install the typings module via npm with
    
    npm install -g typings

Then use typings to install the TypeScript definitions for Cordova with 

    typings install dt~cordova --save --global 

Then after importing your plugin from 'ionic-native' add the following line 

    declare var cordova:any;

Now you can use the syntax 

    cordova.somePlugin.someMethod() 

To access your plugin API .

    
    