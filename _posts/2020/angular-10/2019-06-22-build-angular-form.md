---
layout: post
title: "Build an Example Angular 10 Form: ngForm/ngModel vs FormGroup/FormBuilder"
image: "images/content/angular.png"
excerpt: "In this tutorial, we'll learn how to build and work with forms in Angular 10 by creating a simple contact form example" 
date: 2020-05-04
tags : [angular, angular-10 ] 
---

In this tutorial, we'll learn how to build and work with forms in Angular 10 by creating a simple contact form example. 

We'll see how to use `ngForm`, `ngSubmit` and `ngModel` directives to build a template-based form, and `FormGroup` and `FormBuilder` APIs to build a reactive form.

We'll be using the online IDE from [https://stackblitz.com/](https://stackblitz.com/).

Angular 10 and previous versions provide two methodologies for working with forms:

- The template based method,
- The reactive (or model based) method which makes use of Reactvity and RxJS behind the scenes. 

For small projects, there is no better approach, just choose the one most convenient to you!

For bigger projects, it's recommended to use reactive forms as they scale better. Check out this [in-depth article](https://blog.angular-university.io/introduction-to-angular-2-forms-template-driven-vs-model-driven/) for more information.

## Create an Angular 10 App

You can register for an account using your GitHub account and **START A NEW APP** based on Angular from ready templates. Your Angular project will be based on the latest Angular 10 version.

## Building an Angular 10 Template-Based Form 

Now, let's start with the template based approach by building an example Angular 10 form. Let's do some configurations. 

### Importing the Angular' `FormsModule`

Open the `src/app/app.module.ts` file and import the `FormsModule` then we add it to the `imports` array:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
``` 

> **Note**: If you are using Stackblitz,  `FormsModule` is already imported in the project. 
 
That's all what you need to add in order to be able to work with template-based forms.

## Adding Angular' `ngForm`, `ngSubmit` and `ngModel` Directives to your Form
 
Next, open the `src/app/app.component.html` file and add the following content:

```html
<h1> Template-Based Contact Form Example </h1>

<form #myform = "ngForm" (ngSubmit) = "onSubmit(myform)" >
  <input type = "text" name = "fullName" placeholder = "Your full name" ngModel>
  <br/>
  
  <input type = "email" name = "email" placeholder = "Your email" ngModel>
  <br/>
  
  <textarea name = "message" placeholder = "Your message" ngModel></textarea>
  <br/>
  <input type = "submit" value = "Send">
</form>
```

We can create our form completly in our Angular template. We first add a template reference variable to the form and assign the `ngForm` key to it using the  `#myform = "ngForm"` syntax. This will allow us to access the form via the `myform` reference.  

> **Note**: The `#myform = "ngForm"`  syntax doesn't create a template based form but only a local templae variable that will allow us to work with the form object. In fact, the form was automatically created when you imported `FormsModule` in your project .

Next, we bind the  `ngSubmit` event to the `onSubmit()` method (Which we'll add to our component next) and we pass in the form object (via the local template variable)

Next,  we register the child controls with the form. We simply add the [NgModel](https://angular.io/api/forms/NgModel) directive and a `name` attribute to each element.


According to the [docs](https://angular.io/api/forms/NgForm#description):

> `NgForm` creates a top-level [FormGroup](https://angular.io/api/forms/FormGroup) instance and binds it to a form to track aggregate form value and validation status. This is done automatically when `FormsModule` is imported.

## Submitting the Angular 10 Template Form

Next, add the `onSubmit()` method to the component. Open the `src/app/app.component.ts` file and add the following code:

```ts
import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  
  onSubmit(form: NgForm) {
      console.log('Your form data : ', form.value);
  }
}
```

We passed in the reference to the `NgForm` object that represents our form to the `onSubmit()` method and we can use it to access various properties like `value` which provides a plain JS object that contains the attributes of the [form and its data](https://www.techiediaries.com/angular-formdata/). In this example, we simply print the form value in the console but in a real world situation, we can use it to send the data to a server via a POST request.

You can see all the available methods of `NgForm` from the [docs](https://angular.io/api/forms/NgForm#methods). 

After, adding some CSS styles from this [pen](https://codepen.io/britscalessmc/pen/BzOzyy), this is a screenshot of our form UI:

![Angular 10 Form Example](https://www.diigo.com/file/image/badcbccczobcobeqbozdrprpsad/angular-e744ru+-+StackBlitz.jpg)
 
 This is the live project:

 <iframe src="https://stackblitz.com/edit/angular-8-template-form?embed=1&file=src/app/app.component.ts" title="Angular 8 Form Example" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
 
## Building an Angular 10 Reactive Form

After building our Angular contact form with the template-based approach, let's now see how we can build the same example with the reactive based approach.

Open the `src/app/app.module.ts` file and import  `FormsModule` and  `ReactiveFormsModule`: 

```ts
import  {  FormsModule,  ReactiveFormsModule  }  from  '@angular/forms';
```

Next, add them to the `imports` array of the app module:

```ts
// [...]

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```

## Importing the Angular' `FormGroup` and `FormBuilder` APIs

Next, open the `src/app/app.component.ts` file and import `FormGroup` and `FormBuilder`:

```ts
import { FormGroup, FormBuilder } from  '@angular/forms';
```

## Creating a Form Group and Injecting Angular' `FormBuilder`

Next, define the `contactForm` variable which will be used to hold our form object (instance of `FormGroup`) and inject `FormBuilder` via the component constructor:

```ts
export class AppComponent  {
  
  contactForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
  }
}
```

## Building the Form with Angular' `FormBuilder`

Next, define a `createContactForm()` method where we'll build our form:

```ts
  createContactForm(){
    this.contactForm = this.formBuilder.group({
      fullName: [''],  
      email: [''],
      message: ['']
    });
  }
```

We call the `group()` method of the injected instance of `FormBuilder` to create a `FormGroup` of three controls, `fullName`, `email` and `message`. Each control can take an optional array of options and validation rules.

Next, we call the method on the constructor:

```ts
constructor(private formBuilder:  FormBuilder)  {
   this.createContactForm();
}
```

## Submitting the Angular 10 Reactive Form

Finally, add the following method which will be called when we submit our form:

```ts
  onSubmit() {
      console.log('Your form data : ', this.contactForm.value );
  }
```

Now, we need to bind this form object to our HTML form. Open the `src/app/app.component.html` file and add the following code:  
 
```html
<h1> Reactive Contact Form Example </h1>

<form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
  <input type = "text" name = "fullName" placeholder = "Your full name" formControlName="fullName" >
  <br/>
  
  <input type = "email" name = "email" placeholder = "Your email" formControlName="email" >
  <br/>
  
  <textarea name = "message" placeholder = "Your message" formControlName="message" ></textarea>
  <br/>
  <input type = "submit" value = "Send">
</form> 
```

We use property binding to bind the form using the [formGroup](https://angular.io/api/forms/FormGroup) property. Next, we use `formControlName` to sync the `FormControl` objects in `contactForm` with the HTML form controls by name. See the [docs](https://angular.io/api/forms/FormControlName#description) for more details. Finally, we bind the `ngSubmit` event of the form to the `onSubmit()` method.

Here is the live example:

 <iframe src="https://stackblitz.com/edit/angular-8-reactive-form?embed=1&file=src/app/app.component.ts" title="Angular 8 Form Example" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>


## Conclusion

In this tutorial, we've built an example contact form in Angular 10 using the template based approach and the reactive (model based) approach. We have seen how to use ngForm, ngSubmit and ngModel directives to build a template-based form, and FormGroup and FormBuilder APIs to build a reactive form.   

