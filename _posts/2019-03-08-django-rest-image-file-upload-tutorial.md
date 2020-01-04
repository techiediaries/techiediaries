---
layout: post
title: "Django REST Framework Image File Upload Tutorial & Example [FormData & Angular 7 UI]"
image: "images/content/angular-by-example-httpclient-get.png"
excerpt: "Throughout this tutorial, we'll see how you can implement file upload in Django and Django REST Framework with a step by step example. Our application will expose an /upload endpoint that accepts POST requests that contain the file posted with a multipart/form-data content type using FormData. For the frontend, we'll be using Angular 7 to create a simple interface that allows the user to select a file and upload it to the server via a POST request and FormData." 
tags : [ python , django , angular ] 
author: omar
---

Throughout this tutorial, we'll see how you can implement file upload in Django and Django REST Framework with a step by step example. Our application will expose an `/upload` endpoint that accepts POST requests that contain the file posted with a `multipart/form-data` content type using `FormData`. For the frontend, we'll be using Angular 7 to create a simple interface that allows the user to select a file and upload it to the server via a POST request and `FormData`.

These tutorials is divided in two parts: In the first part we'll create the Django application and make a REST API client to make sure it properly work. In the second part, we'll proceed to create a frontend with Angular 7.
 
Let's get started!

## Prerequisites

For this tutorial, you will need to have a few prerequisites such as:

- Python and pip installed on your system. We'll be using Python 3.7,
- Familiarity with Python and Django.
- Node.js and NPM installed on your system. These are required by Angular CLI.
- Familiarity with TypeScript. 

## Creating a Virtual Environment & Installing Django

If you have Python and `pip` installed on your system, let's get started by creating a new virtual environment for our project's dependencies. Open a new terminal, navigate to your working directory and run the following command:

```bash
$ cd ~/demos
$ python3.7 -m venv .env 
```

Next, activate your virtual environment using the following command:

```bash
$ source .env/bin/activate
```

Let's now install Django using `pip`. In your terminal run:

```bash
$ pip install django
```

As of this time, this command will install Django **2.1.7**.

## Creating a Django Project

Now, let's proceed to create a django project using the following command:

```bash
$ mkdir django-file-upload
$ django-admin startproject fileuploadexample .
```

### Installing Django REST Framework 

We'll be using Django REST framework for creating a REST API endpoint in our application:

```bash
$ pip install djangorestframework
```

Open the `fileuploadexample/settings.py` file and add  
`rest_framework` to the `INSTALLED_APPS` array:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework'
]
```

### Creating a Django Application

Next, let's create a django application using the following commands:

```bash
$ cd django-file-upload
$ python manage.py startapp uploadapp
```

Open the `fileuploadexample/settings.py` file and add  `uploadapp` to the `INSTALLED_APPS` array:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'uploadapp'
]
```

You also need to add the following settings to specify where the uploaded files will be saved and from which URL they can be served:

```python
MEDIA_URL =  '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, "media")
```

### Adding Database Model

Next, open the `uploadapp/models.py` file and add the following model:

```python
from django.db import models
from .models import File

class File(models.Model):
    file = models.FileField(blank=False, null=False)
    def __str__(self):
        return self.file.name
```

Our model has only one field name `file` of type `FileField`. You can also use `ImageField`

> **Note**: Please note that the files uploaded to `FileField` or `ImageField` are not saved  in the database but in the file system of your server. In the database it's the fields are represented by a `VARCHAR` containing the reference to the file.
>
> It's mandatory to `MEDIA_URL` and `MEDIA_ROOT` in your settings file.

See [How to use Django ImageField, and why use it at all?](https://stackoverflow.com/questions/37336559/how-to-use-django-imagefield-and-why-use-it-at-all)

### Adding the Model Serializer

Create a `serializers.py` file in `uploadapp` and add the following code:

```python
from rest_framework importserializers

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = "__all__"
``` 

### Adding the API View

Next, let's add the API view that will handle file uploading. Open the `uploadapp/views.py` file and add the following code:

```python
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .serializers import FileSerializer


class FileUploadView(APIView):
    parser_class = (FileUploadParser,)
    
    def post(self, request, *args, **kwargs):
      
      file_serializer = FileSerializer(data=request.data)

      if file_serializer.is_valid():
          file_serializer.save()
          return Response(file_serializer.data, status=status.HTTP_201_CREATED)
      else:
          return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

[FileUploadParser](https://www.django-rest-framework.org/api-guide/parsers/#fileuploadparser) parses raw file upload content. The `request.data` property will be a dictionary with a single key `file` containing the uploaded file.

### Adding the Upload URL

In `uploadapp` create an `urls.py` file and add the following code:

```python
from django.urls import path
from .views import *

urlpatterns = [
    path('', FileUploadView.as_view())
]
```

Next, you need to add the media URL and the `uploadapp` URLs in the `urls.py` file of the project:

```python
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('upload/', include('uploadapp.urls')),
]


if settings.DEBUG:
  urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

Using the `static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)` we can serve media files in development mode.

Next, migrate your database and run the development server using the following commands:

```bash
$ python manage.py migrate
$ python manage.py runserver
```

You django application will be running from the `http://127.0.0.1:8000/` address. If you visit the address with your web browser, you should see the following page:

![Django File Upload Example ](https://www.diigo.com/file/image/bbccosoazesrdcorpozdqqbredr/Django%3A+the+Web+framework+for+perfectionists+with+deadlines..jpg)


You can now test your file upload endpoint using a REST API client like Postman

 
 ![Django REST API File Upload](https://i.imgur.com/Y6JFNww.png)
 
>**Note**: Make sure to name the file field as `file`, which needs to match the name of the model field name. In our example it's `file`.

You can check if the `media` folder of your project contain the uploaded file and you can access your uploaded file from your browser by using appending the path retruned from in the response to the URL of your server i.e  `http://127.0.0.1:8000/media/925364568cc67bfb7978b8cc65f40125_OEn02GO` in our example.


## Enabling CORS

Since we are going to access our django API from the Angular frontend that will be served from the `127.0.0.1:4200` address we need to enable CORS in our django backend. In your terminal run the following command to install `django-cors-headers`:

```bash
$ pip install django-cors-headers
```

Next, in your settings file, add `corsheaders` to the `INSTALLED_APPS` array:

```python
INSTALLED_APPS = [
    # [...]
    'corsheaders',
    'rest_framework',
    'uploadapp'
]
```

You also need to add `corsheaders.middleware.CorsMiddleware` in the `MIDDLEWARE` array:

```python
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    # [...]
]
```

Next, add the following setting to enable CORS for all domains:

```python
CORS_ORIGIN_ALLOW_ALL =  True
```

Check more options from the [docs](https://github.com/ottoyiu/django-cors-headers/#configuration).

## Adding the Angular 7 Front-End

Now, let's create the Angular 7 frontend. Open a new terminal and run the following command to install Angular CLI v7 if it's not installed on your system:

```bash
$ npm install -g @angular/cli
```

Next, let's use the command line interface to generate an Angular 7 project:

```bash
$ cd django-file-upload
$ ng new frontend
```

You will be asked if you would like to add routing. Type **y**. And also which stylesheets format you would like to use, choose **CSS**. Next hit **Enter** and wait for the CLI to generate your project's files and install the packages from npm.

Next, you can serve your application using the following command:

```bash
$ cd frontend
$ ng serve
``` 

You can access your application from the `http://127.0.0.1:4200` address.

## Importing `HttpClientModule` and `ReactiveFormsModule`

We'll be working with `HttpClient` and reactive forms in our project so we need to import their modules in our application. Open the `src/app/app.module.ts` file and update it accordingly:

```ts
// [...]
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // [...]
    ReactiveFormsModule,
    HttpClientModule   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Create an Angular Service

Next, let's create a service that will encapsulate the code for uploading files to the django server. Open a new terminal and run the following command:

```bash
$ ng generate service upload
```

Open the `src/app/upload.service.ts` file and add the following code:

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  DJANGO_SERVER: string = "http://127.0.0.1:8000";
  constructor(private http: HttpClient) { }

  public upload(formData) {
    return this.http.post<any>(`${this.DJANGO_SERVER}/upload/`, formData);
  }
}
```

We first import `HttpClient` and we inject it via the service constructor. 

Next, we define an `upload()` method that takes an instance of `FormData` and send it to Django REST API endpoint with a POST request. 

## Create an Angular Component and Form

Next, let's create a component that contains the form to use selecting the file and submit it the django upload endpoint.

In your terminal, run the following command:

```bash
$ ng generate component profile
```

Next, open the `src/app/app-routing.module.ts` file and add a route for the profile component:

```ts
// [...]
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path: 'profile', component: ProfileComponent}
];

// [...]
```

Next, open the `src/app/profile/profile.component.ts` file and update it accordingly:

```ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  DJANGO_SERVER = 'http://127.0.0.1:8000'
  form: FormGroup;
  response;
  imageURL;

  constructor(private formBuilder: FormBuilder, private uploadService: UploadService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      profile: ['']
    });
  }

  onChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('profile').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.form.get('profile').value);

    this.uploadService.upload(formData).subscribe(
      (res) => {
        this.response = res;
        this.imageURL = `${this.DJANGO_SERVER}${res.file}`;
        console.log(res);
        console.log(this.imageURL);
      },
      (err) => {  
        console.log(err);
      }
    );
  }
}
```

We first create a reactive form with one `profile` field in the `ngOnInit()` method of the component. Next, we define the `onChange()` method which gets called when the user chooses a file in the `file` input interface. We simply set the selected file as a value of the profile field of the reactive form.

Finally, we define the `onSubmit()` method that gets called when we click on the submit button of the form.  In this method, we create a `FormData` object, we append the value of the `profile` field of the form to a `file` field (this needs to correspond to the name of the field that the django server expects) and we send the `FormData` object to the API server with a POST request.

Next, open the `src/app/profile.component.html` file and add the following code:

```html
<h1>Django REST API with Angular 7 File Upload Example</h1>
<div>
  <div *ngIf="response && imageURL">
    <img [src]='imageURL' />
  </div>

  <form [formGroup]="form" (ngSubmit)="onSubmit()">

    <input type="file" name="profile" (change)="onChange($event)" />
    <button type="submit">Upload Image File</button>

  </form>
</div>
```

This is a screenshot of the `/profile` page after we upload an image to the django server:

![Django REST API File Upload with Angular 7](https://i.imgur.com/kg8YApY.png)

## Conclusion

In this tutorial, we've seen how to build a full-stack example with Django and Angular 7 for uploading image files. In the backend, we used Django REST Framework, `FileUploadParser`and `FileField` and we also enabled CORS using `django-cors-headers`. In the frontend, we used `FormData` to create an object to correspond to a form with `multipart/form-data` type and `HttpClient` for sending POST requests to the backend.  
