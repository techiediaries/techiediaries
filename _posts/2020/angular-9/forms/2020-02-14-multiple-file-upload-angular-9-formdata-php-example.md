---
layout: post
title: "Multiple File Upload with Angular 9 FormData and PHP by Example"
image: "images/content/angular.png"
excerpt: "" 
categories: angular
date: 2020-02-14
tags : [angular, angular-9] 
---

In this tutorial, we'll learn by example how to implement Angular 9 multiple file upload with FormData and PHP. We'll also see an example of Angular Reactive forms for uploading multiple files.

## Multiple File Uploading with Angular 9 FormData and PHP

 
Uploading multiple files in Angular 9 is easy.

In this example, we'll show you how to create a form for sending multiple files in your Angular 9 application. 

We'll be using the reactive form/model based approach. 

For the server, we'll use a simple REST API for receiving the upload files and store them in a folder using php:

```php
<?php

 header("Access-Control-Allow-Origin: *");
 header("Access-Control-Allow-Methods: PUT, GET, POST");
 header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
 
 $uploadFolder =  "upload/";
 $files = $_FILES["file"]["name"];
 for  ($i =  0; $i < count($files); $i++)  {
    $filename=$files[$i];
    $ext =  end(explode(".", $filename));
    $original = pathinfo($filename, PATHINFO_FILENAME);
    $fileurl = $original .  "-"  . date("YmdHis")  .  "."  . $ext;
    move_uploaded_file($_FILES["file"]["tmp_name"][$i], $uploadFolder . $fileurl);
  }
?>
```

We'll implement a simple reactive form using `formGroup`. 

We'll listen for the input `onchange` event, and add the selected file to a list. Next, after a click on the submit button of the form. we'll send an Http post request using Angular 9 `HttpClient` to the php server for uploading the file(s).


## Step 1: Create an Angular 9 Project

Open your command-line interface and run the following command to initialize a new Angular 9 project:

```bash
$ ng new angular-9-upload-file-demo
```

Choose No for routing, and CSS for stylesheets format.

## Step 2: Import Angular `HttpClientModule`, `FormsModule` and `ReactiveFormsModule`

Next, we need to import `HttpClientModule`, `FormsModule` and `ReactiveFormsModule` in the `src/app/app.module.ts` file:

```ts
import  {  BrowserModule  }  from  '@angular/platform-browser';
import  {  NgModule  }  from  '@angular/core';
import  {  HttpClientModule  }  from  '@angular/common/http';
import  {  FormsModule,  ReactiveFormsModule  }  from  '@angular/forms';
import  {  AppComponent  }  from  './app.component';

@NgModule({
 declarations:  [
  AppComponent
  ],
 imports:  [
  BrowserModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule
  ],
 providers:  [],
 bootstrap:  [AppComponent]
})
export  class  AppModule  {  }
```

## Step 3: Create a Reactive Form

Let's now add a reactive form with an input element with the `file` type.

Open the `src/app/app.component.html`

```html
<h1>Angular 9 Multiple File Upload Example</h1>

<form [formGroup]="uploadForm" (ngSubmit)="submitForm()">

  <div  class="form-group">

  <label  for="name">Name</label>

  <input  

  formControlName="name"

  id="name"  

  type="text"  

  class="form-control">

  <div *ngIf="f.name.touched && f.name.invalid">

  <div *ngIf="f.name.errors.required">Filename is required</div>

  </div>

  </div>

  <div  class="form-group">

  <label  for="file">File</label>

  <input  

  formControlName="file"

  id="file"  

  type="file"  

  multiple

  class="form-control"

 (change)="onFileChange($event)">

  <div *ngIf="f.file.touched && f.file.invalid">
  <div *ngIf="f.file.errors.required">Choose a file</div>
  </div>
  </div>
  <button type="submit">Upload</button>

</form>
```

## Step 4: Implement the Angular Reactive Form Using `formGroup` and `formControl`

Now, let's implment the reactive form for uploading the selected files using `formGroup`and `formControl`.

Later, we'll be running the php script from `http://localhost:8000/upload.php` for receiving the upload files and save them in the server.

Open the `src/app/app.component.ts` file and update it as follows:

```
import  {  Component  }  from  '@angular/core';
import  {  HttpClient  }  from  '@angular/common/http';
import  {  FormGroup,  FormControl,  Validators}  from  '@angular/forms';

@Component({
 selector:  'app-root',
 templateUrl:  './app.component.html',
 styleUrls:  ['./app.component.css']
})
export  class  AppComponent  {
 URL= "http://localhost:8000/upload.php";
 files:string  []  =  [];
 uploadForm =  new  FormGroup({
    name:  new  FormControl('',  [Validators.required,  Validators.minLength(3)]),
    file:  new  FormControl('',  [Validators.required])
  });

 constructor(private httpClient:  HttpClient)  {  }

  get f(){
     return  this.uploadForm.controls;
  }

 onFileChange(event)  {
    for  (var i =  0; i <  event.target.files.length; i++)  {  
        this.files.push(event.target.files[i]);
    }
  }

 submitForm(){

  const formData =  new  FormData();
  for  (var i =  0; i <  this.myFiles.length; i++)  {  
      formData.append("file[]",  this.myFiles[i]);
  } 
  
  this.httpClient.post(this.URL, formData).subscribe(res =>  {
      console.log(res);
      alert('Files uploaded Successfully!');
  })
  }
}
```

Finally, start the Angular 9 development server using the following command:

```bash
ng serve
```

Next, start the PHP file uploading server using the following command:

```bash
php -S localhost:8000
```
