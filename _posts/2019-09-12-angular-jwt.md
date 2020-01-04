---
layout: post
title: "Angular 7/8 Authentication with JWT Tutorial"
image: "images/content/angular.png"
excerpt: "In this tutorial, you'll learn, by example, how you can  implement JWT authentication in your Angular 7/8 application." 
tags : [angular, angular8]
---

In this tutorial, you'll learn to implement JWT authentication in your Angular 7/8 applications by creating an example Angular service that can be used to handle authentication with JWT.

In this tutorial:

- You'll start by installing the requirements of your project like Node.js, npm and the Angular CLI 8,
- Next, you'll create your Angular 8 application,
- You'll setup `HttpClient` into your application,
- You'll create an Angular 8 service than handles the JWT authentication,
- Finally, you'll install and configure `angular-jwt` to attach JWT access tokens to requests. 

> **Note**: For a more detailed tutorial that implements JWT authentication with Angular 8, Express and Node.js check out these tutorials: 
>
>- [Angular 7/8 Tutorial: Building and Submitting a Login Form to a Node and Express.js JWT Authentication Server](/angular-tutorial-forms-authentication-expressjs.md)
>- [Angular 7/8 Tutorial: Using Angular HttpClient with Node & Express.js - Example POST Requests](/angular-tutorial-httpclient-post)

## Understanding JWT

Before diving into practice, let's briefly understand what JWT is. 

JWT stands for JSON Web Token and it's an open source standard that states how to securely exchange information between computer systems.

A JWT token is simply a compact and self contained JSON object that contains information like email and password.

You can use JWT to add authentication in your Angular 8 application without resorting to make use of the traditional mechanisms for implementing authentication in web apps like sessions and cookies. 

Here is how JWT works in your web application. First the user is signs in, your web server creates a JWT token for the user's credentials and sends it back to the user's browser. After that, the JWT will be persisted in the browser's local storage and sent with each HTTP request to to the server to be able to access any protected API endpoints.

## Prerequisites

To be able to complete this tutorial, you'll need to have a few requirements:

- First, you need to have Node and NPM installed on your system. Otherwise, you can simply visit [nodejs.org](https://nodejs.org/en/download/) and download the binaries of your system. On Ubuntu you can follow this [tutorial](https://www.techiediaries.com/ubuntu-install-nodejs-npm).
- Next, you need to have Angular CLI 8 installed. If it's not installed, you simply need to run the `npm install -g @angular/cli` command to install the CLI globally on your system.
- Finally, you need to have an Angular 8 project or simply run the `ng start angular-authentication-example` command and answer the CLI questions to generate your project.

With these requirements installed, you should be ready to start creating your Angular 8 service that encapsulates all the code for implementing JWT authentication in your Angular application.

## Setting up `HttpClient`

You need to setup `HttpClient` before being able to send HTTP requests to the server. We have previously done that in a previous [tutorial](https://www.techiediaries.com/angular-httpclient). You can either follow that tutorial for more information about using `HttpClient` or simply setup `HttpClient` by importing `HttpClientModule` from the `@angular/common/http` package and include it in the `imports` array of the application module.

Open the `src/app/app.module.ts` file and add the following code:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Next, you simply need to import and inject `HttpClient` in your services and components.

In the next section, you'll create the JWT service.

## Building the Authentication Service

In this section, you'll create an Angular 8 service that encapsulates the logic for JWT authentication.

In your terminal, run the following command to generate a service with Angular CLI:

```ts
$ ng generate service jwt
```

> You can also use `g` instead of `generate`. 

Next, open the `src/app/jwt.service.ts` file and import the `HttpClient` class and inject it:

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
providedIn: 'root'
})

export class JwtService {
    constructor(private httpClient: HttpClient) { }
}
```

Now, you are ready to add the `login()`, `logout()` and `loggedIn()` methods.

## The Server Side App

In this tutorial, you are not going to learn how to create the server application.

You server side app needs to implement JWT authentication and exposes a few endpoints:

- `/auth/login` for logging in users. This endpoint should accept a POST request with the user's credentials and returns a JWT access token that will be received by the browser. 
- `/auth/register` for registering users. This endpoint should accept a POST request that contains a user credentials and persist them in the database.


## Adding Authentication Methods

Now, after creating the JWT service in your Angular 8 application, you need to implement the necessary methods that will be used to handle the authentication in your application.

### Adding the `.login` Method

Let' start by defining the `.login` method. It should take an email and password parameters and return and RxJS `Observable`.
 
 Open your `src/app/jwt.service.ts` file and add the following method in your service:
 
```ts
login(email:string, password:string) {
    return this.httpClient.post<{access_token:  string}>('http://www.your-server.com/auth/login', {email, password}).pipe(tap(res => {
    localStorage.setItem('access_token', res.access_token);
}))
}
```

So what you have done? You first used the `HttpClient.post` method to send a request to `/auth/login` endpoint with an object containing the email and password passed as parameters.

Next, you used the `.pipe` method which is a member of the RxJS `Observable` for chaining operators and the `tap` function to execute a side effect for persisting the JWT access token, returned by the server, in the browser's local storage.

> Make sure to import the `tap` operator using `import { tap } from 'rxjs/operators';`

### Adding the `.register` Method

Just like the `.login` method, you also need to add a `.register` method that send a request to the server to register a user for the first time:

In your Angular 8 service, add the following method:

```ts
register(email:string, password:string) {
    return this.httpClient.post<{access_token: string}>('http://www.your-server.com/auth/register', {email, password}).pipe(tap(res => {
    this.login(email, password)
}))
}
```

Again, you've used the `HttpClient.post` method to send a POST request to the server with the registration information (email and password) then used the `.pipe` and `tap` function to run a side effect that calls the `.login` method to logs the user in once the registration is done. 

### Adding the `.logout` Method

Next, you need to implement a `.logout` method that logs out the user. This method doesn't need to send any request to the server, all it needs to do is removing the JWT access token from the user's local storage. For example:

```ts
logout() {
  localStorage.removeItem('access_token');
}
```

You call the `.removeItem` method of `localStorage` to remove the key named `access_token`.

## Adding the `.loggedIn` Property

Finally, you need to create the `.loggedIn`  property that simply verifies if a user is logged in. This is achieved by checking if a JWT access token exists in the browser's local storage:

```ts
public get loggedIn(): boolean{
  return localStorage.getItem('access_token') !==  null;
}
```

You used the `.getItem` method of `localStorage` to get the `access_token` item. If it doesn't exist the method returns a null object.

> You can create a property in TypeScript by preceding the method definition by a `get` modifier. You can then access the property without using parentheses. 

Now that you have implemented all the authentication methods that will be used to login, logout, register and check the user's status. You still need to attach the access token to each request that will be sent to the server for accessing protected endpoints. And protect the Angular views using guards.

## Installing and Setting Up `angular-jwt`

After adding the required methods for implementing JWT authentication in your Angular 8 service. Let's now see how you can attach the received access token to each request.
 
You can do that using the `angular-jwt` library from Auth0. So, first install it from npm using the following command:

```bash
$ npm install @auth0/angular-jwt --save
```

The `angular-jwt` library implements the code needed for sending the access token along with each HTTP request but it needs some setup.

Open the `src/app/app.module.ts` file and import the  `JwtModule` available from the `@auth0/angular-jwt` package:

```ts
import { JwtModule } from '@auth0/angular-jwt';
```

Next, you need to include it in the `imports` array of the application module:

```ts
imports: [
	# [...]
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
			 return  	localStorage.getItem('access_token');},
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: ['http://localhost:3000/auth/login']
      }
    })
  ],
```

You use the `.forRoot` method of `JwtModule` to provide a configuration object with the following attributes:

- `tokenGetter`: This function is used to customize how `JwtModule` gets the JWT access token from the local storage.
- `whiteListedDomains`: In this array, you can add any domains that are allowed to receive the JWT like public APIs.
- `blackListedRoutes`: In this array, you can add routes that are not allowed to receive the JWT token. 

In this example, you add the `localhost:3000` URL to the white-listed domains so only your Angular application that's running from this address will receive the access tokens.

You also black-listed the `localhost:3000/auth/login` URL because it doesn't need to receive any access token. 

## Conclusion

In this tutorial, you learned how to implement JWT authentication in your Angular 8 application.

