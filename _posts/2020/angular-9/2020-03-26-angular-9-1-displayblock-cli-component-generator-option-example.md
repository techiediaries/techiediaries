---
layout: bpost
title: "Angular 9.1 displayBlock CLI Component Generator Option by Example"
image: "images/content/angular.png"
excerpt: "In this article, we'll learn about the new displayBlock option for the Angular 9.1 CLI component generator"
categories: angular
date: 2020-03-26 
tags : [angular, angular-9]
--- 

In this article, we'll learn about the new `displayBlock` option for the Angular 9.1 CLI component generator.

When  you use the CLI to generate an Angular component, it will be displayed `inline` by default using the CSS inline property, as this is the default display for most DOM elements. 

## Displaying Angular Components with the `display: block` CSS style

More often than not, you'll need display your components with the `display: block` CSS style. 

Instead of changing this manually for each new component you generate, you now have the option to set it automatically when using the CLI thanks to the `displayBlock` introduced in Angular 9.1.

## Using Angular 9.1 CLI `displayBlock` by Example

This is how you use this option when generating a new Angular component:

```bash
ng generate component home --displayBlock
```

You can also make `display:block` by default by setting the`schematics.@schematics/angular:component.displayBlock` key in your `angular.json` to true, or also run the following command in your terminal:

```bash
ng config schematics.@schematics/angular:component.displayBlock true
```


