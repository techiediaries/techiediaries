---
layout: post
title: "Responsive Image Breakpoints Example with CDK's BreakpointObserver in Angular 9/8"
image: "images/content/angular.png"
excerpt: "We'll learn how to implement responsive images in Angular 9/8" 
categories: angular
tags : [angular, angular-9]
author: ahmed
---

Now, let's see with an example how to use responsive image breakpoints in Angular 9/8.

We'll learn to use `BreakpointObserver` from the Angular CDK Layout Module to observe the screen-size changes insetad of using CSS media queries.

CDK stands for Component Development Kit.
 
## Initializing an Angular 9 Project

In the first step, we need to generate a project using Angular CLI 9. Open a new terminal and run the following command: 

```bash
$ ng new angular9-responsive-image-breakpoints
```

You'll be prompted for a couple of options. After that, your project will be created and the necessary dependencies will be installed.

## Using Angular's `BreakpointObserver`

Before you can use `BreakpointObserver`, you need to install the Angular’s CDK Layout Module using the following commands:

```bash
$ cd angular-responsive-image-breakpoints
$ npm install @angular/cdk
```

Next, open the `src/app/app.module.ts` file and add `LayoutModule` in the `imports` array:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Now, you are ready to use the Layout module in your Angular 9 application. Open the `src/app/app.component.ts` file and start by importing the `BreakpointObserver` and `Breakpoints` APIs:

```ts
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
```

Next, you can use `BreakpointObserver` to observe the screen-size changes insetad of using CSS media queries. 

> **Note**: `BreakpointObserver` is an Angular service that can be injected in any component and provides the `isMatched()` and `observe()` methods.
 
## Injecting `BreakpointObserver`
 

Let's inject `BreakpointObserver` as `breakpointObserver` via the component constructor:


```ts
@Component({ /* [...] */ })
export class AppComponent implements OnInit {

constructor(public breakpointObserver: BreakpointObserver) { }

ngOnInit() {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe( (state: BreakpointState) => {
      if (state.breakpoints[Breakpoints.XSmall]) {
	       console.log( 'Matches XSmall viewport');
      }
      if (state.breakpoints[Breakpoints.Small]) {
	       console.log( 'Matches Small viewport');
      }
      if (state.breakpoints[Breakpoints.Medium]) {
		   console.log( 'Matches Medium  viewport');
      }
      if (state.breakpoints[Breakpoints.Large]) {
       
	      console.log( 'Matches Large viewport');
      }
      if (state.breakpoints[Breakpoints.XLarge]) {
       
	     console.log( 'Matches XLarge viewport');   
      }
    });
  }
```

The `observe()` method returns an RxJS Observable of type `BreakpointState` that we need to subscribe to for observing when the viewport of your application changes.

The  `Breakpoints` object provides the following properties that correspond to the common media queries:

- `Breakpoints.XSmall`: max-width equals 599.99px
- `Breakpoints.Small`: min-width equals 600px and max-width equals 959.99px
- `Breakpoints.Medium`: min-width equals 960px and max-width equals 1279.99px
- `Breakpoints.Large`: min-width equals 1280px and max-width equals 1919.99px
- `Breakpoints.XLarge`: min-width equals 1920px

Instead of using the `Breakpoints` object which provides us of keys for common breakpoints, we can also use usual CSS media queries as follows:

```ts
@Component({ /* [...] */ })
export class AppComponent implements OnInit {
  constructor(public breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.breakpointObserver
      .observe(['(min-width: 900px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          console.log('Viewport is 900px or over!');
        } else {
          console.log('Viewport is smaller than 900px!');
        }
      });
  }
}
```

We can also use the `isMatching()` method of `BreakpointObserver`  for simple use cases:

```ts
@Component({ /* [...] */ })
export class AppComponent implements OnInit {
  constructor(public breakpointObserver: BreakpointObserver) {}

ngOnInit() {
  if (this.breakpointObserver.isMatched('(min-height: 900px)')) {
    console.log('The 900px viewport matched!');
  }
}
```

We have seen how to work with responsive images in Angular 9 using the CDK and `BreakpointObserver` which is part of the Layout module that allows you to react and adapt your UI to different viewport sizes in Angular.
