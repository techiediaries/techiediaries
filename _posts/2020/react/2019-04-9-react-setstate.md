---
layout: post
title: "Understanding React setState() (Callback, Async-Await and Promises)"
image: "images/content/react.png"
excerpt: "In this tutorial we'll look at how to use React setState()" 
tags : [react]
---

React is a component-based user interface library. This means, your application is a set of components (that forms a tree with a root and child components) 

More often than not, your React components will have state. State is formed of variables that contain things like whether a user is logged in or not or an array of posts. 

According to the [docs](https://reactjs.org/docs/faq-state.html). Just like “properties”, the state is a plain JS object which holds information that affects the output of the `render()` method. The state is managed within the component.

Inside a React component, you have two categories of data - props and state - props are simply properties that are passed by the parent component. They stay fixed throughout the life of the component. In the other hand, state is data that changes overtime. Think of props like function parameters and state like local variables.


By the end of this tutorial, you will understand how `setState()` works in React.

## What's React setState

React `setState()` is a function that mutates the component state (i.e `this.state`). The React docs recommends using the `setState()` method instead of directly set state values i.e doing something like `this.state.someState = 'someValue'` (except in the constructor) since using the last approach doesn't guarantee React knows about the current updates in state, so it can properly re-render itself, which may lead to some inconsistent results.  

Components state is a corner concept in React (alongside the component concept itself) and It’s simply a variable (Plain Old JavaScript Object) that stores internal information of a given component.

Outside a constructor, you need to use `setState()` to update your component state. This method takes a JavaScript object that gets merged into the component state but that’s not the only thing that you need to know about the `setState()` in order to correctly use in your application. Here is a list of things that you should know:

- setState() is Asynchronous
- setState() Can Have a Function as A Parameter Instead of An Object
- setState() Can Have a Callback Function

## React `setState()` Example

After initializing your component state, you should use the `setState()` method to update the state afterwards. Let's take this simple example component from our previous [tutorial](https://www.techiediaries.com/react-json-fetch-rest-api-bootstrap):


```js
import React, { Component } from 'react';

class App extends Component {
  state = {
    todos: []
  }
  componentDidMount() {
    fetch('http://jsonplaceholder.typicode.com/todos')
    .then(res => res.json())
    .then((data) => {
      this.setState({ todos: data })
      console.log(this.state.todos)
    })
    .catch(console.log)
  }
  // [...]
}
export default App;
```

We have a `todos` state which will hold the todos we are going to fetch from the REST API in the `componentDidMount()` hook.

In the constructor of the component we are passing an empty array to the `todos` state.

After [fetching data from the REST API](https://www.techiediaries.com/react-axios/) we use the following line to update the state of the component:


```js
this.setState({ todos: data }) 
```

As you can see, we pass a JavaScript object to the `setState()` method. This object contains the portion of the state we intend to update which, in this case, is the `todos` array. React simply merges the value of the `todos` object into the `todos` object in the state variable.

This process is called [**reconciliation**](https://reactjs.org/docs/reconciliation.html).

Reconciliation refers to how React update the DOM. It basically make changes to the component following the change in the state. When you call `setState()`, React creates a new tree containing the reactive elements in the component and the new state. This tree is then used to figure out how our component should change by making a comparison with the previous component tree using a diffing algorithm which allows React to update only the DOM portion that needs to be changed.  


## The setState Wrap-up

React provides the `state` object to store and internal state of a component and the `setState()` method to change the state.

Here is what you should know when using `setState()`

- You should only use `setState()` to update the component state i.e don's change the state object directly except when initiliaizing the state.
- the `setState()` method can be passed an object or a function.
- You need to pass a function to `setState()` when you want to apply subsequent/multiple update to the state and don't rely on the value of `this.state` immediately after invoking `setState()`.
  


