---
layout: post
title: "Angular 9/8 How-To: Build a Material File Upload UI with MatProgressBar, MatButton , MatIcon and MatCard "
image: "images/content/angular-by-example-httpclient-get.png"
excerpt: "In this quick how-to tutorial, we'll see how to build a file/image uploading UI with Angular 9 Material components such as MatProgressBar, MatIcon, MatCard, and MatButton" 
tags : [angular, angular-how-tos, angular9, angular-9-ngfor-examples, angular-9-material-examples, angular-9-formdata-examples] 
---


In this quick how-to tutorial, we'll see how to build a file/image uploading UI with Angular 9 Material components such as `MatProgressBar`, `MatIcon`, `MatCard`, and `MatButton`.

If you are new to these how-tos, check out how to [install and set up a project and the prerequisites](https://www.techiediaries.com/angular-cli-tutorial/).

`ProgressBar` is a material component for displaying progress and activity. In our example, we'll use it to indicate the activity for uploading images with HttpClient. 

We'll only build the UI in this article, for building the service for actually uploading files, check out this [how-to tutorial]() instead.
 
## Step 1 — Generating an Angular Component

In the first step, run the following command to generate a component named home:

```bash
$ ng generate component home
```


## Step 2 — Importing Angular Material Components

In the second step, we need to import the modules of the required Angular Material components i.e `MatProgressBar`, `MatIcon`, `MatCard`, and `MatButton`. 
 
Go to the  `src/app/app.module.ts`  file and add the following imports:

```
import {   
  MatIconModule,  
  MatCardModule,  
  MatButtonModule,  
  MatProgressBarModule } from '@angular/material';
```


Next, you need to add the imported modules to the  `imports`  array as follows:

```
@NgModule({  
  declarations: [  
    AppComponent,  
    HomeComponent,  
    AboutComponent  
  ],  
  imports: [  
    BrowserModule,  
    AppRoutingModule,  
    HttpClientModule,  
    BrowserAnimationsModule,  
    MatToolbarModule,  
    MatIconModule,  
    MatButtonModule,  
    MatCardModule,  
    MatProgressBarModule  
  ],  
  providers: [],  
  bootstrap: [AppComponent]  
})  
export class AppModule { }
```

## Step 3 — Calling the Upload Service 
 
In this step, let’s implement the UI for uploading images to a server.

Go to the  `src/app/home/home.component.ts`  file, and start by adding the following imports:

```
import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';  
import { UploadService } from  '../upload.service';
```

Next, add the  `fileInput`  reference and  `files`  array and inject  the `UploadService` via the component constructor  as follows:

```
@Component({  
  selector: 'app-home',  
  templateUrl: './home.component.html',  
  styleUrls: ['./home.component.css']  
})  
export class HomeComponent implements OnInit {
    @ViewChild("fileInput", {static: false}) fileInput: ElementRef;
    files  = [];  
    constructor(private uploadService: UploadService) { }

```

Next, add the  `callUploadService()`  method as follows:

```ts
callUploadService(file) {  
    const formData = new FormData();  
    formData.append('file', file.data);  
    file.inProgress = true;  
    this.uploadService.upload(formData).pipe(  
      map(event => {  
        switch (event.type) {  
          case HttpEventType.UploadProgress:  
            file.progress = Math.round(event.loaded * 100 / event.total);  
            break;  
          case HttpEventType.Response:  
            return event;  
        }  
      }).subscribe((event: any) => {  
        if (typeof (event) === 'object') {  
          console.log(event.body);  
        }  
      });  
  }

```

We simply make a `FormData` instance and append our file to a `file` field. 

Please note that you can name the `file` field with any valid key name but you need be aware that you should use the same name in the backend  server for extracting the file data.

Next, we call the  `upload()`  method of  the `UploadService`.

Next, we need to add an  `upload()`  method for uploading multiple image files:

```ts
private upload() {  
    this.fileInput.nativeElement.value = '';  
    this.files.forEach(file => {  
      this.callUploadService(file);  
    });  
}

```

Next, add the  `onClick()`  method as follows:

```ts
onClick() {  
    const fileInput = this.fileInput.nativeElement;
    fileInput .onchange = () => {  
	    for (let index = 0; index < fileInput .files.length; index++)  
	    {  
		     const file = fileInput .files[index];  
		     this.files.push({ data: file, inProgress: false, progress: 0});  
	    }  
	      this.upload();  
    };  
    fileInput.click();  
}

```

## Step 4  — Creating the HTML Template with Material Icon, Card, Button, and ProgressBar Components

 
In this step, we'll buid the HTML template for uploading files. 

Go to the  `src/app/home/home.component.html`  file and add the following markup:

```html
<div><mat-card>  
        <mat-card-content>  
            <ul>  
                <li *ngFor="let file of files">  
                    <mat-progress-bar [value]="file.progress"></mat-progress-bar>  
                    <span id="file-label">  
                          
                    </span>  
                </li>  
            </ul>  
        </mat-card-content>  
        <mat-card-actions>  
            <button mat-button color="warn" (click)="onClick()">  
                <mat-icon>file_upload</mat-icon>  
                Upload  
            </button>  
        </mat-card-actions>  
    </mat-card><input type="file" #fileInput id="fileUpload" name="fileUpload" multiple="multiple" accept="image/*" style="display:none;" /></div>
```

We [loop over the files using the `ngFor` directive](https://www.techiediaries.com/angular-ngfor/).

## Conclusion

In this how-to post, we've seen how to build an UI for uploading multiple files with Angular Material components such as `MatProgressBar`, `MatIcon`, `MatCard`, and `MatButton`.
