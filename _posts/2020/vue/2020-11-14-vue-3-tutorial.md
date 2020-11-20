---
layout: bpost
title: "Vue.js 3 Tutorial by Example: Vue 3 App, Components, Props & Composition API"
image: "images/content/vue.png"
excerpt: "In this tutorial, we'll show you how to develop a simple app using the current version of Vue 3,  we'll particularly focus on the new features" 
tags : [vuejs, vue-3] 
---

Vue.js 3 is the latest version of Vue which was re-written from scratch with TypeScript by the Vue team. 

Vue 3 is available for use in production at the current time so you can use the new version to learn about its new features.

Now that Vue 3 is released, developers need to upgrade from Vue 2 as it provides many new features that are super handy when building readable and maintainable components, and better ways to structure Vue applications. We’ll be taking a look at some of these features in this tutorial.

At the end of this tutorial, you will understand:

1.  The `provide / inject` pair and how to use it.
2.  Teleport and how to use it.
3.  Fragments and how to start using them.
4.  The changes made to the Global Vue API and the introduction of the `createApp` method.
5.  The changes made to the Events API and the removal of `$on`, `$off`, and `$once`.
6.  You no longer can use `$refs` to access DOM elements.
7.  Vue 3 component props.

We'll also show you how to develop apps using the current version of Vue 3, we'll particularly focus on the new features including components and props.

You'll see how you can pass data from a parent component down to a deeply nested child component using the `provide / inject` pair. We'll also look at how we can reposition and transfer components from one point in our app to another using Teleport and how to use the multi-root node component. Finally, we learn about the changes made to the Events API and Global API including `createApp`, `$on`, `$off`, and `$once`.

Throughout this tutorial sections, you will learn how to use Vue 3 and the Composition API to build your web application examples. We'll also learn about the `ref()` function and how to create reactive state using the `reactive()` function in Vue 3, which can be used to define reactive variables, and then we'll learn about the `setup()` method introduced as a part of the Composition API added in Vue 3 as an alternative to the Options API. 

If you have already used Vue 2 `$refs` and wonder how to use `$refs` inside the new `setup()` method. You'll learn how to use the new `ref()` function as an alternative for static and dynamic HTML element references.


The Composition API allows you to write and organize components in a Vue 3 application following a reactive approach. The Vue Composition API will help you to build a more scalable application.

We’ll be learning how to create a shopping list application with Vue 3 and the Vue Composition API.
 

## What's Vue 3 and Its New Features

In this section, we'll see a summary of the new features coming with Vue 3.

[Vue 3](https://medium.com/the-vue-point/plans-for-the-next-iteration-of-vue-js-777ffea6fabf) is the new version of Vue.js that was re-written from scratch using TypeScript.

Evan You, the creator of Vue, [announced it back in  2018 at Vue.js London](https://medium.com/the-vue-point/plans-for-the-next-iteration-of-vue-js-777ffea6fabf?ref=madewithvuejs.com).

### Vue 3 New Features

According to Evan You, Vue 3 will be faster, smaller, more maintainable, and easier to target native development.

In more details, these are some of the new features of Vue 3:

1. Class-based components and ES2015 classes,
2. Fragments, which allow you to have components with multiple root nodes,
3. TelePort, which allows you to render content outside of Vue’s mount element,
4. The Composition API, which is similar to React Hooks, a new syntax that allows you to use functions for organizing your code by feature not operation, 
6. TypeScript support, Vue 3 is built-in TypeScript and allows you to optionally use TS for development,
7. Modularity,
8. Virtual DOM rewrite for faster performance,
9. Slots Generation optimization (separate rendering for parent & child components),
10. Static props hoisting,
11. Hooks API (experimental),
12. Time Slicing Support (experimental), 
13. provide / inject, etc.

### Understanding Vue 3 Components

Like most modern web development libraries and frameworks, Vue adopts a component-based approach to build apps where components are the building blocks of the application.

A component controls a patch of the user interface and interacts with the other components in the application. 

We'll learn how to scaffold a new Vue 3 project using the latest version of Vue CLI and create a Vue 3 component.

### Vue 3 Props 

Props are necessary for any Vue application as they alow you to pass data between components. Props are simply attributes that we need to register on a component to pass data from a parent component to its children. 

Since props let us share data between components, it allows you to organize your Vue apps and components in a modular way. 

In Vue 3, we can access props inside components in a different way than Vue 2.

In Vue 2, a component’s props are simply part of the `this` object and can be accessed by using `this.propName`. However with the introduction of the `setup()` method in Vue 3 components, `this` does not contain the properties that it used to contain in Vue 2.

So how do we use Vue 3 props without `this`?

Fortunately for us, it's easy! The `setup` method accepts two arguments:

- context, which is an object that contains specific properties that used to be found on `this`
- props, which is an object that contains the component’s props

This props object is what we need to use to access our props. All we need to do is `props.propName` – without the `this` variable:

```js
setup (context, props) {
    // context has attrs, slots, and emit() 
    console.log(props.propName) // access a prop in our component
}
```

### Global API and `createApp`

In Vue 2, it was not possible to isolate some functionalities to one instance of your app (if you have more than one instance in your app) without it affecting other apps because they are all mounted on Vue. For example:

```javascript
Vue.directive('directive1', {
    /* ... */
})

Vue.mixin({
  /* ... */
})

const app1 = new Vue({ el: '#app1' })
const app2 = new Vue({ el: '#app2' })
```


In this code, you can't, for example, have the [Vue Directive](https://v3.vuejs.org/guide/custom-directive.html) associated with `app1` and the Mixin with `app2` but instead, they’re both available in the two apps.

Vue 3 provides a new Global API to solve this type of problems, called `createApp`. This method returns a new instance of a Vue app. Now, all APIs such as components, mixins, directives, and `use`, that mutate `Vue` are available within separate app instances and each instance of your Vue app can have functionalities that are unique to them without affecting other existing apps.

We can rewrite the previous code as follows:

```javascript
const app1 = createApp({})
const app2 = createApp({})
app1.directive('directive1', {
    /* ... */
})
app2.mixin({
    /* ... */
})
```

You can also add functionalities that you want to share among all your apps using a [factory function](https://medium.com/javascript-scene/javascript-factory-functions-with-es6-4d224591a8b1#:~:text=A%20factory%20function%20is%20any,keyword%2C%20it's%20a%20factory%20function.).

### Understanding Vue 3 Setup Method

In this example, we'll learn about the `setup()` method in Vue 3.


#### What's the `Setup` Function in Vue 3?

Vue 3 introduced the composition api as an alternative to the options api in Vue 2 for writing components.

A Vue 3 component needs to have a `setup()` function which is a part the Composition API. This function will be executed before creating the component object. As a side effect, `this`, that refers to the component itself, is not available in the `setup()` function.

#### Why Using the Vue 3 `Setup` Method?

In the body of the `setup()` function, you can declare the data properties, computed methods, watch methods, and any required JS methods needed by the component. 

It will then return an object containing all the public methods and data properties which you can then access from the component's template.

### Understanding Vue 3 Ref for Reactive Variables

In this section, we'll learn about the `ref()` function in Vue 3. In Vue 3, you can use the `ref()` function to define a reactive variable.

#### Declaring Reactive Variables from Primitives

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

#### Vue 3 Ref Example

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

### `provide / inject`

In Vue 2, we used [`props`](https://v3.vuejs.org/guide/component-props.html) for passing data – such as string, arrays, objects, and so on – from a parent component directly to its children component. But in many cases, we also need to pass data from the parent component to a deeply nested child component which is, not so appropriate, to do with `props` since we'll have to pass data to many intermediate components that don't actually need this data. Developers resorted to more advanced patterns such as Vuex Store and Event Hub, to avoid passing data through the deeply nested components. 

Thanks to the new Vue 3, we can now pass data efficiently using the new Provide and inject pair. We can use `provide` as a function or an object to make data available from a parent component to any of its nested component. 

### Teleport

In some cases, where we need to create Vue components and define them in one part of our application but they are actually intended to be displayed in another part of our application. Think for example of a modal or a popup which need to cover the whole view port. Thanks to Vue 3 Teleport, we don't need to use CSS’s `position` property anymore for implementing this type of requirements.

Teleport is a new feature that makes it easy to display a component outside its default position i.e the `#app` container where Vue apps are usually wrapped. You can, for example, use Teleport to display a header component outside the `#app` div. Please note that you can only Teleport to elements that exist outside of the Vue DOM.

You need to provide two props to the Teleport component:

1. `to`: In this prop, you can pass a class `name`, an `id`, an element or a `data-*` attribute. We can also make this value dynamic by passing a `:to` prop as opposed to `to` and change the Teleport element dynamically.
2. `:disabled`: In this prop, we pass a `Boolean` value and can be used to toggle the Teleport feature on an element or component. This can be useful for dynamically changing the position of an element.

### Fragments

One of the issues developers have always faced with Vue 2, was adding multiple root elements in the `template` of components and as a workaround, they wrap all elements in a parent element. While this is not a big issue, there are cases where you want to render a component without a container that wraps the root elements.

With Vue 3, we have a new feature called Fragments that enables developers to add multiple elements as roots in the template. 

### Events API: `$on`, `$off`, and `$once` Are Removed

In Vue 2, developers used the events API for passing data between components that don’t share a parent/child relationship ( along the [Vuex Store](https://vuex.vuejs.org/)) via Event Bus. This is how you can easily do that. First, you need to create an `eventBus.js` file with the following code:

```javascript
const eventBus = new Vue()
export default eventBus;
```

Next, you need to import this file in  `main.js` to make it globally available in your app:

```javascript
import eventBus from 'eventBus'
Vue.prototype.$eventBus = eventBus
```

Now, you can emit events and listen for emitted events like this;

```javascript
this.$eventBus.$on('alert', alertMe)
this.$eventBus.$emit('message', 'Hello')
```

With Vue 3, you can't do this anymore because `$on`, `$off`, and `$once` are all removed but `$emit` is still available because it's needed by children component to emit events to their parent components. You can use `provide / inject` or any of the recommended [third-party libraries](https://v3.vuejs.org/guide/migration/events-api.html#migration-strategy) instead of the events API.

## Using `$refs` to Access DOM 

When using the Vue 3 Composition API via the `setup()` method, you no longer can use `this.$refs`, instead, we can use the new `ref()` function as follows:

```html
<script>
import {
  onMounted,
  ref,
} from 'vue';

export default {
  setup() {
    const elRef = ref(null);
    onMounted(() => {
      console.log(elRef.value.textContent);
    });

    return {
      // You need to return the ref,
      // or it will not work.
      elRef,
    };
  },
};
</script>

<template>
    <div ref="elRef">
      Hello Vue 3
    </div>
</template>
```

### Do you Need to Learn/Use Vue 2 or Vue 3 at this Time?

Since Vue 3 is released, you can start by learning it instead of Vue 2 because many new APIs are introduced or updated, most of the fundamental concepts and patterns of Vue 2 will still be available in Vue 3.

Vue.js 3 itself is quite sol­id, and the first-par­ty pack­ages such as Vue Router are updated by the Vue team but for third par­ty pack­ages, they may take sometime  for get­ting updat­ed for Vue 3.

So using Vue 3 now depends on how much you rely on those third par­ty packages.

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

Using the new `createApp` method  we create  a new app instance that will not be polluted by any global configuration (plugins, mixins, prototype properties etc.)  applied to other instances. This particularly comes handy when writing unit tests to make each test isolated from the other.

Learn more:  [Global API change RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0009-global-api-change.md).


### Create a Vue 3 Project from Vue 2 and The `vue-next` plugin

Now, let's see a second way that you can use to create a Vue 3 project at this time by using Vue CLI with the `vue-next` plugin.

First, open a new terminal and install the latest version of Vue CLI if it's not yet installed in your development machine:

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


## Creating a Vue 3 App with Vue CLI v4.5+

Now that Vue 3 os officially released, we can use Vue CLI to create a Vue 3 application but we first need to install Vue CLI which is the official tool for initializing Vue projects.

Before that, you'll need to have Node.js and npm installed on your development machine which can be installed by following one of these methods: 

-   Visit the [official website](https://nodejs.org) and get the installers for your operating system.
-   Use the official package manager for your system.
-   Use a Node version manager similar to [NVM](https://github.com/nvm-sh/nvm) which will help you manage [multiple versions of Node](https://www.shabang.dev/multiple-versions-node-nvm/) on your system.

Now, go to a new terminal and run the following command:

```bash
$ npm install -g @vue/cli
```

>Note: If, you get prompted to add `sudo` to your command in macOS or Ubuntu, or need to use a CMD prompt with administrator access in Windows to install your package globally, you simply need to fix your npm permissions. Visit the npm website for [instructions](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally), or simply use a version manager like NVM to avoid these configurations.

The `npm install` command will install `vue/cli` v4.5.8 at the time of writing this article.

Next, we can initialize a new Vue 3 application using the following command:

```bash
$ vue create vue3demo
```

You'll be prompted to select a preset, select `Default (Vue 3 Preview) ([Vue 3] babel, eslint)`.

Wait for the CLI to create your project's files and install the dependencies from npm, then navigate to your project's folder and run the development server using the following commands:

```bash
$ cd vue3demo
$ npm run serve
```
 
Open your web browser and go to [http://localhost:8080/](http://localhost:8080/) to see your Vue 3 app running.


### Prerequisites

In order to follow this tutorial, you are going to need:

-   The knowledge of HTML, CSS, JavaScript, and Vue
-   [Node.js](https://nodejs.org/en/) installed on your machine,


## Step 1 — Installing Vue CLI 4

Let's start by installing Vue CLI 4 in our local development machine. Refer to the previous section titled "Creating a Vue 3 App with Vue CLI v4.5+".

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

We first import `ref` and `computed` from vue, next we define the `setup` function. In the `setup` function of the component, we define two reactive variables and two functions for generating a random value and add it to the array and initialize the array.

Next, we define a computed function for calculating the total of the renadom values. Finally, we return all the defined variables and functions, from the component's `setup` method, that we need to reference from the component's template.

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

Let's start by installing Vue CLI 4 in our local development machine. Refer to the previous section titled "Creating a Vue 3 App with Vue CLI v4.5+".

After installing the CLI. If you run the `vue --version` command, you should get the following output:

```bash
@vue/cli 4.5.8
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

Next, we need to import our shopping list component from the `ShoppingList.vue` file  in our  `App.vue` file as follows:

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

<iframe class="mj-w-res-iframe" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://app.mailjet.com/widget/iframe/64nF/GgC" width="100%" height="500px"></iframe>

<script type="text/javascript" src="https://app.mailjet.com/statics/js/iframeResizer.min.js"></script>

### References

-   [Using Multiple Teleports On The Same Target](https://v3.vuejs.org/guide/teleport.html#using-multiple-teleports-on-the-same-target), Vue.js Docs
-   [Non-Prop Attributes](https://v3.vuejs.org/guide/component-attrs.html#non-prop-attributes), Vue.js Docs
-   [Working With Reactivity](https://v3.vuejs.org/guide/component-provide-inject.html#working-with-reactivity), Vue.js Docs
-   [`teleport`](https://v3.vuejs.org/api/built-in-components.html#teleport), Vue.js Docs
-   [Fragments](https://v3.vuejs.org/guide/migration/fragments.html), Vue.js Docs
-   [2.x Syntax](https://v3.vuejs.org/guide/migration/events-api.html#_2-x-syntax), Vue.js Docs



