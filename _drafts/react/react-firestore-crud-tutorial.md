In this tutorial, you'll be using Angular 7 with Firebase and Firestore to create a project that implements the common CRUD operations.

CRUD stands for Create, Read, Update and Delete that refer to the operations that most apps need to make against a database. In this example, the database is a Firestore database that exists on the cloud.

> **Note**: This tutorial works with Angular 6 and Angular 7.
 
## Prerequisites

Before starting this tutorial, you first need to make sure, you have:

- A recent version of Node.js (v8.9+) and NPM installed on your system,
- The latest Angular CLI 7 installed on your system.

If you have the prerequisites, you are ready to start creating your project!
  
## Creating an Angular 7 Project

The first step in this tutorial is creating a new Angular 7 project using the CLI. Head over to your terminal and run the following command:

```bash
$ ng new angular7-crud-firestore
```

The CLI will ask if you want to add routing to your project (you can choose any option you want) and which style sheet format you want to use (You can select CSS).

After that, your project files will be generated and your project's dependencies will be installed.
 
## Creating a Firebase Project and Firestore Database

Now that your project is generated, you need to proceed by creating a Firebase project and a Firestore database. For this matter, you simply need to go to the Firebase Console and create a new Firebase project. 

Next head to the `Project Overview >Develop >Database` page and create a new Firestore database. For now, make sure you enable test mode so you don't need any permissions to access the database.