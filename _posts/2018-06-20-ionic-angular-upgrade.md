---
layout: post
title: "Ionic 4 Upgrade: Updating From Ionic 3 to Ionic 4/Angular 6"
image: "images/content/ubuntu.png"
excerpt: "Throughout this tutorial, we'll see how to upgrade your Angular 6 project to use RxJS 6" 
tags : [angular, javascript] 
---

**Ionic 4** is not yet released (Alpha) but you can upgrade your Ionic 3 project to use Ionic/Angular v4 as of this moment if you are comfortable using alpha code. The Ionic CLI 4 is also in R.C version and you can use it to generate Ionic 4/Angular 6 projects and use them as the base to migrate your Ionic 3 apps. In this Ionic 4 migration guide, we'll see by a simple example how you can update a demo Ionic 3 project to Ionic 4. 

## Creating a New Ionic 4 Project

Before you can create a new Ionic 4 project go ahead and install the latest version of Ionic CLI (v4) using the following command from your terminal:

```bash
npm install -g ionic@rc cordova
```

After installing the Ionic CLI 4. You can now run the following command to generate a new Ionic 4 project based on Angular 6:

```bash
ionic start ionic4upgradedemo blank --type=angular
```

Creating a new Ionic 4 project based on Angular is the first step toward migrating your Ionic 3 application to Ionic 4 (with Angular). To generate a project based on Angular we are using `--type=angular`. 

We are also specifying the *blank* starter template but you can use *sidemenu* or *tabs* templates depending on what your Ionic 3 application is using for easing the migration process.

When writing  this tutorial, only Angular is supported with the `--type` option but in future they likely will be other options such as Vue, React or Vanilla JavaScript.

If you look at the directory structure of your Ionic 4 project you'll see that's similar to Angular 6 projects except for some differences specific to Ionic.

First, you need to notice that pages and other things in Ionic 3 that live under the `src` folder now live under the `src/app` folder in Ionic 4. 