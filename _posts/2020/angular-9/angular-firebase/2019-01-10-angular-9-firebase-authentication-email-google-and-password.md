---
layout: post
title: "Angular 10/9 Authentication with Firebase (Google, Email & Password): Login, Register, Email Verification and Password Recovery"
image: "images/content/angular.png"
excerpt: "In this tutorial, you will learn to add email and social authentication with login, register, email verification and password recovery to your Angular 10 app using Firebase and Google" 
date: 2020-08-04 
categories: angular-firebase
tags : [angular, angular-10]
---


In this tutorial, you will learn to add email and social authentication with login, register, email verification and password recovery to your Angular 10 app using Firebase and Google. 

## Angular 10 Firebase Authentication by Example

We'll be adding the following functionalities:

- Angular 10 email and password authentication with Firebase,
- Social authentication with Firebase and Google,
- Password recovery,
- Verification emails,
- Storing and accessing the authentication state using the browser's localStorage and Angular 10 Observables

> This tutorial also works with Angular 6, Angular 7 and Angular 8.

## Prerequisites

You must have the following prerequisites for this tutorial:

- Recent versions of Node.js and NPM. You can install them from their official [website](https://nodejs.org/en/download/),
- Angular CLI 10 installed (`npm install @angular/cli -g`)


## Creating the Angular 10 Project

Let's start by creating an Angular 10 project:

```bash
$ ng new angular-firebase-auth
```

Next, navigate inside the project's folder:

```bash
$ cd angular-firebase-auth
```

Finally, you can serve your web application to make sure it properly works:

```bash
$ ng serve --open
```

This will also open your browser and navigate to the `http://localhost:4200` address.

## Setting up a Firebase Project

If you don't already have a Firebase setup, you simply need to head to your [Firebase console](https://console.firebase.google.com/) and click on **Add project** then follow the steps to create a Firebase project.

![Firebase add project](https://www.diigo.com/file/image/rscqpoqzerracpoadzdpsrpbod/Firebase+console.jpg)

Enter a name for your project, accept the terms and click on the blue **Create project** button:

![Create firebase project](https://www.diigo.com/file/image/rscqpoqzerracqdpdzdpsrpbsp/Firebase+console.jpg)

Once your project is created, you need to click on it to go to the admin dashboard for that particular project.

On the dashboard, go to `Develop` > `Authentication` and click on the **Web setup** button. 
![Firebase web setup](https://www.diigo.com/file/image/rscqpoqzerracrddbzdpsrpcdo/angular-portfolio+%E2%80%93+Authentication+%E2%80%93+Firebase+console.jpg?k=4b15763837b7fdca262ff25717f2a9a5)

A popup window will be opened that contains your firebase credentials:

![](https://www.diigo.com/file/image/rscqpoqzerracrqdbzdpsrpddq/angular-portfolio+%E2%80%93+Authentication+%E2%80%93+Firebase+console.jpg)

Click on the **Copy** button to copy all code with your credentials in your clipboard:

```html
<script src="https://www.gstatic.com/firebasejs/5.7.1/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID"
  };
  firebase.initializeApp(config);
</script>
```

In our case, we only need to values of the `config` object because we'll be installing Firebase SDK from npm.

Next, you'll need to enable Email authentication from the **authentication > Sign-in** method tab:

![](https://www.diigo.com/file/image/rscqpoqzerrapdrrbzdpssaedo/angular-portfolio+%E2%80%93+Authentication+%E2%80%93+Firebase+console.jpg)

When you click on the **Set up sign-in method** button, you'll be takin to the following tab:

![](https://www.diigo.com/file/image/rscqpoqzerrapeaqqzdpssaeeo/angular-portfolio+%E2%80%93+Authentication+%E2%80%93+Firebase+console.jpg)

Click on the Email/Password row and then on **Enable** :

![](https://www.diigo.com/file/image/rscqpoqzerrapecoazdpssaeep/angular-portfolio+%E2%80%93+Authentication+%E2%80%93+Firebase+console.jpg)

Finally click on the **Save** button.

One last thing that you need to do from the console is creating a user with email and password that you'll use to login because we will not allow registration from our web application. Only the website admin will be able to access the admin interface to create their portfolio.

Go to the **authentication > Users** tab and click on the **Add user** button:

![](https://www.diigo.com/file/image/rscqpoqzerraqeerrzdpssasso/angular-portfolio+%E2%80%93+Authentication+%E2%80%93+Firebase+console.jpg)

Enter your user's credentials and click on the **Add user** button:

![](https://www.diigo.com/file/image/rscqpoqzerraqepbbzdpssbaqb/angular-portfolio+%E2%80%93+Authentication+%E2%80%93+Firebase+console.jpg)
 
## Installing AngularFire2

Head back to your terminal, make sure your are inside your Angular 10 project's root folder and run the following command to install Firebase SDK and AngularFire2 from npm:

```bash
$ npm install firebase @angular/fire --save
```

Once the library is installed, you need to add it to your application main module. 

Open the `src/app/app.module.ts`file and update it accordingly:

```typescript
// [...]
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";

var config = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID"
};
  
@NgModule({
  imports: [
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule
  ]
})
``` 

## Creating the Angular Login & Register UI Components

After setting up Firebase authentication in our project using AngularFire2, we'll now proceed to create a [register and login UI](https://www.techiediaries.com/angular/ionic-chat-ui-jwt-auth/).

Previously, we have created the `admin` module with a bunch of components to create, update and list the developer's portfolio projects. Now, let's create four more components for user registration and login. In your terminal, run these commands:

```bash
$ ng g c admin/login
$ ng g c admin/register
$ ng g c admin/forgot-password
$ ng g c admin/verify-email
```

Open the `src/app/admin/admin-routing.module.ts` file and add the paths to these components to be able to navigate between them:

```typescript
// [...]
import { LoginComponent } from  './login/login.component';
import { RegisterComponent } from  './register/register.component';
import { ForgotPasswordComponent } from  './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from  './verify-email/verify-email.component';

const  routes:  Routes  = [
{
path:  'admin',
component:  ProjectComponent,

children: [
	// [...]
	{ path:  'login',component:  LoginComponent},
	{ path:  'register', component:  RegisterComponent },
	{ path:  'forgot-password', component:  ForgotPasswordComponent },
	{ path:  'verify-email', component:  VerifyEmailComponent }
]
}
];
```

All these routes are children of the admin route. So, for example, you can access the login page from the `http://127.0.0.1:4200/admin/login` route:

![Firebase login](https://www.diigo.com/file/image/rscqpoqzerraeesqszdpsrrboe/Angular7Demo.jpg)

## Creating the Firebase Authentication Angular 10 Service

To abstract all the interactions with Firebase authentication, we will create an Angular 10 service using this command:

```bash
$ ng g s auth/auth
```

Open the `src/app/auth/auth.service.ts` file:

```ts
import { Injectable } from  '@angular/core';

@Injectable({
	providedIn:  'root'
})
export  class  AuthService {
	constructor() {}
}
```

Start by adding the following imports:

```ts
import { Router } from  "@angular/router";
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';
```

Next, add a variable to store user data:

```typescript
export class AuthService {
  user: User;
```

Next, inject the Firebase authentication service and the router via the service's constructor:

```ts
@Injectable({
	providedIn:  'root'
})
export  class  AuthService {
	user:  User;
	constructor(public  afAuth:  AngularFireAuth, public  router:  Router) { }
}
```

Next, in the constructor, we [subscribe to the authentication state](https://www.techiediaries.com/angular/ui-guards-auto-scrolling-filereader-ionic/); if the user is logged in, we  add the user's data to the browser's local storage; otherwise we store a null user: 

```typescript
    this.afAuth.authState.subscribe(user => {
      if (user){
	    this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
```

Next, add the `login()` method that will be used to login users with email and password:

```typescript
async login(email: string, password: string) {
	var result = await this.afAuth.auth.signInWithEmailAndPassword(email, password)
	this.router.navigate(['admin/list']);
}
```

Next, add the `register()` method that will be used to register users:

```ts
async register(email: string, password: string) {
	var result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
	this.sendEmailVerification();
}
```

Next, add the `sendEmailVerification()` method that will be be used to send a verification email to the user upon signup:

```ts
async sendEmailVerification() {
	await this.afAuth.auth.currentUser.sendEmailVerification()
	this.router.navigate(['admin/verify-email']);
}
```

Next, add the `sendPasswordResetEmail()` method that will be used to send a password reset email:

```ts
 async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
 }
```

Next, add the `logout()` method:

```ts
async logout(){
	await this.afAuth.auth.signOut();
	localStorage.removeItem('user');
	this.router.navigate(['admin/login']);
}
```

Next, add the `isLoggedIn()` property to check if the user is logged in:

```ts
get isLoggedIn(): boolean {
	const  user  =  JSON.parse(localStorage.getItem('user'));
	return  user  !==  null;
}
```

Finally, add `loginWithGoogle()` method that will be used to authenticate users with Google:

```ts
async  loginWithGoogle(){
	await  this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
	this.router.navigate(['admin/list']);
}
```

We are done with the authentication service. Next, we need to create the login and register UIs.

You can also read how to implement [authentication with TypeScript/Node](https://www.techiediaries.com/angular/jwt-rest-api-auth-node-typescript-typeorm-database/) stack.

### Implementing the Angular 10 Login UI

Open the `src/app/admin/login/login.component.ts` file and import then inject the authentication service:

```bash
import { Component, OnInit } from  '@angular/core';
import { AuthService } from  '../auth/auth.service';

@Component({
selector:  'app-login',
templateUrl:  './login.component.html',
styleUrls: ['./login.component.css']
})
export  class  LoginComponent  implements  OnInit {
	constructor(private  authService:  AuthService) { }
	ngOnInit() {}
}
``` 

Next, open the the `src/app/admin/login/login.component.html` file and add the following HTML code:

```html
<div class="container pt-3">
  <div class="row justify-content-sm-center">
    <div class="col-sm-10 col-md-6">
      <div class="card border-info">
        <div class="card-header">Login</div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-4 text-center">
              <img src="https://placeimg.com/128/128/nature">
            </div>
            <div class="col-md-8">
              <form>
                <input type="text" class="form-control mb-2" placeholder="Email" required autofocus>
                <input type="password" class="form-control mb-2" placeholder="Password" required>
                <button class="btn btn-lg btn-primary btn-block mb-1" type="submit">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

Let's also add some styling for adding a shadow to the form in the `src/app/admin/login/login.component.css` file:

```css
.card {
	box-shadow: 0  10px  20px  rgba(0,0,0,0.19), 0  6px  6px  rgba(0,0,0,0.23);
}
```

If you visit the `http://localhost:4200/admin/login` address, you'll see the following UI:

![Bootstrap 4 login form](https://www.diigo.com/file/image/rscqpoqzerraqapodzdpssaqda/Angular7Demo.jpg)
