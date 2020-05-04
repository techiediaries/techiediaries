---
layout: post
title: "Building Modern Web Apps with Python, Django Rest Framework and Angular 4|5"
image: "images/content/django3.jpg"
excerpt: "In this tutorial we are going to learn how to get started building modern web applications with Python, Django and Django Rest Framework as the back-end stack and the new Google Framework, Angular 2+, to build JavaScript client side applications, as the front-end technology. We'll see how to integrate both frameworks in the development and the production environments and how to use the Angular HTTP module to make API calls or Ajax requests to our REST API back-end." 
tags : [django , angular , webpack ] 
---

**In this tutorial we are going to learn how to get started building modern web applications with Python, Django and Django Rest Framework as the back-end stack and the new Google Framework, Angular 4|5, to build JavaScript client side applications, as the front-end technology. We'll see how to integrate both frameworks in the development and the production environments and how to use the Angular HTTP module to make API calls or Ajax requests to our REST API back-end.**

**This tutorial is using the old Angular *HTTP* client for making HTTP calls. This module is deprecated in Angular 5 and will be replaced by the new Angular *HttpClient* module available in Angular 4.3+ which comes with many new features such as the HTTP interceptors. The two modules have the same API interface so you should be able to easily migrate to the new one. In future tutorials we will be using *HttpClient* so stay tuned!**

![](/images/content/django3.jpg)

The Angular CLI is a command line utility which allows you to quickly generate and build Angular 2+ apps without the hassle of WebPack configuration. The CLI takes care of the configuration and let you focus on build your next Angular app. It's a really great utility for bootstraping modern JavaScript SPA applications using Angular.

In this tutorial we are going to see how to serve and integrate an Angular 2+ web application (as a frontend) with a Django backend.

The communication between Django and Angular 2+ happens through a Restful API, so to test if our integration works, as expected, we need to have a REST API backend.

You can use any Rest API library for Django such as the powerful *Django Rest Framework (DRF)* or *Tastypie* to quickly build your API backend.

I have previously created an [API for a simple product manager app with Django and DRF](/tutorial-django-rest-framework-building-products-manager-api)
so I'm going to use it in this tutorial for the integration with the Angular 2+ front-end app. 

## Requirements

Before we can start building our demo app, there are some requirements that we need to install on our developmenet machine:

* Python
* *virtualenv* and *pip* package manager.
* Node.js and npm.

So make sure you install these requirements on your system before you can start.

Let's get started with a new Django project:

```bash
virtualenv myenv 
source myenv/bin/activate 
pip install django 
django-admin.py startproject django-ngx-demo 
```

This will create a virtual environment, activate it then install *Django* and start a new project.

Next let's generate a new Angular 2+ application inside a sub-folder of the Django project, using the Angular CLI.

First if you don't have Angular CLI installed, start by installing it from npm with:

```bash
npm install -g @angular/cli 
```

Then use the CLI to generate a new Angular 2+ app inside the Django project's root folder:

```bash
cd django-ngx-demo
ng new frontend 
```

This will navigate to the project's root folder then use `ng new` command to scaffold a new Angular project.

## The Development Setup

For development we can run two local servers without any problem, one for Django using the `manage.py runserver` command and the other one for Angular using the `ng serve` command.

Actually we have a small issue that we are going to solve in two ways, either by using the Angular CLI proxy or by installing a Django package. It's related to the cross origin policy: Since we are running two development servers with different ports, the same origin policy in web browsers will block any http requests coming from our front-end Angular app to the Django API back-end.

### Using the Webpack Proxy

You can simply create a `proxy.conf.json` configuration file then add:

```bash
{
    "/products": {
        "target": "http://localhost:8000",
        "secure": false
    }
}
```

Then change the `npm start` script (in `package.json`)to use a proxy with this configuration:

```json
"start": "ng serve --proxy-config proxy.conf.json",    
```

Now you need to use the following command to start your server (instead of `ng serve`):    


```bash
npm start 
```

You can read more information about [proxying support in webpack's dev server from this link](https://github.com/angular/angular-cli/wiki/stories-proxy).

If this somehow doesn't work for you! Let's try with a second solution. This time we'll be working with the back-end:

### Adding CORS Headers to The Django Back-end

If you send an API request from the Angular CLI server to the Django local server your browser will throw an error like this :

```
XMLHttpRequest cannot load http://localhost:8000/products. 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
Origin 'http://127.0.0.1:4200' is therefore not allowed access.
```

To get rid of this error you'll need to setup the *CORS* headers in your Django back-end.

Head back to your terminal or command prompt the install `django-cors-headers` using pip:

```bash
pip install django-cors-headers
```

Next, add the app to the installed apps in `settings.py`:

```python
INSTALLED_APPS = (
    #...
    'corsheaders',
    #...
)
```


Next, add the `corsheaders.middleware.CorsMiddleware` middleware: 

```python
MIDDLEWARE = [  
    #...
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    #...
]
```

Then set `CORS_ORIGIN_ALLOW_ALL` to *True* in `settings.py`:

```python
CORS_ORIGIN_ALLOW_ALL = True     
```

Now the *Same Origin Policy* won't block the requests since an allow all origin header is present on the http responce.

You can see all available options [from this link](https://github.com/ottoyiu/django-cors-headers) 

Next you can start both dev servers in different terminals and start testing.

If you are using the first approach, make sure to only use relative urls or otherwise use the second approach. 

Next let's send some requests to our Django API endpoints.

## Create the Django API Endpoints with Django Rest Framework

I have previously created a simple app with Django and Django Rest Framework for a products inventory manager so I'm going to use that for testing.

If you don't have an API yet, you can follow this [tutorial](/tutorial-django-rest-framework-building-products-manager-api) to quickly create one.  

In my case I have four endpoints 


* `/products`: for getting or creating products 
* `/transactions`: for getting or creating transactions 
* `/families`: for getting or creating families
* `/locations`: for getting or creating locations 

## Setting Up the Angular HTTP Module

Open the `frontend/src/app/app.module.ts` file then import the `HttpModule` module from `@angular/http` and add it to the *AppModule* imports.

```ts
    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { HttpModule } from '@angular/http';

    import { AppComponent } from './app.component';

    @NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule ,
        HttpModule //this is the HTTP module
    ],
    providers: [],
    bootstrap: [AppComponent]
    })
    export class AppModule { }
```

You are ready to use the HTTP module to send HTTP/Ajax requests to REST API servers.

## Sending Ajax Requests from the Angular App to the Django Back-end

Now let's see how we can use the HTTP module to make some API calls to our Django back-end:

Go ahead and open `frontend/src/app/app.component.ts` then add the following code:

```ts
    import { Component } from '@angular/core';
    import { Http, Response } from '@angular/http';
    import { Observable } from 'rxjs';
    import 'rxjs/add/operator/toPromise';

    @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
    })
    export class AppComponent {
    title = 'app';
    url : string = 'http://localhost:8000/products';


    constructor(private http : Http){}
    public getProducts(){

        this.http.get(this.url).toPromise().then((res)=>{
            console.log(res.json());
        });
        
    }
    }
```

We first start by the *Http* service from `@angular/http` and inject it in the component's constructor as *http*. We then add a new *getProducts()* method which sends a GET request to retrieve the products from the corresponding endpoint (`http://localhost:8000/products`).

The *getProducts()* method simply calls `this.http.get()` to send a GET request then converts the returned RxJS Observable to a promise with the *toPromise()* operator imported from RxJS. When the promise is resolved we simple log the response to the console after converting it to JSON.

The Angular HTTP methods return Observables by default. Just like Promises, observables are JavaScript abstractions to help developers work with asynchronous operations but they are a newer standard and have more features like multiple return values and concelation etc.   

In this tutorial, we are using the old Angular HTTP module which is now deprecated in Angular 5 but you should use the new Angular 4.3+ *HttpClient* which is a more powerful version that has the support for HTTP interceptors and other features.

Let's test our *getProducts()* method. Open the `frontend/src/app/app.component.html` file and add:

```html
<div style="text-align:center">
        <button (click)="getProducts()">Get /products </button> 
</div>
```

This will add a button and bind its *click* event to the *getProducts()* method.

P.S: If you get an error saying: 

```
ERROR TypeError: this.http.get(...).toPromise is not a function(…)
```

Just make sure to add this import:

```ts
    import 'rxjs/add/operator/toPromise';
```


Now you can test your API endpoint by clicking on the button. You should see the response with some data on the console.

If you have finished developing your application it's time for the production configuration where we are going to place both the Django and the Angular apps 
on the same domain.

## The Production Setup 

In production we shouldn't use two URLs or domains. Instead we have to build our Angular app then serve it through Django in order to get everything on the same domain.

### Building the Angular App 

You can build your Angular web app by running the following command:

```bash
npm run build 
```
This will output the production ready app in the `frontend/dist` folder.

### Configuring the Django staticfiles

Next let's configure the Django *staticfiles* to serve JavaScript and CSS from the `frontend/dist` folder.

Open your project `settings.py` then add:

```python

    ANGULAR_APP_DIR = os.path.join(BASE_DIR, 'frontend/dist')

    STATICFILES_DIRS = [
        os.path.join(ANGULAR_APP_DIR),
    ]   
```

Next set *STATIC_ROOT* to the folder where *collectstatic* will put the collected static files: 

```python

    STATIC_URL = '/static/'

    STATIC_ROOT = os.path.join(BASE_DIR, 'static')

```

Now *collectstatic* will be able to collect the static files from our frontend app correctly.

It's time to run *collectstatic* so open your terminal, navigate inside your project's root folder then run:

```bash
    python manage.py collectstatic
```

All your project static files will be placed inside the `static` folder and will be available from the `/static/` url 

### Serving the Angular App index.html File with Django

all the static files including `index.html` will be copied to the static folder so we need a way to serve the `index.html` file from the static folder when the user visits the main URL: `localhost:4000/`.

Luckily for us, Django provides a view function that uses the static folder as a templates folder: 

So in your project's `urls.py` file add this route:

```python

    from django.contrib.staticfiles.views import serve
    
    urlpatterns = [

        url(r'^$', serve,kwargs={'path': 'index.html'}),    
```


There is one another thing to do in order for our Angular app to be served correctly. Since the Angular app includes files from the root path, we need either to prefix them with `/static/` or better yet add a redirect url to Django URLs to redirect them to `/static/` whenever a request to a static file is made:


```html
<script type="text/javascript" src="inline.bundle.js"></script>
<script type="text/javascript" src="polyfills.bundle.js"></script>
<script type="text/javascript" src="styles.bundle.js"></script>
<script type="text/javascript" src="vendor.bundle.js"></script>
<script type="text/javascript" src="main.bundle.js"></script></body>
```

```python

    from django.views.generic import RedirectView
    from django.contrib.staticfiles.views import serve

    urlpatterns = [

        url(r'^$', serve,kwargs={'path': 'index.html'}),    
        url(r'^(?!/?static/)(?!/?media/)(?P<path>.*\..*)$',
        RedirectView.as_view(url='/static/%(path)s', permanent=False)),
        #...
    ]
```

## Conclusion 

So we have seen how to integrate and serve the Angular app (in the front-end) with Django in the back-end in both the development and the production environments.

We have also seen how to use the Angular CLI proxy to solve the issues related to *CORS* and the *Same Origin Policy* when using two different domains (or actually two ports) in the development phase.

