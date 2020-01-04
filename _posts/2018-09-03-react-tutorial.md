---
layout: post
title: "React Basics Tutorial for Django Developers [2018]"
image: "images/content/react.png"
excerpt: "Learn React quickly with this tutorial" 
tags : [react, django, python] 
---

In this tutorial, We'll introduce React basics to Django developers. You can use React to build UIs using re-usable [components](https://en.wikipedia.org/wiki/Component-based_software_engineering) which allow maximum reusability and a [virtual DOM]() that provides better performance.

  

In this tutorial, we'll learn how to <a  href="https://www.techiediaries.com/react-tutorial#Including_React_in_Django_Templates">include React in a Django template</a> and learn about the basics of React such as **components, state and props**.

  

But what's virtual DOM? This is the [definition from the official React website](https://reactjs.org/docs/faq-internals.html)

  

>The virtual DOM (VDOM) is a programming concept where an ideal, or “virtual”, representation of a UI is kept in memory and synced with the “real” DOM by a library such as ReactDOM. This process is called reconciliation.

  

**React** is nowadays-2018-the most popular front-end library for building User Interfaces. Throughout this tutorial we'll go through a basic understanding of React.js by creating a React application from scratch and step by step. We will focus on the core features of React. After getting the core concepts, you can dive into more learning more comfortably.

  

By following this tutorial, you'll learn:

  

- How to get started with React using a `<script>` tag;

- How to include React in a Django template;

- What's a React component;

- How to create React components;

- How to use the `ReactDOM` library to mount your React app into the DOM;

- How to handle data in React;

- The difference between props and state in React;

- How to use props;

- How to use state;

- How to mutate or update state in React etc.

  

React provides a set of modern features such as:

  

- A component based architecture;

- Reusable components;

- Stateful and stateless components;

- And virtual dom.

  
  

## Getting Started with React

  

Since we are getting started with React, we are not going to use complicated tools such as `create-react-app` (In fact this tool was created to make creating React applications less complex without worrying about Webpack and complex front-end tooling), instead we'll use a simple setup i.e the old way of using libraries in front-end web development.

  

Start by creating a basic HTML page:

  
  

```html

<html>

<head>

<title>React Tutorial</title>

</head>

<body>

</body>

</html>

```

  

Now use the `<script>` tag to include `React` and `ReactDOM` libraries. In the `<head>` of your HTML page, add:

  

```html

<script  src="https://unpkg.com/react@15/dist/react.min.js">  </script><script  src="https://unpkg.com/react-dom@15/dist/react-dom.min.js">

</script>

```

  

You also need to include Babel:

  

```html

<script  src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>

```

  

We are using the `unpkg.com` service which allows us to import NPM modules as normal JavaScript scripts without using npm and related modern front-end tools to install and use the dependencies.

  

Since React makes use of modern JavaScript features, we use Babel which is transpiler that transpiles the ES6 features to JavaScript features that can be interprited by most existing browsers.

  

We also use Babel for transforming JSX templates (used by React to include HTML in JavaScript) into JavaScript.

  

**We are loading React from a `<script>` tag, you can also use modern tools like npm and the import/require system when building complex apps.**

  

Next, we need to add a root `<div>` where we'll mount our React application.

  

Inside the `<body>` element, add the following HTML:

  

```html

<div  id="root"></div>

```

  

Also, inside the `<body>` tag, add the following `<script>` where we're going to add the React code:

  

```js

<script  type="text/babel">

/* React code */

</script>

```

  

At this step, you can install an http server so you can run the example on your browser or simply use [codepen](https://codepen.io/techiediaries/pen/WgpPrb).

## <a name="Including_React_in_Django_Templates">Including React in Django Templates</a>

  

In this section, we'll see how to include React in Django templates. Django has a powerful template system that makes use of inheritance to reduce repetition and augment code reuse so let's start by creating the `base.html` template inside the `templates` folder and add the following HTML:

  

{% raw %}

```html

{% load static %}

<!doctype html>

<html>

<head>

<meta  charset="utf-8">

<meta  http-equiv="X-UA-Compatible"  content="IE=edge">

<title>Django & React Tutorial</title>

  

<meta  content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"  name="viewport">

</head>

  

<script  src="https://unpkg.com/react@15/dist/react.min.js">  </script>

  

<script  src="https://unpkg.com/react-dom@15/dist/react-dom.min.js">

</script>

  

<script  src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>

  

<body>

  

<noscript>You need to enable JavaScript to continue with this application.</noscript>

  

<div  id="root"></div>

{% block inner %}

{% endblock %}

</body>

</html>

```
{% endraw %}

Create an `index.html` template that extends the `base.html` template and add the following content:

{% raw %}

```html

{% extends "base.html" %}

  

{% block inner %}

<script  type="text/babel">

/* React code here */

</script>

{% endblock %}

```
{% endraw %}

## React Components

In React, you build your UI as a hierarchy of components. A component controls a part of the UI and It's simply a JavaScript/ES6 class that extends the base `React.Component`. For example, this is a simple `HelloWorld` component:
  
```js

class  HelloWorld  extends  React.Component {

render() {

return  <h1>Hello World!</h1>;

}

}

```

The component simply renders a `<h1>Hello World!</h1>`. We use the `render()` method which is provided by the parent `React.Component`. **The `render()` method should return what your component needs to render on the screen**.


In React, you can use different types of components such as **parent** and **child** components. You will also make use of **smart** and **dump** components. **A smart component maintains state while a dump component doesn't maintain any state**.

Components have many benefits. The most important benefit for a developer is code-reuse i.e you can reuse your components in the same app or throughout multiple apps.  

## Using ReactDOM

Now that we have a basic React component that renders something on the screen and a simple HTML page, we need to mount the simple React application in the HTML body of our page. For this matter, we need to use the `ReactDOM` library.

  

Before the closing `</body>` tag, add the following code within a `<script>` tag:

  

```js

<script>

ReactDOM.render(

<HelloWorld  />,

document.getElementById("root")

);

</script>

```

We use the `render()` method to mount the our top-level and only component into the root `<div>` which we grab using the `document.getElementById("root")` method.

This will be enough to mount our React component. You should now see a *Hello World* on the screen.


## Handling Data in React

You can make use of data in React using two forms: `props` and `state`.

**Props are used to communicate or pass data between components and they are external to the component while state is used to maintain the internal state of a component.**

**A React component can change its internal state directly but not the props.**

## Understanding React Props

Props allow you to pass data to a component which allows for maximum re-usability of the component.

Let's, for example change our previous **HelloWorld** component to be more dynamic by rendering a message that's passed via a prop instead of always rendering *Hello World*.

We can pass a *message* prop to the component using the following syntax:

```js

<HelloWorld  message="Hello React"  />

```

**The prop is called *message*, you can use any meaningful name for your prop. The *message* prop takes a *Hello React* value.**

  

Now, we need to change the component to handle the prop:

  

```js

class  HelloWorld  extends  React.Component {

render() {

return  <h1>  {this.props.message}</h1>;

}

}

```

We access the props in our component by using the `this.props` object. Since this is JavaScript code we include it inside curly braces which tells JSX to interpret and render the result.

**As you can see this allows us to use the component to render different messages instead of just the *Hello World* message.**

  

## Understanding React State


A component in React can maintain its own internal state using a **state** object. The component that maintains a state is called a **smart component**.

  
Let's now add state to our previous component:


```js

class  HelloWorld  extends  React.Component {

constructor(){

super();

this.state = {

message:  "Hello React!"

};

}

render() {

return  <p>{this.state.message}</p>;

}

}

```

In the constructor of the component, we simply assign a JavaScript object to `this.state` to initialize it.

The message is now a part of the internal state of the component.

We can access the state using `this.state`.

### Mutating/Changing State in React

To mutate or change state in your React component, you simply need to use the `this.setState()` method. For example:

```js

this.setState({

message:  "Hello Again"

});

```

## Conclusion

In this tutorial, we've quickly gone through the basic concepts of React. 




