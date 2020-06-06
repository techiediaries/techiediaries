---
layout: post
title: "Angular 9/Ionic 5 Chat App: Unsubscribe from RxJS Subjects, OnDestroy/OnInit and ChangeDetectorRef"
image: "images/content/angular.png"
excerpt: "In this tutorial part, we'll implement some changes in our Angular 9/Ionic 5 example app that will allow us to unsubscribe from the RxJS subjects and solve issues related to Angular Change Detection in development and duplicate messages displayed in the chat UI" 
categories: angular
date: 2020-06-06
tags : [angular]
---


In this tutorial part, we'll implement some changes in our Angular 9/Ionic 5 example app that will allow us to unsubscribe from the RxJS `usersSubject` and `messagesSubject` subjects defined in the `src/app/chat.service.ts` file and solve issues related to Angular Change Detection in development (The `ExpressionChangedAfterItHasBeenCheckedError` error) and duplicate messages displayed in the chat UI.

These are all the tutorial parts:

- [Building a Chat App with TypeScript/Node.js, Ionic 5/Angular 9 & PubNub/Chatkit](https://www.techiediaries.com/angular/typescript-node-ionic-chat/)
- [Add JWT REST API Authentication to Your Node.js/TypeScript Backend with TypeORM and SQLite3 Database](https://www.techiediaries.com/angular/jwt-rest-api-auth-node-typescript-typeorm-database/)
- [Building Chat App Frontend UI with JWT Auth Using Ionic 5/Angular 9](https://www.techiediaries.com/angular/ionic-chat-ui-jwt-auth/)
- [Adding UI Guards, Auto-Scrolling, Auth State, Typing Indicators and File Attachments with FileReader to your Angular 9/Ionic 5 Chat App](https://www.techiediaries.com/angular/ui-guards-auto-scrolling-filereader-ionic/)
- [Chat Read Cursors with Angular 9/Ionic 5 Chat App: Working with Textarea Keydown/Focusin Events](https://www.techiediaries.com/angular/textarea-keydown-focusin-events/)
- Angular 9/Ionic 5 Chat App: Unsubscribe from RxJS Subjects, OnDestroy/OnInit and ChangeDetectorRef
- [Upload Images In TypeScript/Node & Angular 9/Ionic 5: Working with Imports, Decorators, Async/Await and FormData](https://www.techiediaries.com/angular/upload-images-typescript-node-ionic-imports-decorators-async-await-formdata/)
- [Private Chat Rooms in Angular 9/Ionic 5: Working with TypeScript Strings, Arrays, Promises, and RxJS Behavior/Replay Subjects](https://www.techiediaries.com/angular/typescript-strings-arrays-promises-rxjs-behavior-replay-subjects/)


In more details, we'll see how to:

- Clone and set up both the Angular 9/Ionic frontend and the Node/TypeScript server projects,
- Checks if `currentUser` is different than `null`,
- Define a TypeScript `messages` array and push the received messages to this array instead of `this.messages` (member variable of the chat service),
- Inject and use Ionic `Storage` and Angular `ChangeDetectorRef`,
- Use the Angular `ngOnInit()` life-cycle method to check if we are connected to our chat server, if not call the TypeScript `connectToChatkit()` method and pass the user ID after retrieving it from local storage using Ionic Storage Service.
- Unsubscribe from the RxJS; `usersSubject` and `messagesSubject` subjects when the component is destroyed 

> Note: Chatkit is the hosted chat service provided by Pusher which is now retired. You can either use your own hosted chat server with an open source solution like [https://chatsdk.co/](https://chatsdk.co/) which is based on Firebase or use PubNub Chat, an alternative paid service for Chatkit.

We are not going to reinvent the wheel, instead we’ll be using the demo application we’ve built in the previous tutorials so if you don’t want to follow from the start, you can simply clone the project from GitHub. Follow these instructions to set up and run your application.

## Setting up the Angular 9/Ionic 5 Frontend Project

Start by cloning the latest version of our Angular 9/Ionic 5 frontend project using the following command:


    $ git clone https://github.com/techiediaries/chatkit-ionic-demo.git

 
 Next, navigate inside the `frontend` folder and install the dependencies using:
 

    $ cd chatkit-ionic-demo/frontend
    $ npm install

Before starting your application, you need to open the `frontend/src/app/chat.service.ts` file and update `YOUR_INSTANCE_LOCATOR` and `YOUR_ROOM_ID` with your own values which you can get from your Pusher dashboard after creating a Chatkit instance.


> **Note**: You can refer to the **Configuring Chatkit** section on the [Building a Chat App with Node.js, TypeScript, Ionic 5, and Angular 9: The Auth Backend](https://www.techiediaries.com/angular/node-typescript-chat-auth-backend/) tutorial for instructions on how to create a Chatkit instance.

Now, you can start the development server of the Angular 9/Ionic 5 frontend project using:


    $ ionic serve

Your Ionic application will be running from the `http://localhost:8100` address.

## Setting up the Node/TypeScript Server

Next, open a new terminal and navigate to the `server` folder then install the dependencies of the Node/TypeScript application using the following command:


    $ cd chatkit-ionic-demo/server
    $ npm install

Next, open the `server/src/auth/auth.service.ts` file and change `YOUR_INSTANCE_LOCATOR`, `YOUR_SECRET_KEY` and `YOUR_ROOM_ID` with your own values.

That’s it, you can now start the Node/TypeScript backend application using:


    $ npm run start:dev

This will start a live-reload development server which will be running from the `http://localhost:3000` address.

Before implementing the features of this tutorial, let’s first add some improvements to our Angular/Ionic 5 application. 

First, open the `src/app/chat.service.ts` file, initialize the `currentUser` variable with a `null` value and add the `isConnectedToChatkit()` method which checks if we are connected to Chatkit:


    // src/app/chat.service.ts
    
    currentUser = null;
    
    // [...]
    
      isConnectedToChatkit(){
        return this.currentUser !== null;
      }

This simply checks if `currentUser` is different than `null`.

### Using a Local TypeScript Variables for Storing Chat Messages

Also, you need to change the `connectToChatkit()` method to use a local variable for storing messages:


    // src/app/chat.service.ts
    
    async connectToChatkit(userId: string) {
        let messages = [];
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
              messages.push(message);
              this.messagesSubject.next(messages);
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
    
        const users = this.currentUser.rooms[this.GENERAL_ROOM_INDEX].users;
        this.usersSubject.next(users);
      }

On the line 4, we define a `messages` array and on line 15, we push the received messages to this array instead of `this.messages` (member variable of the service).

### Importing and Injecting Ionic 5 Storage and `ChangeDetectorRef`

Next, open the `src/app/chat/chat.page.ts` file and import then inject Ionic `Storage` and `ChangeDetectorRef`:


    // src/app/chat/chat.page.ts
    // [...]
    import { ChangeDetectorRef } from '@angular/core';
    import { Storage } from '@ionic/storage';
    
    export class ChatPage implements OnInit {
      // [...]
      constructor(private router: Router, private chatService: ChatService, private authService: AuthService, private storage: Storage, private cdRef : ChangeDetectorRef) { }
    
### Checking if The Chat Server is Connected in the Angular `ngOnInit()` Method

Next, in the Angular `ngOnInit()` method check if we are connected to Chatkit, if not call the `connectToChatkit()` and pass the user ID:


    // src/app/chat/chat.page.ts
    // [...]
      
      async ngOnInit() {
        const userId = await this.storage.get("USER_ID");
        if(!this.chatService.isConnectedToChatkit()){
          await this.chatService.connectToChatkit(userId);
        }
        // [...]
      }

This will allow us to connect to Chatkit from the chat page if we are not connected yet.


> **Note**: Make sure to add the `async` keyword before the `ngOnInit()` method.

### Importing the `OnDestroy` and `AfterViewChecked` Interfaces and Implementing them

Next, import the `OnDestroy` and `AfterViewChecked` interfaces and implement them:


    // src/app/chat/chat.page.ts
    
    export class ChatPage implements OnInit, AfterViewChecked, OnDestroy {}
    

 
### Unsubscribing from the RxJS Subjects
 
 Next, define the `ngOnDestroy()` and `ngAfterViewChecked()` methods:


      // ssrc/app/chat/chat.page.ts
    
      ngOnDestroy(){
        if(this.getMessagesSubscription){
          this.getMessagesSubscription.unsubscribe();
        }
      }
      ngAfterViewChecked(){
        this.cdRef.detectChanges();
      }

Also define `getMessagesSubscription` variable we used in the `ngOnDestroy()` method:


    // src/app/chat/chat.page.ts
    
    export class ChatPage implements OnInit, AfterViewChecked, OnDestroy {
      // [...]
      getMessagesSubscription;

And change the `ngOnInit()` method to assign the returned `Subscription` from the `this.chatService.getMessages().subscribe()` method to `this.getMessagesSubscription`:


       // src/app/chat/chat.page.ts
    
       async ngOnInit() {
        const userId = await this.storage.get("USER_ID");
        if(!this.chatService.isConnectedToChatkit()){
          await this.chatService.connectToChatkit(userId);
        }
        this.getMessagesSubscription = this.chatService.getMessages().subscribe(messages => {
          this.messageList = messages;
          this.scrollToBottom();   
        });
      }

Next, change the `logout()` method to unsubscribe from `getMessagesSubscription`:


     // src/app/chat/chat.page.ts
      
      async logout(){
        await this.authService.logout();
        if(this.getMessagesSubscription){
          this.getMessagesSubscription.unsubscribe();
        }
        this.router.navigateByUrl('/login');
      }

Now, open the `src/app/home/home.page.ts` file and add the `getUsersSubscription` variable:


    // src/app/home/home.page.ts
    
    export class HomePage implements OnInit {
      // [...]
      getUsersSubscription;

Next, import the `OnDestroy` interface and implement it:


    // src/app/home/home.page.ts
    export class HomePage implements OnInit, OnDestroy {}

 
 Next, change the `ngOnInit()` method to assign the `Subscription`  returned from the `getUsers().subscribe()` method to `getUsersSubscription` variable:
 

      // src/app/home/home.page.ts
    
      async ngOnInit() {
        this.userId = this.route.snapshot.params.id || await this.storage.get("USER_ID");
        this.chatService.connectToChatkit(this.userId);
        this.getUsersSubscription = this.chatService.getUsers().subscribe((users) => {
          this.userList = users;
        });
      }

 
 Finally add the `ngOnDestroy()` method and unsubscribe from `getUsersSubscription`:
 

      // src/app/home/home.page.ts
    
      ngOnDestroy(){
        this.getUsersSubscription.unsubscribe();
      }

The previous changes will allow us to unsubscribe from the `usersSubject` and `messagesSubject` subjects defined in the `src/app/chat.service.ts` file and solve issues related to Angular Change Detection in development (The `ExpressionChangedAfterItHasBeenCheckedError` error) and duplicate messages displayed in the chat UI.

Let’s now implement our features!