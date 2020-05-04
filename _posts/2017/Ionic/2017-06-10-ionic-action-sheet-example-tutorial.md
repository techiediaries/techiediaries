---
layout: bpost
title: "Ionic 5/Angular Action Sheet Example with Cordova and Ionic Native 5"
image: "images/content/ionic-action-sheet.png"
excerpt: " How to use Action Sheet in Ionic 5 apps"
date: 2020-05-03 
tags: ionic 
---

In this tutorial, we are going to cover how to create and display an Action Sheet with a detailed example using Ionic 5 (Ionic 4) framework.

Action Sheets are used to dispaly a set of buttons and actions for the user to choose from.

## Create a New Ionic 5/Angular Project

First create a new Ionic 5 project using the Ionic CLI (I'm using CLI 5). You can also use an existing app:

    ionic start ActionSheetExample blank 

Next install the ActionSheet Cordova plugin and Ionic Native wrapper:

    ionic cordova plugin add --save cordova-plugin-actionsheet
    npm install --save @ionic-native/action-sheet


Next, open the <em>src/app/app.module.ts</em> file and add <em>ActionSheet</em> to the list of providers as follows:

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


Next, open the <em>src/pages/home/home.html</em> file and add a button as follows:

    <button ion-button (click)="openActionSheet()" class="button">Open Action Sheet</button>

Next, in the <em>src/pages/home/home.ts</em> file, import and inject ActionSheet as follows:

    import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';

    export class ActionSheetPage {

    constructor(private actionSheet: ActionSheet) {
        
    }   
    openActionSheet(){}
    /* ...*/ 

Next, implement the `openActionSheet()` method as follows:

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

You can then implement the logic of each button on the Promise returned by  the `this.actionSheet.show(options)` method based on the clicked button index.

Now, add a target platform (Android or iOS) and run your app using an emulator or real device:

    ionic cordova platform add android 
    ionic run android 

## Conclusion 

We have seen how to use a Cordova plugin to create and show the native ActionSheet UI component in our Ionic 5/Angular app. We can also 
use Ionic's own implementation of the Action Sheet, check this tutorial:

<a href="/ionic-action-sheet-controller">Ionic 5/ ActionSheet Component Controller</a> 