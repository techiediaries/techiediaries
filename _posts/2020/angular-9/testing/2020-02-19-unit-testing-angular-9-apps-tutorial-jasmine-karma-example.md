---
layout: post
title: "Unit Testing Angular 9/8 Apps Tutorial with Jasmine & Karma by Example"
image: "images/content/angular.png"
excerpt: "In this tutorial, we'll quickly learn how to unit test an Angular 9/8 application with Jasmine and Karma" 
categories: angular
tags : [angular, angular-9] 
---


In this tutorial, we'll quickly learn how to unit test an Angular 9/8 application with Jasmine and Karma.

We'll see how to write unit tests for both the components and services in your Angular application by example.

Unit testing is considered an important phase of software development which is equal in importance to designing and writing the code.

We basically have three types of testing:

- Unit tests,
- Integration tests,
- End to End tests.

Throughout this tutorial, we'll be using unit testing for testing our Angular 9 code.

## Angular 9 Unit Testing by Example with Jasmine and Karma

Unit testing consists of writing code for making sure our app code behaves as expected for potential input values.

A unit is a small part of code that achieves a specific task in your code.

In Angular projects generated using Angular CLI, unit tests are based on Jasmine.

According to the [official website](https://jasmine.github.io/):

>Jasmine is a behavior-driven development framework for testing JavaScript code. It does not depend on any other JavaScript frameworks. It does not require a DOM. And it has a clean, obvious syntax so that you can easily write tests.


Jasmine provides a set of APIs that make writing unit tests easy.

Basically, we have these three methods:

- `it()`: A method for initializing a unit test,
- `describe()`: A method for creating a suite of tests,
- `expect()`: A method for defining expectations.

You don't need to master all the methods of Jasmine and Karma to write unit tests in your Angular 9 application.

## What's Karma and Why Using it in Angular?

Along with Jasmine, Karma makes use of a test runner that run tests and provides the details of passed and failed tests.

According to the [official](https://karma-runner.github.io/latest/index.html):  

>The main goal for Karma is to bring a productive testing environment to developers. The environment being one where they don't have to set up loads of configurations, but rather a place where developers can just write the code and get instant feedback from their tests. Because getting quick feedback is what makes you productive and creative.

## Installing Angular CLI v9

Let's get started by installing Angular CLI 9 to initialize the project we'll be testing.

Head over to a new terminal and run the following command:

```bash
npm install -g @angular/cli
```

Please note that you need to have node and npm installed.

## Initializing an Angular 9 Project for Unit Testing

Next, let's initialize our Angular 9 project.

```bash
ng new angular-9-unit-tests --style css --routing false
```

Your Angular 9 project will have Jasmine and Karma installed and configured so you only need to start writing your tests.

## Unit Testing Angular Components

Let's now see how to unit test an Angular 9 component by example.

Navigate to your project's folder and generate a new component as follows:

```bash
cd angular-9-unit-tests
ng generate component product-list
```

Open the `src/app/product-list/product-list.component.ts` file:

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  title = "Product List Component";
  constructor() { }

  ngOnInit() {}
}
```

Also a test file that ends with a `spec.ts` extension is by default added with any new component you generate with Angular CLI. In our case, we have a file called `product-list.spec.ts`:

```ts
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

Let's now write another test as follows:

```ts
it(`should have 'Product List Component' as title`, async(() => {
  fixture = TestBed.createComponent(PizzaComponent);
  component = fixture.debugElement.componentInstance;
  expect(component.title).toEqual('Product List Component');
}));
```

You can run the test using the `ng test` command:

```bash
ng test
```







