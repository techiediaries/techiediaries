---
layout: post
title: "React Axios Tutorial"
image: "images/content/react.png"
excerpt: "" 
tags : [] 
---

Throughout this **React** with **Axios** tutorial, you'll learn by example how to use Django REST framework, React and Axios (a promise-based HTTP client) to send Ajax requests or make HTTP API calls (Post, Get, Put and Delete). We'll create a React CRUD example application that demonstrates the Axios API sent from a React front-end.
 
In nutshell, these are the steps we're going to follow throughout this tutorial:

- We'll clone our Django project, create a virtual environment and install packages
- We'll see how to install React
- We'll create a React project and React components 
- We'll add the Axios library
- We'll see how to send GET, POST, PUT and DELETE requests or API calls. 
 
## Setting Up the Django Back-End
 
We'll be using  a simple CRM API built with Django and Django REST framework. Since this is a React tutorial we'll not be focusing on building the RESTful API. Instead you can simply get the source code of the back-end from this [repository](https://github.com/techiediaries/django-crm). 

You can use the following commands to clone the back-end, create a virtual environment and start the development server:

```bash
$ git clone https://github.com/techiediaries/django-crm
$ cd django-crm

# Create a virtual environment and install packages
$ pipenv install

# Activate the virtual environment
$ pipenv shell 

# Create and migrate the database and run the local development server
$ python manage.py migrate
$ python manage.py runserver
```

You server will be running from `http://localhost:8000`.

We are using [pipenv](https://github.com/pypa/pipenv) so you'll need to have it installed.

## Installing React 

We need to install **create-react-app** using the following command: 

```bash
npm install -g create-react-app
```

You may need to add **sudo** depending on your npm configuration.
 
## Creating a New React Project

After installing **create-react-app**, you can use it to generate a new React application using the following command:

```bash
create-react-app frontend
```

You application will be running from `http://localhost:3000/`:

![](https://i.imgur.com/aTvnqYg.png)

## Adding React Components

## Adding Routing and Navigation


