---
layout: post
title: "Typed and Full Responses and Headers in Angular 7 HttpClient: Link Header Pagination Example"
image: "images/content/angular-by-example-httpclient-get.png"
excerpt: "In this tutorial, we'll learn how to get headers and full responses with HttpClient in Angular 7" 
tags : [angular, angular-9-httpclient-examples ] 
---

In this tutorial, we'll see how you can get the full response when sending HTTP requests with HttpClient in Angular 7.

We'll see an example of getting paginated data from our API server by using the `Link` header. We'll see how to retrieve the full response and how to get an HTTP header from the response.

Wikipedia defines the [Link header](https://www.w3.org/wiki/LinkHeader) as:

>The Link: header in HTTP allows the server to point an interested client to another resource containing metadata about the requested resource.

We'll only build the Angular service of our example pagination demo so you should know how to create a project and other artifacts like components. Otherwise, you can follow the other tutorials in our website that show how to get started with Angular. 

You can obtain the full response using the `observe` property and specifying the `response`  value. This way Angular will hand you the full [`HttpResponse`](https://angular.io/api/common/http/HttpResponse) object.

Let's see this with an example.

In your Angular 7 project, run the following command to generate a new model:

```bash
$ ng generate class contact
```

Open the `src/app/contact.ts` file and add the following code:

```ts
export class Contact {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    country: string;
    title: string
}
```

Next, run the following command to generate a new service:

```bash
$ ng generate service api
``` 

Open the `src/app/api.service.ts` file and add the following code:

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL: string  =  'http://localhost:3000';
  public first: string = "";
  public prev: string = "";
  public next: string = "";
  public last: string = "";
  

  constructor(private httpClient: HttpClient) {}
}
```

We simply import `HttpClient` from the `@angular/common/http` package and inject is as `httpClient` via the service constructor.

We declare the `apiURL` variable that contains the URL of the API server from where we need to fetch data.

Finally, we add the `first`, `prev`, `next` and `last` variables which will hold the links for the first, previous, next and last pages of data.

> **Note**: We assume that our API server uses the `Link` header for sending pagination information to the clients.

Next, import the `Contact` model and `tap()` operator in your service:

```ts
import { Contact } from './contact';
import { tap } from 'rxjs/operators';
```

Next, add the following CRUD methods:

```ts
  public createContact(contact: Contact){
    return this.httpClient.post(`${this.apiURL}/contacts/`,contact);
  }

  public updateContact(contact: Contact){
    return this.httpClient.put(`${this.apiURL}/contacts/${contact.id}`,contact);
  }

  public deleteContact(id: number){
    return this.httpClient.delete(`${this.apiURL}/contacts/${id}`);
  }
```

We use Angular `HttpClient` to send POST, PUT and DELETE request to our API server.

Now, let's see how to retrieve the full HTTP response with pagination information from the API server.

In your service, add the following method to get a list of paginated contacts:

```ts
  public getFirstPage(){
  
    
      return this.httpClient.get<Contact[]>(`${this.apiURL}/contacts?_page=1`,{ observe: 'response' }).pipe(tap(res => {
        const Link  = this.parse_link_header(res.headers.get('Link'));
        this.first  = Link["first"];
        this.last   = Link["last"];
        this.prev   = Link["prev"];
        this.next   = Link["next"];
        
      }));      
    
  }
```  

We use `HttpClient` to send a GET request to our API server to retrieve the first page of data. The get() method takes the URL of API endpoint as a first parameter and an options object as the second parameter. In the options object, we add the `observe` property with a `response` value to instruct Angular to provide us with the full HTTP response. This way we can get and parse the `Link` header containing pagination information sent from our API server.

We use the `pipe()` method and the `tap()` operator to run a side effect code that retrieves the Link header from the `res.headers` map, parse it and assigns the values to their respective variables. 

> **Note**: Here we assume that the first page of data is accessed from the `http://127.0.0.1:3000/contacts?_page=1` so you should change that with any other format used by your API server.


You also need to add the `parse_link_header()` method which parses the `Link` header and returns an array with the first, previous, next and last links of data pages:

```ts
 parse_link_header(header) {
    if (header.length == 0) {
      return ;
    }
  
    let parts = header.split(',');
    var links = {};
    parts.forEach( p => {
      let section = p.split(';');
      var url = section[0].replace(/<(.*)>/, '$1').trim();
      var name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;
      
    });
    return links;
  }  
```

You also need a second method that fetches specified pages of data. An example implementation looks like:

```ts
  public getNextPage(url: string){
  
      return this.httpClient.get<Contact[]>(url,{ observe: 'response' }).pipe(tap(res => {
        const Link  = this.parse_link_header(res.headers.get('Link'));
        this.first  = Link["first"];
        this.last   = Link["last"];
        this.prev   = Link["prev"];
        this.next   = Link["next"];       
      }));      
 }
```

It has the same implementation of the previous method except that we provide the URL for the page to retrieve as a parameter to the method.

## Conclusion

In this quick tutorial, you have seen how you can use typed and full responses and how to retrieve headers in `HttpClient` to create a pagination service that retrieves pages of data from a server. 
