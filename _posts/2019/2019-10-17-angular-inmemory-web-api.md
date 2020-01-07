---
layout: post
title: "Backendless Angular 7/8 Tutorial: Mocking HttpClient Using an In-Memory CRUD API Example"
image: "images/content/angular.png"
excerpt: "In this tutorial, you'll see, by example, how to use the in-memory web api module with Angular 8 to create a fake REST API back-end with CRUD operations. This is very useful for front-end developers that don't have a back-end yet or for testing your front-end app." 
tags : [angular, angular-9-ngfor-examples, angular-9-httpclient-examples, angular-9-tutorials]
---

In this tutorial, you'll see, by example, how to use the in-memory web api module with Angular 8 to create a backend-less application by mocking a REST API back-end with common CRUD operations. This is very useful for Angular developers that don't have a back-end ready yet for their front-end app.



The  [`angular-in-memory-web-api`](https://github.com/angular/in-memory-web-api)  module provides an in memory data store where you can create and fetch data and simulates a real REST API back-end. It intercepts Angular HttpClient requests that would otherwise go to the remote server and redirects them to an in-memory data store that you control.

It works as a proxy for your real back-end. Each time you send an HTTP request, the module intercepts it, process it and returns the results from memory. This way, when you are ready to use a real API back-end you will not be required to change the API endpoints you added in your Angular code.

Using the in memory web api module, you can simulate all the common CRUD operations for creating, reading, updating and deleting items from an in memory database without actually going through the hassle of setting up a real database, creating and exposing a real REST API server just for the sake of testing your Angular application. But of course this is a temporary solution until the back-end team (or you if you are a full-stack developer) creates the back-end. 
 
This module intercepts the `HttpClient` (the Angular 4.3+ HTTP client) requests that get sent to an address of an API server then simply proxy the requests to an in-memory database that you'll have to setup in your project. 

## Prerequisites

To complete this tutorial, you will need to have a few prerequisites, such as:

- Node.js **8.9+** and npm installed on your system. Both are required to install and run Angular CLI 8,
- Familiarity with JavaScript and TypeScript.

That's all what you need, you can use Windows, macOS or any Linux distribution provided that you have the right Node.js version installed on your system.

This tutorial will take you step by step from installing Angular CLI, to generating a project and creating services and components and finally setting up the in-memory web API.

Now you are ready to install Angular CLI 8 and use to create a project.

## Installing Angular CLI 8

You'll use Angular CLI 8 to create an Angular project. If it's not installed on your system you should run this command to install it globally:

```bash
$ npm install -g @angular/cli
```

>  If you get any permission errors, you can simply add **sudo** before your command in macOS and debian systems (e.g. Ubuntu) or use a command prompt with administrator privileges in Windows.

That's it! You now have a complete environment for Angular development. But since Angular is for building front-ends and client side apps, and more often that not, a back-end is required, you will either need to have the back-end built for you or simulate the REST API that would be normally exported by your back-end server. In this tutorial, you'll learn to implement this latter approach.
 
## Creating an Angular 8 Project

You can now create a project using the Angular CLI:

```bash
$ ng new angular-inmemory-api
```

You'll have to wait a little bit of time until your project is read then navigate inside the root folder and serve your project using:

```bash
$ cd angular-inmemory-api
$ ng serve
```

You can access your project from the `localhost:4200` address. Angular CLI uses a live-reload server so any changes you make to your project's code will be live-reloaded in your browser.

So just leave the development server running and open your Angular 8 project in your preferred IDE or code editor  (VSCode is a nice choice!)

## Setting up the `angular-in-memory-web-api`  module

Now that you've created your project, you need to set up the `angular-in-memory-web-api`  module.

You can do that following these easy steps:

-  First, you need to install the `angular-in-memory-web-api`  module from npm in your Angular project,
-  Next, you need to proceed by creating an Angular service that encapsulates working with the in-memory database,
-  Finally, you'll be able to use the in-memory database service in your Angular component(s).

Head back to your terminal and run the following command to install the `angular-in-memory-web-api`  module:
 
```bash
$ npm install --save angular-in-memory-web-api
```
 
Next, you can create an Angular service using:
 
```bash
$ ng generate service data
```

> You can also use the `ng g s data` instead to create the data service.

The previous command will generate two files:

-  The `src/app/data.service.ts` file which encapsulates the actual code of the service you just created.
- The `src/app/data.service.spec.ts` file which contains unit tests for the service.
 
Our work will be done inside the `src/app/data.service.ts` file so open the file and import  `InMemoryDbService` from the  `angular-in-memory-web-api`  module:

```ts
import {InMemoryDbService} from 'angular-in-memory-web-api'
```

Next, your data service has to implement `InMemoryDbService` and override the `createDb()` method:

```ts
@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService{

  constructor() { }
  createDb(){
	
   let  policies =  [
 	{  id:  1,  num:  'PO1', amount: 1000, userId: 1, clientId: 1, description: 'Insurance policy number PO1' },
 	{  id:  2,  num:  'PO2', amount: 2000, userId: 1, clientId: 2, description: 'Insurance policy number PO2' },
 	{  id:  3,  num:  'PO3', amount: 3000, userId: 1, clientId: 3, description: 'Insurance policy number PO3' },
 	{  id:  4,  num:  'PO4', amount: 4000, userId: 1, clientId: 4, description: 'Insurance policy number PO4' }
   ];

   return {policies};
	
  }
}
```

As you can see, you override the `createDb` function to return any data you want your in-memory database to return. Each item should have a unique id.
 
Next, you need to wire the in-memory web api module with your application and provide the data service as a parameter for the `.forRoot` method of the `InMemoryWebApiModule` module.
  
Open the `src/app/app.module.ts` file and provide the data service.

```ts
import { InMemoryWebApiModule } from “angular-in-memory-web-api”;  
import { DataService } from “./data.service”;
// [...] 

@NgModule({
  declarations: [
    // [...]
  ],
  imports: [
    // [...]
    InMemoryWebApiModule.forRoot(DataService)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Creating your Data CRUD Service

After installing and setting up the in-memory web api module, you next need to create another service with the `PolicyService` name which encapsulates all the code needed for making CRUD operations to create, read, update and delete insurance policies:

```bash
$ ng generate service policy
```

Open the generated  `src/app/policy.service.ts` file and:

- Import `HttpClient` into your service,
- Add the CRUD methods necessary for working with policies.

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from “@angular/common/http”;

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  SERVER_URL: string = "http://localhost:8080/api/";
  constructor(private httpClient: HttpClient) { }
  
  public getPolicies(){	
       return this.httpClient.get(this.SERVER_URL + 'policies');
  }
  
  public getPolicy(policyId){
       return this.httpClient.get(`${this.SERVER_URL + 'policies'}/${policyId}`); 
  }
  public createPolicy(policy: {id: number, amount: number, clientId: number, userId: number, description: string}){
      return this.httpClient.post(`${this.SERVER_URL + 'policies'}`, policy)
  }
  
  public deletePolicy(policyId){
      return this.httpClient.delete(`${this.SERVER_URL + 'policies'}/${policyId}`)
  }
  public updatePolicy(policy: {id: number, amount: number, clientId: number, userId: number, description: string}){
      return this.httpClient.put(`${this.SERVER_URL + 'policies'}/${policy.id}`, policy)
  }
  
}
```

You've added four CRUD methods:

- `getPolicies`: for retrieving all insurance policies,
- `getPolicy` : for retrieving an insurance policy by id,
- `createPolicy`: for creating a new insurance policy,
- `deletePolicy`: for deleting an insurance policy by id,
- `updatePolicy`: for updating an existing insurance policy.

When you are using the in-memory database, you actually can set the `SERVER_URL` to any URL. It really doesn't matter as you will not need to use a real API server. In any case, your HTTP requests sent using Angular `HttpClient` will be all proxied to the in-memory web api.

## Testing your In-Memory Web API

Now, you can test your CRUD methods in your main application component. Open the existing `src/app/app.component.ts` file and update it accordingly:

```ts
import { Component, OnInit } from '@angular/core';
import { PolicyService } from './policy.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class PolicyListComponent implements OnInit {

  policies: any[] = [];
  constructor(private policyService: PolicyService) { }

  ngOnInit() {
	this.policyService.getPolicies().subscribe((data : any[])=>{
		console.log(data);
		this.policies = data;
    })
  }
}
```

You first declare a `policies` array which will be used to contain the insurances policies that you can fetch from the in-memory web api. Next, you inject `PolicyService` and then you make a call to the `getPolicies` method of the injected instance to get the available insurance policies and put them in the `policies` array. The `getPolicies` method will be fired once you component is initialized because you've called it in the `ngOnInit` life-cycle event. 
 
Next open the `src/app/app.component.html` file and update it accordingly:

{% raw %}
```html
<h1>Insurance Policies</h1>
<table style="width:100%">
  <tr>
    <th>Policy Number</th>
    <th>Amount</th>
    <th>Description</th>
    <th>Actions</th>
  </tr>
  <tr *ngFor="let policy of policies" >
    <td>{{ policy.num }}</td>
    <td>{{ policy.amount }}</td>
    <td>{{ policy.description }}</td>
     
    <td>
    <button (click)="deletePolicy(policy.id)">Delete</button>
	<button (click)="updatePolicy(policy)">Update</button>
    </td>
  </tr>
</table>
```
{% endraw %}

You simply go through all the policies using the `*ngFor` directive and display each policy number, amount and description. And you also add action buttons for calling delete and update operations in each policy table's row.

Next, go back to your application component and add an implementation for `.deletePolicy` and `.updatePolicy` methods.

```ts
public deletePolicy(policyId){
    this.policyService.deletePolicy(policyId).subscribe((ret)=>{
		  console.log("Policy deleted: ", ret);
    })
}


public updatePolicy(policy: {id: number, amount: number, clientId: number, userId: number, description: string}){
    let newPolicy:{id: number, amount: number, clientId: number, userId: number, description: string} = {policy.id, 0, 0, 0};
    this.policyService.updatePolicy(policyId).subscribe((ret)=>{
		  console.log("Policy updated: ", ret);
    });
}  
```

The `.updatePolicy` method updates any policy with zeros for all the others fields except the id. This of course should be used with a form to get the new data from the user and update accordingly.

You should also add a form and bind its submit event with a `createPolicy` method that can have the following implementation:

```ts
public createPolicy(policy){
    this.policyService.createPolicy(policy).subscribe((ret)=>{
		  console.log("Policy created: ", ret);
    });
}
```

## Creating the Angular  Components

Now, that both of the in-memory data service and the CRUD service are created, you can proceed to create the components of your Angular 8 application. A component controls a part of your application screen and interacts with different services to fetch and display data.

Head back to your terminal and run the following commands to create components:

```bash
$ ng generate component policy-list
$ ng generate component policy-create
```

The CLI will create two `PolicyListComponent` and `PolicyCreateComponent` components and automatically import them into the main application module.

You don't need to create delete and update components since you can use the create component to also update policies and you can call delete operations from the list of policies in the list component.


You can now test your Angular 8 web application by running the following command to serve your project:

```bash
$ ng start
```

## Conclusion

In this tutorial, you've created a simple Angular 8 CRUD example application that makes use of the `angular-in-memory-web-api` module to mock a REST API with an in-memory database instead of using a real back-end server that could not be yet available at the time when you are creating your front-end application.
