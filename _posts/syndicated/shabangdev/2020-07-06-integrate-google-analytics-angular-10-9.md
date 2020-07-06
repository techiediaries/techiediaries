---
layout: bpost
title:  "Integrating Google Analytics With Angular 10/9"
date:   2020-07-06
tags: [angular]
canonical: "https://shabang.dev/integrate-google-analytics-angular-10-9/"  
---


In this tutorial, we'll learn too integrate Google Analytics with our Angular 10/9 application. As always, you'll need to be familiar with HTML, CSS and JavaScript/TypeScript and since we'll be using Google Analytics with Angular, you'll need to know the basic concepts of the framework. 

You also need to have Node.js and npm installed as they are required by the Angular CLI.

## What's Google Analytics and Why Tracking User Analytics in SPAs is Harder?

Analytics is the most popular and powerful free analytics tool created by Google. It allows website owners to track the page views, sessions, visits, and user engagement etc. This allows you to run effective marketing campaigns, improve the user experience and provide better content . 

Analytics was created in the first place to provide analytics for traditional websites with multiple pages but Angular is a platform for building single page applications i,e you Angular app is visited by a user,  the whole web app gets downloaded executed as one page which makes the work of Google Analytics for tracking which pages were visited harder. The concept of page in SPAs is different, this is basically a view or a portion of the UI that's currently viewed by the user. It's implemented using a JavaScript client-side router.

## How to Properly Integrate Google Analytics with Angular 10?

Because Angular 10 (and the previous versions of the framework) makes use of a client-side router to map routes to various views, we need to use `Router.event` to get the necessary information that can be sent to Google Analytics. 

Let's see this by example!

## Register Your App on Google Analytics

Let's get started by creating a Google Analytics account, this will allow us to get a tracking ID that will allow us to link our Angular 10 application with the tracking service. 

Head over to the Google Analytics website and Sign In for an account. You need to have an email with Gmail before you can create an analytics account.

## Initializing your Angular 10 Project

Let's now use Angular CLI to generate a new Angular 10 project. First, make sure you have the CLI installed by running `ng --version` command. If it's not installed, simply run the following command:
  
```bash
$ npm install -g @angular/cli
```

Next, you ca generate a new project using the following command:

```bash
$ ng new Angular10GoogleAnalyticsDemo
```

You'll be prompted if **Would you like to add Angular routing? (y/N)** type **y** and which stylesheets format you want to use, pick CSS or any other format you prefer, this is not important for our example. 

Next, let's create a bunch of Angular components in our app using the following commands:

```bash
$ ng generate component home
$ ng generate component about
$ ng generate component contact
```

Now that we have our UI components that will each make a view in our application, we need to add routing to map each component to a path and allow  users to navigate between the views. Next, we'll add the required code for tracking navigation between these components with Google Analytics. 

Open the  `src/app/app-routing.module.ts ` file, and add the routes to the `routes` array as follows:

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component.ts';
import { AboutComponent } from '../about/about.component.ts';
import { ContactComponent } from '../contact/contact.component.ts';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

That's it, just save the file and you'll have routing setup in your application. You can now navigate to each view using its URL in the web browser.

Next, go back to the `src/app/app.component.html` and update it as follows to add navigation links:

```html
<a [routerLink]="'/'">Home</a>
<a [routerLink]="'/contact'">Contact</a>
<a [routerLink]="'/about'">About</a>
<router-outlet></router-outlet>  
```

## Adding Google Analytics Tracking Code

Let's now see how to add our Google Analytics code to track the user activity. 

First. we need to add the tracking code into the  `index.html`  file of our project. Next, we need to send the page views manually. 

So remove the  `ga('send', 'pageview');`line, which is responsible for transmitting the page views, from our code.

Open the `src/index.html` file and add your Analytics tracking code except the `ga('send', 'pageview');`line:

```html
<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window.document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-00000-000', 'auto');  // Change the UA-00000-000 to your own ID

</script>
```

We removed the `ga('send', 'pageview')` line to avoid wrong page views sent when the app is first loaded.

Next, we need to send the page views to Google Analytics, when the user visits a specific route/component. 

Open the `src/app/app.component.ts` file, start by importing the  `Router`  and  `NavigationEnd`  APIs from  `@angular/router`. Next, subscribe to the  `router.events`  observable to send a page view when we navigate from one route to another:

```ts
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; 

// declare ga as a function to access the JS code in TS
declare let ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

   constructor(public router: Router) {

    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }
}
```

Now, serve your Angular application using the `ng serve` command and go to  the `http://localhost:4200`address then navigate between your components to trigger page views and send them to Analytics.

## Conclusion

Google Analytics is an essential tool for measuring and tracking user activities in web apps. In this tutorial, we have seen step by step how to integrate the tool in our Angular 10 application to track page views which are different from pages views in traditional apps since **Single Pages Apps** built by modern frameworks like Angular are downloaded and executed in web browsers as a single bundle but thanks to client side routing we can have multiple views. 