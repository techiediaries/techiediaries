---
layout: post
title: "Angular 9/8 MEAN Stack Authentication Tutorial & Example: Node and MongoDB Backend"
image: "images/content/angular-by-example-httpclient-get.png"
excerpt: "In this step by step tutorial, we'll be building an example app with JWT authentication and REST APIs based on the MEAN stack. We'll be using Angular 9 for the frontend and Node.js along with Express and MongoDB in the backend" 
tags : [angular, angular9, angular-9-ngif-examples, angular-9-httpclient-examples, angular-9-router-examples, angular-fullstack-examples, angular-9-form-examples] 
---

In this step by step tutorial, we'll be building an example app with JWT authentication and REST APIs based on the MEAN stack. We'll be using Angular 9 for the frontend and Node.js along with Express and MongoDB in the backend.  
 

In this tutorial, we'll particularly learn how to build the frontend and we'll be using the backend from this [example](https://github.com/techiediaries/node-mongodb-jwt-authentication) 


## What is the MEAN stack?

We'll be look at how to deal with user authentication in the MEAN stack. Our MEAN architecture comprises an Angular 9 app connected to a REST API built with Node, Express and MongoDB.
 
 
According to [Wikipedia](https://en.wikipedia.org/wiki/MEAN_(software_bundle):

 >MEAN is a free and open-source JavaScript software stack for building dynamic web sites and web applications. The MEAN stack is MongoDB, Express.js, AngularJS (or Angular), and Node.js. Because all components of the MEAN stack support programs that are written in JavaScript, MEAN applications can be written in one language for both server-side and client-side execution environments.
 
## The MEAN stack authentication flow

This is how authentication works in a MEAN stack app:

-   The flow starts from the Angular 9 application where users send the REST API implemetning the JWT authentication endpoints,
-  the Node/Express auth endpoint generates JWT tokens upon registration or login, and send them back to the Angular 9 application
-   the Angular application uses local storage to persist the JWT token, 
-   the Angular 9 application verifies the JWT tokens when rendering protected views
-   the Angular application sends the JWT token back to Node auth server when accessing protected API routes/resources.


## The steps of our Angular 9 tutorial

These are the steps of this tutorial:

1.  Step 1- Installing Angular CLI and creating an Angular 9 project
2.  Step 2 - Creating Angular 9 components
3.  Step 3 - Installing Bootstrap for styling
4.  Step 4 - Setting up the Node authentication backend  
5.  Step 5 - Setting up Angular 9 HttpClient
6. Step 6 - Creating the user authentication service 
7. Step 7 - Attaching the JWT access token to requests using Angular 9 Http Interceptors
8. Step 8 - Guarding/protecting routes from non authorized access
9. Step 9 - Setting up reactive forms
10. Step 10 - Adding the registration and login forms
11. Step 11 -  Getting the user profile
12. Step 12 - Adding the logout button

Let's get started!

## Step 1 - Installing Angular CLI and creating an Angular 9 project

In this step, we'll install Angular 9 CLI and initialize a project. You can find the full instructions in [this tutorial](https://www.techiediaries.com/angular-cli-tutorial/) but in nutshell these are the instructions that you should run in your command-line interface:
  
```bash
$ npm install --global @angular/cli@next
$ ng new angular-node-authentication-example

# ? Would you like to add Angular routing? Yes
# ? Which stylesheet format would you like to use? CSS
```

The `@next` tag is required to install Angular 9 CLI at the pre-release version.

At the time of writing this tutorial `@angular/cli v9.0.0-rc` is installed in our machine.

Next, navigate inside your project's folder and serve the application locally using the following commands :

```bash
$ cd angular-node-authentication-example
$ ng serve
```

The development server will be serving our Angular 9 app from the `http://localhost:4200/` address.

## Step 2 - Creating Angular 9 components 

In this step, we'll create the components of our application.

Our Angular app will have  the **login**,  **register**  and  **user-profile**  pages.

Open a new command-line interface and run the following commands to create the components composing the UI of our app:

```bash
$ ng generate component login
$ ng generate component register
$ ng generate component user-profile
```

Open the `src/app/app-routing.module.ts`  file and import the components then add them to `routes` array as follows:

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile/:id', component: UserProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
```

## Step 3 - Installing Bootstrap for styling

In this step, we'll install Bootstrap in our Angular project.

In your terminal run the following command:

```ts
$ npm install --save bootstrap
```

Next, add the Bootstrap 4 stylesheet path to  the `angular.json`  file as follows:

```json
"styles": [
          "node_modules/bootstrap/dist/css/bootstrap.min.css",
          "src/styles.css"
         ]
```

## Step 4 - Setting up the Node authentication backend  

In this step, we'll clone the Node authentication backend from GitHub and run it locally.
 
Head back to a new command-line interface and run the following command:

```bash
$ git clone https://github.com/techiediaries/node-mongodb-jwt-authentication.git node-mongodb-authentication-backend
```

Next, navigate to the project's folder and install the dependencies then start the server as follows:

```bash
$ cd node-mongodb-authentication-backend
$ npm install
$ npm start
```

The Node server will be available from `http://localhost:4000/`.

Next, you also need to run the `mongod` client. Open a new command-line interface and run:
 
```bash
$ mongod
```


These are the API endpoints that are exposed from the Node server:  

- POST /users/login
- POST /users/register
- GET /users/profile/id
- PUT /users/update/id
- DELETE /users/delete/id


## Step 5 - Setting up Angular 9 HttpClient 

In this step we'll import and set up HttpClient in our Angular project.

Open the `src/app/app.module.ts` file, import  `HttpClientModule`  and add it the `imports` array as follows:

```bash
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule
   ]
})
```

## Step 6 - Creating the user authentication service 

In this step, we'll create the user authentication service.
 
First, we need to create the User model inside a `src/app/user.ts` file as follows:

```ts
export class User {
    _id: String;
    name: String;
    email: String;
    password: String;
}
```

Next, head back to your command-line interface and run the following command:

```bash
$ ng generate service auth
```

Next, open the generated `src/app/auth.service.ts`  file and update it as follows:

```typescript
import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User } from './user';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  API_URL: string = 'http://localhost:4000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private httpClient: HttpClient,public router: Router){}
  
  register(user: User): Observable<any> {
   
    return this.httpClient.post(`${this.API_URL}/users/register`, user).pipe(
        catchError(this.handleError)
    )
  }
  
  login(user: User) {
    return this.httpClient.post<any>(`${this.API_URL}/users/login`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token)
        this.getUserProfile(res._id).subscribe((res) => {
          this.currentUser = res;
          this.router.navigate(['users/profile/' + res.msg._id]);
        })
      })
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  logout() {
    if (localStorage.removeItem('access_token') == null) {
      this.router.navigate(['users/login']);
    }
  }
  
  getUserProfile(id): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/users/profile/${id}`, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
```

We first import the necessary APIs like Router, HttpClient, HttpHeaders, HttpErrorResponse, Observable, throwError, catchError, map and the User class.

Next, we inject HttpClient via the service constructor and we define the `API_URL`, `headers` and `currentUser` variables. Next, we define the following methods:  

- The  `register()`  method which sends a POST request to the `users/register` endpoint for creating a user in MongoDB with information like name, email and password.
- The  `login()`  method which sends a POST request to the `users/login`endpoint and receives an HTTP responce with a JWT access token that will be used to allow the user to access the protected resources on the server.
- The `getAccessToken()` method for accessing the token stored in the local storage  after user login.
- The  `isLoggedIn()`  method which returns true if the user is logged in or otherwise false.
- The `logout()` method used to remove the access token from local storage and redirects the user to the login page.
- The `getUserProfile()` method used to send a GET request to retrive the user profile,
- The `handleError()` method used to handle any errors.  

## Step 7 - Attaching the JWT access token to requests using Angular 9 Http Interceptors

In this step, we'll create ann HTTP interceptor that will be used to attach the JWT access token to  the authorization header of the ongoing requests. 

Create the  `src/app/auth.interceptor.ts`  file and add the following code:

```typescript
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const accessToken = this.authService.getAccessToken();
        req = req.clone({
            setHeaders: {
                Authorization: `JWT $[accessToken}` 
            }
        });
        return next.handle(req);
    }
}
```

We first import the necessary APIs such as Injectable , HttpInterceptor, HttpRequest, HttpHandler and AuthService. Next, we define the interceptor class and we decorate it with `@Injectable`, we inject the auth service via the constructor and we add the `intercept()` method where we call the getAccessToken() method to retrive the JWT token from local stoage and add it to the Authorization header of the outgoing request.

Next, we need to provide this interceptor in our app module. Open the `src/app/app.module.ts` file, import the interceptor class  and add it to the providers array as follows:

```typescript
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  declarations: [...],
  imports: [HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [...]
})

export class AppModule { }
```


## Step 8 - Guarding/protecting routes from non authorized access

In this step, we'll create and set an authentication guard that will be used to protect the `users/profile/` route from non loggedin users.
   
 Head back to your command-line interface and run the following command:
   
```bash
$ ng generate guard auth
```

Next, open the `src/app/auth.guard.ts` file and add the following code:

```ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, 
UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn() !== true) {
      window.alert("Access not allowed!");
      this.router.navigate(['users/login'])
    }
    return true;
  }
}
```

Open the `src/app/app-routing.module.ts`  file and import the authentication guard and apply it to the route as follows:

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { AuthGuard } from "./auth.guard";


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile/:id', component: UserProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
```

## Step 9 - Setting up reactive forms

In this step, we'll import and set up the reactive forms module in Angular project.

Open the `src/app/app.module.ts` file and import both `ReactiveFormsModule`  and  `FormsModule` then add them to the `imports` array: 

```typescript
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
})

export class AppModule { }
```

## Step 10 - Adding the registration and login forms

In this step, we'll create the registration and login forms to our components.

Open the `src/app/register.component.ts`  file and add the following code:

```ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.registerForm= this.formBuilder.group({
      name: [''],
      email: [''],
      password: ['']
    })
  }

  ngOnInit() { }

  registerUser() {
    this.authService.register(this.registerForm.value).subscribe((res) => {
      if (res.result) {
        this.registerForm.reset()
        this.router.navigate(['login']);
      }
    })
  }
}
```

Next, open the  `src/app/register.component.html`  file and add the following code:

```markup
<div class="auth-wrapper">
    <form class="form-register" [formGroup]="registerForm" (ngSubmit)="registerUser()">
        <h3 class="h3 mb-3 font-weight-normal text-center">Register</h3>
        <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" formControlName="name" placeholder="Enter name" required>
        </div>
        <div class="form-group">
            <label>Email address</label>
            <input type="email" class="form-control" formControlName="email" placeholder="Enter email" required>
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" formControlName="password" placeholder="Password" required>
        </div>
        <button type="submit" class="btn btn-block btn-primary">Register!</button>
    </form>
</div>
```


Next, let's add the login form. Open the `src/app/login.component.ts` file and update it as follows:

```typescript
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";

import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.loginForm= this.formBuilder.group({
      email: [''],
      password: ['']
    })
  }

  ngOnInit() { }

  loginUser() {
    this.authService.login(this.loginForm.value)
  }
}
```

Next, open the  `src/app/login.component.html`  file and add the following code:

```markup
<div>
    <form class="form-login" [formGroup]="loginForm" (ngSubmit)="loginUser()">
        <h3 class="h3 mb-3 font-weight-normal text-center">Login</h3>
        <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" formControlName="email" placeholder="Enter email" required>
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" formControlName="password" placeholder="Password">
        </div>
        <button type="submit" class="btn btn-block btn-primary">Login!</button>
    </form>
</div>
```

## Step 11 -  Getting the user profile 

In this step, we'll get and display the user profile when the user is successfully logged in.

For example try to access the  `/user-profile/_id`  Angular URL without providing the invalid token. You will find out that server doesn’t render the user data.

Open the `src/app/user-profile/user-profile.component.ts` file and add the following code:

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  currentUser: Object = {};

  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile(id).subscribe(res => {
      this.currentUser = res.msg;
    })
  }

  ngOnInit() { }
}
```

Next, open the `src/app/user-profile/user-profile.component.html` file and add the following code:

```markup
<div class="container">
    <div class="row">
        <div class="col-xs-12">
            <h2 class="mb-4">Your User Information</h2>
            <p><strong>Name:</strong> {{this.currentUser.name}}</p>
            <p><strong>Email:</strong> {{this.currentUser.email}}</p>
        </div>
    </div>
</div>
```



## Step 12 - Adding the logout button

In this step, we will add the logout, hiding and showing nav items in our MEAN stack user authentication app.

Open the `src/app/app.component.ts`  file, import and inject `AuthService` and add the `logout()` method as follows:

```typescript
import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(public authService: AuthService) { }

  logout() {
    this.authService.logout()
  }
}
```

Next, open the `src/app/app.component.html`  file and add update it as follows:

```html
<div>
  <button (click)="logout()" *ngIf="this.authService.isLoggedIn()" type="button" class="btn btn-primary">Logout</button>
</div>

<router-outlet></router-outlet>
```

## Conclusion

In this tutorial, we've seen by example how to implement user authentication using REST APIs and JWT tokens in a MEAN stack web application. We've particularly looked how to create the frontend using Angular 9.
