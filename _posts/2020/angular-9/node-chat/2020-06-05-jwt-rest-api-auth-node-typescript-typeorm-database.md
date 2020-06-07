---
layout: post
title: "Add JWT REST API Authentication to Your Node.js/TypeScript Backend with TypeORM and SQLite3 Database"
image: "images/content/angular.png"
excerpt: "In this tutorial, we'll learn how to create a REST API server for JWT authentication using Node.js (Nest.js) and TypeScript for our Angular 9/Ionic 5 chat application" 
categories: angular
date: 2020-06-05
tags : [angular]
---

![Angular 9 and Ionic 5 Chat App](https://www.techiediaries.com/images/angular-chat-tutorial.png)

In this tutorial, we'll learn how to create a REST API server for JWT authentication using Node.js (Nest.js) and TypeScript for our Angular 9/Ionic 5 chat application. 

You'll learn what's an ORM and how to use TypeORM with TypeScript to access and work with a database 
You'll see what's JWT and how to use them to implement authentication for your REST APIs backend in TypeScript and Node using Nest.js and TypeORM for database.

These are all the tutorial parts:

- [Building a Chat App with TypeScript/Node.js, Ionic 5/Angular 9 & PubNub/Chatkit](https://www.techiediaries.com/angular/typescript-node-ionic-chat/)
- Add JWT REST API Authentication to Your Node.js/TypeScript Backend with TypeORM and SQLite3 Database
- [Building Chat App Frontend UI with JWT Auth Using Ionic 5/Angular 9](https://www.techiediaries.com/angular/ionic-chat-ui-jwt-auth/)
- [Adding UI Guards, Auto-Scrolling, Auth State, Typing Indicators and File Attachments with FileReader to your Angular 9/Ionic 5 Chat App](https://www.techiediaries.com/angular/ui-guards-auto-scrolling-filereader-ionic/)
- [Chat Read Cursors with Angular 9/Ionic 5 Chat App: Working with Textarea Keydown/Focusin Events](https://www.techiediaries.com/angular/textarea-keydown-focusin-events/)
- [Angular 9/Ionic 5 Chat App: Unsubscribe from RxJS Subjects, OnDestroy/OnInit and ChangeDetectorRef](https://www.techiediaries.com/angular/unsubscribe-rxjs-subjects-ondestroy-oninit-changedetectorref/)
- [Upload Images In TypeScript/Node & Angular 9/Ionic 5: Working with Imports, Decorators, Async/Await and FormData](https://www.techiediaries.com/angular/upload-images-typescript-node-ionic-imports-decorators-async-await-formdata/)
- [Private Chat Rooms in Angular 9/Ionic 5: Working with TypeScript Strings, Arrays, Promises, and RxJS Behavior/Replay Subjects](https://www.techiediaries.com/angular/typescript-strings-arrays-promises-rxjs-behavior-replay-subjects/)


This is the second part of our tutorial series for building a chat mobile application with Node.js, TypeScript, Ionic 5, and Angular 9. You'll learn:

- How to set up TypeORM and create a database, TypeORM is the most mature ORM in TypeScript.
- How to use SQLite database with Node and TypeScript. TypeORM supports all major databases like MySQL, PostgreSQL, MSSQL, Oracle, and MongoDB but for simplicity we'll use SQLite3.
- How to create a TypeORM entity for working with the users SQLite database.
- How to create a Nest.js service for working with the users database.
- How to enable CORS in Node and TypeScript.

> Note: Chatkit is the hosted chat service provided by Pusher which is now retired. You can either use your own hosted chat server with an open source solution like [https://chatsdk.co/](https://chatsdk.co/) which is based on Firebase or use PubNub Chat, an alternative paid service for Chatkit.

## What's a TypeScript ORM 

According to [Wikipedia](https://en.wikipedia.org/wiki/Object-relational_mapping):

>Object-relational mapping (ORM, O/RM, and O/R mapping tool) in computer science is a programming technique for converting data between incompatible type systems using object-oriented programming languages. This creates, in effect, a "virtual object database" that can be used from within the programming language.

An ORM is not specific to TypeScript but rather a general concept in software and web development. In this tutorial, we'll be using TypeORM, the most mature ORM for TypeScript.

[TypeORM](http://typeorm.io/) is an ORM for TypeScript and JavaScript (ES7, ES6, ES5). Supports MySQL, PostgreSQL, MariaDB, SQLite, MS SQL Server, Oracle, SAP Hana, WebSQL databases. Works in NodeJS, Browser, Ionic, Cordova and Electron platforms.


## Why Using SQLite

[SQLite](https://www.sqlite.org/index.html) is a C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine. SQLite is the most used database engine in the world. SQLite is built into all mobile phones and most computers and comes bundled inside countless other applications that people use every day. More 

The SQLite file format is stable, cross-platform, and backwards compatible and the developers pledge to keep it that way through at least the year 2050. SQLite database files are commonly used as containers to transfer rich content between systems and as a long-term archival format for data. There are over 1 trillion (1e12) SQLite databases in active use.

SQLite source code is in the public-domain and is free to everyone to use for any purpose. 

For the sake of simplicity, we'll use an SQLite database, but TypeORM supports all major databases like MySQL, PostgreSQL, MSSQL, Oracle, and MongoDB.

Since an ORM abstracts away any direct operation with the underlying database system, you can later switch to use a fully fledged system like MySQL for production without changing anything in your code. But for now, let's keep it simple and use SQLite.
 
## Setting up TypeORM and Creating a SQLite3 Database

For storing and registering users we need a database.

Nest.js supports [TypeORM](https://github.com/typeorm/typeorm) which is considered the most mature Object Relational Mapper (ORM) available in TypeScript. It's available from the `@nestjs/typeorm` package.

Let's start by installing the required dependencies:


    $ npm install --save @nestjs/typeorm typeorm sqlite3


After finishing up with installing the dependencies, you need to import the `TypeOrmModule` into the root `ApplicationModule` module. Open the `src/app.module.ts` file and add the following changes:


    // server/src/app.module.ts
    import { Module } from '@nestjs/common';
    import { TypeOrmModule } from '@nestjs/typeorm';
    
    import { AppController } from './app.controller';
    import { AppService } from './app.service';
    
    @Module({
      imports: [
       TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'my.db',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
       }),
    ],
      controllers: [AppController],
      providers: [AppService],
    })
    export class AppModule {}

We import `TypeOrmModule` and we call the `forRoot()` method which takes the same configuration object as the standard `createConnection()` method of [TypeORM](https://github.com/typeorm/typeorm).

In the configuration object, we specify:


- The `sqlite` string for *type* so we can use SQLite as the database,
- The `my.db` string for the database file (SQLite uses files to store the database),
- The `entities` array which refers to all files that end with `.entity.ts` or `.entity.js` extensions. These files are created by developers and contain the ORM entities.
- The `synchronize` option which takes `true` or `false` and allows you to automatically sync your database tables with the entities each time you run the app. In development, you can set it to `true` but it's not preferable in production.


> **Note:** Now, you can inject the `Connection` and `EntityManager` services anywhere you want to access them.

## Creating a TypeORM Entity for Working with Users

Next, let's create a `User` entity which corresponds to a user in the database. Create a `src/models/user.entity.ts` file and add the following class:


    // server/src/models/user.entity.ts
    import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
    @Entity()
    export class User {
      @PrimaryGeneratedColumn()
      id: number;
      
      @Column()
      name: string;
       
      @Column()
      email: string;
      
      @Column()
      password: string;
    }

You need to import the `User` entity and add it in the `imports` array of the module using the `forFeature` method:


    // server/src/app.module.ts
    import { User } from './models/user.entity';
    ...
    
    @Module({
    imports: [
    ...
    TypeOrmModule.forFeature([User]),

## Creating a Nest.js Service for Working with Users Database

Next, let's create a `UserService` that encapsulates all database operations that we need to perform against the `User` model.

Head back to your terminal and run the following command to generate a service:


    $ nest g s user

This command will create the `src/user/user.service.ts` file that contains the actual service code and the `src/user/user.service.spec.ts` file that contains the unit tests for the service. And also update the `src/app.module.ts` file by including `UserService` in the `providers` array.

Next, let's add the `create` and `findByEmail` TypeScript methods in the `src/user/user.service.ts` file  which will be used respectively to persist a user and find a user by its email in the database:


    // server/src/user/user.service.ts
    import { Injectable } from '@nestjs/common';
    import { User } from '../models/user.entity';
    import { Repository } from 'typeorm';
    import { InjectRepository } from '@nestjs/typeorm';
    
    @Injectable()
    export class UserService {
        constructor(
            @InjectRepository(User)
            private userRepository: Repository<User>,
        ) { }
    
        async  findByEmail(email: string): Promise<User> {
            return await this.userRepository.findOne({
                where: {
                    email: email,
                }
            });
        }
        
        async  create(user: User): Promise<User> {
            return await this.userRepository.save(user);
        }
    }

First we import `User`, `Repository` and `InjectRepository`, next, inject the `User` repository via the service's constructor and finally we define our TypeScript methods.

The  `findByEmail` method simply calls the  `findOne`  method of the injected repository to search for a user by the passed email in the database.

The  `create` method calls the  `save` method of the injected repository to save a user in the database. 

## Adding JWT Authentication with TypeScript and Node

Authentication is important for most web applications. You can follow different ways and approaches to implement user authentication. In this tutorial, we'll implement authentication with [JSON Web Tokens](https://jwt.io/introduction/) (JWTs).

### What's JWT

According to [Wikipedia](https://en.wikipedia.org/wiki/JSON_Web_Token):

>JSON Web Token (JWT) is an Internet standard for creating data with optional signature and/or optional encryption whose payload holds JSON that asserts some number of claims. The tokens are signed either using a private secret or a public/private key. For example, a server could generate a token that has the claim "logged in as admin" and provide that to a client. The client could then use that token to prove that it is logged in as admin.

### Implementing JWT with Nest.js JWT Utilities Module

First, you need to install the [JWT utilities module for Nest.js](https://github.com/nestjs/jwt) using :


    $ npm install --save @nestjs/jwt

Next, open the `/src/app.module.ts` file and include the module in the imports array:


    // server/src/app.module.ts
    import { JwtModule } from  '@nestjs/jwt';
    // [...]
    
    JwtModule.register({
        secretOrPrivateKey:  'secret123'
    })

We also provided a private secret key that will be used to sign the JWT payload.

To interact with our chat server, you also need valid JWT tokens that will be obtained by the client by using a token provider and will be sent with every request that the client makes to the chat server.

Chatkit provides a test token provider that can be used to quickly start testing the chat features but it should be only used for testing. For production, you need to create your own token provider which can be done in two ways:

- Either, by using the provided server SDKs.
- Or without the help of the server SDKs using a JWT library or your own custom JWT implementation. 

In this tutorial, we'll use the Node.js SDK for Chatkit to add a token provider in our Node (Nest.js) project so head back to your terminal and run the following command from the root of your project to install it:


    $ npm install @pusher/chatkit-server --save

Next, let's create the `AuthService` class that will encapsulate the code for implementing JWT authentication in our application.

Using Nest.js CLI run the following command to generate a service:


    $ nest g s auth


This command will add the `/src/auth/auth.service.ts` file that contains the service and the `/src/auth/auth.service.spec.ts` file that contains the tests for the service and will update the main app module contained in the `/src/app.module.ts` file to include the generated service.

If you open the main module file at this stage, you can see that the `JwtauthService` was imported and included in the `providers` array:


    // server/src/app.module.ts
    import { Module } from '@nestjs/common';
    import { AppController } from './app.controller';
    import { AppService } from './app.service';
    import { AuthService } from './auth/auth.service';
    // [...]
    
    @Module({
      imports: [/* [...] */],
      controllers: [AppController],
      providers: [AppService, UserService,AuthService],
    })
    export class AppModule {}

Now, after creating the service, you need to import the Chatkit server SDK, `JwtService` , `UserService` , the `User` entity and the `AuthenticationResponse`. Open the `src/auth/auth.service.ts` file and add the following import:


    // server/src/auth/auth.service.ts
    import Chatkit from '@pusher/chatkit-server';
    import { JwtService } from  '@nestjs/jwt';
    import { UserService } from  '../user/user.service';
    import { User } from  '../models/user.entity';
    import  Chatkit, { AuthenticationResponse } from  '@pusher/chatkit-server';
    

Next, you need to add the following code:


    // server/src/auth/auth.service.ts
    @Injectable()
    export class AuthService {
      chatkit: Chatkit;
      constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
      ) {
        this.chatkit = new Chatkit({
          instanceLocator: YOUR_INSTANCE_LOCATOR,
          key: YOUR_SECRET_KEY
        })    
      }

We add a member variable to the service that holds the Chatkit instance. Next we inject `UserService` and `JwtService` via the constructor and inside it, we create the Chatkit instance.

Replace `YOUR_INSTANCE_LOCATOR` and `YOUR_SECRET_KEY` with the credentials from the dashboard.
When a user connects to Chatkit, a request will be sent to a `/token` endpoint (that will be created later in this tutorial) to authenticate the user. Your server has to send a response that contains a token using the `Chatkit.authenticate` method if the request is valid.

Now, you need to define and implement the following methods:


- `getToken`: It's used to create and return a valid JWT token. This method will simply use the `authenticate` method of the Chatkit instance to generate a valid token.
- `validateUser`: It's used to validate the user. This method will use the `findByEmail` method of `UserService` to check if the user exists in the database.
- `createUser`: It's used to create a user in the local database and then in the Chatkit instance.

Let's start with the `createUser` method which takes a parameter of the `User` type:


    // server/src/auth/auth.service.ts
    private async createUser(userData: User): Promise<User>{
        return this.userService.create(userData).then(user =>{
          const userId = `${user.name}${user.id}`;
          const roomId = "YOUR_ROOM_ID";
          const avatarURL = "https://image.flaticon.com/icons/png/128/149/149071.png";
    
          return this.chatkit.createUser({id: userId, 
             name: user.name,
             avatarURL: avatarURL
          }).then(()=>{
    
            return this.chatkit.addUsersToRoom({ roomId: roomId,
              userIds: [userId]}).then(()=>{
                return user;
            });
    
          })
    
        });
    }

Replace `YOUR_ROOM_ID` with the room id from the dashboard.

This method calls the create method of `UserService` to persist the user in the database then when the `Promise` successfully resolves with a user object that has a unique identifier in the database we use the id and name to create a corresponding user in the Chatkit instance by calling the `createUser` method of the instance and finally we add the user to the room by calling the `addUsersToRoom` method.

The `createUser` method of the Chatkit instance requires a unique user identifier and a user name. We construct the user id by concatenating the name with the database id of the user. This way we make sure the Chatkit user id is unique.
We also provide a user avatar for testing using the `https://image.flaticon.com/icons/png/128/149/149071.png` URL.


> **Note:** In a production application, you need to provide your users with a way to upload their avatars then associate them with the Chatkit user. You also need to hash passwords before storing them in the database using a tool like [bcrypt](https://www.npmjs.com/package/bcrypt).

Let's now define the `getToken` method. It takes a user id and returns an `AuthenticationResponse`:


    // server/src/auth/auth.service.ts
    public getToken(userId:  string): AuthenticationResponse {
        return this.chatkit.authenticate({ userId: userId });
    }  

The `getToken` method is simply a wrapper around the `authenticate` method of the Chatkit instance which returns a valid JWT token that can be used by the client to access Chatkit APIs. The `authenticate` method takes a `userId` that we specify when we create the user in the Chatkit instance (a concatenation of the word name and the database identifier of the user).

Another method that we need to define is the `validateUser` method which takes a parameter of the `User` type:


    // server/src/auth/auth.service.ts
    private async validateUser(userData: User): Promise<User> {
        return await this.userService.findByEmail(userData.email);
    }

This method calls the `findByEmail` method of `UserService` which checks if the user with the email exists in the database. If it exists the user object is returned otherwise a null object is returned.

After defining these methods, we'll use them to define two public methods in the same service which are:


- `register` for registering users,
- `login` for login users.

This is the implementation of the two methods:


    // server/src/auth/auth.service.ts
    public async login(user: User): Promise<any | {status: number}>{
        return this.validateUser(user).then((userInfo)=>{
          if(!userInfo){
            return { status: 404 };
          }
          let userId = `${userInfo.name}${userInfo.id}`;
          const accessToken = this.jwtService.sign(userId);
          return {
             expires_in: 3600,
             access_token: accessToken,
             user_id: userId,
             status: 200
          };
    
        });
    }
    
    public async register(user: User): Promise<any>{
        return this.createUser(user)
    }

In the `login` method, we first use the `validateUser` method to make sure the user exists in the database then we call the `sign` method of `JwtService` to create an access token from the user id and name payload. Finally, we return an object containing the `expires_in`, `access_token`, `user_id` and `status` properties.

In the `register` method, we simply call the previously-defined `createUser` method to create a user in the database and then in the remote Chatkit instance.

## Creating REST API Endpoints

After implementing the `login` and `register` methods, it's time to create the corresponding endpoints in our application that handle user authentication. We also need to create a `/token` endpoint that will be used by the Chatkit client SDK to request JWT tokens from our server.

Open the existing `src/app.controller.ts` file and update it accordingly:


    // server/src/app.controller.ts
    import { Post, Body,Request, Controller} from '@nestjs/common';
    import { AuthService } from './auth/auth.service';
    import { User } from './models/user.entity';
    
    @Controller()
    export class AppController {
      constructor(private readonly authService: AuthService) {}
      
      @Post('token')
      async token(@Request() req): Promise<any> {
        return this.authService.getToken(req.query.user_id).body;
      }
    
      @Post('login')
      async login(@Body() userData: User): Promise<any> {
        return this.authService.login(userData);
      }  
    
      @Post('register')
      async register(@Body() userData: User): Promise<any> {
        return this.authService.register(userData);
      }    
    }


We start by importing the `Post`, `Request` and `Body` decorators, and also `AuthService` and the `User` entity. Next, we inject `AuthService` as an `authService` instance via the controller's constructor.

Finally, we instruct Node Nest.js to create the three `/token`, `/login` and `/register` routes that accept a POST request by decorating their methods with the `@Post` decorator (the route is passed as a parameter).

For the `login` and `register` methods, we use the `@Body()` decorator to instruct Node Nest.js to inject the body of the received request in the endpoint handler as `userData`.

For the `token` method we need the full request so we use the `@Request` decorator instead.


> **Note:** We could also create a controller for handling authentication using `nest g controller auth` but since our Node (Nest.js) app has only one task which is to handle JWT auth we can simply use the existing application controller.


## Testing our Auth REST API Endpoints

After creating the authentication endpoints, let's use cURL to test them before we create our front-end mobile application in the next tutorial.

First, run the following command from the root of your project to start the Node (Nest.js) development server:


    $ npm start 

Next, make sure you have cURL installed on your system and run the following command from your terminal:


    curl -X POST -H 'content-type: application/json'  -d  '{ "email": "ahmed@gmail.com", "name": "ahmed", "password": "pass001" }' localhost:3000/register

This will create a user in your SQLite database and a Chatkit user that you can see from the **Console/INSTANCE INSPECTOR** tab in your Chatkit dashboard. The endpoint returns the created Chatkit user with the `id`, `name`, `created_at` and `updated_at` fields.

You can also test the `/login` endpoint using:


    curl -X POST -H 'content-type: application/json'  -d  '{ "email": "ahmed@gmail.com", "password": "pass001"}' localhost:3000/login

This should return a response object with an access token and a user id.

## Enabling CORS in Node and TypeScript

Since we'll be using Ionic for creating the mobile app that will interact with this server and we'll do most Ionic development on the browser we need to setup CORS (Cross Origin Resource Sharing). Otherwise, the browsers will block the requests to the server due to the same origin policy.

You can easily enable CORS in Node Nest.js by opening the `src/main.ts` file and calling the `app.enableCors` method:


    // server/src/main.ts
    import { NestFactory } from '@nestjs/core';
    import { AppModule } from './app.module';
    
    async function bootstrap() {
      const app = await NestFactory.create(AppModule);
      app.enableCors();
      await app.listen(3000);
    }
    bootstrap();


## Conclusion

In this tutorial, we've seen how to create a REST API server for JWT authentication using Node.js (Nest.js) and TypeScript for our Angular 9/Ionic 5 chat mobile application. 

In the next tutorial, we'll continue developing our mobile application with Angular 9 and Ionic 5 that uses this server for authentication and Chatkit for implementing the chat features.

You can find the source code for the first part from this GitHub [repository](https://github.com/techiediaries/chatkit-nestjs-ionic).
