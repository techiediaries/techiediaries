---
layout: bpost
title: "Ionic 5 Native Calendar with Cordova and Ionic Native 5"
image: "images/content/ionic-cordova-native-calendar.png"
excerpt: "Open Ionic 5 Native Calendar with Cordova and Ionic Native 5"
date: 2020-05-03
tags: ionic 
---

In this tutorial, we'll see how to use the device Native Calendar in Ionic 5 with Cordova and Ionic Native 5. We will create a simple Ionic 5 application example which demonstrates how to open or create native calendar, how to ask for read and write permissions to calendar and how to schedule or add events to calendar.

## Create a New Ionic 5/Angular Project

Let's get started by generating a new Ionic 5 application using the Ionic CLI 5.

Open your terminal or command prompt and run the following command:

    ionic start IonicNativeCalendarExample 

Next, navigate inside the project's folder using the following command:

    cd IonicNativeCalendarExample 

## Installing the Cordova and Ionic Native 5 Calendar Plugins

Next, install the Cordova Calendar plugin and its Ionic Native wrapper as follows: 

    ionic plugin add --save cordova-plugin-calendar
    npm install --save @ionic-native/calendar

Next, we need to add the Calendar provider to main module providers array. Open the <em>src/app/app.module.ts</em> file and add the following code:


    import { Calendar } from '@ionic-native/calendar';

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
        Calendar,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
    })
    export class AppModule {}     


## Injecting and Using the Calendar Service in Ionic 5

Now we are ready to inject and use the native Calendar API.

Open the <em>src/pages/home/home.ts</em> file and update it as follows:

    import { Calendar } from '@ionic-native/calendar';

    @Component({
    selector: 'home',
    templateUrl: 'home.html',
    })
    export class HomePage {

    constructor(private calendar: Calendar) {
    }

    openCalendar(){
        this.calendar.openCalendar(new Date()).then(
            (msg) => { console.log(msg); },
            (err) => { console.log(err); }
        );
    }

    }

We have injected the Calendar service via the component constructor and used the instance to open a calendar with the current date.

Open the <em>src/pages/home/home.html</em> file and add a button to open the native calendar as follows:


    <button ion-button (click)="openCalendar()">Open Calendar on Current Date</button>

This is just a simple example to open a calendar. You can call more available methods for asking for read and write permissions then scheduling or adding events to Calendar.

Here is an example that ask for read/write permissions. If they are granted, an event will be added to the calendar interactively. If not, permissions will be first requested and then the event will be added:

    addEvent(){
        return this.calendar.createEventInteractively("event title");
    }
    scheduleEvents(){
        this.calendar.hasReadWritePermission().then((result)=>{
        if(result === false){
            this.calendar.requestReadWritePermission().then((v)=>{
                this.addEvent();
            },(r)=>{
                console.log("Rejected");
            })
        }
        else
        {
            this.addEvent();
        }
        })     


You can find more information about the methods you can call via <a href="https://ionicframework.com/docs/native/calendar/" target="_blank"> Ionic Native docs for this plugin </a>.


## Conclusion 
    
You can add a target platform (Android and iOS only) and run your Ionic 5 Calendar app using an emulator or real device.
