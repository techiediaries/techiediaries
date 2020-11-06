---
layout: post
title: "Routing with Angular 11 Router: Full-Tutorial & App by Example"
image: "images/content/angular.png"
excerpt: "In this tutorial part, we’ll learn about Angular Router by example and will teach you everything you need to start using Angular routing to build Single Page Applications" 
date: 2020-11-05
tags : [ angular , angular-10 ]
author: ahmed
---

![Angular Router](https://www.techiediaries.com/images/angular-router.png)

In this tutorial, we’ll learn about the Angular Router by building an Angular 11 example and will teach you everything you need to start using routing to build Single Page Applications with navigation, guards, resolvers, and animations.

We'll learn how to use multiple outlets, redirect users from the empty path, use wild-card paths to implement 404 error pages and lazy load modules using the `loadChildren()` method.


> **Note**: This tutorial works with all Angular 6, 7, 8, 9, 10 and the new Angular 11 version.

## Navigation and Routing Using the Angular 11 Router With Example

Now let’s get started with Angular routing. In this section, we’ll learn the basic concepts behind routing in Angular 11. We’ll introduce the Angular Router and then we’ll proceed to create a simple single page application with Angular 11 that demonstrates the commonly used features of the router. 

In more details, you’ll learn about:


- How to create Angular projects using Angular CLI v11,
- How to choose to have routing automatically setup and also how to manually add it in your project,
- How to create Angular services and emulate a backend server that you can use to fetch data using `HttpClient`,
- How to create Angular components,
- How to add component routing in your application using the router.
- How to import the necessary Angular built-in APIs to implement component routing and navigation,
- How to create the routing module and import it in the main application module,
- How to add routes to components,
- How to use single and multiple router outlets,
- How and when to use wild card routes,
- How to use `routerLink` for navigation,
- How to [use nested and child routes](https://www.techiediaries.com/angular-course-child-routes/),
- How to get route parameters,
- How to protect routes with guards,
- How to use resolvers.
- How to add animations, 
- How to lazy-load modules using the `loadChildren()` method, etc.

These are the steps of first section:

-    Step 1: Creating an Angular 11 Project
-    Step 2: Understanding what the CLI Automatically Did For You
-    Step 2.1: Adding `<base href>` 
-    Step 2.2: Creating a Routing Module
-    Step 2.2: Importing the Router and Setting up Routing
-    Step 2.3: Adding the Router-Outlet
-    Step 2.4: Importing the Routing Module in the Main Application Module
-    Step 3: Setting up a Service for Getting Data
-    Step 4: Creating a Model
-    Step 5: Creating Components
-    Step 6: Implementing The Product List Component
-    Step 7: Implementing the Product Details Component
-    Step 8: Defining the Routes
-    Step 10: Adding Navigation Links


## Introducing the Angular Router 

The Angular router is an essential element of the Angular platform. It allows developers to build **Single Page Applications** with multiple states and views using routes and components and allows client side navigation and routing between the various components. It’s built and maintained by the core team behind Angular development and it’s contained in the `@angular/router` package. 

You can use the browser's URL to navigate between Angular components in the same way you can use the usual server side navigation.

Angular Router has a plethora of features such as:


- The support for multiple Router outlets which helps you easily add complex routing scenario like nested routing, 
- Various path matching strategies ( `prefix` and `full`) to tell the Router how to match a specific path to a component,
- Easy access to route parameters and query parameters,
- Resolvers,
- Lazy loading of modules,
- Route guards for adding client side protection and allow or disallow access to components or modules, etc.

Angular 11 provides a powerful router that allows you to map browser routes to components. So let's see how we can add routing to applications built using Angular 11.

In this section, you’ll learn about various concepts related to Angular routing such as:


- The Components, routes and paths,
- The router outlet,
- The route matching strategies,
- Route parameters,
- Query parameters,
- Route guards,
- Route resolvers,
- The `routerLink` directive (replaces the `href` attribute),
- Auxiliary routes,
- Primary and secondary router outlets.

Angular applications are built as a hierarchy of components (or a tree of components) that communicate with each other using inputs and outputs. A component controls a patch of the screen which is rendered using the component’s template specified as a meta information in the `@Component` decorator.


> A [`@Component`](https://angular.io/api/core/Component) decorator marks a class as an Angular component and provides configuration metadata that determines how the component should be processed, instantiated, and used at runtime.

In component-based applications such as Angular applications, a screen view is implemented using one or more components.

> Routing in Angular is also refereed to as component routing because the Router maps a single or a hierarchy of components to a specific URL.

### Routes and Paths

In Angular, a **route** is an object (instance of [Route](https://angular.io/api/router/Route)) that provides information about which component maps to a specific path. A **path** is the fragment of a URL that determines where exactly is located the resource (or page) you want to access. You can get the path by taking off the domain name from the URL. 

In Angular you can define a route using route configurations or instances of the [Route](https://angular.io/api/router/Route) interface.  

A collection of routes defines the router configuration which is an instance of  [Routes](https://angular.io/api/router/Routes).

Each route can have the following properties:


- `path` is a string that specifies the path of the route.
- [`pathMatch`](https://angular.io/api/router/Route#pathMatch) is a string that specifies the matching strategy. It can take `prefix` (default) or [`full`](https://angular.io/api/core/Version#full). 
- `component` is a component type that specifies the component that should be mapped to the route.
- [`redirectTo`](https://angular.io/api/router/Route#redirectTo) is the URL fragment which you will be redirected to if a route is matched.

These are the commonly used properties of routes but there are many others. You can find the rest of properties from the [official docs](https://angular.io/api/router/Routes#description).

For example, this is the definition of a route that maps the `/my/path/` path to the `MyComponent` component:


    { path: 'my/path/', component: MyComponent }

The path can be the empty string which usually refers to the main URL of your application or can be also a **wildcard** string (`**`) which will be matched by the router if the visited URL doesn’t match any paths in the router configuration. This is usually used to display a **page doesn’t exist** message or redirect the users to an existing path.
  
### Route Matching Strategies

The Angular router has a powerful matching algorithm with various built-in and custom matching strategies.

The builtin matching strategies are **prefix** (the default) and **full.** 
 
When the matching strategy of a route is **prefix**, the router will simply check if the start of the browser’s URL is prefixed with the route’s path. If that’s the case, it will render the related component.
 
This is not always the wanted behavior. In some scenarios, you want the router to match the full path before rendering a component. You can set the full strategy using the `pathMatch`  property of a route. For example:


    { path: 'products', pathMatch: 'full', component: ProductListComponent} 

  
A full strategy ensures that the path segment of browser’s URL equals exactly the route’s path.

A special case of using the `full` property is when you want to match the empty path. Because using the `prefix` strategy will match all paths since the empty path prefixes all paths.

For example, we want to redirect the user to the `/products`  route when they visit our application. This is how our route configuration should look like:


    { path: '',  redirectTo: '/products', pathMatch: 'full' }

You can also use custom matcher if the combination of the path property and matching strategy doesn’t help you match your component to a specific URL.

You can provide a custom matcher using the `matcher` property of a route definition. For an example, see [UrlMatcher](https://angular.io/api/router/UrlMatcher#description).
   
### Route Parameters

Dynamic routes are often used in web applications to pass data (parameters) or state to the application or between various components and pages. The Angular router has support for dynamic paths and provides an easy to use API to access route parameters.

You can define a route parameter using the colon syntax followed by the name of the parameter. For example:


      {path: 'product/:id' , component: ProductDetailComponent}

In the example, `id` is the route parameter. `/product/1`, `/product/2`, `/product/p1`  … are examples of URLs that will be matched via this route definition. 

The last segment of these URLs are the values of the `id`  parameter that will be passed to `ProductDetailComponent`. 

In your matched components, you can access the route parameters using various APIs:
 

- Using the [ActivatedRoute](https://angular.io/api/router/ActivatedRoute) service,
- Using the [ParamMap](https://angular.io/api/router/ParamMap) Observable available starting with Angular 4.

   

### Angular Route Guards

Route guards enables you to allow or disallow access to your specific application routes based on some criteria (for example if the user is logged in or not).

You can also use a guard to prevent users from leaving a component depending on some conditions (for example if a form is not submitted yet and data can be lost).
 
You can use Angular guards to protect components or complete modules.

To protect a route, you first need to create a guard by sub-classing the [`CanActivate`](https://angular.io/api/router/CanActivate) interface and overriding the `canActivate()` method which needs to return a Boolean value (`true` means access is allowed) and add it to route definition via the `canActivate` attribute. For example:


    { path:  'product/:id, canActivate:[ExampleGuard], component:  ProductDetailComponent}

This is an example implementation of `ExampleGuard`:


    class MyGuard implements CanActivate {
      canActivate() {
        return true;
      }
    }

Since the `canActivate()` method will always return `true`, this guard will always allow access to `ProductDetailComponent`.


### The Router Outlet

The [`Router-Outlet`](https://angular.io/api/router/RouterOutlet) is a directive exported by `RouterModule` and acts as a placeholder that indicates to the router where it needs to insert the matched component(s). The component that has the router outlet is refereed to as the **application shell:**


    <router-outlet></router-outlet>

The Angular router supports more that one outlet in the same application. The main (or top-level) outlet is called the **primary outlet.**  Other outlets are called **secondary outlets**.

You can specify a target outlet for a route definition using the `outlet` attribute.

### The Navigation Directives

Angular Router provides two directives for navigation: The `routerLink` directive which replaces the `href`  attribute in the `<a>` tags to create links and `routerLinkActive` for marking the active link.  For example:

{% raw %}
    <a [routerLink]="'/products'">Products</a>
{% endraw %}

##    Step 1: Creating a Angular 11 Project

To show you how to use Angular routing to build a frontend application with multiple screen views, we’ll create an Angular 8 project from scratch using Angular CLI 8.


> **Note:** Please make sure you have Angular CLI 8 installed on your development machine to generate Angular 8 projects.
> 
> [Angular CLI](https://www.npmjs.com/package/@angular/cli) requires you to have **Node 10+** with **NPM** installed on your machine so without these dependencies you will not be able to install the CLI on your machine. You can easily head to the [official website](https://nodejs.org/en/download/) and download the right binaries for your operating system or follow the appropriate documentation for how to install a recent version of Node.js in your system.
> 
> As the time of this writing **Angular CLI 8.0.1** is installed (`npm install -g @angular/cli`)

Open a new terminal on your system, navigate to where you want to create your project and run this command:
 

    $ ng new angular-routing-demo


Before proceeding to generate the project, the CLI will prompt you if:


- **Would you like to add Angular routing?** The default answer is No so type **y** to tell the CLI to install the `@angular/router` package in the project and generate a `src/app/app-routing.module.ts` file and will also add a `<router-outlet>` in the `src/app/app.component.html` file which will the shell of our Angular application. In previous versions of Angular CLI, you would need to create this file manually.  


- **Which stylesheet format would you like to use?** (Use arrow keys) CSS, Sass, Less or Stylus. Choose CSS and hit **Enter.** 

The CLI will generate the directory structure and the necessary files and will also install the project’s dependencies from npm then gives you control back.


> **Note**: You can also pass a `--``routing` option to the `ng new angular-routing-demo`  command to tell to add routing in your project without prompting you. This option is also helpful  if you are creating apps with `ng new app` or modules with `ng new module` and want to automatically setup routing and include a routing module file. 

##    Step 2: Understanding what the CLI Automatically Did For You

Angular CLI has configured routing in your project and all you have to add is to define route-component mappings after your create your application components but it helps to understand how what steps the CLI has done to setup routing.

If you would like to manually add routing in your application or module, these are the necessary steps you would need to follow:

##    Step 2.1: Adding `<base href>` 

First, you would need to open the `src/index.html` file and add a `<base>` tag as a child of the `<head>` tag ****which allows the router to figure out how to compose navigation paths. This is how the `index.html` looks like:

{% raw %}
    <!doctype html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Angular Routing Demo</title>
      <base href="/">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="icon" type="image/x-icon" href="favicon.ico">
    </head>
    <body>
      <app-root></app-root>
    </body>
    </html>
{% endraw %}

The `<base href>` tag is not specific to Angular Router. It’s an [HTML tag](https://www.w3schools.com/tags/tag_base.asp) which specifies the base URL for all relative URLs in the page. 

##    Step 2.2: Creating a Routing Module

Next, you would need to create a routing module inside the main application module and in its own file using a command like this:


    $ ng generate module app-routing --module app --flat

The `--flat` option tells the CLI to generate a flat file without a subfolder. This way the `app-routing.module.ts` file will be created in the `src/app` folder along with the `app.module.ts` file. This is the content of this module before setting up routing:


    import { NgModule } from '@angular/core';
    import { CommonModule } from '@angular/common';
    @NgModule({
      declarations: [],
      imports: [
        CommonModule
      ]
    })
    export class AppRoutingModule { }

This is a regular module decorated by the `NgModule` decorator and imports `CommonModule` .


> **Note**: `CommonModule` is a built-in Angular module that exports all the basic Angular directives and pipes, such as [`NgIf`](https://angular.io/api/common/NgIf), [`NgForOf`](https://angular.io/api/common/NgForOf), [`DecimalPipe`](https://angular.io/api/common/DecimalPipe), etc.

##    Step 2.2: Importing the Router and Setting up Routing

Next, you would need to open the `src/app/app-routing.module.ts` file **and update it as follows:**


    import { NgModule } from '@angular/core';
    import { Routes, RouterModule } from '@angular/router';
    const routes: Routes = [];
    @NgModule({
      imports: [RouterModule.forRoot(routes)],
      exports: [RouterModule]
    })
    export class AppRoutingModule { }

 
We import the `Routes` and `RouterModule` symbols from the `@angular/router` package which is the central repository that holds all the Router APIs.

Next, we declare a routes variable of the `Routes` type.

Next, we import `RouterModule` via the `imports` array of our routing module and we pass in the `routes` array to `RouterModule` via the `forRoot()` method.

And finally, we export `RouterModule` from our routing module by adding it to the `exports` array.

As you see, the `AppRoutingModule` is merely a wrapper around an instance of  `RouterModule` (returned from the static `forRoot()` method) which feeds it the `routes` configuration object. It’s now empty but you will add routes to it once you create the components of your application.


> **Note**: `RouterModule` is a built-in routing module that exports the Router service and the directives necessary for routing such as [RouterLink](https://angular.io/api/router/RouterLink), [RouterLinkActive](https://angular.io/api/router/RouterLinkActive), [RouterLinkWithHref](https://angular.io/api/router/RouterLinkWithHref) and [RouterOutlet](https://angular.io/api/router/RouterOutlet). 

From the [Angular docs](https://angular.io/api/router/RouterModule):

The `forRoot()`  static method creates a module that contains all the directives, the given routes, and the router service itself.

In some situations (for submodules and lazy loaded submodules), you would need to use the `forChild()` static method instead which creates a module that contains all the directives and the given routes, but does not include the router service.

For more details about the difference between the two methods check out [RouterModule.forRoot(ROUTES) vs RouterModule.forChild(ROUTES)](https://stackoverflow.com/questions/40498081/routermodule-forrootroutes-vs-routermodule-forchildroutes)

## Step 2.3: Adding the Router-Outlet

After setting up the routing module, next you would need to add the router outlet in your main application component. Open the `src/app/app.component.html`, this is how it looks like:

{% raw %}
    <div style="text-align:center">
      <h1>
        Welcome to {{ title }}!
      </h1>
      <!-- [...] -->
    <router-outlet></router-outlet>
{% endraw %}

The important thing you need to focus on is  `<router-outlet>`.

The [`RouterOutlet`](https://angular.io/api/router/RouterOutlet) is a built-in Angular directive that gets exported from the `@angular/router` package, precisely `RouterModule` and it’s a placeholder that marks where in the template, the router can render the components matching the current URL and the routes configuration passed to the Router.


> **Note**: The component that contains the router outlet acts like a shell of your application.


## Step 2.4: Importing the Routing Module in the Main Application Module

Finally, you would need to import  `AppRoutingModule` in your main application module which resides in the `src/app/app.module.ts` file. If you open that file, this is how it looks:


    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { AppRoutingModule } from './app-routing.module';
    import { AppComponent } from './app.component';
    @NgModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        AppRoutingModule
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule { }

We import `AppRoutingModule` from `./app-routing.module` and add it the `imports` array of `AppModule`.

That’s it! We’ve seen all the steps that you would need to do by yourself if routing isn’t automatically setup by Angular CLI when you generated your project.


## Step 3: Setting up a Service for Getting Data

This is not part of how routing works in Angular but for the purpose of our demo application we’ll need to create a service that can be used to get some data to display in our application components. Since we don’t have a backend project which supplies us with data, we can a very useful feature of Angular —  the In-Memory Web API available from the [`angular-in-memory-web-api`](https://github.com/angular/in-memory-web-api) package.

This module simulates a backend web application by intercepting the requests from `HttpClient` and redirects them to a memory store that you need to create and supply some data in it. 

Later when you have a real backend you can simply remove the In-Memory Web API module and all your requests will go to the real backend.

First, let’s start by installing the package from npm using the following command in your terminal:


    $ npm install --save angular-in-memory-web-api

Next, let’s create the service that will return the simulated data. In your terminal, run the following command:


    ng generate service data 

Open the `src/app/data.service.ts` file and import `InMemoryDbService` from the `angular-in-memory-web-api` package:


    import { InMemoryDbService } from 'angular-in-memory-web-api';

`DataService` must implement `InMemoryDbService` and override the `createDb()` method:


    import { Injectable } from '@angular/core';
    import { InMemoryDbService } from 'angular-in-memory-web-api';
    
    @Injectable({
      providedIn: 'root'
    })
    export class DataService implements InMemoryDbService{
      constructor() { }
      createDb(){
        
        let  products =  [
          {  id:  1,  name:  'Product 1' },
          {  id:  2,  name:  'Product 2' },
          {  id:  3,  name:  'Product 3' },
          {  id:  4,  name:  'Product 4' },
          {  id:  5,  name:  'Product 5' }      
        ];
     
        return { products };
         
       }
    }
    

The only `requirement` is that each object in the data array should have a unique `id`

Next, you need to import `InMemoryWebApiModule`  and `DataService` in the `src/app/app.module.ts` file and add them in the `imports` array:


    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { AppRoutingModule } from './app-routing.module';
    import { AppComponent } from './app.component';
    import { HttpClientModule } from "@angular/common/http";
    import { InMemoryWebApiModule } from "angular-in-memory-web-api";  
    import { DataService } from "./data.service";
    
    @NgModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        HttpClientModule,
        InMemoryWebApiModule.forRoot(DataService),
        AppRoutingModule
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule { }
    

We also imported `HttpClientModule` because we’ll need to `HttpClient` to send API requests.

Next, create another service for working with products. In your terminal, run:


    $ ng generate service product 

Next, open the `src/app/product.service.ts` file and update accordingly:


    import { Injectable } from '@angular/core';
    import { HttpClient } from "@angular/common/http";
    
    @Injectable({
      providedIn: 'root'
    })
    export class ProductService {
      API_URL: string = "api/";
      
      constructor(private httpClient: HttpClient) { }
      
      getProducts() {
        return this.httpClient.get(this.API_URL + 'products')
      }
      
      getProduct(productId) {
        return this.httpClient.get(`${this.API_URL + 'products'}/${productId}`)
      }
    }
    

We added the `API_URL` string that holds the address of the API server. 

Next, we imported and injected `HttpClient`  and finally we defined the two `getProducts()` and `getProduct(productId)` methods.


## Step 4: Creating a Model

Next, let’s create a `P`roduct class that will act as a data model for the product type. In your terminal, run:


    $ ng generate class product

Open the  `src/app/product.ts` file and add the following code:


    export class Product {
        id: number;
        name: string;
        constructor(id: number, name: string) {
            this.id = id;
            this.name = name;
        }
    }

## Step 5: Creating Components

Now that you have a project with routing setup and data services created, you need to create the components of your application. You can easily generate components using the Angular CLI. 

Head back to your terminal and run the following commands:


    $ ng generate component product-list
    $ ng generate component product-detail

We create two components. The product list component which displays a list of products. When you click on a specific product you'll be taken to the product detail component which displays that single product.

## Step 6: Implementing The Product List Component

Now let's add an implementation for `ProductListComponent`. 

Open the `src/app/product-list/product-list.component.ts` file update it accordingly


    import { Component, OnInit } from '@angular/core';
    import { ProductService } from "../product.service";
    import { Product } from "../product";
    
    @Component({
      selector: 'app-product-list',
      templateUrl: './product-list.component.html',
      styleUrls: ['./product-list.component.css']
    })
    export class ProductListComponent implements OnInit {
      products: Product[] = [];
      
      constructor(private productService: ProductService) { }
      ngOnInit() {
        this.productService.getProducts().subscribe((products: Product[])=>{
          this.products = products;
          console.log(products);
        })
      }
    }
    

We import `ProductService` and `Product` from their respective paths.

Next we define a `products` variable of type `Product[]` and we initialize it with an empty array.

Next, we inject `ProductService` as `productService` via the component constructor.

Finally on the `ngOnInit()` life-cycle event of the component we subscribe to the Observable returned from calling the `getProducts()` method and we assign the fetched products to the `products` array. 

Now let's display the list of products in the `src/app/product-list/product-list.component.html` file using the following code:

{% raw %}
    <div>
      <h1>
        Products
      </h1>
      <ul>
        <li *ngFor="let product of products">
          {{ product.name }}
        </li>
      </ul>
    </div>
{% endraw %}

We simply use an Angular  `ngFor` directive to iterate over the `products` array and display each product’s name.

## Step 7: Implementing the Product Details Component

Let's also implement the product detail component. 

Open the `src/app/product-detail/product-detail.component.ts` file and add the following code:


    import { Component, OnInit } from '@angular/core';
    import { ProductService } from "../product.service";
    import { Product } from "../product";
    
    @Component({
      selector: 'app-product-detail',
      templateUrl: './product-detail.component.html',
      styleUrls: ['./product-detail.component.css']
    })
    export class ProductDetailComponent implements OnInit {
      product: Product = new Product(-1,'No Product');
      constructor(private productService: ProductService) { }
      ngOnInit() {
        this.productService.getProduct(1).subscribe((product: Product) =>{
          this.product = product;
        })
      }
    }
    

We import `ProductService` and `Product` from their paths.

Next, we define a product variable of type `Product`  that will hold a product and we initialize it with a non existent product.

Next, we inject `ProductService` as `productService`.

Finally, on the `ngOnInit()` event, we call the `getProduct()` method of `ProductService`  to retrieve a product with id 1 and assign it to the `product` variable.

We are creating a *product* variable which will hold the product to display in the template. For now, it holds the product with the hard-coded id 1 but later we'll see how we can use the route parameter as a source to get the appropriate product by *id* to store in this variable.

Now open the  `src/app/product-detail/product-detail.component.html` and add the following code:

{% raw %}
    <div>
      <h1>
        Product #{{product.id}}
      </h1>
      <p>{{ product.name }}</p>
    </div>
{% endraw %}

## Step 8: Defining the Routes

After creating and implementing the components of our application, now you need to add them to the router.

Open the `src/app/app-routing.module.ts` file and start by importing your components:


    import { ProductListComponent } from "./product-list/product-list.component";
    import { ProductDetailComponent } from "./product-detail/product-detail.component";  

Next, add the following object to the `routes` array:


      {path: 'products' , component: ProductListComponent},

This first route links the `/products` path to `ProductListComponent`  so when the `/products` URL is visited, the router will render the product list component.

Next, add the second route:


      {path: 'product/:id' , component: ProductDetailComponent}

This will link routes with dynamic IDs like `/product/1` or `/product/9` etc. to `ProductDetailComponent`.


> **Note:** Please note that at this point  ****`ProductDetailComponent` is linked to the dynamic `product/:id` path but doesn’t have the logic to get the value of the id from the route. This will be handled in the next tutorial.

 
We can also add this route which will redirect the empty route to `/products` so whenever the user visits the empty path they will be redirected to the products component:


    { path: '',  redirectTo: '/products', pathMatch: 'full' },

**pathMatch** is used to specify the matching strategy **full** or **prefix**. **full** means that the whole URL's path needs to match by the matching algorithm. **prefix** means the first route where path matches the start of the URL will be chosen. In the case of empty paths if we don't set the **full** matching strategy then we won't get the desired behavior as any path starts with an empty string.


## Step 9: Adding Navigation Links

The last thing you need to do is to add the navigation links that take you from one component to another. 

Angular provides the `routerLink` and `routerLinkActive` directives that need to be added to the `<a>` anchors. 


- The `routerLink` directive needs to used instead of the `href` attribute.
- The `routerLinkActive` directive is used to add a CSS class to an element when the link's route becomes active.

Open the `src/app/product-detail/product-detail.component.html` file and add a link to navigate to the list of products:


    <a [routerLink] = "'/products'">
      Go to Products List
    </a>

Next, open the `src/app/product-list/product-list.component.html` file and add a link to each product to take you to the product details component:

{% raw %}
    <div>
      <h1>
        Products
      </h1>
      <ul>
        <li *ngFor="let product of products">
          <a routerLink= "/product/{{product.id}}">
          {{ product.name }}
          </a>
        </li>
      </ul>
    </div> 
{% endraw %}


### Wrap-up

This is the end of this first section to learn Angular routing with Angular 11 (most of it is also valid for version 10 or previous versions). 

We have learned about the basic concepts of client side routing, next we’ve seen the basic concepts of the router and finally created a Single Page Application with basic building such as components, services and modules.

We have seen how you can automatically set up routing in your Angular 11 application using the CLI v11 and how you can simulate a backend server using the In-memory Web API without actually having a backend server.
  
In the next section, we'll see how we can access route parameters in our components. 

## Route Parameters with Snapshot and ParamMap

In this section, we're going to see how to handle route parameters with Angular 11 Router example using different methods: Snapshot and ParamMap Observable.

Angular provides a powerful router library that allows developers to implement advanced functionality in their Angular applications, beside basic component routing, such as:

- Route protection using guards,
- Route parameters, 
- Child routes,
- Auxiliary routes etc.

### Handling Route Parameters with Angular 11
 
In the previous [tutorial](https://www.techiediaries.com/angular-router), we have created a basic routing between components with the Angular Router. In this tutorial we're going to see how to handle route parameters in Angular 11.

We are going to start from the simple Angular application we've build in the previous tutorial which you can find from this [repository](https://github.com/techiediaries/angular-router-demo) or in [CodeSandBox](https://codesandbox.io/s/github/techiediaries/angular-router-demo)

This is the implementation of the `ProductDetailComponent`:

```ts
import { Component, OnInit } from "@angular/core";
import { Product } from "../models/product";
@Component({
  selector: "product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: []
})
export class ProductDetailComponent implements OnInit {
  

  public products: Product[] = [
    new Product(1, "Product 001"),
    new Product(2, "Product 002"),
    new Product(3, "Product 003"),
    new Product(4, "Product 004"),
    new Product(5, "Product 005"),
    new Product(6, "Product 006"),
    new Product(7, "Product 007"),
    new Product(8, "Product 008")
  ];
  product: Product = this.products[0];// this will store the current product to display	

  constructor() {}
  ngOnInit() {
  }
}
```  

### An Angular Route with a Parameter Example

In the previous tutorial, we've added this route object in our router configuration:

```ts
  { path: "product/:id", component: ProductDetailComponent }
```

The `:id` placeholder (called dynamic router parameter) means that the `ProductDetailComponent` component will be activated when the user visits any path that matches this expression: `/product/[0-9|a-b|A-B]+`.

The Angular Router will also allow you to retrieve the value of `:id` from the activated component (i.e in this case `ProductDetailComponent` ) so let's see how?

### How to Get Route Parameters

The Angular Router provides two different methods to get route parameters:

- Using the route snapshot,
- Using Router Observables

### Navigation Using The RouterLink Directive with Parameters

Open `src/app/product-list/product-list.component.html` then change the list of products to use anchor tags with the `routerLink` directive to be able to navigate the `ProductDetailComponent` component.

```html
<h1>Products List</h1>

<ul>
  <li *ngFor="let product of products">
    <a [routerLink]="['/product',product.id]">{{product.name}}</a>
  </li>
</ul>
```

You can also create links using:

```html
<a routerLink="/product/{{product.id}}">{{product.name}}</a>
```

After creating the links with parameters. We can now proceed to see how we can retrieve the `id` parameter from the URL in the `ProductDetailComponent`.

The Angular Router provides the [ActivatedRoute](https://angular.io/api/router/ActivatedRoute) class that can be injected in the component. So first start by importing it using:

```typescript
import { ActivatedRoute } from '@angular/router';
```

Next, you need to inject this class in the component via the constructor:

```typescript
  constructor(private route: ActivatedRoute) {}
```

In the `ngOnInit` life-cycle method of the component we'll add the necessary code to grab the route parameter by subscribing to the `params` map or `paramMap` (instance of [ParamMap](https://angular.io/api/router/ParamMap), available only in Angular 4+) of the injected instance:

```typescript
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.products.forEach((p: Product) => {
        if (p.id == params.id) {
          this.product = p;
        }
      });
    });
  }
```

After subscribing to the `paramMap` we grab the parameters by their names in the path object (i.e in our case `id`) `params.id`. The rest of the code is just iterating over the products array to find the corresponding product to display via its *id*.

You can also use the *snapshot* object of the `ActivatedRoute` instance: `this.route.snapshot.params.id`

```typescript
  ngOnInit() {
      this.products.forEach((p: Product) => {
        if (p.id == this.route.snapshot.params.id) {
          this.product = p;
        }
      });
    
  }
```  

### Wrap-up

The Angular Router allows you to easily retrieve parameters from the URL which is an essential functionality that is required by most web applications. You can use both ways: the `paramMap` observable or the snapshot way but the latter requires you to be careful when re-using components. 

## The Angular 11 RouterLink, Navigate and NavigateByUrl

In the previous sections, we've seen how to use basic routing between components and how to handle route parameters using different methods. We've also seen how to use the `RouterLink` directive to create route links. This section continues from the previous section with the other methods to implement navigation.

### RouterLink Example with Angular 11

Let's give a second look at how we used the `RouterLink` directive in the previous tutorial(s). 

We created basic links using:

```html
<a routerLink="/">Go To Home</a>
``` 

Or also:

```html
<a [routerLink]="'/'">Go To Home</a>
``` 

We then created a link with a parameter using:

```html
<a [routerLink]="['/product/',product.id]">{{product.name}}</a>
```

### Navigating Programatically Using Angular 11 `Router.navigate()` and `Router.navigateByUrl()`

The Angular 11 Router provides two methods that you can use to navigate to other components in your component class instead of using the `RouterLink` directive in the template. The two methods are `navigate()` and `navigateByUrl()` and they can be useful in multiple situations where you need to trigger navigation via code. They return a promise that resolves to true or false.

`navigateByUrl()`  takes a string as a parameter.  `navigate()`  takes an array of URL segments.

So let's modify our previous Angular application to navigate using one of these methods. Go ahead and open `src/app/product-list/product-list.component.ts` then first import and inject the Router class:

```ts
import { Component } from "@angular/core";
import { Product } from "../models/product";
import { Router } from "@angular/router";

@Component({
  selector: "product-list",
  templateUrl: "product-list.component.html"
})
export class ProductListComponent {
  public products: Product[] = [
    new Product(1, "Product 001"),
    new Product(2, "Product 002"),
    new Product(3, "Product 003"),
    new Product(4, "Product 004"),
    new Product(5, "Product 005"),
    new Product(6, "Product 006"),
    new Product(7, "Product 007"),
    new Product(8, "Product 008")
  ];

  constructor(private router: Router){}

}
``` 

Next add the *gotoProductDetails()* method which takes an *url* and *id* parameters which they are passed as an array of segments to the `navigate()` method:

```ts
public gotoProductDetails(url, id) {
    this.router.navigate([url, id]).then( (e) => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
}
```

You can also build a string from these parameters and  use `navigateByUrl()`:

```ts
  public gotoProductDetailsV2(url, id) {

    var myurl = `${url}/${id}`;
    this.router.navigateByUrl(myurl).then(e => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }
```

Next open the component template in `src/app/product-list/product-list.html` then add a button and bind its *click* action to one of the previous methods:

```ts
 <button (click)="gotoProductDetails('/product',product.id)">Go To Details</button>
```

This is the whole template:

```html
<h1>Products List</h1>

<ul>
	<li *ngFor="let product of products">
		<a [routerLink]="['/product/',product.id]">{{product.name}}</a> <button (click)="gotoProductDetails('/product',product.id)">Go To Details</button>
	</li>
</ul>
<a routerLink="/">Go To Home</a>
```

<iframe src="https://codesandbox.io/embed/8p3r7o1q2" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>


### Wrap-up

In this tutorial, we've seen different methods to implement navigation with the Angular 11 Router i.e using the `routerLink` directive with the anchor tags in components HTML template or using `Router.navigate()` and `Router.navigateByUrl()` methods in situations where you want to navigate in the component class. 

## Named and Multiple Outlets (Auxiliary Routes) Example

In the previous sections, we've seen the basics of the Angular 11 Router. We've seen how to configure the Angular router and how to add routes. 

So, you now understand how to add routing to your Angular 11 application to create an SPA (Single Page Application) and also how to link to different routes using `RouterLink` and `RouterLinkActive`. You also understand how to use the router outlet (`<router-outlet>`).  The Router outlet is a placeholder that gets filled dynamically by Angular, depending on the current router state.  We've used the Router outlet to create basic routing. Now, we'll see advanced uses of the `<router-outlet>` component such as named, multiple outlets and auxiliary routing.

This is the application we'll be building:

<iframe src="https://codesandbox.io/embed/github/techiediaries/angular-router-demo/tree/master/" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>


### How to Create a Named Router Outlet?

You can create a named Router outlet using the *name* property of the `<router-outlet>` component:

```html
<router-outlet  name="outlet1"></router-outlet>
```

### How to Create Multiple Router-Outlets?

You can have multiple outlets in the same template:

```html
<router-outlet></router-outlet>  
<router-outlet  name="sidebar"></router-outlet>  
```

- The unnamed outlet is the primary outlet. 
- Except for the primary outlet, all other outlets must have a name.

### Adding Multiple Outlets to Our Demo Application

First, you can get the source of our previous example from this [repository](https://github.com/techiediaries/angular-router-demo).
 
Now, let's add multiple outlets in our `AppComponent` template. Open `src/app/app.component.html` and add the following outlets:

```html
<router-outlet></router-outlet>  
<router-outlet  name="sidebar"></router-outlet>  
```

### What is An Auxiliary Route?

A component has one primary **route** and zero or more **auxiliary** routes.. Auxiliary routes allow you to use and navigate multiple routes. To define an auxiliary route you need a named router outlet where the component of the auxiliary route will be rendered. 

The name that we're giving to the second outlet suggests that the outlet will be used as a sidebar for the app. Now let's create a sidebar component that will be rendered in the sidebar outlet: 

```bash
ng g component sidebar
```

We want the sidebar component to be rendered with each other component, **in the same time**. So we'll add an empty path and a *sidebar* outlet:

```ts
{
   path: "",
   component: SidebarComponent,
   outlet: "sidebar"
}
``` 

Since we are using an empty path, the sidebar component will be rendered when our application is started.

### Navigating Inside Auxiliary Outlets

You can navigate inside an auxiliary outlet by using the *outlets* property: 

```ts
router.navigate([{outlets: {primary: 'path' ,sidebar: 'path'}}]);
```

Or also using the `routerLink` directive

```html

<a [routerLink]="[{ outlets: { primary: ['path'],sidebar: ['path'] } }]">
	Products List
</a>
```

### Primary and Auxiliary Angular 11 Router Outlets by Example

So let's say, we want to render a different sidebar component when the user navigates to the `/products` URL. This way, the `ProductListComponent` will be rendered in the primary outlet and in the same time the `ProductListSidebarComponent` will be rendered in the auxiliary sidebar outlet. 

We can easily achieve this scenario by creating the `ProductListSidebarComponent` component (`ng g component ProductListSidebar`) and adding the following auxiliary route configuration:

```ts
  { path: "products", component: ProductListSidebarComponent, outlet: "sidebar" }
```

This is the complete routing configuration for our example:

```ts
import { RouterModule, Routes } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { ProductListSidebarComponent } from "./product-list-sidebar/product-list-sidebar.component";

const routes: Routes = [
  { path: "products", component: ProductListComponent },
  { path: "product/:id", component: ProductDetailComponent },
  {
    path: "",
    component: SidebarComponent,
    outlet: "sidebar"
  },
  {
    path: "products",
    component: ProductListSidebarComponent,
    outlet: "sidebar"
  }
];

export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);
```

You also need to update the navigation link in our `AppComponent`:

```html
<a [routerLink]="[{ outlets: { primary: ['products'],sidebar: ['products'] } }]">
	Products List
</a>
```

This says, when the user clicks on the *Products List* link. Both routes with the `/products` path will be activated in the primary and auxiliary sidebar outlets.

You need to specify all the outlets where you want the navigation to take place including the primary outlet.

### Wrap-up
 
By having primary and auxiliary named outlets, you can implement advanced scenarios by independently rendering multiple components in the same time. 

In this section, we have learned how to use named and multiple Router-Outlets and auxiliary routes in Angular 11.

## Resolve & Route Resolvers Example

The Angular 11 Router provides a `resolve` property that takes a route resolver and allows your application to fetch data before navigating to the route (i.e resolving route data). 

How to Create an Angular 11 Route Resolver?

You can create a route resolver in Angular 11 and previous versions by  implementing the [Resolve](https://angular.io/api/router/Resolve) interface. For example,this a route resolver:

```ts
import { Injectable } from '@angular/core';
import { APIService } from './api.service';

import { Resolve } from '@angular/router';

@Injectable()
export class APIResolver implements Resolve<any> {
  constructor(private apiService: APIService) {}

  resolve() {
    return this.apiService.getItems();
  }
}
```

In the example, we assume we have already created an APIService which has a `getItems()` method that fetches data from a remote API endpoint.

We import the `Resolve` interface from the `@angular/router` package.

We then create an `APIResolver` class that implements the `Resolve<any>` interface.

In the constructor of the resolver we inject our `APIService` as `apiService` and we call the `getItems()` method of the service in the `resolve()` method that should be defined in any resolver


### Accessing the Route Parameters in the Resolver

Often than not when resolving route data, you want to get access to the parameters of the route in the resolver. You can do that using the `ActivatedRouteSnapshot` class. For example, let's suppose our route has a `date` parameter that needs to be passed to the `getItems(date)` method:

```ts
import { Injectable } from '@angular/core';
import { APIService } from './api.service';

import { Resolve } from '@angular/router';

import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class APIResolver implements Resolve<any> {
  constructor(private apiService: APIService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.apiService.getItems(route.params.date);
  }
}
```

We import the `ActivatedRouteSnapshot` class from the `@angular/router` package and we provide a paramater `route` of type `ActivatedRouteSnapshot` to the `resolve()` method. Finally we use `route.params.date` to get the value of the `date` parameter.

### Passing the Route Resolver to the Angular 11 Router


One final thing you need to do is to pass the resolver we created to `resolve` property of the corresponding route in the `Routes` array of your Angular routing module:

```ts
{
  path: 'items/:date',
  component: ItemsComponent,
  resolve: { items: APIResolver }
}
```

### Wrap-up

In this tutorial, we've seen how to resolve data using the `resolve` property and the route resolver (`Resolve`) of the Angular 11 router.

## Route Animations by Example

The Angular 11 Router supports adding animations when navigating between different routes in your application. In this tutorial, we'll learn how to use the Angular’s animations API to play animations when a route changes in your application.

### Creating an Angular 11 Project

In this tutorial we assume you already have Angular CLI 11 installed. You can then generate a project using the following command from your terminal:

```bash
$ ng new angular-project
```

We also need some components. Create them using:

```bash
$ ng g c list
$ ng g c detail
```


### Adding Angular 11 Routes

Next, you need to add routes to the created Angular 11 components in your routing module `app-routing.module.ts`:

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

In the `src/app/app.component.html` file we can add the following code to navigate between the different components:

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

### Adding the Angular Animations Module: `BrowserAnimationsModule`

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

### Defining and Registering Angular Router Animations

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

### Applying the Animation on the Router Outlet

After defining the `myAnimation` animation we need to apply it to our router outlet

```html
<div [@myAnimation]="o.isActivated ? o.activatedRoute : ''">
  <router-outlet #o="outlet"></router-outlet>
</div>
```

We use a template reference to create a reference to the router outlet `#o="outlet"`. This is useful for knowing when the router outlet is active so we can trigger the animation.

### Wrap-up

In this quick section, we've seen how to define and trigger animations when navigating between routes in Angular 11 applications. 

You can find the code in this [repository](https://github.com/techiediaries/angular-router-demo).

## Example 2: Path Redirection and Handling 404 Paths Using Router Wildcard Routes
 
In this example, we'll see how to redirect users to a new URL path or component using the Angular 11 router and how to deal with not found pages and redirect to a 404 component if no match is found using wildcard paths.

We'll be using the latest Angular 11 version.

Why redirecting to new paths in Angular?

Redirection is common technique in web development where a specific URL path is redirected to a new one for many reasons such as migrating a legacy application or if the requested page is not available, etc.

  
We assume that you already have a development machine with Angular CLI installed and that you have initialized an Angular 11 project.

When you create your project with Angular CLI, you will be prompted if **Would you like to add routing?** If you answered with **Y**es, a routing module will be created automatically and you can simply start adding your app routes.

Otherwise, you will need to set up routing manually.

### Step 1 – Setting up routing in your Angular app

Before seeing how to redirect users to new paths or components, we first need to set up routing in our Angular 11 project.

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

### Step 2 - Adding routing configuration

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

```html
<router-outlet></router-outlet>
```

That's it we have configured the router in our Angular 11 project.

### Step 3 – Adding components to the router

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

### Step 4 - Redirect the empty path to the home path

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

### Step 5 - Handle 404 (not found pages) using wildcard paths

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

### Wrap-up

In this section, we've seen by example how to redirect users to different paths in your Angular app and how to handle 404 not found or invalid paths using wildcard paths.

## Angular Router by Example with Parameters and Guards

Angular provides a powerful router for creating apps with multiple views, parameters, guards, and navigation etc. In this tutorial, we'll see how to implement routing by example in Angular 11 but this also valid for previous versions such as Angular 7/8.


- Step 1: Setting up Routing in Angular 11
- Step 2: Adding Multiple Views/Pages or Configuring Angular Routes
- Step 3: Adding Navigation in Angular 
- Step 4: Using Angular Route Parameters
- Step 5: Using Angular Route Guards

Let's get started!

First, you need to have a few prerequisites if you intend to follow this tutorial step by step:

- A development environment with Node.js and npm installed,
- Angular CLI v11 installed or previous versions i.e v7/v8



### Step 1: Setting up Angular Routing 

Starting with Angular 7, the CLI will allow to automatically set up routing without the hassle of creating and configuring a routing module.

So all you need is to start a new Angular 11 project by running the following command in your command-line interface:

```shell
$ ng new angular-routing-example
```

You'll get prompted if you would like to add routing to your project - You need to answer by **Y** to automatically set up a routing module in your project.

For the stylesheets format, we'll pick **CSS** but you can go woth any choice as it doesn't affect how routing is done.

Next, you can start a a development server using the following commands: 

```bash
$ cd ./angular-routing-example
$ ng serve
```

You can access your app from the `http://localhost:4200` address using your web browser.

### Step 2: Adding Multiple Views/Pages or Configuring Angular Routes

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


### Step 3: Adding Navigation in Angular 11

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


### Step 4: Using Angular Route Parameters

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

### Step 5: Using Angular Route Guards

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

### Wrap-up

In this section, we have seen how to automatically set up routing with Angular 11 with the basics of the router.

## Lazy Loading Modules Tutorial (loadChildren() Example)

In this section, we'll see by example how to lazy loading components using feature modules and the `loadChildren()` method. 

Lazy loading modules in Angular allows applications to load modules only when they are needed i.e when you first visit the route(s) corresponding to component(s) belonging to the lazy loaded module. This has many benefits on your Angular  application such as the performance and size.

To add lazy loading in your Angular 11 application you need to set up routing to use the `loadChildren()` method and add components that you want to lazy-load inside feature modules i.e outside the main application module `app-main.module.ts`.


### Creating a Feature Module

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

### Using `loadChildren()` 

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

### Routing Components Inside the Feature Module

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

### Wrap-up

In this section, we've seen how to lazy load modules with Angular 11 router using feature modules and the `loadChildren()` method.
