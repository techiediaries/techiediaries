---
layout: post
title: "Angular 9/8 Tutorial By Example: (REST API, HttpClient GET, Components, Services & ngFor)"
image: "images/angular.png"
excerpt: "In this tutorial, you'll learn by example how to send GET requests to REST API servers in your Angular 8 application using HttpClient. We’ll also learn how to use the basic concepts of Angular like components and services and how to use the ngFor directive to display collections of data." 
date: 2020-01-03
tags : [angular , angular9] 
---

In this tutorial, you'll learn by example how to send GET requests to REST API servers in your Angular 9 application using [`HttpClient`](https://www.techiediaries.com/angular-httpclient/). We’ll also learn how to use the basic concepts of Angular like components and services and how to use the [`ngFor`](https://www.techiediaries.com/angular-ngfor/) directive to display collections of data. 

We’ll be consuming a JSON API available from [NewsAPI.org](https://newsapi.org/)

Throughout this tutorial, we are going to build a simple example from scratch using Angular CLI 9 and we’ll see how to use [`HttpClient`](https://www.techiediaries.com/angular-http-client/) to send GET requests to third-party REST API servers and how to consume and display the returned JSON data.


In more  details, we'll learn:


- How to [create an Angular 9 project using Angular CLI](https://www.techiediaries.com/angular-cli-tutorial/),
- How to quickly [set up routing in our project](https://www.techiediaries.com/angular-router/),
- How to create [Angular components](https://www.techiediaries.com/angular-components/) and services,
- How to subscribe to Observables,
- How to use the `ngFor`  directive in templates to iterate over data.

You can also follow this tutorial as a video:

<iframe width="640" height="360" src="https://www.youtube.com/embed/lZAP871qYDw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Prerequisites

Before getting started, you need a few requirements. You need to have the following tools installed on your development machine: 


- Node.js and npm. You can install both of them from the [official website](https://www.nodejs.org/).
- Angular CLI 9 (You can install it from npm using: `npm install -g @angular/cli`)


## Creating an Angular 9 Project

Now let’s create our Angular 9 project. Open a new terminal and run the following command:


    $ ng new angular-httpclient-demo

The CLI will prompt you if **Would you like to add Angular routing? (y/N)**, type **y**. And **Which stylesheet format would you like to use?** Choose CSS and type **Enter**.

Next, you can serve your application locally using the following commands:


    $ cd ./angular-httpclient-demo
    $ ng serve

Your application will be running from `http://localhost:4200`.


### Getting News Data

Before you can fetch the news data from [NewsAPI.org](https://newsapi.org/) which offers a free plan for open source and development projects, you first need to go the [register](https://newsapi.org/register) page for getting an API key.


![Angular 9 Example](https://paper-attachments.dropbox.com/s_E3944A4BADD8D4A1A0BAEF79D0155DCFCC540F80217BBCA2EB544F3AC4737BC0_1559441719482_Screenshot+from+2019-03-05+15-34-07.png)


## Adding an Angular Service

Next, let’s create a service that will take care of getting data from the news API. Open a new terminal and run the following command:


    $ ng generate service api

### Setting up HttpClient

Next, open the `src/app/app.module.ts` file then import `HttpClientModule` and add it to the `imports` array:


    // [...]
    import { HttpClientModule } from '@angular/common/http';
    
    @NgModule({
      declarations: [AppComponent],
      entryComponents: [],
      imports: [
        // [...]
        HttpClientModule,
      ],
      // [...]
    })
    export class AppModule {}

That's all, we are now ready to use the `HttpClient` in our project.

### Injecting HttpClient in The Angular Service

Next, open the `src/app/api.service.ts` file and inject `HttpClient` via the service constructor:


    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    
    @Injectable({
      providedIn: 'root'
    })
    export class ApiService {
    
      constructor(private httpClient: HttpClient) { }
    }

### Sending GET Request for Fetching Data

Next, define an `API_KEY` variable which will hold your API key from the News API:


    export class ApiService {
      API_KEY = 'YOUR_API_KEY';

Finally, add a method that sends a GET request to an endpoint for TechCrunch news:


      public getNews(){
        return this.httpClient.get(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${this.API_KEY}`);
      }

That’s all we need to add for the service.


## How the `HttpClient.get()` Method Works

The HttpClient `get()` method is designed to send HTTP GET requests. The syntax is as follows:



    get(url: string, options: {
          headers?: HttpHeaders;
          observe: 'response';
          params?: HttpParams;
          reportProgress?: boolean;
          responseType?: 'json';
          withCredentials?: boolean;
    }): Observable<HttpResponse<Object>>;

It takes a REST API endpoint and an optional `options` object and returns an Observable instance.


## Creating an Angular 9 Component

Now, let's create an Angular 9 component for displaying the news data. Head back to your terminal and run the following command:


    $ ng generate component news


### Injecting `ApiService` in Your Component

Next, open the `src/app/news/news.component.ts` file and start by importing `ApiService` in your component:


    import { ApiService } from '../api.service';

Next, you need to inject `ApiService` via the component's constructor:


    import { Component, OnInit } from '@angular/core';
    import { ApiService } from '../api.service';
    @Component({
      selector: 'app-news',
      templateUrl: './news.component.html',
      styleUrls: ['./news.component.css']
    })
    export class NewsComponent implements OnInit {
      
      constructor(private apiService: ApiService) { }
    }

### Sending the GET Request & Subscribing to The Observable

Next, define an `articles` variable and call the `getNews()` method of the API service in the `ngOnInit()` method of the component:


    export class NewsComponent implements OnInit {
      articles;
      
      constructor(private apiService: ApiService) { }
      ngOnInit() {
        this.apiService.getNews().subscribe((data)=>{
          console.log(data);
          this.articles = data['articles'];
        });
      }
    }

This will make sure our data is fetched once the component is loaded.

We call the `getNews()` method and subscribe to the returned Observable which will send a GET request to the news endpoint.

### Displaying Data in The Template with NgFor

Let’s now display the news articles in our component template. Open the `src/app/news.component.html` file and update it as follows:

{% raw %}    


    <div *ngFor="let article of articles">
      <h2>{{article.title}}</h2>
      
        <p>
          {{article.description}}
        </p>
        <a href="{{article.url}}">Read full article</a>
    </div>
{% endraw %}    

### Adding the Angular Component to The Router

Angular CLI 9 has automatically added routing for us, so we don’t need to set up anything besides adding the component(s) to our Router configuration. Open the `src/app/app-routing.module.ts` file and start by importing the news component as follows:


    import { NewsComponent } from './news/news.component';

Next, add the component to the `routes` array:


    import { NgModule } from '@angular/core';
    import { Routes, RouterModule } from '@angular/router';
    import { NewsComponent } from './news/news.component';
    const routes: Routes = [
      {path:'news', component: NewsComponent}
    ];
    @NgModule({
      imports: [RouterModule.forRoot(routes)],
      exports: [RouterModule]
    })
    export class AppRoutingModule { }


You can now access your component from the `/news` path.

## Conclusion

In this tutorial, we used Angular 9 to build a simple news application that retrieves data from a JSON REST API using the `get()` method of `HttpClient`. We’ve seen how to subscribe to the RxJS Observable returned by the `get()` method and how to use the `*ngFor` directive to iterate over fetched data in the template. Finally, we’ve seen how we can create an Angular 9 project using Angular CLI v9, how to generate components and services and [how to configure routing](https://www.techiediaries.com/angular-router/) for the component.



