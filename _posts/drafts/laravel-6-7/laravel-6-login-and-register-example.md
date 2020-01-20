---
layout: post
title: Laravel 6 Login and Registration with Authentication 
date: 2020-01-19 22:39
category: 
author: 
tags: []
summary: 
---


User authentication and data security access are the most important key for any database system. If you are creating an application and the login access of that application is not much secure and authentic. Then someone can manipulate or access your data. So, to prevent these types of un-authentic access, we will need to create proper authentication. Today, in this Laravel 6 tutorial series, I will be dealing with the  **Laravel 6 Login and Registration**  with the proper authentication. In Laravel, there is an inbuilt functionality for authentication. So, we don’t need to put extra effort and code for creating auth.

Contents

-   [1  Prerequisites](https://www.programmingfields.com/laravel-6-login-and-registration-with-authentication/#Prerequisites)
-   [2  Laravel 6 Login and Registration](https://www.programmingfields.com/laravel-6-login-and-registration-with-authentication/#Laravel_6_Login_and_Registration)
-   [3  Install Front end Dependencies](https://www.programmingfields.com/laravel-6-login-and-registration-with-authentication/#Install_Front_end_Dependencies)
-   [4  Create a Database and Configure](https://www.programmingfields.com/laravel-6-login-and-registration-with-authentication/#Create_a_Database_and_Configure)
-   [5  Create User Migration](https://www.programmingfields.com/laravel-6-login-and-registration-with-authentication/#Create_User_Migration)
-   [6  Laravel 6 User Registration](https://www.programmingfields.com/laravel-6-login-and-registration-with-authentication/#Laravel_6_User_Registration)
-   [7  User Dashboard in Laravel 6](https://www.programmingfields.com/laravel-6-login-and-registration-with-authentication/#User_Dashboard_in_Laravel_6)
-   [8  Laravel 6 User Login](https://www.programmingfields.com/laravel-6-login-and-registration-with-authentication/#Laravel_6_User_Login)
-   [9  Conclusion](https://www.programmingfields.com/laravel-6-login-and-registration-with-authentication/#Conclusion)
    -   [9.1  Share this:](https://www.programmingfields.com/laravel-6-login-and-registration-with-authentication/#Share_this)
    -   [9.2  Like this:](https://www.programmingfields.com/laravel-6-login-and-registration-with-authentication/#Like_this)
    -   [9.3  Related](https://www.programmingfields.com/laravel-6-login-and-registration-with-authentication/#Related)

## Prerequisites

For creating this project, I have the latest version of  **PHP (7.3.9)**,  [MySQL (8.0.17).](https://dev.mysql.com/downloads/mysql/)  You can check the MySQL version in Windows using the below command.

1

`mysqld --version`

For editor, I am using Visual Studio code. You can use PHP Storm, Atom, etc.

## Laravel 6 Login and Registration

Before creating this project, I am assuming that your system is ready for creating the Laravel 6 project. If not then  [Install Laravel 6 in Windows and Ubuntu](https://www.programmingfields.com/laravel-install-with-composer/). Open the command prompt or terminal and create a new Laravel 6 project.

1

`composer create-project --prefer-dist laravel/laravel user-registration-app`

![](https://i1.wp.com/www.programmingfields.com/wp-content/uploads/2019/10/Composer-create-project.png?ssl=1)

**Create Laravel 6 Project**

It will take some time to create the project. After creating the project just run it by the php artisan command.

1

`php artisan serve`

As a result, you will see the default homepage of the Laravel is running.

![Laravel homepage](https://i0.wp.com/www.programmingfields.com/wp-content/uploads/2019/10/Laravel.png?ssl=1)

**Laravel 6 Homepage**

-   In the next step, I will install the auth in Laravel 6.
-   But, before adding auth, we need to add frontend scaffolding in the project.
-   In Laravel 6, this frontend scaffolding has been moved to the **ui –dev**  package.
-   Firstly, we will require to add this package.

1

`composer` `require` `laravel/ui --dev`

![Laravel 6 ui --dev](https://i1.wp.com/www.programmingfields.com/wp-content/uploads/2019/10/Add-Auth-Package-in-Laravel-6.png?ssl=1)

**Laravel 6 ui –dev**

Secondly, we’ll add the auth using the  **ui vue –auth** command.

1

`php artisan ui vue --auth`

![Laravel 6 Auth](https://i2.wp.com/www.programmingfields.com/wp-content/uploads/2019/10/Add-Auth-in-Laravel-6.png?ssl=1)

**Laravel 6 Auth**

[How to Integrate Laravel 6 Application with Firebase Realtime Database](https://www.programmingfields.com/integrate-laravel-6-application-with-firebase/)

After adding the authentication scaffolding, run your project again. Now, you can see, the Laravel auth has been added Login and Register functionalities on the Homepage.

![Laravel 6 Auth Added](https://i1.wp.com/www.programmingfields.com/wp-content/uploads/2019/10/Laravel-6-Auth-Added.png?ssl=1)

**Laravel 6 Homepage with Auth**

Next, I will install the front end dependencies in the application so that we will not be required to add the Bootstrap CSS and js file. Laravel will add these necessary files automatically inside the project.

[Laravel 6 RESTful APIs with Passport Authentication](https://www.programmingfields.com/laravel-6-rest-api-with-passport-auth/)

## Install Front end Dependencies

Laravel 6 comes with the default CSS, JS, and pre-processor. Therefore, we can create our application by using these dependencies.

So, install  **npm** inside the project directory.

1

`npm install`

![Laravel 6 npm install](https://i0.wp.com/www.programmingfields.com/wp-content/uploads/2019/10/Laravel-6-npm-install.png?ssl=1)

**Laravel 6 npm install**

After adding these packages, we’ll need to run the development of these packages. So, It can add the Asset files in the public directory of the project.

Navigate to the public folder of the project, You will see the Asset files like  **CSS**  and  **js** files.

![Laravel 6 npm run dev](https://i0.wp.com/www.programmingfields.com/wp-content/uploads/2019/10/npm-run-dev.png?ssl=1)

**npm run dev**

## Create a Database and Configure

Open the MySQL database and create a database. In my case, my database name is  **registration**.

1

`create` `database` `registration;`

You no need to create any table here. Now, open the  **.env**  file and change the database credentials with below snippet. Replace database username and password with yours.

1

2

3

4

5

6

`DB_CONNECTION=mysql`

`DB_HOST=127.0.0.1`

`DB_PORT=3306`

`DB_DATABASE=registration`

`DB_USERNAME=root`

`DB_PASSWORD=root`

The next step will move for migrating the migration file for the table which has been created by default.

[How to Upload Files and Images in Laravel 6 with Validation](https://www.programmingfields.com/upload-files-and-images-in-laravel-6/)

## Create User Migration

Laravel 6 provides a default Model for the User. So, you don’t need to create a  **User model**. Rather than, just need to add the fillable data that you want to add to the database table. This will be the default code of the  **User.php**  file.

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

13

14

15

16

17

18

19

20

21

22

23

24

25

26

27

28

29

30

31

32

33

34

35

36

37

38

39

40

41

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
