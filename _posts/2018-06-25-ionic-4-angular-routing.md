---
layout: post
title: "Ionic 4/Angular Tutorial - Ionic 4 Router (Routing and Navigation Example)"
image: "images/content/ionic.png"
excerpt: "Throughout this tutorial, we'll see how to add routing to Ionic 4 with the Angular 6 router" 
tags : [angular, ionic, javascript] 
---


Adding routing to your Ionic 4/Angular 6 application is an essential step for most apps--so in this tutorial, we'll learn how to use Ionic 4/Angular 6 router to create a simple example with routing and navigation between multiple pages.

In this tutorial, you'll learn about:

- Ionic 4 routing using the Angular router
- How to generate Ionic pages using Ionic CLI 4
- The main routing module
- The Ionic Router outlet `<ion-router-outlet>`
- How to add navigation links etc.
- How Ionic 4 uses Angular lazy loading for pages
- How Ionic 4 uses loadChildren to add lazy loaded modules to the Angular router

## Ionic 4 Router or Angular 6 Router?


Ionic 4 provides different mechanisms for routing. The Ionic 4 router which is based on web components just like the other Ionic core components.   But for an angular type project, you can also take benefit of the powerful Angular 6 router which brings more features to implement advanced use cases   more easily. In this tutorial, we'll use the Angular router and Ionic CLI 4  to create a demo application with routing and navigation examples.
For any angular type project, you'll notice that the Angular router is added by default.
You'll also notice that generated pages using the CLI v4 are added automatically to the routing module. 
 
## Creating a New Project Using  Ionic CLI 4

We'll be using Ionic CLI 4 to generate a new project based on Ionic 4 and Angular 6. In the previous tutorial, we've seen how to install the CLI and setup the development environment - so, we'll assume you already have a development environment ready for completing this tutorial. Now, using your terminal, go ahead and run the following command to create a new project:

```bash
$ ionic start ionic4-routing blank --type=angular
```

We are creating a project based on the blank template with the name **ionic4-routing**.

## The Angular Routing Module

The project generated using the Ionic CLI v4 is already setup with Angular routing so you don't have to add a routing module manually. The routing module lives at `src/app/app-routing.module.ts` with the main application module `src/app/app.module.ts` and the main component `src/app/app.component.ts`.

## Adding Routing Using Angular 6 Router
 
After creating a new application, let's add some pages first. Go back to your terminal and run the following command to generate a new page named list

```bash
$ ionic g page list
```

This will automatically create the necessary files for you

```bash
> ng generate @ionic/schematics-angular:page pages/list - prefix=app
CREATE src/app/pages/list/list.module.ts (533 bytes)
CREATE src/app/pages/list/list.page.scss (0 bytes)
CREATE src/app/pages/list/list.page.html (131 bytes)
CREATE src/app/pages/list/list.page.spec.ts (677 bytes)
CREATE src/app/pages/list/list.page.ts (257 bytes)
UPDATE src/app/app-routing.module.ts (454 bytes)
[OK] Generated page!
```

Next, create another page. Let's call it *detail* using the following command:

```bash
$ ionic g page detail
```

Many files will be created:

```bash
> ng generate @ionic/schematics-angular:page pages/detail - prefix=app
CREATE src/app/pages/detail/detail.module.ts (543 bytes)
CREATE src/app/pages/detail/detail.page.scss (0 bytes)
CREATE src/app/pages/detail/detail.page.html (133 bytes)
CREATE src/app/pages/detail/detail.page.spec.ts (691 bytes)
CREATE src/app/pages/detail/detail.page.ts (265 bytes)
UPDATE src/app/app-routing.module.ts (539 bytes)
[OK] Generated page!
```

You can also see that the command update the `src/app/app-routing.ts` which is the Angular routing module for our project. Let's see what's in there. This is the content of the routing file:

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
 { path: '', redirectTo: 'home', pathMatch: 'full' },
 { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
 { path: 'list', loadChildren: './pages/list/list.module#ListPageModule' },
 { path: 'detail', loadChildren: './pages/detail/detail.module#DetailPageModule' },
];
@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})
export class AppRoutingModule { }
```

In the **routes** array, we see that two paths are added:

```ts
{ path: 'list', loadChildren: './pages/list/list.module#ListPageModule' },
 { path: 'detail', loadChildren: './pages/detail/detail.module#DetailPageModule' },
```

Ionic 4 pages use lazy loading. So each page has its own routing module. 

In the `app-routing.ts` we use  **loadChildren**, which  is used for lazy loading pages (modules). It takes the path of the module relative to the `src` folder. You need to pass the full path of the module as a string and put the `#` then the module name.


Open `src/app-component.html` the template for the main app component. This is the content:

```html
<ion-app>
 <ion-router-outlet></ion-router-outlet>
</ion-app>
```

<ion-app> is a top-level wrapper for other Ionic components
<ion-router-outlet> is an Ionic 4/Angular component that wraps the original Angular Router outlet <router-outlet>for adding animations.