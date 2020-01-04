---
layout: post
title: "Angular 6|7 Router: Lazy Loading Modules Tutorial (loadChildren() Example)"
image: "images/content/angular.png"
excerpt: "In this tutorial, we'll see by example Angular 6 routing and lazy loading components using feature modules and the loadChildren() method" 
tags : [angular] 
---

In this tutorial, we'll see by example Angular 6|7 routing and lazy loading components using feature modules and the `loadChildren()` method. 

Lazy loading modules in Angular 6 allows applications to load modules only when they are needed i.e when you first visit the route(s) corresponding to component(s) belonging to the lazy loaded module. This has many benefits on your Angular 6 application such as the performance and size.

To add lazy loading in your Angular 6 application you need to setup routing to use the `loadChildren()` method and add components that you want to lazy-load inside feature modules i.e outside the main application module `app-main.module.ts`.

> **Note**: This tutorial works with Angular 6 and Angular 7.

## Creating an Angular 6 Project

We assume you have Angular CLI 6 installed. Now, you can create a project using the following command:

```bash
ng new angular6project
```

## Creating a Feature Module

We now need to create a feature module using the following command:

```bash
$ ng g module lazymodule
```

We also need to create components inside our feature module:

```
$ ng g c lazymodule/component1
$ ng g c lazymodule/component2
$ ng g c lazymodule/component3
```

These commands will generate three components inside the *lazymodule* module.

## Using `loadChildren()` 

In the main routing file `app-routing.module.ts`, you need to use the `loadChildren()` method to lazy load the feature module:

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'lazymodule', loadChildren: './lazymodule/lazymodule.module#LazyModuleModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

The `loadChildren()` method takes the path to the module, appended to `#` appended to the module’s class name.

## Routing Components Inside the Feature Module

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { Component1Component } from './component1/component1.component';

import { Component2Component } from './component2/component2.component';

import { Component3Component } from './component3/component3.component';

const routes: Routes = [
    { path: '', component: Component1Component },
    { path: 'component2', component: Component2Component },
    { path: 'component3', component: Component3Component },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [Component1Component,Component2Component,Component3Component]
})
export class LazyModuleModule {}
```

In the feature module, we include the routes with RouterModule's `forChild()` method instead of the `forRoot()` method.

## Conclusion

In this tutorial, we've seen how to lazy load modules with Angular 6 router using feature modules and the `loadChildren()` method.
