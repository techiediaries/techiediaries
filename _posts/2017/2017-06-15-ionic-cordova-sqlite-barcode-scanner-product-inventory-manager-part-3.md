---
layout: post
title: "Ionic 2+ : Using Cordova SQLite and Barcode Scanner to build a Product Inventory Manager [PART 3]"
image: "images/content/inventory-manager-ionic-sqlite.png"
excerpt: " Using Ionic 2+ with Cordova SQLite and Barcode scanner to build a simple real world product inventory manager mobile application for Android and iOS :part 3" 
tags: ionic
---

{% include image.html 
    img="images/content/inventory-manager-ionic-sqlite.png" 
    title="ionic 2+ SQLite and barcode scanner " 
%}

On the previous parts of this tutorial series to learn Ionic 2+ by building a simple real world cross platform 
mobile application for managing small business products inventory using Cordova SQLite and Barcode / UPC 
native plugins  .

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


On the previous part(s) we have 

Created a new Ionic 2+ project .

Added the Cordova SQLite plugin . 

Created a data service provider for interfacing with SQLite database .

Implemented different CRUD methods to create , read ,update and delete data rows from SQLite database .


Adding SQLite Pagination 
--------------------------
----------------------------

Now lets add pagination to our data service provider so we can get paginated data from our SQLite database 
instead of just returning all tables rows which can be bad for our app when database size grows .

Head over to <em>src/providers/data-service/data-service.ts</em> then start by adding a TypeScript interface 
for the Pager object which we are going to need later for accessing the pager .

    export interface Pager{
        initialPage();
        nextPage();
    } 

The pager interface declares two methods : the initialPage() method which is going to return the initial page 
of data of a predefined and configurable number of rows .The nextPage() method which is going to return the 
next predefined number of data rows ,this method will be called by application everytime the user requests 
more data to be displayed .

Next declare the pager service which takes a SQLiteObject as a parameter 

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

Don't forget to import SQLiteObject from <em>@ionic-native/sqlite</em>

    import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


getTotal(tableName) get the total size (number of data rows) of a specified table .

executeSql(tableName : string , limit : number , offset : number ) takes care of executing SQL queries against a SQLite database table .

public async getPager(tableName:string,pageSize: number = 10) returns an object of type Pager for a specified SQL table and a Page size which defaults 
to 10 rows .

The PagerService has 1 class member :

public database : holds the SQLiteObject instance passed via class constructor .



Lets begin by implementing getTotal(tableName) method :

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

The method returns a Promise when resolved returns the total size of a table .

The methods builds a query to get the total count of rows using TypeScript template strings and interpolation 
operator ${} to dynamically specify the table name .

    `select count(*) as size from ${tableName}`

Then calls the SQLiteObject executeSql() to execute the query against SQLite database which returns a Promise .

Depending on this promise return we either resolve our Promise with the table size data or we reject the promise 
with the error originally returned from executeSql() .

Next lets add an implementation of executeSql() wrapper method .

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

tableName : holds the table name .

limit : holds index of last page row to fetch .

offset : holds the index of first page row from where to start fetching .

Now the most important method is getPager() which returns a Pager object for a specified SQLite table and Page 
size .


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


After adding the PagerService It's time to modify our Data service to use paging when reading/listing data .

So first add pagerService member variable :

    @Injectable()
    export class DataServiceProvider {
        public database: SQLiteObject;
        public pagerService : PagerService ;

Then in constructor assign this variable :

    constructor(public sqlite :SQLite) {
        console.log('Hello DataServiceProvider Provider');
        
            this.sqlite.create({name: "data.db", location: "default"}).then((db : SQLiteObject) => {
                    this.database = db;
                    this.pagerService = new PagerService(db);
                    this.createTables();
                }, (error) => {
                    console.log("ERROR: ", error);
            }); 

    } 

Next modify the method list(tableName) to return a pager instead of query result .   

    public list(tableName){
            return this.pager(tableName);
    }  

Conclusion 
----------------
----------------

That's all we need for adding SQL pagination to our mobile application .

On the next tutorial part we are going to see how to use our data service to actually create ,update ,read and 
delete data from/in our SQLite database tables we have created previously which are : families , locations ,
products and transactions .

SEE YOU THERE .

Meanwhile if you have any problems with the code of this part feel free to drop a comment below .

Thanks for reading ! 


