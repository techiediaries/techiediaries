---
layout: bpost
title: "Ionic 5 Action Sheet Controller Tutorial and Example"
image: "images/content/ionic-action-sheet-controller.png"
excerpt: " How to use Action Sheet controller in Ionic 5  apps"
date: 2020-05-03
tags: ionic 
---

{% include image.html 
    img="images/content/ionic-action-sheet-controller.png" 
    title="Ionic 5 Action Sheet controller" 
%}


In a previous tutorial we have seen how to use Cordova and Ionic Native 5 to create and show the native Action Sheet In Ionic 5. Let's now see how to display an Ionic 5i mplementation of Action Sheet without using any Cordova plugin.


## Create an Ionic 5/Angular Project

Start by creating a new Ionic 5 project using the Ionic CLI 5:

    ionic start ActionSheetControllerExample blank 

You can also use an existing project.

## Trigger the Action Sheet

Next open <em>src/pages/home/home</em> and add a button to trigger the Action Sheet component:

    <button ion-button (click)="openActionSheetController()" class="button">Open Action Sheet</button>

Next, open <em>src/pages/home/home.ts</em> and add the following code:

Import and Inject `ActionSheetController` as follows:

    import { ActionSheetController } from '@ionic/angular';

    @Component({
    selector: 'home',
    templateUrl: 'home.html',
    })
    export class HomePage {

    constructor(public actionSheetCtrl: ActionSheetController) {
        
    }    


Next, add the `openActionSheetController()` method as follows:

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

So first we create the `actionSheet` object with the required options such as the title and buttons. 

Each button has its own title and the handler which gets executed when the button is clicked.

Next, we use the `present()` method of the `actionSheet` object to dispaly the Action Sheet to the user.

## Conclusion 

We have covered how to use the Action Sheet component Controller to use and dispaly an Action Sheet with a set of custom buttons in our Ionic 5/Angular project.

You can also see this tutorial for how to <a href="/ionic-action-sheet-example-tutorial">display native action sheet using Cordova and Ionic Native</a>

