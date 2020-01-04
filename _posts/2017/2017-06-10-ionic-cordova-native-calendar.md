---
layout: post
title: "Ionic 2+ - Open Native Calendar with Cordova and Ionic Native 3.x+"
image: "images/content/ionic-cordova-native-calendar.png"
excerpt: "Ionic 2+ : Open Native Calendar with Cordova and Ionic Native 3.x+" 
tags: ionic 
---

{% include image.html 
    img="images/content/ionic-cordova-native-calendar.png" 
    title="Ionic 2+ - Open Native Calendar with Cordova and Ionic Native 3.x+" 
%}

Introduction 
-----------------
-----------------

In this tutorial ,we'll see how to use the device Native Calendar in Ionic 2+ with Cordova and Ionic Native 3.x+ .

We will create a simple Ionic 2+ application example which demonstrates how to open or create native calendar ,how 
to ask for read and write permissions to calendar and how to schedule or add events to calendar .

Getting  started 
---------------------
---------------------

Lets get started by generating a new Ionic 2+ application using the Ionic CLI v3+ :

Open your terminal or command prompt then run :

    ionic start IonicNativeCalendarExample 

Navigate inside root folder :

    cd IonicNativeCalendarExample 

Install the Cordova Calendar plugin and its Ionic Native wrapper . 

    ionic plugin add --save cordova-plugin-calendar
    npm install --save @ionic-native/calendar

We need to add the Calendar provider to main module providers array :

Open <em>src/app/app.module.ts</em> then add :


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


Now we are ready to inject and use the native Calendar API .

Open <em>src/pages/home/home.ts</em> then :

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

We have injected Calendar via component constructor then used the instance to open a calendar with current 
date .

Open <em>src/pages/home/home.html</em> and add a button to open the native calendar :


    <button ion-button (click)="openCalendar()">Open Calendar on Current Date</button>

This is just a simple example to open a calendar .You can call more available methods for asking for 
read and write permissions then scheduling or adding events to Calendar .

Here is an example that ask for read/write permissions ,if they are granted an event will be added to 
Calendar interactively ,If not permissions will be first requested and then the event will be added .

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


You can find more information about the methods you can call via <a href="https://ionicframework.com/docs/native/calendar/" target="_blank"> Ionic Native docs for this plugin </a> .


Conclusion 
--------------
--------------        

You can add a target platform (Android and iOS only ) then run your Calendar app using an emulator or real 
device .
