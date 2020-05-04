---
layout: post
title: "Angular 8 Material Design Tutorial & Example"
image: "images/content/angular.png"
excerpt: "In this tutorial, we'll be learning how to use Angular 8 Material Design to build a beautiful and professional grade UI interface for our Angular front-end application" 
tags : [ angular, angular-9-material-examples ]
---
 
Throughout this tutorial, we'll learn about using [Angular Material](https://material.angular.io/) 8 to create professional UIs. 

In the previous tutorial, you have seen how you can install Angular CLI 8 and generate a brand new Angular 8 front-end. Now let's see how we can add Angular Material 8 to our Angular application. 

## What's Material Design? 

Material Design is a design language created by Google in 2014. It dictates a set of principles and guidelines for creating UIs including motion (animations) and interaction (gestures).

## What is Angular Material?

Angular Material is the implementation of Material Design for Angular. It offers  a plethora of components and patterns for navigation, forms, buttons and layouts.

At this time, Angular Material 8 is the newest version.

In this tutorial, we'll see how to add Material Design to Angular 8 in two ways: 

- The long way: by following a bunch of steps manually. This works for Angular 4+ versions.
- The short way: by using the `ng add` command to quickly add Angular Material in one step using Angular Schematics. This method only works with Angular 6+.   

## Step1: Installing Angular Material 8 and Angular CDK

Head over to your terminal, navigate inside your created Angular front-end application and then run the following commands to install Angular Material 8 and Angular 8 CDK

```bash
$ npm install --save @angular/material @angular/cdk
```

## Step 2: Adding Support for Angular Animations 

Some Angular Material components use animations so you need to add support for animations in your Angular 8 front-end application in order to enable these animations.

Head back to your terminal and run the following command to install the Angular animations module 

```bash
$ npm install --save @angular/animations
``` 

Next, you only need to add this module to your app configuration. So go ahead and open the `src/app/app.module.ts` file then import the `BrowserAnimationsModule` module and add it to the list of `imports`: 

```ts
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

imports: [
    BrowserModule, BrowserAnimationsModule
],
``` 

## Step 3: Adding Support for Gestures with HammerJS

Some Angular Material components depend on [HammerJS](http://hammerjs.github.io/) for gestures support. So you need to add HammerJS to your application in order to get all the features of those components.

You can simply head to your terminal and install the library from `npm`:

```bash
$ npm install --save hammerjs
```

You'll then need to import the library in your app entry point (`main.ts`) 

```ts
/* [...] */
import 'hammerjs';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
```

## Step 4: Including a Theme

Themes are required to add styles to the Material components used in your application. You can either use a custom or a pre-built theme.

Themes are CSS files. To find all the available pre-built themes you can check the `@angular/material/prebuilt-themes` folder in the `node_modules` folder in your project:

-   `deeppurple-amber.css`
-   `indigo-pink.css`
-   `pink-bluegrey.css`
-   `purple-green.css`

So let's use the `deeppurple-amber.css` theme for our application. 

Simply open the `style.css` file and add the following CSS `@import`

```css
@import '~@angular/material/prebuilt-themes/deeppurple-amber.css';
```

## Adding Angular Material 8 with `ng-add` and Schematics

With the release of Angular 6+, the new `ng add` command is available which makes it easy to add new capabilities to the project. 

This command will use the package manager to download new dependencies and invoke corresponding installation scripts. This is making sure that the project is updated with dependencies, configuration changes and that package-specific initialization code is executed.

In the following, we’ll use the _ng add_ command to add Angular Material to the previously created Angular 8 application. Head back to your command line, make sure you navigate inside your project's folder and run the following command:

```bash
$ ng add @angular/material
```

By executing this command, we’re installing Angular Material 8 and the corresponding theming into the project. Furthermore new starter components are registered into _ng generate._

For an example, check out: [Angular Material 8 Tutorial: Build Navigation UI with Toolbar and Side Navigation Menu](https://www.techiediaries.com/angular-material-navigation-toolbar-sidenav) 

## Conclusion

That's it, we now have updated our Angular 8 front-end application to use Angular Material. In the next tutorial we'll see more detailed example of using Material data-table to create tables for our data.


