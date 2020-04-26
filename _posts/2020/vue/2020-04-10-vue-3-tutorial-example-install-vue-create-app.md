---
layout: bpost
title: "Vue.js 3 Tutorial by Example: Install/Create Vue 3 App and Composition API"
image: "images/content/vue.png"
excerpt: "In this tutorial, we'll show you how to develop a simple app using the current alpha version of Vue 3,  we'll particularly focus on the new features" 
categories: vue-js
tags : [vuejs, vue-3] 
---


Vue.js 3 is the upcoming version of Vue which was re-written from scratch with TypeScript by the Vue team. It's not released to the public yet for the production use, but the beta version is already released.
 
Vue 3 is not available for use in production at the current time but you can still use the beta version to learn about the new features.


In this tutorial, we'll show you how to develop a simple app using the current beta version of Vue 3, we'll particularly focus on the new features.

## Do you Need to Learn Vue 2 or Vue 3 at this Time?

Since Vue 3 is not released yet, you can start by learning Vue 2. Because, even if many new APIs will be introduced or updated, most of the fundamental concepts and patterns of Vue 2 will still be available in Vue 3.


This is what you'll learn by following this tutorial:

-   Installing Vue 3,
-   Creating a new Vue 3 app
-   Working with state
-   Creating a template
-   Working with the Composition API


## How to Install Vue 3? 

We can install Vue 3 and create a new project using two methods or more, let's see how.


## Create a Vue 3 Project Using GitHub and NPM

Let's get started by installing Vue 3 using git and npm.

Head over to a new command-line interface and run the following commands:

```bash
$ git clone https://github.com/vuejs/vue-next-webpack-preview.git vue3-example
$ cd vue3-example
$ npm install

```

After installing the dependencies from npm, let's proceed by removing the boilerplate files and create a new  `main.js`  file where we can bootstrap our Vue 3 app:

```bash
$ rm -rf src/*
$ touch src/main.js
```

Next, you need to run the development server as follows:

```bash
$ npm run dev
```

## Initializing a New Vue 3 App

With Vue 3, we have a new way to bootstrap a new Vue app. We should now be using the the new  `createApp`  method instead of  `new Vue()`.

Open the new `src/main.js` file and invoke the `createApp` method with a definition object as follows:

```js
import { createApp } from "vue";

const app = createApp({});
```

We assign the Vue app to an `app` variable. 

Next, we need to call the  `mount`  method on the `app` instance and provide the CSS selector of the  DOM  element where we'll be mounting our Vue app:

```js
app.mount("#app");
```

Using the new  `createApp` method  we create  a new app instance that will not be polluted by any global configuration (plugins, mixins, prototype properties etc.)  applied to other instances. This particularly comes handy when writing unit tests to make each test isolated from the other.

Learn more:  [Global API change RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0009-global-api-change.md).


## Create a Vue 3 Project with Vue CLI and The `vue-next` plugin

Now, let's see a second way that you can use to create a Vue 3 project at this time by using Vue CLI with the `vue-next` plugin.

First, open a new terminal and install the latest version of Angular CLI if it's not yet installed in your development machine:

```bash
$ npm install --global @vue/cli
```

At the time of writing this tutorial, we have installed `@vue/cli v4.3.1`. 

Next, let's initialize a new app using the Vue CLI with Babel and ESLint plugins using the following command:

```bash
$ vue create vue3-example
```

You'll be prompted: 

```bash
Vue CLI v4.3.1
? Please pick a preset: (Use arrow keys)
❯ default (babel, eslint) 
  Manually select features 
```

Since Vue 3 is not publicly released yet, the CLI has generated a Vue 2 project but we can convert it to a Vue 3 project by adding the `vue-next` plugin as follows:

```bash
$ cd vue3-example
$ vue add vue-next
```

Now, if you open the `main.js` file of your Vue application, you'll see the following code:

```js
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

This is the code for initializing a new Vue 3 instance.

Next, we can start a live reload development project using the following command:

```bash
$ npm run serve
```


## Fetching Data from an API

Let's now see how to implement a basic functionality of our application by fetching data from a remote REST API and using various Vue 3 features such as state and composition API.

