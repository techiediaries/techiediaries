---
layout: post
title: "NativeScript 3 : Create a Barcode/QR/UPC Code Scanner [Angular]"
image: "images/content/nativescript-barcode-qr-code-scanner-angular.png"
excerpt: "NativeScript tutorial showing you how to create a Barcode /QR Code Scanner" 
tags : [nativescript,android,ios]
---

{% include image.html 
    img="images/content/nativescript-barcode-qr-code-scanner-angular.png" 
    title="NativeScript 3 Barcode/QR code Scanner" 
%}

In this tutorial ,we are going to cover how to create a NativeScript mobile application for both Android 
and iOS for scanning barcodes with different formats (Barcode ,QR Code ,UPC Code etc.) 

A Barcode helps you encode information about a product while a Barcode scanner scans and decode the information 
associated with some types of barcodes .

This tutorial assumes you already have installed and configured your development environment to work with 
NativeScript 3 framework .

So lets get started 

Head over to your terminal on MAC/Linux or prompt on Windows and run the following command to generate 
a new NativeScript 3 (Angular 4 ) project .

    tns create BarcodeScannerDemo --ng

So thanks to --ng switch our project will be using a TypeScript/Angular rather than just TypeScript or 
plain JavaScript which are also supported by NativeScript .

Next we need to add the plugin which provides barcode scanning capabilities to our project so go ahead and 
run :

    tns plugin add nativescript-barcodescanner

We have added a NativeScript plugin created by Eddy Verbruggen .You can also create your own barcode scanner 
plugin or add native (Java and Swift ) code for barcode scanning support directly in your NativeScript project 
but since this this task may be intimidating to most developers it's easier to just use a ready plugin which is 
the approach we are taking in this tutorial .

Now open your project in a code editor or IDE .I'm using Visual Code Studio .

    cd BarcodeScannerDemo
    code .

Then open your Angular project <em>app/app.module.ts </em> and register the BarcodeScanner provider with main 
module :

    
    import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
    import { NativeScriptModule } from "nativescript-angular/nativescript.module";
    import { BarcodeScanner } from 'nativescript-barcodescanner';
    
    import { AppComponent } from "./app.component";

    @NgModule({
        declarations: [AppComponent],
        bootstrap: [AppComponent],
        imports: [NativeScriptModule],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [BarcodeScanner]        
    })
    export class AppModule { }

After importing and providing BarcodeScanner you can inject it in any component to get an instance that 
you can use to work with the Barcode Scanner plugin :

For example open <em>app/app.component.ts</em>

    import { Component } from "@angular/core";
    import { BarcodeScanner } from 'nativescript-barcodescanner';

    @Component({
        selector: "my-app",
        templateUrl: "app.component.html",
    })
    export class AppComponent {
        constructor(private barcodeScanner: BarcodeScanner){
            
        }
            
    }


Next add a method onScan which makes use of this.barcodeScanner instance to invoke the scanner 

    public onScan() {
        this.barcodeScanner.scan({
            formats: "QR_CODE, EAN_13",
            showFlipCameraButton: true,   
            preferFrontCamera: false,     
            showTorchButton: true,        
            beepOnScan: true,             
            torchOn: false,               
            resultDisplayDuration: 500,   
            orientation: orientation,     
            openSettingsIfPermissionWasPreviouslyDenied: true //ios only 
        }).then((result) => {
            alert({
                title: "You Scanned ",
                message: "Format: " + result.format + ",\nContent: " + result.text,
                okButtonText: "OK"
            });
            }, (errorMessage) => {
                console.log("Error when scanning " + errorMessage);
            }
        );
    }

 Lets add a button to invoke the scan method .Go ahead and open <em>app/app.component.html</em> then add 
 a button and set the click/tap handler to onScan() method :

    <StackLayout class="p-20">

        <Label text="barcode Scanner" class="h1 text-center"></Label>
        <Button text="SCAN" (tap)="onScan()" class="btn btn-primary btn-active"></Button>
        
    </StackLayout>

You should be able to run and test your app on a device or emulator :

    tns run android 

For iOS run :

    tns run ios 

You can find more information about this plugin at Eddy Verbruggen <a href="https://github.com/EddyVerbruggen/nativescript-barcodescanner" target="_blank">GitHub repository</a>

Conclusion
--------------
--------------

We covered how to use a NativeScript plugin to add barcode scanning support to our Android or iOS mobile 
application .

If you have any problems or questions feel free to drop a comment below .

Thanks for reading and see on the next tutorial .
        