---
layout: post
title: "Adding Routing to your Angular 8 App"
image: "images/content/angular.png"
excerpt: "Adding Angular Routing to your Angular 8 App" 
tags : [ angular , angular8, angular-9-router-examples, angular-9-tutorials ]
---

In the previous [tutorial](https://www.techiediaries.com/angular-tutorial), we’ve created our Angular 8 CRM application using Angular CLI, let’s now see how we can add routing and navigation to our application.

We’ll learn how we can set up routing manually using a Router Module and outlet, how to add routes to our components to the Router configuration and how to use the `redirectTo` property to redirect users to different routes. We’ll also see the difference between the `prefix` and `full` matching strategies and how to use the `routerLink` directive to create navigation links.   

## How to Set up Routing in Angular?

Routing can be easily added to a project. In fact, when we previously created our project using the CLI. We were prompted if we  **Would you like to add Angular routing? (y/N).** We answered by **y.** Angular router was setup in our project without having to add it manually.

## The Routing Module

Basically, the CLI will create a `src/app/app-routing.module.ts` file with the following content:


    import { NgModule } from '@angular/core';
    import { Routes, RouterModule } from '@angular/router';
    
    const routes: Routes = [];
    @NgModule({
      imports: [RouterModule.forRoot(routes)],
      exports: [RouterModule]
    })
    export class AppRoutingModule { } 

It’s an Angular module that imports a `RouterModule` with routes and exports a `RouterModule` . You only need to add your application routes in the `routes` array.

The `routes` array will contain all the routes of the application. After creating the components we'll now see how to add the routes to this array.

## The Router Outlet

The CLI will also add a router outlet to the `src/app/app.component.html` file:


    <router-outlet></router-outlet>

The Router outlet is where the Router inserts the component that matches the current route.


> **Note**: If you didn’t tell the CLI to automatically add routing to your project, you simply need to manually add routing module and the router outlet to your project to set up routing.   


## Adding Component Routes to The Router Configuration

Now, let's add components to our router configuration and navigation links in our template.

Open the `src/app/app-routing.module.ts` file and start by adding the following imports to the components:


    import { AccountListComponent } from './account-list/account-list.component';
    import { AccountCreateComponent } from './account-create/account-create.component';
    import { ContactListComponent } from './contact-list/contact-list.component';
    import { ContactCreateComponent } from './contact-create/contact-create.component';
    import { ActivityListComponent } from './activity-list/activity-list.component';
    import { ActivityCreateComponent } from './activity-create/activity-create.component';

## Adding a Redirect Route

For now, we want to redirect the visitor to the `/contacts` path when the home URL is visited so the first route we'll add is an empty path route:


    { path:  '', redirectTo:  'contacts', pathMatch:  'full' },

Here we used a combination of the `path` and `redirectTo` properties to create a route. The `path` property takes the string that represents the route’s segment that we need to match and the `redirectTo` property takes another path where the router should redirect the user.

 
## What’s the Path Match Strategy?

The `pathMatch` property specifies the matching strategy. The `full` value means that we want to fully match the path. We can also use the `prefix`  matching strategy which matches the path if the route starts with that path but doesn’t require to be exact match.


> **Note**: Be careful! If you don’t specify `full` as  the matching strategy with the empty path, all paths will be matched because every path starts with the empty string.

Next let's add the other paths:



      {
        path: 'accounts',
        component: AccountListComponent
      },
      {
        path: 'create-account',
        component: AccountCreateComponent
      },
      {
        path: 'contacts',
        component: ContactListComponent
      },
      {
        path: 'create-contact',
        component: ContactCreateComponent
      },
      {
        path: 'activities',
        component: ActivityListComponent
      },
      {
        path: 'create-activity',
        component: ActivityCreateComponent
      }

In these examples we used a combination of the `path` and `component` properties to create the routes.

We didn’t specify  a matching strategy with the `pathMatch` property which means the router will use the default strategy which is the `prefix` strategy.

This is a screenshot of our unstyled UI at ths point:

![Angular 8 Routing Example](https://www.diigo.com/file/image/bbccosoazobaopbbopzdrocqpsb/Ngsimplecrm8.jpg)  

In the next tutorial, we'll style this UI with Material Design.


## Adding Navigation Using `routerLink`

Let’s now see how we can add navigation using the `routerLink` directive 

Go ahead and open the `src/app/app.component.html` file where the router outlet exists and let’s add the navigation links before the router outlet:


    <a [routerLink]="'/accounts'"> Accounts </a>
    <a [routerLink]="'/create-account'"> Create Account </a>
    <a [routerLink]="'/contacts'"> Contacts </a>
    <a [routerLink]="'/create-contact'"> Create Contact </a>
    <a [routerLink]="'/activities'"> Activities </a>
    <a [routerLink]="'/create-activity'"> Create Activity </a>
    <div>
      <router-outlet></router-outlet>
    </div>


## Conclusion

In this tutorial, we’ve learned about Angular routing and we’ve added navigation to our simple CRM application.

See you in the next part where we’ll be adding Angular Material to our application to build a professional-looking UI.

