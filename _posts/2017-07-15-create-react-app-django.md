---
layout: post
title: "Building a Modern App with Django and React"
image: "images/content/create-react-app-django.png"
excerpt: "How to build modern web apps with React, Django and Django Rest Framework" 
tags : [django , react, django-react] 
---
 
![Building Apps with React and Django](images/content/create-react-app-django.png)

React is a JavaScript library for building powerfull user interfaces. It's developed by Facebook and used by developers worldwide.    
Create React App is an npm tool to generate React apps without any build configurations for tools such as 
Webpack or Babel .That doesn't mean these tools are not used but they are just hidden so you can focus on building 
your React app instead of setting up build environments .

By issuing a few commands you can generate a React app and start building your next idea in time record but if you need
to integrate your app with a server framework such as Django in our case we still need to do little configuration so you 
can deploy your React app as a static front end  for your Django project .

In this How To tutorial we are going to see how to use Create React App with Django to create our Django app front 
end using React in both development and production environments .

Lets start by generating a Django project from scratch :

    $ virtualenv env 
    $ source env/bin/activate 
    $ pip install django
    $ django-admin.py startproject django-react-demo 
    $ cd django-react-demo   

<h2>Create some API endpoints with Django Rest Framework </h2>

Since the communication between React and Django happens over an API we need to create some Django API endpoints
for resting purposes .We are not going to reinvent the wheel here ,I have previously created a simple [product manager 
api with Django and Django Rest Framework](/tutorial-django-rest-framework-building-products-manager-api) so I'm goint to use it .You can also follow the tutorial to create your 
API endpoints .

<h2>Create React App </h2>

Next create the React app inside your Django project root folder 

    $ npm install -g create-react-app
    $ create-react-app frontend

Putting the React app inside Django root folder is not the end of the problem we still need to tackle these two 
issues :

How to seamlessly serve the React app with Django (as a front end ) ?

How to make React app talk to Django over some API endpoints ?

Solving these two issues depends on if we are in a development or a production environment.

So lets start by development environment 

<h2>Integrating React App with Django in development </h2>

In development you don't have any problem running two servers so you can Django and React local developent servers 
to run both apps 

Open a first terminal then run : 

    cd django-react-demo
    python manage.py runserver

Then open a second terminal and run : 

    cd ./frontend 
    npm start 


<h3>Sending GET api calls </h3>

First we are going to add a button to send a GET http request when clicked 

    import React, { Component } from 'react';
    import logo from './logo.svg';
    import './App.css';

    class App extends Component {
    render() {
        return (
        <div>
        <button type="button" onClick={this.onClick}>Send GET /products </button>
        </div>
        );
    }

    onClick(ev) {
        console.log("Sending a GET API Call !!!");
    }
            
    }

    export default App;
<h3>How to send http requests with React ? </h3>

Now how to send http requests ?

React doesn't have any built in support for sending http requests since it's only a view library not a complete 
framework so we are going to use axios : a library for sending http requests on the browser     

Lets start by installing it via npm : 

    npm install axios --save 

Next import it :

    import React, { Component } from 'react';
    import axios from 'axios';
    import logo from './logo.svg';
    import './App.css';

And then send a GET request when the button is clicked to <em>http://localhost:8000/products</em> endpoint : 

    onClick(ev) {
        console.log("Sending a GET API Call !!!");
        axios.get('http://localhost:8000/products')
        .then(res => {
                console.log(res.json())
        }).then(response => {
            console.log(JSON.stringify(response));
        })    
    }     

When you click on the button you should get a cross origin error in the browser console saying :

    XMLHttpRequest cannot load http://localhost:8000/products. 
    No 'Access-Control-Allow-Origin' header is present on the requested resource.
    Origin 'http://127.0.0.1:3000' is therefore not allowed access.

That's because we are making cross origin requests from http://localhost:3000 to http://localhost:8000 
which are not allowed by default on servers so how to solve this to be able to continue developing our React app 
without cross origin errors ?

<h3>Proxying requests </h3>

Simply add "proxy": "http://localhost:8000" to package.json to proxy requests from the React app local server (:3000) to Django
local server (:8000)

    {
    "name": "frontend",
    "version": "0.1.0",
    "private": true,
    "proxy": "http://localhost:8000", 
    "dependencies": {
        "axios": "^0.16.2",
        "react": "^15.6.1",
        "react-dom": "^15.6.1",
        "react-scripts": "1.0.10"
    },
    "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test --env=jsdom",
        "eject": "react-scripts eject"
    }
    }

But this works only if we are using relative urls for endpoints in our React app so change 

    axios.get('http://localhost:8000/products')

To 

    axios.get('/products')

If you run your app and click on send GET button you should get a response from the Django server with an array 
of products and other information .

In many cases absolute endpoints urls are used which makes this proxy useless so how to overcome this ?

We need to add CORS headers to our Django application 

<h2>Adding CORS headers to Django app </h2>

First start by installing django-cors-headers app with pip :

    pip install django-cors-headers

Add it to installed apps in settings.py :

    INSTALLED_APPS = (
        ...
        'corsheaders',
        ...
    )


Add 'corsheaders.middleware.CorsMiddleware' middleware : 

    MIDDLEWARE = [  
        ...
        'corsheaders.middleware.CorsMiddleware',
        'django.middleware.common.CommonMiddleware',
        ...
    ]
    
Then set CORS_ORIGIN_ALLOW_ALL to True in settings.py :

    CORS_ORIGIN_ALLOW_ALL = True     

See all available options [here](https://github.com/ottoyiu/django-cors-headers)

Now change your React app     

    onClick(ev) {
        console.log("Sending a GET API Call !!!");
        axios.get('http://127.0.0.1:8000/products')
        .then(res => {
                console.log(res);
        }).then(response => {
            console.log(JSON.stringify(response));
        })    
    }

That's all you can continue developing your web app using Django and React and when you are ready to deploy 
your app for production you need to change your strategy that's because running two servers in production is not 
a good approach for many reasons so lets see how to use Django and React in prodction environments :


<h2>Integrating React App with Django in production </h2>

First build your React app with :
    
    cd frontend
    npm run build 

The build files will be output in frontend/build folder 

    .
    ├── asset-manifest.json
    ├── favicon.ico
    ├── index.html
    ├── manifest.json
    ├── service-worker.js
    └── static
        ├── css
        │   ├── main.cacbacc7.css
        │   └── main.cacbacc7.css.map
        ├── js
        │   ├── main.cec8a28d.js
        │   └── main.cec8a28d.js.map
        └── media
            └── logo.5d5d9eef.svg


Now lets configure Django staticfiles to serve JavaScript and CSS from static folder in frontend/build 

    STATICFILES_DIRS = (
        os.path.join(os.path.join(BASE_DIR, 'frontend'), 'build', 'static')
    )
  

Now the next thing is to serve the React app index.html file available from <em>frontend/build/index.html</em>

So lets create a Django view for that :

Create a Django app if you have not created one yet then :

    python manage.py startapp inventory 

In <em>inventory/views.py</em> add: 

    from django.views.generic import View
    from django.http import HttpResponse
    from django.conf import settings
    import os 

    class ReactAppView(View):

        def get(self, request):
            try:
            
                with open(os.path.join(settings.REACT_APP, 'build', 'index.html')) as file:
                    return HttpResponse(file.read())
            
            except :
                return HttpResponse(
                    """
                    index.html not found ! build your React app !!
                    """,
                    status=501,
                )

Then in urls.py map this view with catch-all urlpattern 

    urlpatterns = [
        #...
        url(r'^',views.ReactAppView.as_view()),
    ]

Make sure to place any other urls or API endpoints before the catch all pattern so they can continue to work .

Conclusion 
------------------
------------------

We have seen how to create a React frontend for Django web apps using Create React App project generator and how to send 
http requests from React to Django .      

