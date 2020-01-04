---
layout: post
title: "React Forms Tutorial: Login and Signup Forms Example"
image: "images/content/react.png"
excerpt: "In this tutorial, you'll learn to create an example React application with a PHP REST API on top of a MySQL database." 
tags : [php , react]
skipRss: true
---

In this tutorial, we'll learn how to work with Forms in React by building login and signup interfaces for the app we've built in the previous [tutorial](https://www.techiediaries.com/react-axios-php-jwt-authentication-tutorial).


The sole purpose of React is to render components to the DOM to build fast user interfaces. This is why, it's considered a library, not a framework or a platform like Vue or Angular.

React doesn't provide other building blocks like routing or forms handling out of the box, you actually need to use community maintianed packages for that purpose.

In this tutorial, we'll see how to handle forms in your React application, from simple techniques to use some third-part community packages that makes working with forms and validation a breeze.

## Prerequisites

Just like the previous part, you will need to have the following prerequisites for this tutorial:

- Knowledge of JavaScript,
- Knowledge of React,
- PHP, Composer and MySQL installed on your development machine,
- Node.js and NPM installed on your system.


PHP is required for the backend app. In this tutorial, we'll be working only with React but we need to start the PHP server for testing the JWT authentication after building the login and signup forms.

## Installing React Router v4

We'll be using React Router v4 for handling routing so we need to install the library. Head back to your terminal and navigate to your project's folder:

```bash
$ cd php-react-jwt-app
``` 

Next, run the following commands to install the React Router:

```bash
$ npm install --save react-router-dom
```

As of this writing, this will install `react-router-dom` **v5.0.0**.
## Adding React Components for Register and Login

After setting up the project and install the required dependecies; let's now create the login and register components.

### Creating the Register Form Component

Let's start with the component for registering users. In the `src/` folder, create a `Register.js` file and add the following content:

```js
import useState from `react`;

const Register = () => {
    return (

    );

}

```

### Creating the Login Form Component


## Adding Routing 

Let's now add routing in our application. The `App` component will behave like an outlet where the other components will be rendered by the React Router when we visit the corresponding path.

Open the `src/App.js` file and update it as follows:

```js
import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'

const BaseLayout = () => (
  <div className="base">
    <header>
      <h1>React Authentication Example UI</h1>
    </header>
    <div className="container">
      <Route path="/login" component={Login} />
      <Route path="/register" component="{Register}" />

    </div>
  </div>
);

class App extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <BaseLayout />
            </BrowserRouter>
        )
    }
}
```

















