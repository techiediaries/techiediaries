---
layout: post
title: "Ionic 5/Angular Modals "
image: "images/content/ionic-modals.png"
excerpt: "Understanding how to use Ionic 5/4 modals"
date: 2020-02-12 
tags : [ionic]
---

{% include image.html 
    img="images/content/ionic-modals.png" 
    title="Ionic 2/3 modals " 
%}

In this tutorial, we are going to see how to use modals in Ionic 5/Angular apps by creating a simple demo app 
so let's get started!

First of all, We need to mention that we are using the Ionic CLI 5 so if you didn't yet upgrade to this release 
make sure to use the equivalent commands for Ionic CLI prior versions.


## Generating a New Ionic 5/Angular Project 

Before implementing our modal example, let's first generate a brand new Ionic 5 project based on Angular.

Go ahead and open your terminal window then type the following command: 

    ionic start ionic-modals blank --type=angular

Next, navigate inside your project directory and serve your app using the following command: 

    cd ionic-modals
    ionic serve 

You should be able to visit your app by going to the <em>http://localhost:8100</em> address.

## Importing and using ModalController

Open <em>src/pages/home/home.ts</em> then import ModalController from <em>ionic-angular</em>:

    import { ModalController } from 'ionic-angular';

Next we need to inject via component constructor: 


    @Component({
    selector: 'page-home',
    templateUrl: 'home.html'
    })
    export class HomePage {
    constructor(public navCtrl: NavController,public modalCtrl : ModalController) {

    }

    }

## Opening a Modal Page 

The next step is to add the `openModal()` method to the `HomePage` component and bind it to a button on the `home.html` file: 

    public openModal(){

    }    

    <button ion-button (click)="openModal()">Open Modal</button>

Before adding an implementation for the `openModal()` method, let's first add a new page to be used by our modal. 

Head to your terminal inside your project folder and run the following command:

    ionic g page ModalPage

Then in the `home.ts` file, use the `create()` method of `ModalController` to create a modal and then show it: 

  public openModal(){
    var modalPage = this.modalCtrl.create('ModalPage');
    modalPage.present();
  }

Now if you click on open modal button you should be able to see a modal page popups. 

## Closing the Modal Page 

We have added a method for opening a modal, now let's add a method to close the modal page once it is opened. 

Open the <em>src/pages/modal/modal.ts</em>` then add the `closeModal()` method to the `ModalPage` component: 

    public closeModal(){

    }

Then open the <em>src/pages/modal/modal.html</em> file and add a button to close the modal: 

    <ion-header>

    <ion-navbar>
        <ion-title>ModalPage</ion-title>
        <ion-buttons end>
        <button ion-button (click)="closeModal()">Close</button>
        </ion-buttons>
    </ion-navbar>

    </ion-header>


    <ion-content padding>

    </ion-content>

Now let's implement the `closeModal()` method.

First we need to import `ViewController` from the <em>ionic-angular</em> package:

    import { ViewController } from 'ionic-angular';

Inject `ViewController` via component constructor: 

    export class ModalPage {

    constructor(public viewCtrl : ViewController ) {
    }    

Next, use the `dismiss()` method to close the modal: 

    export class ModalPage {

    constructor(public navCtrl: NavController, public viewCtrl : ViewController ,public navParams: NavParams) {
    }
    public closeModal(){
        this.viewCtrl.dismiss();
    }

    }


## Passing Data to Modal Page Component


You can also pass some data to a modal page component using the second parameter of the `create()` method. Passed data can be of any type: string , number or object.

Go ahead, change the `openModal()` method to pass some data object:

    public openModal(){
        var data = { message : 'hello world' };
        var modalPage = this.modalCtrl.create('ModalPage',data);
        modalPage.present();
    }

Now let's get the passed parameters using `NavParams`:  

    @IonicPage()
    @Component({
    selector: 'page-modal',
    templateUrl: 'modal.html',
    })
    export class ModalPage {

    constructor(public navCtrl: NavController, public viewCtrl : ViewController ,public navParams: NavParams) {
    }
    public closeModal(){
        this.viewCtrl.dismiss();
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad ModalPage');
        console.log(this.navParams.get('message'));
    }

    }    
      
## Conclusion 

This is the end of this tutorial. We have seen how to use modals in Ionic 5/Angular.

