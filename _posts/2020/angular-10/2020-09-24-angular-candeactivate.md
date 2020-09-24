---
layout: bpost
title: "Angular 10 CanDeactivate"
image: "images/content/angular.png"
excerpt: "In this article, we'll learn about the CanDeactivate route guard which a router guard is a browser event that's used to prompt or warn users that they're about to leave a page or in our case the Angular 10 app"
date: 2020-09-24
tags : [angular]
---

In this article, we'll learn about the `CanDeactivate` route guard which a router guard is a browser event that's used to prompt or warn users that they're about to leave a page or in our case the Angular 10 app.

You can use the CanDeactivate guard to prevent usesr from accidentally leaving a route/page in your application for example if such page contains a text editor with unsaved changes or an unsubmitted form. You can let the user know they can't leave the component yet by using a confirmation or  alert before the navigation to the other route takes place using the Angular CanDeactivate route guard.

Throughout this article, you'll see how to use the Angular CanDeactivate guard by example. CanDeactivate is a TypeScript interface that needs to be  implemented by a component to create a route guard. This guard will be used by the router to decide if the route can be deactivated. It can be implemented in any Angular component using the `canDeactivate` method of the interface. 


Let's see how to implement CanDeactivate step by step with Angular 10.

## The Angular CanDeactivate Interface

According to the [docs](https://angular.io/api/router/CanDeactivate):

>Interface that a class can implement to be a guard deciding if a route can be deactivated. If all guards return true, navigation continues. If any guard returns false, navigation is cancelled. If any guard returns a UrlTree, current navigation is cancelled and a new navigation begins to the UrlTree returned from the guard.

This is the declaration of the interface:

```ts
interface CanDeactivate<T> {
  canDeactivate(component: T, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
}
```

The `CanDeactivate` interface is a route guard that can be used by the router to decide if a route can deactivated. 


The CanDeactivate interface provides a `canDeactivate` method that takes the following arguments:


- The component that will be guarded.
- `ActivatedRouteSnapshot`
- `RouterStateSnapshot`
- `RouterStateSnapshot`

The `canDeactivate` method returns an `Observable<boolean | UrlTree>` or `Promise<boolean | UrlTree>`,  `UrlTree`, or `boolean`.

## Step 1 -- Creating the CanDeactivate Route Guard Service

Before implementing the `CanDeactivate` route guard in our Angular 10 application, we'll need to create a guard as a service i.e a class decorated with the `@Injectable()` decorator and should override the `canDeactivate()` method. 

Next, in our Angular component we also need to implement the `canDeactivate()` method if we want to guard the component's route using `CanDeactivate`.

Head back to your terminal, make sure you are inside your Angular 10 project's folder and run the following command to generate a new service:

```bash
$ ng generate service can-deactivate-guard
```


Next, you need to import the `CanDeactivate` interface from the `@angular/router` in your `can-deactivate-guard` service. 

Open the the `src/app/can-deactivate-guard.service.ts` file and update it as follows:

```ts
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

  canDeactivate(component: CanComponentDeactivate, 
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }

}
```

We simply implement the `CanDeactivate` interface with a generic component type that defines a `canDeactivate` method. The `CanDeactivate` interface contains one `canDeactivate()` method that you need to override and pass the generic component as parameter so we can call the `canDeactivate` method of of the component.


## Step 2: Register The CanDeactivate Guard Service in the Application Routing Module

Next, we need to import our CanDeactivate guard service and add it the `providers` array of the routing module. 

Open the `src/app/app-routing.module.ts` file and add `CanDeactivateGuard` to the module as follows:


```ts
import { CanDeactivateGuard } from './can-deactivate-guard.service';
//[...]

@NgModule({
  //[...]
  providers: [ 
    CanDeactivateGuard
  ]
})
export class AppRoutingModule { } 
```

## Step 3: Implement the `canDeactivate()` Method in your Component

Next, we need to implement the `canDeactivate()` method in our component, so first let's create the component.

Head back to your terminal and run the following command:

```bash
$ ng generate component product
```

Next, open the `src/app/product/product.component.ts` file and update it as follows:

```ts
// [...]
import { Observable } from 'rxjs';

@Component({
  templateUrl: './product.component.html' 
}) 
export class ProductComponent implements OnInit { 

  unSaved: boolean = true;        
	constructor() { }

	canDeactivate(): Observable<boolean> | boolean {


	    if (this.unSaved) {

          const result = window.confirm('There are unsaved changes! Are you sure?');

           return Observable.of(result);
	    }
	    return true;
	}	
} 
```

The `canDeactivate()` method of the component will be invoked by the `CanDeactivateGuard` service to confirm if the user wants to navigate away when they are about to leave the component. 

We simply added an `unSaved` variable to indicate that we have some unsaved changes in our component that we need to save before leaving or otherwise the changes will be lost.


## Step 4: Adding the `CanDeactivate` Guard to the Route Configuration

Finally, we need to add our `CanDeactivate` guard to the corresponding component's route in the routing module using the `canDeactivate` property.

Open the `src/app/app-routing.module.ts` file and import then add the `CanDeactivateGuard` as follows:

```ts
const routes: Routes = [
  { 
         path: 'product',
         component: ProductComponent,
         canDeactivate: [CanDeactivateGuard]
  }  
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule{ } 
```

## Conclusion

We have created an Anguar 10 application that shows how to use the `CanDeactivate` interface to create a route guard service for protecting a component from accidental user leaving.
