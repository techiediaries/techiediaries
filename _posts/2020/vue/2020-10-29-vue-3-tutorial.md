---
layout: bpost
title: "Vue.js 3 Tutorial by Example: Create Vue 3 App, Components, Router & Composition API"
image: "images/content/vue.png"
excerpt: "In this tutorial, we'll show you how to develop a simple app using the current version of Vue 3,  we'll particularly focus on the new features" 
tags : [vuejs, vue-3] 
---

Vue.js 3 is the latest version of Vue which was re-written from scratch with TypeScript by the Vue team. 

Vue 3 is available for use in production at the current time so you can use the new version to learn about its new features.

In this tutorial, we'll show you how to develop apps using the current version of Vue 3, we'll particularly focus on the new features.

Throughout this tutorial sections, you will learn how to use Vue 3 and the Composition API and the router to build your web application examples. We'll also learn about the `ref()` function in Vue 3. In Vue 3, you can use the `ref()` function to define a reactive variable and then we'll learn about the `setup()` method in Vue 3.

The Composition API is introduced in Vue 3 as an alternative to the Options API. We'll learn how to create reactive state using the `reactive()` function. We’ll be learning how to create a shopping list application with Vue 3 and the Vue Composition API.
 
The Composition API allows you to write and organize components in a Vue 3 application following a reactive approach. The Vue Composition API will help you to build a more scalable application.

## What's Vue 3 and Its New Features

In this section, we'll see a summary of the new features coming with Vue 3.

[Vue 3](https://medium.com/the-vue-point/plans-for-the-next-iteration-of-vue-js-777ffea6fabf) is the new version of Vue.js that was re-written from scratch using TypeScript.

Evan You, the creator of Vue, [announced it back in  2018 at Vue.js London](https://medium.com/the-vue-point/plans-for-the-next-iteration-of-vue-js-777ffea6fabf?ref=madewithvuejs.com).

### Vue 3 New Features

According to Evan You, Vue 3 will be faster, smaller, more maintainable, and easier to target native development.

In more details, these are some of the new features of Vue 3:

1. Class-based components and ES2015 classes,
2. Fragments, which allows you to have components with multiple root nodes,
3. Portals, which allows you to render content outside of Vue’s mount element,
4. The Composition API, which is similar to React Hooks, a new syntax that allows you to use functions for organizing your code by feature not operation, 
6. TypeScript support, Vue 3 is built-in TypeScript and allows you to optionally use TS for development.
7. Modularity
8. Virtual DOM rewrite for faster performance
9. Slots Generation optimization (separate rendering for parent & child components)
10. Static props hoisting
11. Hooks API (experimental)
12. Time Slicing Support (experimental)


### Do you Need to Learn Vue 2 or Vue 3 at this Time?

Since Vue 3 is released, you can start by learning it instead of Vue 2 because many new APIs are introduced or updated, most of the fundamental concepts and patterns of Vue 2 will still be available in Vue 3.

This is what you'll learn by following this tutorial:

-   Installing Vue 3,
-   Creating a new Vue 3 app
-   Working with state
-   Creating a template
-   Working with the Composition API


## How to Install Vue 3? 

We can install Vue 3 and create a new project using two methods or more, let's see how.


### Create a Vue 3 Project Using GitHub and NPM

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

### Initializing a New Vue 3 App

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


### Create a Vue 3 Project with Vue CLI and The `vue-next` plugin

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

Throughout this tutorial, you will learn to create your first Vue 3 component. You also see how to use the [component `setup`](https://www.techiediaries.com/vue-3-setup/) method.


## Understanding Vue 3 Ref for Reactive Variables

In this section, we'll learn about the `ref()` function in Vue 3. In Vue 3, you can use the `ref()` function to define a reactive variable.

### Declaring Reactive Variables from Primitives

Ref is used to declare reactive variables from primitive types such as:

- String
- Number
- BigInt
- Boolean
- Symbol
- Null
- Undefined


For example:

```js
import { ref } from "vue";

export default {
  setup() {
    const name = ref("");
    const num = ref(1);
    const bool = ref(true);
    const n = ref(null);
  }
};
```

### Vue 3 Ref Example

Now, let's consider this Vue 3 component:

```js
<template>
  <h1>{{ productName }}</h1>
</template>

<script>
  import { ref } from "vue";

  export default {
    setup() {
      const productName = ref("Product 001");

      return { productName };
    }
  };
</script>
```

The `ref()` function takes a value and returns a reactive and mutable ref object. 

You can access or mutate the value of the ref object using the `.value` property but that's only inside the `setup()` method. In the corresponding template, you can use the name of the variable as usual i.e `productName` in our case. 

Why don't you need to use the `productName.value` property in the template:

```html
<template>
  <h1>{{ productName }}</h1>
</template>
```

Simply because When a ref is returned as a property on the rendering context (i.e from the `setup()` method) in the template, it gets unwraped to the original primitive value.

## Understanding Vue 3 Setup Method

In this example, we'll learn about the `setup()` method in Vue 3.


### What's the `Setup` Function in Vue 3?

Vue 3 introduced the composition api as an alternative to the options api in Vue 2 for writing components.

A Vue 3 component needs to have a `setup()` function which is a part the Composition API. This function will be executed before creating the component object. As a side effect, `this`, that refers to the component itself, is not available in the `setup()` function.

### Why Using the Vue 3 `Setup` Method?

In the body of the `setup()` function, you can declare the data properties, computed methods, watch methods, and any required JS methods needed by the component. 

It will then return an object containing all the public methods and data properties which you can then access from the component's template.

## Understanding Vue 3 Components

We'll learn how to scaffold a new Vue 3 project using the latest version of Vue CLI and create a Vue 3 component.


Like most modern web development libraries and frameworks, Vue adopts a component-based approach to build apps where components are the building blocks of the application.

A component controls a patch of the user interface and interacts with the other components in the application. 

In this tutorial section, we’ll be learning how to create a Vue 3 component step by step.


### Prerequisites

In order to follow this tutorial, you are going to need:

-   The knowledge of HTML, CSS, JavaScript, and Vue
-   [Node.js](https://nodejs.org/en/) installed on your machine,


## Step 1 — Installing Vue CLI 4

Let's start by installing Vue CLI 4 in our local development machine.

Open a command line interface and run the following command:

```bash
$ npm i -g vue-cli
```

After installing the CLI. If you run the `vue --version` command, you should get the following output:

```bash
@vue/cli 4.5.2
```

## Step 2 — Creating a New Vue 3 Project

Now if you have Vue CLI 4 installed, you can create a Vue 3 project using the following command:

```bash
$ vue create vue3componentdemo
```

You'll be prompted with the following code:

```bash
? Please pick a preset: 
  Default ([Vue 2] babel, eslint) 
❯ Default (Vue 3 Preview) ([Vue 3] babel, eslint) 
  Manually select features 
```

Next, you need to select the second option `Default (Vue 3 Preview) ([Vue 3] babel, eslint)` to instruct the CLI to generate a new Vue 3 based project.

Next, press `Return`.

Your project's files will be generated and the dependencies will be automatically installed from npm.

After installation, go to the project's folder and start the development server as follows: 

```bash
$ cd vue3componentdemo
$ npm run serve
```

The development server will be running on  [localhost:8080](http://localhost:8080/):

![New Vue 3 App](https://www.techiediaries.com/ezoimgfmt/dab1nmslvvntp.cloudfront.net/wp-content/uploads/2018/02/1519855496vuejs-article-template.png?ezimgfmt=rs:730x547/rscb1/ng:webp/ngcb1)

## Step 3 — Creating a Vue 3 Component

Next, let's create a Vue 3 component and use it in our application. 

In the `src/components/` folder of your project, create a new `Random.vue`  file and add the following code:

```markup
<template>
</template>

<script>
import { ref, computed } from "vue";
export default {
  name: 'Random',
  setup() {
    const randomValue = ref(0);
    const times = ref([]);
    function generate() {
      randomValue.value = Math.floor(Math.random() * Math.floor(9)) + 1;
      times.value.unshift(randomValue.value);
    }
    function init() {
      randomValue.value=0
      times.value = [];
    }
    const total = computed(() => {
      let t = 0;
      for (let i=0 ; i< times.value.length; i++) {
        t += times.value[i]
      }
      return t;
    });
    return { randomValue, times, total, generate, init };
  }
}
</script>
```

We first import `ref` and `computed` from vue3, next we define the `setup` function. In the `setup` function of the component, we define two reactive variables and two functions for generating a random value and add it to the array and initialize the array.

Next, we define a computed function for calaculating the total of the renadom values. Finally, we return all the defined variables and functions,   from the component's `setup` method, that we need to reference from the component's template.

>If setup returns an object, the properties on the object can be accessed in the component's template. [The Vue 3 docs](https://v3.vuejs.org/guide/composition-api-setup.html)

### Adding the Vue 3 Component's Template

Next, we need to add the template code inside the `<template></template>` tag:

```html
<template>
  <h1>Current random value: {{ randomValue }}</h1>
  <div>Number of times: {{ times.length }}</div>
  <div>Total: {{ total }}</div>
  <button @click="generate()">Generate a random value</button>
  <button @click="init()">Init</button>
  <ul>
    <li  v-for="(e, i) in times" :key="i">
       {{ e }}
    </li>
  </ul>
</template>
```

We use interpolation to display the value of the `randomValue` variable, the `times` array length and the `total` variable. Next, we bind the `generate` and `init` functions to the click event of two buttons.

### Importing our Vue 3 Component

Next, we need to import our random value component from the `Random.vue` file  in our  `App.vue` file  as follows:

```markup
<template>
  <div id="app">
  <Random />
  </div>
</template>
<script>
import Random from './components/Random.vue'
export default {
  name: 'App',
  components: {
    Random
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

We simply import the component from the `./components/Random.vue` file and we declare it inside the `components` object and then we include it in the template via its tag name `<Random />`.


## Wrap-up

We learned about Vue 3 components and how to create them. We saw how to use the component's `setup` method to return all the variables and functions that we want to access from the component's template.

## Vue 3 Shopping List Tutorial: Composition API and Reactive State

Throughout this tutorial section, you will learn how to use  Vue 3 and the Composition API to build your a web application. The Composition API is introduced in Vue 3 as an alternative to the Options API.

We'll learn how to create reactive state using the `reactive()` function.
 
The Composition API allows you to write and organize components in a Vue 3 application following a reactive approach. The Vue Composition API will help you to build  a more scalable application.

In this tutorial section, we’ll be learning how to create a shopping list application with Vue 3 and the Vue Composition API.


### Prerequisites

In order to follow this tutorial step by step on your development machine, you are going to need:

-   The knowledge of HTML, CSS, JavaScript, and Vue
-   [Node.js](https://nodejs.org/en/) installed on your machine,


## Step 1 — Installing Vue CLI 4

Let's start by installing Vue CLI 4 in our local development machine.

Open a command line interface and run the following command:

```bash
$ npm i -g vue-cli

```

After installing the CLI. If you run the `vue --version` command, you should get the following output:

```bash
@vue/cli 4.5.2
```

## Step 2 — Creating a New Vue 3 Project

Now if you have Vue CLI 4 installed, you can create a Vue 3 project using the following command:

```bash
$ vue create vue3shoppinglist
```

You'll be prompted with the following code:

```bash
? Please pick a preset: 
  Default ([Vue 2] babel, eslint) 
❯ Default (Vue 3 Preview) ([Vue 3] babel, eslint) 
  Manually select features 
```

Next, you need to select the second option `Default (Vue 3 Preview) ([Vue 3] babel, eslint)` to instruct the CLI to generate a new Vue 3 based project.

Next, press Return.

Your project's files will be generated and the dependencies will be automatically installed from npm.

After installation,go to the project's folder and start the development server: 

```bash
$ cd vue3shoppinglist
$ npm run serve
```

The development server will be running on  [localhost:8080](http://localhost:8080/):

![New Vue 3 App](https://www.techiediaries.com/ezoimgfmt/dab1nmslvvntp.cloudfront.net/wp-content/uploads/2018/02/1519855496vuejs-article-template.png?ezimgfmt=rs:730x547/rscb1/ng:webp/ngcb1)

## Step 3 — Creating a Vue 3 Component for Shopping List

Next, let's create a Vue 3 component for our shopping list. 

In the `src/components/` folder of your project, create a new `ShoppingList.vue`  file and add the following code:

```markup
<template>
  <section>
    <div class="form-container">
      <h1>Add Product</h1>
      <form>
        <div>
          <label>Name</label>
          <br />
          <input type="text" />
        </div>
        <div>
          <button type="submit" class="submit">Add Product</button>
        </div>
      </form>
    </div>
    <div class="list-container">
      <ul>
        <li>
          Shopping List
          <span style="float:right;padding-right:10px;">
            <button>X</button>
          </span>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
export default {};
</script>
<style scoped>
input {
  width: 20%;
  height: 30px;
  border: 2px solid green;
}
.submit {
  margin: 10px;
  padding: 10px;
  border-radius: 0px;
  border: 0px;
  background: green;
  color: white;
}
ul li {
  list-style: none;
  border: 2px solid green;
  width: 30%;
  margin-top: 10px;
}
</style>
```

Next, we need to import our shopping list component from the `ShoppingList.vue` file  in our  `App.vue` file  as follows:

```markup
<template>
  <div id="app">
    <img alt="Shoppingd List" src="./assets/shopping.png">
    <shopping-list msg="Vue 3 App"/>
  </div>
</template>
<script>
import ShoppingList from './components/ShoppingList.vue'
export default {
  name: 'App',
  components: {
    ShoppingList
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```

## Step 4 — Implementing the Vue 3 Composition API


Next, let's implement our Vue 3 shopping list component,

Open the  `ShoppingList.Vue` file and import the `reactive` function as follows:
 
```markup
<script>
import { reactive } from "vue";
export default {};
</script>
```


We’ll now add some event listeners to the application by modifying our template to this:

```markup
<template>
  <section>
    <div class="form-container">
      <h1>Vue 3 Shopping List Example</h1>
      <form @submit.prevent="addProduct">
        <div>
          <label> Name</label>
          <br />
          <input v-model="state.input" type="text" />
        </div>
        <div>
          <button type="submit" class="submit">Add Product</button>
        </div>
      </form>
    </div>
    <div class="list-container">
      <ul v-for="(Product,index) in state.Products" :key="index">
        <li>
          {{Product}}
          <span style="float:right;padding-right:10px;">
            <button @click="removeProduct(index)">X</button>
          </span>
        </li>
      </ul>
    </div>
  </section>
</template>

```

Next, let's define a  `state`  variable and methods inside the `setup()` method, as follows:

```javascript
<script>
  import { reactive } from "vue";
  export default {
  setup() {
      const { state, addProduct, removeProduct } = ProductList();
      return { state, addProduct, removeProduct };
    }
  };
</script>

```

After defining the variables and methods, we'll next define our component state:

```javascript
<script>
import { reactive } from "vue";
export default {
setup() {
  const { state, addProduct, removeProduct } = ProductList();
  return { state, addProduct, removeProduct };
}
};
function ProductList() {
let state = reactive({
  input: "",
  Products: ["Product 1"]
});
return { state };
</script>

```

We define the  `input`  reactive state that we’ll bind to the input field and a  `Products` reactive  array that will contain all our  shopping list products.

Next, let’s define the  `addProduct`  function as follows:

```javascript
<script>
import { reactive } from "vue";
export default {
setup() {
    const { state, addProduct, removeProduct } = ProductList();
    return { state, addProduct, removeProduct };
  }
};
function ProductList() {
  let state = reactive({
    input: "",
    Products: ["Product 1"]
  });
 let addProduct = () => {
    state.Product.push(state.input);
    state.input = "";
  };
  return { state, addProduct };
</script>

```

The add functionality will take the data in the input field and push it into the `Products` array using the `push` method.

Let’s now implement the delete function. We’ll get the index of the  `Product`  and then remove the  `Product`  from the users array using the splice method:

```javascript
<script>
import { reactive } from "vue";
export default {
setup() {
    const { state, addProduct, removeProduct } = ItemList();
    return { state, addProduct, removeProduct };
  }
};
function ProductList() {
  let state = reactive({
    input: "",
    Products: ["Product 1"]
  });
 let addProduct = () => {
    state.Products.push(state.input);
    state.input = "";
  };

 let removeProduct = i => {
    state.Products.splice(i, 1);
  };
  return { state, addProduct, removeProduct };
</script>

```

Since we need to access these methods and state from the template we need to return them from the `setup()`  method.


## Wrap-up

In this tutorial section, we learned how to build a shopping list app with Vue 3 reactive state. 

## Vue 3 Router by Example

The router is an important component for building SPAs or single page apps so just like any front-end library Vue has its own router.

With Vue 3, we have a new Vue Router that uses Vue 3, with many features similar to Vue 3, but there are a few differences from Vue 2. 

In this tutorial section, we'll introduce you to Vue Router for Vue 3, with example code. 

The Vue router enables you to create single pages apps with multiple views using the latest Vue 3 library.

## Step 1 -- Installing Vue 3 CLI and Creating a New App

Let's get started by installing the Vue 3 CLI. Head back to your terminal and run the following command:

```bash
$ npm install -g @vue/cli
```

Next, we can create a new Vue 3 project using the following command:

```bash
$ vue create vue3-router-app
```

You'll be prompted to pick a preset, choose the Vue 3 preset.

Next, navigate to your project's folder and run the development server as follows:

```bash
$ cd vue3-router-app
$ npm run serve
```

Next, go to [http://localhost:8080](http://localhost:8080) with your browser to see your Vue 3 app running.


## Step 2 -- Installing the Vue 3 Router 

Now that we have a new Vue 3 project, let's install the Vue 3 router using the following commands:

```bash
$ cd vue3-router-app
$ npm install vue-router
```

Next, create a `router` folder and an `index.js` file inside the `router` folder and add the following code inside the `router/index.js` file:

```js
import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
```

We first import the `createWebHistory`, `createRouter` methods from the `vue-router` package and our Vue 3 `Home` and `About` components. 

Next, we define a `routes` array, where we can add routes for each component.


A route has the following properties:

- Path: the URL path of the route.
- Name: An optional name for the route.
- Component: The component that will be loaded by the router when the route is visited.



Next, we create and export the router object, using the `createRouter` method by passing the `routes` array and an object returned from the `createWebHistory` method.

## Step 3 -- Importing our Vue 3 Router

Next, we need to import our router in the `main.js` file.

Open the `/src/main.js` file and update it as follows:

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' 

createApp(App).use(router).mount('#app')
```

We import the router, and then we use the router when creating our Vue 3 application. 

## Step 4 -- Adding the Router View and Navigation

The Vue Router provides two directives for adding a router view and navigation links:

- `<router-view />` - this marks where the component will be inserted by the router when a route is activated. 
- `<router-link>` - this is used to create navigation links instead of  `<a href>`. 


Open the `src/views/App.vue` file and update it as follows:

```html
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home">Home</router-link>  
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>
```

## Warp-up

We have seen how the Vue 3 router works by example, but you don't need to go throughout all these steps thanks to Vue CLI which enables you to automatically install and add Vue Router.

When you create a Vue project, simply “Manually select features” when prompted to select a preset then make sure to check “Router“ when prompted to select the features needed for your project. This will instruct the CLI to install Vue Router inside your Vue 3 app and add the code we've seen before for creating and configuring a router instance. You simply need to add your routes inside the `routes` array. 




