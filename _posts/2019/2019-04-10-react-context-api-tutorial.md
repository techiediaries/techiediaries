---
layout: post
title: "React 16.3 New Context API Tutorial"
image: "images/content/react.jpg"
excerpt: "In this is quick tutorial you'll learn how to use the new Context API in React 16.3+" 
tags : [react] 
featured: false
author: ahmed
---

In this is quick tutorial you'll learn how to use the new Context API in React 16.3+.

Starting with version **16.3** React has a new context API. So in this tutorial we'll learn why you need to use the API and how to get started using it. 

## Why Using the React Context API

In most real world cases, your React application will consist of multiple components which form a tree with parent and child components. Now, what do usually do when you are trying to access state from a parent component in a child component?

You would need to use what we call **prop drilling** which simply means that you are passing props through a set of intermediary components which don't need to use the data associated with those props but receive them anyway just for the sake of sending data down to the component that actually need it.  

You could very well solve this problem using a state management library like Redux but in case you don't want to use a state management library, the new React 16.3 context API can help you pass state to deep components in your application tree in a more elegant and easy way.

To implement the new Context API you have to consider these three things. 

## Using the Context API in React 

To create a context, you use the `React.createContext()` method which can take some initial value. This method returns a context object which provides two components: 

- A Provider component,
- And a Consumer component. 

### How to create a Context Using the `React.createContext()` Method


For example, let's create a context using this method:

```js
const aContext = React.createContext('someInitialValue')
```   

### Using the Context Provider Component 

You need to use the Context `Provider` component (`aContext.Provider`) in the top parent component of the tree (the component from where you want to send the state). The `Provider` accepts a  **value** prop which can take any value.

### Using the Context Consumer Component

You need to use the `Consumer` (`aContext.Consumer`)component anywhere in the tree below the provider.

The Context `Consumer` component accepts a children prop that needs to be a function which takes the provided value and returns a React element:

```js
class App extends React.Component {
  state = {
    message: 'Hi child!'
  }
  render() {
    return (
      <aContext.Provider value={this.state.message}>
        <!-- Place consumer component-->
      </aContext.Provider>)
  }
}
```

The `App` component has a *message* state. By using a Context `Provider` component and passing the `state` as a value; it becomes available as a context for any  Context `Consumer` component, down the tree (i.e the children of the `Provider` component).   

Now, how to create a Context `Consumer` component? By simply wrapping a render prop or a higher order component with the Context Consumer object: 

```js
class MiddleComponent extends React.Component {

  render() {
    return (
      <aContext.Consumer>
        { (value) => <div>My parent component says: {value}</div>}
      </aContext.Consumer>
    )
  }
}
```

Change the `App` component as follows:

```js
class App extends React.Component {
  state = {
    message: 'Hi child!'
  }
  render() {
    return (
      <aContext.Provider value={this.state.message}>
        <MiddleComponent></MiddleComponent>
      </aContext.Provider>)
  }
}

render(<App />, document.getElementById('root'))
```

You should get:  **My parent component says: Hi child!**

<iframe src="https://codesandbox.io/embed/2vrr7w86nr" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Wrap-up: React Context API

Using the new React 16.3 Context API can be used as an alternative for Redux if your sole purpose of using a state management library is avoiding **prop drilling**.  

In this tutorial we've seen how to use React Context API Provider and Consumer components to pass state down the components tree in your React application without resorting to prop drilling. 

