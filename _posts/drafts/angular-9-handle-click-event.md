Call a Function on click Event in Angular 8


This article will provide example of how to call component function on button click event in angular 8 application. i want to show you angular 8 button click event and call a function example. it's very simple example of click event call function angular 8.

If you are new and very beginner with angular 8 application and if you are looking for simple example of button click event and call a component function then i will help you using bellow example.

In this example, we will create two functions, one is very simple and without any argument call clickFunction() and another we will call dynamic argument with jquery object call callFunction($event, post). one function will call alert and another will only print on console.

Let's see both example with output as bellow:



aap.component.html

<h1>Call a Function on click Event in Angular 8 - ItSolutionStuff.com</h1>
  
<button (click)="clickFunction()">Click Me</button>
  
<div *ngFor="let post of posts">
   <button (click)="callFunction($event, post)">{{ post.title }}</button>   
</div>
aap.component.ts

import { Component } from '@angular/core';
   
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'appNgContent';
    
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
    
  callFunction(event, post){
    console.log(post);
  }
   
  clickFunction() {
    alert("clicked me!");
  }
}
Output:

Read Also: How to Create Reusable Components in Angular 8?
{id: 2, title: "Angular 8 Routing and Nested Routing Tutorial With Example"}

Preview:



I hope it can help you...