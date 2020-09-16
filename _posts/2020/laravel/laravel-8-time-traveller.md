---
layout: bpost
title: ""
image: "images/content/laravel.png"
excerpt: "" 
tags : [laravel, laravel-6-tutorials-and-examples, laravel6] 
---

Laravel 8 officially released on 8th September 2020. The laravel team releases new Laravel version in every 6-month interval with major changes. As Laravel 8 Non-LTS (general version), the Laravel 8 will provide 6 months bug fixes until March 8, 2021, and 1-year security fixes until 8 September 2021.

With laravel time traveller helper now you can more easily manipulate time. Laravel base features test class included these helpers. Here is some example.

```php
//goto to future
$this->travel(10)->seconds();
$this->travel(10)->minutes();

//back to past
$this->travel(-8)->seconds();
$this->travel(-8)->minutes();
```