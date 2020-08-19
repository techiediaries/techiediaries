---
layout: bpost
title: "Angular 10 Constructor Parameters with Inject and Optional Decorators"
image: "images/content/angular.png"
excerpt: "In this example, we'll learn how to use component's and service's constructors with Angular 10 and previous versions"
date: 2020-08-19
tags : [angular]
---

In this example, we'll learn how to use component's and service's constructors with Angular 10 and previous versions.

We'll see how to provide dependencies as constructor parameters to components or services and use the `@Optional` and `@Inject` decorators for adding optional dependencies or create injection tokens to pass parameters to services.

As a prerequisite, you need to have Angular CLI v10 installed on your development machine.

You can also use the online Stackblitz IDE if you don't have a development environment ready yet.

## Creating a New Angular 10 Project

Let's get started with a new project. Go to a new command-line interface and run the following command to create a new project:

```bash
$ ng new Angular10Constructor 
```

The CLI will ask you a couple of questions — If  **Would you like to add Angular routing?**  Type  **y**  for Yes and  **Which stylesheet format would you like to use?**  Choose  **CSS**.

Next, go to you project’s folder and run the server using the following commands:

```bash
$ cd Angular10Constructor
$ ng serve    
```

Use your web browser and visit the  `http://localhost:4200/`  address to see your app running.  

Open your web browser and navigate to the  `http://localhost:4200/`  address to see your app running.  

## What is a Constructor?

The constructor is a method in a TypeScript class that gets called when the class is being instantiated. It’s not an Angular feature but rather a concept that's present in most Object-Oriented languages including TypeScript.

This is an example:

```ts
class Cls {
  constructor() {
    console.log('Hello world!');
  }
}

const cls = new Cls();
```

When we instantiate the class using the new keyword, the constructor will be called.

## Constructors in Angular 10

In Angular 10 and previous versions, the constructor has a special use besides its typical use. Since Angular uses dependency injection for wiring various artifacts such as components and services, the injector makes use of the constructor to inject the dependencies into the class which can a component, or a service, etc. Angular resolves providers you declare in your constructor. This is an example:

```ts
import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {

  constructor(private httpClient: HttpClient) {}
}

```

This will provide `HttpClient` to the component's class, making it available to the component via `this.httpClient`.

In order for `AppComponent` to send HTTP requests, it needs to ask for `HttpClient` to be injected, rather than creating its own `HttpClient` instance with `new`.

You can tell Angular to [inject a dependency](https://angular.io/guide/dependency-injection) in a component's constructor by specifying a constructor parameter with the dependency type. Here's the AppComponent constructor, asking for the HttpClient to be injected:

```ts
constructor(private httpClient: HttpClient) {}
```

## Passing Optional Dependencies

When a component or service needs a dependency, the class constructor takes that dependency as a parameter. You can tell Angular that the dependency is optional by annotating the constructor parameter with `@Optional()`.

```ts
import { Optional } from '@angular/core';

constructor(@Optional() private httpClient?: HttpClient) {
```

## Passing Parameters to Services with the `@Inject` Decorator

If you need to pass additional parameters to an Angular service, you can use the `@Inject` decorator which allows you to pass your parameters to the service via Angular’s dependency injection.

Let’s suppose we have an Angular 10 service that requires the ID of the DOM container in the component's template. For example:


```ts
import {Inject, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyService {
    constructor (private elementId: string) { }
}
```

This is an example component that can make use of this service:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-my',
  template: `
    <div id="container"></div>
  `,
})
export class MyComponent {

  constructor() { }

}
```

Now we need to inject the previous service via the component's constructor but we also need to pass the ID as a parameter to the service. 

We transform the `elementId` parameter to an injection token as follows:

```ts
import {Inject, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyService {
  constructor (
    @Inject('elementId') private elementId: string
  ) { }
}
```

Next, we need to provide this token to the service through the component’s `providers` array:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-my',
  template: `
    <div id="container"></div>
  `,
   providers: [

    {provide: 'elementId', useValue: 'container'},
  ]
})
export class MyComponent {

  constructor(private myService: MyService) { }
}
```

Here we provided the token at the component level but we can also provide tokens at the module level if it makes sense.


## Conclusion

We learned about using class constructors in Angular for dependency injection bu declaring providers as parameters. 

We've seen how to provide dependencies as constructor parameters to components or services and use the `@Optional` and `@Inject` decorators for adding optional dependencies or create injection tokens to pass parameters to services.
