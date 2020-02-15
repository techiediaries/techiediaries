---
layout: post
title: "Ionic 5/Angular JWT Authentication Tutorial: Node & Express.js Server"
image: "images/content/angular-httpclient.png"
excerpt: "In this tutorial, we'll learn to implement JWT authentication with Ionic 5, Angular and Express.js" 
categories: ionic
date: 2020-02-13
tags : [ionic, ionic-5, angular-9-httpclient-examples] 
---

Ionic 5 is the latest version of Ionic. In this tutorial, we'll be learning how to use Ionic 5 and Angular 7 to build a login & registration module for authenticating users. We'll learn about using Angular modules, services, forms (via `FormsModule`) and HTTP (via `HttpClient`) among other features.

We'll learn how to use `HttpClient` to send POST requests to a back-end authentication server created with Node and Express.js and the `BehaviorSubject` type of RxJS Observable to track the authentication state.

We'll learn how to use the Ionic Storage module for persisting JWT information returned from our Express.js server such as the access token and the expiration date.

Before your proceed, you need to make sure you have Node.js and NPM installed on your development machine. You should be able to install them by downloading the binaries for your system from the [official website](https://www.nodejs.org).

Now, let's get started!

## Setting up Ionic CLI 5

Our first step is installing the Ionic CLI 5. Open your terminal and run this command:

```bash
$ npm install -g ionic
```

This will install the ionic package globally on your system. If you get any permission errors simply use `sudo` before your command. If you are in Windows, use a CMD prompt with administrator access.

## Creating an Ionic 5 Project

Let's now proceed by creating an Ionic 5 project. Head back to your terminal and run the following command:

```bash
$ ionic start ionic-auth-demo blank --type=angular   
```
We use the `--type` to specify the type of the framework we want to use with Ionic. Starting with v4, Ionic is only a mobile UI library that can be used on top of Angular, Vue and React or simply plain JavaScript to build hybrid mobile apps or progressive web apps.

We use the `blank` template for generating a project which comes with one page called home.

A couple of questions will be asked by the CLI such as if you want to install Cordova and if you want to **Install the free Ionic Appflow SDK and connect your app?**. Answer those questions as you prefer because this won't affect our next steps in this tutorial.

Wait for the dependencies to be installed then navigate in your project's root folder and serve your application using these commands:

```bash
$ cd ionic-auth-demo 
$ ionic serve
```

You can access your mobile application using your web browser from the `localhost:8100` address.

## Creating an Angular Module

Modules are used to organize your application code. For the authentication feature in our application we'll create a module that encapsulates the service and pages that handle user authentication. In your terminal, run:

```bash
$ ionic generate module auth
```

The `src/app/auth/auth.module.ts` file will be created with the basic code for a module:

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
```

Our `auth` module only imports the [`CommonModule`](https://angular.io/api/common/CommonModule) which is a built in Angular module that exports all the basic Angular directives and pipes, such as `[NgIf](https://angular.io/api/common/NgIf)`, `[NgForOf](https://angular.io/api/common/NgForOf)`, `[DecimalPipe](https://angular.io/api/common/DecimalPipe)`, and so on.

You need to import the `auth` module in the root application module of our Ionic 5 application. Open the `src/app/app.module.ts` file and import `AuthModule` then add it to the `imports` array:

```ts
import { AuthModule } from  './auth/auth.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AuthModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

Let's import other modules that are necessary for our application such as `HttpClient` for sending HTTP requests, `FormsModule` for working with forms and Ionic Storage module for working with local storage in Ionic apps.

### Importing HttpClient

`HttpClient` is the official http client of Angular so we need to import it in our Ionic/Angular project. Open the `src/app/auth/auth.module.ts` file and import `HttpClientModule`:

```ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class AuthModule { }
```

That's all we need to import `HttpClient` in our authentication module.

### Setting up Forms

Angular provides powerful APIs for working with forms either through the template-based forms or reactive forms. In this tutorial, we'll use template-based forms so we need to import `FormsModule` in our main application module. In the same `src/app/auth/auth.module.ts` file:

```ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ]
})
export class AuthModule { }
``` 

### Setting up Ionic Storage Module

The Ionic team provides the Ionic Storage module that can be used to work with the browser's local storage in mobile devices but before we can use it in our application, we need to install it from npm and import it in our authentication module. Head back to your terminal and run the following command:

```bash
$ npm install --save @ionic/storage
```

As of this writing, `ionic/storage v2.2.0` will be installed on your project.

Next, include `IonicStorageModule.forRoot()` in the `imports` array:

```ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    IonicStorageModule.forRoot()
  ]
})
export class AuthModule { }
```

## Creating the Angular Authentication Service

After setting up the necessary modules for our project, let's now create an authentication service that encapsulates communication with the Express server via `HttpClient`. In your terminal, run:

```bash
$ ionic generate interface auth/user
```

This will generate a user interface in the `src/app/auth/user.ts` file. Open the file and update it accordingly:

```ts
export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}
```

> **Note**: We prefixed the interface name by `auth/` to tell the CLI to generate it inside the `auth` module.

Also, you need to generate an interface for the server response:

```bash
$ ionic generate interface auth/auth-response
```

Open the `src/app/auth/auth-response.ts` file and update it accordingly:

```ts
export interface AuthResponse {
    user: {
        id: number,
        name: string,
        email: string,
        access_token: string,
        expires_in: number
    }
}
```

This corresponds to the response that will be returned from the authentication server that we'll be creating in the next section with Node and Express.js.

Next, generate the service using:

```bash
$ ionic generate service auth/auth
```

Two `src/app/auth/auth.service.ts` and `src/app/auth/auth.service.spec.ts`  (tests) files will be generated.

> **Note**: We prefixed the service name by `auth/` to tell the CLI to generate it inside the `auth` module.

Open the `src/app/auth/auth.service.ts` file and update it by following these steps. First add the necessary imports:

```ts
import { Injectable } from  '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';

import { Storage } from  '@ionic/storage';
import { User } from  './user';
import { AuthResponse } from  './auth-response';
``` 

We import:

-  `HttpClient` for sending POST request to the Express server that handles authentication, 
-  The `tap()` operator for performing side effects when subscribing to the observables returned by the `HttpClient` methods,
- The `Storage` module for persisting the access token and expiration date in the local storage,
- The `Observable`, `BehaviorSubject` APIs for working with asynchronous operations,
-  The `User` and `AuthResponse` interfaces.  

This is the [definition of `BehaviorSubject`](http://reactivex.io/rxjs/manual/overview.html#behaviorsubject):

>One of the variants of Subjects is the `BehaviorSubject`, which has a notion of "the current value". It stores the latest value emitted to its consumers, and whenever a new Observer subscribes, it will immediately receive the "current value" from the `BehaviorSubject`.

Next, declare these variables in the service class:

```ts
AUTH_SERVER_ADDRESS:  string  =  'http://localhost:3000';
authSubject  =  new  BehaviorSubject(false);
```

The `AUTH_SERVER_ADDRESS` holds the address of the Express authentication server and `authSubject` is a type of Observable that will be used to subscribe to the authentication state.

Next, inject `HttpClient` and `Storage` services via the service's constructor:

```ts
constructor(private  httpClient:  HttpClient, private  storage:  Storage) { }
```

### Sending a POST Request with `HttpClient` for Registering Users

Next, add the `register()` method that will be used for registering users in the Express server:

```ts

  register(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/register`, user).pipe(
      tap(async (res:  AuthResponse ) => {

        if (res.user) {
          await this.storage.set("ACCESS_TOKEN", res.user.access_token);
          await this.storage.set("EXPIRES_IN", res.user.expires_in);
          this.authSubject.next(true);
        }
      })

    );
  }
```

We simply use the `post()` method to send a POST request to the `/register` endpoint exposed by our authentication server that will be running from the `localhost:3000/` address. We'll be creating the server with Node and Express.js in the next section.

We use the `pipe()` function to chain multiple operators. In our case we want to perform a side effect for storing JWT information (the access token and expiration date) in the local storage so we use the `tap()` operator that's available from RxJS.

In the `tap()` operator we check if the response has a user object  and we set persist the access token and expiration date with the `ACCESS_TOKEN` and `EXPIRES_IN` keys. Next, we emit a true value to our `authSubject` using the `next()` method.

### Sending a POST Request with `HttpClient` for Authenticating Users
 
Next, add the `login()` method that will be used for authenticating users:

```ts

  login(user: User): Observable<AuthResponse> {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/login`, user).pipe(
      tap(async (res: AuthResponse) => {

        if (res.user) {
          await this.storage.set("ACCESS_TOKEN", res.user.access_token);
          await this.storage.set("EXPIRES_IN", res.user.expires_in);
          this.authSubject.next(true);
        }
      })
    );
  }
```

We send a POST request with `HttpClient` to the `/login` endpoint of our Express.js server that handles JWT authentication. Next, we perform a side effect using the `pipe()` method and `tap()` operator available from RxJS for persist the JWT access token and expiration date returned from the server.

### Logging out Users

Next, add the `logout()` method that will be used for removing JWT authentication information from the local storage:

```ts
  async logout() {
    await this.storage.remove("ACCESS_TOKEN");
    await this.storage.remove("EXPIRES_IN");
    this.authSubject.next(false);
  }
```

We also emit a `false` value in the `BehaviorSubject` representing the authentication state.

### Getting the Authentication State
 
Finally add the `isLoggedIn()` method that will be used for checking id the user is logged in or not:

```ts

  isLoggedIn() {
    return this.authSubject.asObservable();
  }
```

We simply return `authSubject` variable casted to an Observable  using the `asObservable()` method. You can check if the user is logged in by subscribing to call of this method.

## Creating Ionic Pages

Now that we've created the service for authenticating users. Let's create the user interface with Ionic 5 UI components.

Check out this second tutorial: [Ionic 5 Tutorial: Build a Login & Register UI]().  

## Creating and Running an Express.js Authentication Server 

Let's create a authentication server that exposes two `/register` and `/login` endpoints using Node.js and Express.js and a bunch of other modules.

First, create a folder for the server code:

```bash
$ mkdir express-auth-demo
```

Navigate in the folder and create a `package.json` file:

```bash
$ npm init -y
```

Next, install the following dependencies:

```bash
$ npm install --save express body-parser sqlite3 bcryptjs jsonwebtoken cors
```

Next, create an `index.js` file and add the following code:

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
 
For more details about this code, check out [Node Express JWT Authentication — jsonwebtoken and bcryptjs](https://www.techiediaries.com/node-express-jwt-authentication/).
 
 Next, add a `start` script in `package.json`:

```json
"scripts": {
	"start": "node index.js"
},
```

You can now, run your authentication server using:

```bash
$ npm start
```

Your server will be running from `http://localhost:3000`.

You can use cURL to send POST requests to the authentication endpoints before creating the Ionic 5 UI. First run this command in a new terminal to register a user:

```bash
 curl -H "Content-Type: application/json" -d '{"email":"test@test.com","name":"test", "password":"test"}' http://localhost:3000/register
```
 
 Next, run this command to login the user:
 
```bash
 curl -H "Content-Type: application/json" -d '{"email":"test@test.com", "password":"test"}' http://localhost:3000/login
```

## Conclusion

In this tutorial, we've learned how to implement JWT authentication with Ionic 5, Angular 7 on the front-end and Node and Express.js in the back-end. We've seen how to send POST requests using `HttpClient` and how to persist values on the local storage using the Ionic Storage module. 
