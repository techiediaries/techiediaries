---
layout: post
title: "Angular 9/8 (Reactive) Forms: How to Use FormBuilder,  FormGroup  and  FormControl  APIs by Example"
image: "images/content/angular.png"
excerpt: "In this tutorial, we'll learn to use Angular forms by creating a simple example using the reactive form approach. We'll see how to use Angular `FormBuilder,  FormGroup  and  FormControl APIs to easily build a form"
date: 2019-12-30 
tags : [angular, angular9] 
---


In this tutorial, we'll learn to use Angular forms by creating a simple example using the reactive form approach.

We'll see how to use Angular  `FormBuilder`,  `FormGroup`  and  `FormControl`  APIs to easily build a form.

> **Note**: For a more complete step by step example with validation, check out  [Build Login & Reactive Form Example with Validation](https://www.techiediaries.com/angular-tutorial-reactive-forms)

## Why Forms Are Used?

Forms are used in most web applications as they allow users to submit input when interacting with the application. Among countless use cases, they are useful for sign users in, searching for information and submitting feedback.

## Angular Template-Driven Forms vs Reactive Forms

Angular provides two approaches,  **template-driven forms**  and  **model-driven or reactive forms**, for working with forms:

-   The template driven approach makes use of built-in directives to build forms such as  `ngModel`,  `ngModelGroup`, and  `ngForm`  available from the  `FormsModule`  module.    
-   The model driven approach of creating forms in Angular makes use of  `FormControl`,  `FormGroup`  and  `FormBuilder`  available from the  `ReactiveFormsModule`  module.

These are the steps of this tutorial:

-  Prerequisites
-  Angular Forms, Step 1 — Installing Angular CLI 9 
-  Angular Forms, Step 2 — Initializing your Project 
-  Angular Forms, Step 3 — Adding a Reactive Form
-  Angular Forms, Step 3.1 — Importing the  `ReactiveFormsModule`  
-  Angular Forms, Step 3.2 — Importing  `FormControl`  and  `FormGroup`
-  Angular Forms, Step 3.3 — Creating  the  `FormGroup`
-  Angular Forms, Step 3.4 — Creating  the  HTML Form
-  Angular Forms, Step 4 — Using the  `FormBuilder`  Module
- Conclusion
    
## Prerequisites

This tutorial assumes you already have Node.js and npm installed on your machine.  

You also need to be familiar with TypeScript and the basics of Angular such as [components](https://www.techiediaries.com/angular-components/).

Let's see how to install Angular CLI.

##  Angular Forms, Step 1 — Installing Angular CLI 9 

In this step, we'll set up Angular CLI v9 in our development machine.

Angular CLI is built on top of Node.js so as mentionned before make sure you have it installed on your machine together with npm.
 
![Angular CLI and forms](https://www.techiediaries.com/ezoimgfmt/www.diigo.com/file/image/rscqpoqzoceeaeedqzdspasasb/Angular+CLI+8.jpg?ezimgfmt=rs:461x281/rscb1/ng:webp/ngcb1)

[Angular CLI](https://cli.angular.io/)  is the official tool for initializing and working with Angular projects. 

In your terminal or command prompt run the following command:

```bash
$ npm install -g @angular/cli
```

This will install **angular/cli v9.0.0-rc**  in our system.

That's it, you can now initialize your project using this tool.

## Angular Forms, Step 2 — Initializing your Project 

Go back to your terminal and run the following commands:

```bash
$ cd ~  
$ ng new angular-forms-example

```

The CLI will prompt you if **You would like to add Angular routing.**  You can type Yes if you need [routing in your example](https://www.techiediaries.com/angular-router/)  and  **which stylesheet format you would like to use.**  You can select  [**CSS**](https://www.techiediaries.com/css-tutorial/).

Angular CLI will prepare your project, next you can navigate to your project's folder and serve your app locally using a development server as follows

```bash
$ cd angular-forms-example
$ ng serve

```

Your web application will be available from the [http://localhost:4200/](http://localhost:4200/)  address.

Go to web browser and navigate to the `http://localhost:4200/`  address:

![](https://www.techiediaries.com/ezoimgfmt/paper-attachments.dropbox.com/s_F52E295BB9C92BEFE7506DFCE2086C2583C762072AFE2CA1A9CE9AD4DA9FF751_1567465432228_Angulardemo.png?ezimgfmt=rs:710x341/rscb1/ng:webp/ngcb1)


## Angular Forms, Step 3 — Adding a Reactive Form

In this step, we'll create an example HTML form. Next, we'll  create a form model in the application component using the  `FormGroup`  and  `FormControl`  APIs. Finally, we'll use the  `formGroup`,  `formControlName`  and  `formGroupName`  directives to bind our form model to our HTML form.

## Angular Forms, Step 3.1 — Importing the  `ReactiveFormsModule`  

Open the  `src/app/app.module.ts`  file and import the  `ReactiveFormsModule` as follows:

```ts
import { ReactiveFormsModule } from '@angular/forms';

imports: [
  ...   
  ReactiveFormsModule
],
```

## Angular Forms, Step 3.2 — Importing  `FormControl`  and  `FormGroup`

Next, let's import the  `FormControl`  and  `FormGroup`  classes in the  `src/app/app.component.ts`  file.

```ts
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
```


## Angular Forms, Step 3.3 — Creating  the  `FormGroup`

Next, let's create an  `exampleForm`  instance of  `FormGroup`  with two `firstName`  and  `lastName` form controls  as follows:

```ts
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  exampleForm = new FormGroup ({
    firstName: new FormControl(),
    lastName: new FormControl(),

  });
}
```

## Angular Forms, Step 3.4 — Creating  the  HTML Form

Next, we need to create an [HTML form](https://www.techiediaries.com/html-tutorial/) in the  `src/app/app.component.html`  file:

```html
<h1>Angular 9 Forms Example</h1>
<form [formGroup]="exampleForm">
  <div class="form-group">
    <label>First Name:</label>
      <input class="form-control" formControlName="firstName">
    <label>Last Name:</label>
          <input class="form-control" formControlName="lastName">
  </div>
</form>

```

We use the  `formGroup`  property in the  `<form>`  tag to bind the form with our  `exampleForm`  form group and we use the  `formControlName`  property to bind the  `<input>`  tags to individual form controls.

## Angular Forms, Step 4 — Using the  `FormBuilder`  Module

The  `FormBuilder` helps you create reqctive forms using a simple functional API.

Inside the  `src/app/ap.component.ts`  file import the  `FormBuilder`  class from the  `@angular/forms`  package as follows:

```ts
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

```

Next inject  `FormBuilder`  in the component constructor as  `formBuilder`  

```ts 

@Component({ selector: 'app-root', 
templateUrl: './app.component.html', 
styleUrls: ['./app.component.css'] }) 
export class AppComponent { 
title = 'app'; 
exampleForm = new FormGroup ({ firstName: new FormControl(), lastName: new FormControl()});
 
constructor(private formBuilder: FormBuilder) { } 
}

```

Next add a  `createForm()`  method with the following code:

```ts
createForm() {
    this.exampleForm = this.formBuilder.group({
      firstName: '',
      lastName: ''
    });
}

```

Finally call the method from the constructor:

```ts
  constructor(private formBuilder: FormBuilder) { 
      this.createForm();
  }

```

## Conclusion

In this tutorial, we've seen a simple example of creating a form model and bind it to the HTML  `<form>`  element using Angular  `FormBuilder`,  `FormGroup`  and  `FormControl`  APIs.

