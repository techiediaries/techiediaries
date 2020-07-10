---
layout: post
title: "How to Post/Upload FormData (multipart/form-data) with Angular 10, TypeScript and HttpClient"
image: "images/content/angular-by-example-httpclient-get.png"
excerpt: "In this quick tutorial, you'll learn how to work with FormData in Angular 10/9 and how to post it to a web server via a POST request and HttpClient" 
date: 2020-07-10
tags : [angular, formdata, angular-9, angular-how-tos, angular-9-httpclient-examples, angular-9-formdata-examples] 
---

![Angular FormData](https://www.techiediaries.com/images/angular-formdata.png)

In this quick how-to tutorial, you'll learn how to work with [`FormData` in Angular 10 and TypeScript](https://www.techiediaries.com/angular/upload-images-typescript-node-ionic-imports-decorators-async-await-formdata/) and how to post it to a web server via a POST request and `HttpClient`. 

One of the most important aspects of web development is forms as they allow you to collect data from users and upload it to servers.

If you are new to these how-tos, check out how to [install and set up a project and the prerequisites](https://www.techiediaries.com/angular-cli-tutorial/).

There are various ways to work with forms in JavaScript and HTML. Also different frameworks (such as Angular) added other ways to handle forms. 

In this tutorial, we'll be looking at `FormData`, A browser API for handling forms data just like its name suggests. This API provides methods and properties that enable you to have access and work with form elements and their values in a straightforward way.

It's particularly helpful if you are working with client side frameworks like Angular as it allows you to easily prepare form data to be sent with POST HTTP requests.
 

> **Note**: You can think of [FormData](https://www.techiediaries.com/formdata/) as a representation of an HTML form in JavaScript instead of HTML. 
>
> You also can create a FormData instance from an HTML form. 


The `FormData` API allows you to create a set of key/value elements that correspond to form fields and their values. This can be then sent to the server using [Angular HttpClient](https://www.techiediaries.com/angular/angular-9-8-tutorial-by-example-rest-crud-apis-http-get-requests-with-httpclient/). 

> **Note**: A [FormData](https://www.techiediaries.com/formdata/) instance is equivalent to an HTML form sent using the `multipart/form-data` encoding. 

## How to use FormData in Angular 10?

Let's now see an example of how you can create a `FormData` instance and send it with `HttpClient` POST in Angular 10.

> **Note**: We assume that you have a server running at the `http://localhost:3000` address with an `/upload` that accepts POST requests for uploading files in your server.
>
> If you would like to create a server for uploading files, check out [Nest.js Tutorial: File Uploading with Multer and Serving Static Files in Nest](https://www.techiediaries.com/nestjs-upload-serve-static-file/).

Provided that you have [created an Angular 10 project with Angular CLI](https://www.techiediaries.com/angular-cli-tutorial/), navigate to your project's root folder and run the following command to generate a component that we'll be working with:

```bash
$ ng generate component upload
```

Open the `src/app/upload/upload.component.html` file and add the following form:

```html
<h1>Angular 10 FormData (multipart/data-form) Example</h1>
<div>
    <form [formGroup] = "uploadForm" (ngSubmit)="onSubmit()">      
      <div>
        <input type="file" name="profile" (change)="onFileSelect($event)" />
      </div>
      <div>
        <button type="submit">Upload</button>
      </div>
    </form>
  </div>
</div>
```

You can also check this example with [HTML textarea](https://www.techiediaries.com/angular/textarea-keydown-focusin-events/).

Next, open the `src/app/upload/upload.component.ts` file and start by [importing these modules](https://www.techiediaries.com/es-modules-import-export-default/):

```ts
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
```

We import `FormBuilder` and `FormGroup` from the `@angular/forms` package which are necessary to create a reactive form in Angular. We also import `HttpClient` that will be used to send data to the server.

> **Note**: Make sure to import `ReactiveFormsModule` and `HttpClientModule` in your main module application which exists in the `src/app/app.module.ts` file and add them to the `imports` array.
> 
> Using `HttpClient` calls directly from your components is against the separation of concerns principle but this is just a simple example. Typically, you would need to create a service and make `HttpClient` from the service.  

Next define the `SERVER_URL` and `uploadForm` variables in your component:

```ts
export class UploadComponent implements OnInit {

  SERVER_URL = "http://localhost:3000/upload";
  uploadForm: FormGroup;  
```

Next, import and inject `HttpClient` and `FormBuilder`:

```ts
export class UploadComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) { }
```



Next, create a reactive form in [`ngOnInit()` method of the component](https://www.techiediaries.com/angular/unsubscribe-rxjs-subjects-ondestroy-oninit-changedetectorref/) which gets called when the component is initialized:

```ts
  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }
```

Next, let's add the `onFileSelect()` method which gets called when a [file is selected](https://www.techiediaries.com/angular/ui-guards-auto-scrolling-filereader-ionic/) by the user:

```ts
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }
  }
```

We simply check if at least one file is selected and we set the `profile` field of `uploadForm` to the selected file.

Finally, let's see how we can use `FormData` to send `multipart/form-data` to our server. Let's define the `onSubmit()` method:

```ts
  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);

    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
```

We simply create an instance of `FormData`, next we add fields with their values using the `append()` method of `FormData`. In our example, we only add a field named `file` which holds the value the selected file. Finally we use the `post()` method of `HttpClient` to send the form data to the server.

For reference, `FormData` provides the following methods for working with form data:

- The `FormData.append()` appends a new value for an existing key, or adds the key if it does not exist.
- The `FormData.delete()` method deletes a key/value pair from a  `FormData`  object.
- The `FormData.entries()`method provides an iterator for going through all key/value pairs of the instance. 
- The `FormData.get()` method Returns the first value associated with a given key from within a  `FormData`  object.
- The `FormData.getAll()` method provides an array of all the values associated with a specific key.
- The `FormData.has()` methods provides a boolean indicating whether a `FormData` instance contains a specific key.
- The `FormData.keys()` method provides an iterator for going through all the keys contained in the form instance.
- The `FormData.set()`method sets a new value for an existing key inside a `FormData` object, or adds the key/value if it does not exist.
- The `FormData.values()` method provides an iterator for going through all values contained in this object.

## Conclusion

In this tutorial, we've seen how to send post multi-part form data to a server using [TypeScript, Angular 10](https://www.techiediaries.com/typescript-tutorial/), HttpClient and `FormData`.  



 


