---
layout: post
title: "Angular 7/8 HttpClient Interceptors: Mocking HTTP Requests Example"
image: "images/content/angular.png"
excerpt: "In this tutorial, we'll learn by example to use HttpClient Interceptors to mock a back-end for your Angular 8 app. This way you can develop your Angular 8 app without a back-end" 
tags : [angular , angular8] 
---


In this tutorial, we'll learn by example to use Angular HttpClient Interceptors to mock a http requests in your Angular 8 app. This way you can develop your Angular 8 app even before a back-end is ready. 
  

## Using an Angular HTTP Interceptor

Angular interceptors have many use cases such as error logging and caching, but in our example we'll use an interceptor to mock HTTP calls which will allow us to start working on our frontend project even before the backend is ready! This is also useful for unit testing.

We'll implement a `MockHttpCalIInterceptor` that intercepts http calls in our app and return hardcoded JSON data loaded with imports;

- Step 1 - Preparing your Angular Project
- Step 2 - Setting up Angular HttpClient
- Step 3 - Creating the Angular Interceptor
- Step 4 - Registering the HTTP Interceptor 
- Step 5 - Configuring TypeScript to Import Local JSON files
- Step 6 - Intercepting URLs and Returning Mocked JSON Data
- Step 7 - Testing your HTTP Interceptor

## Step 1 - Preparing your Angular Project

You should by now have an Angular project ready.


## Step 2 -  Setting up Angular HttpClient

Next, you need to set up `HttpClient` in your project. Open the `src/app/app.module.ts` file:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent
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


## Step 3 - Creating the Angular Interceptor

After configuring Angular HttpClient, you need to create the interceptor. Inside the `src/app` folder of your project, create an `http.interceptor.ts` and add the following code: 

```ts
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class MockHttpCalIInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {        
        console.log('Intercepted request' + request.url);
        return next.handle(request);
    }
}

```

## Step 4 - Registering the HTTP Interceptor 

Next, you need to regsiter the interceptor so Angular can recognize it. Open the `src/app/app.module.ts` file 

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MockHttpCalIInterceptor } from './http.interceptor';


```ts
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: MockHttpCalIInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
```


## Step 5 - Configuring TypeScript to Import Local JSON files

Open the `tsconfig.json` file and add the `"resolveJsonModule": true` option under the `compilerOptions` key:

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    ...
    "resolveJsonModule": true,
    ...
}
```


## Step 6 - Intercepting URLs and Returning Mocked JSON Data

Now, let's modify our HTTP interceptor to only intercept the `http://localhost:3000/products` URL and return some data from a local JSON file.

First, create a `data.json` file inside your `src/app` folder and add mocked data:

```json
[
    {
        "id": 1,
        "name": "Licensed Frozen Hat",
        "description": "Incidunt et magni est ut.",
        "price": "170.00",
        "imageUrl": "https://source.unsplash.com/1600x900/?product",
        "quantity": 56840
    },
    {
        "id": 2,
        "name": "Rustic Concrete Chicken",
        "description": "Sint libero mollitia.",
        "price": "302.00",
        "imageUrl": "https://source.unsplash.com/1600x900/?product",
        "quantity": 9358
    },
    {
        "id": 3,
        "name": "Fantastic Metal Computer",
        "description": "In consequuntur cupiditate et unde minus.",
        "price": "279.00",
        "imageUrl": "https://source.unsplash.com/1600x900/?product",
        "quantity": 90316
    }
]
```
```

Next, you need to import this JSON file inside the interceptor file and return it as an `HttpResponse`:

```ts
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as data from './data.json';

const PRODUCTS_URL = "http://localhost:3000/products";

@Injectable()
export class MockHttpCalIInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {        
        console.log('Intercepted request: ' + request.url);
        if (request.url === PRODUCTS_URL) {
            console.log('Loaded from JSON: ' + request.url);
            return of(new HttpResponse({ status: 200, body: ((data) as any).default }));
        }
        return next.handle(request);

    }
}

```

## Step 7 - Testing your Angular Interceptor

Now, let's test this HTTP interceptor, we simpy need to send a request to the `http://localhost:3000/products` and see if we receive our JSON data:

```ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

const PRODUCTS_URL = "http://localhost:3000/products";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular Example';

  constructor(private httpClient: HttpClient){}
  ngOnInit(){
    this.httpClient.get(PRODUCTS_URL).subscribe((data)=>{
      console.log(data);
    })
  }
}
```

This is a screenshot of the browser console after running our Angular application:

![](https://www.techiediaries.com/assets/images/angular-http-interceptor-example.png)

