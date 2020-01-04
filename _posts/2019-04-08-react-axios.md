---
layout: post
title: "React Tutorial: Call & Consume a JSON REST API with Axios"
image: "images/content/react.png"
excerpt: "Throughout this tutorial, we'll build a simple React application that consumes JSON data from third-part RESTful API using the Axios library. We are also going to style the user interface of our app with Bootstrap 4 components such as the Container and Card components." 
tags : [react] 
---

Throughout this tutorial, we'll build a simple React application that calls a web API and consumes JSON data from third-party RESTful APIs using the Axios library. We are also going to style the user interface of our app with Bootstrap 4 components such as the Container and Card components.

We'll be using a third-party API available from [JSONPlaceholder](http://jsonplaceholder.typicode.com/users).

We'll learn how to create a React project using the `create-react-app` tool, how to install the Axios client library and use it to send GET requests to fetch and consume JSON data from REST APIs. 

If you are new to React; you will also learn about the basic concepts such as:

- The `state` object which is used to contain the pieces of state of the app and the `setState()` method to change the values in the `state` object.
- The `componentDidMount()` life-cycle hook. This is executed when your React component is inserted/mounted in the DOM.
- JSX for adding HTML in JavaScript.

[React](https://reactjs.org/) is a popular user interface library created by Facebook. It's declarative, component-based and can be used to build both web and mobile applications using web technologies.

## Prerequisites

React is a JavaScript library and we'll use the create-react-app tool for creating a React project. As such; you will need to have the following prerequisites to be able to following this tutorial step by step.

- Knowledge of JavaScript since React is based on JS,
- Node and NPM installed on your development system.  This is required to install and use the `create-react-app` tool - The official tool for creating React projects, serve them locally and build them for production. You can install Node and NPM by simply downloading the binaries for your system from the [official website](https://nodejs.org/en/download/).  You can also use [NVM](https://github.com/creationix/nvm) install and manage multiple Node versions in your system.

Now, if you have these prerequisites; let's get started with our tutorial!

## Installing create-react-app

As we mentioned before, the recommended way to create a React project is through using the `create-react-app` tool. If you have Node and NPM installed, go ahead and open a new terminal, next run the following command to install the tool globally in your system:

```bash
$ npm install -g create-react-app
```  

> **Note**: Please note that depending on your `npm` configuration you may be required use `sudo` in your command in Linux and macOS for installing `npm` packages system-wide. 
>
> As of this writing, `create-react-app` v2.1.8 will be installed.


## Creating a React Project

Now that you have installed `create-react-app`, let's proceed to create our React project. Go back to your terminal window and run the following commands:


```bash
$ cd ~
$ npx create-react-app react-axios-rest-api-example
```

We first navigate to our working directory and use the `npx create-react-app` command to create our React project. `npx` is an executable that lets you run executables from the `node_modules` folder. See more details from the [official website](https://www.npmjs.com/package/npx).

The tool will create a basic project structure and install the required dependencies from `npm`. 

After that, you can simply navigate to your project's root folder and serve your React application using the `npm start` script:

```bash
$ cd create-react-app react-axios-rest-api-example
$ npm start
```

This command will start a local development server from the `http://localhost:3000` address.


This is a screenshot of our application up and running:

![React Axios REST API Example](https://www.diigo.com/file/image/bbccosoazoacaoedoazdqsoecco/React+App.jpg)


## Adding Bootstrap 4 Styles to Our React Application

For building a beautiful UI we'll be using Bootstrap 4. Fortunately for us, using Bootstrap 4 with React is dead easy. SImply go ahead and open the `public/index.html` file and add a `<link>` to import the `bootstrap.min.css` file from a CDN:

```html
  <head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <!-- [...] -->
``` 

Now, let's test  if Bootstrap is successfully integrated. Open the `src/App.js` and replace its content with the following:

```js
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
       <div className="container">
        <div className="col-xs-8">
        <h1>React Axios Example</h1>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">My User</h5>
            </div>
          </div>
        </div>
       </div>
    );
  }
}
export default App;
``` 

In React you need to use `className` instead of `class` for adding a CSS class to DOM elements. 


## Installing the Axios Client


[Axios](https://github.com/axios/axios) is a modern and Promise-based  JavaScript HTTP client library that can be used both in the browser and the server with Node.js. Axios works asynchronously and allows you to make HTTP calls to REST endpoints and consume JSON REST APIs.


Now let's install Axios in our React project using the following command from your project's root folder:

```bash
$ npm install --save axios
```

## Consuming the REST API with Axios


Now let's see how we can consume JSON data from our third-party [API endpoint](http://jsonplaceholder.typicode.com/users) using the Axios client. 

Open the `src/App.js` file and import the `axios` library, define the `API_URL` that holds the URL of our third-party REST API and add a state variable that will be used to hold users after getting them from the REST API:

```js
import React, { Component } from 'react';
import axios from 'axios';
const API_URL = 'http://jsonplaceholder.typicode.com';

class App extends Component {
  state = {
    users: []
  }
  // [...]
}

export default App;
```


Next, let's add a `componentDidMount()` life-cycle hook in our in our `App` component; and then add the code required to send a GET request to fetch the JSON data from the REST endpoint. Open the `src/App.js` file and update it as follows:

```js
import React, { Component } from 'react';
import axios from 'axios';
const API_URL = 'http://jsonplaceholder.typicode.com';

class App extends Component {
  state = {
    users: []
  }
  componentDidMount() {
    const url = `${API_URL}/users/`;
    axios.get(url).then(response => response.data)
    .then((data) => {
      this.setState({ users: data })
      console.log(this.state.users)
     })
  }
  // [...]
}
export default App;
``` 

We use the `axios.get()` method for sending an HTTP GET request to the `/users` endpoint of the REST API. After the JavaScript `Promise` is resolved we call the [`setState()` method](https://www.techiediaries.com/react-setstate) to put the returned JSON data in the `users` variable.
 
If you open your browser console, you should see the received users displayed as an array of objects.

Now, let's render the `users` array in our React app. Simply open the `src/App.js` file and update the `render()` method accordingly:

```js
  render() {
    
    return (
       <div className="container">
        <div className="col-xs-8">
        <h1>React Axios Example</h1>
        {this.state.users.map((user) => (
          <div className="card">
           <div className="card-body">
               <h5 className="card-title">{user.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
              {user.email}             
              </h6>
            </div>
          </div>
        ))}
        </div>
       </div>
    );
  }
```

In React, you can build lists of elements and  [include them in JSX](https://reactjs.org/docs/introducing-jsx.html#embedding-expressions-in-jsx)  using curly braces  `{}`.

In our `render()` method, we simply go through the  `state.users`  array using the JavaScript  [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)  method and we return a  Bootstrap 4 card element for each user. 

We can  also [embed any expressions in JSX](https://reactjs.org/docs/introducing-jsx.html#embedding-expressions-in-jsx)  by wrapping them using curly braces. 


## Conclusion

We have reached the end of our tutorial where we learned how to use React and Axios to fetch and display JSON data from a RESTful API. As a recap:

We have started by installing the `create-react-app` tool then used it to create our React project. Next, we added Bootstrap 4 in our React application using a `<link>` tag and a CDN. Finally we installed the axios client library and used the `get()` method  to send an HTTP GET request to fetch and and consume JSON data from a third-party REST API in the `componendDidMount()` life-cycle hook. 


