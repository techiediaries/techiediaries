---
layout: post
title: "Angular 10/9 Material Date Picker, Input, CheckBox, Radio Button and Select"
image: "images/content/angular.png"
excerpt: "In this tutorial, you'll learn how to use Angular Material to style forms in your Angular 10/9 web app." 
date: 2020-08-05 
tags : [angular, angular-10-material-examples]
---

In this tutorial, you'll learn how to use Angular Material to style forms in your Angular 10 web application. We'll use common components like form fields, input, label, date pickers, radio buttons and select.

We'll particularly see how to use forms and date pickers by example.

We'll be using the following Material components in this tutorial to style a form and its fields:

* The Card Material component via `<mat-card>`,
* The Form Field Material component via `<mat-form-field>`,  
* The CheckBox Material component via `<mat-checkbox>`, 
- The Input Material component via  `<input matInput>` and `<textarea matInput>`,
* The Label Material component via `<mat-label>`, 
* The Date Picker component via `<mat-datepicker>`,
* The Radio Button Material component via `<mat-radio-button`,
* The Select Material component via `<mat-select>`.

These are the most commonly needed fields in forms.

We assume you have [Angular CLI 10 installed](https://www.techiediaries.com/angular-cli-tutorial/) and you have created a project. Both these tasks can be easily done from your terminal using these two commands:

```bash
$ npm install @angular/cli -g # Install Angular CLI globally on your system
$ ng new mat-form-example # Create a project named mat-form-example 
``` 

> **Note**: You need to have recent versions of Node.js and NPM installed on your system.

## Setting up Angular Material in your Angular 10 Project

After setting up an [example Angular 10 project](https://www.techiediaries.com/angular/angular-9-8-tutorial-by-example-rest-crud-apis-http-get-requests-with-httpclient/), you need to import and set up Angular Material in your project and import the individual Material modules that you want to use using the [import statement of TypeScript](https://www.techiediaries.com/angular/upload-images-typescript-node-ionic-imports-decorators-async-await-formdata/).

You can set up Angular Material in your Angular 10 project using the `ng add` command:

```bash
$ cd mat-form-example
$ ng add @angular/material
```

You then need to [configure or disable animations](https://material.angular.io/guide/getting-started#step-2-configure-animations).

## Importing the Angular 10 Material Modules

Next, you need to import the individual Material modules in your main application module to include the needed components. Open the `src/app/app.module.ts` file and add the following imports:

```ts
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
```

Next, you need to add these modules in the `imports` [array](https://www.techiediaries.com/angular/typescript-strings-arrays-promises-rxjs-behavior-replay-subjects/) of the application module:

```ts
imports: [ /*...*/, MatInputModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatCheckboxModule, MatDatepickerModule, MatRadioModule, MatSelectModule],
```  

The `MatCardModule` contains the Material Card component which will be used to wrap the form.

That's it, you can now use these Material components in your project.

## Creating the Angular 10 Component & Styling it with Angular Material

In this tutorial, we'll build a simple form for creating contacts. 

Let's create an Angular component where we'll add our form. Head back to your terminal and run the following command:

```bash
$ ng generate component contact-create
```

This will generate a `ContactCreateComponent` component and will add it to the application module.

### Adding a Material Card Container 

Open the `src/app/contact-create/contact-create.component.html` file and add the Card component before we use it as a container for our form:

```html
<mat-card>
<mat-card-header>
	<mat-card-title>Create Contact Form</mat-card-title>
</mat-card-header>

	<mat-card-content>
	<!-- put the form here -->
	</mat-card-content>
	<mat-card-actions>
	<!-- put buttons here -->
	</mat-card-actions>
</mat-card>
```

In the content area of the card, add this HTML form:

```html
<form>
</form>
``` 

### Adding a Material Input Field

In your form, add a Material form field with a label and input elements:

```html
		<mat-form-field>
			<mat-label>Contact Name</mat-label>
			<input  matInput  placeholder="Contact Name" [(ngModel)]="contactName"  name="contactName"  required>
		</mat-form-field>
```

The `<mat-form-field>` acts as a wrapper for the form fields.

### Adding a Material Textarea Field

Next, let's create a form field with a label and textarea for entering the contact address:

```html
		<mat-form-field>
			<mat-label>Contact Address</mat-label>
			<textarea [(ngModel)]="contactAddress"  matInput></textarea>
		</mat-form-field>
```

We add the `matInput` directive to the textarea to make it a Material component.

We use  `<mat-label>` to add labels,  `<input  matInput />` for input fields and `<textarea matInput>` for  textarea fields.

### Adding a Material Checkbox
 
Next, let's add a checkbox:
 
```html
	<mat-checkbox [checked]="isDeleted">Is deleted?</mat-checkbox>
``` 


### Adding a Material Date Picker 

Next, let's add a date input field and a date picker:

```html
	<mat-form-field>
		<mat-label>Date</mat-label>
		<input  [value]="date.value" matInput [matDatepicker]="myPicker"  placeholder="date">
		<mat-datepicker-toggle  matSuffix [for]="myPicker"></mat-datepicker-toggle>
		<mat-datepicker #myPicker></mat-datepicker>
	</mat-form-field>
```

>The datepicker allows users to enter a date either through text input, or by choosing a date from the calendar. It is made up of several components and directives that work together. [Read more information](https://material.angular.io/components/datepicker/overview)

### Adding a Material Radio Group & Buttons

Next let's add some radio buttons to specify the gender of our contact:
 
```html
	<mat-label>Gender</mat-label>
	<mat-radio-group [(value)]="contactGender">
		<mat-radio-button  value="male">Male</mat-radio-button>
		<mat-radio-button  value="female">Female</mat-radio-button>
	</mat-radio-group>
``` 

We bind the `contactGender` variable to the `value` of the radio group.

### Adding a Material Select Field
 
Finally, let's add the last field which is a Select field:

```html
	<mat-form-field>
		<mat-label>Source of Contact</mat-label>
			<mat-select [(value)]="contactSource" placeholder="Source of contact">
		    <mat-option value="email">Email</mat-option>
		    <mat-option value="website">Website</mat-option>
		    <mat-option value="direct">Direct</mat-option>
		</mat-select>
	</mat-form-field>
```

Next, all we need to add to our form is a button to save the contact:

```html
<mat-card-actions>
	<button  mat-raised-button (click)="saveContact()"  color="primary">Save Contact</button>
</mat-card-actions>
```

## Adding Variables to The Component
  
In `src/app/contact-create/contact-create.component.ts` add these variables:

```ts
contactName:  string  =  "";
contactAddress:  string  =  "";
contactSource:  string  =  "direct";
contactGender:  string  =  "male";
isDeleted  :  boolean  =  false;
date  =  new  FormControl(new  Date());

public  saveCustomer(){
	/* Typically this method will be used to send the contact form to a server to save it*/
}
```

## Conclusion

Angular Material provides various components to build professional UI forms with individual components for common fields.

We used form fields, input, label, date pickers, radio buttons and select.
   
In this tutorial, you have seen how you can build a simple form, with a date picker, using Angular 10 Material. 

