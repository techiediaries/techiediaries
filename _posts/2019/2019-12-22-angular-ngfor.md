---
layout: post
title: "Angular 9/8 How-To: Display Data Arrays with ngFor by Example"
image: "images/content/angular.png"
excerpt: "In this tutorial, you'll learn about the ngFor directive by example in Angular 9" 
tags : [angular, angular-how-tos, angular9]
---

In this quick how-to tutorial we'll be learning about the  `ngFor`  directive in Angular and how to use it to display arrays of data in your Angular templates.

We'll be using Angular 9 for the example.

We'll learn about these things:
 
-   What  `ngFor`  does in Angular and how it's used?
-   What is the variable visibility/scope inside an `ngFor` loop?
-   How to find the index position of an element inside an ngFor loop?
-   Getting the  `first`  and the  `last`  element inside an ngFor loop



Let's get started with our tutorial to master  `ngFor`  in Angular! 


## What  `ngFor`  does in Angular and how it's used?

ngFor is a core Angular directive that can be used as a part if Angular template syntax to entend HTML with an easy way to itertave over lists of data right inside the component's template.
  
You can use `ngFor lists and tables in HTML templates. For example, let's consider the following array of objects representing a set of products in a component:

```ts

const PRODUCTS = [
	{"id":1,"name":"Licensed Frozen Hat","description":"Incidunt et magni","price":"170.00","quantity":56840},
	{"id":2,"name":"Rustic Concrete Chicken","description":"Sint libero mollitia","price":"302.00","quantity":9358},
	{"id":3,"name":"Fantastic Metal Computer","description":"In consequuntur cupiditat","price":"279.00","quantity":90316},
	{"id":4,"name":"Refined Concrete Chair","description":"Saepe nemo praesentium","price":"760.00","quantity":5899}
];
```

Using `ngFor`, we can iterate over the `PRODUCTS` array in the associated template and render/display data using an HTML list or table:

{% raw %}
```html
<ul>
<li *ngFor="let product of products">
	<h2>{{product.name}} / ${{product.price}}</h2>
	<p> {{product.description}} </p>
</li>
</ul>
```
{% endraw %}

Let's now understand more about `ngFor`.

### What is the syntax of `ngFor`?

Let's see how  `ngFor` works by building a practical example. We'll only see how to create a component with an associated HTML template so you should already have an Angular development environment ready with Angular CLI v9 installed and a project generated. Both these two things can be done with the following two commands:

```bash
$ npm install @angular/cli
$ ng new angular-ngfor-example
```

Go ahead and navigate inside inside your project's folder and generate a component with the following commands:

```bash
$ cd ./angular-ngfor-example
$ ng generate component products 
```

Open the `src/app/products/products.component.ts` file and add the `products` array as a member of `ProductsComponent` as follows:

```ts
import { Component, OnInit } from '@angular/core';  

@Component({  
	selector: 'app-products',  
	templateUrl: './products.component.html',  
	styleUrls: ['./products.component.css']  
})  
export class ProductsComponent implements OnInit {
	products = [
	{"id":1,"name":"Licensed Frozen Hat","description":"Incidunt et magni","price":"170.00","quantity":56840},
	{"id":2,"name":"Rustic Concrete Chicken","description":"Sint libero mollitia","price":"302.00","quantity":9358},
	{"id":3,"name":"Fantastic Metal Computer","description":"In consequuntur cupiditat","price":"279.00","quantity":90316},
	{"id":4,"name":"Refined Concrete Chair","description":"Saepe nemo praesentium","price":"760.00","quantity":5899}
];;
	constructor() { }
	ngOnInit() {
	}
}
```

Next, open the `src/app/products/products.component.html` file and update it as follows:

{% raw %}
```html
<ul>
<li *ngFor="let product of products">
	<h2>{{product.name}} / ${{product.price}}</h2>
	<p> {{product.description}} </p>
</li>
</ul>
```
{% endraw %}

When rendered, a `<ul>` element will be created with an item for each product in the array.  Let's understand the basic syntax if  `ngFor`:

-  `ngFor`  gets an expression comprised of `let` and `of` keywords and variables;
- `of` is followed by the array that we are iterating over. In our example, it's `products` which is defined in the associated component class;
- `let` is used to define a variable that will contain the data for each iteration. In our example, we named it `product` but you can name what's you think is convenient.

## What's the Scope of the ngFor Loop Variable? 

The variable used to represent the data availabe for each iteration inside an ngFor directive is only  only visible inside the loop.

## How to Get the Index of an Element Inside an ngFor Loop? 

You can get the index of the current element in the `ngFor` loop by using the  `index`  variable:


{% raw %}
```html
<ul>
<li *ngFor="let product of products; let num = index">
	<h2># {{num}} {{product.name}} / ${{product.price}}</h2>
	<p> {{product.description}} </p>
</li>
</ul>
```
{% endraw %}


## Conclusion

In this quick tutorial, we have learned about the `ngFor` directive in Angular 9/8. Check out this [tutorial](https://www.techiediaries.com/html-tutorial) for a complete Angular 8 example that demonstrates how we can use ngFor to display an array of fetched data in our HTML template.
