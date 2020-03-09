---
layout: post
title: "Laravel 7/6 Auth Tutorial: Login/Register/Password Reset Example"
image: "images/content/laravel.png"
excerpt: "In the previous tutorial, we've introduced Laravel and seen the new features of the latest Laravel 6 version. In this tutorial, we'll see how to add authentication with login, registration, logout and password reset example"
categories: laravel
date: 2020-03-09  
tags : [laravel, laravel-6-tutorials-and-examples, laravel6] 
---

This tutorial will help you implement authentication in your Laravel 7 project with example.

We'll be using the Laravel UI package in Laravel 7.

In this tutorial, we'll see how to add authentication in Laravel 7 with login, registration, logout and password reset example.

In the previous [tutorial](https://www.techiediaries.com/laravel-tutorial/), we've introduced Laravel and seen the new features of the latest Laravel 7 version. 

## Bootstrapping a Laravel 7/6 Project

First, make sure you have followed the previous tutorial and that you have started your development server on the `http://localhost:8000` address.


## Adding Authentication to your Laravel 7/6 App

Laravel 6+ has moved the auth scaffolding into a separate Laravel/UI package that you need to install in your Laravel 7 project using the following command from a new terminal:

```bash
$ cd crmapp
$ composer require laravel/ui
```

This is the output of the command:

```bash
Using version ^1.0 for laravel/ui
./composer.json has been updated
Loading composer repositories with package information
Updating dependencies (including require-dev)
Package operations: 1 install, 0 updates, 0 removals
  - Installing laravel/ui (v1.0.1): Downloading (100%)
Writing lock file
[...]
```
Next, you can  run the following command:

```bash
$ php artisan ui vue --auth
```

This is the output of the command:

```bash
Vue scaffolding installed successfully.
Please run "npm install && npm run dev" to compile your fresh scaffolding.
Authentication scaffolding generated successfully.
```

You should run the previous command on new Laravel 6+ projects for generating a complete layout with registration, login, and password reset views and routes for adding authentication. This will also generate a `HomeController` for handling the requests after login.

The `php artisan ui vue --auth` command will create the necessary views for authentication and put them in the `resources/views/auth` folder.

The `ui` command will also generate a `resources/views/layouts` folder that contains a base layout for your application which makes use of the Bootstrap CSS framework.

Now that you have added the routes and views for the existing authentication controllers, users can register and authenticate. 

## Laravel 7/6 Authentication Controllers

The authentication controllers in Laravel 7 contain the required logic for authenticating users and create new users in the database so you don't need to add anything else to enable auth in your application except if you want to customize the look or behavior which we'll see later.

In your web browser head to the [http://localhost:8000/register](http://localhost:8000/register) address, you should see the following interface:

![Laravel 7/6 Register UI](https://www.diigo.com/file/image/rscqpoqzocbqqdarezdseaprda/Laravel+6+Register+UI.jpg)

In the same way, you can see the login UI by visiting the [http://localhost:8000/login](http://localhost:8000/login) URL:

![Laravel 7/6 Login Example](https://www.diigo.com/file/image/rscqpoqzocbqqdodpzdseaproa/Laravel+6+Login+UI.jpg)

You can also access the password reset page from the [http://localhost:8000/password/reset](http://localhost:8000/password/reset) URL:

![Laravel 7/6 Password Reset Example ](https://www.diigo.com/file/image/rscqpoqzocbqqecpqzdseaprsa/Laravel+6+Password+Reset.jpg)

Next, we need to style the authentication views in our Laravel 7 example.

The views have no styling. You can change that by installing and building the frontend dependencies using the following commands from the root of your project:

```bash
$ npm install
$ npm run dev
```

If you have the **Unhandled rejection Error: EACCES: permission denied** error, you simply need to use **sudo** before your command in Ubuntu or macOS systems:

```bash
$ sudo npm install 
$ sudo npm run dev
```

We now have a better looking UI. This is a screenshot of the login page:

![Laravel 7/6 & Bootstrap Login UI](https://www.diigo.com/file/image/rscqpoqzocbqqeoabzdseapsba/Laravel+6+Bootstrap+Login+Example.jpg)

If you register for an account, you'll be logged in and redirected to the `/home` path which is mapped to a `HomeController` where you can also invoke the logout method:

![](https://www.diigo.com/file/image/rscqpoqzocbqqoqaezdseaqado/Laravel+6+Logout+Example.jpg)

## Laravel 7/6 Authentication Routes

Next, we need to add the authentication routes in our Laravel 7 project.

Open the `routes/web.php`, you should find the following code:

```php
<?php

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
```

The `Auth::routes()` method includes the routes for login, registration, logout, and password reset. This method along with the home route was added when added the auth scaffolding in the previous section.


## Laravel `LoginController`, `RegisterController`, and `ResetPasswordController`.

Now, we need to add the authentication controllers in our Laravel 7 app.

Laravel provides the `LoginController`, `RegisterController`, and `ResetPasswordController` controllers out of the box and you can also provide your implementations if you have special requirements.

The authentication controllers are located in the `app/Http/Controllers/Auth` folder. 

## How to Protect Routes in your Laravel 7/6 App

Next, we need to protect the routes of our Laravel 7 app.

In a web application, you add authentication for primarily protecting some pages or routes for unauthorized access.

In Laravel, you can protect a route using a [middelware](https://laravel.com/docs/6.0/middleware). 

Laravel has a builtin `auth` middleware, which exists in `Illuminate\Auth\Middleware\Authenticate`. It's also registered in the HTTP kernel of your app, you can simply add it to your desired route to prevent unauthenticated users from accessing it. 

Let's see how the home page is protected so we can protect other pages in the same way:

Open the `app/Http/Controllers/HomeController.php` file. It has the following code:

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }
    public function index()
    {
        return view('home');
    }
}
```
  
In the constructor (the `__construct()` method) of the controller, you can see a call to the `middleware()` method with the `auth` middleware. 

The `middleware()` method can be either called from the controller or the route definition. So let's remove the  call from the controller. Next, open the `routes/web.php` file and update the home route defintion as follows:

```php
Route::get('/home', 'HomeController@index')->name('home')->middleware('auth');
```

## Conclusion

In this tutorial, we have added authentication to our CRM app built with Laravel 7/6.

Adding authentication is Laravel 7 is a breeze as you have seen since the framework provides a complete auth system with register, login, logout and password reset out of the box that can be sufficient in many cases. But if you want to handle special requirements you can also provide your custom auth controllers but you don't need to implement the base functionalities from scratch, you can use the various authentication services available from the `Auth` facade. 

If you have used Laravel before Laravel 7, you'll find some changes in Laravel 6. For example, the auth routes and views are now part of the separated `laravel/ui` package that you need to install in your project using Composer before you can call the `php artisan ui vue --auth` command that replaced the Laravel 5'  artisan `php artisan make:auth` command.
