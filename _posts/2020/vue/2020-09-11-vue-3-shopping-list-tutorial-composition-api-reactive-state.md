---
layout: bpost
title: "Vue 3 Shopping List Tutorial: Composition API and Reactive State"
image: "images/content/vue.png"
excerpt: "Throughout this tutorial, you will learn how to use  Vue 3 and the Composition API to build your a web application. The Composition API is introduced in Vue 3 as an alternative to the Options API" 
tags : [vuejs, vue3].
author: kaima 
---


Throughout this tutorial, you will learn how to use  Vue 3 and the Composition API to build your a web application. The Composition API is introduced in Vue 3 as an alternative to the Options API.

We'll learn how to create reactive state using the `reactive()` function.
 
The Composition API allows you to write and organize components in a Vue 3 application following a reactive approach. The Vue Composition API will help you to build  a more scalable application.

In this tutorial, we’ll be learning how to create a  shopping list application with Vue 3 and the Vue Composition API.


## Prerequisites

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


## Conclusion

In this tutorial, we learned how to build a shopping list app with Vue 3 reactive state. 
