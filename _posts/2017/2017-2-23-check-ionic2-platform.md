---
layout: post
title: "checking Ionic 4 Platform: Device Information "
image: "images/content/check-ionic2-platform.png"
excerpt: "How to check or detect the Ionic 4 platform where your mobile app is running"
categories : mobiledev
tags : ionic2 ionic 
---

![Ionic 4 platform](/images/content/check-ionic2-platform.png)

Ionic 4 provides the `Platform` service which provides you with information about the current device.

You can use the `Platform` service to get a lot of information which will help you customize your application for a specific environment or OS such as the browser, Android or iOS etc.

If you either want to check or detect the platform where your app is running or you want more information
about the device such as the language direction or the device orientation you can use different methods available from the `Platform` service.

Now how to check for the host platform?

To check for the target platform you need first to import the Platform service 

    import { Platform } from 'ionic-angular'; 

Then check if the platform is ready and use the Promise source to get your platform.

All you need to do is to inject the `Platform` service on your constructor and call the `platform.ready()` method: 

    @Component({
    templateUrl: 'app.html'
    })
    export class MyApp {
        rootPage = HomePage;

        constructor(platform: Platform) {
            platform.ready().then((source) => {
                console.log("platform source " + source);
            });
        }
    }

You can also use the `is(platformname)` method to check for the platform. For example if you need to check
if your app is running on the browser or on the device you just need to use the following code:

    @Component({
    templateUrl: 'app.html'
    })
    export class MyApp {
        rootPage = HomePage;

        constructor(platform: Platform) {
            platform.ready().then(() => {

                if (this.platform.is('android')) {
                    console.log("running on Android device!");
                }
                if (this.platform.is('ios')) {
                    console.log("running on iOS device!");
                }
                if (this.platform.is('mobileweb')) {
                    console.log("running in a browser on mobile!");
                }
                 
            });
        }
    }

The `Platform` service has many more methods that you can use for customizing your app behavior depending 
on platform type and device conditions but the most used method is the `ready()` method which is used
to detect if the target platform is ready and all device native functionality can be accessed safely.

