---
layout: bpost
title: "Angular 10/9 Services"
image: "images/content/html.png"
excerpt: "Learn about services in Angular 10 and previous versions"
date: 2020-04-15
tags: [ angular ] 
---


In this post, we'll look at services in Angular 10 and previous versions.

After understanding modules and components, let’s see what Angular services are. 

## What's an Angular 10 Service?

In Angular 10 and previous versions, a service is a singleton that can be wired with components or other services via **Dependency Injection**.
 
According to [Wikipedia](https://en.wikipedia.org/wiki/Dependency_injection):


> In software engineering, **dependency injection** is a technique whereby one object supplies the dependencies of another object.

Don’t be intimidated by this term, it simply means that Angular (or a part of Angular, the injector) takes care of instantiating the services and provides the instance to the requesting component.


According to the [Angular docs:](https://angular.io/guide/architecture-services) 


> DI is wired into the Angular framework and used everywhere to provide new components with the services or other things they need. Components consume services; that is, you can inject a service into a component, giving the component access to that service class.


## Why Using Angular Services?

You can use **services** to organize and share code across your app

Typically, a component's job is to enable the user experience and nothing more. A component should present properties and methods for data binding, in order to mediate between the view (rendered by the template) and the application logic.

A component can delegate certain tasks to services, such as fetching data from the server, validating user input, or logging directly to the console. 

By defining such processing tasks in an *injectable service class*, you make those tasks available to any component.

To define a class as a service in Angular, use the `@``[Injectable](https://angular.io/api/core/Injectable)``()` decorator to provide the metadata that allows Angular to inject it into a component as a *dependency*.

You need to provide a service before it can be available. This can be done in three ways:
 

- Via the service’s metadata passed to the `@Injectable()` decorator (The service will be available everywhere),
- Via the `providers` array, in a specific module (The service is available only to the components and services of the module),
- Via the `providers` array in a specific component (The service is available only to the component).

We have seen what are Angular services and when we use them. Currently Angular 10 beta is released. Angular 9 has been released before with may enhancements to services and dependency injection.