---
layout: post
title: "Modern and Legacy JavaScript: Differential Loading with Angular 8 Tutorial"
image: "images/content/angular.png"
excerpt: "In this JavaScript tutorial designed for Angular developers, we'll learn how Angular 8 makes differential loading to send separate modern and legacy JavaScript bundles to web browsers based on their capabilities thanks to the module and nomodule attributes and browserslist. Next, we'll introduce the various new features of modern JavaScript to Angular devs then finally we'll see how to include custom JavaScript code in our Angular apps" 
tags : [ angular, angular8 ] 
---

In this [JavaScript](https://www.techiediaries.com/javascript/) tutorial designed for Angular developers, we'll learn how Angular 8 by example makes differential loading to send separate modern and legacy JavaScript bundles to web browsers based on their capabilities thanks to the `module` and `nomodule` attributes and `browserslist`. Next, we'll introduce the various new features of modern JavaScript to Angular devs then finally we'll see how to include custom JavaScript code in our Angular apps.

Angular is an open-source, client-side JavaScript platform for building web and mobile apps. 

Angular is written in TypeScript which is a superset language of JavaScript that gets eventually compiled to JavaScript before it can be executed by web browsers which can only understand JavaScript, CSS and HTML.

TypeScript includes all the features of JavaScript plus a plethora of its own features that take your productivity to the next level.

Before running your app in a web browser, you need to compile the TypeScript code into JavaScript by configuring the TypeScript compiler but fortunately you don't need to do any manual configurations if your are using the Angular CLI which takes care of all that.


## Sending Separate Modern and Legacy Angular JavaScript Bundles to Browsers

The latest Angular 8 version makes use of a feature called differential loading that allows you to send the modern JS code (ES6+) to modern web browsers that support the latest features of JavaScript or the legacy code (ES5) to old browsers. 

> **Note**: Differential loading allows you to save about 7/20% in size for Angular apps in modern web browsers.

Modern browsers are able to recognize a `module` type in the HTML `<script>` tag and to ignore a `nomodule` attribute.

For example, let's take the following code:

```html
<script src="dist/bundle1.js" type="module"></script>
<script src="dist/bundle2.js" nomodule></script>
```

A modern web browser will be able to load the `dist/bundle1.js` file but since an old legacy browser doesn't understand the `module` type, it will load the `dist/bundle2.js` file instead.

## Installing Angular CLI 8

Before you can create an Angular 8 project, you must have a recent version of Node.JS and NPM installed on your machine.
 
Open a new command-line interface and run the following command:

```bash
$ npm install -g @angular/cli
```

## Creating an Angular 8 Project

Next, create an Angular 8 project using the following command:

```bash
$ ng new angular-javascript-demo
```

You'll be prompted by the CLI if **Would you like to add Angular routing? (y/N)** and **Which stylesheet format would you like to use?**. 


If you ahev an Angular 7 project, first you need to make sure to update to the latest version:

```bash
$ cd into__your_angular_project
$ ng update @angular/cli @angular/core
```

Navigate to your project's folder, you should find a `browserslist` file which has the following content:

```txt
> 0.5%
last 2 versions
Firefox ESR
not dead
not IE 9-11 # For IE 9-11 support, remove 'not'.
```

This file is used by the build system to adjust CSS and JavaScript output to support the specified browsers and versions.

You can find more information about its format and rule options, refer to the [official docs](https://github.com/browserslist/browserslist#queries)

You can customize this file as you see fit per your use cases.

You can run the following command in your terminal to display what browsers were selected by these queries:

```bash
$ angular-javascript-demo
$ npx browserslist
```

This is the output for the default `browserslist` configuration that comes with Angular 8:

```bash
and_chr 75
and_ff 67
and_qq 1.2
and_uc 12.12
android 67
baidu 7.12
chrome 75
chrome 74
chrome 73
edge 18
edge 17
firefox 68
firefox 67
firefox 60
ie_mob 11
ios_saf 12.2-12.3
ios_saf 12.0-12.1
ios_saf 11.3-11.4
kaios 2.5
op_mini all
op_mob 46
opera 62
opera 60
safari 12.1
safari 12
samsung 9.2
samsung 8.2
```


Now, open the `tsconfig.json` file:

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "module": "esnext",
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "es2015",
    "typeRoots": [
      "node_modules/@types"
    ],
    "lib": [
      "es2018",
      "dom"
    ]
  },
  "angularCompilerOptions": {
    "fullTemplateTypeCheck": true,
    "strictInjectionParameters": true
  }
}

```

Notice that the `target` property has the `es2015` value which means that the TypeScript compiler will target ES2015/ES6.

Now, head back to your terminal and let's build the application for production using the following command:

```bash
$ ng build --prod 
```

This it the output of the command:

```bash
chunk {0} runtime-es2015.24b02acc1f369d9b9f37.js (runtime) 2.83 kB [entry] [rendered]
chunk {1} main-es2015.d335718ef48b35971cc1.js (main) 546 kB [initial] [rendered]
chunk {2} polyfills-es2015.fd917e7c3ed57f282ee5.js (polyfills) 64.3 kB [initial] [rendered]
chunk {3} polyfills-es5-es2015.3aa54d3e5134f5b5b842.js (polyfills-es5) 223 kB [initial] [rendered]
chunk {4} styles.6b3fe9320909874e6b1b.css (styles) 61 kB [initial] [rendered]
Date: 2019-09-20T11:57:25.514Z - Hash: 0f403b3d18149db6f693 - Time: 299070ms
Generating ES5 bundles for differential loading...
ES5 bundle generation complete.
```

Now, open the `dist/index.html` file, you'll notice that Angular CLI 8 added various `<script>` tags with `type="module"` and `nomodule` attributes:

```html
<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>Angulardemo</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="stylesheet" href="styles.6b3fe9320909874e6b1b.css">
</head>

<body>
  <app-root></app-root>
  <script src="polyfills-es5.3aa54d3e5134f5b5b842.js" nomodule defer></script>
  <script src="polyfills-es2015.fd917e7c3ed57f282ee5.js" type="module"></script>
  <script src="runtime-es2015.24b02acc1f369d9b9f37.js" type="module"></script>
  <script src="main-es2015.d335718ef48b35971cc1.js" type="module"></script>
  <script src="runtime-es5.24b02acc1f369d9b9f37.js" nomodule defer></script>
  <script src="main-es5.d335718ef48b35971cc1.js" nomodule defer></script>
</body>

</html>
```

Let's see this in a web browser. First install the serve tool to serve our app locally:

```bash
$ npm install -g serve
```

Next, navigate to your `dist` folder and serve it:

```bash
$ cd dist/angular-javascript-demo
$ serve
```

Go with your web browser to the `http://localhost:5000` address. Go to the Network panel of DevTools, if you use a modern version of Chrome (or any modern web browser), you should see that your web browser loaded the modern ES2015 bundles of your app:

![](https://www.diigo.com/file/image/rscqpoqzocdebcrrazdsodeoqe/Angular+8+Differential+Loading.jpg?k=567cc6e4db30e43bfd7f224502553910)

## Introducing JavaScript for Angular Devs

You don't need to master every feature of TypeScript but you must know JavaScript as it's the pillar language of frontend web development. In this tutorial, I'll introduce you to the features of modern JavaScript.

ES6 has new syntax sugar and features that make JavaScript powerful and easier to use. The new ES6 lets you write awesome JavaScript code. Among the new features introduced in JavaScript by ES6 are: 

- New keywords for variable declaration such as [`const`](https://www.techiediaries.com/javascript-const-vs-object-freeze/) and `let`,
- [JavaScript modules](
https://www.techiediaries.com/es-modules-import-export-default/)
- template strings, 
- [arrow functions](https://www.techiediaries.com/javascript-arrow-function-default-parameters/), 
- class destructing,
- [JavaScript Promises](https://www.techiediaries.com/javascript-promises-tutorial-example/) etc. 

### Declaring Variables in JavaScript/ES6 (`var` vs `let` vs `const`)

JavaScript developers used the `var` keyword for declaring variables for a long period of time but is there anything wrong with the `var` keyword? Yes more than one thing!

- Variables declared using `var` leaks outside their scope (you can access them outside the scope where they are declared),
- Variables declared using `var` are **mutable** (you can change their values)   
- Variables declared with `var` can be re-declared

ES6 provides the `const` and `let` keywords which are designed to solve the issues caused by the `var` keyword.

- `const` lets you declare constant variables which can't be re-assigned.
- `let` lets you declare variables which can't be re-declared.

>**`let`** allows you to declare variables that are limited in scope to the block, statement, or expression on which it is used. This is unlike the `var` keyword, which defines a variable globally, or locally to an entire function regardless of block scope.[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)

`const` can be used to declare variables that hold elements returned by DOM query methods such as the `document.querySelector()` method.

```js
const el = document.querySelector(`#my-id`)
``` 

`const` variables need to be initialized or otherwise a `SyntaxError` will be thrown. For example, the following code will throw an error `Uncaught SyntaxError: Missing initializer in const declaration`:

```js
const my_variable
```

This is a screen shot when executing the code in the console of Chrome DevTools:

![es6 tutorial](https://i.imgur.com/kyWvncR.png)

The correct syntax would be:

```js
const my_variable = "a const variable declared";
```

![javascript es6 tutorial](https://i.imgur.com/1K6rjUb.png)

Now, let's try to change the value of `my_variable`:

```js
my_variable = "new value";
```
The code will fail with the error `Uncaught TypeError: Assignment to constant variable.`

![es6 tutorial](https://i.imgur.com/V5W9lEI.png)

Now let's use `let` to declare some variables:

```js
let my_variable2;
let my_variable3= "another variable declaration";
```
We declare `my_variable2` (non initialized) and `my_variable2` (initialized with a string value) variables.

![javascript es6 tutorial](https://i.imgur.com/Icv3Fj5.png)

The value of `my_variable2` is undefined.

Unlike the `var` keyword, the `let` keyword doesn't allow you to re-declare variables within the same function or block scope. The following code will fail with the error `Uncaught SyntaxError: Identifier 'my_variable2' has already been declared`:

```js
let my_variable2; 
``` 

![es6 tutorial](https://i.imgur.com/DpyJ4Gc.png)

Both `const` and `let` keywords are **block-scoped** meaning the variables are only available inside the block where they are declared. Let's consider this example:

```js
  let x = 1;
  if (true) {
    let x = 2;
    console.log(x);  
  }
  console.log(x);  

```
We declare the *x* twice, the first declaration is outside the `if{}` block and the second declaration is within the `if{}` block. The second declaration produces a new variable available inside the block but not outside so the first `console.log(x)` instruction will print *2* while the second `console.log(x)` will print *1*.

![es6 tutorial](https://i.imgur.com/GE67wIB.png)

>We now know that `var` is **function scope**, and now we know that `let` and `const` are **block scope**, which means any time you’ve got a set of curly brackets you have block scope.

>Now, we need to know **you can only declare a variable inside of its scope once**.

>You _can_ **update** a `let` variable, and we’ll take a look more at `let` and `const` but you _cannot_ redeclare it twice in the same scope.

The important thing here is that these two `winner` variables are actually **two separate variables**. They have the same name, but they are both **scoped** differently:

-   `let winner = false` outside of the if loop is scoped to the window.
-   `let winner = true` inside the if loop is scoped to the block.

## JS Modules
>Almost every language has a concept of _modules_ — a way to include functionality declared in one file within another. Typically, a developer creates an encapsulated library of code responsible for handling related tasks. That library can be referenced by applications or other modules.
```
  <!DOCTYPE html>
  <html>
    <head>
    <title>ES6 module example</title>
    <script  src="app/utils.js"  type="module"></script>
    <script  src="app/fallback.js"  nomodule></script>
    </head>
    <body>
    </body>
  </html>
```

>You can add `module` to the type attribute of a script element `<script type="module">`. The browser will then treat either inline or external `script` elements as an ES6 module.

In **utils.js** file.

```js
  function hello()  {  
    return  "Hello";  
  }
  function world()  {
    return  "World";
  }
  // Basic export
  export  { hello, world };
```

In **main.js** file.

```js
  import  {hello, world}  from  '/app/utils.js';
  hello();
  world();
 ```
 
## Arrow Functions

>**Arrow functions were introduced with ES6 as a new syntax for writing JavaScript functions. They save developers time and simplify function scope. Surveys show they’re the most popular ES6 feature:**

![es6 arrow functions](https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2016/02/1454335895es6-arrow-functions-new-fat-and-concise-syntax-in-js01-axel-rauschmayer-survey-favorite-es6-features.png)
 [Source](http://www.2ality.com/2015/07/favorite-es6-features.html)
 
  Most major modern browsers support arrow functions.
   
 >are a more concise syntax for writing function expressions. They utilize a new token, `=>`, that looks like a fat arrow. Arrow functions are anonymous and change the way `this` binds in functions. 
 
 ```javascript
// ES5
var multiplyES5 = function(x, y) {
  return x * y;
};

// ES6
const multiplyES6 = (x, y) => { return x * y };
```

Curly brackets aren’t required if only one expression is present. The preceding example could also be written as:

```javascript
const multiplyES6 = (x, y) => x * y;
```
>Also, you can use Arrow function with `map`, `filter`, and `reduce`  built-in functions.

Now, that we have seen the important features of modern JavaScript, let's see how we can how to use JavaScript code in your Angular 8 projects which are based on TypeScript.

## Including Custom JavaScript in Angular 8 Project 

Now, let's learn about how to include custom JavaScript code in our Angular 8 application. 

Go ahead and create a new JavaScript file in the `src/` folder of your project:

```bash
$ cd src
$ touch custom.js
```

Next write the following code:

```js
const helloAngular = () => {
    console.log("Hello Angular from JavaScript!");
};
```

Next, open the `angular.json` file and add the file to the `scripts` array:

```js
            "scripts": [
              "src/custom.js"
            ]
```

That's it, you can now use vanilla JavaScript in your project. 


## Conclusion

In this tutorial we learned how Angular 8 makes use of differential loading to send separate modern and legacy JavaScript bundles to web browsers based on their capabilities thanks to the `module` and `nomodule` attributes and `browserslist`. Next, we introduced the various new features of modern JavaScript to Angular devs then finally we've seen how to include custom JavaScript code in our Angular apps.




