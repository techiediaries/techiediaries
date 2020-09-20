---
layout: bpost
title: "Laravel 8 Schema Dump Command: squashing & Cleaning Migrations"
image: "images/content/laravel.png"
excerpt: "How to squash and clean migrations using the Laravel 8 schema dump command" 
tags : [laravel, laravel-6-tutorials-and-examples, laravel6] 
---

Laravel 8 officially released on 8th September 2020. The laravel team releases new Laravel version in every 6-month interval with major changes. As Laravel 8 Non-LTS (general version), the Laravel 8 will provide 6 months bug fixes until March 8, 2021, and 1-year security fixes until 8 September 2021.

Among the new featurs of Laravel is a new `schema:dump` command which allowsy you to remove old migrations and speed up the testing and CI process. 

This feature solves two problems:

- It allows you to clean old migrations in the schema folder, 
- It causes tests to run faster because Laravel doesn't run all the migrations during testing.

You can run the command from your terminal as follows:

```bash
php artisan schema:dump

# Dump the current database schema and prune all existing migrations...

php artisan schema:dump --prune

# Specify the connection name
php artisan schema:dump --database=pgsql
```

The `schema:dump` command makes use of the `mysqldump` or `pgdump` utiltities to dump the current state of your schema to a `database/schema/{connection}-schema.mysql file`.

This how the [official docs](https://laravel.com/docs/8.x/migrations) describes this command:

>As you build your application, you may accumulate more and more migrations over time. This can lead to your migration directory becoming bloated with potentially hundreds of migrations. If you would like, you may "squash" your migrations into a single SQL file using the the `schema:dump` command. Laravel will write a "schema" file to your database/schema directory. Now, when you attempt to migrate your database and no other migrations have been executed, Laravel will execute the schema file's SQL first. After executing the schema file's commands, Laravel will execute any remaining migrations that were not part of the schema dump.

