---
layout: post
title: "Webpack 4 Tutorial with Angular 10"
image: "images/content/angular.jpg"
excerpt: "In this tutorial, we'll be introducing Webpack to Angular developers. We'll also see a simple example of using a custom webpack configuration in Angular 10" 
tags : [webpack, angular , angular8] 
---

In this tutorial, we'll be introducing Webpack to Angular developers. You'll learn about:
 
- What is Webpack,
- How Webpack Works,
- Understaning Webpack Concepts,
- The Features of Webpack 4,
- How to use webpack in a simple example.

We'll also see a simple example of using a custom webpack configuration in Angular 8.

Let's get started!
  
## What is Webpack?

According to [Wikipedia](https://en.wikipedia.org/wiki/Webpack):

>Webpack is an open source JavaScript module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset. Webpack takes modules with dependencies and generates static assets representing those modules. It’s a module bundler primarily for JavaScript, but it can transform front-end assets like HTML, CSS, even images if the corresponding plugins are included.

Webpack is a static module bundler that bundles JavaScript files in such a way that it can be consumed in a web browser. In fact, it can also bundle the other types of assets like CSS and images.

Webpack works by going through all the modules in your project and build a dependency graph which describes how modules are related to each other based on the **import** statements in your files. 

Thanks to webpack, you can build your JavaScript app using a modular architecture and it will take care of bundling all the modules including the other types of assets such as stylesheets and images into one or a few bundles that you can include in your HTML document using a `<script>` tag.

Please note that webpack sees all files and assets in your project as modules. 

## How Webpack Works

In any decent frontend web application, you'll have at least one or more HTML, CSS and JavaScript files. Most often than not, it can also include other assets such as images and custom fonts.

All these files and assets are seen by Webpack as modules so they can be bundled in final bundles that you can then include in your `index.html` file using tags like `<script>` for JavaScript, `<link>` for CSS, etc. 
In case of multiple CSS and JS files which are dependent on each other, webpack will take care of optimizing and bundling them in one file.

Webpack doesn't decide on its own how to bundle these files but instead it uses the `webpack.config.js` file where developers can include the configrations options that specify how the various files and assets should be preprocessed, transformed  and bundled and where to produce the final outputs.

Based on the configuration file, webpack builds a dependency graph starting with the entry point file(s) where it looks for the imported modules and process them. For each module it also looks for any imported modules and add them to the depency graph. Finally, webpack bundles all the modules into one or more bundles.

Webpack has a few concepts that you are required to know before you can use it, let's explain them one by one.

## Understaning Webpack Concepts

Before we see practical examples of using webpack, let's first understand the fundamental concepts such as:

- **Entry**: The entry point is simply a module or a JavatScript file (defaults to `./src/index.js`) which webpack uses to start bundling. Webpack looks for the import statements in this module and builds the dependency graph of all the dependencies. If you don't use the default entry point i.e  `./src/index.js`, you need to specify it in the configuration file. Please note that you can have more than one entry point in your project.
- **Output**: Using the output point, you tell webpack the name and path of the file(s) where to produce the final bundle or set of bundles. By default it's `./dist/main.js` for the main bundle and you can specify your custom values in the configuration file.  
- **Loaders**: Webpack makes use of loaders to know how to transform and bundle the other types of assets and files, such as CSS, images or TypeScript code, other than JavaScript and JSON which are supported by default.
-   **Plugins**:  Webpack can be extended with plugins which are used for adding features that cant' be imlemented using loaders.   
-   **Mode**: Webpack enables deveopers to specify different configuration options for development and production by using changing the mode parameter which can take either the  `development`,  `production`  or  `none` values. By default the mode is set to `production`. For more information, check out  [the official docs](https://webpack.js.org/configuration/mode/).

> **Note**: Webpack 4 has many defaults that allows you to run it without a configuration file but this is only useful for small learning projects. In real world projects, you'll often need to sepcify custom configurations in a `webpack.config.js` file.     

Webpack 4 (Codenamed **Legato**) is the latest version of Webpack that brings many new features to the most popular module bundler nowadays, such as better performance and the easiness of use.

## The Features of Webpack 4

In brief, these are the most important features of Webpack 4:

- Performance improvements and faster build times (up to 108% faster)
- Zero configuration for small apps
- Better tree shaking for pure modules without side effects
- The introduction of development and production modes
- The `<script async>` support
- Deprecated `CommonsChunkPlugin` in favor of the `optimize.splitChunks` API
- By default you can import and export web assembly (Rust, C++, C etc.)
- The introduction of the *mode* property which can take either development or production options and defaults to *production*.


## Using Webpack

At this point of our Webpack tutorial, we have seen what webpack is and how it works. We have also seen the various concepts of webpack including the entry and output points, loaders, plugins and the mode configuration option. We are now ready to start using webpack in our frontend projects. Let's learn how to do that with a simple example.

Let's start by creating a Node project using npm. Open a new terminal and run the following commands:

```bash
$ mkdir webpack-example
$ cd webpack-example
$ npm init -y
```

This will create a `package.json` file in the `webpack-example` folder. This is the content of the file:

```json
{
  "name": "webpack-example",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```

Next, you need to install webpack and webpack-cli from npm using the following command:

```bash
$ npm install webpack webpack-cli --save-dev
```

At the time of writing this webpack tutorial,  **webpack v4.39.3** and  **webpack-cli v3.3.7** are installed in our machine.

Webpack expects to find the entry point in the `src/index.js` file so in your project's folder, create a `src` folder with an `index.html` file using the following commands:

```bash
$ mkdir src
$ cd src && touch index.js
```

Open the `src/index.js` file and add a simple call to the `console.log()`method to show **Hello webpack!** in the console of the web browser:

```js
console.log("Hello webpack!");
```

Now, we need to run webpack to bundle this file. Since it's installed locally in our project we can use an npm script to invoke it.

Open the `package.json` file and add a `start` script as follows;

```json
{
  "name": "webpack-example",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack --mode development",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
``` 

Now, you can run webpack using the following command from the root of your project:

```bash
$ npm start
```

This is the output of webpack:

```bash
> webpack --mode development

Hash: 39cfc4a92c3a5f8688a8
Version: webpack 4.39.3
Time: 258ms
Built at: 2019-09-01 18:13:39
  Asset     Size  Chunks             Chun
main.js  3.8 KiB    main  [emitted]  main
Entrypoint main = main.js
[./src/index.js] 30 bytes {main} [built]
```

Webpack has successfully completed the bundling process. If you look in your project's folder, you should find a `dist` folder with a `main.js` file. This is the default output used by webpack. 

Now, let's see if our `dist/main.js` file works as expected in a web browser. In your project's folder, create an `index.html` file:

```bash
$ touch index.html
```

Open the file and add the following code:

```html
<!doctype html>
<html>
  <head>
    <title>Webpack example</title>
  </head>
  <body>
    <script src="dist/main.js"></script>
  </body>
</html>

```

Next, using your web browser, open or drag the `index.html` file and check your console. You should see the  **Hello webpack!**  message printed in the console.

Until now in our tutorial, we have used webpack with the default options but we can also specify custom configurations using a `webpack.config.js` file. Let's see a simple use case. 

Previously, we have manually created the `index.html` file but this is not a good practice since we have hardcoded the output file which is by default called `main.js`.  As a result if the webpack configuration changes, the `index.html` file may use invalid values. 

We can handle this situation using the `html-webpack-plugin`. Head back to your terminal and install it from npm using the following command:

```bash
$ npm install html-webpack-plugin --save-dev
```

At the time of writing this webpack tutorial, **html-webpack-plugin v3.2.0** is installed.

Next, you need to add the plugin to your webpack configuration file, so create a  `webpack.config.js` file in the root folder of your project using the following command:

```bash
$ touch webpack.config.js
```

Next open the configuration file and add the following code:

```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack example",
    }),
  ],
};
```

We simply import the plugin and add it to the `plugins` array. Plugins can have options. For example, in the case of  `html-webpack-plugin`, we can specify the title of the generated HTML file using the `title` property.

Now, run webpack using the following command:

```bash
$ npm start
```


The `index.html` file should be generated in the `dist` folder. It has the following content:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Webpack example</title>
  </head>
  <body>
  <script type="text/javascript" src="main.js"></script></body>
</html>
```

Now, you don't need to worry about creating the `index.html` file manually and hardcoding the names of the bundles.

Now, let's add our custom values for the entry and output properties instead of using the defaults.  In the  `webpack.config.js` file, add the following code:

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: './src/main.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Webpack example",
        }),
    ],
};
```

Instead of the default `src/index.js` file, we specify the `src/main.js` file as the entry point of our project. We also change the output file from the default `src/main.js` file to `dist/[name].bundle.js`. This is a dynamic file name part will be replaced by the name of the entry file i.e `main` in our case.  

Before running weback again, make sure to rename the `src/index.js` file to the `src/main.js` file. Now if you run webpack again, you shoud get the following output:

```bash
> webpack --mode development

Hash: 2175a7470f1bfcbe9808
Version: webpack 4.39.3
Time: 1171ms
Built at: 2019-09-01 21:08:31
         Asset       Size  Chunks             Chunk Names
    index.html  191 bytes          [emitted]
main.bundle.js   3.79 KiB    main  [emitted]  main
Entrypoint main = main.bundle.js
[./src/main.js] 30 bytes {main} [built]
Child html-webpack-plugin for "index.html":
     1 asset
    Entrypoint undefined = index.html
    [./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 472 b
ytes {0} [built]
    [./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 497 b
ytes {0} [built]
        + 2 hidden modules
```

In the `dist` folder, you should get the the `index.html` and `main.bundle.js` files.

As a recap of our webpack tutorial, we have learned about what's webpack and how it works and we have seen how we can use it to bundle our JavaScript code.

We have learned about webpack concepts like the `entry` and `output` properties, `loaders` and `plugins` and also how to set the development and production modes using the `mode` property. 

## Webpack and Angular 8

Angular CLI is the official tool for Angular development which can be used to create and develop applications.

Up to Angular 5, we had an [ng eject](https://github.com/angular/angular-cli/wiki/1-x-eject)  command for ejecting the webpack configuration which you can customize as you need. Suddenly the command was removed in Angular CLI 6.

Angular CLI 6 provided a powerful Architect API on top of webpack which enables developers to tap into the build process using custom builders.

With the release of Angular 8, the Architect API is now more stable, and we can use a [custom webpack builder](https://github.com/meltedspark/angular-builders/tree/master/packages/custom-webpack) for providing custom webpack configurations. 

## How to extend the Webpack configuration in Angular 8

You can extend your webpack configuration using the following steps:

- First, install  the [@angular-builders/custom-webpack](https://github.com/just-jeb/angular-builders/tree/master/packages/custom-webpack) builder using the `npm i -D @angular-builders/custom-webpack` command. In  the `angular.json` file, swap  the `@angular-devkit/build-angular:browser`builder with the  `@angular-builders/custom-webpack:browser` builder.
- Next, add  `customWebpackConfig`  to the  `build` target options:

```js
"architect": {  
  "build": {  
      "builder": "@angular-builders/custom-webpack:browser"  
      "options": {  
            "customWebpackConfig": {  
               "path": "./custom-webpack.config.js"  
            }    
            ...  
      }  
    
}
```

-   Next, create a `custom-webpack.config.js` file  in your project's folder and specify your options.
-   Run  `ng build`.


> **Note**: Unlike the`ng eject`  command, the supplied webpack configuration will be merged  with the original Angular  configuration.
>
>Refer to the [docs](https://github.com/just-jeb/angular-builders/tree/master/packages/custom-webpack#custom-webpack-config-object) for the options available for  the `customWebpackConfig` object.

## Configuring Webpack in Angular 8

Let's get started by creating an Angular 8 project. Open a new terminal and run the following command:

```bash
$ npx @angular/cli new exampleApp
```

Next, you need to install the  `angular-builders`  library from npm using the following command:

```bash
$ npm i --save-dev @angular-builders/custom-webpack
```

Next, you  need to update the `builder` property under `architect.build` and `architect.serve` properties as follows:

```js
{
  "architect": {
    "build": {
      "builder": "@angular-builders/custom-webpack:browser",
      "options": {
        "customWebpackConfig": {
          "path": "./custom.webpack.config.js"
        }
      }
    },
    "serve": {
      "builder": "@angular-builders/custom-webpack:dev-server",
      "options": {
        "customWebpackConfig": {
          "path": "./custom.webpack.config.js"
        }
      }
    }
  }
}
```


Now, if you invoke the `ng serve` and `ng build` commands, Angular CLI will make use of our custom builder. 

Finally, you need to provide a `custom.webpack.config.js` file with your custom configuration.
