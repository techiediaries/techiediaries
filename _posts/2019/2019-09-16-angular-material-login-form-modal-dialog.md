---
layout: post
title: "Angular 9/8 Popup Modal Example with Angular Material Form and Modal Dialog Components"
image: "images/content/angular.png"
excerpt: "In this tutorial, you'll build an example login UI with a form and modal dialog styled with Angular Material 9." 
date: 2020-1-02
tags : [angular]
---

In this tutorial, you'll learn about Angular Popup Modals and forms by example. We'll be using Angular Material with an Angular 9 example.

These are the steps:

- Step 1: Creating an Angular 9 Project
- Step 2: Adding Angular Material v9
- Creating the Angular Modal Component
- Adding a Material Card Container
- Adding an HTML Form
- Step 3: Using a Modal Dialog for Displaying Error Messages
- Step 4: Opening the Popup Modal Dialog

In this tutorial, you'll build an example login UI with a form and dialog styled with Angular Material. 

## Step 1: Creating an Angular 9 Project

We assume you have [created an Angular 9 project using Angular CLI](https://www.techiediaries.com/angular-cli-tutorial/). Otherwise, you can install Angular CLI from npm using:


```bash
$ npm install @angular/cli -g
```

Next, you can generate your project using:

```bash
$ ng new mat-modal-example
```

You'll be prompted if would you like to add routing to your project and which stylesheets format you want to use. Choose the desired options for your project and let's continue.

You can serve your project using the following commands:

```bash
$ cd mat-modal-example
$ ng serve
```

Your application will be available from the `http://localhost:4200/` address.

## Step 2: Adding Angular Material v9

Open a new terminal and navigate to your project's folder, next run the `ng add` command to install and set up Angular Material in your project:

```bash
$ cd mat-modal-example
$ ng add @angular/material
```

You also need to [configure or disable animations](https://material.angular.io/guide/getting-started#step-2-configure-animations).

Next, you need to add the modules for the Material components you'll be using in your project.

Open the `src/app/app.module.ts` file and add these imports: 

```ts
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';

```

Next, you need to add these modules in the `imports` array of your main module:

```ts
imports: [ /*...*/, MatDialogModule, MatInputModule, MatButtonModule, MatCardModule, MatFormFieldModule],
```  

### Creating the Angular Modal Component

Next, you need to create the login component and style it with Material Design. In your terminal, run the following command:

```bash
$ ng generate component login
```

#### Adding a Material Card Container
 
Now, open `src/app/login/login.component.html` file and add a Material card container as follows:

```html
	<mat-card>
	<mat-card-header>
		<mat-card-title>Example Login Form</mat-card-title>
	</mat-card-header>
		<mat-card-content>
		<!-- This is where you need to add your login form -->
		</mat-card-content>
```

A `<mat-card>` component can be used as a container for text, forms and photos. You can check out the [docs](https://material.angular.io/components/card/overview) for more information.

#### Adding an HTML Form

In the body of the card container, add a form:

```html
	<form>
		<!-- Form fields -->
	</form>
```

Next, we need to provide input fields for getting the email and password from the user:  

```html
<mat-form-field>
<input  matInput  placeholder="your email" [(ngModel)]="email"  type="email" name="email"  required>
</mat-form-field>
<mat-form-field>
<input  matInput  placeholder="your password" [(ngModel)]="password"  type="password"  name="password"  required>
</mat-form-field>
```

First, we use `<mat-form-field>` to wrap each field of the form, next use `matInput` directive with regular `<input>` tags  to create input fields with Material look and feel.

The [`<mat-form-field>`](https://material.angular.io/components/form-field/overview) component provides wrapped fields with features such as the underline, floating label, and hint messages.

You can wrap the following elements in `<mat-form-field>`:

-   [`<input matInput>` and `<textarea matInput>`](https://material.angular.io/components/input/overview)
-   [`<mat-select>`](https://material.angular.io/components/select/overview),
-   [`<mat-chip-list>`](https://material.angular.io/components/chips/overview).

Next, we finish building the login UI by adding a button:
 
```html
		<mat-card-actions>
			<button  mat-raised-button (click)="login()"  color="primary">Login</button>
		</mat-card-actions>
	</mat-card>
```

You can create Material buttons using the regular HTML tags such as `<button>` and `<a>` tags and applying  `mat-button` or`mat-raised-button` directives. For more more information check out the [docs](https://material.angular.io/components/button/overview).
 
## Step 3: Using a Popup Modal Dialog for Displaying Error Messages

Angular Material provides the `MatDialog` service for displaying modal dialogs. You can create a dialog using an Angular component so first create the component using:

```
$ ng generate component message
``` 

Next, open the  `src/app/message/message.component.ts` file and update it accordingly:

```ts
import {Component, Inject, Injectable} from  '@angular/core';

import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';

@Component({
templateUrl:  'message.component.html'
})
export  class  MessageComponent {
	constructor(private  dialogRef:  MatDialogRef<MessageComponent>, @Inject(MAT_DIALOG_DATA) public  data:  any) {
	}
	public  closeMe() {
		this.dialogRef.close();
	}
}
```

When this component is created with the `MatDialog` service, a `MatDialogRef<MessageComponent>` will be injected which references the opened modal dialog so you can use it to close the dialog.

We also need to pass data between the dialog and the component. You can simply use the `MAT_DIALOG_DATA` injection token and the *@Inject()* decorator to get dialog data in your component.

Next open the `src/app/message.component.html` and update it accordingly:

```html
<h1  mat-dialog-title>Message</h1>
	<mat-dialog-content> {{data.message}} </mat-dialog-content>
<mat-dialog-actions>
	<button  mat-raised-button (click)="closeMe()">Close</button>
</mat-dialog-actions>
```

We use the `mat-dialog-title` combined with the `<h1>` tag to add the dialog title, the`<mat-dialog-content>` directive for adding the content area of the dialog and the `<mat-dialog-actions>` for adding the dialog action buttons. 

## Step 4: Opening the Popup Modal Dialog

For testing the modal dialog, we'll add the `login()` method to our login component which will open  the message dialog to display an error. Open the `src/login/login.component.ts` file and update it accordingly: 

```ts
import { Component, OnInit } from  '@angular/core';
import { MatDialog, MatDialogRef } from  '@angular/material';

// .. other imports

@Component({
// component metadata
})
export  class  LoginComponent{

	public  email:  string  =  "";
	public  password:  string  =  "";
	

	constructor(private  dialog:  MatDialog, private  router:  Router) { }
	login(){
		if(this.email  ===  "email@email.com"  &&  this.password  === "p@ssw0rd")
		{
			this.router.navigate(['success']);
		}
		else
		{
			this.dialog.open(MessageComponent,{ data: {
			message:  "Error!!!"
			}});
		}
	}
}
```

You import the `MatDialog` service and inject it via your component's constructor and then you call the `open()` method of the injected instance to open the message modal. The method takes a `config` object with a `data` attribute that contains data that you need to pass to the dialog's component. 

## Conclusion

In this tutorial, you have created a simple login UI example with Angular 9, an HTML form, a Modal popup dialog and Angular Material 9.
