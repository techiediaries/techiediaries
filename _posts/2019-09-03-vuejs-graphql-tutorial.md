---
layout: post
title: "Vue.js with GraphQL & Apollo Client Tutorial"
image: "images/content/vue.png"
excerpt: "Throughout this tutorial, we’ll be learning how to use Vue.js with Apollo client to create a CRUD interface for consuming an API built with Node.js, Express, and GraphQL" 
tags : [vue, vuejs, graphql] 
---



Throughout this tutorial, we’ll be learning how to use Vue.js with Apollo client to create a CRUD interface for consuming an API built with Node.js, Express, and GraphQL. 

Vue is a modern progressive UI library for building user interfaces similar to React, the library which has been traditionally used with GraphQL since both technologies originated from Facebook.

Most tutorials on the web make use of React with its ecosystem for consuming a GraphQL API, so let's see how to use Vue instead.  
 
 We'll be using the Apollo client for actually interacting with GraphQL instead of traditional clients like Axios.
   
Apollo is a complete platform for implementing GraphQL servers and clients and other advanced features required by production apps like caching and state management. Using Apollo, you can easily transfer data between the server and UI of your app built with your favorite libraries such as React or Vue. In this tutorial, we'll make use of the Apollo client without the server since we have already created our server using Express.

[Apollo](https://www.apollographql.com/) is comprised of many tools to make it easy to work with GraphQL in your apps.

We'll see in this tutorial how we can use the [client](https://www.apollographql.com/client) and leave the[server](https://www.apollographql.com/server) for another tutorial. 

Apollo is created by the [Meteor Development Group](https://www.meteor.io/).

We'll be consuming a GraphQL API for managing a database of employees available from this [online IDE](https://repl.it/@techiediaries/Node-GraphQL-Example).

Let's get started with the prerequisites!

## Prerequisites

In order to successfully complete this tutorial, you will need to have a few prerequisites:  

- You need to have Node.js and NPM installed on your system either for running the GraphQL server locally or also for Vue CLI. You can simply go to the [official website](https://nodejs.org/en/download/) and download the binary for your system. 
- Familiarity with modern JavaScript and a working knowledge of Vue are a must.

For the GraphQL server, you can either follow this tutorial to build your app locally or use the same [example from this online IDE](https://repl.it/@techiediaries/Node-GraphQL-Example).
  
Now, let's get started!

## Enabling CORS in GraphQL Server

If you are developing locally using two different ports, you need to enable CORS in your GraphQL server.  

  
First, install the cors module from npm using the following command:
  
```bash
$ cd node-express-graphql-api
$ npm install cors --save
```
 
Next, import the `cors` module in the `index.js` file as follows:

```js
const cors = require('cors');
```

Next, add the `cors` middleware to the Express.js server as follows:

```js
const app = express();
app.use(cors())
```
  

You can now start your GraphQL server and send requests from your frontend app:

```bash
$ node index.js
```

Your GraphQL server will be listening from `http://localhost:4000/`.

## Installing the Vue command-line interface 

Vue CLI is the official tool for initializing and working with Vue.js projects. It's based on Node.js and can be installed from npm using the following command:
 
```bash
$ npm install -g @vue/cli
```
  

At the time of this writing this Vue and Graphql tutorial, you'll have **vue/cli v3.8.2** installed on your development machine.

That's it. We are now ready to build our Vue.js app.

## Initializing a Vue.js project

You can quickly initialize a new Vue.js project using the following command:
 
```bash
$ vue create vue-apollo-demo
```

Select the **default** preset when prompted.  

When your project is generated, navigate to the root folder and start the local development server:  

```bash
$ cd vue-apollo-demo
$ npm run serve
```
  

Your Vue.js application will be available from the `http://localhost:8080/` address.

This is a screenshot of our app at this point of our tutorial: 
  

![Vue.js & GraphQL Example](https://paper-attachments.dropbox.com/s_3F8A0901FF4D17465CD679CB9A934803C4370F406712E489DB7D6B0C6C97B28B_1558921368584_11225950_509311348_38437953.png)

  

## Installing Apollo client

Our GraphQL server is built with Node.js and Express without using the Apollo server but we can use the Apollo client instead of Axios to consume our GraphQL API from our Vue.js interface.

Let's start by installing the Apollo client in our Vue.js project. Open a new command-line interface, navigate to your project and run the following command to install the client from npm:  

```bash  
$ npm install --save vue-apollo graphql apollo-boost
```

We also installed `graphql` and `apollo-boost`.

[vue-apollo](https://github.com/Akryum/vue-apollo) is a library that integrates [apollo](https://www.apollographql.com/) with Vue.

According to the [official repository](https://github.com/apollographql/apollo-client/tree/master/packages/apollo-boost)

> Apollo Boost is a zero-config way to start using Apollo Client. It includes some sensible defaults, such as our recommended `InMemoryCache` and `HttpLink`, which come configured for you with our recommended settings.


## Linking the Apollo client with the GraphQL server 
 
Open the `src/main.js` file of your Vue application and let's start by initializing the Apollo client and linking it with our GraphQL server running at `https://repl.it/@techiediaries/Node-GraphQL-Example/graphql`:

```js
import ApolloClient from "apollo-boost"
import VueApollo from "vue-apollo"

const apolloClient = new ApolloClient({
    uri: "https://repl.it/@techiediaries/Node-GraphQL-Example/graphql"
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})
```

Here is what we have done:

- We imported the Apollo client and `VueApollo` plugin from their package. 
- Next, we initialized the Apollo client and provided the URL of our GraphQL server.
- Next, we added the `VueApollo` plugin to our Vue.js application.
- Finally, we created the Apollo provider and linked it with our Apollo client.
  

Next, you need to connect the  Apollo provider with the Vue app as follows:

  
  
```js
new Vue({
    render: h => h(App),
    apolloProvider,
}).$mount('#app')
```

The Vue components can now access the Apollo client to send requests to the GraphQL server.
    
## Sending API requests to the GraphQL server

  
Now that we have set up GraphQL and Apollo client in our Vue.js app. Let's see how we can send API requests to the GraphQL server from our Vue component(s).

Our GraphQL server exposes a simple API for managing employees in a database. Each employee has a name, phone, email, and address.
   
We don't need to create many components in our simple example. The `App` component can be enough so let's head to the `src/App.vue`file and start by declaring some variables for holding the data:

```js  
<script>
export default {
  name: 'app',
  data(){
    return {
        id: null,
        name: '',
        phone: '',
        email:'',
        address: '',
      }
  },
```

We declared the `id`, `name`, `phone`, `address` and `email` variables which will be used in the form for creating new employees.

## Fetching data with GraphQL Queries

GraphQL provides a powerful query language for querying data. We simply need to build the right query and send it to the server for requesting data.   

First, we need to use the `gql` tag from the [graphql-tag](https://github.com/apollographql/graphql-tag) module for defining the query and add the `apollo` object to the component which will hold any queries that we want to send to the GraphQL server. This is an example:

```js
<script>
import gql from 'graphql-tag'
export default {
  name: 'app',
  data(){
    return {
      id: null,
      name: '',
      email: '',
      phone: '',
      address: ''}
  },
  apollo: {
    employees: gql`query {
      employees {
        id,
        name,
        email,
        phone,
        address
      }
    }`,
  },
```

> **Note**: `gql` enables the parsing of the GraphQL queries to the GraphQL AST. 

The employees attribute in the `apollo` object will be used to store data returned from the `employees` query. It can be used like any Vue variable in the template to display the employees' data.


## Creating and deleting data with GraphQL mutations 

Just like we used the Apollo client to send GraphQL queries for fetching data from the API. We can also use Apollo to send mutations which are the GraphQL equivalents to CREATE, UPDATE and DELETE operations in the REST world.

In your `App.vue` component, define  the `createEmpolyee()`, `updateEmpoylee()` and `deleteEmployee()` methods as follows:

```js

 methods: {
    createEmployee(name, email, phone, address){
      this.$apollo.mutate({
          mutation: gql`mutation createEmployee($name: String!, $email: String!, $phone: String!, $address: String!){
            createEmployee(name: $name, email: $email, phone: $phone, address: $address) {
              id,
              name,
              email,
              phone,
              address}
          }`,
          variables:{
            name: name,
            email: email,
            phone: phone,
            address: address
          }
        }
      )
      location.reload();
    },
    updateEmployee(id, name, email, phone, address){

      this.$apollo.mutate({
          mutation: gql`mutation updateEmployee($id: ID!, $name: String!, $email: String!, $phone: String!, $address: String!){
            updateEmployee(id: $id, name: $name, email: $email, phone: $phone, address: $address)
          `,
          variables:{
            id: id,
            name: name,
            email: email,
            phone: phone,
            address: address
          }
        }
      )
      location.reload();
    },
    deleteEmployee(id){
      this.$apollo.mutate({
          mutation: gql`mutation deleteEmployee($id: ID!){
            deleteEmployee(id: $id)
          }`,
          variables:{
            id: id,
          }
        }
      )
      location.reload();
    },
```

In all of our methods, we call the `mutate()` method of the `$apollo` object for making GraphQL mutations.

After defining the mutation methods, let's now create two other methods:

- The `loadEmployeeIntoForm()` method for loading an employee from the HTML table into the form where we can update it,  
- The `resetForm()` method for resetting the form.

In the methods object of the `App.vue` component, append the following methods as follows:
 
```js
    loadEmployeeIntoForm(employee){
      this.id = employee.id;
      this.name = employee.name;
      this.email = employee.email;
      this.phone = employee.phone;
      this.address = employee.address;
    },
    resetForm(){
      this.id = null;
      this.name = '';
      this.email = '';
      this.phone = '';
      this.address = '';
    }   
``` 
  
After defining these methods, we need to create the template for displaying the list of the fetched employees and a form for updating a selected employee from the table.   

##  Creating the Vue UI

Our app UI will consist of an HTML table and form which will be bound with the employees variable from the apollo object and the previously defined methods.    

Let's start with the HTML table. Head back to the `src/App.vue` file and replace the existing template with the following:
  
```html
<h1>Employees database</h1>
<template>
  <div id="app">
  <table border='1' width='100%' style='border-collapse: collapse;'>
   <tr>
     <th>Name</th>
     <th>Email</th>
     <th>Phone</th>
     <th>Address</th>
     <th>Operations</th>
   </tr>

   <tr v-for='employee in employees'>
     <td>{{ employee.name }}</td>
     <td>{{ employee.email }}</td>
     <td>{{ employee.phone }}</td>
     <td>{{ employee.address }}</td>
     <td>
      <input type="button" @click="loadEmployeeIntoForm(employee)" value="Update">
      <input type="button" @click="deleteEmployee(employee.id)" value="Delete">
     </td> 
   </tr>
 </table>


</div>
</template>
```

We simply iterate over the `employees` attribute of the `apollo` object using a `v-for` directive and display the name, email, phone and address of employees inside an HTML table. We also add two buttons for each employee to allow users to update and delete an employee.

When you click on the **Update** button, the corresponding employee will be loaded into an HTML from below the table that we'll create next. We can then modify the employee information and send the actual update mutation.   


 Let's now add a form to our template:


```html
    <form>
      <label>Employee name</label>
      <input type="text" name="name" v-model="name">
      </br>
      
      <label>Employee email</label>
      <input type="email" name="email" v-model="email">
      </br>

      <label>Employee phone</label>
      <input type="text" name="phone" v-model="phone">
      
      <label>Employee address</label>
      <textarea name="address" v-model="address"></textarea>
      
      <input v-if="!id" type="button" @click="createEmployee(name, email, phone, address)" value="Create employee">
      <input v-if="id" type="button" @click="updateEmployee(id, email, phone, address)" value="Update employee">
      <input type="button" @click="restForm()" value="Reset">
    </form>


```

The form has four input fields for adding employee information. We can either use the form to create a new employee or update an existing employee loaded from the table.

You can also click on the **Reset** button to reset the form after you selected an employee from the HTML table.

## Wrap-up

As a wrap-up of our Vue.js and GraphQL tutorial, we have created a Vue and Apollo application that consumes an API built with Node and GraphQL for managing an employees database.

We've seen how to send GraphQL queries for fetching data and mutations for creating, updating and deleting data.  
