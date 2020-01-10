# Laravel 6 Ajax CRUD Tutorial wit Modal and Pagination

Here, i will guide you step by step ajax crud operations in laravel 6 with modal & pagination. we will create jquery ajax crud with modals using datatables js in laravel 6. we will simply write jquery ajax request for crud with yajra datatable laravel 6.

We will use yajra datatable to list a records with pagination, sorting and filter (search). we will use bootstrap modal for create new records and update new records. we will use resource routes to create crud (create read update delete) application in laravel 6.

I will provide you step by step guide to create ajax crud example with laravel 6. you just need to follow few step to get c.r.u.d with modals and ajax. you can easily use with your laravel 6 project and easy to customize it.

You can see bellow preview of ajax crud app.

![](https://www.itsolutionstuff.com/upload/laravel-6-ajax-crud.png)

![](https://www.itsolutionstuff.com/upload/laravel-6-ajax-crud-list.png)

![](https://www.itsolutionstuff.com/upload/laravel-6-ajax-crud-create.png)

![](https://www.itsolutionstuff.com/upload/laravel-6-ajax-crud-edit.png)

**Step 1: Install Laravel 6**

first of all we need to get fresh Laravel 6 version application using bellow command, So open your terminal OR command prompt and run bellow command:

composer create-project --prefer-dist laravel/laravel blog

**Step 2: Install Yajra Datatable**

We need to install yajra datatable composer package for datatable, so you can install using following command:

composer require yajra/laravel-datatables-oracle

After that you need to set providers and alias.

.....

'providers'  =>  [

....

Yajra\DataTables\DataTablesServiceProvider::class,

]

'aliases'  =>  [

....

'DataTables'  =>  Yajra\DataTables\Facades\DataTables::class,

]

.....

Read Also:  [Laravel 6 CRUD Application Tutorial](https://www.itsolutionstuff.com/post/laravel-6-crud-application-tutorialexample.html)

**Step 3: Database Configuration**

In second step, we will make database configuration for example database name, username, password etc for our crud application of laravel 6. So let's open .env file and fill all details like as bellow:

DB_CONNECTION=mysql

DB_HOST=127.0.0.1

DB_PORT=3306

DB_DATABASE=here your database name(blog)

DB_USERNAME=here database username(root)

DB_PASSWORD=here database password(root)

**Step 4: Create Migration Table**

we are going to create ajax crud application for product. so we have to create migration for "products" table using Laravel 6 php artisan command, so first fire bellow command:

php artisan make:migration create_products_table --create=products

After this command you will find one file in following path "database/migrations" and you have to put bellow code in your migration file for create products table.

<?php

use  Illuminate\Support\Facades\Schema;

use  Illuminate\Database\Schema\Blueprint;

use  Illuminate\Database\Migrations\Migration;

class  CreateProductsTable  extends  Migration

{

/**

* Run the migrations.

*

* @return void

*/

public  function up()

{

Schema::create('products',  function  (Blueprint $table)  {

$table->bigIncrements('id');

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

public  function down()

{

Schema::dropIfExists('products');

}

}

Now you have to run this migration by following command:

php artisan migrate

**Step 5: Create Route**

Here, we need to add resource route for product ajax crud application. so open your "routes/web.php" file and add following route.

Route::resource('ajaxproducts','ProductAjaxController');

**Step 6: Add Controller and Model**

In this step, now we should create new controller as ProductAjaxController. So run bellow command and create new controller.

So, let's copy bellow code and put on ProductAjaxController.php file.

<?php

namespace  App\Http\Controllers;

use  App\Product;

use  Illuminate\Http\Request;

use  DataTables;

class  ProductAjaxController  extends  Controller

{

/**

* Display a listing of the resource.

*

* @return \Illuminate\Http\Response

*/

public  function index(Request $request)

{

if  ($request->ajax())  {

$data =  Product::latest()->get();

return  Datatables::of($data)

->addIndexColumn()

->addColumn('action',  function($row){

$btn =  '<a href="javascript:void(0)" data-toggle="tooltip" data-id="'.$row->id.'" data-original-title="Edit" class="edit btn btn-primary btn-sm editProduct">Edit</a>';

$btn = $btn.' <a href="javascript:void(0)" data-toggle="tooltip" data-id="'.$row->id.'" data-original-title="Delete" class="btn btn-danger btn-sm deleteProduct">Delete</a>';

return $btn;

})

->rawColumns(['action'])

->make(true);

}

return view('productAjax',compact('products'));

}

/**

* Store a newly created resource in storage.

*

* @param \Illuminate\Http\Request $request

* @return \Illuminate\Http\Response

*/

public  function store(Request $request)

{

Product::updateOrCreate(['id'  => $request->product_id],

['name'  => $request->name,  'detail'  => $request->detail]);

return response()->json(['success'=>'Product saved successfully.']);

}

/**

* Show the form for editing the specified resource.

*

* @param \App\Product $product

* @return \Illuminate\Http\Response

*/

public  function edit($id)

{

$product =  Product::find($id);

return response()->json($product);

}

/**

* Remove the specified resource from storage.

*

* @param \App\Product $product

* @return \Illuminate\Http\Response

*/

public  function destroy($id)

{

Product::find($id)->delete();

return response()->json(['success'=>'Product deleted successfully.']);

}

}

Ok, so after run bellow command you will find "app/Product.php" and put bellow content in Product.php file:

<?php

namespace  App;

use  Illuminate\Database\Eloquent\Model;

class  Product  extends  Model

{

protected $fillable =  [

'name',  'detail'

];

}

**Step 7: Add Blade Files**

In last step. In this step we have to create just blade file. so we need to create only one blade file as productAjax.blade.php file.

So let's just create following file and put bellow code.

<!DOCTYPE html>

Laravel 6 Ajax CRUD tutorial using Datatable - ItSolutionStuff.com

name="csrf-token"  content="{{ csrf_token() }}"

rel="stylesheet"  href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css"

href="https://cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css"  rel="stylesheet"

href="https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css"  rel="stylesheet"

src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js"

src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.js"

src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"

src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"

src="https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap4.min.js"

class="container"

Laravel 6 Ajax CRUD tutorial using Datatable - ItSolutionStuff.com

class="btn btn-success"  href="javascript:void(0)"  id="createNewProduct" Create New Product

class="table table-bordered data-table"

No

Name

Details

width="280px"Action

class="modal fade"  id="ajaxModel"  aria-hidden="true"

class="modal-dialog"

class="modal-content"

class="modal-header"

class="modal-title"  id="modelHeading"

class="modal-body"

id="productForm"  name="productForm"  class="form-horizontal"

type="hidden"  name="product_id"  id="product_id"

class="form-group"

for="name"  class="col-sm-2 control-label"Name

class="col-sm-12"

type="text"  class="form-control"  id="name"  name="name"  placeholder="Enter Name"  value=""  maxlength="50"  required=""

class="form-group"

class="col-sm-2 control-label"Details

class="col-sm-12"

id="detail"  name="detail"  required=""  placeholder="Enter Details"  class="form-control"

class="col-sm-offset-2 col-sm-10"

type="submit"  class="btn btn-primary"  id="saveBtn"  value="create"Save changes

type="text/javascript"

$(function  ()  {

$.ajaxSetup({

headers:  {

'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')

}

});

var table = $('.data-table').DataTable({

processing:  true,

serverSide:  true,

ajax:  "{{ route('ajaxproducts.index') }}",

columns:  [

{data:  'DT_RowIndex', name:  'DT_RowIndex'},

{data:  'name', name:  'name'},

{data:  'detail', name:  'detail'},

{data:  'action', name:  'action', orderable:  false, searchable:  false},

]

});

$('#createNewProduct').click(function  ()  {

$('#saveBtn').val("create-product");

$('#product_id').val('');

$('#productForm').trigger("reset");

$('#modelHeading').html("Create New Product");

$('#ajaxModel').modal('show');

});

$('body').on('click',  '.editProduct',  function  ()  {

var product_id = $(this).data('id');

$.get("{{ route('ajaxproducts.index') }}"  +'/'  + product_id +'/edit',  function  (data)  {

$('#modelHeading').html("Edit Product");

$('#saveBtn').val("edit-user");

$('#ajaxModel').modal('show');

$('#product_id').val(data.id);

$('#name').val(data.name);

$('#detail').val(data.detail);

})

});

$('#saveBtn').click(function  (e)  {

e.preventDefault();

$(this).html('Sending..');

$.ajax({

data: $('#productForm').serialize(),

url:  "{{ route('ajaxproducts.store') }}",

type:  "POST",

dataType:  'json',

success:  function  (data)  {

$('#productForm').trigger("reset");

$('#ajaxModel').modal('hide');

table.draw();

},

error:  function  (data)  {

console.log('Error:', data);

$('#saveBtn').html('Save Changes');

}

});

});

$('body').on('click',  '.deleteProduct',  function  ()  {

var product_id = $(this).data("id");

confirm("Are You sure want to delete !");

$.ajax({

type:  "DELETE",

url:  "{{ route('ajaxproducts.store') }}"+'/'+product_id,

success:  function  (data)  {

table.draw();

},

error:  function  (data)  {

console.log('Error:', data);

}

});

});

});

Now you can test it by using following command:

php artisan serve

Now you can open bellow URL on your browser:

Read Also:  [Laravel 6 Resize Image Before Upload Example](https://www.itsolutionstuff.com/post/laravel-6-resize-image-before-upload-exampleexample.html)

http://localhost:8000/ajaxproducts

You can download code from git:  [Download Code from Github](https://github.com/savanihd/Laravel-6-Ajax-CRUD-Tutorial)