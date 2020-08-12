---
layout: bpost
title: "Angular 10 Textarea Auto Size "
image: "images/content/angular.png"
excerpt: "In this tutorial, we'll learn how to auto size a textarea element in our Angular 10 app"
date: 2020-08-12
tags : [angular]
--- 

In this tutorial, we'll learn how to auto size a textarea element in our Angular 10 app.

As a prerequisite, you need to have Angular CLI v10 installed on your development machine.

You can also use the online Stackblitz IDE if you don't have a development environment ready yet.

## Step 1 — Initializing a New Angular 10 Project

Let's get started with a brand new project. Head over to a new command-line interface and run the following command to create a new project:

```bash
$ ng new Angular10TextareaAutosize 
```

The CLI will ask you a couple of questions — If  **Would you like to add Angular routing?**  Type  **y**  for Yes and  **Which stylesheet format would you like to use?**  Choose  **CSS**.

Next, go to you project’s folder and run the server using the following commands:

```bash
$ cd Angular10TextareaAutosize
$ ng serve    
```

Use your web browser and visit the  `http://localhost:4200/`  address to see your app running.  

Open your web browser and navigate to the  `http://localhost:4200/`  address to see your app running.  

## Step 1 — Installing `@techiediaries/ngx-textarea-autosize`

Next, open a new command-line interface and navigate to your project's folder then run the following command to install the  `@techiediaries/ngx-textarea-autosize`  library from npm using the following command:

```bash
$ npm install @techiediaries/ngx-textarea-autosize
```

Next, open the `src/app/app.module.ts` file and add `AutosizeModule` in the imports array as follows:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AutosizeModule} from '@techiediaries/ngx-textarea-autosize';

import { AppComponent } from './app.component';

@NgModule({
  imports:      [ BrowserModule, AutosizeModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```

Next, open the `src/app/app.component.html` file and update it as follows:

```html
<textarea autosize>
    This is an example of @techiediaries/ngx-textarea-autosize in Angular 10.
</textarea>
```

We simply add the `autosize` directive to the `textarea` element which will enable it to auto-grow in height as you type to fit the content.
