---
layout: post
title: "Android Room (SQLite) Tutorial"
image: "images/content/android.png"
excerpt: "In this tutorial, you'll learn to use the Room persistence library to work with SQLite database in Android" 
tags : [android] 
---

In this tutorial, you'll get started with Android room. Room is an [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping) or abstraction on top of SQLite database. It's part of the [Architecture Components](https://developer.android.com/topic/libraries/architecture/index.html) by Google. Room enables you to easily work SQLite databases in Android. 

The [Room](https://developer.android.com/training/data-storage/room/index.html) persistence library acts as a layer that abstracts raw SQLite and lets you make use of robust database access while keep you close to SQLite so it doesn't get in the way when you want to access low level features of SQLite.

## Requirements for Working with Android Room

To complete this tutorial, you need to have a few requirements, such as:

-   [Android Studio 3.0 or later](https://developer.android.com/studio/index.html) installed on your machine. You also need to be familiar with Android Studio i.e how to create, build and run/emulate a project etc.
-   An Android device or emulator if you don't wan to use a real device for testing.



## Creating Android Project

Let's start by creating an Android project using Android Studio. 

Open the application level `build.gradle` file and the dependencies for Room:

```java
implementation  "android.arch.persistence.room:runtime:1.0.0"
annotationProcessor  "android.arch.persistence.room:compiler:1.0.0"
```
In the project level `build.gradle` file, add the `google()` repository:

```java
repositories  {
	google()
	jcenter()
}
```

After syncing gradle, you'll be ready to start creating your Android application.

## Adding Room Entities

In Room, you create Java POJO classes instead of SQL tables and you decorate them with the `@Entity` annotation. 

Go ahead and create a package for models then add the  `Item` class:

```java
package inventory.techiediaries.com.models;  
  
import android.arch.persistence.room.Entity;  
import android.arch.persistence.room.PrimaryKey;  
import android.support.annotation.NonNull;  
  
@Entity(tableName = "items")  
public class Item {  
    @PrimaryKey  
    @NonNull  private Long id;  
    private String name;  
    private String description;  
    private Long quantity;  
}
```

## Creating a DAO  Interface

[DAO](https://en.wikipedia.org/wiki/Data_access_object) refers to Data Access Object which is a class that's responsible for performing CRUD operations on the Room entities. 
   
Create a *dao* package and add the `ItemDAO` DAO interface:

```java
package inventory.techiediaries.com.dao;  
  
import android.arch.persistence.room.Dao;  
import android.arch.persistence.room.Delete;  
import android.arch.persistence.room.Insert;  
import android.arch.persistence.room.Update;  
import inventory.techiediaries.com.models.Item;  
  
@Dao  
public interface ItemDAO {  
    @Insert  
  public void insert(Item... items);    
    @Update  
  public void update(Item... items);   
    @Delete  
  public void delete(Item item);  
}
```    

You can create a DAO by creating a Java interface and annotate it with `@Dao`.

Annotate the update method with `@Update`
Annotate the insert method with `@Insert`
Annotate the delete method with `@Delete`

You can insert or update a variable number of items.

## Adding Custom Queries

Room allows you to execute custom SQL queries. For example, let's add a method that returns all available items in the database.

First, import the following classes:

```java
import android.arch.persistence.room.Query;  
import java.util.List;
```

Next, add the method:

```java
@Query("SELECT * FROM items")  
public List<Item> getItems();
```

Now, let's add a method that returns an item by id:

```java
@Query("SELECT * FROM items WHERE id = :id")  
public Item getItemById(Long id);
```

## Creating the Room Database 

We need to create an abstract class that extends `RoomDatabase` which will provide access to the implementations(s) of the DAO interface(s).

```java
package inventory.techiediaries.com;  
  
import android.arch.persistence.room.Database;  
import android.arch.persistence.room.RoomDatabase;  
  
import inventory.techiediaries.com.dao.ItemDAO;  
import inventory.techiediaries.com.models.Item;  
  
@Database(entities = {Item.class}, version = 1)  
public abstract class AppDatabase extends RoomDatabase {  
    public abstract ItemDAO getItemDAO();  
}
```

This is the structure of the project:

![Android Room](https://i.imgur.com/5KiFDPP.png)

## Instantiating the Database

Now, you need to create an instance of `AppDatabase` by calling the `databaseBuilder()` method. Open the `MainActivity.java` file and add the following code inside the `onCreate()` method:

```java
AppDatabase database = Room.databaseBuilder(this, AppDatabase.class, "mydb")  
        .allowMainThreadQueries()  
        .build();
```

## Calling our CRUD Methods

Finally, you can call the different methods we have created before to create, read, update and delete records from the database using Android Room:

```java
import java.util.ArrayList;  
import java.util.List;  
  
import inventory.techiediaries.com.dao.ItemDAO;  
import inventory.techiediaries.com.models.Item;


...
ItemDAO itemDAO = database.getItemDAO();  
Item item = new Item();  
item.setName("Item001");  
item.setDescription("Item 001");  
item.setQuantity(1000);  
 
itemDAO.insert(item);  
List<Item> items = itemDAO.getItems();    
System.out.println(items);
```

## Conclusion

In this tutorial, we've seen how to create a simple Android demo that uses Room for persisting data within a SQLite database. 

  

 