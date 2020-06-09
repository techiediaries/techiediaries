---
layout: post
title: "Lazy Loaded Module Example in Angular 9/8 with loadChildren & Dynamic Imports"
image: "images/content/angular.png"
excerpt: "Lazy loading is the process of loading some features of your Angular application only when you navigate to their routes for the first time. This can be useful for increasing your app performance and decreasing the initial size of the bundle transmitted to the user's browser"
date: 2020-06-09 
tags : [ angular , angular8, angular-9-router-examples ] 
---

Lazy loading is the process of loading some features of your Angular application only when you navigate to their routes for the first time. This can be useful for increasing your app performance and decreasing the initial size of the bundle transmitted to the user's browser. 

In Angular 8+, the syntax for lazy-loading modules has changed and it's now more aligned with the standard browser's API. 

You now need to use the [dynamic import](https://javascript.info/modules-dynamic-imports) syntax to import your module in the `loadChildren` property of [Angular Router routes](https://www.techiediaries.com/angular-routing-tutorial/). 

The dynamic [import API](https://www.techiediaries.com/es-modules-import-export-default/) is a standard browser's API introduced in modern browers. It's [promise](https://www.techiediaries.com/javascript-promises-tutorial-example/)-based and gives you access to the module, from where the module's class can be called.

According to [v8.dev](https://v8.dev/features/dynamic-import)

>[Dynamic  `import()`](https://github.com/tc39/proposal-dynamic-import) introduces a new function-like form of `import` that unlocks new capabilities compared to static `import`.

> Since `import()` returns a promise, it’s possible to use `async`/`await` instead of the `then`-based callback style.

Let's see a quick example!

## Prerequisites

You need to have Angular CLI 9 installed and an [Angular 9 project](https://www.techiediaries.com/angular/angular-9-8-tutorial-by-example-rest-crud-apis-http-get-requests-with-httpclient/) with routing setup.
 

## Adding an Angular 9 Module

We can only lazy-load modules in Angular so let's generate a feature module using the Angular CLI:

```bash
$ ng generate module admin
```

Next, we can also add a couple of components in our module:

```bash
$ ng generate component admin/login
$ ng generate component admin/dashboard
```

## Using `loadChildren` to Lazy-Load your Angular Module

Angular provides the `loadChildren` property of a route's path to specify the module that needs to be lazy loaded when it's first navigated to.

Open the `src/app/app-routing.module.ts` file  and update it as follows:

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
{ path: 'admin', loadChildren: () => import(`./admin/admin.module`).then(m => m.AdminModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

In `loadChildren`, we use the dynamic import syntax to lazy-load (load-at-demand) the admin module.

> Note: The routing module file should be automatically created by the CLI if you opted for automtically adding routing in your project, otherwise you need to create it manually and add the required code for setting up the router.

## Configuring Routes in your Angular Feature Module

After configuring the route to lazy-load your feature module, you'll next need to add routing to the various components of the `admin` module which needs to have its own  routes seprated from the main routing module that resides in the `src/app/app-routing.module.ts` file. 

Go ahead and create a `admin/admin-routing.module.ts` file and add the following code:

```ts
import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'dashboard', component: dashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
```

We create the routes to the various components of our `admin` module and we include these routes in the admin routing module.

We need to feed the routes to the Angular Router using the `forChild()` method instead of the `forRoot()` module.

> **Note**: We could also automatically generate the routing module for the admin module using the `--routing` switch i.e `ng generate module admin --routing  --module=app`.

Open the `src/app/admin/admin.module.ts` file and import the exported admin routing module as follows:

```ts
import { AdminRoutingModule } from './admin-routing.module';
```

Next, add it to the `imports` array of the admin module:

```ts
@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [LoginComponent, DashboardComponent]
})
export class AdminModule { }
```


## Conclusion

That's all we need to set up lazy-loaded modules in Angular 9. As a wrap-up, we've seen how to use the `loadChildren` property of a route in the Angular Router and the standard compliant dynamic import syntax to lazy load an example admin module.


