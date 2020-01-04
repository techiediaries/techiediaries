---
layout: post
title: "Ionic Native 3.x "
image: "images/content/ionic-native-3-x.png"
excerpt: "How to use Ionic Native 3.x plugins in your mobile apps " 
tags : [ionic]
---


{% include image.html 
    img="images/content/ionic-native-3-x.png" 
    title="Ionic Native 3.x" 
%}

The Ionic Native 3.x introduces many features and changes to how to add native Cordova plugins to your Ionic 2 project (Ionic 1 and Angular 1 are not supported by this version of Ionic native thus 
you need to use the previous version) .

Before showing some examples of how you can use Ionic Native 3.x with your project ,lets walk through the major changes in Ionic Native 3.x 

If you are developing hybrid apps with Ionic or any other Cordova based framework then you already know ,the big cons of hybrid 
apps vs native apps are performance and size .So The Ionic team has focused on making great efforts to improve performance and reduce the final app size 
to build native like apps with Ionic .

Ionic native bundles a great amount of plugins code even if you don't use them in your mobile apps which make their size huge so Ionic native 3.x 
took another different approach from the previous versions which is putting each plugin code inside its own npm module .The user 
can then install the plugin(s) he needs ,now mobile apps contain only the core of Ionic native plus the plugins the app actually use .

According to Ionic team ,by using this approach the final app size is reduced by 15% which will also improve the loading 
time of Ionic apps.


So how does that affect your development workflow ?

As we have said ,to use an Ionic native you need to install it separately via npm .

You also need to include the added plugin in the application root module under the providers array .

Native plugins mocking 
----------------
---------------- 

The Ionic 3.x release did not only reduced the size of Ionic apps but also improved the development workfow by adding full 
support of plugin mocking which makes building and testing Ionic apps much faster by allowing full app development on the browser
without the need of mobile devices and emulators .

As you already know you can use the browser to test your Ionic apps thanks to ionic serve but when you need to use a native 
feature of mobile devices such as the Camera or the geolocation you have to switch to use an emulator or attach an 
actual mobile device but that is not the case anymore with Ionic Native 3.x because you can test any of the 130+ Ionic Native plugins 
right on the browser by writing plugin mocks which makes it possible to build your full Ionic app on the browser via the famous ionic serve .
As a developer you are going to appreciate the development speed you are going to gain thanks to Ionic Native 3.x .

But what is native plugin mocking ?

Plugin mocking is the process of writing a plugin mock which is a class that mimics the functionality of a real native plugin so to take 
advantage of plugin mocking you need to write mocks for the plugins that you intend to use in your Ionic app .

A plugin mock must have the same class interface as the real plugin and needs to return some test data instead of the actual data 
returned by actual plugin .


How to install and use an Ionic native plugin ?
----------------------------------------------
-----------------------------------------------

The core of Ionic Native module is included in each Ionic project but you need to install Ionic Native packages for 
the native plugins that you intend to use in your application .

Now lets see an example of adding a Cordova plugin to an Ionic 2 project .

Lets suppose we need to add the Camera plugin to our project .We will start by adding the target platform (Android ,iOS or Windows )

So navigate inside your project root folder and run 

    ionic platform add android | ios | windows

<div class="note">
You need to make sure you have Cordova installed globally on your system .If that is not the case ,you can easily install 
via npm with npm install cordova -g 
</div>

Next we need to add the Cordova plugin for accessing device camera .Using the Ionic CLI run 

    ionic plugin add cordova-plugin-camera

 Next you need to install the native plugin for camera via npm 

    npm install --save @ionic-native/camera

The final step you need to do before you can use the plugin in your components is :

Import the plugin in root application module <em> /src/app/app.module.ts </em> .

Add it to providers array .

    /* .... */
    
    import { Camera } from '@ionic-native/camera';

    /* ... */

    @NgModule({
    declarations: [
        MyApp,
        HomePage
    ],
    imports: [
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
        Camera,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
    })
    export class AppModule {}


So now you can start using the plugin within your app components by simply importing it and calling the required methods 

    import { Camera } from '@ionic-native/camera';

Conclusion 
----------------
----------------

Ionic Native 3.x has introduced many improvements either in terms of performance and final app size or in development 
workflow allowing developers to build and test apps entirely on the browser using Ionic serve and produce apps which are 
15% smaller .

      









