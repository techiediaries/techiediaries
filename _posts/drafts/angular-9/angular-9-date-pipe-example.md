---
layout: post
title: 
date: 2020-01-18 05:50
category: 
author: 
tags: []
summary: 
---

Angular Change Date Format in Component Example
 By Hardik Savani |  December 7, 2019 |  Category : Angular


Today, i will give you simple example how to change date format in angular component. you can change date format in component file. you can use code with angular 6, angular 7, angular 8, angular 9 to change date format in component.

If you want to change date format with html component then you can easily change using predefine filter. it's very simple, but if you want to change date format in component ts file then how you can do this?, i have solution you can do it using predefine pipe, but i will give you simple demo how you can do it.

Let's see bellow example to made done this things.

You can change date format in html:

{{ date | date: 'dd-MM-yyyy'}}

Now i will give you example of how to change date format in angular component, let's see bellow component ts file code:

app.component.ts

import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  pipe = new DatePipe('en-US');
  now = Date.now();
    
  mySimpleFormat = this.pipe.transform(this.now, 'MM/dd/yyyy');
  myShortFormat = this.pipe.transform(this.now, 'short');
}
Now you can easily print with html file as like bellow:

app.component.html

<h1>Angular Change Date Format in Component Example - ItSolutionStuff.com</h1>
  
{{mySimpleFormat}}
{{myShortFormat}}
you can see bellow output:

Read Also: Angular Font Awesome - How to install font awesome in Angular 8?
12/07/2019

12/7/19, 8:15 PM

I hope it can help you...