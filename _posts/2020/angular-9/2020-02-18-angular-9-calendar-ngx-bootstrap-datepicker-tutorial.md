---
layout: post
title: "Create Angular 9 Calendar with ngx-bootstrap datepicker Example and Tutorial"
image: "images/content/angular.png"
excerpt: "In this tutorial, we'll see how to create an Angular 9 calendar UI with the datepicker component available from ngx-bootstrap" 
categories: angular
tags : [angular, angular-9] 
---

In this tutorial, we'll see how to create an Angular 9 calendar UI with the datepicker component available from `ngx-bootstrap`. 

We'll learn to build a calendar component using bootstrap and `ngx-bootstrap` datepicker component.

Date pickers are commonly used in web apps for choosing dates. 

Dates can be selected by navigating between various dates using UI.

The `ngx-bootstrap` library provides a datepicker component with many configuration options that you can use to customize the calendar view in your Angular 9 web app.

Throughout this tutorial, we will learn with steps to build a calendar component.


## Initializing an Angular 9 Calendar App with Angular CLI


Let's start bu initilizing a new Angular 9 app for our calendar example using Angular CLI.

We need to have the following prerequisites:

- Node.js and NPM installed on your development machine,
- Angular CLI v9 installed on your machine.

## Generating your Angular 9 Project


Open a new command-line interface and run the following command:

```bash
ng new angular-9-calendar-example
```

Navigate to your project's folder using:

```bash
cd angular-9-calendar-example
```


## Adding Bootstrap to Angular 9

Next, we need to integrate bootstrap and ngx-bootstrap with your Angular 9 project. 

First, run the following command to install bootstrap 4 from npm:

```bash
npm install bootstrap --save
```

Next, install the `ngx-bootstrap` package:

```bash
npm install ngx-bootstrap --save
```

## Importing and Configuring the Datepicker Component

Open the `angular.json` file and add the following styling:

```json
"styles": [
     "node_modules/bootstrap/dist/css/bootstrap.min.css",
     "node_modules/ngx-bootstrap/datepicker/bs-datepicker.css",
     "src/styles.css"
]
```

Next, we need to import the date picker component. Open  `src/app/app.module.ts` file and update it as follows:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
```

## Adding a Calendar UI in your Angular 9 Template

Next, let's add a calendar component. Open the `src/app/app.component.html` file and add the following HTML code:

```markup
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <input type="text"
            placeholder="Choose date"
            class="form-control"
            bsDatepicker>
    </div>
    
    <div class="col-xs-12">
      <input
        type="text"
        placeholder="Choose date"
        class="form-control"
        bsDatepicker
        bsDaterangepicker
        [bsConfig]="{ isAnimated: true }">
    </div>
  </div>
</div>
```

That's it, save your file and run the following command in your terminal:

```bash
ng serve
```

## Conclusion

In this tutorial, we have a simple example of a calendar with the datepicker component of `ngx-bootstrap`.