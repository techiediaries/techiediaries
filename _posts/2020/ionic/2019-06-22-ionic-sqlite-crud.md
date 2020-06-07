---
layout: post
title: "Ionic 4 SQLite Database CRUD Tutorial"
image: "images/content/inventory-manager-ionic-sqlite.png"
excerpt: " Part 2 of using Ionic 5 with SQLite and Barcode scanner to build a simple product management mobile application"
date: 2020-02-13 
tags: [ionic]
---
 
In this second part of our tutorila series for building a simple real world products management app with Ionic 5, Angular and SQLite, we'll proceed by implementing our database CRUD operations ofr creating, reading, updating and deleting products from the database.

Here is a summary of we have done on the previous part.

- We created a new project based on Ionic 5 and Angular,
- We installed both Cordova SQLite plugin and its Ionic Native wrapper,
- We created and configured our data service to encapsulate SQLite operations.
- We created our SQLite database and the various SQL tables (Products, Families, Locations and Transactions).
- We created a simple UI with Ionic buttons and modals.

Now let's implement the SQLite CRUD operations that will allow us to add and manipulate data in our app.

## Adding SQLite CRUD Methods to our Data Service 

Open the `src/app/data.service.ts` file and let's add the following four methods for working with our 
SQLite database:

- The `create(tableName , item)` method that will be used for creating data rows and inserting items in the SQLite database.
- The `list(tableName)` method that will be used for reading and listing data rows from the SQLite database.
- The `update(tableName , item)` method that will be used for updating data rows.
- The `remove(tableName , item)` method that will be used for removing a specified row by its ID from the SQLite database.

See also how to use [TypeORM with SQLite database and Ionic 5](https://www.techiediaries.com/angular/jwt-rest-api-auth-node-typescript-typeorm-database/)

### Creating SQLite Data 

let's now see an implementation of the `create()` method which takes two parameters, `tableName` which refers to the name of the SQL table and `item` which holds the data to insert:

```ts
    public create(tableName,item){
        let sqlText;
        let values ;
        switch(tableName){
            case "families":
                sqlText = "INSERT INTO families (reference , name ,unit) VALUES (?,?,?)";
                values = [item.reference || null , item.name || null, item.unit || null] 
                break;
            case "locations":
                sqlText = "INSERT INTO locations (name) VALUES (?)";
                values = [item.name || null ] 
                break;
            case "transactions":
                sqlText = "INSERT INTO transactions (date , quantity ,unitCost , reason , upc , comment , product_id) VALUES (?,?,?,?,?,?,?)";
                values = [item.date || null , item.quantity || null, item.unitCost || null ,item.reason || null,item.upc || null , item.comment || null ,item.product_id || null]         
                break;
            case "products":
                sqlText = "INSERT INTO products (sku,barcode,title,description,quantity,unit,unitPrice,minQuantity,family_id,location_id) VALUES (?,?,?,?,?,?,?,?,?,?)";
                values = [item.sku || null , item.barcode || null, item.title || null, item.description || null, item.quantity || null,item.unit || null, item.unitPrice || null, item.minQuantity || null, item.family_id || null, item.location_id || null ]                    
                break;
            default :
            return ;

        }
        return this.database.executeSql(sqlText,values);
    }

```
In the `create()` method, we first adds switch statement to make a decision on the SQLite query to build, and the values to insert, based on the table name. Next, we call the `executeSql(sqlText,values)` method with the appropriate query and the data values as parameters,which executes the SQL query against our SQLite database.

### Updating Data Rows

The `update()` method takes two parameters, the table name and the new item data. The item object has also the id of the old item to update:


```ts
    public update(tableName,item){
        let sqlText;
        let values ;
        switch(tableName){
            case "families":
                sqlText = "UPDATE families SET (reference , name , unit ) = ( ? , ? , ? ) where id = ? ;";
                values = [item.reference || null , item.name || null, item.unit || null , item.id] 
                break;
            case "locations":
                sqlText = "UPDATE locations SET name = ? where id = ? ; ";
                values = [item.name || null , item.id] 
                break;
            case "transactions":
                sqlText = "UPDATE transactions SET (date , quantity ,unitCost , reason , upc , comment , product_id)  = (?,?,?,?,?,?,?) where id = ? ; ";
                values = [item.date || null , item.quantity || null, item.unitCost || null ,item.reason || null,item.upc || null , item.comment || null ,item.product_id || null , item.id]         
                break;
            case "products":
                sqlText = "UPDATE products SET (sku,barcode,title,description,quantity,unit,unitPrice,minQuantity,family_id,location_id) = (?,?,?,?,?,?,?,?,?,?) where id = ? ; ";
                values = [item.sku || null , item.barcode || null, item.title || null, item.description || null, item.quantity || null,item.unit || null, item.unitPrice || null, item.minQuantity || null, item.family_id || null, item.location_id || null , item.id ]                    
                break;
            default :
            return ;

        }
        return this.database.executeSql(sqlText,values);
        
    } 

```
The method builds the SQL update queries based on the table name and the values to update and again calls the `executeSql(sqlText,values)` method to execute query against the database.

## Deleting SQL Rows 

The `remove()` method takes two parameters, the first is the target table name and the second is the item to remove.

We pass the whole item but we only need the `id` to remove the row from the SQLite database:

```ts
    public remove(tableName, item){
        let sqlText;
        let values ;
        sqlText = `delete from ${tableName} where id = ? `;
        values = [item.id || null ] 
        return this.database.executeSql(sqlText,values);    
    }
```

We don't need a `switch` statement to make a decision on the table since this query is not complex and doesn't require all the table columns but only the `id` which is a common column between all SQLite tables.

> **Note**: We are using TypeScript template strings to dynamically insert the table in the query. 
>
> We are using back ticks for the string and we insert the table name using the interpolation operator: `${}`.

After building the query we simply call the `executeSql(sqlText,values)` method to execute the query against 
the database.

### Reading Data from the SQLite Database  

The last CRUD operation is data reading from the database. This method needs more work since we need to implement pagination so it will be the subject of the next part but for a simple implementation tha fetches data from the database. You can do something as follows: 

```ts
    public list(tableName){
        let sqlText;
        let values =[];
        sqlText = `select * from ${tableName} `;
        return this.database.executeSql(sqlText,values);    
    }
```

For now, we just use a `select *` SQL statement and we build the query with TypeScript string templates using the interpolation operator then we execute the query against the database with the `executeSql(sqlText,values)` method.

## Conclusion 

In this tutorial, we continued building our simple real world cross platform mobile application for managing products stock with Ionic 5 by implementing the SQLite CRUD (Create, Read, Update and Delete) operations.  

In the next part, we are going to improve the data read operation by adding pagination so we can 
retrieve data from the SQLite database in small chuncks. This is a required step if you want to create a performant application that doesn't block your UI if the database contains large amounts of data.

 




