---
layout: post
title: "Build an HTML Table Example Dynamically with Angular 10/9 and ngFor"
image: "images/content/angular-by-example-httpclient-get.png"
excerpt: "In this quick example, let's see how to build an HTML table dynamically with Angular 10 and the ngFor directive" 
date: 2020-04-12
tags : [angular, angular-how-tos, angular-9-ngfor-examples, angular-9-httpclient-examples] 
---

In this quick example, we'll see how to build an HTML table dynamically with Angular 10/9 and the `ngFor` directive.

Let's assume you already have Angular CLI 10 installed on your machine and an Angular 10 project ready.

> Note: Angular 10 is currently in beta version.

You can install Angular CLI 10 using the following command:

```bash
$ npm install --global @angular/cli@next
```

We need to use the `@next` tag at this time till the final release of Angular 10. 

If you are new to these how-tos, check out how to [install and set up a project and the prerequisites](https://www.techiediaries.com/angular-cli-tutorial/).

## Building a Table with Angular 10 ngFor 

You can do this example in two steps:

- Step 1 - Getting Table Data
- Step 2 - Displaying the Table Using `ngFor`

Before we can use [`ngFor`](https://www.techiediaries.com/angular-ngfor/) for displaying data in a table, we need the data. In a real-world example, we'll need to [get data from a server database](https://www.techiediaries.com/angular-http-client/). 

## Step 1 - Getting Table Data with Angular 10 Service and `HttpClient`

This is better done using an Angular 10 service and the `HttpClient` API, so let's suppose we have the following service:

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiServer = "http://server.com";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  get(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiServer + '/customers/');
  }
}
```     

Pleate note that you need to import `HttpClientModule` in your application module before you can use `HttpClient`.
 
Next, you need to inject the `ApiService` in the component where you want to display your data. 

Let's keep it simple and use the `App` component.

Open the `src/app/app.component.ts` file and update it as follows:

```ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class App implements OnInit {

  data = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {

    this.apiService.get().subscribe((data: any[])=>{
      this.data = data;
    })  
  }

}
```

## Step 2 - Displaying the Table Using Angular 10/9 `ngFor`


Next, open the `src/app/app.component.html` file and update it as follows:

{% raw %}
```markup
            <div>
                <h1>NgFor Table Example</h1>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Customer Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let item of data">
                            <th>{{ item.id }}</th>
                            <td>{{ item.name }}</td>
                            <td>{{ item.email }}</td>
                            <td>
                                <button type="button" >Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
```
{% endraw %}

We use the `ngFor` directive to iterate over the customers data fetched from the server using the `ApiService` and we build the HTML table dynamically by displaying each row of the table in each `ngFor` iteration.

As a wrap-up, `ngFor` is a powerful Angular Core directive that allows developers to loop or iterate over arrays and collections of data in templates. 

`ngFor` and `ngIf` are called structural directives.

We've seen a simple Angular 10/9 example of building a simple HTML table inside an Angular template using `ngFor`.  