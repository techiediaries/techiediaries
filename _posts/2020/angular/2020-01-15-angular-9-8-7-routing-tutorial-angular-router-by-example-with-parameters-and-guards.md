---
layout: post
title: "Angular 9/8/7 Routing Tutorial: Angular Router by Example with Parameters and Guards"
image: "images/content/angular.png"
excerpt: "In this tutorial, you will learn to implement routing in Angular 9/8/7" 
tags : [  drafts ]
---

Angular provides a powerful router for creating apps with multiple views, parameters, guards, and navigation etc. In this tutorial, we'll see how to implement routing by example in Angular 9 but this also valid for previous versions such as Angular 7/8.


- Step 1: Setting up Routing in Angular 9/8/7
- Step 2: Adding Multiple Views/Pages or Configuring Angular Routes
- Step 3: Adding Navigation in Angular 
- Step 4: Using Angular Route Parameters
- Step 5: Using Angular Route Guards

Let's get started!

First, you need to have a few prerequisites if you intend to follow this tutorial step by step:

- A development environment with Node.js and npm installed,
- Angular CLI v9 installed or previous versions i.e v7/v8



## Step 1: Setting up Angular Routing 9/8/7

Starting with Angular 7, the CLI will allow to automatically set up routing without the hassle of creating and configuring a routing module.

So all you need is to start a new Angular 7+ project by running the following command in your command-line interface:

```shell
$ ng new angular-routing-example
```

You'll get prompted if you would like to add routing to your project - You need to answer by **Y** to automatically set up a [routing module](https://www.techiediaries.com/angular-router/) in your project.

For the stylesheets format, we'll pick **CSS** but you can go woth any choice as it doesn't affect how routing is done.

Next, you can start a a development server using the following commands: 

```bash
$ cd ./angular-routing-example
$ ng serve
```

You can access your app from the `http://localhost:4200` address using your web browser.

## Step 2: Adding Multiple Views/Pages or Configuring Angular Routes

Now that you have routing set up, you can add multiple pages or views with navigation.

In order to create a page, you need to use an Angular component so 
Lets create component and see how to use routing with it.

You can leave the previous command-line interface open for running the development server and head to a new one. Next, navigate to your project and run the   

```bash
$ cd ./angular-routing-example
$ ng generate component home  
$ ng generate component about
$ ng generate component contact
```

We have named the comonents to reflect their purposes. Each component can be configured as a new view in your application.

You can create a view by mapping a comonent to a URL path using the routes array of your router configuration.

Go ahead and open the `src/app/app-routing.module.ts` file and start by importing the previous components as follows:

```ts
import { NgModule } from '@angular/core';  
import { Routes, RouterModule } from '@angular/router';  

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
```

Next, you need to add `routes` to the routes array:

```ts
const routes: Routes = [  
    { path: 'home', component: HomeComponent },  
    { path: 'about', component: AboutComponent },  
    { path: 'contact', component: ContactComponent },  
];  

@NgModule({  
    imports: [RouterModule.forRoot(routes)],  
    exports: [RouterModule]  
})  
export class AppRoutingModule { }
```

Now we have three views which can be access from the `/home`, `/about` and `/contact` paths.

How does the router know where to render these components?

Via the router-outlet directive which is automatically inserted by Angular CLI when configured routing in the previous step in the `src/app/app/component.html` template.

This is the template associated with the root component of our application which is rendered by Angular when the app is started.

After adding the router outlet to the app component, it's can now be referred to as the app shell of our application.

You can add any navigation or static parts of your UI in the app shell. Let's, for example, add a navigation menu!


## Step 3: Adding Navigation in Angular 9

Open the `src/app/app.component.html` file and add the following markup on top of the `<router-outlet>` directive:

```html
<ul>
    <li><a [routerLink]="['/home']">Home</a></li>
    <li><a [routerLink]="['/about']">About</a></li>
    <li><a [routerLink]="['/contact']">Contact</a></li>
</ul>

<router-outlet></router-outlet>
```

In HTML, we use the href attribute of `<a>` elements to specif the target path but with Angular we use the `routerLink` directive to create navigation links.

This directive takes the path associated with the component to navigate to.


## Step 4: Using Angular Route Parameters

More often than not, we need to use routes with parameters in our application.

In Angular router, this is supported using using the colon syntax. 

Head back to your command-line interface and create a new component:

```bash
$ ng generate component posts
```

Next, go back to the `src/app/app-routing.module.ts` file and import then create a route for the new component:

```ts
import { NgModule } from '@angular/core';  
import { Routes, RouterModule } from '@angular/router';  

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PostsComponent } from './posts/posts.component';

const routes: Routes = [  
    { path: 'home', component: HomeComponent },  
    { path: 'about', component: AboutComponent },  
    { path: 'contact', component: ContactComponent }, 
    { path: 'posts/:id', component: PostsComponent}

];  

@NgModule({  
    imports: [RouterModule.forRoot(routes)],  
    exports: [RouterModule]  
})  
export class AppRoutingModule { }
```

We added a route that accepts an `id` parameter using the `:id` syntax.

Now, we can go to paths like `/posts/1`, ..., or `/posts/2abc` and we can actually access the passed ID in the `PostsComponent`.

You can retrieve the parameter from the URL path using the `ActivatedRoute` service which is available from the  `@angular/router`  package.

Open the `src/app/posts/posts.component.ts` file and start by importing `ActivatedRoute` and `Router` as follows:

```
import { ActivatedRoute, Router } from '@angular/router';
```

Next, you need to inject ActivatedRoute via the component constructor as follows:

```ts
constructor(private activatedRoute: ActivatedRoute) { }
```

Next, you can retrive the ID parameter as follows:


```ts
ngOnInit() {
    console.log(this.activatedRoute.snapshot.params['id'])
}
```

## Step 5: Using Angular Route Guards

Angular Router enables us to protect/guard routes from user navigation using route guards.

A route guard allows you to run some code when a route is being navigated to, and based on that, it grants or denies access to the route.

You can create a route guard by extending of the `CanActivate` interface exported from the `@angular/router` package and overriding the `canActivate()` method which needs to contain the code that grants or denies access to a certain route once we apply the guard to it.

Head back to your command-line interface and run the following command to create a route guard:


```bash
$ ng generate guard login
```

This will create  `LoginGuard` class with the  `canActivate`  method where you need to add some code that returns either true or false which grants or denies access to a route.

Next, go back to the routing module in the `src/app/app-routing.module.ts` file and apply the guard to some route that you want to protect. For example:

```ts
import { LoginGuard } from './login/login.guard';

const routes: Routes = [  
    { path: 'home', canActivate:[LoginGuard], component: HomeComponent },  
    { path: 'about', canActivate:[LoginGuard], component: AboutComponent },  
    { path: 'contact', canActivate:[LoginGuard], component: ContactComponent }, 
    { path: 'posts/:id', canActivate:[LoginGuard], component: PostsComponent}

]; 
```

We import the guard class and we apply it to all the routes using the `canActivate` property.

## Conclusion

In this tutorial, we have seen how to automatically set up routing with Angular 9/8/7 and the basics of the router.