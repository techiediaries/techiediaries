---
layout: bpost
title: "Vue.js 3 Tutorial by Example: Install Vue 3 and Create App"
image: "images/content/vue.png"
excerpt: "In this tutorial, we'll show you how to develop a simple app using the current alpha version of Vue 3,  we'll particularly focus on the new features" 
categories: vue-js
tags : [vuejs, vue-3] 
---


Vue.js 3 is the upcoming version of Vue which was re-written from scratch with TypeScript by the Vue team. It's not released to the public yet for the production use, but alpha versions are already released.
 
Vue 3 is not available for use in production at the current time but you can still use the alpha version to learn about the new features.


In this tutorial, we'll show you how to develop a simple app using the current alpha version of Vue 3, we'll particularly focus on the new features.

## Do you Need to Learn Vue 2 or Vue 3 at this Time?

Since Vue 3 is not released yet, you can start by learning Vue 2. Because, even if many new APIs will be introduced or updated, most of the fundamental concepts and patterns of Vue 2 will still be available in Vue 3.


This is what you'll learn by following this tutorial:

-   Installing Vue 3,
-   Creating a new Vue 3 app
-   Working with state
-   Creating a template
-   Working with the Composition API


## How to Install Vue 3? 

Let's get start by install Vue 3 using git and npm.

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