---
layout: post
title: "Angular 2 CRUD generator "
image: "images/content/angular2-crud-generator.png"
excerpt: "How to quickly generate a CRUD app based on Angular 2 tutorial "
categories : webdev
tags: angular2 angular
---

{% include image.html
   img="images/content/angular2-crud-generator.png"
       title="Angular 2 CRUD generator"
%}

Before getting started with our tutorial ,we assume you have setup your development machine for working with Angular 2
since we are using Angular 2 .If not yet then you have to do it to install latest versions of Node.js and NPM .Then for the 
sake of this tutorial you need also to install Yeoman and generator-angular-2-crud from NPM registry .

Open up your terminal under Linux/MAC or your command prompt under Windows and type the following 

    npm install -g yo
    npm install -g generator-angular-2-crud

Next you need to install TypeScript and webpack if they are not already installed because they are required by any
Angular 2 project on development phase .

    npm install --global typescript
    npm install --global webpack
    npm install --global webpack-dev-server

Now lets get started .

generator-angular-2-crud allows you to scaffold a new Angular 2 CRUD app ,all you need to is to provide it with 
a JSON data model that describes your models and how they are connected just like if you are modeling a database 
with some modeling tool .

So go ahead and create a new app folder 

    mkdir angular2-crud-example
    cd angular2-crud-example
    touch dataModel.json

Open up dataModel.json and compy paste the following model

    {
        "Items": {
            "Id": { "key": "true" },
            "Label": { "type": "string", "require": "true" },
            "quantity": "number",
            "CustomerId": { "referent": "Customers", "render": "Name" }     
        },
        "Customers": {
            "Id": { "key": "true" },
            "Name": { "type": "string", "require": "true" },
            "Address": "string"
        },
        "relativeURI": "/api/v1"
    }    

Now to generate the Angular 2 project run on the root of folder 

    yo angular-2-crud

Then start your project

    npm start 

Then go to http://127.0.0.1:3000 to use your app .

That is it you should be able to find more information about this awesome tool from its [Github repository](https://github.com/gorums/generator-angular-2-crud)

    



