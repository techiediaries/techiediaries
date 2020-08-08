---
layout: bpost
title: "Angular 10 HttpClient and JavaScript Promises by Example"
image: "images/content/angular.png"
excerpt: "Angular 10 HttpClient and JavaScript Promises by example"
date: 2020-08-08
tags : [angular]
---

In this tutorial, we'll learn about JavaScript/TypeScript promises and we'll see how to use them by example with Angular 10 and `HttpClient`.

## What's a JavaScript/TypeScript Promise?

A  **promise**  is a JavaScript/TypeScript object that may produce a value at some point in time. A  **promise**  may be in one of 4 possible states: fulfilled, rejected, pending or settled.

>Promises simplify deferred and asynchronous computations. A promise represents an operation that hasn't completed yet. [Source](https://web.dev/promises/)

A promise can be:

-   **fulfilled** - The action relating to the promise succeeded
-   **rejected** - The action relating to the promise failed
-   **pending** - Hasn't fulfilled or rejected yet
-   **settled** - Has fulfilled or rejected

This is an example of promise in plain JavaScript:

```js
var promise = new Promise((resolve, reject) => { 
	resolve("Promise Resolved"); 
}) 

promise.then((success) => { 
		console.log(success); 
	}) 
	.catch(function(error) => { 
		console.log(error); 
	}); 
// Output: Promise Resolved
```

Promises can be executed by calling the  `then()`  and  `catch()`  methods.

The `then()`  method takes two callback functions as parameters and is invoked when a promise is either resolved or rejected.

The `catch()` method takes one callback function and is invoked when an error occurs.

## Promises with TypeScript and Angular 10 by Example

Let's now see how to use Promises in Angular 10 to work with HTTP  asynchronously. 

Head back to a folder where you want to create your project. Next open a command line interface and run the following command:

```bash
$ ng new angular10promises --routing=false --style=css
```

This will create a new Angular 10 application with no routing and CSS for stylesheets format. 


Now open the  `src/app/app.module.ts`  file and import  `HttpClientModule`  and add it inside the  `imports`  array as follows:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```

Next, open the `src/app/app.component.ts`  file and add the following code to send an HTTP GET request and process the response using a Promise.

```ts
import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "Angular 10 and Promises Example";

  API_KEY = "e40d07f00b094602953cc3bf8537477e";

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    console.log("Angular 10 Promises");
    this.fetchDataAsPromise()
      .then((data) => {
        console.log(JSON.stringify(data));
      })
      .catch((error) => {
        console.log("Promise rejected with " + JSON.stringify(error));
      });
  }

  fetchDataAsPromise() {
    return this.httpClient
    .get(
        `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${this.API_KEY}`
      )
      .toPromise();
  }
}
```

We import  `HttpClient`  and inject  it  via the component constructor and use it to send the HTTP request.

Next, we call the `get()` method to send the request and the `toPromise()` method to convert the returned RxJS Observable to a promise.

```ts
  fetchDataAsPromise() {
    return this.httpClient
    .get(
        `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${this.API_KEY}`
      )
      .toPromise();
  }
```

In the `ngOnInit()` life-cycle method, we send the actual request by calling the  `then()`  method of the promise as follows:

```ts
    this.fetchDataAsPromise()
      .then((data) => {
        console.log(JSON.stringify(data));
      })
      .catch((error) => {
        console.log("Promise rejected with " + JSON.stringify(error));
      });
```

If the promise is resolved successfully  we simply output the data in the console and in case of an error we display the error.

## Conclusion

We have seen how JavaScript/TypeScript promises are used with Angular 10 by example and how to make asynchronous operations such as HTTP requests instead of observables. 
