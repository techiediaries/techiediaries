---
layout: bpost
title: ""
image: "images/content/laravel.png"
excerpt: "" 
tags : [laravel, laravel-6-tutorials-and-examples, laravel6] 
---

Laravel 8 officially released on 8th September 2020. The laravel team releases new Laravel version in every 6-month interval with major changes. As Laravel 8 Non-LTS (general version), the Laravel 8 will provide 6 months bug fixes until March 8, 2021, and 1-year security fixes until 8 September 2021.

Until Laravel 8, we used php artisan down for temporary down our website for maintenance but the previous implementation was the entire framework has to be booted in order to render the maintenance page. In Laravel 8, it has been done more efficiently.

```bash
$ php artisan down --secret=myByPassSecretCopy
```

Once you down the website with secret bypass. Now you can use it to check your website something like this. The maintenance middleware will intercept this request and issue a maintenance mode bypass cookie to the user and redirect to /.

http://example.com/myByPassSecretCopy
 

You can set more into maintenance mode options.

```bash
$ php artisan down --redirect=/ --status=200 --secret=myByPassSecret --render="errors::503"
```

Explanation
Put the application offline
Redirect all routes to "/"
Set status code
Set a secret to bypass maintenance mode
Render a view file for the downtime