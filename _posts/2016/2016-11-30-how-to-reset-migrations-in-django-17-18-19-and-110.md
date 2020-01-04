---
layout: post
title: "How to reset migrations in Django 1.7 - 1.8 - 1.9 and above "
image: "images/content/how-to-reset-migrations-in-django-17-18-19-and-110/titleimage.png"
excerpt: "This tutorial shows you how to reset database migrations in Django 1.7 - 1.8 - 1.9 and above "
tags : django
canonical: "https://www.techiediaries.com/resetting-django-migrations"
---
{% include image.html
       img="images/content/how-to-reset-migrations-in-django-17-18-19-and-110/bigimage.png"
       title="How to reset migrations in Django 1.7 - 1.8 - 1.9 and above "
%}

Migrations help you propagate models changes to your database schema,they are particularly helpful in the situation when you need to change your database structure and you don't want or you can't drop a database table and recreate it or when you have a production database with tables which has millions of rows .Any developer has experienced situations where he has to change the structure of an existing table such as adding,deleting or renaming a field.In some cases droping the table and recreate it solve the problem and release the developer from the headache related to and resulted by the process but just imagine a scenario where your application is already in production with millions of database rows ,droping your old tables is not a choice.You can't even dear to think about it so migrations are here to present you a more acceptable and professional solution.

Simply migrations lets you change your database schema while keeping your data.

How to get started with migrations ?
--------------------------------------

Getting started with migrations is easy especially with the latest versions of Django,starting with  Django 1.7 .In fact from Django 1.7 migrations become obligatory since they are integrated within your django workflow.

To work with migrations Django has two essential commands for you

	python manage.py makemigrations  # create migrations files
	python manage.py migrate # apply migrations and create actual database tables

You can also show your migrations with

	python manage.py showmigrations #show migrations


How to reset django migrations ?
----------------------------------

The django migrations system is very powerful,flexible and designed to handle big number of migrations but having a lot of models migrations causes problems when frequently changing your database structure(during development phase in most cases )  to most django developers both biginners and even experienced .For many situations you'll have no solution at all but to clean up and reset the migrations so how can you reset Django migrations when things gets really messed up ?

The solution is simple but depends on whether you are still on development phase or you are on production so lets detail the process :

Resetting Django migrations in development phase
-------------------------------------------------
--------------------------------------------------

So you are still developing the application ,you app is not on production yet .In this case deleting the whole database is not a big deal.You can reset the migrations in exactly three steps

1)

Start by droping your  database using SQL language if you are using a database system like Posgres or MySQL and you have a database with name mydb

	delete mydb;

If you are using sqlite you just need to delete sqlite file which's generally named db.sqlite3 	

2)

Next you need to go through all migrations folders for each app that belongs to your project and delete the migrations files except for __init__.py  

If you are using a terminal under Linux/MAC you can automate this tedious easilly .For example

	find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
	find . -path "*/migrations/*.pyc"  -delete

3)

Next and last all you have to do is execute the two migrations command you normally invoke when you are syncing your models to a new database with Django

	python manage.py makemigrations
	python manage.py migrate

Make sure you have created a new database after deleting the old one if you are using any database system other than sqlite.

That's all for the first case i.e when you are still developing your app and not yet on production mode.That's actually very easy and makes no problem at all but things becomes more complex when you are app is on production because you can't drop your database so how can you reset migrations in this case ?

We simply need to keep the database while getting rid of migrations history .Here is how you can do it in detailed steps : 

1)

First go through each app and detete its migrations history by ussuing the following command

	python manage.py migrate --fake myApp zero

Django will unapply any previous migrations for the specific app(myApp)

2)

Next you need to actually delete the migrations file so you'll need again to go through each app migrations folder and delete them except for __init__.py .Simply use the folloing script under any unix based operating system.For Windows you can use the power commandd line .It should be similar to unix but sincerly i don't use Windows and netier power bash

	find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
	find . -path "*/migrations/*.pyc"  -delete

You can easilly verify your migrations using : 

	python manage.py showmigrations

3)

Next we need create the migrations again so just execute

	python manage.py makemigrations

BUT don't forget the database still have tables belonging to initial migrations so what we need to do is migrating our database and in the same time faking the initial migartions you can do that by simply execute 

	python manage.py migrate --fake-initial 	

So I hope you have completed the step successfully .

Using a Django app for resetting migrations
--------------------------------------------
-------------------------------------------

Instead of going through all these steps you can use a recently developed Django app to reset migrations in a few commands.

The app does all steps for such as deleting the migration files,clraring  django_migrations table and then recreating migrations and faking old migrations. 

So first you need to install the app via pip 

	pip install django-reset-migrations

Then add the app in your INSTALLED_APPS under settings.py

	INSTALLED_APPS = (
	    # ...
	    'reset_migrations',
	    # ...
	)

Next you can simply start using it from the CLI 

	python manage.py reset_migration myApp

You can also specify multiple apps for reset

	python manage.py reset_migration myApp myOtherApp

In case you don't want to delete migrations files of your app(s) just add --cached 

 	python manage.py reset_migration myApp myOtherApp --cached	


Manually modifying the migrations
----------------------------------
----------------------------------

As you cab notice migrations files are just Python files so you can consider manually modifying your migrations to get rid of any conflicts .Django documenation offers great explanation about how to [write migrations yourself](https://docs.djangoproject.com/en/1.9/howto/writing-migrations/){:rel="nofollow"} so don't be afraid of migrations they are actually easy to control when you get familiar with how they work.

Merging the migrations
-----------------------
-----------------------

Sometimes it's also possible to solve migrations issues by just merging them in that case Django will ask you to do that but that works only for simple models modifications.

When you appling your migrations with  

	python manage.py migrate 	

Django detects that conflicts exist so it will instrcut you to use python manage.py makemigrations –merge so follow the orders of your master and execute

	python manage.py makemigrations –merge

Then just migrate again

	python manage.py migrate

But unfortunalty that works ony for simple modifications of your models.

Conclusion
-----------

So that's the end of this short tutorial so remember don't be afraid of migrations .They are really helpfull despite the headache that they may make but that's something that's you'll learn to manage after becoming more experienced with Django and also by undersatnding how migrations work so you can avoid introducing any conflicts when changing your models.

