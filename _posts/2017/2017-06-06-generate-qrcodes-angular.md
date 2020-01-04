---
layout: post
title: "Create a QR Code Generator with Angular 4+ "
image: "images/content/generate-qrcodes-angular.png"
excerpt: "How To Generate QR Codes In Angular 4+ Applications " 
tags : [angular]
---

{% include image.html 
    img="images/content/generate-qrcodes-angular.png" 
    title="QR Code Generator with Angular 4" 
%}

Throughout this tutorial we are going to create a QR Code generator web application with Angular 4+ so lets 
get started .

You can also read the second part [How To Read QR Codes In Angular ?](/read-qrcodes-angular)

First ,lets start by creating an Angular 4 project using the Angular CLI .

Open your terminal or command prompt ,depending on your operating system ,then generate a new Angular 4
application by running :

    ng new qrcode-generator 

    Project 'qrcode-generator' successfully created.

After the command completion ,proceed by installing <em>ngx-qrcode2</em> from npm ,which is an Angular 4+ component library  
to generate QR Codes .

    cd qrcode-generator
    npm install ngx-qrcode2 --save 

Open your project with your favorite code editor .I'm using Visual Studio Code which has a nice TypeScript 
support .

    code .

Head over to <em>src/app/app.module.ts</em> .

Then import NgxQRCodeModule from <em>ngx-qrcode2</em> and add it to the list of module imports .


    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';

    import { AppComponent } from './app.component';
    import { NgxQRCodeModule } from 'ngx-qrcode2';

    @NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        NgxQRCodeModule
    ],
    providers: [],
    bootstrap: [AppComponent]
    })
    export class AppModule { }        

Once this is done you can use <em>ngx-qrcode</em> component to generate QR Codes .

Head over to <em>src/app/app.component.html</em> and add : 

    <ngx-qrcode [qrc-element-type]="elementType" [qrc-value] = "value">
    </ngx-qrcode>

Now you should add two variables value and elementType to your app component with some default values .

Head over to src/app/app.component.ts</em> .

    import { Component } from '@angular/core';

    @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
    })
    export class AppComponent {
    elementType : 'url' | 'canvas' | 'img' = 'url';
    value : string = 'Techiediaries';
    }

value is of type string .

elementType can take either url ,canvas or img .

That's it ,you can now run 

    ng serve 

To serve your app ,then visit <em>http://localhost:4200/</em> .

You should see a QR Code generated and rendered for the value "Techiediaries" .

Conclusion 
---------------
---------------

We have created an Angular 4 application which makes use of <em>ngx-qrcode2</em> component library to generate 
QR Codes .This is just a basic example demo but you can further develop it by binding the value variable 
to some textarea and add more features .      

