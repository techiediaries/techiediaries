---
layout: post
title: "Unit Testing Angular Services with HttpTestingController"
image: "images/content/ionic3.jpg"
excerpt: "In this tutorial, we'll see by example how to send HTTP (Ajax) requests to REST API servers (for calling APIs and consuming data) in Ionic 3 and Angular 4.3+ then how to mock requests using the HttpTestingController provider for unit-testing your apps without making real API calls." 
tags : [ionic] 
featured: true
---


This tutorial is part of a tutorial series titled ¨Ionic 3, Angular 4.3+ and RxJS Observables: Building an HTTP Service to Communicate with A REST API¨  that contains the following tutorials:

* [Introduction and Building the API Back-End](https://www.techiediaries.com/ionic-http) 
* [Building an HTTP Service to Communicate with A REST API](https://www.techiediaries.com/ionic-http-client)  
* Unit Testing Angular Services with HttpTestingController (this one)

## Unit Testing Angular Services with HttpTestingController

  

The *HttpClientTestingModule* allows you to easily mock HTTP requests by providing you with the *HttpTestingController* service. In this section we’ll see how you can create tests for the previously created service using the *HttpTestingController* service to mock requests instead of making real API requests to our API back-end when testing.

  

Before you can use *HttpClientTestingModule* and its *HttpTestingController* service you first need to import and provide them in your *TestBed* alongside the service we are testing.

  

So go ahead and create `src/providers/rest/rest.spec.ts`, which will hold code for testing the Rest service, then add the following code.

  

```ts

import { TestBed, getTestBed } from  '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from  '@angular/common/http/testing';

  

import { RestProvider } from  './rest';

  

describe('RestProvider', () => {

let  injector: TestBed;

let  myProvider: RestProvider;

let  httpMock: HttpTestingController;

beforeEach(() => {

TestBed.configureTestingModule({

imports: [HttpClientTestingModule],

providers: [RestProvider]

});

testBed = getTestBed();

myProvider = testBed.get(RestProvider);

httpMock = testBed.get(HttpTestingController);

});

});

  

```

We are storing the provider and an instance of the *HttpTestingController* (*httpMock*) in variables so we can have access to them in each test that we run by using the `beforEach(()=>{})` API.

  

Now let's test the `getProducts()` method as an example:

  

```ts

describe('getProducts', () => {

it('should return an Observable<Product[]>', () => {

const  someProducts = [

{ id:  1, name :  'Product001', cost:  10 , quantity :  100 },

{ id:  2, name :  'Product002', cost:  100 , quantity :  200 },

{ id:  3, name :  'Product003', cost:  200 , quantity :  300 },

];

  

myProvider.getProducts().subscribe((products) => {

expect(products.length).toBe(3);

expect(products).toEqual(someProducts);

});

  

const  request = httpMock.expectOne(`${myProvider.baseUrl}/products`);

expect(req.request.method).toBe("GET");

request.flush(someProducts);

httpMock.verify();

});

});

```

  

Inside *it('should return an Observable<Product[]>')* we first define a varibale which holds some testing data then we call the provider's method (in this case *.getProducts()*) as we normally do. In the subscribe handler we tell Angular that we are expecting the retrun values which is *products* to equal to our *someProducts* array and that the length should equal to *3* (that's because we we are not using the real *HttpClient* but a mock based on *HttpTestingController*).

  

Next we tell the *httpMock* what's the HTTP method we expect to be sent and the endpoint'sURL.

  

Finally we fire the request with the data we use as a mock then we verify that there are no outstanding http requests.

  

You can follow the same steps for testing other HTTP methods i.e POST, PUT and DELETE or more accurately their corresponding operations in the service provider.

  
  

## Conclusion

  

So we have implemented all the required methods to create a CRUD app with Ionic 3 and Angular 4.3+ *HttpClient*. ALl you need now is to link these methods to the HTML interfaces using list, form controls and buttons.


