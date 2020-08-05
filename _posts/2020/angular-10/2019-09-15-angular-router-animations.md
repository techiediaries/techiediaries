---
layout: post
title: "Angular 10/9 Router: Route Animations by Example"
image: "images/content/angular.png"
excerpt: "The Angular 10 Router supports adding animations when navigating between different routes in your application. In this tutorial, we'll learn how to use the Angular’s animations API to play animations when a route changes in your application"
date: 2020-08-05 
tags : [angular, angular8, angular-9-router-examples] 
---

The Angular 10 Router supports adding animations when navigating between different routes in your application. In this tutorial, we'll learn how to use the Angular’s animations API to play animations when a route changes in your application.

## Creating an Angular 10 Project

In this tutorial we assume you already have Angular CLI 10 installed. You can then generate a project using the following command from your terminal:

```bash
$ ng new angular-project
```

We also need some components. Create them using:

```bash
$ ng g c list
$ ng g c detail
```


## Adding Angular 10 Routes

Next, you need to add routes to the created Angular 10 components in your routing module `app-routing.module.ts`:

```ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'list', component: ListComponent },
  { path: 'detail', component: DetailComponent },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

In the `app.component.html` we can add the following code to navigate between the different components:

```html
<nav>
    <a routerLink="">home</a>
    <a routerLink="list">list</a>
    <a routerLink="detail">detail</a>    
</nav>
<div>
  <router-outlet></router-outlet>
</div>
```

The `routerLink` directive is used to create links to paths defined in the routing module.

The `<router-outlet>` is where the Angular router inserts the component(s) matching the current route.

## Adding the Angular Animations Module: `BrowserAnimationsModule`

Before we can create routing animations, we need to import the animations module in the main application module:

```ts


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';


@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule],
  declarations: [AppComponent, HomeComponent, ListComponent,DetailComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Defining and Registering Angular Router Animations

In `app.component.ts` you need to define your animation and register in the `animations` array of the component:

```ts
import { Component } from '@angular/core';
import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild
} from '@angular/animations';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
trigger('myAnimation', [
  transition('* => *', [
    query(
      ':enter',
      [style({ opacity: 0 })],
      { optional: true }
    ),
    query(
      ':leave',
       [style({ opacity: 1 }), animate('0.3s', style({ opacity: 0 }))],
      { optional: true }
    ),
    query(
      ':enter',
      [style({ opacity: 0 }), animate('0.3s', style({ opacity: 1 }))],
      { optional: true }
    )
  ])
]);

  ] // register the animations

})
export class AppComponent { }

```

First we import a bunch of methods from the `@angular/animations` module. Next in the animations array of the component we define our animation.

We use the `trigger()` method to create a `myAnimation` trigger which will be applied to the `<div>` containing the router outlet in the component template.

Next in the the second parameter (array) of the `trigger()` method we supply a `transition()` method that takes two parameters: the first paramter specifies when the animation(s) should be applied. In this case when there is a transition from any route to any route (`’* <=> *’`). The second parameter takes an array of animations.

We can also spcifiy any number of transitions since the second paramter of the `trigger()` method is of type Array.

Next we create a `group([])` of `query()` methods  to query for any components that are entering or leaving the DOM and apply styles and animations to the `:enter` and `:leave` states which creates fade in and fade out effects.  

## Applying the Animation on the Router Outlet

After defining the `myAnimation` animation we need to apply it to our router outlet

```html
<div [@myAnimation]="o.isActivated ? o.activatedRoute : ''">
  <router-outlet #o="outlet"></router-outlet>
</div>
```

We use a template reference to create a reference to the router outlet `#o="outlet"`. This is useful for knowing when the router outlet is active so we can trigger the animation.


## Conclusion

In this quick Angular 10 router animations tutorial, we've seen how to define and trigger animations when navigating between routes in Angular 10 applications. 
