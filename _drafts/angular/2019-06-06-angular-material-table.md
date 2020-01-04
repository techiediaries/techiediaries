---
layout: post
title: "Angular 8 CRUD Tutorial with Angular Material Table & Form"
image: "images/content/angular.png"
excerpt: "Angular Material 8 Tutorial: Build Navigation UI with Toolbar and Side Navigation Menu" 
tags : [  angular ]
---

After creating our Angular 8 project in this [tutorial](https://www.techiediaries.com/angular-tutorial) and added component routing to our application in this [tutorial](https://www.techiediaries.com/angular-routing-tutorial). 

### <a name="Getting_Contacts_Sending_HTTP_GET_Request_Example">Getting Contacts/Sending HTTP GET Request Example</a>
Let's start with the contacts API endpoint. 
First we'll add a method to consume this endpoint in our global API service, next we'll inject the API service and call the method from the corresponding component class (`ContactListComponent`) and finally we'll display the result (the list of contacts) in the component template.
Open `src/app/contact.service.ts` and add the   `getFirstPage()` method:
```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  API_URL  =  'http://localhost:8000';
  constructor(private  httpClient:  HttpClient) { }
  getFirstPage(){
    return  this.httpClient.get(`${this.API_URL}/contacts`);
  }
}
```

Next, open `src/app/contact-list/contact-list.component.ts` and inject the `ContactService` then call the `getFirstPage()` method:
```ts
import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  
  displayedColumns  :  string[] = ['id', 'first_name', 'last_name', 'email', 'phone', 'account', 'address', 'description', 'createdBy', 'createdAt', 'isActive', 'actions'];
  dataSource  = [];
  constructor(private contactService: ContactService) { }
  ngOnInit() {
    this.fetchContacts();
  }
  fetchContacts(){
    this.contactService.getFirstPage().subscribe((data:  Array<object>) => {
      this.dataSource  =  data;
      console.log(data);
    });
  }
}
```