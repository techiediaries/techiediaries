---
layout: post
title: "Angular 9/8 How-To: Path Redirection and Handling 404 Paths Using Router Wildcard Routes"
image: "images/content/angular-by-example-httpclient-get.png"
excerpt: "In this quick example, we'll see how to redirect users to a new URL path or component using the Angular router and how to deal with not found pages and redirect to a 404 component if no match is found using wildcard paths" 
tags : [angular, angular-how-tos, angular9, angular-9-router-examples] 
---
 
In this quick example, we'll see how to redirect users to a new URL path or component using the Angular router and how to deal with not found pages and redirect to a 404 component if no match is found using wildcard paths.

If you are new to these how-tos, check out how to [install and set up a project and the prerequisites](https://www.techiediaries.com/angular-cli-tutorial/).


We'll be using the latest Angular 9 version.

## Why redirecting to new paths?

Redirection is common technique in web development where a specific URL path is redirected to a new one for many reasons such as migrating a legacy application or if the requested page is not available, etc.

  
We assume that you already have a development machine with Angular CLI installed and that you have initialized an Angular 9 project.

When you create your project with Angular CLI, you will be prompted if **Would you like to add routing?** If you answered with **Y**es, a routing module will be created automatically and you can simply start adding your app routes.

Otherwise, you will need to set up routing manually.

## Step 1 – Setting up routing in your Angular app

Before seeing how to redirect users to new paths or components, we first need to set up routing in our Angular 9 project.

Open a new command-line interface and navigate to your project's folder then run the following command: 
```bash
$ ng generate module app-routing --flat --module=app
```

Using the `--flat` flag  will ensure that the routing file will be added inside the `src/app` folder without a sub-folder.

Using the `--module=app` tells Angular CLI to register the routing module as a part of the app module which means adding it in the `imports` array of the  `src/app/app.module.ts`file.

Open the `src/app/app-routing.module.ts` file, it should contain the following code: 

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppRoutingModule { }
```

This is a typical Angular module and we need to add routing configuration to it.

## Step 2 - Adding routing configuration

Let's now add the router configuration to the routing module. Start by importing `Routes` and `RouterModule ` from  `@angular/router` as follows:

```ts
import { Routes, RouterModule } from '@angular/router';
```

Next, define a `routes` array that will contain our routes as follows:

```ts
const routes: Routes = [];
```

Next, include call the `forRoot()` method of RouterModule withe routes array as argument as follows: 

```ts
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
```

Next, you need to add the router outlet to the app template. Open the `src/app/app.component.html` file and update it as follows:

````html
<router-outlet></router-outlet>
```

That's it we have configured the router in our Angular 9 project.

## Step 3 – Adding components to the router

Next, before see an exampe of how to redirect users to new paths or components, we need one or more components in our project. Head to your command-line interface and run the following commands:

```bash
$ ng generate component home
$ ng generate component about
```

Next, in the `src/app/app-routing.module.ts` file import the components as follows:
 
```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
```

Next, add the routes as follows:

```ts
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent }
  
];
```


So now if you visit the `/home` path you should go to home component and if you visit the `/about` path you should go to the about component.

## Step 4 - Redirect the empty path to the home path

Now that we have added routing to the home and about components, let's see how to redirect users to the `/home` path when they first visit our app from the empty path.

We simply need to add a new route that matches the empty path and redirect it to the `/home` path as follows:

```ts
const routes: Routes = [
  { path: '', pathMatch: ‘full’, redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent }
  
];
```  

Internally, the router uses a function called [applyRedirects](https://github.com/angular/angular/blob/master/packages/router/src/apply_redirects.ts#L56) to process redirects.

## Step 5 - Handle 404 (not found pages) using wildcard paths

Now, let's see ho to handle 404 not found page in Angular. Head back to your terminal and run the following command to generate a not found component:

```bash
$ ng generate component notfound
```

Next, open the `src/app/app-routing.module.ts` file and add these two routes:

```ts
const routes: Routes = [
  // [...]
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
  
];
```

Don't forget to import the component in the routing module as follows:

```ts
import { NotFoundComponent } from './notfound/notfound.component';
```

We use the wildcard path denoted by `**` to catch any non existing routes and we use the `redirectTo` property to redirect them to the `/404` path which maps to the not found component.

## Conclusion

In this tutorial, we've seen by example how to redirect users to different paths in your Angular app and how to handle 404 not found or invalid paths using wildcard paths.

We used the latest Angular 9 version as the time of the writing.
