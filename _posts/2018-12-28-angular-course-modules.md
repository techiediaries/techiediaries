---
layout: post
title: "Angular 7|6 Tutorial Course: Angular NgModules (Feature and Root Modules)"
image: "images/content/angular.png"
excerpt: "In this course, you'll learn to develop your first Angular 7 application with routing, CRUD operations and Bootstrap 4 UI" 
tags : [angular]
---

Angular modules are containers of code parts that implement related domain requirements. They let developers create apps with modular architectures and reusable code just like components. Angular uses NgModules to create modules and submodules which are different from JavaScript/ES6 modules.

## What's an NgModule

NgModules are simply TypeScript classes decorated with the `@NgModule` decorator  imported from the `@angular/core` package.

Modules provide a way for developers to  organize their code and they are particularly helpful for managing large apps. 

You can either create your own modules or use the built-in modules for importing the various Angular APIs such as:

-  `[FormsModule](https://angular.io/api/forms/FormsModule)` for working with forms, 
- `[HttpClientModule](https://angular.io/api/common/http/HttpClientModule)` for sending HTTP requests, 
- and `[RouterModule](https://angular.io/api/router/RouterModule)` for providing routing mechanisms to your Angular application.

Each Angular module can contain components, directives, pipes and services and may be lazy loaded by the router.

You Angular application has at least one module which is called the **root** module. You need to bootstrap the root module to start your application.

## Creating the Admin Feature Sub-Module & CRUD Interface

Now, let's create the admin CRUD interface for listing, creating, updating and deleting the portfolio projects.

Create an admin module with four components:

- ProjectComponent,
- ProjectListComponent,
- ProjectCreateComponent,
- ProjectUpdateComponent.

First, run the following command to create a module called `admin`:

```bash
$ ng g module admin 
``` 

This will create a `src/app/admin/admin.module.ts` file with the following content:

```ts
import { NgModule } from  '@angular/core';
import { CommonModule } from  '@angular/common';

@NgModule({
declarations: [],
imports: [
	CommonModule
]
})
export  class  AdminModule { }
```   

Next, run the following commands to create the components inside the admin module:

```bash
$ ng g c admin/project-list
$ ng g c admin/project-create
$ ng g c admin/project-update
$ ng g c admin/project


```
This is the content of the `src/app/admin/admin.module.ts` file:

```ts
import { NgModule } from  '@angular/core';
import { CommonModule } from  '@angular/common';
import { ProjectListComponent } from  './project-list/project-list.component';
import { ProjectCreateComponent } from  './project-create/project-create.component';
import { ProjectUpdateComponent } from  './project-update/project-update.component';
import { ProjectComponent } from  './project/project.component';

@NgModule({
declarations: [ProjectListComponent, ProjectCreateComponent, ProjectUpdateComponent, ProjectComponent],
imports: [
CommonModule
]
})
export  class  AdminModule { }
```

In the NgModule metadata, we specify:

-   The components, directives, and pipes that belong to the module. In our case, the four component that we created i.e `ProjectListComponent`, `ProjectCreateComponent`, `ProjectUpdateComponent` and `ProjectComponent`.
-   The components, directives, and pipes that we want to export. In our case, none.
-   The modules that we need to import in our current module. In our case `CommonModule`
-   The services that we need to use. In our case none.

[CommonModule](https://angular.io/api/common/CommonModule) is a built in module that exports all the basic Angular directives and pipes, such as  `[NgIf](https://angular.io/api/common/NgIf)`,  `[NgForOf](https://angular.io/api/common/NgForOf)`,  `[DecimalPipe](https://angular.io/api/common/DecimalPipe)`, etc.


Next we need to import the admin module in the main module. Open the `src/app/app.module.ts` file and update it accordingly:

```ts
// [...]
import { AdminModule } from  './admin/admin.module';

@NgModule({
// [...]
imports: [
BrowserModule,
AppRoutingModule,
AdminModule
],
providers: [],
bootstrap: [AppComponent]
})
export  class  AppModule { }
``` 

This is the main module of our application. In the imports array we added `AdminModule`. You can see two other arrays:

- The `providers` array which can be used to include the services we want to provide to our components,
- The `bootstrap` array which specifies the component(s) to bootstrap.        

Check out all parts:

- [Angular 7|6 Tutorial Course: CLI, Components, Routing & Bootstrap 4](https://www.techiediaries.com/angular-course),
- Angular 7|6 Tutorial Course: Angular NgModules (Feature and Root Modules)
- [Angular 7|6 Tutorial Course: Nested Router-Outlet, Child Routes & forChild()](https://www.techiediaries.com/angular-course-child-routes),
- [Angular 7|6 Tutorial Course: Authentication with Firebase (Email & Password)](https://www.techiediaries.com/angular-course-firebase-authentication),
- [Angular 7|6 Tutorial Course: Securing the UI with Router Guards and UrlTree Parsed Routes](https://www.techiediaries.com/angular-course-router-guards)


## Conclusion

In this tutorial, you have grasped the concept of NgModules in Angular , you have created the `admin` submodule of your portfolio web application and the various components of the submodule which are needed to create a CRUD interface for creating and manipulating your portfolio's projects.

In your next [tutorial](https://www.techiediaries.com/angular-course-child-routes), you'll be adding routing in your `admin` module using a nested router outlet and child routes.