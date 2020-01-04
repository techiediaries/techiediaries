---
layout: post
title: "Mocking Ionic Native 3.x plugins "
image: "images/content/mocking-ionic-native-3-plugins.png"
excerpt: "Mocking Ionic Native 3.x plugins " 
tags : [ionic]
---


{% include image.html 
    img="images/content/mocking-ionic-native-3-plugins.png" 
    title="Mocking Ionic Native 3.x plugins" 
%}

Ionic Native 3.x has introduced plugins mocks which allow developers to build and test Ionic 2 apps entirely on the browser using the Ionic CLI
serve command so they don't have to use actual mobile devices or emulators which reduces the time between iterations and 
accelerate apps development .

What is a plugin mock ?
---------------------------
---------------------------

A native plugin mock is simply a class which mimics the functionality of a real plugin .It has the same programming interface 
as the actual Ionic native plugin and returns some user chosen data to enable the user to test the plugin without actually 
running the corresponding native feature on the real device or emulator .

For example before Ionic Native 3.x ,if you need to use the Camera in your Ionic apps you'll have to run your app in the 
actual device or the emulator to test if you are app is working as expected ,so you have to switch from ionic serve and 
browser test to actual device whenever you need to test a native plugin except for some few plugins which work under the browser
too .But with Ionic Native 3.x you can write a Camera mock which replaces the actual Ionic Native Camera plugin when you are testing 
the app on the browser which allows you to build and test your app entirely on the browser .

How to write native plugins mocks ?
------------------------------------
------------------------------------

A plugin mock is a  class which simulates the actual Ionic Native plugin so depending on the plugin that you need to 
mock the class needs to export a specific set of methods that return some data instead of real data we get from native 
devices .

In this tutorial we are going to create a mock for device Camera .If you have used the plugin before then you already know 
that it has a getPicture() method which returns the image taken with the Camera encoded in base 64 format .If you didn't use this plugin before 
then just open <em>@ionic-native/camera</em> TypeScript file to see what the plugin exports and then create fake methods 
corresponding to each method that you need to use in your app .

So go ahead and create an optional folder in your project root folder 

    cd src
    mkdir mocks 
    cd mocks 
    touch camera-mock.ts 

Open camera-mock.ts and copy paste the following code 

    export class CameraMock {
        getPicture(params) {
            return new Promise((resolve, reject) => {
                resolve("BASE_64_IMAGE_DATA");
            });
        }
    }

Next open <em>src/app.module.ts</em> and import mock class with 

    import { CameraMock } from "../mocks/camera-mock";

Then add it to module providers array 

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
        CameraMock,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
    })
    export class AppModule {}

Now you can use it in any component after importing it .

Conclusion
-------------
-------------

That is it ,now you can use the Camera mock instead of the actual Ionic native plugin and develop your app entirely on the 
browser .After finishing the development on the browser you need to swap the Camera mock with the actual Ionic 3 native 
Camera plugin and then build your app .




