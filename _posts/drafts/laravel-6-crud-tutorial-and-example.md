# Laravel 6 CRUD Tutorial and Example with Bootstrap 4


Insert Update Delete module is primary requirement for each project, so in this tutorial i will give you step by step instruction for creating crud (Create Read Update Delete) Application in laravel 6. you will understand how to use resource route, controller, blade files, model and migration for crud operation in laravel 6.

Laravel 6 is just released by tomorrow, Laravel 6 gives several new features and LTS support. So if you are new to laravel then this tutorial will help you create insert update delete application in laravel 6.

You just need to follow few step and you will get basic crud stuff using controller, model, route, bootstrap 4 and blade..

In this tutorial, you will learn very basic crud operation with laravel new version 6. I am going to show you step by step from scratch so, i will better to understand if you are new in laravel.



Step 1 : Install Laravel 6

first of all we need to get fresh Laravel 6 version application using bellow command, So open your terminal OR command prompt and run bellow command:

composer create-project --prefer-dist laravel/laravel blog


Step 2: Database Configuration

In second step, we will make database configuration for example database name, username, password etc for our crud application of laravel 6. So let's open .env file and fill all details like as bellow:

DB_CONNECTION=mysql

DB_HOST=127.0.0.1

DB_PORT=3306

DB_DATABASE=here your database name(blog)

DB_USERNAME=here database username(root)

DB_PASSWORD=here database password(root)


Read Also: Laravel Vue JS Pagination Example with Demo
Step 3: Create Migration

we are going to create crud application for product. so we have to create migration for "products" table using Laravel 6 php artisan command, so first fire bellow command:

php artisan make:migration create_products_table --create=products


After this command you will find one file in following path "database/migrations" and you have to put bellow code in your migration file for create products table.

<?php


use Illuminate\Support\Facades\Schema;

use Illuminate\Database\Schema\Blueprint;

use Illuminate\Database\Migrations\Migration;


class CreateProductsTable extends Migration

{

/**

* Run the migrations.

*

* @return void

*/

public function up()

{

Schema::create('products', function (Blueprint $table) {

$table->increments('id');

$table->string('name');

$table->text('detail');

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

Schema::dropIfExists('products');

}

}


Now you have to run this migration by following command:

php artisan migrate


Step 4: Add Resource Route

Here, we need to add resource route for product crud application. so open your "routes/web.php" file and add following route.

Route::resource('products','ProductController');


Step 5: Add Controller and Model

In this step, now we should create new controller as ProductController. So run bellow command and create new controller. bellow controller for create resource controller.

php artisan make:controller ProductController --resource --model=Product


After bellow command you will find new file in this path "app/Http/Controllers/ProductController.php".

In this controller will create seven methods by default as bellow methods:

1)index()

2)create()

3)store()

4)show()

5)edit()

6)update()

7)destroy()

So, let's copy bellow code and put on ProductController.php file.

<?php


namespace App\Http\Controllers;


use App\Product;

use Illuminate\Http\Request;


class ProductController extends Controller

{

/**

* Display a listing of the resource.

*

* @return \Illuminate\Http\Response

*/

public function index()

{

$products = Product::latest()->paginate(5);


return view('products.index',compact('products'))

->with('i', (request()->input('page', 1) - 1) * 5);

}


/**

* Show the form for creating a new resource.

*

* @return \Illuminate\Http\Response

*/

public function create()

{

return view('products.create');

}


/**

* Store a newly created resource in storage.

*

* @param \Illuminate\Http\Request $request

* @return \Illuminate\Http\Response

*/

public function store(Request $request)

{

$request->validate([

'name' => 'required',

'detail' => 'required',

]);


Product::create($request->all());


return redirect()->route('products.index')

->with('success','Product created successfully.');

}


/**

* Display the specified resource.

*

* @param \App\Product $product

* @return \Illuminate\Http\Response

*/

public function show(Product $product)

{

return view('products.show',compact('product'));

}


/**

* Show the form for editing the specified resource.

*

* @param \App\Product $product

* @return \Illuminate\Http\Response

*/

public function edit(Product $product)

{

return view('products.edit',compact('product'));

}


/**

* Update the specified resource in storage.

*

* @param \Illuminate\Http\Request $request

* @param \App\Product $product

* @return \Illuminate\Http\Response

*/

public function update(Request $request, Product $product)

{

$request->validate([

'name' => 'required',

'detail' => 'required',

]);


$product->update($request->all());


return redirect()->route('products.index')

->with('success','Product updated successfully');

}


/**

* Remove the specified resource from storage.

*

* @param \App\Product $product

* @return \Illuminate\Http\Response

*/

public function destroy(Product $product)

{

$product->delete();


return redirect()->route('products.index')

->with('success','Product deleted successfully');

}

}


Ok, so after run bellow command you will find "app/Product.php" and put bellow content in Product.php file:

<?php


namespace App;


use Illuminate\Database\Eloquent\Model;


class Product extends Model

{

protected $fillable = [

'name', 'detail'

];

}


Step 6: Add Blade Files

In last step. In this step we have to create just blade files. So mainly we have to create layout file and then create new folder "products" then create blade files of crud app. So finally you have to create following bellow blade file:

So let's just create following file and put bellow code.

<!DOCTYPE html>

Laravel 6 CRUD Application - ItSolutionStuff.com
href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha/css/bootstrap.css" rel="stylesheet"

class="container"
@yield('content')



@extends('products.layout')


@section('content')

class="row"
class="col-lg-12 margin-tb"
class="pull-left"
Laravel 6 CRUD Example from scratch - ItSolutionStuff.com
class="pull-right"
class="btn btn-success" href="{{ route('products.create') }}" Create New Product

@if ($message = Session::get('success'))

class="alert alert-success"
{{ $message }}
@endif


class="table table-bordered"
No
Name
Details
width="280px"Action
@foreach ($products as $product)

{{ ++$i }}
{{ $product->name }}
{{ $product->detail }}
action="{{ route('products.destroy',$product->id) }}" method="POST">


class="btn btn-info" href="{{ route('products.show',$product->id) }}">Show

class="btn btn-primary" href="{{ route('products.edit',$product->id) }}">Edit

@csrf

@method('DELETE')


type="submit" class="btn btn-danger"Delete
@endforeach


{!! $products->links() !!}


@endsection


@extends('products.layout')


@section('content')

class="row"
class="col-lg-12 margin-tb"
class="pull-left"
Add New Product
class="pull-right"
class="btn btn-primary" href="{{ route('products.index') }}" Back

@if ($errors->any())

class="alert alert-danger"
Whoops! There were some problems with your input.
@foreach ($errors->all() as $error)

{{ $error }}
@endforeach

@endif


action="{{ route('products.store') }}" method="POST"
@csrf


class="row"
class="col-xs-12 col-sm-12 col-md-12"
class="form-group"
Name:
type="text" name="name" class="form-control" placeholder="Name"
class="col-xs-12 col-sm-12 col-md-12"
class="form-group"
Detail:
class="form-control" style="height:150px" name="detail" placeholder="Detail"
class="col-xs-12 col-sm-12 col-md-12 text-center"
type="submit" class="btn btn-primary"Submit

@endsection


@extends('products.layout')


@section('content')

class="row"
class="col-lg-12 margin-tb"
class="pull-left"
Edit Product
class="pull-right"
class="btn btn-primary" href="{{ route('products.index') }}" Back

@if ($errors->any())

class="alert alert-danger"
Whoops! There were some problems with your input.
@foreach ($errors->all() as $error)

{{ $error }}
@endforeach

@endif


action="{{ route('products.update',$product->id) }}" method="POST">

@csrf

@method('PUT')


class="row"
class="col-xs-12 col-sm-12 col-md-12"
class="form-group"
Name:
type="text" name="name" value="{{ $product->name }}" class="form-control" placeholder="Name">

class="col-xs-12 col-sm-12 col-md-12"
class="form-group"
Detail:
class="form-control" style="height:150px" name="detail" placeholder="Detail"{{ $product->detail }}
class="col-xs-12 col-sm-12 col-md-12 text-center"
type="submit" class="btn btn-primary"Submit

@endsection


@extends('products.layout')

@section('content')

class="row"
class="col-lg-12 margin-tb"
class="pull-left"
Show Product
class="pull-right"
class="btn btn-primary" href="{{ route('products.index') }}" Back

class="row"
class="col-xs-12 col-sm-12 col-md-12"
class="form-group"
Name:
{{ $product->name }}

class="col-xs-12 col-sm-12 col-md-12"
class="form-group"
Details:
{{ $product->detail }}

@endsection


Now we are ready to run our crud application example with laravel 6 so run bellow command for quick run:

php artisan serve


Now you can open bellow URL on your browser:

Read Also: Laravel 6 Authentication Tutorial
http://localhost:8000/products