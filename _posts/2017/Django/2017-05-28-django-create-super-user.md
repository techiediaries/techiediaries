---
layout: post
title: "Django 1.11 : Create super user for Admin back office"
image: "images/content/django-create-super-user.png"
excerpt: "Lets learn about how to create a super user in Django .We'll be using Django 1.11 version " 
tags : "django"
---

{% include image.html 
    img="images/content/django-create-super-user.png" 
    title="Django 1.11 create super user" 
%}

After you successfully created your first project with <em>Django 1.11</em> ,created an app and migrated 
your SQlite database .It's time to access the admin interface or back office generated automatically 
by Django which you can use to create ,delete ,edit and list your database tables data .

You can visit the admin interface from <a href="http://localhost:8200/admin">http://localhost:8200/admin</a> 

You'll be presented with a form to enter your username and password credentials .If you enter any values you'll
get a message :

    Please enter the correct username and password for a staff account. 
    Note that both fields may be case-sensitive.

Since you have no staff user created yet but don't worry this can be fixed with one command .

Head over to your terminal ane run :

    python manage.py createsuperuser

You'll be prompted for a username and a password (twice) ,enter them and hit Enter .

Next run your local server again :

    python manage.py runserver 

Then visit your admin interface <a href="http://localhost:8200/admin">http://localhost:8200/admin</a> and 
enter your credentials then hit Login button .

You should be successfully logged in .

        

