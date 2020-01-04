---
layout: post
title: "Angular 9/8 How-To: Handle HttpClient Errors with RxJS' catchError() and throwError()"
image: "images/content/angular-by-example-httpclient-get.png"
excerpt: "In this quick how-to article, we'll see by example how to handle Http errors in Angular 9 apps" 
tags : [angular, angular-how-tos, angular9] 
---

In this quick how-to article, we'll see by example how to handle Http errors in Angular 9 apps.

If you are new to these how-tos, check out how to [install and set up a project and the prerequisites](https://www.techiediaries.com/angular-cli-tutorial/).

RxJS provides the `catchError()`  operator which as its name suggests can be used to catch errors but how it works?

Like the other RxJS operators `catchError()` can be piped into other streams using the `pipe()` function and you only need to provide a function that handles the errors properly as an argument to the operator. 

HttpClient methods such as `get()` or `post()` return RxJS observables which means, we can call the `pipe()` method with the `catchError()` operator.
  

We have two two types of errors in client-side apps:

- Errors related to JavaScript and network which return  `ErrorEvent`  objects.
- Errors due to server issues related to code or database etc. which return http error responses.

This gives us a clue on how to handle errros. For instance, we need to check if the error is an instance of  `ErrorEvent`  to decide if it is related to the client or otheriwise to the server and then handle it approprialty.

This is an example of  a server error on the console if the server is unreachable:

![Angular HttpClient Error Example](https://www.techiediaries.com/ezoimgfmt/www.diigo.com/file/image/rscqpoqzoceparbcdzdspbsdqs/Angular+8+HttpClient+Error+Example.jpg?k=0cf29bd609aca489cfa3e16a606feb2c&ezimgfmt=rs:442x277/rscb1/ng:webp/ngcb1)

Before, we can see an example, we assume we have an Angular project with a `HttpClient` module imported. 

## Step 1 - Generating & Implementing an Angular Service

Open a new terminal, navigate to your project's folder and let's generate a service using the following command:

```bash
$ ng generate service api
```

Next, open the `src/app/api.service.ts` file and update it as follows:

```ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private SERVER = "http://server.com/api/products";

  constructor(private httpClient: HttpClient) { }

  public fetchData(){
    return  this.httpClient.get(this.SERVER);
  }
}
```

## Step 2 - Importing  RxJS ' `catchError()` & `throwError()`

Now, how to handle errors thrown in this service. First you start by importing `catchError()`  and `throwError()` as follows: 

```ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import {  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
```

## Step 3 - Adding an Error Handling Method

Next, you need to add a method for handling errors depending on the type of the error as follows:

```ts
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private SERVER = "http://server.com/api/products";

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

  public fetchData(){
    return this.httpClient.get(this.SERVER);
  }
}
```

## Step 3 - Applying the Error Handling Method Using `catchError()`

Finally, you need to to apply the error handling method to the `fetchData()` method using the `catchError()` operator as follows:

```ts
  public fetchData(){
    return this.httpClient.get(this.SERVER).pipe(catchError(this.handleError));
  }
```

As you might guess this has to be done for each service and methods in your application which is not a problem for small examples but in case of complex examples you need to handle errors globally using  [HttpClient interceptors](https://angular.io/guide/http#http-interceptors).





