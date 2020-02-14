---
layout: post
title: "Angular 9/8 Tutorial: Building and Submitting an Authentication Form (ngModel/ngForm/ngSubmit)"
image: "images/content/angular-httpclient.png"
excerpt: "In this tutorial, we'll learn to use the template-driven approach in Angular 7/8 to work with forms. We'll learn about the NgForm, ngModel and ngSubmit and how to create an authentication system with Node and Express.js" 
tags : [angular, angular8, angular-9-form-examples, angular-9-fullstack-examples, angular-9-tutorials] 
---

In this tutorial, we'll learn to use the template-driven approach in Angular 9/8 to work with forms. We'll learn about the `NgForm`, `ngModel` and `ngSubmit` directives which are the essential concepts in template-based forms and how to create an authentication system with Node and Express.js

> **Note**: This tutorial also works with Angular 7 and 8.

## Why Using Forms in Angular 9?
 
Forms and authentication are common features in every Angular app or generally any web application. A form is used to collect and submit information to web servers which will usually be persisted in a database while authentication is used to verify the identity of users before allowing them to access protected resources on the server. 

## Creating Forms in Angular 9 by Example

In this tutorial, you will create an Angular 9 application with two forms that send user information to a RESTful server to save it in the database (registration) and then allow users to authenticate themselves. You'll create a login and register components with two forms to register and login users. 

Since Angular is only for the front-end, we'll also need a back-end server. We'll quickly create a server with Node and Express.js that exposes two endpoints for registering and authenticating users.
 
## Prerequisites

You will need a few requirements for this tutorial:

- Node.js and NPM. head over to their [official website](https://www.nodejs.org) and grab the binaries for your system.
-   The latest version of Angular CLI v7 installed (`npm install -g @angular/cli`).

## Creating and Setting up The Node and Express.js Authentication Server

Let's get started with our first step. Open a terminal, create a folder for both the frontend and backend applications:

```bash
$ mkdir angular-auth-forms-demo
```

Next, navigate inside it and create a backend folder:

```bash
$ cd angular-auth-forms-demo
$ mkdir backend
$ cd backend
```

Next, create a Node.js module by running the following command:

```bash
$ npm init -y
```

This will create `package.json` file with default values which you can change later if you want. Now, run the following commands to install the dependencies:

```bash
$ npm install --save express body-parser sqlite3 bcryptjs jsonwebtoken cors
```

This will install express.js and a bunch of other modules such as `sqlite3` for working with a SQLite database and `jsonwebtoken` for working witj JSON web tokens or JWTs.

> **Note**: As the time of this writing the following pages and versions will be installed:
>cors v2.8.5
>body-parser v1.18.3
>sqlite3 v4.0.6
>bcryptjs v2.4.3
>express v4.16.4
>jsonwebtoken v8.4.0

Next, create an `index.js` file and add:

```js
"use strict";
const  express  =  require('express');
const  bodyParser  =  require('body-parser');
const cors = require('cors')

const  sqlite3  =  require('sqlite3').verbose();
const  jwt  =  require('jsonwebtoken');
const  bcrypt  =  require('bcryptjs');

const SECRET_KEY = "secretkey23456";

const  app  =  express();
const  router  =  express.Router();
app.use(cors())
router.use(bodyParser.urlencoded({ extended:  false }));
router.use(bodyParser.json());
const database = new sqlite3.Database("./my.db");

const  createUsersTable  = () => {
    const  sqlQuery  =  `
        CREATE TABLE IF NOT EXISTS users (
        id integer PRIMARY KEY,
        name text,
        email text UNIQUE,
        password text)`;

    return  database.run(sqlQuery);
}

const  findUserByEmail  = (email, cb) => {
    return  database.get(`SELECT * FROM users WHERE email = ?`,[email], (err, row) => {
            cb(err, row)
    });
}

const  createUser  = (user, cb) => {
    return  database.run('INSERT INTO users (name, email, password) VALUES (?,?,?)',user, (err) => {
        cb(err)
    });
}

createUsersTable();

router.get('/', (req, res) => {
    res.status(200).send('This is an authentication server');
});

router.post('/register', (req, res) => {

    const  name  =  req.body.name;
    const  email  =  req.body.email;
    console.log(req.body);
    const  password  =  bcrypt.hashSync(req.body.password);

    createUser([name, email, password], (err)=>{
        if(err) return  res.status(500).send("Server error!");
        findUserByEmail(email, (err, user)=>{
            if (err) return  res.status(500).send('Server error!');  
            const  expiresIn  =  24  *  60  *  60;
            const  accessToken  =  jwt.sign({ id:  user.id }, SECRET_KEY, {
                expiresIn:  expiresIn
            });
            res.status(200).send({ "user":  user, "access_token":  accessToken, "expires_in":  expiresIn          
            });
        });
    });
});


router.post('/login', (req, res) => {
    const  email  =  req.body.email;
    const  password  =  req.body.password;
    findUserByEmail(email, (err, user)=>{
        if (err) return  res.status(500).send('Server error!');
        if (!user) return  res.status(404).send('User not found!');
        const  result  =  bcrypt.compareSync(password, user.password);
        if(!result) return  res.status(401).send('Password not valid!');

        const  expiresIn  =  24  *  60  *  60;
        const  accessToken  =  jwt.sign({ id:  user.id }, SECRET_KEY, {
            expiresIn:  expiresIn
        });
        res.status(200).send({ "user":  user, "access_token":  accessToken, "expires_in":  expiresIn});
    });
});

app.use(router);
const  port  =  process.env.PORT  ||  3000;
const  server  =  app.listen(port, () => {
    console.log('Server listening at http://localhost:'  +  port);
}); 
```
 
We are not going to explain this code here because it's thoroughly detailed in a previous tutorial. If you want to understand how the code above works, you can first read [Node Express JWT Authentication — jsonwebtoken and bcryptjs](https://www.techiediaries.com/node-express-jwt-authentication/).
 
 Next, add a `start` script in `package.json`:

```json
"scripts": {
	"start": "node index.js"
},
```

This script will allow you to run your Express.js server from the terminal using this command:

```bash
$ npm start
```

Your server will be served from `http://localhost:3000`. Since our server exposes a GET route, you can visit it with your web browser. You should see a blank page with the **This is an authentication server** message. That means your authentication server is working! 

You can also use a REST API client like Postman or cURL to send POST requests to the `/register` and `/login` endpoints to create in the SQLite database and authenticate users before we create the Angular 9 UI. 

For example, this is how you send a POST request with cURL:

```bash
 curl -H "Content-Type: application/json" -d '{"email":"user@email.com","name":"user", "password":"password"}' http://localhost:3000/register
```
 
 You can then send another POST request to authenticate the user you just created:
 
```bash
 curl -H "Content-Type: application/json" -d '{"email":"user@email.com", "password":"password"}' http://localhost:3000/login
```

If the POST requests are successful you should get a JSON object with your user information, the access token and the expiration date otherwise you will get an error with a status code.

That's it for the server part! You should leave this terminal open with your server running and let's start creating the Angular 9 application.

## Creating the Angular 9 Application

Open a new terminal and navigate to your project's folder then run the following command to generate the frontend project using Angular CLI 7:

```bash
$ ng new frontend
```

You will be propmted if **Would you like to add Angular routing?** Enter **y**. And **Which stylesheet format would you like to use?** Select **CSS**.

You can start the development server using:

```bash
$ ng serve
```

You can access your application from `http://localhost:4200` in your preferred web browser. You will be presented with the following page:

## Creating an Angular 9 Module

We'll add the code for this tutorial in its own Angular module which will encapsulate authentication. Head back to your terminal and run the following command:

```bash
$ ng generate module auth --routing
``` 

This will create a module called `auth` with routing (thanks to the `--routing` switch). Two  `src/app/auth/auth-routing.module.ts` (the routing module for the `auth` module) and `src/app/auth/auth.module.ts` files will be created. 

## Generating Angular 9 Components

Next, we'll generate two components for the login and registration inside the `auth` module. In your terminal, run the following command:

```bash
$ ng generate component auth/register
$ ng generate component auth/login
```

You see that we prefixed the names of the components with the `auth/` path which tells the CLI to generate them inside the `auth` module.

The components will be automatically imported and declared in the `auth` module. This is the content of the `src/app/auth/auth.module.ts` file:

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
```
 
## Adding Angular Routing

The next step is to add routing between the different components of our application.  Open the `src/app/auth/auth-routing.module.ts` file and update as follows:

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
```

We first import the `RegisterComponent` and `LoginComponent`  components from their corresponding paths and add two routes in the `routes` array which is passed to Router with the `forChild()` method. 

Since this is a child module we also need to add a route in the root routing module of the application so open the `src/app/app-routing.module.ts` file and add the following route to the `routes` array that's passed to the `forRoot()` method:

```ts
const  routes:  Routes  = [
	{path:  'auth', loadChildren:  './auth/auth.module#AuthModule'}
];
```

We use the `loadChildren` property of the route which takes the path of the `auth` module. 

Since we use the `auth` path, all components of the `auth` module will be available under the `/auth` path i.e the `/auth/register` and `/auth/login` routes.

## Styling the UI 

For styling the UI we'll be inspired from this [codepen](https://codepen.io/tezjnr/pen/wWvVVB).
 
Now that we have added routing, let's build the UI of our application. Let's start with main application component where the router outlet exists i.e the shell of the application. Open the `src/app/app.component.html`, remove everything except the router outlet:

```html
<router-outlet></router-outlet>
```

Open the `src/styles.css` file and add:

```css
@import url('https://netdna.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.css');
@import url(https://fonts.googleapis.com/css?family=Lato:400,300,700);

html {
   height: 100%;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100%;
    font-family: 'lato', sans-serif;
    color: #fff;
    background: rgb(10, 113, 182); 
}
``` 

## Setting up Angular Forms 

Angular provides two ways for working with forms, the template-based forms and reactive forms. In this example, we'll be using template-based forms by including the `FormsModule` and by using directives such `ngModel` for data binding.

Open the `src/app/auth/auth.module.ts` file and import the `FormsModule` then add it in the `imports` array of the module:

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
```

## Creating the Registration Form: Using Template-based Forms with the `ngModel`, `ngForm` and `ngSubmit` Directives

In this section, we'll use Angular directives such as `ngModel`, `ngForm` and `ngSubmit` to create a template-based form for registering users.

Open the `src/app/auth/register/register.component.html` file and add an HTML form for submitting the name, email and password of the user:

```html
<div class="container">
    <div class="logo">Create a new account!</div>
    <div class="register-item">
      <form #myform="ngForm" (ngSubmit)="register(myform)" class="form form-register">

        <div class="form-field">
              <label class="user" for="register-username"><span class="hidden">Name</span></label>
              <input name="name" id="register-username" type="email" class="form-input" placeholder="Name" ngModel required>
        </div>
        <div class="form-field">
          <label class="user" for="register-email"><span class="hidden">Email</span></label>
          <input name="email" id="register-email" type="email" class="form-input" placeholder="Email" ngModel required>
        </div>

        <div class="form-field">
          <label class="lock" for="register-password"><span class="hidden">Password</span></label>
          <input name="password" id="register-password" type="password" class="form-input" placeholder="Password" ngModel required>
        </div>

        <div class="form-field">
          <input type="submit" value="Register">
        </div>
      </form>
    </div>
</div>
```


-   For each  `input`  control, we use the `ngModel` directive by itself to register the control as a child  of the form.
-  For each input, we add a  `name`  attribute to the  `input`  control. This is required when using template-based forms and the `ngModel`  directive.
-   We declare a template variable for the form using  the `#myform="ngForm"` syntax. The variable  `myform`  becomes a reference to the  `NgForm`  instance which contains all the controls of the form.


This how Angular docs describes the [NgModel](https://angular.io/api/forms/NgModel):

>It creates a `[FormControl](https://angular.io/api/forms/FormControl)` instance from a domain model and binds it to a form control element.
>The  `FormControl`  instance tracks the value, user interaction, and validation status of the control and keeps the view synced with the model. If used within a parent form, the directive also registers itself with the form as a child control.
>This directive is used by itself or as part of a larger form. Use the  `[ngModel](https://angular.io/api/forms/NgModel)`  selector to activate it.

For the [NgForm](https://angular.io/api/forms/NgForm) directive:

>It creates a top-level `[FormGroup](https://angular.io/api/forms/FormGroup)` instance and binds it to a form to track aggregate form value and validation status. 
>
>As soon as you import the  `[FormsModule](https://angular.io/api/forms/FormsModule)`, this directive becomes active by default on all  `<form>`  tags. You don't need to add a special selector.
>
>You optionally export the directive into a local template variable using  `[ngForm](https://angular.io/api/forms/NgForm)`  as the key (ex:  `#myForm="[ngForm](https://angular.io/api/forms/NgForm)"`).
 
Next, you need to define the `register(myform)` method that you passed in to the `ngSubmit` event of the form. Open the `src/app/auth/register/register.component.ts` file and add:

```ts
register(form) {
	console.log(form.value);
}
``` 

We listen to the form `ngSubmit` event so when the user makes a form submission we execute the `register(form)` method which takes a reference to the `NgForm` instance that was submitted.

We use the `value` attribute of `NgForm` to read the values of the form.

Now, if you fill your form and click on the register button you should see the values of the form printed on your browser's console as a JSON object.

Check out how we submit the form content to the Express.js authentication server with `HttpClient` POST request in this tutorial: [Using Angular HttpClient with Node & Express.js -- Example POST Request](). 

Open the `src/app/auth/register/register.component.css` file and add the following styles:

<script src="https://gist.github.com/techiediaries/581a725d3bc7e4d97acad6ffde1896c9.js"></script>

This is the screenshot of our register page:

![Angular 9 form| Register component](https://www.diigo.com/file/image/bbccosoazescdcpoqezdqdabbdo/Frontend.jpg)

## Creating the Login Form: Using Template-based Forms with the `ngModel`, `ngForm` and `ngSubmit` Directives

In the same way we created the registration form we use the `ngModel`, `ngForm` and `ngSubmit` directives to create the login form. 

First, open the `src/app/auth/login/login.component.html` file and add an HTML form for submitting the user's email and password:

```html
<div class="container">
    <div class="logo">Login</div>
    <div class="login-item">
      <form #myform="ngForm" (ngSubmit)="login(myform)" class="form form-login">
        <div class="form-field">
          <label class="user" for="login-email"><span class="hidden">Email</span></label>
          <input name="email" id="login-email" type="email" class="form-input" placeholder="Email" required ngModel>
        </div>

        <div class="form-field">
          <label class="lock" for="login-password"><span class="hidden">Password</span></label>
          <input name="password" id="login-password" type="password" class="form-input" placeholder="Password" required ngModel>
        </div>

        <div class="form-field">
          <input type="submit" value="Log in">
        </div>
      </form>
    </div>
</div>
``` 

Let's explain what we've done:

- When we import the `FormsModule`, an `NgForm` instance is automatically created for our form. We use the `#myform="ngForm"` to create a `myform` reference to the instance that we can use to work with the form. For example to get the form's values once it's submitted. 
- We add an `ngModel` directive to the `<input>` tags to add them to the `NgForm` instance corresponding to our login form. The tag should have a `name` property for this to properly work.
- We use the `ngSubmit` event to bind a `login(myform)` method to the form's submission event. The `login()` method takes the reference to the form's `NgForm` instance.

Next, open the `src/app/auth/login/login.component.ts` file and add the `login()` method:

```ts
login(form){
	console.log(form.value);
}
```

In this method we simply use the value attribute of the passed `NgForm` to print the values of our login form in the console.

Check out this tutorial for how to send a POST request with `HttpClient` to the authentication server created with Node and Express.js: [Using Angular HttpClient with Node & Express.js -- Example POST Request](). 
  
Next, let's add some CSS styles. open the `src/app/login/login.component.css` file and add:

<script src="https://gist.github.com/techiediaries/f69d726ac192346274a7127af690e3bd.js"></script>

This is a screenshot of the login page:

![Angular 9 form - login example](https://www.diigo.com/file/image/bbccosoazescdcsdadzdqdabdbr/Frontend.jpg)


If you fill the login form and click on the login button, you should see the form values displayed on the console.

## Conclusion

In this tutorial, we've created two login and register forms that will be used to send authentication details to a Node and Express.js authentication server.

We've seen how to use the template-driven approach in Angular 9 to work with forms. We've seen how we can get a reference to the `NgForm` instance of a form which is created automatically by Angular when you import `FormsModule` in your project.  And how to use `ngModel` to register individual form tags with the `NgForm` instance of the HTML form and finally how we submit the form using the `ngSubmit` event and how to access the form values inside the bound method.

In the next tutorial titled [Using Angular HttpClient with Node & Express.js -- Example POST Request](), we'll see how to submit the form content to the Express.js authentication server with `HttpClient` POST request  

