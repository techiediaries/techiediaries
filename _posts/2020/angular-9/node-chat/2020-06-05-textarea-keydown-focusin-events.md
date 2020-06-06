---
layout: post
title: "Chat Read Cursors with Angular 9/Ionic 5 Chat App: Working with Textarea Keydown/Focusin Events"
image: "images/content/angular.png"
excerpt: "In this tutorial part, we'll implement some changes in our Angular 9/Ionic 5 example app that will allow us to unsubscribe from the RxJS subjects and solve issues related to Angular Change Detection in development and duplicate messages displayed in the chat UI" 
categories: angular
date: 2020-06-06
tags : [angular]
---


Read cursors allow you to let users know how far they or other users have read the conversation. This means you can keep track of the most recently read message ID for each user of a room.

We'll learn about:
 
- Adding Chat Read Cursors to our Angular 9/Ionic 5 App
- The `readPosition` variable will be used to store the position of the read cursor of the current user. The `userTyped` variable is a `boolean` which will  be used to track if the user has typed something in the message input area and the `unreadCount` variable will store the number of the unread messages.
- Next, add the `getReadMessageId()` which returns the index in the `messageList` array of the message that was most recently read by the user
- update the `onKeydown()` method (that gets called when the `keydown` event is fired in the message `textarea`) to send the typing event and set a `userTyped` boolean variable accordingly.
- define the `onFocus()` method which gets called when the `focusin` event of the message `textarea` is fired. In this method, we set the position of the read cursor of the current user to the latest message that was received and we also call the `scrollToBottom()` method to scroll down the chat UI.

These are all the tutorial parts:

- [Building a Chat App with TypeScript/Node.js, Ionic 5/Angular 9 & PubNub/Chatkit](https://www.techiediaries.com/angular/typescript-node-ionic-chat/)
- [Add JWT REST API Authentication to Your Node.js/TypeScript Backend with TypeORM and SQLite3 Database](https://www.techiediaries.com/angular/jwt-rest-api-auth-node-typescript-typeorm-database/)
- [Building Chat App Frontend UI with JWT Auth Using Ionic 5/Angular 9](https://www.techiediaries.com/angular/ionic-chat-ui-jwt-auth/)
- [Adding UI Guards, Auto-Scrolling, Auth State, Typing Indicators and File Attachments with FileReader to your Angular 9/Ionic 5 Chat App](https://www.techiediaries.com/angular/ui-guards-auto-scrolling-filereader-ionic/)
- Chat Read Cursors with Angular 9/Ionic 5 Chat App: Working with Textarea Keydown/Focusin Events
- [Angular 9/Ionic 5 Chat App: Unsubscribe from RxJS Subjects, OnDestroy/OnInit and ChangeDetectorRef](https://www.techiediaries.com/angular/unsubscribe-rxjs-subjects-ondestroy-oninit-changedetectorref/)
- [Upload Images In TypeScript/Node & Angular 9/Ionic 5: Working with Imports, Decorators, Async/Await and FormData](https://www.techiediaries.com/angular/upload-images-typescript-node-ionic-imports-decorators-async-await-formdata/)
- [Private Chat Rooms in Angular 9/Ionic 5: Working with TypeScript Strings, Arrays, Promises, and RxJS Behavior/Replay Subjects](https://www.techiediaries.com/angular/typescript-strings-arrays-promises-rxjs-behavior-replay-subjects/)

## Adding TypeScript Methods for Setting and Reading Chat Cursors 

Let’s start with the chat service of the Angular 9/Ionic 5 frontend project. Open the `src/app/chat.service.ts` file and add the following two methods:


      // src/app/chat.service.ts
    
      setReadCursor(messageId: number , roomId = this.GENERAL_ROOM_ID){
        this.currentUser.setReadCursor({
          roomId: roomId,
          position: messageId
        })
      }
    
      getReadCursor(roomId = this.GENERAL_ROOM_ID) {    
        const cursor = this.currentUser.readCursor({
          roomId: roomId
        })
        if (cursor) {
          return cursor.position;
        } else {
          return -1;
        }
      }

The `setReadCursor()` calls the `setReadCursor()` of `currentUser` to set the position of the read cursor of the current user in the room.

The `getReadCursor()` method calls the `readCursor()` method of `currentUser` to get the position of the read cursor of the current user in the room. If the read cursor is undefined, we return `-1`. 

In both methods, if you don’t specify the room ID, the ID of our general room will be used. 

Next, open the `src/app/chat/chat.page.ts`  and start by defining these variables:


    // src/app/chat/chat.page.ts
    
    export class ChatPage implements OnInit, AfterViewChecked, OnDestroy {
      // [...]
      readPosition: number;
      userTyped = false; 
      unreadCount = 0;

The `readPosition` variable will be used to store the position of the read cursor of the current user. The `userTyped` variable is a `boolean` which will  be used to track if the user has typed something in the message input area and the `unreadCount` variable will store the number of the unread messages.

Next, add the `getReadMessageId()` which returns the index in the `messageList` array of the message that was most recently read by the user:   


      // src/app/chat/chat.page.ts
    
      getReadMessageId(){
        
        let i = 0, l = this.messageList.length;
        for(i; i < l; i++) {
          if(this.messageList[i].id == this.readPosition)
          {
            return i;
          } 
        }
        return l;
      }

We simply loop through the array and we compare the ID of the current message with the read cursor position that was previously stored in the `readPosition` variable.

Next, update the `sendMessage()` method to set the read cursor position after the user sends a message:


      // src/app/chat/chat.page.ts
    
      sendMessage() {
        this.chatService.sendMessage({ text: this.chatMessage, attachment: this.attachment }).then((messageId) => {
          this.chatMessage = "";
          this.attachment = null;
          this.scrollToBottom();
          this.chatService.setReadCursor(messageId);
        });
      }

## Updating the Textarea' `keydown` Handler Method

Also, update the `onKeydown()` method (that gets called when the `keydown` event is fired in the message `textarea`) to set the `userTyped` variable to `true`.


      //src/app/chat/chat.page.ts
    
      onKeydown(e){
        this.chatService.sendTypingEvent();
        this.userTyped = true;
      }

## Defining the Handler Method for the Textarea'`focusin` event

Next, define the `onFocus()` method which gets called when the `focusin` event of the message `textarea` is fired:


      // src/app/chat/chat.page.ts
    
      onFocus(e){    
        const messageListLength = this.messageList.length;
        let messageId = this.messageList[messageListLength - 1].id;
        this.chatService.setReadCursor(messageId);
        this.scrollToBottom();
      }


In this method, we set the position of the read cursor of the current user to the latest message that was received and we also call the `scrollToBottom()` method to scroll down the chat UI.


> **Note**: When the message `textarea` gets focus we consider that the user has read the latest messages in the room.

Next, add the `isMostRecentReadMessage()` method which returns whether a chat message is the latest read message by the user:


      // src/app/chat/chat.page.ts
    
      isMostRecentReadMessage(messageDom, msg){
        let lastMessage = this.messageList[this.messageList.length - 1];
        let messageId = Number(messageDom.getAttribute('data-message-id'));
        
        return messageId == this.readPosition && !this.userTyped && messageId !== lastMessage.id;
      }

We first get the last message in the `messageList` array, next we get the `data-message-id` attribute from the message `<div>` element in the chat UI. Finally, we we return `true` if:


- The message ID equals the read cursor position, 
- The user hasn’t typed something yet, 
- And the message is not the last message in the array.

This method will be applied on each message DOM element of the chat UI and will be used to determine if the message is the latest one read by the user.


> **Note**: We’ll use the `isMostRecentReadMessage()` to determine whether we can display the **Un-Read Messages** DOM element on the chat UI that’s why we also check if the user has typed something on the message input field. This way, once the user has started typing, the **Un-Read Messages** element will disappear.

Now, open the `src/app/chat/chat.page.html` file and start by binding the `onFocus()` method to the  `focusin` event of the message `textarea`:
 

    <!-- src/app/chat/chat.page.html -->
    
    <textarea #messageInput placeholder="Enter your message!" [(ngModel)]="chatMessage" (keyup.enter)="sendMessage()" (keydown)="onKeydown($event)" (keyup)="onKeyup($event)" (focusin)="onFocus()">   



> **Note**: The `focusin` event was already bound to the `scrollToBottom()` method that’s why we moved the call of this method to the `onFocus()` method.

Next add the `#messageId`  template variable to the `<div>` element that will contain each message and also add the `data-message-id` data attribute which holds the ID of the message contained in the `<div>` element:


    <!-- src/app/chat/chat.page.html -->
    
    <ion-content #scrollArea padding>
      <div class="container">
        <div  #messageId *ngFor="let msg of messageList" class="message left " [attr.data-message-id]="msg.id">
    

We’ll use the `messageId` template reference to pass the DOM element containing the message as the first argument of the `isMostRecentReadMessage()` method we defined earlier.

If you now inspect the chat UI with the browser dev tools, you will see that each `<div>` element contains a `data-message-id` attribute which holds the Chatkit ID of the corresponding message:


![](https://d2mxuefqeaa7sj.cloudfront.net/s_468DBFC342AD25E2619B4E2B6963F24E9CB7436BAA605239964DFA0404E7DCBC_1552354694732_Screenshot+from+2019-03-12+01-37-22.png)


Next, below the `<div>` element with the `msg-detail` class add the following code:


          <!-- src/app/chat/chat.page.html -->
    
          <div class="msg-unread" *ngIf="isMostRecentReadMessage(messageId, msg)">
            <p>Un-Read Messages: ({{unreadCount}})</p>
          </div>

We use the `ngIf` directive to display this `<div>` element after the most recent message read by the user except if it’s the last received message. This element shows the **Un-Read Massages** string ****with the number of unread messages and will disappear if the user starts typing in the message input area. 

This is the full content of the `chat.page.html` file at this point:


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
    
    <ion-content #scrollArea padding>
      <div class="container">
        <div  #messageId *ngFor="let msg of messageList" class="message left " [attr.data-message-id]="msg.id">
          <img class="user-img" [src]="msg.sender.avatarURL" alt="" src="">
          <div class="msg-detail">
            <div class="msg-info">
              <p>
                {{msg.sender.name}}
              </p>
            </div>
            <div class="msg-content">
              <span class="triangle"></span>
              <img *ngIf="msg.attachment" [src]="msg.attachment.link"
              />
              <p class="line-breaker">{{msg.text}}</p>
            </div>
            
          </div>
          <div class="msg-unread" *ngIf="isMostRecentReadMessage(messageId, msg)">
            <p>Un-Read Messages: ({{unreadCount}})</p>
    
          </div>
        </div>
      </div>
    </ion-content>
    
    <ion-footer no-border>
      <div  *ngIf="typingUsers.length > 0">
            {{ typingUsers[0] }} is typing
      </div>
      <div class="input-wrap">
    
        <textarea #messageInput placeholder="Enter your message!" [(ngModel)]="chatMessage" (keyup.enter)="sendMessage()" (keydown)="onKeydown($event)" (keyup)="onKeyup($event)" (focusin)="onFocus()">
        </textarea>
        <input #messageAttachment type="file" accept="image/x-png,image/gif,image/jpeg"
         name="myAttachment" (change)="attachFile($event)" style = "display: none;"/>
    
        <ion-button  shape="round" fill="outline" icon-only item-right (click)="messageAttachment.click()">
            <ion-icon name="folder"></ion-icon>
        </ion-button>
    
        <button ion-button clear icon-only item-right (click)="sendMessage()">
          <ion-icon name="ios-send" ios="ios-send" md="md-send"></ion-icon>
        </button>
    
          
    
      </div>
    </ion-footer>

Next, open the `src/app/chat/chat.page.scss` and add some styling for the `msg-unread` class:


    // src/app/chat/chat.page.scss
    
    .container {
     
      .message {
     // [...]
        .msg-unread{
            width: 100%;
            padding-left: 60px;
            display: inline-block;
        }
      }
    }

Here is a screenshot of the page with four unread messages:


![](https://d2mxuefqeaa7sj.cloudfront.net/s_468DBFC342AD25E2619B4E2B6963F24E9CB7436BAA605239964DFA0404E7DCBC_1552355304366_Screenshot+from+2019-03-12+01-48-10.png)


 
Now, try to send a few messages in the group then logout and login with another account, you should get  **Un-Read Messages** displayed with the count of the unread messages.


![](https://d2mxuefqeaa7sj.cloudfront.net/s_468DBFC342AD25E2619B4E2B6963F24E9CB7436BAA605239964DFA0404E7DCBC_1552857619699_Peek+2019-03-17+21-10.gif)


  
If you register a new user, their read cursor will be undefined so you will not see the **Un-Read Messages** message but once they send their first message, their read cursor will be set to that message and you’ll be able to see **Un-Read Messages** in the next time they login provided that someone has sent a message in the group.


> **Note**: For better testing results, try to use a clean browsing session. You can either use a browser which was not used before for testing the application, clear your browser history and local storage or use the incognito mode in Chrome or the private mode in Firefox.

## Conclusion

In this tutorial, we’ve implemented chat read cursors that show users the position of the latest message they have read and the count of their unread messages in the room. You can get the source code from this [GitHub repository](https://github.com/techiediaries/chatkit-profiles-read-cursors).
