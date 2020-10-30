---
layout: bpost
title: "Create your First Vue 3 Component"
image: "images/content/vue.png"
excerpt: "Throughout this tutorial, you will learn to create your first Vue 3 component" 
tags : [vuejs, vue3]
author: kaima 
---

Throughout this tutorial, you will learn to create your first Vue 3 component. You also see how to use the [component `setup`](https://www.techiediaries.com/vue-3-setup/) method.


Vue 3 is not yet released for production but it's expected to be released soon.

We'll learn how to scaffold a new Vue 3 project using the latest version of Vue CLI and create a Vue 3 component.


Like most modern web development libraries and frameworks, Vue adopts a component-based approach to build apps where components are the building blocks of the application.

A component controls a part of the user interface and interacts with the other components in the application. 

In this tutorial, we’ll be learning how to create a Vue 3 component step by step.


## Prerequisites

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


## Conclusion

We learned about Vue 3 components and how to create them. We saw how to use the component's `setup` method to return all the variables and functions that we want to access from the component's template.
