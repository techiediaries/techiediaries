---
layout: post
title: "Ionic 2 - Action Sheet Controller Tutorial and Example"
image: "images/content/ionic-action-sheet-controller.png"
excerpt: " How to use Action Sheet controller in Ionic 2 / Ionic 3 apps " 
tags: ionic 
---

{% include image.html 
    img="images/content/ionic-action-sheet-controller.png" 
    title="Ionic 2/3 Action Sheet controller" 
%}

Introduction 
--------------
--------------

In a previous tutorial we have seen how to use Cordova and Ionic Native 3.x+ to create and show the native 
Action Sheet In Ionic 2 .Lets now see how to display an Ionic implementation of Action Sheet without using 
any Cordova plugin .

Required Steps 
-----------------
-----------------

Start by creating a new Ionic 2 project using the Ionic CLI v3 .

    ionic start ActionSheetControllerExample blank 

You can also use an existing project .

Next open <em>src/pages/home/home</em> and add a button to trigger the Action Sheet component .

    <button ion-button (click)="openActionSheetController()" class="button">Open Action Sheet</button>

Then open <em>src/pages/home/home.ts</em>

Import and Inject ActionSheetController

    import { ActionSheetController } from 'ionic-angular';

    @Component({
    selector: 'home',
    templateUrl: 'home.html',
    })
    export class HomePage {

    constructor(public actionSheetCtrl: ActionSheetController) {
        
    }    


Then add openActionSheetController()

    openActionSheetController(){
        let actionSheet = this.actionSheetCtrl.create({
        title: 'Action Sheet Title',
        buttons: [{
            text: 'Hide',
            handler: () => {
                let navTransition = actionSheet.dismiss();
                return false;
            }
        }]
        });

        actionSheet.present();    
    }

So first we create the actionSheet object with the required options such as the title and buttons 

Each button has its own title and the handler which gets executed when the button is clicked .

Then we use present() method of actionSheet object to dispaly the Action Sheet to the user .

Conclusion 
-------------
-------------

We have covered how to use the Action Sheet component Controller to use and dispaly an Action Sheet with 
a set of custom buttons .

You can also see this tutorial for how to <a href="/ionic-action-sheet-example-tutorial">display native action sheet using Cordova and Ionic Native</a>

