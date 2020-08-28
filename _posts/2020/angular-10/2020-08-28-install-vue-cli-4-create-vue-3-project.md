---
layout: bpost
title: "Install Vue CLI 4 and Create a New Vue 3 Project"
image: "images/content/vue3.png"
excerpt: "How to install Vue CLI 4 and create a Vue 3 project"
date: 2020-08-28
tags : [vue3, vuejs, vue]
---

In this tutorial, we'll learn how to install Vue CLI 4 and create a Vue 3 project.

Vue CLI 4 comes with both Vue 2 and Vue 3 support.


## Step 1 - Installing Vue CLI 4

Let's start by installing Vue CLI 4 in our local development machine.

Open a command line interface and run the following command:

```bash
$ npm i -g vue-cli
```

After installing the CLI. If you run the `vue --version` command, you should get the following output:

```bash
@vue/cli 4.5.2
```

## Step 2 - Creating a New Vue 3 Project
 

Now if you have Vue CLI 4 installed, you can create a Vue 3 project using the following command:


```bash
$ vue create vue3demo
```

You'll be prompted with the following code:

```bash
? Please pick a preset: 
  Default ([Vue 2] babel, eslint) 
❯ Default (Vue 3 Preview) ([Vue 3] babel, eslint) 
  Manually select features 
```

Next, you need to select the second option `Default (Vue 3 Preview) ([Vue 3] babel, eslint) ` to instruct the CLI to generate a new Vue 3 based project.

Next, press  Return.

Your project's files will be generated and the dependencies will be automatically installed from npm.

## Step 3 - Serving your Vue 3 Project

Next, navigate to your project's folder and run the development server as follows:

```bash
$ cd vue3demo
$ npm run serve
```

You'll be able to see the following interface if you go to [http://localhost:8080/](http://localhost:8080/) with your web browser:


![Vue.js splash page](https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2018/02/1519855496vuejs-article-template.png)


This is the directory structure of our project:

```bash
.
├── babel.config.js
├── node_modules
├── package.json
├── package-lock.json
├── public
├── README.md
└── src
```

The `src/` folder contains the following files:

```bash
├── App.vue
├── assets
│   └── logo.png
├── components
│   └── HelloWorld.vue
└── main.js
```

## Conclusion

In this quick post we've seen how to generate a new Vue 3 project using Vue CLI v4.