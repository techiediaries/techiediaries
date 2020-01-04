---
layout: post
title: "Angular 7/8 & Bootstrap 4 UIs: ng-bootstrap and ngx-bootstrap [Part 1] "
image: "images/content/angular.png"
excerpt: "In this tutorial series, you'll learn to use Angular 7/8 & Bootstrap 4 to build professional grade UIs." 
tags : [angular, angular8]
---


In this tutorial series, you'll learn to use Angular 8 & Bootstrap 4 to build professional grade UIs.

In this first part, you'll learn about the different ways you can use to integrate Bootstrap 4 with your Angular 8 project such as `ng-bootstrap`,  `ngx-bootstrap` and the old way (with jQuery).

You'll also prepare a project that will be used to demonstrate the different components using Angular CLI 8.
  
First let's start with the prerequisites.

## Tutorial Prerequisites

If you want to follow this tutorial, step by step from scratch, you'll need to have some prerequisites such as:

- A development environment with the latest versions of [Node.js and NPM installed](https://www.techiediaries.com/ubuntu-install-nodejs-npm),
- A basic knowledge of TypeScript,
- A working knowledge of Angular.

If you are ready then let's dive in!

## Installing Angular CLI 8

If you don't have the latest version of Angular CLI installed, you first need to run the following command to install it:

```bash
$ npm install @angular/cli -g
```  

This will install Angular CLI 8 globally on your system so you need to make sure you have npm configured to allow to isntall packages system-wide without  super user privileges. Otherwise, simply add sudo before your command in Linux and macOS systems or use an administrator command prompt  in Windows.

If you already have a previous version of the CLI installed, you need to update it to the latest version. For a tutorial on how to upgrade the Angular toolchain, see [Angular 7 Upgrade: Ng Update Angular 6 CLI](https://www.techiediaries.com/updating-angular-cli-projects/)

[](https://www.techiediaries.com/updating-angular-cli-projects/)



## Creating Angular 8 & Bootstrap 4 Project

Now that you have installed the latest version Angular CLI, you can now create your Angular 8 project using the following command from your terminal or command prompt:

```bash
$ ng new angular-bootstrap4-demo
```

The CLI will be asking you for some information about your project, such as if you want to use the Angular Router (Yes) and which stylesheet format you want to use (CSS).

Wait for the CLI to finish its work i.e generate the directory structure and files then install the dependencies.

After that, you'll have your project ready!

## Installing & Adding Bootstrap 4

Once your project is ready, let's start by adding and integrating Bootstrap 4 with Angular 7.

There different approaches that you can follow to add Bootstrap to your project. For example:

- You can use [ng-bootstrap](https://github.com/ng-bootstrap/ng-bootstrap): The Angular version of the [Angular UI Bootstrap](https://github.com/angular-ui/bootstrap) library which is built from scratch by the [ui-bootstrap team](https://github.com/angular-ui/bootstrap) using TypeScript  and Bootstrap 4 CSS framework. It has two dependencies which are Angular and [Bootstrap 4](https://getbootstrap.com/) CSS file. Recently it was updated to use Angular 7.
- You can use [ngx-bootstrap](https://valor-software.com/ngx-bootstrap/#/): It contains all core Bootstrap components powered by Angular. This means you don't have to use the JS code from Bootstrap, but you need to use the Bootstrap 4 CSS styles,
- You can also just use the full original Bootstrap with CSS and JavaScript files but you should include jQuery since many components depend on it.


## Using ng-bootstrap with Angular 8

First we'll start by installing the dependencies using:

```bash
$ npm install bootstrap --save
```

Next you need to install `ng-bootstrap` from npm using the following command:

```bash
$ npm install --save @ng-bootstrap/ng-bootstrap
```

Wait for the package to install. Next open the `src/app/app.module.ts` file and import the main module of `ng-bootstrap` which is `NgbModule` into your project's main module using the following code:

```ts
// [...]
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  // [...]
  imports: [NgbModule, /* [...] */],
  // [...]
})
export class AppModule {
}
```

For the sake of making your Angular 8 production bundle smaller, you can also import only the needed modules for the Bootstrap 4 components that you want to use in your project, such as buttons, cards, modals, pagination or alerts. For instance, this is an example for importing the `NgbAlertModule` module:

```ts
import { NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  // [...]
  imports: [NgbAlertModule, /* [...] */],
  // [...]
})
export class AppModule {
}
```

You can find all the available components and modules from the [official website](https://ng-bootstrap.github.io/#/components/accordion/examples).

## Using `bootstrap` with Angular 8

First install `bootstrap` from npm:

```bash
$ npm install bootstrap --save
```

Next you need to instruct Angular CLI 8 to load the Bootstrap styles.

There are many ways to do that. The simpest method is by using the `src/styles.css` file  and adding the following code:

```css
@import "~bootstrap/dist/css/bootstrap.css";  
```

## Using `ngx-bootstrap` with Angular 8
 
First, you need to install `ngx-bootstrap` in your project from npm using:

```bash
$ npm install ngx-bootstrap --save
```

Next you need to load Bootstrap 4 CSS file using one of the possible ways, such as adding the following code in your `src/index.html file`:

```html
<link  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"  rel="stylesheet">
```

### Using `ng-add` and `ngx-bootstrap` 

Alternatively, you can also use the `ng add` command of Angular CLI 8 to automatically add `ngx-bootstrap` to your project by simpy running the following command:

```bash
$ ng add ngx-bootstrap
```

The CLI will take care of installing all the required files and update it any necessary configuration files in your behalf.

You can also use the `ng add` command to add individual components. This is a [list](https://valor-software.com/ngx-bootstrap/#/getting-started) of available commands:

```bash
        ng add ngx-bootstrap  --component accordion
        ng add ngx-bootstrap  --component alerts
        ng add ngx-bootstrap  --component buttons
        ng add ngx-bootstrap  --component carousel
        ng add ngx-bootstrap  --component collapse
        ng add ngx-bootstrap  --component datepicker
        ng add ngx-bootstrap  --component dropdowns
        ng add ngx-bootstrap  --component modals
        ng add ngx-bootstrap  --component pagination
        ng add ngx-bootstrap  --component popover
        ng add ngx-bootstrap  --component progressbar
        ng add ngx-bootstrap  --component rating
        ng add ngx-bootstrap  --component sortable
        ng add ngx-bootstrap  --component tabs
        ng add ngx-bootstrap  --component timepicker
        ng add ngx-bootstrap  --component tooltip
        ng add ngx-bootstrap  --component typeahead 
```

## Conclusion

In this tutorial, we've seen different ways to include Bootstrap 4 in your Angular 8 project such as `bootstrap`, `ng-boostrap` and `ngx-bootstrap`. We've seen how to use the `ng add` command of Angular CLI v8 to automatically add `ngx-bootstrap` in your project without any manual intervention. 

You've also installed Angular CLI and created a new project.

In the next tutorial, we'll continue by implementing a professional-grade UI with Bootstrap 4 components so stay tuned! 
