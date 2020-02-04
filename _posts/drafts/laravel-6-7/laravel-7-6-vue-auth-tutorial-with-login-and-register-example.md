---
layout: post
title: "Laravel 7/6 Vue.JS Auth Tutorial with Login and Registration Example" 
date: 2020-01-19 22:39
categories: laravel 
author: 
tags: [laravel, laravel-7]
excerpt: "In this tutorial, we'll learn to implement authentication with login and registration in Laravel 7/6 by example"
---

In this tutorial, we'll learn to implement authentication with login and registration in Laravel 7/6 by example

You need to have PHP and MySQL installed on your system.

## Creating a Laravel 7/6 Project with a Vue.JS Interface

Let's get started by creating a Laravel 7 project.

Open a command-line interface and run the following command to generate a project based on the latest Laravel 7 version:

```bash
$ composer create-project --prefer-dist laravel/laravel laravel-auth-example
```


## Serving the Laravel 7 Project

Navigate inside your Laravel project and run the following command to serve it locally:

```bash
$ php artisan serve
```


As a result, you will see the default homepage of the Laravel is running.


## Adding the Laravel 7 Vue.JS Auth Scaffolding


```bash
$ composer require laravel/ui --dev
```

Next, run the following command:


```bash
$ php artisan ui vue --auth
```



Next, install the front-end dependencies using the following command:



```bash
$ npm install
```

## Creating and Configuring a MySQL Database


Open the MySQL database and create a database. In my case, my database name is  **registration**.



```
create database mydb;
```

Next, open the  `.env`  file and change the database credentials as follows:


```txt
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=mydb
DB_USERNAME=root
DB_PASSWORD=root
```

## Create User Migration

Laravel 6 provides a default Model for the User. So, you don’t need to create a  **User model**. Rather than, just need to add the fillable data that you want to add to the database table. This will be the default code of the  **User.php**  file.



`// User.php`

`<?php`

`namespace` `App;`

`use` `Illuminate\Contracts\Auth\MustVerifyEmail;`

`use` `Illuminate\Foundation\Auth\User` `as` `Authenticatable;`

`use` `Illuminate\Notifications\Notifiable;`

`class` `User` `extends` `Authenticatable`

`{`

`use` `Notifiable;`

`/**`

`* The attributes that are mass assignable.`

`*`

`* @var array`

`*/`

`protected` `$fillable` `= [`

`'name'``,` `'email'``,` `'password'``,`

`];`

`/**`

`* The attributes that should be hidden for arrays.`

`*`

`* @var array`

`*/`

`protected` `$hidden` `= [`

`'password'``,` `'remember_token'``,`

`];`

`/**`

`* The attributes that should be cast to native types.`

`*`

`* @var array`

`*/`

`protected` `$casts` `= [`

`'email_verified_at'` `=>` `'datetime'``,`

`];`

`}`

So, open the database folder and then navigate to the migrations. Under the migration folder, by default, you will find three migration files that have been created with the project creation. The migration file mainly defines the schema of the table which is going to be created in the database.

Here, we can add or manipulate these schemas and Laravel will maintain all the version of the migration files which are altered.

Basically, in this post, I am working with  **Laravel 6 login and registration**, therefore, I am not going to create more migration files. So, just open the  **create_users_table.php**  file. Your table schema will look the same as below.

1

2

3

4

5

6

7

8

9

10

11

12

`public` `function` `up()`

`{`

`Schema::create(``'users'``,` `function` `(Blueprint` `$table``) {`

`$table``->bigIncrements(``'id'``);`

`$table``->string(``'name'``);`

`$table``->string(``'email'``)->unique();`

`$table``->timestamp(``'email_verified_at'``)->nullable();`

`$table``->string(``'password'``);`

`$table``->rememberToken();`

`$table``->timestamps();`

`});`

`}`

Now, run the artisan command to migrate the schema into the database.

1

`php artisan migrate`

![Laravel 6 Migration](https://i2.wp.com/www.programmingfields.com/wp-content/uploads/2019/10/Laravel-6-Migration.png?ssl=1)

**Migrating Table in Laravel 6**

After the successful migration, show the tables inside the MySQL database.

![MySQL Database](https://i1.wp.com/www.programmingfields.com/wp-content/uploads/2019/10/MySQL-Database-Table.png?ssl=1)

**Database Table After Migration**

[Laravel 6 CRUD Application with Form Validation](https://www.programmingfields.com/laravel-6-crud-application/)

## Laravel 6 User Registration

On the homepage, just click on the Register link first. You will get a registration form that will like the same as below.

![Laravel 6 User Registration ](https://i0.wp.com/www.programmingfields.com/wp-content/uploads/2019/10/Laravel-6-User-Registration.png?ssl=1)

**Laravel 6 User Registration**

This registration form comes up with the default form validation and it will work fine. So, it will validate the email and other fields properly.

![Laravel 6 Form Validation](https://i1.wp.com/www.programmingfields.com/wp-content/uploads/2019/10/1.-Form-validation-error.png?ssl=1)

**Laravel 6 User Registration Validation Error**

Here, I have entered a password to check whether it is going to be registered or not. So, as a result, you can see here, It didn’t allow me to register before validating the form fields.

[Laravel 6 RESTful APIs for ToDo Application with Passport Auth](https://www.programmingfields.com/laravel-passport-authentication-for-todo-app/)

## User Dashboard in Laravel 6

After successful registration, you will be redirected to the default dashboard page. Here, you will see a message  **You are logged in!**. It means you are inside the dashboard page.

![Laravel 6  User Dashboard](https://i2.wp.com/www.programmingfields.com/wp-content/uploads/2019/10/2.-Laravel-6-User-Dashboard-After-Register.png?ssl=1)

**User Dashboard After Registration**

In the right corner, you will see your registered name. When you click on the name, you will see the  **Logout**  option. When you will logout the profile, it will redirect you to the default homepage.

## Laravel 6 User Login

When you will redirect to the homepage, again you will have the option for login and registration. Now, click on the Login link. Now, you will have the user login page which has created by auth scaffolding.

![Laravel 6 User Login](https://i0.wp.com/www.programmingfields.com/wp-content/uploads/2019/10/4.-Laravel-6-User-Login.png?ssl=1)

**Laravel 6 User Login**

The form validation will work for the login form too. Here, I had tried with an invalid password and it has thrown an error.

![Laravel 6 Login Credential Error](https://i1.wp.com/www.programmingfields.com/wp-content/uploads/2019/10/5.-Login-credentials-error.png?ssl=1)

**Laravel 6 Login Error – Invalid Login Credentials**

After providing the correct login details, it will be redirected to the Dashboard page. Now, you are logged in.

![Login success](https://i1.wp.com/www.programmingfields.com/wp-content/uploads/2019/10/2.-Laravel-6-User-Dashboard-After-Register-1.png?ssl=1)

**Login Success**

So, here we have logged in successfully in the dashboard. This is a basic user registration and login which is provided by the Laravel by default.

## Conclusion

Bingo! we have created a basic user registration and login with auth in the Laravel 6. You can design the form as per your project requirements. I hope, this post will help you in creating your projects.
