---
layout: post
title: "The Angular 6|7 Router Tutorial by Example: Routing and Navigation"
image: "images/content/ionic.png"
excerpt: "In this Angular 6 Router tutorial we'll learn how to use the Router to add component routing and navigation in Angular applications" 
tags : [javascript , angular] 
---
**This tutorial is compatible with the new Angular 7 version**

The Angular 6|7 Router Tutorial by Example will teach you everything you need to start using Angular routing to build Single Page Applications or SPAs.

<div id="toc_container">
<p class="toc_title">The Angular 6|7 Router Tutorial by Example: Routing and Navigation</p>
<ul class="toc_list">
<li><a href="#Introduction_to_Angular_6_Router">Introduction to Angular 6 Router</a></li>
<li><a href="#Creating_Angular_6_Components">Creating Angular 6 Components</a></li>
<li><a href="#Example_Angular_6_Component">Example Angular 6 Component</a></li>
<li><a href="#Creating_Angular_6_Model">Creating Angular 6 Model</a></li>
<li><a href="#Creating_Angular_6_Routing_Module">Creating the Angular 6 Routing Module</a></li>
<li><a href="#Adding_Router_Outlet">Adding the Router Outlet</a></li>
<li><a href="#Adding_Router_Navigation_Links">Adding Router Navigation Links</a></li>
<li><a href="#Conclusion">Conclusion</a></li>
</ul>
</div>

## <a name="Introduction_to_Angular_6_Router">Introduction to Angular 6 Router</a>

The Angular 6 router is an essential element of the Angular framework. It allows developers to build **Single Page Applications** or SPAs with multiple components and allows client side navigation and routing between the various components. You can use the browser's URL to navigate between Angular components in the same way you can use the usual server side navigation.

Angular 6 provides a powerful router that allows you to map browser routes to components. So let's see how we can add routing to applications built using Angular 6.

In this tutorial, you'll learn:

- how to import the necessary Angular built-in APIs to implement component routing and navigation, 
- how to create the routing module and import it in the main application module,
- how to create routes to components,
- how to use the router outlet to allow Angular to insert components matching a path,
- how and when to use wild card routes,
- how to use `routerLink`
- how to use nested routes
- how to get route parameters 

## <a name="Creating_Angular_6_Components">Creating Angular 6 Components</a>

First we need to create some components using the Angular CLI:

```bash
ng g component product-list
ng g component product-detail
```

We are creating two components. The product list component displays a list of products and when you click on a specific product you'll be taken to the product detail component which displays that single product. 

## <a name="Example_Angular_6_Component">Example Angular 6 Component</a>

Let's add an implementation for the *ProductListComponent* component. Open `src/app/product-list/product-list.component.ts` then create an array of products:

```ts
import { Component } from "@angular/core";
import { Product } from "../models/product";
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
}
```

### <a name="Creating_Angular_6_Model">Creating Angular 6 Model</a>

Create a `models` folder then add a `product.ts` file with the following code:

```ts
export class Product {
  id: number;
  name: string;
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
```

Now let's display the list of products in `src/app/product-list/product-list.component.html` using the following template:

```html
<h1>Products List</h1>

<ul>
  <li *ngFor="let product of products">
    {{product.name}}
  </li>
</ul>
```

Let's also add some code to the product detail component. Open `src/app/product-detail/product-detail.component.ts` and add:

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

For the sake of simplicity, we have added the products array in both components (detail and list). But normally you should use a service to share global data common between multiple components.

We are creating a *product* variable which will hold the product to display in the template. For now, it holds the first product of the products array but later we'll see how we can use the route parameter as a source to get the appropriate product by *id* to store in this variable.

Now open the component template at `src/app/product-detail/product-detail.component.html` and add:  

```html
<h1>Products Details</h1>
Product information: id: {{product.id}} || name: {{product.name}}
<br><a routerLink="/products">Go To Products List</a>
```

## <a name="Creating_Angular_6_Routing_Module">Creating the Angular 6 Routing Module</a>

To add routing to your Angular application. You can either define the routes inside the main application module or preferably on its own module. So create the `app.routing.ts` file inside the `src/app` folder.

Next you need to use the `RouterModule` and `Routes` from `@angular/router`. So first import them using the following code:

```ts
import { RouterModule, Routes } from '@angular/router';
```

You also need to import `ModuleWithProviders` which allows you to create a module (`NgModule`) with its providers.

Next you need to define the array of routes:

```ts
const routes: Routes = [];
```

We'll fill this array later. Now let's create and export our routing module:

First import `ModuleWithProviders` from `@angular/core`:

```ts
import { ModuleWithProviders } from "@angular/core";
```

Next create the routing module:

```ts
export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);
```

We are using `RouterModule.forRoot()` to return a module of type *ModuleWithProviders*. Now let's define some routes: 

> **Note**: In Angular 7, you can skip this step by letting the CLI generate and setup routing on your behalf by simply answering **Yes** when the CLI prompts you if you **Would like to add Angular routing?**.

In the *routes* array, add the following object:

```ts
{ path: 'products', component: ProductListComponent }
```

This first route links the `/products` path to the *ProductListComponent* component so when `/products` is visited the router will render the product list component.

Let's add a second route:

```ts
  { path: "product/:id", component: ProductDetailComponent }
```

This will link routes like `/product/1` or `/product/9 ` etc. to the *ProductDetailComponent* component.

We can also add this route which will redirect the empty route to `/products` so whenever the user visits the home path he will be redirected to the products component:
 
```ts
{ path: '',  redirectTo: '/products', pathMatch: 'full' },
```

**pathMatch** is used to specify the matching strategy **full** or **prefix**. **full** means that the whole URL's path needs to match by the matching algorithm. **prefix** means the first route where path matches the start of the URL will be chosen. In the case of empty path if we don't set the **full** matching strategy then  we won't get the desired behavior as any path starts with an empty path.

### Importing the Routing Module Inside The Main Module

Open `src/app/app.module.ts` then import the created routing module using:

```ts
import { routingModule } from './routing.module'
``` 

Next add *routingModule* to the *imports* array:

```ts
imports: [
	BrowserModule,
	routingModule
],
```

## <a name="Adding_Router_Outlet">Adding the Router Outlet</a>

Now let's tell Angular where to insert the matched components using `<router-outlet>`. Open the `app.component.html` file which contains the HTML template for the main `AppComponent` then simple add:

```html
<router-outlet></router-outlet> 
```
After adding this, the `AppComponent` will be the shell of our application where other components will be rendered. 


## <a name="Adding_Router_Navigation_Links">Adding Router Navigation Links</a>

The last thing you need to do is adding the navigation links that take you from one component to another. Angular provides `routerLink` and `routerLinkActive` directives that need to be added to `<a>` anchors. We have previously some navigation in our template.

`routerLink`: this directive is used instead of *href* in the `<a>` tags,
`routerLinkActive`:  this directive is used to   add a CSS class to an element when the link's route becomes active.

This is the demo application for this tutorial and the next one:

<iframe src="https://codesandbox.io/embed/8z7x2jlnx9" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>


## <a name="Conclusion">Conclusion</a>

This is the end of this first tutorial **The Angular 6|7 Router Tutorial by Example**. In the next tutorial we'll see how we can handle route parameters. You can find the source code in this [repository](https://github.com/techiediaries/angular-router-demo).

 
 
