---
layout: post
title: "Multiple Image/File Upload with Django, Ionic 4 and FormData"
image: "images/content/angular-by-example-httpclient-get.png"
excerpt: "In this tutorial, you'll learn to implement multiple file upload with Ionic 4, Django and FormData" 
tags : [ python , django , ionic, angular-9-httpclient-examples, angular-fullstack-examples, angular-9-formdata-examples ] 
author: omar
---

In this tutorial, you'll learn to implement multiple file upload with Ionic 4, Django and FormData.

In a [previous tutorial](https://www.techiediaries.com/django-rest-image-file-upload-tutorial/), we've created a django RESTful application for uploading files using Django REST framework and Ionic 4.

![Ionic 4 upload example](https://i.imgur.com/TW1UOOz.png)

Since the backend code will be the same as we only need an `/upload` endpoint that accepts POST requests we'll simply clone the previous and start our django REST API server using the following command:

```bash
$ cd ~/demos
$ mkdir ionic-file-upload
$ cd ionic-file-upload
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

 Your RESTful django server will be available from the `127.0.0.1:8000` address.

Here is some information about our restful server:

- It exposes an `/upload` endpoint which accepts POST requests for uploading files. 
- It has CORS enabled so you can send requests from different doamins without getting blocked by the **Same Origin Policy**.

## Prerequisites

This tutorial makes use of Ionic 4 with Angular and TypeScript so you need to the following prerequisites:

- Node.js and npm installed on your system. You can simply head to the official website and get the binaries for your operating system. 
- Working knowledge of TypeScript and Angular.


Now, let's get started!

## Installing Ionic CLI v4

Let's install Ionic CLI 4 which is required to generate Ionic 4 projects. Open a new terminal and run the following command:

```bash
$ npm install -g @ionic/cli
```

> **Note**: You many need to add `sudo` before your command in linux (debian-based) and macOS systems to install npm modules globally. Otherwise you simply to fix your [npm permissions](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally).  

## Generating your Ionic 4 Project

Next, you can generate a project based on Angular by running the following command:

```bash
$ ionic start
```

The CLI will interactively prompt you for some information about your project such as the **name** (Enter **fileuploadapp** or any name you choose) and the starter template (Select **blank** which will give you a starting project with a single page)

Next type **Enter**!

The CLI will start generating the files and installing the dependencies from npm. When prompted if you want to **Install the free Ionic Appflow SDK and connect your app? (Y/n)** Just type **n** for now.

## Importing `HttpClientModule`

We'll need to use `HttpClient` to send a POST for uploading files to the RESTful server so we need to import `HttpClientModule` in our application module. Open the `src/app/app.module.ts` file and the following changes:

```ts
// [...]
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [/* ... */, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
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

Open the `src/app/uploading.service.ts` and change the code accordingly:

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

You can access this page from `127.0.0.1:4200/upload`.

### Installing and Setting up `ng2-file-upload`

We'll make use of the `ng2-file-upload` package which provides some directives for handling file upload in Angular. First install the package from npm using the following command 

```bash
$ npm install --save ng2-file-upload
```

Next, you will need to import `FileUploadModule` in your page module. Open the `src/app/upload/upload.module.ts` file and the add these changes:

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

Open the `src/app/upload/upload.page.ts` file and add the following imports:

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

Next, inject `UploadingService`:

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

Next, open the `src/app/upload/upload.page.html` file and the following code:

{% raw %}

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
{% endraw %}

Next, open the `src/app/upload/upload.page.scss` file and add these styles:

```scss
.area {
    width: 95%;
    padding: 15px;
    margin: 15px;
    border: 1px solid #333;
    background: rgba(0,0,0,0.7);
}

#dropZone {
    border: 2px dashed #bbb;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    padding: 50px;
    text-align: center;
    font: 21pt bold arial;
    color: #bbb;
}

.drop-file-over{
  background: #333;
}
```

This is a screenshot of the page:

![Ionic 4 upload example](https://i.imgur.com/TW1UOOz.png)

Finally, start your development server using:

```bash
$ ionic serve
```

Head over to the `127.0.0.1:8100` address then select and drop some files and click on the **UPLOAD FILES** button:

![Ionic 4 file upload example](https://i.imgur.com/pb4jsBW.png)
