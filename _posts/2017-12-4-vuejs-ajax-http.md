---
layout: post
title: "AJAX Requests in Vue.js: Axios vs vue-resource vs fetch"
image: "images/content/vuejs.jpg"
excerpt: "Vue.js doesn’t ship with a way to do HTTP out of the box so we’re going to see how to send HTTP requests within a Vue.js web application, using many techniques and libraries such the popular Axios http client, the retired vue-resource plugin or the browser's built-in fetch API.
" 
tags : [vuejs , ajax]
---

Consuming data from remote API servers via API calls, HTTP requests or Ajax requests is something that you often need to deal with, when you are building modern Rest API-based web applications which can be connected to front-ends built using libraries such as Vue.js.  

Vue.js is a progressive JavaScript library for building user interfaces or the view layer in the MVC architecture so it doesn't make any assumption about the server technology or how to connect with a restfull API server. 

Vue.js doesn’t ship with a way to do HTTP out of the box so we’re going to see how to send HTTP requests within a Vue.js web application, using many techniques and libraries such the popular **axios** http client, the retired **vue-resource** plugin or the browser's built-in **fetch** API.

![](/images/content/vuejs.jpg)

If you have previously done any serious work with jQuery, you probably have used the `$.ajax()` method (that wraps the **XMLHttpRequest** object which's a little bit complex to use) to do Ajax requests.
  
Making API calls to some server from your Vue.js application is dead easy. In fact you have a plethora of options. In this tutorial we'll see some of the most used ways among the Vue.js community with some examples. 

Frameworks such as Angular 2+ has built-in support for HTTP through the HTTP module, Angular 4+ has an even better implementation of the HTTP client. Before version 2.0, Vue.js has **vue-resource** a built-in plugin for making HTTP calls (Get, Post, Put and Delete), in Vue 2.0 it's retired but the module is still developed and used by the community, it's just not built into Vue anymore.

First of all, let's create a new Vue.js project.

You can use different ways to create a Vue.js project depending on your preferences and needs:

* use a CDN to include Vue.js with a `<script>` tag
* download the Vue library and include it using a `<script>` tag
* install Vue.js via NPM
* install Vue.js via Bower
* use **Vue-cli** to create a project.

We’re going to use the Vue CLI to create a new project and install the required dependencies.

So head over to your terminal or command prompt then enter the following commands:

```bash
vue init webpack http-demo
cd http-demo
npm install
```
This tells the CLI to initialize a project based on Webpack. Next we navigate inside the generated project's root folder and run `npm install` to install all the dependencies.

Next we will be working at the *Hello* component in **src/components/Hello.vue** 

## Using Axios with Vue.js

Axios is a very popular JavaScript library for making HTTP requests. It' s an HTTP client that makes use of the modern Promises API by default (instead of the ugly JavaScript callbacks) and runs on both the client and the server (i.e Node.js). It can be used in Vue quite easily.

So head back to your terminal/command prompt and enter the following to install **axios** via npm:

```bash
npm install axios --save
```
Once that's finished. You can import **axios** into your Vue component then call the available methods such as *.get()`* for making GET requests, *.post()* for sending POST requests etc.

Let's see a simple example calling *axios.get()* from the component's *created* life cycle event so start by importing the library 

```js
import axios from 'axios';
```
Then add an array to hold your items

```js
export default {
  data() {
    return {
      todos: []
    }
  },
```

When the component is created send the GET request. 

We'll be using **JSONPlaceholder** a fake online REST API for testing and prototyping powered by JSON Server and lowdb database. It provides you with fake data for testing purposes.

```js
  created() {
    axios.get('http://jsonplaceholder.typicode.com/todos')
    .then(response => {
	     this.todos = response.data
    })
    .catch(error => {
      console.log(error);
    })
```

If the the request is successfully returned we assign the response data to our *todos* array (we don't need to explicitly parse JSON) we declared previously. If there is an error we just log the error to the console. 

You can then use a *v-for* directive to loop over the array and print the todos in a Vue.js template 

```html
<template>
  <ul v-if="todos && todos.length">
    <li v-for="todo of todos">
      <h2>{{todo.title}}</h2>
    </li>
  </ul>
</template>  
```

## Using vue-resource with Vue.js

[*vue-resource*](https://github.com/pagekit/vue-resource) is a library for Vue.js that provides an API for sending Ajax requests by wraping the JavaScript's **XMLHttpRequest** interface or by using **JSONP**.

*vue-resource* has many features such as:

* the support of the Promise API and URI Templates
* the support of request's and response's interceptors
* the support of modern browesrs such as Firefox, Chrome and Safari etc.
* the support of both Vue.js version 1.0 and Vue.js version Vue 2.0



*vue-resource* was once a part of  the Vue.js library, but was retired in Vue 2.0. The project is still maintained and used by the community.

You can add it the your project using different ways. Let's install it via npm:

Head back to your terminal or command prompt then enter the following command to install the library into your current project.

```bash
npm install vue-resource --save
```
The library needs a little bit of configuration before you can use it so go ahead and open the project’s `main.js` file and add the following:

First import the library using:

```js
import VueResource from 'vue-resource';

```

Then call the global method *Vue.use()* to use the plugin 

```bash
/* ... */

Vue.use(VueResource);

/* ... */
new Vue({
    el: '#app',
    render: h => h(App)
})
```

So we simply we imported the plugin and instructed Vue to use it. Now we'll be able to use the service **$http** in our Vue.js components.

Update your component's JavaScript code to make a GET call using *$http.get()* method inside the *mounted()* life cycle event that gets called when the component is mounted.

```js
mounted() {
				           this.$http.get("http://jsonplaceholder.typicode.com/todos").then(response => {
                this.todos = response.body;
            }, error => {
                console.error(error);
            });
}
```

The template is the same as before.

You can also send a POST request with *this.$http.post()*. 

## Using the browser's fetch API with Vue.js

For a period of time, the underlying API for AJAX calls in the browser was **XMLHttpRequest**. Although this interface wasn't originally made for that, but it really did the job. Many libraries, that you have been using, are built on top of  **XMLHttpRequest** (for example the famous *$.ajax()* in jQuery etc.). 

Modern browsers have a better API designed specifically for making AJAX requests or HTTP calls. It's the fetch API. 

Here is the description of the fetch API from the [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) documentation

> The Fetch API provides a JavaScript interface for accessing and
> manipulating parts of the HTTP pipeline, such as requests and
> responses. It also provides a global fetch() method that provides an
> easy, logical way to fetch resources asynchronously across the
> network.

You can use this new API through a *fetch()* method, available from the global *window* object. The first and the only required argument is the URI/URL of the resource/API endpoint to fetch. Let's take a simple example.

In your previous Vue component. Add the following code in the *mounted()* life cycle event to send an Ajax request when the component is mounted.

```js
fetch("http://jsonplaceholder.typicode.com/todos").then(function (response) {
            return response.json();
    }).then(function (result) {
        this.todos =  result;   
    }); 
```  

The modern **fetch** API is much cleaner and easier to use than **XMLHttpRequest**.  That's because it was created so that we can do AJAX simply without relying on external libraries which only wrap the complex XHR interface and add support for promises and other features. 

You can also do POST, PUT and DELETE calls by providing an *options* parameter:

```js
fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body:JSON.stringify({title:"a new todo"})
}).then((res) => res.json())
.then((data) =>  console.log(data))
.catch((err)=>console.error(err))
``` 

This is a simple example of using fetch.  For more information and in depth look at the API, you can see [Introduction to Fetch](http://updates.html5rocks.com/2015/03/introduction-to-fetch).  

## Conclusion

We have seen how to use different techniques to send Ajax requests in Vue.js. for communicating with Rest API servers or fetching resources.

You can use a plethora of options for doing Ajax calls such as Axios, vue-resource or better yet the browser's built in fetch API in modern browsers. You can also use jQuery via *$.ajax()* API, which simply wraps the XHR object in a simple to use method call but it's not recommended to include the whole jQuery library for the sake of using one method.