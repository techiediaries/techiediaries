---
layout: post
title: "Vuex Tutorial"
image: "images/content/vue.png"
excerpt: "In this tutorial, you'll learn to use Vuex to manage state in your Vue application" 
tags : [vue, vuejs]
---

**Vuex is the official state management library for Vue applications.**

In this beginners tutorial, you'll be learning about Vuex and how you can use it to deal with complex data requirements in your front-end application. 

In this tutorial, we make the assumption that you don't have and previous experience working with Vuex.
 
Let's get started with this tutorial—so what's Vuex?

Vuex is a a Vue implementation of the Flux state management pattern. It's a library for working with data in your Vue applications. 

> Vuex is the official state management library for Vue.js

Vuex enables developers to make complex data management easier and more efficient by using a global data store that can be accessed from all components of the Vue application for getting or setting data.

> Vuex allows yo to efficiently share data between the application components.

Vue Components can use different ways to communicate data between each other, such as:

-   **props**: Props are used to pass state from a parent component to its children, 
-   **events**: Events are used to change the state of a  component from its children.

Props and events can be enough for simple scenarios but once the data requirements for your application becomes complex, you'll need to implement other advanced strategies or patterns.

Among these patterns is the Flux pattern  which aims to centralize the state across an application. In a Vue application, you can implement this pattern using Vuex.

Another popular implementation of the Flux pattern is Redux which more popular among React developers. But Redux is framework-agnostic which means you can also use it with Vue.

With that said, Vuex is the better option in Vue because it offers a better integration  since it's the official library for state management in Vue.

## Prerequisites

In order to compete this tutorial, you need to have a few requirements such as:

- A development environment ready with Node.js 8.9+ and NPM installed,
- A basic knowledge of modern JavaScript,
- A working experience of Vue.js.

That's all what you need. You'll install the other requirements throughout this tutorial.

## Installing the Vue.js CLI v3

In this tutorial, we'll be using the latest version of Vue.js CLI to generate a new Vue project so first let's start by installing the CLI.

Head back to your terminal and run the following command:

```bash
$ npm install @vue/cli -g 
```

Since your are installing the CLI globally on you system, make sure you have the required permissions by configuring your npm configuration or simply use sudo before you command.

## Creating a New Vue.js Project 

After installing the Vue CLI, let's use it to generate a new project
 by running the following command in your terminal:

```bash
$ vue create vuex-demo
```
This will generate a `vuex-demo` project in your current directory.
 
The CLI will be asking for a preset that will be used for your project. You can also manually choose the features needed for your project from a set of official plugins like Babel, TypeScript, PWA, Vue Router and Vuex. 

So go ahead and manually select Babel, Vue Router and Vuex for your project.

The CLI will also ask you for some other options for configuring the router such as `router history` and `dedicated config files`. You can also choose if you want to save the preset or not.
 
 To make sure everything works as expected, navigate inside your project's folder:

```bash
$ cd vuex-demo
```

Next run the development server using:

```bash
$ npm run serve
```

You should be able to go to the `localhost;8080` address to see you application running:

![](https://i.imgur.com/ZuWz5b3.png)
 


That's it, you are now ready to start learning Vuex by implementing a simple application that manages its state using a central store.

## Creating the Components 

Now that we have created our project, let's create the components of our application.

Under the `src/components` folder, create two `ContactList.vue` and `ContactDetail`  files:

```bash
$ cd src/components
$ touch ContactList.vue
$ touch ContactDetail.vue
``` 
Next open the `src/App.vue` file and add a link to `ContactList.vue` component:

```html
<template>
<div id="app">
<nav>
<router-link to="/contacts" exact>Contact List</router-link>
</nav>
<router-view/>
</div>
</template>
```

Next open the `src/router.js` file and add a new route to the `ContactList.vue` component:

```js
import ContactList from './components/ContactList.vue'
import ContactDetail from './components/ContactDetail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkClass: "nav-link",
  linkActiveClass: "active",
  routes: [
    {
      path: '/contacts',
      name: 'list',
      component: ContactList    },
    {
      path: '/contacts/:id',
      name: 'detail',
      component: ContactDetail
    },
  ]
})
```

For now, add the following template inside the `src/components/ContactList.vue` file:

```html
<template>
  <div class="contact-list">
    <h1>
	    Contact List
    </h1>
  </div>
</template>
```

Also inside the `src/components/ContactDetail.vue` file, add the following template:

```html
<template>
  <div class="contact-detail">
    <h1>
	    Contact Details
    </h1>
  </div>
</template>
```

That's all for now about components.

## The Vuex Basics

Before continue building our Vue application, let's first understand the Vuex basics.

### What's a Vuex Store

A Vuex store is a central object for storing data in your Vue application. It also provides different methods for accessing and mutating global state.

This is an example of a basic store:

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({})
``` 
We use the `Vuex.Store` method to create a store. It takes different properties, such as:

- `state`; this object contains the actual state of the application i.e any variables and array etc.
- `mutations`: this object contains the methods that will be used to mutate the state,
- `actions`: this object contains methods that call the mutation methods.

### Mutations

Mutations are functions that enable you to mutate and upsate the state in a Vuex store. These function can not be called directly but instead they need to be committed using the `.commit('mutation')` of the Vuex store.

> Mutations are synchronous functions.

### Actions

Actions are functions that can be used to commit the mutations. 

> Actions can do asynchronous operations.

## Conclusion

In this first part of the Vuex tutorial, we've installed the Vue CLI and used it to create a Vue demo that will be used to demonstrate the different concepts of Vuex.

We've also seen basic concepts like the Vuex store, state, mutations and actions.