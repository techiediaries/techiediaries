---
layout: post
title: "NativeScript Vue Tutorial"
image: "images/content/nativescript.png"
excerpt: "" 
tags : [] 
---

Throughout this NativeScript and Vue Tutorial you'll learn to build cross-platform mobile apps with NativeScript and Vue. We'll mainly build an Android application but thanks to NativeScript, your app can be also built for iOS without any code changes. You'll also see how to connect your application to a RESTful API back-end built using Python with Django.

## Getting the Back-End Code

In this tutorial, we'll focus on building the front-end mobile application with NativeScript and Vue, so you'll need to clone the back-end code for the RESTful API that will be consumed from the Android application.

You can get the code by running the following command:

```bash
$ git clone https://github.com/techiediaries/django-crm
$ cd django-crm
```

You can then create a virtual environment and install packages using [pipenv](https://github.com/pypa/pipenv): 

```bash
$ pipenv install
```

The next step is to activate the virtual environment using:

```bash
$ pipenv shell 
```

Finally, migrate the database and run the  development server using these commands:

```bash
$ python manage.py migrate
$ python manage.py runserver
```

You server will be running from `http://localhost:8000`. 

## Introducing NativeScript

## Requirements

To follow this tutorial, step by step, you'll need to have a few requirements:
 
-   Latest version of Node.js 
-   NativeScript CLI
-   Development machine with Java 8 and Android Studio

### Installing Node.js

### Installing NativeScript CLI

```bash
npm install -g nativescript
```


### Setting Up Your Development Machine

For this tutorial, we'll be building our mobile application mainly for Android (Although you can also build it for iOS in a MAC) so you need to have a development machine ready with Java 8 and Android Studio installed. You can refer to this guide if you are using Ubuntu. Otherwise you can easily find how to install these requirements for your operating system.   

