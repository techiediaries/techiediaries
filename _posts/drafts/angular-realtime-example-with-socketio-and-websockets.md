---
layout: bpost
title: "Angular 9/8/7 Realtime Example with with Node.js, Socket.io and WebSockets"
image: "images/content/angular.jpg"
excerpt: "In this tutorial, we'll learn how to build a real-time app with Angular 9/8, Socket.IO, and Node.js" 
skipRss: true
tags : [drafts] 
---


In this tutorial, we'll learn how to build a real-time app with Angular 9/8, Socket.IO, and Node.js.

Socket.IO primarily uses WebSocket protocol to enable real-time bidirectional communication.

WebSocket is the internet protocol that allows for full duplex communication between a server and clients. 

The server may send data to a client without the client initiating a request, 


## Step 1 - Creating the Server

Open a new terminal and run the following commands to create your server project:

```bash
$ mkdir node-realtime-server
$ cd node-realtime-server
$ mkdir src
$ npm init
$ npm install express socket.io @types/socket.io --save
```

Next, navigate inside the `src/` folder and create a new file called  `index.js`:

```bash
$ mkdir src
$ touch index.js
```

Open the `src/index.js` file and start by adding the following imports:

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

In the next two lines of code we bind the socket.IO with our http  `server:`

`let socketIO = require('socket.io');`

`let io = socketIO(server);`

After that we listen for  _connection_  event of socket.IO and we log once a user has established a connection with the server. Finally we start the server and listen on given port, in our case it is port 3000.

Lets actually start our server by running the following in  **server** folder:

`node index.js`

Consequently you should get the following message:  _“started on port: 3000”._



![](https://miro.medium.com/max/1524/1*N-0ojbMbotgoid-mEGqdHw.png)

For the _new_message_  event, you can see that we call the sockets property of  _io_. It represents all the sockets connected. So this line will actually send a message to all the sockets. We want that to show a message sent by a user to all (and itself included).

```
socket.on('new-message', (message) => {
  io.emit(message);
});
```

After the socket functions are all set up, pick a port and listen on it.

```js
http.listen(4444);
```

We now have a fully-functioning socket server for chat! Run  `$ node src/app.js`  to start it.


## Initializing the Angular 9 Project

Open a new terminal  and run the following command to initialize:

```bash
$ ng new angular-realtime-app
```

Next navigate inside your project's folder and install `ngx-socket-io` which is a wrapper for socket.io for Angular:

```bash
$ cd angular-realtime-app
$ npm install ngx-socket-io --save  
```

Next. we need to generate a class and a few components:

```bash
$ ng generate class message
$ ng generate component chatui
$ ng generate service chat
```


### Importing SocketIoModule

Open the `src/app/app.module.ts` file and add the following imports: 

```ts
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
```

Next, define a config object for socket.io configuration as follows:

```ts
const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };
```

Next, add `SocketIoModule` to the  `imports`  array:

```ts
imports: [
	BrowserModule,
	SocketIoModule.forRoot(config)
],
```

If everything went as expected after saving the changes you should see the  **‘user connected’**  message in the terminal where you started node app:

> `$ node index.js`  
> `started on port: 3000`  
> `user connected`

Hence, we can say we finally managed to connect to our Socket IO server. Now it is time to actually send some data via Socket IO events.

### Creating an Angular Service

Add a  `message.ts`  file and write:

```ts
export class Message {
	id: string;
	body: string;
}
```

In  `chat.service.ts`, add the following code:

```ts
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Message } from '../message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = 'http://localhost:3000';
  constructor(private socket: Socket) { }
}
```

## Sending a message to Socket.IO

```ts
public sendMessage(message) {
	this.socket.emit('new-message', message);
}
```

We will add a new method to our service for this purpose – `getMessages`. It will return an Observable that we will create with `Observable.create()` method. Every time socket receives a new messages we will use observer.next() to forward it to observers.

```ts
    public getMessages = () => {
        return Observable.create((observer) => {
            this.socket.on('new-message', (message) => {
                observer.next(message);
            });
        });
    }
```

### AppComponent

```ts
import { Component } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  message: string;
  messages:  string[] = [];

  constructor(private chatService: ChatService) {
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }
  ngOnInit() {
    this.chatService
      .getMessages()
      .subscribe((message: string) => {
        this.messages.push(message);
      });
  }
}
```

Now compose the two custom components by replacing the contents of the  `app.component.html`  file:

```html
<div *ngFor="let message of messages">
    {{message}}
</div>

<input [(ngModel)]="message" (keyup)="$event.keyCode == 13 && sendMessage()" />
<button (click)="sendMessage()">Send</button>



```

## Putting it all together

With our socket server running in a separate terminal process, let’s start our Angular app:

```
$ ng serve

```

Open more than one instance of http://localhost:4200 (I’ve done it here in separate browsers for added wow factor) and watch it in action.