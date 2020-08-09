---
layout: bpost
title: "Angular 10 Markdown Custom Pipe"
image: "images/content/angular.png"
excerpt: "In this tutorial, we'll create a custom Angular pipe for parsing Markdown into HTML. We'll use the latest Angular 10 version but the steps are also valid for the previous versions of the framework"
date: 2020-08-09
tags : [angular]
---

In this tutorial, we'll create a custom Angular pipe for parsing Markdown into HTML. We'll use the latest Angular 10 version but the steps are also valid for the previous versions of the framework.

You need to have Angular CLI v10 installed on your development machine before you can proceed with this tutorial's steps.

## Step 1 — Creating a New Angular 10 Project

If you don't have a project yet, you need to run the following command to create a new project:

```bash
$ ng new Angular10MarkdownPipe 
```

The CLI will ask you a couple of questions — If  **Would you like to add Angular routing?**  Type  **y**  for Yes and  **Which stylesheet format would you like to use?**  Choose  **CSS**.

Next, navigate to you project’s folder and run the server using the following commands:

```bash
$ cd Angular10MarkdownPipe
$ ng serve    
```

Open your web browser and navigate to the  `http://localhost:4200/`  address to see your app running.  



## Step 2 — Installing  the `marked`  Markdown Parser

Next, you need to install the `marked`  Markdown parser that will be used for actually parsing the Markdown content: 

```bash
$ cd Angular10MarkdownPipe
$ npm install marked
```


## Step 3 — Creating a New Custom Pipe 

Next, you need to create a new custom Angular pipe using Angular CLI as follows:

```bash
$ ng generate pipe markdown
```

This will create a new pipe called `markdown` and import it in your  `src/app/app.module.ts`  file:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { MarkdownPipe } from "../markdown.pipe";

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, MarkdownPipe ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```

Next, open the `src/app/markdown.pipe.ts` file and update it as follows:

 
```ts
import { Pipe, PipeTransform } from '@angular/core';
import * as marked from "marked";

@Pipe({
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value && value.length > 0) {
      return marked(value);
    }
    return value;
  }

}
```

We import  `marked`, and update the  `transform()`  method to parse and return HTML. 

Next, open the `src/app/app.component.ts` file and add the following variables:

```ts
import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;
  
  public title: string = '*Angular 10 Markdown Pipe*';
  public content: string = '**Markdown** is cool!';

}
```

Next, open the `src/app/app.component.html` file and update it as follows:

```html
<h1 [innerHTML]="title | markdown"></h1>
<div [innerHTML]="content | markdown"></div>
```

We use the `innerHTML` attribute to render the HTML code resulted from converting the Markdown content in the two component variables. 

## Conclusion

In this tutorial, we've seen by example how to create a custom pipe in Angular 10 to parse Markdown into HTML.
