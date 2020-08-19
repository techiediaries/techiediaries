---
layout: bpost
title: "Angular 10 Async Await Example"
image: "images/content/angular.png"
excerpt: "In this example, we'll learn how to use Async/Await with Angular 10"
date: 2020-08-19
tags : [angular]
---

In this example, we'll learn how to use Async/Await with Angular 10 and previous versions.


As a prerequisite, you need to have Angular CLI v10 installed on your development machine.

You can also use the online Stackblitz IDE if you don't have a development environment ready yet.

## Creating a New Angular 10 Project

Let's get started with a new project. Go to a new command-line interface and run the following command to create a new project:

```bash
$ ng new Angular10AsyncAwait 
```

The CLI will ask you a couple of questions — If  **Would you like to add Angular routing?**  Type  **y**  for Yes and  **Which stylesheet format would you like to use?**  Choose  **CSS**.

Next, go to you project’s folder and run the server using the following commands:

```bash
$ cd Angular10AsyncAwait
$ ng serve    
```

Use your web browser and visit the  `http://localhost:4200/`  address to see your app running.  

Open your web browser and navigate to the  `http://localhost:4200/`  address to see your app running.  

## Async/Await by Example

Let's now see how to use Async/Await with Angular 10 by Example.

Head to the `src/app/app.module.ts` file and add `HttpClientModule` in the imports array as follows:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

@NgModule({
  imports:      [ BrowserModule, HttpClientModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```

Next, open the `src/app/app.component.ts` file and update it as follows:

```ts

import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, delay } from "rxjs/operators";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  private apiURL = "https://api.github.com/";
  public message: string = "Uninitialized";
  public response;

  constructor(private httpClient: HttpClient) {}

  async fetchData() {
    this.message = "Fetching..";
    this.response = "";
    this.response = await this.httpClient
      .get<any>(this.apiURL)
      .pipe(delay(1000))
      .toPromise();
    this.message = "Fetched";
  }
}
```

We first import and inject `HttpClient` service via the component's constructor. Next, we define three variables `apiURL`, `message` and `response`.

Next, we define the `fetchData()` method which sends the HTTP GET request to the API URL to fetch data. Since this is an asynchronous operation, the `HttpClient.get()` method returns an RxJS observable, and we need to use the `toPromise()` method to convert it to a Promise then we use the `await` keyword to wait for the promise to resolve or fail. We also define the `fetchData()` method as asynchronous using the `async` keyword so we can use the `await` keyword in the body of the method. 

This is how we use the `async/await` syntax with Angular HttpClient methods which return RxJS observables instead of promises. 

Since the `async/await` syntax can only be used with promises, we need to convert the observables to promises using the `toPromise()` method of the observable.


Next, open the `src/app/app.component.html` file and update it as follows:

```html
<div>
  Progress: {{ message }}
</div>
<div>
  Response:
  <pre>{{response | json}}</pre>
</div>
<button (click)="fetchData()"> Get </button>
```

We simply use string interpolation to display the message and response variables. We use the json pipe to convert the JSON object to a string. And we bind the `fetchData()` method to the `click` event of the button.

Finally this the Stackblitz live example:

<iframe src="https://stackblitz.com/edit/angular-10-async-await-example?embed=1&file=src/app/app.component.html" name="iFrame Name" scrolling="No" height="500px" width="100%" style="border: none;"></iframe>