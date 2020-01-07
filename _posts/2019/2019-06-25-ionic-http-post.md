---
layout: post
title: "Ionic 4 HTTP POST with Angular by Example"
image: "images/content/angular-httpclient.png"
excerpt: "How to use HttpClient to make example HTTP Post Requests in Ionic 3" 
tags : [ionic, angular-9-httpclient-examples] 
---

In this Ionic 4/Angular tutorial, we'll learn how to send an example HTTP post request to a server (or post data to a server). Usually the POST data is submitted using a form by the user. In this example we'll be sending a simple JSON object. You can see how to post multipart form data in this [tutorial](https://www.techiediaries.com/ionic-formdata-multiple-file-upload-tutorial/). 

> **Note**: For a complete and detailed tutorial, check out:
>
> - [Ionic 4 JWT Authentication Tutorial: Using Angular HttpClient with Node & Express.js Server](https://www.techiediaries.com/ionic-jwt-authentication-httpclient)
> - [Ionic 4 Tutorial: Building and Theming a Login & Register UI with Angular Forms](https://www.techiediaries.com/ionic-ui-forms-theming)

In the [previous tutorial](https://www.techiediaries.com/ionic-http/), we've seen what's a REST API and RxJS. We also configured our Ionic 4/Angular application to use `HttpClient` and created (mocked) a REST server for testing. Now let's see how to send a POST request to our server.

> **Note**: This tutorial was originally created for Ionic 3. Ionic 4 is now framework agnostic but provides support for Angular via the `ionic/angular` package. Ionic 4/Angular is considered the next version of Ionic 3.

Start by opening the `src\app\home\home.page.html` file and update it by adding a button which will be used to call the method to send the post request:

```html
<ion-header>
  <ion-navbar>
    <ion-title>
      Ionic 4/Angular POST Request Example
    </ion-title>
  </ion-navbar>
</ion-header>
 
<ion-content padding>
  <p>
      Sending a POST Request Example
  </p>
   <button ion-button (click)="sendPostRequest()">Post Data</button>
</ion-content>
```

Next, open the `src\app\home\home.page.ts` file and add the following changes:

```ts
import { Component, OnInit } from '@angular/core';
import { HttpClient, Headers, RequestOptions } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public httpClient: HttpClient) {
  }
  ngOnInit(){}
   
  sendPostRequest() {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const requestOptions = new RequestOptions({ headers: headers });
 
    let postData = {
            "name": "Customer004",
            "email": "customer004@email.com",
            "tel": "0000252525"
    }
    
    this.http.post("http://127.0.0.1:3000/customers", postData, requestOptions)
      .subscribe(data => {
        console.log(data['_body']);
       }, error => {
        console.log(error);
      });
  }
}
``` 

  


We start by importing the `HttpClient`, `Headers`, `RequestOptions` classes. After that, we inject the `HttpClient` service into the component constructor as `httpclient`.

Next, we define the `sendPostRequest()` method which will be called when the button is clicked. We are calling the `post()` method from the injected instance of the *HttpClient* service. The first parameter is the API endpoint and the second parameter is the *customer* data object. We also subscribe to the observable returned by the `post()` method using the `.subscribe()` method. If the operation is successful we display the *_body* of data received by the success function. If there is an error we log the error on the console.

## Conclusion

In this quick tutorial, we've seen to use the *HttpClient* service to send http POST data in Ionic 4/Angular applications.
