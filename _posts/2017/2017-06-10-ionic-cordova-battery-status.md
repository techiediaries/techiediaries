---
layout: post
title: "Ionic 2+ - Check Device Battery Status with Cordova and Ionic Native 3.x+"
image: "images/content/ionic-cordova-battery-status.png"
excerpt: "Ionic 2+ - Check Device Battery Status with Cordova and Ionic Native 3.x+" 
tags: ionic 
---

{% include image.html 
    img="images/content/ionic-cordova-battery-status.png" 
    title="Ionic 2+ - Check Device Battery Status with Cordova and Ionic Native 3.x+" 
%}

Introduction 
-----------------
-----------------

In this tutorial we'll be covering how to check device battery status in Ionic 2+ apps using Cordova and 
Ionic Native 3.x+ .

We'll see how to check the level of power and if the device is pluged to a power source .

Getting started 
-----------------
-----------------

As always lets start by creating a new Ionic application ,based on the blank,using the Ionic CLI v3+ 

Open your terminal or command propmt then run :

    ionic start IonicBatteryStatus blank 

Navigate inside your app root folder :

    cd IonicBatteryStatus 

Install both The Cordova plugin cordova-plugin-battery-status and its Ionic Native 3.x+ wrapper 

    ionic plugin add --save cordova-plugin-battery-status
    npm install --save @ionic-native/battery-status

Open <em>src/app/app.module.ts</em> and add BatteryStatus to module providers .

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

Now we are ready to inject BatteryStatus and use it to check the battery status such as the level of power and if 
the device is plugged to an power source .

So go ahead and open <em>src/pages/home/home.ts</em>

Import BatteryStatus and BatteryStatusResponse

    import { BatteryStatus ,BatteryStatusResponse } from '@ionic-native/battery-status';
    
Inject BatteryStatus then subscribe to changes to Battery Status

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


So using ionViewDidLoad life cycle event we suscribed to this.batteryStatus.onChange() event, when the page loads, so we can 
get continuos battery status while it is changing .  

And when the page leaves (ionViewWillLeave) we unsubscribe .

We just print to the console the status.level which holds the level of power remaining on the device battery .
And status.isPlugged which can be either true or false depending on if the device is plugged to a source of 
power .

Conclusion 
-----------------
-----------------

Battery status is such important information about a mobile device .Being able to retrieve the level of 
power , and if the device is plugged to a power source or not ,is an important thing that may be of good 
help when developing battery consuming apps .



