---
layout: post
title: "How to output current Angular 2 version in your app"
image: "images/content/how-to-output-current-angular2-version-in-your-app/titleimage.png"
excerpt: "How to output current Angular 2 version in your app "
categories : angular2
tags : angular 
---

{% include image.html
   img="images/content/how-to-output-current-angular2-version-in-your-app/bigimage.png"
       title="How to output current Angular 2 version in your app"
%}




In this short tip tutorial we are going to learn how to display the current Angular 2 version in a web app so let's get started .

One note before i start ,because i’m still testing and learning Angular 2 i’m using plinker to play with all the new concepts and features so i don’t have to setup any development environment just to experiment with the framework so if you are not a building a real web app using Angular 2 you can just use plunker or any online JavaScript editor that supports Angular 2 .

To get version information you need  VERSION module from '@angular/core' so you make sure to import it first 

    import {Component, NgModule, VERSION} from '@angular/core'

Next create an app component 

    @Component({
      selector: 'my-app',
      template: `
        <div>
          <h2>Hello {{name}}</h2>
          <p> Your Angular 2 version is {{version}}</p>
        </div>
      `,
    })
    export class App {
      name:string;
      version:string;
      constructor() {
        this.name = 'Angular2'
        this.version  = VERSION.full;
      }
    }


We have used the @Component annotation to create a simple component that has a template with two bindings name and version 

Next in our component class we have added to member variables with type string to hold the name and version .

Then we have initialized the two variables in the constructor ,name with “Angular 2” string and version with VERSION.full which holds the full version of currently used Angular 2 .  

Next you just display this component in your html page using 

    <body>
      <my-app>
      loading...
    </my-app>
    </body>

You should get something like 
{% include image.html
   img="images/content/how-to-output-current-angular2-version-in-your-app/output-angular2-version.png"
       title="How to output current Angular 2 version in your app"
%}


Depending on your Angular 2 version .

That‘s it see you in the next tip tutorial .



