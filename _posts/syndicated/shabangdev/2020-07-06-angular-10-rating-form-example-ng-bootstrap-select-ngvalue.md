---
layout: bpost
title:  "Angular 10 Rating Example With Ng-Bootstrap, Select, ngValue, and Forms "
date:   2020-07-06
tags: [angular]
canonical: "https://shabang.dev/angular-10-rating-form-example-ng-bootstrap-select-ngvalue/"  
---

In this tutorial, we'll see by example how to create a rating component with Bootstrap 4, HTML Select and Angular 10 Forms. We'll be using the `ngb-rating` component from `ng-bootstrap`. We'll also see how to use the HTML select control with the `ngFor` directive inside a reactive form. How to bind select element to a TypeScript object or string literal using `[ngValue]` and `value` properties respectively, and how to assign a default value to select from an array of elements. 

>[NgBoostrap](https://ng-bootstrap.github.io/#/home) is the Angular adapted version of Bootstrap UI components. Using ng-bootstrap we can easily integrate bootstrap library to our Angular project and use it’s awesome UI components very easily.
>Bootstrap is tried and tested and fully responsive for multiple platforms and screen sizes. Moreover, it is now an industrial standard adopted almost everywhere.

HTML forms are necessary in most web applications. Selects in forms can be used when you have multiple options and want users to select one of them before submitting the form. In Angular, you can use objects for  option values and not only strings.

This is an example of a component template with the select control:

```html
<form [formGroup]="myForm">  
 <select formControlName="myControl">  
   <option [value]="city" *ngFor="let city of cities">             
     {{country}}
   </option>  
 </select>  
</form>
```

In our Angular component, we need to have a `cities` array with some cities.

We use the `value` property to bind the city to `select` but you can also use `ngValue` instead. The `value` property is used with string literals only, whereas `ngValue` can be used with objects. We'll see next another example of using `select` with objects instead of strings.

This comes handy if we have a drop-down where we need  to show the names of the objects from a TypeScript array. But  when selecting the element from the drop-down you need to select the `id` of the array element for querying the database for example. In this case, we need to use `ngValue` as it works with TypeScript objects and not just strings.

In the previous tutorial, you've seen how you can install Angular 10 CLI from npm, so let's start by creating a new project.

## Creating a New Angular 10 Project

Let's get started by creating a new Angular 10 project using the following command:

```bash
$ ng new AngularRatingExample
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? CSS
```

## Adding Ng-Bootstrap

We’ll see how to set up Bootstrap in our project for styling our UI using `ng-bootstrap`. For that purpose,  we’ll first need to add  `bootstrap`  and  `ng-bootstrap` from npm in our project using the following command:

```bash
$ cd AngularRatingExample
$ ng add @ng-bootstrap/ng-bootstrap
```

This will install `ng-bootstrap` for the default application specified in your `angular.json` file.

Since  `ng-bootstrap`  has a dependency on i18n, we’ll also need add the package to our project using the following command:

```bash
$ ng add @angular/localize
```


Next, open the `src/app/app.module.ts` file and add `NgbModule`  and  `ReactiveFormsModule`  in the `imports` array of  `AppModule` as follows:

```ts
// [...]
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    // [...]
    ReactiveFormsModule,
    NgbModule
  ],
})
```

Next, open the `src/app/app.component.html` file and update it as follows:

```html
<div class="container">
  <div class="row">
    <div class="col-12">
	<router-outlet></router-outlet>
    </div>
  </div>
</div>
```

 We simply wrap the router outlet with some HTML markup styled with Bootstrap 4.
 
## Creating an Angular 10 Rating Component
 
Next, let's create an Angular 10 component that will encapsulate our form. Head back to your terminal and run the following command:

```bash
$ ng generate component rating
```

## Using the HTML Select Control with the `ngFor` Directive with a Reactive Form

Next, open the `src/app/rating/rating.component.html` file and add the following form:

```html
<form [formGroup]="form" (ngSubmit)="submit()">
  <div class="form-group">
    <label>Book</label>
    <select formControlName="book">
      <option *ngFor="let book of books" [ngValue]="book">{{book.name}}</option>
    </select>
  </div>
  <div class="form-group">
    <ngb-rating [max]="5" formControlName="rating"></ngb-rating>
  </div>

  <button [disabled]="form.invalid || form.disabled" class="btn btn-primary">Rate the book!</button>
</form>
```

We used the HTML select element with `ngValue`, and the `ngFor` directive inside our reactive form.

[`*ngFor`](https://angular.io/guide/template-syntax#ngFor) is the Angular repeater directive. It simply repeats the host element for each element in a list.

The syntax in this example is as follows:

-   `<option>` is the host element.
-   `books` holds the books list from the `RatingComponent` class.
-   `book` holds the current book object for each iteration through the list.

Next, update the `src/app/rating/rating.component.ts`  file as follows:

```ts
// [...]
export class RatingComponent implements OnInit {

  books = [
    { name: 'Book 1' },
    { name: 'Book 2' },
    { name: 'Book 3' },
    { name: 'Book 4' },
    { name: 'Book 5' }
  ];

  form = new FormGroup({
    book: new FormControl(this.books[0], Validators.required),
    rating: new FormControl('', Validators.required),
  });

  submit() {
    console.log(JSON.stringify(this.form.value));
    this.form.reset();
  }

}
```

We also provided a default value from the array books for select using `book: new FormControl(this.books[0], Validators.required)`. The first parameter is the default value.

Next, we need to add our rating component to the router configuration. Open the `src/app/app-routing.module.ts` file and update it as follows:

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RatingComponent } from '../rating/rating.component.ts';

const routes: Routes = [
  {path: '', component: RatingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

Finally, you can start your development server using the following command:

```bash
$ ng serve
```

In this Angular 10 tutorial, we’ve covered building a basic form with a rating component based on the `ngb-rating` component from `ng-bootstrap`. We have seen how to use the HTML select control with the `ngFor` directive inside a reactive form. How to bind select to a TypeScript object instead of string and how to assign a default value to select. 

