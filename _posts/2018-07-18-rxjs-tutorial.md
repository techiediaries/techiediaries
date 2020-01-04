---
layout: post
title: "RxJS 6 for Angular Developers Tutorial by Example"
image: "images/content/angular.png"
excerpt: "In this RxJS 6 tutorial you'll learn about the latest version of RxJS, a library that implements Reactive programming in JavaScript. You'll learn about the core RxJS 6 concepts such as Observables, Observers, Subjects, Streams, Subscriptions and Operators." 
tags : [javascript, angular] 
---

In this **RxJS 6 for Angular developers tutorial** you'll learn about the latest version of RxJS, a library that implements Reactive programming in JavaScript. You'll learn about the core RxJS 6 concepts such as Observables, Observers, Subjects, Streams, Subscriptions and Operators.

In this tutorial, we'll setup a development environment to work with RxJS 6 library. In the next tutorial, we'll see how to use RxJS Observables.  

## Installing RxJS 6 Library

Before you can use RxJS 6 in your project you need to install it in your project. If you are using frameworks like the latest *Angular 6* you'll have RxJS 6 already installed and integrated. If not then you can follow these steps to properly add RxJS to your project.

First, let's quickly setup a TypeScript project with Webpack.

Open your terminal and create a folder for your project:

```bash
$ mkdir rxjs6-demo
```

Navigate inside the created folder and create a `package.json` file with the following content:

```json
{
  "name": "rxjs6demo",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {},
  "scripts": {}
}
```

Next, install the following dependencies using npm:

```bash
npm install --save rxjs webpack webpack-cli webpack-dev-server typescript ts-loader
```

Add a *start* script which launches the webpack development server in *development* mode:

```json
  "scripts": {
    "start": "webpack-dev-server --mode development"
  },
```

## Setting Up Webpack

Inside your project's root folder create a `webpack.config.js` file with the following content:

```js
const path = require('path');

module.exports = {
  entry: './src/main.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js', '.tsx' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

We define the *entry* point for our project as `./src/main.ts` so this is where we'll add our TypeScript code. Webpack will produce a `bundle.js` file inside a *dist* folder which will include in our `index.html` file.

## Adding a TypeScript Configuration `tsconfig.json` File

Inside the root folder of your project add a `tsconfig.json` file with the following content:

```ts
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "module": "es6",
    "moduleResolution": "node",
    "sourceMap": true,
    "target": "es6",
    "typeRoots": [
      "node_modules/@types"
    ],
    "lib": [
      "es2017",
      "dom"
    ]
  }
}
```

This configuration lets you use *es2017* (es8) and compile to *es6*.

## Adding an `index.html` File

Create an `index.html` file with the following content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RxJS 6 Tutorial and Examples</title>
</head>
<body>
    <div id="main"></div>
    <script src="./bundle.js"></script>
</body>
</html>
```

Now create a `src` folder with a `main.ts` file and run the following command to start the webpack dev server:

```bash
$ npm start
```

You can use your web browser from `http://localhost:8080/` to see your page.


## Conclusion

In this tutorial, we've installed a development environment with TypeScript to start using RxJS 6 library.

In this tutorial we've seen how we can setup a development project to work with RxJS 6 and TypeScript but for Angular 6 or Angular 7, RxJS 6 is included by default so you don't need to manually install it in your project. 






