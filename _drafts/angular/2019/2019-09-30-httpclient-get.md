# Angular 7/8 By Example: HTTP GET Requests with HttpClient -- Deploy to Firebase Hosting, Error Handling and Observables

In this tutorial, we'll learn by example how to send GET requests with parameters to REST API servers in your Angular 7/8 application using `Httplient` for fetching JSON data, how to do error handling for HTTP errors, how to retry failed HTTP requests and finally how to deploy the application to Firebase hosting. 

We'll also see how to use Angular services, RxJS Observables, models and the `async` pipe.

We'll also learn how to set up Angular Material in our project and style the UI with Material Design components.

We'll see how to send HTTP GET requests with parameters using the `HttpClient.get()` method, how to handle HTTP errors, unsubscribe from RxJS Observables using the `takeUntil()` operator and retrying failed requests with the `retry()` operator and finally how to deploy our application to Firebase using the latest `ng deploy` feature available from Angular 8.3+.

Angular 8 was released on **May 28, 2019**, and comes with various features and improvements in the CLI and the framework. We now have small bundles and new APIs to hook into `ng add` and `ng build` commands of the CLI but also a new `ng deploy` command. This tutorial is now updated to the latest Angular 8 version. 

We'll see how to use the new `ng deploy` feature in Angular 8.3+ to easily deploy your Angular application from the command-line to Firebase hosting. 

> **Note**: Please note that we are using HttpClient which is an improved version of the HTTP Client API, available starting 
from Angular version [4.3.0-rc.0](https://github.com/angular/angular/blob/master/CHANGELOG.md#430-rc0-2017-07-08). The old HTTP client is not available in Angular 8. 

Check out the how to use HttpClient with Angular 8 to build a news application that fetches JSON data from a third-party REST API [in this tutorial](https://www.techiediaries.com/angular-tutorial-example-rest-api-httpclient-get-ngfor). 

<iframe width="640" height="360" src="https://www.youtube.com/embed/lZAP871qYDw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>



Throughout this tutorial, we are going to see practical examples of how to use `HttpClient` available from the
`@angular/common/http` package, to make HTTP GET requests using the `get()` method.

We'll also cover:

- How to create a fake and complete working REST API, 
- How to create an Angular 8 project using Angular CLI,
- How to set up Angular Material and style your application with Material Design,
- How to create Angular components,
- How to create Angular services, 
- How to subscribe and unsubscribe from RxJS Observables,
- How to use the `async` pipe in templates to subscribe to HttpClient Observables,
- How to handle HTTP errors,
- How to retry failed HTTP requests using the RxJS `retry()` operator,
- How to unsubscribe from RxJS Observables returned from HttpClient methods using the `takeUntil()` operator etc.

## What is Angular HttpClient?

Front end applications, built using frameworks like Angular communicate with backend servers through REST APIs (which are based on the HTTP protocol) using either the `XMLHttpRequest` interface or the `fetch()` API.

Angular HttpClient makes use of the `XMLHttpRequest` interface which also supports old browsers.

The HttpClient is available from  `@angular/common/http` package and has a simplified API interface and powerful features such as testability, typed request and response objects, request and response interceptors, reactive APIs with RxJS Observables, and streamlined error handling.

## Why Angular HttpClient?

The `HttpClient` builtin service provides many advantages to Angular developers:

- HttpClient makes it easy to to send and process HTTP requests and responses,
- HttpClient has many builtin features for implementing test units,
- HttpClient makes use of RxJS Observables for handling asynchronous operations instead of Promises which simplify common web development tasks such as 
- - The concelation of HTTP requests,
- - Listenning for the progression of download and upload operations,
- - Easy error handling, 
- - Retrying failed HTTP requests, etc. 

## Prerequisites   

Before getting started you need a few prerequisites:

- Basic knowledge of TypeScript. Particularly the familiarity with Object Oriented Concepts concepts such as TypeScript classes and decorators.
- A local development machine with **Node 8.9+**, together with **NPM 5.5.1+** installed. Node is required by the Angular CLI like the most frontend tools nowadays. You can simply go to downloads page of [the official website](https://nodejs.org/downloads) and download the binaries for your operating system. You can also refer to your specific system instructions for how to install Node using a package manager. The recommended way though is using [NVM](https://github.com/nvm-sh/nvm) -- Node Version Manager -- a POSIX-compliant bash script to manage multiple active Node.js versions.

> **Note**: If you don't want to install a local environment for Angular development but still want to try the code in this tutorial, you can use [Stackblitz](https://stackblitz.com/), an online IDE for frontend development that you can use to create an Angular project compatible with Angular CLI.

If you have the previous prerequisites, you are ready for the next steps of our tutorial that will teach you by example how to use Angular HttpClient to send HTTP GET requests for fetching JSON data.

In the first step(s) of our tutorial, we'll see how to install Angular CLI 8 and create a project from scratch.


## Step 1 -- Setting up Angular CLI v8

In this step, we'll install the latest Angular CLI 8 version (at the time of writing this tutorial).

> **Note**: These instructions are also valid for Angular 7.

![Angular CLI](https://www.diigo.com/file/image/rscqpoqzoceeaeedqzdspasasb/Angular+CLI+8.jpg)

[Angular CLI](https://cli.angular.io/) is the official tool for initializig and working with Angular projects. To install it, open a new command-line interafce and run the following command:

```bash
$ npm install -g @angular/cli 
```

At the time of this tutorial, **angular/cli v8.3.2** will be installed on your system.

In this next step, we'll learn how to intialize a new project from the command-line.

## Step 2 -- Initializing a New Angular 8 Project

In this step, we'll proceed to create our project. Head back to your command-line interface and run the following command:

```bash
$ ng new angular-httpclient-example
```

The CLI will ask you a couple of questions -- If **Would you like to add Angular routing?** Type **y** for Yes and **Which stylesheet format would you like to use?** Choose **CSS**.

This will instruct the CLI to automatically set up routing in our project so we'll only need to add the routes to our components to add navigation in our application.

Next, navigate to you project’s folder and run the local development server using the following commands:

```bash
$ cd angular-httpclient-example
$ ng serve    
```

A local development server will start lisetning on the the `http://localhost:4200/` address.
![Angular CLI Ng Serve](https://www.diigo.com/file/image/rscqpoqzoceeaposbzdspascea/Angular+CLI+Ng+Serve.jpg)

Open your web browser and navigate to the `http://localhost:4200/` address to see your app up and running. This is a screenshot at this point:
 
![Angular 8 Project](https://paper-attachments.dropbox.com/s_F52E295BB9C92BEFE7506DFCE2086C2583C762072AFE2CA1A9CE9AD4DA9FF751_1567465432228_Angulardemo.png)

You should now leave the development server running and start a new command-line interface for running the CLI commands of the next steps.

In the next step, we'll learn how to create a fake REST API that we'll consume in our Angular application.

## Step 3 -- Setting up a (Fake) REST API

Before we proceed to develop our Angular application, we'll need to prepare a REST API that we can consume using `HttpClient`. 

We can also consume or fetch JSON data from third-party REST API servers but in this example, we choose to create a fake REST API. Check out this [tutorial](https://www.techiediaries.com/angular-tutorial-example-rest-api-httpclient-get-ngfor) for a real REST API example. As far as Angular concerned, there is no difference between consuming a fake or real REST APIs.

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

In the `server` folder, create a `database.json` file and add the following JSON data:

```json
{
    "products": []
}
```

This JSON file will act like a database for your REST API server. You can simply add some data to be served by your REST API or or use [Faker.js](https://github.com/marak/Faker.js/) for automatically generating massive amounts of realistic fake data.

Go back to your command-line and install `Faker.js` from npm using the following command:

```bash
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

We first import faker, next we declare an object with one empty array for products then we enter a *for* loop to create *300* fake entries using faker methods like `faker.commerce.productName()` for generating product names. [Check  all available methods](https://github.com/marak/Faker.js/#api-methods). Finally we convert the database object to a string and log it to the terminal. 

Next, add a `generate` and `server` scripts to `package.json`:

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

Next, head back to your command-line and run the generate script using the following command:

```bash
$ npm run generate
```

Finally, run the API server by executing the following command:

```bash
$ npm run server
```

You can now send HTTP requests to the server just like any typical REST server. Your RESTful server will be available from the `http://localhost:3000/` address. 

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

>**Note**: You can use other features such as filters, sorting and ordering. For more information, check out the [docs](https://github.com/typicode/json-server)

Leave the JSON REST API server running and open a new command-line interface for typing the commands of the next steps.

In the next step of our tutorial, we'll learn how to set up `HttpClient` in our Angular 8 project.

## Step 4 -- Setting up Angular HttpClient in our Project 

In this step, we'll proceed to set up the `HttpClient` module in our project.

`HttpClient` lives in a separate Angular module so we'll need to import it in our main application module before we can use it.

Open your example project with a code editor or IDE. I'll be using [Visual Studio Code](https://code.visualstudio.com). 

Next, open the `src/app/app.module.ts` file, import [`HttpClientModule`](https://angular.io/api/common/http/HttpClientModule#description) and add it to the `imports` array as follows:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

That's all, we are now ready to use the `HttpClient` in our project but before that we need to create a couple of components -- A home and about components. This is what we'll learn to do in the next step.

## Step 5 -- Creating Angular Components

In this step, we'll proceed to create the Angular components that control our application UI. 

Head back to a new command-line interface and run the following command:

```bash
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
An Angular 8 example application that demonstrates how to use HttpClient to consume REST APIs
</p>
```

We'll update the home component in the following steps.

In the next step of our tutorial, we'll add these components to the router.

## Step 6 -- Adding Angular Routing

In this step, we'll proceed to add routing the various components in our example.

Head back to the `src/app/app-routing.module.ts` file, that was automatically created by Angular CLI for routing configuration, and import the components then add routes as follows:

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

## Step 7 -- Styling the UI with Angular Material

In this step of our tutorial, we'll proceed to add Angular Material to our project and style our application UI.

[Angular Material](https://material.angular.io) provides Material Design components that allow developers to create professional UIs. Setting up Angular Material in our project is much easier now with the new `ng add` command of the Angular CLI v7+. 

Head back to your command-line interface, and run the following command from the root of your project: 

```bash
$ ng add @angular/material
```

You'll be asked for choosing a theme, choose **Indigo/Pink**.  

For the other options -- **Set up HammerJS for gesture recognition?** and **Set up browser animations for Angular Material?** Simply press **Enter** in your keyboard to choose the default answers. 

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

Next, open the `src/app/app.component.html` and update as follows:

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

In the next step of our tutorial, we'll learn how to fetch the JSON data from our REST API server using `HttpClient`.

## Step 7 -- Consuming the JSON REST API with Angular HttpClient

In this step, we'll proceed to consume JSON data from our REST API server in our example application.

We'll need to create an Angular service for encapsulating the code that deals with consuming data from the REST API server. 

A service is a singleton that can be injected by other services and components using Angular dependency injection.
 
> In software engineering, dependency injection is a technique whereby one object supplies the dependencies of another object.  [Source](https://en.wikipedia.org/wiki/Dependency_injection)

Now, let’s generate an Angular service that interfaces with the JSON REST API. Head back to your command-line and run the following command:

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

We imported and injected the `HttpClient` service as a private `httpClient` instance. We also defined the `REST_API_SERVER` variable tha  holds the address of our REST API server.

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

Since the `sendGetRequest()` method returns the return value of the `HttpClient.get()` method which is an RxJS Observable, we subscribed to the returned Observable for sending the HTTP GET request.

When data is received, we added it in the `products` array.
 
Next, open the `src/app/home/home.component.html` file and update as follows:

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

Next, we iterated over the `products` array and used a Material card to display the `name`, `price`, `quantity`, `description` and `image` of each product.
 
This is a screenshot of the home page after JSON data is fetched:

![Angular 8 Example](https://www.diigo.com/file/image/rscqpoqzoceecpdoczdspbaqes/Angular+8+Example.jpg?k=7c12b74876bb19d81f1a3528d82b79d3)

## Step 8 -- Adding Parameters to the HttpClient get() Method

## Step 9 -- Adding HTTP Error Handling with RxJS `catchError()` & `HttpClient`

Using Angular's HttpClient along with `catchError` from RxJS, we can easily write a function to handle errors within each service. HttpClient will also conveniently parse JSON responses and return a javascript object in the observable. There are two categories of errors which need to be handled differently:

Client-side: Network problems and front-end code errors. With HttpClient, these errors return ErrorEvent instances.

Essential Reading: Learn React from Scratch! (2019 Edition)
Server-side: AJAX errors, user errors, back-end code errors, database errors, file system errors. With HttpClient, these errors return HTTP Error Responses.

By checking if an error is an instance of ErrorEvent, we can figure out which type of error we have and handle it accordingly.

This is a good solution for just one service, but a real app contains numerous services which can all potentially throw errors. Unfortunately, this solution requires copying the `handleError` function across all services, which is a very serious anti-pattern in Angular development. If something needs to change with the way we handle errors, we have to update every single `handleError` function across every service. This is counter-productive and can easily lead to more bugs. We need an efficient way to handle errors globally across the entire application. Fortunately, Angular supports this using HttpInterceptor.

Open the `src/app/data.service.ts` file and update it accordingly:

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
## Step 10 -- Retrying Failed HTTP Requests with RxJS `retry()` & `HttpClient`

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

## Step 11 -- Unsubscribing from HttpClient Observables with RxJS `takeUntil()`  

First of all, do you need to unsubscribe from the Observables returned by `HttpClient` methods?

Generally, you need to manually unsubscribe from any subscribed RxJS Observables in your Angular components to avoid memory leaks but in the case of HttpClient, this is automatically handled by Angular by unsubscribing when the HTTP response is received. However, there are some cases when you need to manually unsubscribe for exammple to cancel a pending requests when you are about to leave the component.

We can simply call the unsubscribe() method from the Subscription object returned by the subscribe() method in the ngOnDestroy() life-cycle method of the component to unsubscribe from the Observable.

There is also a better way to unsubscribe or complete Observables by using the takeUntil() operator.

The [takeUntil()](https://rxjs.dev/api/operators/takeUntil) operator emits the values emitted by the source Observable until a notifier Observable emits a value.

Let's see how to use this operator to complete Observables when the component is destroyed.

Check out [How to cancel/unsubscribe all pending HTTP requests angular 4+](https://stackoverflow.com/questions/46068908/how-to-cancel-unsubscribe-all-pending-http-requests-angular-4).

Open the `src/app/home/home.component.ts` file and update it as follows:

```ts
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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

The takeUntil() operator allows a target Observable to emit values until a value is emitted from an inner Observable. Once Angular decides to destroy a component it triggers onDestroy lifecycle hook which emits value so RxJS library takes over and completes all streams so there is no need to “unsubscribe”. Take a look at destroySubject$ stream. I’m not calling .complete() on that stream because RxJS under the hood also completes that stream. That is awesome, less code to write!


## The Syntax of the `HttpClient.get()` Method 

The HttpClient `get()` method is designed to send HTTP GET requests. The syntax is as follows:

```ts
        get(url: string, options: {
            headers?: HttpHeaders;
            observe: 'response';
            params?: HttpParams;
            reportProgress?: boolean;
            responseType?: 'json';
            withCredentials?: boolean;
        }): Observable<HttpResponse<Object>>;
```

It takes a REST API endpoint and an optional `options` object and returns an Observable instance.

You can call the `get()` method is a few steps.

First you need to import `HttpClient` in your component.

```ts
import { HttpClient } from '@angular/common/http';
```

Next you need to inject `HttpClient` via the component's constructor

```ts
  constructor(private httpClient: HttpClient){}
```

Next, add a method where you can call `HttpClient.get(ENDPOINT_URL)`:

```ts
    get_products(){
        this.httpClient.get(this.baseUrl + '/products').subscribe((res)=>{
            console.log(res);
        });
    }
```

When called, this method will make a GET request to the `/products` endpoint then subscribe to the returned Observable. It 
will then log the array of products to the console.

Now let's make a button to callthe `get_products()` method:

```html
    <button (click)="get_products()">GET /products</button>
```

Now, If you want to show the products on the component template.

First, add a `products` array: 

```ts
    private products  = []; 
```

Next change the `get_products()` method as follows:

```ts    
    get_products(){
        this.httpClient.get(this.baseUrl + '/products').subscribe((res : any[])=>{
        console.log(res);
        this.products = res;
        });
    }
```

We simply assing the returned products to the `products` array.

Next, use the `ngFor` directive in your component template to loop through the `products` array:    

{% raw %} 
```html 
    <ul>
      <li *ngFor="let product of products" >
        -- id: {{product.id}}
        -- name: {{product.name}}
        -- cost: {{product.cost}}
        -- quantity: {{product.quantity}}
      </li>
    </ul> 
```
{% endraw %}

## The `async` pipe and Observables 

In our example, We can access the data returned by the `get()` method in two ways.

Subscribe to the returned Observable, i.e:

```ts
     get_products(){
        this.httpClient.get(this.baseUrl + '/products').subscribe((res : any[])=>{
            console.log(res);
            this.products = res;
        });
    }
```

Or use the `async` pipe with the returned Observable and iterate directly over data in the template. Let's see how in more details.     

First, you need to create an Observable using the following:

```ts
     private productsObservable : Observable<any[]> ; 
```

Next, call the `get()` method and assign the result to `productsObservable`:

```ts
     this.productsObservable = this.httpClient.get(this.baseUrl + '/products');
```

Finally, in your template:

{% raw %}
```html
      <li *ngFor="let product of productsObservable | async" >
        -- id: {{product.id}}
        -- name: {{product.name}}
        -- cost: {{product.cost}}
        -- quantity: {{product.quantity}}
      </li>
```
{% endraw %}

## Using Angular Services 

Using code that access data directly in your components is against the separation of concerns rule so let's refactor our code to use an Angular service which makes HTTP GET requests then returns the result back to our component(s).

Using Angular CLI generate a new service:

```bash
$ ng generate service data 
```

Next move the data access code to this service. Open the `src/app/data.service.ts` file and update it accordingly:

```ts
    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';

    @Injectable({
        providedIn: 'root'
    })
    export class DataService {
    baseUrl:string = "http://localhost:3000";
    
    constructor(private httpClient : HttpClient) {}
    
    get_products(){
        return this.httpClient.get(this.baseUrl + '/products');
    }
    get_families(){
        return this.httpClient.get(this.baseUrl + '/families');
    }
    get_locations(){
        return this.httpClient.get(this.baseUrl + '/locations');
    }
    get_transactions(){
        return this.httpClient.get(this.baseUrl + '/families');
    }

    }

```

Next, change the `src/app/app.component.ts` file as follows:

```ts
    import { Component } from '@angular/core';
    import { Observable } from 'rxjs';

    import { DataService } from './data.service';

    /* .... */
    @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
    })
    export class AppComponent {    
        private products  = []; 
        private families = [];
        private locations = [];
        private transactions = [];
        
        private productsObservable : Observable<any[]> ; 
        
        constructor(private dataService: DataService){
            
            this.productsObservable = this.dataService.get_products();
            
            this.dataService.get_families().subscribe((res : any[])=>{
                this.families = res;
            });
            this.dataService.get_locations().subscribe((res : any[])=>{
                console.log(res);
                this.locations = res;
            });
            this.dataService.get_transactions().subscribe((res : any[])=>{
                console.log(res);
                this.transactions = res;
            });    
        }
    }
```

Instead of injecting `HttpClient` directly in our component we inject our data service and call its methods to make GET requests to our REST API server.


You can find the complete source code of [this demo in GitHub](https://github.com/techiediaries/angular-httpclient-examples).


## Conclusion 

We have seen a practical examples of how to use `HttpClient get()` to make HTTP GET requests to a REST API server in Angular 8, how to use the `async` pipe to subscribe to RxJS Observables in templates and finally how to use Angular services and models.