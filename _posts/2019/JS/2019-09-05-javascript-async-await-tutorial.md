---
layout: post
title: "JavaScript Async/Await with Angular 7/8 Observable and HTTP Example"
image: "images/content/angular.png"
excerpt: "In this tutorial, we'll learn about JavaScript/ES7 async and await keywords and we'll see how you can use them to write better asynchronous code in your Angular 7/8 apps with an example using HttpClient for sending HTTP requests and RxJS Observables." 
tags : [angular, angular8, javascript] 
---

In this tutorial, we'll learn about [JavaScript](https://www.techiediaries.com/javascript/)/ES7 async and await keywords and we'll see how you can use them to write better asynchronous code in your Angular 7/8 apps with an example using `HttpClient` for sending HTTP requests and RxJS Observables.

The async and await keywords are simply syntactic sugar over [JavaScript Promises](https://www.techiediaries.com/javascript-promises-tutorial-example/) and they make it one more step forward toward using fewer callbacks in your code.

According to [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function):

>An `async` function can contain an `await` expression that pauses the execution of the async function and waits for the passed Promise's resolution, and then resumes the `async` function's execution and evaluates as the resolved value.  
 > 
>Remember, the `await` keyword is only valid inside `async` functions. If you use it outside of an `async` function's body, you will get a `SyntaxError`.

A function that returns a Promise can be written using the async keyword and use the await keyword inside the body to wait for the asynchronous operation allowing you to write the asynchronous synchronously.

You don't need to provide callbacks or the `then()` method to run some code after the asynchronous operation is done since your code will wait until it the operation finishes before executing the next lines similar to synchronous code.

Let's see a simple plain JavaScript example before we see a more real-world example with Angular 8.

Let's take as example this promise:

```js
waitForOneSecond() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("I promise to return after one second!");
      }, 1000);
    });
  }
```

We can run the code inside the promise body using the following code:

```js
promiseMethod(){
    waitForOneSecond().then((value) => console.log(value));
}
```

Promises were created to make less use of callbacks but `then()` itself uses a callback function. This is fine for this simple example but can be problematic and error-prone for large amounts of code.

Let's now see how to use the async /await syntax to eliminate the use of the callback. Since the waitForOneSecond() method returns a promise, it can be awaited using the await keyword:

```js
async asyncMethod() {
const value = await waitForOneSecond();
console.log(value);
}
```

The values that we can get, when the promise is resolved or rejected, from the callback, passed to the `then()` method is now returned from the awaited method.


## Example with Angular 7/8 and HTTP

Now that we have the basic usage of the async/await syntax, let's see a simple real-world example using TypeScript and Angular.

In the previous [tutorial of JavaScript promises](https://www.techiediaries.com/javascript-promises-tutorial-example), we've seen an example that uses `HttpClient` to send an API request to a JSON endpoint.

We have set up HttClient in our example in the online Stackblitz IDE and defined a fetchData() method that calls the `get()` method for  fetching JSON data. This is our component:

```ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
  name = 'Angular';
  apiUrl = 'https://www.techiediaries.com/api/data.json';

  constructor(private httpClient: HttpClient){}

  ngOnInit(){
    this.fetchData();
  }

  private fetchData(){
    const promise = this.httpClient.get(this.apiUrl).toPromise();
    console.log(promise);  
    promise.then((data)=>{
      console.log("Promise resolved with: " + JSON.stringify(data));
    }).catch((error)=>{
      console.log("Promise rejected with " + JSON.stringify(error));
    });
  }
}
```
 
## How to await an Observable?
 
Angular APIs like HttpClient make use of RxJS Observables instead of promises to handle asynchronous operations so how we can await an Observable since the async/await syntax is designed for promises?

The RxJS Observable interface provides the `toPromise()` method that can be used to get a promise from the Observable.

## Using HttpClient with Promises using `toPromise`

RxJS provides the toPromise() operator which converts an Observable to a promise so you can work with the `HttpClient` methods using promises instead of Observables. We have previously seen that with an example:
   
```
  private fetchData(){
    const promise = this.httpClient.get(this.apiUrl).toPromise();
    console.log(promise);  
    promise.then((data)=>{
      console.log("Promise resolved with: " + JSON.stringify(data));
    }).catch((error)=>{
      console.log("Promise rejected with " + JSON.stringify(error));
    });
```

We call the `get()` method which returns an Observable but thanks to `toPromise()` we get a promise and we call the `then()` method to send the API request and provide a callback that displays date once it's fetched.
 
## HttpClient' Observable vs. Promise 

We can use either Observables or Promises to work with `HttpClient` or with any other API in Angular but it there any difference between except the set of features that comes with RxJS?
 
When working with an Observable, you would use the `subscribe()` method for getting data. When you subscribe, the callback that you provide to the `subscribe()` method will be executed once or multiple times whenever there is some new data. But when you convert the Observable to a promise, the callback provided to the `then()` method is executed one time no more. 
If you don't need to observe a source for a stream of data that comes in different points of time, you can use promises instead of Observables which need to be unsubscribed or otherwise will cause memory leaks and unexpected behaviors if not handled right.
 
## Using HttpClient with async/await:

Using the async/await syntax, you avoid subscribing and unsubscribing from Observables but also the `then()` callback of a promise which allows you to write better code that looks synchronous even when making asynchronous operations.
 
Let's convert the `fetchData()` of our previous example to use the async/await syntax:

```ts
  private async fetchData(){
    const data = await this.httpClient.get(this.apiUrl).toPromise();
    console.log("Data: " + JSON.stringify(data)); 
  }
```

See the example from this [link](https://stackblitz.com/edit/angular-http-async-await?file=src/app/app.component.ts)

## Conclusion

In this tutorial, we've learned about the JavaScript async/await keywords and seen an example Angular 7/8 example that demonstrates how to use HttpClient with promises and async/await and how to wait for an RxJS Observable.
 