---
layout: post
title: "How To Read QR Codes In Angular ? "
image: "images/content/read-qrcodes-angular.png"
excerpt: "Reading QR Codes in Angular 4+" 
tags : [angular]
---

{% include image.html 
    img="images/content/read-qrcodes-angular.png" 
    title="Read QR Codes In Angular" 
%}

In a [previous tutorial](/generate-qrcodes-angular) we covered how to generate QR Codes in Angular applications .In this tutorial we 
ae going to see how we can read them by building a simple [Angular 4 demo application](/demos/ng2-qrcode-reader) which you can find from the link .

Now lets get started by generating a new Angular application using the Angular CLI new command .

Open your terminal or command prompt ,depending on your operating system,then run :

    ng new qrcode-reader 

Next navigate inside the root directory of your project :

    cd qrcode-reader 

We'll be using An Angular component from npm for reading QR Codes so lets first install it .

    npm install ng2-qrcode-reader --save

Head over to your project <em>app/app.module.ts</em> then import <em>NgQRCodeReaderModule</em>        
    
    import { NgModule } from '@angular/core';
    import { FormsModule } from '@angular/forms';
    import { MaterialModule } from '@angular/material';
    import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
    import { FlexLayoutModule } from '@angular/flex-layout';

    import { AppComponent } from './app.component';
    import { NgQRCodeReaderModule } from 'ng2-qrcode-reader';

Then add it imports 


    @NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        NgQRCodeReaderModule,
        MaterialModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
    })
    export class AppModule { }

Now you can use ng2-qrcode-reader component to read QR Codes via URLs ,DATA URLs or Canvas .

Open <em>app/app.component.ts</em> then copy and paste :

    import { Component , ElementRef ,ViewChild ,Renderer2} from '@angular/core';

    @Component({
    selector: 'app-root',
    template: `
    <div fxLayout="column" fxFlexAlign="center">
        <div  fxFlex="20" fxFill>
        <md-input-container fxFill><textarea fxFill mdInput placeholder="qrr-value (URL or DATA URL)" [(ngModel)]="value"></textarea></md-input-container>
        <br/>
        
        </div>
        <div  fxFlex="60" fxFill>
        <ng2-qrcode-reader (result)="render($event)" [qrr-show]="showQRCode" [qrr-value]="value" [qrr-type]="elementType"></ng2-qrcode-reader>
        </div>
        <p>Result</p>
        <div #result  fxFlex="20" fxFill>
        </div>
        </div>

    `,
    styles: []
    })
    export class AppComponent {
    elementType = 'url';
    value = 'https://assets.econsultancy.com/images/resized/0002/4236/qr_code-blog-third.png';
    @ViewChild('result') resultElement: ElementRef;
    showQRCode : boolean = true;
    constructor(private renderer: Renderer2) { 
            
    }   
    render(e){
        console.log(e.result);
        let element :Element = this.renderer.createElement('p');
        element.innerHTML = e.result;
        this.renderElement(element);    
    }

    renderElement(element){
        for (let node of this.resultElement.nativeElement.childNodes) {
                this.renderer.removeChild(this.resultElement.nativeElement, node);
        }            
        this.renderer.appendChild(this.resultElement.nativeElement, element);
    }  

    }

So to get the result of our QR Code reading we need to bind a method to result custom component event .

Conclusion
---------------
---------------

We have seen how we can easilly read QR Codes in Angular 4+ .

You can also read this tutorial : [Create a QR Code Generator with Angular 4+](/generate-qrcodes-angular)

