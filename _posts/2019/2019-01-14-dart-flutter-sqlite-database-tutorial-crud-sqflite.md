---
layout: post
title: "Dart and Flutter SQLite Database Tutorial: CRUD Operations with sqflite"
image: "images/content/flutter.png"
excerpt: "Throughout this tutorial, you will learn how to create a CRUD example with Flutter and SQLite" 
categories: flutter
tags : [dart, flutter]
---

In this tutorial, we'll learn how to run example CRUD operations against a SQLite database in a flutter mobile application using  the `sqflite` plugin.

## SQLite Database CRUD with Dart and Flutter

Flutter is a cross-platform mobile SDK for building Android and iOS apps with Dart. Both Dart and Flutter are created by Google and getting more popular everyday.

### What's CRUD?

CRUD stands for Create, Read, Update and Delete and it's a set of common operations that most data-driven apps use to create and manipulate data in databases.

## Why Using a SQLite Database?

For mobile applications, SQLite is a very popular database that fits in a single file and provides features similar to fully-fledged databases like MySQL.

Since flutter is a mobile SDK, you'll mostly need to have access to SQLite in many of your apps. The `sqflite` plugin let's you access SQLite in flutter using dart.

Now after the introduction, let's see how to use SQLite in your Flutter app with a CRUD example.

In the following example, we'll suppose we are creating a customer management application where we have a Customer table with id, first name, last name and email attributes. We will see how to create, read, update and delete customers from a SQLite database

## Prerequisites

Before, you can follow this tutorial, you will need to have a development environment setup for flutter development.


## Steps For Using SQLite in Dart's Flutter

In nutshell, these are the steps required to use SQLite in your Flutter application.

### Step 1: Importing `sqflite`

You first need to start by importing  [`sqflite`](https://github.com/tekartik/sqflite) plugin in your project. Open the `pubspec.yaml` file and add the following line:

```yaml
dependencies:
	sqflite:  "^0.11.0+1"
```

After that, you are ready to use `sqflite` to access SQLite in your Flutter application.

### Step 2: Creating & Opening the Database

Next, you need to create and open a database using the provided `openDatabase()` method. For example:

```dart
createDatabase() async {
  String databasesPath = await getDatabasesPath();
  String dbPath = join(databasesPath, 'my.db');

  var database = await openDatabase(dbPath, version: 1, onCreate: populateDb);
  return database;
}
```

The `openDatabase()` method takes a bunch of parameters: The path to the database file, the version of the database which makes it easy to migrate and upgrade the database and a callback function which will be called when the database is successfully created.

### Step 3: Creating the Database Table(s)

You next need to define the `populateDb()` function that you specified as the callback:

```dart
void populateDb(Database database, int version) async {
  await database.execute("CREATE TABLE Customer ("
          "id INTEGER PRIMARY KEY,"
          "first_name TEXT,"
          "last_name TEXT,"
          "email TEXT"
          ")");
}
```

In the callback function, we execute our first query against the database which allows us to create a table called `Customer` with four columns. 

You can of course create as many tables as you want and define relationships between them to create your desired database schema.

### Step 5: Adding a Data Model

Before creating the CRUD operations we need to add a model. Create a `lib/model/customer.dart` file and add the following class:

```dart
class Customer {
    int id;
    String firstName;
    String lastName;
    String email;

    Customer({
        this.id,
        this.firstName,
        this.lastName,
        this.email,
    });

    int get id => id;
    String get firstName => firstName;
    String get lastName => lastName;
    String get email => email;


    factory Customer.fromJson(Map<String, dynamic> data) => new Customer(
        id: data["id"],
        firstName: data["first_name"],
        lastName: data["last_name"],
        email: data["email"],
    );

    Map<String, dynamic> toJson() => {
        "id": id,
        "first_name": firstName,
        "last_name": lastName,
        "email": email,
    };
}
```
 
### Step 4: Adding CRUD Methods

Finally, we can define our CRUD operations. 

You can use different approaches for running CRUD operations: The `RawSQL` queries or a high level API.


#### Implementing the Create Operation

Let's start with a method to create a customer in the database table:

##### First Approach: Using the `insert()` Method

```dart
Future<int> createCustomer(Customer customer) async {
  var result = await database.insert("Customer", customer.toMap());
  return result;
}
```

As you can see, we simply convert our customer object to map (using the `toMap()` method we've defined in the `Customer` model) and we pass it in to the `insert()` method which takes the name of the table as the first parameter and data as the second parameter.

##### Second Approach: Using the `rawInsert()` Method

```dart
createCustomer(Customer customer) async {
    var result = await database.rawInsert(
      "INSERT INTO Customer (id,first_name, last_name, email)"
      " VALUES (${customer.id},${customer.firstName},${customer.lastName},${customer.email})");
    return result;
  }
```

The `rawInsert()` method allows us to run raw INSERT queries like we do in plain SQLite.

#### Implementing the Read (All) Operation

Now, let's implement the read operation of CRUD, 

##### First Approach: Using the `query()` Method

The `query()` method is a high level abstraction that takes the name of the table and the columns then return data.

```dart
Future<List> getCustomers() async {
  var result = await database.query("Customer", columns: ["id", "first_name", "last_name", "email"]);

  return result.toList();
}
```

We use the `toList()` method to convert the result set to a a Dart `List`.
 
##### Second Approach: Using the `rawQuery()` Method

```dart
Future<List> getCustomers() async {
  var result = await database.rawQuery('SELECT * FROM Customer');
  return result.toList();
}
```

With the `rawQuery()` method, you simply pass in the raw SELECT query.

#### Implementing the Read (by Id) Operation

After getting all customers from the database, we now need to get a single customer by its identifier.

##### First Approach: Using the `query()` Method

Just like the previous example, we use the query method to get data from a table. We specify the table as the first parameter, the columns as the second parameter and this time we also add a `where` parameter that takes the `WHERE` clause and a `whereArgs` array for passing the where arguments.

```dart
Future<Customer> getCustomer(int id) async {
  List<Map> results = await db.query("Customer",
      columns: ["id", "first_name", "last_name", "email"],
      where: 'id = ?',
      whereArgs: [id]);

  if (results.length > 0) {
    return new Customer.fromMap(results.first);
  }

  return null;
}
``` 

We want to get a customer by id so we pass in a `id = ?` clause. the `?` symbol will be replaced by the actual value from the `whereArgs` parameter.


##### Second Approach: Using the `rawQuery()` Method

```dart
Future<Customer> getCustomer(int id) async {
  var results = await database.rawQuery('SELECT * FROM Customer WHERE id = $id');

  if (results.length > 0) {
    return new Customer.fromMap(results.first);
  }

  return null;
}
```

#### Implementing the Update Operation

Now, let's implement the update operation using the two approaches.

##### First Approach: Using the `update()` Method

The `update()` method is similar to the `query()` method but for updating data:

```dart
Future<int> updateCustomer(Customer customer) async {
  return await database.update("Customer", customer.toMap(), where: "id = ?", whereArgs: [customer.id]);
}
```

We pass in the table name, the customer data as a map, the `WHERE` clause and the `WHERE` arguments. 

##### Second Approach; Using the `rawUpdate()` Method

The `rawUpdate()` method is used to run a raw `UPDATE` query against the database:

````dart
Future<int> updateCustomer(Customer customer) async {
  return await database.rawUpdate(
      'UPDATE Customer SET first_name = ${customer.firstName} WHERE id = ${customer.id}'
  );
}
```

#### Implementing the Delete Operation
 
 Finally, we need to implement the delete operation of our CRUD example. This is also can be done following two approaches:

##### First Approach: Using the `delete()` Method

The `delete()` method takes a table name, the `WHERE` clause and the `WHERE` arguments:

```dart
Future<int> deleteCustomer(int id) async {
  return await database.delete("Customer", where: 'id = ?', whereArgs: [id]);
}
```

#### Second Approach: Using the `rawDelete()` Method

The `rawDelete()` method takes a raw DELETE query:

```dart
Future<int> deleteCustomer(int id) async {
  return await db.rawDelete('DELETE FROM Customer WHERE id = $id');
}
```

### Step 5: Close the Database

After finishing with the database, you can execute the following method to close it:

```dart
await database.close();
```

## Conclusion

In this quick tutorial, we've seen how we can implement CRUD operations against a SQLite database in a Flutter mobile application using the `sqflite` plugin.
