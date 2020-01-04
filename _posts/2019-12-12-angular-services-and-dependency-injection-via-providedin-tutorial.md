---
layout: post
title: "Angular 9/8 How-To: Services & Dependency Injection via providedIn, root & any Tutorial"
image: "images/content/angular-by-example-httpclient-get.png"
excerpt: "In this tutorial, we'll be learning about Angular services using the latest Angular 9 version. We'll also learn about dependency injection and its mechanisms such as the `@Injectable` decorator and the providedIn property which can take the root and any values or a specific module that will be explaining next." 
tags : [angular, angular-how-tos, angular9] 
---

In this tutorial, we'll be learning about **Angular services** using the latest Angular 9 version. We'll also learn about dependency injection and its mechanisms such as the `@Injectable` decorator and the `providedIn` property which can take the `root`and `any` values or a specific module that will be explaining next.  

The `any` value of `provideIn` is introduced in Angular 9.

## What is an Angular service?

An Angular service is simply a TypeScript class that encapsulates the various methods for completing a certain task in your app such as getting and sending data from and to a server.

A service is decorated using the `@Injectable()` decorator available from the Angular core package which means the service can be injected in the components and the other services.

But what does mean when a service is injected?

Angular makes use of [Dependency Injection](https://angular.io/guide/dependency-injection) to provide instances of services to various components and services which means we don't need to manually create an instance of the service before using it, we simply tell the dependeny injector that we need to use the service and it will provide the instance. Now, how do we tell the injector that we need a service? 

We simply use the constructor of the component/service that needs the instance to define the service(s) that need(s) to be injected.  

According to the Angular docs:

> Dependency injection (DI), is an important application design pattern. Angular has its own DI framework, which is typically used in the design of Angular applications to increase their efficiency and modularity. Dependencies are services or objects that a class needs to perform its function. DI is a coding pattern in which a class asks for dependencies from external sources rather than creating them itself.

## Why do you need to use Angular services?

Angular services are mostly useful in the following scenarios:

-   for separating the business logic of your app from the rendering logic in components,
-   for sharing the data between multiple components in your Angular app,
-   for easing testing and debugging,
-   for writing re-usable code.

Now that we have learned about Angular services and dependency injection, let's see that by example.

## Step 1 - Creating an Angular service by example using Angular CLI 

Provided that you have Angular CLI installed on your machine and that you have an Angular 9 project generated:

```bash
$ ng new angular-service-example
```

Let's see how to use Angular CLI to generate a service. 

Open a new command-line interface, navigate to your project's folder and run the following command:

```bash
$ ng generate service data
```

The command will create the following files in the  `src/app`  folder of our project:

- `src/app/data.service.spec.ts`
- `src/app/data.service.ts`

Open the `src/app/data.service.ts` file, you should find the following initial code:
 
```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor() { }  
}
```

This is a typical TypeScript class decorated with the `@Injectable()` decorator that tells the Angular dependency injector that the class can be provided and injected as a dependency in the other components or services.


### What is providedIn?

The Injectable decorator takes a property called `provideIn` that have by default the `root` value.
 
The `providedIn` property tells the Angular dependency injection with the "scope" of our service in the application i.e where it can be provided.

> **Note**: Before Angular 6, we used the  `providers: []`  property of the  `@NgModule`  decorator.  

With  Angular 6+ we have the new provideIn property for specifying where the dependencies can be provided. It's officialy named **Tree-shakable providers**.

Thanks to the `providedIn` property the service can specify where it can be provided without resorting to use the `providers` array of the module/component.
 
 
Angular services can be provided in the `root` or in any of the available modules using `any` or a specific module. The `root` value is an alias for the `AppModule`, `any` is added starting with Angular 9.  

## Step 2 - Implementing the method(s) of our example Angular service 

Now, let's see by example how to implement our Angular service. 

For sending HTTP requests, we need to import the `HttpClientModule` which provides the builtin `HttpClient` service.
 
 
Open the `src/app/app.module.ts` file and import `HttpClientModule` then add it the `imports` array as follows:

```typescript
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule
   ]
})
```

Since `HttpClient` is also a service, we can inject it in our data service via the constructor as follows:

```typescript
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl: string = 'YOUR_API_URL';

  constructor(private httpClient: HttpClient) { }

  fetchData(): Observable<any> {
    return this.httpClient.get(this.apiUrl)
  }
}
```

## Step 3 - Accessing the Angular service methods from components

After defining and implementing the service, you need to inject it into the component(s) where you need to use it.

Let's suppose that we want to use the service in the app component.

Open the `src/app/app.component.ts` file and import the service as follows:

```typescript
import { DataService } from './data.service';
```

Next, you need to inject the service class via the constructor of the component as follows:

```typescript
export class AppComponent {
  constructor(private dataService: DataService){}
}
```

Next, we can now call the fetchData() method of our service, for example inside the `ngOnInit()`  lifecycle hook of the component:

```typescript
import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.fetchData().subscribe(data =>{
		console.log(data);
	});
  }
}
```

Since the `get()` method of `HttpClient` returns an RxJS observable which gets returned from the `fetchData()` method, we need to subscribe to it in order to send the actual GET request and receive the response.

## Conclusion

In this tutorial, we've seen by example how Angular services work alongside with the other corner concepts like dependency injection, the `@Injectable` decorator for creating a service from a TypeScrit class and the `providedIn` property for declaring where the service should be provided in our Angular application which could take the `root`, `any` (new in Angular 9) values or a specific Angular module. 
