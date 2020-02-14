---
layout: post
title: "Building an Ionic 5/Angular HTTP Service to Communicate with A REST API"
image: "images/content/ionic3.jpg"
excerpt: "In this tutorial, we'll see by example how to send HTTP (Ajax) requests to REST API servers (for calling APIs and consuming data) in Ionic 5 and Angular then how to mock requests using the HttpTestingController provider for unit-testing your apps without making real API calls." 
tags : [ionic] 
date: 2020-02-12
featured: true
---


This tutorial is part of a tutorial series titled ¨Ionic 5, Angular and RxJS Observables: Building an HTTP Service to Communicate with A REST API¨  that contains the following tutorials:

* [Introduction and Building the API Back-End](https://www.techiediaries.com/ionic-http/) 
* Building an HTTP Service to Communicate with A REST API (this one) 
* [Unit Testing Angular Services with HttpTestingController](https://www.techiediaries.com/angular-testing-httptestingcontroller/)

**In this tutorial we'll see how to create an Angular service/provider to encapsulate the code to communicate with The REST API back-end.**

> **Note**: For a complete and detailed tutorial, check out:
>
> - [Ionic 5 JWT Authentication Tutorial: Using Angular HttpClient with Node & Express.js Server](https://www.techiediaries.com/ionic-jwt-authentication-httpclient)
> - [Ionic 5 Tutorial: Building and Theming a Login & Register UI with Angular Forms](https://www.techiediaries.com/ionic-ui-forms-theming)


## Sending API Calls in Ionic 5

API calls, using *HttpClient* module, are asynchronous by nature since you need to wait for the response to come from the remote servers without blocking the app when still waiting.

An HTTP Request will take some time to reach the API server and also the HTTP Response will need time to arrive so this needs to be running in the background before the data can be ready to be consumed.

With Ionic 5/Angular you can make use of modern JavaScript APIs: **Promises** and **Observables** which provide high level abstractions to handle the asynchronous nature of data fetching and API consuming operations or any other operation that takes time to finish.

### What's a Promise?

>The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.--[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

A promise can be:

* pending: the initial waiting state before eventual fulfilment or rejection.
* fulfilled: the operation has successfully completed with a value.
* rejected: the operation has failed with an error.

You place your async actions, either when the promise has successfully resolved or failed, within the **.then(()=>{})** and **.catch(()=>{})** methods.

Promises can be chained together to handle complex scenarios  

![](https://cdn.rawgit.com/Vectaio/a76330b025baf9bcdf07cb46e5a9ef9e/raw/26c4213a93dee1c39611dcd0ec12625811b20a26/js-promise.svg)

[Image source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## What is an Observable?

Observables are a newer standard than promises which are added, to Angular 2+ (and will be included in the **ES7**) to allow Angular developers to handle more advanced use cases with clear and concise code. For example you can cancel an observable whenever you need without using external libraries as the case for promises and you can also have multiple return values.

Just like Promises, Observables are abstractions that help you deal with async operations except that they handle asynchronosity in a different way and provide more features so they are becoming preferable over promises among the JavaScript/Angular community.

Unlike promises, which they can only handle single events, observables, on the other hand, can be passed more than one event.

An Observable can be represented as a stream of events that can be handled with the same API and they can be cancelable (this feature is not available for ES6 Promises so you need to use external libraries to do that).

You can use different array-like operators such as *map()*, *forEach()*, and *reduce()* etc. to easily work with observables and handle advanced use cases with a simple and clear API.

The new Angular **HttpClient** methods return observables objects which can be also converted to promises (using **toPromise()** operator) so you can use the right abstraction when it's appropriate.

### Generating a Service Provider

A service provider is an Angular abstraction which can be used in any other component, page or service via the Angular Dependency Injection or DI. You can use providers to encapsulate code which's common between many places of your application so instead of repeating the same logic in many places you can isolate that code into its own service and inject it wherever you want to use it. This will allow you to comply with the DRY (Don't Repeat Yourself) principle. If you don't know what DRY is, here is its definition from [Wikipedia](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)

>In software engineering, don't repeat yourself (DRY) is a principle of software development aimed at reducing repetition of software patterns, replacing them with abstractions; and several copies of the same data, using data normalization to avoid redundancy.

By following the DRY principle you place the code which interfaces with your back-end API in one place which makes the app easy maintainable.

Now let's generate our API-interfacing service using the Ionic CLI 5. Head back to your terminal or command prompt then run the following command to generate a service provider

  

```bash

ionic g provider rest

```

  

This command will create a new folder in your project's `src/providers`, and add your newly created provider to the array of providers in `src/app/app.module.ts` (If it's not added make sure to do it manually).

  

```ts

/* Other imports */

import { HttpClientModule } from  '@angular/common/http';

import { RestProvider } from  '../providers/rest/rest';

@NgModule({

/* ... */

providers: [

StatusBar,

SplashScreen,

{provide:  ErrorHandler, useClass:  IonicErrorHandler},

RestProvider  //this is our provider entry

]

})

export  class  AppModule {}

```

### The Angular HttpClient Service


The new Angular *HttpClient* API was introduced in Angular 4.3+. It is a better alternative to the existing HTTP API that lives in its own package `@angular/common/http`.

In Angular 5, the old HTTP client which lives in `@angular/http` is deprecated so Angular and Ionic 5 developers need to migrate their existing apps to use the new *HttpClient* API.

  

*HttpClient* has many changes and features over the old API, such as:

  

* the response is a JSON object by default, so there's no need to manually parse it

* the introduction of the *requestProgress* interface for listenning for download and upload operations progress

* the introduction of the *HttpInterceptor* interface for creating interceptors--middlewares that can be placed in the Request/Response pipeline

The Angular *HttpClient* service is available as an injectable class which can be imported from `@angular/common/http`.

*HttpClient* provides methods, for sending HTTP POST, GET, PUT and DELETE etc. requests, that return Observables.


### An Example Implementation of Our Service Provider


Based on the endpoints exposed by our simple *json-server* back-end, we can create an example implementation of our Angular service

```ts

import { Injectable } from  '@angular/core';

import { HttpClient } from  '@angular/common/http';

  

@Injectable()

export  class  RestProvider {

baseUrl:string = "http://localhost:3000";

constructor(private  httpClient : HttpClient) { }

// Sending a GET request to /products

public  getProducts(){

}

// Sending a POST request to /products

public  createProduct(product: Product) {

}

// Sending a GET request to /products/:id

public  getProductById(productId: number) {

}

// Sending a PUT request to /products/:id

public  updateProduct(product: Product){

}

// Sending a DELETE request to /products/:id

public  deleteProductById(productId: number) {

}

}

```

We have imported the *Injectable* decorator to transform this TypeScript class into an injectable service. Then we imported the *HttpClient* to make the HTTP requests.

Next we have declared the *baseUrl* variable to hold the address of your back-end API. Next we injected *HttpClient* as *httpClient*.

Before you can succesfully implement the service methods, you need to make sure to import the following dependencies from the RxJS library:

  

```ts

import { Observable } from  'rxjs/Observable';

import  'rxjs/add/operator/catch';

import  'rxjs/add/operator/map';

```

You also need to declare and define a *Product* model, either in the same file as the service or in a separate file then import it:

```ts

export  class  Product {

id: number;

name: string;

cost: number;

quantity: number;

constructor(values: Object = {}) {

Object.assign(this, values);

}

}

```

Let's now see how to implement each one of these methods.

#### Implementing getProducts() for Getting All Products

The `getProducts()` method will be used to get all products from the corresponding API endpoint:

  

```ts

public  getProducts(): Observable<Product[]> {

return  this.httpClient

.get(this.baseUrl + '/products')

.map(products  => {

return  products.map((product) =>  new  Product(product));

})

.catch((err)=>{

console.error(err);

});

}

```

We first call the `.get()` method to send the GET request to the corresponding endpoint which will return an endpoint

We then use the RxJS `map()` operator in the returned Observable to convert it from *Observable<Response>* to *Observable<Product[]>* i.e an array of Products.

We also use the `.catch()` method to log any thrown errors.

#### Implementing getProductById() for Getting Single Products

The `getProductById()` will be used to get a single product by its *id*

```ts

public  getProductById(productId: number): Observable<Product> {

return  this.httpClient

.get(this.baseUrl + '/products/' + productId)

.map(response  => {

return  new  Product(response);

})

.catch((err)=>{

console.error(err);

});

}

```

#### Implementing createProduct() for Creating New Products

The `createProduct()` method will be used to create a new product by sending a POST request, with the product data, to the corresponding endpoint.

  

```ts

public  createProduct(product: Product): Observable<Product> {

return  this.httpClient

.post(this.baseUrl + '/products', product)

.map(response  => {

return  new  Product(response);

})

.catch((error)=>{

console.error(error);

});

}

```

#### Implementing updateProduct() for Updating Existing Products


The `updateProduct()` will be used to update a product by its *id*, by sending a PUT request to the corresponding endpoint then will convert the response to a new Product using the RxJS `.map()` operator.

```ts

public  updateProduct(product: Product): Observable<Product> {

return  this.httpClient

.put(this.baseUrl + '/products/' + product.id, product)

.map(response  => {

return  new  Product(response);

})

.catch((err)=>{

console.error(err);

});

}

```

#### Implementing deleteProductById() for Deleting Products

The `deleteProductById()` method will be used to delete single products by *id*, by sending a DELETE request to the corresponding endpoint:

```ts

public  deleteProductById(productId: number) {

return  this.httpClient

.delete(this.baseUrl+ '/products/' + productId)

.catch((e)=>{

console.error(e);

});

}

```

### Using the Rest API Service


After implementing the service to interface with our REST back-end, let's now see how to use the service in our app.

All the methods we have previously implemented in the service return *RxJS Observables*

Calling any method in our components won't send any HTTP requests. We need to subscribe to the returned Observable to send the corresponding request to the API back-end.

To subscribe to an Observable, we need to use the `.subscribe()` method, which takes 3 arguments:

* onNext: it's called when the Observable emits a new value

* onError: it's called when the Observable throws an error

* onCompleted: it's called when the Observable has gracefully terminated


### Adding the Products Page

Use the Ionic CLI 5 to generate a page for adding CRUD (Create, Read, Update and Delete) operations which will call the corresponding methods in the previously create service.

So first we need to import the service using:

```ts

import { RestProvider } from  './../../providers/rest/rest';

```

Next we inject the service as *restProvider*:

```ts

constructor(public  navCtrl: NavController, public  restProvider: RestProvider) { }

```

Next we declare an array to hold the products:

```ts

private  products : Product[] = [];

```

Then we call this code, to get all products and store them in the products array, when the view enters or in the constructor:

```ts

this.restProvider.getProducts().subscribe((products : Product[])=>{

this.products = products;

});

```

Next we need three methods to create, update and delete products:

`onCreateProduct()` is called when we need to create a product via a form. This method simply subscribes to the corresponding method in the service and concatenates the newly created product with the products array


```ts

onCreateProduct(product) {

this.restProvider

.createProduct(product)

.subscribe(

(newProduct) => {

this.products = this.products.concat(newProduct);

}

);

}

```

`onUpdateProduct()` needs to be called when you need to update an existing product:

```ts

onUpdateProduct(product) {

this.restProvider

.updateProduct(product)

.subscribe(

(updatedProduct) => {

/* You can assign back the updated product to the model holding the form's product*/

}

);

}

```

`onRemoveProduct()` can be called when you need to delete a product. This method the array `.filter()` method to filter out the deleted product from the array of products:

  

```ts

onRemoveProduct(product) {

this.restProvider

.deleteProductById(product.id)

.subscribe(

() => {

this.products = this.products.filter((e) =>  e.id !== product.id);

}

);

}

```

## Concluion

This is the end of this tutorial where we have seen how to make HTTP requests in your Ionic 5/Angular app. The next tutorial in this tutorial series is: [Unit Testing Angular Services with HttpTestingController](https://www.techiediaries.com/angular-testing-httptestingcontroller)