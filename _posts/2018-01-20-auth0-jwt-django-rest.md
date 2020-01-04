---
layout: post
title: "Adding JWT Authentication to Python and Django REST Framework Using Auth0"
image: "images/content/django.jpg"
excerpt: "In this tutorial we'll learn how to add Auth0 JWT authentication to an API built with Django REST framework." 
tags : [python , django] 
---

In this tutorial we'll learn how to add JWT authentication to an API built with Django REST framework. Basically we'll use the `djangorestframework-jwt` package for adding JWT authentication as you would normally do except that we'll change `JWT_AUTH` to use Auth0. 

This tutorial assumes you already have a development machine with Python 3 and pip installed and will cover the following points:

* We'll see how to create a virtual environment, install Django and the other dependencies (Django REST framework and `djangorestframework-jwt`)
* We'll see how to create an Auth0 API
* We'll see how to integrate Auth0 JWT authentication with Django
* We'll briefly talk about using Auth0 Rules for detecting signup
* We'll see how to add some Django views for testing JWT 
* We'll see how to use Postman for testing JWT authentication with Auth0

## Creating the Django Project 

So head over to your terminal then create a new virtual environment and activate it using the `venv` module in your current working directory:


```bash
python3 -m venv ./myenv
source myenv/bin/activate
```

Next install Django using `pip`:

```bash
pip install django
```

Now you'll need to create a new Django project using:

```bash
django-admin startproject auth0-django-example
```

Next create a new application in your project 

```bash
cd auth0-django-example
python manage.py startapp customers
```

Add `customers` to the installed apps in your project' `settings.py` file:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'customers'
]
```

Next migrate your database then start the development server

```bash
python manage.py migrate
python manage.py runserver
```

You can visit your app at [http://localhost:8000](http://localhost:8000)

![django](https://screenshotscdn.firefoxusercontent.com/images/622ea6ae-dee4-47ef-895a-e2b9307e7c68.png)


## Create an Auth0 API

Head over to your [Auth0 dashboard]((https://manage.auth0.com/) ) then create an API

Go to the *API* section then click on the *CREATE API* button which will show a form where you need to enter your API details 

![](https://screenshotscdn.firefoxusercontent.com/images/3181e9e6-6fee-44d3-8553-4b60f2c112da.png)

## Integrating Auth0 with Django

Now head back to your terminal then install Django REST framework and `djangorestframework-jwt` package for handling JWT authentication using `pip`

```bash
pip install djangorestframework
pip install djangorestframework-jwt
pip install cryptography
pip install python-jose
```

Add `rest_framework` and `rest_framework_jwt` to the installed apps in `settings.py`:

```python
INSTALLED_APPS = [
    'rest_framework',
    'rest_framework_jwt'
]
```

Next you'll need to setup `djangorestframework-jwt` to use Auth0 central server for JWT authentication by follwing a few steps.

First add `JSONWebTokenAuthentication` to `DEFAULT_AUTHENTICATION_CLASSES`:

```python
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
       'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
    ),
}
```
Secondly import the follwing libs in your `settings.py` file:

```python
import json
from six.moves.urllib import request
from cryptography.x509 import load_pem_x509_certificate
from cryptography.hazmat.backends import default_backend
```

Finally add this code to `settings.py`:

```python
AUTH0_DOMAIN = '<YOUR_AUTH0_DOMAIN>'
API_IDENTIFIER = '<YOUR_API_IDENTIFIER>'
PUBLIC_KEY = None
JWT_ISSUER = None
if AUTH0_DOMAIN:
    jsonurl = request.urlopen('https://' + AUTH0_DOMAIN + '/.well-known/jwks.json')
    jwks = json.loads(jsonurl.read().decode('utf-8'))
    cert = '-----BEGIN CERTIFICATE-----\n' + jwks['keys'][0]['x5c'][0] + '\n-----END CERTIFICATE-----'
    certificate = load_pem_x509_certificate(cert.encode('utf-8'), default_backend())
    PUBLIC_KEY = certificate.public_key()
    JWT_ISSUER = 'https://' + AUTH0_DOMAIN + '/'

def jwt_get_username_from_payload_handler(payload):
    return 'someusername'

JWT_AUTH = {
    'JWT_PAYLOAD_GET_USERNAME_HANDLER': jwt_get_username_from_payload_handler,
    'JWT_PUBLIC_KEY': PUBLIC_KEY,
    'JWT_ALGORITHM': 'RS256',
    'JWT_AUDIENCE': API_IDENTIFIER,
    'JWT_ISSUER': JWT_ISSUER,
    'JWT_AUTH_HEADER_PREFIX': 'Bearer',
}
```

But of course you need to replace `AUTH0_DOMAIN` with your own Auth0 domain and `API_IDENTIFIER` with your own API identifier.

Please note that you need to create a user in your Django database with a `someusername` username for the JWT authentication to work.

The custom `jwt_get_username_from_payload_handler` that we are using is very simple, it maps your Auth0 users to one user in your Django database.

Because Auth0 already takes care of managing users and profiles for you so most of the time you don't have to store users locally i.e in your Django database unless you need to have users information in your database for some reason. 

In this case you'll need to create a more advanced implementation. You can use this custom method instead:

```python
def jwt_get_username_from_payload_handler(payload):
    return payload.get('sub').replace('|', '.')
```

But that's not the end of story: You need to create a Django user when a user successfully signs up using Auth0.

## Using Auth0 Rules for Detecting Signup

For this task you need to use Auth0 Rules

>Rules are functions written in JavaScript that are executed in Auth0 as part of the transaction every time a user authenticates to your application. They are executed after the authentication and before the authorization.

Rules allow you to easily customize and extend Auth0's capabilities. They can be chained together for modular coding and can be turned on and off individually. [Source](https://auth0.com/docs/rules/current)

You can also see this example of a [signup rule](https://github.com/auth0/rules/blob/master/rules/signup.md)


## Adding Django Views


Now let's add the code to test the Auth0 JWT authentication:

In `customers/views.py` add two view functions

```python
from rest_framework.decorators import api_view
from django.http import HttpResponse

def public(request):
    return HttpResponse("You don't need to be authenticated to see this")

@api_view(['GET'])
def private(request):
    return HttpResponse("You should not see this message if not authenticated!");
```

In `urls.py` add:

```python
from django.conf.urls import url
from . import views
urlpatterns = [
    url(r'^api/public/', views.public),
    url(r'^api/private/', views.private)
]
```

## Testing JWT Authentication with Postman

Go to your API dashboard then to the *Test* tab then get a token you can use to test authentication 

![](https://screenshotscdn.firefoxusercontent.com/images/c48e9c45-9408-4d4e-a323-2f531d62eb01.png)

Next navigate with your web browser to `http://localhost:8000/api/private/`. You should get `Authentication credentials were not provided.`

![](https://screenshotscdn.firefoxusercontent.com/images/feffec14-963a-4673-99d0-758076f71775.png)


Now let's use Postman for testing our endpoint: Open Postman then enter the URL for the endpoint then select *Authorization* tab.

For the *TYPE* select *Bearer Token* and in the right area enter the access token you get from Auth0 for testing.

![](https://screenshotscdn.firefoxusercontent.com/images/bc78659e-1a87-4ea4-813b-97e8a4fb79df.png)


Finally press the *Send* button, you should get: *You should not see this message if not authenticated!* as in the screenshot

![](https://screenshotscdn.firefoxusercontent.com/images/166c3b39-c628-411f-b337-80c592fd590e.png)


## Conclusion

In this tutorial we have created a simple Django application that uses Django REST framework and Auth0 for adding JWT authentication.

