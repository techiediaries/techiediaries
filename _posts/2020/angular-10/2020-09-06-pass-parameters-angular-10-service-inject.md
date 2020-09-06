---
layout: bpost
title: "Pass Parameters to Angular 10 Service with @Inject"
image: "images/content/angular.png"
excerpt: "You can pass parameters to Angular 10 (and previous versions) services, using the @Inject decorator to create injection tokens. It allows you to pass parameters to the service via the Angular dependency injector"
date: 2020-09-06
tags : [angular]
---

You can pass parameters to Angular 10 (and previous versions) services, using the `@Inject` decorator to create injection tokens. It allows you to pass parameters to the service via the Angular dependency injector.

Injection tokens allow you to inject any values that don’t have a runtime representation such as TypeScript interfaces which don't have JavaScript equivalents. 

## Angular Service and Component Example

Let’s suppose we have a service which needs a parameter as follows:

```ts
import {Inject, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyService {
    constructor (private param: string) { }
}
```

This is an example component that would make use of the service:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-my',
  template: `
    <div"> {{param}}</div>
  `,
})
export class MyComponent {

  constructor() { }

}
```

Now, we need to pass in the `param` to the service. 

## Creating an Injection Token with `@Inject`

We can create an injection token from the parameter using the `@Inject` decorator:

```ts
import {Inject, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyService {
  constructor (
    @Inject('param') private param: string
  ) { }
}
```

## Providing the Injection Toekn

 
Next, we provide the token to the service using the component’s `providers` array as follows:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-my',
  template: `
    <div >{{param}}</div>
  `,
   providers: [
    {provide: 'param', useValue: 'container'},
  ]
})
export class MyComponent {

  constructor(private myService: MyService) { }

}
```


Now we have passed a parameter to our Angular 10 service.