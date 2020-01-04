---
layout: post
title: "React Fragment Tutorial"
image: "images/content/react.png"
excerpt: "React Fragment Tutorial" 
tags : [ react ]
---

In this quick tutorial you'll learn about React Fragments.


When you want to render multiple React components or DOM elements in your component `render()` method you will need to wrap them in a top level element which has no role but to wrap these components in such a way that only one component is returned from the `render()` method.


## React Fragments

According to [React docs](https://reactjs.org/docs/fragments.html):

>Fragments lets you group a list of children without adding extra nodes to the DOM 

Wrapping your components inside `<React.Fragment>` allows you to have a single parent tag in your JSX code without actually inserting an extra node to the DOM. 

React fragments we introduced in [React v16.2](https://reactjs.org/blog/2017/11/28/react-v16.2.0-fragment-support.html).

## Why Using React Fragments

In prior versions of React, each component has to return only one single element. For example, the following code will throw an error even if it seems correct:

```js
class App extends Component {
  render() {
    return <h1>Example</h1><p>React example</p>
  }
}
```

To get rid of the error, you will need to wrap the two elements in a single element:

```js
class App extends Component {
  render() {
    return (
      <div>
      <h1>Example</h1>
      <p>React example</p>
      </div>
    )
  }
}
```

As you can notice, we need to use an extra `<div>` just for the sake of wrapping the two elements. 

## Introducing Fragments in React 16.2

Starting from React v16.2, we have Fragments.

A Fragment lets you group and return a list of chidren elements in the `render()` method of you component without adding extra nodes to the DOM.

You can import `Fragment` from the `react` package and can be used like any other JSX element.

## How to use React `Fragment`

You can use React `Fragment` just like you  would use the wrapper `<div>`.

First, let's import `React` and `Fragment` from `react`:

```js
import React, { Fragment } from 'react'
```

Next, wrap your element with `<Fragment>...</Fragment>`:

```js
class App extends Component {
  render() {
    return (
      <Fragment>
      <h1>Example</h1>
      <p>React example</p>
      </Fragment>
    )
  }
}
```

## `<></>`: A Shorthand for React Fragments

React 16.2 also introduced a simple way for using fragments using the `<></>` syntax. The previous example can be written as follows:

```js
class App extends Component {
  render() {
    return (
      <>
      <h1>Example</h1>
      <p>React example</p>
      </>
    )
  }
}
```  

This is a simple syntax which doesn't require you to import `Fragment` from `react`.

## Wrap-up

In this tutorial, we've learned about React Fragments and why we need to use them.