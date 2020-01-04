---
layout: post
title: "Building a CRUD Application with Django Rest Framework and Vue.js"
image: "images/content/django-vuejs.jpg"
excerpt: "In this tutorial, you will learn how to use Django and Vue.js to build a modern CRUD (Create, read, update and delete operations are essential for the majority of web applications) web application. You'll also learn how to integrate Django Rest Framework with Vue.js and how to make HTTP calls using **vue-resource** (you can also use **Axios** or the browser's **fetch** API)." 
tags : [django , vuejs, vue]
---

In this tutorial, you will learn how to use Django and Vue.js to build a modern CRUD (Create, read, update and delete operations are essential for the majority of web applications) web application. You'll also learn how to integrate Django Rest Framework with Vue.js and how to make HTTP calls using **vue-resource** (you can also use **Axios** or the browser's **fetch** API).

![Django + Vue.js](/images/content/django-vuejs.jpg)

In nutshell, Django is a back-end framework for building web applications with Python. Vue.js is a user interface library for creating JavaScript applications in the front-end. Django Rest Framework is a Django module to create Rest-based APIs that can be then consumed from browsers or mobile devices.

You can use any database management system such as MySQL or PostgreSQL etc. Since the Django ORM can abstracts away all the differences between database systems and let work with any database without writing new code. 

The integration part simply consists of using an HTTP client like Axios, vue-resource or even better the browser's fetch API to call APIs exposed by DRF from the Vue.js application. Both server and client applications are decoupled so you can swap any part with any other library in the future. You can also create mobile apps to consume your API without creating a new server or changing anything in the server side.

## Introduction to Vue.js   

Vue.js is a JavaScript library designed for building SPAs or single page web applications. It's a progressive JavaScript library that's primarily used for building user interfaces (like React). 

Vue.js works at the view layer of the MVC (Model-View-Controller) architecture so it has no no knowledge about any back-end technology and  therefore it can be integrated easily with any server-side framework. 

Vue.js has many modern features for creating modern view layers. Here is a list of features:

* Components
* Reactive programming
* Data binding
* Directives and filters
* Templates
* Event Handling etc.

You can find more information about Vue.js by visiting its [official website](https://vuejs.org/)
 
### How to use Vue.js?

You can integrate Vue.js into your project with different ways:

* you can use a CDN by including `<script>` tag in HTML file,
* you can install it via NPM,
* you can install using Bower,
* you can use the Vue CLI to scaffold your project.

For the sake of simplicity we are going to the `<script>` tag to include Vue.js in our Django project.

## Introduction to Django and Django Rest Framework

Django is a Python-based web framework, designed for developers with deadlines. Django uses a variation of the Model View Controller or the MVC architectural design pattern called MTV, an abbreviation for **M**odel, **T**emplate, **V**iew.

Getting started with Django is quite easy, first make sure you have python and pip (python package manager) installed. It's also preferred to use virtualenv to manage and isolate your development environments and also avoid conflicts between different versions of the same package.  

Head over to your terminal on Mac and Linux or command prompt on Windows then run the following commands:

```bash
virtualenv env
source env/bin/activate
pip install django
django-admin startproject django-vuejs-demo
cd django-vuejs-demo
python manage.py startapp demoapp

```

This will create a new virtual environment, activate it, install django framework, generate a new Django project then create a new app. Django apps are a way to organize a Django project into decoupled and reusable modules.

Next open `setting.py` in project's root folder then add your newly created app to `INSTALLED_APPS` array.

```python
INSTALLED_APPS = [
    #...
    'demoapp'
]
```   

One last step to properly set up the Django project: you need to migrate your database.

```python

python manage.py migrate
``` 

This will create a sqlite database file in your project's root folder and create Django tables. If you want to use another database system such as PostgreSQL, make sure to update your settings.

#### Django Rest Framework

The [official DRF website](http://www.django-rest-framework.org/) defines DRF as:
 


> Django REST framework is a powerful and flexible toolkit for building Web APIs.
> 
> Some reasons you might want to use REST framework:
> 
> The Web browsable API is a huge usability win for your developers.
> Authentication policies including packages for OAuth1a and OAuth2.
> Serialization that supports both ORM and non-ORM data sources.
> Customizable all the way down - just use regular function-based views if you don't need the more powerful features.
> Extensive documentation, and great community support.
> Used and trusted by internationally recognized companies including Mozilla, Red Hat, Heroku, and Eventbrite.
> 

You also need to install DRF and add it to your project's settings file:

```bash

pip install djangorestframework
pip install django-filter  # Filtering support
```

Then add `rest_framework` to `INSTALLED_APPS` array in `settings.py`.

```bash
INSTALLED_APPS = [
	#...
    'rest_framework',
    'rest_framework.authtoken',
    'django_filters',
    'demoapp'
]
```

## Create First Django View 

We don't need to create a separate view function or class-based view in `demoapp/views.py` but you can do it if you want. Since the view is used to only render the template we are going to use `TemplateView.as_view()` method and map the view directly to `^$`in `urls.py`

```python
from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic import TemplateView

urlpatterns = [
    url(r'^$', view=TemplateView.as_view(template_name='demoapp/home.html')),
    url(r'^admin/', admin.site.urls)
]
```

We open `urls.py` then we import `TemplateView` then create an URL mapping with the `template_name` set to `demoapp/index.html`

You can also create a view function in `demoapp/views.py`:

```python
from django.shortcuts import render
def home(request):
    return render(request, 'home.html')
```

then map it with:

```python
from django.conf.urls import url
from django.contrib import admin
from demoapp.views import home

urlpatterns = [
    url(r'^$', home, name='home'),
    url(r'^admin/', admin.site.urls)
]
```

Open `settings.py` then in `TEMPLATES` array add the following setting if it's not present

```python
 'DIRS': [os.path.join(BASE_DIR, "templates"),]
```

This tells Django where to look for templates.

Next you'll need to create a template file (`home.html`) in `demoapp/templates/demoapp` 

```html
<!DOCTYPE html>

<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Django Vue.js Demo</title>
</head>

<body>
   Hello Vue.js
</body>

</html>
```

You can start your development server to check if everything works as expected:

```bash
python manage.py runserver
```

Next open your browser and navigate to [http://localhost:8000/](http://localhost:8000/ ).

## How to Integrate Vue.js with Django Rest Framework?

You have two options to integrate Vue.js with Django Rest Framework:

* partially decoupled architecture (Jinja2's templates-based approach):  we use Django as we normally do i.e we process and serve the templates from the server, then we use Vue.js to display the template's context data. In this approach we don't have a really decoupled architecture between the client and the server. We actually have an API back-end, created with DRF that we can use with any other client but we still use Django to serve the templates and Vue.js code. 

* completely decoupled architecture:  we use Django and Vue.js as completely separated tiers. Django with DRF are used to build the API, handle the authentication and authorization then publicly expose the API endpoints to the Vue.js client. The client has its own structure with static HTML files, CSS and Vue.js code.

In both cases, we use DRF to build an API server then we consume the API from Vue.js application using HTTP clients such as **Axios**, **vue-resource** or the browser's **fetch** API.

## Adding Vue.js 

Let's use a Jinja2 template to serve a Vue.js application.

Open `home.html` then follow these steps:

Include Vue.js in the `<head>`:

```html
<script src="https://unpkg.com/vue"></script> 
```

The interpolation delimiters `{{` and `}}` are the same for Jinja2 templating system and Vue.js. Lucky for us, Vue.js provides a way to change them, so we'll be using `${` and `}$` 

Add this to `<body>`:

```html

<div id="app">
    <p> ${ message }$ </p>
</div>

<script>
new Vue({
  delimiters: ['${', '}$'],
  el: '#app',
  data: {
    message: 'Hello from Vue.js'
  }
})
</script>

```

That's it we have integrated Vue.js with Django. If you run your Django server and navigate to your app, you should see *Hell from Vue.js* message.


Now we need to create an API then consume data from our simple Vue.js application mounted from the `home.html` template.

## Setting up Vue-resource

First make sure to download and add [resource-vue.min.js](https://github.com/pagekit/vue-resource/blob/develop/dist/vue-resource.min.js) to your app static folder (`demoapp/static/demoapp`).
 
You can also use it from  a CDN

```html
<script src="https://cdn.jsdelivr.net/npm/vue-resource@1.3.4"></script>
```

The *vue-resource* plugin for Vue.js provides an HTTP services that allows you to make HTTP requests (also called API calls or AJAX requests) and process HTTP responses, using the browser's **XMLHttpRequest ** interface or **JSONP**.

* It supports latest modern browsers such as Firefox, Chrome and Safari
* It supports HTTP interceptors for requests and responses
* It can be used with Vue.js 1 and Vue.js 2
* It supports the Promise API

You can find more information frol the Github official repository for [resource-vue](https://github.com/pagekit/vue-resource).

Before you can use the HTTP service you need to sets it up:

```js
new Vue({

  http: {
    root: 'http://localhost:8000',
    headers: {
      Authorization: 'Basic YXBpOnBhc3N3b3Jk'
    }
  }

})
```  

All requests should be be relative to *root*.
 
Please note that **vue-resource** was retired but it's still used and developed as a separate project. If you want other alternatives you can use **Axios** HTTP client.

## Building an API with DRF

We are not going to reinvent the wheel here, instead we'll use a simple API that we have previously built  in this [tutorial](https://www.techiediaries.com/tutorial-django-rest-framework-building-products-manager-api/). It's a simple API for managing products inventories with four models: *Product, Family, Location  and Transaction* and four API endpoints */products, /families, /locations and /transactions*. So make sure to follow that tutorial for building this API if this is your first time working with **Django Rest Framework**.

## Sending API Calls from Vue.js with vue-resource

Sending an API call to Django Rest API server is easy. You simply use the injected `$http` service with an HTTP method: GET, POST, PUT or DELETE (CRUD operations)

Add a method to your Vue.js application that fetches the list of products 

```js
   new Vue({
        delimiters: ['${', '}$'],
        el: '#app',
        data: {
            products: []
            
        },
        http: {
            root: 'http://localhost:8000',
            headers: {
              Authorization: '<TOKEN_HERE>'
            }
        },
        methods: {
            getProducts: function () {
                this.$http.get('products/').then(function (data,status,request) {
                if (status == 200) {
                    this.products = data.body.results;
                 }   
                })
            }
        },
        mounted: function () {
            this.getProducts();
        }
    })
```
So we added a *products* variable in Vue.js *data* object to hold our fetched products then we declared a method *getProducts()* (in Vue.js *methods* object). In this method we use *this.$http.get()* to send a GET request to our DRF server then we assign the result to *this.products* array.

Next we call *getProducts()* method when the Vue.js application gets mounted.

Now let's see how we can add display these products in the HTML template.


```html
 <div id="app">
    <ul>
        <li v-for="product in products">
            <h1>${ product.title }$</h1>
            <p> ${ product.description }$ </p>
        </li>
    </ul>
</div>

``` 

So we use *v-for* for iterating through the products array then we use the custom interpolation delimiters to show product's title and description.  


## Conclusion

In this tutorial we have seen how to get started using the Django Rest API with Vue.js to build CRUD applications that consume an API from a Vue.js front-end using **vue-resource** plugin to send HTTP requests.



  