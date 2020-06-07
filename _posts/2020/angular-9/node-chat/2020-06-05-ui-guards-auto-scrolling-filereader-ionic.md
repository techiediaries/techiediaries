---
layout: post
title: "Adding UI Guards, Auto-Scrolling, Auth State, Typing Indicators and File Attachments with FileReader to your Angular 9/Ionic 5 Chat App"
image: "images/content/angular.png"
excerpt: "In this tutorial, we'll start by securing the UI of our application using Angular 9 guards then we'll learn how to add support for typing indicators and file attachments using the HTML5 FileReader API in the Ionic 5 and Angular 9 chat application we've built in these previous tutorials. We'll also see how to add automatic scrolling of the chat UI with Angular template variables and the Content.scrollToBottom() method and programmatically trigger click events on the file input element" 
categories: angular
date: 2020-06-06
tags : [angular]
---

![Angular 9 and Ionic 5 Chat App](https://www.techiediaries.com/images/angular-chat-tutorial.png)
 
In this tutorial, we'll start by securing the UI of our application using Angular 9 guards then we'll learn how to add support for typing indicators and file attachments using the HTML5 FileReader API in the Ionic 5 and Angular 9 chat application we've built in these previous tutorials. We'll also see how to add automatic scrolling of the chat UI with Angular template variables and the `Content.scrollToBottom()` method and programmatically trigger click events on the file input element. 

These are all the tutorial parts:

- [Building a Chat App with TypeScript/Node.js, Ionic 5/Angular 9 & PubNub/Chatkit](https://www.techiediaries.com/angular/typescript-node-ionic-chat/)
- [Add JWT REST API Authentication to Your Node.js/TypeScript Backend with TypeORM and SQLite3 Database](https://www.techiediaries.com/angular/jwt-rest-api-auth-node-typescript-typeorm-database/)
- [Building Chat App Frontend UI with JWT Auth Using Ionic 5/Angular 9](https://www.techiediaries.com/angular/ionic-chat-ui-jwt-auth/)
- Adding UI Guards, Auto-Scrolling, Auth State, Typing Indicators and File Attachments with FileReader to your Angular 9/Ionic 5 Chat App
- [Chat Read Cursors with Angular 9/Ionic 5 Chat App: Working with Textarea Keydown/Focusin Events](https://www.techiediaries.com/angular/textarea-keydown-focusin-events/)
- [Angular 9/Ionic 5 Chat App: Unsubscribe from RxJS Subjects, OnDestroy/OnInit and ChangeDetectorRef](https://www.techiediaries.com/angular/unsubscribe-rxjs-subjects-ondestroy-oninit-changedetectorref/)
- [Upload Images In TypeScript/Node & Angular 9/Ionic 5: Working with Imports, Decorators, Async/Await and FormData](https://www.techiediaries.com/angular/upload-images-typescript-node-ionic-imports-decorators-async-await-formdata/)
- [Private Chat Rooms in Angular 9/Ionic 5: Working with TypeScript Strings, Arrays, Promises, and RxJS Behavior/Replay Subjects](https://www.techiediaries.com/angular/typescript-strings-arrays-promises-rxjs-behavior-replay-subjects/)


You can find the complete source code of this application from this [GitHub repository](https://github.com/techiediaries/chatkit-ionic-demo).

This is what we'll achieve in the part:

- Improving the Authentication System Using `BehaviorSubject` and Angular 9 Guards
- Adding the `logout()` Method
- Adding the `isLoggedIn()` Method
- Adding the `checkTokenExists()` Method
- Accessing the Home Page if the User is already Logged in
- Protecting the Home and Chat Pages with Angular 9 Router guards
- Adding support for Chat Typing Indicators
- Adding Support for File (Image) Attachments with HTML5 FileReader API
- Programmatically Trigger a Click Event on the File Input Element
- Automatically Scrolling Down the Angular/Ionic Chat UI Using Template Variables and `Content.scrollToBottom()`

Most mainstream chat applications nowadays offer the ability to send files like texts or images among other formats. Typing indicators are also a popular feature in many popular chat applications.

Thanks to Chatkit or PubNub Chat, you can add support for these features with a few lines of code.
In this tutorial, we'll be working on the frontend project so you either follow the steps from the previous tutorials or simply clone the [GitHub repository](https://github.com/techiediaries/chatkit-nestjs-ionic) and follow the instructions to setup the backend and frontend apps.

These are the instructions. First clone the project: 


    $ git clone https://github.com/techiediaries/chatkit-nestjs-ionic.git

Next, navigate inside the project's `frontend` folder and install the dependencies:


    $ cd chatkit-nestjs-ionic/frontend
    $ npm install

Next, open the `frontend/src/app/chat.service.ts` file and update `YOUR_INSTANCE_LOCATOR` and `YOUR_ROOM_ID` with your own values that you can get from your Pusher dashboard once you create a Chatkit instance.

Next start the development server of the frontend project using:


    $ ionic serve

For the backend, open a new terminal and navigate to the `server` folder then install the dependencies using:


    $ cd chatkit-nestjs-ionic/server
    $ npm install

Next, open the `server/src/auth/auth.service.ts` file and change  `YOUR_INSTANCE_LOCATOR`, `YOUR_SECRET_KEY` and `YOUR_ROOM_ID` with your own values.

  

Finally, start the development server of the backend application using:


    $ npm start


> **Note:** Please note that you first need to register by visiting `localhost:8100/register` where you need to enter your name, email and password. After registering you’ll be redirected to the `/login` page where you need to enter your email and password. If login is successful, you’ll be redirected to the home page where you have the **START CHATTING** button that you need to click on in order to navigate to the chat page.


## Improving the Authentication System Using `BehaviorSubject` and Angular 9 Guards

Before adding new chat features, let's improve the authentication system we created in the previous tutorial.

First, navigate inside your frontend project:


    $ cd chatkit-nestjs-ionic/frontend

Next, open the `src/app/auth.service.ts` file and import `BehaviorSubject` from `rxjs`:


    // src/app/auth.service.ts
    
    import { Observable, BehaviorSubject } from 'rxjs';

Next, add an `authState` variable of `BehaviorSubject` type in `AuthService`:


    // src/app/auth.service.ts
    
    authState  =  new  BehaviorSubject(false);

We create a new `BehaviorSubject` with an initial value of false.

`BehaviorSubject` is a special type of RxJS `Observable` where you can subscribe to values like any other Observable except that it always returns an initial value. For more information, check out this [answer on StackOverflow](https://stackoverflow.com/a/40231605/8114535).

Next, update the `login()` method to change the `authState` to send `true` when the user is successfully logged in:


      // src/app/auth.service.ts
      
      login(userInfo: User): Observable<any> {
        return this.httpClient.post(`${this.AUTH_SERVER}/login`, userInfo).pipe(
          tap(async (res: { status: number, access_token, expires_in, user_id }) => {
            if (res.status !== 404) {
              await this.storage.set("ACCESS_TOKEN", res.access_token);
              await this.storage.set("EXPIRES_IN", res.expires_in);
              await this.storage.set("USER_ID", res.user_id);
              this.authState.next(true);
            }
          })
        );
      }

We send a POST request to the `/login` endpoint of our authentication server and we subscribe to the returned Observable. If the status is different than 404, we persist the JWT information on the local storage and we also send a value of true to the `authState` subject.


### Adding the `logout()` Method

In order to allow users to log out from the application we also need to add a button and bind its click event to a `logout()` method.

First, add the `logout()` method in the `src/app/auth.service.ts` file:


      // src/app/auth.service.ts
      
      async logout(){
        await this.storage.remove("ACCESS_TOKEN");
        await this.storage.remove("EXPIRES_IN");
        await this.storage.remove("USER_ID");
        this.authState.next(false); 
      }

To logout we simply remove the `ACCESS_TOKEN`, `EXPIRES_IN` and `USER_ID` from the local storage and change the `authState` Observable to send `false`.

Next, open the `src/app/chat/chat.page.ts` file, import and inject `AuthService`:


    // src/app/chat/chat.page.ts
    
    /* [...] */
    import { AuthService } from  '../auth.service';
    
    @Component({
      selector: 'app-chat',
      templateUrl: './chat.page.html',
      styleUrls: ['./chat.page.scss'],
    })
    export class ChatPage implements OnInit {
    
      messageList: any[] = [];
      chatMessage: string = "";
      constructor(private router: Router, private chatService: ChatService, private authService: AuthService) { }

Next, add the `logout()` method:


      // src/app/chat/chat.page.ts
      
      async logout(){
        await this.authService.logout();
        this.router.navigateByUrl('/login');
      }

We call the `logout()` method of the instance of `AuthService` and we navigate to the login page using the `navigateByUrl()` method of the Router.

Next open the `src/app/chat/chat.page.html` and add a button on the toolbar:


    <!-- src/app/chat/chat.page.html -->
    
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>
          Chat Room
        </ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="logout()">
              Logout
          </ion-button>      
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

Let's also, add a link to the registration page in the login page. Open the `src/app/login/login.page.html` and add the following code below the `<ion-row>` containing the login from:


      <!-- src/app/login/login.page.html -->
      
          <ion-row>
            <ion-col>
              <p>Please <a routerLink='/register'>register</a> first if you don't have an account yet!</p>
            </ion-col>
          </ion-row>


### Adding the `isLoggedIn()` Method

Next, we'll add the `isLoggedIn()` method which simply returns the value of the `authState` variable which we need to check in order to get the authentication state in our application:


      // src/app/auth.service.ts
      
      async isLoggedIn() {
        return this.authState.value;
      }


### Adding the `checkTokenExists()` Method

We also need a method that checks if an authentication token does exist in the local storage. It will be combined with the `isLoggedIn()` method to check the authentication state of users in our Angular router guards:


      // src/app/auth.service.ts
      
      checkTokenExists(): Promise<boolean>{
        return new Promise((resolve)=>{
          this.storage.get("ACCESS_TOKEN").then(token => {
            if(token !== null){
              this.authState.next(true);
              resolve(true);
            }
            else
            {
              this.authState.next(false);
              resolve(false);
            }
          })
        })
      }

The `checkTokenExists()` method will also update the  `authState` subject with true if the token exists and false otherwise and will return a Promise that resolves to true when the token exists and false otherwise.


### Accessing the Home Page if the User is already Logged in

Until now we need to login each time before getting redirected to the home page because we need to pass the user identifier to the home from the login page. 

The user identifier is retrieved from the server when the user is successfully logged in but the user doesn't actually need to login each time they need to use the application. 

In order to fix this, we simply need to access the user ID from the local storage when the user is already logged in.

You need to open the `src/app/home/home.page.ts` file and import then inject the Ionic Storage service via the component constructor:


    // src/app/home/home.page.ts
    
    import { Storage } from  '@ionic/storage';
    /* ... */
    
    export class HomePage implements OnInit {
      userId: string = '';
      userList: any = [];
      constructor(private chatService: ChatService, private route: ActivatedRoute, private storage: Storage)
      { }

Next, update the `ngOnInit()` life-cycle event as follows:


    // src/app/home/home.page.ts
      
      async ngOnInit() {
        this.userId = this.route.snapshot.params.id || await this.storage.get("USER_ID");
        this.chatService.connectToChatkit(this.userId);
        this.chatService.getUsers().subscribe((users) => {
          this.userList = users;
        });
      }


> **Note**: You need to add the `async` keyword before the `ngOnInit()` method to be able to use the `await`  keyword in the body of the method.

We simply change the line where `userId` is retrieved. We either retrieve it from the route parameter or from the local storage.

Open the `src/app/home/home.module.ts` file and add a new path that will allow us to map the home page to the `/home` route without passing the user identifier:


    // src/app/home/home.module.ts
    
    /* ... */
    
    @NgModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
          {
            path: '',
            component: HomePage
          },
          {
            path: ':id',
            component: HomePage
          }
        ])
      ],
      declarations: [HomePage]
    })
    export class HomePageModule {}

After this, the home page can be either accessed from the `/home` route or the `/home?id=USER_ID` route.


## Protecting the Home and Chat Pages with Angular 9 Router guards

The home and chat pages should be accessed only by logged in users. We can enforce this on the client side using Angular 9 Router guards.

Angular Router guards allow you to enable or disable access to certain routes in your Angular application.

Angular offers multiple types of guards:


- `CanActivate`: enable or disable the activation of a route.
- `CanActivateChild`: enable or disable the activation of the children of a route.
- `CanLoad`: enable or disable loading of a route.
- `CanDeactivate`: allow or prevent a user from leaving a route.



> **Note:** Please note that Angular route guards are a client side feature so they are not intended to replace server side security checks as users can easily circumvent them using the browser developer tools and access the protected pages. Instead they are designed to complement the server side protection to improve the UX of your application.

In our case we can use the `CanActivateChild` guard. Head back to your terminal and run the following command:


    $ ionic generate guard auth

This command will create two `src/app/auth.guard.ts` and `src/app/auth.guard.spec.ts` files. 

Open the `src/app/auth.guard.ts` file, you will already find an example guard implemented using the `CanActivate` interface:


    // src/app/auth.guard.ts
    
    import { Injectable } from '@angular/core';
    import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
    import { Observable } from 'rxjs';
    
    @Injectable({
      providedIn: 'root'
    })
    export class AuthGuard implements CanActivate {
      canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return true;
      }
    }

Let's change that to use the `CanActivateChild` interface instead:


    // src/app/auth.guard.ts
    
    import { Injectable } from '@angular/core';
    import { CanActivateChild , ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
    import { Observable } from 'rxjs';
    
    @Injectable({
      providedIn: 'root'
    })
    export class AuthGuard implements CanActivateChild {
      canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return true;
      }
    }

Since the `canActivateChild()` method returns true, this guard will allow access to all users when applied to the `/home` and `/chat` paths. We need to grant access to the logged in users only. So, first import and inject `AuthService` via the the service constructor:


    // src/app/auth.guard.ts
    
    import { Injectable } from '@angular/core';
    import { CanActivateChild , ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
    import { Observable } from 'rxjs';
    import { AuthService } from './auth.service';
    import { Router } from '@angular/router';
    
    @Injectable({
      providedIn: 'root'
    })
    export class AuthGuard implements CanActivateChild {
      constructor(private authService: AuthService, private router: Router ){}
      canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
        if(this.authService.isLoggedIn()){
          return true;
        }
        else{
          return new Promise((resolve) => {
            this.authService.checkTokenExists().then((tokenExists)=>{
    
              if(tokenExists){
                resolve(true);
              }
              else{
                this.router.navigateByUrl('/login');
                resolve(false);
              }
            })
          })
        }  
    
      }
    }

With this implementation, the `canActivateChild()` method will return true when the `isLoggedIn()` method returns true. Otherwise it will return a new Promise that resolves to true, if a token exists in the local storage or false if no token exists.

Since the `canActivateChild()` method accepts a Boolean value or a Promise that resolves to a Boolean value, this guard will grant access to the children of the route only when the user is logged in (i.e if the `authState` subject has a value of true or a token exists in the local storage of the application).

Finally, you need to apply the guard on the routes. Open the `src/app/app-routing.module.ts` file and import `AuthGuard` and register it:


    // src/app/app-routing.module.ts
    
    import { NgModule } from '@angular/core';
    import { Routes, RouterModule } from '@angular/router';
    import { AuthGuard } from './auth.guard';
    
    const routes: Routes = [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', canActivateChild: [AuthGuard], loadChildren: './home/home.module#HomePageModule' },
      { path:  'login', loadChildren:  './login/login.module#LoginPageModule' },
      { path:  'register', loadChildren:  './register/register.module#RegisterPageModule' },
      { path:  'chat', canActivateChild: [AuthGuard],loadChildren:  './chat/chat.module#ChatPageModule' },
    ];
    
    @NgModule({
      imports: [RouterModule.forRoot(routes)],
      exports: [RouterModule]
    })
    export class AppRoutingModule { }

We added the `AuthGuard` service to the `canActivateChild` array of the `home` and `chat` paths. The `login` and `register` paths have public access since they are used to authenticate users.


> **Note:** Please note that before you can test the improved authentication system, you need to make sure you are not already logged in (due to the previous tests of the application). You can either use the logout button to clear the local storage of your application and then reload your application again or manually clear the storage before running your application (Ionic storage stores the values in the IndexedDB database) 


![](https://d2mxuefqeaa7sj.cloudfront.net/s_C45215D76DEC11B1B484F3750AFBCB378A6F0DA773D44909288451AECE64888B_1549718336887_Screenshot+from+2019-02-09+13-18-14.png)


## Adding support for Chat Typing Indicators

After finishing with authentication now, let's add other chat features. We'll start with the typing indicator which indicates to the other users in the chat room if someone is already typing a message.

Open the `src/app/chat.service.ts` file and add the `typingUsers` array which will hold the users that are currently typing:


    // src/app/chat.service.ts
    
    typingUsers  = [];

Next, in the `connectToChatkit()` method, add the `onUserStartedTyping` and `onUserStoppedTyping` hooks:


    // src/app/chat.service.ts
    
        await this.currentUser.subscribeToRoom({
          roomId: this.GENERAL_ROOM_ID,
          hooks: {
    
            onMessage: message => {
              this.messages.push(message);
              this.messagesSubject.next(this.messages);
            },
            onUserStartedTyping: user => {
              this.typingUsers.push(user.name);
            },
            onUserStoppedTyping: user => {
              this.typingUsers = this.typingUsers.filter(username => username !== user.name);
            }        
          },
          messageLimit: 20
        });

On the `onUserStartedTyping` hook we push the user name of the currently typing user to the `typingUsers` array and on the `onUserStoppedTyping` hook we remove it. This will allow us to have an updated list of typing users.

Next, we need to add a method that returns the `typingUsers` array:


    // src/app/chat.service.ts
    
    getTypingUsers(){
        return  this.typingUsers;
    }

Finally we need to add a method for sending the typing indicator when the user is typing:


    // src/app/chat.service.ts
    
    sendTypingEvent(roomId = this.GENERAL_ROOM_ID){
        return this.currentUser.isTypingIn({ roomId: roomId });
    }

Now, open the `src/app/chat/chat.page.ts` file and add these three methods to the components:


    // src/app/chat/chat.page.ts
    
      get typingUsers(){
        return this.chatService.getTypingUsers();
      }
      onKeydown(e){
        this.chatService.sendTypingEvent();
      }
      onKeyup(e){
        this.chatService.sendTypingEvent();
      }

Next, open the `src/app/chat/chat.page.html` file and bind the `onKeydown` and `onKeyup` methods to the `keydown` and `keyup` events of `<textarea>`:


    <!-- src/app/chat/chat.page.html -->
    
    <textarea #messageInput  placeholder="Enter your message!" [(ngModel)]="chatMessage" (keyup.enter)="sendMessage()" (keydown)="onKeydown($event)" (keyup)="onKeyup($event)">
    </textarea>

Next, inside the `<ion-footer>` component, add the following code which will be displayed if at least one user is currently typing:


    <!-- src/app/chat/chat.page.html -->
    
    <div *ngIf="typingUsers.length > 0">
    {{ typingUsers[0] }} is typing
    </div>



> **Note**: Please note that we are only displaying the first user which is typing in the room. You can also very easily change this to display all typing users by iterating over the `typingUsers` property and displaying each user name.


## Adding Support for File (Image) Attachments with HTML5 FileReader API

After adding support for typing indicators in our application, let's proceed to add support for file or image attachments.

We'll be using the [HTML5 FileReader API](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) for working with files instead of native plugins which require you to do part of the testing on a real mobile device instead of the browser.

Let's start with `ChatService`. Open the `src/app/chat.service.ts` file and update the `sendMessage()` method as follows:


    // src/app/chat.service.ts
    
      sendMessage(message) {
        if(message.attachment){
          return this.currentUser.sendMessage({
            text: message.text,
            attachment: { file: message.attachment, name: message.attachment.name },
            roomId: message.roomId || this.GENERAL_ROOM_ID
          });
        }
        else
        {
          return this.currentUser.sendMessage({
            text: message.text,
            roomId: message.roomId || this.GENERAL_ROOM_ID
          });
        }
    
      }

We add the attachment field which contains an object with two fields: the file attachment and the name of the file attachment.

This will allow us to send a file attachment with our message.

Next, open the `src/app/chat/chat.page.ts` file and add an `attachment` variable to the component that will be used to hold the file:


    // src/app/chat/chat.page.ts
    
    attachment:  File  =  null;

The [File](https://developer.mozilla.org/en-US/docs/Web/API/File) [interface](https://developer.mozilla.org/en-US/docs/Web/API/File) provides information about files and allows JavaScript in a web page to access their content. It's built in the browser so you don't need to import it.

Next, add the following TypeScript method:


    // src/app/chat/chat.page.ts
    
      attachFile(e){
        if (e.target.files.length == 0) {
          return
        }
        let file: File = e.target.files[0];
        this.attachment = file;
      }

The `attachFile()` will be used to read the selected file and assign it to the `attachment` variable. It will be bound to the `change` event of the file input.

Next, update the `sendMessage()` method as follows:


    // src/app/chat/chat.page.ts
    
      sendMessage() {
        this.chatService.sendMessage({ text: this.chatMessage, attachment: this.attachment }).then(() => {
          this.chatMessage = "";
          this.attachment = null;
        });
      }

Now, let's change the UI of our chat page to allow users to select a file and attach it to a massage.

Open the `src/app/chat/chat.page.html` file and add a file input just below the `<textarea>` element where we type the message:


    <!-- src/app/chat/chat.page.html -->
    
    <input #messageAttachment  type="file" accept="image/x-png,image/gif,image/jpeg"
     name="myAttachment" (change)="attachFile($event)"  style = "display: none;"/>

We add a `display:none;` style because we want this input element to be hidden and we bind the `change` event of the element to the `attachFile()` method.

The input field will only accept images which will allow us to send only images in our chat application.


### Programmatically Trigger a Click Event on the File Input Element

Now, how users will trigger the file input interface to select a file? Since we hide the file input, we need to add a button that will programmatically trigger a click event on the file input element.

Below the file input markup, add the following code:


    <!-- src/app/chat/chat.page.html -->
    
    <ion-button  shape="round"  fill="outline"  icon-only  item-right (click)="messageAttachment.click()">
    <ion-icon  name="folder"></ion-icon>
    </ion-button>

This will add an Ionic button with a folder icon that will trigger the interface for selecting a file once clicked by the user.

Now, finally we need to display the attached image when the message list is displayed. In the same file, change the code of `<ion-content>` as follows:


    <!-- src/app/chat/chat.page.html -->
    
    <ion-content padding>
    
      <div class="container">
        <div *ngFor="let msg of messageList" class="message left">
          <img class="user-img" [src]="msg.sender.avatarURL" alt="" src="">
          <div class="msg-detail">
            <div class="msg-info">
              <p>
                {{msg.sender.name}}
              </p>
            </div>
            <div class="msg-content">
              <span class="triangle"></span>
              <img *ngIf="msg.attachment" src="{{ msg.attachment.link }}"
              />
              <p class="line-breaker ">{{msg.text}}</p>
            </div>
          </div>
        </div>
      </div>
    </ion-content>

If the message object has an attachment field we display the image using the `<img>` tag.


> **Note**: Please note that with the current implementation, you need to include text before sending a message with an attachment.

This is a screen shot of the chat UI:

![](https://d2mxuefqeaa7sj.cloudfront.net/s_C45215D76DEC11B1B484F3750AFBCB378A6F0DA773D44909288451AECE64888B_1549380556255_Screenshot+from+2019-02-05+15-28-53.png)


## Automatically Scrolling Down the Angular/Ionic Chat UI Using Template Variables and `Content.scrollToBottom()`

In order to improve the chat experience of our application users we need to automatically scroll down the chat UI when the above the fold area is full of messages. This needs to happen when we first load the chat UI and also when users send new messages.

First, we need to add an ID to the `<ion-content>` element of the chat page. Open the `src/app/chat/chat.page.html` file and update it accordingly:


    <!-- src/app/chat/chat.page.html -->
    
    <!-- [...] -->
    <ion-content #scrollArea  padding>
    <!-- [...] -->
    </ion-content>
    <!-- [...] -->

Now we can query this DOM element from our component using the `#scrollArea` ID.

Next, open the `src/app/chat/chat.page.ts` file and import `Content` from the `@ionic/angular` package and `ViewChild` from the `@angular/core` package:


    // src/app/chat/chat.page.ts
    
    import { Component, OnInit, ViewChild } from '@angular/core';
    import {Content} from "@ionic/angular";

Next, add a `content` variable of type `Content` decorated by `@ViewChild('scrollArea')`:


    // src/app/chat/chat.page.ts
    
    export class ChatPage implements OnInit {
      @ViewChild('scrollArea') content: Content;

Next, add a `scrollToBottom()` method that invokes the `scrollToBottom()` method of the `Content` interface:


    // src/app/chat/chat.page.ts
    
      scrollToBottom() {
        if (this.content.scrollToBottom) {
            this.content.scrollToBottom();
        }
      }

Due to many factors, the DOM element that contains the chat message may not have been added to the DOM when the scroll is triggered so the `scrollToBottom()` method will only scroll to the bottom of the current content, in other words before all or some messages are rendered and added to the DOM.

A common hack to solve this issue is by using the `setTimeout()` method to start the scroll after waiting a specific duration of time just to make sure that all messages have been added to the DOM.

Let's change our `scrollToBottom()` to the following:


    // src/app/chat/chat.page.ts
    
      scrollToBottom() {
    
        setTimeout(()=>{
          if (this.content.scrollToBottom) {
            this.content.scrollToBottom();
          }
        }, 1000);
    
      }

Finally you need to call the `scrollToBottom()` method on the `ngOnInit()` when we first fetch the messages from the Chatkit instance:


    // src/app/chat/chat.page.ts
    
      ngOnInit() {
        this.chatService.getMessages().subscribe(messages => {
          this.messageList = messages;
          this.scrollToBottom();
        });    
      }

You also need to call it when the user successfully sends a new massage:


    // src/app/chat/chat.page.ts
    
      sendMessage() {
        this.chatService.sendMessage({ text: this.chatMessage, attachment: this.attachment }).then(() => {
          this.chatMessage = "";
          this.attachment = null;
          this.scrollToBottom();
        });
      }
       


> **Note**: A more efficient method is to use the [MutationObserver](https://dom.spec.whatwg.org/#mutation-observers) API which listens to changes in the DOM instead of the `setTimeout()` method.


## Conclusion

In this tutorial part, we've added more features to our chat application built using Ionic 5, Node/Nest.js and Chatkit such as file attachments that allow users to send photos to the chat room and typing indicators which inform users if someone is already typing a message in the chat room. We've also seen how to add automatic scrolling of the chat UI with Angular template variables and the `Content.scrollToBottom()` method and programmatically trigger click events on the file input element.

We learned about:

- Improving the Authentication System Using `BehaviorSubject` and Angular 9 Guards
- Adding the `logout()` Method
- Adding the `isLoggedIn()` Method
- Adding the `checkTokenExists()` Method
- Accessing the Home Page if the User is already Logged in
- Protecting the Home and Chat Pages with Angular 9 Router guards
- Adding support for Chat Typing Indicators
- Adding Support for File (Image) Attachments with HTML5 FileReader API
- Programmatically Trigger a Click Event on the File Input Element
- Automatically Scrolling Down the Angular/Ionic Chat UI Using Template Variables and `Content.scrollToBottom()`

You can find the complete source code of this application from this [GitHub repository](https://github.com/techiediaries/chatkit-ionic-demo).

