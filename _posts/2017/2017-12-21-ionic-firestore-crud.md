---
layout: post
title: "Create Ionic 4/Angular  CRUD Application with Firestore and AngularFire2"
image: "images/content/ionic.jpg"
excerpt: "In this tutorial we'll use the new Google's Firestore database to create a simple Ionic 4 mobile application with CRUD (Create, Read, Update and Delete) methods using Angularfire2. We'll start by introducing the Firestore database and its features vs the old Firebase real-time database then we'll scaffold a new Ionic 4/Angular project, setup our Firebase account and enable the Firestore database then we'll integrate the new database with our Ionic application and create the CRUD methods which can be used to create, read, update and delete simple products document from a collection in the database" 
tags : [ionic , angular] 
---


**In this tutorial we'll use the new Google's Firestore database to create a simple Ionic 4/Angular mobile application with CRUD (Create, Read, Update and Delete) methods using Angularfire2. We'll start by introducing the Firestore database and its features vs the old Firebase real-time database then we'll scaffold a new Ionic 4/Angular project, setup our Firebase account and enable the Firestore database then we'll integrate the new database with our Ionic application and create the CRUD methods which can be used to create, read, update and delete simple products document from a collection in the database so let's get started!**

![](/images/content/ionic2.jpg)

Google's Cloud Firestore is the new NoSQL-based document-oriented database that can be used with the other firebase infrastructure tools to create a back-end for your mobile and web apps.

Unlike SQL-based databases, the NoSQL Cloud Firestore allows developers to use documents (container of key-vale pairs) organized into collections to store your data instead of tables, rows and columns or also the JSON objects (forming a flat JSON tree) used by the Firebase real-time database.

>This means it's a fully managed product, built from the ground up to automatically scale. Cloud Firestore is a multi-region replicated database that ensures once data is committed, it's durable even in the face of unexpected disasters. Not only that, but despite being a distributed database, it's also strongly consistent, removing tricky edge cases to make building apps easier regardless of scale. [Source](https://firebase.googleblog.com/2017/10/introducing-cloud-firestore.html)

<iframe width="560" height="315" src="https://www.youtube.com/embed/QcsAb2RR52c" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>

Throughout this tutorial you will learn how to integrate Google's Cloud Firestore into your Ionic 4/Angular application using *AngularFire 5* by building an example CRUD (Create, Read, Update and Delete) mobile application from scratch.

## Cloud Firestore Features vs. Firebase Realtime Database


Google's Cloud Firestore provides many features over the already existing Firebase real-time database. It makes things easier when you are building apps with complex database requirements using a variety of NoSQL concepts such as collections, sub-collections and documents where you can store key-value pairs.
 
The Cloud Firestore is a next generation of the traditional Firebase real-time database that offers more powerful and chained data queries, real-time synchronization, offline persistance support (using the client SDKs) and automatic scaling (thanks to the integration with the Google's Cloud platform).

It's also well-integrated with the existing firebase infrastructure and the Google Cloud platform.

## First Steps and Requirements  

You'll need to create or log into your [Firebase account](https://firebase.google.com/), to enable the new database, then follow these steps:

Go to firebase console, and create a new project.

Click *Databases* on the left side then select the Firestore Database.

Next you'll need to set up the security rules to start in test mode.

For this simple demo we'll use Firebase Anonymous authentication and public access to database so From the left side of your Firebase console, choose *Authentication* then go to the *Sign in* method tab then enable Anonymous.

Optionally you can also add a collection to your Firestore database. This can also be created automatically, once you reference a collection that doesn't exist, from you code.

Next you'll need to setup a development environment for working with Ionic. You can start developing Ionic apps with the minimum of requirements. First **install Node.js and npm** if they are not already installed on your machine from the official [website](https://nodejs.org/en/download/) then **install the Ionic CLI** using npm.

```bash
npm install -g @ionic/cli
```

You may need to add *sudo* before this command.

Now you can create a new Ionic 4/Angular application by running the following command:

```bash
ionic start ionic-firestore-crud blank --type=angular
```

This will create an Ionic app based on the blank template.

Next, here are the steps you need to follow in nutshell:

* first navigate into the newly created project's folder
* next install the firebase JavaScript library, *angularfire2* and *promise-polyfill* from npm (the *promise-polyfill* is only required when deploying your app to iOS or Android devices to avoid promise errors when using Firebase)
* then add code to interact with your Firestore database to your component.

So let's start with the first step. 

## Integrating Cloud Firestore with Ionic 

We are going to use *Angularfire2* to integrate Cloud Firestore with Ionic 4/Angular and since this is a new product you need the latest version of the Firebase JavaScript SDK and *AngularFire2* installed so head back to your terminal or command prompt and run the following command:

```bash
npm install firebase@latest angularfire2@latest promise-polyfill --save
```
We have already configured our new Firestore database and enabled the anonymous authentication. Now we'll need to add our credentials to the Ionic 4/Angular application. So go ahead and grab the required credentials by clicking on your Firebase console' *Project Overview* menu item, then click on *Add Firebase to your webapp*.

You should be able to see and you can copy your database credentials to your clipboard.

Now head back to your Ionic project then create a file that will be used for separately storing the configuration credentials (you can name it something like: `config.ts`) then copy your credentails there:

```bash
touch config.ts
```

Here is how the credentails object should look like, but of course with your own values:

```js
export const credentials = {
    firebase: {      
        apiKey: '<YOUR_API_KEY>',      
        authDomain: '<YOUR_AUTH_DOMAIN>',      
        databaseURL: '<YOUR_DATABASE_URL>',      
        projectId: '<YOUR_PROJECT_ID>',      
        storageBucket: '<YOUR_STORAGE_BUCKET>',      
        messagingSenderId: '<YOUR_MESSAGING_SENDER_ID>'    
    }  
};
```
Next you'll need to wire Firebase and Firestore to your Ionic 4/Angular main module. You need to simply import *AngularFireModule*, *AngularFirestoreModule* and *AngularFireAuthModule* modules and add them to the *imports* array. Make sure also to import the *credentials* from `config.js` then pass the object *credentials.firebase* to the *initializeApp()* method of *AngularFireModule*: 

```ts
/* ... */
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { credentails } from './config';


/* ... */ 

  imports: [
    /* ... */
    AngularFireModule.initializeApp(credentials.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [],

```

You can optionally call the *enablePersistence()* method on the *AngularFirestoreModule* module which enables offline support in web browsers so users can still access the app when they go offline.  

Now to be able to work with Firestore you need to inject the *AngularFirestore* service into the constructor of your component(s).

```ts
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

interface Product {
  name: string,  
  description: string,
  quantity: number
}

products: Observable<Product[]>;
productsCollectionRef: AngularFirestoreCollection<Product>;

constructor(public afAuth: AngularFireAuth, afs: AngularFirestore) {
    this.afAuth.auth.signInAnonymously();
    this.productsCollectionRef = this.afs.collection('products'); 
    this.products = this.productsCollectionRef.valueChanges();
  }
}

```

We first imported the required dependencies then injected *AngularFireAuth* as *afAuth* and *AngularFirestore* as *afs*. In the constructor we are calling `this.afAuth.auth.signInAnonymously()` to sign in users using the Firebase Anonymous option.

Next we create a reference to the *products* collection which holds *product* documents. Please note that creating a reference to a collection doesn't actually send any requests so you can also create references to collections which are not yet created (in this case the collection will be automatically created).

Next we call the *.valueChanges()* method on the collection reference which returns an Observable that listens for any changes on the collection.

When building CRUD apps you'll need the *ids* of the documents you are retrieving so you can update and delete them that's you'll need to use *.snapshotChanges()* instead of *.valueChanges()* in most cases since it returns the *id* among other information of the documents.        

### Retrieving or Querying Documents


Now let's display the products in the template with something like:

```
<ion-list>
  <ion-list-header>
    Products
  </ion-list-header>
  <ion-item  *ngFor="let product of products | async">
    <h1>{{product.name}}</h1>
    <p>{{product.description}}</p> 
    <p>{{product.quantity}}</p>
  </ion-item>
</ion-list>

```

**async** is a built-in pipe which allows you to easily subscribe to Observables without manually calling the *.subscribe()* method in the component class.

So in the template we subscribe to the *products* Observable then we loop over the result and display the name, the description and the quantity using an `<ion-list>`.

### Creating or Adding Documents

You can add a new document by using the `.add()` method of the collection reference: Add a method *createProduct()* to your component:

```ts
createProduct(name: string, description: string, quantity: number) {
  
    this.productsCollectionRef.add({ name: name, description: description, quantity: quantity });
  
}
```


### Updating Documents

You can also update using the *.update()* method on the document retrurned by the *.doc(id)* method which takes the *id* of the document you want to update.

```ts
updateProduct(product: Product) {
  this.productsCollectionRef.doc(product.id).update({ name: 'NEW_NAME', description : 'NEW_DESC' , quantity : product.quantity + 100 /*NEW QUANTITY*/ });
}
```

### Deleting Documents 

Deleting a document works the same as updating, you simply grab a reference to the document you want to delete by calling the *.doc(id)* method on the collection then call the *.delete()* method.

```ts
deleteProduct(product: Product) {
  this.productsCollectionRef.doc(product.id).delete();
}
```

That's it we have created the four methods needed by any CRUD application.

## Conclusion

In this tutorial we have seen how to build a simple CRUD application with Ionic 4/Angular and the new Google's Cloud Firestore database using *AngularFire2*.


