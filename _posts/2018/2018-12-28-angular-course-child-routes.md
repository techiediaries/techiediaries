---
layout: post
title: "Angular 7|6 Tutorial Course:  Nested Router-Outlet, Child Routes & forChild()"
image: "images/content/angular.png"
excerpt: "In this course, you'll learn to develop your first Angular 7 application with routing, CRUD operations and Bootstrap 4 UI" 
tags : [angular]
---

In the previous [tutorial](https://www.techiediaries.com/angular-course-modules) , you have seen what NgModules are and you created the `admin` module of your developer's portfolio web application. Now, let's add routing to our module using a routing module, a nested router-outlet and child routes.

You can create a nested routing by defining child routes using the children property of a route (alongside a `path` and `component` properties). You also need to add a nested `router-outlet` in the HTML template related to the component linked to the parent route (In our case it's the `admin` route).

To create nested routing, you need to create a routing submodule for the module you want to provide routing, you next need to define a parent route and its child routes and provide them to the router configuration via a `forChild()` method.

Let's see this step by step. First, inside the `admin` module, create an `admin-routing.module.ts` file and add a submodule for implementing child routing in our `admin` module:

```ts
import { NgModule } from  '@angular/core';
import { Routes, RouterModule } from  '@angular/router';

import { ProjectComponent } from  './project/project.component';
import { ProjectListComponent } from  './project-list/project-list.component';
import { ProjectCreateComponent } from  './project-create/project-create.component';
import { ProjectUpdateComponent } from  './project-update/project-update.component';
  
const  routes:  Routes  = [
{
path:  'admin',
component:  ProjectComponent,
children: [
{
path:  'list',
component:  ProjectListComponent
},
{
path:  'create',
component:  ProjectCreateComponent
},
{
path:  'update',
component:  ProjectUpdateComponent
}
]
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export  class  AdminRoutingModule { }
```

This is an example of a module which has `imports` and `exports` meta information; 

- The `imports` array which contains the modules that we need to import and use in the current module. In this case it's `RouterModule.forChild(routes)`,
-  The `exports` array which contains what we need to export.

In order to provide our child routes to the router module, we use the `forChild()` method of the module because we want to add routing in the `admin` submodule. if this is used in root module you need to use the `forRoot()` method instead. See more differences of `forChild()` vs `forRoot()` from the [official docs](https://angular.io/api/router/RouterModule).

The `forChild()` and `forRoot()` methods are static methods that are used to configure modules in Angular. They are not specific to `RouterModule`.

We are creating a parent `admin` route and its own child routes using the `children` property of the route which takes an array of routes.

You can respectively access the `ProjectListComponent`, `ProjectCreateComponent` and `ProjectCreateComponent` using the `/admin/list`, `/admin/create` and `/admin/update` paths.

Next, open the `src/app/admin/admin.module ts` file and import the routing module:

```ts
// [..]
import { AdminRoutingModule } from  './admin-routing.module';

@NgModule({
// [...]
imports: [
	CommonModule,
	AdminRoutingModule
]
})
export  class  AdminModule { }
```

Next open the `src/app/admin/project/project.component html` file and add a nested router outlet:

```html
<h2>Admin Interface</h2>
<router-outlet></router-outlet>
```

This is a nested router-outlet that will be only used to render the components of the `admin` module i.e `ProjectListComponent`, `ProjectCreateComponent` and `ProjectCreateComponent`.  

> **Note**: If you don't add a nested router outlet in the parent route, child components will be rendered in the parent router outlet of the application.

Next in the `src/app/header/header.component.html` file, add a link to access the admin interface:

```html
<li  class="nav-item">
<a  class="nav-link"  routerLink="/admin/list">Admin</a>
</li>
```

At this point, if you click on the admin link in the header, you should see the following interface:


![Angular nested routing](https://i.imgur.com/otynpZ4.png)

Check out all parts:

- [Angular 7|6 Tutorial Course: CLI, Components, Routing & Bootstrap 4](https://www.techiediaries.com/angular-course),
- [Angular 7|6 Tutorial Course: Angular NgModules (Feature and Root Modules)](https://www.techiediaries.com/angular-course-modules),
- Angular 7|6 Tutorial Course: Nested Router-Outlet, Child Routes & forChild()
- [Angular 7|6 Tutorial Course: Authentication with Firebase (Email & Password)](https://www.techiediaries.com/angular-course-firebase-authentication),
- [Angular 7|6 Tutorial Course: Securing the UI with Router Guards and UrlTree Parsed Routes](https://www.techiediaries.com/angular-course-router-guards)


## Conclusion

In this tutorial, you have created nested routing in your Angular 7 application by creating a routing submodule for the admin module and adding a nested router-outlet and child routes for the `/admin` parent route.

In the next [tutorial](https://www.techiediaries.com/angular-course-firebase-authentication), you'll secure the admin interface using Firebase authentication with email and password.