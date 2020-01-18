---
layout: post
title: 
date: 2020-01-18 06:03
category: 
author: 
tags: []
summary: 
---

How to Create Reusable Components in Angular 8?
 By Hardik Savani |  December 30, 2019 |  Category : Angular


Today, i will guide you creating reusable components in angular 8 application. i want to create very simple example of angular 8 create reusable component. i will create step by step reusable component in angular 8 so you will understand how it works.

Angular 8 provide to create your custom component. You can also create simple angular component using this link: How to create new component in angular 8?. But you want to create new component with reusable then how you will create it.

However, i will give you step by step very simple example of reusable component, so you will easily understand and got it how you can create more.

In this example, we will create post component. in that component we will simple display post object data. when you have array of post object then you for loop and use this component every where. so let's see this example step by step.



Step 1: Create App

In this step, we will create very simple example with simple component. so you need to run following command to install new angular app.

ng new appComponent
Step 2: Create Post Component

Here, we will create simple component using cli command. in component file we will write code as like bellow.

Let's run bellow command to create Post Component:

ng g component Post

Now you can see there is a created post/post.component.ts file. you can update like as bellow file:

src/app/post/post.component.ts

import { Component, OnInit, Input } from '@angular/core';
  
@Component({
  selector: 'my-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent{
  @Input() post;
}
Now you can update view file for post component:

src/app/post/post.component.html

<div>
    <p><strong>{{ post.id }}</strong>. {{ post.title }}</p>
</div>
Read Also: How to Create Custom Pipe in Angular 8?
Step 3: Update App Component

Here, we will update our app component file as like bellow:

src/app/app.component.ts

import { Component } from '@angular/core';
  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'appComponent';
  posts = [
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
Step 4: Reuse Post Component

Now we will simply for loop with our post component. You can also use on your entire application post component as like we are using now.

Let's update view file:

src/app/app.component.html

<h1>How to create reusable components in Angular 8 - ItSolutionStuff.com</h1>
   
<my-post *ngFor="let post of posts" [post]="post"></my-post>
Now you can run your application by using following command:

Read Also: How to Create Service in Angular 8 using cli?
ng serve

You can see layout as like bellow screen shot:



You can download code from git: 

I hope it can help you...

