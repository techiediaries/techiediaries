---
layout: post
title: "Adonis Tutorial — JWT Authentication"
image: "images/content/adonis.png"
excerpt: "In this tutorial, you’ll be using Adonis 4 to build a REST API web application with JWT authentication and database access." 
tags : [node , adonis]
---


In the previous [tutorial](https://www.techiediaries.com/adonis-tutorial-rest-api), you’ve created a CRUD REST API with Node and Adonis.js. Now, let’s implement JWT authentication to secure our RESTful API for from any unauthorized access.

JWT stands for JSON Web Tokens and it’s a way to exchange information between computer systems. It has been leveraged to authenticate users instead of using cookies and sessions.

A JWT token (also called access token) is generated on the server, upon a login request from a client—where it’s stored using the (browser’s) local storage. 

The stored access token is then retrieved and attached to every outgoing request to the server —which extracts it from the request’ `Authorization` header—and check if it’s valid before allowing access to any protected resource.  


## Prerequisites

Before starting with this tutorial, you need to have:


- A development environment with recent versions of Node and NPM installed,
- The Adonis CLI installed on your system,
- A basic knowledge of JavaScript,
- A working knowledge of Node and NPM,
- You have completed the previous [tutorial](https://www.techiediaries.com/adonis-tutorial-rest-api) and created a REST API project with the endpoints that you need to protect 


## Our REST APIs

In the previous tutorial, you’ve created the following routes for performing CRUD operations against a SQLite database that stores a set of contacts:


- PUT `/api/contacts/:id` for updating a contact by its `id`,
- DELETE `/api/contacts/:id` for deleting a contact by its `id`,
- GET`/api/contacts/:id` for getting a contact by its `id`,
- POST `/api/contacts` for creating a new contact,
- GET `/api/contacts` for fetching contacts.

 
 In a real world, scenario, you will often need to protect the endpoints for creating, updating and deleting contacts from your CRUD interface.  
 

## Setting up JWT Authentication in Adonis.js

Adonis.js has JWT support out of the box. You just need to change a setting in the `config/auth.js` file which instructs Adonis to use `jwt` as the `authenticator` instead of `session`:


    module.exports = {
      authenticator: 'jwt',


Authentication in Adonis is a combination of a serializer and a scheme with configuration settings  to define how to authenticate users.

You can use the `basic`, `session`, `jwt` and `api` schemes and the `lucid` and  `database` serializers. This is the default configuration for JWT in the `config/auth.js file`:


      jwt: {
        serializer: 'lucid',
        model: 'App/Models/User',
        scheme: 'jwt',
        uid: 'email',
        password: 'password',
        options: {
          secret: Env.get('APP_KEY')
        }
      },
## Creating the Authentication Controller

After setting the `jwt` authenticator in your project’s auth configuration, you next need to generate a controller for handling authentication. Head back to your terminal and run the following command:


    $ adonis make:controller --type http AuthController 
    √ create  app\Controllers\Http\AuthController.js

Next, open the `app\Controllers\Http\AuthController.js` file, you should find an empty controller class:


    'use strict'
    class AuthController {
    }
    module.exports = AuthController

We need to add the controller methods to register and login users. 

First, make sure you import the `User` model before defining `AuthController`:


    const User = use('App/Models/User');


## Adding the `register()` Method

Inside the `AuthController` class, add the following `register()` method that will be used for creating new users in the database:


    async register({request, auth, response}) {
            const username = request.input("username")
            const email = request.input("email")
            const password = request.input("password")
            
            let user = new User()
            user.username = username
            user.email = email
            user.password = password
            
            user = await user.save()
            let accessToken = await auth.generate(user)
            return response.json({"user": user, "access_token": accessToken})
    }
## Adding the `login()` Method

Next, let’s add the `login()` method:


    async login({request, auth, response}) {
            const email = request.input("email")
            const password = request.input("password");
            try {
              if (await auth.attempt(email, password)) {
                let user = await User.findBy('email', email)
                let accessToken = await auth.generate(user)
                return response.json({"user":user, "access_token": accessToken})
              }
    
            }
            catch (e) {
              return response.json({message: 'You first need to register!'})
            }
    }


## Adding the Authentication Routes

Open the `start/routes.js` file and add two routes that accept a POST request:


    Route.post('/auth/register', 'AuthController.register')
    Route.post('/auth/login', 'AuthController.login')



## Protecting the Routes with the Auth Middleware

Finally, you need to secure the routes using the `auth` middleware:


    Route.put('/api/contacts/:id', 'ContactController.update').middleware('auth')
    Route.delete('/api/contacts/id', 'ContactController.destroy').middleware('auth')
    Route.post('/api/contacts', 'ContactController.store').middleware('auth')
    Route.get('/api/contacts', 'ContactController.index')


## Conclusion

Throughout this tutorial series, you've created a REST API application with Node and Adonis. You also used JWT to add authentication in order to protect some endpoints for non logged in users. 