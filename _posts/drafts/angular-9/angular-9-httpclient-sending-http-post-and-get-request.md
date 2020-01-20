---
layout: bpost
title: "Angular 8 HttpClient for Sending Http Request Example"
image: "images/content/angular.jpg"
excerpt: "In this post, we'll create a simple example with Angular 9/8 and HttpClient that sends Get and Post requests to fetch and post data from/to a backend server" 
skipRss: true
tags : [angular, angular-9-httpclient-examples] 
---

Today's topic is how to send http post request using HttpClient module in angular 8. i want to share with you examples of sending http request with HttpClient in angular 8 for post request, get request, put request, delete request. you will easily understand how you can send angular 8 httpclient get and post request example.

Every App must important to sending api request to another server. we can use http client request and get data and store data information to our server. as specially when you are working with angular, vue, react application. you must have to learn how to run http client request with angular 8.

Here, i will give you very simple example to get all data using api and store data using api. we will use jsonplaceholder api for testing now. so we don't require to create new api for it.

So, let's see bellow example step by step how to create http service and how to use it.

![](https://www.itsolutionstuff.com/upload/angular-8-httpclient-request.png)

**Step 1: Create New App**

You can easily create your angular app using bellow command:

ng new my-new-app

**Step 2: Import HttpClientModule**

In this step, we need to import HttpClientModule to app.module.ts file. so let's import it as like bellow:

src/app/app.module.ts

import  {  BrowserModule  }  from  '@angular/platform-browser';

import  {  NgModule  }  from  '@angular/core';

import  {  AppComponent  }  from  './app.component';

import  {  HttpClientModule  }  from  '@angular/common/http';

@NgModule({

 declarations:  [

  AppComponent

  ],

 imports:  [

  BrowserModule,

  HttpClientModule

  ],

 providers:  [],

 bootstrap:  [AppComponent]

})

export  class  AppModule  {  }

Read Also:  [How to Set Style Dynamically in Angular 8?](https://www.itsolutionstuff.com/post/how-to-set-style-dynamically-in-angular-8example.html)

**Step 3: Create Service for API**

Here, we need to create service for http client request. we will create service file and write client http request code. this service will use in our component file. So let's create service and put bellow code:

ng g s services/post

Now let's add code as like bellow:

src/app/services/post.service.ts

import  {  Injectable  }  from  '@angular/core';

import  {  HttpClient  }  from  '@angular/common/http';

@Injectable({

 providedIn:  'root'

})

export  class  PostService  {

  private url =  'http://jsonplaceholder.typicode.com/posts';

 constructor(private httpClient:  HttpClient)  {  }

 getPosts(){

  return  this.httpClient.get(this.url);

  }

 create(post){

  return  this.httpClient.post(this.url, JSON.stringify(post));

  }

}

**Step 4: Use Service to Component**

Now we have to use this services to our app component. So let's updated code as like bellow:

src/app/app.component.ts

import  {  Component,  OnInit  }  from  '@angular/core';

import  {  PostService  }  from  './services/post.service';

@Component({

 selector:  'app-root',

 templateUrl:  './app.component.html',

 styleUrls:  ['./app.component.css']

})

export  class  AppComponent  implements  OnInit  {

 posts;

 constructor(private service:PostService)  {}

 ngOnInit()  {

  this.service.getPosts()

  .subscribe(response =>  {

  this.posts = response;

  });

  }

 createPost(input:  HTMLInputElement){

  let post =  {title: input.value};

 input.value =  '';

  this.service.create(post)

  .subscribe((response:  { id })  =>  {

 post['id']  = response.id;

  this.posts.splice(0,0, post);

  });

  }

}

**Step 5: Updated View File**

Now here, we will updated our html file. let's put bellow code:

src/app/app.component.html

<h1>Angular 8 HttpClient for Sending Http Request Example - ItSolutionStuff.com</h1>

<input  

 (keyup.enter)="createPost(title)" #title

  type="text"  class="form-control">

<ul  class="list-group">

  <li  

 *ngFor="let post of posts"

  class="list-group-item">

 {{ post.title }}

  </li>

</ul>

Now we are ready to run our example, you can run by following command:

Read Also:  [Angular 8 Routing and Nested Routing Tutorial With Example](https://www.itsolutionstuff.com/post/angular-8-routing-and-nested-routing-tutorial-with-exampleexample.html)

ng serve

you will see layout as bellow:

![](https://www.itsolutionstuff.com/upload/angular-8-http-demo.png)

I hope it can help you...