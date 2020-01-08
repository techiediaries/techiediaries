---
layout: post
title: "Upgrade to Laravel 6 from Laravel 5.8"
image: "images/content/laravel.png"
excerpt: "Laravel 6 is finally released. It's the new LTS version of Laravel instead of Laravel 5.5. If you have created your project with Laravel 5.8 or you have an existing project that was already upgraded to v5.8, these are the changes that you need to perform to upgrade it to the latest Laravel 6 version." 
tags : [laravel, laravel-6-tutorials-and-examples, laravel6] 
---

Laravel 6 is finally released. It's the new LTS version of Laravel instead of Laravel 5.5. 

## How to update your project to Laravel 6?

The update process of a project to the latest Laravel 6 is easy.

Open the `composer.json` file of your project (The configuration file of Composer) and change the Laravel framework version from `5.8.*` to `^6.0` (Notice the caret, Laravel 6 makes use of semantic versioning scheme). 

If you have a version smaller than 5.8, you are recommended to first upgrade your project to 5.8 then again upgrade to v6.

Next, save your `composer.json` file and run the following command:

```bash
$ composer update
```

As said, the process is easy but in bigger projects, simply changing the package version in the `composer.json` file won't work because most likely your project makes use of some feature that has changed in Laravel 6.

If you have created your project with Laravel 5.8 or you have an existing project that was already upgraded to v5.8, these are the changes that you need to perform before upgrading to the latest Laravel 6 version:

## Updating PHP to PHP 7.2+ required by Laravel 6 

Before you upgrade your project to v6, make sure your upgrade your PHP version from 7.1 to at least 7.2.

starting from December 2019, PHP 7.1 will not be maintained.

## Updating the `laravel/framework` package to `^6.0`

After you update your PHP version to v7.2+, you then need to update the framework dependencies, you can do that by simply opening the `composer.json` file of your project where Composer stores the information about the locally-installed packages of the project and changes the `laravel/framework` package to `^6.0`. 

What does the caret means? It simply means, that it's ok for Composer to install a newer minor or patch level version instead of the same exact version. This is part of semantic versioning that Laravel 6 started to use. 

You also need to check the other packages and update them to versions compatible with Laravel 6.

## Add a `viewAny()` method to authorization policies for controllers

If you have added any authorization policies using the `authorizeResource` method in one of your controllers, you should now add a a `viewAny()` method or access to the `index()` method will be unauthorized.

## Add an `$allowed` argument to the constructor of your authorization responses

If you have defined any authorization responses using the `Illuminate\Auth\Access\Response` class, you should change the signature of the  `__construct()` method or constructor by adding an `$allowed` argument as follows:

```php
public function __construct($allowed, $message = '', $code = null)
```

## Add an `inspect` method to any implementations of the Gate interafce

You also need to add an `inspect` method to any implementations of the  `Illuminate\Contracts\Auth\Access\Gate`  interface in your code.  

## Upgrade your project to use Carbon 2.0

Carbon 1.x is no longer supported so you need to upgrade your project to use Carbon 2.

## Set the `redis.client`  configuration option to  `predis`  in your  `config/database.php` file

In Laravel 6, the default Redis client is `phpredis` so you need to set the `redis.client`  configuration option to  `predis` (the old default used in your project)  in your  `config/database.php` file.

## Using Laravel Shift

You can also ugrade your project using Laravel Shift, an online automated service that helps you manage your upgrades. It will automatically do the upgrade process and the required changesfor you.

## Do you have to upgrade?

In most cases, yes because Laravel 6.0 is the latest Long Term Support release insted of Laravel 5.5, so that means bug fixes will be provided for two years and security fixes for three years.

## Conclusion

We have seen a list of changes that you need to perform in order to upgrade your Laravel 5.8 to Laravel 6. There are many other changes that you may need to make depending on your project. Check out the complete list from [the official docs](https://laravel.com/docs/6.0/upgrade)