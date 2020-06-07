---
layout: post
title: "Ionic 5 Firebase Authentication Tutorial"
image: "images/content/ionic.jpg"
excerpt: "This tutorial will cover how to add Email/Password authentication to Ionic 5/Angular apps using Firebase and angularfire2" 
tags : [ionic , ionic-5, firebase] 
---

In this tutorial, you will learn how to add authentication to your Ionic 5 app (based on Angular) using Firebase.

## Adding Authentication to Ionic 5 Apps with Firebase

The majority of production-ready web applications require some sort of user authentication (with the traditional email and password or the social Single Sign On via Facebook or Google etc.). In this blog post, we’ll learn how we can easily add user login and registration to Ionic 5/Angular  (mobile or web) applications with Google's Firebase, using the official *angularFire2* library for integration.


We are going to cover Email/Password authentication and Facebook social Sign In, in details. For the other methods such us Twitter, Google and GitHub or SMS and Anonymous login, we will cover them in details in other tutorials.

Before you can add authentication with Firebase to your Ionic 5/Angular or Angular 4+ app, you need to sign up for an account, create a Firebase app then get the app's URL for integrating your app with Firebase.

You can also read how to implement [JWT authentication with TypeScript, Node and Ionic 5](https://www.techiediaries.com/angular/jwt-rest-api-auth-node-typescript-typeorm-database/).

## Create a New Firebase Project

To create an account, head over to their [Getting started page](https://console.firebase.google.com/)  then follow the information there to setup your account.

Once you have created a Firebase account, you go ahead and create a project in Firebase's dashboard. Simply click on *Add project* to create a new project.

![](https://screenshots.firefoxusercontent.com/images/d0ea922a-1591-4dd8-8080-3b8f186f0c79.png)

A box will show up asking you to provide some information about your project. Just enter a name for your project then click on the *CREATE PROJECT* button.

![](https://screenshots.firefoxusercontent.com/images/095d11c2-ddf5-45b2-90c3-ecd0a8dfea7e.png) 

Your project will be created and you'll be taken to a dashboard where you can manage different settings of your app. As a first step click on *Add Firebase to your web app*

![](https://screenshots.firefoxusercontent.com/images/70d894cf-bbb5-4bcf-aad7-917d8ecc1aec.png)

Then copy the information in the configuration object

![](https://screenshots.firefoxusercontent.com/images/ff1d8348-e9bc-4fca-ab17-66c7f23355a5.png)

At this point, you'll want to wire your Firebase back-end with your Ionic 5/Angular or Angular 4 app. See [Linking Ionic 5/Angular and Angular 4 with Firebase Using AngularFire2](/#ionic-firebase-connection)
 
Close the page to return to *Project Overview*.

![](https://screenshots.firefoxusercontent.com/images/d5846828-cf1a-4fb2-aae7-0560b2c8a1bc.png)

To use the Firebase Authentication feature, we need to enable the sign-in providers we choose to use in our project. For example, if you want to use Google, Facebook and Twitter to register and log in users. Here is what you need to do:



In the left sidebar click on *Authentication* 

![](https://screenshots.firefoxusercontent.com/images/ca3be4e1-3c6b-4423-962b-6941ce5bdcb9.png)

You will be taken to a page where you can enable different methods of authentication, add users manually and customize things such as email or SMS templates.

![](https://screenshots.firefoxusercontent.com/images/84871bab-840f-4e7a-8eee-3620dddb9d49.png)

In the *Sign-In Method* tab you can enable a variety of sign-in providers such as Email and Password, Phone, Facebook, Google, Twitter, GitHub and Anonymous.

![](https://screenshots.firefoxusercontent.com/images/bc8a0b24-6c0d-43ae-b99a-5f5121b0747c.png)

You can also add authorized domains that can access your Firebase app. By default there are two: *localhost*  for development and your Firebase app's URL.

![](https://screenshots.firefoxusercontent.com/images/339ac3f3-6694-4388-b96f-a25a5d275509.png)
 
In the *Templates* tab you can customize different templates for email verification, password reset, email address change or SMS verification. You can also change the template's language. 

![](https://screenshots.firefoxusercontent.com/images/f68e18db-e37d-4819-954b-a5f09f4dfcbd.png)

Single sign on providers, such as Facebook, Twitter and Github, require you to have an app, client or API id and secret keys, and use  **OAuth** URI as the redirect URI.

So to be able to use these services with Firebase, you will have to create an application for each service by going to the associated developer account for each of these providers (Facebook, Twitter and GitHub).

## Setting Up Third-Party Services

### Creating a Facebook App

Let's start with Facebook, in order to create an app, head over to your developer apps page, add a new app by clicking on the *Add New App* button at the upper-right corner.

You'll be asked for an *App ID* and an *App Secret* which you can find in your Firebase configuration page.

The next step is to provide a  Web platform. so go ahead and click on *Add platform* then provide the *Site URL* with the OAuth URI from your Firebase configuration.

### Creating a GitHub App

If you want to add authentication with GitHub to your app, you also need to create a Github app. So go to your developer settings, and register a new application.

Then use *Client ID* and *Client Secret* in your Firebase configuration page.

Make sure to fill in the Authorization callback URL for your GitHub app using the OAuth URI from Firebase.

### Creating a Twitter App

To create a Twitter app, you need to go to Twitter Management settings, then create a new application.


Make sure to fill in the *Callback URL* in the *Settings* tab using the OAuth URI from Firebase.

Next you'll need to add your application *API key* and *API Secret* in your Firebase configuration.


That's it. Now you can add third-party social authentication with Google, Twitter, Github and Facebook, with Firebase, to your web application.


### <a id="ionic-firebase-connection">Linking Ionic 5/Angular and Angular 4 with Firebase Using AngularFire2 </a>

There are many ways to integrate Firebase with Ionic and Angular. Let's cover one of them--- AngularFire2.

[AngularFire2](https://github.com/angular/angularfire2) is the official library for Firebase and Angular integration. It provides many features over the other ways of integrating Firebase with Ionic and Angular, such as:

> * Observable based - Use the power of RxJS, Angular, and Firebase.
> * Realtime bindings - Synchronize data in realtime. 
> * Authentication - Log users in with a variety of providers and monitor authentication state in realtime.
> * Offline Data - Store data offline automatically with
> * AngularFirestore. ngrx friendly - Integrate with ngrx using
> * AngularFire's action based APIs.--[https://github.com/angular/angularfire2](https://github.com/angular/angularfire2)

Now let's see an example of how to use **AngularFire2** with Ionic 5/Angular.

## Email and Password Authentication with Firebase

In this application, I’m going to use the traditional Email and Password Authentication scheme.

### Create an Ionic 5/Angular Application

So make sure you’ve got the newest Ionic CLI. If not, either update or install the latest version of Ionic CLI then follow these steps:

Let's start by generating a new Ionic 5/Angular project. Head over to your terminal or command prompt (on Windows) then run the following:

```bash
$ ionic start firebaseAuthExample blank --type=angular
```

Once your project is completly generated, navigate into the root folder then install *firebase* and *angularfire2* from npm:


```bash
npm install firebase  angularfire2 --save
```

This will install *angularfire2* and *firebase* and add them to `package.json` as dependencies.

Open `src/app/app.module.ts` in Ionic project then add the following to import **AngularFireModule** and **AngularFireAuthModule**

```ts
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth'
```

Copy the config information from *Add Firebase to your web app* page

![](https://screenshots.firefoxusercontent.com/images/ff1d8348-e9bc-4fca-ab17-66c7f23355a5.png)

```ts
var CREDENTIALS = {
	apiKey: '<your-key>',
    authDomain: '<your-project-authdomain>',
    databaseURL: '<your-database-URL>',
    projectId: '<your-project-id>',
    storageBucket: '<your-storage-bucket>',
    messagingSenderId: '<your-messaging-sender-id>'
  
};
```

Now you need to add **AngularFireModule** and **AngularFireAuthModule** modules to your project's `src/app/app.module.ts`. And pass the configuration object (CREDENTIALS) to  *initializeApp()* function.

```ts
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(CREDENTIALS),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

You can now serve your application with:

```bash
$ ionic serve
```

## Enabling Email And Password Authentication

If not done yet! make sure to enable Email and password Authentication by going to the Authentication tab we previously saw then enable the **Email/Password** method from within the **Sign-In Method** tab.


![](https://screenshots.firefoxusercontent.com/images/85e17488-58b4-4605-b60e-913bc5f89304.png)


### Adding Authentication

Next you need to create the [Ionic Login and Register pages](https://www.techiediaries.com/angular/ionic-chat-ui-jwt-auth/) by following these steps:

* first inject **AngularFireAuth** into the component's constructor 
* next use the injected instance (let's call it *fAuth*) to call *this.fAuth.auth.signInWithEmailAndPassword(user.email, user.password)* for authenticating a user with email and password and *this.fAuth.auth.createUserWithEmailAndPassword(user.email,user.password)* for registering users.
* use *this.fAuth.auth.logout()* method to sign out
* you can also add social sign in with *this.fAuth.auth.login({provider:number, method: AuthMethods})*

### Adding a Register Page

Let's now generate a *Register* page which allows users to register an account, if they are not registered, by providing their email and password. We'll use a form with two `<ion-input>` controls for getting the email and password credentials and a `<button>` to register the user.
 
So head back to your terminal then run the following command:

```bash
$ ionic generate page Register
```

This will generate a *RegisterPage* and will add it to your project's `src/app/app.module.ts`.

Open `register.ts` then add the following code to register users:

```ts
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

export class User {
    email: string;
    password: string;
}


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public user:User = new User();

  constructor(public navCtrl: NavController, public navParams: NavParams,public fAuth: AngularFireAuth){
  }
 
 
  async register() {
    try {
      var r = await this.fAuth.auth.createUserWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      if (r) {
        console.log("Successfully registered!");
        this.navCtrl.setRoot('LoginPage');
      }
      
    } catch (err) {
      console.error(err);
    }
  }
}

```

We have injected *AngularFireAuth* as *fAuth* then used  `this.fAuth.auth.createUserWithEmailAndPassword(email,password)` to create a user in our project's associated Firebase database. This method returns a Promise so we have used the new **async/await** instructions to wait for the promise to return. We have also wrapped the registration logic with a **try/catch** block to catch unexpected errors. 

If the user is successfully registered we redirect him to the login page that we are going to create next.

Next open `register.html` then add the following code to create a simple interface for getting the user credentials.

```html
<ion-header>
  <ion-navbar color="primary">
    <ion-title>Register</ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <ion-item>
    <ion-label>Email Address</ion-label>
    <ion-input type="text" [(ngModel)]="user.email"></ion-input>
  </ion-item>

  <ion-item>
    <ion-label>Password</ion-label>
    <ion-input type="password" [(ngModel)]="user.password"></ion-input>
  </ion-item>

  <button ion-button  (click)="register()">Register</button>
</ion-content>

``` 



### Adding a Login Page

The next step is to add a login page which will be used to login in users once they are registered.

Head back to your terminal or command prompt then run the same *ionic generate* command to create a Login page 


```bash
$ ionic generate page Login
```

Next open `login.ts` then add the following code to implement the login logic 


```ts
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

export class User {
    email: string;
    password: string;
}


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public user:User = new User();

  constructor(public navCtrl: NavController, public navParams: NavParams,public fAuth: AngularFireAuth){
  }
 
 
  async login() {
    try {
      var r = await this.fAuth.auth.signInWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      if (r) {
        console.log("Successfully logged in!");
        this.navCtrl.setRoot('HomePage');
      }
      
    } catch (err) {
      console.error(err);
    }
  }
}

```

The *login()* method has approximately the same logic of *register()*. We only switch the method `createUserWithEmailAndPassword()` with `signInWithEmailAndPassword()` then we redirect the user to *HomePage* instead of *LoginPage*.

Now open `login.html` then add the following code to create the interface:

```html
<ion-header>
  <ion-navbar color="primary">
    <ion-title>Login</ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <ion-item>
    <ion-label>Email Address</ion-label>
    <ion-input type="text" [(ngModel)]="user.email"></ion-input>
  </ion-item>

  <ion-item>
    <ion-label>Password</ion-label>
    <ion-input type="password" [(ngModel)]="user.password"></ion-input>
  </ion-item>

  <button ion-button  (click)="login()">Login</button>
</ion-content>

``` 

You should now be able to register and login using Firebase.

## Firebase Logout

You can also easily add a method for logging out users.

Open `src/pages/home/home.html` then add a button to allows users to log out once they are logged in.

```html
  <button ion-button  (click)="logout()">Logout</button>
```

Then add the following method to `src/pages/home/home.ts` which injects *AngularFireAuth* as fAuth then call `this.fAuth.auth.signOut()` to sign out.


```ts
/*...*/

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController, public navParams: NavParams,public fAuth: AngularFireAuth) {
    
  }
  logout() {
    this.fAuth.auth.signOut();
  }
}

```

## Login with Firebase and Facebook

Once you set up a Facebook app in [https://developers.facebook.com/apps](https://developers.facebook.com/apps) and you enable Facebook as a *Sign In Method* in the authentication tab (Authentication --> Sign-In Method --> Facebook).

![](https://screenshots.firefoxusercontent.com/images/8a339bc2-5a7f-49bf-a1c6-161370c93e64.png)

### Installing Cordova Plugin and Ionic Native Wrapper for Facebook

Next you need to add the Cordova plugin for Facebook

```bash
$ ionic plugin add cordova-plugin-facebook4 --variable APP_ID="YOUR_FB_APP_ID" --variable APP_NAME="YOUR_FB_APP_NAME"

```

You also need to provide the command with the Facebook's app secrets i.e *APP_ID* and *APP_NAME*. You can find them in your Facebook Developers Dashboard.

Next you need to install the Ionic Native wrapper for the Cordova plugin we just installed so again head back to your terminal and run:

```bash
npm install --save @ionic-native/facebook
``` 

You need to add this plugin to the list of providers in your Ionic app:

Open `src/app/app.module.ts` then add the following:

```ts
/*...*/
import { Facebook } from '@ionic-native/facebook';

/*...*/

@NgModule({
  /*...*/
  providers: [ /*...*/, Facebook ]

  /*...*/
})
export class AppModule {}

``` 
### Adding your Target Platforms to Facebook

One more configuration step that you need to do in order to enable Facebook social authentication is adding your target platforms (i.e Web, Android or iOS) to your Facebook app.

To add the platforms, go ahead and inside your Facebook dashboard click on settings, then, right below the app’s information you’ll see a button that says Add Platform, click it.

For either Android or iOS you have to provide Facebook with your Ionic app id. For iOS it's called *Bundle ID*, in case of Android it's called *Google Play Package Name*.

To get your app id, head over to your project's *config.xml* file  

```xml

<widget id="com.techiediaries.firebaseauthdemo" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">

```

### Signing In with Facebook

You can then login users with Facebook using one method 

```ts
  /*...*/

  import { AngularFireAuth } from 'angularfire2/auth';
  import * as firebase from 'firebase/app';
  import { Facebook } from '@ionic-native/facebook';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public user:User = new User();

  constructor(public navCtrl: NavController, public navParams: NavParams,public fAuth: AngularFireAuth){
  }
  constructor(public navCtrl: NavController,
    private fAuth: AngularFireAuth,private fb: Facebook) { }

  async loginWithFacebook() {
    try{
      await result = this.fb.login(['email']);

      const fbCredential = firebase.auth.FacebookAuthProvider.credential(result.authResponse.accessToken);

      await firebase.auth().signInWithCredential(fbCredential);

    }catch(err){
      console.error(err);
    }
      
  }
  /*...*/
}

``` 

We first imported the native Facebook plugin then injected it as fb via component constructor, next we asked the user to login to get the authorization from Facebook.

The Facebook window will be opened to ask the user to authorize our application to use his email for social login. If the user accepts the method `this.fb.login(['email])`returns with a response which contains an access token that needs be used as an argument to `firebase.auth().signInWithCredential(fbCredential)` to sign in.

Next you just need to add a button to your `src/pages/login/login.html` page 

```html

	<button ion-button outline (click)="loginWithFacebook()">Login with Facebook</button>  

```

You can test authentication with Facebook by running your app on Android or iOS

```bash
ionic cordova run android|ios

```

Please note that this implementation of *loginWithFacebook()* will not work in the browser since it uses a native Cordova plugin. In the browser you can login with Facebook using this code:

```ts
async loginWithFacebook() {
  await this.fAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider());
}
```  

### Watching the Authentication State

You can watch the authentication state by subscribing to `this.fAuth.authState` in the constructor:  

```ts
    this.fAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        console.log("The user is logged in!"); 
        
      }else
      {
        console.log("The user is not logged in!");
      }
      return;
    });

```

See how to use [RxJS BehaviorSubject to watch the auth state](https://www.techiediaries.com/angular/ui-guards-auto-scrolling-filereader-ionic/) in your Ionic 5 app.

## Conclusion

In this tutorial we have seen how to add traditional email/password authentication and social sign in with Facebook to Ionic 5/Angular using Firebase and *angularfire2*. You can also authenticate your users with the other third party services and methods such as Twitter, Google, GitHub, SMS and Firebase Anonymous which we will cover in details in the next tutorials.     

















