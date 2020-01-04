---
layout: post
title: "Making AJAX API Calls in React: Axios vs jQuery vs Fetch API with Example GET & POST"
image: "images/content/react-ajax.png"
excerpt: "In this tutorial we will cover different ways to use AJAX in React: Axios vs Fetch API and where to make AJAX calls?  componentDidMount() vs componentWillMount() vs the ES6 class constructor." 
tags : [react]
---


![AJAX in React](images/content/react-ajax.png)

Throughout this **AjAX with React tutorial** we will cover different ways to do AJAX in React (Axios, jQuery and the Fetch API). We'll see by example how to use the browser **Fetch** API to send an HTTP request (GET and POST) to *Reddit* and from where you can make AJAX calls in a React component i.e  `componentDidMount()` vs `componentWillMount()` vs the ES6 class constructor.
 
We'll learn, with a simple example,  how to make AJAX requests or API calls  (GET, POST, PUT and DELETE) to fetch, create, update and delete data using React via different mechanisms such as the **Axios** library, **XMLHttpRequest** or the modern browser's **fetch** API.
  
React is a view library, for building user interfaces or UIs, not a complete framework like, for example, Angular or AngularJS. In MVC architectures, React represents the **V**iew part. So if you have used a client side framework before, you will notice the lack of many abstractions such as services to make HTTP calls (equivalent to **$http** in AngularJS). 

So — If you are asking what's the React equivalent for sending AJAX calls? There isn't!

You shouldn't consider this as a weakness of the library because React isn't supposed to handle all the tasks usually handled by frameworks. The whole purpose of React is to render stateless components (dump components with no data) and statefull components using data from **props** and **state** (that's usually fetched from an API server).

## How to Fetch Data from HTTP Servers in React?

So how to fetch data from a remote HTTP server? or how to make API calls?

You have a plethora of options, at your disposal, from external libraries to standard browser APIs. All you have to do is to choose the right solution for your needs.

## Choosing the Right HTTP Call Mechanism

There are many libraries, with different features, that can be used to fetch data from remote servers.

* You can use [Axios](https://github.com/mzabriskie/axios) if you feel comfortable working with JavaScript Promises.
* If you like to work with cutting-edge standards, you can use the browser' `fetch` API
* You can also use jQuery, but it's not recommended to include the whole library just for the sake of making API calls.  
* You can use [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest) interface.

## Calling APIs using the Fetch API

Let's now see a practical example, using the browser's fetch API.

We'll create a simple React app that sends API calls to the *Reddit* server to fetch some *subreddit* posts. 

### Creating a New React Project 

So go ahead and create a new React project. I'm using and recommending **create-react-app** because it saves you from the hassle of configuring WebPack and lets you quickly generate a starter project to build your app.

#### Installing create-react-app

If you decide to go this way, you can use npm to install **create-react-app** with:

```bash
npm install -g create-react-app
``` 

#### Generating a New React Project

Now you can generate a new React project with:

```bash
create-react-app react-ajax-demo
cd react-ajax-demo
npm start
```


### How to Use The Fetch API?

According to [Mozilla MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

> The Fetch API provides a JavaScript interface for accessing and
> manipulating parts of the HTTP pipeline, such as requests and
> responses. It also provides a global fetch() method that provides an easy, logical way to fetch resources asynchronously across the network.

Now let's fetch some data from *Reddit*. In `src/App.js` update the code to reflect these changes:

```js

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }  
  fetchFirst(url) {
    var that = this;
    if (url) {
      fetch('https://www.reddit.com/r/' + url + '.json').then(function (response) {
        return response.json();
      }).then(function (result) {

        //console.log(result.data.children);
        
        that.setState({ posts: result.data.children, lastPostName: result.data.children[result.data.children.length - 1].data.name });

        console.log(that.state.posts);
      });
    }
  }  
  componentWillMount() {
    
      this.fetchFirst("reactjs");
    
  }    
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React AJAX Example</h1>
        </header>
        <p className="App-intro">
          <ul>
            {this.state.posts.map(post =>
              <li key={post.id}>{post.title}</li>
            )}
          </ul>          
        </p>
      </div>
    );
  }
}

export default App;

```
Right in the `fetchFirst()` method, we are sending a GET request to fetch data from
`'https://www.reddit.com/r/' + url + '.json'` using the following code:


```js
fetch('https://www.reddit.com/r/' + url + '.json').then(function (response) {
        return response.json();
}).then(function (result) {
	console.log(result.data.children);
});
```
The API is simple, the only required argument is  the resource's URI. In our example it's a JSON file but can be any type of resource like an image or other types.  

Without extra parameters `fetch(url)` sends a **GET** HTTP request by default.

You can also call the other HTTP methods such as POST, PUT or DELETE by explicitly specifying the method name in the second argument. For example here is how we send a POST request with `fetch()`

```js
var form = new FormData(document.getElementById('login-form'));
fetch("/login", {
  method: "POST",
  body: form
});
```

## Where to make AJAX Requests: componentWillMount vs componentDidMount?

A React app is a set of components with a root, parent and top-level component and child (and child of child) components that can be visualized as a tree structure. Many questions arise in the React community—how to handle data? how data flows from the  component where it's fetched to other components? and most importantly where to place code for fetching data?

In the previous example we called the data fetch logic from `componentWillMount()` life-cycle event which gets called when the component is about to mount, before the component's first render.

There are many places where you can fetch data such as:

* The component render() method: it's a bad idea! you should avoid placing any asynchronous code, code that changes app's state or causes side effects inside component's `render()` method.

* The life-cycle event `componentDidMount()`:  it's the recommended place according to React docs.

* The life-cycle event `componentWillMount()`: it's not recommended, according to React docs.

* The component's constructor in ES6: it's considered as an anti-pattern! But can be used just like `componentWillMount()`.

So let's see the best practices that you need to follow when fetching data.

### Fetching Data inside componentDidMount() Event

This is the simplest approach. We fetch data from the remote server in `componentDidMount()` instead of `componentWillMount()` so we can avoid, any side effects of the `fetch()` API.

#### componentDidMount() vs componentWillMount()

The `componentWillMount()` method is called right before the component’s first render. That may trick anyone to think it's the best place to fetch data. But that's not the case! because fetch calls are asynchronous which means the call may not return before the component's rendering, causing the component to render with empty data. There are some precautions you can do such as setting up the initial state so the component will be rendered properly until data arrives and triggers another render cycle.

The `componentDidMount()` method is called after the component's first render so this is where you can safely place any asynchronous code that fetches data, has side effects or manipulate the DOM. 

* When you are taking this approach then you have already setup the initial state, properly, to handle data which is not yet available or the undefined state.   

* For server side rendering, `componentWillMount()` will be called twice from the server and again from the client, so requests to fetch data will be sent twice making an unnecessary round-trip to the server. On the other hand,  `componentDidMount()` is called only once in the client. 

Our example will be updated to something like this:

```js
componentDidMount() {
    this.fetchFirst("reactjs");
} 
```

#### componentWillMount() vs constructor 

In ES6 React, the constructor is called right before the class is instantiated so the question is can you discard `componentWillMount()` in favor of the class constructor when using JavaScript 2015 (ES6) classes?

Apparently `componentWillMount()` lifecycle event is only needed if you are using React with old JavaScript (i.e ES5) through, `React.createClass()` method where you cant't define a constructor. So we can assume that the constructor can be used instead of the after-mount life-cycle event. But that's not 100% correct! because React throws a warning  if there is a side effect in your component constructor but not on `componentWillMount()` event. So it's better to avoid using the constructor if your code needs to update state in other components. Also we saw earlier that `componentWillMount()` is discouraged vs `componentDidMount()` by React developers. As a last conclusion: Use the constructor for any initialization code which doesn't  produce side effects, such as state updates,  and use `componentDidMount()` otherwise. There is even an open issue on React repository to [deprecate the after-mount event](https://github.com/facebook/react/issues/7671). 



### Passing Data via props

Another approach is to pass data to the child component from a parent. But of course the parent component should also avoid the previous approach of fetching data so again where? The parent can use React Router hooks (such as onEnter() hook) to fetch data then pass them to child components via **props**.

In our simple example we have only one component but this is can be easily factored to something like:

Fetch.js

```js

export default {
fetchFirst: function(url){
	fetch('https://www.reddit.com/r/' + url + '.json').then(function (response) {
	        return response.json();
	}).then(function (result) {
		 return result.data.children;	
	}); 
}  
}
```
RedditPost.js

```js
import React from "react";

class RedditPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      id: props.id
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  render() {
			<li key={this.state.id}>{this.state.title}</li>
      );
    }
  }
}

RedditPost.propTypes = {
  id: React.PropTypes.number,
  title: React.PropTypes.string
};

RedditPost.defaultProps = {
  id: null,
  title: ""
  
};

export default RedditPost;
```

App.js

```js
import fetchFirst from "./Fetch";

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }  

  componentDidMount() {
    
      fetchFirst("reactjs").then((posts)=>{
	      this.state.posts = posts;
      });
    
  }    
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React AJAX Example</h1>
        </header>
        <p className="App-intro">
          <ul>
            {this.state.posts.map(post =>
              <RedditPost {...post}/>
            )}
          </ul>          
        </p>
      </div>
    );
  }
}

export default App;

```
 

### Using Redux State Manager

The third approach is to use a state manager like Redux. In this case data can be fetched from anywhere in your code then stored in a global store where it's available for all other components.   

## Conclusion

AJAX allows to fetch data then update the user interface without refreshing the page. It's a requirement for current modern apps. Client side frameworks incorporate services to easily make HTTP  calls but for libraries such as React you need to rely on other libraries or better yet, use the browser standards: the old interface **XMLHttpRequest** which's quite complex (but you can wrap it inside functions or use an external library like jQuery), or the modern browser's **fetch** API (In case you want to support old browsers, you can use polyfills).   

Next tutorials will cover: 

* A complete CRUD example with React, Fetch API (on the front end), PHP and MySQL (on the backend)
* A basic auth system with login and signup using React, the Fetch API, PHP and MySQL. 
