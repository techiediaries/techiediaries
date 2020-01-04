---
layout: post
title: "Ionic 4/Angular - Use Vibration with Cordova and Ionic Native"
image: "images/content/ionic-vibration.png"
excerpt: " How to use vibration in Ionic 2 / Ionic 3 apps " 
tags: ionic 
---

{% include image.html 
    img="images/content/ionic-vibration.png" 
    title="Ionic 2/3 vibration with cordova plugin" 
%}

In this tutorial, we will learn together how to use the Cordova Vibration plugin to vibrate apps built 
using Ionic 4/Angular framework. The example which we are going to build is simple with a button when clicked 
vibrate our device but of course this is just to demonstrate how to use vibration. You can use it as a 
base template for building a full featured real app with vibration and other features.

Let's get started by generating a new project based on Ionic 3 or you can use it in an existing project.

Open  your terminal or command prompt and run: 

    ionic start vibration-demo bank --type=angular

<div class="note">
Please note that i'm using Ionic CLI 4 .
</div>    

Next navigate inside your project root directory and install both the Cordova vibration plugin and its 
Ionic Native wrapper:

    ionic cordova plugin add cordova-plugin-vibration --save 
    npm install --save @ionic-native/vibration

Now we need to add it to the list of main module providers

Go ahead and open <em>src/app/app.module.ts</em> 

Start by importing the Vibration wrapper from @ionic-native:

    /* ... */

    import { Vibration } from '@ionic-native/vibration';
    
    /* ... */

    providers: [
        StatusBar,
        SplashScreen,
        Vibration,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
    })
    export class AppModule {}


After this ,you should be able to inject and use vibration in your component so open <em>src/pages/home/home.ts</em>

Then import and inject the vibration plugin 

    import { Vibration } from '@ionic-native/vibration';
    
    /* ... */
    
    @Component({
    selector: 'page-home',
    templateUrl: 'home.html'
    })
    export class HomePage {
    
        constructor(public navCtrl: NavController , private vibration :Vibration) {

        }
    
    /* ... */

Next add a vibrate() method 

    vibrate(){
        this.vibration.vibrate(1000);
    }

which is going to vibrate the device 1000 ms == 1 s ,you can also pass an array to vibrate()

    vibrate(){
        this.vibration.vibrate([1000 , 500 , 2000]);
    }

Which is going to vibrate the device 1s then pause half of second then vibrate it 2 seconds .

Now lets add a button and bind it click handler to the vibrate() method .

Open <em>src/pages/home/home.html</em> then add a button 

    <ion-header>

    <ion-navbar>
        <ion-title>Vibration example demo </ion-title>
    </ion-navbar>

    </ion-header>


    <ion-content padding>
    <button ion-button (click)="vibrate()">Vibrate ME </button>
    </ion-content>    


The next step is to add a platform to your project .I will be using Android so 

    ionic cordova platform add android 

Then run on your device with live sync using 

    ionic run android -l 

Conclusion 
-------------------
-------------------

We have seen how to use the Cordova vibration plugin and Ionic Native 3 to create an Ionic 4/Angular app that 
uses vibration.

Thanks for reading and see on the next tutorial.
        