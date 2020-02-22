---
layout: post
title: "Angular 9/8 Firestore Database CRUD Tutorial"
image: "images/content/angular.png"
excerpt: "In this tutorial, you'll be using Angular 9 with Firebase and Firestore to create am app that implements the common CRUD operations" 
date: 2020-02-08 
categories: angular-firebase
tags : [angular, angular-9, angular-9-ngfor-examples]
---

In this tutorial, you'll be using Angular 9/8 with Firebase and Firestore database to create an app that implements the common CRUD operations.

We'll see step by step how to set up Firebase in our Angular 9 project, and create a service for implementing Firebase CRUD operations using the Firestore realtime database.

## Angular 9 CRUD with Firebase and Firestore Database 

These are the steps of our Angular 9 Firebase CRUD tutorial:

- Step 1 - Creating your Angular 9 Project
- Step 2 - Creating a Firebase Project and a Firestore Database
- Step 3 - Installing and Adding Firebase to your Angular 9 Project.
- Step 4 - Create an Angular 9 Model 
- Step 5 - Creating an Angular 9 Service
- Step 6 - Creating a Component for Making CRUD Operations


## What is CRUD?

CRUD stands for Create, Read, Update and Delete and refer to the operations that we run against a database to createn retrieve and update data. In this example, the database is a Firestore database that exists on the cloud.

> **Note**: This tutorial works with Angular 9.
 
## Prerequisites

Before starting this tutorial, you first need to make sure, you have:

- A recent version of Node.js (v10+) and NPM installed on your system,
- The latest Angular CLI 8 installed on your system.

If you have the prerequisites, you are ready to start creating your project!
  
## Step 1 - Creating your Angular 9 Project

The first step in this tutorial is creating a new Angular 9 project using the CLI. 

Head over to your terminal and run the following command:

```bash
$ ng new angular-firebase-crud
```

The CLI will ask if you want to add routing to your project (you can choose any option you want) and which style sheet format you want to use (You can select CSS).

After that, your project files will be generated and your project's dependencies will be installed.
 
## Step 2 - Creating a Firebase Project and a Firestore Database

Now that your project is generated, you need to proceed with creating a Firebase project and a Firestore database. For this matter, you simply need to go to the Firebase Console and create a new Firebase project. 

Next head to the `Project Overview >Develop >Database` page and create a new Firestore database. For now, make sure you enable test mode so you don't need any permissions to access the database.

## Step 3 - Installing and Adding Firebase to your Angular 9 Project.

After creating your Firebase project and your Firestore database you next need to install the `firebase` and `@angular/fire` packages as follows:

```bash 
$ cd ./angular-firebase-crud
$ npm install --save firebase @angular/fire
```

Next go to your Firebase project overview then click on *web* and copy the *config* data.

Next, open the `environments/environment.ts` file in your Angular 9 project and add the `firebaseConfig` object inside the `environment` object.

```ts
export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID"
  }
};
```

Finally, you have to set up Firebase in your project. Open the `src/app/app.module.ts` file and update it accordingly:

```ts
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
 
@NgModule({
        // [...]
    imports: [
        // [...]
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule
    ],
```

You simply import `AngularFireModule` and `AngularFireDatabaseModule` and you add them to the `imports` array of the main application module.

You also call the `initializeApp()` method of `AngularFireModule` to pass the configuration object that you added earlier to the `environments/environment.ts` file.

That's it, you now have added Firebase and Firestore to your Angular 9 project. 

## Step 4 - Create an Angular 9 Model 

After setting up Firestore in your project, you can proceed with creating a model class. In the simple example, we suppose that you are creating an insurance app where we need to manage a set of policies.

An insurance application will often contain more that one type of data like clients, employees and policies etc. In this example, we'll just focus on the policy entity.
    
Let's create a model for our insurance policy entity as follows:

```bash
$ ng g class policy --type=model
```

Next, open the `src/policy.model.ts` file and update it as follows:

```ts
export class Policy {
    id: string;
    policyNumber: string;
    creationDate: Date;
    effectiveDate: Date;
    expireDate: Date;
    paymentOption: string;
    policyAmount: number;
    extraInfo: string;
}
``` 

This is an example of an insurance policy with many fields and relationships with other entities omitted for the sake of simplicity.

## Step 5 - Creating an Angular 9 Service

An Angular service allows you to encapsulate the code that could be repeated in many places in your project. Using the Angular CLI, run the following command to generate a service:

```bash
$ ng g service policy
``` 

Next, open the `src/policy.service.ts` file and update it accordingly.  

First, import `AngularFirestore` and the `Policy` model as follows:

```ts
import { AngularFirestore } from '@angular/fire/firestore';
import { Policy } from 'src/app/policy.model';
```

Next, inject `AngularFirestore` in your service via its constructor:
 
```ts
export class PolicyService {
  constructor(private firestore: AngularFirestore) { }
}
```

Next, add the `getPolicies()` method to retrieve the available policies from the Firestore collection:

```ts
getPolicies() {
    return this.firestore.collection('policies').snapshotChanges();
}
```

You also need to add the `createPolicy()` method to persist an insurance policy in the Firestore database:

```ts
createPolicy(policy: Policy){
    return this.firestore.collection('policies').add(policy);
}
```

Next, you need to add the `updatePolicy()` method to update an insurance policy by its identifier:

```ts
updatePolicy(policy: Policy){
    delete policy.id;
    this.firestore.doc('policies/' + policy.id).update(policy);
}
```

Finally, you can add the `deletePolicy()` method to delete an insurance policy by its identifier:

```ts
deletePolicy(policyId: string){
    this.firestore.doc('policies/' + policyId).delete();
}
```

## Step 6 - Creating a Component for Making CRUD Operations

After creating the model and service for creating, reading, updating and deleting insurance policies, you now need to create the component for testing our methods:

Using Angular CLI 8 run the following command to generate a component:

```bash
$ ng g c policy-list
```

Now, open the `src/app/policy-list/policy-list.component.ts` file and update it accordingly:

```ts
import { Component, OnInit } from '@angular/core';
import { PolicyService } from 'src/app/policy.service';
import { Policy } from 'src/app/policy.model';
 
@Component({
  selector: 'policy-list',
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.css']
})
export class PolicyListComponent implements OnInit {
 
  policies: Policy[];
  constructor(private policyService: PolicyService) { }
 
  ngOnInit() {
    this.policyService.getPolicies().subscribe(data => {
      this.policies = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Policy;
      })
    });
  }
 
  create(policy: Policy){
      this.policyService.createPolicy(policy);
  }
  
  update(policy: Policy) {
    this.policyService.updatePolicy(policy);
  }
 
  delete(id: string) {
    this.policyService.deletePolicy(id);
  }
}
```
  
### Updating the Component Template

Now let's update the component's template to display the insurance policies and also display buttons that can be used to create, update and delete policies:

Open the `src/app/policy-list.component.html` file and add the following HTML markup:

{% raw %}
```html
<table>
  <thead>
    <th>Number</th>
    <th>Created At</th>
    <th>Expire At</th>
    <th>Amount</th>
  </thead>
  <tbody>
    <tr *ngFor="let policy of policies">
    
      <td>{{policy.policyNumber}}</td>
      <td>{{policy.creationDate}}</td>
      <td>{{policy.expireDate}}</td>
      <td>{{policy.policyAmount}}</td>
      <td>
          <button (click)="delete(policy.id)">Delete</button>
      </td>
    </tr>
  </tbody>
</table>
```
{% endraw %}

Below the `<table>` markup,  you can also add a form to create an insurance policy.

## Conclusion

In this tutorial, we've seen by example how to add Firebase CRUD operations to your Angular 9 project that allow you to create, read, update and delete data from a Firestore database.
