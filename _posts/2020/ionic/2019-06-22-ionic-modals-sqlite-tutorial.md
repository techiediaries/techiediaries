---
layout: post
title: "Ionic 4 Modals and SQLite Tutorial: Build a Product Manager App"
image: "images/content/inventory-manager-ionic-sqlite.png"
excerpt: " Using Ionic 5 with Cordova SQLite and Barcode scanner plugins to build a simple product stock manager mobile application for Android and iOS" 
date: 2020-02-13
tags: [ionic]
---

In this tutorial, we'll use Ionic 5 and Angular to build a simple mobile application for managing stock products.

We'll be using the SQLite plugin to persist data and the Barcode scanner plugin for scanning barcodes. We'll also make use of Ionic Modals to create our UI.

Our example app can be used to manage an inventory of products. It's convenient for demonstarting various features of Ionic 5 that allows you to build real life apps for your clients.

In this tutorial, we are going to learn how to use the Cordova SQLite plugin to create and populate SQL database tables and how to use the Barcode Cordova plugin to scan product barcodes. 

We are also going to see basic Ionic 5/Angular concepts such as components, providers, pages and modals.


## Starting a New Ionic 5/Angular Project 


Let's start our journey by generating a blank Ionic 5/Angular app. 

If this is your first time using Ionic, make sure you first setup your local development environment and install Ionic CLI 5 (The latest version as of this writing). 

We'll be using Ionic 5 with Angular and TypeScript which is a superset of JavaScript with OOP concepts and strong types.

Now, open your terminal under Linux/MAC or command prompt under Windows and run the following command:

```bash
$ ionic start product-inventory-manager blank --type=angular 
```

Next, navigate inside your project's folder and serve your application:

```bash
$ cd product-inventory-manager
$ ionic serve 
```


Let's understand what we have done.

We first generated a new Ionic 5 app based on Angular and the `blank` template, next we navigated inside the folder hosting the app files and we served the app using the `ionic serve` command. 

You'll be able to play with your Ionic 5 app using a web browser from the `http://localhost:8100` address. 

## Adding a target platform 

Since we'll be testing our app in a real device we need to add at least one target platform. We are going to add `android` but feel free to add `ios` or `windows` if you need to target these platforms: 

```bash
$ ionic cordova platform add android 
```

Next, run your app on a real USB attached device using: 

```bash
$ ionic cordova run android -l
```

Thanks to live relaod (-l), all changes you make to your project's code will be synced on the device.

## Adding The Cordova SQLite Plugin and its Ionic Native Wrapper

Now, our next step will be installing the Cordova plugin for SQLite so again head over to your terminal and run the following command: 

```bash
$ ionic cordova plugin add cordova-sqlite-storage --save
```

Next, let's add the Ionic Native wrapper for SQLite: 

```bash
$ npm install --save @ionic-native/sqlite4 
```

To be able to use SQLite in your app you need to add it to the list of `providers` in the `src/app/app.module.ts`:

```ts
/* [...] */

import { SQLite } from '@ionic-native/sqlite';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
```

After this, you'll be able to inject SQLite in any component and call its methods to create and work with a SQLite database.

 
## Creating our First Angular Service

We are going to add any code which interacts with SQLite in a separate service so let's create a new data service using the Ionic CLI 5 generator: 

```bash
$ ionic g service data 
```

A new service will be generated in the `src/app/data.service.ts` file.


You can inject this service your components to use it.     

Open the `src/pages/home/home.page.ts` file and import then inject `DataService` via the component constructor: 

```ts
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {


  constructor(public dataService: DataService) { }

}
```

## Creating the SQLite database 

Open the `src/app/data.service.ts` file and start by importing SQLite and `SQLiteObject` from the `@ionic-native/sqlite` package and inject it via the constructor of the service. Next, call the `create()` method to create a `data.db` database on the default location of your device filesystem:


```ts
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public sqlite: SQLite) { 
    this.sqlite.create({name: "data.db", location: "default"})      .then((db : SQLiteObject) => {
            this.database = db;
    }, (error) => {
            console.log("ERROR: ", error);
    });     
  }
}
```


Before creating SQL tables, let's think about our database structure. 

## Business requirements and database modeling

Our mobile app has many requirements, basically users should be able add, delete, modify and list 

- Products with with pagination.
- Product families with with pagination.
- Locations,
- Transactions.

A product has a **location** and belongs to a family of products. It also the following attributes: 

- Title, 
- Description, 
- Unit Price, 
- SKU (Stock Keeping Unit), 
- Barcode (ISBN, UPC etc.), 
- Quantity.

A transaction has the following attributes:

- Date, 
- Quantity, 
- Unit Cost, 
- Reason (New Stock - Usable Return - Unusable Return ), 
- UPC (Universal Product Code ), 
- Comment,
- Product 

To keep it simple:

- A family has name, reference and unit attributes,
- A location has a name attribute 

All the tables has an id attribute used as a primary key.

## Creating SQL Tables with SQLite 

First, add the SQL statements to create your data tables as follows: 

```ts
        @Injectable()
        export class DataService {

        public database: SQLiteObject;

        productTable : string = `CREATE TABLE IF NOT EXISTS  products (
                                    id INTEGER PRIMARY KEY,
                                    sku TEXT,
                                    barcode TEXT,
                                    title TEXT NOT NULL,
                                    description TEXT,
                                    quantity REAL,
                                    unit VARCHAR,
                                    unitPrice REAL,
                                    minQuantity INTEGER,
                                    familly_id INTEGER,
                                    location_id INTEGER,
                                    FOREIGN KEY(familly_id) REFERENCES famillies(id),
                                    FOREIGN KEY(location_id) REFERENCES locations(id)
                                    );`;

        familyTable : string = `CREATE TABLE IF NOT EXISTS famillies (
                                    id INTEGER PRIMARY KEY,
                                    reference VARCHAR(32) NOT NULL,
                                    name TEXT NOT NULL,
                                    unit VARCHAR);`;

        locationTable : string = `CREATE TABLE IF NOT EXISTS locations (
                                        id INTEGER PRIMARY KEY,
                                        name TEXT NOT NULL);`;
                                          
        transactionTable : string = `CREATE TABLE IF NOT EXISTS transactions (
                                        id INTEGER PRIMARY KEY,
                                        date TEXT,
                                        quantity REAL,
                                        unitCost REAL,
                                        reason VARCHAR,
                                        upc TEXT,
                                        comment TEXT,
                                        product_id INTEGER,
                                        FOREIGN KEY(product_id) REFERENCES products(id));`;
                                
```


Next add a method to create the tables: 

```ts
    async createTables(){
        try {
            await this.database.executeSql(this.familyTable, {});
            await this.database.executeSql(this.locationTable,{});
            await this.database.executeSql(this.productTable,{});
            await this.database.executeSql(this.transactionTable,{});
        }catch(e){
            console.log("Error !");
        }
    }
```    

Next, change the service constructor to call the `createTables()` method: 

        constructor(public sqlite :SQLite) {

                this.sqlite.create({name: "data.db", location: "default"}).then((db : SQLiteObject) => {
                        this.database = db;
                        this.createTables();
                    }, (error) => {
                        console.log("ERROR: ", error);
                }); 

        }

If you run your app, a database with four tables should be created.

## Creating the UI 

Open the `src/pages/home/home.page.html` and the following code: 

```html
<ion-header>
  <ion-toolbar>
    <ion-title>Home</ion-title>
  </ion-toolbar>
</ion-header>



<ion-content padding>
<ion-list>
    <ion-item>
        <button ion-button (click)="openModal('FamilyListPage')" full>MANAGE FAMILIES</button>
    </ion-item>
    
    <ion-item>
        <button ion-button (click)="openModal('LocationListPage')" full>MANAGE LOCATIONS</button>
    </ion-item>

    <ion-item>
        <button ion-button (click)="openModal('ProductListPage')" full>MANAGE PRODUCTS</button>
    </ion-item>

    <ion-item>
        <button ion-button (click)="openModal('TransactionListPage')" full>MANAGE TRANSACTIONS</button>
    </ion-item>
    
</ion-list>
</ion-content>
```

We are adding an Ionic List with four buttons which calls the `openModal()` method to open the specified page.

## Creating Ionic 5 Modals

Next, open the `src/pages/home/home.page.ts` file and add the `openModal()` method which opens a modal with the specified page passed as a parameter: 

```ts
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

 
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
 
 
  constructor(
    public modalController: ModalController
  ) { }
 
  async openModal(page) {
    const modal = await this.modalController.create({
      component: page,
      componentProps: {
      }
  });
 
    return await modal.present();
 }
}
```

## Creating Ionic 5 Pages

Using Ionic CLI 5 create the following pages: 

$ ionic g page FamilyList 
$ ionic g page FamilyDetails 

$ ionic g page LocationList 
$ ionic g page LocationDetails 

$ ionic g page ProductList 
$ ionic g page ProductDetails 

$ ionic g page TransactionList 
$ ionic g page TransactionDetails 
    

## Conclusion


That's the end of this tutorial! 

We have installed and configured Cordova SQlite plugin and created required database tables and diffrent pages of our app. We also added a simple UI with which four Ionic buttons to navigate in our application using Ionic modals.  

See you on the next part to continue building our product stock management app with Ionic 5, Angular and SQLite.


