---
layout: bpost
title: "Embed and Display PDF Files in Angular 10"
image: "images/content/generate-qrcodes-angular.png"
excerpt: "How To Generate QR Codes In Angular 10 Applications"
date: 2020-08-08
tags : [angular]
---

In this tutorial, we'll learn how to embed and display PDF files in Angular by creating a simple example application using the latest Angular 10 version.

![Angular 10 View PDF Files](https://www.techiediaries.com/assets/angular-10-pdf.png)

First of all, what's a PDF file?


According to  [Wikipedia](https://en.wikipedia.org/wiki/PDF):

>The Portable Document Format (PDF) is a file format developed by Adobe in the 1990s to present documents, including text formatting and images, in a manner independent of application software, hardware, and operating systems. 
 

Now let's see how to view PDF files in your Angular 10 app by example.

We have two popular options for displaying PDF files in Angular:

- Using the built-in PDF viewer of your browser,
- The PDF viewer of Mozilla and Chrome named [pdf.js](https://mozilla.github.io/pdf.js/),
- Using an Angular library like `ng2-pdf-viewer` or `ngx-extended-pdf-viewer`.

For keeping things simple, we'll use  the `ng2-pdf-viewer` library in our example.

Before getting started you need a few prerequisites:

-   Basic knowledge of TypeScript. Particularly the familiarity with Object Oriented concepts such as TypeScript classes and decorators.
-   A local development machine with  **Node 10+**, together with  **NPM 6+**  installed. Node is required by the Angular CLI like the most frontend tools nowadays. You can simply go to the downloads page of  [the official website](https://nodejs.org/downloads)  and download the binaries for your operating system. You can also refer to your specific system instructions for how to install Node using a package manager. The recommended way though is using  [NVM](https://github.com/nvm-sh/nvm)  — Node Version Manager — a POSIX-compliant bash script to manage multiple active Node.js versions.

**Note**: If you don't want to install a local environment for Angular development but still want to try the code in this tutorial, you can use  [Stackblitz](https://stackblitz.com/), an online IDE for frontend development that you can use to create an Angular project compatible with Angular CLI.

## Step 1 — Installing Angular CLI 10

In this step, we'll install the latest Angular CLI 10 version (at the time of writing this tutorial).

[Angular CLI](https://cli.angular.io/)  is the official tool for initializing and working with Angular projects. To install it, open a new command-line interface and run the following command:

```bash
$ npm install -g @angular/cli
```

At the time of writing this tutorial,  **angular/cli v10**  will be installed on your system.

## Step 2 — Creating a New Angular 10 App

Let's now create our project. Head back to your command-line interface and run the following commands:

```bash
$ cd ~
$ ng new angular10pdf
```

The CLI will ask you a couple of questions — If  **Would you like to add Angular routing?**  Type  **y**  for Yes and  **Which stylesheet format would you like to use?**  Choose  **CSS**.

Next, navigate to you project’s folder and run the local development server using the following commands:

```bash
$ cd angular10pdf
$ ng serve    
```

Open your web browser and navigate to the  `http://localhost:4200/`  address to see your app running.  

Next, open a new terminal and make sure to navigate to your project's folder and run the following command to install the  `ng2-pdf-viewer`  library from npm using the following command:

```bash
$ npm install ng2-pdf-viewer
```

Next open the  `src/app/app.module.ts`  file, and import  `PdfViewerModule`  from  `ng2-pdf-viewer`  in your module as follows:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import  {  PdfViewerModule  }  from  'ng2-pdf-viewer';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

  
Once the library has been imported, you can use the  `ng2-pdf-viewer`  component in your Angular application.

> Please note that we have also imported  `FormsModule`.

Next, open the  `src/app/app.component.ts`  file and update it as follows:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
    pdfSource =  "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
}
```

Next, open the  `src/app/app.component.html`  file and add the following code:

```html
<h1> Angular 10 PDF Viewer</h1>

<div class="container">
  <pdf-viewer [src]="pdfSource"
              [original-size]="false"
  ></pdf-viewer>
</div>
```


Next, add a textarea for entering the value that you want to encode:

```html
<h1> Angular 10 PDF Viewer</h1>

<div class="container">
  <textarea [(ngModel)] = "pdfSource"></textarea>

  <pdf-viewer [src]="pdfSource"
              [original-size]="false"
  ></pdf-viewer>
</div>
```

Finally open the  `src/styles.css`  file and add the following styles:

```css
pdf-viewer {
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(5px 5px 5px #222222);
}

textarea {
    margin-top: 15px; 
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
}
```

That's it we have finished our Angular 10 example that show you how to view PDF files in your Angular apps. You can visit us on  **`Techiediaries`**  for tutorials about Angular and modern web development practices.

You can check out the application we've built in this article live on [https://stackblitz.com/edit/angular-10-pdf-viewer-example](https://stackblitz.com/edit/angular-10-pdf-viewer-example)

If you need a full-blown PDF viewer in your Angular 10 app you can use `ngx-extended-pdf-viewer` instead which comes with thumbnails, searching, printing, various selection tools, etc.

You first need to add the following  configuration object in the `angular.json` file:


```json
  "assets": [
    "src/favicon.ico",
    "src/assets",
    {
      "glob": "**/*",
      "input": "node_modules/ngx-extended-pdf-viewer/assets/",
      "output": "/assets/"
    }
  ],
  "scripts": []
```

After updating the `angular.json` file, you need to run the `npm install ngx-extended-pdf-viewer --save` command, add the `NgxExtendedPdfViewerModule` to the `imports` array of your module file, and embed the viewer tag as follows:

```html
<ngx-extended-pdf-viewer
     src="URL.pdf"
     useBrowserLocale="true">
</ngx-extended-pdf-viewer>
```

## Conclusion

We've seen by example how to embed and display PDF files in your Angular 10 app.

