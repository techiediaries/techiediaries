---
layout: post
title: "Using NoSQL PouchDB and SQLite with Ionic 4 & Angular: A CRUD Example"
image: "images/content/ionic-sqlite-pouchdb2.jpg"
excerpt: "In this tutorial we will learn how to create a CRUD (short for: Create, Read, Update and Delete) mobile application with Ionic 4/Angular (previously Ionic 3) using PouchDB and SQLite." 
tags : [ionic]
---


![Ionic 4 PouchDB and SQLite](images/content/ionic-sqlite-pouchdb2.jpg)

In this tutorial we will learn how to create a CRUD (Short for Create, Read, Update and Delete) mobile application with Ionic 4 and Angular (previously Ionic 3) using PouchDB and SQLite.

We will cover these points:

* What is  PouchDB?
* How to create a new Ionic 4/Angular project using the Ionic CLI 5?
* How to install the SQLite 2 Cordova plugin?
* How to add the PouchDB library?
* How to add the SQLite adapter for PouchDB?
* How to create a database service for working with PouchDB?
* How to create different pages for showing, creating, editing and deleting the database records? 
* Finally how to serve the app locally and using a real device?

This tutorial assumes you already have a development machine ready and setup with:

* Node.js and NPM installed.
* The Ionic CLI 5 installed.
* Java and Android SDK tools installed in case you want to build your app for Android.
* macOS and Xcode for building iOS apps.

So if you are ready! let's get started.  

## What's PouchDB?

PouchDB in an open source NoSQL (Not only SQL) browser database based on CouchDB. It's created for the sake of enabling developers to build offline first web applications i.e apps which are capable of working offline when there is no network connection, by storing data locally on the browser's databases such as the local storage or IndexedDB and also SQLite in case of mobile apps. And syncing data with a CouchDB server when the user is back online.

For Ionic 4, you can either use local storage, IndexedDB or SQLite. The first two options have storage limits but they are faster. For an unlimited storage on mobile devices, either Android or iOS, you can use SQLite.   

PouchDB has many features. Let's see them briefly:

* It's cross-browser: it works in all major browers such as Mozilla Firefox, Google Chrome, Opera, Apple Safari, Microsoft IE (and maybe Edge?) and Node.js platform.
* It's lightweight: PouchDB is only 46KB in size, when gzipped. You can include it with a simple `<script>` tag in the browser, or install via npm in NodeJS. 
* It has a short learning curve: the PouchDB API is easy to learn and use.
* It has syncing capabilities with a CouchDB server out of the box.

## Create a New Ionic 4/Angular Project

Let's start by creating a new Ionic 4 project based on Angular, using Ionic CLI 5 (The latest version as of this writing). So go ahead and open the terminal on Mac/Linux or the command prompt in Windows the run the following command to generate a new project.

```bash
$ ionic start ionic-pouchdb-sqlite blank --type=angular
``` 

Wait for the project to setup the dependencies then navigate inside the root folder:

```bash
cd ionic-pouchdb-sqlite
```

Next, you need to add a bunch of dependencies for enabling PouchDB and SQLite to work.

### Installing SQLite Cordova Plugin

On Ionic 4, the native SQLite database is the most adequate choice when it comes to storing data locally, because it allows you to have unlimited storage which is, unfortunately, not the case for localStorage or IndexedDB. Also SQLite is a file based and portable database.

You can add SQLite support to your Ionic 4 application using various Cordova plugins such as:

* Cordova-sqlite-storage: The original Cordova plugin for SQLite.
* cordova-plugin-sqlite-2: A fork of the previous plugin with extra features.

Let's install the fork with: 

```bash
$ ionic cordova plugin add cordova-plugin-sqlite-2

``` 
 
### Adding PouchDB

To be able to use PouchDB, you need to install a third party library available from npm:

```bash
$ npm install pouchdb --save
```



### Adding PouchDB Cordova Adapter for SQLite

Next you'll need to install another third part adapter to use SQLite with PouchDB

```bash
$ npm install pouchdb-adapter-cordova-sqlite --save
```

That's all what you need to install in order to start using PouchDB with SQLite in your Ionic app. Now let's start coding!

We will build a small application that allows you to do CRUD operations i.e create, read, update and delete employees data from a PouchDB + SQLIte database.

The application has many screens:

* The employees screen which lists employees,
* The screen to create an employee,
* The screen to update an employee.

## The Database Service 

The first thing we need to create is the database service that connects to PouchDB and provides different methods to work with the employees database.

So go ahead and create a service provider using `ionic g service <name>`

Make sure you are inside the project's root folder then run the following:

```bash
ionic g service employee
```
You should have an `EmployeeService` provider generated inside the `src/app/employee.service.ts` file.

Next, add the following code:

```typescript

import { Injectable } from '@angular/core';

import * as PouchDB from 'pouchdb';  
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';

 
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public pdb; 
  public employees;

  createPouchDB() {
        PouchDB.plugin(cordovaSqlitePlugin);
        this.pdb = new PouchDB('employees.db', 
        { adapter: 'cordova-sqlite' });
  }
  
}

```

This code will create a SQLite database file named `employees.db` and initialize the PouchDB database by setting the adapter to `cordova-sqlite` which instructs PouchDB to use SQLite for storage instead of the browser's storage.

Make sure to import the provider into the `src/app/app.module.ts` file and add it to the `providers` array.

Also make sure to  import the service provider and inject it in the constructor of any component before you can use it.

Now let's add the CRUD methods:


```typescript
create(employee) {  
    return this.pdb.post(employee);
}   
```

This method creates a new employee in the database.

The `post()` method belongs to the PouchDB API and allows you to create new objects in the PouchDB database. 

Next, we'll add the `update()` method:

```typescript
update(employee) {  
    return this.pdb.put(employee);
}   
```

This method updates an existing employee in the database. Please note that you need to pass an employee object which has the `id` of the employee to update.

Next, we'll add the `delete()` method:

```typescript
delete(employee) {  
    return this.pdb.delete(employee);
}   
```

This method deletes an employee from the database.

Finally, we'll add the `read()` method:

```typescript
read() {  
		function allDocs(){
				   this.pdb.allDocs({ include_docs: true})
            .then(docs => {
                this.employees = docs.rows.map(row => {
                    row.doc.Date = new Date(row.doc.Date);
                    return row.doc;
             });
              

                return this.employees;
            });
		  }
		  	
		  this.pdb.changes({ live: true, since: 'now', include_docs: true})
                    .on('change', ()=>{
						allDocs().then((emps)=>{
						
						this.employees = emps;
						});
					});
        return allDocs();

}
```

The `read()` method simply gets all the employees from the database by invoking the `.allDocs()` method which returns a Promise that resolves to an array of all the employees in the database. The `map()` method maps the `docs` array to the `docs.rows` array which contains data only without PouchDB specific information which, obviously, we don't need!

The code also converts `row.doc.Date` (stored as JSON) to JavaScript' `Date()`.

We are also listening for the changes of the PouchDB database so whenever there is a change (create, delete or update after we have retrieved all employees in the start), the function `allDocs()` gets called again for updating the `employees` array. 

> **Note**: Please note that this is not the most efficient way to update the `employees` array when any changes occur. In a production application, you can change this code to only update or delete the affected items not the full array.

## Building App UI Screens

Now that we have created our service provider which takes care of connecting to PouchDB and SQLite and provides all CRUD methods to interface with the PouchDB database. Let's create different pages that allow us to list and do operations on the `employees` database.

We already have a home page  which lives in `src/app/home`. Open the `home.page.html` file update update it to show the list of employees using `<ion-list>`.

{% raw %}
```html
<ion-header>
  <ion-navbar>
    <ion-title>The Employees Database</ion-title>
    <ion-buttons end>
      <button ion-button (click)="addEmployee()">
          <ion-icon name="add"></ion-icon>
      </button>
    </ion-buttons>    
  </ion-navbar>
</ion-header>

<ion-content padding>

    <ion-list>
        <ion-item *ngFor="let emp of employees" (click)="showDetails(employee)">
          <div>{{ emp.firstName }} {{emp.lastName}}</div>
        </ion-item>
      </ion-list>
      
</ion-content>
```
{% endraw %}

Next, we need to add the code to get the employees in the `src/home/home.page.ts` file. So open the file then update as follows:

```ts
import { Component, , OnInit  } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { EmployeePage } from './../employee/employee.page.ts';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  public employees : [] = [];
  constructor(public modalCtrl: ModalController, public employeeService : EmployeeService) {
     
     
  }
    ngOnInit() {
        
            this.employeeService.createPouchDB();

            this.employeeService.read()
                .then(employees => {
                    this.employees = employees;
                })
                .catch((err)=>{});
       
    }

    showDetails(employee) {
        let modal = this.modalCtrl.create(EmployeePage, { employee: employee });
        modal.present();
    }  


}
```

Next we need to generate a new page for the employee details, so go ahead and run the following command in your terminal:

```bash
$ ionic g page employee
```

This will generate an `employee` folder inside `app/`. Open the `src/app/employee/employee.page.html` and update it as follows:

```html
<ion-header>

  <ion-navbar>
    <ion-title> Employee Details</ion-title>
    <ion-buttons end *ngIf="canDelete">
      <button ion-button (click)="delete()">
          <ion-icon name="trash"></ion-icon>
      </button>
    </ion-buttons>    
  </ion-navbar>

</ion-header>


<ion-content>
    <ion-list>
        <ion-item>
            <ion-label>First Name</ion-label>
            <ion-input text-right type="text" [(ngModel)]="employee.firstName"></ion-input>
        </ion-item>
        <ion-item>
            <ion-label>Last Name</ion-label>
            <ion-input text-right type="text" [(ngModel)]="employee.lastName"></ion-input>
        </ion-item>        
    </ion-list>
    <button ion-button block (click)="addOrUpdate()">Add/Update Employee</button>
</ion-content>
```

Next update the `src/app/employee/employee.page.ts` file as follows:

```ts
import { Component, OnInit } from '@angular/core';
import { NavParams , ViewController } from 'ionic-angular';
import { EmployeeService } from '../employee.service';



@@Component({
  selector: 'app-employee',
  templateUrl: 'employee.page.html',
  styleUrls: ['employee.page.scss']
})
export class EmployeePage implements OnInit {
  employee: any = {};
  canDelete : false;
  canUpdate : false;	
  constructor(navParams: NavParams, private employeeService: EmployeeService) {

  }
ngOnInit(){
    var employee = this.navParams.get('employee');
    if(employee){
            this.employee = employee;
            this.canDelete = true;
            this.canUpdate = true;
	}
}

    addOrUpdate() {
        

        if (this.canUpdate) {
            this.employeeService.update(this.employee)
                .catch(()=>{});
        } else {
            this.employeeService.create(this.employee)
                .catch(()=>{});
        }

        this.viewCtrl.dismiss(this.employee);
    }

    delete() {
        this.employeeService.delete(this.employee)
            .catch(()=>{});

        this.viewCtrl.dismiss(this.employee);
    }

    

}
``` 

## Serving the App

We have finished our simple CRUD example with PouchDB and SQLite. Now you can serve your app locally for testing it. Go ahead and run the following command:

```bash
$ ionic serve

```

You can also plug your Android or iOS device to run the app on a real device instead of the browser.

```bash
$ ionic run ios
$ ionic run android

```
 
## Conclusion

Throughout this tutorial, we have seen step by step how create an Ionic 4 and Angular mobile application from scratch using the Ionic CLI 5 and added the essential CRUD methods for creating, reading, updating and deleting items from a SQLIte database using PouchDB.  