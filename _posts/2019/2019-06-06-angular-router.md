---
layout: post
title: "Angular 9/8 Router Tutorial: Learn Routing & Navigation by Example"
excerpt: "In this tutorial part, we’ll learn about Angular Router by example and will teach you everything you need to start using Angular routing to build Single Page Applications." 
img: "https://www.techiediaries.com/images/angular-router.png"
tags : [angular , angular9, angular-9-httpclient-examples, angular-9-router-examples] 
date : 2020-1-22
author: ahmed
---

In this tutorial, we’ll learn about the Angular Router by building an Angular 9 example and will teach you everything you need to start using routing to build Single Page Applications.

You can also check out [this article](https://www.techiediaries.com/angular-routing-tutorial/) for how to add routing to a CRM application by example.

> **Note**: This tutorial is compatible with both Angular 6/7/8 and the new Angular 9 version.

## What You'll Learn in This Angular 9 Router Tutorial

In this tutorial, you'll learn about:


- How to import the necessary Angular built-in APIs to implement component routing and navigation,
- How to create the routing module and import it in the main application module,
- How to create routes to components,
- How to use the [router outlet](https://www.techiediaries.com/angular-router-multiple-outlets/) which allows Angular to insert the components matching a specific route path,
- How and when to use wild card routes,
- How to use `routerLink`,
- How to [use nested and child routes](https://www.techiediaries.com/angular-course-child-routes/),
- How to [get route parameters](https://www.techiediaries.com/angular-router-route-parameters/) etc.

These are the steps of our tutorial:

- Angular Routing, Step 1: Creating a Project
- Angular Routing, Step 2: Understanding what the CLI Automatically Did For You
- Angular Routing, Step 2.1: Adding `<base href>` 
- Angular Routing, Step 2.2: Creating a Routing Module
- Angular Routing, Step 2.2: Importing the Router and Setting up Routing
- Angular Routing, Step 2.3: Adding the Router-Outlet
- Angular Routing, Step 2.4: Importing the Routing Module in the Main Application Module
- Angular Routing, Step 3: Setting up a Service for Getting Data
- Angular Routing, Step 4: Creating a Model
- Angular Routing, Step 5: Creating Components
- Angular Routing, Step 6: Implementing The Product List Component
- Angular Routing, Step 7: Implementing the Product Details Component
- Angular Routing, Step 8: Defining the Routes
- Angular Routing, Step 9: Adding Navigation Links



## <a name="Angular-Routing">Angular 9 Routing Concepts</a>

Now let’s get started with Angular routing. In this section, we’ll learn the basic concepts behind routing in Angular 9. We’ll introduce the Angular Router and then we’ll proceed to create a simple single page application with Angular 9 that demonstrates the commonly used features of the router. 

In more details, you’ll learn about:


- How to create Angular projects using Angular CLI v9,
- How to choose to have routing automatically setup and also how to manually add it in your project,
- How to create Angular services and emulate a backend server that you can use to fetch data using `HttpClient`,
- How to create Angular components,
- How to add component routing in your application using the router.



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

Angular 9 provides a powerful router that allows you to map browser routes to components. So let's see how we can add routing to applications built using Angular 9.

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

Angular applications are built as a hierarchy of components (or a tree of components) that communicate with each other using inputs and outputs. A component controls a part of the screen which is rendered using the component’s template specified as meta information in the `@Component` decorator.


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

## Angular Routing, Step 1: Creating a Project

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

## Angular Routing, Step 2: Understanding what the CLI Automatically Did For You

Angular CLI has configured routing in your project and all you have to add is to define route-component mappings after your create your application components but it helps to understand how what steps the CLI has done to setup routing.

If you would like to manually add routing in your application or module, these are the necessary steps you would need to follow:

## Angular Routing, Step 2.1: Adding `<base href>` 

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

## Angular Routing, Step 2.2: Creating a Routing Module

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

## Angular Routing, Step 2.2: Importing the Router and Setting up Routing

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

## Angular Routing, Step 2.3: Adding the Router-Outlet

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


## Angular Routing, Step 2.4: Importing the Routing Module in the Main Application Module

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


## Angular Routing, Step 3: Setting up a Service for Getting Data

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


## Angular Routing, Step 4: Creating a Model

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

## Angular Routing, Step 5: Creating Components

Now that you have a project with routing setup and data services created, you need to create the components of your application. You can easily generate components using the Angular CLI. 

Head back to your terminal and run the following commands:


    $ ng generate component product-list
    $ ng generate component product-detail

We create two components. The product list component which displays a list of products. When you click on a specific product you'll be taken to the product detail component which displays that single product.

## Angular Routing, Step 6: Implementing The Product List Component

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

## Angular Routing, Step 7: Implementing the Product Details Component

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

## Angular Routing, Step 8: Defining the Routes

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


## Angular Routing, Step 9: Adding Navigation Links

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

These are the steps of this tutorial:

- Angular Routing, Step 1: Creating a Project
- Angular Routing, Step 2: Understanding what the CLI Automatically Did For You
- Angular Routing, Step 2.1: Adding `<base href>` 
- Angular Routing, Step 2.2: Creating a Routing Module
- Angular Routing, Step 2.2: Importing the Router and Setting up Routing
- Angular Routing, Step 2.3: Adding the Router-Outlet
- Angular Routing, Step 2.4: Importing the Routing Module in the Main Application Module
- Angular Routing, Step 3: Setting up a Service for Getting Data
- Angular Routing, Step 4: Creating a Model
- Angular Routing, Step 5: Creating Components
- Angular Routing, Step 6: Implementing The Product List Component
- Angular Routing, Step 7: Implementing the Product Details Component
- Angular Routing, Step 8: Defining the Routes
- Angular Routing, Step 9: Adding Navigation Links

## Conclusion

This is the end of this first tutorial of our series to learn Angular routing with Angular 9 (most of it is also valid for v8 or previous versions). 

We have learned about the basic concepts of client side routing, next we’ve seen the basic concepts of the router and finally created a Single Page Application with basic building such as components, services and modules.

We have seen how you can automatically setup routing in your Angular 9 application using the CLI v9 and how you can simulate a backend server using the In-memory Web API without actually having a backend server.
  
In the next tutorial we'll see how we can access route parameters in our components. 

You can find the source code of this application demo from this GitHub [repository](https://github.com/techiediaries/angular-router-demo).
