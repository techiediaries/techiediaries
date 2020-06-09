---
layout: post
title: "Angular 9/8 How-To: Pass URL Query Parameters with HttpClient, HttpParams and fromString"
image: "images/content/angular-by-example-httpclient-get.png"
excerpt: "In this how-to article, we'll learn how to use fromString and HttpParams to pass query parameters to URLs or REST API endpoints" 
tags : [angular, angular-how-tos, angular9] 
---
  

In this how-to article, we'll learn how to use [`fromString`  and  `HttpParams`](https://angular.io/guide/http#use-fromstring-to-create-httpparams) to pass query parameters to URLs or REST API endpoints. 

Here, we assume we have a REST API endpoint named `server.com/api/products` with  `_page`  and  `_limit`  parameters.

We also assume, you have an Angular 9 project with the `HttpClientModule` imported in the main module or the module where you are implementing the requirement. 

If you are new to these how-tos, check out how to [install and set up a project and the prerequisites](https://www.techiediaries.com/angular-cli-tutorial/).

## Step 1 - Generating and Implementing an Angular 9 Example Service

Head back to your terminal, navigate to your project's directory and run the following command to generate an [Angular service](https://www.techiediaries.com/angular-services/):

```bash
$ ng generate service example
``` 

Next, open the  `src/app/example.service.ts`  file and update it as follows:

```ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  constructor(private httpClient: HttpClient) { }
}
```

We import `HttpClient` and inject it via the service constructor.

## Step 2 - Importing the Angular 9 HttpParams  Interface

Next, import  `HttpParams`  in the `src/app/example.service.ts` file as follows:

```ts
import { HttpParams } from "@angular/common/http";

```
## Step 3 - Sending a GET Request with Parameters

Next, define the  `sendGetRequestWithHttpParameters()` method as follows:

```ts
  public sendGETRequestWithParameters(){
    const opts = { params: new HttpParams({fromString: "_page=1&_limit=10"}) };
    return this.httpClient.get("http://server.com/api/products", opts);
  }
```

We create an instance of `HttpParams`  from the _`page=1&_limit=10` string using  `fromString`. This way we pass the value of 1 to the `_page` query parameter and 10 to `_limit` query parameter.

You can also use the `append()` method of `HttpParams` to set and pass parameters:

```ts
  public sendGETRequestWithParameters(){    ```
    let params = new HttpParams();
    params = params.append('_page', 1);
    params = params.append('_limit', 10);

    return this.httpClient.get("http://server.com/api/products", {params: params});
   }
```

