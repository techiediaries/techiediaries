---
layout: post
title: "Learn Sails.js Tutorial [2018]"
image: "images/content/vuejs.png"
excerpt: "In this tutorial you'll learn about Sails.js, a popular Node.js framework for developing server side applications similar to popular frameworks like Ruby on Rails and Django and inspired by Rails." 
tags : [nodejs , sailsjs]
---

In this tutorial you'll learn about Sails.js, a popular Node.js framework for developing server side applications similar to popular frameworks like Ruby on Rails and Django and inspired by Rails.

Throughout this tutorial, you'll be building a simple demo application that shows you step by step how to get started with this framework for installing the required tools and dependencies to creating your app.

Sails.js is a real-time MVC framework that allows you to develop enterprise-grade Node.js web applications in less time. Sails.js makes use of the Waterline ORM which enables your application to support multiple databases in the same time.

Before creating the Sails.js demo application, let's see the prerequisites you need to have.

## Prerequisites

In order to be able to complete this tutorial, you are going to need a few prerequisites, such as:

- Node.js and NPM installed. If that's not the case, you can simply visit their official website and download the required version of your system,
- You need to have a basic knowledge of JavaScript/ES6+/Node.js,
- You need to be familiar with Unix bash 
 
 If you have the above prerequisites you can continue the tutorial by first installing Sails.js in your system.
  
## Installing Sails.js

Installing Sails.js is simple once you've installed Node.js and npm. Simply head over to your terminal and run the following command:

```bash
$ npm install -g sails
```

This will install `sails` globally, you need to make sure you have the appropriate permissions to install packages globally or you have configured npm to use folders that don't require higher privileges. Otherwise, you need to add **sudo** before your commands in Debian-based systems and macOS.   

## Creating a Sails.js Project

After installing the `sails` CLI tool, you can now generate a Sails.js project using the following command:

```bash
$ sails generate new sailsjs-app --no-frontend
```

> `--no-frontend` instructs Sails to not generate any front-end files.

Wait for the CLI to generate the project files and folders and install any required dependencies then navigate inside your project's folder and run the development server:

```bash
$ cd sailsjs-app
$ sails lift
```

After starting the development server, you can now go to the `localhost:1337` url in your web browser to see your web application up and running.

*Congratulations on creating your first Sails.js web application!*

## The Anatomy of a Sails.js Project

A Sails.js project has its own special directory structure. If you navigate inside your project, you'll see the following folders:

-   `api`: This folder contains essential constructs like controllers, models, services and policies,
-   `assets`: It contains public assets like CSS, JavaScript and images etc.
-   `config`: Here you can configure many aspects of your web application like setting up a database or adding routes etc.
-   `node_modules`: This is a familiar folder for all Node.je projects, it's where npm packages are installed,
-   `tasks`: It contains scripts for handling assets compilation and injection, 
-   `views`: This is where views or templates are included, you can use EJS, Jade and many other template engines supported by Sails.js,
-   `.tmp`: This is where Sails.js creates the build files for your project in development mode. 

Now that you've understood the structure of your project, let's proceed to actually create the application.

## Creating a Sails.js REST API

Creating an API in Sails is quite easy. Head over to your terminal and stop the development server then run the following command to generate an API for Policies. 

```bash
$ sails generate api Policies
```

Once you get the *Created a new api!* message, you are good to go!

You'll have a `Policy.js`  model and a  `PolicyController.js`  generated for you. Open the `Policy.js` file and add the following attributes to your model:

```jsx
module.exports = {

attributes: {

  policyNumber: {
    type: 'string',
    required: true,
    unique: true
  },
  amount: {
    type: 'number',
    required: true
  },
  creationDate:{
    type: 'ref', 
    columnType: 'datetime' 
  },
  expireDate:{
    type: 'ref', 
    columnType: 'datetime' 
  } 
}
};
```

You are creating four attributes:

- `policyNumber`,
- `amount`,
- `creationDate`,
- `expireDate`.

That's it! You don't believe it? This is all what you need to do to create a fully functional REST API in Sails.js thanks to the Sails.js [Blueprints API](https://sailsjs.com/documentation/concepts/blueprints).  

You can now use utilities like cURL or Postman to interact with the Policy API and run any CRUD operations to create, read, update or delete policies.

## Configuring the Migration Strategy

Open the `config/models.js` file and update the migration type:

```js
migrate: 'alter'
```

This means every time the model is changed, Sails.js will keep the existing data and change the database accordingly.
  
You can also set any migration strategy you prefer. Sails.js provides the following strategies:

-   `safe`:  this tells Sails.js to not automatically migrate the database if any changes are detected, the developer needs to do any migrations manually,
-   `alter`:  This tells Sails.js to migrate the database but also keep any data that already exist,
-   `drop`: This tells Sails.js to drop all database tables and rebuild them.

Each strategy defines a behavior used by Sails.js to build your database when the server starts.

## Adding Initial Test Data

Since you don't have any form to submit data to your Sails.js application, you need some initial data in your database. You'll use the `sails-seed` package to do that. First start by installing the package from npm using:

```bash
$ npm install sails-seed --save
```

Next you can open the `config/seeds.js` file and add the following seed data:

```json
module.exports.seeds = {
policy: [
  {
    policyNumber: 'p001',
    amount: '1000',
    creationDate: '',
    expireDate: '',
  },
  {
    policyNumber: 'p002',
    amount: '2000',
    creationDate: '',
    expireDate: '',
  },  
  [...]
  ]}
```

Now head back to your terminal and start the server again using the `sails lift` command.

You can access your Policy API endpoints from `localhost:1337/policy`.

## Conclusion

In this tutorial, you have been introduced to Sails.js a Node.js framework for quickly building enterprise web applications with realtime features. You've created a simple REST API for executing CRUD operations against your server. You didn't need to configure any database since Sails.js uses a disk database in development but you can quickly switch to your preferred database management system like MySQL without changing any single line in your code thanks to the Waterline ORM that abstracts away any direct operations with the database. Waterline lets you even use multiple database simultaneously and in the same web application. In the next tutorial, you'll see how you can create a Vue.js front-end for your Sails.js application that consumes the REST API and display it in a reactive and modern user interface.