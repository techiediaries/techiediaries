---
layout: post
title: "Upload Images In TypeScript/Node & Angular 9/Ionic 5: Working with Imports, Decorators, Async/Await and FormData"
image: "images/content/angular.png"
excerpt: "In this tutorial part, we'll learn to customize/upload user profile photos. We assume no previous knowledge of TypeScript which is the programming language used in both Ionic/Angular and Node/Nest.js used to build both the front-end and back-end of our chat application. We'll be also explaining basic concepts such as imports, decorators, Async/Await and HTML5 FormData" 
categories: angular
date: 2020-06-06
tags : [angular]
---

![Angular 9 and Ionic 5 Chat App](https://www.techiediaries.com/images/angular-chat-tutorial.png)

In this tutorial part, we'll learn to customize/upload user profile photos. We assume no previous knowledge of TypeScript which is the programming language used in both Ionic/Angular and Node/Nest.js used to build both the front-end and back-end of our chat application. We'll be also explaining basic concepts such as imports, decorators, Async/Await and HTML5 [FormData](https://www.techiediaries.com/formdata/).

These are all the tutorial parts:

- [Building a Chat App with TypeScript/Node.js, Ionic 5/Angular 9 & PubNub/Chatkit](https://www.techiediaries.com/angular/typescript-node-ionic-chat/)
- [Add JWT REST API Authentication to Your Node.js/TypeScript Backend with TypeORM and SQLite3 Database](https://www.techiediaries.com/angular/jwt-rest-api-auth-node-typescript-typeorm-database/)
- [Building Chat App Frontend UI with JWT Auth Using Ionic 5/Angular 9](https://www.techiediaries.com/angular/ionic-chat-ui-jwt-auth/)
- [Adding UI Guards, Auto-Scrolling, Auth State, Typing Indicators and File Attachments with FileReader to your Angular 9/Ionic 5 Chat App](https://www.techiediaries.com/angular/ui-guards-auto-scrolling-filereader-ionic/)
- [Chat Read Cursors with Angular 9/Ionic 5 Chat App: Working with Textarea Keydown/Focusin Events](https://www.techiediaries.com/angular/textarea-keydown-focusin-events/)
- [Angular 9/Ionic 5 Chat App: Unsubscribe from RxJS Subjects, OnDestroy/OnInit and ChangeDetectorRef](https://www.techiediaries.com/angular/unsubscribe-rxjs-subjects-ondestroy-oninit-changedetectorref/)
- Upload Images In TypeScript/Node & Angular 9/Ionic 5: Working with Imports, Decorators, Async/Await and FormData
- [Private Chat Rooms in Angular 9/Ionic 5: Working with TypeScript Strings, Arrays, Promises, and RxJS Behavior/Replay Subjects](https://www.techiediaries.com/angular/typescript-strings-arrays-promises-rxjs-behavior-replay-subjects/)


If you are a TypeScript beginner, you'll also learn throughout this tutorial how to use basic concepts of the language such as:

- How to define TypeScript class methods,
- How to define TypeScript class variables.
- How to use TypeScript decorators, which are heavily used by both Angular and Nest.js,
- How to import APIs from TypeScript modules, 
- How to use the async/await syntax in TypeScript, 
- How to use HTML [FormData in TypeScript](https://www.techiediaries.com/typescript-formdata-example-queryselector-onsubmit/), etc.

You'll learn about new concepts in Node/Nest.js, Angular and Ionic.

Before getting started, let's see a summary of what we are going to learn throughout this tutorial. We'll learn about:

- How to upload profile photos or images with Node, Nest.js, TypeScript, Angular 9 and Ionic 5,
- How to implement image files uploading in our Node/Nest.js backend with Multer, Multer is a middleware that supports the `multipart/form-data` encoding type only, that's mainly used for uploading files in the web.
- How to upload a single file by using the `FileInterceptor()` and `@UploadedFile()` TypeScript decorators, and then access the file from the `file` property in the `request` object in Node/Nest.js. 
- How to use the `sendFile()` method (which is supported in Express v4.8.0+) provided by the injected response object that transfers a file at the given `path` (passed as the first argument) and sets the `Content-Type` response HTTP header field based on the filename’s extension. 
- How to import and use the `Get`, `Res` and `Param` custom TypeScript decorators from the `@nestjs/common` package. Decorating a TypeScript method with the `@Get()` decorator allows Node/Nest.js to create a REST API endpoint for a particular route path and map every corresponding HTTP request to the method. The `@Param` decorator allows you to access the value of a route parameter passed through the URL. The `@Res()` decorator allows you to inject a library-specific `response` object. You can find more details about it from the [E](http://expressjs.com/en/api.html)[xpress](http://expressjs.com/en/api.html) [docs](http://expressjs.com/en/api.html). 
- How to create a REST API route to enable our Node/Nest.js  application to serve static files from an `uploads` folder.
- How to create a chat profile page in the Angular/Ionic 5 frontend.
- How to use use the `async`  keyword with the  Angular `ngOnInit()` life-cycle method to be able to use the `await`  keyword in the body of the method.
- How to create an Angular form and bind the `ngSubmit` event to our `uploadAvatar()` method that will be called when the users click on the submit button. The `uploadAvatar()` method takes a reference to the form created using a template reference variable (`#f="ngForm"`).
- How to bind an `attachFile()` TypeScript method to the `change` event of the HTML file input tag which will be called when the user clicks the **Choose File** button to select a file.
- How to build an Ionic 5/Angular 9 chat profile UI.
- How to import and inject Angular 9 `HttpClient` and Ionic 5 Storage services for sending HTTP requests and accessing the device or web browser storage.       
- How to retrieve the currently logged-in user ID from `localStorage` with Ionic 5 Storage.
- How to add the TypeScript method that actually uploads the selected file to the Node.js server along with the currently logged in user using an Angular `HttpClient` post request and HTML5 `FormData`.
- How to add an Ionic 5 button that will allow users to navigate to the profile page via the Angular `routerLink` directive.

This tutorial is based on the Angular 9 and Ionic 5 application we’ve built in the previous series. You can get the source code of this part from this [GitHub repository](https://github.com/techiediaries/chatkit-profiles-read-cursors).


> Note: Chatkit is the hosted chat service provided by Pusher which is now retired. You can either use your own hosted chat server with an open source solution like [https://chatsdk.co/](https://chatsdk.co/) which is based on Firebase or use PubNub Chat, an alternative service for Chatkit.


In the previous tutorials, we’ve started building a mobile application with Ionic 5 and Angular 9 on the frontend and Node Nest.js on the backend. For chat features, we’ve used Pusher Chatkit which provides out of the box chat features commonly used in most popular chat apps. We’ve added features like typing indicators and file attachments. Now, we’ll proceed with our demo application by implementing other functionalities such as read cursors and profile photos.


> **Note**: You can read the previous tutorials where we’ve built our demo chat application from these links:
> 
> [Building a Chat App with Node.js, TypeScript, Ionic 5, and Angular 9: The Auth Backend](https://www.techiediaries.com/angular/node-typescript-chat-auth-backend/)
> [Building a Chat App with Node.js, TypeScript, Ionic 5, and Angular 9: The Frontend](https://www.techiediaries.com/angular/node-typescript-chat-frontend/)
> [Adding Profile Photos and Read Cursors to your Ionic 5/Angular 9 Chat App](https://www.techiediaries.com/angular/ionic-chat-frontend-profile photos-read-cursors/)
> [Adding Authentication, Typing indicators and File Attachments to your Ionic 5/Angular 9 Chat App](https://www.techiediaries.com/angular/ionic-chat-auth-typing-indicators-file-attachments/)

TypeScript provides various ways for imports. When the module exports an object with properties, you can use the `import * as mymodule from "mymodule";` syntax or or pick the names you want to import using `import { symbol } from "mofule";`


Both Angular and Nest.js are based on TypeScript so you'll be using the same `import` syntax for importing the built-in APIs of the frameworks before you can call them in your code.
 
## Uploading Profile Photos with Node, TypeScript, Angular 9 and Ionic 5

Most chat applications provide a way for users to add a profile photo. Chatkit allows you to assign profile photos to users but doesn’t provide storage so you need to upload images to your own Node/Nest.js server.

### Implementing Image Files Uploading in the Node Nest.js Backend with Multer

Node Nest.js  uses the [multer](https://github.com/expressjs/multer) middleware for supporting file uploading. The middleware can be configured and adjusted depending on your requirements.


> **Note**: Multer is a middleware that works only with the `multipart/form-data` encoding type, which is primarily used for uploading files.

You can upload a single file by using the `FileInterceptor()` and `@UploadedFile()` decorators, and you can then access the file from the `file` property in the `request` object. Let’s see this by example.

Open the `src/auth/auth.service.ts` file and add the following method:


       // src/auth/auth.service.ts
     
       public async updateUserAvatar(userData: any): Promise<any>{
          const userId = userData.userId;
          const avatarURL = userData.avatarURL;
          return this.chatkit.updateUser({id:userId, avatarURL:avatarURL});
        }

This TypeScript method will be used to update the user avatar. It simply calls the `updateUser()` method available in the `chatkit` instance which takes an object that provides the ID of the user and the avatar URL.

### Serving Static Files from our Node/Nest.js Backend

Next, open the `src/app.controller.ts` file and add the imports for the `Get`, `Res` and `Param` TypeScript decorators from the `@nestjs/common` package:


    // src/app.controller.ts
    
    import { Get, Post, Body,Request, Res, Param, Controller} from '@nestjs/common';


> **Note**: the other symbols are already imported from the previous tutorials.


Next, add the following imports which are necessary for file uploading:


    // src/app.controller.ts
    
    import { UseInterceptors, FileInterceptor, UploadedFile } from '@nestjs/common';

Next, import `diskStorage` from the `multer` package and `extname` from the `path` module:


    // src/app.controller.ts
    
    import { diskStorage } from 'multer';
    import { extname } from 'path';

 
 Next, add the following route:
 

      // src/app.controller.ts
    
      @Get('uploads/:imgId')
      async uploads(@Param('imgId') imgId, @Res() res): Promise<any> {
        res.sendFile(imgId, { root: 'uploads'});
      }

 
The `@Get()` decorator before the `uploads()` method tells Node/Nest.js to create an endpoint for this particular route path and map every corresponding request to this handler. 

The `@Param` decorator allows us to get the value of the `imgId` parameter passed through the URL.

The `@Res()` decorator allows us to inject a library-specific `response` object. You can find more details about it from the [E](http://expressjs.com/en/api.html)[xpress](http://expressjs.com/en/api.html) [docs](http://expressjs.com/en/api.html). 

The injected response object provides the `sendFile()` method (which is supported in Express v4.8.0+) that transfers a file at the given `path` (passed as the first argument) and sets the `Content-Type` response HTTP header field based on the filename’s extension. 

Since we specified the `root` option in the options object (passed as the second argument), the  `path` argument can be a relative path to the file (In our case it’s just the name of the file).  In our example, the file will be transferred from the `uploads` folder. 


This route will allow our Node/Nest.js  application to serve static files from an `uploads` folder.

Now, let’s test if our application is serving files correctly. In the root folder of your Node server, create an `uploads` folder:


    mkdir uploads 


> **Note:** If you don’t manually create this folder it will automatically be created by Node/Nest.js  but in our case we need to add our user default avatar to this folder that’s why we are manually creating it.

### Setting the Default Profile Image File
   
Next, add the default user avatar that we used before from the [https://image.flaticon.com/icons/png/128/149/149071.png](https://image.flaticon.com/icons/png/128/149/149071.png) link in the `uploads` folder (save it as `avatar.png`).
 
Next, open the `src/app/auth/auth.service.ts` file, locate the `createUser()` method and change the default value of the `avatarURL` variable to point to our `avatar.png` image in our server:
 

    // src/app/auth/auth.service.ts
    
    const avatarURL = "http://127.0.0.1:3000/uploads/avatar.png";

 
 Now, we are serving the default avatar from our server.
 
At this point, if you test both your frontend and backend apps, you should be able to see the default avatar assigned to new users in your application:
 

![](https://d2mxuefqeaa7sj.cloudfront.net/s_468DBFC342AD25E2619B4E2B6963F24E9CB7436BAA605239964DFA0404E7DCBC_1551219104631_Screenshot+from+2019-02-26+22-11-27.png)
### Adding a Node/Nest.js Route for Uploading Image Files 
 
 Now that we are able to serve static image files from our backend application, let’s add the route for allowing users to update their profile photos.
 
 Open the `src/app.controller.ts` file and add the following route:
 

      // src/app.controller.ts
    
      @Post('avatar')
      @UseInterceptors(FileInterceptor('file',
        {
          storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
              const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
              return cb(null, `${randomName}${extname(file.originalname)}`)
            }
          })
        }
      )
      )
      uploadAvatar(@Body() userData, @UploadedFile() file) {
        let userId = userData.userId;
        this.authService.updateUserAvatar({
          userId: userId,
          avatarURL: `${this.SERVER_URL}${file.path}`
        });
        return {
          avatarURL:  `${this.SERVER_URL}${file.path}`
        };
      }

  
This allows you to send a POST request to the `127.0.0.1:3000/avatar` endpoint from the frontend application to update the profile photo.
 
The TypeScript `uploadAvatar()` method is mapped to the `/avatar` API endpoint and accepts POST requests which contain the user identifier and the uploaded file. In the body of the method, we simply call the TypeScript `updateUserAvatar()` method defined in `AuthService` to update the user avatar with the URL of the uploaded image.

Also in your controller add the TypeScript `SERVER_URL` variable which holds the address of your server:


    // src/app.controller.ts
    
    SERVER_URL = 'http://localhost:3000/';  

  
## Adding the Profile Page in the Angular 9/Ionic 5 Frontend
 
After implementing file uploading in the backend, let’s now add a profile page in our Angular 9/Ionic 5 application which allows users to upload their profile image avatars to the server.
 
Open a new terminal and navigate to your `frontend` folder using:
 

    $ cd chatkit-ionic-demo/frontend

Next, generate a new Ionic page using the following command:


    $ ionic generate page profile

This will create a `src/app/profile` folder with the necessary files and add a profile route to the `src/app/app-routing.module.ts` file:


      // src/app/app-routing.module.ts
    
       { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
    

Next, open the  `src/app/home/home.page.html` file and add a button that will take us to the profile page just below the **START CHATTING** button:


        <!-- src/app/home/home.page.html -->
    
        <ion-button color="light" outline size="large" [routerLink]="'/profile'">
          <ion-icon name="settings"></ion-icon>
          Profile settings
        </ion-button> 

This is a screenshot of the UI:


![](https://d2mxuefqeaa7sj.cloudfront.net/s_468DBFC342AD25E2619B4E2B6963F24E9CB7436BAA605239964DFA0404E7DCBC_1551736616068_Screenshot+from+2019-03-04+21-56-21.png)
### Building an Ionic 5 Chat Profile UI with Angular Forms

Next, open the `src/app/profile/profile.page.html` file and update its content with the following code:


    <!-- src/app/profile/profile.page.html -->
    
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>
          Chatkit Demo
        </ion-title>
        
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <form #f="ngForm" (ngSubmit)="uploadAvatar(f)">
        <ion-grid>
          <ion-row justify-content-center>
            <ion-col align-self-center size-md="6" size-lg="5" size-xs="12">
              <div text-center>
                <h3>Update your profile photo</h3>
              </div>
              <div padding>
                <ion-item>
                    <img *ngIf="avatarURL" [src]="avatarURL"
                    />
                </ion-item>
                <ion-item>
                  <input name="file" type="file" accept="image/x-png,image/jpeg" (change)="attachFile($event)" ngModel required />
                </ion-item>
              </div>
              <div padding>
                <ion-button size="large" type="submit" [disabled]="f.invalid" expand="block">Update photo</ion-button>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </form>
    </ion-content> 

We create an Angular form and we bind the `ngSubmit` event to an `uploadAvatar()` method that will be called when the users click on the submit button. The `uploadAvatar()` TypeScript method takes a reference to the form created using an Angular template reference variable (`#f="ngForm"`).

We also bind an `attachFile()` TypeScript method to the change event of the file input tag which will be called when the user clicks the **Choose File** button and select a file.


### Importing and Injecting Angular 9 `HttpClient` and Ionic 5 Storage

Next, we need to define the `uploadAvatar()` and `attachFile()` TypeScript methods. Open the `src/app/profile/profile.page.ts` file and start by adding the following imports:


    // src/app/profile/profile.page.ts
    
    import { HttpClient } from '@angular/common/http';
    import { Storage } from '@ionic/storage';

We import `HttpClient` for sending POST requests to the server and the Ionic `Storage` service for working with local storage.

Next, define `SERVER_URL`, `fileToUpload`, `userId` and `avatarURL` TypeScript variables:


    // src/app/profile/profile.page.ts
    
    @Component({
      selector: 'app-profile',
      templateUrl: './profile.page.html',
      styleUrls: ['./profile.page.scss'],
    })
    export class ProfilePage implements OnInit {
      SERVER_URL = 'http://localhost:3000/avatar';
      fileToUpload: File = null;
      userId = null;
      avatarURL;

The `SERVER_URL` variable simply holds the server endpoint for uploading user profiles.

The `fileToUpload` variable will hold the selected image file that will be uploaded to the server. 

Next, inject the `HttpClient` and `Storage` services via the constructor:


    // src/app/profile/profile.page.ts
    
      constructor(private httpClient: HttpClient, private storage: Storage) { }
       
       
### Retrieving the Currently Logged-In User ID from `localStorage` with Ionic 5 Storage

Next, we need to retrieve the ID of the currently logged in user from `localStorage` in the `ngOnInit()` life-cycle method of the page:


      // src/app/profile/profile.page.ts
    
      async ngOnInit() {
        this.userId =  await this.storage.get("USER_ID");
      } 

We simply call the `get()` method of the `Storage` service to retrieve the `USER_ID` and assign it to the `userId` variable we defined earlier.


> **Note**: Make sure to add the `async`  keyword before the  `ngOnInit()` method to be able to use the `await`  keyword in the body of the method.

Next, we define the `attachFile()` method:


      // src/app/profile/profile.page.ts
    
      attachFile(e){
        if (e.target.files.length == 0) {
          console.log("No file selected!");
          return
        }
        let file: File = e.target.files[0];
        this.fileToUpload = file;
      }

This method will be called when the user selects a file. If a file is selected it will be stored in the `fileToUpload` variable we defined earlier. 

## Uploading Image Files with Angular 9 `HttpClient` and `FormData`
 
Now that we have added the code to retrieve the user identifier from the local storage and  select the file from the user drive, let’s add the method that [uploads the file to the Node server from Angular with FormData](https://www.techiediaries.com/angular-formdata/) along with the currently logged in user using Angular 9 `HttpClient` and HTML5 `FormData`:


      // src/app/profile/profile.page.ts
    
      uploadAvatar(f){
        let formData = new FormData(); 
        formData.append('file', this.fileToUpload, this.fileToUpload.name); 
        formData.append('userId', this.userId);
        this.httpClient.post(this.SERVER_URL, formData).subscribe((res) => {
        
        console.log(res);
        this.avatarURL = res['avatarURL'];
        });
        return false;     
      }

We use the `FormData` interface to create a form object and we use the `append()` method to add fields to the form (the `file` field which contains the file to upload and the `userId` field which contains the user identifier). Finally we send the form data with a POST request using the `post()` method of `HttpClient`. 

### What's FormData?
 
Here is the definition of FormData from [Mozilla docs](https://developer.mozilla.org/en-US/docs/Web/API/FormData):
 

> The FormData interface provides a way to easily construct a set of key/value pairs representing form fields and their values, which can then be easily sent using the `XMLHttpRequest.send()` method. It uses the same format a form would use if the encoding type were set to "multipart/form-data". 

That’s it we are finished with this part dealing with updating the user avatar. This is a screenshot of the profile page after we uploaded a new avatar for the currently logged in user:


![](https://d2mxuefqeaa7sj.cloudfront.net/s_468DBFC342AD25E2619B4E2B6963F24E9CB7436BAA605239964DFA0404E7DCBC_1551825155445_Screenshot+from+2019-03-05+22-32-23.png)


## Conclusion

In this tutorial, we’ve seen how to upload and serve user avatars in our Ionic 5, Angular 9 and Node/Nest.js  chat application and we also implemented chat read cursors that show users the position of the latest message they have read and the count of their unread messages in the room. You can get the source code from this [GitHub repository](https://github.com/techiediaries/chatkit-profiles-read-cursors).
