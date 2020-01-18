How to use Datepicker in Angular 8?
 By Hardik Savani |  January 13, 2020 |  Category : Angular


In this example, i will explain you angular 8 material datepicker example. you can see how to use material datepicker in angular 8. you can easily add datepicker in angular 8 application.

Datepicker is a primary requirement of project. we almost require to use datepicker in angular 8 app. angular 8 provide material design and they provide how to use datepicker in angular 8 application. i will show you here step by step how you can use material datepicker in angular 8.

In this example, we will add material design theme and then import some dependency module of datepicker. then we will simply write code of datepicker from angular document.

So, let's see bellow example from scratch:



Step 1: Create New App

You can easily create your angular app using bellow command:

ng new myDatepicker

Step 2: Add Material Design

Now in this step, we need to just install material design theme in our angular 8 application. so let's add as like bellow:

ng add @angular/material
Cmd like bellow:

Installing packages for tooling via npm.

Installed packages for tooling via npm.

? Choose a prebuilt theme name, or "custom" for a custom theme: Indigo/Pink     

   [ Preview: https://material.angular.io?theme=indigo-pink ]

? Set up HammerJS for gesture recognition? Yes

? Set up browser animations for Angular Material? Yes

Read Also: How to Add Bootstrap in Angular 8 | Install Bootstrap 4 in Angular 8
Step 3: Import Module

In third step, we need to import some dependency like MatDatepickerModule, MatNativeDateModule, MatInputModule. so let's add.

src/app/app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
   
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';
   
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
Step 4: Use Datepicker

Now in view file, we will write code of input element with datepicker as like bellow:

src/app/app.component.html

<h1>How to install material design in angular 8 - ItSolutionStuff.com</h1>
  
<mat-form-field>
  <input matInput [matDatepicker]="picker" placeholder="Choose a date">
  <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
</mat-form-field>
Now we are ready to run our example, you can run by following command:

Read Also: How to install material design in Angular 8?
ng serve

you will see layout as bellow:



I hope it can help you...

