---
layout: bpost
title: "Angular 9/8 Ajax Get and Post Requests Example"
image: "images/content/angular.jpg"
excerpt: "In this post, we'll create a simple example with Angular 9/8 and HttpClient that sends Get and Post requests to fetch and post data from/to a backend server" 
skipRss: true
tags : [angular, angular-9-httpclient-examples] 
---

In this post, we'll create a simple example with Angular 9/8 and `HttpClient` that sends Ajax Get and Post requests to fetch and post data from/to a backend server.

The server can be either your own server or a third-party server.

In our case, we'll be using a third-party server.

We assume you already have a project ready and [Angular CLI installed](https://www.techiediaries.com/angular-cli-tutorial/).

You can also simply use the online Stackblitz IDE if you just want to experiment with the code and don't want to set up a development environment for Angular, yet!

## What is Ajax?

Ajax stands for Asynchronous JavaScript and XML. It is used to request data from the server without full-page refresh, and use the result, which was originally XML, to re-render a part of the page.

Nowadays, Ajax refers to any asynchronous request sent to a server from a JavaScript. Mostly the response is JSON, or HTML fragments.

Ajax was the first step into building modern single page apps or SPAs.

Modern libraries and frameworks, like Angular, make building SPAs simpler.

## Http GET and POST Requests?

The GET method of http is used to retrieve a resource from a server while POST is used to create and update data in the server.

## Angular HttpClient?

`HttpClient` is a built-in service for sending [http requests in Angular](https://www.techiediaries.com/angular/angular-9-8-tutorial-by-example-rest-crud-apis-http-get-requests-with-httpclient/). It's built on top of the `XMLHttpRequest` interface available in modern and legacy web browsers.

## Importing `HttpClientModule`

`HttpClientModule` is the module that exports the `HttpClient` service, so you'll need to import it in your project.

Open the `src/app/app.module.ts` file and update it as follows:

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

We simply need to import `HttpClientModule` from `@angular/common/http` and add it to the `imports` array of `NgModule`.

## Generate an Angular Service

In your terminal, simply execute the following command from inside your project's folder:

```bash
$ ng generate service http
```

You'll get the files for your service with some basic code.

Go to the `src/app/http.service.ts` file and import `HttpClient`:

```ts
import { HttpClient } from '@angular/common/http';
```

Next, inject `HttpClient` using the constructor of your http service:

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }
}
```

That's it! We are ready to send get and post requests in our app.

## Sending an Ajax GET Request

Let's start with defining a service method for sending a get request to the server to fetch some data:

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiUrl = "/api/endpoint";
  constructor(private httpClient: HttpClient) { }

  sendGetRequest() {
    return this.httpClient.get(this.apiUrl);
  }
}
```

Let's suppose our endpoint returns the following data:

```json
[
     { id: '1', name: 'Product 1'},	
     { id: '2', name: 'Product 2'}
] 
```

## Sending an Ajax POST Request

Next, let's define a method for sending a post request:

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiUrl = "/api/endpoint";
  constructor(private httpClient: HttpClient) { }

  sendPostRequest(data: Object): Observable<Object> {
    return this.http.post(this.apiUrl, data);
  }
}
```




You next need to inject `HttpService` in your component(s) and call the methods but to actually send the requests to the server you need to subscribe to the RxJS observables returned from the defined methods. For example:


```ts
this.httpService.sendGetRequest().subscribe((responseBody) => {
      console.log(responseBody);
});
```

This will work provided that you have injected your service as `httpService` in your component's constructor.

