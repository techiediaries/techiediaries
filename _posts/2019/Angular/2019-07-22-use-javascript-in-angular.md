---
layout: post
title: "How to Use External and Custom JavaScript in Angular 8|7"
image: "images/content/angular.png"
excerpt: "In this tutorial, we'll learn how to use external and custom JavaScript libraries/code in Angular 8 projects which are based on TypeScript" 
tags : [ angular , angular8 ] 
---

In this tutorial, we'll learn how to use external and custom [JavaScript libraries](https://www.techiediaries.com/es-modules-import-export-default/)/code in Angular 8 projects which are based on TypeScript.

## Prerequisites

You will need to have the following prerequisites:

- Basic Knowledge of [TypeScript and Angular](https://www.techiediaries.com/typescript-tutorial/),
- Node and NPM installed on your machine,
- Angular CLI 8 (`npm install -g @angular/cli`),
- An Angular project.

You can create an Angular project by running the following command in your terminal:

```bash
$ ng new angular-javascript-demo
```

In the recent versions of Angular, you'll be prompted by the CLI for a couple of questions such as if **Would you like to add Angular routing? (y/N)** and **Which stylesheet format would you like to use?**. You can answer these questions as you see fit because this won't affect how to use JavaScript libraries in your Angular project.

Let's now see how we can use external JavaScript in Angular 8. We'll make use of the popular jQuery library as an example.

> **Note**: Please note that it's not recommended to use jQuery for maniplulating the DOM in Angular. This is simply an example of including an external JS library in Angular.

 If your library is popular you'll most likl you can install it from npm. In you terminal, navigate to your project's folder and run install jquery:

```bash
$ npm install jquery --save
```

Next, open the `angular.json` file and locate the `scripts` array and update as follows:

```json
"scripts": [
  "node_modules/jquery/dist/jquery.min.js"
]
```

Next, in the component where you want to call your external library you need to declare the JavaScript symbol you want to call. For example, for jQuery, we need add the following line:

```ts
declare  var jQuery:  any;
```

Next, you can call the required functions as in the following example:

```ts
import { Component, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular';

  ngOnInit(){
    (function ($) {
      $(document).ready(function(){
        console.log("Hello from jQuery!");
      });
    })(jQuery);
  }
}
```

## How to Use Custom JavaScript in Angular 

Let's now see how we can use custom JavaScript in Angular. 

First, create a JavaScript file inside the `src/` folder, add the following code as example:

```js
(function hello() {
    alert('Hello!!!');
})()
```

Next, add the script to the `scripts` array in the `angular.json` file:

```js
            "scripts": [
              "src/custom.js"
            ]
```


You can also simply declare and call your JavaScript functions in any component since it's a TypeScript file. For example:

```ts
import { Component, OnInit } from '@angular/core';

function hello() {
    alert('Hello!!!');
}


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular';

  ngOnInit(){
    hello()
  }
}

``` 

  



  
