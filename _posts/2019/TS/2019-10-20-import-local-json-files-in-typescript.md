---
layout: post
title: "Import & Read Local JSON Files in Angular 7/8 and TypeScript 2.9+"
image: "images/content/angular.png"
excerpt: "In this tutorial, we'll see by example how to import and read local JSON files in Angular 8 applications and TypeScript 2.9+" 
tags : [angular , angular8] 
---


In this tutorial, we'll see by example how to import and read local JSON files in Angular 8 applications and TypeScript 2.9+. 

There are various ways to read local JSON files but in this example we'll see how to use the `import` statement to import a local JSON file just like any TypeScript module which is a supported feature in TypeScript 2.9+. 

Angular added support for TypeScript 2.9+ from v6.1+.

In TypeScript 2.9+, we can use the `resolveJsonModule` configuration option in the `tsconfig.json` file to enable importing local JSON files just like modules. Let's see this step by step.

## Step 1 - Preparing your Angular 8 Project

You should create an Angular 8 project using Angular CLI.

## Step 2 - Configuring the TypeScript Compiler

Next, let's start by configuring the TypeScript compiler to enable importing local JSON files. Open the `tsconfig.json` file and add the `"resolveJsonModule": true` configuration option under the `compilerOptions` key:

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    ...
    "resolveJsonModule": true,
    ...
}
```

## Step 3 - Creating a Local JSON File

Next, let's create a local JSON file in our Angular project's folder. In the `src/app` folder, create a `data.json` file and the following data:

```json
[
    {
        "id": 1,
        "name": "Licensed Frozen Hat",
        "description": "Incidunt et magni est ut.",
        "price": "170.00",
        "imageUrl": "https://source.unsplash.com/1600x900/?product",
        "quantity": 56840
    },
    {
        "id": 2,
        "name": "Rustic Concrete Chicken",
        "description": "Sint libero mollitia.",
        "price": "302.00",
        "imageUrl": "https://source.unsplash.com/1600x900/?product",
        "quantity": 9358
    },
    {
        "id": 3,
        "name": "Fantastic Metal Computer",
        "description": "In consequuntur cupiditate et unde minus.",
        "price": "279.00",
        "imageUrl": "https://source.unsplash.com/1600x900/?product",
        "quantity": 90316
    }
]
```
Next, let's see how to import the JSON data in this file in our Angular component.

## Step 4 - Importing the JSON File

Open the `src/app/app.component.ts` flle and add the following import statement:

```ts
import  *  as  data  from  './data.json';
```

Next, let's display the data object in the console:

```ts
  ngOnInit(){
    console.log(data);

  }
```
This is a screenshot of the console:

![](https://www.techiediaries.com/assets/images/angular-import-json-console.png)

We can that our data resides in a `default` array. Next, define a variable in your component and assign the JSON data to it as follows:

```ts
products:  any  = (data  as  any).default;
```

This is the code of the full component:

```ts
import { Component, OnInit } from '@angular/core';
import * as data from './data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular Example';

  products: any = (data as any).default;

  constructor(){}
  ngOnInit(){
    console.log(data);
  }
}
```

## Step 5 - Displaying the JSON Data

Finally, open the `src/app/app.component.html` file  and add the following code:

[% raw %}
```html
<ul>
  <li *ngFor="let product of products">
    {{product.name}} 
  </li>
</ul>
```
[% endraw %}

## Conclusion

In this quick example, we've seen how to use the import statement in TypeScript 2.9+ to import and load local JSON files in our Angular 8 apps.  This feature is enabled  using the `"resolveJsonModule": true` configuration option under the `compilerOptions` key of the `tsconfig.json` file - The TypeScript compiler's configuration file. 
