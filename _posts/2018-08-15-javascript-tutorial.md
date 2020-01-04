---
layout: post
title: "JavaScript ES6 Tutorial for Django Developers"
image: "images/content/nativescript.png"
excerpt: "" 
tags : [django, javascript] 
---

This **JavaScript (ES6) tutorial** is a part to a series of tutorials to teach **Django developers** front-end web development for creating modern full-stack applications.

Before starting the tutorial for the new JavaScript/ES6 features, we will first learn how to include JavaScript in a Django project.

 ![JavaScript ES6 tutorial](https://cdn-images-1.medium.com/max/716/1*uK67NK0sDkJSD32pwZbquA.jpeg)
 
There are two methods of integrating JavaScript with Django.

- Separate Django (back-end) and JavaScript(front-end) apps which is convenient for building JavaScript-heavy apps with a Django RESTful back-end
- Using JavaScript with Django built-in templates which is convenient for apps that don't need a complex JavaScript front-end

We've previously covered how to use the first approach with React, Vue and Angular examples. In this tutorial, we'll focus on the second approach.

We assume, you already have created a project. Check this [tutorial](https://www.techiediaries.com/create-django-project) if you need help!

Let's start by creating a Django HTML base template for your application (`base.html`):

{% raw %}
```html
<!DOCTYPE html>
<html lang="en">
<head>
  {% block title %}<title>Django JavaScript ES6 Tutorial</title>{% endblock %}
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
{% block body %} {% endblock %}
</body>
</html>
```
{% endraw %}

## Adding JavaScript to Our Django Template

We can add JavaScript to our template using an inline  `<script>` tag or an external JavaScript file. Let's create a `app.js` file, put it in a  `js` folder that you need to create in the `static` folder of your application.

Next in the `<head>` tag of the template add:

{% raw %}
```html
{% load static %} 
<link rel="stylesheet" href="{% static 'js/app.js' %}">
```
{% endraw %}

We use the `static` template tag to specify the relative URL to the JS file.

Check [Managing static files (e.g. images, JavaScript, CSS)](https://docs.djangoproject.com/en/2.0/howto/static-files/#managing-static-files-e-g-images-javascript-css) for more information about static files in Django.



