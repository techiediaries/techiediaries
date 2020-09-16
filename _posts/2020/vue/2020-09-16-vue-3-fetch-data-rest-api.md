---
layout: bpost
title: "Vue 3 Fetch Data and Consume REST APIs"
image: "images/content/vue.png"
excerpt: "Throughout this tutorial, you will learn to use the JavaScript Fetch API in your Vue 3 app to fetch data and consume a REST API" 
tags : [vuejs, vue3]
author: kaima 
---

Throughout this tutorial, you will learn to use the JavaScript' Fetch API  in your Vue 3 app to fetch data and consume a REST API. 

We'll see by example how to send HTTP requests to a REST server to fetch data in your Vue 3 application.


Vue 3 is not yet released for production but it's expected to be released soon.

We'll learn how to generate a new Vue 3 application using the latest version of Vue CLI v4.


More often than not, you'll need to fetch data or consume a REST API in your front-end application. We have built-in and external libraries for sending HTTP requests to servers such as the Fetch API and the Axios http client. 


In this tutorial, we’ll be learning how to use the `fetch` api in our Vue 3 application step by step.


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
$ vue create vue3fetchdatademo
```

You'll be prompted with the following code:

```bash
? Please pick a preset: 
  Default ([Vue 2] babel, eslint) 
❯ Default (Vue 3 Preview) ([Vue 3] babel, eslint) 
  Manually select features 
```

Next, you need to select the second option `Default (Vue 3 Preview) ([Vue 3] babel, eslint)` to tell the CLI to generate a new Vue 3 based project.

Next, press `Return`.

Your project's files will be generated and the dependencies will be automatically installed from npm.

After installation, go to the project's folder and start the development server as follows: 

```bash
$ cd vue3fetchdatademo
$ npm run serve
```

The development server will be running on  [localhost:8080](http://localhost:8080/):

![New Vue 3 App](https://www.techiediaries.com/ezoimgfmt/dab1nmslvvntp.cloudfront.net/wp-content/uploads/2018/02/1519855496vuejs-article-template.png?ezimgfmt=rs:730x547/rscb1/ng:webp/ngcb1)

## Step 3 — Creating a Vue 3 Component

Next, let's create a Vue 3 component and use it in our application. 

In the `src/components/` folder, add a new `Posts.vue`  file with the following code:

```markup
<template>
</template>

<script>
import { ref, computed } from "vue";
export default {
  name: 'Posts',
  props: {
  },
  setup() {
    const data = ref(null);
    const loading = ref(true);
    const error = ref(null);

    function fetchData() {
      // Will be implemented next
    }
        
    onMounted(() => {
      fetchData();
    });
    
    return {
      data,
      loading,
      error
    };
  }
}
</script>
```

We first import `ref` from vue3, next we define the `setup` function. In the `setup` function of the component, we define two reactive variables `data`, `loading` and `error` and a `fetchData`  function for fetching data from the server. 

We call the `fetchData` method in the `onMounted` hook to invoke it when the component is mounted in the DOM.

We return the `data`, `loading` and `error` variables from the `setup` method so they become available in the component's template.

>If setup returns an object, the properties on the object can be accessed in the component's template. [The Vue 3 docs](https://v3.vuejs.org/guide/composition-api-setup.html)

Next, let's implement the `fetchData` function as follows:

```js
function fetchData() {
  loading.value = true;
  // I prefer to use fetch
  // you can use use axios as an alternative
  return fetch('http://jsonplaceholder.typicode.com/posts', {
    method: 'get',
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(res => {
      // a non-200 response code
      if (!res.ok) {
        // create error instance with HTTP status text
        const error = new Error(res.statusText);
        error.json = res.json();
        throw error;
      }

      return res.json();
    })
    .then(json => {
      // set the response data
      data.value = json.data;
    })
    .catch(err => {
      error.value = err;
      // In case a custom JSON error response was provided
      if (err.json) {
        return err.json.then(json => {
          // set the JSON response message
          error.value.message = json.message;
        });
      }
    })
    .then(() => {
      loading.value = false;
    });
}
```

### Displaying our Fetched Data 

Next, we need to add the template code inside the `<template></template>` tag:

```html
<template>
  <h1>Vue 3 and Fetch Example</h1>

<template>
  <ul v-if="!loading && data && data.length">
    <li v-for="post of data">
      <p><strong>{{post.title}}</strong></p>
      <p>{{post.body}}</p>
    </li>
  </ul>

  <p v-if="loading">
   Still loading..
  </p>
  <p v-if="error">
      {{error}}
    
  </p>
</template>
```

We use iterate over the data array and display the `title` and `body` of each post.

### Importing our Vue 3 Posts Component

Next, we need to import our Posts component from the `Posts.vue` file in our  `App.vue` file  as follows:

```markup
<template>
  <div id="app">
  <Posts />
  </div>
</template>
<script>
import Posts from './components/Posts.vue'
export default {
  name: 'App',
  components: {
    Posts
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

We simply import the component from the `./components/Posts.vue` file and we declare it inside the `components` object and then we include it in the template via its tag name `<Posts />`.


## Conclusion

We learned about fetching data from a REST API server using Vue 3 and the Fetch API.
