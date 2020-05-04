---
layout: post
title: "CORS in Django REST Framework"
image: "images/content/django.jpg"
excerpt: "In this tutorial we have seen how to enable CORS headers in your Django back-end using a custom CORS middleware or the django-cors-headers package" 
tags : [django , python] 
author: kaima
---

CORS stands for Cross Origin Resource Sharing. If you are building applications with Django and modern front-end/JavaScript technologies such as Angular, React or Vue, chances are that you are using two development servers for the back-end server (running at the 8000 port) and a development server (Webpack) for your front-end application. 

When sending HTTP requests from your front-end application, using the browser's fetch API, the Axios client or the jQuery `$.ajax()` method (a wrapper for the JavaScript XHR interface), to your back-end API built with Django REST framework the web browser will throw an error related to the Same Origin Policy. 

[Cross Origin Resource Sharing or CORS](https://www.w3.org/TR/cors/) allows client applications to interface with APIs hosted on different domains by enabling modern web browsers to bypass the Same origin Policy which is enforced by default.

CORS enables you to add a set of headers that tell the web browser if it's allowed to send/receive requests from domains other than the one serving the page. 


You can enable CORS in Django REST framework by using a custom middleware or better yet using the [django-cors-headers](https://github.com/ottoyiu/django-cors-headers/) package 

## Using a Custom Middleware

First create a Django application:

```python
python manage.py startapp app
```

Next you need to add a middleware file `app/cors.py`:

```python
class CorsMiddleware(object):
    def process_response(self, req, resp):
        response["Access-Control-Allow-Origin"] = "*"
        return response

```

This will add an `Access-Control-Allow-Origin:*` header to every Django request but before that you need to add it to the list of middleware classes:

```python
MIDDLEWARE_CLASSES = (
    #...
    'app.CorsMiddleware' 
)
```

That's it you have now enabled CORS in your Django backend. You can configure this middlware to add more fine grained options or you can use the well tested package `django-cors-headers` which works great with Django REST framework.

## Using django-cors-headers

Start by installing django-cors-headers using pip

```python
pip install django-cors-headers

```

You need to add it to your project `settings.py` file:

```python
INSTALLED_APPS = (
    ##...
    'corsheaders'
)
```

Next you need to add `corsheaders.middleware.CorsMiddleware` middleware to the middleware classes in `settings.py`

```python
MIDDLEWARE_CLASSES = (
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.BrokenLinkEmailsMiddleware',
    'django.middleware.common.CommonMiddleware',
    #...
)
```

You can then, either enable CORS for all domains by adding the following setting

```python
CORS_ORIGIN_ALLOW_ALL = True
```

Or Only enable CORS for specified domains:

```python
CORS_ORIGIN_ALLOW_ALL = False

CORS_ORIGIN_WHITELIST = (
    'http//:localhost:8000',
)
```

You can find more [configuration options from the docs](https://github.com/ottoyiu/django-cors-headers/#configuration).

## Conclusion

In this tutorial we have seen how to enable CORS headers in your Django REST framework back-end using a custom CORS middleware or the django-cors-headers package.





