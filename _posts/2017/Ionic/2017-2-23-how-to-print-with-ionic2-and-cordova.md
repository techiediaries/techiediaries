---
layout: bpost
title: "Printing with Ionic 5, Ionic Native 5 and Cordova"
image: "images/content/ionic2-print.png"
excerpt: "How to print to PDF or paper in Ionic 2 apps using Ionic Native and Cordova"
categories : mobiledev
date: 2020-05-03
tags : [ionic2 , cordova , ionic  ]
---

{% include image.html 
    img="images/content/ionic2-print.png" 
    title="Ionic 2 print" 
%}

Throughout this tutorial we are going to learn how to use printing in Ionic 5 apps based on Angular using Ionic Native and Cordova.

If you need to build a mobile app for Android or iOS that needs to print data to PDF or papers using the Ionic framework v5 then lucky for you printing to either of these mobile platforms is a matter of using a 
[Cordova plugin for printing](https://github.com/katzer/cordova-plugin-printer)

Ionic 5 uses Ionic Native 5 to wrap Cordova plugins so in this tutorial we are going to see an example project that shows you how to implement printing functionality to either print to PDF file or paper.

You need to know that printing is only available for Android 4.4.4 or above.

Make sure you have configured the settings to use the printer on both Android and iOS devices.


## Create an Ionic 5 Project and Add an Android Platform

Next open up your terminal under Linux/MAC systems or the command prompt under Windows and generate a new Ionic 5 project:

    ionic start ionic-printing-example blank --type=angular
    cd ionic-printing-example
    ionic platform add android

If you are developing your app under a MAC OS you can target iOS too using the following command:

    ionic platform add iOS

## Adding the Cordova Printing Plugin 

Now we need to add the Cordova plugin for printing so go ahead and run the following command:

    cordova plugin add https://github.com/katzer/cordova-plugin-printer.git

## Using the Printing Plugin with Ionic 5

Next use your favorite code editor to open the `src/pages/home.ts` and then add the following code to test printing:

    import { Component } from '@angular/core';

    import { NavController } from 'ionic-angular';

    import {Printer, PrintOptions} from 'ionic-native';

    @Component({
    selector: 'page-home',
    templateUrl: 'home.html'
    })
    export class HomePage {

    constructor(public navCtrl: NavController) {

    }
    print(){
        
            Printer.isAvailable().then(function(){
                Printer.print("https://www.techiediaries.com").then(function(){
                alert("printing done successfully !");
                },function(){
                alert("Error while printing !");
                });
            }, function(){
            alert('Error : printing is unavailable on your device ');
            });

    }

    }

Next, add a button to print in your `home.html` template 

       <button class="button" (click)="print()">Print</button>

Make sure you have plugged you real mobile device using an USB cable then build and run your app for Android using the following command:

    ionic run android 


## Conclusion

This is the end of this tutorial, we have seen how to use the Cordova Printing plugin with Ionic 5, and Ionic Native. For more information about the printing plugin visit its [GitHub repo](https://github.com/katzer/cordova-plugin-printer). You can also visit the Ionic Native documentation [here](https://ionicframework.com/docs/v2/native/printer/).

You can find this project in [GitHub](https://github.com/techiediaries/ionic2-printing-example).




