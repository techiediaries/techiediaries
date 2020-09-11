---
layout: post
title: "Laravel 8 Model Events Tutorial"
image: "images/content/laravel.png"
excerpt: "In this tutorial, we'll learn about Model events in Laravel 8 for using them in our CRM application to update the role of the user to an admin before saving it to the database." 
tags : [laravel, laravel-6-tutorials-and-examples, laravel6] 
---

In this tutorial, we'll learn about model events in Laravel 8 for using them in our CRM application to update the role of the user to an admin before saving it to the database.

The Laravel 8 ORM provides powerful abstractions for working with the supported databases. One of the features of Eloquent is the implementation of the **observer pattern** for sending and listening to events sent by Laravel 8 models when actions such as creating or saving models are executed.

If you are not familiar with the observer pattern, it's simply: 

> A software design pattern in which an object, called the subject, maintains a list of its dependents, called observers, and notifies them automatically of any state changes, usually by calling one of their methods. You can find more information on [Wikipedia](https://en.wikipedia.org/wiki/Observer_pattern).

Design patterns are simply common solutions to problems in software development, that are well tested and tried by developers.

  

## Laravel 8 Model Events

A Model in Laravel 8 provides an abstraction for working with a database table with a high-level API. Among these APIs, are events which are fired when actions are performed on the model.

Models events are simpy hooks into the important points of a model's lifecycle which you can use to easily run code when database records are saved, updated or deleted.

Events receive the instance of the model which is being saved, updated or deleted.

These are the events that you can use with your Laravel models:

-   `creating` and  `created`: sent before and after records have been created.
-   `updating` and `updated`:  sent before and after records are updated.
-   `saving` and `saved`: sent before and after records are saved (i.e created or updated).
-   `deleting` and `deleted`: sent before and after records are deleted or soft-deleted.
-   `restoring` and `restored`: sent before and after soft-deleted records are restored.
-  `retrieved`: sent after records have been retrieved.   


According to the [official website](https://laravel.com/docs/5.6/eloquent#events):

> The `retrieved` event will fire when an existing model is retrieved from the database. When a new model is saved for the first time, the `creating` and `created` events will fire. If a model already existed in the database and the `save` method is called, the `updating` / `updated` events will fire. However, in both cases, the `saving` / `saved` events will fire.

Now, let's listen for the `saving` event of the `User` model and update the `role` field to `admin` before saving the first record. Open the `app/User.php` file and  update as follows:

```php
<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;
    
    protected $fillable = [
        'name', 'email', 'password',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];


    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();
        User::saving(function ($model) {
            if(!User::where("role","=", "admin")->exists())
            {
                $model->role = 'admin';
            } 
            
        });
    }
}
```

We simply added a static `boot()` method to our `User` model. Inside this method, we called the `saving()` method and we passed a closure function that receives the instance of the User model which is being saved.

Inside the `saving()` listener function, we check if a user with an admin role exists in the database, if not we assign the admin value to the role field.

## Serving your Laravel 8 App

Now, start your Laravel app if it's not running yet:

```bash
$ php artisan serve
```

Head to the `http://localhost:8000` address in your web browser, you should be able to register for a first account with an admin role. After that, the registration will be disabled.   

Check out [this page](https://laravel.com/docs/5.6/eloquent#events) of the official docs for another approach of listening to model events using the `$dispatchesEvents` property on your Eloquent model and maps various points of the model's lifecycle to your own  [event classes](https://laravel.com/docs/5.6/events):

At this point of our tutorial, we have seen how we can listen to the `saving` event in our application. While this is enough for implementing the required functionality but let's see how we can use a model observer to do the same.

## Conclusion

In this tutorial, we've learned about Laravel 8 Model events and we have seen how to listen for the saving event on the `User` model for updating the role of the user being saved. 


