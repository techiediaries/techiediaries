---
layout: post
title: "Python Django JWT — djangorestframework-jwt Example"
image: "images/content/django3.jpg"
excerpt: "In this tutorial we'll see how to add JWT based authentication to Python apps built with Django and Django REST Framework" 
tags : [python, django]
---

Adding JWT authentication in Python and Django is quite easy thanks to some mature libraries and packages like Django REST framework, `djangorestframework-jwt` and `django-rest-framework-simplejwt`.

JWT stands for JSON Web Tokens and it's a mechanism for exchanging data between computer systems that happens to be convenient for generating authorization headers that can be used to implement statless auth in web apps.


Django REST Framework provides multiple mechanisms for authenticating users.

Authentication is simpy the process of confirming the identity of users. There is also a related concept which is authorization — the process of making checking if the user has an authorized access to a protected server resource.

Throughout this tutorial, we are going to see the various ways that you can use to implement authentication in Django REST framework.

We'll also see the difference between DRF built-in token-based authentication system and JWT authentication. 

Finally, we'll see how you can add JWT authentication in your web apps built with Python, Django and Django REST framework.


## Different Ways to Authenticate Users 

The general process of authenticating users is done by checking if any user information or credentials are attached to an incoming request sent from the client.

DRF has already three mechanisms to authenticate users. Let's look at each one of them:

- Basic authentication
- Session based authentication
- Token based authentication

Let' see of all of them in more details

### Basic authentication

Basic authentication is very easy to setup but it's only recommended for testing purposes not for production. 

It's implemented in `rest_framework.authentication.BasicAuthentication` class and works by *base64* encoding the user login information i.e the user's name and the password then attach them to an HTTP Authorization Header (which can then be retrieved from `request.META.HTTP_ AUTHORIZATION`).

### Session based authentication

Session based authentication is the traditional authentication mechanism and the default one used by Django.

This type of authentication depends on cookies on the client to store the user session information once the user is logged in on the server. 

Cookies are not available in mobile and desktop apps and they are not accepted by browsers in the case of cross domains apps. 

Session authentication is implemented in the `rest_framework.authentication.SessionAuthentication` class.

### Token based authentication

Token based authentication uses a token, which is a hashed (*base64*) set of information, that gets generated and sent to the client when the user logs in. 

Each time the user sends a request, it attaches the token as an **Authorization header**. 

Django REST framework associates users and generated tokens in a database table so it needs to query the database for every request to determine the association between a token and a user. 

You can reduce database access by caching the token but this doesn't scale well when the application gets bigger. 

Token based authentication is implemented in the `rest_framework.authentication.TokenAuthentication` class.


## What is JSON Web Token?

Now let's understand JSON Wen Tokens. This is the defintion of JWT 

>JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely >transmitting information between parties as a JSON object. This information can be verified and trusted because it >is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair >using RSA.--[https://jwt.io/introduction/](https://jwt.io/introduction/)


## JWT Authentication vs Token-based Authentication

What is the difference between Django REST framework built-in token-based authentication and JSON Web Tokens or JWT authentication? 

Django REST Framework built-in token-based authentication uses a database table to make associations between users and random tokens. 

There is no way you can determine a user from the token itself since it's purely random unless you query the database. 

JWT is JSON data encoded using a secret key so the server doesn't need to query a database. It can retrieve the associated user from the token itself. 

As a result, it's more efficient and scales better than DRF's built-in token system.

## Implementing JWT Authentication in your Python/Django Application

So now that we have seen the differences between JWT and DRF built-in token-based authentication systems, how can we implement JWT authentication in your apps built using Python, Django and Django REST framework? 

Unfortunately, Django REST framework has no built in JWT authentication system, but we can very easily add it to our project using the [django-rest-framework-jwt](https://getblimp.github.io/django-rest-framework-jwt/) package which can be installed from  PyPI using `pip`.

```bash
$ pip install djangorestframework-jwt
```

Next you need to add: `rest_framework_jwt.authentication.JSONWebTokenAuthentication` to `DEFAULT_AUTHENTICATION_CLASSES` in the `REST_FRAMEWORK` configuration object in your project' `settings.py` file:

```python

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
}
```


You can also customize various settings for [djangorestframework-jwt](https://getblimp.github.io/django-rest-framework-jwt/#additional-settings) using the `JWT_AUTH` object. For example:

```python

JWT_AUTH = { 
    'JWT_AUTH_HEADER_PREFIX': 'JWT',
    'JWT_EXPIRATION_DELTA': datetime.timedelta(seconds=300)
}
```

Next you need to add the different URLs for working with JWT in the `urls.py` file:

```python
from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import refresh_jwt_token
from rest_framework_jwt.views import verify_jwt_token
    
urlpatterns = [
    url(r'^auth-jwt/', obtain_jwt_token),
    url(r'^auth-jwt-refresh/', refresh_jwt_token),
    url(r'^auth-jwt-verify/', verify_jwt_token),
]
```

### Obtaining a JWT Token

You can obtain a token by sending a POST request with the user's name and password to the `http://localhost:8000/jwt-auth/` endpoint. Let's see an example using **cURL**:

```bash

$ curl --request POST \
      --url http://localhost:8000/jwt-auth/ \
      --header 'content-type: application/json' \
      --data '{"username": "myusername", "password": "mypass"}'
      
      {"token": "YOUR_JWT_TOKEN"}
```

Please note that you need to provide the credentials for an existing registered user.

### Making API Requests?

For every request to a protected API resource you need to attach the obtained token to requests, with an HTTP `Authorization` header, in the form of: 

    `JWT <THE_TOKEN>`

Th prefix is 'JWT' by default but if you have specified another using the `JWT_AUTH` configuration object:

```python

JWT_AUTH = { 
    'JWT_AUTH_HEADER_PREFIX': 'Bearer',
}
```

You need to specify that one instead: 

    Bearer <THE_TOKEN>

Using cURL you can specify an `Authorization` header with:

```bash

$ curl -H "Content-Type: application/json" -H "Authorization: Bearer YOUR_JWT_TOKEN" -X GET  http://localhost:8000/api/protected/
```

If you can get the protected information then congratulations you have successfully setup JWT within your Python web application built with Django and Django REST framework.


## Conclusion

In this tutorial, you've learned about JWT auth in Python and Django. You also have seen a simple example to implement JWT in Django REST framework apps.















