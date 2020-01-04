---
layout: post
title: "Django 3 Tutorial & Example [2020]: Build a CRUD REST API for A Simple CRM"
image: "images/content/learn-django.png"
excerpt: "A Complete step by step tutorial to learn Django from scratch" 
tags : [ python , django, mysql ]
date: 2020-1-3
next : /django-tutorial/introduction
---

Django 3 is released with full async support!

In this tutorial series, you'll learn about Django 3 by creating a CRUD example application with database, admin access, and REST API views. We'll be using MySQL as the database system.

Throughout this beginner's tutorial for Django 3, we are going to learn to build web applications with Python and Django. This tutorial assumes no prior experience with Django, so we'll be covering the basic concepts and elements of the Django framework by emphasizing essential theory with practice. 

Basically, we are going to learn Django fundamental concepts while building a simple CRM web application.

This tutorial doesn't only cover fundamental basics of Django but also advanced concepts such as how to use and integrate Django with modern front end frameworks like Angular 2+, Vue and React.

You'll learn about CRUD, database ORM, how to create API views and URLs.

## What's Django?

Django is an open source Python based web framework for building web applications quickly. 

- It's a pragmatic framework designed for developers working on projects with strict dead lines. 
- It's perfect for quickly creating prototypes and then continue building them after clients approval.
- It follows a Model View Controller (MVC) design pattern
- Django uses the Python language, a general purpose, powerful and feature-rich programming language.

## Django 3 Features

Django 3 comes with many new features such as:

- MariaDB support: Django now officially supports MariaDB 10.1+. You can use MariaDB via the MySQL backend,
- ASGI support for async programming,
- Django 3.0 provides support for running as an ASGI application, making Django fully async-capable
- Exclusion constraints on PostgreSQL: Django 3.0 adds a new ExclusionConstraint class which adds exclusion constraints on PostgreSQL, etc.

## What's MVC?

MVC is a software architectural design pattern which encourages the separation of concerns and effective collaboration between 
designers and developers when working on the same project. It basically divides or separates your app into three parts: 

- Model: responsible for data storage and management,
- View: responsible of representing and rendering the user interface or view,
- Controller: responsible for handling logic to control the user interface and work with data model.

Thanks to MVC, you as a developer can work in the model and controller parts without being concerned with the user interface (left to designers) so if anything changes on the side of designers on the user 
interface, you can rest assured that you will not be affected.

## Introduction to Python

Python is a general purpose programing language that's suitable for developing all kind of applications including 
web applications. Python is known by a clean syntax and a large standard library which contains a wide range of modules that can be used by developers to build their applications instead of reinventing the wheel.

Here is a list of features and characteristics of Python:

- Python is an Object Oriented Language just like Java or C++. Also like Java, Python is an interpreted language that runs on top of its own virtual machine which makes it a portable language that can runs across every machine and operating system such as Linux, Windows and MAC.

- Python is especially popular among the scientific community where it's used for creating numeric applications.

- Python is also known by the great performance of its runtime environment which makes it a good alternative to PHP for developing web applications.

For more information you can head to [http://python.org/](http://python.org/) where you can also download 
Python binaries for supported systems.

For Linux and MAC, Python is included by default so you don't have to install it. For Windows just head over to the official Python website and grab your installer. Just like any normal Windows program, the installation dead process is easy and straightforward.  

## Why Using Django?

Due to its popularity and large community, Python has numerous web frameworks among them Django. So what makes Django the right choice for you or your next project?

### Django is a batteries-included framework

Django includes a set of batteries that can be used to solve common web problems without reinventing the wheel such as:

- the sites framework, 
- the auth system, 
- forms generation,
- an ORM for abstracting database systems,
- and a very powerful templating engine,
- caching system,
- RSS generation framework etc.

### The Django ORM

Django has a powerful ORM (Object Relational Mapper) which allows developers to use Python OOP classes and methods instead of SQL tables and queries to work with SQL based databases. Thanks to the Django ORM,  developers can work with any database system such as MySQL or PostgresSQL without knowing anything about SQL. In the same time the ORM doesn't get in the way. You can write custom SQL anytime you want especially if you need to optimize the queries against your server database for increased performance.


### Support for Internationalization: i18n

You can use Django for writing web applications for other languages than English with a lot of ease thanks to its powerful support for internationalization or you can also create multi lingual websites  

### The Admin Interface 

Django is a very suitable framework for quickly building prototypes thanks to its auto-generated admin interface.

You can generate a full fledged admin application that can be used to do all sorts of CRUD operations against your database models you have registered with the admin module using a few lines of code. 


### Community and Extensive Documentation

Django has a great community that has contributed all sorts of awesome things to Django from tutorials and books 
to reusable open source packages that extend the core framework to include solutions for even more web development problems without reinventing the wheel or wasting time implementing what other developers have already created.

Django has also one of the most extensive and useful documentation on the web which can gets you up and running with Django in no time.

As a conclusion, if you are looking for a web framework full of features that makes building web applications fun and easy and that has all what you can expect from a modern framework. Django is the right choice 
for you if you are a Python developer.


- Python is a portable programming language that can be used anywhere its runtime environment is installed.

- Django is a Python framework which can be installed on any system which supports the Python language.

In this tutorial part, we are going to see how to install Python and Django on the major available operating systems i.e Windows, Linux and MAC.

At this point of our Django tutorial, we have covered what is Python, MVD and Django and the features of the Django. Let's now see how to install Python and a local development environment with pip and `venv`. 

## Installing Python

Depending on your operating system you may or may not need to install Python. In Linux and MAC OS Python is included by default. You may only need to update it if the installed version is outdated. 

## Installing Python On Windows

Python is not installed by default on Windows, so you'll need to grab the official installer from the official Python website at [http://www.python.org/download/](http://www.python.org/download/). Next launch the installer and follow the wizard to install Python just like any other Windows program.

Also make sure to add Python root folder to system *path* environment variable so you can execute the Python executable from any directory using the command prompt.

Next open a command prompt and type python. You should be presented with a Python Interactive Shell printing the current version of Python and prompting you to enter your Python commands (Python is an 
interpreted language)

## Installing Python on Linux

If you are using a Linux system, there is a great chance that you already have Python installed but you may have an old version. In this case you can very easily update it via your terminal depending on your 
Linux distribution.

For Debian based distributions, like Ubuntu you can use the *apt* package manager 

```bash
sudo apt-get install python
```

This will update your Python version to the latest available version.

For other Linux distributions you should look for equivalent commands to install or update Python which is not a daunting task if you already use a package manager to install packages for your system then you should 
follow the same process to install or update Python.

## Installing Python on MAC OS

Just like Linux, Python is included by default on MAC but in case you have an old version you should be able to update it by going to [http://www.python.org/download/mac/](http://www.python.org/download/mac/ and grab a Python installer for MAC.

Now if you managed to install or update Python on your own system or in case you have verified that you already have an updated version of Python installed on your system let's continue by installing Django.

## Installing PIP

PIP is a Python package manager which's used to install Python packages from [Python Package Index](http://pypi.python.org/)
which is more advanced than `easy_install` the default Python package manager that's installed by default when you install Python.

You should use PIP instaed of `easy_install` whenever you can but for installing PIP itself you should use `easy_install`. So let's first install PIP:

Open your terminal and enter:

```bash
$ sudo easy_install pip
```

You can now install Django on your system using pip 

```bash
$ sudo pip install django
```

While you can do this to install Django, globally on your system, it's strongly not recommend. Instead you need to use a virtual environement to install packages.


## Creating a MySQL Database

In this Django tutorial, we'll be using a MySQL database. In your terminal invoke the `mysql` client using the following command:

```bash
$ mysql -u root -p
```

Enter your MySQL password and hit **Enter**.

Next, run the following SQL statement to create a database:

```bash
mysql> create database crmdb;
```

## Django 3 Tutorial: Creating a Virtual Environment

Let's start our tutorial by creating a virtual environment. Open a new terminal, navigate to a working folder and run the following command:

```bash
$ cd ~/demos
$ python3 -m venv .env
``` 

Next, activate the virtual environment using the following command:

```bash
$ source .env/bin/activate
```

At this point of our tutorial, we've created a virtual environment for our Django project. Let's now proceed to creating our project.

## Django 3 Tutorial: Installing Django and Django REST Framework

Now, that you have created and activated your virtual environment, you can install your Python packages using `pip`. In your terminal where you have activated the virtual environment, run the following commands to install the necessary packages:

```bash
$ pip install django
$ pip install djangorestframework
```
You will also need to install the MySQL client for Python using `pip`:

```bash
$ pip install mysqlclient

```

## Django 3 Tutorial: Creating a Project

Now, let's proceed to creating our django project. In your terminal, run the following command:

```bash
$ django-admin startproject simplecrm
```

This command will take care of creating a bunch of necessary files for the project.

Executing the tree command in the root of our created project will show us the files that were created.

```bash
    .
    ├── simplecrm
    │   ├── __init__.py
    │   ├── settings.py
    │   ├── urls.py
    │   └── wsgi.py
    └── manage.py

```

`__init__` is the Python way to mark the containing folder as a Python package which means a Django project is a Python package.

`settings.py` is the project configuration file. You can use this file to specify every configuration option of your project such as the installed apps, site language and database options etc.

`urls.py` is a special Django file which maps all your web app urls to the views.

`wsgi.py` is necessary for starting a wsgi application server.

`manage.py` is another Django utility to manage the project including creating database and starting the local development server.

These are the basic files that you will find in every Django project. Now the next step is to set up and create the database.


Next, open the `settings.py` file and update the database setting to point to our `crmdb` database:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql', 
        'NAME': 'crmdb',
        'USER': 'root',
        'PASSWORD': 'YOUR_DB_PASSWORD',
        'HOST': 'localhost',   
        'PORT': '3306',
    }    
}
```

Next, add `rest_framework` to the `INSTALLED_APPS` array:

```python
INSTALLED_APPS = [
    # [...]
    'rest_framework'
]
``` 


Finally, migrate the database using the following commands:

```bash
$ cd simplecrm
$ python manage.py migrate
```

You will be able to access your database from the `127.0.0.1:8000` address.

## Django 3 Tutorial: Create an Admin User

Let's create an admin user using the following command:

```bash
$ python manage.py createsuperuser
```


## Django 3 Tutorial:  Creating an Application


Next, let's create a Django application for encapsulating our core CRM functionality. In your terminal, run the following command:

```bash
$ python manage.py startapp crmapp
```

Next, you need to add it in the `settings.py` file:

```python
INSTALLED_APPS = [
    # ...
    'rest_framework',
    'crmapp'
]
```

## Django 3 Tutorial: Creating the Database Models

Let's now proceed to create the database models for our application. We are going to create the following models:

- Contact
- Account
- Activity
- ContactStatus
- ContactSource
- ActivityStatus

We have three main models which are Contact, Account and Activity. The last three models are simply lookup tables (They can be replaced by an enum).

Open the `crmapp/models.py` file and the following code:

```python
from django.db import models
from django.contrib.auth.models import User

INDCHOICES = (
    ('FINANCE', 'FINANCE'),
    ('HEALTHCARE', 'HEALTHCARE'),
    ('INSURANCE', 'INSURANCE'),
    ('LEGAL', 'LEGAL'),
    ('MANUFACTURING', 'MANUFACTURING'),
    ('PUBLISHING', 'PUBLISHING'),
    ('REAL ESTATE', 'REAL ESTATE'),
    ('SOFTWARE', 'SOFTWARE'),
)

class Account(models.Model):
    name = models.CharField("Name of Account", "Name", max_length=64)
    email = models.EmailField(blank = True, null = True)
    phone = models.CharField(max_length=20, blank = True, null = True)
    industry = models.CharField("Industry Type", max_length=255, choices=INDCHOICES, blank=True, null=True)
    website = models.URLField("Website", blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    createdBy = models.ForeignKey(User, related_name='account_created_by', on_delete=models.CASCADE)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)
    isActive = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class ContactSource(models.Model):
    status = models.CharField("Contact Source", max_length=20)
    
    def __str__(self):
        return self.status

class ContactStatus(models.Model):
    status = models.CharField("Contact Status", max_length=20)
    
    def __str__(self):
        return self.status

class Contact(models.Model):
    first_name = models.CharField("First name", max_length=255, blank = True, null = True)
    last_name = models.CharField("Last name", max_length=255, blank = True, null = True)
    account = models.ForeignKey(Account, related_name='lead_account_contacts', on_delete=models.CASCADE, blank=True, null=True)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank = True, null = True)
    address = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    createdBy = models.ForeignKey(User, related_name='contact_created_by', on_delete=models.CASCADE)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)
    isActive = models.BooleanField(default=False)

    def __str__(self):
        return self.first_name

class ActivityStatus(models.Model):
    status = models.CharField("Activity Status", max_length=20)
    
    def __str__(self):
        return self.status
 
class Activity(models.Model):
    description = models.TextField(blank=True, null=True)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)
    contact = models.ForeignKey(Contact, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.description

```

## Django 3 Tutorial: Creating Model Serializers

After creating models we need to create the serializers. In the `crmapp` folder create a `serializers.py` file:

```bash
$ cd crmapp
$ touch serializers.py
```

Next, open the file and add the following imports:

```python
from rest_framework import serializers

from .models import Account, Activity, ActivityStatus, Contact, ContactSource, ContactStatus
```

Next, add a serializer class for each model:

```python
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = "__all__"

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = "__all__"

class ActivityStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityStatus
        fields = "__all__"

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = "__all__"

class ContactSourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSource
        fields = "__all__"

class ContactStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactStatus
        fields = "__all__"
```

## Django 3 Tutorial: Creating API Views

After creating the model serializers, let's now create the API views. Open the `crmapp/views.py` file and add the following imports:

```python
from rest_framework import generics
from .models import Account, Activity, ActivityStatus, Contact, ContactSource, ContactStatus
from .serializers import AccountSerializer, ActivitySerializer, ActivityStatusSerializer, ContactSerializer, ContactSourceSerializer, ContactStatusSerializer
```

Next, add the following views:

```python
from rest_framework import generics
from .models import Account, Activity, ActivityStatus, Contact, ContactSource, ContactStatus
from .serializers import AccountSerializer, ActivitySerializer, ActivityStatusSerializer, ContactSerializer, ContactSourceSerializer, ContactStatusSerializer

class AccountAPIView(generics.ListCreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

class ActivityAPIView(generics.ListCreateAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

class ActivityStatusAPIView(generics.ListCreateAPIView):
    queryset = ActivityStatus.objects.all()
    serializer_class = ActivitySerializer

class ContactAPIView(generics.ListCreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

class ContactStatusAPIView(generics.ListCreateAPIView):
    queryset = ContactStatus.objects.all()
    serializer_class = ContactSerializer

class ContactSourceAPIView(generics.ListCreateAPIView):
    queryset = ContactSource.objects.all()
    serializer_class = ContactSourceSerializer
```

After creating these models, you need to create migrations using the following command:

```bash
$ python manage.py makemigrations
```

Next, you need to migrate your database using the following command:

```bash
$ python manage.py migrate
```

## Creating API URLs

Let's now create the API URLs to access our API views. Open the `urls.py` file and add the following imports:

```python
from django.contrib import admin
from django.urls import path
from crmapp import views
```

Next, add the following content:

```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path(r'accounts', views.AccountAPIView.as_view(), name='account-list'),
    path(r'contacts', views.ContactAPIView.as_view(), name='contact-list'),
    path(r'activities', views.ActivityAPIView.as_view(), name='activity-list'),
    path(r'activitystatuses', views.ActivityStatusAPIView.as_view(), name='activity-status-list'),
    path(r'contactsources', views.ContactSourceAPIView.as_view(), name='contact-source-list'),
    path(r'contactstatuses', views.ContactStatusAPIView.as_view(), name='contact-status-list')
]
```

## Django Tutorial: Enabling CORS 

For development purposes, we'll need to enable CORS (Cross Origin Resource Sharing) in our Django application.

So start by installing `django-cors-headers` using `pip`

```python
$ pip install django-cors-headers
```

Next, you need to add it to your project  `settings.py`  file:

```python
INSTALLED_APPS = (
    ## [...]
    'corsheaders'
)
```

Next, you need to add  `corsheaders.middleware.CorsMiddleware`  middleware to the middleware classes in  `settings.py`

```python
MIDDLEWARE = (
    'corsheaders.middleware.CorsMiddleware',
    # [...]
)
```

You can then, either enable CORS for all domains by adding the following setting:

```python
CORS_ORIGIN_ALLOW_ALL = True
```

You can find more  [configuration options from the docs](https://github.com/ottoyiu/django-cors-headers/#configuration).

### Starting the local development server

Django has a local development server that can be used while developing your project. It's a simple and primitive server which's suitable only for development not for production.

To start the local server for your project, you can simply issue the following command inside your project root directory:

```bash
$ python manage.py runserver
```

Next navigate to the `http://localhost:8000/` address with a web browser.

You should see a web page with a message:

```
It worked!
```

## Conclusion 

To conclude this django 3 tutorial, let's summarize what we have done. We have created a new Django project, created and migrated a MySQL database, built a simple CRM REST API with Django REST framework and started a local development server.











 
