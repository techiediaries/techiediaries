---
layout: post
title: "Laravel 7/6 Pagination Example" 
date: 2020-01-19 22:39
categories: laravel 
author: 
tags: [laravel, laravel-7]
excerpt: ""
---
  

In this tutorial, we'll learn how to implement pagination in Laravel6/7 using collections. 

We will use the `Paginator` and `LengthAwarePaginator` facades to add pagination from an array in Laravel 6/7.

## Creating a Laravel 6/7 Controller

Let's start by creating a pagination controller with two methods, one for call route and another for creating custom pagination. 

```bash
$ php artisan make:controller PaginationController
```

Next, open the `app/Http/Controllers/PaginationController.php` an update is as follows:

```php
<?php

namespace  App\Http\Controllers;

use  Illuminate\Http\Request;

use  Illuminate\Pagination\Paginator;

use  Illuminate\Support\Collection;

use  Illuminate\Pagination\LengthAwarePaginator;

class  PaginationController  extends  Controller{

  /**

 * The attributes that are mass assignable.

 *

 * @var array

 */

  public  function index(){

    $myArray =  [

      ['id'=>1,  'title'=>'Item 1'],
      ['id'=>2,  'title'=>'Item 2'],
      ['id'=>3,  'title'=>'Item 3'],
      ['id'=>4,  'title'=>'Item 4'],
      ['id'=>5,  'title'=>'Item 5'],
      ['id'=>6,  'title'=>'Item 6'],
      ['id'=>7,  'title'=>'Item 7'],
      ['id'=>8,  'title'=>'Item 8'],
      ['id'=>9,  'title'=>'Item 9'],
      ['id'=>10,  'title'=>'Item 10'],
    ];
    $myCollectionObj = collect($myArray);
    $data = $this->paginate($myCollectionObj);
    return view('show', compact('data'));

  }

  /**

 * The attributes that are mass assignable.

 *

 * @var array

 */

  public  function paginate($items, $perPage =  5, $page =  null, $options = [])
  {

    $page = $page ?:  (Paginator::resolveCurrentPage()  ?:  1);
    $items = $items instanceof  Collection  ? $items :  Collection::make($items);
    return  new  LengthAwarePaginator($items->forPage($page, $perPage), $items->count(), $perPage, $page, $options);

  }

}
```


## Creating a Laravel 6/7 Route

Let's now add a new route for the pagination controller in the `routes/web.php` file: 


```php
Route::get('paginateddata',  'PaginationController@index');
```



## Creating a Laravel Template 

Next, let's create a blade template for our view:

```html
<div  class="container">

<table  class="table table-bordered">

  <tr>

  <th>Id</th>

  <th>Title</th>

  </tr>

 @foreach($data as $post)

  <tr>

  <td>{{ $post->id }}</td>

  <td>{{ $post->title }}</td>

  </tr>

 @endforeach

  </table>

</div>

{{ $data->links() }}
```
