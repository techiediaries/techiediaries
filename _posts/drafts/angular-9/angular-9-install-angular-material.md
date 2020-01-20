How to install material design in Angular 8?
 By Hardik Savani |  January 11, 2020 |  Category : Angular


In this tutorial, we will learn angular 8 install material design step by step. we can use material theme design in angular 8 application using ng add @angular/material command. we can easily install material design in angular 8 application.

we will create new angular 8 project using ng new command and then after we will install material design using ng add command. After that we will create very simple input form example with button.

So let's see bellow few step to install material design in angular 8 application.

Create New Project

Here, we will create new angular 8 project using following command:

ng new my-app

Install Material Design

Here, we will install material design in angular 8 application using ng add command. so let's run following command and install everything, you can also see bellow screenshot that asking you when you install material design.

ng add @angular/material


Use Material Design

Now we will create simple example of material design with input form so let's upload ts file and html file as like bellow:

src/app/app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
  
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
  
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
src/app/app.component.html

<h1>How to install material design in angular 8 - ItSolutionStuff.com</h1>
  
<form class="example-form">
  <mat-form-field class="example-full-width">
    <input matInput placeholder="Favorite food" value="Hardik">
  </mat-form-field>
  
  <mat-form-field class="example-full-width">
    <textarea matInput placeholder="Leave a comment"></textarea>
  </mat-form-field>
  
    <button mat-raised-button color="accent">Submit</button>
</form>
Now we are ready to run our app. so let's run app:

Read Also: How to install jquery in Angular 8?
ng serve

You can see layout as like bellow:



I hope it can help you...