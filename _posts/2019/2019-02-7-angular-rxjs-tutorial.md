---
layout: post
title: "Angular 7/8 RxJS 6 In-Depth Tutorial & Example"
image: "images/content/angular.png"
excerpt: "In this tutorial, we'll learn to use the RxJS 6 library with Angular 7/8. We'll learn about how to import the Observable class and the other operators. How to subscribe and unsubscribe from Observables, how to import and call operators and wrap them with the `pipe()` function. We'll also see how to use the async pipe to subscribe to Observables from templates" 
tags : [angular] 
---


In this tutorial, we'll learn to use the RxJS 6 library with Angular 7/8. We'll learn about:


- How to import the Observable class and the other operators.
- How to subscribe and unsubscribe from Observables.
- How to import and call operators and chain them with the `pipe()` function.
- We'll also see how to use the async pipe to subscribe to Observables from Angular templates. 
- Finally we'll see how to use some popular pipeable operators such as `tap()`, `map()` and `filter()` and their new import paths in RxJS 6.


> **Note**: This tutorial works with both Angular 7 and Angular 8.

This tutorial is divided in two parts. You can check out the second tutorial from this [link](https://www.techiediaries.com/observables-and-subjects-tutorial).

Throughout this tutorial, we’ll start looking at what reactive programming, asynchronous operations and data streams are and how they are related to the RxJS library. We’ll then see the concept of an RxJS `Observable` with examples, the various types of Observables such as:


- `Subject`, 
- `BehaviorSubject` and `ReplaySubject`, 
- unicast and multicast Observables, 
- cold and hot Observables  etc.

Next, we’ll see what RxJS operators are and examples of some popular operators such as `tap()`, `map()`, `filter()`, `share()`, etc. And finally we’ll see how Angular uses the RxJS Observable to do asynchronous programming. 

## What is Reactive Programming


![What is Reactive Programming](https://d2mxuefqeaa7sj.cloudfront.net/s_98CC91BB1D7ABCD50AC04362B7F541F3549A631A6219D02FE7AED5645CF1CAA7_1549549534749_use-reactive-programming-you-must.jpg)


Let’s see the definition of Reactive programming from different sources.

This is how  Andre Staltz, the creator of [cycle.js](https://cycle.js.org/) (A functional and reactive JavaScript framework for predictable code) defines it:


> Reactive Programming is programming with asynchronous data streams 


This means when you are writing code that deals with asynchronous operations and streams of data, you are doing reactive programming.

Now, this is the definition from [Wikipedia](https://en.wikipedia.org/wiki/Reactive_programming) which is more in-depth:


> In computing, reactive programming is a declarative programming paradigm concerned with data streams and the propagation of change.

This means reactive programming is a declarative (vs. a procedural) style of programming  that works on streams of data.

For a detailed guide on reactive programming and data streams, check out: [The introduction to Reactive Programming you've been missing](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754).

## What is Stream

A stream is an essential concept in reactive programming so it's worth seeing the definition before we proceed further.


![What is a stream](https://d2mxuefqeaa7sj.cloudfront.net/s_98CC91BB1D7ABCD50AC04362B7F541F3549A631A6219D02FE7AED5645CF1CAA7_1549549589200_687474703a2f2f692e696d6775722e636f6d2f4149696d5138432e6a7067.jpeg)


In all definitions we’ve seen the word **stream.**   

So what is a stream?


Simply put:


> A stream refers to values of data overtime.

We'll see later that Observables and streams are very related concepts.

## What is RxJS

Now, that we’ve seen the conceps of reactive programming and data streams, let’s see what RxJS is.


![What is RxJS](https://d2mxuefqeaa7sj.cloudfront.net/s_98CC91BB1D7ABCD50AC04362B7F541F3549A631A6219D02FE7AED5645CF1CAA7_1549549625485_what-if-reactive-programming-is-just-a-myth-and-facebook-and-netflix-dont-exist.jpg)


[RxJS](https://github.com/ReactiveX/rxjs) is a popular library among web developers. It provides functional and reactive programming patterns for working with events and streams of data and has been integrated in many web development libraries and frameworks such as Angular.

RxJS makes it easy for JavaScript developers to write asynchronous code using composable Observables instead of callbacks and Promises.

RxJS stands for Reactive Extensions for JavaScript and it actually has implementations in other programming languages such as Java, Python, Ruby, and PHP etc. It's also available for platforms such as Android. Check out the [complete list of supported languages and platforms](http://reactivex.io/languages.html).

RxJS v6 is currently the stable version of RxJS and it has many breaking changes with RxJS v5. You can check out more information about the changes and how to migrate from the old version from this official [migration guide](https://github.com/ReactiveX/rxjs/blob/master/docs_app/content/guide/v6/migration.md).

RxJS 6 has many advantages over the previous RxJS 5 version(s), such as:


  - The bundle size of the library is smaller,
  - The performance of the latest version is better,
  - RxJS 6 Observable follows the [Observable Spec Proposal](https://github.com/zenparsing/es-observable),
  - The latest version provides better debugability,
  - A better modular architecture,
  - It's backward compatible.
## How to Install and Use RxJS

RxJS is a JavaScript library which means you can install it in the same way you install other libraries:

## Using RxJS with ES6 via npm

In your project, you can run the following command to install RxJS:


    $ npm install rxjs

You can then import the symbols you want to use from the `rxjs` package or a sub-package such as `rxjs/operators`:


    import { Observable, Subscriber } from 'rxjs';
    import { tap, map, filter } from 'rxjs/operators';

We imported the `Observable` and `Subscriber` symbols from `rxjs` and the `tap`, `map` and `filter` operators from `rxjs/operators`. 

We'll see later what these symbols are and how to use them in your Angular application.

## Using RxJS from a CDN

You can also use RxJS from a [CDN](https://unpkg.com/rxjs/bundles/rxjs.umd.min.js) using a `<script>` in your HTML document:


    <script src="https://unpkg.com/rxjs/bundles/rxjs.umd.min.js"></script>


> **Note**: Please note that in Angular 7/8, RxJS 6 is already included in your project so you don't need to install it manually.


## What is an Observable, Observer and Subsription in RxJS 6

RxJS uses the concept of Observables to handle and work with asynchronous and event-based code.


The asynchronous word comes from Asynchrony. In computer programming, here is the definition of Asynchrony from [Wikipedia](https://en.wikipedia.org/wiki/Asynchrony_(computer_programming)):



> Asynchrony, in computer programming, refers to the occurrence of events independent of the main program flow and ways to deal with such events. These may be "outside" events such as the arrival of signals, or actions instigated by a program that take place concurrently with program execution, without the program blocking to wait for results. 

After reading this definition, you may have concluded how much asynchrony is important for computers and programming!

Let's make this simple!

**Asynchronous** code is the inverse of **synchronous** code which is the original way of thinking about your code when you are first introduced to programming. 

Your code is synchronous when it's running in sequences i.e instruction by instruction in the order they appear in the source code. 

For example, let's consider this simple JavaScript code:


    const foo = "foo" //1
    const bar = "bar" //2
    const foobar = foo  +  bar //3
    console.log(foobar) //4

The browser will run this synchronous code line by line from line 1 to 4 starting by assigning the `foo` and `bar` variables, concatenating them and displaying the `foobar` variable in the console.

JavaScript supports also the **asynchronous** approach of writing code which makes sense, since you need to respond to the user events in the browser but you don't actually know when the user interacts with your application (and in which order) when you are writing code.

This was originally achieved using callbacks which you need to define in your code and specify when they will be called. 

For example, the following asynchronous code will display **You clicked the button!** when the user clicks the button identified by the `mybutton` identifier:


    document.getElementById('mybutton').addEventListener('click', () => {
      console.log("You clicked the button!")
    })

The second argument of the `addEventListener()` method is the callback.

You can also use callbacks to handle asynchronous operations which don't involve the DOM. For example, the following code can be used to send an HTTP POST request to a web server:


    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        xhr.status === 200 ? console.log(xhr.responseText) : console.error('error')
      }
    }
    xhr.open('POST', 'your.server.com')
    xhr.send()

This is how you perform the famous Ajax calls in JavaScript. 

Actually, [Ajax](https://en.wikipedia.org/wiki/Ajax_(programming)) itself stands for **A**synchronous **J**avaScript **a**nd **X**ML.


> **Note**: Sending HTTP requests (which is a common operation in web apps) is an asynchronous operation by nature since the request will take time to reach the server which will then send a response back to your client application. In this mean time, the application needs to respond to other actions and perform other tasks and only process the server response when it's received.

If you have ever extensively worked with callbacks, you'll notice one problem with them. They are difficult to track!

When you write complex applications you usually end up writing nested callbacks (callbacks inside callbacks) with multiple nesting levels. This is what's known as the [callback hell](https://stackoverflow.com/questions/25098066/what-is-callback-hell-and-how-and-why-rx-solves-it). 

Modern JavaScript introduced other approaches or abstractions to deal with asynchronous operations (without using too much callbacks) such as [Promises](https://www.techiediaries.com/javascript-promises-tutorial-example/) and [Async/Await](https://www.techiediaries.com/javascript-async-await-tutorial/).

Promises have been introduced in [ES6](https://www.ecma-international.org/ecma-262/6.0/) (JS 2015).

Async/await has been introduced in ES8 (JS 2017) and it's actually a syntactic sugar on top of Promises which helps developers write asynchronous code with Promises in a way that looks synchronous.

But Promises are actually similar to callbacks and have the same nesting problem at some degree.

Since developers are always looking for better solutions we now have Observables which use the [observer](https://en.wikipedia.org/wiki/Observer_pattern) software pattern.


> The observer pattern is a software design pattern in which an object, called the subject, maintains a list of its dependents, called observers, and notifies them automatically of any state changes, usually by calling one of their methods. [Observer pattern](https://en.wikipedia.org/wiki/Observer_pattern).

Observables are implemented in the [ReactiveX](http://reactivex.io/) project which has implementations in various languages. RxJS is the JavaScript implementation.


> **Note**: Observables are implemented in many other libraries such as [zen-observable](https://github.com/zenparsing/zen-observable) and [xstream](https://github.com/staltz/xstream) but RxJS Observables are the most popular in JavaScript.
> 
> Observables are not yet a builtin feature of JavaScript but there is a [proposal](https://tc39.github.io/proposal-observable/) to add them in EcmaScript. 




## RxJS Operators

RxJS provides the implemenation of Observable concept but also a variety of operators that allows you to compose Observables. 

Operators offer a declarative way to perform complex asynchronous operations with Observables.

An operator works on a source Observable by observing its emitted values and applying the intended transformation on them then return a new Observable with the modified values.

There many RxJS operators such as:


-  `tap()`, 
- `map()`, 
- `filter()`, 
- `concat()`, 
- `share()`,
- `retry()`, 
- `catchError()`, 
- `switchMap()`, 
- and `flatMap()` etc.


## Pipes: Combining Multiple Operators

RxJS provides two versions of the `pipe()` function: A standalone function and a method on the `Observable` interface.

You can use the `pipe()` function/method to combine multiple Operators. For example:


    import { filter, map } from 'rxjs/operators';
    const squareOf2 = of(1, 2, 3, 4, 5,6)
      .pipe(
        filter(num => num % 2 === 0),
        map(num => num * num)
      );
    squareOf2.subscribe( (num) => console.log(num));

The `of()` method will create and return an Observable from the `1, 2, 3, 4, 5,6` numbers and the `pipe()` method will apply the `filter()` and `map()` operators on each emitted value.



## Using the `map()` Operator

The `map()` operator is similar to the `Array.map()` method. It lets you map observable responses to other values. For example:



    import { Observable} from 'rxjs';
    import { map } from 'rxjs/operators';
    getItems(): Observable> {
      return this.aService.getItems().pipe(map(response => response.data));
    }


The `getItems()` method returns an Observable. We're using the `map()` operator to return the `data` property of the response object. 

The operator enables us to map the response of the Observable stream to the `data` value.

We import the pipeable operator `map()` from the `rxjs/operators` package and we use the `pipe()` method (which takes a variable number of pipeable operators) to wrap the operator.


## Using the `filter()` Operator

The `filter()` operator is similar to the `Array.filter()` method. It lets you filter the observable stream and returns another observable. For example:


    import { Observable} from 'rxjs';
    import { filter } from 'rxjs/operators';
    
    filter(): Observable<Array<any>> {
      
      return this.aService.getItems()
        .pipe(
          filter(response => response.code === 200));
    }

We use the  `filter()` operator to only emit a notification to observers of the observable stream when the status code of the HTTP response is 200.

Check out the second [part](https://www.techiediaries.com/observables-and-subjects-tutorial).

## Conlusion

In this tutorial, you have been introduced to reactive programming, data streams and RxJS 6.

You have learned that reactive programming is about coding with asynchronous data streams and that RxJS is the most popular implementation that implements Observables and the observer pattern.

   

You learned about RxJS operators which are methods that are used to compose Observables and work on their data streams.
 
 Finally, you learned that Angular 6 & 7 uses RxJS v6 for working with asynchronous operations and APIs (instead of callbacks or Promises) in many of its commonly used modules such as `HttpClient`, `Router` and `ReactiveForms`.  
