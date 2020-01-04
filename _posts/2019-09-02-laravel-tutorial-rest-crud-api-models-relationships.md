---
layout: post
title: "Laravel 6 REST API CRUD Tutorial - Build a CRM [PART 2]: Eloquent Models and Relationships"
image: "images/content/php.png"
excerpt: "Laravel 6 is recently released with many enhancements so we'll be learning, throughout this tutorial how to create an example CRUD application from scratch. The application we'll be building is a simple CRM with a MySQL database." 
tags : [php , laravel, mysql, laravel6] 
---
 
**Laravel 6** is recently released with many enhancements, so we'll be learning, throughout this tutorial series how to create an example REST API CRUD application from scratch. The application we'll be building is a simple CRM with a MySQL database that exposes a set of RESTful API endpoints.

You can see this [Upgrade Guide](https://laravel.com/docs/6/upgrade) for instructions on how to upgrade an existing web application from Laravel 5.8 to Laravel 6.


## Introducing REST APIs

According to [Wikipedia](https://en.wikipedia.org/wiki/Representational_state_transfer):

> Representational State Transfer (REST) is a software architectural style that defines a set of constraints to be used for creating Web services. Web services that conform to the REST architectural style, termed RESTful Web services (RWS), provide interoperability between computer systems on the Internet. 


REST stands for **REpresentational State Transfer**. It's an architectural style for distributed systems invented by [Roy Fielding in 2000](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm).

You can refer to an API (Application Programming Interface) or simply interface as RESTful if it comply with these [six REST contstraints](https://restfulapi.net/rest-architectural-constraints/):

- Client–server architecture: Your REST API interface should follow a client-server architecture,
- Stateless: Your REST API interface should be stateless,
- Cacheable: Your REST API interface should be cacheable,
- Uniform interface: Your REST API should have a uniform interface,
- Layered system ,
- Code on demand.

## What's a REST API Resource?

In REST APIs, a resource refers to an object that has a type and data. It has also a group of associated methods that can operate on it. These are standard methods that correspond to the standard HTTP GET, POST, PUT and DELETE methods. 

## What's a REST API Method?

A REST API is an interaface that allows you to interface your web application with other systems like mobile devices and web browsers via a set of methods that correspond to CRUD (create, read, update, delete) operations. In REST rules, you need to map a specific HTTP method to a specific CRUD operation.

These are example HTTP methods mapped to the CRUD actions that can by performed by your REST API.

- HTTP GET: This REST API method can be mapped to an action to get/retrieve the resource data,
- HTTP POST: This REST API method can be mapped to an action to create a new resources,
- HTTP PUT: This REST API method can be mapped to an action to update existing resources, 
- HTTP DELETE: This REST API method can be mapped to an action delete the resource,
- HTTP PATCH: This REST API method can be mapped to an action to make partial update on a resource.


## Creating Laravel 6 Models of our REST API 

According to the database structure above, we'll need to create the followng Eloquent models:

- Contact
- Account
- Activity
- ContactStatus
- ContactSource
- ActivityStatus

Head back to your terminal and run the following commands:

```bash
$ php artisan make:model Contact --migration
$ php artisan make:model Account --migration
$ php artisan make:model Activity --migration
$ php artisan make:model ContactStatus --migration
$ php artisan make:model ContactSource --migration
$ php artisan make:model ActivityStatus --migration
```

This will create models with the corresponding migrations files. The models exist in the `app` folder and you can find the migration files in the `database/migrations` folder.

>The `-m` flag will also create the corresponding migration file for the model.

Next, in your terminal, run the following command to create the base tables:

```bash
$ php artisan migrate
```

You will get the following output:

```bash
Migration table created successfully.
Migrating: 2019_09_02_223818_create_contacts_table
Migrated:  2019_09_02_223818_create_contacts_table
Migrating: 2019_09_02_223832_create_accounts_table
Migrated:  2019_09_02_223832_create_accounts_table
Migrating: 2019_09_02_223841_create_activities_table
Migrated:  2019_09_02_223841_create_activities_table
Migrating: 2019_09_02_223855_create_contact_statuses_table
Migrated:  2019_09_02_223855_create_contact_statuses_table
Migrating: 2019_09_02_223904_create_contact_sources_table
Migrated:  2019_09_02_223904_create_contact_sources_table
Migrating: 2019_09_02_223912_create_activity_statuses_table
Migrated:  2019_09_02_223912_create_activity_statuses_table
```

In Laravel, you can specify the structure (table fields) in the migration files. Let's start with the `contacts` table. Open the `database/migrations/2019_09_02_223818_create_contacts_table.php` file (the date prefix for the file will be different for you) and add the following changes:

```php
    public function up()
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            $table->string('title');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('phone');
            $table->string('address');
            $table->date('date');
            
            $table->biginteger('user_id')->unsigned(); 
            $table->foreign('user_id')->references('id')->on('users');                                        
        });
    }
```

Next, open the `database/migrations/<YOUR_TIMESTAMP>_create_accounts_table.php` file and change accordingly:

```php
    public function up()
    {
        Schema::create('accounts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            $table->string('name');
            $table->description('description');           
            
        });
    }
```

Next, open the `database/migrations/<YOUR_TIMESTAMP>_create_activities_table.php` file and change accordingly:

```php
    public function up()
    {
        Schema::create('activities', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            $table->string('description');
            
        });
    }
```

Next, open the `database/migrations/<YOUR_TIMESTAMP>_create_contact_statuses_table.php` file and change accordingly:

```php
    public function up()
    {
        Schema::create('contact_statuses', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            $table->string('status');
        });
    }
```

Next, open the `database/migrations/<YOUR_TIMESTAMP>_create_contact_sources_table.php` file and change accordingly:

```php
    public function up()
    {
        Schema::create('contact_sources', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            $table->string('name');
        });
    }

```

Next, open the `database/migrations/<YOUR_TIMESTAMP>_create_activity_statuses_table.php` file and change accordingly:

```php
    public function up()
    {
        Schema::create('activity_statuses', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            $table->string('status');            
        });
    }
```

You can see that we didn't create any foreign keys between the tables. That's because we need to avoid any issues to creating a foreign key to a table that doesn't exist yet. The order of the migrations is important so you either make sure that the tables that are being referenced are created first or create the tables without any foreign keys and then add a migration to update the tables with the required relationships after the tables are created. 

Now, let's create the `update_contacts_table` migration by running the following command:

```bash
$ php artisan make:migration update_contacts_table --table=contacts
Created Migration: 2019_09_02_235456_update_contacts_table
```

Open the `database/migrations/<YOUR_TIMESTAMP>_update_contacts_table.php` file and update accordingly:

```php
    public function up()
    {
        Schema::table('contacts', function (Blueprint $table) {
            
            $table->biginteger('source_id')->unsigned();  
            $table->foreign('source_id')->references('id')->on('contact_sources');   
            
            $table->biginteger('account_id')->unsigned(); 
            $table->foreign('account_id')->references('id')->on('accounts');   
            
            $table->biginteger('status_id')->unsigned(); 
            $table->foreign('status_id')->references('id')->on('contact_statuses');
            
        });
    }
```

We create three foreign key relationships to the `contact_sources`, `accounts` and `contact_statuses` tables.

Next, let's create the `update_activities_table` migration by running the following command:

```bash
$ php artisan make:migration update_activities_table --table=activities
Created Migration: 2019_09_02_002644_update_activities_table
```

Open the `database/migrations/<YOUR_TIMESTAMP>_update_activities_table.php` file and update accordingly:

```php
    public function up()
    {
        Schema::table('activities', function (Blueprint $table) {
            $table->biginteger('contact_id')->unsigned();  
            $table->foreign('contact_id')->references('id')->on('contacts');   
            
            $table->biginteger('status_id')->unsigned(); 
            $table->foreign('status_id')->references('id')->on('activity_statuses');   
            
        });
    }
```

We create two foreign keys to the `contacts` and `activity_statuses` table.

Now, run the following command to migrate your database:

```bash
$ php artisan migrate
```

## Implementing the REST API Models

>The Eloquent ORM included with Laravel provides a beautiful, simple ActiveRecord implementation for working with your database. Each database table has a corresponding "Model" which is used to interact with that table. Models allow you to query for data in your tables, as well as insert new records into the table. [The official docs](https://laravel.com/docs/5.8/eloquent#introduction)

We can interact with our database tables using the corresponding Eloquent models so we need implement the required methods in each model.

## Defining the Relationships between Models

- A contact belongs to a source, a status, an account and to a user and has many activities.
- An account belongs to a user (i.e created by a user) and has many contacts.
- An activity belongs to a status, a contact and to a user.
- A contact status has many contacts.
- A contact source has many contacts.
- An activity status has many activities

Open the `app/Account.php` file and change accordingly:

```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    public function contacts(){
        return $this->hasMany('App\Contact');
    }
    public function user(){
        return $this->belongsTo('App\User');
    }
}
```

Next, open the `app/Activity.php` file and change accordingly:

```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    public function contact(){
        return $this->belongsTo('App\Contact');
    }

    public function status(){
        return $this->belongsTo('App\ActivityStatus');
    }
    public function user(){
        return $this->belongsTo('App\User');
    }
}
```

Next, open the `app/ActivityStatus.php` file and change accordingly:

```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ActivityStatus extends Model
{
    public function activities(){
        return $this->hasMany('App\Activiy');
    }
}
```

Next, open the `app/Contact.php` file and update accordingly:

```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = [
        'title',
        'first_name',
        'last_name',
        'email',
        'phone',
        'address',
        'date'       
    ];

    public function source(){
        return $this->belongsTo('App\ContactSource');
    }

    public function status(){
        return $this->belongsTo('App\ContactStatus');
    }

    public function account(){
        return $this->belongsTo('App\Account');
    }

    public function user(){
        return $this->belongsTo('App\User');
    }

    public function activities(){
        return $this->hasMany('App\Contact');
    }
    
}
```

Next, open the `app/ContactSource.php` file and update accordingly:

```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ContactSource extends Model
{
    public function contacts(){
        $this->hasMany('App\Contact');
    }
}
```

Next, open the `app/ContactStatus.php` file and update accordingly:

```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ContactStatus extends Model
{
    //
    public function contacts(){
        $this->hasMany('App\Contact');
    }
}
```

Finally, open the `app/User.php` file and update as follows:

```php
<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    
    public function contacts(){
        $this->hasMany('App\Contact');
    }

    public function activities(){
        return $this->hasMany('App\Activiy');
    }
    public function accounts(){
        return $this->hasMany('App\Account');
    }
}
```

Next we'll be creating the REST API controllers.

