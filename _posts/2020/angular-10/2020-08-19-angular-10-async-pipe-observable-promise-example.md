---
layout: bpost
title: "Angular 10 Async Pipe with Observable and Promise Examples"
image: "images/content/angular.png"
excerpt: "In this example, we'll learn how to use the Async Pipe with observables and promises in Angular 10 and previous versions"
date: 2020-08-19
tags : [angular]
---

In this example, we'll learn how to use the Async Pipe with observables and promises in Angular 10 and previous versions.

As a prerequisite, you need to have Angular CLI v10 installed on your development machine.

You can also use the online Stackblitz IDE if you don't have a development environment ready yet.

## Creating a New Angular 10 Project

Let's get started with a new project. Go to a new command-line interface and run the following command to create a new project:

```bash
$ ng new Angular10AsyncPipeExample 
```

The CLI will ask you a couple of questions — If  **Would you like to add Angular routing?**  Type  **y**  for Yes and  **Which stylesheet format would you like to use?**  Choose  **CSS**.

Next, go to you project’s folder and run the server using the following commands:

```bash
$ cd Angular10AsyncPipeExample
$ ng serve    
```

Use your web browser and visit the  `http://localhost:4200/`  address to see your app running.  

Open your web browser and navigate to the  `http://localhost:4200/`  address to see your app running.  

## What is Async Pipe in Angular?

Async is an Angular pipe is that's used to automatically subscribe and unsubscribe from an observable or promise (invokes the `then` method) in templates. When the associated component is destroyed, it automatically unsubscribes from observables to reduce memory leaks.

The Async Pipe is available on Angular 10 and previous versions of the framework.

## Angular 10 Async Pipe Example with Observable and Promise

Let's now see an example of using the async pipe with both an observable and promise.

Open the `src/app/app.component.ts` file and add the following imports:

```ts
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
```


Next, define two `asyncPromise` and `asyncObservable` variables as follows:

```ts
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  asyncPromise: Promise<string>;
  asyncObservable: Observable<string>;
  // [...]
}
```

`asyncPromise` is a promise that should return a string value and `asyncObservable` is an observable that should return string values.

Next, we define two methods for creating a promise from a string value and an observable from a string value as follows: 

```ts
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  asyncPromise: Promise<string>;
  asyncObservable: Observable<string>;

  // [...]

  makePromise(value: string): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(value), 3000);
    })
  }

  makeObservable(value: string): Observable<string> {
    return of(value).pipe(delay(3000));
  }

}
```

For the promise, we simply resolve with the string passed as a parameter to the component's method after three seconds have passed using the `setTimeout` method.

For the observable, we create an observable, that emits the string value passed as a parameter to the component's method after three seconds have passed, using the `of` and `delay` methods.

Finally, we call the `makePromise()` and `makeObservable()` methods and we assing the returned promise and observable to the `asyncPromise` and `asyncObservable` variables in the `ngOnInit` life-cycle method of the component as follows:

```ts
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  asyncPromise: Promise<string>;
  asyncObservable: Observable<string>;

  ngOnInit() {
  

    this.asyncPromise = this.makePromise('Async Promise');
    this.asyncObservable = this.makeObservable('Async Observable');
  }

  makePromise(value: string): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(value), 3000);
    })
  }

  makeObservable(value: string): Observable<string> {
    return of(value).pipe(delay(3000));
  }

}
```

Now that we have the promise and observable ready, we can use the async pipe in the component's template and subscribe to them.

Open the `src/app/app.component.html` file and update it as follows:

```html
<h1>
	Angular 10 Async Pipe with Observable and Promise Example
</h1>

<p>
	{{asyncPromise | async}}
</p>

<p>
	{{asyncObservable | async}}
</p>
```

The async pipe will call the then method of the promise and will subscribe and unsubscribe from the observable automatically.


This the Stackblitz live example:

<iframe src="https://stackblitz.com/edit/angular-10-async-pipe-promise-observable-example?file=src/app/app.component.html" name="Angular 10 Async Pipe with Observable and Promise Example" scrolling="No" height="500px" width="100%" style="border: none;"></iframe>

## Conclusion

We have seen how to use the async pipe with promises and observables in Angular 10 and previous versions.


