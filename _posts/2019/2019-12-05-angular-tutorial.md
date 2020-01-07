---
layout: post
title: "Angular 9/8 Tutorial By Example: REST CRUD APIs & HTTP GET Requests with HttpClient"
image: "images/content/angular-by-example-httpclient-get.png"
excerpt: "In this Angular 9 tutorial, we'll learn to build an Angular 9 example application going through all the required steps from creating/simulating a REST API, scaffolding
 a new project, setting up the essential APIs, and finally building and deploying your final application to the cloud" 
tags : [angular, angular8, angular9, angular-9-ngfor-examples, angular-9-ngif-examples, angular-9-httpclient-examples, angular-9-router-examples, angular-9-material-examples, angular-9-tutorials ] 
---


In this Angular 9 tutorial, we'll learn to build an Angular 9 CRUD example application going through all the required steps from creating/simulating a REST API, scaffolding
 a new project, setting up the essential APIs, and finally building and deploying your final application to the cloud.   

- We'll learn by example how to send GET requests with URL query strings and parameters and process HTTP responses from REST API servers in your Angular 9/8 application using `Httplient` for fetching and consuming JSON data, how to do error handling for HTTP errors using the RxJS `throwError()` and `catchError()` operators, how to retry failed HTTP requests in poor network connections and cancel pending requests using the RxJS `retry()` and `takeUntil()` operators, and finally how to deploy the application to Firebase hosting using the latest Angular 8.3+ features. 
- We'll also see how to use Angular services and RxJS Observables, and learn how to set up Angular Material in our project and style the UI with Material Design components.
- We'll see how to use the new `ng deploy` feature in Angular 8.3+ to easily deploy your Angular 9 application from the command-line to Firebase hosting. 

Angular 9 is currently in RC version, and comes with various [new features](https://www.techiediaries.com/angular-features) and improvements particularly the new Ivy renderer.

This tutorial is now updated to the latest Angular 9 version. 


> **Note**: Please note that we are using HttpClient which is an improved version of the HTTP Client API, available starting 
from Angular version [4.3.0-rc.0](https://github.com/angular/angular/blob/master/CHANGELOG.md#430-rc0-2017-07-08). The old HTTP client is not available in Angular 9. 

You can also check out how to use HttpClient with Angular 9 to build a news application that fetches JSON data from a third-party REST API [in this tutorial](https://www.techiediaries.com/angular-tutorial-example-rest-api-httpclient-get-ngfor). 

<iframe width="640" height="360" src="https://www.youtube.com/embed/lZAP871qYDw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>



Throughout this step by step Angular 9 tutorial, we are going to see a practical CRUD example of how to use the HttpClient that's available from the
`@angular/common/http` package, to make HTTP GET requests using the `get()` method.

We'll cover:

- How to create a fake and complete working CRUD REST API,
- How to install Angular CLI v9,
- How to create an Angular 9 project using Angular CLI,
- How to set up Angular Material and style your application with Material Design,
- How to create Angular components, routing and navigation between them,
- How to create and inject Angular services, 
- How to send HTTP GET requests to servers using HttpClient,
- How to use the HttpParams class to add URL query strings in your HttpRequest,
- How to subscribe and unsubscribe from RxJS Observables returned by HttpClient,
- How to handle HTTP errors using the `throwError()` and `catchError()` operators,
- How to retry failed HTTP requests using the RxJS `retry()` operator,
- How to unsubscribe from RxJS Observables returned from HttpClient methods using the `takeUntil()` operator when requests are concelled,
- How to build your application for production and deploy it to Firebase hosting using the new `ng deploy` command available from Angular 8.3+ 

The steps of this Angular 9 tutorial are as follows:

- Angular Tutorial, Step 1 — Setting up Angular CLI v9
- Angular Tutorial, Step 2 — Initializing a New Angular 9 Example Project
- Angular Tutorial, Step 3 — Setting up a (Fake) JSON REST API
- Angular Tutorial, Step 4 — Setting up Angular HttpClient v9 in our Example Project 
- Angular Tutorial, Step 5 — Creating Angular 9 Components
- Angular Tutorial, Step 6 — Adding Angular 9 Routing
- Angular Tutorial, Step 7 — Styling the UI with Angular Material v9
- Angular Tutorial, Step 8 — Consuming the JSON REST API with Angular HttpClient v9
- Angular Tutorial, Step 9 — Adding HTTP Error Handling with RxJS `catchError()` & `HttpClient`
- Angular Tutorial, Step 10 — Retrying Failed HTTP Requests with RxJS `retry()` & `HttpClient`
- Angular Tutorial, Step 11 — Unsubscribing from HttpClient Observables with RxJS `takeUntil()`  
- Angular Tutorial, Step 12 — Adding URL Query Parameters to the HttpClient get() Method
- Angular Tutorial, Step 13 — Getting the Full HTTP Response with Angular HttpClient v9
- Angular Tutorial, Step 14 — Requesting a Typed HTTP Response with Angular HttpClient v9
- Angular Tutorial, Step 15 — Building and Deploying your Angular 9 Application to Firebase Hosting


Let's get started by introducing Angular HttpClient, its features and why using it.

## What is Angular HttpClient?

Front end applications, built using frameworks like Angular communicate with backend servers through REST APIs (which are based on the HTTP protocol) using either the `XMLHttpRequest` interface or the `fetch()` API.

Angular HttpClient makes use of the `XMLHttpRequest` interface that supports both modern and legacy browsers.

The HttpClient is available from  the `@angular/common/http` package and has a simplified API interface and powerful features such as easy testability, typed request and response objects, request and response interceptors, reactive APIs with RxJS Observables, and streamlined error handling.

## Why Angular HttpClient?

The `HttpClient` builtin service provides many advantages to Angular developers:

- HttpClient makes it easy to send and process HTTP requests and responses,
- HttpClient has many builtin features for implementing test units,
- HttpClient makes use of RxJS Observables for handling asynchronous operations instead of Promises which simplify common web development tasks such as 
- - The concelation of HTTP requests,
- - Listenning for the progression of download and upload operations,
- - Easy error handling, 
- - Retrying failed HTTP requests, etc. 

Now after introducing HttpClient, let's proceed to building our example application starting with the prerequisites needed to successfully complete our Angular 9 tutorial.

## Prerequisites   

Before getting started you need a few prerequisites:

- Basic knowledge of TypeScript. Particularly the familiarity with Object Oriented concepts such as TypeScript classes and decorators.
- A local development machine with **Node 10+**, together with **NPM 6+** installed. Node is required by the Angular CLI like the most frontend tools nowadays. You can simply go to the downloads page of [the official website](https://nodejs.org/downloads) and download the binaries for your operating system. You can also refer to your specific system instructions for how to install Node using a package manager. The recommended way though is using [NVM](https://github.com/nvm-sh/nvm) — Node Version Manager — a POSIX-compliant bash script to manage multiple active Node.js versions.

> **Note**: If you don't want to install a local environment for Angular development but still want to try the code in this tutorial, you can use [Stackblitz](https://stackblitz.com/), an online IDE for frontend development that you can use to create an Angular project compatible with Angular CLI.

If you have the previous prerequisites, you are ready for the next steps of our Angular 9 tutorial that will teach you by example how to use Angular HttpClient to send HTTP GET requests for fetching JSON data and the various RxJS operators such as `catchError()`, `tap()`, `retry()`, and `takeUntil()` for implementing advanced features such as error handling, retrying failed HTTP requests and cancelling pending requests.

In the first step(s) of our tutorial, we'll see how to install Angular CLI 9 and create an example project from scratch.


## Angular Tutorial, Step 1 — Setting up Angular CLI v9

In this step, we'll install the latest Angular CLI 9 version (at the time of writing this tutorial).

> **Note**: These instructions are also valid for Angular 8.

![Angular CLI](https://www.diigo.com/file/image/rscqpoqzoceeaeedqzdspasasb/Angular+CLI+8.jpg)

[Angular CLI](https://cli.angular.io/) is the official tool for initializing and working with Angular projects. To install it, open a new command-line interface and run the following command:

```bash
$ npm install -g @angular/cli@next 
```

At the time of writing this tutorial, **angular/cli v9.0.0-rc.2** will be installed on your system.

Please note that until Angular 9 is officialy released, you need to use the `@next` tag to install the latest pre-release version.

If you run the `ng version` command, you should get a similar output:

```bash
Angular CLI: 9.0.0-rc.2
Node: 10.16.3
OS: win32 ia32
Angular:
...

Package                      Version
------------------------------------------------------
@angular-devkit/architect    0.900.0-rc.2
@angular-devkit/core         9.0.0-rc.2
@angular-devkit/schematics   9.0.0-rc.2
@schematics/angular          9.0.0-rc.2
@schematics/update           0.900.0-rc.2
rxjs                         6.5.3
```

In the next step, we'll learn how to intialize a new example project from the command-line.

## Angular Tutorial, Step 2 — Initializing a New Angular 9 Example Project

In this step, we'll proceed to create our example project. Head back to your command-line interface and run the following commands:

```bash
$ cd ~
$ ng new angular-httpclient-example
```

The CLI will ask you a couple of questions — If **Would you like to add Angular routing?** Type **y** for Yes and **Which stylesheet format would you like to use?** Choose **CSS**.

This will instruct the CLI to automatically set up routing in our project so we'll only need to add the routes for our components to implement navigation in our application.

If you run the `ng version` command inside your project's folder, you should get a similar output:

```bash
Angular CLI: 9.0.0-rc.2
Node: 10.16.3
OS: win32 ia32
Angular: <error>
... animations, cli, common, compiler, compiler-cli, core, forms
... language-service, platform-browser, platform-browser-dynamic
... router

Package                         Version
---------------------------------------------------------
@angular-devkit/architect       0.900.0-rc.2 (cli-only)
@angular-devkit/build-angular   <error>
@angular-devkit/core            9.0.0-rc.2 (cli-only)
@angular-devkit/schematics      9.0.0-rc.2 (cli-only)
@schematics/angular             9.0.0-rc.2 (cli-only)
@schematics/update              0.900.0-rc.2 (cli-only)
rxjs                            6.5.3 (cli-only)
typescript                      3.6
```

Next, navigate to you project’s folder and run the local development server using the following commands:

```bash
$ cd angular-httpclient-example
$ ng serve    
```

A local development server will start listening on the `http://localhost:4200/` address.
![Angular CLI Ng Serve](https://www.diigo.com/file/image/rscqpoqzoceeaposbzdspascea/Angular+CLI+Ng+Serve.jpg)

Open your web browser and navigate to the `http://localhost:4200/` address to see your app up and running. This is a screenshot at this point:
 
![Angular 9 Project](https://paper-attachments.dropbox.com/s_F52E295BB9C92BEFE7506DFCE2086C2583C762072AFE2CA1A9CE9AD4DA9FF751_1567465432228_Angulardemo.png)

You should now leave the development server running and start a new command-line interface for running the CLI commands of the next steps.

In the next step, we'll learn how to create a fake JSON REST API that we'll be consuming in our Angular example application.


## Angular Tutorial, Step 3 — Setting up a (Fake) JSON REST API

Before we proceed to develop our Angular application, we'll need to prepare a JSON REST API that we can consume using `HttpClient`. 

We can also consume or fetch JSON data from third-party REST API servers but in this example, we choose to create a fake REST API. Check out this [tutorial](https://www.techiediaries.com/angular-tutorial-example-rest-api-httpclient-get-ngfor) for a real REST API example. As far as Angular concerned, there is no difference between consuming fake or real REST APIs.

As said, you can either use an external API service, create a real REST API server 
or create a fake API using `json-server`. In this example we'll use the last approach.

So head over to a new command-line interface and start by installing `json-server` from npm in your project:

```bash
$ cd ~/angular-httpclient-example
$ npm install --save json-server 
```

Next, create a `server` folder in the root folder of your Angular project:

```bash
$ mkdir server
$ cd server
```

In the `server` folder, create a `database.json` file and add the following JSON object:

```json
{
    "products": []
}
```

This JSON file will act as a database for your REST API server. You can simply add some data to be served by your REST API or use [Faker.js](https://github.com/marak/Faker.js/) for automatically generating massive amounts of realistic fake data.

Go back to your command-line, navigate back from the `server` folder, and install `Faker.js` from npm using the following command:

```bash
$ cd ..
$ npm install faker --save
```

At the time of creating this example, **faker v4.1.0** will be installed.

Now, create a `generate.js` file and add the following code:

```js
var faker = require('faker');

var database = { products: []};

for (var i = 1; i<= 300; i++) {
  database.products.push({
    id: i,
    name: faker.commerce.productName(),
    description: faker.lorem.sentences(),
    price: faker.commerce.price(),
    imageUrl: "https://source.unsplash.com/1600x900/?product",
    quantity: faker.random.number()
  });
}

console.log(JSON.stringify(database));
```

We first imported faker, next we defined an object with one empty array for products. Next, we entered a *for* loop to create *300* fake entries using faker methods like `faker.commerce.productName()` for generating product names. [Check  all the available methods](https://github.com/marak/Faker.js/#api-methods). Finally we converted the database object to a string and log it to standard output. 

Next, add the `generate` and `server` scripts to the `package.json` file:

```json
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e",
    "generate": "node ./server/generate.js > ./server/database.json",
    "server": "json-server --watch ./server/database.json"
  },
```

Next, head back to your command-line interface and run the generate script using the following command:

```bash
$ npm run generate
```

Finally, run the REST API server by executing the following command:

```bash
$ npm run server
```

You can now send HTTP requests to the server just like any typical REST API server. Your server will be available from the `http://localhost:3000/` address. 

![REST API Server](https://www.diigo.com/file/image/rscqpoqzoceebosqezdspasrrr/Screenshot_13.jpg?k=09fbe087b8cbb43fe7505e357e7a0e23)

These are the API endpoints we'll be able to use via our JSON REST API server:

- `GET /products` for getting the products,
- `GET    /products/<id>` for getting a single product by id,
- `POST   /products` for creating a new product,
- `PUT    /products/<id>` for updating a product by id,
- `PATCH  /products/<id>` for partially updating a product by id,
- `DELETE /products/<id>` for deleting a product by id.

You can use  `_page`  and `_limit`  parameters to get paginated data. In the  `Link`  header you'll get  `first`,  `prev`,  `next`  and  `last`  links.

For example:

`GET /products?_page=1` for getting the first page of data, 
`GET /products?_page=1&_limit=5` for getting the first five products of the first page of data.

>**Note**: You can use other features such as filters, sorting and ordering. For more information, check out the [docs](https://github.com/typicode/json-server).

Leave the JSON REST API server running and open a new command-line interface for typing the commands of the next steps.

As a summary of what we have done — We installed Angular CLI and initialized a new project based on the latest Angular 9 version. Then, we created a REST API using `json-server` based on a JSON file. In the next step of our Angular 9 tutorial, we'll learn how to set up `HttpClient` in our Angular 9 project.


## Angular Tutorial, Step 4 — Setting up Angular 9 HttpClient in our Example Project 

In this step, we'll proceed to set up the `HttpClient` module in our example.

`HttpClient` lives in a separate Angular module, so we'll need to import it in our main application module before we can use it.

Open your example project with a code editor or IDE. I'll be using [Visual Studio Code](https://code.visualstudio.com). 

Next, open the `src/app/app.module.ts` file, import [`HttpClientModule`](https://angular.io/api/common/http/HttpClientModule#description) and add it to the `imports` array of the module as follows:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

That's all, we are now ready to use the `HttpClient` service in our project but before that we need to create a couple of components — The home and about components. This is what we'll learn to do in the next step.


## Step 5 — Creating Angular 9 Components

In this step, we'll proceed to create the Angular components that control our application UI. 

Head back to a new command-line interface and run the following command:

```bash
$ cd ~/angular-httpclient-example
$ ng generate component home
```

This is the output of the command:


    CREATE src/app/home/home.component.html (19 bytes)
    CREATE src/app/home/home.component.spec.ts (614 bytes)
    CREATE src/app/home/home.component.ts (261 bytes)
    CREATE src/app/home/home.component.css (0 bytes)
    UPDATE src/app/app.module.ts (467 bytes)

The CLI created four files for the component and added it to the `declarations` array in the `src/app/app.module.ts` file.

Next, let's create the about component using the following command:

```bash
$ ng generate component about
```

Next, open the `src/app/about/about.component.html` and add the following code:

```html
<p style="padding: 13px;">
An Angular 9 example application that demonstrates how to use HttpClient to consume REST APIs
</p>
```

We'll update the home component in the following steps.

In the next step of our Angular 9 tutorial, we'll add these components to the router.


## Angular Tutorial, Step 6 — Adding Angular 9 Routing

In this step, we'll proceed to add routing to our example.

Head back to the `src/app/app-routing.module.ts` file, that was automatically created by Angular CLI for routing configuration, and import the components then add the routes as follows:

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

We first imported the home and about components, next we added three routes including a route for redirecting the empty path to the home component, so when the user visits the app, they will be redirected to the home page.

In the next step of our example, we'll set up Angular Material in our project for styling our UI.


## Angular Tutorial, Step 7 — Styling the UI with Angular Material v9

In this step of our Angular 9 tutorial, we'll proceed to add Angular Material to our project and style our application UI.

[Angular Material](https://material.angular.io) provides Material Design components that allow developers to create professional UIs. Setting up Angular Material in our project is much easier now with the new `ng add` command of the Angular CLI v7+. 

Head back to your command-line interface, and run the following command from the root of your project: 

```bash
$ ng add @angular/material
```

You'll be asked for choosing a theme, choose **Indigo/Pink**.  

For the other options — **Set up HammerJS for gesture recognition?** and **Set up browser animations for Angular Material?** Simply press **Enter** in your keyboard to choose the default answers. 

Next, open the `src/styles.css` file and add a theme:

```css
@import "~@angular/material/prebuilt-themes/indigo-pink.css";
```

Each Angular Material component has a separate module that you need to import before you can use the component. Open the `src/app/app.module.ts` file and add the following imports:

```ts
import { MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatProgressSpinnerModule } from '@angular/material';
```

We imported the following modules:

- [MatToolbar](https://material.angular.io/components/toolbar/overview) that provides  a container for headers, titles, or actions. 
- [MatCard](https://material.angular.io/components/card/overview) that provides a content container for text, photos, and actions in the context of a single subject.
- [MatButton](https://material.angular.io/components/button/overview) that provides a native `<button>` or `<a>` element enhanced with Material Design styling and ink ripples.
- [MatProgressSpinner](https://material.angular.io/components/progress-spinner/overview) that provides a circular indicator of progress and activity.


 
Next, you need to include these modules in the `imports` array:


```ts
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Next, open the `src/app/app.component.html` file and update it as follows:

```html
<mat-toolbar color="primary">
  <h1>
    ngStore 
  </h1>
  <button mat-button routerLink="/">Home</button>
  <button mat-button routerLink="/about">About</button>

</mat-toolbar>

<router-outlet></router-outlet>
```

We created the shell of our application containing a top bar with two navigation buttons to the home and about components.

As a summary of what we did until this point of our tutorial — We have setup HttpClient and Angular Material v9 in our project, created the home and about components and configured routing, and finaly added the shell of our application containing a topbar with navigation.  

In the next step of our tutorial, we'll learn how to fetch the JSON data from our REST API server using `HttpClient` v9.


## Angular Tutorial, Step 8 — Consuming the JSON REST API with Angular HttpClient 9

In this step, we'll proceed to consume JSON data from our REST API server in our example application.

We'll need to create an Angular service for encapsulating the code that deals with consuming data from the REST API server. 

A service is a singleton that can be injected by other services and components using the Angular dependency injection.
 
> In software engineering, dependency injection is a technique whereby one object supplies the dependencies of another object.  [Source](https://en.wikipedia.org/wiki/Dependency_injection)

Now, let’s generate an Angular service that interfaces with the JSON REST API. Head back to your command-line interface and run the following command:

```bash
$ ng generate service data
```

Next, open the `src/app/data.service.ts` file, import and inject `HttpClient` as follows:

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }
}
```

We imported and injected the `HttpClient` service as a private `httpClient` instance. We also defined the `REST_API_SERVER` variable that  holds the address of our REST API server.

Next, add a `sendGetRequest()` method that sends a GET request to the REST API endpoint to retrieve JSON data:

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  public sendGetRequest(){
    return this.httpClient.get(this.REST_API_SERVER);
  }
}
```

The method simply invokes the `get()` method of `HttpClient` to send GET requests to the REST API server.
 
Next, we now need to use this service in our home component. Open the `src/app/home/home.component.ts` file, import and inject the data service as follows:

```ts
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {

    this.dataService.sendGetRequest().subscribe((data: any[])=>{
      console.log(data);
      this.products = data;
    })  
  }

}
```

We imported and injected `DataService` as a private `dataService` instance via the component constructor.
 
Next, we defined a `products` variable and called the `sendGetRequest()` method of the service for fetching data from the JSON REST API server.

Since the `sendGetRequest()` method returns the return value of the `HttpClient.get()` method which is an RxJS Observable, we subscribed to the returned Observable to actually send the HTTP GET request and process the HTTP response.

When data is received, we added it in the `products` array.
 
Next, open the `src/app/home/home.component.html` file and update it as follows:

{% raw %}
```html
<div style="padding: 13px;">
    <mat-spinner *ngIf="products.length === 0"></mat-spinner>

    <mat-card *ngFor="let product of products" style="margin-top:10px;">
        <mat-card-header>
            <mat-card-title>{{product.name}}</mat-card-title>
            <mat-card-subtitle>{{product.price}} $/ {{product.quantity}}
            </mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
            <p>
                {{product.description}}
            </p>
            <img style="height:100%; width: 100%;" src="{{ product.imageUrl }}" />
        </mat-card-content>
        <mat-card-actions>
      <button mat-button> Buy product</button>
    </mat-card-actions>
    </mat-card>
</div>
```
{% endraw %}

We used the `<mat-spinner>` component for showing a loading spinner when the length of the `products` array equals zero i.e before no data is received from the REST API server.

Next, we iterated over the `products` array using [`ngFor`](https://www.techiediaries.com/angular-ngfor/) and used a Material card to display the `name`, `price`, `quantity`, `description` and `image` of each product.
 
This is a screenshot of the home page after JSON data is fetched:

![Angular 9 Example](https://www.diigo.com/file/image/rscqpoqzoceecpdoczdspbaqes/Angular+8+Example.jpg?k=7c12b74876bb19d81f1a3528d82b79d3)

Next, we'll see how to add error handling to our service.


## Angular Tutorial, Step 9 — Adding HTTP Error Handling with RxJS `catchError()` & `HttpClient`

In this step, we'll proceed to add error handling in our example application.

The Angular's HttpClient methods can be easily used with the `catchError()` operator from RxJS, since they return Observables, via the `pipe()` method for catching and handling errors. We simply need to define a method to handle errors within your service.  

There are two types of errors in front-end applications:

- Client-side errors such as network issues and JavaScript syntax and type errors. These errors return `ErrorEvent` objects.
- Server-side errors such as code errors in the server and database access errors. These errors return HTTP Error Responses.

As such, we simply need to check if an error is an instance of `ErrorEvent` to get the type of the error so we can handle it appropriately.

Now, let's see this by example. Open the `src/app/data.service.ts` file and update it accordingly:

```ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "http://localhost:3000/products";

  constructor(private httpClient: HttpClient) { }
  
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  
  public sendGetRequest(){
    return this.httpClient.get(this.REST_API_SERVER).pipe(catchError(this.handleError));
  }
}
```

As you can see, this needs to be done for each service in your application which is fine for our example since it only contains one service but once your application starts growing with many services which may all throw errors you need to use better solutions instead of using the `handleError` method per each service which is error-prone.  One solution is to handle errors globally in your Angular application using [HttpClient interceptors](https://angular.io/guide/http#http-interceptors).

This is a screenshot of an error on the console if the server is unreachable:

![Angular HttpClient Error Example](https://www.diigo.com/file/image/rscqpoqzoceparbcdzdspbsdqs/Angular+8+HttpClient+Error+Example.jpg?k=0cf29bd609aca489cfa3e16a606feb2c)

In the next step, we'll see how to improve our data service by automatically retry sending the failed HTTP requests.


## Angular Tutorial, Step 10 — Retrying Failed HTTP Requests with RxJS `retry()` & `HttpClient`

In this step of our Angular 9 tutorial, we'll see how to use the `retry()` operator of RxJS with HttpClient to automatically resubscribing to the returned Observable which results in resending the failed HTTP requests.

In many cases, errors are temporary and due to poor network conditions so simply trying again will make them go away automatically. For example, in mobile devices network interruptions are frequent so if the user tries again, they may get a successful response. Instead of letting users manually retry, let's see how to do that automatically in our example application.  

The RxJS library provides several retry operators. Among them is the `retry()` operator which allows you to automatically re-subscribe to an RxJS Observable a specified number of times. Re-subscribing to the Observable returned from an HttpClient method has the effect of resending the HTTP request to the server so users don't need to repeat the operation or reload the application.

You can use the RxJS `retry()` operator by piping it (using the `pipe()` method) onto the Observable returned from the HttpClient method before the error handler.

Go to the `src/app/data.service.ts` file and import the `retry()` operator:

```ts
import { retry, catchError } from 'rxjs/operators';
```

Next update the `sendGetRequest()` method as follows:

```ts
  public sendGetRequest(){
    return this.httpClient.get(this.REST_API_SERVER).pipe(retry(3), catchError(this.handleError));
  }
```

This will retry sending the failed HTTP request three times.
 
In the next step, we'll see how to unsubscribe from RxJS Observables in our example home component.


## Angular Tutorial, Step 11 — Unsubscribing from HttpClient Observables with RxJS `takeUntil()`  

In this step of our Angular 9 tutorial, we'll learn about why we need and how to unsubscribe from Observables in our code using the `takeUntil()` operator.

First of all, do you need to unsubscribe from the Observables returned by the `HttpClient` methods?

Generally, you need to manually unsubscribe from any subscribed RxJS Observables in your Angular components to avoid memory leaks but in the case of HttpClient, this is automatically handled by Angular by unsubscribing when the HTTP response is received. However, there are some cases when you need to manually unsubscribe for example to cancel pending requests when users are about to leave the component.

We can simply call the `unsubscribe()` method from the `Subscription` object returned by the `subscribe()` method in the `ngOnDestroy()` life-cycle method of the component to unsubscribe from the Observable.

There is also a better way to unsubscribe from or complete Observables by using the `takeUntil()` operator.

The [takeUntil()](https://rxjs.dev/api/operators/takeUntil) operator emits the values emitted by the source Observable until a notifier Observable emits a value.

Let's see how to use this operator to complete Observables when the component is destroyed.

Check out [How to cancel/unsubscribe all pending HTTP requests angular 4+](https://stackoverflow.com/questions/46068908/how-to-cancel-unsubscribe-all-pending-http-requests-angular-4).

Open the `src/app/home/home.component.ts` file and update it as follows:

```ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  products = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dataService: DataService) { }

  ngOnInit() {

    this.dataService.sendGetRequest().pipe(takeUntil(this.destroy$)).subscribe((data: any[])=>{
      console.log(data);
      this.products = data;
    })  
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
```

We first imported the `OnDestroy` interface, `Subject` and the `takeUntil()` operator. Next, we implemented the `OnDestroy` interface and added the `ngOnDestroy()`
lifecycle hook to the component.

Next, we created an instance of `Subject` which can emit boolean values (the type of the value doesn't really matter in this example) that will be used as the notifier of the `takeUntil()` operator. 

Next, in the `ngOnInit()` lifecycle hook, we called the `sendGetRequest()` of our data service and called the `pipe()` method of the returned Observable to pipe the `takeUnitl()` operator and finaly subscribed to the combined Observable. In the body of the `subscribe()` method, we added the logic to put the fetched data of the HTTP response in the `products` array.

The `takeUntil()` operator allows a notified Observable to emit values until a value is emitted from a notifier Observable. 

When Angular destroys a component it calls the `ngOnDestroy()` lifecycle method which, in our case, calls the `next()` method to emit a value so RxJS completes all subscribed Observables.

That's it. In this step, we have added the logic to cancel any pending HTTP request by unsubscribing from the returned Observable in case the user descides to navigate away from the component before the HTTP response is received.    

In the next step of our Angular 9 tutorial, we'll see how to use URL query parameters with the `get()` method of `HttpClient`. 


## Angular Tutorial, Step 12 — Adding URL Query Parameters to the HttpClient get() Method

In this step, we'll start adding the logic for implementing pagination in our example application. We'll see how to use URL query parameters via [`fromString` and `HttpParams`](https://angular.io/guide/http#use-fromstring-to-create-httpparams) to provide the appropriate values for the the `_page` and `_limit` parameters of the `/products`  endpoint of our JSON REST API server for getting paginated data. 

Open the `src/app/data.service.ts` file and start by adding the following the import for `HttpParams`:

```ts
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
```

Next, update the `sendGetRequest()` method as follows:

```ts
  public sendGetRequest(){
    // Add safe, URL encoded_page parameter 
    const options = { params: new HttpParams({fromString: "_page=1&_limit=20"}) };
    return this.httpClient.get(this.REST_API_SERVER, options).pipe(retry(3), catchError(this.handleError));
  }
```

We used `HttpParams` and `fromString` to create HTTP query parameters from  the `_page=1&_limit=20` string. This tells to returns the first page of 20 products.

Now the `sendGetRequest()` will be used to retrieve the first page of data. The  received HTTP response will contain a Link header with information about the first, previous, next and last links of data pages.

In the Link header you’ll get first, prev, next and last links. In the next step, we'll see how to extract these pagination links by parsing full HTTP responses. 



## Angular Tutorial, Step 13 — Getting the Full HTTP Response with Angular HttpClient 9

In this ste, we'll proceed by implementing the logic for retrieving pagination information from the Link header contained in the HTTP response received from the JSON REST API server.

By default, HttpClient does only provide the response body but in our case we need to parse the Link header for pagination links so we need to tell `HttpClient` that we want the full [`HttpResponse`](https://angular.io/api/common/http/HttpResponse) using the `observe` option.

> The Link header in HTTP allows the server to point an interested client to another resource containing metadata about the requested resource.[Wikipedia](https://www.w3.org/wiki/LinkHeader)


Go to the src/app/data.service.ts file and import the RxJS `tap()` operator: 

```ts
import { retry, catchError, tap } from 'rxjs/operators';
```
Next, define the following string variables:

```ts
  public first: string = "";
  public prev: string = "";
  public next: string = "";
  public last: string = "";
```

Next, define the `parseLinkHeader()` method which parses the Link header and populate the previous variables accordingly:

```ts
  parseLinkHeader(header) {
    if (header.length == 0) {
      return ;
    }

    let parts = header.split(',');
    var links = {};
    parts.forEach( p => {
      let section = p.split(';');
      var url = section[0].replace(/<(.*)>/, '$1').trim();
      var name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;

    });
    
    this.first  = links["first"];
    this.last   = links["last"];
    this.prev   = links["prev"];
    this.next   = links["next"]; 
  }
```

Next, update the `sendGetRequest()` as follows:

```ts
  public sendGetRequest(){
    // Add safe, URL encoded _page and _limit parameters 
    
    return this.httpClient.get(this.REST_API_SERVER, {  params: new HttpParams({fromString: "_page=1&_limit=20"}), observe: "response"}).pipe(retry(3), catchError(this.handleError), tap(res => {
      console.log(res.headers.get('Link'));
      this.parseLinkHeader(res.headers.get('Link'));
    }));
  }
```

We added the `observe` option with the `response` value in the options parameter of the `get()` method so we can have the full HTTP response with headers. Next, we use the RxJS `tap()` operator for parsing the Link header before returning the final Observable.

Since the `sendGetRequest()` is now returning an Observable with a full HTTP response, we need to update the home component so open the `src/app/home/home.component.ts` file and import `HttpResponse` as follows:

```ts
import { HttpResponse } from '@angular/common/http';
```

Next, update the `subscribe()` method as follows:

```ts
  ngOnInit() {

    this.dataService.sendGetRequest().pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>)=>{
      console.log(res);
      this.products = res.body;
    })  
  }
```

We can now access the data from the `body` object of the received HTTP response.

Next, go back to the src/app/data.service.ts file and add the following method:

```ts
  public sendGetRequestToUrl(url: string){
    return this.httpClient.get(url, { observe: "response"}).pipe(retry(3), catchError(this.handleError), tap(res => {
      console.log(res.headers.get('Link'));
      this.parseLinkHeader(res.headers.get('Link'));
 
    }));
  }
```

This method is similar to `sendGetRequest()` except that it takes the URL to which we need to send an HTTP GET request.

Go back to the `src/app/home/home.component.ts` file and add define the following methods:

```ts
  public firstPage() {
    this.products = [];
    this.dataService.sendGetRequestToUrl(this.dataService.first).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.products = res.body;
    })
  }
  public previousPage() {

    if (this.dataService.prev !== undefined && this.dataService.prev !== '') {
      this.products = [];
      this.dataService.sendGetRequestToUrl(this.dataService.prev).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.products = res.body;
      })
    }

  }
  public nextPage() {
    if (this.dataService.next !== undefined && this.dataService.next !== '') {
      this.products = [];
      this.dataService.sendGetRequestToUrl(this.dataService.next).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.products = res.body;
      })
    }
  }
  public lastPage() {
    this.products = [];
    this.dataService.sendGetRequestToUrl(this.dataService.last).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.products = res.body;
    })
  }
```

Finally, add open the `src/app/home/home.component.html` file and update the template as follows:

{% raw %}
```html
<div style="padding: 13px;">
    <mat-spinner *ngIf="products.length === 0"></mat-spinner>

    <mat-card *ngFor="let product of products" style="margin-top:10px;">
        <mat-card-header>
            <mat-card-title>#{{product.id}} {{product.name}}</mat-card-title>
            <mat-card-subtitle>{{product.price}} $/ {{product.quantity}}
            </mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
            <p>
                {{product.description}}
            </p>
            <img style="height:100%; width: 100%;" src="{{ product.imageUrl }}" />
        </mat-card-content>
        <mat-card-actions>
      <button mat-button> Buy product</button>
    </mat-card-actions>
    </mat-card>

</div>
<div>
    <button (click) ="firstPage()" mat-button> First</button>
    <button (click) ="previousPage()" mat-button> Previous</button>
    <button (click) ="nextPage()" mat-button> Next</button>
    <button (click) ="lastPage()" mat-button> Last</button>
</div>
```
{% endraw %}

This is a screenshot of our application:
![](https://www.diigo.com/file/image/rscqpoqzoceparbdpzdspbsdra/Angular+8+HTTP+Example.jpg?k=143b81257774810f9369004fda4c1f4c)


## Angular Tutorial, Step 14 — Requesting a Typed HTTP Response with Angular HttpClient 9

In this step, we'll see how to use typed HTTP responses in our example application.

Angular HttpClient allows you to specify the type of the response object in the request object, which make consuming the response easier and straightforward. This also enables type assertion during the compile time.

Let's start by defining a custom type using a TypeScript interface with the required properties. 

Head back to your command-line interface and run the following command from the root of your project:

```bash
$ ng generate interface  product
```

Next, open the `src/app/product.ts` file and update it as follows: 

```ts
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    imageUrl: string;
}
```

Next, specify the `Product` interface as the `HttpClient.get()` call's type parameter in the data service. Go back to the `src/app/data.service.ts` file and import the `Product` interface:

```ts
import { Product } from './product';
```

Next:

```ts
  public sendGetRequest(){

    return this.httpClient.get<Product[]>(this.REST_API_SERVER, {  params: new HttpParams({fromString: "_page=1&_limit=20"}), observe: "response"}).pipe(retry(3), catchError(this.handleError), tap(res => {
      console.log(res.headers.get('Link'));
      this.parseLinkHeader(res.headers.get('Link'));
 
    }));
  }

  public sendGetRequestToUrl(url: string){
    return this.httpClient.get<Product[]>(url, { observe: "response"}).pipe(retry(3), catchError(this.handleError), tap(res => {
      console.log(res.headers.get('Link'));
      this.parseLinkHeader(res.headers.get('Link'));
 
    }));
  }
```

Next, open the `src/app/home/home.component.ts` file and import the `Product` interface:


```ts
import { Product } from '../product';
```

Next change the type of the `products` array as follows:

```ts
export class HomeComponent implements OnInit, OnDestroy {

  products: Product[] = [];
```

Next change the type of the HTTP response in the `sendGetRequest()` call:


```ts
  ngOnInit() {

    this.dataService.sendGetRequest().pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<Product[]>) => {
      console.log(res);
      this.products = res.body;
    })
  }
```

You also need to do the same for the other `firstPage()`, `previousPage()`, `nextPage()` and `lastPage()` methods.


## Angular Tutorial, Step 15 — Building and Deploying your Angular 9 Application to Firebase Hosting

In this step, we'll see how to build and deploy our example application to Firebase hosting using the ng deploy command available in Angular 8.3+.

We'll only see how to deploy the frontend application without the fake JSON server.

Angular CLI 8.3+ introduced a new `ng deploy` command that makes it more easier than before to deploy your Angular application using the deploy CLI builder assocaited with your project. There are many third-party builders that implement deployment capabilities for different platforms. You can add any of them to your project by running the `ng add` command.

After adding a deployment package it will automatically update your workspace configuration (i.e the `angular.json` file) with a deploy section for the selected project. You can then use the `ng deploy` command to deploy that project.

Let's now see that by example by deploying our project to Firebase hosting.

Head back to your command-line interface, make sure you are inside the root folder of your Angular project and run the following command: 

```bash
$ ng add @angular/fire
```

This will add the Firebase deployment capability to your project.

The command will also update the `package.json` of our project by adding this section:

```json
        "deploy": {
          "builder": "@angular/fire:deploy",
          "options": {}
        }
```

The CLI will prompt you to **Paste authorization code here:** and will open your default web browser and ask you to give Firebase CLI permissions to administer your Firebase account:

![](https://www.diigo.com/file/image/rscqpoqzoceqeredbzdspcrcra/Angular+8+Deploy+To+Firebase.jpg?k=8ef75889c953e29aa719225581f11738)

After you signin with the Google account associated with your Firebase account, you'll be given the authorization code:

![](https://www.diigo.com/file/image/rscqpoqzoceqerecrzdspcrcqs/Angular+8+Deploy+To+Firebase.jpg?k=87a2aeaf4e473ba024eba6909794346a)



Next, you'll be prompted: **Please select a project: (Use arrow keys or type to search)**. You should have created a Firebase project before.

The CLI will create the `firebase.json` and `.firebaserc` files and update the `angular.json` file accordingly.

Next, deploy your application to Firebase, using the following command:

```bash
$ ng deploy
```


The command will produce an optimized build of your application (equivalent to the `ng deploy --prod` command), it will upload the production assets to Firebase hosting.

## Conclusion

Throughout this Angular 9 tutorial, we've built a complete working Angular application example using the latest version.

As a recap, we've particularly seen by example how to set up `HttpClient` and send HTTP GET requests with parameters using the `HttpClient.get()` method, how to handle HTTP errors using the RxJS `throwError()` and `catchError()` operators, unsubscribe from RxJS Observables for the cancelled HTTP requests using the `takeUntil()` operator and retry failed requests with the `retry()` operator and finally how to deploy our application to Firebase hosting using the latest `ng deploy` feature available from Angular 8.3+.

