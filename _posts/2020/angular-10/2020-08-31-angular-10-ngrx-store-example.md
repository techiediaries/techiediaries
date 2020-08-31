---
layout: bpost
title: "Angular 10 NgRX Store by Example"
image: "images/content/blazor.png"
excerpt: "In this quick example, we'll learn how to use NgRX store in our Angular 10 example application. We'll see how we can create actions, reducers and disptach actions"
date: 2020-08-31
tags : [angular]
---

In this tutorial, we'll learn how to use NgRX store in our Angular 10 example application. We'll see how we can create actions, reducers and disptach actions.

The Angular NgRx store is a client-side data management pattern that implements the Redux pattern, invented by Facebook, using RxJS observables.


As a prequisite, you need to have Node.js and Angular CLI installed on your local development machine,


## Angular 10 NgRx Store by Example

Open a new command-line interface and run the following commands:

```bash
$ ng new angular10ngrx
$ cd angular10ngrx 
```

The CLI will ask you a couple of questions — If  **Would you like to add Angular routing?**  Type  **y**  for Yes and  **Which stylesheet format would you like to use?**  Choose  **CSS**.


Next, create a new Angular component using the following command:

```bash
$ ng g c product
```


Next, a file inside the `src/app/product` folder with the `product.model.ts` name as follows:

```ts
export interface Product {
  name: string;
  price: number;
}
```

## Installing NgRx Libraries

Next, run the following command to install `ngrx` from npm in your project as follows:

```bash
$ npm install @ngrx/core
$ npm install @ngrx/store
$ npm install @ngrx/effects
```

## Creating an NgRx Reducer

Create a `src/app/reducers` folder and a file named `product.reducer.ts` with the following code:

```ts
// product.reducer.ts

import { Product } from './../product/product.model';
import { Action } from '@ngrx/store';

export const ADD_PRODUCT = 'ADD_PRODUCT';

export function addProductReducer(state: Product[] = [], action) {
  switch (action.type) {
    case ADD_PRODUCT:
        return [...state, action.payload];
    default:
        return state;
    }
}
```

## Configuring the NgRx Store 

Next, open the `src/app/app.module.ts` file and update it as follows:

```ts
// app.module.ts

import { StoreModule } from '@ngrx/store';
import { addProductReducer } from './reducers/product.reducer';

 imports: [
    BrowserModule,
    StoreModule.forRoot({product: addProductReducer})
],
```

We simply pass our reducer to the store. We can update our application state by dispatching the actions to the store.

Next, open the `src/app/product/product.component.ts` file and update it as follows:

```ts
// src/app/product/product.component.ts

import { Product } from './product.model';
import { AppState } from './../app.state';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Observable<Product[]>;
  
  constructor(private store: Store<AppState>) {
    this.products = this.store.select(state => state.product);
   }

  addProduct(name, price) {
    this.store.dispatch({
      type: 'ADD_PRODUCT',
      payload: <Product> {
        name: name,
        price: price
      }
    });
  }

  ngOnInit() {
  }

}
```

We first subscribe to the store and fetch the products, next we add an action for adding a product to the store.

Next, create a `src/app/app.state.ts` file and add the following code:


```ts
// src/app/app.state.ts

import { Product } from './product/product.model';

export interface AppState {
  readonly product: Product[];
}
```

## Displatching the NgRx Action(s)

Next, open the `src/app/product/product.component.html` file and update it as follows:

```html
<div class="panel panel-primary">
    <div class="panel-body">
      <form>
        <div class="form-group">
          <label class="col-md-4">Product Name</label>
          <input type="text" class="form-control" #productName/>
        </div>
        <div class="form-group">
          <label class="col-md-4">Product Price</label>
          <input type="text" class="form-control" #productPrice />
          </div>
          <div class="form-group">
            <button (click) = "addProduct(productName.value, productPrice.value)" class="btn btn-primary">Add Product</button>
          </div>
      </form>
    </div>
  </div>

<table class="table table-hover" *ngIf="products != 0">
  <thead>
  <tr>
      <td>Product Name</td>
      <td>Product Price</td>
  </tr>
  </thead>
  <tbody>
      <tr *ngFor="let product of products | async">
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
      </tr>
  </tbody>
  </table>
```

We first create a form to create a new product by disptching the corresponding action to the store and then we create a table to display the products we have created in the store. The `products` variable is an observable so we use the [`async` pipe to subscribe](https://www.techiediaries.com/angular-10-async-pipe-observable-promise-example/) to it.

We use Bootstrap 4 to add styles to our app. Read how you can [add Bootstrap to your Angular 10 app](https://www.techiediaries.com/angular-bootstrap/).

You can serve your application using the following command:

```bash
$ ng serve --open
```

## Conclusion

In this quick example, we learned how to use ngrx store in our Angular 10 example application. We've seen how we can dispatch actions, and create reducers.