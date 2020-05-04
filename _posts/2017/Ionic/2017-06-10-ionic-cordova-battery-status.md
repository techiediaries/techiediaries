---
layout: bpost
title: "Ionic 5/Angular - Check Device Battery Status with Cordova and Ionic Native 5"
image: "images/content/ionic-cordova-battery-status.png"
excerpt: "Ionic 5 - Check Device Battery Status with Cordova and Ionic Native 5" 
tags: ionic
date: 2020-05-03
---


In this tutorial, we'll be covering how to check device battery status in Ionic 5/Angular apps using Cordova and Ionic Native 5.

We'll see how to check the level of power and if the device is pluged to a power source.

## Creating a New Ionic 5 Project

As always let's start by creating a new Ionic 5 application, based on Angular and the blank template, using the Ionic CLI 5.

Open your terminal or command prompt and run the following command:

    ionic start IonicBatteryStatus blank 

Next, navigate inside your app folder using the following command:

    cd IonicBatteryStatus 

## Installing the Battery Status Cordova and Ionic Native 5 Plugins

Next, install both The Cordova plugin called `cordova-plugin-battery-status` and its Ionic Native 5 wrapper as follows:

    ionic plugin add --save cordova-plugin-battery-status
    npm install --save @ionic-native/battery-status

Next, Open the <em>src/app/app.module.ts</em> file and add `BatteryStatus` to module providers as follows:

    import { BatteryStatus } from '@ionic-native/battery-status';                

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
        BatteryStatus,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
    })
    export class AppModule {}  

Now we are ready to inject `BatteryStatus` and use it to check the battery status such as the level of power and if the device is plugged to an power source.

Go ahead and open the <em>src/pages/home/home.ts</em> file and add the following code:


    Import BatteryStatus and BatteryStatusResponse

    import { BatteryStatus ,BatteryStatusResponse } from '@ionic-native/battery-status';
    
Next, inject `BatteryStatus` and subscribe to the changes of the battery Status as follows:

    @Component({
    selector: 'home',
    templateUrl: 'home.html',
    })
    export class BatteryStatusPage {

    subscription : any;
    constructor(public navCtrl: NavController, public navParams: NavParams,private batteryStatus: BatteryStatus) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BatteryStatus');
        // watch change in battery status
        this.subscription = this.batteryStatus.onChange().subscribe(
        (status: BatteryStatusResponse) => {
        console.log(status.level, status.isPlugged);
        }
        );

        // stop watch
            
    }
    ionViewWillLeave() {
        this.subscription.unsubscribe();
    }

    } 


Using the `ionViewDidLoad` life cycle event we suscribed to the `this.batteryStatus.onChange()` event, when the page loads, so we can 
get continuos battery status while it's changing. When the page leaves (`ionViewWillLeave`) we unsubscribe.

We printed to the console the `status.level` which holds the level of power remaining on the device battery, and `status.isPlugged` which can be either `true` or `false` depending if the device is plugged to a source of power or not.

## Conclusion 

Battery status is such important information about a mobile device. Being able to retrieve the level of power in our Ionic 5 apps, and if the device is plugged to a power source or not, is an important thing that may be of good help when developing battery consuming apps.



