---
layout: post
title: "Nest.js Tutorial: JWT Authentication with Passport.js"
image: ""
excerpt: "In this tutorial, we'll add JWT authentication to protect our RESTful endpoints from unauthorized access." 
tags : [nestjs] 
---

In our previous tutorial, we've seen how you can build a REST API CRUD application with Nest.js and TypeORM. In this tutorial, we'll add JWT authentication to protect our RESTful endpoints from unauthorized access.

> Make sure to read [Nest.js Tutorial: Build your First REST API CRUD App with TypeORM](https://www.techiediaries.com/nestjs-tutorial-rest-api-crud) first.

If you don't want to follow from the first part, you can also clone the repository containg the code for the REST API CRUD example using the following command:

```bash
$ git clone https://github.com/techiediaries/nestjs-crud-rest-api.git
```

Next, navigate inside the folder of your project:

```bash
$ cd nestjs-crud-rest-api
```

Next, install the dependencies using:

```bash
$ npm install
```

Finally, run the development server using:

```bash
$ npm run start:dev
```

This will start a live-reload development server at the `localhost:3000` address.

Now, let's continue developing our demo application by adding JWT authentication using Passport.js.

## Creating the Auth Module

Let's start by creating a module for encapsulating the authentication logic. Open a new terminal and run the following command:

```bash
$ nest generate module auth
``` 

This will create the `src/auth/auth.module.ts` file and update the `src/app.module.ts` file to include the module.

## Creating The User Entity Model

Next, let's create a `User` entity for creating and manipulating users. Create a `src/auth/user.entity.ts` file:

```bash
$ touch src/auth/user.entity.ts
```

Open the `src/auth/user.entity.ts` file and add the following code:

```ts
import { Entity, Column, PrimaryGeneratedColumn,BeforeInsert } from 'typeorm';
import * as crypto from 'crypto';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({default: ''})
  avatar: string;

  @Column()
  email: string;

  @BeforeInsert()
  hashPassword() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }
  @Column()
  password: string;
}
```

Next, open the `src/auth/auth.module.ts` file and add the `User` entity:

```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])]
})
export class AuthModule {}
```

Next, let's create a service for working with the `User` entity. In you terminal, run the following command:

```bash
$ nest generate service auth/user
```

Open the `src/auth/user.service.ts` file and add the following content:

```ts
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity';
```

Next inject the `User` repository via the constructor:

```ts
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }
```

Finally, add the following methods:

```ts
    async findByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({
            where: {
                email: email,
            }
        });
    }

    async findById(id: number): Promise<User> {
        return await this.userRepository.findOne({
            where: {
                id: id,
            }
        });
    }

    async create(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }
```

## Implementing JWT Authentication

To implement JWT authentication in our application we need to install a few dependencies:

```bash
$ npm install --save @nestjs/jwt passport-jwt
```

`passport-jwt` v4.0.0 and `@nestjs/jwt` v0.3.0 are installed.


The [@nestjs/jwt](https://github.com/nestjs/jwt) module provides JWT utilities for Nest.js.

The `passport-jwt` package contains the Passport JWT strategy.


Open the `src/auth/auth.module.ts` file and include the JWT module:

```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([User]),
    JwtModule.register({
        secretOrPrivateKey: 'secret12356789'
    })
    ],
    providers: [UserService]
})
export class AuthModule { }
```

Next, generate the authentication service using Nest CLI:

```bash
$ nest generate service auth/auth
```

Open the `src/auth/auth.service.ts` file and add the following imports:

```ts
import { JwtService } from  '@nestjs/jwt';
import { UserService } from  '../user/user.service';
import { User } from  './user.entity';
```

Next, inject `UserService` and `JwtService` via the constructor:

```ts
@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }
}
```

Finally, add the following methods:

```ts
    private async validate(userData: User): Promise<User> {
        return await this.userService.findByEmail(userData.email);
    }

    public async login(user: User): Promise< any | { status: number }>{
        return this.validate(user).then((userData)=>{
          if(!userData){
            return { status: 404 };
          }
          let payload = `${userData.name}${userData.id}`;
          const accessToken = this.jwtService.sign(payload);

          return {
             expires_in: 3600,
             access_token: accessToken,
             user_id: payload,
             status: 200
          };

        });
    }

    public async register(user: User): Promise<any>{
        return this.userService.create(user)
    } 
```

## Creating the JWT Authentication Endpoints

After adding the necessary methods for implementing JWT, we now need to add the authentication endpoints. In your terminal run the following command to generate a controller:

```bash
$ nest generate controller auth/auth
```

Open the `src/auth/auth/auth.controller.ts` file and add the following imports:

```ts
import { Controller, Post, Body } from  '@nestjs/common';
import { AuthService } from  '../auth.service';
import { User } from  '../user.entity';
```

Next, inject `AuthService` via the contructor:

```ts
@Controller('auth')
export  class  AuthController {
    constructor(private  readonly  authService:  AuthService) {}
}
```

Finally, add the routes:

```ts
    @Post('login')
    async login(@Body() user: User): Promise<any> {
      return this.authService.login(user);
    }  

    @Post('register')
    async register(@Body() user: User): Promise<any> {
      return this.authService.register(user);
    }  
```

You can now test your JWT endpoints using a REST API client.

To register a user, send a POST request to the `/auth/register` endpoint with the user information:

![Nest.js JWT Authentication](https://i.imgur.com/6lsiTjh.png) 

Next, you can login a user by sending a POST request to the `/auth/login` endpoint:

![Nest.js JWT Authentication](https://i.imgur.com/FWlcUH3.png)

## Conclusion

In this tutorial, we've seen how to implement JWT authentication in a Nest.js application using TypeORM and Passport.js.

