---
layout: post
title: "Ionic 4 SQLite Data Pagination"
image: "images/content/inventory-manager-ionic-sqlite.png"
excerpt: "In this tutorial, we'll add pagination to our Ionic 5 app built using Angular and SQlite." 
date: 2020-02-13
tags: ionic
---



In the previous part(s) we have: 

- Created a new Ionic 5 project, 
- Added the Cordova SQLite plugin and its Ionic Native wrapper, 
- Created a data service for interfacing with the SQLite database,
- And implemented the various CRUD methods to create, read, update and delete data from the SQLite database.


## Adding SQLite Pagination 

Now let's implement pagination in our data service so we can get paginated data from our SQLite database instead of returning all rows which can be bad for our application when the database size grows.

Head over to the `src/data.service.ts` file and start by adding a TypeScript interface for the `Pager` object which we are going to need later for accessing the pager.

```ts
    export interface Pager{
        initialPage();
        nextPage();
    } 
```

The pager interface declares two methods, the `initialPage()` method which returns the initial page of data and the `nextPage()` method which returns the next number of data rows - This method will be called by the application everytime the user requests more data to be displayed.

Next, create the pager service which takes a `SQLiteObject` object as a parameter:

```ts

    class PagerService{
        public database: SQLiteObject;

        constructor(database : SQLiteObject){
            this.database = database;
        }
        private  getTotal(tableName : string) : Promise<number> { /* ... */}
        public executeSql(tableName : string , limit : number , offset : number ) : Promise<any> 
        { /* ... */}
        public async getPager(tableName:string,pageSize: number = 10) {/* ... */}    

    }
```

Don't forget to import `SQLiteObject` from the `@ionic-native/sqlite` package:


    import { SQLite, SQLiteObject } from '@ionic-native/sqlite';



The `getTotal(tableName)` returns the total size (number of data rows) of a specified table.

The `executeSql(tableName : string , limit : number , offset : number )` takes care of executing the SQL queries against a SQLite database table.

The `getPager(tableName:string, pageSize: number = 10)` returns an object of `Pager` type for a specified SQL table and a Page size which defaults 
to 10 rows.

`PagerService` has one member variable which holds the `SQLiteObject` instance passed via class constructor.



Let's begin by implementing the `getTotal(tableName)` method:

```ts
    private  getTotal(tableName : string) : Promise<number> {
        let total = -1;
        return new Promise<number>((resolve,reject) => {

                this.database.executeSql(`select count(*) as size from ${tableName}`,[]).then((data)=>{
                    
                    resolve(data.rows.item(0).size);
                    
                },(err)=>{
                    console.log("error" + JSON.stringify(err));
                    reject(err);
                });
                     
        });

        
    }   

```

The method returns a Promise which when resolved returns the total size of a table.

The methods builds a query to get the total count of rows using TypeScript template strings and the interpolation operator `${}` to dynamically specify the table name:

    `select count(*) as size from ${tableName}`

Next, It calls the `executeSql()` to execute the query against the SQLite database which returns a Promise.

The Promise either resolves with the table size data or rejects 
with the error originally returned from `executeSql()`.

Next let's add an implementation of the `executeSql()` wrapper method:

```ts
    public executeSql(tableName : string , limit : number , offset : number ) : Promise<any> 
    {

        var sql =`select *  from ${tableName} LIMIT ${limit} OFFSET ${offset} ; `

        return new Promise((resolve,reject)=>{
            this.database.executeSql(sql,[]).then((data)=>{
                
                resolve(data);

            }).catch((e)=>{
                reject(e);
            });
        });            
                    
        
    }

```

- `tableName` holds the table name.
- `limit` holds the index of last page row to fetch.
- `offset` holds the index of first page row from where to start fetching.

Now, let's implement the `getPager()` method which returns a Pager object for a specified SQLite table and Page size:


```ts
    public async getPager(tableName:string,pageSize: number = 10) {
        let pageSize = pageSize;
        let offset = 0;
        let limit = pageSize;
        let size = await this.getTotal(tableName);
        let that = this;
        return  {
                initialPage:function(){
                    
                    return new Promise((resolve,reject)=>{
                        var d = [];
                        that.executeSql(tableName,limit,offset).then((data)=>{
                            console.log(JSON.stringify(data));
                            for(var i = 0 ; i < data.rows.length ; i++)
                            {
                                d.push(data.rows.item(i));
                            }
                            resolve(d);
                        },(e)=>{
                            reject(e);
                        });
                    });
                   
                },
                nextPage:function(){
                    if(that.offset <= that.size - that.pageSize )
                    {  
                        that.offset +=  that.pageSize;
                    }
                    return new Promise((resolve,reject)=>{
                        var d = [];
                        that.executeSql(tableName,limit,offset).then((data)=>{
                            for(var i = 0 ; i < data.rows.length ; i++)
                            {
                                d.push(data.rows.item(i));
                            }
                            resolve(d);
                        },(e)=>{
                            reject(e);
                        });
                    });                    
                }            
            };
    }

}

```

After adding the Pager service, It's time to modify our Data service to use paging when reading data.

So, first add a `pagerService` member variable:

```ts
    @Injectable()
    export class DataService{
        public database: SQLiteObject;
        public pagerService : PagerService ;
```

Next, in the constructor, create an instance of `PagerService` and assign it to the `pagerService` variable:

```ts
    constructor(public sqlite :SQLite) {

            this.sqlite.create({name: "data.db", location: "default"}).then((db : SQLiteObject) => {
                    this.database = db;
                    this.pagerService = new PagerService(db);
                    this.createTables();
                }, (error) => {
                    console.log("ERROR: ", error);
            }); 

    } 
```

Next, modify the `list(tableName)` method to return a pager object instead of the query result.   

```ts
    public list(tableName){
            return this.pager(tableName);
    }  
```

## Conclusion 

That's all we need for adding SQL pagination to our Ionic 5 application.

In the next tutorial, we will see how to use our data service to actually create, update, read and delete data from our SQLite database tables that we have previously created.


