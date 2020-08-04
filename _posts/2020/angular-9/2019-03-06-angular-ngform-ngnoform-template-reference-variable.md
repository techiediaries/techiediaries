---
layout: post
title: "Angular 10/9 ngForm, ngNoForm and Template Reference Variables"
image: "images/content/angular-by-example-httpclient-get.png"
excerpt: "In this quick tutorial, you'll learn how to use NgForm in Angular 10/8 to work with forms. You'll also learn about template reference variables and how you can use them to reference DOM elements or Angular built-in directives (such as ngForm) in your templates"
date: 2020-08-04 
tags : [angular, angular-10 ] 
---

In this quick tutorial, you'll learn how to use NgForm in Angular 10/9 to work with forms. You'll also learn about template reference variables and how you can use them to reference DOM elements or Angular 10 built-in directives (such as `ngForm`) in your templates.

## What is Angular NgForm

So, what is [Angular NgForm](https://angular.io/api/forms/NgForm)?

It's simply a directive exported from `FormsModule` which gets automatically added to all `<form>` tags in your Angular templates once you import the module.  

Behind the curtains, the `ngForm` directive creates a top-level `FormGroup` instance and binds it to your `<form>` tag to enable you to work with the form. For example to access the aggregate form value or check validation status.

## How to Access Angular NgForm Using Template Reference Variables

Since the `ngForm` directive is implicitly added in your `<form>` tag when you import its parent module (`FormsModule`) in your application, you don't need to do any configuration to start working with template-based forms. 

You can simply get a reference to your form' `ngForm` directive by exporting it into a local template variable and by using the `ngForm` directive as the value of the variable (`#myForm=ngForm`).   


## Using Angular ngNoForm

If you you want to import `FormsModule` in your application but want to skip a specific form, you can use the `ngNoForm` directive which will prevent `ngForm` from being added to the form.
 
## How to Use NgForm in Your Angular 10 Application by Example

Provided that you have generated an Angular 10  project with Angular CLI and you are ready to start developing your application. 

Let's see how you can use the `ngForm` directive.

First, open the `src/app/app.module.ts` file and import `FormsModule` from the `@angular/forms` package then add it in the `imports` array of the module metadata (or `@NgModule`):

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

 > **Note**: Please note that you can also import `FormsModule` in a sub-module of your application where you want to use template-based forms not necessarily the main application module.

Now, you have NgForm implicitly active in all `<form>` tags (unless you add the `ngNoForm` directive to some specific form).

Next, you need to get a reference to the created `ngForm` directive in the form you are working with. For this matter, you can use a  template reference variable.

## What is an Angular Template Reference Variable 

Here is the definition of a template reference variables from the [official docs](https://angular.io/guide/template-syntax#ref-vars):

>A  **template reference variable**  is often a reference to a DOM element within a template. It can also be a reference to an Angular component or directive or a  [web component](https://developer.mozilla.org/en-US/docs/Web/Web_Components "MDN: Web Components").

You can simply use the hash symbol (`#`) to create a reference variable in your template which will be only available in that template.

In case you want to reference a directive like `ngForm` instead of the DOM element where the variable was declared, you simply need to set the value of the variable explicitly to the directive i.e `#myForm="ngForm"`. 

Next, you need to create a component. Let's suppose that we need to create a user register component. In your terminal, run:

```bash
$ ng generate component register
```

The component will be automatically added to your module by the Angular CLI.

 Open the `src/app/register/register.component.html` file and add the following template:

```html
<form #myform="ngForm" (ngSubmit)="register(myform)" class="form form-register">
  <label for="register-email">Email</label>

  <input name="email" id="register-email" type="email" placeholder="Email" ngModel required>
  <label for="register-password">Password</label>
  <input name="password" id="register-password" type="password" placeholder="Password" ngModel required>

  <input type="submit" value="Register">
</form>
``` 

In the example, we declared a template reference variable called `myform` that references the `ngForm` directive of the registration form.

Since you can now use the `myform` template variable everywhere in your template, you can pass it to the `register()` method bound to the `ngSubmit` event which will be called when your submit the form.

Using the `myform` variable, you can access many useful properties of `ngForm`  either in your template or in your component:

- `myform.value`: It will provides you with the aggregated form value of all the fields used in your `<form>` tag,  
-  `myform.valid`: It will provides you with a boolean value indicating if the form is valid or not,  
- `myform.touched`: It will provides you with a boolean value indicating if the user has entered value at least in one field,  
- `myform.submitted`: It will provides with a boolean value indicating if the form was submitted. 

Next, open the `src/app/register/register.component.ts` file and  add the `register()` method:

```ts
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  register(form) {
    console.log(form.value);
    console.log(form.touched);
    console.log(form.submitted);   
  }
}
```

The `.value` property provides the value of all fields of the form but you can also access the values of individual fields using the `controls` array:

```ts
  register(form: NgForm) {
 console.log(userForm.controls['email'].value);
 console.log(userForm.controls['password'].value);   
  }
```

> Note: Don't forget to import `NgForm` from the `@angular/forms` package in your component.

## Resetting an Angular 10 Form

You can also reset the form using the template variable to the `ngForm` directive. In you component, add the following method:

```ts
 resetForm(form:  NgForm)  { 		 
	 form.resetForm();  
 }
```

We simply call the `resetForm()` of the `ngForm` variable.

## Conclusion

In this quick tutorial, you have seen how you can use the Angular `ngForm` directive and template reference variables to work with forms in Angular 10.


