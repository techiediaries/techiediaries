---
layout: post
title: "Quick Ionic SQLite Storage Example"
image: "images/content/ionic2-sqlstorage-with-sqlite-and-cordova.png"
excerpt: "In this tutorial ,you are going to learn how to use SQLite with Ionic 2 ,Cordova and Ionic Native for data storage on Android and iOS mobile apps"
categories : mobiledev
tags : [ionic2 , ionic ]
---

Ionic  is, nowadays, one of the most popular open source and free hybrid mobile frameworks for building hybrid mobile apps for Android, iOS and even Windows Universal Platform.

One of the key requirements of a mobile application is data storage. It's true that you can use local storage 
just like any web app (Since hybrid apps are web apps in essence) but it has limitations such as query difficulties 
(i.e you can't build complex data queries) and capacity - You can only store a maximum of 10MB of data.

So what solution do we have?

In this tutorial, we are going to see how to use SQLite, a light version of SQL which has no capacity limitation 
(Depends only your device storage capacity) and can execute complex SQL queries on data.

Now let's see how we can use SQLite with Ionic  and Angular.

First, let's start by creating a new Ionic  project based on Angular. Open your terminal on Linux/MAC or your command prompt
under Windows and type the following commands to scaffold a new project:

    ionic start ionic-sqlite-example blank --type=angular 

You can't use SQLite in the browser so you need to use an emulator or your real mobile device. Before you 
 can do that let's add a target platform (In our case we'll be adding Android)

    ionic cordova platform add android 

You need to have Java and Android SDK installed on your system and the `ANDROID_HOME` environment variable set to 
the location of your Android SDK.

If you want to target iOS you need to build your app under a MAC system.

Next let's add the Cordova plugin for using SQLite 

    ionic cordova plugin add cordova-sqlite-storage

We are not going to build a fully fledged app but a simple example which shows how to use SQLite with Ionic.

Next, you need to install the Ionic native plugin:

    npm install @ionic-native/sqlite

Next, go ahead and open your `src/app/home/home.page.ts` file and add the import statement to import `SQLite` and `SQLiteObject` from `ionic-native`: 

    import { SQLite, SQLiteObject } from ‘ionic-native’;  

Next, add a database variable to your class:

```ts
private database: SQLiteObject;
```

Next, you need to inject `SQLite` via the constructor:

```ts
constructor(private sqlite: SQLite) { }
```

Next, in the constructor add the following code:

```ts
this.sqlite.create({
  name: 'items.db',
  location: 'default'
})
  .then((db: SQLiteObject) => {

    this.database = db;  
    db.executeSql(create table if not exists items(
        reference CHAR(10) PRIMARY KEY,
        name CHAR(30),
        qMin FLOAT,
        qReal FLOAT
      ))`, [])
      .then(() => console.log('Executed SQL'))
      .catch(e => console.log(e));


  })
  .catch(e => console.log(e));
```

After running your app; a database with the `items.db` name will be created and a database table with
the `items` name will be created only if it doesn't exist.

Now how can we save some data in our database tabe items.

To save data you just need to write a SQL Insert query with some values. For example: 

        let q = "INSERT INTO items VALUES (?, ?, ?, ?)";

Next, simply execute the query: 

        this.database.executeSql(q, { "ITEM000001","ITEM 000001",1.0,100.0});

## How to Retrieve Data?

Again to get or retreive data from the `items` database table we just need to use the right SQL instruction, this time
it's `select`:

    let items = [];
    this.database.executeSql("SELECT * FROM items ").then((r) => {
      
      if (r.res.rows.length > 0) {
        for (var i = 0; i < r.res.rows.length; i++) {
          items.push(r.res.rows.item(i));
        }
      }

Here is the complete example: 


    import {Component, OnInit} from '@angular/core';
    import {NavController, Platform} from 'ionic-angular';
    
    import { SQLite, SQLiteObject } from ‘ionic-native’;  
    

    @Component({
      selector: 'app-home',
      templateUrl: './home.page.html',
      styleUrls: ['./home.page.css'],
    })
    export class HomePage {
    
        private database: SQLiteObject;
        items: Array<any>;
    
        constructor(private platform: Platform) {
            
            this.platform.ready().then(() => {
                this.sqlite.create({
  name: 'items.db',
  location: 'default'
})
  .then((db: SQLiteObject) => {

    this.database = db;  
    this.createTables();

      .then(() => console.log('Executed SQL'))
      .catch(e => console.log(e));


  })
  .catch(e => console.log(e));
            });
        }
        public createTables(){
            this.database.executeSql(`create table if not exists items(
                reference CHAR(10) PRIMARY KEY,
                name CHAR(30),
                qMin FLOAT,
                qReal FLOAT
            ))`, {});            
        }
        public addItem() {
            this.database.executeSql(q, { "ITEM000001","ITEM 000001",1.0,100.0}).then((data) => {
                console.log("Success");
            }, (e) => {
                console.log("Error :  " + JSON.stringify(e.err));
            });
        }
    
        public findAll() {
            this.database.executeSql("SELECT * FROM items", []).then((data) => {
                this.items = [];
                if(data.rows.length > 0) {
                    for(var i = 0; i < data.rows.length; i++) {
                        this.items.push(data.rows.item(i));
                    }
                }
            }, (e) => {

                console.log("Errot: " + JSON.stringify(e));
            });
        }
    
    }

Next, in your home template file, you need to add the following code to call the various operations for creating and reading data:

{% raw %}
```html
<ion-header>
  <ion-toolbar color="primary">
    <ion-title> Home </ion-title>
  </ion-toolbar>
</ion-header>
 
<ion-content padding>
 
      <ion-button expand="block" (click)="addItem()">Add Item </ion-button>
 
      <ion-list>
        <ion-item *ngFor="let item of items">
          <ion-label>
            <h2> {{ item.name }}</h2>
            <p> {{ item.qReal }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </div>
  
 
</ion-content>
```
{% endraw %}

## Conclusion 

As you can see, using SQLite with Ionic  and Angular is dead easy and straightforward. All you need to do is to install the Cordova plugin for SQLite and build the SQL queries and run them.

For more advanced examples you just need to look for any tutorial about SQlite on the web. What you can do normally with SQlite, you can do here in the case of Ionic.       