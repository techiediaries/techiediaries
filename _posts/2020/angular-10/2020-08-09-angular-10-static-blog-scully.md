---
layout: bpost
title: "Static Blog with Angular 10, Scully and JAMstack"
image: "images/content/angular.png"
excerpt: "How to create a blog with Angular 10 and Scully, the Angular static site generator"
date: 2020-08-09
tags : [angular]
---

Until now Angular didn't have a static site generator unlike the other two popular libraries -- React and Vue.js but thanks to the [HeroDevs](https://twitter.com/herodevs) team which has recently released a static site generator for Angular projects named [Scully](https://github.com/scullyio/scully). 

Nowadays, static site generators become popular especially among developers for creating blogs and server-rendering their JavaScript SPAs for performance and SEO reasons.

Scully can render your Angular 9+ app in the server side but can also be used as a blog generator with Markdown support which can be used as an alternative to popular generators such as Jekyll or Gatsby.

## What is Scully?

Scully is a JAMstack solution for Angular 9+ developers like Gatsby for React or VuePress for Vue.js. It's a static site generator renders your Angular 10 app to HTML and CSS and since it supports Markdown you can use it for blogging without worrying about SEO and search engine discoverability.

According to their [official website](https://scully.io/):

> **Scully** makes building, testing and deploying [Jamstack](https://jamstack.org/) apps **extremely simple.**

## Create your Blog with Angular 10 and Scully

Now that we have seen some theory, let's see how to use Angular 10 and Scully to create a blog.

Let's get started with the prerequisites:

-   Basic knowledge of TypeScript. Particularly the familiarity with Object Oriented concepts such as TypeScript classes and decorators.
-   A local development machine with  **Node 10+**, together with  **NPM 6+**  installed. Node is required by the Angular CLI like the most frontend tools nowadays. You can simply go to the downloads page of  [the official website](https://nodejs.org/en/download/)  and download the binaries for your operating system. You can also refer to your specific system instructions for how to install Node using a package manager. The recommended way though is using  [NVM](https://github.com/nvm-sh/nvm)  — Node Version Manager — a POSIX-compliant bash script to manage multiple active Node.js versions.
- _Scully uses Chromium. Therefore, your Operating System, as well as its administrator rights must allow its installation and execution._

## Step 1 — Installing Angular CLI 10

Let's start by  [installing the latest Angular CLI v10](https://www.ahmedbouchefra.com/install-angular-cli/)  version.

[Angular CLI](https://cli.angular.io/)  is the official tool for initializing and working with Angular projects. To install it, open a new terminal and run the following command:

```bash
$ npm install -g @angular/cli
```

At the time of this blog post,  **angular/cli v10**  will be installed on your system.

## Step 2 — Creating a New Angular 10 App

Let's now create our project. Head back to your terminal and run the following commands:

```bash
$ cd ~
$ ng new angular10blog
```

The CLI will ask you a couple of questions — If  **Would you like to add Angular routing?**  Type  **y**  for Yes and  **Which stylesheet format would you like to use?**  Choose  **CSS**.

>_Scully depends on the app's router module in order to generate the website's pages_



## Step 3 — Installing Scully

Now, navigate in your project's folder and install Scully using the following commands:

```bash
$ cd angular10blog
$ ng add @scullyio/init
```

The  `@scullyio/init`  schematic will automatically make all the required changes in your Angular 10 project.

This is the kind of output you'll get in your terminal if everything is ok:

```bash
Installing packages for tooling via npm.
Installed packages for tooling via npm.
    Install ng-lib for Angular v9
    ✅️ Added dependency
UPDATE src/app/app.module.ts (466 bytes)
UPDATE src/polyfills.ts (3028 bytes)
UPDATE package.json (1376 bytes)
✔ Packages installed successfully.
    ✅️ Update package.json
    ✅️ Created scully configuration file in scully.angular10blog.config.ts
CREATE scully.angular10blog.config.ts (188 bytes)
UPDATE package.json (1436 bytes)
```

The command will generate a Scully configuration file named  `scully.<projectName>.config.ts` where the  `projectName`  is the name of your Angular project.  This file will be used to configure various aspects of your static app.
 
This is the initial configuration file:

```typescript
import { ScullyConfig } from '@scullyio/scully';

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: '<projectName>',
  outDir: './dist/static',
  routes: {},
};
```

You can now render your Angular 10 app statically using Scully.

> Please note that any routes in your Angular 10 project that contain route parameters will not be pre-rendered until you specify the required parameters in the Scully configuration file.


## Step 5 — Generating your Static Blog

Before you can run Scully, you'll need to build your Angular 10 project using the following command:

```bash
$ ng build
```

Once your Angular 10 project is built, you can run Scully to build your static blog using the following command:

```bash
$ npm run scully
```

That's it! You now have a fast pre-rendered Angular 10 static site.

You can find the generated static files under the  `./dist/static`  folder. It contains all the static pages of your application.
 
## Step 6 — Serving your Angular 10 Blog

You can access the statically rendered app in the  `/dist/static`  folder where you can find an  `index.html`  file for each route in your Angular 10 app.

Scully provides its own server that enables you to run your JAMstack site. You can start the Scully's server by running the following command:

```bash
$ npm run scully:serve
```

The command will start two  servers, one of  the `ng build` command and  other for the static build which allow you to run both versions of your Angular app.   

## Conclusion

In this tutorial, we've seen how to use Angular 10 with Scully to build a static JAMstack app that can be used as a blog that all the performance and SEO benefits of typical blogs.