---
layout: post
title: "JWT Auth with Vue, Vuex and Vue Router — Axios & Guards"
image: "images/content/vue.png"
excerpt: "In this tutorial, you will see how you can use Vue.js with Vuex and Axios to create an application that allows users to register and login via JWT authentication." 
tags : [vue, vuejs]
---


[Vuex](https://vuex.vuejs.org/) is the state management library for Vue apps. It provides a central store for globally storing the complete state of the application. It also ensures that data is accessed in certain way by all components.

In this tutorial, you will see how you can use Vue.js with Vuex and Axios to create an application that allows users to register and login via JWT authentication.

Since Vue.js is only a front-end library we'll need a back-end that handles JWT authentication and returns valid JWT access tokens to the client. Here comes the role of Vuex to store the access tokens and attach them with any outgoing requests to access protected resources using Axios.

## Prerequisites

To be able to take follow this tutorial step by step, you need to have: 

- A working knowledge of Vue.js,
- A recent version of Node.js and NPM installed on your development machine.

For the back-end server that implements JWT authentication, you need to follow the [Node Express JWT Authentication — jsonwebtoken and bcryptjs](https://www.techiediaries.com/node-express-jwt-authentication/) tutorial to create it.

You also need to read [Vuex Tutorial](https://www.techiediaries.com/vuex-tutorial/) for learning the basic of Vuex.

In this tutorial we'll be focusing on the front-end with Vue, Vuex and Axios.

## Installing Vue CLI 3 and Creating a Project



In this tutorial we'll be using Vue CLI 3 to create and work with our project. Vue CLI provides various presets that you can use to generate your project but it also allows you to choose the individual libraries that you want to include in your project.

First, install Vue CLI v3 using the following command:

```bash
$ npm install @vue/cli -g 
```

> **Note**: You may be needing to add **sudo** before you command in Linux/Ubuntu systems or use an administrator command prompt in Windows to install Vue CLI globally on your system. 
>At the time of this writing **Vue CLI v3.1.3** is installed.

Head to your terminal and run the following command to create a new Vue project:

```bash
$ vue create vue-vuex-auth
```

When prompted to select a preset, choose **Manually select features** and press **Enter**. Next, you'll be prompted for  selecting the features you need in your project, make sure to check **Router** and **Vuex**. 

You'll be also asked many other questions, you can simply choose the default options and move on to the next steps. 

The CLI will create a Vue project in a `vue-vuex-auth` folder, initialize a GIT repository and then install the npm packages and CLI plugins.

When the project is successfully created, navigate inside the `vue-vuex-auth` folder and launch your development server:

```bash
 $ cd vue-vuex-auth
 $ npm run serve
```

You'll be able to access your Vue application from the `http://localhost:8080/` address. You'll be seeing the following page:

![Vue Vuex Auth](https://i.imgur.com/2Dafriq.png)


## Installing and Setting up Axios

We'll be using Axios for sending HTTP requests to the Express server so we need to install it in the project via npm:

```bash
$ npm install axios --save
```
> **Note**: As the time of this writing, **axios v0.18.0** is installed.

Since we'll need to use Axios for sending requests from any Vue component, we'll need to import in the `src/main.js` file. 

Open the `src/main.js` file and update it as follows:

```js
import  Vue  from  'vue'
import  App  from  './App.vue'
import  router  from  './router'
import  store  from  './store'
import  Axios  from  'axios'

Vue.config.productionTip  =  false
Vue.prototype.$http  =  Axios;
const  accessToken  =  localStorage.getItem('access_token')

if (accessToken) {
	Vue.prototype.$http.defaults.headers.common['Authorization'] =  accessToken
}

new  Vue({
router,
store,
render:  h  =>  h(App)
}).$mount('#app')
```

We first import Axios. Next, we add Axios to the Vue instance as  `$http`. This will make it available any where in our Vue application.

If an access token is found on the local storage, we attach it to every outgoing Axios request via the `Authorization` header.

## Creating the Signup Component

Create a `src/views/Signup.vue` file and add the following template:

```html
<template>
  <div>
    <h2>Signup Page</h2>
    <form @submit="register">
      <div>
          <input  type="text" placeholder="Name" v-model="name">
      </div>
      <div>
          <input placeholder="Your email" type="email" v-model="email">
      </div>
      <div>
          <input placeholder="Password" type="password" v-model="password">
      </div>
      <div>
          <input placeholder="Confirm password" type="password" v-model="password2">
      </div>
      <div>
          <button type="submit">Register</button>
      </div>
    </form>
  </div>
</template>
```

### Creating Data and Methods

In the same `src/views/Signup.vue` file, add the following code below the template:

```javascript
<script>
  export default {
    data(){
      return {
        name : "",
        email : "",
        password : "",
        password2 : ""
      }
    },
  }
</script>
```

Next define the `signup()` method for registering users:

```javascript
<script>
  export default {
    // [...]
    methods: {
      signup: function () {
        let info = {
          name: this.name,
          email: this.email,
          password: this.password
        }
        
        this.$store.dispatch('signup', info).then(() => this.$router.push('/login'))
       
      }
    }
  }
</script>
```


 
## Creating the Login Component

Create a `src/views/Login.vue` file and add the following template:

```html
<template>
  <div>
    <h2>Login Page</h2>
    <form @submit="login">
      <div>
          <input placeholder="Your email" type="email" v-model="email">
      </div>
      <div>
          <input placeholder="Password" type="password" v-model="password">
      </div>
      <div>
          <button type="submit">Login</button>
      </div>
    </form>
  </div>
</template>
```

### Adding Data and Methods

In the `src/views/Login.vue` file, add the following code:

```javascript
<script>
  export default {
    data(){
      return {
        email : "",
        password : ""
      }
    },
    methods: {
      login: function () {
        const email = this.email 
        const password = this.password
        this.$store.dispatch('login', { email, password }).then(() => this.$router.push('/'))
      }
    }
  }
</script>
```

Next, add the `login()` method:

```js
    methods: {
      login: function () {
        const email = this.email 
        const password = this.password
        this.$store.dispatch('login', { email, password }).then(() => this.$router.push('/'))
      }
    }
```
 
## Adding the Routes

Open the `src/router.js` file and add two routes to the `Signup` and `Login` components.

```js
import  Vue  from  'vue'
import  Router  from  'vue-router'
import  Home  from  './views/Home.vue'
import  Signup  from  './views/Signup.vue'
import  Login  from  './views/Login.vue'
Vue.use(Router)

export  default  new  Router({
mode:  'history',
base:  process.env.BASE_URL,
routes: [
{
path:  '/',
name:  'home',
component:  Home
},
{
path:  '/about',
name:  'about',
// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
component: () =>  import(/* webpackChunkName: "about" */  './views/About.vue')
},
{
path:  '/signup',
name:  'signup',
component:  Signup
},
{
path:  '/login',
name:  'login',
component:  Login
}
]
})
```

## Adding Navigation  

Open the `src/App.vue` component and add the links to the `Signup` and `Login` components. 

```html
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> | 
      <router-link to="/signup">Signup</router-link> |
      <router-link to="/login">Login</router-link>      
    </div>
    <router-view/>
  </div>
</template>
```

Also open the `src/views/Home.vue` component and update its template:

```html
<template>
  <div class="home">
  <h1>Home</h1>
  </div>
</template>
```

This is a screenshot of the main App component at this point:
 
 
 ![Vue Vuex Auth](https://i.imgur.com/UyoSD9L.png)


## Adding Vuex State

Open the `src/store.js` file and add state for hoding information about the current user and the access token:

```javascript
import  Vue  from  'vue'
import  Vuex  from  'vuex'
Vue.use(Vuex)

export  default  new  Vuex.Store({
state: {
accessToken:  localStorage.getItem('access_token') ||  '',
currentUser : {}
},
mutations: {
},
actions: {
}
})
```

You also need to import axios:

```javascript
import axios from 'axios'

```
## Adding the `login()` Action

In the store object inside the actions object, add a `login()` method:



## Adding the `signup()` Action

## Adding the `logout()` Action
 