---
layout: post
title: "Resetting Entity Framework Database Migrations  "
image: "images/content/entity-framework-reset-database-migrations.png"
excerpt: "In this tutorial we'll see how to reset database migrations in Entity Framework .NET projects" 
tags : [.net , entityframework]
---

{% include image.html 
    img="images/content/entity-framework-reset-database-migrations.png" 
    title="reset migrations in Entity Framework" 
%}

## Introduction 

When developing .NET apps using the Entity Framework ORM (Object-Relational Mapper) you often find yourself in an intimidating situation with database migrations, it usually become hard to update the database with new migrations or even to roll it back to a previous state.

Many developers try to fix the corrupted migrations by manually editing them but that doesn't work except in some simple situations so if you are in a situation where you can't apply new migrations nor roll back your database state to a good state just continue with this tutorial where I show you the exact steps i usually follow to clean up and reset database migrations.

* Step 1: 

Head over to the migrations  folder in your project and delete all *.cs migrations files.

* Step 2:

Next you need to remove the _MigrationHistory database table where Entity Framework stores the history of previously applied migrations.

* Step 3:

Run Enable-Migrations command in your Package Manager Console.

* Step 4:

Run Add-migration Initial in your Package Manager Console. This will create a new migration file which contains the code to create database tables among other things. 

* Step 5:

Now you need to create a corresponding migration entry so head over to your initial migration file then remove the code inside Up method or just comment it because you'll need it later.

Next run Update-database command in your Package Manager Console.

So why removing the code inside Up() method? 

Simpy because there are no changes to make, the described changes in Up() method are already applied in the current state of the database such as creating the existing database tables, re-executing them will trigger errors but if we remove them we only have an empty migration file that does nothing except adding a record in the database migration history table. 

* Step 6:

Remove the comments in the initial migration Up method.

So have we done?

We simply removed the migrations files and their related history in database then created an initial migration for the current database state but only after re-enabling
the migrations again in our project. Then created an entry in the new _MigrationHistory table by running Update-database command with a do nothing migration file.

## Conclusion 

Migrations are very helpful, they allow you to upgrade your database schema without dropping the whole database or losing your data, they also allow you to use version control tools such as Git to keep track of your database state changes which is a very beneficial especially if working in teams. But they also have many problems particularly when you are still developing your application so you'll often find yourself looking for secure ways to reset them so i wish this tutorial has helped you if you have problems with your migrations in Entity Framework ORM.











