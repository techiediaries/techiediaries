Template Driven Forms Validation in Angular 8 Example
 By Hardik Savani |  November 22, 2019 |  Category : Angular


Here is a angular 8 template driven form validation example. i would like to give you example of how to create template driven form in angular 8. i will give you simple example of template driven form validation in angular 8.

Angular 8 provide forms and they provide way to handle user input using ngModel, ngSubmit. Angular 8 provide Template-driven froms and using Template Driven Forms you can create very simple and basic level form.

If you have simple and basic form in your angular 8 application then i will prefer to use Template Driven Forms in angular. here i write simple example of Template Driven Forms with validation in angular 8.

You need to follow bellow step to create template driven form in angular 8.



Step 1: Install Angular App

Here, in this step you need to create new ng app for this demo. if you have already created then don't create new angular 8 app.

ng new my-new-app

Step 2: Import FormsModule

If you want to create form in angular app then you need to import FormsModule from @angular/forms library. so let's add following code to app.module.ts file.

src/app/app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
   
import { AppComponent } from './app.component';
   
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
Read Also: AngularJS - how to remove html tags using filter?
Step 3: Form with ngModel

In this step, we will write code of html form with ngModel. so add following code to app.component.html file.

I used bootstrap class on this form. if you want to add than then follow this link too: Install Boorstrap 4 to Angular 8.

src/app/app.component.html

<h1>Template Driven Forms Validation in Angular 8 Example - ItSolutionStuff.com</h1>
   
<form #contactForm="ngForm" (ngSubmit)="submit(contactForm.value)">
   
  <div class="form-group">
      <label for="firstName">First Name</label>
      <input required minlength="3" maxlength="10" ngModel name="firstName" type="text" #firstName="ngModel" class="form-control" id="firstName">
      <div class="alert alert-danger" *ngIf="firstName.touched && !firstName.valid">
          <div *ngIf="firstName.errors.required">First Name is required.</div>
          <div *ngIf="firstName.errors.minlength">First Name is minimum {{ firstName.errors.minlength.requiredLength }} character.</div>
          <div *ngIf="firstName.errors.maxlength">First Name is maximum 10 character.</div>
      </div>
  </div>
   
  <div class="form-group">
      <label for="lastName">Last Name</label>
      <input required ngModel name="lastName" type="text" #lastName="ngModel" class="form-control" id="lastName">
      <div class="alert alert-danger" *ngIf="lastName.touched && !lastName.valid">
          Last Name is required.
      </div>
  </div>
   
  <div class="form-group">
      <label for="comment">Comment</label>
      <textarea required ngModel #comment="ngModel" name="comment" id="comment" cols="30" rows="10" class="form-control"></textarea>
      <div class="alert alert-danger" *ngIf="comment.touched && !firstName.valid">
          Comment is required.
      </div>
  </div>
    
  <button class="btn btn-primary" type="submit" [class.disabled]="!contactForm.valid">Submit</button>
  
</form>
Step 4: updated Ts File

In ts file. we will write submit() and get all input fields values. so let's add following code to app.component.ts file.

src/app/app.component.ts

import { Component } from '@angular/core';
   
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  submit(form){
    var firstName = form.firstName;
    console.log(firstName);
  
    var lastName = form.lastName;
    console.log(lastName);
  
    var comment = form.comment;
    console.log(comment);
  }
  
}
Now you can run your application using following command:

Read Also: NgClass - How to Add Dynamic Class in Angular 8?
ng serve

Now you can see layout as like bellow screen shot:



I hope it can help you...

