---
layout: post
title: Laravel 6 Paginate with Collection or Array
date: 2020-01-18 15:44
category: 
author: 
tags: []
summary: 
---
  

In this tutorial, i would like to guide how to create pagination from array or collection object in laravel 6 application. we will create laravel 6 paginate from array example. This example will help to create paginate collection object in laravel 6.

We will create our custom collection object with array and create pagination using laravel eloquent. we will use Paginator and LengthAwarePaginator facade to creating pagination from custom array in laravel 6.

In this example, we will simple create one route and call controller method. that controller method we will create our custom array and convert into collection object. we also create one paginate() in same controller to create pagination in laravel 6. then you have to just call view and pass result variable. you can use like your paginate object.

So, let's see bellow example step by step.

![](https://www.itsolutionstuff.com/upload/laravel-6-paginate-array.png)

**Create Route**

In next step, we will add new one route in web.php file. route we will call controller method So let's simply create both route as bellow listed:

routes/web.php

Route::get('paginate',  'PaginationController@index');

**Create Controller**

Here, we will create PaginationController with two method, one for call route and another for creating custom pagination. So let's add controller as like bellow:

app/Http/Controllers/PaginationController.php

<?php

namespace  App\Http\Controllers;

use  Illuminate\Http\Request;

use  Illuminate\Pagination\Paginator;

use  Illuminate\Support\Collection;

use  Illuminate\Pagination\LengthAwarePaginator;

class  PaginationController  extends  Controller

{

  /**

 * The attributes that are mass assignable.

 *

 * @var array

 */

  public  function index()

  {

 $myArray =  [

  ['id'=>1,  'title'=>'Laravel 6 CRUD'],

  ['id'=>2,  'title'=>'Laravel 6 Ajax CRUD'],

  ['id'=>3,  'title'=>'Laravel 6 CORS Middleware'],

  ['id'=>4,  'title'=>'Laravel 6 Autocomplete'],

  ['id'=>5,  'title'=>'Laravel 6 Image Upload'],

  ['id'=>6,  'title'=>'Laravel 6 Ajax Request'],

  ['id'=>7,  'title'=>'Laravel 6 Multiple Image Upload'],

  ['id'=>8,  'title'=>'Laravel 6 Ckeditor'],

  ['id'=>9,  'title'=>'Laravel 6 Rest API'],

  ['id'=>10,  'title'=>'Laravel 6 Pagination'],

  ];

 $myCollectionObj = collect($myArray);

 $data = $this->paginate($myCollectionObj);

  return view('paginate', compact('data'));

  }

  /**

 * The attributes that are mass assignable.

 *

 * @var array

 */

  public  function paginate($items, $perPage =  5, $page =  null, $options =  [])

  {

 $page = $page ?:  (Paginator::resolveCurrentPage()  ?:  1);

 $items = $items instanceof  Collection  ? $items :  Collection::make($items);

  return  new  LengthAwarePaginator($items->forPage($page, $perPage), $items->count(), $perPage, $page, $options);

  }

}

**Create View File**

Here, we just need to create blade file to print data. so let's create simple blade file as like bellow:

app/Http/Controllers/PaginationController.php

Read Also:  [Laravel 6 Multiple Database Connection Tutorial](https://www.itsolutionstuff.com/post/laravel-6-multiple-database-connection-tutorialexample.html)

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

Now you can run and check.

I hope it can help you...