# PHP Image/File Upload Tutorial and Example [FormData and Angular 7 Front-End]

In this tutorial, you'll learn how you can upload files in your PHP web application. We'll not use any framework but plain PHP.

Next, we'll see how we can use Angular 7 to create a frontend that provides a form for uploading an image file to the backend using `FormData` and `HttpClient`. We'll be also looking at how to create a reactive form with Angular.

File upload is a common feature that you need to implement in many web applications so in this guide we'll see step by step how you can create a PHP application that exposes an `/upload.php` endpoint that accepts POST requests with a `multipart/form-data` containing the file data.
 
If you are ready, let's  get started!

Start by creating a folder for your project's files. Open a new terminal, go to your working directory and create a folder:

```bash
$ cd ~
$ mkdir php-file-upload
``` 

Next, navigate inside your project's folder and create an `upload.php` file:

```bash
$ cd php-file-upload
$ touch upload.php
```

Using your favorite code editor open the `upload.php` file and follow the steps to implement file uploading.

When a user sends a file to the `/upload.php` endpoint, the file gets uploaded to a temporary folder. Also the information about the sent file is stored in the special `$_FILES` array. You can access the information about your file by using the value assigned to the name attribute of the input field of the sent form i.e `<input type='file' name="avatar">` (in this case it's **avatar**).


You can also access more information like the name, temporary name and error using the following PHP code:

```php
<?php 
$avatar_name = $_FILES["avatar"]["name"];
$avatar_tmp_name = $_FILES["avatar"]["tmp_name"];
$error = $_FILES["avatar"]["error"];
?>
```

After sending the file to your server, It will be uploaded to the temporary folder. You can then use the `move_uploaded_file()` method to move the file from the temporary location to a chosen location that you use for saving the uploaded files in your server.

Let's start by adding the following headers to our `upload.php` file:

```php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
```

The first header set the content type as `application/json` and `charset` as `utf-8`. 

The second header is used to enable CORS for all domains. This means our server will accept request from any domain. This is not recommended in production, you should only allow code hosted in your domain or a specific domain to send requests to your server.

The last header sets the allowed methods which are PUT, GET and POST.  

Next, define the following variables:

```php
$response = array();
$upload_dir = 'uploads/';
$server_url = 'http://127.0.0.1:8000';
```  

- The `$response` variable will hold the HTTP response that will be sent back to the client after uploading a file.
- The `$upload_dir` variables contains the folder where the file will be uploaded.
- The `$server_url ` contains the address of our server.

Next, add an if statement that checks if the `$_FILES` array contains an object with avatar key which will be available only if the user sends a form with file field named `avatar` or a `FormData` object with field named `avatar`:

```php
if($_FILES['avatar'])
{
	// code will be added here.
}else{
    $response = array(
        "status" => "error",
        "error" => true,
        "message" => "No file was sent!"
    );
}

echo json_encode($response);
```

We return the response back to the client after encoding it in JSON format using the `json_encode()` method.

Next, in the `if` statement and if the `$_FILES['avatar']` is defined, add the code that follows. First define the following variables:

```php
    $avatar_name = $_FILES["avatar"]["name"];
    $avatar_tmp_name = $_FILES["avatar"]["tmp_name"];
    $error = $_FILES["avatar"]["error"];
```



Next, check if the `$error` variable contains a value greater than `0` which indicates that there is an error:

```php
    if($error > 0){
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "Error uploading the file!"
        );
    }else 
    {
	    // The rest of your code will be added here.
	}
``` 

Finally add the following code if there is no error:

```php
        $random_name = rand(1000,1000000)."-".$avatar_name;
        $upload_name = $upload_dir.strtolower($random_name);
        $upload_name = preg_replace('/\s+/', '-', $upload_name);
    
        if(move_uploaded_file($avatar_tmp_name , $upload_name)) {
            $response = array(
                "status" => "success",
                "error" => false,
                "message" => "File uploaded successfully",
                "url" => $server_url."/".$upload_name
              );
        }else
        {
            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "Error uploading the file!"
            );
        }
```

We first, create a new name for the file by concatenating a random number with a hyphen and the origin name. Next, we lowercase the random name and we concatenate with the upload folder path. Next we replace any spaces with the hyphen character. After preparing the full path for the file, we use the   `move_uploaded_file()` to move the temporary name to the `uploads` directory and save it with the new name. If the `move_uploaded_file()` returns successfully we create a response object indicating success. Otherwise we create a response object indicating a failure with the `Error uploading the file!` message.

This is the full content of the file upload script:

<script src="https://gist.github.com/techiediaries/63ff058114e473d4ebaadce294ce09d5.js"></script>  

Next, you need to create the `uploads` folder inside your project's root folder:

```bash
~/demos/php-file-upload$ mkdir uploads
```

You can now serve your PHP script using the following command from the root of your project's folder:

```bash
~/demos/php-file-upload$ php -S 127.0.1:8000
```

Using a REST client (like Postman) you can send a POST request with `multipart/form-data` to your `/upload.php` endpoint:

![PHP Upload File Example](https://i.imgur.com/5fpIrha.png) 

> **Note**: Make sure to name the file field as `avatar` because this is the name our server expects to contain the file (You are free to change it of course but also change it in the code `$_FILES['avatar']`)

## Create an Angular 7 Front-End

Let's now see how we can create a simple Angular 7 front-end for uploading a image/file to our PHP endpoint using `FormData` and `HttpClient`.

> **Note**: You should have Node.js and NPM installed on your system because they are required by Angular CLI which you can simply install using `npm install -g @angular/cli`. 

Open a new terminal and run the following command to create a project using Angular CLI:

```bash
$ ng new frontend
```

The CLI will prompt you if you would like to add routing, type **y**. And which stylesheets format you want to use in your project, Choose **CSS**.

Hit **Enter** for the CLI to start generating the project's files and folders and installing the required dependencies from npm.

When done, navigate inside your project's root folder and run the following to serve your application:

```bash
$ cd ./frontend
$ ng serve
```

Your Angular application will be available from the `http://localhost:4200` address.

### Importing HttpClient and Forms Modules
 
 Let's now import `HttpClientModule` and `ReactiveFormsModule` in our app module. Open the `src/app/app.module.ts` file and change accordingly:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

You can now use reactive forms and `HttpClient` in your application.

### Create an Uploading Service

Next, let's create a service that encapsulates the necessary code for uploading files to the PHP server. 

Open a new terminal and run the following code from the root of your project's root folder:

```bash
$ ng generate service upload
```

Open the `src/app/upload.service.ts` file and the following imports:

```ts
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { map } from  'rxjs/operators';
``` 
Next, define the `SERVER_URL` variable which contains the address of the PHP upload server and also inject `HttpClient`:

```ts
@Injectable({
  providedIn: 'root'
})
export class UploadService {

  SERVER_URL: string = "http://127.0.0.1:8000/";
  
  constructor(private httpClient: HttpClient) { }
}
```

Next, add the `uploadFile()` method which simply sends a POST request with a `FormData` instance to the `/upload` endpoint of the PHP server:

```ts
  public uploadFile(data) {
    let uploadURL = `${this.SERVER_URL}/upload.php`;
    return this.httpClient.post<any>(uploadURL, data);
  }
```

## Creating an Angular Component

Let's now create a component which contains the form that will be used to upload the image file to the server. 

In your terminal, run the following command to generate a component:

```bash
$ ng generate component profile
```

Open the `src/app/app-routing.module.ts` file and add a `/profile` route for accessing the component:

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

Next, open the `src/app/profile/profile.component.ts` file and add the following imports:

```ts
import { FormBuilder, FormGroup } from  '@angular/forms';
import { UploadService } from  '../upload.service';
```


Next, define a `form` instance of `FormGroup` and `uploadResponse` object that will hold the response. Also inject `FormBuilder` and `UploadService` via the component constructor:

```ts
export class ProfileComponent implements OnInit {

  form: FormGroup;
  uploadResponse;

  constructor(private formBuilder: FormBuilder, private uploadService: UploadService) { }
```

On the `ngOnInit()` method of the component, create a reactive form using:

```ts
  ngOnInit() {
    this.form = this.formBuilder.group({
      avatar: ['']
    });
  }
```

We use `FormBuilder` to create a top-level form group that contains one field called `avatar`.

Next, add the `onFileSelect()` method that will be called when a file is selected from interface triggered by the file input file:

```ts
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('avatar').setValue(file);
    }
  }
```

If the user has selected at leas one file, we grab that file and we set it as a value of to the `avatar` field of our reactive form using the `setValue()` method.

Finally, we add the `onSubmit()` method that will be called when the user submits the form:

```ts
  onSubmit() {
    const formData = new FormData();
    formData.append('avatar', this.form.get('avatar').value);

    this.uploadService.uploadFile(formData).subscribe(
      (res) => {
        this.uploadResponse = res;
          console.log(res);
      },
      (err) => {  
        console.log(err);
      }
    );
  }
```

We create an instance of `FormData` then we use the `append()` method of the instance to add a key/value pair. the key is the name of the field. In our case it needs to be `avatar` since this is where the PHP script expects to find the uploaded file. Finally we simply call the `uploadFile()` method with the form data that will be posted to the server as an argument and we subscribe to the returned Observable to actually send the POST request. 

We assign the result to the `uploadResponse` variable.

> **Note**: `FormData` is a data structure that correspond to an HTML form with the `multipart/form-data` type.

Finally, open the `src/app/profile/profile.component.html` file and add the following code:

```html
<h1>PHP with Angular 7 File Upload Example</h1>
<div>
  <div *ngIf="uploadResponse && uploadResponse.status === 'error'">
    {{ uploadResponse.message }}
  </div>
  <div *ngIf="uploadResponse && uploadResponse.status === 'success'">
    <img [src]='uploadResponse.url' />
  </div>

  <form [formGroup]="form" (ngSubmit)="onSubmit()">

    <input type="file" name="avatar" (change)="onFileSelect($event)" />
    <button type="submit">Upload</button>

  </form>
</div>
```

We use the `formGroup` directive to bind our reactive form to the `<form>` tag. We bind the `onSelect()` method to the `ngSubmit` event of the form and the `onFileSelect()` method to the `change` event of the file input field.

If the response is successful, we display the uploaded image with an `<img>` tag. If there is an error, we simply display the message.

This is a screenshot of the interface after successfully upload the image file to the PHP server:

![PHP with Angular 7 Image File Upload Example](https://i.imgur.com/CG1Onk6.png)
 
## Conclusion

In this tutorial, we started by implementing file uploading in PHP by creating a simple script that exposes an `/upload.php` endpoint which accepts POST requests with file data and we enabled CORS to allow requests from different domains.

In the second part, we have seen how to create an Angular 7 frontend which provides a form to upload image files to our PHP server.

We used `FormData` and `HttpClient` to send the form data to the server and we used the reactive form approach to create a simple form and bind it to the  HTML `<form>` tag. 

php file upload tutorial
