---
layout: post
title: "Ionic 2 - Action Sheet Example with Cordova and Ionic Native 3.x+ "
image: "images/content/ionic-action-sheet.png"
excerpt: " How to use Action Sheet in Ionic 2 / Ionic 3 apps " 
tags: ionic 
---

{% include image.html 
    img="images/content/ionic-action-sheet.png" 
    title="Ionic 2/3 Action Sheet with cordova plugin" 
%}

Introduction 
----------------
----------------

In this tutorial we are going to cover how to create and display an Action Sheet with a detailed example using 
Ionic 2 (Or Ionic 3) framework .

Action Sheets are used to dispaly a set of buttons and actions for the user to choose from .

Steps 
--------------
--------------

First create a new Ionic 2 project using the Ionic CLI (I'm using CLI v3).You can also use an existing app.

    ionic start ActionSheetExample blank 

Next install the ActionSheet Cordova plugin and Ionic Native wrapper .

    ionic cordova plugin add --save cordova-plugin-actionsheet
    npm install --save @ionic-native/action-sheet


Next open <em>src/app/app.module.ts</em> and add <em>ActionSheet</em> to the list of providers .

    import { ActionSheet } from '@ionic-native/action-sheet';

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
        ActionSheet,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
    })
    export class AppModule {}


Open <em>src/pages/home/home.html</em> then add a button .

    <button ion-button (click)="openActionSheet()" class="button">Open Action Sheet</button>

Then in <em>src/pages/home/home.ts</em> :

Import and inject ActionSheet 

    import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';

    export class ActionSheetPage {

    constructor(private actionSheet: ActionSheet) {
        
    }   
    openActionSheet(){}
    /* ...*/ 

Next implement openActionSheet() method 

    openActionSheet(){
        let buttonLabels = ['Button 0', 'Button 1'];

        const options: ActionSheetOptions = {
            title: 'Action Sheet Title',
            subtitle: 'Choose an action',
            buttonLabels: buttonLabels,
            addCancelButtonWithLabel: 'Cancel',
            addDestructiveButtonWithLabel: 'Delete',
            destructiveButtonLast: true
        };

        this.actionSheet.show(options).then((buttonIndex: number) => {
            console.log('Button pressed: ' + buttonIndex);
        });
    }

You can then implement the logic of each button on the promise returned by  this.actionSheet.show(options)
based on the clicked button index .

Now add a target platform (Android ,iOS or Windows Phone) and run your app using an emulator or real device .

    ionic cordova platform add android 
    ionic run android 

Conclusion 
------------------
------------------

We have seen how to use a Cordova plugin to create and show the native ActionSheet UI component .We can also 
use Ionic's own implementation of the Action Sheet ,check this tutorial:

<a href="/ionic-action-sheet-controller">Ionic 2/Ionic 3 ActionSheet Component Controller</a>     


