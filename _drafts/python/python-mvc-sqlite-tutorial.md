# CRUD MVC App with Python 3.7 & SQLite

In this tutorial we'll about implementing the MVC architectural pattern in Python (v3.7) by creating a simple CRUD application on top of a SQLite database.

By creating the example application in this tutorial, you'll learn:

- What's CRUD and how to add CRUD operations in Python,
- What's MVC and how to implement the MVC pattern in Python,
- How to use SQLite in Python

## Prerequisites

## Creating a Virtual Environment and Installing the Project's Dependencies

## Implementing the MVC Pattern

MVC stands for Model View Controller

The model layer deals with the business logic, 

The View layer deals with the presentation,

The Controller layer controls the application

>there is no logic in the `View` class
>there is no mention of the other two components of the MVC pattern. This means that if you want to design a fancy UI for your application, you just have to replace the `View` class.


Let's suppose we want to create a simple application that manages a small stock of a number of products.
 
Create an `app.py` file, open it and add the Model, View and Controller classes:

```python
class Model:
	pass
```
> In this example, we created the Model, View and Controller layers as single classes in a single file but in large applications each layer could be composed of multiple classes in separate files such as `models.py`, `views.py` and `controllers.py`

```python
class View:
	pass
```

```python
class View:
    @staticmethod
    def render(products):
        print('#My Stock')
        for product in products:
            print('Product #{}: {}'.format(product.id, product))
```
### Implementing the Controller
 
### Implementing the View

###  Implementing the Model: CRUD Operations

> according to Wikipedia, [create, read, update, and delete](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) are the four basic functions of _persistent storage_.

We'll use SQLite for persisting data 
