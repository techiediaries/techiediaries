---
layout: bpost
title: "Angular 10 Observables and Promises with HTTP Example"
image: "images/content/angular.jpg"
excerpt: "In this tutorial we'll learn by example to use the RxJS Observables in Angular 10 for making HTTP requests" 
skipRss: true
tags : [angular] 
---

In this tutorial, we'll learn by example to use the RxJS Observables and promises in Angular 10 for making HTTP requests.

Angular 10 is the latest version of Angular at the time of this writing but the information here is valid for all previous versions.

## What's an Observable and how to Use it with Angular 10?

So what's an RxJS Observable?

An observable is an asynchronous data stream, you can see it as a collection of data in the future i.e the values of the collection may not be available at the moment when we create our observable. It makes, along with promises, the modern methods for asyncronous progamming in JavaScript.

Unlike promises, observables are not yet part of the native browser APIs but we need to use a library that implements them. The most famous library is RxJS which stands for Reactive eXtensions for JavaScript.

Angular 10 and previous versions already include RxJS by default so you don't need to manually install it in your project, you simply need to import the APIs and work with them.

Observables are extensively used in Angular APIs such as `HttpClient` and forms so in this tutorial we'll also see an example of sending HTTP requests.

According to [Angular docs](https://angular.io/guide/observables)

>Observables provide support for passing messages between publishers and subscribers in your application. Observables offer significant benefits over other techniques for event handling, asynchronous programming, and handling multiple values.


```ts
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular Observable Using RxJS';
 
  obs = new Observable((observer) => {
    console.log("Observable starts")
      observer.next("1")
      observer.next("2")
      observer.next("3")
      observer.next("4")
      observer.next("5")
  })
 
  data=[];
 
  ngOnInit() {
 
    this.obs.subscribe(
      val=> { console.log(val) },
      error => { console.log("error")},
      () => {console.log("Completed")}
    )
  }
}
```

## What's a Promise and How to Use it with Angular 10?

We have previous seen [what a promise is](https://www.techiediaries.com/javascript-promises-tutorial-example/) in a previous tutorial:

>In JavaScript, a promise is an API abstraction that allows you to handle asynchronous operations synchronously. Let's say, you want to work with some fetched data from a remote server. Since this is an asynchronous operation (i.e your code needs to wait for the server response before it can proceed with its execution), instead of waiting for the data to be fetched, we can create a promise that handles the situation and allow the app to continue running other operations. When data is fetched, the promise will know what to do with it. This is similar to callbacks but promises have a better API and features.

>we define a promise object, and its provides the surety that it will return something in the future. A promise object works only once. Either It will be succeeded or failed, but it won’t work twice.

Let's now see how to work with a promise and the http client in Angular 10.

Open the `src/app/app.module.ts` file and start by importing `HttpClientModule` as follows:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
```

Next, open the `src/app/app.component.ts` file and add the following code to make the HTTP GET request and process the response using the ES6 Promise in Angular:

```ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

class Post {
  constructor(
    public userId: number,
    public id: string,
    public title: string,
    public body: string
  ) { }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  serverURL = "https://jsonplaceholder.typicode.com/posts";
  posts = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.fetchPostsAsPromise();
  }

  fetchPostsAsPromise() {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get<Post[]>(this.serverURL)
        .toPromise()
        .then((response: any) => {
          this.posts = response.map((res: any) => {
            return new Post(
              res.userId,
              res.id,
              res.title,
              res.body
            );
          });
          resolve();
        },
          err => {
            reject(err);
          }
        );
    });
  }

}
```

>Set post API in an api: string variable and also declare data array. In data array we will render Promise response and display on the front-end.

>Next, we injected the HttpClient inside the constructor using the private property.

>Declare getPosts() custom function inside this function use Promise to fetch the posts data.

>We declared the promise instance in the Angular custom method with new keyword and passed the resolve and reject method in it.

>We set up the apiURL in the getPosts function and made the Http Get request followed by the toPromise() method. It converts basic observable to promise, we are getting the response and inserting inside the data array and then called the resolve() method. We also called the reject() method, and it will get the error object when the request gets failed.

>Finally, we invoked the this.getPosts() function in the ngOnInit() lifecycle hook and in next step we will display the data on the front-end.

Next, open the `src/app/app.component.html` file and update it as follows:

```html
<table>
    <thead>
        <tr>
            <th >#</th>
            <th >User ID</th>
            <th >Title</th>
            <th >Body</th>
        </tr>
    </thead>
    <tbody>
        <tr *ngFor="let post of posts">
            <th>{{ post.id }}</th>
            <td>{{ post.userId }}</td>
            <td>{{ post.title }}</td>
            <td>{{ post.body }}</td>
        </tr>
    </tbody>
</table>
```

- Observables are lazy since they require subscription to be invoked.
- Observables support multiple events while	a promise supports a single event.
- Observables are cancelable whreas a promise is not cancelable.