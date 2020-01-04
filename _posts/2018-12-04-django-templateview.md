---
layout: post
title: "Django TemplateView GET|POST Example — URLs, as_view and get_context_data"
image: "images/content/django.png"
excerpt: "Throughout this tutorial, we'll learn about TemplateView in Django" 
tags : [python, django]
---
 
Django Templates are used to create HTML interfaces that get rendered with a Django view. 

A `TemplateView` is a generic class-based view that helps developers create a view for a specific template without re-inventing the wheel.

`TemplateView` is the simplest one of many generic views provided by Django. 

You can create a view for an example `index.html` template by simply sub-classing `TemplateView` and providing the template name via a `template_name` variable.

`TemplateView` is more convenient when you need to create views that display static HTML pages without context or forms that respond to GET requests. 

`TemplateView` is simply a sub-class of the `View` class with some repetitive and boilerplate code that renders a Django template and sends it to the client.

## Django View Example

Before looking at how to use `TemplateView`, let's first look at how we can create a Django view from scratch.

Let's pretend we need to create a home view. This is the required code that you need to write in the `views.py` file of your application


```python
from django.shortcuts import render
from django.views.generic.base import View

class Home(View):
	def get(self, request, *args, **kwargs):
		return render(request, "index.html")
```

If our app is named `myapp`, you need to create a `templates/myapp` inside `myapp` and then add an `index.html` template inside of it. The path of the `index.html` file should be `myapp/templates/myapp/index.html`.

So what does `View` do for us? It simply provides the `get` method which needs to contain any code that will be called when a GET request is sent to the associated URL.

You don't have to check for the GET request, just provide your code inside the `get` method.   
 
 As you can see in this example, we used extra code to render and return the `index.html` template using an `HttpResponse`. 


## Django TemplateView Example

Here comes the role of `TemplateView`. Instead of extending `View`, override the `get` method and then process the template and return an `HttpResponse` object using a `render` function. Simpy extend `TemplateView`.

This is the previous example rewritten to use `TemplateView`:

```python
from django.views.generic.base import TemplateView

class Home(TemplateView):
	template_name = 'index.html'
```

Next, put your index.html template in the corresponding folder and you are good to go!

You don't need to override the `get` method and provide an implementation using `render` or another method. It's already done for you in `TemplateView`. 

If you look at the implementation of `TemplateView`, you'll find an implementation of the `get` that uses the template in the `template_name` variable and renders it. 

Since this is a common pattern, it's easily isolated and defined in its own class which can be re-used by Django developers without re-inventing the wheel.

The only requirement is that you have to use the `template_name` variable for specifying the template since this is the only way `TemplateView` can use to recognize the template you want to render.

## Django Template Context with `View`

If you don't want your template to be completely static, you need to use Template Context.
  
Let's see how you can provide `context` to your template  using a `View` class. This is the previous example with a simple context object that we'll be passed to the template to make it more dynamic.

```python
from django.shortcuts import render
from django.views.generic.base import View

class Home(View):
	def get(self, request, *args, **kwargs):
		context = {'message': 'Hello Django!'}
		return render(request, "index.html", context=context)
```

You simply  create a `context` object (You can name it whatever you want) and you pass it as the second parameter of the `render` method.

## Django Template Context with `TemplateView`


Let's now see the previous example with `TemplateView`:

```python
from django.views.generic.base import TemplateView

class Home(TemplateView):
	template_name = 'index.html'

	def get_context_data(self, *args, **kwargs):
		context = super(Home. self).get_context_data(*args, **kwargs)
		context['message'] = 'Hello World!'
		return context

```

If using `TemplateView`, you need to use the `get_context_data` method to provide any context data variables to your template.


You re-define the `get_context_data` method and provide an implementation which simply  gets a `context` dict object from the parent class (in this example it's `TemplateView`) then augments it by passing the `message` data.
 
 You can then use interpolation curly braces in your `index.html` template to display your context variable

{% raw %}
```html
<p>{{message}}</p>
```  
{% endraw %}

## Using `TemplateView` with URLs with `as_view` 

After defining the sub-class of `TemplateView` you need to map it with an URL in the `urls.py` file of your project. In order to do that, you need to call the `as_view` method of  `TemplateView` which returns a callable object that can be passed as the second parameter for the `path` method that associates URLs to views. For example:

```python

from django.urls import path
from myapp import views

urlpatterns = [
    # [...]
    path('', views.Home.as_view())
]
```

## Using `TemplateView` in `urls.py`

For even simpler cases, you can use `TemplateView` directly in your URL. This provides you with a quicker way to render a template:

```python
from django.views.generic.base import TemplateView
from django.urls import path

urlpatterns = [
    # [...]
    path('', TemplateView.as_view(template_name='index.html'))
]
```

In the as_view method of `TemplateView`, you can pass the template name as a keyword argument.

## Conclusion

The Django generic  `TemplateView` view class enables developers to quickly create views that display simple templates without reinventing the wheel.

You simpy need to subclass `TemplateView` and provide a template name in the `template_name` variable. This template should obviously exist in your templates folder. 
