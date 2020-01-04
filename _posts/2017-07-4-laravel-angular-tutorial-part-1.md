---
layout: post
title: "Laravel 5.4 Angular 2+ Tutorial : Building a CRM - Part 1"
image: "images/content/laravel-angular-2.png"
excerpt: "A series of tutorials for building a Laravel 5.4 web app with Rest APIs and Angular 2+ front end " 
tags : [laravel , angular]
---

{% include image.html 
    img="images/content/laravel-angular-2.png" 
    title="Laravel 5.4 Angular 2+ tutorial" 
%}

Throughout these tutorial series we are going to build a Laravel 5.4 web application with a Rest API based back end 
and Angular 2+ front end .

Laravel is one of the best PHP frameworks for building web apps used by millions of web developers worldwide and 
Angular 2+ is one of the most used JavaScript frameworks for building client side apps which is smaller ,faster and more 
powerful than its previous version AngularJS .

Combining both Laravel 5.4 and Angular 2+ will allow you to build high quality and modern web applications so lets get 
started .

Angular 2+ is a powerful JavaScript or more precisely TypeScript framework created by Google to build client side 
web applications .Angular 2+ is a component based framework i.e your app is built as a set of components with 
a root component and child components that communicate via Inputs and Outputs which encourages separation of concerns and 
code reuse .

This tutorial assumes a few requirements : 

You need to be familiar with Laravel .

You need to have a basic Laravel development environment setup with tools such as Apache , Composer and MySQL .

You also need to be familiar with Angular 2+ and have Angular CLI installed .

In this first section of our tutorial we will :
<ul>
<li>Create a Laravel 5.4 application </li>
<li>Design and model a simple CRM (Customer Relationship Management) database with Laravel ORM </li>
<li>Create a Rest API to do CRUD (Create - Read - Update - Delete ) operations</li>
</ul> 

<h2>Create a Laravel 5.4 application</h2>

Lets start our journey by creating a Laravel web application so open your command prompt if you are using a Windows 
machine or a terminal window under Linux and MAC then run : 

    composer create-project --prefer-dist laravel/laravel laravel-angular-2-crm 

Composer create-project command will create a project and install Laravel on your system .

Now you can use the PHP built in development server to serve your newly created web application .

    php artisan serve

You should be able to visit your web app with your browser at <em>http://localhost:8000</em>

<h2>Design CRM database and create Laravel models</h2>

Laravel has a powerful ORM that allows you to use PHP classes and methods to create ,manipulate and query SQL database 
tables without using SQL .You can also use migrations to create the databse structure and evolve it over time .

In our web application we'll use these models which correspond to SQL tables :

Customer/Contact   

Opportunity 

Deal 

Transaction 

Now lets get started by creating our database structure by using Laravel migrations .

First create migrations files for all models using artisan 

    php artisan migrate:make create_customers_table
    php artisan migrate:make create_opportunities_table
    php artisan migrate:make create_deals_table
    php artisan migrate:make create_transactions_table

Laravel will create 4 migrations files ,each file is named with the current timestamp concatenated with the corresponding migration 
name you have supplied and will be placed in <em>app/database/migrations</em> .

Here is an example of a migration file for the customers table 

    <?php

    use Illuminate\Support\Facades\Schema;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Database\Migrations\Migration;

    class CreateCustomersTable extends Migration
    {
        /**
        * Run the migrations.
        *
        * @return void
        */
        public function up()
        {
            Schema::create('customers', function (Blueprint $table) {
                $table->increments('id');
                $table->timestamps();
            });
        }

        /**
        * Reverse the migrations.
        *
        * @return void
        */
        public function down()
        {
            Schema::drop('customers');
        }
    }

This basic migration structure is automatically created by Laravel .It extends Migration and overrides two methods 

up() which gets called when running a migration to add new tables , columns or indexes .

down() which gets called when we are rolling back our database structure or simply when reversing 
what's done with up() method .

We use the Laravel schema builder within up() and down() methods to create and evolve our database tables , columns 
and indexes .

In up() we use Schema::create method to create a scheme .It takes two parameters : the name of the scheme and 
a callback function which gets called when the table is created .The callback function takes the created table 
object as parameter .

We then use table object increments() method to add a table primary key column with name id .And timestamps()
method to create two datetime fields created_at and updated_at to store the time when a row was created and updated .

In down() method we use Schema::drop method to drop the table .

Now after describing the the basic migration structure which was created by Laravel lets add our own fields to 
the customers table .

Each customer has a unique identifier , a first name , a last name ,a unique email , a phone number , a fax number ,an 
address and is a company field which indicates if the customer is a company . 
Modify the up() method to add new fields 


    public function up() {
        Schema::create('customers', function ($table) {
            $table->increments('id');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('phone_number');
            $table->string('fax_number');
            $table->boolean('is_company');
            $table->string('email')->unique();
            $table->timestamps();
        });
    }


TO BE CONTINUED ...



