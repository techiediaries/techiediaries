---
layout: post
title: "Building Web Apps with Django ,Webpack and React "
image: "images/content/django-webpack-react.png"
excerpt: "How to build modern web apps with Django , Webpack and React" 
tags : [django , react , webpack ] 
---

{% include image.html 
    img="images/content/django-webpack-react.png" 
    title="Building Web Apps with Django ,Webpack and React  " 
%}



Throughout this tutorial we are going to learn how to use React JavaScript library and Webpack with Django to create modern 
web applications .

Webpack is a module bundler and a build tool that bundles JavaScript and other assets for better consuming by 
web browsers .

The aim of this tutorial is to show you the steps for using React with Webpack as the front end of your Django 
web applications .

So lets get started !

<h2>Create a virtual environment </h2>

Lets start by creating a virtual environment using virtualenv so open your terminal then run : 

    virtualenv myenv 

Next activate the environment with : 

    source myenv/bin/activate 

Next install Django using pip :

    pip install django 

Then create a django project :

    django-admin.py startproject django-react-demo 

To be able to install npm modules we need to create an npm module .This can be done by adding a package.json with some
information to a folder which marks the folder as an npm module .

<h2>Add package.json </h2>

Generate a package.json inside your project root folder using : 

    npm init

npm will ask you for some information ,enter them and hit Enter .

Now lets install the npm dependencies we need in our project 

<h2>Installing and setting up Webpack </h2>


    npm install webpack webpack-bundle-tracker babel babel-loader babel-core babel-preset-es2015  babel-preset-react --save-dev  
  
So we have installed webpack and webpack-bundle-tracker which tracks bundles and saves information in 
json file (webpack-stats.json)

After installing the required dependencies we need a config file for Webpack to tell it what to do .

Navigate inside your project root folder then run : 

    touch webpack.config.js

Then add this :

    var path = require("path")
    var webpack = require('webpack')
    var BundleTracker = require('webpack-bundle-tracker')

    module.exports = {
    context: __dirname,

    entry: './assets/js/index.js', 

    output: {
        path: path.resolve('./assets/bundles/'),
        filename: "[name]-[hash].js",
    },

    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
    ],

    module: {
        loaders: [
        { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
        { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    
        ],
    },

    }


entry: the entry file of the files to bundle.

output: the location of the bundled file to be saved.

loaders: plugins to call for each .js and jsx file ,in our case it's babel-loader .

We exclude files in node_modules .

plugins : contain Webpack plugins .In our case we add the bundles tracker we installed earlier.

Make sure you create the folders assets and js for our assets :

    mkdir -p assets/js 


<h2>Installing and setting up babel </h2>

Babel is a  Javascript compiler / transpiler that compiles ES6 to ES5 so we can use next JavaScript in actual 
browsers without worrying about current browser support .

label-loader is used to integrate babel in Webpack workfow .

Loaders are plugins used by Webpack to add functionality .


    npm install babel-loader babel-core babel-preset-es2015 babel-preset-react --save-dev

We installed babel , babel-core , babel-loader ,babel-preset-es2015  and babel-preset-react 

babel-preset-es2015  and babel-preset-react are presets or babel plugins to add compiling support for ES6 and React features.

Now lets create a babel configuration file :

Navigate to your project root folder then execute 

    touch .babelrc 

Then open it and add : 

    /* 
        ./.babelrc
    */  
    {
        "presets":[
            "es2015", "react"
        ]
    }        

This will enable Babel to compile ES6 and react 

Here is our project folder structure 

    PROJECT_ROOT/
    ├── manage.py
    ├── package.json
    │── webpack.config.js
    │── .babelrc.js
    │── webpack-stats.json 
    ├── node_modules/ 
    ├── assets/ 
    │   └── js/ 
    │   └── bundles/ 


<h2>Install React and create our React App</h2>

The next step is to install React and other dependencies :

    npm install --save-dev react react-dom 

Now lets create a simple React app to integrate it with Django as a front end .

in <em>assets/js/</em> create index.js 

    cd ./assets/js 
    touch index.js 

Then add :

    import React, { Component } from 'react';

    import ReactDOM from 'react-dom';



    class App extends React.Component {
    render() {
        return (
        <div style={{textAlign: 'center'}}>
            <h1>Helle Django + React = Awesomeness </h1>
        </div>);
    }
    }


    ReactDOM.render(<App />, document.getElementById('react-app'));
    

You can now test your setup to see of there is an error when running webpack .

In the root of your project run :

    ./node_modules/.bin/webpack --config webpack.config.js --watch

This will execute webpack in watch mode so whenever there are changes webpack will bundle and compile (with babel ) 
the files again .

<h2>Integration with Django </h2>

If you have no problem in running webpack and getting the bundle of your simple react app (in assets/bundles/) the 
next step would be integrating the bundle with Django .

Webpack with Babel take care of compiling and bundling our front end react app so Django has only to include 
the result bundle and serve the first page .

We are going to use a Django package to integrate Webpack seamlessly with Django 
    
    pip install django-webpack-loader

Django webpack loader consumes the output generated by webpack-bundle-tracker and lets you use the generated bundles in django.

Now lets configure django-webpack-loader in settings.py 

First add it to installed apps : 

    INSTALLED_APPS = [
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        'webpack_loader'
    ]

Then add a configuration object for webpack loader to tell it where to find bundles and where to find stats file 
generated by webpack-bundle-tracker


    WEBPACK_LOADER = {
        'DEFAULT': {
            'BUNDLE_DIR_NAME': 'bundles/',
            'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.json'),
        }
    }    

We need also to add our assets folder to staticfiles_dirs : 

    STATICFILES_DIRS = (
        os.path.join(BASE_DIR, 'assets'), 
    )

So we can access the bundle without running collectstatic in development mode .

The next thing is to create a Django view to serve the first page .

<h2>Create a Django App </h2>

First create a Django app called inventory for example 

    python manage.py startapp inventory 

Add it to installed apps in settings.py 


    INSTALLED_APPS = [
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        'webpack_loader',
        'inventory'
    ]

Next create a view function in inventory/views.py :

    from django.shortcuts import render

    def index(request):
        return render(request, 'inventory/index.html', {})


Then create a template in inventory/templates/inventory/ folder :

{% raw %}

    {% load render_bundle from webpack_loader %}
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>React with Django </title>
    </head>

    <body>
        <div id="react-app"></div>
        {% render_bundle 'main' %}
    </body>
    </html>
{% endraw %} 
render_bundle will render the proper <script> and <link> tags needed in your template.

You can also load each asset type separatley 

{% raw %}

    <html>
    <head>
        {% render_bundle 'main' 'css' %}
    </head>
    <body>
        ....
        {% render_bundle 'main' 'js' %}
    </body>
    </head> 

{% endraw %}

 You can find more information about django webpack loader [here](https://github.com/ezhome/django-webpack-loader)   
