---
layout: post
title: "Redux Tutorial"
image: "images/content/vue.png"
excerpt: "In this tutorial, you'll learn to use Reudx to manage state in your React application" 
tags : [react]
---

**Redux is the most popular state management library that implements the Flux pattern.**

In this tutorial, you'll get introduced to Redux.  

Redux is a state management library that can be used with many popular libraries and frameworks such as Angular, React or Vue or also with plain JavaScript.

>Redux is more popular among React developers than any other library or framework.

This tutorial will show you the basics of Redux which will used in a React application to handle state management.

## Why Use Redux

Managing data in your React application can be done using **React Props** or also the new Context API introduced in **React 16.3+**.

>If you only need to access data in your application from different components then you can simply use the Context API which was created for this intent.

If your data requirements become complex, you need to use advanced features to make creating, mutating and access data from your app's components easier and maintainable. One popular architecture is the Flux pattern implemented by Redux which makes use of a centrally global data store with many concepts and rules that dictate how to access and mutate state in the global store.


## Redux Basics 

Let's get started by understanding the different Redux concepts before we implement our React & Redux demo application.

### The Redux Store

In Redux, the state of the application is centralized in one object which is called the store.

The state can be changed directly but via mutations and actions.

You can expose the state of the store using the `getState` function.

You can update the state using the  `dispatch` method.

You can listen for state changes using  the `subscribe` method.

You can create a unique and global store using the `createStore` function available from the `redux` package. For example:

```js
import { createStore } from 'redux'
import contactReducer from './reducers'
let store = createStore(contactReducer)
```
You can also pass an initial state to the store using the second parameter of the `createStore` function:

```js
let store = createStore(contactReducer, initialState)
```
You can get the state from the store using:

```js
store.getState()
```

You can update the state using:

```js
store.dispatch(addContact({}))
```

### Actions

Actions are simple JavaScript objects that can be used to describe an event in the application. 

> Actions should have a *type* property.

 For example, this is an action that could be used to add a contact:
 
```js
{
type: 'ADD_CONTACT'
}
```

You can also attach data to action objects:

```js
{
type: 'ADD_CONTACT',
name: 'Contact 1'
}
```

### Action Creators

An action creator is a function that creates actions. For example:

```js
CONTACT_ADD = 'ADD_CONTACT';
function addContact(contact){
	return {
		type: ADD_CONTACT,
		name: contact.name || ''
	};
}
```
### Reducers

When actions are triggered in your application, you either should access or mutate state.

A reducer allows you to change the state of the application. 

A reducer is a pure JavaScript function that computes the next application's state from the current state and a dispatched action.

```js
(currentState, action) => nextState
```

> A pure function takes input and returns an output without changing the input.

This is an example reducer:

```js
const contactReducer = (state = '', action) => {
    if (action.type === 'ADD_CONTACT') {
	      return action.name
    } else {
	      return state
    }
}
```
## Prerequisites

To follow this tutorial, you need to have a few prerequisites, such as:

- Node.js **8.10.0+** and NPM installed on your development machine,
- A working knowledge of React,
- Basic knowledge of JavaScript.

## Installing create-react-app

Let's get started by installing the create-react-app  using the following command:

```bash
$ npm install create-react-app -g
```

> Please note that you need to either configure npm to allow you to install packages globally without **sudo** or simpy add **sudo** before your command.

## Creating a React Project

After installing `create-react-app`let's use it to create a React project by running the following command:

```bash
$ npx create-react-app redux-demo 
```

Next, navigate inside your project's root folder and run a development server using:

```bash
$ npm start
```

## Installing Redux

Once you create your React project. Navigate inside the project's folder and run the following command to install Redux:

```bash
$ sudo npm install redux --save 
$ sudo npm install react-redux --save
```

## Creating React Components

Before continue with Redux, let's create the components for our application. 

## Creating Redux Folders

Now let's create a file structure suitable for Redux development. We need to create the following folders inside the `src` folder of our project:

- The **actions** folder, 
- The **reducers** folder, 
- And the **store** folder.
