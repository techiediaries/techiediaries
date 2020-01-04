---
layout: post
title: "Optimizing and Squashing Django Migrations"
image: "images/content/squach-django-migrations.png"
excerpt: "How to squach and optimize Django Migrations" 
tags : django 
---

{% include image.html 
    img="images/content/squach-django-migrations.png" 
    title="Optimizing and Squashing Django Migrations" 
%}


Django migrations allow you to change , evolve and upgrade your database schema while keeping any existing database
data intact .They also allow you to use version control tools such as Git with databases .

In this tutorial we are going to learn how to optimize database migrations by squashing or combining them .

Starting with Django 1.7 ,migrations became part of Django itself so you don't need to install any third party apps 
such as South to work with database migrations .

To use migrations you frequently work with two commands which are :

    python manage.py makemigrations 

Which generates migration files according to the change in your Django models .

And 

    python manage.py migrate      

Which actually migrates or upgrades the database schema .    

But there are also other Django commands that can be used in certain situations such as when you need to optimize 
your migrations .

<h2>How to squach migrations in Django ?</h2>

Django has a management command that allows you to squach or combine multiple migration files into a single optimized migration file .

You can simply invoke this command using :

    python manage.py squachmigrations 

Now lets consider this senario : 

You have a Django app named myApp which has 4 migrations 

    - 0001_initial
    - 0002_change_2
    - 0003_change_3
    - 0004_change_4 

Now when you want to migrate your database ,applying these migrations takes time so you have decided to squach and 
optimize them .

    manage.py squashmigrations myApp 0004

You pass the app name and migration file name (or just prefix) you want to squach up to .

You should get something like 

    Will squash the following migrations:
    - 0001_initial
    - 0002_change_2
    - 0003_change_3
    - 0004_change_4 
    Do you wish to proceed? [yN] y
    Optimizing...
    Optimized from 10 operations to 5 operations.
    Created new squashed migration /migrations/0001_squashed_0004_change_4.py 

After making sure everything is OK you can simply remove the old migration files and keep the squashed migration 
file alone .

As you can see from this simple example squashing is not only about combining migration files into one single file 
but also about optimizing the number of operations inside the final squashed file .


    


