---
layout: bpost
title: ""
image: "images/content/laravel.png"
excerpt: "" 
tags : [laravel, laravel-6-tutorials-and-examples, laravel6] 
---

Laravel 8 officially released on 8th September 2020. The laravel team releases new Laravel version in every 6-month interval with major changes. As Laravel 8 Non-LTS (general version), the Laravel 8 will provide 6 months bug fixes until March 8, 2021, and 1-year security fixes until 8 September 2021.

Laravel 8 provides an easier way to seed model data with the new factory improvement. Let's have a look at how cool the factory is now.

```php
Route::get('test-factory',function(){
   return User::factory()->create();
});
Route::get('test-factory',function(){
   return User::factory()->times(10)->create();
});
```