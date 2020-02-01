---
layout: bpost
title: "Angular 9/8/7 Realtime Chat Example with Node.js, Socket.io and WebSocket"
image: "images/content/angular.jpg"
excerpt: "In this tutorial, we'll learn how to build a real-time app with Angular 9/8, Socket.IO, WebSocket, and Node.js" 
skipRss: true
tags : [angular, angular-9] 
---

In this tutorial, we'll learn how to build a real-time app with Angular 9/8, Socket.IO, and Node.js.

[Socket.IO](https://socket.io/) primarily uses the [WebSocket](https://en.wikipedia.org/wiki/WebSocket) protocol to enable real-time bidirectional communication.

WebSocket is the internet protocol that allows for full duplex communication between a server and clients. The server may send data to a client without the client initiating a request. 

Let's see how to create a simple chat server with socket.io and websockets.

## Step 1 -- Creating the Chat Server

Open a new command-line interface and run the following commands to create your server project:

```bash
$ mkdir node-realtime-server
$ cd node-realtime-server
$ mkdir src
$ npm init
$ npm install express socket.io @types/socket.io --save
```

Next, navigate inside the `src/` folder, and create a new file called  `index.js` using the following commands:

```bash
$ mkdir src
$ touch index.js
```

Open the `src/index.js` file and start by adding the following code:

```js
const express = require('express')
const app = express();

const http = require('http');
const server = http.Server(app);

const socketIO = require('socket.io');
const io = socketIO(server);

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('user connected');
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
```

We simply create an express server and use socket.io to add realtime support. Socket.io implements WebSockets with extra features like fallback for older browsers that do not support the realtime protocol. 

We create an instance of express and store it into  `app`  variable. After that we create server with  `http`  module. Then we pass  `express`  to  `http.Server()`  method. Express will serve as the handler for requests to our server. In return we get the instance of server which we store in  `server`  variable.

Next, we listen for the `connection` event of socket.io and we display the `user connected` message once a user has connected to our real-time server.

Next, we need to listen for the `new_message` event, and send the message back sent by a user to all connected users:

```js
io.on('new-message', (message) => {
  io.emit(message);
});
```

Finally, we run the server and start listenning on a specified port or 3000.

Let's now run our server by running the following command:

```bash
$ node src/index.js
```

## Step 2 -- Initializing the Angular 9 Project

Open a new command-line interface and run the following command to initialize a new project:

```bash
$ ng new angular-realtime-app
```

You will be prompted if you would like to add routing to your project - You need to answer by **Y** to set up the [router](https://www.techiediaries.com/angular-router/). For the stylesheets format, let's go with **CSS**.

Next, let's start a live-reload development server using the following commands: 

```bash
$ cd ./angular-realtime-app
$ ng serve
```

The server will be running at the `http://localhost:4200` address.

## Step 3 -- Installing the Socket.IO Wrapper

Next, navigate inside your project's folder and install `ngx-socket-io` which is a wrapper for socket.io in Angular:

```bash
$ cd angular-realtime-app
$ npm install ngx-socket-io --save  
```

## Step 4 -- Importing SocketIoModule

Open the `src/app/app.module.ts` file and start by adding the following imports: 

```ts
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
```

Next, define a configuration object for configuring socket.io as follows:

```ts
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
```

Next, include `SocketIoModule` in the  `imports`  array:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

After saving the file, you will be connected to the realtime server. You should see  a **user connected**  message in the terminal.

## Step 5 -- Creating an Angular Chat Service

Open the  `src/app/message.ts`  file and add the following code:

```ts
export class Message {
	id: string;
	body: string;
}
```

Next, run the following command to generate a service:

```bash
$ ng generate service chat
```

Open  the `src/app/chat.service.ts` file and update it as follows:

```ts
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Message } from '../message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private socket: Socket) { }
}
```

We simply import and inject the `Socket` service via the constructor.

Next, define the following method which can be used to send a new message to the real-time server:

```ts
public sendMessage(message) {
	this.socket.emit('new-message', message);
}
```

Next, we need to define a `getMessages` method for getting the messages: 


```ts
public getMessages = () => {
    return Observable.create((observer) => {
            this.socket.on('new-message', (message) => {
                observer.next(message);
            });
    });
}
```

We use the `Observable.create()` method to create and return an observable 

This will allow us to notify all observers when the socket receives a new message.

## Step 6 -- Creating the Chat UI

Next, let's create the chat UI of our application. Let's keep it simple and use the app component for displaying the UI.

Open the `src/app/app.component.ts` file and update it as follows:


```ts
import { Component } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  newMessage: string;
  messageList:  string[] = [];

  constructor(private chatService: ChatService) {
  }

  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }
  ngOnInit() {
    this.chatService
      .getMessages()
      .subscribe((message: string) => {
        this.messageList.push(message);
      });
  }
}
```

Open the `src/app/app.component.html` file and update it as follows:

```html
<div *ngFor="let message of messageList">
    {{ message }}
</div>

<input [(ngModel)]="newMessage" (keyup)="$event.keyCode == 13 && sendMessage()" />
<button (click)="sendMessage()">Send Message</button>
```

## Step 8 -- Serving the Chat Front-End


Let's now run the front-end server using the following command:


```bash
$ cd angular-realtime-app
$ ng serve
```

You can test the chat application by opening more than one browser and navigating to the `http://localhost:4200` address.

## Conclusion

In this tutorial, we have created a real-time chat example with Angular 9, Node.js, Socket.IO and WebSockets.
