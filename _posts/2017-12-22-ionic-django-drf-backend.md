---
layout: post
title: "Create a Mobile Application with Ionic 3, Angular 5 and Django Rest Framework"
image: "images/content/django3.jpg"
excerpt: "In this tutorial, we are going to learn, step by step how to create a mobile application with an Ionic 3/Angular 5 front-end and a Python back-end. We'll be using Django and Django Rest Framework to build a simple REST API" 
tags : [django , ionic ]
---

**In this tutorial, we are going to learn, step by step how to create a mobile application with an Ionic 3/Angular 5 front-end and a Python back-end. We'll be using Django and Django Rest Framework to build a simple REST API.**

![](/images/content/django3.jpg)



The app we'll be creating is a simple product tracker that can be used to keep track of the quantities of the products you have in stock. You'll be able to create products, increment and decrement their quantities.

In nutshell, we need to:

* create the Django project 
* create the Django application 
* design and create the database model(s) 
* migrate the database 
* generate the admin web interface to create, read, update and delete the database records
* create a super user
* generate a browsable and documented REST API with Django Rest Framework
* generate the Ionic 3 project
* create an Angular 5 CRUD service to interface with the REST API
* create an Ionic page to create and update *products*
* create an Ionic page to read the *products*
* add a method to delete *products*


## Introduction to Django 

Django is a Python-based web framework that encourages rapid development. It's used by many web developers
create web applications using the Python language. Django has a plethora of features which makes it the most popular web framework among the Python community:

* Django has a clean and pragmatic design which can help you create complete prototypes in hours.
* Django packages or apps are very useful for code organization and reuse.
* You can either create your own apps or use community created apps to solve common web development problems without reinventing the wheel.
* You can quickly create APIs with powerful packages like Django Rest Framework and Tastypie.
* You can describe your domain models using a powerful ORM layer that saves you from dealing with SQL language.
* You can work and switch between different database relational management systems such as MySQL and PostgreSQL etc. without writing a single line of SQL.
* Django has a ready admin application than can be customized with your own Django models using a simple *.register()* method (You can use the admin app to generate a fully working CRUD application for your models).
* Django has a great and helpful community, a very good documentation and many tutorials on the web 
which can help you easily learn how to build your web application with Python.

## Introduction to Django Rest Framework (DRF) 

Django Rest Framework or DRF is a powerful Django application that allows you to build a full browsable 
and documented REST API from your database models. Thanks to DRF you can easily create an API to interface with multiple browser and mobile applications. 

>Django REST framework is a powerful and flexible toolkit for building Web APIs.
>Some reasons you might want to use REST framework:
>The Web browsable API is a huge usability win for your developers.
Authentication policies including optional packages for OAuth1a and OAuth2.
Serialization that supports both ORM and non-ORM data sources.
Customizable all the way down - just use regular function-based views if you don't need the more powerful features.
Extensive documentation, and great community support. --[Source](https://github.com/encode/django-rest-framework)

You can install *DRF* using pip with:

```bash
pip install djangorestframework
```

Next you'll need to add it to your `settings.py`:

```python
INSTALLED_APPS = (
    #...
    'rest_framework',
)
```

## Introduction to Ionic 

Ionic is a hybrid mobile framework to create cross platform mobile applications for Android, iOS and the Universal Windows Platform (UWP) using web technologies such as HTML, CSS and JavaScript (actually it's TypeScript and Angular). Ionic 3 (The latest version of Ionic when writing this tutorial) is based on Cordova and Angular 2+ (a client side framework for building Desktop and mobile front-end applications with TypeScript).


## Getting Started with Django

In order to be able to build web applications with Django, you'll need to have a development environment with  Python installed and optionally *virtualenv* which can be used to create isolated Pyhton environments for installing packages with different versions without any conflicts. You can install Python from the [official Python website](https://www.python.org/downloads/) where you can find Python binaries for major operating systems. 

![](https://screenshots.firefoxusercontent.com/images/31b51919-f07d-4d08-bea0-c2266cf6b3ba.png)

>virtualenv allows you to manage separate package installations for different projects. It essentially allows you to create a “virtual” isolated Python installation and install packages into that virtual installation. When you switch projects, you can simply create a new virtual environment and not have to worry about breaking the packages installed in the other environments. It is always recommended to use a virtualenv while developing Python applications.[Source](https://packaging.python.org/guides/installing-using-pip-and-virtualenv/).

You can follow this [guide to install virtualenv](https://virtualenv.pypa.io/en/stable/installation/).

Now if everything is ready head back to your terminal or command prompt then create a new virtual environment then activate it using the following commands:

```bash
virtualenv env 
source env/bin/activate 
```

Next you can install the latest version of Django using:

```bash
pip install django 
```

You can then generate a new Django project using:        

```bash
django-admin startproject producttracker 
```

Next, navigate inside your project's root folder then create an application with: 

```bash
cd producttracker
python manage.py startapp products 
```

Applications are used by Django to organize the project into reusable modules.

You'll need to open your project `settings.py` and then add the application to the array of the installed apps 

```python

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'products'
]
```

Next you can create the database and run a local development server:

```bash
python manage.py migrate 
python manage.py runserver 
```

A SQLite database file will be created in your project's root directory. You can change the database to any Django ORM supported RDBS such as *MySQL* or *PostgreSQ*L anytime but for now let's stick with *SQLite*.

A local server will be launched. You can visit your web application by navigating, with your web browser, to [http://localhost:8200](http://localhost:8200). 

## Project Requirements and Database Design  

Our simple stock tracker allows users to keep track of the products they have in stock. The user should be able to create products with an initial quantity then perform transactions to move products in and out of stock. Transactions are useful for keeping detailed information about stock movements. When a transaction is performed, the quantity of the associated product is either incremented (in) of decremented (out). 

Each product belongs to a family and has a location so we need to be able to keep track of each product's family and location in stock. 

So we can now design a simple database to meet these requirments. Open `products/models.py` file then add these the following models:


A product has many properties such as: the title, the description, the unit's price, the SKU or the Stock Keeping Unit, the barcode (ISBN, UPC etc.), the quantity and the minimal quantity.

```python

    # -*- coding: utf-8 -*-
    from __future__ import unicode_literals

    from django.db import models


    class Product(models.Model):

        sku = models.CharField(max_length=13,help_text="Enter Product Stock Keeping Unit")
        barcode = models.CharField(max_length=13,help_text="Enter Product Barcode (ISBN, UPC ...)")
        
        title = models.CharField(max_length=200, help_text="Enter Product Title")
        description = models.TextField(help_text="Enter Product Description")
        
        unitCost = models.FloatField(help_text="Enter Product Unit Cost")
        unit = models.CharField(max_length=10,help_text="Enter Product Unit ")
        
        quantity = models.FloatField(help_text="Enter Product Quantity")
        minQuantity = models.FloatField(help_text="Enter Product Min Quantity")
        
        family = models.ForeignKey('Family')
        location = models.ForeignKey('Location')
        
        def get_absolute_url(self):
            """
            Returns the url to access a particular instance of Product.
            """
            return reverse('product-detail-view', args=[str(self.id)])
        
        def __str__(self):
            
            return self.title
```

A family has a reference, a title and a description etc.


```python

    class Family(models.Model):

        reference = models.CharField(max_length=13, help_text="Enter family reference")
        title = models.CharField(max_length=200, help_text="Enter family title")
        description = models.TextField(help_text="Enter family description")
        unit = models.CharField(max_length=10,help_text="Enter family unit ")
        minq = models.FloatField(help_text="Enter family minimal quantity")
            
        def get_absolute_url(self):
            """
            Returns the url to access a particular instance of Family.
            """
            return reverse('family-detail-view', args=[str(self.id)])
        
        def __str__(self):
            
            return self.title
```


A location has a reference, a title and a description

```python

    class Location(models.Model):

        reference = models.CharField(max_length=20, help_text="Enter Location Reference")
        title = models.CharField(max_length=200, help_text="Enter Location Title")
        description = models.TextField(help_text="Enter Location Description")
            
        def get_absolute_url(self):
            """
            Returns the url to access a particular instance of Location.
            """
            return reverse('family-detail-view', args=[str(self.id)])
        
        def __str__(self):
        
            return self.title
```


A transaction has a date, a quantity, a cost and a reason (New Stock - Usable Return - Unusable Return) etc.


```python

    class Transaction(models.Model):

        sku = models.CharField(max_length=13,help_text="Enter SKU")
        barcode = models.CharField(max_length=13,help_text="Enter barcode (ISBN, UPC etc.)")
        comment = models.TextField(help_text="Enter a comment")
        cost = models.FloatField(help_text="Enter unit cost")
        quantity = models.FloatField(help_text="Enter quantity")
        product = models.ForeignKey('Product')
        date = models.DateField(null=True, blank=True)
        
        REASONS = (
            ('ns', 'New Stock'),
            ('ur', 'Usable Return'),
            ('nr', 'Unusable Return'),
        )


        reason = models.CharField(max_length=2, choices=REASONS, blank=True, default='ns', help_text='Reason for transaction')
            
        def get_absolute_url(self):
            """
            Returns the url to access a particular instance of transaction.
            """
            return reverse('transaction-detail-view', args=[str(self.id)])
        
        def __str__(self):
            
            return 'Transaction :  %d' % (self.id)
```

Now that we have defined our database models. Let's register them with the admin application. 

## Registering the Models with The Admin Application 

The Django admin can use your models to auto-create a web interface which allows you to add, read, update and delete records. In order to tell Django about our newly created models. Open the *products/admin.py* file then copy the following code to import and register the database models:

```python

    # -*- coding: utf-8 -*-
    from __future__ import unicode_literals

    from django.contrib import admin

    from .models import Product ,Family ,Location ,Transaction  

    admin.site.register(Product)
    admin.site.register(Family)
    admin.site.register(Location)
    admin.site.register(Transaction)
```

Now to access the admin web interface we need to create a super user so head back to your terminal and run the following command:

```bash
python manage.py createsuperuser 
```

Enter the credentials you want to use then hit *Enter*.

Next go to [http://localhost:8200/admin](http://localhost:8200/admin) then login with your credentials. You can now use the admin interface to create records for different models we created before.


Now that we have created the models and registered them with the admin application we can go ahead and create the REST API.








  


