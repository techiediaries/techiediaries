---
layout: post
title: 
date: 2020-01-18 05:52
category: 
author: 
tags: []
summary: 
---

Angular Get Parameters from URL Route
 By Hardik Savani |  December 18, 2019 |  Category : Angular


Today, i want to show you how to get parameters from url in angular 8 application. you will understand to angular get parameter from url in component file. we can easily get parameters from url route in angular 6, angular 7, angular 8 and angular 9 application.

We can get route url parameters using ActivatedRoute. ActivatedRoute provide all details of request. we can easily get query string parameters and params value. so you can easily use with your component file.

I will give two way to get current url parameters in angular 8 application. so let's see both example and you can easily use it.



I will give you simple example, so you can see your route may be define like as bellow route code. You can see your code might be:

Route

import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

  

import { HomeComponent } from './home/home.component';

import { BlogComponent } from './blog/blog.component';

  

const routes: Routes = [

  {

      path: '',

      component: HomeComponent

  },

  {

    path: 'blog/:id',

    component: BlogComponent

  }

];

  

@NgModule({

  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]

})

export class AppRoutingModule { }

Example 1

You can see we can get parameters from url in angular on this way:

BlogComponent

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  
  constructor(private route: ActivatedRoute) { }
  
  ngOnInit() {
    let id = this.route.snapshot.params.id;
  
    console.log(id);
  }
  
}
URL:

http://localhost:4200/blog/2

Output:

2

Example 2

You can see we can get parameters from url in angular on this way:

BlogComponent

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  
  constructor(private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      var id = params.get('id');
      console.log(id);
    });
  }
  
}
URL:

http://localhost:4200/blog/2

Output:

Read Also: How to get Query String from url in Angular?
2

I hope it can help you...