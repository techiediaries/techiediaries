---
layout: post
title: "Ionic 4 Forms Tutorial: Login & Register UI Example with Theming"
image: "images/content/angular.png"
excerpt: "In this tutorial, we'll learn to build a login and register UI with Ionic 4 and Angular forms" 
tags : [ionic] 
---

In this tutorial, we'll learn how to use Angular forms in Ionic 4 by building a simple login and registration example with theming.

In the previous tutorial, we've created a JWT authentication server with Node and Express.js and implemented an authentication service with Angular services and `HttpClient` in our Ionic 4 application.

Check out the previous tutorial: [Ionic 4 JWT Authentication Tutorial: Using Angular HttpClient with Node & Express.js Server](https://www.techiediaries.com/ionic-jwt-authentication-httpclient)


In this part, we'll create the actual UI with built-in Ionic 4 components and Angular forms.

We'll be using Ionic 4 components such as the Ionic Grid, Input fields and Buttons.

We'll also see how to use some CSS variables like `--background` and `--color` for custom theming the UI components and the color property of Ionic components to assign different types of standard Ionic colors such as the primary and secondary colors to the components.

We'll see how to use Angular routing to navigate between different pages of our Ionic 4 application.

We've created an Ionic 4 project, created a module that encapsulates authentication and created a service that implements the `register()`, `login()`, `logout()` and `isLoggedIn()` methods. Let's now create the UI pages and components.

## Creating the Register Page

Head back to your terminal and run the following command to generate a register page inside the `auth` module:

```bash
$ ionic generate page auth/register
```

This will create the following files:

- `src/app/auth/register/register.module.ts`,
- `src/app/auth/register/register.page.scss`,
- `src/app/auth/register/register.page.html`,
- `src/app/auth/register/register.page.spec.ts`,
- `src/app/auth/register/register.page.ts`

It will also update the `src/app/app-routing.module.ts`file to enable routing to this page by adding the following route:

```ts
{ path:  'register', loadChildren:  './auth/register/register.module#RegisterPageModule' },
```

This means, you can access the registration page `http://localhost:8100/register`.

Open the `src/app/auth/register/register.page.ts` file and import then inject `AuthService` and `Router`:

```ts

import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private  authService:  AuthService, private  router:  Router) { }

  ngOnInit() {
  }

}
``` 

Next, add the `register()` method that will be called for registering users:

```ts
  register(form) {
    this.authService.register(form.value).subscribe((res) => {
      this.router.navigateByUrl('home');
    });
  }
```

This method simply calls the `register()` method of `AuthService`, subscribe to the returned Observable and navigate to the home page when registration is done.

We use the `navigateByUrl()` method of the Angular Router to navigate to a page by its URL. 

The `register()` method takes an Angular form object. The `value` variable contains a JS object that corresponds to the fields of the form and their values.

Next open the `src/auth/register/register.page.html` file and add a form inside `<ion-content>`:

```html
<ion-content  color="primary">
  <form  #form="ngForm" (ngSubmit)="register(form)">
    <ion-grid>
      <ion-row color="primary" justify-content-center>
        <ion-col align-self-center size-md="6" size-lg="5" size-xs="12">
          <div text-center>
            <h3>Create your account!</h3>
          </div>
          <div padding>
            <ion-item>
              <ion-input  name="name" type="text" placeholder="Name" ngModel required></ion-input>
            </ion-item>
            <ion-item>
              <ion-input name="email" type="email" placeholder="your@email.com" ngModel required></ion-input>
            </ion-item>
            <ion-item>
              <ion-input name="password" type="password" placeholder="Password" ngModel required></ion-input>
            </ion-item>
            <ion-item>
              <ion-input name="confirm" type="password" placeholder="Password again" ngModel required></ion-input>
            </ion-item>
          </div>
          <div padding>
            <ion-button  size="large" type="submit" [disabled]="form.invalid" expand="block">Register</ion-button>
          </div>
        </ion-col>
      </ion-row>
    </ion-grid>
  </form>
</ion-content>
```

We assign the primary Ionic color to `<ion-content>` and `<ion-row>` components. 

Next, let's add some styling. Open the `src/auth/register/register.page.scss` file and add:

```css
ion-item{
    --background: #3880ff;
    --color: #fff;
}

ion-button{
    --background: #062f77;
}
```

We use the `--background` and `--color` variables to change the colors of `<ion-item>` and `<ion-button>` components.

This is the screenshot our registration page:

 ![Ionic 4 Page](https://www.diigo.com/file/image/bbccosoazescacspaezdqcrcsop/localhost_8100_register%28Galaxy+S5%29.jpg?k=deb688765fefe2d0f4e0300ff17bd641)

## Creating a Login Page

Next, let's create a login page. In your terminal, run the following command:

```bash
$ ionic generate page auth/login
```

The following files will be created:

- `src/app/auth/login/login.module.ts`, 
- `src/app/auth/login/login.page.scss`,
- `src/app/auth/login/login.page.html`,
- `src/app/auth/login/login.page.spec.ts`,
- `src/app/auth/login/login.page.ts`

The `src/app/app-routing.module.ts` will be updated with the following route:

```ts
{ path:  'login', loadChildren:  './auth/login/login.module#LoginPageModule' },
``` 
 
 The `loadChildren` property is used to lazy load the login module.

Now, open the `src/app/auth/login/login.page.ts` file, import and inject both `AuthService` and `Router`:

```ts
import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private  authService:  AuthService, private  router:  Router) { }

  ngOnInit() {
  }

}
```

Next, add the `login()` method:

```ts
  login(form){
    this.authService.login(form.value).subscribe((res)=>{
      this.router.navigateByUrl('home');
    });
  }
```

The `login()` method simply calls the `login()` method of `AuthService` and subscribe to the returned Observable then navigate to the home page when login is done.

Let's now create the login UI. Open the `src/app/auth/login/login.page.html` file and add the following code:

```html
<ion-content color="primary" padding>
  <form #form="ngForm" (ngSubmit)="login(form)">
    <ion-grid>
      <ion-row color="primary" justify-content-center>
        <ion-col align-self-center size-md="6" size-lg="5" size-xs="12">
          <div text-center>
            <h3>Login</h3>
          </div>
          <div padding>
            <ion-item>
              <ion-input name="email" type="email" placeholder="your@email.com" ngModel required></ion-input>
            </ion-item>
            <ion-item>
              <ion-input name="password" type="password" placeholder="Password" ngModel required></ion-input>
            </ion-item>
          </div>
          <div padding>
            <ion-button size="large" type="submit" [disabled]="form.invalid" expand="block">Login</ion-button>
          </div>
        </ion-col>
      </ion-row>
    </ion-grid>
  </form>
</ion-content>
```

We use the Ionic Grid to place the form elements.

Open the `src/app/auth/login/login.page.scss` file and add these styles:

```scss
ion-item{
    --background: #3880ff;
    --color: #fff;
}
ion-button{
    --background: #062f77;
}
```

Next, let's add a link to the register page to allow users to register if they don't already have an account. Inside the `<ion-grid>` component add:

```html
      <ion-row>
          <div text-center>
        If you don't have an account, please <a routerLink='/register'>
          register</a> first!
          </div>
      </ion-row>
```

We use the `routerLink` directive of Angular Router to create a link to the register page.

In the `src/app/auth/login/login.page.scss` file, add:

```scss
a{
	color: #fff;
}
```

This is a screenshot of the login page:

![Ionic 4 login page](https://www.diigo.com/file/image/bbccosoazescadpqoqzdqcrdqbc/localhost_8100_login%28Galaxy+S5%29+%281%29.jpg?k=494c78f6765776a5d76d17f1d212aaf5)

## Conclusion

That's it we have created our login and registration system using Ionic 4 and Angular 7 in the front-end and Node, Express.js in the backend.
