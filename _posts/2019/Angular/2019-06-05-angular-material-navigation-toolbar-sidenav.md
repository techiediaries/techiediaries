---
layout: post
title: "Angular Material 8 Tutorial: Build Navigation UI with Toolbar and Side Navigation Menu"
image: "images/content/angular.png"
excerpt: "Angular Material 8 Tutorial: Build Navigation UI with Toolbar and Side Navigation Menu" 
tags : [  angular ,  angular-9-material-examples]
---

In the previous [tutorial](https://www.techiediaries.com/angular-tutorial) we’ve seen how to create an Angular 8 application for consuming a simple CRM REST API. We’ve also added component routing to our application in this [tutorial](https://www.techiediaries.com/angular-routing-tutorial). Now, let’s build on those tutorials to create the UI using Angular Material 8.


## Setting up Angular Material 8

We'll be using Material Design to style our CRM UI, so we need to add Angular Material 8 to our project. 

Fortunately, this is only one command away. Open a new terminal and run the following commands:


    $ cd ./ngsimplecrm
    $ ng add @angular/material

The command will ask you to **Choose a prebuilt theme name, or "custom" for a custom theme: (Use arrow keys)**

- Indigo/Pink  
- Deep Purple/Amber 
- Pink/Blue Grey 
- Purple/Green

Let’s choose **Deep Purple/Amber**.

You’ll be also asked if you want to **Set up HammerJS for gesture recognition? (Y/n)** Choose the default answer which is **Y**es. And if you want to  **Set up browser animations for Angular Material? (Y/n)** You can also choose **Y**es.

That's it! Angular Material is configured in your application.


## Importing Angular Material Components: MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule and MatIconModule

After that, you need to import the Angular Material components that you want to use in your project. 

Open the `src/app/app.module.ts` file and add the following changes:

```ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule } from  '@angular/material';

import { AppRoutingModule } from './app-routing.module';


// [...]

@NgModule({
  declarations: [
      // [...]
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

We import the following Material components modules for building our navigation UI:

- MatToolbarModule which provides `<mat-toolbar>` and `<mat-toolbar-row>` components.
- MatSidenavModule
- MatListModule
- MatButtonModule which provides `mat-button` and `mat-icon-button`.
- MatIconModule which provides `<mat-icon>`.

> **Note**: Make sure you import the Angular Material modules after Angular's BrowserModule, as the import order matters for NgModules.

## Angular 8 Material Toolbar Example

The Material toolbar components are designed to add containers for headers, titles, or actions. We can use various component such as `<mat-toolbar>` and `<mat-toolbar-row>` to create and structure toolbars for your application.

Open the `src/app/app.component.html` file and start by adding the toolbar:


```html
<mat-toolbar color="primary">
  <mat-toolbar-row>
    <button mat-icon-button>
      <mat-icon (click)="sidenav.toggle()">menu</mat-icon>
    </button>
    <h1>SimpleCRM</h1>
    <span class="menu-spacer"></span>
    <div>
      <a mat-button [routerLink]="'/accounts'"> Accounts </a>
      <a mat-button [routerLink]="'/create-account'"> Create Account </a>
      <a mat-button [routerLink]="'/contacts'"> Contacts </a>
      <a mat-button [routerLink]="'/create-contact'"> Create Contact </a>
      <a mat-button [routerLink]="'/activities'"> Activities </a>
      <a mat-button [routerLink]="'/create-activity'"> Create Activity </a>

    </div>
  </mat-toolbar-row>

  <mat-toolbar-row>
      <span style="font-size: 12px;">SimpleCRM helps you easily manage your contacts</span>
    </mat-toolbar-row>
</mat-toolbar>

```

We use a primary color for our toolbar. Next, we create tow toolbar rows using the `<mat-toolbar-row>`. In the first row, we add an icon button (using `mat-icon-button`)with a Material icon (`<mat-icon>`) to toggle the sidenav menu which we'll add next. Next, we add a bunch of navigation buttons using `<a>` tags with `mat-button`.


>You can set the color of a `<mat-toolbar>` component by using the `color` property. By default, toolbars make use a neutral background color depending on the current theme (light or dark). This can be changed to `primary`, `accent`, or `warn`.


This is a screenshot of our toolbar:

![Angular 8 Material Toolbar](https://www.diigo.com/file/image/bbccosoazobaoqoedqzdrocrpbd/Ngsimplecrm8.jpg)


## Angular Material Sidenav Example

According to the [docs](https://material.angular.io/components/sidenav/overview):

>The sidenav components are designed to add side content to a fullscreen app. To set up a sidenav we use three components: `<mat-sidenav-container>` which acts as a structural container for our content and sidenav, `<mat-sidenav-content>` which represents the main content, and `<mat-sidenav>` which represents the added side content.

In the same `src/app/app.component.html` file, add:

```html
<mat-sidenav-container>
  <mat-sidenav #sidenav>
    <mat-nav-list>

      <a mat-list-item [routerLink]="'/accounts'"> Accounts </a>
      <a mat-list-item [routerLink]="'/create-account'"> Create Account </a>
      <a mat-list-item [routerLink]="'/contacts'"> Contacts </a>
      <a mat-list-item [routerLink]="'/create-contact'"> Create Contact </a>
      <a mat-list-item [routerLink]="'/activities'"> Activities </a>
      <a mat-list-item [routerLink]="'/create-activity'"> Create Activity </a>
      <a mat-list-item (click)="sidenav.toggle()" href="" mat-list-item>Close</a>

    </mat-nav-list>
  </mat-sidenav>
  <mat-sidenav-content>
    <div style="height: 88vh;">

      <router-outlet></router-outlet>
    </div>
  </mat-sidenav-content>
</mat-sidenav-container>
``` 

We used a Material navigation list to create a list of buttons using `<mat-nav-list>` and `mat-list-item`. We also added a `#sidenav` template reference variable to `<mat-sidenav #sidenav>` to be able to call its `toggle()` method from the menu icon in the toolbar so we toggle it on and off (      `<mat-icon (click)="sidenav.toggle()">menu</mat-icon>`) 

This is a screenshot of our UI:

![Angular 8 Material Sidenav UI](https://www.diigo.com/file/image/bbccosoazobaoqoeoqzdrocrpdb/Ngsimplecrm8.jpg)

## Conclusion

In this tutorial, we’ve added Angular Material 8 to our Angular 8 application which will allow us to build a professional-grade UI for our CRM. Next, we created a navigation UI with Material toolbar, sidenav, buttons and icons components. In the next tutorial, we'll build our table and form UI to create a CRUD interface for creating reading, updating and deleting items from or CRM REST API. 
  

