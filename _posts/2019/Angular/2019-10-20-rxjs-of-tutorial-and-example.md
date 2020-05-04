---
layout: post
title: "RxJS of() Example: Mocking Data with an Angular 7/8 Service and Observables"
image: "images/content/angular.png"
excerpt: "In this tutorial, we'll learn by example how to use the of() operator of RxJS with Angular 8" 
tags : [angular , angular8] 
---


RxJS' `of()` is a creational operator that allows you to create an RxJS Observable from a sequence of values.

According to the [official docs](https://rxjs.dev/api/index/function/of):
> `of()` converts the arguments to an observable sequence.

For example:

```js
import { of } from 'rxjs';

of(1, 2, 3, 4)
.subscribe(
  next => console.log('next:', next),
  err => console.log('error:', err),
  () => console.log('Completed'),
);
```

This is a screenshot of the output:

![RxJS of example](https://www.techiediaries.com/assets/images/rxjs-of-example.png)

In Angular, you can use the `of()` operator to implement many use cases. For example, you can use it to mock data in your service for `HttpClient`.

Create an Angular 8 project, navigate to it and run the following command to generate a service:

```bash
$ ng generate service data
```  

Next, open the `src/app/data.service.ts` file and start by importing the `of()` operator from `rxjs`:

```ts
import { Injectable } from '@angular/core';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
}
```

Next, add a new `products` property to the service which contains the data we want to serve as our mocked response and a `get()` method that returns `products` as an RxJS Observable using the `of()` operator:

```ts
@Injectable({
  providedIn: 'root'
})
export class DataService {
  products: Array<object> = [
    { name: 'Product 001'},
    { name: 'Product 002'},
    { name: 'Product 003'},
    { name: 'Product 004'},
    { name: 'Product 005'}
  ];
  get() {
    return of(this.products);
  }
}
```

Next, let's subscribe to this observable in our component. Open the `src/app/app.component.ts` file, import the data service and susbscribe to the `get()` method as follows:

{% raw %}
```ts
import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  template: `<ul>
	  <li *ngFor="let product of products">
	    {{product.name}} 
	  </li>
  </ul>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Angular RxJS Examples';

  products: Array<object>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.get().subscribe(res => {
      this.products = res;
      console.log(res);
    });
  }
}

```
{% endraw %}

That's you should see your products displyed in an HTML list.

## Conclusion

In this quick example, we have learned about the `of()` operator in RxJS and seen a real-world use case of it in the context of an Angular 8 app.
