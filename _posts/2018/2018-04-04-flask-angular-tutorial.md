---
layout: post
title: "Single Page Apps with Flask and Angular 4|5 Tutorial Series"
image: "images/content/flask.jpg"
excerpt: "In this tutorial series we'll be using Python, Flask, SQLAlchemy and Angular 5 to build a modern RESTful web application with an architecture that consists of a front-end application with Angular 5 and a back-end REST API using Flask." 
tags : [django , flask , python, angular , javascript] 
featured: true
author: kaima
---

In this tutorial series we'll be using Python, Flask, [SQLAlchemy](https://www.sqlalchemy.org) and Angular 5 to build a modern RESTful web application with an architecture that consists of a front-end application with Angular 5 and a back-end REST API using Flask.

The application we'll be building is a simple CRUD (Create, Read, Update and Delete) system for managing customers. This can be further extended to build a fully featured Customer Management System by implementing more use cases.

The first tutorial will cover how to set up both the back-end and front-end applications and how to install the necessary dependencies.
   
### Series Tutorials

- Introduction and Setting Up Flask and Angular (current tutorial)
- Using the SQLAlchemy ORM to Create Database Models
- Routing and Navigation with The Angular Router
- Angular State Management with ngrx 
- Integrating Angular with Flask
- Building a REST API with Flask
- Consuming The REST API with Angular **HttpClient**
- Adding JWT Authentication
- Getting Ready for Production and Deployment

Before we dive into the practical steps let's briefly go over the technologies we are going to use in this tutorial: 

[Flask](http://flask.pocoo.org/docs/0.12/quickstart/): a Python micro-framework for building web applications that's know to be light and scalable. Flask has many features such as:

- It's easy to setup and get started with 
- It's has an active community
- It has a good documentation
- It's lighter than Django and may constitute a good lightweight alternative to Django for many projects 
- It can be easily extended.

Angular 5 is the latest version of Angular, the most popular client side framework for building front-end applications with TypeScript. Angular is created, used and supported by Google.
 
[SQLAlchemy](https://www.sqlalchemy.org) is a Python ORM (Object Relational Mapper) and SQL toolkit that allows Python developers to use SQL-based databases (for data persistence and retrieval) without knowing or dealing with SQL but Python objects and methods instead.

## Setting Up Flask and Angular 

In this section we will learn how we can install both Flask and Angular to setup our development environment.

First of all, to complete this tutorial you will need:

- **Python 3** installed. You can install it from the [official website](https://www.python.org/downloads/)
- [**pipenv**](https://github.com/pypa/pipenv) for managing dependencies (`pip install pipenv`)
-  Optionally [**docker**](https://docs.docker.com/install/) for quickly setting up a database system. Otherwise just install **PostgreSQL** in your system since we'll need it to persist data (We'll use the **SQLAlchemy** ORM for data persistence so any database management system will work but just for the sake of following the exact instructions in this tutorial you'll need **PostgreSQL**)
- **Node.js** and **NPM** installed. You can install both of them from the [official website](https://nodejs.org/en/). Please note that the Angular CLI requires Node `6.9.0` or higher and NPM `3` or higher.

### Step 1—Creating the PostgreSQL Database

After installing Docker, you only need to run the following command in order to create a PostgreSQL database:

```bash
docker run --name crmdb \
    -p 5432:5432 \
    -e POSTGRES_DB=crmdb \
    -e POSTGRES_PASSWORD=p4ssw0rd \
    -d postgres
```

If you have PostgreSQL installed on your system and want to use it instead of docker run the following command:

```bash
createdb crmdb
```

### Step 2—Installing the Angular CLI

Now you need to install the [Angular CLI](https://github.com/angular/angular-cli) so head back to your terminal and run the following command:

```bash
npm install -g @angular/cli
```

You may need to add **sudo** before your command, depending on your npm configuration.

### Step 3—Bootstrapping the Flask Application

Now that we have set up the PostgreSQL database and the Angular CLI. Let's bootstrap the back-end application with Python and Flask.

First create necessary folders for your project using:

```bash
mkdir flask-crm
cd flask-crm
mkdir backend
``` 

Navigate back to the root of `flask-crm` then initialize a new Python 3 environment, using pipenv, that will be used to isolate the packages for our project from the system-wide packages.

```bash
pipenv --three
```

A `Pipfile` will be created in `flask-crm`.

You can now install the Python dependencies for our project i.e 

- flask: the package for the Flask framework
- marshmallow: the package for serialization and deserialization of JSON objects 
- sqlalchemy: the package for the SQLAlchemy ORM 
- and psycopg2-binary: the PostgreSQL driver for SQLAlchemy
 ORM

Head back to your terminal and run the following commands:

```bash
pipenv install flask marshmallow sqlalchemy psycopg2-binary
```

After installing the Python dependencies, let's create a Flask application

#### Creating a Basic Flask Application

Head back to your terminal, navigate inside the `backend` folder, create a `main.py` file then add the following code just to say hello with Flask

```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World!'
```

We first import the `Flask` class from the `flask` package, next we create an instance of that class (the `__name__` argument  refers to the application module so we passed to tell flask where to find the other application's files).

Next we create a simple Python function that simply retruns the string *Hello World!*. This function is decorated with `@app.route('/')` decorator which tells Flask to call this function and display its result when the user visits the `/` path or the home URL.

To run this application you need to run the following commands in your terminal:

```bash
pipenv shell
cd backend
export FLASK_APP=main.py
flask run
``` 

First we activate the virtual environment, navigate inside the `backend` folder then export **FLASK_APP** and run the application server (Exporting **FLASK_APP** tells flask what file to run, in our case it's the `main.py` file).

You application server will be running on `http://127.0.0.1:5000/`. If your visit this address with your web browser you will see a *Hello World!* displayed. 

After creating the basic back-end application let's create the front-end

### Step 4—Creating the Angular 5 Front-End Application

In the previous step we have installed the Angular CLI. Now let's use it to create a basic Angular 5 application. Head back to your terminal, make sure your are inside `flask-crm` folder then run the following command to generate the front-end and serve it:

```bash
ng new frontend
cd frontend
ng serve
```
Your application will be running on `http://localhost:4200/`.


## Conclusion

In this tutorial we have introduced the RESTful application that we are going to build throughout these series with Python, Flask and Angular 5. 

We have also installed the back-end and front-end dependencies, bootstrapped the Angular 5 application that will be used as the front-end of our application ( for consuming the REST API and providing the UI interface) and the Flask application that will take care of exposing the REST API endpoints  and connecting with the underlying PostgreSQL (or whatever SQL-based database management system you choose) database.

In the next tutorial you'll get introduced to the SQLAlchemy ORM
and we'll use it to create the database models for our back-end application so stay tunned!