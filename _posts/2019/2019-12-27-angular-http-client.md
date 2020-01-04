---
layout: post
title: "Angular 9/8 Http - How to Use HttpClient Module with Examples"
image: "images/content/angular-httpclient.png"
excerpt: "In this how-to tutorial, we'll learn what is the HttpClient API available from HttpClientModule and how to use it in Angular 9 by example with request timeout, responsetype, query parameters, http headers, custom http headers, interceptors, typed and full responses, and error handling." 
tags : [angular, angular-how-tos, angular9] 
---


In this how-to tutorial, we'll learn what is the `HttpClient`  API available from `HttpClientModule` and how to use it in Angular 9 by example with request timeout, responsetype, query parameters, http headers, custom http headers, interceptors, typed and full responses, and error handling. 

We'll be seeing examples of common HTTP methods such as GET, PUT, PATCH, POST and DELETE, that you usually need to use when communicating with a server, or consuming and fetching data from a REST API server.

We'll be learning about:

- Accessing Http Headers,
- Passing Http Parameters, 
- Specifying HttpClient ResponseType i.e Text, JSON or Blob, 
- Setting up HttpClient Interceptors, 
- Implementing Http Error Handling,
- Dealing with Browser CORS and the Same Origin Policy,
- Adding custom HTTP headers to requests,
- Retrieving URL parameters with `HttpParams` and `fromString`


This tutorial is divided in the following parts:

- Importing `HttpClient` and sending Http get, post, put and delete requests to the server (this part),
- [Building a service to encapsulate the `HttpClient` code interfacing with the server](https://www.techiediaries.com/angular-httpclient),
- [Getting headers and typed and full responses with Angular HttpClient](https://www.techiediaries.com/angular-httpclient-headers-full-response),
- [Uploading files with Angular `HttpClient`](https://www.techiediaries.com/angular-file-upload-progress-bar)
- [Communicating with a Node.js & Express server using POST Requests](https://www.techiediaries.com/angular-tutorial-httpclient-post/)  
- [Using the async pipe for sending GET requests](https://www.techiediaries.com/angular-by-example-httpclient-get/),
- [Handling CORS and the Same Origin Policy in modern web browsers](https://www.techiediaries.com/fix-cors-with-angular-cli-proxy-configuration/)
- [Passing query parameters](https://www.techiediaries.com/angular-url-query-parameters-with-httpparams-and-fromstring/),
- [Handling HttpClient Errors with RxJS' catchError and throwError](https://www.techiediaries.com/handle-angular-httpclient-errors-with-rxjs-catcherror-and-throwerror/),
- [Using HttpClient Interceptors to mock HTTP requests](https://www.techiediaries.com/angular-interceptors-mock-http-requests-example/)

By the end of this first part tutorial, you'll learn:

-   What is  `HttpClient`  and how to use with Angular 9/8,
-   How to set up the `HttpClientModule` in your Angular project,
-   How to create an example API server with  `json-server`,
-   How to send an example GET request with Angular 9 and  `HttpClient.get()`,
-   How to send an example POST request with Angular 9 and  `HttpClient.post()`,
-   How to send an example PUT request with Angular 9 and  `HttpClient.put()`,
-   How to send an example DELETE request with Angular 9 and  `HttpClient.delete()`.


> Note: We'll be using the new http client in Angular which is available from the  `@angular/common/http`  module starting with Angular 4.3+ and which replaces the old HTTP client that was available from the  `@angular/http`  package. This upgrade is not just a change in the name and import path of the module but brings a whole new and powerful features for how you make HTTP requests in Angular.


For a more detailed tutorial about `HttpClient`. Read  [Building a Service for Sending API Calls and Fetching Data](https://www.techiediaries.com/angular-httpclient)  for learning how to create a complete Angular 9 application that uses `HttpClient` for sending HTTP requests.

> **Note**: You can also check out how to build a developer's portfolio web application with Angular 7.1, Firebase and Firestore from these series:
> 
> -   [Angular 7|6 Tutorial Course: CLI, Components, Routing & Bootstrap 4](https://www.techiediaries.com/angular-course),
> -   [Angular 7|6 Tutorial Course: Angular NgModules (Feature and Root Modules)](https://www.techiediaries.com/angular-course-modules),
> -   [Angular 7|6 Tutorial Course: Nested Router-Outlet, Child Routes & forChild()](https://www.techiediaries.com/angular-course-child-routes),
> -   [Angular 7|6 Tutorial Course: Authentication with Firebase (Email & Password)](https://www.techiediaries.com/angular-course-firebase-authentication),
> -   [Angular 7|6 Tutorial Course: Securing the UI with Router Guards and UrlTree Parsed Routes](https://www.techiediaries.com/angular-course-router-guards)


In this tutorial, we are going to learn how to use  `HttpClient`  by example in Angular 9. We'll see how to send HTTP POST, GET, PUT and DELETE requests to a REST API back-end server.

## Why and how to Use Angular HttpClient?

So, why using `HttpClient`?

The modern web has dramatically evolved in the last few years. Browsers can now run complex JavaScript web applications and most often than not these apps need to fetch data from remote HTTP servers to display them to users.

> **Note**: Angular 6 deprecated the old http client in favor of the newer  http client  module which is an improved version of the http  client API that lives in the  `@angular/common/http`  package. The old API is still available in  `@angular/http`  in Angular 6, but is now removed in Angular 9.

### `XMLHttpRequest` vs. `fetch()`

Modern browsers provide two different mechanisms for sending HTTP requests and getting responses from web servers:

-   The old  `XMLHttpRequest`  interface which is wrapped by most existing JS libraries (such as jQuery ) in a simple to use API.
-   The relatively new  `fetch()`  API.

> **Note**: `HttpClient` is based on the  `XMLHttpRequest`  interface which makes it available in the modern and legacy web browsers.

### HttpClient is Based on `XMLHttpRequest`

On top of the  `XMLHttpRequest`  interface, HttpClient provides an easy to use API but also many other features such as:

-   Testing APIs,
-   Typed request and response objects,
-   Request and response interceptors,
-   `Observable`  based APIs,
-   And better error handling.

You need to use  `HttpClient`  to communicate with your back-end HTTP server or a third-party server that has [CORS enabled](https://www.techiediaries.com/fix-cors-with-angular-cli-proxy-configuration/) but first you have to import it in your Angular application. 

### The Steps to Add Angular `HttpClient` in your App

Let's now see the steps for adding HttpClient in your app.

These are the steps in nutshell:

-   First, import  `HttpClientModule`  from  `@angular/common/http`.
-   Next, open the main application module (`AppModule`) and add  `HttpClientModule`  in the  `imports`  array.

> **Note**: Importing  `HttpClientModule`  in the root application module will make it available everywhere in your Angular application. You can also import it in a sub-module where it will be available only in that module.

Now, let's see how to actually use the  `HttpClient`  module.

We assume that you have already installed the Angular CLI and created a project.

If you are new to these how-tos, check out how to [install and set up a project and the required prerequisites](https://www.techiediaries.com/angular-cli-tutorial/).
 
## Step 1 — Setting up the Http Client Module in Angular 9

Before you can use the new  http client module in your Angular 9 application, you need to add it to the  `imports`  array in the application main module. 

Start by importing the  `HttpClientModule`  module from the  `@angular/common/http`  package as follows:

```ts
import { HttpClientModule } from  '@angular/common/http';

```

Next, add the  `HttpClientModule`  module to the  `imports`  array of the main root module as follows:

```ts
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

export  class  AppModule { }
```


After adding the module to the  `imports`  array, we are now ready to use the new  `HttpClient`  API to send get, post, put and delete requests to a REST API HTTP server.

## Step 2 — Creating an Example REST API Server for our Angular 9 Application

In this tutorial, we don't need to create a real-world REST API instead we'll use  _json-server_  which allows us to quickly create a fake RESTful server and expose fake API endpoints, from sample data in a JSON file.

> **Note**: If you already have a back-end server with a REST API to consume, you can skip this part.

### What is REST

Before creating an fake REST API server, let's first understand what is REST.

[Wikipedia](https://en.wikipedia.org/wiki/Representational_state_transfer)  defines REST as:

> Representational State Transfer (REST) is a software architectural style that defines a set of constraints to be used for creating web services. Web services that conform to the REST architectural style, termed RESTful web services, provide interoperability between computer systems on the Internet. RESTful web services allow the requesting systems to access and manipulate textual representations of web resources by using a uniform and predefined set of stateless operations. Other kinds of web services, such as SOAP web services, expose their own arbitrary sets of operations
In more simple words: REST is a set of HTTP endpoints that provide a CRUD (Create, Read, Update, and Delete) interface on some server resources.

### Creating the REST API

First, you need to install  _json-server_  via npm in your Angular project by running the following command:

```bash
$ cd angular-httpclient-demo
$ npm install --save json-server
```


Next, you need to create a JSON file, which will act as a database for our server. Create a  `server`  folder inside the  `angular-httpclient-demo`  folder and navigate to it:

```bash
$ mkdir server
$ cd server

```

Next, create a  `database.json`  file:

```bash
$ touch database.json

```

Open the  `server/database.json`  file and add the following data:

```json
{
"customers": [
        {
            "id": 1,
            "name": "Jonathan Murphy",
            "email": "Tristin83@gmail.com",
            "phone": "001-904-3992",
            "city": "Ericland",
            "country": "Saint Barthelemy",
            "title": "Global Directives Consultant"
        }
    ]
}

```

You can either add some items manually or better yet let's use  [Faker.js](https://github.com/marak/Faker.js/)  to automatically generate massive amounts of realistic fake data in Node.js and the browser.

Next, install  `Faker.js`  from npm using the following command:

```bash
$ npm i faker --save
```

> As of this writing, faker v4.1.0 will be installed.

Now, create a  `generate.js`  file:

```bash
$ touch generate.js

```

Open it and add the following code:

```js
var faker = require('faker');

var database = { customers: []};

for (var i = 1; i<= 300; i++) {
  database.customers.push({
    id: i,
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    city: faker.address.city(),
    country: faker.address.country(),
    title: faker.name.title()
  });
}

console.log(JSON.stringify(database));

```

We first import faker, next we declare an object with one empty array for customers then we enter a  _for_  loop to create  _300_  fake entries using faker methods like  `faker.name.firstName()`  for generating a random first name.  [Check all available methods](https://github.com/marak/Faker.js/#api-methods). Finally we convert the database object to a string and log it to the terminal.

Next, add a  `generate`  script to  `package.json`  to generate the database file and a `serveApi` script to run the API server:

```json
  "scripts": {
    "generate": "node server/generate.js > server/database.json",
    "serveApi": "json-server --watch server/database.json"    
  },
```

You can then run this command to create your  `database.json`  file and populate it as follows:

```bash
$ npm run generate
```

Finally, run the API server by executing the following command:

```bash
$ npm run serveApi
```

You can now send HTTP requests to the server just like any typical REST server. Your RESTful server will be available from the  [http://127.0.0.1:3000/](http://127.0.0.1:3000/)  address.

![REST API Server](https://www.techiediaries.com/ezoimgfmt/www.diigo.com/file/image/rscqpoqzesbqadroczdqcpacpc/jsonserver.jpg?k=11711a28ac0c2adc0654842b0b6647ae&ezimgfmt=rs:635x213/rscb1/ng:webp/ngcb1)

These are the API endpoints that we'll be able to use via this REST server and using the previous configuration:

-   `GET /customers`  for getting the customers,
-   `GET /customers/<id>`  for getting a single customer by id,
-   `POST /customers`  for creating a new customer,
-   `PUT /customers/<id>`  for updating a customer by id,
-   `PATCH /customers/<id>`  for partially updating a customer by id,
-   `DELETE /customers/<id>`  for deleting a customer by id.


## Step 3 — Creating Angular Components

Next, let's create four components for displaying (list and by id) and creating/updating the customers:

```bash
$ ng g c customer-list
$ ng g c customer-details
$ ng g c customer-create
$ ng g c customer-update
```

## Step 5 —  Adding Routing & Navigation

To be able to navigate between these components, we need to add them to the router configuration. Open the  `src/app/app-routing.module.ts`  file and update it accordingly:

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import { CustomerUpdateComponent } from './customer-update/customer-update.component';


const routes: Routes = [
  { path:  '', pathMatch:  'full', redirectTo:  'list'},
  { path: 'list', component: CustomerListComponent},
  { path: 'details/:id', component: CustomerDetailsComponent},
  { path: 'create', component: CustomerCreateComponent},
  { path: 'update', component: CustomerUpdateComponent},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```

## Step 6 — Sending an HTTP GET Request using HttpClient by Example

In this step, we suppose that we have a component that displays a list of customers from a server.

First let's see the required steps:

-   Import  _HttpClient_  from  _@angular/common/http_
    
-   Inject HttpClient via component constructor
    
-   Make HTTP GET Requests using .get(endpoint) method
    
-   Subscribe to the returned observable and show results
    

Here is the source code of our example:

```ts

import { Component, OnInit } from  '@angular/core';

import { Observable } from  "rxjs/Observable";

import { HttpClient } from  "@angular/common/http";



class  Customer {

id : number;

name: string;

email: string;

tel: string;

}



@Component({

selector:  'customers',

template:  `

<ul *ngIf="customersObservable | async as customers else empty">

<li *ngFor="let customer of customers">



</li>

</ul>

<ng-template #empty> No Customers Yet </ng-template>

`})

export  class  CustomerComponent  implements  OnInit {

customersObservable : Observable<Customer[]>;



constructor(private  httpClient:HttpClient) {}



ngOnInit() {

this.customersObservable = this.httpClient

.get<Customer[]>("127.0.0.1:3000/customers")

.do(console.log);

}

}


```

## Step 7 — Setting HTTP GET Request Parameters with HttpParams

In many situations, we need to feed some HTTP parameters to the API endpoint we are querying. In this section we'll see how to use the  _HttpParams_  class to use parameters in the  _HttpClient_  module.

For instance, let's suppose that we need to make a GET request to this  `[http://127.0.0.1:3000/customers?_page=1&_limit=1](http://127.0.0.1:3000/customers?_page=1&_limit=1)`  URL for getting the first two customers of the first page.

We start by importing the  _HttpParams_  class using:

```ts

import {HttpParams} from  "@angular/common/http";


```

Next, we create an instance of the  _HttpParams_  class:

```ts

const  params = new  HttpParams().set('_page', "1").set('_limit', "1");


```

Finally, we call  _httpClient.get()_  method with these parameters, then assign the returned Observable to the  _customersObservable_  variable:

```ts

this.customersObservable = this.httpClient.get("http://127.0.0.1:3000/customers", {params});


```

### Using fromString to easily create HttpParams

We can also build HTTP parameters directly from a query string, for example for our previous example URL  `[http://127.0.0.1:3000/customers?_page=1&_limit=1](http://127.0.0.1:3000/customers?_page=1&_limit=1)`  we can create an instance of  _HttpParams_  class from the query string  `_page=1&_limit=1`  by simply using the  _fromString_  variable:

```ts
const  params = new  HttpParams({fromString:  '_page=1&_limit=1'});

```

## Step 8 — Using Generic HttpClient  `request()`  method

We have previously seen how to use the  `.get()`  method to send HTTP GET requests. Now we'll see a generic method to

send GET and the other HTTP methods such as POST, PUT and Delete etc.

Using the  `.request()`  method of the  _HttpClient_  module we can re-write our previous example to the following code:

```ts

const  params = new  HttpParams({fromString:  '_page=1&_limit=1'});



this.customersObservable = this.http.request("GET","http://127.0.0.1:3000/customers",{responseType:"json",params});


```

## Step 9 —  Adding Custom HTTP Headers to Requests

We can also add custom HTTP headers to our HTTP requests using the  _HttpHeaders_  class.

First create an instance of the  _HttpHeaders_  class and then set your custom HTTP header. For example:

```ts

const  headers = new  HttpHeaders().set("X-CustomHttpHeader", "CUSTOM_VALUE");


```

Next, you can send the GET request using:

```ts

this.customersObservable = this.httpClient.get("http://127.0.0.1:3000/customers", {headers});


```

## Step 10 — Sending HTTP PUT Requests in Angular 9

The HTTP PUT method is used to completely replace a resource on the API server. We can use the  _HttpClient_  module to send a PUT request to an API server using the the  `put()`  method. For example:

```ts

this.httpClient.put("http://127.0.0.1:3000/customers/1",

{

"name":  "NewCustomer001",

"email":  "newcustomer001@email.com",

"tel":  "0000252525"

})

.subscribe(

data  => {

console.log("PUT Request is successful ", data);

},

error  => {

console.log("Rrror", error);

}

);


```

## Step 11 — Sending HTTP PATCH Requests

The HTTP PATCH method is used to update a resource on the server. The  _HttpClient_  class provides the  `patch()`  method tha can be used to send UPDATE requests. For example:

```ts

this.httpClient.patch("http://127.0.0.1:3000/customers/1",

{

"email":  "newcustomer001@email.com"

}).subscribe(

data  => {

console.log("PUT Request is successful ", data);

},

error  => {

console.log("Error", error);

}

);


```

## Step 12 — Sending HTTP DELETE Requests

Now let's see an example of how we can send an HTTP DELETE request to delete a resource from the API server using  `delete()`  method provided by the  _HttpClient_  class:

```ts
this.httpClient.patch("http://127.0.0.1:3000/customers/1")

.subscribe(

data  => {

console.log("PATCH Request is successful ", data);

},

error  => {

console.log("Error", error);

}

);


```

## Step 13 — Sending HTTP POST Requests in Angular 9

The HTTP POST method has many uses but mostly used when we need to add new data on the server so let's take an example of adding a new customer to our REST API server database using the  `post()`  method of the  _HttpClient_  class:

```ts
this.httpClient.post("http://127.0.0.1:3000/customers",
{
"name":  "Customer004",
"email":  "customer004@email.com",
"tel":  "0000252525"
})
.subscribe(
data  => {
console.log("POST Request is successful ", data);
},
error  => {

console.log("Error", error);

}

);


```

We are calling the  `post()`  method from the injected instance of  _HttpClient_. The first parameter is the API endpoint and the second parameter is the  _customer_  data object. We also subscribe to the observable returned by the  `post()`  method. If the operation is successful we display  _POST Request is successful_  and the data on the console. If there is an error we log the error on the console

> Also read: How to send HTTP requests with  [React and Axios](https://www.techiediaries.com/react-axios)

For a step by step tutorial. Make sure to read

[Angular HttpClient—Building a Service for Sending API Calls and Fetching Data](https://www.techiediaries.com/angular-httpclient)  for learning how to build a complete Angular service that makes use of HttpClient.

## Conclusion

So we have seen how to interact with a RESTful API server using common HTTP methods i.e GET, PUT, PATCH, DELETE and POST.

For the sake of testing we have used a fake REST API server but you can use the same examples with a real backend server.

We are learning about the following topics:

- Accessing Http Headers,
- Passing Http Parameters, 
- Specifying HttpClient ResponseType i.e Text, JSON or Blob, 
- Setting up HttpClient Interceptors, 
- Implementing Http Error Handling,
- Dealing with Browser CORS and the Same Origin Policy,
- Adding custom HTTP headers to requests,
- Retrieving URL parameters with `HttpParams` and `fromString`

This tutorial is divided into the following parts:

- Importing `HttpClient` and sending Http get, post, put and delete requests to the server (this part),
- [Building a service to encapsulate the `HttpClient` code interfacing with the server](https://www.techiediaries.com/angular-httpclient),
- [Getting headers and typed and full responses with Angular HttpClient](https://www.techiediaries.com/angular-httpclient-headers-full-response),
- [Uploading files with Angular `HttpClient`](https://www.techiediaries.com/angular-file-upload-progress-bar)
- [Communicating with a Node.js & Express server using POST Requests](https://www.techiediaries.com/angular-tutorial-httpclient-post/)  
- [Using the async pipe for sending GET requests](https://www.techiediaries.com/angular-by-example-httpclient-get/),
- [Handling CORS and the Same Origin Policy in modern web browsers](https://www.techiediaries.com/fix-cors-with-angular-cli-proxy-configuration/)
- [Passing query parameters](https://www.techiediaries.com/angular-url-query-parameters-with-httpparams-and-fromstring/),
- [Handling HttpClient Errors with RxJS' catchError and throwError](https://www.techiediaries.com/handle-angular-httpclient-errors-with-rxjs-catcherror-and-throwerror/),
- [Using HttpClient Interceptors to mock HTTP requests](https://www.techiediaries.com/angular-interceptors-mock-http-requests-example/)


