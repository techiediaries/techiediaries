---
layout: post
title: "The Angular 10/9 Router-Outlets: Named and Multiple Outlets (Auxiliary Routes) Example"
image: "images/content/angular.png"
excerpt: " In this tutorial, we'll see advanced uses of the `<router-outlet>` component such as how to create named, multiple outlets and auxiliary routing" 
date: 2020-08-04 
tags : [angular, angular-10, angular-10-router-examples] 
---

Throughout this tutorial we'll learn to use named and multiple Router Outlets and auxiliary routes in Angular 10/9

<div id="toc_container">
<p class="toc_title">
The Angular 9/8 Router-Outlets: Named and Multiple Outlets (Auxiliary Routes) Example
</p>
<ul class="toc_list">
<li><a href="#Angular_9_Router_Outlet">Angular 9 Router Outlet</a></li>
<li><a href="#Create_Named_Router_Outlet">How to Create a Named Router Outlet?</a></li>
<li><a href="#Create_Multiple_Router_Outlets">How to Create Multiple Router Outlets?</a></li>
<li><a href="#Adding_Multiple_Outlets_Demo_Application">Adding Multiple Outlets to Our Angular 9 Application</a></li>
<li><a href="#Angular_Auxiliary_Routes">What is An Auxiliary Route?</a></li>
<li> <a href="#Navigating_Inside_Angular_Auxiliary_Outlets">Navigating Inside Auxiliary Outlets</a></li>
<li>
<a href="#Primary_Auxiliary_Angular_Router_Outlets_example">Primary and Auxiliary Router-Outlets by Example</a></li>
<li><a href="#Conclusion">Conclusion</a></li>
 
</ul>
</div>

In the previous tutorials, we've seen the basics of the Angular 9 Router. We've seen how to configure the Angular router and how to add routes. If you are just starting with Angular routing then you should first check the following tutorials:


- [Angular 9/8 Tutorial: Components Explained](https://www.techiediaries.com/angular-components/)

- [The Angular 9/8 Router: Component Routing](https://www.techiediaries.com/angular-router/)

- [The Angular 9/8 Router: Handling Route Parameters with Snapshot and Observables (ParamMap)](https://www.techiediaries.com/angular-router-route-parameters/)

- [The Angular 9/8 Router: Using RouterLink, Navigate or NavigateByUrl](https://www.techiediaries.com/angular-router-routerlink-navigate-navigatebyurl/)

So, you now understand how to add routing to your Angular 10 application to create an SPA (Single Page Application) and also how to link to different routes using `RouterLink` and `RouterLinkActive`. You also understand how to use the router outlet (`<router-outlet>`). 


## <a name="Angular_10_Router_Outlet">Angular 10 Router Outlet</a>

The Router outlet is a placeholder that gets filled dynamically by Angular, depending on the current router state. In the previous tutorials, we've used the Router outlet to create basic routing. In this tutorial, we'll see advanced uses of the `<router-outlet>` component such as named, multiple outlets and auxiliary routing.

This is the application we'll be building:

<iframe src="https://codesandbox.io/embed/github/techiediaries/angular-router-demo/tree/master/" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>


## <a name="Create_Named_Router_Outlet">How to Create a Named Router Outlet?</a>

You can create a named Router outlet using the *name* property of the `<router-outlet>` component:

```html
<router-outlet  name="outlet1"></router-outlet>
```

## <a name="Create_Multiple_Router_Outlets">How to Create Multiple Router-Outlets?</a>

You can have multiple outlets in the same template:

```html
<router-outlet></router-outlet>  
<router-outlet  name="sidebar"></router-outlet>  
```

- The unnamed outlet is the primary outlet. 
- Except for the primary outlet, all other outlets must have a name.

## <a name="Adding_Multiple_Outlets_Demo_Application">Adding Multiple Outlets to Our Demo Application</a>

First, you can get the source of our previous example from this [repository](https://github.com/techiediaries/angular-router-demo).
 
Now, let's add multiple outlets in our `AppComponent` template. Open `src/app/app.component.html` and add the following outlets:

```html
<router-outlet></router-outlet>  
<router-outlet  name="sidebar"></router-outlet>  
```

### <a name="Angular_Auxiliary_Routes">What is An Auxiliary Route?</a>

A component has one primary **route** and zero or more **auxiliary** routes.. Auxiliary routes allow you to use and navigate multiple routes. To define an auxiliary route you need a named router outlet where the component of the auxiliary route will be rendered. 

The name that we're giving to the second outlet suggests that the outlet will be used as a sidebar for the app. Now let's create a sidebar component that will be rendered in the sidebar outlet: 

```bash
ng g component sidebar
```

We want the sidebar component to be rendered with each other component, **in the same time**. So we'll add an empty path and a *sidebar* outlet:

```ts
{
   path: "",
   component: SidebarComponent,
   outlet: "sidebar"
}
``` 

Since we are using an empty path, the sidebar component will be rendered when our application is started.

### <a name="Navigating_Inside_Angular_Auxiliary_Outlets">Navigating Inside Auxiliary Outlets</a>

You can navigate inside an auxiliary outlet by using the *outlets* property: 

```ts
router.navigate([{outlets: {primary: 'path' ,sidebar: 'path'}}]);
```

Or also using the `routerLink` directive

```html

<a [routerLink]="[{ outlets: { primary: ['path'],sidebar: ['path'] } }]">
	Products List
</a>
```

## <a name="Primary_Auxiliary_Angular_Router_Outlets_example">Primary and Auxiliary Angular 10 Router Outlets by Example</a>

So let's say, we want to render a different sidebar component when the user navigates to the `/products` URL. This way, the `ProductListComponent` will be rendered in the primary outlet and in the same time the `ProductListSidebarComponent` will be rendered in the auxiliary sidebar outlet. 

We can easily achieve this scenario by creating the `ProductListSidebarComponent` component (`ng g component ProductListSidebar`) and adding the following auxiliary route configuration:

```ts
  { path: "products", component: ProductListSidebarComponent, outlet: "sidebar" }
```

This is the complete routing configuration for our example:

```ts
import { RouterModule, Routes } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { ProductListSidebarComponent } from "./product-list-sidebar/product-list-sidebar.component";

const routes: Routes = [
  { path: "products", component: ProductListComponent },
  { path: "product/:id", component: ProductDetailComponent },
  {
    path: "",
    component: SidebarComponent,
    outlet: "sidebar"
  },
  {
    path: "products",
    component: ProductListSidebarComponent,
    outlet: "sidebar"
  }
];

export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);

```

You also need to update the navigation link in our `AppComponent`:

```html
<a [routerLink]="[{ outlets: { primary: ['products'],sidebar: ['products'] } }]">
	Products List
</a>
```

This says, when the user clicks on the *Products List* link. Both routes with the `/products` path will be activated in the primary and auxiliary sidebar outlets.

You need to specify all the outlets where you want the navigation to take place including the primary outlet.

## <a name="Conclusion">Conclusion</a>
 
By having primary and auxiliary named outlets, you can implement advanced scenarios by independently rendering multiple components in the same time. You can find the source code of this and previous tutorials in this [repository](https://github.com/techiediaries/angular-router-demo).

In this tutorial we have learned how to use named and multiple Router-Outlets and auxiliary routes in Angular 10.

