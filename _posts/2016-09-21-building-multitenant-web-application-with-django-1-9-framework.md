---
layout: post
title: Building Multi-Tenant Web Applications with Django 
image: "images/content/building-a-multitenant-web-application-with-Django-19-framework-part1/titleimage.png"
excerpt: "Throughout this tutorial(part 1 and 2) we are going to learn some concepts about multitenancy and then look on how to add multitenancy to our Django 1.9 web application"
categories: django-19-tutorials
tags : django 
---

![Building Multi-Tenant Web Applications with Django ](/images/content/building-a-multitenant-web-application-with-Django-19-framework-part1/bigimage.png)

In this tutorial we are going to build a multi tenant web application with Django. Multi tenancy is used mainly for SaaS (Software As a Service) products.

SaaS is a software delivery model used in the cloud where each customer gets only the service offered by a specific product not the product itself. 

The customer gets a relatively isolated environment for its data which other customers don't have access to.

Multitenancy can be achieved using 3 different techniques:

## Single Web Application Instance and Multiple Database

With this multitenancy technique, each customer gets his own database which offers the most secure environment for clients but it's also the most costly technique in term of server resources. 

## Single Web Application Instance and Multiple Schemas

With this multitenancy technique each client or tenant gets his own schema. Schemas are only available  with PostgreSQL database system.

## Single Web Application Instance, One database and Ane Schema

With this multitenancy technique, tenants share the same database and the same schema. The security and separation is handled only by application code. There is no real separation in client's data. This method is less secure but it takes less server resources.


## Multitenancy with Django and PostgreSQL

Each technique has its pros and cons. In this tutorial we are going to achieve multitenancy using the second approach (multiple schemas) thus we need to use the PostgreSQL database system - The framework we are going to use is Django.

We are not going to reinvent the wheel, Django has packages, provided by the great community, available for nearly any functionality you need to implement. The apps we are going to use in this tutorial are:

### Django multitenant schema 

This one is a great Django app for implementing the second multitenacy technique. It uses schemas feature available in the PostgreSQL database system.

### Django allauth 

For handling user login and registration. It has many features such as email verification, password reset and social login etc.

Now let's start developing our starter project which supports multitenancy, user login and registration.

## Installing Django and related packages

First of all we need to setup our working environement by simply creating a new virtual environment and installing Django and the necessary packages using `pip` from your terminal.

Please note that we are assuming you are using Ubuntu but don't worry if you are using another operating system it should be nearly the same steps since Python is a portable environment that works across major operating systems. 
     
So open your terminal and start typing the magic words:

	cd into_your_own_working_directory
	mkdir django_multitenancy_starter_project 
	cd django_multitenancy_starter_project

Now create a virtual env for this project:

	virtualenv myenv

Activate this env with:

	source myenv/bin/activate

Now install django with allauth and django-multitenant-schemas

	pip install django
	pip install django-allauth
	pip install django-multitenant-schemas

Next start your own Django project with:

	django-admin startproject .


## Conclusion

In this tutorial we have seen some important concepts about multitenancy and how to achieve it.W e have also installed our working environment. In the next part of this tutorial we are going to continue developing our Django project to add multitenancy using the `django-multitenant-schemas` pckage and then add user authentication using the `django-allauth` package.




