---
layout: post
title: "React Hooks Tutorial: useState and useEffect Examples [2019]"
image: "images/content/react.png"
excerpt: "React Hooks are a new feature that's recently released by the React team. In this tutorial, you will learn the basics of Hooks and how to migrate a React app to use functional components and Hooks instead of classes" 
tags : [react , javascript]
---

In this tutorial, we'll learn about React Hooks and see examples of using the `useState()` hook for adding state and the `useEffect()` hook for performing side effects in your functional components.

React Hooks are a new feature recently released by the React team. It's included in React starting with v16.7.

![React Hooks Tutorial](https://i.imgur.com/ncqqnx7.png)

In this tutorial, we'll learn to migrate our previous project to use function components and React Hooks instead of class components, life-cycle methods, and the state object.

## Prerequisites 

You need to have:

- Node.js 6+, `npm` v5.2+ and `create-react-app` for running the React app,
- Basic knowledge of ES6.

## Introduction to React Hooks

Before migrating our demo project to functional components and React Hooks let's first understand what hooks are and why we need to use them.

So why all that buzz about React hooks? And what can they do for you?

Simply, if you need to use React features like **state** and **life-cycle events/methods** (which is often most of the times) you would need to use or switch to ES6 **classes** by extending **React.Component**. But, that's not the case anymore; with hooks - You can now use those commonly needed features in your **functional components**.

## What is A React Hook?

React is nowadays the most popular and used UI library in the world. The team is constantly trying to improve both the performance of the library and the developer experience by adding new features that make developer's lives easier.
  
A [React Hook](https://reactjs.org/docs/hooks-overview.html) is a new feature to use the `React.Component` features in a functional component. 

These features include:

- The state object,
- Life-cycle events like `componentWillMount`, `componentDidMount`, `componentWillUpdate` and `componentDidUpdate` etc.
- The context, 
- The refs etc.

Class-based components are still useful. It's just that you have now more options to do the same thing and It's up to your preferences to use either classes or functions to build your React apps without being limited by the lack of features with any option.

Just like with the other React concepts; they have fancy names but they are simple concepts to understand. Hooks are also simple functions that allow developers to “hook into” React state and life-cycle methods from functional components. 

React Hooks are not available in class-based components — but instead they allow you to use React without JavaScript classes. If you prefer to use functions instead of classes (which is recommended in JavaScript) you can simply start using Hooks without worrying about migrating your whole apps to classes.

Hooks enable you to use “class-features” In React by providing a set of built-in functions such as:

- The `useState()` hook for using states from function components,
- The `useEffect()` hook for performing side effects from function components (It's equivalent to life-cycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` in React classes),
- The `useContext()` hook for subscribing to React Context from a function component,

- The [`useReducer()`](https://reactjs.org/docs/hooks-reference.html#usereducer) hook for managing the state of components with a reducer

- [`useRef`]() for React Refs,

- The [`useCallback`](https://reactjs.org/docs/hooks-reference.html#usecallback) hook for callbacks,

- The [`useMemo`](https://reactjs.org/docs/hooks-reference.html#usememo) hook for memoized values,

- The [`useImperativeMethods`](https://reactjs.org/docs/hooks-reference.html#useimperativemethods) hook for imperative methods,

- The [`useMutationEffect`](https://reactjs.org/docs/hooks-reference.html#usemutationeffect) hook for mutation effects,

- The [`useLayoutEffect`](https://reactjs.org/docs/hooks-reference.html#uselayouteffect) hook for layout effects.


You can also create your custom Hooks to re-use any stateful behavior between different components.

> **Note**: React Hooks lets you have **stateful functional components**.

React Hooks are typical JavaScript functions, with the exception that they need to obey some rules:

-  React Hooks need to be **used at the top level** i.e not inside nested functions or other JS constructs like loops or *if* conditions etc.
- React Hooks need to be **used in functional components** not in regular JavaScript functions. You can also call built-in Hooks from your custom Hooks

The React team provides a  [linter plugin](https://www.npmjs.com/package/eslint-plugin-react-hooks)  that can be used by developers to make sure these rules are respected so the React Hooks can work as expected in your app. 

## Example Accessing State in Functions with `useState()`

Now that we have seen some theory about React Hooks. Let’s see a simple example of a stateful function component with the `useState()` hook. Let’s start with a simple stateless function component that we are familiar with.

This a simple React app with one `ContactPage` function component:

```js
import React from 'react';
import { render } from 'react-dom';

function ContactPage(props) {
   return (
    <div>
     <h1>Contact Page</h1>
    </div>);
}

render(
  <ContactPage />,
  document.querySelector('#root'));
```

In the old React, If we want to keep or work with any state in this component we'll need to convert it into a class component. For example, let's say we need to use an email variable in our component. This is what we'll have to do:

```js
class ContactPage extends React.Component {
  state = {
    email: 'a@email.com'
  }


  render() {
    return (
     <div>
       <h1>Contact Page</h1>
        <p>My email is {this.state.email}</p>
       </div>
    );
  }
}
```   

We rewrite our component to use a class instead of a function so we can be able to use the **state** object.

Now, thanks to React Hooks we can simply use this alternative code without re-writing you component:


```js
import React,  { useState }  from  'react';
import { render } from 'react-dom';

function ContactPage(props) {
   const  [email, setEmail]  =  useState('a@email.com');
   return (
    <div>
       <h1>Contact Page</h1>
        <p>My email is {this.state.email}</p>     
    </div>);
}
```

This is our regular function but it now has a state thanks to the `useState()` hook function.

> **Note**: Hook functions start with the *use* word which is another rule of Hooks.

The `useState()` hook takes an initial state and returns an array with two elements: 

- The current state, 
- and a function to set the state. 

In our example, we pass in the *a@email.com* string as initial state and we use Array destructing assignment to grab variables and rename them properly. 

We can access the current piece of state using `email` and the function to set the state using `setEmail()`.

The `useState()` hook provides us with two variables that we need to rename with proper names. To be able to rename these variables properly, you need to know these two things:

-  The first element of the returned array presents the  **value** which equivalent to `this.state` in the class components.
- The second element is a function to set that value which is equivalent to  `this.setState()` in classes.

The state can be any valid JavaScript object. 

## Example using The Effect Hook in React

Now that we have seen the State Hook with example and understand why we need to use it - i.e to have state in React functional components. Let's see an example using the Effect Hook to be able to perform side effects in our functional components without resorting to using life-cycle methods which are only available in class components. 

> **Note**: Effect Hooks are equivalent to `componentDidMount`, `componentDidUpdate` and `componentWillUnmount` life-cycle methods combined.

Side effects are common operations that most web applications need to perform, such as:

-   Fetching and consuming data from a server API,
-   Updating the DOM,
-   Subscribing to Observables etc.

> **Note**: Effect Hooks will run after every render, including the first render.

Here is an example:

```js
import React, { useState } from 'react';

function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch('127.0.0.1:8000/customers')
      .then(response => response.json())
      .then(data => {
        setCustomers(data); // set customers in state
      });
  }, []); 
}
```

We first use the `useState()` hook with an empty array for the initial state to create a `customers` state variable.

Next, we'll use the `useFetch()` hook to run a side effect which is sending a request, using the Fetch API, to an API endpoint that returns a list of customers.

We finally use the `setCustomers()` method to assign the returned data to the `customers` state variable.

## Conclusion

You can combine many types of hooks or use the same hook multiple times in your application without any problem. In fact, in most apps, you'll have to use them both to be able to fully use functional components without resorting to any feature in class-based components.

