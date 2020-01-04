---
layout: post
title: "Create a React CRUD App with Google's Firestore"
image: "images/content/react.jpg"
excerpt: "" 
tags : [react] 
---

Redux helps you manage the state of your application in a way that really simplifies things.
http://redux.js.org/

On October 2017 Google [announced Firestore](https://firebase.googleblog.com/2017/10/introducing-cloud-firestore.html) a NoSQL-based document-oriented database offering a more scalable option for developers to build a backend for their mobile and web apps. 

If you are familiar with NoSQL databases such as MongoDB you'll find that Firestore uses similar concepts such as collections and documents. Collections are containers for documents which contain key-value pairs.

In this tutorial we'll build a simple CRUD application with React, Redux and Firestore using the Firebase JavaScript SDK.

Before going any further, go to Firebase and sign up if you haven’t got an account. Once you do, click “Add Project” and enter a name.
Then click “Add Firebase to your web app”.

Grab the config object and create a file called config.js under src like below. Select “test mode” - that’ll be fine for learning Firestore. It means your database will be public, so don’t share the link on the internet anywhere.

![](https://d33wubrfki0l68.cloudfront.net/9ff9b24e5f8095a8d47a41663aaf0da80bf33d5c/0fdb1/images/posts/firestore_03.png)

```js
const config = {
  apiKey: "...",
  authDomain: "...",
  databaseURL: "...",
  projectId: "...",
  storageBucket: "",
  messagingSenderId: "..."
};

export default config

```
Head back to Firebase, and under the database tab, click “Try Firestore Beta” and “Start in Test Mode”, which will take you to a UI where you view the database as it changes in real time.

## Setting Up Firestore with Redux

Next, let’s set up Redux and Firestore. Create a folder under src called store, and inside index.js. Enter the following:

```js
import Firebase from 'Firebase'
import 'Firebase/firestore'
import config from '../config'
Firebase.initializeApp(config)

```

## Creating a New React App

We'll use `create-react-app` to scaffold a new React app     

## Integrating Firebase with React 

head over to your Database section and select TRY FIRESTORE BETA.

![](https://cdn-images-1.medium.com/max/800/1*ahAjPsZqRyoPwU1HQA0hZg.png)

Now, head to your Database > Rules tab and let’s allow read/write if our user is authenticated. Change allow read, write: if false; to read allow read, write: if request.auth != null;


## Adding Redux

Google's Cloud Firestore uses documents to be organized in collections. Our app will hold a list of *products* documents within a *products* collection. Each document stores information each document-- such as name, description and quantity.

First we'll create a reference to the *products* collection which is used to apply create, read, update and delete operations on the collection.



