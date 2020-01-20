# Angular 8/9 MEAN Stack CRUD with Angular Material 8

Last updated on  by Digamber

Today I am going to share with you an  **Angular 8/9 MEAN Stack tutorial**. In this tutorial, I’ll teach you how to build an Angular 8/9 CRUD web application from scratch with MongoDB, Express js, Node js, and Angular Material UI library.

In this MEAN stack tutorial, you’ll learn to set up a MEAN stack project from scratch. I’ll be creating back-end and front-end for a real-world CRUD web application from scratch.

For the demo purpose, I’ll create a students record management CRUD (create, read, update & delete) web application. In this CRUD app user will be able to perform the following tasks:

-   Add student ID
-   Add student name
-   Add student email
-   Add section Angular Material dropdown
-   Add multiple subjects using Angular material input chips
-   Add student’s gender using Angular material radio buttons
-   Add student date of birth using Angular material datepicker

Following topics will be covered in this tutorial:

## Angular Project Setup

-   Setting up Node js
-   Setting up Angular CLI
-   Installing & setting up Angular project
-   Creating routes to navigate between components
-   Creating Angular service to manage CRUD operations
-   Consuming RESTful APIs using Angular Service

## Angular Material UI Library

-   Setting up an Angular material ui library in a real-world Angular application.
-   Creating web application’s front-end using Angular material ui components like :-  **Angular material default theme, icons, buttons, navbar, date-picker, form, data tables and chip inputs**.

## MEAN Stack Back-end Setup

-   Set up MongoDB in Angular 8/9 MEAN stack app.
-   Setting up Express js server with Node js.
-   Creating RESTful APIs with Node js and Express js.

#### Table of Contents

1.  [Workflow of MEAN Stack Angular Material tutorial](https://www.positronx.io/angular-8-mean-stack-tutorial-build-crud-angular-material/#tc_4111_01)
2.  [Installing Node JS and Angular CLI](https://www.positronx.io/angular-8-mean-stack-tutorial-build-crud-angular-material/#tc_4111_02)
3.  [Angular Project setup](https://www.positronx.io/angular-8-mean-stack-tutorial-build-crud-angular-material/#tc_4111_03)
4.  [Setting up Angular Routes to navigate between components.](https://www.positronx.io/angular-8-mean-stack-tutorial-build-crud-angular-material/#tc_4111_04)
5.  [Setting up Angular Material UI Library in Angular project.](https://www.positronx.io/angular-8-mean-stack-tutorial-build-crud-angular-material/#tc_4111_05)
6.  [Build Mean Stack Backend with MongoDB, Node JS and Express JS.](https://www.positronx.io/angular-8-mean-stack-tutorial-build-crud-angular-material/#tc_4111_06)
7.  [Build Service to Consume REST APIs.](https://www.positronx.io/angular-8-mean-stack-tutorial-build-crud-angular-material/#tc_4111_07)
8.  [Add Student using MEAN Stack REST APIs with Angular Material.](https://www.positronx.io/angular-8-mean-stack-tutorial-build-crud-angular-material/#tc_4111_08)
9.  [Show Students List and Delete Student Object.](https://www.positronx.io/angular-8-mean-stack-tutorial-build-crud-angular-material/#tc_4111_09)
10.  [Edit Students Object.](https://www.positronx.io/angular-8-mean-stack-tutorial-build-crud-angular-material/#tc_4111_10)

### #1 Workflow of MEAN Stack Angular Material Tutorial

I’ll create application’s frontend in Angular 8/9 using Angular material 8 UI components and backend with Node js, Express js and MongoDb. To make it developer friendly I’ll create a separate project for frontend and backend. I will be building RESTful API using MEAN stack backend and will use those APIs with Angular service to consume the data.

Following technologies, will be used throughout the tutorial.

-   NPM v6.4.1
-   Node v10.15.3
-   RxJS V6.5.2
-   Angular v8.0.0
-   AngularCLI v8.0.0
-   MongoDB 4.0.6
-   MongoDB shell v4.0.6

### #2 Installing Node JS and Angular CLI

Firstly, you need to have Node.js and Angular CLI installed in your system to work with Angular 8/9 Mean stack project. To install Node.js in your system, follow this tutorial  [How To Install Node JS on Your System?](https://www.positronx.io/how-to-install-node-js-on-mac-os/)

Node.js will help us to install the required dependencies for this Mean stack project.

In the next step, we’ll be installing Angular CLI with the help of NPM. Now with the help of Angular CLI, we’ll install the new Mean stack project.

```markup
npm install @angular/cli -g
```

We’ve successfully installed Node.js and Angular CLI by now. Now we can use the  `ng`  command to generate new Angular project, components, services, routing or many more features of Angular.

## #3 Angular Project setup

We are going to build a MEAN stack web app using Angular 8/9. In our MEAN stack web app, we’ll use the Angular framework to create the frontend of the app. Run the below command to generate a new angular project.

```bash
ng new angular8-meanstack-angular-material
```

Answer some Angular CLI questions:

```bash
# ? Would you like to add Angular routing? = Yes

# ? Which stylesheet format would you like to use? = CSS

```

Head over to the newly created project folder.

```bash
cd angular8-meanstack-angular-material
```

In next step we’ll create three new components to manage Mean stack Angular CRUD app. Use Angular CLI to generate Angular components:

```bash
ng g component components/add-student --module app
ng g component components/edit-student --module app
ng g component components/students-list --module app
```

We are using  `--module app`  parameter because we have 2 module files in the app folder. Now with the –module app parameter We are telling Angular CLI that  `app.module.ts`  is our main app module file.

## #4 Setting up Routes to navigate between components.

In this part of the tutorial we’ll create routes in our Mean stack Angular 8/9 CRUD app. Routes allow us to navigate between components in Angular app.

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { StudentsListComponent } from './components/students-list/students-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-student' },
  { path: 'add-student', component: AddStudentComponent },
  { path: 'edit-student/:id', component: EditStudentComponent },
  { path: 'students-list', component: StudentsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
```

### #5 Setting up Angular Material UI Library in Angular project

We’ll be using Angular Material UI library to build students record management system. I will help you to create a beautiful responsive layout with Angular material ui components. We’ll create Mean stack CRUD app with following Angular material UI components:

-   Angular material default theme
-   Angular material date-picker
-   Angular material icons
-   Angular material buttons
-   Angular material navbar
-   Angular material form
-   Angular material data tables
-   Angular material chip inputs

Run the following command to setup Angular material.

```bash
ng add @angular/material
```

Choose the Angular material theme as per your choice:

```bash
? Choose a prebuilt theme name, or "custom" for a custom theme: Indigo/Pink

❯ Indigo/Pink        [ Preview: https://material.angular.io?theme=indigo-pink ] 
  Deep Purple/Amber  [ Preview: https://material.angular.io?theme=deeppurple-amber ] 
  Pink/Blue Grey     [ Preview: https://material.angular.io?theme=pink-bluegrey ] 
  Purple/Green       [ Preview: https://material.angular.io?theme=purple-green ]
```

Then it will ask for  **Hammer.js**  (Gesture recognition support) and  **Angular browser animation**  support.

Select yes and hit enter.

```bash
Set up HammerJS for gesture recognition? (Y/n) = Y

? Set up browser animations for Angular Material? (Y/n) = Y
```

We’ve installed Angular material UI library in Mean stack project. Now we’ll create a separate  `material.module.ts`  file. In this file we’ll import the various Angular material service so that we can use it and manage centrally in our Angular 8/9 CRUD web app.

In next step we’ll create a custom Angular material module, Create  `src > app > material.module.ts`  file and import the following Angular material UI components in this file like given below.

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
   MatButtonModule,
   MatToolbarModule,
   MatIconModule,
   MatBadgeModule,
   MatSidenavModule,
   MatListModule,
   MatGridListModule,
   MatFormFieldModule,
   MatInputModule,
   MatSelectModule,
   MatRadioModule,
   MatDatepickerModule,
   MatNativeDateModule,
   MatChipsModule,
   MatTooltipModule,
   MatTableModule,
   MatPaginatorModule
} from '@angular/material';

@NgModule({
   imports: [
      CommonModule,
      MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      MatSidenavModule,
      MatBadgeModule,
      MatListModule,
      MatGridListModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatRadioModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatChipsModule,
      MatTooltipModule,
      MatTableModule,
      MatPaginatorModule
   ],
   exports: [
      MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      MatSidenavModule,
      MatBadgeModule,
      MatListModule,
      MatGridListModule,
      MatInputModule,
      MatFormFieldModule,
      MatSelectModule,
      MatRadioModule,
      MatDatepickerModule,
      MatChipsModule,
      MatTooltipModule,
      MatTableModule,
      MatPaginatorModule
   ],
   providers: [
      MatDatepickerModule,
   ]
})

export class AngularMaterialModule { }
```

Go to  `app.module.ts`  file and import the  **AngularMaterialModule**.

```typescript
/* Angular material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [...],
  imports: [
    BrowserAnimationsModule,
    AngularMaterialModule,
  ],
  providers: [...],
  bootstrap: [...],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
```

#### Setup a basic layout with Angular Material

Go to  `app.component.html`  file and include the following code.

```markup
<!-- Toolbar -->
<mat-toolbar color="primary" class="header">
  <div>Student Records</div>
  <span class="nav-tool-items">
    <mat-icon (click)="sidenav.toggle()" class="hamburger">menu</mat-icon>
  </span>
</mat-toolbar>

<mat-sidenav-container>
  <!-- Sidenav -->
  <mat-sidenav #sidenav [mode]="isBiggerScreen() ? 'over' : 'side'" [(opened)]="opened" [fixedInViewport]="true"
    [fixedTopGap]>
    <mat-nav-list>
      <a mat-list-item routerLinkActive="active" routerLink="/add-student">
        <mat-icon>add</mat-icon> Add Student
      </a>
      <a mat-list-item routerLinkActive="active" routerLink="/students-list">
        <mat-icon>format_list_bulleted</mat-icon> View Students
      </a>
    </mat-nav-list>
  </mat-sidenav>

  <!-- Main content -->
  <mat-sidenav-content>
    <router-outlet></router-outlet>
  </mat-sidenav-content>
</mat-sidenav-container>

```

Add the following code in  `app.component.ts`  file.

```typescript
import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  opened = true;
  @ViewChild('sidenav') sidenav: MatSidenav;

  ngOnInit() {
    console.log(window.innerWidth)
    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55
      this.opened = true;
    }
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }
}
```

To set up the style add the following code in  `styles.css`  file.

```css
html,body{height:100%;}
body{margin:0;font-family:'Roboto', sans-serif;}
.header{justify-content:space-between;}
.user-profile{margin-left:15px;}
.mat-sidenav-container{height:100%;display:flex;flex:1 1 auto;}
.mat-nav-list .mat-list-item{font-size:15px;}
.nav-tool-items{display:inline-block;margin-right:13px;}
.user-profile{margin-left:15px;cursor:pointer;}
.hamburger{visibility:hidden !important;}
.mat-sidenav,.mat-sidenav-content{padding:15px;}
.mat-list-item.active{background:rgba(0, 0, 0, .04);}
.mat-sidenav-content{padding:25px 40px 0;}
.mat-sidenav{background-color:#F2F2F2;width:250px;}
.header{position:sticky;position:-webkit-sticky;top:0;z-index:1000;}
mat-sidenav mat-icon{margin-right:12px;}
.hamburger{margin-top:5px;cursor:pointer;}
.mat-radio-button,.mat-radio-group{margin-right:25px;}
.controlers-wrapper>*{width:100%;padding:0;}
.misc-bottom-padding{margin:8px 0 10px;}
.misc-bottom-padding mat-label{margin-right:15px;}
mat-radio-group mat-radio-button{margin-left:5px;}
.button-wrapper button{margin-right:5px;}
table.mat-table,table{width:100%;}
.inner-wrapper{padding:15px 0 130px;width:100%;}
.inner-wrapper mat-card{display:inline-block;margin:0 6% 0 0;vertical-align:top;width:44%;}
.full-wrapper{width:100%;}
.multiple-items{position:relative;}
.multiple-items .tooltip-info{right:0;top:7px;cursor:pointer;color:#a1a7c7;position:absolute;font-size:20px;}
body .push-right{margin-right:10px;}
.no-data{text-align:center;padding-top:30px;color:#6c75a9;}
.button-wrapper{margin:20px 0 0 0;}
@media (max-width:1024px){.inner-wrapper mat-card{width:100%;}
 .mat-sidenav-content{padding:20px 20px 0;}
 .misc-bottom-padding mat-label{display:block;padding-bottom:10px;}
 .mat-sidenav{width:230px;}
 .mat-nav-list .mat-list-item{font-size:14px;}
}
@media (max-width:767px){.nav-tool-items{margin-right:0;}
 .hamburger{visibility:visible !important;}
}

```

Your basic layout is ready ready with Angular material library, in next step we’ll set up backend using node js, express js and mongoDB.

### #6 Build Mean Stack Backend with MongoDB, Node JS and Express JS

In this part of the tutorial, we are going to build a robust Mean stack backend using mongoDB, node js, and express js.

Following topics will be covered in this part of the tutorial:

-   Create a separate project for Mean stack backend.
-   Install required dependencies using NPM: body-parser, cors, express js, mongoose, and nodemon.
-   Set up MongoDB Database connection in Mean stack app to access MongoDB database using MongoDB Shell.
-   Define a data model with mongoose JS in Mean stack project.
-   Create RESTful APIs with Express js Routes in Mean Stack Project.
-   Configure Angular 8/9 Mean Stack backend

#### Create a separate project for Mean stack backend.

In order to set up a separate Mean stack backend create a folder by the name of backend in the Angular’s root directory.

```bash
mkdir backend && cd backend
```

You’ve created the backend folder and entered into the project.

Next thing is to create a separate  `package.json`  for your Mean stack backend.

```bash
npm init
```

#### Install required dependencies using NPM: body-parser, cors, express js, mongoose, and nodemon.

After that install the required dependencies for your Mean stack app.

```bash
npm install --save express mongoose cors body-parser
```

Then install  **nodemon package**  it will save us from restarting the server every-time we make the changes in our backend code.

```bash
npm install nodemon --save-dev
```

Your  `package.json`  file for Mean stack backend will look something like this.

```bash
{
  "name": "angular8-meanstack-backend",
  "version": "1.0.0",
  "description": "An angular 8 mean stack crud web app with angular material 8.",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Digamber Rawat",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "mongoose": "^5.5.11"
  },
  "devDependencies": {
    "nodemon": "^1.19.1"
  }
}
```

#### Set up MongoDB Database connection in Mean stack app to access MongoDB database using MongoDB Shell.

To setup the MongoDB database connection within the Mean stack app, we need to create a folder by the name of  **database**  and create a file  **db.js**  there. Run the given below command.

```bash
mkdir database && cd database && touch db.js
```

Inside the  `backend > database > db.js`  file paste the following code. Here  `` `angular8mean` ``  is your mongoDB database name.

```typescript
module.exports = {
  db: 'mongodb://localhost:27017/angular8mean'
};
```

#### Define Student data model with mongoose JS in Mean stack app.

We’ll create a model folder, inside the model folder we’ll create a  **Student Schema for students collection in MongoDB**. Paste the below code in the  `model > Student.js`  file.

```typescript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Student = new Schema({
  student_name: {
    type: String
  },
  student_email: {
    type: String
  },
  section: {
    type: String
  },
  subjects: {
    type: Array
  },
  gender: {
    type: String
  },
  dob: {
    type: Date
  }
}, {
  collection: 'students'
})

module.exports = mongoose.model('Student', Student)
```

#### Create RESTful APIs with Express js Routes in Mean Stack Project.

In this Angular 8/9 Mean stack tutorial we are going to create RESTful APIs using Express js and Node js. I will create a routes folder inside the backend folder and create a  **student.routes.js**  file.

Enter the below command to create the  **routes folder**  and  `student.routes.js`  file.

```bash
mkdir routes && cd routes && touch student.route.js
```

We’ve created RESTful APIs using Express js and Student Model, now Go to  `student.route.js`  file and add the following code.

```typescript
const express = require('express');
const app = express();
const studentRoute = express.Router();

// Student model
let Student = require('../model/Student');

// Add Student
studentRoute.route('/add-student').post((req, res, next) => {
  Student.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get all student
studentRoute.route('/').get((req, res) => {
  Student.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single student
studentRoute.route('/read-student/:id').get((req, res) => {
  Student.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update student
studentRoute.route('/update-student/:id').put((req, res, next) => {
  Student.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Student successfully updated!')
    }
  })
})

// Delete student
studentRoute.route('/delete-student/:id').delete((req, res, next) => {
  Student.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = studentRoute;
```

#### Configure Mean Stack backend

Now we’ll create  **app.js**  file in backend folder’s root. Run the below command to generate  `backend > app.js`  file.

```javascript
touch app.js
```

#### Mange Backend settings in Mean stack Project.

Now we are going to create  `app.js`  file this file will hold the core logic of our Mean stack project’s backend logic. This file will manage the following things.

-   Setup port using express.
-   Setup 404 error using express js.
-   Making mongoDB database connection
-   Serving static files using express js in Mean stack app.
-   Handling errors using Express js in Angular 8/9 Mean stack project.

```typescript
let express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  dataBaseConfig = require('./database/db');

// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dataBaseConfig.db, {
  useNewUrlParser: true
}).then(() => {
    console.log('Database connected sucessfully ')
  },
  error => {
    console.log('Could not connected to database : ' + error)
  }
)

// Set up express js port
const studentRoute = require('../backend/routes/student.route')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/angular8-meanstack-angular-material')));
app.use('/', express.static(path.join(__dirname, 'dist/angular8-meanstack-angular-material')));
app.use('/api', studentRoute)

// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
```

Everything has been placed at its place, now we have to start the Angular 9 MEAN project, mongoDB server and Nodemon server.

Run the following commands…

**Start the Angular project:**

```typescript
ng serve
```

**Initialise the mongoDB database:**

```bash
cd backend && mongod
```

**Start the nodemon server:**

```bash
cd backend && nodemon
```

I hope your Mean stack backend server is running fine, you can check your frontend and backend on the following URLs:

**Angular frontend URL**:  
[http://localhost:4200](http://localhost:4200/)

**MEAN stack backend URL**:  
[http://localhost:4000/api](http://localhost:4000/api)

### MEAN stack RESTful APIs using Express JS

RESTful APIs Method

API URL

**GET**

/api

**POST**

/add-student

**GET**

/read-student/id

**PUT**

/update-student/id

**DELETE**

/delete-student/id

We can hit the below command in the terminal to check out how our newly created RESTful APIs are working.

```bash
curl -i -H "Accept: application/json" localhost:4000/api

# HTTP/1.1 200 OK
# X-Powered-By: Express
# Access-Control-Allow-Origin: *
# Content-Type: application/json; charset=utf-8
# Content-Length: 58
# ETag: W/"3a-dzxOuKmgt3HAevjaPlycYSK+FhI"
# Date: Sun, 26 May 2019 18:53:03 GMT
# Connection: keep-alive
```

If we are getting this type of response that means we are ready to go with our APIs. Or similarly we can also use  **[Postmen](https://www.getpostman.com/)  API development environment**  tool to test our RESTful APIs.

### #7 Build Angular 8/9 Service to Consume REST APIs

To create Mean stack student records management system app. We need to create a service file where we’ll consume REST APIs to manage the student data. This service file will manage the Create, Read, Update and Delete operations.

### Configure Angular HttpClientModule:

Import  `HttpClientModule`  service in  `app.module.ts`  file.

```typescript
/* Angular 8 http service */
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule
   ]
})
```

### Create & configure Student class:

Enter the below command to create  `shared > student.ts`  file.

```typescript
export class Student {
   _id: String;
   student_name: String;
   student_email: String;
   section: String;
   subjects: Array<string>;
   dob: Date;
   gender: String;
}
```

## Create Angular 8/9 service to Consume REST APIs

Enter the following command to create Angular 8/9 service to manage CRUD operations in MEAN Stack web app.

```typescript
ng g s shared/api
```

In the given below code we’ve consumed REST APIs using Angular service. Add the following code in your  `shared > api.service.ts`  file.

```typescript
import { Injectable } from '@angular/core';
import { Student } from './student';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  endpoint: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Add student
  AddStudent(data: Student): Observable<any> {
    let API_URL = `${this.endpoint}/add-student`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all students
  GetStudents() {
    return this.http.get(`${this.endpoint}`);
  }

  // Get student
  GetStudent(id): Observable<any> {
    let API_URL = `${this.endpoint}/read-student/${id}`;
    return this.http.get(API_URL, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Update student
  UpdateStudent(id, data: Student): Observable<any> {
    let API_URL = `${this.endpoint}/update/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete student
  DeleteStudent(id): Observable<any> {
    var API_URL = `${this.endpoint}/delete-student/${id}`;
    return this.http.delete(API_URL).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
```

Go to  `app.module.ts`  file and import this API service like given below.

```typescript
/* Angular 8 CRUD services */
import { ApiService } from './shared/api.service';

@NgModule({
  providers: [ApiService]
})
```

### #8 Add Student using MEAN Stack REST APIs with Angular Material

In this part of the tutorial we will learn to add student in the MongoDB database. We’ll be using Angular 8/9 Reactive form to add student in the database.

### Import ReactiveFormsModule API in App Module File

In order to work with  **Reactive Forms**  we must import the  **ReactiveFormsModule**  API and  `FormsModule`  API in  `app.module.ts`  file.

```typescript
/* Reactive form services in Angular 8 */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
})

export class AppModule { }
```

Go to  `add-student.component.ts`  file and include the given below code.

```typescript
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})

export class AddStudentComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList') chipList;
  @ViewChild('resetStudentForm') myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  studentForm: FormGroup;
  subjectArray: Subject[] = [];
  SectioinArray: any = ['A', 'B', 'C', 'D', 'E'];

  ngOnInit() {
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private studentApi: ApiService
  ) { }

  /* Reactive book form */
  submitBookForm() {
    this.studentForm = this.fb.group({
      student_name: ['', [Validators.required]],
      student_email: ['', [Validators.required]],
      section: ['', [Validators.required]],
      subjects: [this.subjectArray],
      dob: ['', [Validators.required]],
      gender: ['Male']
    })
  }

  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || '').trim() && this.subjectArray.length < 5) {
      this.subjectArray.push({ name: value.trim() })
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /* Remove dynamic languages */
  remove(subject: Subject): void {
    const index = this.subjectArray.indexOf(subject);
    if (index >= 0) {
      this.subjectArray.splice(index, 1);
    }
  }  

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.studentForm.get('dob').setValue(convertDate, {
      onlyself: true
    })
  }  

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.studentForm.controls[controlName].hasError(errorName);
  }  

  /* Submit book */
  submitStudentForm() {
    if (this.studentForm.valid) {
      this.studentApi.AddStudent(this.studentForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/students-list'))
      });
    }
  }

}
```

Then go to  `add-student.component.html`  file and add the following code.

```typescript
<!-- Title group  -->
<div class="title-group">
  <h1 class="mat-h1">Add Student</h1>
  <mat-divider fxFlex="1 0"></mat-divider>
</div>

<!-- Form -->
<div class="inner-wrapper">
  <form [formGroup]="studentForm" (ngSubmit)="submitStudentForm()" #resetStudentForm="ngForm" novalidate>
    <!-- Left block -->
    <mat-card>
      <div class="controlers-wrapper">
        <!-- Name -->
        <mat-form-field class="example-full-width">
          <input matInput placeholder="Student name" formControlName="student_name">
          <mat-error *ngIf="handleError('student_name', 'required')">
            You must provide a<strong>student name</strong>
          </mat-error>
        </mat-form-field>

        <!-- Email -->
        <mat-form-field class="example-full-width">
          <input matInput placeholder="Student email" formControlName="student_email">
          <mat-error *ngIf="handleError('student_email', 'required')">
            You must provide a<strong>student email</strong>
          </mat-error>
        </mat-form-field>

        <!-- Section -->
        <mat-form-field>
          <mat-label>Section</mat-label>
          <mat-select [(value)]="selected" formControlName="section">
            <mat-option [value]="sectioinArray" *ngFor="let sectioinArray of SectioinArray">{{sectioinArray}}
            </mat-option>
          </mat-select>
          <mat-error *ngIf="handleError('section', 'required')">
            Section is required
          </mat-error>
        </mat-form-field>
      </div>
    </mat-card>

    <!-- Right block -->
    <mat-card>
      <div class="controlers-wrapper">
        <!-- Add subjects -->
        <mat-form-field class="multiple-items">
          <mat-chip-list #chipList>
            <mat-chip *ngFor="let subjectArray of subjectArray" [selectable]="selectable" [removable]="removable"
              (removed)="remove(subjectArray)">
              {{subjectArray.name}}
              <mat-icon matChipRemove *ngIf="removable">cancel</mat-icon>
            </mat-chip>
            <input placeholder="Add subject" [matChipInputFor]="chipList"
              [matChipInputSeparatorKeyCodes]="separatorKeysCodes" [matChipInputAddOnBlur]="addOnBlur"
              (matChipInputTokenEnd)="add($event)">
          </mat-chip-list>
          <i class="material-icons tooltip-info" matTooltip="Enter subject name and press enter to add subjects">
            info
          </i>
        </mat-form-field>

        <!-- Date of birth -->
        <mat-form-field>
          <input matInput readonly [matDatepicker]="picker" placeholder="Date of birth" formControlName="dob"
            (dateChange)="formatDate($event)">
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
          <mat-error *ngIf="handleError('dob', 'required')">
            Date of birth is required
          </mat-error>
        </mat-form-field>

        <!-- Gender -->
        <div class="misc-bottom-padding">
          <mat-label>Gender:</mat-label>
          <mat-radio-group aria-label="Select an option" formControlName="gender">
            <mat-radio-button value="Male">Male</mat-radio-button>
            <mat-radio-button value="Female">Female</mat-radio-button>
          </mat-radio-group>
        </div>
      </div>
    </mat-card>

    <!-- Submit & Reset -->
    <mat-card>
      <div class="full-wrapper button-wrapper">
        <div class="button-wrapper">
          <button mat-flat-button color="warn">Submit</button>
        </div>
      </div>
    </mat-card>
  </form>
</div>
```

### #9 Show Students List and Delete Student Object

Go to  `students-list.component.ts`  file and add the given below code. In this file, we’ll manage the following tasks.

-   Implement the Angular material data tables and Pagination with Mean stack project.
-   Render Students List using Mean stack REST APIs
-   Delete Single Object using REST APIs in Mean stack app

```typescript
import { Student } from './../../shared/student';
import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})

export class StudentsListComponent implements OnInit {
  StudentData: any = [];
  dataSource: MatTableDataSource<Student>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['_id', 'student_name', 'student_email', 'section', 'action'];

  constructor(private studentApi: ApiService) {
    this.studentApi.GetStudents().subscribe(data => {
      this.StudentData = data;
      this.dataSource = new MatTableDataSource<Student>(this.StudentData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })    
  }

  ngOnInit() { }

  deleteStudent(index: number, e){
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.studentApi.DeleteStudent(e._id).subscribe()
    }
  }

}
```

Now, go to  `students-list.component.html`  file and include the following code.

```markup
<!-- Title group  -->
<div class="title-group">
  <h1 class="mat-h1">Students List</h1>
  <mat-divider fxFlex="1 0"></mat-divider>
</div>

<p *ngIf="StudentData.length <= 0" class="no-data">There is no student added yet!</p>

<div class="container" *ngIf="StudentData.length > 0">
  <div class="mat-elevation-z8">
    <table mat-table [dataSource]="dataSource">
      <ng-container matColumnDef="_id">
        <th mat-header-cell *matHeaderCellDef> Student ID </th>
        <td mat-cell *matCellDef="let element"> {{element._id}} </td>
      </ng-container>

      <ng-container matColumnDef="student_name">
        <th mat-header-cell *matHeaderCellDef> Student Name </th>
        <td mat-cell *matCellDef="let element"> {{element.student_name}} </td>
      </ng-container>

      <ng-container matColumnDef="student_email">
        <th mat-header-cell *matHeaderCellDef> Email </th>
        <td mat-cell *matCellDef="let element"> {{element.student_email}} </td>
      </ng-container>

      <ng-container matColumnDef="section">
        <th mat-header-cell *matHeaderCellDef> Section </th>
        <td mat-cell *matCellDef="let element"> {{element.section}} </td>
      </ng-container>

      <ng-container matColumnDef="action">
        <th mat-header-cell *matHeaderCellDef> Action </th>
        <td mat-cell *matCellDef="let element; let i = index;">
          <button mat-raised-button color="primary" class="push-right"
            [routerLink]="['/edit-student/', element._id]">Edit</button>
          <button mat-raised-button color="accent" (click)="deleteStudent(i, element)">Delete</button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>

    <mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator>
  </div>
</div>
```

### #10 Edit Students Object in Mean Stack App

We are going to create edit functionality using RESTful API in Mean stack app with Angular Material 8.

Go to  `edit-list.component.ts`  file and add the following code.

```typescript
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})

export class EditStudentComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList') chipList;
  @ViewChild('resetStudentForm') myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  studentForm: FormGroup;
  subjectArray: Subject[] = [];
  SectioinArray: any = ['A', 'B', 'C', 'D', 'E'];

  ngOnInit() {
    this.updateBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private studentApi: ApiService
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.studentApi.GetStudent(id).subscribe(data => {
      console.log(data.subjects)
      this.subjectArray = data.subjects;
      this.studentForm = this.fb.group({
        student_name: [data.student_name, [Validators.required]],
        student_email: [data.student_email, [Validators.required]],
        section: [data.section, [Validators.required]],
        subjects: [data.subjects],
        dob: [data.dob, [Validators.required]],
        gender: [data.gender]
      })      
    })    
  }

  /* Reactive book form */
  updateBookForm() {
    this.studentForm = this.fb.group({
      student_name: ['', [Validators.required]],
      student_email: ['', [Validators.required]],
      section: ['', [Validators.required]],
      subjects: [this.subjectArray],
      dob: ['', [Validators.required]],
      gender: ['Male']
    })
  }

  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || '').trim() && this.subjectArray.length < 5) {
      this.subjectArray.push({ name: value.trim() })
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /* Remove dynamic languages */
  remove(subject: Subject): void {
    const index = this.subjectArray.indexOf(subject);
    if (index >= 0) {
      this.subjectArray.splice(index, 1);
    }
  }

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.studentForm.get('dob').setValue(convertDate, {
      onlyself: true
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.studentForm.controls[controlName].hasError(errorName);
  }

  /* Update book */
  updateStudentForm() {
    console.log(this.studentForm.value)
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.studentApi.UpdateStudent(id, this.studentForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/students-list'))
      });
    }
  }
  
}
```

Now go to  `edit-list.component.html`  file and add the following code.

```markup
<!-- Title group  -->
<div class="title-group">
  <h1 class="mat-h1">Add Student</h1>
  <mat-divider fxFlex="1 0"></mat-divider>
</div>

<!-- Form -->
<div class="inner-wrapper">
  <form [formGroup]="studentForm" (ngSubmit)="updateStudentForm()" #resetStudentForm="ngForm" novalidate>
    <!-- Left block -->
    <mat-card>
      <div class="controlers-wrapper">
        <!-- Name -->
        <mat-form-field class="example-full-width">
          <input matInput placeholder="Student name" formControlName="student_name">
          <mat-error *ngIf="handleError('student_name', 'required')">
            You must provide a<strong>student name</strong>
          </mat-error>
        </mat-form-field>

        <!-- Email -->
        <mat-form-field class="example-full-width">
          <input matInput placeholder="Student email" formControlName="student_email">
          <mat-error *ngIf="handleError('student_email', 'required')">
            You must provide a<strong>student email</strong>
          </mat-error>
        </mat-form-field>

        <!-- Section -->
        <mat-form-field>
          <mat-label>Section</mat-label>
          <mat-select [(value)]="selected" formControlName="section">
            <mat-option [value]="sectioinArray" *ngFor="let sectioinArray of SectioinArray">{{sectioinArray}}
            </mat-option>
          </mat-select>
          <mat-error *ngIf="handleError('section', 'required')">
            Section is required
          </mat-error>
        </mat-form-field>
      </div>
    </mat-card>

    <!-- Right block -->
    <mat-card>
      <div class="controlers-wrapper">
        <!-- Add subjects -->
        <mat-form-field class="multiple-items">
          <mat-chip-list #chipList>
            <mat-chip *ngFor="let subjectArray of subjectArray" [selectable]="selectable" [removable]="removable"
              (removed)="remove(subjectArray)">
              {{subjectArray.name}}
              <mat-icon matChipRemove *ngIf="removable">cancel</mat-icon>
            </mat-chip>
            <input placeholder="Add subject" [matChipInputFor]="chipList"
              [matChipInputSeparatorKeyCodes]="separatorKeysCodes" [matChipInputAddOnBlur]="addOnBlur"
              (matChipInputTokenEnd)="add($event)">
          </mat-chip-list>
          <i class="material-icons tooltip-info" matTooltip="Enter subject name and press enter to add subjects">
            info
          </i>
        </mat-form-field>

        <!-- Date of birth -->
        <mat-form-field>
          <input matInput readonly [matDatepicker]="picker" placeholder="Date of birth" formControlName="dob"
            (dateChange)="formatDate($event)">
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
          <mat-error *ngIf="handleError('dob', 'required')">
            Date of birth is required
          </mat-error>
        </mat-form-field>

        <!-- Gender -->
        <div class="misc-bottom-padding">
          <mat-label>Gender:</mat-label>
          <mat-radio-group aria-label="Select an option" formControlName="gender">
            <mat-radio-button value="Male">Male</mat-radio-button>
            <mat-radio-button value="Female">Female</mat-radio-button>
          </mat-radio-group>
        </div>
      </div>
    </mat-card>

    <!-- Submit & Reset -->
    <mat-card>
      <div class="full-wrapper button-wrapper">
        <div class="button-wrapper">
          <button mat-flat-button color="warn">Update</button>
        </div>
      </div>
    </mat-card>
  </form>
</div>
```

#### Conclusion

Finally, we have created a basic Angular 8/9 MEAN stack CRUD web app with Angular Material. We’ve focused on every important topic in this blog. Anyhow, if we have missed anything you can check out  [GitHub repo](https://github.com/SinghDigamber/Angular8MeanstackAngularMaterial)  of this project.