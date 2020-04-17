---
layout: post
title: "RxJS Observables and Subjects Tutorial with Angular 7/8"
image: "images/content/angular.png"
excerpt: "In this tutorial, we'll learn to use the RxJS 6 library with Angular 7/8. We'll learn about how to import the Observable class and the other operators. How to subscribe and unsubscribe from Observables, how to import and call operators and wrap them with the `pipe()` function. We'll also see how to use the async pipe to subscribe to Observables from templates" 
tags : [angular, angular8] 
---

In this tutorial, we'll learn about RxJS Observables and subjects and how we can use them in Angular 7/8.

We'll also learn about the related concepts such as:

- The observer pattren and subscriptions.
- Hot and cold observables.
- RxJS’ `BehaviorSubject` and `ReplaySubject`.
- How to create and subscribe to Observables.
- How Observables are used in Angular.
- Working with the HttpClient Module and Observables
- Using `Observable` with `AsyncPipe`


## What's an RxJS Observable?

An Observable is an entity that emits (or publishes) multiple data values (stream of data) over time and asynchronously.

This is the definition of an Observable from the [RxJS docs](https://rxjs.dev/guide/overview)


> Observable represents the idea of an invokable collection of future values or events.

## Observers and Subscriptions

There are also related concepts that you'll work with when using Observables which are **Observers** and **Subscriptions**.

Observers are also called listeners (or consumers) as they can listen or subscribe to get the observed data.

From the RxJS docs:


> Observer is a collection of callbacks that knows how to listen to values delivered by the Observable.

[Subscriptions](http://reactivex.io/rxjs/class/es6/Subscription.js~Subscription.html) are objects that are returned when you subscribe to an Observable. They contain many methods such as the `unsubscribe()` method that you can call to unsubscribe from receving published values from the Observable. 

From the official docs:


> Subscription represents the execution of an Observable, is primarily useful for cancelling the execution.


## What is a Subject in RxJS

A [Subject](https://rxjs-dev.firebaseapp.com/guide/subject) is a special type of Observable that observers can also subscribe to it to receive published values but with one difference:  **The values are multicasted to many Observers**.


> **Note**: By default an RxJS Observable is unicast.

Unicast simply means that each subscribed observer has an independent execution of the Observable while multicast means that the Observable execution is shared by multiple Observers.


> **Note**: Subjects are similar to Angular EventEmitters.

So when using Subjects instead of plain Observables, all subscribed Observers will get the same values of emitted data.


> **Note**: Subjects are also Observers i.e they can also subscribe to other Observables and listen to published data. 

## Hot and Cold Observables

Unlike regular Observables, Subjects are called **hot**.  A hot Observable starts emitting events even before any observer subscribes to it which means observers may lose previous emitted values if they don’t subscribe at that right time while **cold** Observables ****start emitting values when at least one observer is subscribed.



> **Note**: You can use the `asObservable()` method to convert a subject to only an Observable.



## RxJS’ `BehaviorSubject` and `ReplaySubject`

RxJS provides two other types of Subjects: `BehaviorSubject` and `ReplaySubject`. 

With a normal Subject, Observers that are subscribed at a point later will not receive data values emitted before their subscriptions. In many situations, this is not the desired behavior we want to implement. This can be solved using  `BehaviorSubject` and `ReplaySubject`.

`ReplaySubject` works by using a buffer that keeps the emitted values and re-emit them when new Observers are subscribed.

`BehaviorSubject` works like `ReplaySubject` but only re-emits the last emitted value.
 


## How to Create an RxJS Observable

You can create an RxJS Observable using the `Observable.create()` method which takes a function with an `observer` argument. You can then subscribe to the returned Observable instance.

There many other methods to create Observables besides the static `create()` method:


- The `lift()` instance method which creates a new Observable from the instance (the source) it's called on,
- The `of([])` operator which creates an Observable of a single value. We'll see an example next,
- The `interval(interval)` operator which creates an Observable that emits an infinite sequence of numbers. Each number is emitted at a constant interval of time in seconds,
- The [timer()](http://reactivex.io/documentation/operators/timer.html) operator which returns an Observable that after a specified amount of time, emits numbers in sequence every specified duration,
- The `from()` method that creates an Observable from a Promise or an array of values,
- The `fromEvent()` method that creates an Observable from a DOM event,
- The `ajax()` method which creates an Observable that sends an Ajax request.

We'll see these creation methods by example later.

### How to Subscribe to an RxJS Observable

After creating an `Observable`, you can subscribe to it using the `subscribe()` method on the instance which returns an instance of `Subscription`.

### A Simple Example of the RxJS Observable

Let's now see a simple example of creating and working with an Observable. 

First let's create an Observable:


    let ob$ = Observable.create((observer) => {
        observer.next("A new value!");
    });

We create an `ob$` Observable and we define the logic that our Observable is supposed to do in the body of the passed in method.

In this example, the Observable will simply emit the **A new value!** value to the subscribed Observer.


> **Note**: The dollar sign is just a convention for naming variables that hold instance of Observables.

We call the `next()` method of the observer object to inform it of the available values.


> **Note**: All observer objects must have a collection of methods such as `next()`, `complete()` and `error()`. This allows Observables to communicate with them.
> 
> The `next()` method is used by the Observable to pass values (publish values) to the subscribed Observer.

 
Next, let's create an observer object:


    let observer = {
        next: data => console.log( 'Data received: ', data),
        complete: data => console.log('Completed'),
    };

An observer is a plain JavaScript object that contains methods such as `next()`, `complete()` and `error()`. This means it knows how to get notified by the Observable.


> **Note**: You can also add other custom attributes and methods to the Observer objects besides `next()`, `complete()` and `error()`.

Finally, let's subscribe to our `ob$` Observable and return a `Subscription`:


    let subscription = ob$.subscribe(observer);

Once you susbscribe to the `ob$` Observable, you'll get the following output in the console:


    Data received: A new value! 


## How Observables are Used in Angular

Angular uses the RxJS Observable as a built-in type for many of its APIs such as:


- The `HttpClient` methods return Observables and actual requests are only sent when you subscribe to the returned Observable.
- The Router uses Observables in multiple places such as:
  -  the `[events](https://angular.io/api/router/Router#events)` of the Router instance is an Observable to listen to events on the router. 
  - Also `ActivatedRoute` (which contains information about the route associated with the currently loaded component on the router outlet) has many Observable properties such as `params` and `paramMap` for the route parameters.

Let's assume, you have an Angular component and the Router service injected as `router`. This example from [StackOverflow](https://stackoverflow.com/questions/33520043/how-to-detect-a-route-change-in-angular) shows you how you can subscribe to the router events for detecting a route change:


    import { Component } from '@angular/core'; 
    import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
    @Component({
        selector: 'app-root',
        template: `<router-outlet></router-outlet>`
    })
    export class AppComponent {
        constructor(private router: Router) {
            this.router.events.subscribe((event: Event) => {
                if (event instanceof NavigationStart) {
                    console.log("Navigation start");
                }
                if (event instanceof NavigationEnd) {
                    console.log("Navigation end");
                }
                if (event instanceof NavigationError) {
    
                    console.log(event.error);
                }
            });
       }
    }     



- The Reactive Forms Module uses reactive programming and Observables for listening to user input.
- The `@output()` decorator in a component takes an `EventEmitter` instance. `EventEmitter` is a subclass of the RxJS Observable.

## How to Use RxJS 6 Observable in Your Angular Code

Angular uses Observables (implemented with the RxJS library) for all asynchronous events. If you are using Angular CLI 6|7, RxJS 6 will be installed by default on your project. 

Otherwise you can install it via npm using:


    $ npm install rxjs --save 

To be able to use the Observable symbol in your code, you first need to import it:


    import { Observable } from 'rxjs';

This is the new import path in RxJS 6 which is different from RxJS 5.

## Working with the HttpClient Module and Observables

The new Angular `HttpClient` works with Observables by default. Methods such as `get()`, `post()`, `put()` and `delete()` return an instance of the Observable interface.

HTTP requests are only sent when we subscribe to the Observable.
 
This is an example of making an HTTP request:


    getItems(): Observable<Item[]> {
       return this.httpClient.get<Item[]>(this.itemUrl);
    }

We assume that you have injected the `HttpClient` service as *httpClient*.

## Using `Observable` with `AsyncPipe`

Angular `AsyncPipe` subscribes to Observable and returns the emitted data. For example. Let's suppose we have this method:



    getItems(): Observable {
      this.items$ = this.httpClient.get(this.itemUrl);
    }

The `items$` variable is of type Observable<Item[]>`. 

After calling the `getItems()` method on the component we can use the `async` pipe in the component template to subscribe to the returned Observable:


## Subscribing to Observables

Observables are used for better support of event handling, asynchronous programming, and handling multiple values. When you define an Observable to publish some values for a consumer, the values are not emitted until you actually subscribe to the Observable. 

The Consumer that subscribes to the Observable keeps receiving values until the Observable is completed or the consumer unsubscribes from the observable.

Let's start by defining an observable that provides a stream of updates


## Conclusion

In this tutorial, you have learned what an Observable is — An object that emits or publishes values over time and asynchronously.

You have learned about the related concepts to Observables such as Observers and Subscriptions — Observers are objects that listen and consume values published by an Observable and Subscriptions are the objects returned from the `subscribe()` method (They are usually used to unsubscribe the Observer from the Observable).

You have also learned about special types of Observables such as Subjects, behavior Subjects (`BehaviorSubject`) and replay Subjects (`ReplaySubject`) and also the difference between unicast and multicast Observables. As a reminder a multicast Observable shares its execution between all its Observers.

You learned about cold and hot Observables — hot refers to when the Obseravble starts publishing values when it’s created even before getting any subscriptions. 
