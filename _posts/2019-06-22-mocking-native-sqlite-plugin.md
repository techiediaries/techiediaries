---
layout: post
title: "Mocking SQLite Native Plugin in Ionic 4 & Angular"
image: "images/content/mocking-native-sqlite-plugin.png"
excerpt: "Developing Ionic apps entirely in the browser - Mocking SQLite native plugin" 
tags : [ionic]
---

In this tutorial, we'll learn how to mock the SQLite native plugin in Ionic 4 & Angular projects.


Thanks to Ionic Native, we can now mock native plugins to provide a fake class that has the same API as the native wrapper for a specific Cordova plugin.

You may use simple mocks which only return some supplied values or you can build fully working mocks that port the functionality of a specific native plugin to the browser by taking advantage of an equivalent browser API or a JavaScript library.

So let's get started by creating a new Ionic 4 project based on Angular and install the Ionic native SQLite wrapper.

## Creating a New Ionic 4 Project 

Open your terminal/command prompt and run the following command:

    ionic start native-sqlite-mock blank --type=angular


> **Note**: Please note that we are using the Ionic CLI 5 which is the latest version. You can install via npm by running the `npm install -g ionic@latest`. 

Once your project is fully created, navigate inside of it and run the following command to install the Ionic native SQLite 
plugin:

    cd native-sqlite-mock 
    npm install --save @ionic-native/sqlite@4

> **Note**: We don't need to add a Cordova platform or add the Cordova SQLite plugin since we are not going to develop 
on the real device for now. 


After installing the native plugin, open the `src/app/app.module.ts` file and add it to the list of providers:

    import { SQLite } from '@ionic-native/sqlite';

    @NgModule({
    declarations: [
        MyApp
        ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp  
        ],
    providers: [
        StatusBar,
        SplashScreen,
        SQLite 
        ]
    })
    export class AppModule {} 


## Creating a SQLite Database 

Now, let's create our SQLite database. Open the `src/pages/home/home.ts` file and let's do the following things:  

- Inject the SQLite plugin,
- Declare an object of the `SQLiteObject` type,
- Add an array for storing your data and a variable of the number type that will be used as a counter. 
- Finally, create a SQLite database.

Open the `src/app/pages/home/home.page.ts` file and the following changes:

```ts
import { Component, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  public database: SQLiteObject;
  public invoices: Array<Object>; // our data  
  public counter : number = 0;
  
  constructor(private sqlite : SQLite) { }
  ngOnInit() {
    this.sqlite.create({name: "data.db", location: "default"})      .then((db : SQLiteObject) => {
                    this.database = db;
                }, (error) => {
                    console.log("ERROR: ", error);
     });
  } 
}
```

Head back to your terminal and run the following command to serve your app locally:

```bash
$ ionic serve 
```

Next, go to the `http://localhost:8100` address for playing with your app in the browser.

Open the browser's console, you should **cordova is not available** message. 

That's because, unlike real devices, in the browser environment Cordova is not avialble. 

This means, the `create()` method will fail to create a SQLite database. let's change that!

## Mocking the SQLite Plugin 

We want to use the SQLite API methods when developing on the browser without having to change anything when we switch back to a real device. This is why we need to create a mock which has the same API. 

The most used methods of the SQlite plugin are: 

- The `create()` method for creating SQLite databases.
- The `executeSql()` method for executing SQL statements against the created database.

We need to create a mock that at least provides these two methods.

Open the `src/app/app.module.ts` file and add the following TypeScript class:

    import { SQLite  , SQLiteDatabaseConfig , SQLiteObject } from '@ionic-native/sqlite';

    class SQLiteMock {
    public create(config: SQLiteDatabaseConfig): Promise<SQLiteObject> {
            
        return new Promise((resolve,reject)=>{
            resolve(new SQLiteObject(new Object()));
        });
    }
    } 

Next, add the `SQLiteMock` class under the `useClass` property of the SQLite provider: 

    providers: [
        StatusBar,
        SplashScreen,
        {provide: SQLite, useClass: SQLiteMock},
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
    })


That's it! You have created a basic mock for the SQLite plugin. Now if you go back to your application, you will not get the **Cordova Not Available** method since we are using the `create()` method of our mock class instead of the original one.

But this mock doesn't actually create any database, so we can't simulate the same environment as if we are developing on a real device, let's change that!

Since the browser has no supported way to use SQLite, we will use a JavaScript library which provides an in memory SQLite database i.e the database and all its content will live in the memory.

So go ahead and <a href="https://github.com/kripken/sql.js/blob/master/js/sql.js">grab the library</a> then include 
it with using a `<script>` tag in `index.html` file of your project just before Ionic files:

```html
<script src="assets/sql.js"></script>
```
Since this is a JavaScript library, add the following statement in the `src/app/app.module.ts` to be able to use it: 

    declare var SQL;


## Implementing the `create()` Method of SQLite

Now let's implement the `create()` method of our mock class: 

    class SQLiteMock {
        public create(config: SQLiteDatabaseConfig): Promise<SQLiteObject> {

            //since this is an in memory database we can ignore the config parameters 
            
            var db = new SQL.Database();
                
            return new Promise((resolve,reject)=>{
                resolve(new SQLiteObject(db));
            });
        }
    }

## Implementing  `SQLiteObject` and `executeSql()`

Until now, we are using the original `SQLiteObject` but we need to use our own so we can provide an 
implementation of `executeSql()` method.

So go ahead and remove the import statement of `SQLiteObject` and create a new class which has a constructor that 
takes a database object we have in the `create()` method.

The `executeSql()` method needs to return a Promise that can be either rejected with an error string or resolved 
with a payload:

          var payload = {
            rows: {
              item: function(i) {
                return rows[i];
              },
              length: rows.length
            },
            rowsAffected: this._objectInstance.getRowsModified() || 0,
            insertId: this._objectInstance.insertId || void 0
          }; 

And here is the full class: 

    class SQLiteObject{
        _objectInstance: any;
        
        constructor(_objectInstance: any){
            this._objectInstance = _objectInstance;
        };
        
        executeSql(statement: string, params: any): Promise<any>{

            return new Promise((resolve,reject)=>{
                try {
                    var st = this._objectInstance.prepare(statement,params);
                    var rows :Array<any> = [] ;
                    while(st.step()) { 
                        var row = st.getAsObject();
                        rows.push(row)
                    }
                    var payload = {
                        rows: {
                        item: function(i) {
                            return rows[i];
                        },
                        length: rows.length
                        },
                        rowsAffected: this._objectInstance.getRowsModified() || 0,
                        insertId: this._objectInstance.insertId || void 0
                    };  
                    resolve(payload);
                } catch(e){
                    reject(e);
                }
            });
        };

    }


> **Note**: Both the `create()` and `executeSql()` methods should have the exact same parameters and return types as the original ones. So we can get the same behavior, when we swap back the original plugin on the real device 
>
>You can look at the Ionic Native wrapper of SQLite and also the SQLite Cordova plugin to get the exact signatures and return types of these methods. 


## Testing the Mocked SQLite Plugin

Now, let's test our fake SQLite plugin.

### Creating a SQL Table

Let's add a `createTable()` method to create an `invoices` table: 

    public createTable(){
        this.database.executeSql('create table if not exists invoices(name VARCHAR(32))', {})
            .then(() => {
                console.log('Table Invoice created !');
            
            })
            .catch(e => console.log(e));    
    }

### Inserting Data in the SQL Table

Next, add a method to insert some invoices into the created table: 

    public counter : number = 0;
    public insertInvoice(){
        var c = 'INV' + this.counter; 
        this.database.executeSql("INSERT INTO invoices (name) VALUES (?)", [c]).then((data) => {
                console.log("INSERTED: ");
                this.counter++;
                this.showInvoices();
            }, (error) => {
                console.log("ERROR: " + JSON.stringify(error.err));
            });    
    }

### List the Table Data

Create the `showInvoices()` method which list all the inserted invoices: 

    public invoices: Array<Object>;  
    public showInvoices(){
        this.database.executeSql("SELECT * FROM invoices", []).then((data) => {
                this.invoices = [];
                if(data.rows.length > 0) {
                    for(var i = 0 ; i < data.rows.length ; i++) {
                        this.invoices.push({ name: data.rows.item(i).name });
                    }
                }
            }, (error) => {
                console.log("ERROR: " + JSON.stringify(error));
            });    
    }


Next, chnage the code inside the `ngOnInit()` method as follows: 

    ngOnInit(){
            this.sqlite.create({name: "data.db", location: "default"}).then((db : SQLiteObject) => {
                    this.database = db;
                    this.createTable();
                }, (error) => {
                    console.log("ERROR: ", error);
            });    
    }
    
> **Note**: Don't forget to inject the SQLite provider via home page constructor.


Finally, open the `src/app/pages/home/home.page.html` file and add a button to trigger the method to insert invoices and a list to show the invoices in our SQLite database

<ion-header>
  <ion-toolbar>
    <ion-title>Ionic 4 SQLite Mock Example</ion-title>
  </ion-toolbar>
</ion-header>

    <ion-content padding>
        <button ion-button (click)="insertInvoice()">Insert Invoice</button>
        <ion-list>
        <ion-item *ngFor="let invoice of invoices">
            {{invoice.name}}
        </ion-item>
    </ion-list>
    </ion-content>

## Saving the SQLite Database

Since we are using an in memory SQLite database, when our app reloads, the content of the database gets lost.

This is not a problem because this is just test data but to avoid re-entering the data every time the app reloads let's save the SQLite database and reload it back when the app reloads.

Fortunately for us, our JavaScript library has an export method to export the in memory database to an Array of bytes.

You can use either the local storage or the IndexedDB database in the browser to save the in memory database every time the `executeSql()` method is invoked.

Change the `executeSql()` as follows:

    executeSql(statement: string, params: any): Promise<any>{
      
      return new Promise((resolve,reject)=>{
        try {
          var st = this._objectInstance.prepare(statement,params);
          var rows :Array<any> = [] ;
          while(st.step()) { 
              var row = st.getAsObject();
              rows.push(row);
          }
          var payload = {
            rows: {
              item: function(i) {
                return rows[i];
              },
              length: rows.length
            },
            rowsAffected: this._objectInstance.getRowsModified() || 0,
            insertId: this._objectInstance.insertId || void 0
          };  
      
          //save database after each sql query 
      
          var arr : ArrayBuffer = this._objectInstance.export();
          localStorage.setItem("database",String(arr));
          resolve(payload);
        } catch(e){
          reject(e);
        }
      });
    };


Next, change the `create()` method of `SQLiteMock` as follows: 

    class SQLiteMock {
    public create(config: SQLiteDatabaseConfig): Promise<SQLiteObject> {
        var db;
        var storeddb = localStorage.getItem("database");
        
        var arr = storeddb.split(',');
        if(storeddb)
        {
            db = new SQL.Database(arr);
        }
        else
        {
            db = new SQL.Database();
        }
           
        return new Promise((resolve,reject)=>{
            resolve(new SQLiteObject(db));
        });
    }
    }

The method looks for a database item in the local storage. If it exists, it gets passed to `SQL.Database()`.

The database is saved as a string so it gets parsed back to an array of bytes.

## Conclusion


Now you can develop Ionic 4 apps which make use of the native SQLite plugin entirely in the browser thanks to Ionic Native mocks.






