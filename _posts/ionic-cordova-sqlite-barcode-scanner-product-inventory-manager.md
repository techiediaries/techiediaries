---
layout: post
title: "Ionic 4/Angular: Using Cordova SQLite and Barcode Scanner plugins to build a product inventory manager [PART 1]"
image: "images/content/inventory-manager-ionic-sqlite.png"
excerpt: " Using Ionic 4 with Cordova SQLite and Barcode scanner plugins to build a simple product inventory manager mobile application for Android and iOS " 
tags: ionic
---

{% include image.html 
    img="images/content/inventory-manager-ionic-sqlite.png" 
    title="ionic 2+ SQLite and barcode scanner " 
%}

We have created many Ionic simple examples but never a real world Ionic demo so it is time for a tutorial to build
a product inventory manager with Ionic 4/Angular and Cordova SQLite plugin. It is a simple app for managing an inventory of products which 
can be used to learn about many features in Ionic 4 that allows you to build real life apps for you or your clients.

<a href="/ionic-cordova-sqlite-barcode-scanner-product-inventory-manager" target="_blank">
Ionic 2+ : Using Cordova SQLite and Barcode Scanner to build a Product Inventory Manager [PART 1]
</a>

<a href="/mocking-native-sqlite-plugin"  target="_blank">How to Mock the SQLite Plugin to Develop Your App Entirely On the Browser</a>

<a href="/ionic-cordova-sqlite-barcode-scanner-product-inventory-manager-part-2" target="_blank">
Ionic 2+ : Using Cordova SQLite and Barcode Scanner to build a Product Inventory Manager [PART 2]
</a>

<a href="/ionic-cordova-sqlite-barcode-scanner-product-inventory-manager-part-3" target="_blank">
Ionic 2+ : Using Cordova SQLite and Barcode Scanner to build a Product Inventory Manager [PART 3]
</a>

<a href="/ionic-cordova-sqlite-barcode-scanner-product-inventory-manager-part-4" target="_blank">
Ionic 2+ : Using Cordova SQLite and Barcode Scanner to build a Product Inventory Manager [PART 4]
</a>



In this tutorial we are going to learn how to use the Cordova SQLite plugin to create and populate SQL database tables then how to use 
the Barcode Cordova plugin to scan product barcodes. 

We are also going to see basic Ionic 4/Angular concepts such as components, providers, pages and modals in case this is your first time using Ionic 4 and Angular.


## Starting a New Ionic 4/Angular roject 


Let's start our journey by generating a blank Ionic 4/Angular app. If this is your first time using Ionic,make sure to first setup your local development environment and install Ionic CLI 4. 

You can only use Ionic 4/Angular with TypeScript which is a superset of JavaScript with OOP concepts and strong types but don't worry if you are not familiar with it. Ionic code is straightforward and easy to understand so just continue the tutorial.

Now open up your terminal under Linux/MAC or command prompt under Windows and run:

    ionic start product-inventory-manager blank --type=angular 
    cd product-inventory-manager
    ionic serve 

<div class="note">
Please note that we are using Ionic CLI v4
</div>

Let's understand what we have done.

We first generated a new Ionic 4 app based on Angular and the blank template then we navigated inside the folder hosting the app files .

Next, we served our app using ionic serve. You'll be able to visit your app using a web browser from the `http://localhost:8100` address. 

## Adding a target platform 

Since we'll be testing our app in a real device we need to add at least one target platform. We are going to add android but feel free to add ios or windows if you need to target these platforms: 

    ionic cordova platform add android 

Next run your app on a real USB attached device using: 

    ionic run android -l

Thanks to live sync or relaod (-l) all changes you make to your app code will be synced on the device.

## Adding/Configuring The Cordova SQLite plugin and Ionic Native wrapper

Now our next step will be installing the Cordova plugin for SQLite so again head over to your terminal and run: 

    ionic cordova plugin add cordova-sqlite-storage --save

<div class="note">
Ionic is based on Apache Cordova which is the framework which does the real work of interfacing with the native 
features of mobile devices.
</div>    

Now let's add the Ionic Native wrapper for SQLite: 

    npm install --save @ionic-native/sqlite 

To be able to use SQLite in your app you need to add it to the list of providers in <em>src/app/app.module.ts</em>:

    /* ... */

    import { SQLite } from '@ionic-native/sqlite';

    /* ... */

    @NgModule({
    declarations: [
        MyApp,
        ListPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        ListPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        SQLite,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        
    ]
    })
    export class AppModule {}

After this, you'll be able to inject SQLite in any component and call its methods to create and interact with a SQLite database.

 
## Creating our first service/provider

We are going to place any code which interacts with SQLite in a separate service so lets create a new data service using the Ionic CLI 4 generator: 

    ionic g provider DataService 

A new service will be generated in <em>src/app/providers/data-service</em>

Again we need to add this service to our app list of providers:

    import { DataServiceProvider } from '../providers/data-service/data-service';

    providers: [
        StatusBar,
        SplashScreen,
        SQLite,
        DataServiceProvider,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
    ] 

You can now inject this service in any component to get an instance that you can use.     

Open <em>src/pages/home/home.ts</em> then import and inject DataServiceProvider via component constructor: 

    import { DataServiceProvider } from '../../providers/data-service/data-service';

    @IonicPage()
    @Component({
    selector: 'home',
    templateUrl: 'home.html',
    })
    export class HomePage {
    
    constructor(public navCtrl: NavController,private dataService : DataServiceProvider) {
    }

## Creating the SQLite database 

Open <em>src/providers/data-service/data-service.ts</em> then start by importing SQLite and SQLiteObject from <em>@ionic-native/sqlite</em> then 
inject it on the constructor and call the `create()` method to create a database `data.db` on the default location of your device filesystem:

        import { Injectable } from '@angular/core';
        import { Http } from '@angular/http';
        import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

        import 'rxjs/add/operator/map';

        @Injectable()
        export class DataServiceProvider {
        public database: SQLiteObject;

        /* ... */                                          

        constructor(public sqlite :SQLite) {
            console.log('Hello DataServiceProvider Provider');
            
                this.sqlite.create({name: "data.db", location: "default"}).then((db : SQLiteObject) => {
                        this.database = db;
                    }, (error) => {
                        console.log("ERROR: ", error);
                }); 

        }

Before creating SQL tables lets talk a little bit about our database structure. 

## Business requirements and database modeling

Our mobile app has many business requirements ,basically users should be able to:

- The user should be able to manage products: Adding,deleting, modifying and listing with pagination.

- The user should be able to manage families: Adding,deleting, modifying and listing with pagination.
 
- The user should be able to manage locations: Adding,deleting, modifying and listing with pagination.

- The user should be able to manage vendors or manufacturers: Adding, deleting, modifying and listing with pagination.

- The user should be able to manage transactions: Adding, deleting, modifying and listing with pagination.

- A product belongs to a family of products.

- A product has a location.

- A product has a vendor/manufacturer.

- A product has a Title, Description, Unit Price, SKU (Stock Keeping Unit), Barcode (ISBN, UPC etc.), Quantity.

- A transaction has a Date, Quantity, Unit Cost, Reason (New Stock - Usable Return - Unusable Return ), UPC (Universal Product Code ), Comment. 

## Creating SQL tables with SQLite 

First create SQL statements to create each table inside string variables: 

        @Injectable()
        export class DataServiceProvider {
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
        //Date , Quantity , Unit Cost , Reason (New Stock - Usable Return - Unusable Return ) ,UPC (Universal Product Code ) Comment    
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
                                



Next add a method to create tables: 

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


<div class="note">
Make sure you target es6 to be able to use async-await in your code .
</div>    

Then change the DataServiceProvider constructor to call the createTables() method: 

        constructor(public sqlite :SQLite) {
            console.log('Hello DataServiceProvider Provider');
            
                this.sqlite.create({name: "data.db", location: "default"}).then((db : SQLiteObject) => {
                        this.database = db;
                        this.createTables();
                    }, (error) => {
                        console.log("ERROR: ", error);
                }); 

        }

If you run your app, a database with four tables should be created.

## Create Home Page 

Open <em>src/pages/home/home.html</em> then copy and paste the following: 

    <ion-header>
    <ion-navbar>
        <button ion-button menuToggle>
        <ion-icon name="menu"></ion-icon>
        </button>
        <ion-title>Product Inventory Manager</ion-title>
    </ion-navbar>
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

Then open <em>src/pages/home/home.ts</em> and add a method openModal() which opens a modal with the page passed as a parameter: 


        import { Component } from '@angular/core';
        import { IonicPage, NavController, NavParams ,ModalController } from 'ionic-angular';
        import { DataServiceProvider } from '../../providers/data-service/data-service';
        
        @IonicPage()
        @Component({
        selector: 'home',
        templateUrl: 'home.html',
        })
        export class HomePage {
        constructor(public navCtrl: NavController,public modalCtrl : ModalController ,public navParams: NavParams,public dataService :DataServiceProvider) {
        }

        ionViewDidLoad() {
        }
        openModal(page){
            var modalPage = this.modalCtrl.create(page);
            modalPage.present();
        }
        }

## Create List/Details Pages

Using Ionic CLI 4 generator create two pages for listing and showing  details: 

    ionic g page FamilyListPage 
    ionic g page FamilyDetailsPage 

    ionic g page LocationListPage 
    ionic g page LocationDetailsPage 

    ionic g page ProductListPage 
    ionic g page ProductDetailsPage 

    ionic g page TransactionListPage 
    ionic g page TransactionDetailsPage 
    

## Conclusion


That's the end of this first part! 

We have installed and configured Cordova SQlite plugin and created required database tables and diffrent pages 
for listing and adding data in database. 

See you on the next part to continue building our product inventory manager mobile app with Ionic 4/Angular and SQLite.

Next part:

<a href="/ionic-cordova-sqlite-barcode-scanner-product-inventory-manager-part-2" target="_blank">
Ionic 4/Angular: Using Cordova SQLite and Barcode Scanner to build a Product Inventory Manager [PART2]
</a>


