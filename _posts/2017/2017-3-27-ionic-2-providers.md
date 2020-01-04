---
layout: post
title: "Ionic 4/Angular Service Providers"
image: "images/content/ionic2-providers.png"
excerpt: "An In-Depth tutorial of latest Ionic 2 version  (2.2.0) providers " 
tags : [ionic2]
---


{% include image.html 
    img="images/content/ionic2-providers.png" 
    title="Ionic 2 providers" 
%}

Ionic 4 can be used with Angular  which is a component based framework written in TypeScript. 

Components are the basic buildings for any Angular/Ionic 4 app but they are not the only constructs, there are many!

In this tutorial we are going to learn about Ionic 4/Angular service providers or Injectables in Angular terminology. Also known as 
services.

There are many names or maybe types for providers, such as shared providers and data providers etc.

Services or providers can be used by components inside an Ionic 4/Angular app for providing data or any type of service such as

<ul>
<li>
HTTP requests,
</li>
<li>
Interacting with databases, 
</li>
<li>
Or accessing device features and information etc.
</li>
</ul>

You are the coder and the only judge of the type of code that you need to write as a provider or service but you should follow some guidelines, for example:

<ul>
<li>
Repeated code: If you tend to repeat a chunk of code (Which performs some specific task) across many components, it may be a wise idea to make it as a service then inject/use the service in your components.
</li>
<li>

Database access code: Sometimes we need to fetch data from a database in multiple components. It's not a good 
thing to open a connection to database from every component. What we need to do instead is to create a service which opens a connection to the database once and every time we need to fetch data we just call the service.
</li>
</ul>

You can stumble upon many scenarios where you need to create a service when you are developing your application. You are the judge on what it should be made as a service or just a bunch of code inside a component.

Now let's see the technical aspects of providers and how to create and use them inside Ionic 4/Angular apps.

## Technical Aspects of Providers 

A provider is a normal TypeScript/ES6 class decorated by the Angular `@Injectable` decorator.

In order to use a service we need to follow these three steps: 

<ul>
<li>
First we create the provider of the service.
</li>
<li>
Next we import it.
</li>
<li>
Then we inject it and start using it in components or other services. 
</li>
</ul>

So let's see an actual example of a service. 


In a previous tutorial, we have seen how to [create a WordPress mobile app with Ionic 4](/wordpress-ionic-2) which gets posts from 
a WordPress website and display their titles inside the mobile app. Since we need to get posts, categories and other things from the remote server we have created a service for that: 

    import { Injectable } from '@angular/core';
    import { Http } from '@angular/http';
    import 'rxjs/add/operator/map';

    declare var WPAPI : any;

    /*
    Generated class for the WPService provider.

    See https://angular.io/docs/ts/latest/guide/dependency-injection.html
    for more info on providers and Angular 2 DI.
    */
    @Injectable()
    export class WPService {
    wp : any ;

    constructor(public http: Http) {
        console.log('Hello WPService Provider');
        this.wp = new WPAPI({ endpoint: 'http://localhost/wp-json' });
        //console.log(wp);
    
    }
    public posts(){
        return this.wp.posts().then(function( data ) {
        // do something with the returned posts
        //console.log(data);
        var paging = data._paging;
        var results = [];
        for(var i = 0; i < paging.total ; i++)
        {
            results.push(data[i]);
        }
        return results;
        }).catch(function( err ) {
        // handle error
        console.log(err);
        return err;
        }); 
    }

    }


You can create a service provider using two methods.

Using the Ionic CLI 4 with the following command 

    ionic generate provider WPService 

Which will create a `wp-service.ts` file inside the `src/providers` folder with the minimal code for a provider:

    import { Injectable } from '@angular/core';
    import { Http } from '@angular/http';
    import 'rxjs/add/operator/map';

    @Injectable()
    export class WPService {
    
    constructor(public http: Http) {
        console.log('Hello WPService Provider');
    }

    }

The HTTP service is a builtin Angular service that can be used to make HTTP requests. It is not required 
by every service so you can remove it if you don't need to send HTPP requests in your service.

You can also create a provider manually by simply creating a TypeScript file( `.ts`) inside the `src/` folder.

Create a TypeScript class and decorates it with `@Injectable` decorator after importing it from `@angular/core`:

     import { Injectable } from '@angular/core';

The minimal code for a provider is :

    import { Injectable } from '@angular/core';

    @Injectable()
    export class MyService {
    
        constructor() {
            console.log('Hello Providers !');
        }

    }
  
## Using Angular Service Providers in Components

Before you can use a service provider, you need to add it to the list of providers in the `src/app/app.module.ts` 

    import { WPService } from '../providers/wp-service';
    /*
    * Other imports 
    */

    @NgModule({
    declarations: [
        MyApp,
        Page1,
        Page2
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        Page1,
        Page2
    ],
    providers: [
        StatusBar,
        SplashScreen,
        WPService,//Our provider
        {provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
    })
    export class AppModule {}



Next to use it inside a component, you need to import and inject it.

Again from the previous WordPress example, here is the code for the first page component:

    import { Component } from '@angular/core';

    import { NavController } from 'ionic-angular';

    import { WPService } from '../../providers/wp-service';

    @Component({
    selector: 'page-page1',
    templateUrl: 'page1.html'
    })
    export class Page1 {

        constructor(public navCtrl: NavController , public wpService : WPService) {
            wpService.posts().then(function(r){
                console.log(r);
            })
        }

    }


> Note: There many built in Ionic 4/Angular services that you use regularly such as NavController that you can find injected in every component you generate with ionic g component.

## Conclusion

Ionic 4/Angular has many builtin service providers that makes using the framework easier but you can also create your own service providers if you need to share some unit of code across many components so you can avoid repetitive code. This type of providers are called shared providers. You can also create data providers if you need to access data sources such as remote back ends or databases.

You can use services by first importing them from inside src/providers if they are created by you of from other locations 
if they are built in Ionic 2 ,then inject them via the constructor of other components/services .

You can also use services for replaceable functionality inside your app .For example if your code needs to interact 
with a Rest backend in production ,in development you can create a mock service which provides some hard coded 
values of data to your components but when you are ready for production you can easily swap the mock service with 
the actual services that fetch data from the Rest back end .

A service is a kind of a global singleton that get instantiated once ,the same instance is then provided to each 
component which inject the service so if you are used to write code that uses the Singleton pattern you can use 
services instead in Ionic 2 apps .

