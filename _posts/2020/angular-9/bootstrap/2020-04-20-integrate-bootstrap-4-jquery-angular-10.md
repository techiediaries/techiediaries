---
layout: post
title: "Integrate Bootstrap 4/jQuery with Angular 10 and Styling the UI With Navbar and Table CSS Classes"
image: "images/content/angular.png"
excerpt: "In this Angular 10 tutorial we'll learn how to use Bootstrap 4 to build professional UIs" 
categories: angular
tags : [ angular, angular-10, bootstrap]
---

In this tutorial we'll learn, by example, how to use Bootstrap 4 and jQuery with Angular 10 to build professional UIs. 

Angular 10 is the latest version of Angular, when writing this tutorial, and Bootstrap 4 is the latest version of Bootstrap — the most popular CSS framework. You can use Bootstrap and jQuery to create professional looking interfaces without being a CSS designer. 

> Note: Bootstrap 4 makes use of jQuery for implemeting many components that need DOM access. Bootstrap 5 will replace jQuery with plain JavaScript
 
In this tutorial, we'll particularly look at how to add Bootstrap 4 to Angular projects generated using **Angular CLI 10**.

In this part, we're going to style an example UI interface with Bootstrap 4, after installing and setting up the framework in the Angular 10 front-end.

In the previous tutorial we’ve:

- Installed Angular CLI 10.
- Generated a new front-end application using Angular CLI 10.
- Created some UI components.



## Different Ways to Integrate Bootstrap 4 with Angular 10

There are many ways to add Bootstrap 4 to Angular projects:

- Installing  **bootstrap** and **jquery** via *npm* and add adding scripts and styles to `angular.json`.
- Importing **bootstrap** style and script files in `src/index.html`. You can use a bootstrap 4 [CDN](https://getbootstrap.com/docs/4.0/getting-started/download/#bootstrapcdn).
- Installing **bootstrap** via *npm* and importing `@import "~bootstrap/dist/css/bootstrap.css";` in `src/styles.css`.
- Installing and using  **[ng-bootstrap](https://ng-bootstrap.github.io/#/getting-started)** `
npm install --save @ng-bootstrap/ng-bootstrap`: It's a library that contains native Angular components for Bootstrap’s markup and CSS styles.  It's not dependent on jQuery or Bootstrap’s JavaScript.

## How to Work with This Tutorial?

To complete this tutorial,  you'll need to, either:

- Start with the previous tutorial, which takes you from installing the Angular CLI 10 to calling the RESTful API 
- Clone the [font-end project](https://github.com/techiediaries/ng-crm) from GitHub and follow the steps in the previous tutorial for setting up the project.
-  Directly follow the steps to integrate Bootstrap 4 in your own Angular 10 project.

## How to add Bootstrap 4 to your Angular 10 Front-End?
 
After seeing different ways to add Bootstrap 4 to Angular 10, let's now style our Angular 10 front-end UI, built in the previous tutorial, with Bootstrap. We'll use the first approach i.e we'll install **bootstrap** from *npm* and then we'll include `bootstrap.css` CSS file, *jQuery* and *Popover.js*   

### Installing Bootstrap 4 and jQuery

Head over to your project, you created in the previous tutorial, navigate inside your Angular 10 front-end application:

```bash
$ cd frontend
``` 

Next, install **bootstrap** and **jquery** from npm using:

```bash
$ npm install --save bootstrap jquery
```

### Adding Bootstrap 4 to Angular CLI 10

Next, open `angular.json`. You should similar content to the following:

```json
{

"$schema": "./node_modules/@angular/cli/lib/config/schema.json",
"version": 1,
"newProjectRoot": "projects",
"projects": {
	"crmapp": {
	"root": "",
	"sourceRoot": "src",
	"projectType": "application",
	"prefix": "app",
	"schematics": {},
	"architect": {
		"build": {
		"builder": "@angular-devkit/build-angular:browser",
		"options": {
		"outputPath": "dist/crmapp",
		"index": "src/index.html",
		"main": "src/main.ts",
		"polyfills": "src/polyfills.ts",
		"tsConfig": "src/tsconfig.app.json",
		"assets": [
			"src/favicon.ico",
			"src/assets"
		],
		"styles": [
			"src/styles.css"
		],
		"scripts": []
		},

...
},
"defaultProject": "crmapp"
}
```
Under `projects -> architect -> build -> scripts` add `node_modules/jquery/dist/jquery.min.js` and `node_modules/bootstrap/dist/js/bootstrap.min.js`:

```json
"scripts": [
	"node_modules/jquery/dist/jquery.min.js",
	"node_modules/bootstrap/dist/js/bootstrap.min.js"
]
```  

Under `projects -> architect -> build -> styles` add `node_modules/bootstrap/dist/css/bootstrap.min.css`:

```json
"styles": [
	"src/styles.css",
	"node_modules/bootstrap/dist/css/bootstrap.min.css"
],
```

That's it. You can now use Bootstrap 4 in your Angular 10 front-end application just like you would normally do. 

### Styling Angular 10 Components with Bootstrap 4

Let's take an example. Go ahead and open `src/app/app.component.html` and update it to add a Bootstrap navigation bar:

{% raw %}
```html
<nav  class="navbar navbar-expand-lg navbar-light bg-light">
	<a  class="navbar-brand"  href="#">Angular CRM</a>
	<button  class="navbar-toggler"  type="button"  data-toggle="collapse"  data-target="#navbarSupportedContent"  aria-controls="navbarSupportedContent"  aria-expanded="false"  aria-label="Toggle navigation">
	<span  class="navbar-toggler-icon"></span>
	</button>
<div  class="collapse navbar-collapse"  id="navbarSupportedContent">
	<ul  class="navbar-nav mr-auto">
		<li  class="nav-item active">
		<a  class="nav-link"  href="#">Home <span  class="sr-only">(current)</span></a>
		</li>
		<li  class="nav-item dropdown">
		<a  class="nav-link dropdown-toggle"  href="#"  id="navbarDropdown"  role="button"  data-toggle="dropdown"  aria-haspopup="true"  aria-expanded="false">
		Actions
		</a>
		<div  class="dropdown-menu"  aria-labelledby="navbarDropdown">
		<a  class="dropdown-item" [routerLink]="'/accounts'"> Accounts </a>
		<a  class="dropdown-item" [routerLink]="'/create-account'"> Create Account </a>
		<div  class="dropdown-divider"></div>
		<a  class="dropdown-item" [routerLink]="'/contacts'"> Contacts </a>
		<a  class="dropdown-item" [routerLink]="'/create-contact'"> Create Contact </a>
		<div  class="dropdown-divider"></div>
		<a  class="dropdown-item" [routerLink]="'/leads'"> Leads </a>
		<a  class="dropdown-item" [routerLink]="'/create-lead'"> Create Lead </a>
		<div  class="dropdown-divider"></div>
		<a  class="dropdown-item" [routerLink]="'/opportunities'"> Opportunities </a>
		<a  class="dropdown-item" [routerLink]="'/create-opportunity'"> Create Opportunity </a>
		</div>
		</li>
</ul>
</div>
</nav>
<div  class="container-fluid">
	<router-outlet></router-outlet>
</div>
```
{% endraw %}

Now, let's style contact list component. Open `src/app/contact-list.component.html` and add:

{% raw %}
```html
<h1>
My Contacts
</h1>
<div>
<table  class="table">
<thead>
<tr>
<th>First Name</th>
<th>Last Name</th>
<th>Phone</th>
<th>Email</th>
<th>Address</th>
</tr>
</thead>
<tr *ngFor="let contact of contacts">
	<td> {{ contact.first_name }} </td>
	<td> {{ contact.last_name }} </td>
	<td> {{ contact.phone }} </td>
	<td> {{ contact.email }} </td>
	<td> {{ contact.address }} </td>
</tr>
</table>
</div>
```
{% endraw %}

This is a screen-shot of the result after adding Bootstrap 4 classes:

![Angular 10 and Bootstrap 4 tutorial](https://i.imgur.com/B2YrOmv.png)

## Conclusion

In this tutorial, we've seen different ways you can use if you want to add Bootstrap 4/jQuery to your project and then we have seen by example how to add Bootstrap 4 to our Angular 10 front-end application generated with Angular CLI. 


