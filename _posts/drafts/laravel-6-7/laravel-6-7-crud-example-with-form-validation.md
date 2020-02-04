How to use Ajax form validation in Laravel 6
Originally published at https://itsolutionstuff.com
Form validation is a basic requirement of any form. We should implement validation even if you use Ajax or simple form. But if you are working with Jquery Ajax then you can use also server side validation using Laravel and display error messages on front side.

You can simply use Laravel 6 validation like required, email, same, unique, date, integer etc using Jquery Ajax post, get, put or delete request. We will use Validator make function for create validation and check using passes() function.

In this example i will show you how to use Laravel default validation with Jquery Ajax. Here we also print Laravel validation message when false. So if you want to ajax form validation in Laravel app then you are right place.

Just follow bellow step to create ajax validation example:

Step 1: Add Route

In first step we will create new two routes for demo. so open your routes/web.php file and add following route.

routes/web.php

Route::get('my-form','HomeController@myform');
Route::post('my-form','HomeController@myformPost')->name('my.form');

Step 2: Create Controller

In this point, now we should create new controller as HomeController. So run bellow command and create new controller.

php artisan make:controller HomeController

After bellow command you will find new file in this path app/Http/Controllers/HomeController.php.

In this controller we will write three method for ajax view and post as listed bellow methods:

1) myform()

2) myformPost()

So, let's copy bellow code and put on HomeController.php file.

app/Http/Controllers/HomeController.php

<?php
namespace App\Http\Controllers;


use Illuminate\Http\Request;

use Validator;


class HomeController extends Controller

{


/**
 * Display a listing of the myform.
 *
 * @return \Illuminate\Http\Response
 */
public function myform()
{
	return view('myform');
}
 
/**
 * Display a listing of the myformPost.
 *
 * @return \Illuminate\Http\Response
 */
public function myformPost(Request $request)
{
 
	$validator = Validator::make($request-&gt;all(), [
        'first_name' =&gt; 'required',
        'last_name' =&gt; 'required',
        'email' =&gt; 'required|email',
        'address' =&gt; 'required',
    ]);
 
    if ($validator-&gt;passes()) {
        return response()-&gt;json(['success'=&gt;'Added new records.']);
    }
 
    return response()-&gt;json(['error'=&gt;$validator-&gt;errors()-&gt;all()]);
}

}



Read Also: Laravel 6 Release New Features and Upgrade

Step 3: Create View File

In Last step, let's create myform.blade.php(resources/views/myform.blade.php) for layout and we will write design code and jquery ajax code,so put following code:

resources/views/myform.blade.php

<!DOCTYPE html>

<html>

<head>

<title>Laravel 6 Ajax Validation Example - ItSolutionStuff.com</title>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css" />

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js"></script>

</head>

<body>
<div class="container">

<h2>Laravel 6 Ajax Validation - ItSolutionStuff.com</h2>


&lt;div class="alert alert-danger print-error-msg" style="display:none"&gt;
    &lt;ul&gt;&lt;/ul&gt;
&lt;/div&gt;
   
&lt;form&gt;
    {{ csrf_field() }}
    &lt;div class="form-group"&gt;
        &lt;label&gt;First Name:&lt;/label&gt;
        &lt;input type="text" name="first_name" class="form-control" placeholder="First Name"&gt;
    &lt;/div&gt;
   
    &lt;div class="form-group"&gt;
        &lt;label&gt;Last Name:&lt;/label&gt;
        &lt;input type="text" name="last_name" class="form-control" placeholder="Last Name"&gt;
    &lt;/div&gt;
   
    &lt;div class="form-group"&gt;
        &lt;strong&gt;Email:&lt;/strong&gt;
        &lt;input type="text" name="email" class="form-control" placeholder="Email"&gt;
    &lt;/div&gt;
   
    &lt;div class="form-group"&gt;
        &lt;strong&gt;Address:&lt;/strong&gt;
        &lt;textarea class="form-control" name="address" placeholder="Address"&gt;&lt;/textarea&gt;
    &lt;/div&gt;
   
    &lt;div class="form-group"&gt;
        &lt;button class="btn btn-success btn-submit"&gt;Submit&lt;/button&gt;
    &lt;/div&gt;
&lt;/form&gt;

</div>


<script type="text/javascript">


$(document).ready(function() {
    $(".btn-submit").click(function(e){
        e.preventDefault();
   
        var _token = $("input[name='_token']").val();
        var first_name = $("input[name='first_name']").val();
        var last_name = $("input[name='last_name']").val();
        var email = $("input[name='email']").val();
        var address = $("textarea[name='address']").val();
   
        $.ajax({
            url: "{{ route('my.form') }}",
            type:'POST',
            data: {_token:_token, first_name:first_name, last_name:last_name, email:email, address:address},
            success: function(data) {
                if($.isEmptyObject(data.error)){
                    alert(data.success);
                }else{
                    printErrorMsg(data.error);
                }
            }
        });
   
    }); 
   
    function printErrorMsg (msg) {
        $(".print-error-msg").find("ul").html('');
        $(".print-error-msg").css('display','block');
        $.each( msg, function( key, value ) {
            $(".print-error-msg").find("ul").append('&lt;li&gt;'+value+'&lt;/li&gt;');
        });
    }
});

</script>


</body>

</html>



Now we are ready to run our example so run bellow command for quick run:

php artisan serve

Now you can open bellow URL on your browser:

Read Also: Laravel 6 Authentication Tutorial

http://localhost:8000/my-form