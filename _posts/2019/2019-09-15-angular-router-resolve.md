---
layout: post
title: "Angular 7/8 Router: Resolve & Route Resolvers Example"
image: "images/content/angular.png"
excerpt: "The Angular 8 Router provides a resolve property that takes a route resolver and allows your application to fetch data before navigating to the route (i.e resolving route data)" 
tags : [angular, angular8] 
---

The Angular 8 Router provides a `resolve` property that takes a route resolver and allows your application to fetch data before navigating to the route (i.e resolving route data). 

You can create a route resolver by  implementing the [Resolve](https://angular.io/api/router/Resolve) interface. For example,this a route resolver:

```ts
import { Injectable } from '@angular/core';
import { APIService } from './api.service';

import { Resolve } from '@angular/router';

@Injectable()
export class APIResolver implements Resolve<any> {
  constructor(private apiService: APIService) {}

  resolve() {
    return this.apiService.getItems();
  }
}
```

In the example, we assume we have already created an APIService which has a `getItems()` method that fetches data from a remote API endpoint.

We import the `Resolve` interface from the `@angular/router` package.

We then create an `APIResolver` class that implements the `Resolve<any>` interface.

In the constructor of the resolver we inject our `APIService` as `apiService` and we call the `getItems()` method of the service in the `resolve()` method that should be defined in any resolver


Often than not when resolving route data, you want to get access to the parameters of the route in the resolver. You can do that using the `ActivatedRouteSnapshot` class. For example, let's suppose our route has a `date` parameter that needs to be passed to the `getItems(date)` method:

```ts
import { Injectable } from '@angular/core';
import { APIService } from './api.service';

import { Resolve } from '@angular/router';

import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class APIResolver implements Resolve<any> {
  constructor(private apiService: APIService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.apiService.getItems(route.params.date);
  }
}
```

We import the `ActivatedRouteSnapshot` class from the `@angular/router` package and we provide a paramater `route` of type `ActivatedRouteSnapshot` to the `resolve()` method. Finally we use `route.params.date` to get the value of the `date` parameter.


One final thing you need to do is to pass the resolver we created to `resolve` property of the corresponding route in the `Routes` array of your Angular routing module:

```ts
{
  path: 'items/:date',
  component: ItemsComponent,
  resolve: { items: APIResolver }
}
```

## Conclusion

In this tutorial, we've seen how to resolve data using the `resolve` property and the route resolver (`Resolve`) of the Angular 8 router.