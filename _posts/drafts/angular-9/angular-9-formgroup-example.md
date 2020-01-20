FormGroup in Angular 8 Example Tutorial
 By Hardik Savani |  January 9, 2020 |  Category : Angular


In this tutorial, i would like to explain you how to use FormGroup with Reactive Form in Angular 8. i will give one example of formgroup in angular 8 app. i will show you angular 8 reactive forms formgroup example step by step.

Angular 8 FormGroup is very most important part of Reactive Form. FormGroup is one of the three fundamental building blocks used to define forms with FormControl and FormArray. You can create form with input field as FormControl and FormArray. FormGroup has several methods like setValue, removeControle, registerControl, setControl, reset etc. I will give you list at bottom of every methods.

You can see how to create simple formgroup in angular 8 application with formcontrol as like bellow:

form = new FormGroup({

    name: new FormControl('', [Validators.required, Validators.minLength(3)]),

    email: new FormControl('', [Validators.required, Validators.email]),

    body: new FormControl('', Validators.required)

});

As above you see how to create formgroup, now i will show you full example of how to create formgroup and how it works with html view file. I also add two buttons "Set Default Value" and "Reset Value". Using that buttons we will reset values and set default value using FormGroup.

So, let's see bellow example and you will understand how works FormGroup Elements.



Step 1: Install Angular App

Here, in this step you need to create new ng app for this demo. if you have already created then don't create new angular 8 app.

ng new myFormGroup

Step 2: Import FormsModule

If you want to create form in angular app then you need to import FormsModule from @angular/forms library. so let's add following code to app.module.ts file.

src/app/app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
   
import { AppComponent } from './app.component';
   
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
Read Also: How to Set Style Dynamically in Angular 8?
Step 3: updated Ts File

In ts file. we will write submit() and get all input fields values. so let's add following code to app.component.ts file.

src/app/app.component.ts

import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
    
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    body: new FormControl('', Validators.required)
  });
   
  get f(){
      return this.form.controls;
  }
   
  submit(){
      if(this.form.status === 'VALID'){
        console.log(this.form.value);
      }
  }
  
  setValue(){
      this.form.setValue({name: 'Hardik Savani', email: 'itsolutionstuff@gmail.com', body: 'This is testing from itsolutionstuff.com'});
  }
  
  resetValue(){
      this.form.reset({name: '', email: '', body: ''});
  }
    
}
Step 4: Form with ngModel

In this step, we will write code of html form with ngModel. so add following code to app.component.html file.

I used bootstrap class on this form. if you want to add than then follow this link too: Install Boorstrap 4 to Angular 8.

src/app/app.component.html

<h1>Angular 8 FormGroup Tutorial Example - ItSolutionStuff.com</h1>
  
<form [formGroup]="form" (ngSubmit)="submit()">
      
    <div class="form-group">
        <label for="name">Name</label>
        <input 
            formControlName="name"
            id="name" 
            type="text" 
            class="form-control">
        <div *ngIf="f.name.touched && f.name.invalid" class="alert alert-danger">
            <div *ngIf="f.name.errors.required">Name is required.</div>
            <div *ngIf="f.name.errors.minlength">Name should be 3 character.</div>
        </div>
    </div>
   
    <div class="form-group">
        <label for="email">Email</label>
        <input 
            formControlName="email"
            id="email" 
            type="text" 
            class="form-control">
        <div *ngIf="f.email.touched && f.email.invalid" class="alert alert-danger">
            <div *ngIf="f.email.errors.required">Email is required.</div>
            <div *ngIf="f.email.errors.email">Please, enter valid email address.</div>
        </div>
    </div>
   
    <div class="form-group">
        <label for="body">Body</label>
        <textarea 
            formControlName="body"
            id="body" 
            type="text" 
            class="form-control">
        </textarea>
        <div *ngIf="f.body.touched && f.body.invalid" class="alert alert-danger">
            <div *ngIf="f.body.errors.required">Body is required.</div>
        </div>
    </div>
  
    <button class="btn btn-info" type="button" (click)="setValue()">Set Default Value</button>
    <button class="btn btn-info" type="button" (click)="resetValue()">Reset Value</button>
    <button class="btn btn-primary" type="submit">Submit</button>
</form>
Now you can run your application using following command:

Read Also: How to Create Reusable Components in Angular 8?
ng serve

Now you can see layout as like bellow screen shot:



You can also see bellow listed methods:

controls
registerControl
addControl
removeControl
setControl
contains
setValue
patchValue
reset
getRawValue
There are also some inherited variable:

value
validator
status
valid
invalid
pending
disabled
enabled
errors
etc ...
I hope it can help you...