---
layout: post
title: "How to Install Bootstrap 4 in Laravel 6/7 Tutorial and Example"
date: 2020-02-1 05:44
categories: laravel
author: ahmed
tags: [ laravel ]
excerpt: "Learn how to Install Bootstrap 4 in Laravel 6/7 By Example"
---



In this tutorial, we'll see how  to install Bootstrap 4 in our Laravel 6/7 application by example. 

We simply need to install the `laravel/ui` package using Composer and installing the Bootstrap 4 package from npm. 


The `laravel/ui` package provides the scaffoldings for bootstrap, vue and react. And the auth scaffold for login and registration.

## Installing Bootstrap

Head over to your terminal, navigate to your Laravel project and run the following command:

```bash
$ composer require laravel/ui
```

After successfully installing the package, we install Bootstrap 4 in our application using the following command:

```bash
$ php artisan ui bootstrap
```

You can also install the auth scaffoldings using the following command instead:

```bash
$ php artisan ui bootstrap --auth
```


Finally, you need to install the bootstrap package and the related frontend dependencies such as jquery from npm using the following command:

```bash
$ npm install
```
