---
layout: post
title: "Create Ionic 3 CRUD App with Firebase"
image: "images/content/ionic.jpg"
excerpt: "" 
tags : [ionic , angular] 
---



Throughout this tutorial we’re going learn how to build a simple Ionic 3 (Ionic 2+) CRUD mobile (for Android and iOS) application with Firebase as backend

In this guide I will walk you through:

* creating a Firebase project,
* generating an Ionic 3 project using the Ionic CLI,
* generating and implementing a data service/provider to connect to Google's Firebase real-time database.

We will cover these points in-depth:

* How to create a Firebase app?
* How to integrate Ionic 3 with Firebase?

This tutorial assumes you have a development environment ready with the following requirements installed.

* NodeJS and NPM.
* the Ionic CLI.
* Java and Android SDK (platform and tools) for building Android apps.
* MAC and Xcode for building iOS apps.

The last two requirements are optional. You can start working with Ionic 2/3 by only installing the Ionic CLI.

Let's first see the key features of this application before we start building it.

* Create tasks (or todos)
* Mark tasks as checked or unchecked
* Filter checked/unchecked tasks
* Delete a task


## What is Firebase?

 
## Create Firebase Project

Once you have created a Firebase account. The next step is to head over to your [Firebase console](https://console.firebase.google.com) then add a new project.  

Next click on **Add Firebase to your web app** then copy the keys.


## Create Ionic 3 Project

After creating a Firebase project. It's time to create an Ionic 3 project using the Ionic CLI so head over to your terminal on Mac/Linux or command prompt on Windows then run the following command.

```bash
ionic start ionic-firebase-demo blank
```   

This will create a blank project with a home page.

## Install Firebase in Project

Adding Firebase to your project is quite easy. All you need to do is installing firebase library from npm with:

```bash
npm install firebase --save
```


Open `src/app/app.component.ts` then add this code:

```ts
import * as firebase from 'firebase';
```

This will import the firebase library.


```ts
  // Initialize Firebase
  var config = {
    apiKey: "API_KEY",
    authDomain: "AUTH_DOMAIN",
    databaseURL: "DATABASE_URL",
    projectId: "PROJECT_ID",
    storageBucket: "STORAGE_BUCKET",
    messagingSenderId: "MESSAGIN_SENDER_ID"
  };
  firebase.initializeApp(config);

```
This will initialize Firebase.

Make sure to replace the variables with your own values from your Firebase console.

