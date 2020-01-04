---
layout: post
title: "Angular 6 Upgrade: Migrating to RxJS 6"
image: "images/content/ubuntu.png"
excerpt: "Throughout this tutorial, we'll see how to upgrade your Angular 6 project to use RxJS 6" 
tags : [angular, javascript] 
---

**Angular 6** [was released in May 2018](https://blog.angular.io/version-6-of-angular-now-available-cc56b0efa7a4) and It's updated to use **RxJS 6** -- the library for reactive programming. RxJS 6 has many breaking changes in comparison with RxJS 5.5 and earlier versions.

To continue with our [Angular 6 upgrade guide](https://www.techiediaries.com/updating-angular-cli-projects/) we'll now see how to deal with RxJS API calls and how to migrate your application from RxJS 5.

The general procedure of upgrading from RxJS 5.x to RxJS 6 is as follows:

1.  First, you need to make sure that you are using the latest version (RxJS 5.5) in your project. If that's not the case just update to RxJS 5.5 before updating to RxJS 6.   
2.  Next, you need to install RxJS 6 and also the rxjs compatibility layer package, `rxjs-compat`. `rxjs-compat` allows you to migrate to the new syntax in ease so your old code still works and you can update it progressively.
    
3.  Some breaking changes are not covered by `rxjs-compat` so It's obligatory to handle those changes manually for your code to keep working.
    
4.  At the end, you will need to remove the compatibility layer in order to finish the update process to RxJS v6. This will have two benefits: First, you can make sure you are fully using the new RxJS 6 syntax and most importantly this will significantly reduce your application size.


## Using rxjs-compat for Compatibility with Angular 4|5

If you are upgrading your Angular 4|5 project to Angular 6 which makes use of RxJS 6 you may be worried about the breaking changes with RxJS 5 used in your current project. But you don't have to be! Thanks to [rxjs-compat](https://www.npmjs.com/package/rxjs-compat) a library that provides a compatibility layer for RxJS 5.x so any RxJS Observables that you are using in your Angular 4|5 project will still work without doing anything else. In fact when run `ng update @angular/core` will install `rxjs-compat` for you so you don't have to do it manually. 

## What's New with RxJS 6

There many changes in RxJS 6. Many methods belong to the *Observable* class are removed so most of the migration problems you'll encounter are related to *imports* i.e you only need to change imports to the correct paths and APIs.
 
## Upgrading to RxJS 6

When you are ready to upgrade your Angular project to use the new RxJS 6 APIs you can follow the following tips and examples.

Let's see a simple example of an Angular 4|5 class that makes API calls to a RESTful API using the *HttpClient* and *RxJS 5 Observables*.


```typescript
import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';  
 
@Injectable()
export class APIService {
 
    constructor(private http:HttpClient) {}
 
    getAccountsAndContacts() {
        return Observable.forkJoin(
            this.http.get('/api/accounts'),
            this.http.get('/api/contacts')
        );
    }
}
```

In the example we've starting by importing *HttpClient* and the *Observable* class from `rxjs/Observable`. We then declared an Injectable class or service using the `@Injectable` decorator. 

In the constructor of the service, we've injected *HttpClient* and then declared a method that gets Accounts and Contacts from the RESTful API endpoints and used the **forkJoin** operator from the RxJS library to return an Observable when we receive a response from both API GET calls. It's quite similar on how you would use [`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all).

Now to migrate this code to use RxJS 6, you only need to change the import statement for the forkJoin operator so our previous example becomes:

```typescript
import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {forkJoin} from 'rxjs'; 
 
@Injectable()
export class APIService {
 
    constructor(private http:HttpClient) {}
 
    getAccountsAndContacts() {
        return forkJoin(
            this.http.get('/api/accounts'),
            this.http.get('/api/contacts')
        );
    }
}
```  

The *forkJoin* operator doesn't belong anymore to the *Observable* class. It's now a standalone operator that can be imported from `rxjs`.
 

## How to Remove rxjs-compat?    

After updating your Angular project to use RxJS 6 new syntax you need to remove the **rxjs-compat** library from your project. You can do that by simply running the following command:

```bash
npm uninstall rxjs-compat 
```

## Conclusion

You can now test your project to see if your changes are all correctly done. If your Angular 6 application works as expected then you have successfully upgraded your Angular 6 project to RxJS 6. 
