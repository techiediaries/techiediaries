---
layout: post
title: "Ionic 4/Angular - Retrieving Data from Remote REST API Servers with HTTP Module and RxJS"
image: "images/content/ionic-3-http-module-rxjs.png"
excerpt: "We'll cover how to create an Ionic 3 (2+) mobile app which makes use of HTTP module and RxJS library " 
tags : [ionic]
---


**For an in-depth version of this tutorial check [Ionic 4/Angular and RxJS Observables: Building an HTTP Service to Communicate with A REST API](/ionic-http)**


In this Ionic 4 tutorial we will cover how to use the HTTP module to retrieve data or consume an API from some remote server.

As you know, when building apps, you can either store data locally with some SQLite database or local storage, use a remote server to store your data or use no data storage at all (in rare cases).


## TABLE OF CONTENTS


<span>This post is a part of many Ionic 2+ tutorials  </span>


<details >
  <summary styles="text-decoration:uppercase;cursor:pointer;">Expand this for more details</summary>
<ul>
<li>
<a href="https://www.techiediaries.com/ionic-create-first-project-app/">
Ionic 3-Create and build first project or application (Android and iOS)
</a>
</li>
<li>
<a href="https://www.techiediaries.com/ionic-cordova-add-android-platform/" target="_blank">Ionic 2/Ionic 3-Adding Cordova Android Platform</a>
</li>
<li>
<a href="https://www.techiediaries.com/ionic-create-generate-add-pages/" target="_blank">Ionic 2/Ionic 3-Create, Generate and Add Pages</a>
</li>
<li>
<a href="https://www.techiediaries.com/ionic-cli-v3-start-templates/" target="_blank">Ionic CLI v3-start command templates and options</a>
</li>
<li>
<a href="https://www.techiediaries.com/ionic-modals/">Ionic 3/Ionic 2 Modals</a>
</li>
<li>
<a href="https://www.techiediaries.com/ionic-2-navigation/">Understanding Ionic 2 Navigation</a>
</li>
<li>
<a href="https://www.techiediaries.com/ionic-3-pages-components/">Learn Ionic 3-what is a component and page? and how to use them? </a>
</li>
<li>
<a href="https://www.techiediaries.com/ionic-3-lazy-loading-modules/">Ionic 3-Lazy Loading Modules</a>
</li>
<li>
<a href="https://www.techiediaries.com/ionic2-theming-styling/">Theming and Styling Ionic 2 Apps</a>
</li>
<li>
<a href="https://www.techiediaries.com/ionic-native-3-x/">Ionic Native 3.x</a>
</li>
<li>
<a href="https://www.techiediaries.com/mocking-native-sqlite-plugin/">Developing Ionic Apps Entirely in The Browser-Mocking SQLite Native Plugin</a>
</li>
<li>
<a href="https://www.techiediaries.com/ionic-video-playing/">Playing videos with Ionic 2/Ionic 3 and Cordova Video Player plugin</a>
</li>
<li>
<a href="https://www.techiediaries.com/ionic-sqlite-pouchdb/" target="_blank">Using PouchDB and SQLite with Ionic 3: A CRUD Example</a>
</li>
<li>
<a href="https://www.techiediaries.com/ionic-cordova-sqlite-barcode-scanner-product-inventory-manager/" target="_blank">Ionic CLI v3-start command templates and options</a>
</li>
<li>
<a href="https://www.techiediaries.com/barcode-qr-code-scanner-encoder-ionic-3/">Ionic 3-Create a Nearby Restaurants App with Geolocation Plugin, Google Maps and Places API</a>
</li>
<li>
<a href="https://www.techiediaries.com/ionic-geolocation-google-maps-places-api/">Ionic 3-Create a Nearby Restaurants App with Geolocation Plugin, Google Maps and Places API</a>
</li>
<li>
<a href="https://www.techiediaries.com/learn-ionic-study-guide/" target="_blank">Learn Ionic 2+ Properly (A Study/Learning Guide)</a>    
</li>
    
</details>

In this tutorial we'll cover the second case by building a simple Ionic 4 app based on Angular which connects to a remote server and retrieve data then display it using an Ionic List component.

We will also see how to use the Reactive library RxJS to work with Observables.

We are not going to reinvent the wheel by building a REST API server but instead we are going to use 
JSONPlaceholder a fake online REST API for testing and prototyping.

Now let's get started.

<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-format="fluid"
     data-ad-layout="in-article"
     data-ad-client="ca-pub-9293763250492023"
     data-ad-slot="2159586419"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>


<div class="warning">
Note: <br>


If this was helpful for you, you need more details, the code is not properly working for you or maybe do you need another tutorial? again please feel free to reach me via the comments box below or twitter (@techiediaries). I will be more than happy to help you. I also expect some help from you, you can share my content with your social media friends. Feel free to send me an email (techiediaries9@gmail.com) and to subscribe to my RSS feed.

</div>

## Create a New Ionic 4/Angular Project 


First of all, let's generate a new project based on Ionic 4, Angular and Ionic CLI v4. 

    ionic start ionic-3-rest-api --type=angular

Wait for the CLI to do its job then 

    cd ionic-rest-api 
    ionic serve 

## Generating an Ionic 4 Service/Provider 

Now let's generate a provider which will contain all code responsible for connecting to remote API and 
retrieve data.

    ionic g provider RemoteService

Don't forget to add this provider to the list of app providers.

Go to **src/app/app.module.ts**

Import the module 

    import { RemoteService } from '../providers/remote-service';

Then add it: 

    providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, RemoteService]

## Adding HTTP Module to Our Project 

Since we are going to make use of the HTTP module we need to add it to the list of imports inside 
**src/app/app.module.ts** 

So go ahead, start by importing the HTTP module 

    import { HttpModule } from '@angular/common/http';

Then add it to the **imports** array 

    imports : [BrowserModule , IonicModule.forRoot(MyApp), HttpModule ]


In the **RemoteService** provider you'll find that HTTP is already imported and injected via service constructor so 
all you need to do is to start using it.

## Calling the Rest API  

As I said earlier, we are going to use a fake API available from <em>https://jsonplaceholder.typicode.com/</em>.

It has many endpoints such as: 


    /posts	100 items

    /comments	500 items

    /albums	100 items

    /photos	5000 items

    /todos	200 items

    /users	10 items

Let's retrieve the data from **/posts** endpoint. 

First add a method to the **RemoteService** service and also a member variable which holds the API endpoint

    import {HttpClient ,Response } from '@angular/common/http';
    import 'rxjs/add/operator/do';
    import 'rxjs/add/operator/map';
    import 'rxjs/add/operator/catch';
    
    

    getApiUrl : string = "https://jsonplaceholder.typicode.com/posts";

    getPosts() {

        return  this.http.get(this.getApiUrl)
                .do((res : Response ) => console.log(res.json())
                .map((res : Response ) => res.json())
                .catch(error => console.log(error));
    }

The **do** operator allows you to execute some operations on response, in our case we'll just log the response 
to the console.      

Next open your home page **src/pages/home/home.ts** then  

Import **RemoteService** and inject it in page constructor.

Add a member variable of type Array to host our posts.

Add a method to fetch posts.


    export class HomePage {
        postList = [];
        
        constructor(private remoteService : RemoteService){
            this.getPosts();
        }
        getPosts(){
            this.remoteService.getPosts().subscribe((data)=>{
                this.postList = data;
            });
        }
    }


## Displaying Data with An Ionic List 

After getting remote data from the remote rest api, let's display it using a list.

Go ahead and open **src/pages/home/home.html** then add an **ion-list** to **ion-content** 

    <ion-content padding>
    <h2>Posts</h2>
    <ion-list>
        <ion-item *ngFor="let post of postList">
        { { post.title } }
        </ion-item>
    </ion-list>
    </ion-content>


Now you can serve your app with ionic serve to test if the app is working as expected.

You can also use other HTTP methods such as post, put or delete methods.

## Conclusion 

We have seen how we can use the HTTP module and RxJS library to retrieve data from a remote Rest API server.



