---
layout: post
title: "Building Chat App Frontend UI with JWT Auth Using Ionic 5/Angular 9"
image: "images/content/angular.png"
excerpt: "In this tutorial, we are going to create the frontend mobile application using Ionic 5 and Angular 9" 
categories: angular
date: 2020-06-05
tags : [angular]
---


In the previous tutorial we have created the server side of our chat application that uses TypeScript, and Node/Nest.js. Now, in this tutorial, we are going to create the frontend mobile application using Ionic 5 and Angular 9.

Chatkit provides developers with client and server side SDKs for working with the API. In the previous tutorial, we used the Node.js SDK. In this tutorial, we'll be using the JavaScript SDK. Chatkit is retired, make sure to check PubNub Chat which provides the same chat features and more.

> Note: Chatkit is the hosted chat service provided by Pusher which is now retired. You can either use your own hosted chat server with an open source solution like [https://chatsdk.co/](https://chatsdk.co/) which is based on Firebase or use PubNub Chat, an alternative paid service for Chatkit.

These are all the tutorial parts:

- [Building a Chat App with TypeScript/Node.js, Ionic 5/Angular 9 & PubNub/Chatkit](https://www.techiediaries.com/angular/typescript-node-ionic-chat/)
- [Add JWT REST API Authentication to Your Node.js/TypeScript Backend with TypeORM and SQLite3 Database](https://www.techiediaries.com/angular/jwt-rest-api-auth-node-typescript-typeorm-database/)
- Building Chat App Frontend UI with JWT Auth Using Ionic 5/Angular 9
- [Adding UI Guards, Auto-Scrolling, Auth State, Typing Indicators and File Attachments with FileReader to your Angular 9/Ionic 5 Chat App](https://www.techiediaries.com/angular/ui-guards-auto-scrolling-filereader-ionic/)
- [Chat Read Cursors with Angular 9/Ionic 5 Chat App: Working with Textarea Keydown/Focusin Events](https://www.techiediaries.com/angular/textarea-keydown-focusin-events/)
- [Angular 9/Ionic 5 Chat App: Unsubscribe from RxJS Subjects, OnDestroy/OnInit and ChangeDetectorRef](https://www.techiediaries.com/angular/unsubscribe-rxjs-subjects-ondestroy-oninit-changedetectorref/)
- [Upload Images In TypeScript/Node & Angular 9/Ionic 5: Working with Imports, Decorators, Async/Await and FormData](https://www.techiediaries.com/angular/upload-images-typescript-node-ionic-imports-decorators-async-await-formdata/)
- [Private Chat Rooms in Angular 9/Ionic 5: Working with TypeScript Strings, Arrays, Promises, and RxJS Behavior/Replay Subjects](https://www.techiediaries.com/angular/typescript-strings-arrays-promises-rxjs-behavior-replay-subjects/)


You can find the source code for this part in this GitHub [repository](https://github.com/techiediaries/chatkit-nestjs-ionic).

![](https://d2mxuefqeaa7sj.cloudfront.net/s_2A468129DF98B1CA9327A2C7C24BEE26817C083A510ABB29F8B5E7659A58A5D6_1543785202435_Peek+2018-12-02+21-05.gif)
![](https://d2mxuefqeaa7sj.cloudfront.net/s_2A468129DF98B1CA9327A2C7C24BEE26817C083A510ABB29F8B5E7659A58A5D6_1543785055524_Peek+2018-12-02+21-08.gif)

## What we'll be building

In this part, we'll build an Angular/Ionic chat mobile application with several chat features like:


- User registration and login with email and password,
- Listing users in a room with their online status,
- Group chatting.


## Prerequisites

To follow along with this tutorial you need to have these prerequisites:


- Working knowledge of TypeScript,
- Working knowledge of Angular (we'll be using Ionic with Angular 9),
- Recent versions of Node.js (v8.11.2) and npm (v5.6.0) installed on your system.

You can check the installed versions of Node.js and npm using the following commands from your terminal:


    $ node --version
    $ npm --version



## Introducing Ionic 5

Ionic 5 is a mobile UI library built on top of modern web technologies like web components and CSS variables. It's the latest version of the most popular UI framework (now just a library) for building hybrid mobile applications with JavaScript and the web.

Ionic 5 aims to become just a UI mobile library that can be used by developers with any preferred client side library or framework like for example Angular, Vue, or React. You can also use it with plain JavaScript to build mobile applications.

Being framework-agnostic doesn't mean that support for Angular is dropped. In fact, the Ionic team is also working on the Ionic-Angular v4 package that could be seen as the next version of Ionic 3 (which could be only used with Angular).

## Installing the Ionic CLI v5

Now if you have Node.js and npm installed, you can go ahead and install [Ionic CLI v4](https://github.com/ionic-team/ionic-cli) by running the following command from your terminal:


    $ npm install -g ionic


> **Note:** Please note that depending on how you configured npm in your system you may need to open an Admin command prompt on Windows or run the command with `sudo` in macOS and Linux if you want to install packages globally.

## Creating an Ionic/Angular v5 Project

You can create Ionic projects using the Ionic CLI and you can also specify which starter or base template you want to use for your project:


- The blank starter: it provides a base blank project with one page.
- The tabs starter: it provides a base project with tabs.
- The side menu starter: it provides a base project with a side menu.

Now head back to your terminal and run the `ionic start` command to generate your project based on the blank template:


    $ cd chatkit-nestjs-ionic
    $ ionic start frontend blank --type=angular


> **Note:** You also need to specify the type of framework to use with the `--type=angular` option, which is new in Ionic CLI v4+.

The Ionic CLI will prompt you if you want to integrate Cordova. 


- *Yes* if you need to target native iOS and Android or,
- *No* if you only need the web version of your project. For example, to develop a Progressive Web App.

You can enter No for now since we’ll be using the browser for testing.

You can also enter No for **Install the free Ionic Appflow SDK and connect your app?** 
If you don’t want to install Ionic [Appflow SDK](https://ionicframework.com/appflow).

Wait for your project to be generated and the dependencies to get installed then run the following command to serve your project locally:


    $ cd frontend
    $ ionic serve

Your application will be running from the `localhost:8100` address.


![](https://d2mxuefqeaa7sj.cloudfront.net/s_2A468129DF98B1CA9327A2C7C24BEE26817C083A510ABB29F8B5E7659A58A5D6_1543947607929_Screenshot+from+2018-12-04+18-19-42.png)



## Installing the Chatkit Client Side SDK

Let's now start implementing Chatkit by installing the JavaScript client side SDK using the following command:


    $ cd frontend
    $ npm install @pusher/chatkit-client --save

We'll be importing this library in our project in the next section.

## Setting up Angular 9 HttpClient, Forms and Ionic 5 Storage

We'll be using Angular `HttpClient` for sending requests to Chatkit and to our TypeScript/Node.js server so we need to set it up in the project. Open the `src/app/app.module.ts` file, import `HttpClientModule` and `FormsModule` then add them to the imports array:


    // frontend/src/app/app.module.ts
    
    import { NgModule } from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    import { RouteReuseStrategy } from '@angular/router';
    import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
    import { SplashScreen } from '@ionic-native/splash-screen/ngx';
    import { StatusBar } from '@ionic-native/status-bar/ngx';
    import { AppComponent } from './app.component';
    import { AppRoutingModule } from './app-routing.module';
    
    import { HttpClientModule } from '@angular/common/http';
    import { FormsModule } from '@angular/forms';
    
    @NgModule({
      declarations: [AppComponent],
      entryComponents: [],
      imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
        HttpClientModule,FormsModule
      ],
      providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
      ],
      bootstrap: [AppComponent]
    })
    export class AppModule {}
    

We'll use the Ionic storage module for working with the browser's local storage so we first need to install it via npm:


    $ npm install  --save  @ionic/storage

Next, add `IonicStorageModule.forRoot()` in the `imports` array:


    // frontend/src/app/app.module.ts
    // [...]
    import { IonicStorageModule } from '@ionic/storage';
    
    @NgModule({
      // [...]
      imports: [/* [...] */,IonicStorageModule.forRoot()],
      providers: [
        // [...]
      ],
      bootstrap: [AppComponent]
    })
    export class AppModule {}


> **Note**: At this point, you can start your development server with `ionic serve` to make sure you don’t have any problems starting your app.

## Creating the JWT Authentication Angular Service

After installing the client SDK, we'll create an Angular service that handles authentication in the mobile application.

### Creating a User Angular Model

First, in you terminal, create a `User` interface using the following command:


    $ ionic g interface user

This will create a `src/app/user.ts` file. Open it and update it as follows:


    // frontend/src/app/user.ts
    export interface User {
        id: number;
        name: string;
        email: string;
        password: string;
    }

### Generating an Angular 9 Service with Ionic CLI

Again, in your terminal, run the following command to generate a service:


    $ ionic g service auth

### Adding Imports 

This will create the `src/app/auth.service.ts` and `src/app/auth.service.spec.ts` files.
Open the `src/app/auth.service.ts` file and start by adding the following TypeScript imports:


    // frontend/src/app/auth.service.ts
    import { HttpClient } from  '@angular/common/http';
    import { tap } from  'rxjs/operators';
    import { Observable } from  'rxjs';
    import { Storage } from  '@ionic/storage';
    import { User } from './user';

### Defining a TypeScript Variable for Storing the Server URL

Next create the `AUTH_SERVER` TypeScript variable:


    // frontend/src/app/auth.service.ts
    AUTH_SERVER:  string  =  'http://localhost:3000';

`AUTH_SERVER` holds the address of our authentication (Nest.js) server and `authState`.

Next, inject Angular `HttpClient` and `Storage` via the service constructor:


    // frontend/src/app/auth.service.ts
    @Injectable({
      providedIn: 'root'
    })
    export class AuthService {
    
        constructor(private  httpClient:  HttpClient, private  storage:  Storage) {}
    }

### Adding Login and Registration Methods

Next, add three TypeScript methods to the `src/app/auth.service.ts` file for registration, and login:


    // frontend/src/app/auth.service.ts
    register(userInfo:  User):  Observable<User>{
        return  this.httpClient.post<User>(`${this.AUTH_SERVER}/register`,userInfo);
    }
    
    login(userInfo: User): Observable<any>{
        return this.httpClient.post(`${this.AUTH_SERVER}/login`,userInfo).pipe(
        tap( async (res: { status: number,  access_token, expires_in, user_id })=>{
          if(res.status !== 404){
            await this.storage.set("ACCESS_TOKEN", res.access_token);
            await this.storage.set("EXPIRES_IN", res.expires_in);
            await this.storage.set("USER_ID", res.user_id);
          }
          })
        );    
    }

### The Complete Angular Auth Service
 
At this point, here is how the complete `src/app/auth.service.ts` file looks like:


    // frontend/src/app/auth.service.ts
    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import { tap } from 'rxjs/operators';
    import { Observable } from 'rxjs';
    import { Storage } from '@ionic/storage';
    import { User } from './user';
    @Injectable({
      providedIn: 'root'
    })
    export class AuthService {
      AUTH_SERVER: string = 'http://localhost:3000';
      constructor(private httpClient: HttpClient, private storage: Storage) { }
      register(userInfo: User): Observable<User> {
        return this.httpClient.post<User>(`${this.AUTH_SERVER}/register`, userInfo);
      }
      login(userInfo: User): Observable<any> {
        return this.httpClient.post(`${this.AUTH_SERVER}/login`, userInfo).pipe(
          tap(async (res: { status: number, access_token, expires_in, user_id }) => {
            if (res.status !== 404) {
              await this.storage.set("ACCESS_TOKEN", res.access_token);
              await this.storage.set("EXPIRES_IN", res.expires_in);
              await this.storage.set("USER_ID", res.user_id);
            }
          })
        );
      }
    }

That's it, we've finished with the authentication service. In the next section, we'll see how you can use this service for adding authentication to your Ionic 5/Angular application.

## Creating the Registration and Login Pages

After creating the authentication Angular service we can now create the register and login Ionic pages that will allow the users to either register or login. In your terminal, run the following command:


    $ ionic g page login

This will generate a `src/app/login` folder with the following files:


- `src/app/login/login.module.ts`
- `src/app/login/login.page.scss`
- `src/app/login/login.page.html`
- `src/app/login/login.page.spec.ts`
- `src/app/login/login.page.ts`

And will update the `src/app/app-routing.module.ts` file that holds the routing information by adding the following route:


    // frontend/src/app/app-routing.module.ts
    { path:  'login', loadChildren:  './login/login.module#LoginPageModule' }

That means we can access the login page from the `/login` path.

### Generating the Registration Ionic Page

You also need to generate a page for registering users using:


    $ ionic g page register

This will generate a `src/app/register` folder with similar files to the login page and will add the following route:


    // frontend/src/app/app-routing.module.ts
    { path:  'register', loadChildren:  './register/register.module#RegisterPageModule' }

That means we can access this page from the `/register` path.

### Implementing the Registration Page

Let's start adding the code for registering users. Open the `src/app/register/register.page.ts` file then import and inject `AuthService` and `Router`:


    // frontend/src/app/register/register.page.ts
    import { Component, OnInit } from '@angular/core';
    import { Router } from  "@angular/router";
    import { AuthService } from '../auth.service';
    
    @Component({
      selector: 'app-register',
      templateUrl: './register.page.html',
      styleUrls: ['./register.page.scss'],
    })
    export class RegisterPage implements OnInit {
      constructor(private  authService:  AuthService, private  router:  Router) { }
      ngOnInit() {
      }
    }

Next, add the following method:


    // frontend/src/app/register/register.page.ts
    import { Component, OnInit } from '@angular/core';
    import { Router } from "@angular/router";
    import { AuthService } from '../auth.service';
    
    @Component({
      selector: 'app-register',
      templateUrl: './register.page.html',
      styleUrls: ['./register.page.scss'],
    })
    export class RegisterPage implements OnInit {
      constructor(private authService: AuthService, private router: Router) { }
      ngOnInit() {
      }
      register(form) {
        this.authService.register(form.value).subscribe((res) => {
          this.router.navigateByUrl('login');
        });
      }
    }
    

We simply call the `register()` method of the authentication service and we pass the form value then we subscribe to the returned observable. After registration is successfully done we navigate to the login page.

Next open the `src/app/register/register.page.html` and add a form inside `<ion-content>` to get the user's information:


    // frontend/src/app/register/register.page.html
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Chatkit Demo</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <form #f="ngForm" (ngSubmit)="register(f)">
        <ion-grid>
          <ion-row justify-content-center>
            <ion-col align-self-center size-md="6" size-lg="5" size-xs="12">
              <div text-center>
                <h3>Register</h3>
              </div>
              <div padding>
                <ion-item>
                  <ion-input name="name" type="text" placeholder="Name" ngModel required></ion-input>
                </ion-item>
                <ion-item>
                  <ion-input name="email" type="email" placeholder="your@email.com" ngModel required></ion-input>
                </ion-item>
                <ion-item>
                  <ion-input name="password" type="password" placeholder="Password" ngModel required></ion-input>
                </ion-item>
                <ion-item>
                  <ion-input name="confirm" type="password" placeholder="Password again" ngModel required></ion-input>
                </ion-item>
              </div>
              <div padding>
                <ion-button size="large" type="submit" [disabled]="f.invalid" expand="block">Register</ion-button>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </form>
    </ion-content>

In the form, we bind the `register` method we created before with the `ngSubmit` event so the method gets called when the user submits the form.

If you run your application and go to the `http://localhost:8100/register`  address, you should see this page:


![](https://i.imgur.com/5U2HQHP.png)


### Implementing the Login Ionic 5 Page

Next, let's implement the login page. Open the `src/app/login/login.page.ts` file then import `AuthService` and `Router`:


    // frontend/src/app/login/login.page.ts
    import { Router } from  "@angular/router";
    import { AuthService } from  '../auth.service';

Next inject them via the service constructor:


    // frontend/src/app/login/login.page.ts
    constructor(private  authService:  AuthService, private  router:  Router) { }

Next, add a `showError` variable:


    // frontend/src/app/login/login.page.ts
    export  class  LoginPage  implements  OnInit {
        showError:  boolean  =  false;

Finally, add the `login` method:


    // frontend/src/app/login/login.page.ts
    login(form){
        this.authService.login(form.value).subscribe((res)=>{
          if(res.status == 200){
            this.showError = false;
            this.router.navigateByUrl(`home/${res.user_id}`);
          }
          else{
            this.showError = true;
          }
        });
    }

In this method, we call the `login()` TypeScript method of the authentication Node server and we pass the form data (email and password) using the `.value` member variable of the form instance. Next, we subscribe to the observable and check the status of the returned response. If the request is successful i.e `res.status == 200` we navigate to the home page of the application and we pass `user_id` as a parameter to the `home/` URL. Otherwise, we simply set `showError` to true.

At this point, this is how the complete `src/app/login/login.page.ts` looks like:


    // frontend/src/app/login/login.page.ts
    import { Component, OnInit } from '@angular/core';
    import { Router } from "@angular/router";
    import { AuthService } from '../auth.service';
    
    @Component({
      selector: 'app-login',
      templateUrl: './login.page.html',
      styleUrls: ['./login.page.scss'],
    })
    export class LoginPage implements OnInit {
      showError: boolean = false;
      constructor(private authService: AuthService, private router: Router) { }
      ngOnInit() {
      }
      login(form) {
        this.authService.login(form.value).subscribe((res) => {
          if (res.status == 200) {
            this.showError = false;
            this.router.navigateByUrl(`home/${res.user_id}`);
          }
          else {
            this.showError = true;
          }
        });
      }
    }

Let's now add the form to get the user's email and password in the login page. Open the `src/app/login/login.page.html` file and add a form inside `<ion-content>`:


    // frontend/src/app/login/login.page.html
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Chatkit Demo</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <form #f="ngForm" (ngSubmit)="login(f)">
        <ion-grid>
          <ion-row justify-content-center>
            <div *ngIf="showError">Error! Please try again</div>
          </ion-row>
          <ion-row justify-content-center>
            <ion-col align-self-center size-md="6" size-lg="5" size-xs="12">
              <div text-center>
                <h3>Login</h3>
              </div>
              <div padding>
                <ion-item>
                  <ion-input name="email" type="email" placeholder="your@email.com" ngModel required></ion-input>
                </ion-item>
                <ion-item>
                  <ion-input name="password" type="password" placeholder="Password" ngModel required></ion-input>
                </ion-item>
              </div>
              <div padding>
                <ion-button size="large" type="submit" [disabled]="f.invalid" expand="block">Login</ion-button>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </form>
    </ion-content>

If you visit the `http://localhost:8100/login` address, you should see this page:


![](https://i.imgur.com/aar1a39.png)


 
That's it for the authentication part, next we'll be working with Chatkit to add chat features to our application.

## Creating the Angular 9 Service and Connecting to the Chat Service

After implementing user authentication in our chat application, we'll create an Angular 9 service that will encapsulate all the code required to connect with the chosen chat service and call any chat features so head back to your terminal and run this command:


    $ ionic g service chat

The command will create the `src/app/chat.service.ts` file that contains the actual code for the service and the `src/app/chat.service.spec.ts` file that contains the specifications or test units.

Now open the `src/app/chat.service.ts` file, and let's add the code to link our application to Chatkit.

Start by importing `ChatManager`, `TokenProvider` and `BehaviorSubject`:


    // frontend/src/app/chat.service.ts
    import { Observable, BehaviorSubject } from  'rxjs';
    import { ChatManager, TokenProvider } from  '@pusher/chatkit-client';

Next, add the following TypeScript variables to the service:


    // frontend/src/app/chat.service.ts
    AUTH_URL = 'http://localhost:3000/token';
    INSTANCE_LOCATOR = 'YOUR_INSTANCE_LOCATOR';
    GENERAL_ROOM_ID = 'YOUR_ROOM_ID';
    GENERAL_ROOM_INDEX = 0;
    
    chatManager: ChatManager;
    currentUser;
    messages = [];
    
    
    usersSubject = new BehaviorSubject([]);
    messagesSubject = new BehaviorSubject([]);

Make sure you create a room in your dashboard then replace `YOUR_INSTANCE_LOCATOR` and `YOUR_ROOM_ID` with your own values.
Next, add the following method that allows you to connect to your Chatkit instance and subscribe to your room:


    // frontend/src/app/chat.service.ts
    async connectToChatkit(userId: string){
        this.chatManager = new ChatManager({
          instanceLocator: this.INSTANCE_LOCATOR,
          userId: userId,
          tokenProvider: new TokenProvider({ url: this.AUTH_URL})
        })
    
        this.currentUser = await this.chatManager.connect();
    
        await this.currentUser.subscribeToRoom({
          roomId: this.GENERAL_ROOM_ID,
          hooks: {},
          messageLimit: 20
        });
    }

We create an instance of  Chatkit ChatManager and we assign it to `chatManager` variable. We pass in an instance locator, a user ID and a token provider.

We then use its `connect()` method to connect to Chatkit and retrieve a current user object that we'll use to interact with our Chatkit instance, rooms, messages, and users. The `connect()` method returns a TypeScript promise that resolves with a Current User object.

Finally, we use the `subscribeToRoom` method to subscribe to our room. This will allow us to be notified when new messages or users are added to the room. We pass in the room ID, a hooks object and a message limit number.

In the `hooks` object of the `subscribeToRoom` method, we need to provide subscription hooks that will be called when a new message or a user is added to the room or an event like user typing is triggered:


    // frontend/src/app/chat.service.ts
    hooks: {
        onMessage: message => {
              this.messages.push(message);
              this.messagesSubject.next(this.messages);
        }
    },

In our case, we are using the `onMessage` hook that gets called for new messages.

Next after calling the `subscribeToRoom` method add the following code:


    // frontend/src/app/chat.service.ts
    const  users  =  this.currentUser.rooms[this.GENERAL_ROOM_INDEX].users;
    this.usersSubject.next(users);

This will allow us to get the list of users in the room.

Next, add the following methods which return the behavior subjects from the service:


    // frontend/src/app/chat.service.ts
    getUsers(){
        return  this.usersSubject;
    }
    
    getMessages(){
        return  this.messagesSubject;
    }

Next, add the `sendMessage` method that is used to send a message to the room:


    // frontend/src/app/chat.service.ts
    sendMessage(message){
        return this.currentUser.sendMessage({
          text: message.text,
          roomId: message.roomId || this.GENERAL_ROOM_ID
        })   
    }

Finally, we add a couple of other needed methods for checking the status of the user and return the current user:


    // frontend/src/app/chat.service.ts
    isUserOnline(user): boolean {
        return user.presence.state == 'online';
    }
    
    getCurrentUser(){
        return this.currentUser;
    }

This is how the complete `src/app/chat.service.ts` file looks like:


    // frontend/src/app/chat.service.ts
    import { Injectable } from '@angular/core';
    import { Observable, BehaviorSubject } from 'rxjs';
    import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
    
    @Injectable({
      providedIn: 'root'
    })
    export class ChatService {
      AUTH_URL = 'http://localhost:3000/token';
      INSTANCE_LOCATOR = 'YOUR_INSTANCE_LOCATOR';
      GENERAL_ROOM_ID = 'YOUR_ROOM_ID';
      GENERAL_ROOM_INDEX = 0;
      chatManager: ChatManager;
      currentUser;
      messages = [];
    
      usersSubject = new BehaviorSubject([]);
      messagesSubject = new BehaviorSubject([]);
      constructor() { }
      async connectToChatkit(userId: string) {
        this.chatManager = new ChatManager({
          instanceLocator: this.INSTANCE_LOCATOR,
          userId: userId,
          tokenProvider: new TokenProvider({ url: this.AUTH_URL })
        })
        this.currentUser = await this.chatManager.connect();
        await this.currentUser.subscribeToRoom({
          roomId: this.GENERAL_ROOM_ID,
          hooks: {
            onMessage: message => {
              this.messages.push(message);
              this.messagesSubject.next(this.messages);
            }
          },
          messageLimit: 20
        });
    
        const users = this.currentUser.rooms[this.GENERAL_ROOM_INDEX].users;
        this.usersSubject.next(users);
      }
    
      getUsers() {
        return this.usersSubject;
      }
      getMessages() {
        return this.messagesSubject;
      }
      sendMessage(message) {
        return this.currentUser.sendMessage({
          text: message.text,
          roomId: message.roomId || this.GENERAL_ROOM_ID
        })
      }
      isUserOnline(user): boolean {
        return user.presence.state == 'online';
      }
      getCurrentUser() {
        return this.currentUser;
      }
    }

That's it for our chat service, next we'll use this service to implement group chat in our mobile app.

## Displaying Room Users on the Ionic 5 Home Page

When a user registers in our application a Chatkit user is created behind the scenes. Open the `src/app/home/home.page.ts` file and start by adding the following TypeScript imports:


    // frontend/src/app/home/home.page.ts
    import { OnInit } from '@angular/core';
    import { Router, ActivatedRoute } from  '@angular/router';
    import { ChatService } from  '../chat.service';
    import { User } from  '../user';

Next, add the following TypeScript variables to the Angular component:


    // frontend/src/app/home/home.page.ts
    export  class  HomePage  implements  OnInit{
        userId:  string  =  '';
        userList:  any  = [];

Next inject `ChatService` and Angular' `ActivatedRoute` which is used to get route parameters:


    // frontend/src/app/home/home.page.ts
    constructor(private  chatService:  ChatService, private  route:  ActivatedRoute){}

Finally when the Angular component is initialized we connect to our Chatkit instance and we retrieve the room users:


    // frontend/src/app/home/home.page.ts
    ngOnInit(){
        this.userId = this.route.snapshot.params.id;
        this.chatService.connectToChatkit(this.userId);
        this.chatService.getUsers().subscribe((users)=>{
            this.userList = users;
        });
    }

On the `ngOnInit` life-cycle event of the Angular component we first retrieve the user id from the route path then we call the `connectToChatkit` method of `ChatService`to connect the Chatkit.


> **Note**: `HomePage` needs to implement `OnInit` i.e `export class HomePage  implements OnInit`.

Finally, we subscribe to the `getUsers` method of `ChatService` to get the room's users and add them to `userList` TypeScript array.

One more TypeScript method that we need in our Angular component is:


    // frontend/src/app/home/home.page.ts
    isOnline(user){
        return  this.chatService.isUserOnline(user);
    }

This will allow us to check if the chat user is online.

This is the full content of the the `src/app/home/home.page.ts`:


    // frontend/src/app/home/home.page.ts
    import { Component } from '@angular/core';
    import { OnInit } from '@angular/core';
    import { Router, ActivatedRoute } from '@angular/router';
    import { ChatService } from '../chat.service';
    import { User } from '../user';
    
    @Component({
      selector: 'app-home',
      templateUrl: 'home.page.html',
      styleUrls: ['home.page.scss'],
    })
    export class HomePage implements OnInit {
      userId: string = '';
      userList: any = [];
      constructor(private chatService: ChatService, private route: ActivatedRoute) { }
      ngOnInit() {
        this.userId = this.route.snapshot.params.id;
        this.chatService.connectToChatkit(this.userId);
        this.chatService.getUsers().subscribe((users) => {
          this.userList = users;
        });
      }
      isOnline(user) {
        return this.chatService.isUserOnline(user);
      }
    }

## Using Angular Route Parameters

Since we pass the user ID from the login page to the home page, we need to change the path of the Angular home component to accept a route parameter. Open the `src/app/home/home.module.ts` and change the path as follows:


    // frontend/src/app/home/home.module.ts
    RouterModule.forChild([
    {
        path:  ':id',
        component:  HomePage
    }
    ])

## Adding an Ionic 5 Chatting Button
 
Now we need to display the list of users in the room and a button to start chatting.
Open the `src/app/home/home.page.html` file, remove what’s inside `<ion-content>` and add:


    // frontend/src/app/home/home.page.html
    <div text-center>
        <ion-button  color="light" outline size="large" [routerLink]="'/chat'">
            <ion-icon name="chatbubbles"></ion-icon>
            Start chatting
        </ion-button>
    </div>

This will add a button that takes the user to a chat page (that will be creating next).

## Adding an Ionic 5 Spinner for the Loading Animation

Next inside `<ion-content>`, add an Ionic spinner to create a loading animation:


    // frontend/src/app/home/home.page.html
    <h4>Users</h4>
    <ion-spinner  name="dots" *ngIf="userList.length === 0"></ion-spinner>

## Displaying an Ionic 5 List of Room Users 

Now, add the Ionic 5 list to display users:


    // frontend/src/app/home/home.page.html
    <ion-list>
        <ion-item class="user-item" *ngFor="let user of userList">
            <div class="user-avatar">
                <img  [src]="user.avatarURL" alt="">
            </div>
            <ion-label class="user-name">
               {{ user.name }}
            </ion-label>
            <div class="user-presence">
                <ion-icon [class.user-online]="isOnline(user)" name="radio-button-on"></ion-icon>
            </div>  
        </ion-item>
    </ion-list>

We simply loop over `userList` array and display each user's name, avatar and online status.

Also change the title of the page and the color of the toolbar:


    // frontend/src/app/home/home.page.html
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>
          Chatkit Demo
        </ion-title>
      </ion-toolbar>
    </ion-header>

This is how the complete `src/app/home/home.page.html` file looks like:


    // frontend/src/app/home/home.page.html
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>
          Chatkit Demo
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <div text-center>
        <ion-button  color="light" outline size="large" [routerLink]="'/chat'">
            <ion-icon name="chatbubbles"></ion-icon>
            Start chatting
        </ion-button>
    </div>
    <h4>Users</h4>
    <ion-spinner  name="dots" *ngIf="userList.length === 0"></ion-spinner>
    <ion-list>
      <ion-item class="user-item" *ngFor="let user of userList">
          <div class="user-avatar">
              <img  [src]="user.avatarURL" alt="">
          </div>
          <ion-label class="user-name">
             {{ user.name }}
          </ion-label>
          <div class="user-presence">
              <ion-icon [class.user-online]="isOnline(user)" name="radio-button-on"></ion-icon>
          </div>  
      </ion-item>
    </ion-list>
    </ion-content>

Finally let's add some styling. Open the `src/app/home/home.page.scss` file and add the following styles:


    // frontend/src/app/home/home.page.scss
    .user-item {
        display: flex;
        .user-avatar{
            flex : 1; 
            img{
                width: 30px;
                height: 30px;
            }
        } 
        .user-name{
            flex: 2;
        }
        .user-presence{
            flex: 1;
        }
        .user-online{
            color: #32eb32;
        }
    }

We use CSS Flex layout to style each list item.

## Creating the Ionic 5 Chat Page

When the user clicks on **START CHATTING**  they will be taking to a chat page that we're going to create in this section. Head back to your terminal and run the following command:


    $ ng generate page chat

Open the `src/app/chat/chat.page.ts` file and first add the following imports:


    // frontend/src/app/chat/chat.page.ts
    import { Router } from  '@angular/router';
    import { ChatService } from  '../chat.service';
    import { User } from  '../user';

Next inject `Router` and `ChatService`:


    // frontend/src/app/chat/chat.page.ts
    constructor(private  router:  Router, private  chatService:  ChatService) { }

Next add the following variables to the component:


    // frontend/src/app/chat/chat.page.ts
    messageList:  any[] = [ ];
    chatMessage:  string  ="";

Next on the `ngOnInit` life-cycle event get the messages and assign them to `messageList`:


    // frontend/src/app/chat/chat.page.ts
    ngOnInit() {
        this.chatService.getMessages().subscribe(messages  =>{
            this.messageList  =  messages;
        });
    }

Finally, add the method to send a message to the room members:


    // frontend/src/app/chat/chat.page.ts
    sendMessage(){
        this.chatService.sendMessage({text:this.chatMessage}).then(()=>{
            this.chatMessage  =  "";
         });
    }

This is the full content of the `src/app/chat/chat.page.ts` file:


    // frontend/src/app/chat/chat.page.ts
    import { Component, OnInit } from '@angular/core';
    import { Router } from '@angular/router';
    import { ChatService } from '../chat.service';
    import { User } from '../user';
    
    @Component({
      selector: 'app-chat',
      templateUrl: './chat.page.html',
      styleUrls: ['./chat.page.scss'],
    })
    export class ChatPage implements OnInit {
      messageList: any[] = [];
      chatMessage: string = "";
      constructor(private router: Router, private chatService: ChatService) { }
    
      ngOnInit() {
        this.chatService.getMessages().subscribe(messages => {
          this.messageList = messages;
        });
      }
      sendMessage() {
        this.chatService.sendMessage({ text: this.chatMessage }).then(() => {
          this.chatMessage = "";
        });
      }
    }

Now, open the `src/app/chat/chat.page.html` file and let's create a chat UI. First, add the list for displaying messages inside `<ion-content>`:


    // frontend/src/app/chat/chat.page.html
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
              <p class="line-breaker ">{{msg.text}}</p>
            </div>
          </div>
        </div>
      </div>
    </ion-content>

We loop through `messageList` using the `*ngFor` directive and display each message text, and sender information like name and avatar.

## Adding a Textarea and Ionic 5 Button For Sending Chat Messages

Next, add a textarea to enter the user's message and an Ionic 5 button to send it below `<ion-content>`:


    // frontend/src/app/chat/chat.page.html
    <ion-footer no-border>
          <div class="input-wrap">        
            <textarea #messageInput
                      placeholder="Enter your message!"
                      [(ngModel)]="chatMessage"
                      (keyup.enter)="sendMessage()">
            </textarea>
            <button ion-button clear icon-only item-right (click)="sendMessage()">
              <ion-icon name="ios-send" ios="ios-send" md="md-send"></ion-icon>
            </button>
          </div>     
    </ion-footer>

We bind the `sendMessage` method to both the text-area enter and the button click events which 
allows users to send a message by either pressing Enter or clicking on the button.

Also change the text of the title and the color of the toolbar:


    // frontend/src/app/chat/chat.page.html
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Chat Room</ion-title>
      </ion-toolbar>
    </ion-header>

This is the full content of the `src/app/chat/chat.page.html` file:


    // frontend/src/app/chat/chat.page.html
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Chat Room</ion-title>
      </ion-toolbar>
    </ion-header>
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
              <p class="line-breaker ">{{msg.text}}</p>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
    <ion-footer no-border>
      <div class="input-wrap">
        <textarea #messageInput placeholder="Enter your message!" [(ngModel)]="chatMessage" (keyup.enter)="sendMessage()">
        </textarea>
        <button ion-button clear icon-only item-right (click)="sendMessage()">
          <ion-icon name="ios-send" ios="ios-send" md="md-send"></ion-icon>
        </button>
      </div>
    </ion-footer>

Next, open the `src/app/chat/chat.page.scss` file and add the following styles:


    // frontend/src/app/chat/chat.page.scss
    .input-wrap {
        padding: 5px;
        display: flex;
        textarea {
          flex: 3;
          border: 0;
          border-bottom: 1px #000;
          border-style: solid;
        }
        button {
            flex: 1;
        }
    }
    ion-footer {
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.11);
        background-color: #fff;
    }
    ion-content .scroll-content {
        background-color: #f5f5f5;
    }
    .line-breaker {
        white-space: pre-line;
    }
    .container {
      .message {
        position: relative;
        padding: 7px 0;
        .msg-content {
            color: #343434;
            background-color: #ddd;
            float: left;        
        }
        .user-img {
            position: absolute;
            border-radius: 45px;
            width: 45px;
            height: 45px;
            box-shadow: 0 0 2px rgba(0, 0, 0, 0.36);
        }
        .msg-detail {
            width: 100%;
            padding-left: 60px;
            display: inline-block;
            p {
              margin: 0;
            }
            .msg-info {
              p {
                font-size: .8em;
                color: #888;
              }
            }
        }
      }
    }

This is a screenshot of the chat UI:


![](https://d2mxuefqeaa7sj.cloudfront.net/s_2A468129DF98B1CA9327A2C7C24BEE26817C083A510ABB29F8B5E7659A58A5D6_1543957188355_Screenshot+from+2018-12-04+20-59-26.png)



> **Note:** Please note that you first need to register by visiting `localhost:8100/register` where you need to enter your name, email and password. After registering you’ll be redirected to the `/login` page where you need to enter your email and password. If login is successful, you’ll be redirected to the home page where you have the **START CHATTING** button that you need to click on in order to navigate to the chat page.

  

## Conclusion

In this tutorial, we've created a simple group chat app using Node/Nest.js, Ionic 5 and Angular 9. You can also leverage Chatkit or the alternative PubNub Chat service to allow private and direct chats between users by creating rooms that have only two members and you can allow users to create their own chat rooms and invite users they want and other features.

You can find the source code for this part in this GitHub [repository](https://github.com/techiediaries/chatkit-nestjs-ionic).


