---
layout: bpost
title: "Laravel 8 Auth Scaffolding Example with Jetstream Inertia.js and Livewire Stacks"
image: "images/content/laravel.png"
excerpt: "In this article, you'll learn how to use the new Jetstream package in Laravel 8 for auth scaffolding" 
tags : [laravel, laravel-6-tutorials-and-examples, laravel6] 
---

In this tutorial, you'll learn how to use the new Jetstream package with Inertia.js and Livewire stacks for Laravel 8 auth scaffolding.

[Inertia.js](https://jetstream.laravel.com/1.x/stacks/inertia.html) is a stack provided by Jetstream that uses Vue.js as its templating language,

Laravel 7 introduced the `laravel/ui` package to create authentication scaffolding but with the latest Laravel 8 version, a new  `laravel/jetstream` package is introduced.

According to the offcial docs of [Jetstream](https://jetstream.laravel.com/1.x/introduction.html):

>Laravel Jetstream is a beautifully designed application scaffolding for Laravel. Jetstream provides the perfect starting point for your next Laravel application and includes login, registration, email verification, two-factor authentication, session management, API support via Laravel Sanctum, and optional team management.

Jetstream is not only a scaffolding for Laravel 8 authentication but also other common application requirements such as API and team managment that can help you easily build SaaS applications with Laravel 8.

Jetstream is not based on Bootstrap styles but [Tailwind CSS](https://tailwindcss.com/) instead and provides you with two stacks - Livewire or Inertia scaffolding. This latter is based on Vue.js.


Tailwind CSS is a utility-first CSS framework for rapidly building custom designs. It's a highly customizable, low-level CSS framework that gives you all of the building blocks you need to build bespoke designs without any annoying opinionated styles you have to fight to override.

Laravel Livewire is a library that enables you to build modern, reactive, dynamic interfaces using Laravel Blade as your templating language while the Inertia.js stack provided by Jetstream uses Vue.js as its templating language.

## Laravel 8 Auth Scaffolding

Let's see how to create a Laravel 8 authentication example tutorial with Jetstream scaffolding and then we'll see how to use Inertia.js for a Vue powered UI or Livewire for a Blade powerd UI.


### What's Laravel 8 Jetstream

Laravel 8 Jetstream is a new package that provides scaffolding. 

Jetstream helps you quickly build a web application with login, registration, email verification, two-factor authentication, session management, API support via [Laravel Sanctum](https://github.com/laravel/sanctum), and optional team management. Now let's see how to use it for  implementing Laravel 8 authentication.


### Installing Laravel 8 with Composer

First, let's get started by installing the Laravel 8 installer using Composer as follows:

```bash
$ composer global require laravel/installer
```

## Creating a Laravel 8 App with Jetstream

Next, create a new Laravel 8 app using the following command:

```php
$ laravel new laravel8authapp --jet
```

You need to use the `--jet` option to create a new Jetstream-based Laravel 8 application.


You can also install Jetsteram in your app using Composer, if you created your app without Jetstream, using the following commands:

```bash
$ cd laravel8authapp
$ composer require laravel/jetstream
```

If you installed Jetstream using Composer, you should run the `jetstream:install` artisan command which accepts the name of the stack you prefer (livewire or inertia).

## Scaffolding Auth with Livewire

You can scaffold authentication with basic login, register and email verification and optionally team management using the following command(s):

```bash
$ php artisan jetstream:install livewire
$ php artisan jetstream:install livewire --teams
```
  
Next, proceed to migrate your database using the following command:

```bash
$ cd laravel8authapp
$ php artisan migrate
```

Finally, you need to install the frontend dependencies using the following command:

```php
$ npm install 
$ npm run dev
```

You can enable or disable Jetstream features from the `config/fortify.php` file as follows:

```php
 'features' => [
        Features::registration(),
        Features::resetPasswords(),
        Features::emailVerification(),
        Features::updateProfileInformation(),
        Features::updatePasswords(),
        //Features::twoFactorAuthentication(),
    ],
```

You can also add or remove features from the `config/jetstream.php` file:


```php
'features' => [
        Features::profilePhotos(),
        Features::api(),
        Features::teams(),
    ],
```

## Laravel 8 Auth Scaffolding using Jetstream and Inertia.js 

The [Inertia.js](https://jetstream.laravel.com/1.x/stacks/inertia.html) stack provided by Jetstream uses Vue.js as its templating language. Building an Inertia application is a lot like building a typical Vue application; however, you will use Laravel's router instead of Vue router. Inertia is a small library that allows you to render single-file Vue components from your Laravel backend by providing the name of the component and the data that should be hydrated into that component's "props".

You can create auth scaffolding with Jetstream Inertia.js using the following command(s):


```bash
$ php artisan jetstream:install inertia
$ php artisan jetstream:install inertia --teams
```

Next, install and build your frontend dependencies as follows:

```bash
$ npm install
$ npm run dev
```

Finally, migrate your database using the following command:

```bash
$ php artisan migrate
```

## Conclusion

In this article, we've seen how to use Jetstream scaffolding to implement Laravel 8 authentication using Inertia.js (Vue.js) and Livewire (Blade).

