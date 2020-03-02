---
layout: post
title: "Angular 9 Examples: 2 Ways To Display A Component (Selector & Router)"
image: "images/content/angular.jpg"
excerpt: "In this quick example, we'll see two ways of displaying a component in Angular 9 - using selectors or the router" 
categories: angular
date: 2020-03-02
tags : [angular, angular9, angular-9-ngfor-examples, angular-9-ngif-examples] 
---
 

![Learn Angular 9](https://www.techiediaries.com/letslearnangular.png)

In this quick example, we'll see two ways of displaying a component in Angular 9 - using selectors or the router. 

After creating a component in Angular using Angular CLI, it will be added to the `NgModule.declarations` array of the module where it's used. By default it's the `app` module.

Let's see the two ways of displaying a component in your Angular 9 apps.

## Creating a Component with Angular CLI 9

Open your terminal and run the following command to create a component:

```bash
$ ng generate component dash
``` 

## Displaying the  Component

Now that our component is created, we'll need to display it in our app. There are 2 ways to display a component in Angular:

- Using the component's selector,
- Using the router.
-   
## Using the component Selector

You can display a component inside an HTML template using its selector:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent {
}
```

We can use the `app-dash` selector to display the component as follows:

```html
<app-dash></app-dash>
```
This is like using regular HTML tags. **Angular allows you to extend HTML!**.
 
The `app-dash` tag will not be recognized in your app except if you **declare the component** i.e add the component class to the `declarations` array of the module where it should belong. 

When you generate the component with Angular CLI, this is automatically done:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashComponent } from './dash/dash.component';

@NgModule({
  declarations: [
    AppComponent,
    DashComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
``` 
### Using the router

You can also use the Angular router to display the component. This allows you to create multiple-views UIs.

The router allows you to map a part of the URL to a specific component which will be rendered when the path is visited via the browser's address bar or when a navigation link, that points to the component's path, is clicked. 


## Dynamically Displaying a Component

We can display or render a component dynamically by using directives such as  `*ngIf` or  `*ngFor`. For example :


```html
<app-dash *ngIf="displayDashboard === true"></app-dash>
```

The `DashComponent` will be only displayed if a `displayDashboard` variable that exists on the component's class has a value of true


