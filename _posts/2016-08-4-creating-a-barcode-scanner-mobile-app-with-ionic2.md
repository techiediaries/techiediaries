---
layout: post
title: Creating a Barcode Scanner Mobile App with Ionic 2 
categories: building-hybride-mobile-apps-with-ionic1-and-ionic2-tutorials
tags : ionic
---


In this tutorial i'm going to show you how to use a barcode scanner in your mobile app with Ionic 2 framework while creating a simple mobile app .


<a data-pin-do="embedPin" data-pin-width="large" data-pin-terse="true" href="http://www.pinterest.com/pin/427490189612262049/"></a>


Please note that Ionic 2 is still in beta so make sure that the code we are writing here and the CLI commands we are using are still valid.You can check the Ionic 2 docs from [here](http://ionicframework.com/docs/v2/getting-started/installation/).

You can always check the code and follow along or just use it directly in your mobile app if you can undersand it by yourself .the whole app is available from [GitHub](https://github.com/ahnerd/ionic2-barcode-scanner)

First things first.Lets start by installing the Ionic 2 CLI by issuing these commands from your terminal

	$ sudo npm install -g cordova
	$ sudo npm install -g ionic@beta

We have installed Cordova first then Ionic CLI .If you don't know what Cordova is ,It is simply a native web wrapper which's used by Ionic to wrap your web app as a native mobile app.   
When npm finishes its work .You'll have both versions of Ionic(1 et 2 beta) installed.To scaffold a project based on Ionic 2 we have to specify which version we need with 

	$ ionic start ionic2-barcode-scanner blank --v2

You'll have a project scaffolded for you, based on Ionic 2 and TypeScript .Yes as you heard it Ionic 2 now has only support for TypeScript.Now everyone should learn TypeScript to build apps with Ionic 2.

	
After generating our project structure and basic code the next step is to add the platform(s) we are targetting .Since i'm on Ubuntu system i can only target Android .If you are using a MAC you can add iOS platform too.

	$ cd ionic2-barcode-scanner
	$ ionic platform add ios
	$ ionic platform add android

Now to be able to use a barcode scanner we need to add a phonegap plugin phonegap-plugin-barcodescanner 

	$ ionic plugin add phonegap-plugin-barcodescanner

Now lets edit our app files to add barcode scanning functionality .We have already a home.ts generated for us by Ionic 2 CLI,we don't need to add any more files just open home.ts and add code for  scanning functionality.


	import {Component} from '@angular/core';
	import {NavController} from 'ionic-angular';
	import {Platform} from 'ionic-angular';
	import {BarcodeScanner} from 'ionic-native';

	@Component({
	  templateUrl: 'build/pages/home/home.html'
	})
	export class HomePage {
	   private barcodeText:String;
	   private barcodeFormat:String;
	   private platform:Platform;	
	   private navController:NavController;
	  constructor(public navCtrl: NavController,platform:Platform) {
	  		this.platform = platform;
	        this.navController = navCtrl;
	  }
	  doScan(){
	  		console.log('scannig product barcode');
	        this.platform.ready().then(() => {
	            BarcodeScanner.scan().then((result) => {
	                if (!result.cancelled) {
						this.barcodeText = result.text;
						this.barcodeFormat = result.format;
					}
	            }, (error) => {
	            	console.log('error when scanning product barcode');
	                
	            });
	        });  		
	  }
	 }

Next open home.html and add the following code

	<ion-header>
	  <ion-navbar>
	    <ion-title>
	      Ionic 2 Barcode Scanner
	    </ion-title>
	  </ion-navbar>
	</ion-header>

	<ion-content padding>
		<h1>Ionic 2 Barcode Scanner </h1>
		<p> Put your phone camera in front of a product with a barcode and hit Scan</p>
		<button block (click)="doScan()">Scan</button>
	</ion-content>

Adding a page for user feedback
-----------------------------------

Now we need to create another page to give our app users some feedback when their product's barcode scanning is done without errors so go ahead and generate a new page using the Ionic CLI
	
	$ ionic generate page ScannedPage

Now open scanned-page.ts and add the following code

	import { Component } from '@angular/core';
	import { NavController,NavParams } from 'ionic-angular';

	@Component({
	  templateUrl: 'build/pages/scanned-page/scanned-page.html',
	})
	export class ScannedPage {
		private bcData;
	  constructor(private navCtrl: NavController,navParams: NavParams) {
	  		this.bcData = navParams.get('data');

	  }

	}

Next open scanned-page.html and add the code to display barcode info


	<ion-header>

	  <ion-navbar>
	    <ion-title>ScannedPage</ion-title>
	  </ion-navbar>

	</ion-header>


	<ion-content padding>

		You've scanned your product's code with success
		<p> {{ bcData.text }}</p>
		<p> {{ bcData.format }} </p>

	</ion-content>


Now open home.ts and add code to navigate to ScannedPage when scanning is finished


First add this method

	  scanningDone(data){
	  		this.navController.push(ScannedPage, {data: data});
	  }


Then call it when scanning is done


        this.platform.ready().then(() => {
            BarcodeScanner.scan().then((result) => {
                if (!result.cancelled) {
					this.barcodeText = result.text;
					this.barcodeFormat = result.format;
					this.scanningDone({'text':result.text,'format':result.format});
				}
            }, (error) => {
            	console.log('error when scanning product barcode');
            });
        });  


Deploying our app to a device
----------------------------------

Since we are using native device functionality we need to test our app with an actual mobile device .It's easily done with Ionic CLI but first you need to plug in your mobile device via an USB cable .
	
	$ ionic platform android run


References
---------------
[Ionic 2 Docs](http://ionicframework.com/docs/v2)

