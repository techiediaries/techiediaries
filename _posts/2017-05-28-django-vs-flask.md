---
layout: post
title: "Django vs. Flask (2019 Comparison)"
image: "images/content/django-vs-flask-2017.png"
excerpt: "A gentle comparison of Django vs Flask Python web frameworks in 2019" 
tags : [django ,flask]
---

The Python language has many great frameworks for building web applications among them Django and Flask.

Both frameworks are gaining more popularity steadily in time and there are no signs they are becoming less 
popular or obsolete even if the web has known many important changes since the data they have been created.

Django was created in 2005 while Flask was created in 2010 .Today we are in 2018 which means Django is 13 years old 
and Flask is 8 years old. They are both extremely popular frameworks to build web applications with Python but they are so different in principle from each other. While Django follows a battery included approach making it a full packed, complete and opinionated framework, Flask is a micro framework, an 
un-opinionated framework that lets you choose what tools you can use for building a web app from the ORM to the templating engine.

In this post we'll discuss some points you might want to consider if you need to learn Django or Flask or maybe both?
Which framework you should consider using to build your next project? And in which situations?

They are both so popular so there are more and more websites built using both of them and more job demands for both frameworks.

Flask is simple and flexible and lets you decide how to implement each major component such as the ORM to interact with databases,the template engine, forms etc.

Django is a little bit heavy when compared to Django. It has its own ORM, a template engine and even an admin interface out of the box.

Django has a predefined project directory structure while you can structure a Flask project as you want.

When you should choose Flask?

If you are just beginning web development with Python then Flask is a good option for learning purposes since you can have more
control of all components of the framework. 

Also if you are building small web applications then Flask can be also your to go choice.

How about Django?

If you are a professional developer who needs to build quick prototypes or final products Django might be a good choice since It's a batteries included framework. There is a package for every common web development task so you don't have to reinvent the wheel or waste your time building what other developers have already created. Just use the existing packages and concentrate on building the specific requirements for your project.

The Django ORM is easy to grasp and straightforward and lets you express your businness domain requirements 
clearly then you have the Django admin interface, a complete web application that lets you do crud operations on your models such as creating, updating, deleting and displaying database records from an intuitive user interface generated on the fly without writing extra code.   

So thanks to these features, Django is your choice for either quick prototypes or final products.

Now let's see how we can create a simple *Hello World* web application in both frameworks:

Starting with Flask. Create a Python file: 

```bash
$ touch webapp.py
```


Next, import **Flask** from **flask** package 

```python
from flask import Flask         
```

Next, create an instance 

```python

app = Flask(__name__)
```

Also, create a view function that responds to HTTP requests when the main route `/` is visited:   

```python
@app.route("/")
def hello():
    return "Hello, World!"    
```
This function responds with a *Hello, World!* response.

Finally, add the code to run the application:

```python
if __name__ == "__main__":
    app.run()  
```

First we make sure, this Python file is running as an executable not included as a package then we call the app `run()` method to start the web application.

Now you can run this app from terminal:

```bash
$ python webapp.py 
```

You should get 

```bash
Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

If you visit this address with a web browser you should get a web page with *Hello, World!* output. 


For Django, you should first generate a project (After installing Django) with the following command: 

```bash
$ django-admin startproject djwebapp 
$ cd djwebapp 
```

Next you should create a Django application: 

```bash
$ python manage.py startapp myapp
```

Then change your `settings.py` to include this app in the **Installed Apps** array.

Next open `myapp/views.py` and create a view function: 

```python
from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello, World!")
```

After that, you need to open your project `urls.py` file and add an URL mapping for this view function: 


```python
from django.conf.urls import url

from . import views

urlpatterns = [
        url(r'^$', views.index, name='index'),
 ]
```

You should now be able to run your web app from the terminal 

```bash
$ python manage.py runserver
```

As you can see, you can use Flask to rapidly create an example web app that receives http requests and responds with HTTP responses but you need to do more work if you need to create the same example with Django.

## Conclusion 

Choosing the right framework depends on many things. You should take into consideration your goals. Are you just learning server side web development or you are building a project for a client?  
 You should also consider your project requirements, some projects may be better developed in Django, other projects 
can be better created in Flask. Also remember if you need grained control over each part of your framework or you need to swap and make use of different existing tools you should use Flask where you only have the minimum functionalities and you can choose the other components by yourself.

