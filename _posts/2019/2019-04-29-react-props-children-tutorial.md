---
layout: post
title: "React Props Tutorial: Children Example"
image: "images/content/react.png"
excerpt: "In this tutorial, you'll learn about React props" 
tags : [react]
skipRss: true
---

React is a popular user interface library for building UIs with components and render them using a virtual DOM. 

Basically, your build your React application as a tree of components with a parent root component (Usually called `App`) and child components.

## What's React Props

More often that not, components need to communicate between each other by passing data from a component to another or from a parent component down the tree.

You can pass data down to a child component via its **props** which is short for **properties**.

## Example of Using the React Props Object

Each component owns a `props` object that holds any properties that are passed from a parent component.

Let's take a simple example.

In this example we assume that you already have a React project ready. 

## Creating a Child React Component: The props children property

Let's start by creating a child React component that will be used in the parent `App` component.

In the `src/` folder, create a `Header.js` file and the following code:


```js
import React from 'react';

class Header extends React.Component {
	render() {
		return (
			<header role="banner">
				{this.props.children}
      </header>
		);
	}
}

export default Header;
```

We use the `children` property of `this.props` to display the content that exists between the opening and closing tag when invoking a component. In this case, our `Header` component.   

According to the [React docs](https://facebook.github.io/react/docs/composition-vs-inheritance.html), you can use `this.props.children` in components that can be used as **generic boxes** which don't know their children ahead of time. 


Next, open the `src/App.js` file, import the Header component and update the `render()` method as follows:

```js
import React from 'react';
import Header from 'Header.js';

class App extends React.component{

	render() {
		return (
      <Header>
        <h1>This is the header</h1>
      </Header>
		);
	}
}
export default App;
```

## Creating a Second React Child Component: Passing Data via Props

Next, let's create a second React component called `Main` that will be also invoked from the `App` component. 

Create a `Main.js` file and add the following code:

```js
import React from 'react';

class Main extends React.Component {
	render() {
		return (
			<div>
        <h2>{ this.props.title } </h2>
        <p>
        { this.props.bodyText }
        </p>
      </div>
		);
	}
}

export default Main;
```

The Main component expects two props - `title` and `bodyText` which need to be passed from the parent component.

Next, let's invoke the `Main` component from the `App` component

Open the `src/App.js` file and update it accordingly:

```js
import React from 'react';
import Header from 'Header.js';
import Main from 'Main.js';


class App extends React.component{

	render() {
		return (
      <Header>
        <h1>This is the header</h1>
      </Header>
      <Main title='This is a the main section' bodyText='Hello World!'>
      </Main>
		);
	}
}
export default App;
```

We import and invoke the `Main` component and we pass values to the `title` and `bodyText` props.

As we've seen we can access the passed data from the child component using the `props` object.

## Props and the Functional React Components

In a functional component, you can access the props object as follows:

```js
const Header = (props) =>{
  return (
			<header role="banner">
				{ props.children }
      </header>
		);
}
```

The `props` object is passed as a parameter to the component so you don't need to use `this`.

## Wrap-up of React Props

In this tutorial we've learned about React props.

We have created two child components of the `App` component - Header and Main.

The `Header` component renders whetever exists between the opening and closing tag by using the `children` property of the `props` object.

The `Main` component displays a title and a text as body using the `title` and `bodyText` props.  

