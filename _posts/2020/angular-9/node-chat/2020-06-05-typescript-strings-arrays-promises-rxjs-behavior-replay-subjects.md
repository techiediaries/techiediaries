---
layout: post
title: "Private Chat Rooms in Angular 9/Ionic 5: Working with TypeScript Strings, Arrays, Promises, and RxJS Behavior/Replay Subjects"
image: "images/content/angular.png"
excerpt: "Throughout this tutorial, we'll be learning how to add one-to-one private chat rooms to a chat application built using Angular 9, Ionic 5 , Node and Nest.js. We'll be working with TypeScript Strings, Arrays, Promises, and RxJS Behavior/Replay Subjects. We'll see how to convert a TypeScript promise to an RxJS Observable/Subject, how to use the async/await syntax with the Angular ngOnInit() method and Observable subscribe method, use the Angular Router, ActivatedRoute, and Ionic Storage services and also how to unsubscribe from the RxJS Observables with Angular OnDestroy and ngOnDestroy()" 
categories: angular
date: 2020-06-06
tags : [angular]
---

![Angular 9 and Ionic 5 Chat App](https://www.techiediaries.com/images/angular-chat-tutorial.png)

Throughout this tutorial, we'll be learning how to add one-to-one private chat rooms to a chat application built using Angular 9, Ionic 5 , Node and Nest.js. We'll be working with TypeScript Strings, Arrays, Promises, and RxJS Behavior/Replay Subjects. We'll see how to convert a TypeScript promise to an RxJS Observable/Subject, how to use the `async/await` syntax with the Angular `ngOnInit()` method and Observable `subscribe` method, use the Angular Router, ActivatedRoute, and Ionic Storage services and also how to unsubscribe from the RxJS Observables with Angular `OnDestroy` and `ngOnDestroy()`.

You'll also be learning how to bind TypeScript methods to Ionic 5 buttons in a chat UI and also to the `keyup` event of the **Enter** key of the keyboard, and how to use the Ionic 5 back button.

These are all the tutorial parts:

- [Building a Chat App with TypeScript/Node.js, Ionic 5/Angular 9 & PubNub/Chatkit](https://www.techiediaries.com/angular/typescript-node-ionic-chat/)
- [Add JWT REST API Authentication to Your Node.js/TypeScript Backend with TypeORM and SQLite3 Database](https://www.techiediaries.com/angular/jwt-rest-api-auth-node-typescript-typeorm-database/)
- [Building Chat App Frontend UI with JWT Auth Using Ionic 5/Angular 9](https://www.techiediaries.com/angular/ionic-chat-ui-jwt-auth/)
- [Adding UI Guards, Auto-Scrolling, Auth State, Typing Indicators and File Attachments with FileReader to your Angular 9/Ionic 5 Chat App](https://www.techiediaries.com/angular/ui-guards-auto-scrolling-filereader-ionic/)
- [Chat Read Cursors with Angular 9/Ionic 5 Chat App: Working with Textarea Keydown/Focusin Events](https://www.techiediaries.com/angular/textarea-keydown-focusin-events/)
- [Angular 9/Ionic 5 Chat App: Unsubscribe from RxJS Subjects, OnDestroy/OnInit and ChangeDetectorRef](https://www.techiediaries.com/angular/unsubscribe-rxjs-subjects-ondestroy-oninit-changedetectorref/)
- [Upload Images In TypeScript/Node & Angular 9/Ionic 5: Working with Imports, Decorators, Async/Await and FormData](https://www.techiediaries.com/angular/upload-images-typescript-node-ionic-imports-decorators-async-await-formdata/)
- Private Chat Rooms in Angular 9/Ionic 5: Working with TypeScript Strings, Arrays, Promises, and RxJS Behavior/Replay Subjects

You can get the source code of this demo from this GitHub [repository](https://github.com/techiediaries/chatkit-one-to-one-rooms). 

We’ll not be building the application from scratch as we have already built one in the previous tutorial that you can check from the following links if you are interested to start the series from the beginning.

We'll learn:   

- How to define a behavior and replay subjects using RxJS' `BehaviorSubject` and `ReplaySubject`.
- How to define and use TypeScript Arrays,
- How to use TS template strings to format unique room names using the IDs of both users,
- How to use the Array `findIndex()` method to check if a room with a specified name already exists,
- How to use the `any` type in TypeScript,
- How to transform a TypeScript promise to an RxJS Observable/Subject,
- How to use the await/async syntax to wait for the TypeScript promise.
- How to use Ionic 5 buttons with icons to create catching buttons,
- How to add a Chat UI Ionic 5 Page,
- How to pass the chat user ID to the private room route as argument,
- How to use the Angular Router, ActivatedRoute, Ionic Storage and our custom ChatService services and inject them via the Angular component constructor,
- How to use the `async/await` syntax with the Angular `ngOnInit()` hook,
- How to define and implement a TypeScript method for sending chat messages,
- How to unsubscribe from the RxJS Observables with Angular `OnDestroy` and `ngOnDestroy()`,
- How to bind methods to Ionic 5 buttons on our chat UI and also to the `keyup` event of the **Enter** key of the keyboard,
- How to add an Ionic 5 back button.

If you are only interested in one-to-one chat rooms, you can simply clone the starter project from GitHub and follow this tutorial instructions to learn how to implement the feature.


## Prerequisites

You need to have the following prerequisites to work with this tutorial:


- Knowledge of TypeScript (Required by both Nest.js and Angular).
- Recent versions of Node.js (v8.11.2) and NPM (v5.6.0).

 
## Cloning and Setting up the Chat Starter Project

Let’s see how you can clone, set up and run the Ionic/Angular application step by step.

First, let’s start by cloning the latest version of the frontend project using the following command:


    $ git clone https://github.com/techiediaries/chatkit-profiles-read-cursors.git

 
Next, you need to navigate inside the `frontend` folder and install the dependencies by running the following commands:
 

    $ cd chatkit-profiles-read-cursors/frontend
    $ npm install

Next, if you didn’t do it yet, you need to create a Chatkit instance from Pusher Dashboard and take note of your instance locator and your room ID. Now, open the 
 `frontend/src/app/chat.service.ts` file and update `YOUR_INSTANCE_LOCATOR` and `YOUR_ROOM_ID` with your own values.


After adding these changes, you can run the development server of your frontend project using the following command:


    $ ionic serve

Your Angular/Ionic application will be running on the `http://localhost:8100` address.

Next, open a new terminal and navigate to the `server` folder then install the dependencies of the server application using the following command:


    $ cd chatkit-profiles-read-cursors/server
    $ npm install

Next, open the `server/src/auth/auth.service.ts` file and change `YOUR_INSTANCE_LOCATOR`, `YOUR_SECRET_KEY` and `YOUR_ROOM_ID` with your own values.

After adding the changes, you can run a development server of the Node backend application using the following command:


    $ npm run start:dev

Your Node.js server will be running from the `http://localhost:3000` address.

In our starter project we have added a public chat room where registered users can meet and start chatting with each other in group. This means everyone can see what others are saying in the chat room. Let’s now proceed to add one-to-one private chat rooms,  which allow us to implement chatting between two users and prevent the other users of the application from seeing what messages are sent between individual users.


## Creating and Joining 1-1 Chat Rooms

According to the docs:


> Each user can be a member of many rooms. Rooms can be used for 1-1 chats or group chats; Chatkit does not differentiate between the two concepts at the room level.


> You can create **private** or **public** rooms. By default, public rooms are visible to any user and can be joined by all users while private rooms are only visible to the members of the room and can’t be joined unless the user has the appropriate permissions or added by a member of the room. 

At the room level, Chatkit doesn’t differentiate between  1-1 chats or group chats so we simply implement 1-1 chats between our users using private rooms that contain only two members.

You can create a room using the `currentUser.createRoom()` method. Let’s start by adding a `getCurrentRoomId()` TypeScript method which creates a private room, if it doesn’t exist,  of two users and returns its ID. 

## Using RxJS' `BehaviorSubject` and TypeScript Arrays

Let's now see how to use RxJS' `BehaviorSubject` and TypeScript Arrays to implement our private chat rooms in Angular 9 and Ionic 5. We'll learn:
 
- How to define a behavior subject using RxJS' `BehaviorSubject`.
- How to define and use TypeScript Arrays,
- How to use TS template strings to format unique room names using the IDs of both users,
- How to use the Array `findIndex()` method to check if a room with a specified name already exists,
- How to use the `any` type in TypeScript,
- How to transform a TypeScript promise to an RxJS Observable/Subject,
- How to use the await/async syntax to wait for the TypeScript promise.

Open the `src/app/chat.service.ts` file, which contains the Angular service that implements the chat functionality, and add the following TypeScript method:


       // src/app/chat.service.ts
    
       getCurrentRoomId(otherUserId){
        let returnObs = new BehaviorSubject(null);
        let userRooms: Array<any> = this.currentUser.rooms;
        const userId = this.currentUser.id;
        let name = `${userId}-${otherUserId}`;
        let altName = `${otherUserId}-${userId}`;
        
        let roomExists = userRooms.findIndex((room) =>{
          if(room['name'] === name || room['name'] === altName)
          {
            return true;
          }
          return false;
          
        });    
        if(roomExists !== -1) {
          returnObs.next(userRooms[roomExists].id)
          return returnObs;
        }
        this.currentUser.createRoom({
          name,
          private: true,
          addUserIds: [otherUserId]
        }).then(room => {
          returnObs.next(room.id);
        })
        .catch(err => {
          console.log(`Error creating room ${err}`)
        })
        return returnObs;
      }

We use the room name to store the identifiers of the two users of the room in the **UserId-OtherUserId** or **OtherUserId-UserId** formats using TypeScript template strings. This way we make it very easy to check if a room is already created. 

> TypeScript template strings are ...



We get the rooms of the current user using `this.currentUser.rooms` array and we use the `findIndex()` method of the TypeScript Array to check if a private room, of the current user and the other user, they are chatting with, already exists. In such case, we push the room ID to an RxJS Subject and return it. Otherwise, we call the `createRoom()` method to create the private room.
 
 > A BehaviorSubject is ...
 
The builtin `createRoom()` method of Chatkit returns a TypeScript promise but we are returning an Observable from our `getCurrentRoomId()` method, that's why we defined a TypeScript variable of type `BehaviorSubject` and pushed the ID of the created chat room to the Observable using the `next()` method, which can be seen as equivalent to the `push()` method of an Array, once the promise is resolved with success and a room is created. 

## Using RxJS' `ReplaySubject` with Callbacks
 
Next, we implement the `connectToRoom()` method which subscribes the current user to the specified private room:


      // src/app/chat.service.ts
    
       async connectToRoom(roomId){
        console.log("Subscribe to room: ", roomId);
        let messageSubject = new ReplaySubject();
        await this.currentUser.subscribeToRoom({
          roomId: roomId,
          hooks: {
            onMessage: message => {
              console.log("Got message: ", message);
              messageSubject.next(message);
            }        
          },
          messageLimit: 20
        }); 
        
        return messageSubject;
      }

We use the await/async syntax to wait for the TypeScript promise, returned from the `subscribeToRoom()` method, to resolve or deny before returning the replay subject that would hold the messages sent in the room.

Think of the replay subject as an array or collection which would contain values in the future not right when the TypeScript method is invoked. This is because we need to wait for users to start exchanging messages before we can grab and display them in the chat room. RxJS Observables/Subjects are the right choice to achieve that since they behave like arrays with future arrays and provide a `subscribe` method to observe or listen for any added values/messages.

The Chatkit API is designed with TypeScript promises and callbacks. For example, the builtin `subscribeToRoom()` method returns a promise that will either resolve if the user is successfully subscribed to a room or deny with a reason error, The method also take a TypeScript object as a parameter which contains hooks that are simply callback methods that get called when a certain event occurs on the room such as the `onMessage` callback that gets called whenever a message is sent by the chat room member. 

Since we are not calling this method right in our Angular component but wrapping it inside the custom defined `connectToRoom()`  method of our chat Angular service, that would be called later in the component when creating the chat UI, we need a way to listen for messages.

We can passe a callback function to the `connectToRoom()`  method and call it inside the `onMessage` hook with the received message as a parameter i.e:  

       async connectToRoom(roomId, cb){
        await this.currentUser.subscribeToRoom({
          roomId: roomId,
          hooks: {
            onMessage: message => {
              console.log("Got message: ", message);
              cb(message);
            }        
          },
          messageLimit: 20
        }); 
       return;
      }

But this is not the best way to do it in Angular and Ionic, so we used an RxJS subject instead.

Why using an RxJS observables? And why using the replay subject specifically?
 
## Adding an Ionic 5 Button for Accessing the Private Chat Page

We already displayed our application users in the home page. Let’s now add an Ionic 5 button to access the private chat next to each user in the list. 


We'll see:

- How to use Ionic 5 buttons with icons to create catching buttons,
- How to add a Chat UI Ionic 5 Page,
- How to pass the chat user ID to the private room route as argument,
- How to use the Angular Router, ActivatedRoute, Ionic Storage and our custom ChatService services and inject them via the Angular component constructor,
- How to use the `async/await` syntax with the Angular `ngOnInit()` hook,
- How to define and implement a TypeScript method for sending chat messages,
- How to unsubscribe from the RxJS Observables with Angular `OnDestroy` and `ngOnDestroy()`,
- How to bind methods to Ionic 5 buttons on our chat UI and also to the `keyup` event of the **Enter** key of the keyboard,
- How to add an Ionic 5 back button.

Open the `src/app/home/home.page.html` file, locate `<ion-list>` that displays the users and add a `<ion-button>` with a `chatbubbles` icon:


    <!-- src/app/home/home.page.html -->
    
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
          <div>
              <ion-button size="small" [routerLink]="['/private-chat',user.id]">
                <ion-icon name="chatbubbles" ></ion-icon>
              </ion-button>
            
          </div>  
        
      </ion-item>
    </ion-list>

We use the `routerLink` directive to create a `/private-chat` route that has a dynamic segment that contains the user ID which corresponds to the second user, in addition to the current user, in the private chat room. 

### Adding a Chat UI Ionic 5 Page

Let’s now add an Ionic page for the private chat UI.

 Open a new terminal and run the following command to generate a page:


    $ ionic generate page private-chat  

This will add a route to the `src/app/app-routing.module.ts` file for accessing the private chat page:


    // src/app/app-routing.module.ts
     
    { path: 'private-chat', loadChildren: './private-chat/private-chat.module#PrivateChatPageModule' },
    


### Passing the Chat User ID to the Angular Route as Argument

At this point, we can access the private chat page from the `/private-chat` route but we also want to pass the ID of the user we are chatting with to the page so we’ll need to pass the ID using an Angular route argument.
 
Open the `src/private-chat/private-chat.module.ts` file which holds the Angular router configuration for the chat page and update it accordingly:
 

    // src/private-chat/private-chat.module.ts
    
    const routes: Routes = [
      {
        path: ':id',
        component: PrivateChatPage
      }  
    ];

### Injecting the Necessary Angular and Ionic Services

We’ll be using the Angular Router, ActivatedRoute, Ionic Storage and our custom ChatService services so we’ll need to inject them via the Angular component constructor. 

Open the `src/app/private-chat/private-chat.page.ts` file and start by adding the following imports:


    // src/app/private-chat/private-chat.page.ts
    
    import { Router, ActivatedRoute } from '@angular/router';
    import { ChatService } from '../chat.service';
    import { Storage } from '@ionic/storage';

Next, inject the services as follows:


    // src/app/private-chat/private-chat.page.ts
    
    export class PrivateChatPage implements OnInit {
      constructor(private router: Router,private route: ActivatedRoute, private chatService: ChatService, private storage: Storage) { }
    

Next, define the following TypeScript variables:


    // src/app/private-chat/private-chat.page.ts
    
      roomId;
      messageList: any[] = [];
      chatMessage: string = "";
    
      messageSubscription;
      roomSubscription;

Next, add the following initialization TS code:


    // src/app/private-chat/private-chat.page.ts
    
      async ngOnInit() {
        const userId = await this.storage.get("USER_ID");
        if(!this.chatService.isConnectedToChatkit()){
          await this.chatService.connectToChatkit(userId);
        }
        
        const otherUserId = this.route.snapshot.params.id;
        this.roomSubscription = this.chatService.getCurrentRoomId(otherUserId).subscribe(async (roomId)=>{
          this.roomId = roomId;
          this.messageSubscription = (await this.chatService.connectToRoom(roomId)).subscribe( message => {
            this.messageList.push(message);
          });
        });
      }

We retrieve the current user ID from the local storage using the Ionic 5 Storage API, next we check if the user is connected to Chatkit using the `isConnectedToChatkit()` method. It it’s not connected, we call the `connectToChatkit()` method which takes the user ID as argument and connects the user to the Chatkit instance.

Next, we retrieve the other user ID from the Angular route `:id` parameter and we use it to get the ID of the room that contains the two users (If it doesn’t exist, we create it) by calling the `getCurrentRoomId()` method of our Angular `ChatService`. Since this method is asynchronous, we need to subscribe to the returned RxJS subject to get the room ID.

We also store the retrieved private room ID in the `roomId` variable of the component. This way we can call it from the other methods of the Angular component.

After that, we call the `connectToRoom()` method of `ChatService` to subscribe the current user to the room identified by the retrieved ID.  Since the method returns an Observable, we subscribed to it and pushed any received chat message to the `messageList` array using the `push` method.

We'll see later how to use Angular `ngFor` directive to loop through the TypeScript array in the template and display each message in the chat room UI. 

> **Note**: We added the `async` keyword before the `ngOnInit()` hook because we are using the `await` keyword in the body. 

## Adding a TypeScript Method for Sending Chat Messages

After adding the code for getting the room messages from the Chatkit instance, let’s now implement a TypeScript method for sending a message to a private chat room. In the same `src/app/private-chat/private-chat.page.ts` file, add the following TypeScript method to the Angular component:


    // src/app/private-chat/private-chat.page.ts
    
      sendMessage() {
        this.chatService.sendMessage({ text: this.chatMessage , roomId: this.roomId}).then((messageId) => {
          this.chatMessage = "";
        });
      }

In the `sendMessage()` method of the Angular component we call the `sendMessage()` method of `ChatService`, which takes an object containing the text of the message and the room ID. When the message is successfully sent we clear the message input area that’s bound to the `chatMessage` TypeScript variable.

We’ll next bind the `sendMessage()` method to an Ionic 5 button on our chat UI to enable users to send a message when clicked and also to the `keyup` event of the **Enter** key of the keyboard on the message input area.


> **Note**: Please note that we have implemented the `sendMessage()` method of `ChatService` in the previous tutorials so we will not re-implement it in this tutorial.

 This is the implementation of the `sendMessage()` method:
 

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

You can see that if the passed message object has a `roomId` key we call the `sendMessage()` of `currentUser`  to send a message to the identified room. Otherwise we send the message to the general public room.

## Building the Angular/Ionic 5 Chat UI

Let’s now add the code for creating an Ionic 5 list that will hold the latest messages in the room and an input area where users can type their messages. 

Open the `src/app/private-chat/private-chat.page.html` file and add the following code:


    <!-- src/app/private-chat/private-chat.page.html -->
    
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>
          Private Chat Room
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <div class="container">
        <div *ngFor="let msg of messageList" class="message left ">
          <img class="user-img" [src]="msg.sender.avatarURL" alt="" src="">
          <div class="msg-detail">
            <div class="msg-info">
              <p>
                {{msg.sender.name}}
              </p>
            </div>
            <div class="msg-content">
              <span class="triangle"></span>
              <p class="line-breaker">{{msg.text}}</p>
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

Next, open the `src/app/private-chat/private-chat.page.scss` file and add the following styles:


    // src/app/private-chat/private-chat.page.scss
    
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


This is a screenshot of our UI at this point:

![](https://paper-attachments.dropbox.com/s_57089A9D0F82A552286D9537A239868C316A6F717DBFD51074DF7EFC53C7E68D_1555945184874_Screenshot+from+2019-04-22+15-57-56.png)


This is our UI after sending a few messages:


![](https://paper-attachments.dropbox.com/s_57089A9D0F82A552286D9537A239868C316A6F717DBFD51074DF7EFC53C7E68D_1555948677735_Screenshot+from+2019-04-22+16-57-45.png)


## Unsubscribing from the RxJS Observables: `OnDestroy` and `ngOnDestroy()`

It’s always a good habit to unsubscribe from any RxJS Observables to avoid weird behaviors in your code. You can do that when the chat page is destroyed, so go to the `src/app/private-chat/private-chat.page.ts` file and import the `OnDestroy` interface then implement it and override the `ngOnDestroy()` method as follows:


    // src/app/private-chat/private-chat.page.ts
    
    import { OnDestroy } from '@angular/core';
    /* ... */
    
    export class PrivateChatPage implements OnInit, OnDestroy {
      /* ... */
      ngOnDestroy(){
        if(this.roomSubscription){
          this.roomSubscription.unsubscribe();
        }
        if(this.messageSubscription){
          this.messageSubscription.unsubscribe();
        }
      }
    
    }
    

This way when the user is navigated away from the private chat page, they will be unsubscribed from the `roomSubscription` and `messageSubscription` subscriptions.

[OnDestroy](https://angular.io/api/core/OnDestroy) is an Angular interface that defines the  [ngOnDestroy()](https://angular.io/api/core/OnDestroy#ngOnDestroy) life-cycle hook which gets called when a component, directive, pipe, or service is destroyed. 

## Adding the Logout TypeScript Method

Let’s also add a logout method to the private chat room. In the `src/app/private-chat/private-chat.page.html` file add an Ionic 5 button to the toolbar area as follows:


      <!-- src/app/private-chat/private-chat.page.html -->
     
      <ion-toolbar color="primary">
        <ion-title>
          Private Chat Room
        </ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="logout()">
            Logout
          </ion-button>
        </ion-buttons>
      </ion-toolbar>

We bind the `logout()` method to the `click` event of the `<ion-button>` button.

Next, open the `src/app/private-chat/private-chat.page.ts` file and import `AuthService`:


    // src/app/private-chat/private-chat.page.ts
    
    import { AuthService } from '../auth.service';

Next, let’s inject it via the Angular component constructor:


    // src/app/private-chat/private-chat.page.ts
    
      constructor(/* ... */, private authService: AuthService ) { }
    

Finally, define the `logout()` method as follows:


    // src/app/private-chat/private-chat.page.ts
    
      async logout(){
        await this.authService.logout();
        this.router.navigateByUrl('/login');
      }

We call the `logout()` method of `AuthService` and we navigate to the login page using the `navigateByUrl()` method of the Router.


> **Note**: Please note that we don’t need to unsubscribe from the RxJS Observables in the `logout()` method since the `ngOnDestroy()` method will be called when we navigate to the login page using the `navigateByUrl()` method. 
> 
> The `logout()` method of `AuthService` is already defined in the previous tutorials.

This is a screenshot of the UI after adding the logout button:


![](https://paper-attachments.dropbox.com/s_57089A9D0F82A552286D9537A239868C316A6F717DBFD51074DF7EFC53C7E68D_1555953974459_Screenshot+from+2019-04-22+18-26-04.png)


## Adding an Ionic 5 Back Button

Let’s also add a back button that allows us to go back to the previous home page from the private chat page. Go to the the `src/app/private-chat/private-chat.page.html` file and add:


    <!-- src/app/private-chat/private-chat.page.html -->
     
      <ion-toolbar color="primary">
        <!-- [...] -->
        <ion-buttons slot="start">
          <ion-back-button  defaultHref="home"></ion-back-button>
        </ion-buttons>
      </ion-toolbar> 



## Conclusion

Throughout this tutorial we’ve implemented one-to-one private chats in our Angular 9/Ionic 5 chat application so now users can either chat in a group or access a private chat room by clicking on the button with the chat bubbles icon in the list of users in the home page. You can get the source code of this demo from this GitHub [repository](https://github.com/techiediaries/chatkit-one-to-one-rooms).

We have seen:
 
- How to define a behavior subject using RxJS' `BehaviorSubject`.
- How to define and use TypeScript Arrays,
- How to use TS template strings to format unique room names using the IDs of both users,
- How to use the Array `findIndex()` method to check if a room with a specified name already exists,
- How to use the `any` type in TypeScript,
- How to transform a TypeScript promise to an RxJS Observable/Subject,
- How to use the await/async syntax to wait for the TypeScript promise.
- How to use Ionic 5 buttons with icons to create catching buttons,
- How to add a Chat UI Ionic 5 Page,
- How to pass the chat user ID to the private room route as argument,
- How to use the Angular Router, ActivatedRoute, Ionic Storage and our custom ChatService services and inject them via the Angular component constructor,
- How to use the `async/await` syntax with the Angular `ngOnInit()` hook,
- How to define and implement a TypeScript method for sending chat messages,
- How to unsubscribe from the RxJS Observables with Angular `OnDestroy` and `ngOnDestroy()`,
- How to bind methods to Ionic 5 buttons on our chat UI and also to the `keyup` event of the **Enter** key of the keyboard,
- How to add an Ionic 5 back button.

