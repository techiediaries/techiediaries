---
layout: post
title: "Angular 9/8 ngIf Tutorial & Example"
image: "images/content/angular.png"
excerpt: "Throughout this quick tutorial, you'll be learning about how you can use ngIf in your Angular 6 applications"
categories: angular
date: 2020-03-10 
tags : [angular, angular8, angular-9-ngfor-examples, angular-9-ngif-examples]
---

Throughout this quick tutorial, you'll be learning about how you can use `ngIf` in your Angular 9/8 applications.

## What's the `ngIf` Directive?

The `ngIf` directive in Angular allows you to do conditional rendering of template parts i.e you can show or hide an HTML element on your Angular 9 HTML template based on some condition.

  

> **Note**: In this Angular 8 [tutorial](https://www.techiediaries.com/html-tutorial), we'll see the `ngIf` directive in a complete example that consumes data from a third-party API and render it in the HTML template. 


Let's get started started!

See this Stackblitz example of how to use `ngFor` and `ngIf` in your Angular HTML template:

<iframe src="https://stackblitz.com/edit/angular-html-template-syntax?embed=1&file=src/app/home/home.component.html" style="border:0px #ffffff none;" name="myiFrame" scrolling="no" frameborder="1" marginheight="0px" marginwidth="0px" height="400px" width="600px" allowfullscreen></iframe>

  
## `ngIf` with Angular 9 Example 
  
The `ngIf` directive can be very useful in scenarios where you want to show a part of your Angular 9 application UI.  
  
Let's see a simple example.  
  
Let's suppose, we have the following Angular 9 component that lives in the `src/app/contact-list/contact-list.component.ts`:

```ts
import { Component } from '@angular/core';  
@Component({  
  selector: 'contact-list',  
  templateUrl: './contact-list.component.html',  
  styleUrls: ['./contact-list.component.css']  
})  
export class ContactListComponent {  
  showActions: boolean = false;  
  contacts: <> = [
	{name: "test1", email:"test1@test1.com"},
	{name: "test2", email:"test1@test2.com"},
	{name: "test3", email:"test1@test3.com"},
	{name: "test4", email:"test1@test4.com"}
	]
}  
```

This component will be used to display a table of contacts with various buttons, in each row, that will be used to update or delete the contacts.   

Typically, in this kind of applications, you only want to let users to update or delete items if they are logged in and have the required permissions.

This means, that you either need to disable or hide the delete and update buttons if users are not logged in.

## Using `ngIf` in Angular 9

One way of achieving this in Angular 9 applications is through using the `ngIf` directive.
 
On the `ContactListComponent ` component, we have added the Boolean `showActions` variable. You can then listen for the authentication state and set the `showActions` accordingly.   

In the component's template, you need to use the `ngIf` directive and show or hide the actions' buttons depending on the value of the `showActions` variable. This is an example of the template:
  
{% raw %}
```html
<h1>Contact List</h1>
<table>
<thead>
<th>Name</th>
<th>Email</th>
<th *ngIf="showActions">Actions</th>
</thead>
<tbody>
<tr *ngFor="let contact of contacts">
<td>
	{{contact.name}}
</td>
<td>
	{{contact.email}}
</td>
<td *ngIf="showActions">
	<button>Delete</button>
	<button>Update</button>
</td>
</tr>
</tbody>
</table>  
```
{% endraw %}

This will only show the table cells that contains the actions buttons when  `showActions` is True. 

## Conclusion

In this quick tutorial, we learned about the `ngIf` directive in Angular 9.

If you would like to see a complete example. Read this Angular 8 [tutorial](https://www.techiediaries.com/html-tutorial) where we used `ngIf` to conditionaly render an HTML fragment while data is being fetched from the API.
