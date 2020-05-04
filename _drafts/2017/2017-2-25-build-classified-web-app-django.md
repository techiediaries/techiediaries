---
layout: post
title: "How to build a classified web app with Django "
image: "images/content/build-classified-web-app-django.png"
excerpt: "In this tutorial you will learn how to build a classified web application with Python and Django framework "
categories : python
tags : [django]
---
{% include image.html 
    img="images/content/build-classified-web-app-django.png" 
    title="A Cordova tutorial for building hybrid mobile apps for Android and iOS" 
%}



Throughout this tutorial series we are going to build a classified website with Django framework 
starting from the very first step which is the setup and configuration of development 
environment to the final step .

The resulting project will be hosted on GitHub with an MIT license 
so feel free to fork or clone it if you need a ready project
for tweaking but you’ll need to apply your own CSS styles because
it only has minimal styling with Bootstrap framework  .

If you want to learn how to build your own classified web application from scratch using Python and 
Django just make sure you follow these series from the start till the end .

Getting started with a Django project
--------------------------------------
--------------------------------------

This tutorial assumes you have already Python and Django installed on your machine .
Also i’m developing under a  Ubuntu system so the commands and instructions in this tutorial 
are designed for Ubuntu but you should be able to follow the same steps on MAC or using the command prompt on Windows .

So go ahead and create a new virtual environment for our project .

Open up the terminal and navigate to your desired location then type

	virtualenv env

Then activate the environment with 

	source env/bin/activate

Next install the latest version of Django with

	pip install django

After successfully installing the latest version of Django (1.10 when writing this tutorial )  let's scaffold our project 

	django-admin startproject classified

Migrate your database with :

	python manage.py migrate

Next run your development server with :

	python manage.py runserver

Then just visit http://127.0.0.1:8000/ to see your app up and running .

Next we need to create our first app with
	
	python manage.py startapp classified

Then we need to wire up our created app .

Open your settings.py with your favorite text editor (I’m using Visual Studio Code .It is a very powerful code editor with nice features from Microsoft ) and add classified to the set of installed apps .



