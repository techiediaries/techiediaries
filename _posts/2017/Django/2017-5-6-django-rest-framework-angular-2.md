---
layout: post
title: "Django REST framework (DRF) with Angular 4|5 Tutorial (Part 1)"
image: "images/content/drf-angular-2.png"
excerpt: "Django REST framework (DRF) and Angular 2+ tutorial (Part 1)" 
tags : "django"
---

{% include image.html 
    img="images/content/drf-angular-2.png" 
    title="Django REST framework (DRF) and Angular 2+ tutorial (Part 1)" 
%}


This is the first part of a tutorial series about getting started with [Django framework](https://www.djangoproject.com/) and Angular 4|5.

The final objective is to create a restful  web application which has two separate parts. The first part is the back end which is created 
with Django and the Django REST framework, the second part is the front end which is built using Angular 2+ framework.

<a href="/django-rest-framework-angular-2" target="_blank">Django REST framework (DRF) with Angular 2+ tutorial (Part 1)</a>

<a href="/django-rest-framework-angular-2-part-2" target="_blank">Django REST framework (DRF) with Angular 2+ tutorial (Part 2)</a>

<a href="/django-rest-framework-angular-2-part-3" target="_blank">Django REST framework (DRF) with Angular 2+ tutorial (Part 3)</a>


We are going to use Django <em>1.11</em>, Django REST framework <em>3.6.2</em> and Angular 2+.

Before starting, this tutorial has a bunch of development requirements:

<ul>
<li>You need to have Python installed and configured </li>
<li>PIP and Virtualenv installed </li>
<li>Node.js and Angular 2 CLI installed </li>
</ul>   

Objectives of the part 1
-----------------------------
-----------------------------

In the first part of these tutorial series, we are going to cover basic introductions to the two server side used frameworks
Django and DRF, and their initial setup.

<ul>
<li>
Getting started with Django and DRF.
</li>
<li>
The custom project anatomy and structure (front end and back end)
</li>
</ul>


Getting started with Django and DRF
-----------------------------------------
-----------------------------------------

Django is a web framework based on Python which allows developers to quickly prototype and build 
web applications. It has a powerful ORM that abstracts how you can interact with popular SQL based 
database systems such as MySQL and PostgreSQL. Django has also a powerful template engine with powerful
concepts such as tags and inheritance etc. Developers can also use built in and community provided packages 
to quickly solve common web development problems without reinventing the wheel.

Django was created many years ago to build traditional web sites or applications but since then, the web has 
evolved with other types of modern apps such as Rest based applications. These apps expose a set of Restful 
APIs that provide a standard way to interact or consume resources across different clients such as browsers 
and mobile phones etc. Thanks to Django and Django Rest Framework (DRF) you can build Restful APIs with 
a great ease using the  great features provided with Django and DRF such as, the great ORM, the browsable APIs, serialization, auth and permissions classes etc.

Unlike traditional web apps, REST based apps are composed of two major tiers, namely the server and the 
client parts. You can use Django ORM to build a sort of a database manager of your server machine without 
writing any SQL statements but only Python classes to create database tables and apply all sort of queries 
against your database. The next step is to use DRF to build the Rest API to expose your app data externally so 
other clients can consume it. The clients can be built using JavaScript and Ajax or using advanced frameworks 
such as Angular which we are going to use in this tutorial. You can also use other programming languages and 
tools to build API clients such as Java for Android apps or Swift for iOS apps etc.

Installing Django and Setting up a new project 
----------------------------
-----------------------------
-----------------------------

You can install Django and then generate a new project in a matter of a few commands so open your command 
line.

Start by creating a new virtual environment with:

        virtualenv myenv
        source myenv/bin/activate 

Then use PIP to install Django and DRF with:

        pip install django
        pip install djangorestframework

Now we can generate a new Django project using:

        django-admin startproject angular2drf

Django provides us with a simple directory or project structure 

    angular2drf/
    ├── angular2drf
    │   ├── __init__.py
    │   ├── settings.py
    │   ├── urls.py
    │   └── wsgi.py
    └── manage.py

Which is quite good for most cases but not for us since we have two tiers, the server and the 
client, so we need to customize it to meet our requirements.

So create two folders inside the project directory, for client and server

    mkdir client 
    mkdir server

Then move all files to server, you should get a structure similar to:

    angular2drf/
    ├── client
    └── server
        ├── angular2drf
        │   ├── __init__.py
        │   ├── settings.py
        │   └── wsgi.py
        ├── __init__.py
        ├── manage.py
        └── urls.py        

Also add an `__init__.py` file inside the server folder to make it a Python module.

You can also change angular2drf name to something more meaningfull like config but you need to make some 
changes:

First rename angular2drf to config.

Then open server/manage.py then change the 6th line to 

    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

Next open  server/config/settings.py and change 

    ROOT_URLCONF = 'angular2drf.urls'
    to
    ROOT_URLCONF = 'config.urls'


    WSGI_APPLICATION = 'angular2drf.wsgi.application'

    to 

    WSGI_APPLICATION = 'config.wsgi.application'


Next open server/config/wsgi.py and change 

    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "angular2drf.settings")
    to
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")


If there is no error, you should be able to migrate your db and run the server without any problems 

    python server/manage.py migrate 
    python server/manage.py runserver


    Performing system checks...

    System check identified no issues (0 silenced).
    May 05, 2017 - 23:25:52
    Django version 1.11, using settings 'config.settings'
    Starting development server at http://127.0.0.1:8000/
    Quit the server with CONTROL-C.     



Conclusion 
-------------
-------------

So that is all for this part, in the next part we are going to continue with our tutorial. Basically we 
are going to see how to create database models, configure DRF and create our Restful APIs.