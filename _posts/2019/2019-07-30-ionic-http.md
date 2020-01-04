---
layout: post
title: "Ionic 4/Angular Tutorial: HTTP and RxJS Observables"
image: "images/content/ionic3.jpg"
excerpt: "In this tutorial, we'll see by example how to send HTTP (Ajax) requests to REST API servers (for calling APIs and consuming data) in Ionic 3 and Angular 4.3+ then how to mock requests using the HttpTestingController provider for unit-testing your apps without making real API calls." 
tags : [ionic] 
featured: true
---

**In this Ionic 4/Angular tutorial, we'll see by example how to send HTTP (AJAX) requests to REST API servers (for calling APIs and consuming data) in Ionic 4 and Angular.**


> **Note**: For a complete and detailed tutorial, check out:
>
> - [Ionic 4 JWT Authentication Tutorial: Using Angular HttpClient with Node & Express.js Server](https://www.techiediaries.com/ionic-jwt-authentication-httpclient)
> - [Ionic 4 Tutorial: Building and Theming a Login & Register UI with Angular Forms](https://www.techiediaries.com/ionic-ui-forms-theming)



**We'll first start by creating a simple CRUD (Create, Read, Update and Delete) mock server using *json-server*, then we'll see how to create an Angular service which wraps the new Angular 4.3+ HttpClient module for sending HTTP requests.**

**We'll also learn how to use the RxJS Observables and the operators such as *map()* to work with *HttpClient* requests and responses.**

**Finally we'll learn with a simple example how to use the *HttpClientTestingModule* to mock requests with its *HttpTestingController* service for the purpose of unit testing your Angular 4.3+ or Ionic 3 application without making real API calls.**

<div id="toc_container">
<p class="toc_title">Ionic 3 and Angular 4|5 Tutorial Series: HTTP and RxJS Observables</p>
<ul class="toc_list">
<li>
<a name="Introduction">Introduction</a>
</li>
<li>
<a name="Understanding_REST_APIs_RxJS">Understanding REST APIs and RxJS</a>
</li>
<li>
<a name="What_Is_REST_API">What's a REST API?</a>
</li>
<li>
<a name="RxJS_Reactive_Programming">What's RxJS (Reactive Programming)?</a>
</li>
<li>
<a name="What_Are_You_Going_to_Learn">What Are You Going to Learn?</a>
</li>
<li>
<a name="Configure_Ionic_Application_ HttpClient_Module">Configure the Ionic Application to Use The *HttpClient* Module</a>
</li>
<li>
<a name="Building_REST_API_Back_End">Building a REST API Back-End</a>
</li>
<li>
<a name="Conclusion">Conclusion</a>
</li>
</ul>
</div>

This tutorial is part of a tutorial series that contains the following tutorials:

* Introduction and Building the API Back-End (this one)
* [Building an HTTP Service to Communicate with A REST API](https://www.techiediaries.com/ionic-http-client) 
* [Unit Testing Angular Services with HttpTestingController](https://www.techiediaries.com/angular-testing-httptestingcontroller)

## <a name="Introduction">Introduction</a>

Most modern applications, nowadays, rely on some remote service to consume data. REST APIs provide an interface that allows different clients such as web browsers and mobile devices to communicate with HTTP servers without building a back-end for each client.

Ionic 2+ is based on Angular 2+, a completely rewritten from scratch framework for building web applications with TypeScript (a super-set and strongly typed version of JavaScript created by Microsoft).

This tutorial is a part of a series of tutorials for teaching developers how to create CRUD mobile applications with Ionic 3 and the Angular's **HttpClient** module.

You'll learn, by a simple example:

* how to send data to your API server, from an Ionic 3/Angular 4.3+ web or mobile application, by using an HTTP POST request

* how to retrieve data from your API server by sending HTTP GET requests then use an Ionic List to display these data to users

* how to update your items by sending HTTP PUT requests with *HttpClient*

* How to delete data from a REST server by sending HTTP DELETE requests

* how to authenticate/authorize Ionic 3 apps with Firebase

* How to integrate Ionic 3 with a PHP API back-end

* How to integrate Ionic 3 with a Firebase back-end

Throughout these tutorials we'll be calling different hosted REST APIs. We will also see how to build APIs using pure PHP and also Django.

We'll be using the new **HttpClient** module, introduced in Angular 4.3+, instead of the old Angular HTTP service, which is now deprecated in Angular 5.

## <a name="Understanding_REST_APIs_RxJS">Understanding REST APIs and RxJS</a>

First, let's cover some HTTP-related terminology: Clients (like web browsers and mobile devices) communicate with API-based servers through sending HTTP requests. Then servers replay back with HTTP responses. HTTP requests and responses hold metadata and data that get exchanged between the client and the server.

### <a name="What_Is_REST_API">What's a REST API?</a>

An API stands for **A**pplication **P**rograming **I**nterface and it provides a way for communication between clients and servers via HTTP methods (POST, GET, PUT and DELETE etc.).

REST is acronym for **RE**presentational **S**tate **T**ransfer. It's an architectural style for distributed systems which is based on *6* constraints among them the client-server architecture and statelessness. You can read more about REST in this [Wikipedia article](https://en.wikipedia.org/wiki/Representational_state_transfer).

### <a name="RxJS_Reactive_Programming">What's RxJS (Reactive Programming)?</a>

>RxJS is a library for reactive programming using Observables, to make it easier to compose asynchronous or callback-based code. This project is a rewrite of Reactive-Extensions/RxJS with better performance, better modularity, better debuggable call stacks, while staying mostly backwards compatible, with some breaking changes that reduce the API surface. --[http://reactivex.io/rxjs/](http://reactivex.io/rxjs/)

## <a name="What_Are_You_Going_to_Learn">What Are You Going to Learn?</a>

I'm not going to cover how to create an Ionic 3 application since I have done it in many tutorials before. I also assume you have a development environment setup. For quickly getting up and running you only have to install Node.js, Cordova and the Ionic CLI so make sure you have these requirments installed then next generate a new Ionic 3 project and follow these steps:

* configure the Ionic application to use the **HttpClient** module
* create a mock REST API server using **json-server**
* create a service provider to wrap the **HttpClient** logic
* use the **HttpClientTestingModule** to mock HTTP calls when unit-testing your Ionic app.

By the end of this article, you will, hopefully, learn:

* how you can make use of the new Angular 4.3+ HTTP client to send HTTP or Ajax requests from your Ionic 3 mobile application (or also from your Angular 4.3+ web application)
* how you can use the Angular RxJS Observables
* how you can mock HTTP requests to use fake endpoints instead of the actual API endpoints when you are unit-testing your Ionic application

So, let’s get started!

## <a name="Configure_Ionic_Application_ HttpClient_Module">Configure the Ionic Application to Use The *HttpClient* Module</a>

Let's start with the first step--we need to tell the app to use the new Angular 4.3+ module (i.e **HttpClient**) to send HTTP requests. It's a part of Angular, we just need to import it and then add it to our *imports* array in `src/app/app.module.ts`.

So go ahead and open the app module file in `src/app/app.module.ts` then update it to reflect the changes below:

```typescript

/* Other imports */

import { HttpClientModule } from  '@angular/common/http';

@NgModule({

declarations: [

MyApp

],

imports: [

BrowserModule,

HttpClientModule,

IonicModule.forRoot(MyApp)

],

/* ... */

})

export  class  AppModule {}

```

## <a name="Building_REST_API_Back_End">Building a REST API Back-End</a>

Actually, we are going to create a fake API back-end using [**json-server**](https://github.com/typicode/json-server) which allows you to quickly generate an API from JSON data to prototype your application before creating the real endpoints. You can then swap the fake back-end with a real API that can be built using your prefered language such as JavaScript and Node.js, PHP or Python etc.

So let's first install **json-server**. Head back to your terminal or command prompt, navigate to your project's root folder, where `package.json` exists, then run the following command:

```bash
npm install json-server --save-dev
```

This will install the **json-server** package and add it to the list of your project's development dependencies.

Next, in the same root folder of your project, create a file named `db.json` then add the following contents to create JSON data for **json-server** to use when exposing the endpoints:

```json

{

"products": [

{

"id": 1,

"name": "Product001",

"cost": 10.0,

"quantity": 1000,

"locationId" : 1,

"familyId" : 1

}

]

}

```

You can see the full example from this [link](https://github.com/techiediaries/angular-httpclient-examples/blob/master/db.json).

Next you can start the API server with:

```bash
json-server --watch db.json
```

That's all you need to do! You don't have to setup a database or create API endpoints to start building your front-end application that needs to consume custom endpoints, but of course that's just for testing before you can build your real API back-end.

You now have a REST API server listening on port *3000* which can respond to POST, GET, PUT and DELETE requests.

So just to make sure your back-end is running as expected, you can use your web browser to navigate to *http://localhost:3000*.

If you just create the one *products* array like in the previous example, the following endpoints will be exposed:

* GET `/products`: get all available products
* GET `/products/:id`: get a product with its *id*
* POST `/products`: create a new product
* PUT `/products/:id`: update a product by its *id*
* DELETE `/products/:id`: delete a product by its *id*

If you now use your web browser to navigate to this endpoint: `http://localhost:3000/products`, you should see a JSON response with all the products we have created in `db.json` or by sending POST requests (which eventually get persisted in `db.json`).

## <a name="Conclusion">Conclusion</a>

In this first tutorial we have built the fake API back-end. In [the next tutorial](https://www.techiediaries.com/ionic-http-client) we'll build the actual HTTP service.