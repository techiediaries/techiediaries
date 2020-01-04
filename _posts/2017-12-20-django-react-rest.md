---
layout: post
title: "Django React Tutorial with Example Demo"
image: "images/content/django2.jpg"
excerpt: "In this tutorial we'll look at how to build a modern CRUD web application using Django and React. We'll use Django REST Framework to build an example API, react-router-dom for routing the front-end app, Axios for making HTTP calls to the Rest API endpoints, Redux for managing the app's global state and finally Webpack to bundle the assets" 
tags : [django , react , python] 
---


**Django React tutorial will teach you to build a modern (SPA: Single Page Application) CRUD web application using Django and React.js (instead of Django built-in templates engine). We'll use *Django REST Framework* to build an example API, *React Router 4* for routing the front-end app, *Axios* for making HTTP calls (GET, POST, PUT and DELETE etc.) to the Rest API endpoints, *Redux* for managing the app's global state and finally Webpack to bundle the assets**

**This tutorial will cover how to serve the React app using the Django server and how to allow the React app to communicate with the Django server over its Rest API endpoints**

**Note: This tutorial is updated to use Pipenv**.

![Django React Tutorial](https://i.imgur.com/BcaUv5R.png)

When building a modern web application with tools such as Django and React, React will take care of rendering the view layer of your app and Django will be used for communicating with the database and exposing a CRUD REST API. You can have completly separate front-end and back-end or you can also make Django serve the first page where the React app will be mounted (we'll follow this second approach in this tutorial). 

The communication between React and Django will be made using HTTP/Ajax requests to the rest API endpoints (we'll use **Axios** but you can also use the modern browser's **fetch** API or even the old **XMLHttpRequest** interface or a wrapper library around it).

We'll use modern front-end tools such as **Webpack** and **Babel** for transpiling (compiling from JavaScript 2015 to JavaScript 5) and bundling React source code into one single bundle. Don't worry though, we'll be using **create-react-app**, an official React CLI-based tool that allows you to generate and locally serve React projects (among other features) without going through the hassle of Webpack configuration or any complex JavaScript configuration.

In the back-end we'll create a simple Django API with Django REST Framework.

In the front-end we'll consume the API (with Axios) to fetch data and then render it. We'll also add routing using the React router version 4 and Redux for managing the global state of the application. 

## Setting Up the Development Environment 

This tutorial assumes you have a development environment with [Python](https://www.python.org/downloads/) and [NodeJS](https://nodejs.org/en/) installed. You can find the binaries and the instructions to install on both platforms in their corresponding official websites. 

It's recommended that you use python *virtualenv*. A tool that allows you to create isolated virtual environments for Python packages so you can install and use different versions of the same library (for different projects) and avoid any conflicts. You can install *virtualenv* using the [virtualenvwrapper](https://virtualenvwrapper.readthedocs.io/en/latest/).

## Installing Django 

First, let's start by creating and activating a new virtual environment for our project dependencies:

```sh
virtualenv myenv
source myenv/bin/activate
```
Next you'll need to install Django using the *pip* package manager:

```sh
pip install django
```

## Creating a Django Project

After installing Django, you'll be able to create a Django project using *django-admin* 

```sh
django-admin startproject django-react-app
```

If you migrate your database and serve your app, at this point, with:

```sh
python manage.py migrate
python manage.py runserver
```

You should have the famous *It Worked!* welcome page when you navigate with your web browser to `http://127.0.0.1:8000`.

If everything works as expected. The next step it to integrate Django REST Framework and React.



## Tracking the Generated Webpack Bundles

Webpack generates the bundles for your app with hashed filenames so we need a way to track these filenames automatically without having to manually change your template to include the correct filenames, particularly in the development phase where they frequently change. 

[webpack-bundle-tracker](https://github.com/ezhome/webpack-bundle-tracker) is a Webpack plugin that outputs a JSON file (`webpack-stats.json`) containing the information we are looking for i.e the names of the bundles.

So head back to your terminal or command line, navigate inside your React project then run the following command to install *webpack-bundle-tracker*:

```bash
npm install webpack-bundle-tracker --save-dev
```

Next you need to eject the Webpack configuration files so you can include the plugin to your configuration with:

```
npm run eject
```

![](https://screenshots.firefoxusercontent.com/images/a499f1ca-0f23-4099-8e1a-28eff865d724.png)

You'll have a *config* folder with different configuration files for development and production

## Creating the Front-end with React

By issuing a few commands you can generate a React app and start building your next app without going through any Webpack configuration. 

Next create the React app inside your Django project root folder 

```sh
npm install -g create-react-app
create-react-app frontend
```

If the command fails you can try with **sudo** to execute the install command with the super user priviliges.

You can start the application with:

```bash
npm run start
```

This will start the Webpack development server which serves your app locally with hot loading i.e when you change anything in the source code the server reloads your app automatically.


Open `config/webpack.config.dev.js` then add:

```js
var BundleTracker  = require('webpack-bundle-tracker');
module.exports = {
    
    plugins: [
          new BundleTracker({path: "../", filename: 'webpack-stats.json'}),
    ]
}
```

This will import the bundle tracker plugin and add it to the list of Webpack plugins. We set the *path* to `../` to point to the root folder of your Django project and the *filename* to `webpack-stats.json`.

Next open `config/webpack.config.prod.js` then add:

```js
var BundleTracker  = require('webpack-bundle-tracker');
module.exports = {
    
    plugins: [
          new BundleTracker({path: "../", filename: 'webpack-stats.json'}),
    ]
}
```

This will setup the bundle tracker to generate a file named `webpack-stats.json` for the bundles information in production.


## Create a REST API with Django Rest Framework 


>Django REST framework is a powerful and flexible toolkit for building Web APIs.
>Some reasons you might want to use REST framework:
>The Web browsable API is a huge usability win for your developers.
Authentication policies including packages for OAuth1a and OAuth2.
Serialization that supports both ORM and non-ORM data sources.
Customizable all the way down - just use regular function-based views if you don't need the more powerful features.
Extensive documentation, and great community support.
Used and trusted by internationally recognised companies including Mozilla, Red Hat, Heroku, and Eventbrite. --[http://www.django-rest-framework.org/](http://www.django-rest-framework.org/)

Since the communication between React and Django happens over an API we'll need to create a Django API using the Django Rest Framework. But let's start with the development environment 

## Create a Django Template for Serving the React Front-end

Let's first create the Django template (and its related route and view) where we are going to mount the React app. We need to create a template in `templates/main.html` after making sure you have configured Django to find your template files. 

In project's `settings.py`, under **TEMPLATES** array add:

```python
TEMPLATES = [
    {
        # ... 
        'DIRS': [os.path.join(BASE_DIR, "templates"), ],
        # ... 
    },
]
```

Next let's put some content in the template: 


```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Django + React CRUD</title>
  </head>
  <body>
    <div id="root">
     This is where React will be mounted
    </div>

  </body>
</html>
```

Once you have done that. Go ahead and create a view and an URL to render the template. Open your project's `urls.py` file then wire this template to the main URL of your app i.e `'^'` using the generic *TemplateView* class:

```python
from django.conf.urls import url
from django.contrib import admin
from django.views.generic import TemplateView

urlpatterns = [
    ##
    url(r'^', TemplateView.as_view(template_name="main.html")),
    ##
]
```


## Integrating Django with React

To integrate the Django and the React applications we need to serve the front-end (i.e the React app) using the Django server. The process is simple but we have one problem though! Webpack generates the React bundles dynamically and with hashed filenames so we'll need to use [`django-webpack-loader`](https://github.com/ezhome/django-webpack-loader)--a django application which injects the dynamically generated bundles using the `<script>` and `<link>` tags into the Django templates. Using the Webpack loader Django will be able to know which bundle to load in the template.

You'll first need to install the application with pip:

```bash
pip install django-webpack-loader
```

Next you need to add the application (*webpack_loader*) into **INSTALLED_APPS** in your project' `settings.py` file:

Then add the Webpack loader configuration object in `settings.py`

```python
WEBPACK_LOADER = {
    'DEFAULT': {
            'BUNDLE_DIR_NAME': 'bundles/',
            'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.json'),
        }
}
```

Now you need to change tha main template by adding the following changes:


```html

{ % load render_bundle from webpack_loader % }

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Django + React CRUD</title>
  </head>
  <body>
    <div id="root">
     This is where React will be mounted
    </div>
    { % render_bundle 'main' % }
  </body>
</html>
```
The `render_bundle` tag takes 'main' as an argument and renders the script tag for the main bundle.


Open your React `src/App.js` file then add these changes:

```html
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Django</h1>
        </header>
        <p className="App-intro">
            A React app with a Django backend
        </p>
      </div>
    );
  }
}

export default App;
```

Now you need to start your Webpack server and your Django local development server then navigate to  [http://localhost:8000/]( http://localhost:8000/) with your wen browser. You should be able to see the React app running at this address.

## Fixing Webpack Hot Reloading

Since we have served the Webpack bundle from the Django server the Webpack dev server will not be able to send XHR requests to React URLs to reload when source files change. So open `config/webpackDevServer.config.js` then add the following setting:

```js
headers: {
  'Access-Control-Allow-Origin': '*'
},
```

This tells the Webpack server to accept requests from all origins including `http://localhost:8000`.

Also make sure to set *publicPath* and *publicUrl* to `'http://localhost:3000'` in `config/webpack.config.dev.js`.


That's all you need to do to integrate React and Django for the approach we have followed. In the next tutorial we'll add React routing using *react-router-dom*  then we'll see how to use Redux to manage the app global state. Meanwhile if you have any problems integrating React with Django feel free to post a comment below and I will be glad to help you!

## Conclusion 


We have seen how to create a React front-end for Django web apps using the *Create React App* project generator and how to send http requests from React to Django.      

