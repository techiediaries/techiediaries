---
layout: post
title: "Build an Angular 9/8 CRUD Example & Tutorial"
image: "images/content/angular-by-example-httpclient-get.png"
excerpt: "In this tutorial, we'll learn to build an Angular CRUD example from scratch using the latest version which is as the time of this writing Angular 9" 
tags : [angular, angular9, angular-9-ngfor-examples, angular-9-httpclient-examples, angular-9-router-examples, angular-9-form-examples, angular-9-tutorials] 
---

In this tutorial, we'll learn to build an Angular CRUD example from scratch using the latest version which is as the time of this writing **Angular 9**.

We'll be using a CRUD REST API mocked using `json-server` which lets you generate a complete working API with nearly zero-lines of code.

We'll not be learning how to use `json-server` but you can see the complete instructions from this [tutorial](https://www.techiediaries.com/angular-mock-backend/) after generating the Angular project.

- Angular CRUD Example, Step 1 — Mocking the Backend Using `json-server`
- Angular CRUD Example, Step 2 — Creating a Module 
- Angular CRUD Example, Step 3 — Importing `HttpClientModule` and `FormsModule`
- Angular CRUD Example, Step 4 — Creating Component(s)
- Angular CRUD Example, Step 5 — Adding Routing 
- Angular CRUD Example, Step 6 — Creating a Service 
- Angular CRUD Example, Step 7 — Creating a Model 
- Angular CRUD Example, Step 8 — Implementing the CRUD Methods 
- Angular CRUD Example, Step 9 — Calling the CRUD Methods 

 
## Prerequisites

As always, we'll need to have a few prerequisites for this tutorial:    

- The basic concepts of TypeScript. 
- A local development machine with  **Node 10+**, together with  **NPM**  installed. 
- [Angular CLI 9 installed](https://www.techiediaries.com/angular-cli-tutorial/) on your machine,
-  An Angular project. In our case, it's named `angular-crud-example`.

If your project is ready, let's get started with our first step.

## Angular CRUD Example,  Step 1 — Mocking the Backend Using `json-server`

We have already covered how to mock the REST API in [Mocking a REST API Back-End for Your Angular App with JSON-Server and Faker.js](https://www.techiediaries.com/angular-mock-backend/)

You can simply follow the linked tutorial to quickly build a server that will be running from the `http://localhost:3000` address and exposing the following endpoints:

-   `GET /products`  for getting the products,
-   `GET /products/<id>`  for getting a single product by id,
-   `POST /products`  for creating a new product,
-   `PUT /products/<id>`  for updating a product by id,
-   `PATCH /products/<id>`  for partially updating a product by id,
-   `DELETE /products/<id>`  for deleting a product by id.


![Angular CRUD](https://www.techiediaries.com/ezoimgfmt/cdn-images-1.medium.com/max/800/0*0EZg8Lxtit7x_Ty6?ezimgfmt=rs:710x225/rscb1/ng:webp/ngcb1)


## Angular CRUD Example, Step 2 — Creating a Module 

We'll encapsulate the code for our CRUD interface inside a module called **crud**.  Open a new command-line interface and generate a module using the following command:

```bash
$ cd ~/angular-crud-example
$ ng generate module crud --routing
```

This will create a `src/app/crud/crud.module.ts` file with the following code:

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrudRoutingModule } from './crud-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CrudRoutingModule
  ]
})
export class CrudModule { }
```

## Angular CRUD Example, Step 3 — Importing `HttpClientModule` and `FormsModule`

In this step, we'll proceed to add  `HttpClientModule`  and `FormsModule` in our project so we can use `HttpClient` and forms to implement the CRUD operations against the API server.


Open the  `src/app/crud/crud.module.ts`  file and add  `HttpClientModule`and `FormsModule`to the  `imports`  array of the module as follows:

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { CrudRoutingModule } from './crud-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CrudRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class CrudModule { }
```


## Angular CRUD Example, Step 4 — Creating Component(s)

In this step, we'll create the [Angular components](https://www.techiediaries.com/angular-components/). that compose the UI of our CRUD application:

- A home component that renders a table of products and contains the CRUD operations,
- A details component that displays the details of a specific product,
- A create component for creating products,
- A update component for updating products.

Open a new command-line interface and run the following commands:

```bash
$ ng generate component crud/home
$ ng generate component crud/details
$ ng generate component crud/create
$ ng generate component crud/update
```

The CLI will [create the necessary files for the components](https://www.techiediaries.com/how-to-create-angular-components/) and add them to the `declarations`  array in the  `src/app/crud/crud.module.ts`  file:

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CrudRoutingModule } from './crud-routing.module';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';


@NgModule({
  declarations: [HomeComponent, DetailsComponent, CreateComponent, UpdateComponent],
  imports: [
    CommonModule,
    CrudRoutingModule,
    HttpClientModule
  ]
})
export class CrudModule { }
```

## Angular CRUD Example, Step 5 — Adding Routing 

In this step, we'll [add routing](https://www.techiediaries.com/angular-router/). to our CRUD module.

Head back to the  `src/app/crud/crud-routing.module.ts`  file, that was automatically created by Angular CLI for routing configuration, and import the components then add the routes as follows:

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: 'crud', redirectTo: 'crud/home', pathMatch: 'full'},
  { path: 'crud/home', component: HomeComponent },
  { path: 'crud/details/:productId', component: DetailsComponent },
  { path: 'crud/create', component: CreateComponent },
  { path: 'crud/update/:productId', component: UpdateComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```

We first imported the CRUD components, next we added five routes for each component and a [redirection route which simply redirects](https://www.techiediaries.com/angular-path-redirection-and-handling-404-using-wildcard-routes/) users to the home component when they visit the empty path.

In the next step of our example, we'll a service for crud methods.

## Angular CRUD Example, Step 6 — Creating a Service 


In this step, we'll create an an [Angular service](https://www.techiediaries.com/angular-services-and-dependency-injection-via-providedin-tutorial/) that encapsulates the CRUD operations and make them available to the various UI components.

Go back to your command-line interface and run the following command:

```bash
$ ng generate service crud/crud
```

Next, open the  `src/app/crud/crud.service.ts`  file, and import and inject  `HttpClient`  as follows:

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private apiServer = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }
}
```

We imported and injected the  `HttpClient`  service. We also defined the  `apiServer`  variable that contains the address of our REST API server.

## Angular CRUD Example, Step 7 — Creating a Model 

In this step, we'll see how to create a model for using typed HTTP responses in our example.

Head back to your command-line interface and run the following command from the root of your project:

```bash
$ ng generate interface  crud/product
```

Next, open the  `src/app/crud/product.ts`  file and update it as follows:

```ts
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
}
```

## Angular CRUD Example, Step 8 — Implementing the CRUD Methods 

Let's now implement the CRUD operations for creating, reading. updating and deleting products using a [service](https://www.techiediaries.com/angular-services/).

Open the  `src/app/crud/crud.service.ts` file and update it as follows:

```ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import {  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private apiServer = "http://localhost:3000";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  create(product): Observable<Product> {
    return this.httpClient.post<Product>(this.apiServer + '/products/', JSON.stringify(product), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
  getById(id): Observable<Product> {
    return this.httpClient.get<Product>(this.apiServer + '/products/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiServer + '/products/')
    .pipe(
      catchError(this.errorHandler)
    )
  }
  
  update(id, product): Observable<Product> {
    return this.httpClient.put<Product>(this.apiServer + '/products/' + id, JSON.stringify(product), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  
  delete(id){
    return this.httpClient.delete<Product>(this.apiServer + '/products/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  errorHandler(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
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

## Angular CRUD Example, Step  9 — Calling the CRUD Methods 

Next, let's see how to make CRUD operations in our components. Open the  `src/app/crud/home/home.component.ts`  file, import and inject the Angular service as follows:

```ts
import { Component, OnInit } from '@angular/core';
import { CrudService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Products[] = [];

  constructor(public crudService: CrudService) { }

  ngOnInit() {

    this.crudService.getAll().subscribe((data: Products[])=>{
      console.log(data);
      this.products = data;
    })  
  }

}
```

We imported and injected  `CrudService`  as a private  `crudService`  instance via the component constructor.

Next, we defined a  `products`  array and invoked the  `getAll()`  method for making a read operation against the API server.


Next, open the  `src/app/crud/home/home.component.html`  file and update it as follows:

{% raw %}
```markup
            <div>
                <h1>My Products</h1>
                <button type="button" [routerLink]="/crud/create/">Create new product</button>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Quantity</th>                            
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let product of products">
                            <td>{{product.id}}</td>
                            <td>{{product.name}}</td>
                            <td>{{product.description}}</td>
                            <td>{{product.quantity}}</td>
                            <td>
                                <button type="button" [routerLink]="['/crud/update/', product.id]">Update</button>
                                <button type="button" (click)="crudService.delete(product.id)">Remove</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
```
{% endraw %}

We iterated over the  `products`  array using the [`ngFor` directive](https://www.techiediaries.com/angular-ngfor/) and displayed  the  `name`,  `price`,  `quantity`,  and `description` of each product. And we added two buttons for running the delete operations and navigating to the update component where we can run the update operation. 

We also added a button for navigation the user to the product creation component.

Next, open the `src/app/crud/create/create.component.ts` file and update it as follows to [create an angular form](https://www.techiediaries.com/angular-tutorial-forms-authentication-expressjs/):

```typescript
import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {
  productForm: FormGroup;

  ngOnInit() {
      this.productForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      quantity: [''],    
    })
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public crudService: CrudService
  ){ }
  submitForm() {
    this.crudService.create(this.productForm.value).subscribe(res => {
      console.log('Product created!')
      this.router.navigateByUrl('/crud/home/'))
   
  }

}
```

Next, open the `src/app/crud/create/create.component.html` and add the following HTML form for creating a product:

```html
 <div>
            <h1>Create Product</h1>
            <form [formGroup]="productForm" (ngSubmit)="submitForm()" novalidate>
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" formControlName="name" class="form-control" maxlength="20">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea class="form-control" formControlName="description" rows="3" maxlength="50"></textarea>
                </div>
                <div class="form-group">
                    <label>Price</label>
                    <input type="text" formControlName="price" class="form-control">
                </div>
                <div class="form-group">
                    <label>Quantity</label>
                    <input type="text" formControlName="quantity" class="form-control">
                </div>
                <button type="submit">Submit</button>
            </form>
</div>
```

The implementation of the update operation is left as an exercise for the reader. It's quite similar to the create operation except that we need to retrieve the ID of the product to update from the [route parameter](https://www.techiediaries.com/angular-router/).

We have implemented the read operation for getting all the products but you also need to read a product by ID.
  
## Conclusion

In this tutorial, we've built a CRUD example using the latest Angular 9 version.

We have created a service and implemented the create, read, update and delete operations against a REST API backend with a fake JSON database.
