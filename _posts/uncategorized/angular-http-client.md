---
layout: post
title: "Angular Http — Angular 6 HttpClient Tutorial"
image: "images/content/angular-httpclient.png"
excerpt: "How to use HttpClient to make HTTP Requests in Angular 4.3+" 
tags : [angular] 
---

How to do **HTTP in Angular**? In this tutorial we'll be seeing a detailed guide with example using the new `@angular/common/http` module.

In this tutorial, we are going to learn how to use *HttpClient* by example in **Angular 6**. We'll see how to send http post,get, put and delete requests to a back-end server. 

Also check <a href="https://www.techiediaries.com/angular-httpclient" target="blank">Angular 6|7: HttpClient—Building a Service for Sending API Calls and Fetching Data</a>.

This tutorial is intended for the new *HttpClient* module, available starting from **Angular 4.3+** in the *@angular/common/http* package.

We'll see examples of common HTTP methods such as GET, PUT, PATCH, POST and DELETE, that you usually need to use when 
communicating with a REST API server.

By the end of this tutorial, you'll learn:

- What is *HttpClient* and how to use with Angular 6
- How to setup the *HttpClientModule* 
- How to create an example API server with *json-server*
- How to send an example GET request with Angular 6 and `HttpClient.get()`
- How to send an example POST request with Angular 6 and `HttpClient.post()`
- How to send an example PUT request with Angular 6 and `HttpClient.put()`
- How to send an example DELETE request with Angular 6 and `HttpClient.delete()`

For a more detailed tutorial about HttpClient. Read <a href="https://www.techiediaries.com/angular-httpclient" target="blank">Angular 6|7: HttpClient—Building a Service for Sending API Calls and Fetching Data</a> for learning how to create a complete Angular 7 application that uses HttpClient for sending HTTP requests.


> **Note**: Check out how to build a developer portfolio web application with Angular 7.1, Firebase and Firestore with these series:

- [Angular 7|6 Tutorial Course: CLI, Components, Routing & Bootstrap 4](https://www.techiediaries.com/angular-course),
- [Angular 7|6 Tutorial Course: Angular NgModules (Feature and Root Modules)](https://www.techiediaries.com/angular-course-modules),
- [Angular 7|6 Tutorial Course: Nested Router-Outlet, Child Routes & forChild()](https://www.techiediaries.com/angular-course-child-routes),
- [Angular 7|6 Tutorial Course: Authentication with Firebase (Email & Password)](https://www.techiediaries.com/angular-course-firebase-authentication),
- [Angular 7|6 Tutorial Course: Securing the UI with Router Guards and UrlTree Parsed Routes](https://www.techiediaries.com/angular-course-router-guards)


## <a name="Angular_6_HttpClient">Introducing Angular 6 HttpClient Module</a> 

Angular 6 deprecated the old HTTP client in favor of the newer *HttpClient* moduleshipped which is an improved version of the *Http* client API that lives in the *@angular/common/http* package. The old API is still 
available in *@angular/http* in Angular 6, but  will be removed in next versions, for easing the migration process of existing Angular 4+ applications.

Now let's see how to actually use the *HttpClient* module.

## <a name="Setting_Angular_HttpClient">Setting up the HttpClient Module in Angular 6</a> 

Before you can use the new *HttpClient* module in your Angular 6 application, you need to add it to the *imports* array in the application main module:

Start by importing the *HttpClientModule* module from the *@angular/common/http* package:

```ts
import { HttpClientModule } from '@angular/common/http';
```

Next, add the *HttpClientModule* module to the *imports* array of the main module:

```ts
@NgModule({
declarations: [
    AppComponent
],
imports: [
    BrowserModule,
    **HttpClientModule**
],
providers: [],
bootstrap: [AppComponent]
})
export class AppModule { }
```
After adding the module to the *imports* array, we are now ready to use the new *HTTPClient* API to send get, post, put and delete requests to a REST server.

## <a name="Example_REST_Server_Angular">Example REST API Server for Our Angular 6 Application</a>

In this tutorial, we don't need to create a REST API instead we'll use *json-server* which allows us to quickly create a fake RESTful server and expose fake API endpoints, from sample data in a JSON file.

First, you need to install *json-server* via npm by running the following command:

```bash
npm install -g json-server 
```

Next, you need to create a JSON file, which will act as a database of our server:

Create a `db.json` file and add the following example data:

```json
    {
        "customers": [
            {
            "id": 1,
            "name": "Customer001",
            "email": "customer001@email.com",
            "tel": "0526252525"
            },
            {
            "id": 2,
            "name": "Customer002",
            "email": "customer002@email.com",
            "tel": "0527252525"
            },
            {
            "id": 3,
            "name": "Customer003",
            "email": "customer003@email.com",
            "tel": "0528252525"
            }
            
        ]
    }
```

Finally, run the API server by executing the following command:

```bash
json-server --watch db.json 
```

You can now send HTTP requests just like any typical REST server.

## <a name="Angular_6_HttpClient_GET_Example">Example of Making HTTP GET Requests using HttpClient in Angular 6</a>

In this section we suppose that we have an Angular 6 project generated with Angular CLI and that we have a component that displays a list of customers from a server. 


First let's see the required steps:


- Import *HttpClient* from *@angular/common/http*
- Inject HttpClient via component constructor
- Make HTTP GET Requests using .get(endpoint) method
- Subscribe to the returned observable and show results

Here is the source code of our example:

```ts
import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
    

class Customer {
	id : number;
  name: string;
  email: string;
  tel: string;
}

@Component({
  selector: 'customers',
  template: `
    <ul *ngIf="customersObservable | async as customers else empty">
			<li *ngFor="let customer of customers">
					{{customer.name}}
			</li> 
    </ul>
    <ng-template #empty> No Customers Yet </ng-template>
    `})
export class CustomerComponent implements OnInit {
    customersObservable : Observable<Customer[]>;

    constructor(private httpClient:HttpClient) {}

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
import {HttpParams} from "@angular/common/http";
```

Next, we create an instance of the *HttpParams* class:

```ts
const params = new HttpParams().set('_page', "1").set('_limit', "1");
```

Finally, we call *httpClient.get()* method with these parameters, then assign the returned Observable to the *customersObservable* variable:

```ts
this.customersObservable = this.httpClient.get("http://127.0.0.1:3000/customers", {params});
```                                              

### <a name="Angular_HttpClient_fromString">Using fromString to easilly create HttpParams</a> 

We can also build HTTP parameters directly from a query string, for example for our previous example URL `http://127.0.0.1:3000/customers?_page=1&_limit=1` we can create an instance of *HttpParams* class from the query string `_page=1&_limit=1` by simply using the *fromString* variable:

```ts
const params = new HttpParams({fromString: '_page=1&_limit=1'});
```


## <a name="Angular_6_HttpClient_Request">Generic HttpClient `request()` method</a>

We have previously seen how to use the `.get()` method to send HTTP GET requests. Now we'll see a generic method to 
send GET and the other HTTP methods such as POST, PUT and Delete etc.

Using the `.request()` method of the *HttpClient* module we can re-write our previous example to the following code:

```ts
const params = new HttpParams({fromString: '_page=1&_limit=1'});

this.customersObservable = this.http.request("GET","http://127.0.0.1:3000/customers",{responseType:"json",params});
```

## <a name="Angular_6_HttpClient_Headers">Adding custom HTTP Headers to requests</a> 

We can also add custom HTTP headers to our HTTP requests using the *HttpHeaders* class.

First create an instance of the *HttpHeaders* class and then set your custom HTTP header. For example:

```ts
const headers = new HttpHeaders().set("X-CustomHttpHeader", "CUSTOM_VALUE");
```

Next, you can send the GET request using:

```ts
this.customersObservable = this.httpClient.get("http://127.0.0.1:3000/customers", {headers});
```

## <a name="Angular_6_HttpClient_Put_Example">Sending HTTP PUT Requests in Angular 6</a> 

The HTTP PUT method is used to completely replace a resource on the API server. We can use the *HttpClient* module to send a PUT request to an API server using the the `put()` method. For example:

```ts
    this.httpClient.put("http://127.0.0.1:3000/customers/1",
        {
            "name": "NewCustomer001",
            "email": "newcustomer001@email.com",
            "tel": "0000252525"
        })
        .subscribe(
            data => {
                console.log("PUT Request is successful ", data);
            },
            error => {
                console.log("Rrror", error);
            }
        );  
```

## <a name="Angular_6_HttpClient_Patch_Example">Sending HTTP PATCH Requests</a> 

The HTTP PATCH method is used to update a resource on the server. The *HttpClient* class provides the `patch()` method tha can be used to send UPDATE requests. For example:

```ts
this.httpClient.patch("http://127.0.0.1:3000/customers/1",
    {
            "email": "newcustomer001@email.com"
    }).subscribe(
            data => {
                console.log("PUT Request is successful ", data);
            },
            error => {
                console.log("Error", error);
            }
);  
```

## <a name="Angular_6_HttpClient_Delete_Example">Sending HTTP DELETE Requests</a> 

Now let's see an example of how we can send an HTTP DELETE request to delete a resource from the API server using `delete()` method provided by the *HttpClient* class:

```ts
    this.httpClient.patch("http://127.0.0.1:3000/customers/1")
        .subscribe(
            data => {
                console.log("PATCH Request is successful ", data);
            },
            error => {
                console.log("Error", error);
            }
        );          
```

## <a name="Angular_6_HttpClient_Post_Example">Sending HTTP POST Requests in Angular 6</a>

The HTTP POST method has many uses but mostly used when we need to add new data on the server so let's take an example of adding a new customer to our REST API server database using the `post()` method of the *HttpClient* class:


```ts
    this.httpClient.post("http://127.0.0.1:3000/customers",
        {
            "name": "Customer004",
            "email": "customer004@email.com",
            "tel": "0000252525"
        })
        .subscribe(
            data => {
                console.log("POST Request is successful ", data);
            },
            error => {
                console.log("Error", error);
            }
        );           
```
 We are calling the `post()` method from the injected instance of *HttpClient*. The first parameter is the API endpoint and the second parameter is the *customer* data object. We also subscribe to the observable returned by the `post()` method. If the operation is successful we display *POST Request is successful* and the data on the console. If there is an error we log the error on the console   

For a step by step tutorial.Make sure to read 
<a href="https://www.techiediaries.com/angular-httpclient" target="blank">Angular 6|7: HttpClient—Building a Service for Sending API Calls and Fetching Data</a> for learning how to build a complete Angular 7 application that makes use of HttpClient.


## <a name="Conclusion">Conclusion</a> 

So we have seen how to interact with a Restful API server using common HTTP methods i.e GET, PUT, PATCH, DELETE and POST.

For the sake of testing we have used a fake Rest api server but you can use the same examples with a real backend server.


