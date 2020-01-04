---
layout: post
title: "Django Authentication with a MySQL Database— Login, Logout and Password Change/Reset"
image: "images/content/django.png"
excerpt: "In this tutorial, you'll learn how to easily add a complete authentication system to your Django application with login, logout and password change and reset functionalities." 
tags : [ mysql ]
---

In this tutorial, you'll learn how to easily add a complete authentication system to your Django application with login, logout and password change and reset functionalities.

We'll be using Django with a MySQL database.

We'll also be using `django-crispy-forms` and Bootstrap 4 for styling the application UI.


## Prerequisites

Let's start with the prerequisites for this tutorial. In order to follow the tutorial step by step, you'll need a few requirements, such as:

- Basic knowledge of Python,
- Working knowledge of Django (`django-admin.py` and `manage.py`),
- A recent version of Python 3 installed on your system  (the latest version is **3.7**),
- MySQL database installed on your system.

We will be using `pip` and `venv` which are bundled as modules in recent versions of Python so you don't actually need to install them unless you are working with old versions.

If you are ready, lets go started!

##  Creating a Virtual Environment

A virtual environment allows you to isolate your current project dependencies from the rest of packages installed globally on your system or in the other virtual environments. You can either  use `virtualenv` which needs to be installed on your system or the `venv` module available as a module in recent versions of Python 3.

Go to your command terminal and run:

```bash
$ python -m venv env
```

Next, activate the virtual environment using:

```bash
$ source env/bin/activate
```

> **Note**: please note that on Windows, you need to use `source env/Scripts/activate` in order to activate your virtual environment.

After activating the environment, you need to proceed by installing Django using `pip`:

```bash
$ pip install django
``` 

If the framework is successfully installed, you can now use the Django management commands to create and work with your project. 

We'll also need to install mysql-client using:

```bash
$ pip install mysqlclient
```

## Creating a MySQL Database

We'll be using a MySQL database. In your terminal invoke the `mysql` client using the following command:

```bash
$ mysql -u root -p
```

Enter your MySQL password and hit **Enter**.

Next, run the following SQL statement to create a database:

```bash
mysql> create database mydb;
```


## Creating a Django Project

Let's now create the project using `django-admin.py`. In your terminal, run the following command:

```bash
$ django-admin.py startproject demoproject
```

Django has an ORM that abstracts dircet database operations and supports SQLite which is configured by default in the project so we'll be using a SQLite database for this tutorial.

If you need to use PostgreSQL, MySQL or any other database management system, you'll have to install it first then open the `settings.py` of your project and add the database address and credentials inside the `DATABASES` object. 

Here is the configuration for `mysql`:


```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql', 
        'NAME': 'mydb',
        'USER': 'root',
        'PASSWORD': 'YOUR_DB_PASSWORD',
        'HOST': 'localhost',   
        'PORT': '3306',
    }    
}
```

Make sure to replace `YOUR_DB_PASSWORD` with your own MySQL password.

## Adding `django-crispy-forms`

We'll be using Bootstrap 4 for styling the authentication forms, so you need to install it using `pip`:

```bash
$ pip install django-crispy-forms
```

Next, open the `settings.py` file and add the application to the installed apps:

```python
INSTALLED_APPS = [
    # [...]
    'crispy_forms'
]
```

Next, add the following setting which sets Bootstrap 4 as the default styling framework for `django-crispy-forms`:

```python
CRISPY_TEMPLATE_PACK =  'bootstrap4'
```

## Creating the `accounts` Application

Apps are the Django way of organizing a project. Think of them as modules. 

Let's encapsulate the authentication logic needed in our project into an `accounts` application. You obviously use  any valid name you see fit.

Go to your terminal and navigate inside your project's folder if you have not done so:

```bash
$ cd demoproject
```

Next, create the application using `manage.py`:

```bash
$ python manage.py startapp accounts
```

`manage.py` is another management script for Django that exists in your root project's folder. It provides a nice wrapper for the most used Django management commands.

The previous command will create a Django application with a default file structure. To make this app part of your project, you need to open the `settings.py` file and add it to the  `INSTALLED_APPS` array:

```python
INSTALLED_APPS = [
# [...]
'accounts'
]
```

That's it, you can now create your database and run your Django development server using the following commands:

```bash
$ python manage.py migrate
$ python manage.py runserver
```
You can use your browser to navigate to the `localhost:8000` address in order to see you web application up and running.

## The `auth` Built-In Application

The `auth` application is a built-in authentication system in Django that allows developers to add authentication to their apps without re-inventing the wheel trying to implement the base functionality from scratch.

The Django authentication app provides the following functionalities out of the box:

- Login via the `LoginView` class view,
- Logout via the `LogoutView` class view,
- Password reset via the `PasswordResetView` class view,
- Password change via the `PasswordChangeView` class view,

You only need to provide templates to implement these functions in your application. 

For registering users, you need to create your view and template.

You need to have the `django.contrib.auth` app in the `INSTALLED_APPS` of the `settings.py` file which is the case by default.

Next create the `urls.py` file in your `accounts` app and add the following code:

```python
from django.contrib.auth import views
from django.urls import path

urlpatterns = [
]
```

## Login Users Using `LoginView`

You can login users in your Django application using the `LoginView` class-based view. In your `accounts/urls.py` file add the following path:
 
```python
 urlpatterns = [
    path('login/', views.LoginView.as_view(), name='login'),
```

You simply use the `as_view()` method of `LoginView` to return a callback object that can be assigned as a view function to the `path()` function.

Next, you need to provide a template for your login view. Create a `templates` folder in the root of your `accounts` application and add a `base.html` file with the following code:

{% raw %}
```html
<!doctype  html>
<html  lang="en">
<head>
<link  rel="stylesheet"  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"  integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"  crossorigin="anonymous">
<title>Django Authentication Example</title>
</head>
<body>
  <div  class="container">
    <div  class="row justify-content-center">
      <div  class="col-4">
      <h1  class="text-center">Django Authentication Example</h1>
      {% block main %}
      {% endblock %}
      </div>
    </div>
  </div>
</body>
</html>
```
{% endraw %}

We first import Bootstrap 4 in our base HTML template. We then create a container `<div>` a title and a `main` block where Django render the other parts of our templates.

Next, create a `templates/registration` folder and the the `login.html` template with the following code:

{% raw %}
```html
{% extends  'base.html' %}
{% load crispy_forms_tags %}

{% block main %}
<div class="card">
<div class="card-body">
<h4 class="card-title">Log in to your account</h4>

<form method="post">
{% csrf_token %}
<input type="hidden" name="next" value="{{ next }}">

{{ form|crispy }}

<button type="submit" class="btn btn-primary btn-block">Log in</button>
</form>
</div>
</div>
{% endblock %}
```
{% endraw %}

We extend the previous base template, we load `crispy_forms_tags` and then we override the `main` block to add our login form.

Next, we create an HTML form with a POST method and render the form fields using `{{ form|crispy }}`. The `crispy` filter applies Bootstrap styles to the individual fields.

`csrf_token` adds the field for CSRF protection to out login form.

We Also add a hidden form field that holds the next URL that will be used by Django to redirect the user to a next page when he's successfully logged in. By default it redirects the `accounts/profile` URL.

### Setting the Login Redirect URL

You can set the next URL or the login redirect URL via the `LOGIN_REDIRECT_URL` setting. Open the `settings.py` file and add:

```python
LOGIN_REDIRECT_URL =  '/'
```
   
For testing the login view, you can create a user using the `manage.py createsuperuser` command from your terminal.

> **Note**: Once you are logged in, you will be redirected to the `/accounts/profile` URL. 

This is a screenshot of the login form styled with Bootstrap 4:

  

![Django login form](https://d2mxuefqeaa7sj.cloudfront.net/s_52455E7E72CD99FC22444E01CF73DDAF8535EC1866F215EFD5EDE5910AD629FA_1544398386575_Screenshot_18.png)

## Logout Users Using `LogoutView`

You can logout users in your application using the `LogoutView` class-based view. In your `accounts.py` file, add the `/logout` path and link it with a callable view of `LogoutView`:

```python
   path('logout/', views.LogoutView.as_view(), name='logout'),
```

Again we use the `as_view()` method to return a callable object from the `LogoutView` class.

Next, you need to create a `registration/logged_out.html` with the following code:

{% raw %}
```html
{% extends 'base.html' %}
{% block main %}

<p>You are logged out!</p>
<a  href="{% url 'login' %}">Log in again</a>

{% endblock %}
```
{% endraw %}

This is a screenshot of the logged-out done view:

![Django logout done](https://d2mxuefqeaa7sj.cloudfront.net/s_52455E7E72CD99FC22444E01CF73DDAF8535EC1866F215EFD5EDE5910AD629FA_1544398386644_Screenshot_19.png)

## Reset Passwords Using `PasswordResetView`, `PasswordResetDoneView`, `PasswordResetConfirmView` and `PasswordResetCompleteView`

You can enable your users to reset their passwords using many views:

- `PasswordResetView`, 
- `PasswordResetDoneView`, 
- `PasswordResetConfirmView` 
- `PasswordResetCompleteView`

In your `accounts/urls.py` file, add the following paths:

```python
path('password-reset/', views.PasswordResetView.as_view(), name='password_reset'),
path('password-reset/done/', views.PasswordResetDoneView.as_view(), name='password_reset_done'),
path('reset/<uidb64>/<token>/', views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
path('reset/done/', views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
```

Next, you need to add a `registration/password_reset_form.html` template with the following code:

{% raw %}
```html
{% extends 'base.html' %}
{% load crispy_forms_tags %}

{% block main %}
<div  class="card">
<div  class="card-body">
<h4  class="card-title">Reset your password</h4>
<form  method="post">
{% csrf_token %}
<input  type="hidden"  name="next"  value="{{ next }}">
{{ form|crispy }}

<button  type="submit"  class="btn btn-primary btn-block">Reset</button>
</form>
</div>
</div>
</div>
{% endblock %}
```
{% endraw %}

In the same way, you need to add the `password_reset_confirm.html`, `password_reset_done.html`, `password_reset_email.html` and `password_reset_complete.html` templates.

This is a screenshot of the password reset form styled with Bootstrap 4:

![Django password reset form](https://d2mxuefqeaa7sj.cloudfront.net/s_52455E7E72CD99FC22444E01CF73DDAF8535EC1866F215EFD5EDE5910AD629FA_1544398386672_Screenshot_21.png)

## Changing Passwords Using `PasswordChangeView` and `PasswordChangeDoneView`

You can enable your users to change their passwords via the `PasswordChangeView` and `PasswordChangeDoneView` class-based views.

In your `accounts/views.py` file, add the following paths:

```python
path('password-change/', views.PasswordChangeView.as_view(), name='password_change'),
path('password-change/done/', views.PasswordChangeDoneView.as_view(), name='password_change_done'),
```

Next create a `registration/password_change_form.html` template and add the following code:

{% raw %}
```html
{% extends 'base.html' %}
{% load crispy_forms_tags %}

{% block main %}
<div  class="card">
<div  class="card-body">
<h4  class="card-title"> Change your password</h4>

<form  method="post">
{% csrf_token %}
{{ form|crispy }}

<button  type="submit"  class="btn btn-success">Change password </button>
</form>
</div>
</div>
{% endblock %}
```
{% endraw %}

You also need to add `password_change_done.html` template.

This is a screenshot of the password change form:


![Django password change form](https://d2mxuefqeaa7sj.cloudfront.net/s_52455E7E72CD99FC22444E01CF73DDAF8535EC1866F215EFD5EDE5910AD629FA_1544398386660_Screenshot_20.png)



## Registering Users

For registering users, the Django built-in auth application doesn't provide a ready view function or class-based view so you need to provide your own your own custom implementation. 

## Importing the URLs in your Projects' `urls.py`

You have added the various urls for implementing authentication in your web application in the accounts application but they can not be used until you add them to the project's level `urls.py` file . 

First, this is the complete source of the `accounts/urls.py` file:

```python
from django.contrib.auth import views
from django.urls import path

urlpatterns = [
	path('login/', views.LoginView.as_view(), name='login'),
	path('logout/', views.LogoutView.as_view(), name='logout'),
	path('password-change/', views.PasswordChangeView.as_view(), name='password_change'),
	path('password-change/done/', views.PasswordChangeDoneView.as_view(), name='password_change_done'),
	path('password-reset/', views.PasswordResetView.as_view(), name='password_reset'),
	path('password-reset/done/', views.PasswordResetDoneView.as_view(), name='password_reset_done'),
	path('reset/<uidb64>/<token>/', views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
	path('reset/done/', views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
]
```

Next, open the `urls.py` that exists in the root of your project and use the `include()` function to import the accounts urls:

```python
from django.urls import path, include

urlpatterns = [
    path('accounts/', include('accounts.urls'))
]
```

Now, go ahead and start your development server. You can use your authentication URLs under the `/accounts` path:

- `http://127.0.0.1:8000/accounts/login/` for login users,
- `http://127.0.0.1:8000/accounts/logout/` for logout users,
- `http://127.0.0.1:8000/accounts/password-change/` for changing passwords,
- `http://127.0.0.1:8000/accounts/password-reset/` for resetting passwords.



## Conclusion

Throughout this tutorial we've seen how we can easily add the login, logout and password reset and change features in our Django apps using the `auth` application without re-inventing the wheel.

We've also used Bootstrap 4 and `django-crispy-forms` to style the various forms for login, password change and reset.