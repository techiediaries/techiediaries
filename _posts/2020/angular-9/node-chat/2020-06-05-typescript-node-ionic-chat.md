---
layout: post
title: "Building a Chat App with TypeScript/Node.js, Ionic 5/Angular 9 & PubNub/Chatkit"
image: "images/content/angular.png"
excerpt: "In this first part of a tutorial series to learn how to build a fullstack mobile application with cutting edge technologies like Ionic 5, Node.js (Nest.js), TypeScript, Angular 9. you will be creating the backend project of the application with Nest.js CLI and you'll learn about the available hosted and self-hosted services for implementing chat features in your mobile and web apps" 
categories: angular
date: 2020-06-06
tags : [angular]
---

![Angular 9 and Ionic 5 Chat App](https://www.techiediaries.com/images/angular-chat-tutorial.png)

In this first part of a tutorial series to learn how to build a fullstack mobile application with cutting edge technologies like Ionic 5, Node.js (Nest.js), TypeScript, Angular 9. you will be creating the backend project of the application with Nest.js CLI and you'll learn about the available hosted and self-hosted services for implementing chat features in your mobile and web apps.

The application that you’ll be building is a group chat application that will allow users to register, login and then chat with a group of  users.

These are all the tutorial parts:

- Building a Chat App with TypeScript/Node.js, Ionic 5/Angular 9 & PubNub/Chatkit
- [Add JWT REST API Authentication to Your Node.js/TypeScript Backend with TypeORM and SQLite3 Database](https://www.techiediaries.com/angular/jwt-rest-api-auth-node-typescript-typeorm-database/)
- [Building Chat App Frontend UI with JWT Auth Using Ionic 5/Angular 9](https://www.techiediaries.com/angular/ionic-chat-ui-jwt-auth/)
- [Adding UI Guards, Auto-Scrolling, Auth State, Typing Indicators and File Attachments with FileReader to your Angular 9/Ionic 5 Chat App](https://www.techiediaries.com/angular/ui-guards-auto-scrolling-filereader-ionic/)
- [Chat Read Cursors with Angular 9/Ionic 5 Chat App: Working with Textarea Keydown/Focusin Events](https://www.techiediaries.com/angular/textarea-keydown-focusin-events/)
- [Angular 9/Ionic 5 Chat App: Unsubscribe from RxJS Subjects, OnDestroy/OnInit and ChangeDetectorRef](https://www.techiediaries.com/angular/unsubscribe-rxjs-subjects-ondestroy-oninit-changedetectorref/)
- [Upload Images In TypeScript/Node & Angular 9/Ionic 5: Working with Imports, Decorators, Async/Await and FormData](https://www.techiediaries.com/angular/upload-images-typescript-node-ionic-imports-decorators-async-await-formdata/)
- [Private Chat Rooms in Angular 9/Ionic 5: Working with TypeScript Strings, Arrays, Promises, and RxJS Behavior/Replay Subjects](https://www.techiediaries.com/angular/typescript-strings-arrays-promises-rxjs-behavior-replay-subjects/)


You'll learn about:

- How to install Nest.js CLI and create a new Node/Nest.js project
- The services for implementing chat features in your mobile apps such as Chatkit(retired) and PubNub Chat or self hosted solutions such as ChatSDK. 


The aim of this tutorial is to show you how you can use services like Pusher’s Chatkit or PubNub Chat to easily add chat features in your mobile applications built with Ionic 5, Angular 9 and Node.js (Nest.js). 

> Note: Unfortunately for us, Chatkit, the hosted chat service provided by Pusher is now retired. You can either use your own hosted chat server with an open source solution like [https://chatsdk.co/](https://chatsdk.co/) which is based on Firebase or use PubNub Chat, an alternative paid service for Chatkit. The other elements of this tutorial series are still valid provided that you replace Chatkit APIs with your own service APIs or use PubNub Chat which has provided a migration guide for Chatkit users to their API.

You can find the source code for the first part from this GitHub [repository](https://github.com/techiediaries/chatkit-nestjs-ionic).

Since we are not going to create the mobile UI in this part, we’ll be using cURL to interact with our application. This is a GIF image that shows how to send to POST request to the /register endpoint to register a user in then send a POST request to the /login endpoint to get a JWT token:

![](https://d2mxuefqeaa7sj.cloudfront.net/s_C23422D6AA37F26E11F0E28A611A6C820DD929006250197988832F5DBD6AF692_1543781563324_Peek+2018-12-02+20-08.gif)

## Prerequisites

You need to have a basic understanding Node.js to follow this tutorial. TypeScript is also needed but we'll be introducing the basic concepts of this language throughout our tutorials. TypeScript is a superset of JavaScript that adds static types to the language so if you are a JS developer, you are already familiar with a great part of TS. 

> Note: Both Nest.js and Ionic/Angular are based on TypeScript.

You also need to have a recent version of Node.js (v8.11.2) and NPM (v5.6.0) installed on your machine, if they are not installed on your system, you simply need to head to the [official website](https://nodejs.org/en/download/) and grab the binaries for your system or refer to your operating system instructions for installing Node.js via the official package manager of your system.


## Why use Chatkit or PubNub Chat?

[Chatkit](https://pusher.com/chatkit) is a Pusher hosted API that allows developers to build apps with chat features without re-inventing the wheel. The available features include:


- Group chat
- One-to-one chat
- Private chat
- Typing indicators
- "Who's online" presence
- Read receipts
- Photo, video, and audio messages

The set of features covers the most needed chat features in most apps, which means you can focus on building the features that are specific to your app and let Pusher take care of the commonly needed chat features including managing chat state and data, scaling and infrastructure.

Chatkit handles all the chat data and features but we need a server to create users and add authentication. For this matter, we'll use Nest.js for setting up an authentication server.

Since Chatkit is retired, you can replace it with [PubNub Chat](https://www.pubnub.com/products/pubnub-chat/), read [Easily Migrate from Pusher Chatkit to PubNub Chat](https://www.pubnub.com/blog/migrate-from-pusher-chatkit-to-pubnub-chat/)

PubNub Chat comes preloaded with all the chat features that users expect from a modern-day chat experience.

Compare the Pusher Chatkit feature set to that available in PubNub Chat: every feature you love in Pusher Chatkit is available in PubNub Chat. On top of that, PubNub offers additional features you like Message Reactions, Profanity Filters, Unlimited Concurrent Connections, and Unlimited Channels.

[Click here](https://www.pubnub.com/docs/chat/quickstart#chat-features) to see all features.

 
## Installing the Nest.js CLI

Before creating a Node.js (Nest.js) project we first need to install [Nest.js CLI](https://github.com/nestjs/nest-cli) which makes it easy to create and manage Nest.js projects. The CLI helps you from the first step of creating a project to the final step of building a production version of your final app. It's based on the [@angular-devkit](https://github.com/angular/devkit) package and provides its own schematics for Nest.js development which is [@nestjs/schematics](https://github.com/nestjs/schematics).

You can install Nest.js CLI from npm via the following command:


    $ npm install -g @nestjs/cli


> **Note:** Please note that you may need to use sudo on Debian based system or macOS or an elevated administrator command prompt on Windows to install Node.js globally on your system depending on your npm configuration.
> As the time of this writing, Nest.js CLI v5.6.3 will be installed. 

You can also create a Nest.js project by pulling the `nestjs/cli[:version]` Docker image or cloning the `https://github.com/nestjs/nest-cli.git` repository and installing dependencies.
For more information, you can see the official [repository](https://github.com/nestjs/nest-cli).

## Creating a New Node/Nest.js Project

After installing Nest.js CLI, you can now run the following command to easily create a new project:


    $ mkdir chatkit-nestjs-ionic
    $ cd chatkit-nestjs-ionic
    $ nest new server

The CLI will ask you for a bunch of information like the description and author and which package manager to use for installing packages, either npm or yarn, enter the required information then hit Enter to start generating your project files and installing dependencies:


![Nest.js CLI](https://i.imgur.com/CgxiiyL.png)


Wait a little to finish the installation process:


![Nest.js CLI](https://i.imgur.com/ANDDZld.png)


Then you can navigate inside your project's folder and run a local development server:


    $ cd server
    $ npm run start
    
![Nest.js development server](https://i.imgur.com/q6Rx2am.png)


As you can see from the screenshot, this command allows you to start a development server on the port configured inside the `src/main.ts` file.

Your server is now running, you can simply open your browser and navigate to `localhost:3000`. You should see the `Hello world!` message.

Since we use Chatkit for adding all chat features, we will not need to implement any feature in the server except for JWT authentication and user management.
    
## Conclusion

In this tutorial, we've seen how to create a project based on TypeScript and Node.js using the Nest.js CLI.

In the next tutorial, we'll continue developing our backend application by adding JWT authentication using TypeScript and Node/Nest.js.
