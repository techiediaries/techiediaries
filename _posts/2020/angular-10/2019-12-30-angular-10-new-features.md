---
layout: bpost
title: "Angular 10 New Features"
image: "images/content/angular.png"
excerpt: "Angular 10, the next version of one of the most popular front-end frameworks is in beta version at this time. This means we are moving toward the final release of this new version" 
date: 2020-04-12
tags : [angular, angular-10] 
---

[Angular 10](https://www.techiediaries.com/angular/), the next version of one of the most popular front-end frameworks is in beta version at this time. This means we are moving toward the final release of this new version. 

Two beta versions of the platform were released on April 8, 2020. The new upgrade will be focusing more on the ecosystem than introducing new big features.

A target date for an Angular 10 production release is still to be determined. Angular 9.0 has been released on February 6, followed by Angular 9.1 on March 25. 

## How to Install Angular 10?

You can install Angular 10 CLI using npm or yarn using the following command:

```bash
$ npm install --global @angular/cli@next
```

Before the final release of version 10, you'll need to add the `next` tag to install the latest prerelease version

You can also download the [beta prereleases](https://github.com/angular/angular/releases) from GitHub.

##  Angular 10 New Features

At the current time, these are the new features of Angular 10: 

- A new compiler feature which adds dependency information and `ng-content` selectors to metadata.  This will enable the Angular Language Service or similar utilities, to provide suggestions for directives and components defined in libraries.
- Fixing  undecorated-class migration to decorate derived classes of undecorated classes that use Angular features.
-   Urlmatcher’s type can now always return null.
-   Fixing a service worker bug,  preventing the worker from registering in cases when there is a long-running task or recurring timeout.
-   Multiple bug fixes are made such as the compiler avoiding undefined expressions in a holey array and the [core avoiding a migration error](https://github.com/angular/angular/pull/36367) when a non-existent symbol is imported. There is also a workaround in the core for the [Terser inlining bug](https://github.com/angular/angular/pull/36200), etc.