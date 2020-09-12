---
layout: bpost
title: ""Laravel 8 Auth Example with Jetstream
image: "images/content/laravel.png"
excerpt: "In this article, you'll learn how to use the new Jetstream package in Laravel 8 for auth scaffolding" 
tags : [laravel, laravel-6-tutorials-and-examples, laravel6] 
---

In this article, you'll learn how to use the new Jetstream package in Laravel 8 for auth scaffolding.

 Laravel 7 introduced the `laravel/ui` package to create authentication scaffolding but with the latest Laravel 8 version, a new  `laravel/jetstream` package is introduced.

Let's see how to create a Laravel 8 authentication example tutorial with Jetstream

## What's Laravel 8 Jetstream

Laravel 8 Jetstream is a new package that provides scaffolding. 

Jetstream helps you quickly build a web application with login, registration, email verification, two-factor authentication, session management, API support via [Laravel Sanctum](https://github.com/laravel/sanctum), and optional team management. Now let's see how to use it for  implementing Laravel 8 authentication.



First, let's get started by installing the Laravel 8 installer using Composer as follows:

```bash
$ composer global require laravel/installer
```

Next, create a new Laravel 8 app using the following command:

```php
$ laravel new laravel8authapp --jet
```

You need to use the `--jet` option to create a new Jetstream-based Laravel 8 application.

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

## Conclusion

In this article, we've seen how to implement Laravel 8 authentication using Jetstream.

