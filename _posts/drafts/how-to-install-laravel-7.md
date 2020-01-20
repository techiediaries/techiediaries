---
layout: post
title: How to Install Laravel 7
date: 2020-01-19 05:44
category: 
author: 
tags: []
summary: 
---

If you want to play with the upcoming new version of Laravel (7.0) you can easily install it.

On packagist, if you look at  _“laravel/laravel”_  packages, you can see that there is a version named “[_dev-develop_](https://packagist.org/packages/laravel/laravel#dev-develop)_”_

This version includes the upcoming new version of the “_laravel/framework”_  packages.

![](https://miro.medium.com/max/60/1*h0-2Y948hquThEtRv8dPLg.png?q=20)

![](https://miro.medium.com/max/1742/1*h0-2Y948hquThEtRv8dPLg.png)

You can see that “_laravel/laravel”_  **includes “_laravel/framework_  7_.0”_**  and  **requires  _PHP_  version ≥ 7.2.5**.

To install  _Laravel_  7.0 you need to launch  _composer create-project_  as usual and then you need to set the “_dev-develop_” version of the “_laravel/laravel”_  package:

composer create-project --prefer-dist laravel/laravel blog7 dev-develop

Where:

-   _laravel/laravel_: is the package for the Laravel installation;
-   _blog7_: is the new directory for your new project (you can change it);
-   _dev-develop_: is the next version of Laravel.

Then you can enter in the new directory and execute the artisan command:

$ cd blog7  
$ php artisan --version  
Laravel Framework 7.0-dev

![](https://miro.medium.com/max/60/1*Og82gqseHr-c4afzKhFNlA.png?q=20)

![](https://miro.medium.com/max/738/1*Og82gqseHr-c4afzKhFNlA.png)

Now you can start to play with the new features of Laravel 7.0.

![](https://miro.medium.com/max/60/1*GfmHsC_I5egGyPx1lvXR9Q.png?q=20)

![](https://miro.medium.com/max/1772/1*GfmHsC_I5egGyPx1lvXR9Q.png)

