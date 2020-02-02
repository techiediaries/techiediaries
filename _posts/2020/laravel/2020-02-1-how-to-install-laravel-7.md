---
layout: post
title: How to Install Laravel 7 On Ubuntu, Windows and macOS
date: 2020-02-1 05:44
categories: laravel
author: ahmed
tags: [ laravel ]
excerpt: "Learn how to install Laravel 7"
---

Laravel 7 is due to be released on February, 2020 but you can start testing the development version as of this time.

In this post, we'll see how to install the latest Laravel 7 version.

If you go to packagist, and search for “laravel/laravel”  packages, you should see a version named [_dev-develop_](https://packagist.org/packages/laravel/laravel#dev-develop). This the package that you can use for installing Laravel 7 at this time.

> Please note that Laravel 7 requires PHP 7.2.5+

Make sure you have the required PHP version and Composer installed on your machine, next open a new command-line interface and run the following command:

```bash
$ composer create-project --prefer-dist laravel/laravel laravel-7-example dev-develop
```

Wait for Composer to download the project's files and any php dependencies and run the following commands to start a development server:

```bash
$ cd laravel-7-example  
$ php artisan serve
```


