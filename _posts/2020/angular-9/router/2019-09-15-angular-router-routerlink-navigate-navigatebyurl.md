---
layout: post
title: "The Angular 10/9 RouterLink, Navigate and NavigateByUrl"
image: "images/content/angular.png"
excerpt: "In this tutorial we're going to see how to navigate with the Angular Router using routerLink, Router.navigate() and Router.navigateByUrl()"
date: 2020-08-04 
tags : [angular, angular-10-router-examples] 
---


In the previous [tutorial of the Angular 10 Router](https://www.techiediaries.com/angular-router-route-parameters/), we've seen how to use basic routing between components then how to handle route parameters using different methods. We've also seen how to use the `RouterLink` directive to create route links. This tutorial continues from the previous tutorials with other methods to implement navigation.

## RouterLink Example with Angular 10

Let's give a second look at how we used the `RouterLink` directive in the previous tutorial(s). 

We created basic links using:

```html
<a routerLink="/">Go To Home</a>
``` 

Or also:

```html
<a [routerLink]="'/'">Go To Home</a>
``` 

We then created a link with a parameter using:

```html
<a [routerLink]="['/product/',product.id]">{{product.name}}</a>
```

## Navigating Programatically Using Angular 10 `Router.navigate()` and `Router.navigateByUrl()`

The Angular 10 Router provides two methods that you can use to navigate to other components in your component class instead of using the `RouterLink` directive in the template. The two methods are `navigate()` and `navigateByUrl()` and they can be useful in multiple situations where you need to trigger navigation via code. They return a promise that resolves to true or false.

`navigateByUrl()`  takes a string as a parameter.  `navigate()`  takes an array of URL segments.

So let's modify our previous Angular application to navigate using one of these methods. Go ahead and open `src/app/product-list/product-list.component.ts` then first import and inject the Router class:

```ts
import { Component } from "@angular/core";
import { Product } from "../models/product";
import { Router } from "@angular/router";

@Component({
  selector: "product-list",
  templateUrl: "product-list.component.html"
})
export class ProductListComponent {
  public products: Product[] = [
    new Product(1, "Product 001"),
    new Product(2, "Product 002"),
    new Product(3, "Product 003"),
    new Product(4, "Product 004"),
    new Product(5, "Product 005"),
    new Product(6, "Product 006"),
    new Product(7, "Product 007"),
    new Product(8, "Product 008")
  ];

  constructor(private router: Router){}

}
``` 

Next add the *gotoProductDetails()* method which takes an *url* and *id* parameters which they are passed as an array of segments to the `navigate()` method:

```ts
public gotoProductDetails(url, id) {
    this.router.navigate([url, id]).then( (e) => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
}
```

You can also build a string from these parameters and  use `navigateByUrl()`:

```ts
  public gotoProductDetailsV2(url, id) {

    var myurl = `${url}/${id}`;
    this.router.navigateByUrl(myurl).then(e => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }
```

Next open the component template in `src/app/product-list/product-list.html` then add a button and bind its *click* action to one of the previous methods:

```ts
 <button (click)="gotoProductDetails('/product',product.id)">Go To Details</button>
```

This is the whole template:

```html
<h1>Products List</h1>

<ul>
	<li *ngFor="let product of products">
		<a [routerLink]="['/product/',product.id]">{{product.name}}</a> <button (click)="gotoProductDetails('/product',product.id)">Go To Details</button>
	</li>
</ul>
<a routerLink="/">Go To Home</a>
```

<iframe src="https://codesandbox.io/embed/8p3r7o1q2" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>


## Conclusion

In this tutorial, we've seen different methods to implement navigation with the Angular 10 Router i.e using the `routerLink` directive with the anchor tags in components HTML template or using `Router.navigate()` and `Router.navigateByUrl()` methods in situations where you want to navigate in the component class. You can find the complete code for the Angular Router tutorials in this [repository](https://github.com/techiediaries/angular-router-demo).