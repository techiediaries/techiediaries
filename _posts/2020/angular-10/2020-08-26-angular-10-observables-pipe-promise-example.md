---
layout: bpost
title: "Angular 10 Observables With Pipe and Promise by Example"
image: "images/content/angular.png"
excerpt: "Observables are part of the RxJS library which Angular 10, and previous versions, uses for handling asynchronous operations like http requests"
date: 2020-08-26
tags : [angular]
---

Observables are part of the RxJS library which Angular 10, and previous versions, uses for handling asynchronous operations like http requests.

In this article, we'll learn: 

- what an observable is, 
- observables vs. promises, 
- how to convert an observable to a promise,
- how to subscribe, unsubscribe and resolve observables directly in Angular templates,
- how to use the pipe method of an observable with map and filter examples.

>**Note**: While in this article, we focus on observables in the context of Angular 10 and its previous versions, it can actually be used with any JavaScript/TypeScript library or framework or even with no frameworks at all. 

Observables are implemented in the RxJS library and you can simply import the library to start working with observables in your TypeScript code.

For Angular 10 and previous versions, RxJS is imported by default.
  
## What's an Angular Observable?

Let's get started by understanding an Angular observable.

You can think of an observable as a collection of data in the future i.e the data may not be available at the point when the observable is created. 

Think of an Angular http request, it's sent at some point but the response arrives at another point of time. the application doesn't hang and wait for the response instead if continues working and when the response is received it starts processing it.

Thanks to observables, the Angular application watches for the response and responds accordingly when it's received.

Angular makes huge use of observables for its APIs such as the http and forms module.

This is called asynchronous programming.   

## Angular Observables vs. Promises, What Differences?

Typically, In JavaScript and TypeScript asynchronous programming is achieved using callbacks and promises with promises being the modern approach so what's the difference(s) between a promise vs. an observable?

As defined before observables are streams of data which means you can execute the processing code or observer multiple times for the observed data but for a promise, the `then` method is executed only once. You can use both observables and promises in Angular 10 and any previous version of the framework.

When you subscribe for an observable in Angular 10, the code in the body of the `subscribe` method gets executed each time a new value is received until you unsubscribe from the observable using the `unsubscribe` method. 
    
## How to Convert an Observable to a Promise in Angular?

You can convert an observable to a promise using the `.toPromise()` method of the observable. For example, this is an Angular service that search for music in Apple iTunes using Angular HttpClient and promises: 
 
```typescript
@Injectable()
export class MyService {
  apiServer: string = 'https://itunes.apple.com/search';
  constructor(private httpClient: HttpClient) {
   
  }

  search(q: string) {
    let promise = new Promise((resolve, reject) => {
      let apiURL = `${this.apiServer}?term=${q}&media=music&limit=20`;
      this.httpClient.get(apiURL)
          .toPromise()
          .then(
              res => { // Success
                
                console.log(res.json().results);
                resolve();
              },
              msg => { // Error
                reject(msg);
              }
          );
    });
    return promise;
  }
}
```

Since the `get` method of `HttpClient` returns an observable, we use the `toPromise()` method to convert the observable to a promise.

Since you can convert an observable to a promise, you can make use of the `async/await` syntax in your Angular code.
  
## How to Subscribe to Observables in Angular Templates

Angular provides the `async` pipe that you can use to subscribe to observables and promises directly in your components' templates without the need to call the `subscribe()` method in the components' code. For example:

```html
<div *ngIf="sendHttpRequest$ | async as data">
	{{ data | json }}
</div>
```

The `sendHttpRequest$` observable will send an http request  thanks to Angular `AsyncPipe` and emit new data, which will be handled by Angular  JSON pipe and will insert it data into the DOM.

We subscribed to the `sendHttpRequest$` observable via Angular **AsyncPipe** which also takes care of unsubscribing when the component gets destroyed.

## Use the Pipe Method of an Observable 

Angular observables provide a `pipe()` method that you can use to combine multiple observables or operators such as map and filter. Operators are used to transform the observable data according to some criteria. This is an example of using the `pipe()` method in Angular:


```ts
returnNumbersObservable(): Observable<number> {
   return of(1, 2, 3, 4, 5, 6);
}
transformNumbers() {
  returnNumbersObservable().pipe(
    filter(n => n % 2 === 0),
    map(n => n * 2)
  )
  .subscribe(result => console.log(result));
} 
```


The output will be 4, 8, 12.
  
In the our code we use the `filter()` and `map()` operators in the `pipe()` method of the observable to transform the stream of numbers. 

The `filter()` and `map()` operators will run in the order they are added in the Observable `pipe()` method. On the `Observable`  returned by `returnNumbersObservable()`, The `filter` operator will be executed and on the `Observable` returned by `filter()`,  the `map()` operator will be executed and the final result returned by `pipe()` will be the result returned by last operator i.e. `map` in our example.

## Conclusion

In this article, we learned about Angular observables by example. We've seen what an observable is,  the differences between observables vs. promises, then we've seen how to convert an observable to a promise, how to subscribe, unsubscribe and resolve observables directly in Angular templates, and finally how to use the pipe method of an observable with `map()` and `filter()` examples.

