Toggle a Div on Button Click Angular Example
 By Hardik Savani |  January 3, 2020 |  Category : Angular


I am going to share a simple example of angular toggle show hide div on button click event. you can learn how to toggle elements in angular 8 application. i will give you normal example of toggle div on button click event using ngIf and hidden.

You can easily use show hide toggle div on click event in angular 6, angular 7, angular 8 and angular 9 application.

In this example, i will give you two example of angular toggle element on click. one if using *ngIf and another is using [hidden]. we will create buttons with two methods. When you click on that function we will set true and false value in variable. Using that variable we will hide show our div or element.

You can see both example, let's see how it works:

Example 1:

app.component.html

<h1>Toggle a Div on Button Click Angular Example - ItSolutionStuff.com</h1>
<button (click)=toggleDisplayDiv() >Toggle display Div</button>
<div [hidden]="isShowDiv">This is ItSolutionStuff.com Div.</div>
app.component.ts

import { Component } from '@angular/core';
  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'appComponent';
    
  isShowDiv = false;
   
  toggleDisplayDiv() {
    this.isShowDiv = !this.isShowDiv;
  }
}
Example 2:

app.component.html

<h1>Toggle a Div on Button Click Angular Example - ItSolutionStuff.com</h1>
<button (click)=toggleDisplayDivIf() >Toggle display Div If</button>
<div *ngIf="!isShowDivIf">This is ItSolutionStuff.com Div If.</div>
app.component.ts

Read Also: Call a Function on click Event in Angular 8
import { Component } from '@angular/core';
  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'appComponent';
    
  isShowDivIf = false;
  
  toggleDisplayDivIf() {
    this.isShowDivIf = !this.isShowDivIf;
  }
}
Preview:



I hope it can help you...