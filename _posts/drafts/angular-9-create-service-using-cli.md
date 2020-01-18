---
layout: How to Create Service in Angular 8 using cli?
 By Hardik Savani |  December 30, 2019 |  Category : Angular


i would like to share with you simple example of how to create service in angular 8 app. i will have command to create service in angular 8. we can easily create service in angular using command. using angular 8 command we can create service file and class.

There are set of commands provided by angular 8 application. one from there, we will use that command to creating service in angular 8 application.

As we know, service class will help to getting data using api. in angular service we call api and get data from that api. service will easy to available for getting data on angular application. Right now i will give you very simple example without any api, but if you want to know how works service with api then you can follow this tutorial: Angular 8 HttpClient with service example.

Let's see simple example of creating service:



Create Service

Here, we will create simple service using cli command. in service file we will create getPosts() and we will return array.

Let's run bellow command to create Post Service:

ng g service Post

Now you can see there is a created post.service.ts file. you can update like as bellow file:

src/app/post.service.ts

import { Injectable } from '@angular/core';
  
@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  constructor() { }
  
  getPosts(){
    return [
      {
        id: 1,
        title: 'Angular Http Post Request Example'
      },
      {
        id: 2,
        title: 'Angular 8 Routing and Nested Routing Tutorial With Example'
      },
      {
        id: 3,
        title: 'How to Create Custom Validators in Angular 8?'
      },
      {
        id: 4,
        title: 'How to Create New Component in Angular 8?'
      }
    ];
  }
}
Use Service in Component

Here, we will just use that service in our component file and assign to post variable. So let's updated following file:

src/app/app.component.ts

import { Component } from '@angular/core';
import { PostService } from './post.service';
  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'appNewService';
  posts = [];
  
  constructor(private postService: PostService){
    this.posts = postService.getPosts();
  }
}
View File

Now we will display our data in view file like as bellow:

src/app/app.component.html

<h1>How to create service in angular 8 using cli - ItSolutionStuff.com</h1>
<ul>
  <li *ngFor="let post of posts">
    <strong>{{ post.id }})</strong>{{ post.title }}
  </li>
</ul>
Now you can run your application by using following command:

Read Also: Angular 8 HttpClient for Sending Http Request Example
ng serve

You can see layout as like bellow screen shot:



I hope it can help you...
title: 
date: 2020-01-18 06:05
category: 
author: 
tags: []
summary: 
---

