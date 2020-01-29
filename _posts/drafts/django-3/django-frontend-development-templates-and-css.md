The Django website framework makes use of its own template language known as DTL (Django Template Language). This can be replaced with third party options, with the most popular being Jinja2.

# Documentation

If you did the overall Django  [tutorial](https://docs.djangoproject.com/en/2.0/intro/tutorial01/), you will remember templates/front-end from  [Part 3](https://docs.djangoproject.com/en/2.0/intro/tutorial03/). For initial documentation specific to the templating proccess there is an  [intro](https://docs.djangoproject.com/en/2.0/topics/templates/#template-language-intro), an  [explanation](https://docs.djangoproject.com/en/2.0/ref/templates/language/)  of DTL, and finally a more intensive  [technical](https://docs.djangoproject.com/en/2.0/ref/templates/api/)  documentaion written for Python programmers specifically.

# Setup

In order to make use of templating, the following needs to be in the  `settings.py`  file for the project.

TEMPLATES = [  
    {  
        'BACKEND': 'django.template.backends.django.DjangoTemplates',  
        'DIRS': [],  
        'APP_DIRS': True,  
        'OPTIONS': {  
            # ... some options here ...  
        },  
    },  
]

Which tells the project what backend is being used (DTL in this case), which directories to look for templates (none listed here) and whether to look for static files in the individual apps (True here).

Now suppose you have a template called  `home.html`. Sitting in the directory,  `project/app/templates/home.html`. You can have your  `project/urls.py`  file call the view

urlpatterns = [  
    url(r'^home/$', app.views.home),  
]

Which directs it towards this method in your  `project/app/views.py`

def home(request):  
    return render(request, 'home.html', context={'key':'value'})

This then renders the  `home.html`  template to the browser. The  `context`  is a dictionary which is fed and parsed by this template.

# Using CSS

For creating a visually appealing HTML (Hyper-Text Markup Language) collection of pages, the use of CSS (Cascading Style Sheets) is nearly a requirement. Furthermore,  [Bootstrap](https://getbootstrap.com/)  provides a relatively low bar for entry into this schema; check out the  [Quickstart](https://getbootstrap.com/docs/4.1/getting-started/introduction/). DjangoGirls provides a  [tutorial](https://tutorial.djangogirls.org/en/css/)  for incorporating Boostrap in Django.

In order to use the Bootstrap CSS is it essential to put

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

At the head of any sheet importing the CSS.  [Bootswatch](https://bootswatch.com/)  provides several full CSS packages for free built on top of Bootstrap.

# Base Template

The benefit of using the Django templates is first seen in the extension methods. We can build a  `base.html`  which will dictate layout and functionality we want accross the site, then simply extend specifics for each page.

At the top of this  `base.html`  we place the following header

{% load static %}  
<!DOCTYPE html>  
<html lang="en">  
<head>  
    <!-- Required meta tags -->  
    <meta charset="utf-8">  
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">  
​  
    <!-- Bootstrap CSS -->  
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">  
    <link rel="stylesheet" type="text/css" href="{% static 'app/style.css' %}" />  
    <title>{% block title %}Project Name{% endblock %}</title>  
</head>

This will load Bootstrap, our Bootswatch css stored as  `project/app/static/app/style.css`, and put the title  `Project Name`  as the title of each page (this will appear in the tab of the browswer.)

From here you can add any Nav Bars that you want on each page of the sheet.

<body>  
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">  
  <a class="navbar-brand" href="#">Project</a>  
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">  
    <span class="navbar-toggler-icon"></span>  
  </button>  
​  
  <div class="collapse navbar-collapse" id="navbarColor02">  
    <ul class="navbar-nav mr-auto">  
      <li class="nav-item">  
        <a class="nav-link" href="/sub_app/">Sub-App</a>  
      </li>  
      <li class="nav-item">  
        <a class="nav-link" href="/sub_app2/">Sub-App2</a>  
      </li>

From there, you close off the docuement with

<div id="content">  
        {% block content %}{% endblock %}  
    </div>  
</body>  
</html>

This way we can specify content for any other page here. For example, consider our  `project/app/templates/landing.html`

{% extends "app/base.html" %}  
​  
{% block content %}  
    <p>Landing Page.</p>  
{% endblock %}  
​

This allows the page to have all the benefits of the  `base.html`  and simply focus on content added [right now just the test 'Landing Page.'].

# User

This is best covered by Vitor Freitas on his phenomenal blog, Simple Is Better Than Complex.

[Django Log-in](https://simpleisbetterthancomplex.com/tutorial/2016/06/27/how-to-use-djangos-built-in-login-system.html)

[Django Sign-up](https://simpleisbetterthancomplex.com/tutorial/2017/02/18/how-to-create-user-sign-up-view.html)

# Login Requirements

Django provides a quick decorator for requiring login to view pages

from django.contrib.auth.decorators import login_required  
​  
@login_required  
def my_view(request):  
    return render(request, 'template.html', {})

Then in  `settings.py`  designate redirection of all non-logged-in traffic for these requests.

LOGIN_URL = '/login/'

There are ways to make this  [across the site](http://onecreativeblog.com/post/59051248/django-login-required-middleware)  if adding the decorator becomes cumbersome for numerous views.

# Good Links

[Bootstrap Examples](https://getbootstrap.com/docs/4.0/examples/)

[Django Form Customization](https://simpleisbetterthancomplex.com/article/2017/08/19/how-to-render-django-form-manually.html)

[Django Code](https://github.com/django/django)
