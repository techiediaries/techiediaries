---
layout: post
title: "How to Post FormData to a Django 3 REST API Server and Upload Images with Angular 9/8"
image: "images/content/angular-by-example-httpclient-get.png"
excerpt: "In this tutorial, we'll learn to post FormData to a REST API built with Django 3" 
categories: angular
tags : [angular, angular-9] 
---


In this post, we will show you how to post FormData to a REST API, built with django 3, using Angular 9/8. 

This comes handly if you need to upload images or any multipart form data to a REST API server.


## Generate a Project with Angular 9/8 CLI


Before following this tutorial, you need to have an Angular 9/8 project. This can be generated using the `ng new <project-name>` command of Angular CLI. 

  
In this article, we'll see how to implement a simple example to upload image with FormData to a REST API server.

Let's start!


## Start a REST API Server

Since the backend code will be the same as we only need an  `/upload`  endpoint that accepts POST requests we'll simply clone the previous and start our django REST API server using the following command:

```bash
$ git clone https://github.com/techiediaries/django-rest-file-upload.git backend
```

Next, create and activate a virtual environment using the following commands:

```bash
$ cd backend
$ python3 -m venv .env
$ source .env/bin/activate

```

Next, install the Python packages used in the project:

```bash
$ pip install -r requirements.txt

```

You can then start the development server using:

```bash
$ python manage.py makemigrations
$ python manage.py migrate
$ python manage.py runserver
```


## Generating an Uploading Service

After creating the project, let's start our journey by creating a service that encapsulates the code for uploading files to the django server. In your terminal, navigate to your project's root folder and and generate the service using the following commands:

```bash
$ cd ./fileuploadapp
$ ionic generate service uploading

```

You will get the following output:

```bash
> ng generate service uploading
CREATE src/app/uploading.service.spec.ts (348 bytes)
CREATE src/app/uploading.service.ts (138 bytes)
[OK] Generated service!

```

Open the  `src/app/uploading.service.ts`  and change the code accordingly:

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadingService {

  DJANGO_API_SERVER: string = "http://localhost:8000";
  constructor(private http: HttpClient) { }

  public uploadFormData(formData) {
    return this.http.post<any>(`${this.DJANGO_API_SERVER}/upload/`, formData);
  }
}
```


Open the `src/app/app.component.html` file which contains the template of your app component and add the following markup:  

```html
<div class="float-label-control"> 
    <a class="btn btn-sm btn-primary" href="javascript:;">Upload Contract File
    <input class="uploadfile-style" [(ngModel)]="networkContract.FilePath" (change)="fileChange($event)" name="CContractorFPath" size="10" type="file">
    </a>
</div>
```

## Generating an Ionic Page

Let's now generate an Ionic page for adding the upload UI. In your terminal, run the following command:

```bash
$ ionic generate page upload

```

The output of this command will be:

```bash
> ng generate page upload
CREATE src/app/upload/upload.module.ts (543 bytes)
CREATE src/app/upload/upload.page.scss (0 bytes)
CREATE src/app/upload/upload.page.html (133 bytes)
CREATE src/app/upload/upload.page.spec.ts (691 bytes)
CREATE src/app/upload/upload.page.ts (256 bytes)
UPDATE src/app/app-routing.module.ts (451 bytes)
[OK] Generated page!

```

You can access this page from  `127.0.0.1:4200/upload`.

### Installing and Setting up  `ng2-file-upload`

We'll make use of the  `ng2-file-upload`  package which provides some directives for handling file upload in Angular. First install the package from npm using the following command

```bash
$ npm install --save ng2-file-upload

```

Next, you will need to import  `FileUploadModule`  in your page module. Open the  `src/app/upload/upload.module.ts`  file and the add these changes:

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UploadPage } from './upload.page';
import { FileUploadModule } from 'ng2-file-upload';

const routes: Routes = [
  {
    path: '',
    component: UploadPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    FileUploadModule
  ],
  declarations: [UploadPage]
})
export class UploadPageModule {}


```

Open the  `src/app/upload/upload.page.ts`  file and add the following imports:

```ts
// [...]
import { UploadingService } from  '../uploading.service';
import { FileUploader, FileLikeObject } from  'ng2-file-upload';
import { concat } from  'rxjs';

```

Next, define the following variables:

```ts
export class UploadPage implements OnInit {

  public fileUploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver: boolean = false;

```

Next, inject  `UploadingService`:

```ts
export class UploadPage implements OnInit {
  constructor(private uploadingService: UploadingService) { }

```

Next, add the following methods:

```ts
  fileOverBase(event): void {
    this.hasBaseDropZoneOver = event;
  }
  getFiles(): FileLikeObject[] {
    return this.fileUploader.queue.map((fileItem) => {
      return fileItem.file;

    });
  }
  uploadFiles() {

    let files = this.getFiles();
    let requests = [];

    files.forEach((file) => {
      let formData = new FormData();
      formData.append('file' , file.rawFile, file.name);
      requests.push(this.uploadingService.uploadFormData(formData));

    });

    concat(...requests).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {  
        console.log(err);
      }
    );
  }

```

Next, open the  `src/app/upload/upload.page.html`  file and the following code:

```html
<ion-header>
  <ion-toolbar color="primary">
    <ion-title>Upload Page</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content color="dark" padding>
  <div ng2FileDrop [ngClass]="{'drop-file-over': hasBaseDropZoneOver}" (fileOver)="fileOverBase($event)" [uploader]="fileUploader"
    class="area">
    <div id="dropZone">Drop files here</div>
  </div>


  <input type="file" accept="image/*" ng2FileSelect [uploader]="fileUploader" multiple />


  <ion-button (click)="uploadFiles()">Upload files</ion-button>

  <h2>Your files: {{ fileUploader?.queue?.length }}</h2>
  <ul>
    <li *ngFor="let item of fileUploader.queue">
      {{ item?.file?.name }}
    </li>
  </ul>

</ion-content>
```