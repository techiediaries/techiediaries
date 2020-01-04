---
layout: post
title: "Ember 3 Tutorial: Building your First Application"
image: "images/content/ember.png"
excerpt: "Throughout this tutorial, you'll learn about Ember. We are going to build a simple demo front-end application from scratch and step by step." 
tags : []
---

Throughout this tutorial, you'll learn about Ember.js

We are going to build a simple demo front-end application from scratch and step by step.

## Introducing Ember

Ember is a free and open source JavaScript framework for building front-end applications. It provides rich APIs from templates to routing that help developers use modern patterns to build complex JavaScript apps that run on the browser. 

Ember also provides a modern tool-chain with its Ember CLI utility that's based on Node.js.

These are some of the tools and APIs provided by Ember:

-   [Ember CLI](https://guides.emberjs.com/release/configuring-ember/configuring-ember-cli/): You can use the CLI to quickly generate Ember projects without going over the complex configuration of modern build tools. 
-   [Routing](https://guides.emberjs.com/release/routing)  - The Ember Router lets create multiple page apps with routing and navigation.
-   [Templating engine](https://guides.emberjs.com/release/templates/handlebars-basics/)  - Using the Handlebars syntax you can write templates for your application.
-   [Data layer](https://guides.emberjs.com/release/models/)  - Models allows you to manage your application data in an organized approach.
-   [Ember Inspector](https://guides.emberjs.com/release/ember-inspector/)  - This is a browser extension for inspecting your application when it's running in the browser. 


## Prerequisites

You need to have the following prerequisites if you would like to follow this tutorial step by step:

- Node and NPM installed on your development machine, [You can learn how to install Node.js and npm from the official docs](https://docs.npmjs.com/getting-started/installing-node)., 
- A working knowledge of HTML, CSS, JavaScript,
- a basic knowledge of [JavaScript Modules](http://jsmodules.io/) and general ES6 syntax like arrow functions, template strings and destructuring etc.

## Installing the Ember CLI

[Ember CLI](https://github.com/ember-cli/ember-cli) is the official way of creating and working with Ember.js projects. You first need to install the CLI from npm using the following command:

```bash
$ npm install -g ember-cli
```

> You'll need to use **sudo** for installing packages globally on you system if you didn't fix npm permissions properly.
> As of this writing, **ember-cli v3.5.1** will be installed.

After installation, you will will be able to use the `ember` binary from your terminal to create, serve and build projects.

## Creating an Ember.js Project

After installing the CLI, you can go ahead and create a new project using the `new` command:

```bash
$ ember new ember-demo-project 
```

> We name our project `ember-demo-project`. You can obviously, give any valid name to your project.

Next, navigate inside your project's root folder:

```bash
$ cd ember-demo-project
```

You can now use various commands to work with your project.

Let's serve the project using the following command:

```bash
$ ember serve 
```

A live-reload development server will be started  and your web application will be available from `http://localhost:4200`.

This is a screenshot of your app in a web browser:

![Ember welcome page](https://d2mxuefqeaa7sj.cloudfront.net/s_52455E7E72CD99FC22444E01CF73DDAF8535EC1866F215EFD5EDE5910AD629FA_1544478544598_Screenshot_22.png)

