---
layout: post
title: "3+ Ways to Add Bootstrap 4 to Angular 10/9 With Example & Tutorial"
image: "images/content/angular.jpg"
excerpt: "In this tutorial we will see how to use Bootstrap 4 to style websites built using the Angular 10 framework. We'll see how we can easy integrate both of them, using ng-bootstrap vs. ngx-bootstrap packages  and using the Angular CLI 10 for generating a brand new project." 
date: 2020-08-04 
tags : [angular, angular-10, bootstrap] 
---

![Angular Bootstrap](https://www.techiediaries.com/images/angular-bootstrap.png)

In this tutorial, we will see how to use Bootstrap to style apps built using Angular 10. 

We'll see how to integrate Angular with Bootstrap, in various ways including using `ng-bootstrap` and `ngx-bootstrap` packages. 

> Also read how to use [Bootstrap 4 and jQuery with Angular 10](https://www.techiediaries.com/angular/style-angular-10-example-bootstrap-4/) to build professional UIs.

We'll be using Angular CLI 10 for generating a brand new project.

These are the steps of our tutorial:

- <a href="Installing_Angular_CLI_10"> Step 1 - Installing Angular CLI v10</a>
- <a href="Adding_Bootstrap_4_to_Angular_Method_1"> Step 2 - Installing Bootstrap 4 in Your Angular 10 Project</a>
- <a href="Adding_Bootstrap_4_to_Angular_Method_1"> Step 3 (Method 1) - Adding Bootstrap 4 to Angular 10 Using `angular.json` </a>
- <a href="Adding_Bootstrap_4_to_Angular_Method_2"> Step 3 (Method 2) - Adding Bootstrap 4 to Angular 10 Using `index.html` </a>
- <a href="Adding_Bootstrap_4_to_Angular_Method_3">Step 3 (Method 3) - Adding Bootstrap 4 to Angular 10 Using `styles.css` </a>
- <a href="Adding_Bootstrap_4_Using_ng-bootstrap_and_ngx-bootstrap"> Alternative Step - Adding Bootstrap 4 Using `ng-bootstrap` and `ngx-bootstrap`</a>

> Note: You can also use Ionic UI components to create beautifull and professional Angular apps, read 
[Building Chat App Frontend UI with JWT Auth Using Ionic 5/Angular 10](https://www.techiediaries.com/angular/ionic-chat-ui-jwt-auth/)

## What is Bootstrap

[Bootstrap](https://www.techiediaries.com/bootstrap-tutorial/) is the most popular HTML and CSS framework for building responsive layouts with ease and without having a deep knowledge of CSS (Still custom CSS is required to customize your design ane make it different from the other Bootstrap-styled websites unless you are using a BS theme developed specifically for you).

Bootstrap 4 is the latest version of BS which brings many new and powerful features to the framework most importantly Flexbox which is now the default display system for BS grid layout (one of the most important features of BS).

## 3+ Ways to Include Bootstrap 4 In Your Angular Project

This can be done in multiple ways:

- Including the Bootstrap CSS and JavaScript files in the `<head>` section of the `index.html` file of your Angular project with a `<link>` and `<script>` tags,

- Importing the Bootstrap CSS file in the global `styles.css` file of your Angular project with an `@import` keyword.

- Adding the Bootstrap CSS and JavaScript files in the `styles` and `scripts` arrays of the `angular.json` file of your project

## <a name="Installing_Angular_CLI_10"> Step 1 - Installing Angular CLI v10</a>

Let's get started by installing [Angular CLI v10](https://cli.angular.io/) if it is not yet installed on your machine.

Head over to a new command-line interface and run the following command to install the latest version of the Angular CLI:

```bash
$ npm install -g @angular/cli
```

<s>At the time of writing this tutorial, Angular 10 is still in pre-release, so we need to use the `next` tag to install it. Angular **v10.0.0** is installed.</s> 

>**Note**: This will [install the Angular 10 CLI](https://www.ahmedbouchefra.com/angular/install-angular-9-cli-and-create-project-with-routing/) globally on your system so depending on your npm configuration you may need to add `sudo` (for superuser access) in macOS and Linux or use a command prompt with admin access in Windows.

After the installation, you'll have at your disposal the *ng* utility. Let's use it to generate a new Angular 10 project.

```bash
$ ng new angular-bootstrap-examples
```

You will be prompted for a couple of questions:

```bash
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? (Use arrow keys)
> CSS
  SCSS   [ https://sass-lang.com/documentation/syntax#scss                ]
  Sass   [ https://sass-lang.com/documentation/syntax#the-indented-syntax ]
  Less   [ http://lesscss.org                                             ]
  Stylus [ http://stylus-lang.com                                         ]
```

Most importantly, choose CSS as the stylesheet format because we'll use ths CSS version of Bootstrap in our tutorial. 


The command will generate the directory structure and necessary files for the project and will install the required dependencies.

Next, navigate inside the root folder of your project  

```bash
$ cd angular-bootstrap-examples
```

You can then serve your [Angular 10 application](https://www.techiediaries.com/angular/angular-10-8-tutorial-by-example-rest-crud-apis-http-get-requests-with-httpclient/) using the `ng serve` command as follows:

```bash
$ ng serve
```

Your app will be served from `http://localhost:4200/`

## <a name="Adding_Bootstrap_4_to_Angular_Method_1"> Step 2 - Installing Bootstrap 4 in Your Angular 10 Project</a>

In this step, we'll proceed to add Bootstrap 4 to our Angular 10 application.

There are various ways that you can use to install Bootstrap in your project:

- Installing Bootstrap from npm using the `npm install` command,
- Downloading Bootstrap files and adding them to the `src/assets` folder of your Angular project,
- Using Bootstrap from a CDN.

Let's proceed with the first method. Go back to your command-line interface and install Bootstrap 4 via npm as follows:
 
 ```bash
 $ npm install --save bootstrap
 ```

This will also add the *bootstrap* package to `package.json`.

As the time of writing this tutorial, **bootstrap v4.3.1** will be installed.

The Bootstrap 4 assets will be installed in the `node_modules/bootstrap` folder. You'll need to tell Angular where to look for them. 

Next, you also need to install jQuery using the following command:

 ```bash
 $ npm install --save jquery
 ```

At the time of this tutorial **jquery v3.4.1** will be installed.

# <a name="Adding_Bootstrap_4_to_Angular_Method_1"> Step 3 (Method 1) - Adding Bootstrap 4 to Angular 10 Using `angular.json` </a>

Open the `angular.json` file of your project and include:

- `node_modules/bootstrap/dist/css/bootstrap.css` in the `projects->architect->build->styles` array,
- `node_modules/bootstrap/dist/js/bootstrap.js` in the `projects->architect->build->scripts` array,
- `node_modules/bootstrap/dist/js/bootstrap.js` in the `projects->architect->build->scripts` array,  

As follows:

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1, 
  "newProjectRoot": "projects",
  "projects": {
    "angular-bootstrap-examples": {
      "projectType": "application",
      "schematics": {},
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/angular-bootstrap-examples",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "tsconfig.app.json",
            "aot": true,
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "./node_modules/bootstrap/dist/css/bootstrap.css",
              "src/styles.css"              
            ],
            "scripts": [
              "./node_modules/jquery/dist/jquery.js",
              "./node_modules/bootstrap/dist/js/bootstrap.js"
            ]
          },

```

> Note: You also need to add the jQuery JavaScript library file.


## <a name="Adding_Bootstrap_4_to_Angular_Method_2"> Step 3 (Method 2) - Adding Bootstrap 4 to Angular 10 Using `index.html` </a>

You can also include Bootstrap files from `node_modules/bootstrap` using the `index.html` file.

Open the `src/index.html` file and add the following:
 

- A `<link>` tag for adding the `bootstrap.css` file in the `<head>` section,
- A `<script>` tag for adding the `jquery.js` file before the closing `</body>` tag,
- A `<script>` tag for adding the `bootstrap.js` file before the `</body>` tag.



```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Angular Bootstrap 4 Examples</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="stylesheet" href="../node_modules/bootstrap/dist/css/bootstrap.css">
  
</head>
<body>
  <app-root></app-root>
  <script src="../node_modules/jquery/dist/jquery.js"></script>
  <script src="../node_modules/bootstrap/dist/js/bootstrap.js"></script>    
</body>
</html>
```

## <a name="Adding_Bootstrap_4_to_Angular_Method_3">Step 3 (Method 3) - Adding Bootstrap 4 to Angular 10 Using `styles.css` </a>

We can also use the `styles.css` file to add the CSS file of Bootstrap to our project.

Open the `src/styles.css` file of your Angular project and import the `bootstrap.css` file as follows:

```css
@import "~bootstrap/dist/css/bootstrap.css"
```

This replaces the previous method(s) so you don't need to add the file to the `styles` array of the `angular.json` file or to the `index.html` file.

> **Note**: The JS file(s) can be added using the `scripts` array or the `<script>` tag as the previous methods.


## <a name="Adding_Bootstrap_4_Using_ng-bootstrap_and_ngx-bootstrap"> Alternative Step - Adding Bootstrap 4 Using `ng-bootstrap` and `ngx-bootstrap`</a>

Bootstrap depends on jQuery and Popper.js libraries, and if you don't include them in your project, any Bootstrap components that rely on JavaScript will not work. 

Why not include those libs? For Angular it's better to avoid using libraries that make direct manipulation of the DOM (like jQuery) and let Angular handle that. 

Now what if you need the complete features of Bootstrap 4 without the JS libraries? 

A better way is to use component libraries created for the sake of making Bootstrap work seamlessly with Angular such as `ng-bootstrap` or `ngx-bootstrap`

![Bootstrap 4 Angular 8](https://screenshotscdn.firefoxusercontent.com/images/de17d764-f3f2-41df-b3d4-3bdf838c306e.png)

>Should I add bootstrap.js or bootstrap.min.js to my project? No, the goal of ng-bootstrap is to completely replace JavaScript implementation for components. Nor should you include other dependencies like jQuery or popper.js. It is not necessary and might interfere with ng-bootstrap code [Source](https://ng-bootstrap.github.io/#/getting-started)

So first you'll need to install the library from npm using the following command:

```bash
npm install --save @ng-bootstrap/ng-bootstrap
```

Once you finish the installation you'll need to import the main module.

```ts
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
```

Next you'll need to add the module you imported in your app root module 

```ts
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [/*...*/],
  imports: [/*...*/, NgbModule.forRoot()],
  /*...*/
})
export class AppModule {
}
```

Please note that `ng-bootstrap` requires the Bootstrap 4 CSS file to be present.
 
You can add it in the styles array of the `angular.json` file like that:

```json
"styles": [
  "styles.css",
  "../node_modules/bootstrap/dist/css/bootstrap.css"
],
```  

Now you can use Bootstrap 4 in your Angular application.

You can find all the available components via this [link](https://ng-bootstrap.github.io/#/components/accordion/examples).

You can also use the `ngx-bootstrap` library 
![Bootstrap 4 Angular 10](https://screenshotscdn.firefoxusercontent.com/images/3d5b00ef-736b-4657-9fe6-39548985495a.png) 

Simply head back to your terminal, make sure you are inside your Angular project then run the following command to install `ngx-bootstrap`

```bash
npm install ngx-bootstrap --save
```

You also need the Bootstrap 4 CSS files. Add the following line in the `<head>` of your Angular app which includes Bootstrap from a CDN

```html
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet">
```

You can also install bootstrap from npm and use the previous way to include the CSS file (via the styles array in the `angular-cli.json` file)

```json
   "styles": [  
   "../node_modules/bootstrap/dist/css/bootstrap.min.css",  
   "styles.css"  
   ],
```

Next open `src/app/app.module.ts` and add 

```ts
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap';

/*...*/

@NgModule({
   /*...*/
   imports: [BsDropdownModule.forRoot(),AlertModule.forRoot(), /*...*/ ],
    /*...*/ 
})
``` 

This an example of importing two components *BsDropdownModule* and *AlertModule*.

You need to import the module for each component you want to use in the same way.

`ngx-bootstrap` provides each BS component in each own module so you only import the components you need. In this way your app will be smaller since it bundles only the components you are actually using.
  
You can find all the available components that you can use from the [docs](https://valor-software.com/ngx-bootstrap/#/getting-started)


## <a name="Adding_Bootstrap_4_to_Angular_10">Adding Bootstrap 4 to Angular 10</a> 

Thanks to the new `ng add` command added on Angular 7+, you have a new simpler and easier way to add Bootstrap without using the `npm install` command for installing the required dependencies or adding any configurations. 

You can simply run the following command to add `ng-bootstrap`:

```bash
$ ng add @ng-bootstrap/schematics
```  
That's it. You now have support for Bootstrap components and styles without any extra configurations. You also don't need jQuery since we are using `ng-bootstrap`.

## <a name="Conclusion">Conclusion</a>

In this article, we've seen different ways of including Bootstrap 4 in Angular 10 apps:

- Using original Bootstrap 4 assets from npm,
- Using the `ng-bootstrap` library, 
- And finally using the `ngx-bootstrap`

The most important difference between `ng-bootstrap` vs. `ngx-bootstrap`is that `ngx-bootstrap` uses separate modules for components to reduce the final app size.
