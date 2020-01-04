---
layout: post
title: "Ionic 3 - Build a Barcode/QR Code Scanner/Encoder App"
image: "images/content/barcode-qr-code-scanner-ionic-3.png"
excerpt: "Create a Barcode/QR code scanner application with Ionic Native and Ionic 3" 
tags : [ionic]
---

{% include image.html 
    img="images/content/barcode-qr-code-scanner-ionic-3.png" 
    title="Build a Barcode/QR Code Scanner App with Ionic 3" 
%}

In this tutorial, we are going to see how you can create your own Barcode/QR code scanner app with Ionic 3, Ionic Native 3.x+ and Cordova. 

We are also going to learn how to encode your own barcodes from your data.

So let's get started.

## Create an Ionic 3 Project 

First start by generating a new project. You can also skip this to use an existing project:

    ionic start CodeScanner blank 

For more information see this tutorial about how to <a href="/ionic-3-create-first-project">create your first Ionic 3 project</a>     

Navigate into your project root directory: 

    cd CodeScanner 

Next, follow the steps to install both the Cordova plugin and Ionic Native 3.x+ wrapper for scanning barcodes. 

## Installing Cordova and Ionic Native 3.x+ Plugin for Barcode Scanning 

Start by installing the Cordova Barcode scanner plugin: 

    ionic cordova plugin add phonegap-plugin-barcodescanner

Next, install the Ionic Native wrapper for this plugin from `npm`: 

    npm install --save @ionic-native/barcode-scanner 

## Adding the Android platform     

Since we need to run this app in an actual device we need to add a target platform. In our case, we are adding 
Android but feel free to add iOS or Windows Phone platforms if you are targetting these platforms:

    ionic cordova platform add android 

You can now attach your mobile device using an USB cable then run your app to make sure everything is ok: 

    ionic run android -l 

We added the `-l` switch to enable live syncing of code when we change it so we don't have to run the command again.

Just continue building your app and watch the changes on your device.

## Configuring the Cordova Barcode Scanner 

We have added the barcode scanner plugin but before we can use it, we have to do a little bit of configuration.

So go ahead and open your project using your favorite cod editor. We are using Visual Code Studio: 

    code .

Open the `src/app/app.module.ts` file and import the barcode scanner and add it to the list of module providers: 

    /* ... */
    
    import { BarcodeScanner } from '@ionic-native/barcode-scanner';
    
    /* ... */

    providers: [
        StatusBar,
        SplashScreen,
        BarcodeScanner,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
    })
    export class AppModule {}


## Scanning barcodes 

Head over to the `src/pages/home/home.html` file and add a button for scanning barcodes: 

    <ion-header>

    <ion-navbar>
        <ion-title>Barcode/QR Scanner v1.0 </ion-title>
    </ion-navbar>

    </ion-header>


    <ion-content padding>
        <button ion-button (click)="scan()">Scan ... </button>
        <div *ngIf="scanData">
            <p>Scanned Text : {{scanData.text}}</p>
            <p>Scanned Format : {{scanData.format}}</p>
            
        </div>
    </ion-content>

Next open the `src/pages/home/home.ts` file and add an implementation for the `scan()` method which is bound to the **Scan** button. 

Start by importing `BarcodeScanner`: 

    import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

Next, inject `BarcodeScanner` via the component constructor: 

    @IonicPage()
    @Component({
    selector: 'home',
    templateUrl: 'home.html',
    })
    export class HomerPage {
    scanData : {};
    options :BarcodeScannerOptions;
    constructor(public navCtrl: NavController, public navParams: NavParams,private barcodeScanner: BarcodeScanner) {
    }    

    scan(){
        /* */
    }

Finally, add an implementation for the `scan()` method: 

    scan(){
        this.options = {
            prompt : "Scan your barcode "
        }
        this.barcodeScanner.scan(this.options).then((barcodeData) => {
        
            console.log(barcodeData);
            this.scanData = barcodeData;
        }, (err) => {
            console.log("Error occured : " + err);
        });         
    }    



You can also specify other options such as using the front device camera instead of the back camera etc. 

Check out all the available options on the plugin documentation in GitHub or its Ionic Native wrapper.

## Encoding your data as barcode 

You can encode your own data such as a text string, an email or a phone number to a barcode using the Barcode plugin so go ahead and add another button then bind its `click` event to the `encodeText()` method:

         <ion-input type="text" [(ngModel)]="encodeData" ></ion-input>   
         <button ion-button (click)="encodeText()">Encode Text</button>

Next in the `home.ts` file, add a `encodeData` string member variable for holding the result,then add a method to encode the text data: 

    @IonicPage()
    @Component({
    selector: 'home',
    templateUrl: 'home.html',
    })
    export class HomerPage {
    scanData : {};
    encodeData : string ;
    encodedData : {} ;
    options :BarcodeScannerOptions;
    constructor(public navCtrl: NavController, public navParams: NavParams,private barcodeScanner: BarcodeScanner) {
    }    

    scan(){
        /* */
    }    
    encodeText(){
        this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE,this.encodeData).then((encodedData) => {
        
            console.log(encodedData);
            this.encodedData = encodedData;

        }, (err) => {
            console.log("Error occured : " + err);
        });                 
    }


## Conclusion

Thanks to the Cordova Barcode Scanner plugin you can easily scan QR and barcode codes and also encode your own data (Text, email and phone numbers) in a barcode format.
