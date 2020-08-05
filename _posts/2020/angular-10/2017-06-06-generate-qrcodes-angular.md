---
layout: post
title: "Create a QR Code Generator with Angular 10/9"
image: "images/content/generate-qrcodes-angular.png"
excerpt: "How To Generate QR Codes In Angular 10 Applications"
date: 2020-08-05 
tags : [angular]
---

Throughout this tutorial we are going to create a QR Code generator web application with Angular 10 so let's get started.

You can also read the second part [How To Read QR Codes In Angular ?](https://www.techiediaries.com/read-qrcodes-angular/)

First, let's start by creating an Angular 10 project using the Angular CLI.

Open your terminal or command prompt, depending on your operating system then generate a new Angular 10 project by running the following command:

    ng new qrcode-generator 

    Project 'qrcode-generator' successfully created.

After the command completion, proceed by installing <em>ngx-qrcode2</em> from npm, which is an Angular 4+ component library to generate QR Codes.

    cd qrcode-generator
    npm install ngx-qrcode2 --save 

Open your project with your favorite code editor. I'm using Visual Studio Code which has a nice TypeScript support:

    code .

Head over to the `src/app/app.module.ts` file and import `NgxQRCodeModule` from `ngx-qrcode2` and add it to the list of module imports:


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

Once this is done you can use `ngx-qrcode` component to generate QR Codes. Head over to the `src/app/app.component.html` file and add: 

    <ngx-qrcode [qrc-element-type]="elementType" [qrc-value] = "value">
    </ngx-qrcode>

Now you should add two variables value and elementType to your app component with some default values. Head over to the `src/app/app.component.ts` file and update it as follows:

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

- value is of type string.
- elementType can take either url, canvas or img.

That's it, you can now run the following command:

    ng serve 

To serve your app and visit `http://localhost:4200/`. You should see a QR Code generated and rendered for the value "Techiediaries".

## Conclusion 

We have created an Angular 10 application which makes use of `ngx-qrcode2` component library to generate QR Codes. This is just a basic example demo but you can further develop it by binding the value variable 
to some textarea and add more features.      

