---
layout: post
title: "React & Axios JWT Authentication Tutorial with PHP & MySQL Server: Signup, Login and Logout"
image: "images/content/react.png"
excerpt: "In this tutorial, you'll learn to create an example React application that implements JWT authentication using a PHP REST API server on top of a MySQL database." 
tags : [php , react, mysql]
skipRss: true
---

In this tutorial, we'll learn how to use React to build login, signup and logout system and Axios to send API calls and handle JWT tokens.

For building the PHP application that implements the JWT-protected REST API, check out [PHP JWT Authentication Tutorial](https://www.techiediaries.com/php-jwt-authentication-tutorial).

We'll be using the same application built in the previous tutorial as the backend for our React application we'll be building in this tutorial.

## Prerequisites

You will need to have the following prerequisites to follow this tutorial step by step:

- Knowledge of JavaScript,
- Knowledge of React,
- Knowledge of PHP,
- PHP, Composer and MySQL installed on your development machine,
- Node.js and NPM installed on your system.

That's it. Let's get started!

## Cloning the PHP JWT App

Our example application implements JWT Authentication. It exposes three endpoints

- `api/login.php`
- `api/register.php`
- `api/protected.php`

### How to Run the PHP App

First clone the GitHub repository:

```bash
$ git clone https://github.com/techiediaries/php-jwt-authentication-example.git
```

Next, navigate inside the project's folder and run the following commands to install the PHP dependencies and start the development server:

```bash
$ cd php-jwt-authentication-example
$ composer install
$ php -S 127.0.0.1:8000
```

## Enabling CORS

Since we'll be making use of two frontend and backend apps - The React/Webpack development server and the PHP server which are running from two different ports in our local machine (considered as two different domains) we'll need to enable CORS in our PHP app.

Open the `api/register.php`, `api/login.php` and `api/protected.php` files and add the following CORS header to enable any domain to send HTTP requests to these endpoints:

```php
<?php
header("Access-Control-Allow-Origin: *");
>
``` 

## Installing `create-react-app`

Let's start by installing the `create-react-app` tool which will be used to create the React project. Open a new terminal and run the following command:

```bash
$ npm install -g create-react-app
```

`create-react-app` is the official tool created by the React team to quickly start developing React apps.

## Creating a React Project

Let's now generate our React project. In your terminal, run the following command:

```bash
$ create-react-app php-react-jwt-app
```

This will generate a React project with a minimal directory structure.

## Installing Axios & Consuming JWT REST API

We'll be using JWT for sending HTTP requests to our PHP JWT REST API so we'll need to install it first. Go back to your terminal and run the following commands to install Axios from npm:

```bash
$ cd php-react-jwt-app
$ npm install axios --save
```

As of this writing, this will install `axios` **v0.18.0**.

Next, let's create a component that encapsulates the code for communicating with the JWT REST API. In the `src/` folder, create an `utils` folder then create a `JWTAuth.js` file inside of it:

```bash
$ mkdir utils
$ touch JWTAuth.js
```

Open the `src/utils/JWTAuth.js` file and add the following code:

```js
import axios from 'axios';
const SERVER_URL = "http://127.0.0.1:8000";
```

We import axios and define the `SERVER_URL` variable that contains the URL of the JWT authentication server. 

Next, define the `login()` method which will be used to log users in:

```js
const login = async (data) => {
    const LOGIN_ENDPOINT = `${SERVER_URL}/api/login.php`;
    
    try {

        let response = await axios.post(LOGIN_ENDPOINT, data);
        
        if(response.status === 200 && response.data.jwt && response.data.expireAt){
            let jwt = response.data.jwt;
            let expire_at = response.data.expireAt;

            localStorage.setItem("access_token", jwt);
            localStorage.setItem("expire_at", expire_at);
            
        }
        

    } catch(e){
        console.log(e);
    }
}
```

First, we construct the endpoint by concatenating the server URL with the `/api/login.php` path.

Next, we send a POST request to the login endpoint with the data passed as a parameter to the `login()` method.

Next, if the response is successful, we store the JWT token and expiration date in the local storage.

> **Note**: Since Axios, returns a Promise, we use the `async/await` syntax to make our code look synchronous.

Next, define the `register()` method which creates a new user in the database:

```js
const register = async (data) => {
    const SIGNUP_ENDPOINT = `${SERVER_URL}/api/register.php`;
    try {
        let response = await axios({
            method: 'post',
            responseType: 'json',
            url: SIGNUP_ENDPOINT,
            data: data
          });
    } catch(e){
        console.log(e);
    }
}
```

We first construct the endpoint by concatenating the server URL with the `/api/register.php` path. Next, we use Axios to send a POST request to the register endpoint with the data passed as a parameter to the method. 

> **Note**: We use the async/await syntax to avoid working with Promises.

Finally, let's define the `logout()` method which simply removes the JWT access token and expiration date from the local storage:

```js
const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("expire_at");
}
``` 

We use the `removeItem()` method of `localStorage` to remove the `access_token` and `expire_at` keys.

Now, we need to export these methods so they can be imported from the other React components:

```js
export { login, register, logout } 
```

## Calling the JWTAuth Methods in the React Component

Let's now make sure our login system works as expected. Open the `src/App.js` file and import the `login()`, `register()` and `logout()` methods from the `src/utils/JWTAuth.js` file:

```js
import { login, register, logout } from "./utils/JWTAuth.js";
```

Next, define a `login()` method in the `App` component as follows:

```js
class App extends Component {

  async login(){
    let info = {
      email: "kaima.abbes@email.com",
      password: "123456789"
    };

    await login(info);
    
  }
```

This methods simply calls the `login()` method of `JWTAuth.js` with hardcoded user information to log the user in.

Next, define the `register()` method as follows:

```js
  async register(){
    let info = {
      first_name: "kaima",
      last_name: "Abbes",
      email: "kaima.abbes@email.com",
      password: "123456789"
    };

    await register(info); 
  }
```

> **Note**: We don't need to wrap the `logout()` method since we don't have to pass any parameters to the method.

Finally, update the `render()` method to create the buttons for login, register and logout:

```js
  render() {
    
    return (
      <div className="container">
      <div className="row">
        <h1>React JWT Authentication Example</h1>

        <button className="btn btn-primary" onClick = { this.register }>Sign up</button>
        
        <button className="btn btn-primary" onClick = { this.login }>Log in</button>

        <button className="btn btn-primary" onClick = { logout }>Log out</button>
        
      </div>
      </div>
    );
  }
```

You should be able to use these buttons to test the `register()`, `login()` and `logout()` methods.

> **Note**: We used Bootstrap for styling the UI. 


In the next tutorial, we'll build the actual login and register UIs with forms to get the user's information and submit them to the PHP JWT authentication server.

## Conclusion

In this tutorial, we've seen how to implement JWT authentication in React with Axios, PHP and MySQL.

















