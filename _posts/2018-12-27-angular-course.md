---
layout: post
title: "Angular 7|6 Tutorial Course: CLI, Components, Routing & Bootstrap 4"
image: "images/content/angular.png"
excerpt: "In this course, you'll learn to develop your first Angular 7 application with routing, CRUD operations and Bootstrap 4 UI" 
tags : [angular]
---

In this tutorial series we'll be covering Angular 7 from scratch with routing and navigation with a complete example. 

You will be building a simple web application that you can use to show your portfolio projects and which you can actually host in the web and make it accessible for your potential clients. You'll use Firebase for authentication, Firestore for storing and fetching the projects and Bootstrap 4 for styling the UI. 

You'll learn about the prerequisites for working with Angular, how to install Angular CLI and use it to create your project and the various artifacts that you'll need throughout the development of your project.

You'll learn how to get and use route parameters, how to use root and child routes and how to add nested routing.

You'll learn about the `router-outlet` component that's used by the Angular router to render the component(s) matching the current path. How to navigate using the `routerlink` and `routerlinkactive` directives or the router `navigate()` method.  

You'll also learn about the router events, animations and the router resolve property for fetching data.

You'll also learn how to create Angular modules to organize your code, create components for controlling various UI parts, add CRUD operations and style the UI with Bootstrap 4.

You'll start the tutorial by installing Angular CLI v7, the official CLI for creating and working with Angular projects and workspaces, next you'll generate your project based on the latest version as of this writing, next you'll proceed to create your app's pages and components. After that, you'll setup Bootstrap 4 in your project ans style your Angular components with Bootstrap UI components. Finally, you'll setup routing in your project and add routing between the various components composing your application.

> **Note**: This course spans multiple tutorials so make sure you follow all the parts to understand how to create Angular applications. 

## Prerequisites

In order to follow along with this tutorial, you need a few prerequisites, such as:

- Recent versions of Node.js and NPM installed on your system (On Ubuntu you can follow this [tutorial](https://www.techiediaries.com/ubuntu-install-nodejs-npm)),
- Working knowledge of JavaScript and TypeScript.

If you have these requirements, you are good to go!

## Installing Angular CLI v7

Let's start by installing Angular CLI v7 from npm using the following command:

```bash
$ npm install @angular/cli -g
```

As of the time of this writing this will install **angular cli v7.1.4** globally on your system.

> **Note**: You may need to use an elevated administrator CMD in Windows or add **sudo** to your command in macOS and Debian based systems if you want to install packages globally.
> If you want to install packages without admin access, you simply need to fix your npm permissions.

## Creating an Angular 7 Project

We'll start with the first step which is creating a new Angular 7 project using the Angular CLI v7. Head over to your terminal and run this command:

```bash
$ ng new angular7-portfolio
```

Now, you need to pay attention to this step—The Angular CLI will prompt if you **Would like to add Angular routing?** Answer by **y** (**No** is the default option) to tell the CLI to generate the necessary files for routing like the `src/app/app-routing.module.ts` file with all the required code for setting up the router. It will also add a `<router-outlink>` component inside the `src/app/app.component.html` file which is where the router renders any matched component(s) depending on the current path.

> **Note**: The Angular CLI will also prompt you to choose the stylesheets format you want to use in your project such as CSS, SCSS, Less, Stylus and Sass. You can simply choose **CSS** if you prefer no other format.

That's it. If you manage to pass this step without any errors you will have an Angular 7 project setup with best practices and routing all done automatically by the CLI on your behalf.

## Creating Angular Components

Angular uses components everywhere so to have multiple pages, you need to create components. You can also use components for specific parts of your page(s) that can be unique in each page or common between multiple pages. For example, we could have a **home**, **about** and **contact** components that represent the corresponding pages and **header** and **footer** components that are common between all the other components so we'll create them once and have Angular load them all the time whatever the current path is by simply adding them to our **application shell** which is simply the main application component with the associated `src/app/app.component.html` template tha hosts `<router-outlet>`.

![](https://i.imgur.com/YBmbowQ.png)

Head back to your terminal, navigate inside your project's root folder and run these commands to create the mentioned components:

```bash
$ cd angular7-portfolio
$ ng g c header
$ ng g c footer
$ ng g c home
$ ng g c about
$ ng g c contact
```
The CLI will generate the files for these components and the minimal required code for declaring each component and its corresponding template.

For example for the header component the CLI will create the `src/app/header/header.component.html`,
`src/app/header/header.component.spec.ts`, `src/app/header/header.component.ts` and `src/app/header/header.component.css` files.

The components that will be created are:

- `HeaderComponent` in the `src/app/header/` folder,
- `FooterComponent` in the `src/app/footer/` folder,
- `HomeComponent` in the `src/app/home/` folder,
- `AboutComponent` in the `src/app/about/` folder,
- `ContactComponent` in the `src/app/contact/` folder.

Those components will be imported and add to the main application module in the `src/app/app.module.ts` file by the CLI in your behalf.

This is the content of the `src/app/app.module.ts` file:

```ts
import { BrowserModule } from  '@angular/platform-browser';
import { NgModule } from  '@angular/core';
import { AppRoutingModule } from  './app-routing.module';
import { AppComponent } from  './app.component';
import { HeaderComponent } from  './header/header.component';
import { FooterComponent } from  './footer/footer.component';
import { HomeComponent } from  './home/home.component';
import { ContactComponent } from  './contact/contact.component';
import { AboutComponent } from  './about/about.component';

@NgModule({
declarations: [
	AppComponent,
	HeaderComponent,
	FooterComponent,
	HomeComponent,
	ContactComponent,
	AboutComponent
],
imports: [
	BrowserModule,
	AppRoutingModule
],
providers: [],
bootstrap: [AppComponent]
})
export  class  AppModule { }
```

The previous components will be public i.e they could be accessed from any visitor of your web application but let's suppose we want to be able to list our latest portfolio projects in our home page. We want to add the portfolio items from a protected admin page that will be only accessed from the admin of the web application. 


## Styling our Components with Bootstrap 4

For styling our components we'll be using Bootstrap 4. The most popular CSS framework in the world. In your terminal run the following command to install Bootstrap 4 from npm:

```bash
$ npm install bootstrap --save
```

> **Note**: This will install **bootstrap v4.2.1** as the time of this tutorial.

Open the `angular.json` file and add `./node_modules/bootstrap/dist/css/bootstrap.min.css` to the `styles` array:

```json
"styles": [ 
	"src/styles.css", 
	"./node_modules/bootstrap/dist/css/bootstrap.min.css" 
],
```

Open the `src/app/header/header.component.html` file and create a Bootstrap 4 nav header using the following code:

```html
<nav  class="navbar navbar-expand-lg navbar-light"  style="background-color: #b3cbdd;">
<a  class="navbar-brand"  href="#">Angular Developer</a>
<div  class="collapse navbar-collapse"  id="navbarText">
<ul  class="navbar-nav">
<li  class="nav-item">
<a  class="nav-link"  href="#">Home</a>
</li>
<li  class="nav-item">
<a  class="nav-link"  href="#">About</a>
</li>
<li  class="nav-item">
<a  class="nav-link"  href="#">Contact</a>
</li>
<li  class="nav-item">
<a  class="nav-link"  href="#">Admin</a>
</li>
</ul>
</div>
</nav>
``` 

Next, you need to add the header component to the application shell. Open the `src/app/app.component.html` file and update it accordingly:

```html
<app-header></app-header>
<div  class="container">
	<router-outlet></router-outlet>
</div>
```

You include a component in other components using the `selector` property of the `@Component` decorator:

```ts
import { Component, OnInit } from  '@angular/core';

@Component({
selector:  'app-header',
templateUrl:  './header.component.html',
styleUrls: ['./header.component.css']
})
export  class  HeaderComponent  implements  OnInit {
constructor() { }
ngOnInit() {
}
}
```

At this point, we can serve our application using the following command:

```bash
$ ng serve
```

You can then see your application up and running by visiting the `localhost:4200` address in your web browser.

This is a screenshot of our header:

![Angular 7 & Bootstrap 4 header](https://i.imgur.com/6uJVQWp.png)


Next, open the `src/app/footer/footer.component.html`file and add a Bootstrap 4 footer component:

```html

```

## Adding Routing & Navigation 

We want to load our home, about, contact and admin components when we click on the links on the navigation header. 

First we need to assign the components to their corresponding paths. You need to open the `src/app-routing.module.ts` file and add the following imports:

```ts
// [...]
import { HomeComponent } from  './home/home.component';
import { AboutComponent } from  './about/about.component';
import { ContactComponent } from  './contact/contact.component';

```

Next in the same file, add paths to various components inside the already-declared `routes` array:

```ts
const  routes:  Routes  = [
{
path:  'home',
component:  HomeComponent
},
{
path:  'about',
component:  AboutComponent
},
{
path:  'contact',
component:  ContactComponent
}
];
```

Each object in the array defines a route. The `path` property contains the path that will be used to access a component and the `component` property contains the name of the component.

Next we need to add navigation in our header component. Open the `src/app/header/header.component.html` file and update it with the convenient links using the `routerLink` directive:

```html
<nav  class="navbar navbar-expand-lg navbar-light"  style="background-color: #b3cbdd;">
<a  class="navbar-brand"  href="#">Angular Developer</a>
<div  class="collapse navbar-collapse"  id="navbarText">
<ul  class="navbar-nav">
<li  class="nav-item">
<a  class="nav-link"  routerLink="/home">Home</a>
</li>
<li  class="nav-item">
<a  class="nav-link"  routerLink="/about">About</a>
</li>
<li  class="nav-item">
<a  class="nav-link"  routerLink="/contact">Contact</a>
</li>
</ul>
</div>
</nav>
```

Check out all parts:

- Angular 7|6 Tutorial Course: CLI, Components, Routing & Bootstrap 4
- [Angular 7|6 Tutorial Course: Angular NgModules (Feature and Root Modules)](https://www.techiediaries.com/angular-course-modules),
- [Angular 7|6 Tutorial Course: Nested Router-Outlet, Child Routes & forChild()](https://www.techiediaries.com/angular-course-child-routes),
- [Angular 7|6 Tutorial Course: Authentication with Firebase (Email & Password)](https://www.techiediaries.com/angular-course-firebase-authentication),
- [Angular 7|6 Tutorial Course: Securing the UI with Router Guards and UrlTree Parsed Routes](https://www.techiediaries.com/angular-course-router-guards)


## Conclusion

That's it for this part. As a recap of what you achieved, you have installed Angular CLI v7 and created a project for your developer portfolio web application, you have setup routing and Bootstrap 4 in your project then created the various pages (components that represent whole pages of your app and linked to unique routes) and components of your application and created the routes and navigation links. 

In the next [tutorial](https://www.techiediaries.com/angular-course-modules), you'll learn about modules, the existing modules in your project and you'll create a feature module for encapsulating the code of the admin part of your application.   

 
