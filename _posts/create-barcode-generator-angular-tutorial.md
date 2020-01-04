---
layout: post
title: "Create a 1-D Barcode Generator with Angular 4 and Lindell's JsBarcode"
image: "images/content/create-barcode-generator-angular-tutorial.png"
excerpt: "Create a 1-D Barcode Generator with Angular 4 (Or Angular 2) and Lindell's JsBarcode library" 
tags : [angular]
---

{% include image.html 
    img="images/content/create-barcode-generator-angular.png" 
    title="Barcode Generator with Angular 4" 
%}

In this tutorial ,we are going to create a barcodes generator application with Angular 4 using Lindell's 
JsBarcode library .

First ,we start by generating a new Angular 4 project using the Angular CLI so head over to your terminal on Unix 
like systems or command prompt on Windows then run :

    $ ng new BarcodesGenerator 

After successfully generated the project ,navigate inside your project root directory 

    $ cd BarcodesGenerator 

Then install ngx-barcode via npm 

    $ npm install ngx-barcode --save    

ngx-barcode is an angular 4+ component for creating 1-D barcodes based on Lindell's JsBarcode .




