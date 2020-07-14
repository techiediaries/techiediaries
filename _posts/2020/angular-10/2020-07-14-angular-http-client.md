---
layout: post
title: "Angular 10 HttpClient"
image: "images/content/angular-httpclient.png"
excerpt: "How to use HttpClient to make HTTP Requests in Angular 10" 
tags : [angular, angular8, angular-9-httpclient-examples] 
---

What is `HttpClient` in Angular?  

![Angular HttpClient](https://www.techiediaries.com/images/angular-httpclient.png)

In this tutorial we'll be seeing a detailed guide with examples using the new HttpClient in Angular 10, available from the `@angular/common/http` module starting with Angular 4.3+ and which replaces the old HTTP client that was available from the `@angular/http` package. This upgrade is not just a change in the name and import path of the module but brings a whole new and powerful features for how you [make HTTP requests in Angular](https://www.techiediaries.com/angular/angular-9-8-tutorial-by-example-rest-crud-apis-http-get-requests-with-httpclient/).

>Also read how to use [typed and full responses and headers with Angular HttpClient](https://www.techiediaries.com/angular-httpclient-headers-full-response/) 


In this tutorial, we are going to learn how to use *HttpClient* by example in **Angular 10**. We'll see how to send HTTP POST, GET, PUT and DELETE requests to a back-end server.

<iframe width="640" height="360" src="https://www.youtube.com/embed/lZAP871qYDw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


> Also read how to send a POST request with [Angular HttpClient](https://www.techiediaries.com/angular-tutorial-httpclient-post/).


The modern web has dramatically evolved in the last few years. Browsers can now run complex [JavaScript](https://www.techiediaries.com/javascript/) web applications and most often than not these apps need to [fetch data from remote HTTP servers](https://www.techiediaries.com/javascript-fetch-tutorial-and-example/) to display it to the users.

Modern browsers provide two different mechanisms for sending  HTTP requests and getting responses from web servers:

- The old `XMLHttpRequest` interface which is wrapped by most existing JS libraries (such as jQuery ) in a simple to use API.
- The relatively new `fetch()` API.

> **Note**: HttpClient is based on the `XMLHttpRequest` interface which makes it available in all existing web browsers.

On top of the `XMLHttpRequest` interface, HttpClient provides an easy to use API but also many other features such as: 

- Testing APIs, 
- Typed request and response objects, 
- Request and response interceptors, 
- `Observable` based APIs, 
- And better error handling.

You need to use `HttpClient` to communicate with your back-end HTTP server or a third-party server that has CORS enabled but first you have to import it in your Angular application. These are the steps in nutshell:

-  First, import `HttpClientModule` from `@angular/common/http`.
-  Next, open the main application module (`AppModule`) and add `HttpClientModule` in the `imports` array.

>**Note**: Importing `HttpClientModule` in the root application module will make it available everywhere in your Angular application. You can also import it in a sub-module where it will be available only in that module.
 


>**Note**: This tutorial is intended for the new *HttpClient* module, available starting from **Angular 4.3+** via the *@angular/common/http* package.

We'll be seeing examples of common HTTP methods such as GET, PUT, PATCH, POST and DELETE, that you usually need to use when communicating with a REST API server.

By the end of this tutorial, you'll learn:

- What is *HttpClient* and how to use with Angular 10,
- How to setup the *HttpClientModule*,
- How to create an example API server with *json-server*,
- How to send an example GET request with Angular 10 and `HttpClient.get()`,
- How to send an example POST request with Angular 10 and `HttpClient.post()`,
- How to send an example PUT request with Angular 10 and `HttpClient.put()`,
- How to send an example DELETE request with Angular 10 and `HttpClient.delete()`


## <a name="Angular_6_HttpClient">Introducing Angular 10 HttpClient Module</a>

Angular 6 deprecated the old HTTP client in favor of the newer *HttpClient* module which is an improved version of the *Http* client API that lives in the *@angular/common/http* package. The old API is still available in *@angular/http* in Angular 6, but will be removed in next versions, for easing the migration process of existing Angular 4+ applications.

Now, let's see how to actually use the *HttpClient* module.

## <a name="Setting_Angular_HttpClient">Setting up the HttpClient Module in Angular 10</a>

Before you can use the new *HttpClient* module in your Angular 10 application, you need to add it to the *imports* array in the application main module. Start by importing the `HttpClientModule` module from the `@angular/common/http` package:

```ts
import { HttpClientModule } from  '@angular/common/http';
```

Next, add the `HttpClientModule` module to the `imports` array of the main root module:

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

After adding the module to the `imports` array, we are now ready to use the new `HttpClient` API to send GET, POST, PUT and DELETE requests to a REST HTTP server.

## <a name="Example_REST_Server_Angular">Creating an Example REST API Server for Our Angular 10 Application</a>

In this tutorial, we don't need to create a REST API instead we'll use *json-server* which allows us to quickly create a fake RESTful server and expose fake API endpoints, from sample data in a JSON file.

> **Note**: If you already have a back-end server with a REST API to consume, you can skip this part.

### What is REST 

Before creating an fake REST API server, let's first understand what is REST. 

[Wikipedia](https://en.wikipedia.org/wiki/Representational_state_transfer) defines REST as:

>**Representational State Transfer** (**REST**) is a software architectural style that defines a set of constraints to be used for creating web services. Web services that conform to the REST architectural style, termed _RESTful_ web services, provide interoperability between computer systems on the Internet. RESTful web services allow the requesting systems to access and manipulate textual representations of web resourcesby using a uniform and predefined set of stateless operations. Other kinds of web services, such as SOAP web services, expose their own arbitrary sets of operations
 
In more simple words: REST is a set of HTTP endpoints that provide a CRUD (Create, Read, Update, and Delete) interface on some server resources.

### Creating the REST API

First, you need to install *json-server* via npm by running the following command:

```bash
npm install -g json-server
```

> **Note**: This will install the package globally. You might need to use a CMD with administrator privileges in Windows or add `sudo` before your command in Linux systems in order to be able to install packages globally on your system without getting permission errors. 
> As the time of writing, json-server v0.14.2 will be installed.
   
Next, you need to create a JSON file, which will act as a database for our server. First, create a folder for our full-stack project and navigate inside it:

```bash
$ mkdir angular-httpclient-demo
$ cd angular-httpclient-demo
```

Next, create a `server` folder inside the `angular-httpclient-demo` folder and navigate to it:

```bash
$ mkdir server
$ cd server
```

Next, create a `database.json` file:

```bash
$ touch database.json
```

Open the `server/database.json` file and add the following data:

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

You can either add some items manually or better yet let's use [Faker.js](https://github.com/marak/Faker.js/) to automatically generate massive amounts of realistic fake data in Node.js and the browser.

First, initialize an empty Node.js module in the server folder:

```bash
$ npm init -y
```

This will generate a `package.json` file with default values:

```json
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Next, install `Faker.js` from npm using the following command:

```bash
$ npm i faker --save
```

> As of this writing, faker v4.1.0 will be installed.

Now, create a `generate.js` file:

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

We first import faker, next we declare an object with one empty array for customers then we enter a *for* loop to create *300* fake entries using faker methods like `faker.name.firstName()` for generating a random first name. [Check  all available methods](https://github.com/marak/Faker.js/#api-methods). Finally we convert the database object to a string and log it to the terminal. 

Next, add a  `generate` script to `package.json` to generate the database file:

```json
  "scripts": {
    "generate": "node generate.js > database.json"
  },
```

You can then run this command to create your `database.json` file and populate it:

```bash
$ npm run generate
```
Finally, run the API server by executing the following command:

```bash
json-server --watch database.json
```

You can now send HTTP requests to the server just like any typical REST server. Your RESTful server will be available from the `http://127.0.0.1:3000/` address. 

![REST API Server](https://www.diigo.com/file/image/rscqpoqzesbqadroczdqcpacpc/jsonserver.jpg?k=11711a28ac0c2adc0654842b0b6647ae)

These are the API endpoints we'll be able to use via this REST server and using the previous configuration:

- `GET /customers` for getting the customers,
- `GET    /customers/<id>` for getting a single customer by id,
- `POST   /customers` for creating a new customer,
- `PUT    /customers/<id>` for updating a customer by id,
- `PATCH  /customers/<id>` for partially updating a customer by id,
- `DELETE /customers/<id>` for deleting a customer by id.

You can use  `_page`  and `_limit`  parameters to get paginated data. In the  `Link`  header you'll get  `first`,  `prev`,  `next`  and  `last`  links.

For example:

`GET /customers?_page=1` for getting the first page of data, 
`GET /customers?_page=1&_limit=5` for getting the first five customers of the first page of data.

>**Note**: You can use other features such as filters, sorting and ordering. For more information, check out the [docs](https://github.com/typicode/json-server).

## Installing Angular CLI 10

Angular CLI is the official tool for creating Angular projects. Open a new terminal and run the following command to install it:

```bash
$ npm install @angular/cli@next --global
```

At the time of this writing `@angular/cli` **v10.0.0** is installed.

You need to have Node.js installed on your system. On Ubuntu you can follow this [tutorial](https://www.techiediaries.com/ubuntu-install-nodejs-npm/).

> Note: You may need to use a CMD line with admin access in Windows or add `sudo` in Linux and macOS for installing npm packages globally.
> As of this writing, Angular CLI v10 will be installed.


## Creating an Angular 10 Project

After creating the API server, we can now proceed to create our Angular project using Angular CLI 10. In your terminal, navigate to the `angular-httpclient-demo` folder and run the following command:

```bash
$ ng new frontend
``` 

The CLI will ask you if you **Would you like to add Angular routing? (y/N)** Type **y** and **Which stylesheet format would you like to use? (Use arrow keys)** Choose **CSS** and type `Enter`. Your project should start generating the necessary files and installing the dependencies.

> Make sure to read more about the [Angular router](https://www.techiediaries.com/angular-router/)


Now that we have created the project, before making of HttpClient to send HTTP requests let's first create the basic buildings of our demo application which are simply an `HttpService` that interfaces with the REST server and a bunch of components for making a CRUD interface that calls the methods of `HttpService`.

### Creating an Angular 10 Service

Let's start with the `HttpService`. In your terminal, run:

```bash
$ cd frontend
$ ng g s http
```
 
 The command will generate the `src/app/http.service.spec.ts` (for tests) and `src/app/http.service.ts` files.

 > **Note**: Make sure you have navigated inside the `frontend` folder before running Angular CLI commands.

### Creating Angular 10 Components

Next, let's create four components for displaying (list and by id) and creating/updating the customers:

```bash
$ ng g c customer-list
$ ng g c customer-details
$ ng g c customer-create
$ ng g c customer-update
```

### Adding Routing & Navigation

To be able to navigate between these components, we need to add them to the router configuration. Open the `src/app/app-routing.module.ts` file and update it accordingly:

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

## <a name="Angular_6_HttpClient_GET_Example">Example of Making HTTP GET Requests using HttpClient in Angular 10</a>

 
In this section we suppose that we have a component that displays a list of customers from a server.

First let's see the required steps:

- Import *HttpClient* from *@angular/common/http*

- Inject HttpClient via component constructor

- Make HTTP GET Requests using .get(endpoint) method

- Subscribe to the returned observable and show results

  

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

{{customer.name}}

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

  

## HTTP GET Request Parameters: HttpParams

  

In many situations, we need to feed some HTTP parameters to the API endpoint we are querying. In this section we'll see how to use the *HttpParams* class to use parameters in the *HttpClient* module.

  

For instance, let's suppose that we need to make a GET request to this `http://127.0.0.1:3000/customers?_page=1&_limit=1` URL for getting the first two customers of the first page.

  

We start by importing the *HttpParams* class using:

  

```ts

import {HttpParams} from  "@angular/common/http";

```

  

Next, we create an instance of the *HttpParams* class:

  

```ts

const  params = new  HttpParams().set('_page', "1").set('_limit', "1");

```

  

Finally, we call *httpClient.get()* method with these parameters, then assign the returned Observable to the *customersObservable* variable:

  

```ts

this.customersObservable = this.httpClient.get("http://127.0.0.1:3000/customers", {params});

```

  

### <a name="Angular_HttpClient_fromString">Using fromString to easily create HttpParams</a>

  

We can also build HTTP parameters directly from a query string, for example for our previous example URL `http://127.0.0.1:3000/customers?_page=1&_limit=1` we can create an instance of *HttpParams* class from the query string `_page=1&_limit=1` by simply using the *fromString* variable:

  

```ts
const  params = new  HttpParams({fromString:  '_page=1&_limit=1'});
```

## <a name="Angular_6_HttpClient_Request">Generic HttpClient `request()` method</a>

  

We have previously seen how to use the `.get()` method to send HTTP GET requests. Now we'll see a generic method to

send GET and the other HTTP methods such as POST, PUT and Delete etc.

  

Using the `.request()` method of the *HttpClient* module we can re-write our previous example to the following code:

  

```ts

const  params = new  HttpParams({fromString:  '_page=1&_limit=1'});

  

this.customersObservable = this.http.request("GET","http://127.0.0.1:3000/customers",{responseType:"json",params});

```

  

## <a name="Angular_6_HttpClient_Headers">Adding custom HTTP Headers to requests</a>

  

We can also add custom HTTP headers to our HTTP requests using the *HttpHeaders* class.

  

First create an instance of the *HttpHeaders* class and then set your custom HTTP header. For example:

  

```ts

const  headers = new  HttpHeaders().set("X-CustomHttpHeader", "CUSTOM_VALUE");

```

  

Next, you can send the GET request using:

  

```ts

this.customersObservable = this.httpClient.get("http://127.0.0.1:3000/customers", {headers});

```

  

## <a name="Angular_6_HttpClient_Put_Example">Sending HTTP PUT Requests in Angular 10</a>

  

The HTTP PUT method is used to completely replace a resource on the API server. We can use the *HttpClient* module to send a PUT request to an API server using the the `put()` method. For example:

  

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

  

## <a name="Angular_6_HttpClient_Patch_Example">Sending HTTP PATCH Requests</a>

  

The HTTP PATCH method is used to update a resource on the server. The *HttpClient* class provides the `patch()` method tha can be used to send UPDATE requests. For example:

  

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

  

## <a name="Angular_6_HttpClient_Delete_Example">Sending HTTP DELETE Requests</a>

Now let's see an example of how we can send an HTTP DELETE request to delete a resource from the API server using `delete()` method provided by the *HttpClient* class:

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
## <a name="Angular_6_HttpClient_Post_Example">Sending HTTP POST Requests in Angular 10</a>

The HTTP POST method has many uses but mostly used when we need to add new data on the server so let's take an example of adding a new customer to our REST API server database using the `post()` method of the *HttpClient* class:

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

We are calling the `post()` method from the injected instance of *HttpClient*. The first parameter is the API endpoint and the second parameter is the *customer* data object. We also subscribe to the observable returned by the `post()` method. If the operation is successful we display *POST Request is successful* and the data on the console. If there is an error we log the error on the console

## <a name="Conclusion">Conclusion</a>

So we have seen how to interact with a RESTful API server using common HTTP methods i.e GET, PUT, PATCH, DELETE and POST in Angular 10.

For the sake of testing we have used a fake REST API server but you can use the same examples with a real backend server.