---
layout: post
title: "Angular 10/8 Material Data-Table Tutorial & Example"
image: "images/content/angular.png"
excerpt: "Angular 10 Material data tables provide a quick and efficient way to create tables of data with common features like pagination, filtering and ordering." 
date: 2020-08-05 
tags : [angular, angular-10-material-examples]
---

Angular Material data tables provide a quick and efficient way to create tables of data with common features like pagination, filtering and ordering. 

In this tutorial, you'll create an example that shows you how to use Material data-tables in your [Angular 10 apps](https://www.techiediaries.com/angular/angular-9-8-tutorial-by-example-rest-crud-apis-http-get-requests-with-httpclient/) to render tabular data.

In the previous tutorial(s), you've created a fake REST API that provides data to your application by using Angular.
    
Now, that you've created a form to submit data to the back-end. Let's see how to fetch data from the API back-end and display it. We'll also see how to use a Material data table to display data and the Material Dialog component to display contact details.

> **Note**: This tutorial works with Angular 6/7/8/9.

## Angular 10 Material Table by Example

To follow this tutorial, it's better to have completed the previous tutorial(s) where you can setup Angular CLI and create your project. You also need to make sure you have understood the requirements of the vehicle insurance application that you are building throughout the series.

But, if you only care to learn how to use the Angular Material datatable, you simply need to make sure you have the following prerequisites and requirements:  

- Knowledge of [TypeScript and Angular](https://www.techiediaries.com/angular/typescript-strings-arrays-promises-rxjs-behavior-replay-subjects/),
- Node.js and npm installed on your machine,
- Angular CLI 10 installed on your system,
- An Angular 10 project created,
- You have some data that you can display in your data-table 

That's it, you are now ready to follow with the next steps.

## Setting up Angular Material

Supposed that you have [created a project using Angular CLI 10 (or v6+)](https://www.techiediaries.com/angular-cli-tutorial/), you can use the `ng add` command for quickly setting up Angular 8 in your project without going most of the [manual steps](https://material.angular.io/guide/getting-started):

```bash
$ cd your_angular_project
$ ng add @angular/material 
```

Next, you need to [configure animations or disable them](https://material.angular.io/guide/getting-started#step-2-configure-animations).


## Importing the Angular Material Data-Table Module

If your project is ready, you now need to import the Material Table module in the `app.module.ts` file. Open the `src/app.module.ts` file, where exists the main application module of your application, and add the following changes:

```ts
import { BrowserModule } from  '@angular/platform-browser';
import { NgModule } from  '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { AppComponent } from  './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule       
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
``` 

You first import `MatTableModule` from the `@angular/material` package and add it to the `imports` array of the application module.

After importing the table module into your application module. You can now use the Material table component(s) to create Material tables in your application.

## Creating a Material Table with `<mat-table>` and Providing a Data Source

Open the `src/app/app.component.html` template and add the `<mat-table>` component to create a table:

```html
<mat-table>
<!-- [...] -->
</mat-table>
```

You also need to provide a data source from where the table can get the data to display. You can provide a data source by using the `dataSource` property:

```html
<mat-table [dataSource]="dataSource">
<!-- [...] -->
</mat-table>
```

Before creating the data source, let's first define the table's columns.
 
## Defining the Material Table's Columns Templates
 
 A table structure is defined by its columns so you need to start by defining a template for each column that you want to add to your Material table.

For example, let's suppose you want to add the following columns to your table:

- Insurance Policy Number,
- Policy Creation Date,
- Policy Expire Date,
- Policy Amount,
- Client Id,
- Employee Id.
   
Each column's definition needs to have the following three elements:

- A unique name,
- A header cell, 
- And one or multiple row cells.

Now, add the following code inside your `<mat-table>` component for creating a column for the *insurance policy number*:

```html
<ng-container  matColumnDef="policyNumber">
    <mat-header-cell *matHeaderCellDef>Policy Number</mat-header-cell>
    <mat-cell *matCellDef="let policy">{{policy.policyNumber}}</mat-cell>
</ng-container>
```

You use the `<ng-container>` component to create a column definition. Inside of it, you define the header and row cells using the `<mat-header-cell>` and `<mat-cell>` components.

The `matColumnDef` property of <ng-container> defines the unique name of the column. In this case it's `policyNumber`.


You need to do the same with the other columns. Once you have defined all of your columns, you need to specify the columns that will be displayed in the table. 

Open the `src/app/app.component.ts` file and add a variable that will be used to hold the name of the columns:

```ts
tableColumns  :  string[] = ['policyNumber', 'creationDate', 'expireDate', 'policyAmount', 'clientId', 'employeeId'];
```

> You can name this variable whatever you want. It should be a list of strings that contains unique names of the columns displayed in the table.

After that, you need to define the rows.

## Defining the Material Table's Rows Templates

To define rows in your Material table, you need to include `<mat-header-row>` and `<mat-row>` components inside your table and provide the `tableColumns` array which holds the columns list.

Go back to the `src/app/app.component.html` file and add the following code in the `<mat-table>` component:

```html
<mat-header-row *matHeaderRowDef="tableColumns"></mat-header-row>
<mat-row *matRowDef="let row; columns: tableColumns"></mat-row>
```

Let's explain the `matHeaderRowDef` and `matRowDef` directives:

-  First, the  `matHeaderRowDef` directive is used to provide a configuration object for the table header row. In this case, it's the name of the variable that provides the list of columns,
- next, the `matRowDef` directive is used to provide a configuration for row cells,

The  `<mat-header-row>` and `<mat-row>`  provide  Material styling for the row's header and cells. 

After creating the structure of your Material table, you need to provide the data than the table needs to display.

## Adding Data to your Material Table

For adding data to your table, you need to provide a data source. So first, open the `src/app/app.component.ts` file and add a `dataSource` array to the component:

```ts
dataSource  = [];
``` 

> Please note that you can give this variable any name you choose.
 
We assume you have a `DataService` that provides your application with data from a REST API back-end and a `Policy` model that encapsulates an insurance policy type.
 
So, you simply need to get data from the back-end via this service and push it to your `dataSource` array. In the `src/app/app.component.ts` file, start by adding the following imports:

```
import { DataService } from  "./data.service";
import { Policy } from  "./policy";
```

> We assume here, that the model and service exists in the same module as the application component where you have added the table. If not, please change the imports accordingly.
 
Next, you need to inject `DataService` as a `dataService` instance via the component's constructor:

```ts
constructor(private  dataService:  DataService) {}
```

> We also assume this service has a `.getPolicies` method that returns an Observable which you can subscribe to in order to get data.
 
In the [`ngOnInit` life-cycle event](https://www.techiediaries.com/angular/unsubscribe-rxjs-subjects-ondestroy-oninit-changedetectorref/) of your Angular component, call the `.getPolicies` method and subscribe to the returned Observable:

```ts
ngOnInit() {
  this.dataService.getPolicies().subscribe((result)=>{    
    this.dataSource  =  result.body;
  })
}
```


You simply assign the `result.body` which contains the array of policies to your `dataSource` array. If you serve your project, you should see a table of data when you visit the `localhost:4200` address in your browser.
  
## Conclusion

In this tutorial, you've seen how you can add Material Design Table in your Angular 10 project, and how you can use the various components it provides to display your tabular data in a modern and professional interface. The Angular 10 Material table has many different features like pagination and filtering that we'll be seeing in another tutorial.
