---
layout: bpost
title: "Laravel 8 Authentication Tutorial"
image: "images/content/laravel.png"
excerpt: "In this tutorial, we'll see step by step how to implement authentication in your Laravel 8 application" 
tags : [laravel, laravel-6-tutorials-and-examples, laravel6] 
---

Laravel 8 was officially released on 8th September 2020. The laravel team follows semantic versioning and releases a new major Laravel version in every 6-month. 

Laravel 8 is not an LTS (Long-Time-Support) release, the Laravel 8 version will have 6 months bug fixes until March 8, 2021, and 1-year security fixes until 8 September 2021.

More often than not, developers need to implement authentication in their web applications to protect some pages from public access. If you are using Laravel and PHP, adding authentication in your apps is very easy and straightforward as it provides built-in system for authentication with the ability to customize it when needed. In Laravel 8, we have a new application scaffolding system, called Jetstream that makes scaffolding a complete authentication system a breeze including optional integration with modern front-end tools such as Vue.js and Tailwind CSS. In this tutorial, we'll see you step by step how to implement authentication in your Laravel 8 application. 

If you follow this guide properly, you should be able to quickly and easily add authentication to your Laravel 8 app.


In this article, you'll be learning about the following topics:
 

- How to install and generate a new Laravel 8 project
- How to install the Laravel 8 Jetstream scaffolding package
- How to install the frontend dependencies from npm
- How to test the authentication system
- How to protect your app routes
 

## Step 1 -- Creating a Laravel 8 Auth Project

If you don't have a Laravel 8 project, let's get started by creating a new project. 

Head over to a new command line interface and run the following command:

```bash
$ composer create-project laravel/laravel laravel8authdemo 8.0
```

We named our project `laravel8authdemo` and added `8.0` to install Laravel 8 version.

 

## Step 2 -- Installing the Laravel 8 Jetstream Package


Next, let's install the offical [Laravel 8 Jetstream](https://www.techiediaries.com/auth-scaffolding-jetstream-inertiajs-livewire) package , for making auth scaffolding, using Composer.

Head over to your terminal and run the following command:

```bash
$ cd laravel8authdemo
$ composer require laravel/jetstream
```

Next, you should run the `jetstream:install` artisan command which accepts the name of the stack you prefer to use (livewire or inertia):

```bash
$ php artisan jetstream:install inertia
Inertia scaffolding installed successfully.
Please execute the "npm install && npm run dev" command to build your assets.
```


The [Inertia.js](https://jetstream.laravel.com/1.x/stacks/inertia.html) stack provided by Jetstream uses Vue.js as its templating language. Building an Inertia application is a lot like building a typical Vue application; however, you will use Laravel's router instead of Vue router. Inertia is a small library that allows you to render single-file Vue components from your Laravel backend by providing the name of the component and the data that should be hydrated into that component's "props".

## Step 3 -- Generating Auth Scaffolding

After installation of Laravel 8 Jetstream package. It automatically scaffolds the login, two-factor login, registration, password reset, and email verification views for your project.

Simply, install and build your frontend dependencies as follows:

```bash
$ npm install && npm run dev

 DONE  Compiled successfully in 22806ms                               6:13:23 PM

       Asset      Size   Chunks             Chunk Names
/css/app.css  4.21 MiB  /js/app  [emitted]  /js/app
  /js/app.js  1.33 MiB  /js/app  [emitted]  /js/app

```

Finally, migrate your database using the following command:

```bash
$ php artisan migrate
``` 


Now our Laravel 8 authentication system is ready. Let's serve our application and test using our web browser.

- You can login to your app from `/login`,
- You can register from `/register`.
 

## Step 4 -- Protecting Routes 

After successfully scaffolding our Laravel 8 authentication system. We need to protect our routes from non logged-in users by using auth middleware in our routes or controllers:

```php
Route::get('home', 'App\Http\Controllers\HomeController@index')->middleware('auth');
```

We can also protect the view from within the controller in the constructor function as follows:

```php
<?php

class HomeController extends Controller
{
	public function __construct()
	{
	    $this->middleware('auth');
	}

	public function index(){
		//
	}

	...

}
```

To check if the user authenticated or not in the view or controller, we can use the `auth()->check()` method as follows:

```php
if(auth()->check()){
  // If the user is authenticated
}
```

To get current authenticated user data.

```php
$user = auth()->user();
```

## Conclusion

In this step by step tutorial we've seen how to implement Laravel 8 authentication using Laravel 8' Jetstream and Inetria.js. 
