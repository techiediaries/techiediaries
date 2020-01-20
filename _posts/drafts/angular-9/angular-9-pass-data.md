---
layout: post
title: 
date: 2020-01-18 06:01
category: 
author: 
tags: []
summary: 
---

Angular Pass Data to Component | Angular Input Component Example
 By Hardik Savani |  January 1, 2020 |  Category : Angular


There is a way to passing data into a component in angular app. we will use @Input() decorator to pass data in component angular. it's simple example of angular component input decorator.

We can use this example of pass data between components in angular 6, angular 7, angular 8 and angular 9 app.

using @Input() decorator we can set parameter as attribute in component tag and easily get value on our component file.

In this example, we will create post component as . we will add "title" as attribute to pass data into component. using input decorator we will get title variable value and print into html view file.

So, let's follow this example step by step and see how it works.



Step 1: Create New App

You can easily create your angular app using bellow command:

ng new appComponent

Step 2: Create New Component

Here, we will just create new post component and use input decorator. we also update view file.

ng g component post

Let's update code of post.component.ts file with using @Input decorate.

src/app/post/post.component.ts

import { Component, Input } from '@angular/core';
  
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent{
  @Input() title: string;
}
Now let's just update html view file. as bellow:

src/app/post/post.component.html

<p>{{ title }}</p>
Read Also: Reactive Form with Validation in Angular 8
Step 3: Use Component

Here, i will show you how to pass data using attribute and also using variable. so let's see that example:

src/app/app.component.ts

import { Component } from '@angular/core';
import { PostService } from './post.service';
  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Create Custom Pipe';
}
Now use can see how we can call using title variable and passing string:

src/app/app.component.html

<h1>Angular Pass Data to Component - ItSolutionStuff.com</h1>
  
<app-post title="Template Driven Forms Example"></app-post> 
  
<app-post title="Service with Httpclient Example"></app-post>
  
<app-post [title]="title"></app-post>
   
Now we are ready to run our example, you can run by following command:

Read Also: Angular Service with Httpclient Example
ng serve

you will see layout as bellow:



I hope it can help you...