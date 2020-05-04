---
layout: post
title: "JavaScript Fetch Tutorial: Send HTTP Requests With React.JS and Async-Await Example"
image: "images/content/angular-by-example-httpclient-get.png"
excerpt: "In this tutorial and example, we'll see how to use Fetch to send GET requests inside a Reacts.js example application. We'll also see how to use the Async/Await syntax to avoid using JavaScript Promises in your code" 
tags : [javascript, react] 
---


The Fetch API is a modern browser API for JavaScript that allows you to fetch resources from servers.

Unlike the old XMLHttpRequest interface, Fetch makes use of JavaScript Promises to handle the asynchronous nature of HTTP requests.
 
This greatly simplifies you code since you can avoid writing callback hell and can be further used with the async-await syntax to get rid of the `then()` callback and write your asynchronous code as syncronous code.
 
In this tutorial and example, we'll see how to use Fetch to send GET requests inside a Reacts.js example application. We'll also see how to use the Async/Await syntax to avoid using JavaScript Promises in your code.
     
## How to use the Fetch API?

You can use the `fetch()` API in modern web browsers to fetch data from remote servers and send HTTP requests to REST API servers.

The  `fetch()`  method takes, as a first parameter, the URL of the resource and an optional options object. 

By default, the `fetch()` API makes a GET request. For example:

```javascript
fetch(resourceURI)
    .then(res => {
        // Here you can process the response data
    }).catch(err => {
        // Here you can handle request errors if any
    });
```



## Getting Data with Fetch & React Example

Let's see now see an example of fetching data with the `fetch()` method. We'll use the [GitHub API](https://api.github.com/users/)  to get a list of users and we will use React.js to render the fetched users.

Open the `App.js` file and start by adding the following imports and defining a constant which holds our API endoint:

```js
import  React,  {  Component  }  from  "react";
import  { render }  from  "react-dom";
import  "./style.css";

const apiUrl =  "https://api.github.com/users";
```

Next, inside the `App()` function, define a state variables for holding data after fetching it from the endpoint:

```js
function  App()  {
	const  [items, setItems]  =  React.useState([]);
```

Next, let's call the Fetch API to get a list of users inside the `useEffect()` hook:

```javascript
function App() {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      var data = await fetch(apiUrl).then(res => {
        return res.json();
      });
      
      setItems(data);
      console.log(data);
    }
    fetchData();
  }, []);
```

The  `fetch()`  method returns a promise that calls the  `then()`  method with  response object when fulfilled. The response object has several methods to handle the response the way we want to do. Here are few of these methods:

-   `json()`  — Resolves the promise with a JSON object
-   `text()`  — Resolves the promise with plain text
-   `blob()`  — Resolves the promise with a Blob object
-   `formData()`  — Resolves the promises with a FormData object

Calling any of the above methods return a new promise so we can use the **await** keyword to wait for the promise to resolve inside an async function defined using the **async** keyword.

Next, after sending a GET request to fetch data, let's iterate over the returned data and display it using the following code:

```javascript
  return (
    <div class="container">
      {items.map(item => (
        <div class="card">
          <img src={item.avatar_url} />
          <div class="card-body">{item.login}</div>
        </div>
      ))}
      ;
    </div>
  );
}
```



And the full code of our Fetch request is the following:

```javascript
import React, { Component } from "react";
import { render } from "react-dom";
import "./style.css";

const apiUrl = "https://api.github.com/users";

function App() {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      var data = await fetch(apiUrl).then(res => {
        return res.json();
      });
      //console.log(data);
      setItems(data);
      console.log(data);
    }
    fetchData();
  }, []);

  return (
    <div class="container">
      {items.map(item => (
        <div class="card">
          <img src={item.avatar_url} />
          <div class="card-body">{item.login}</div>
        </div>
      ))}
      ;
    </div>
  );
}

render(<App />, document.getElementById("root"));
```

This is the full example on [Stackblitz](https://stackblitz.com/edit/react-fetch-usestate-and-useeffect-exampe?file=index.js).

## Conclusion

In this tutorial, we've seen by example how to send GET requests with Fetch in JavaScript and React.js. We've also seen how to use the Async/Await syntax with Fetch to avoid using Promises.
 
