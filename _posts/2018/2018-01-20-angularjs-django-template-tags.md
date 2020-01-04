---
layout: post
title: "QuickTip: Django and AngularJS Conflicting Interpolation Symbols"
image: "images/content/angularjs.jpg"
excerpt: "In this quick-tip post we'll see how to change the conflicting symbols for template tags when using Django and AngularJS" 
tags : [django , angular , python] 
---

When using the Django framework with the AngularJS MVC framework for building modern single page applications or SPAs, one of the issues you will encouter is related to both frameworks using the same symbols for template tags i.e `{ {` and `} }`. So in this quick tip post we'll see how to change the interpolation symbols in AngularJS to avoid these conflicts.

Luckliy for us, AngularJS provides the [`$interpolateProvider`](https://docs.angularjs.org/api/ng/provider/$interpolateProvider) provider which allows developers to customize the interpolation symbols which default to `{ {` and `} }`.   

>Used for configuring the interpolation markup. Defaults to {{ and }}.
This feature is sometimes used to mix different markup languages, e.g. to wrap an AngularJS template within a Python Jinja template (or any other template language). Mixing templating languages is very dangerous. The embedding template language will not safely escape AngularJS expressions, so any user-controlled values in the template will cause Cross Site Scripting (XSS) security bugs! -- [https://docs.angularjs.org/api/ng/provider/$interpolateProvider](https://docs.angularjs.org/api/ng/provider/$interpolateProvider)     

## Simple AngularJS Example

Let's see a simple example:

Go ahead and create a base template `ng-base.html` file in your templates folder then add the following content

```html
{ % load staticfiles % }
<!DOCTYPE html>
<html lang="en" ng-app='demoApp'>
  <head>
    <base href="/">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Integrate Angular 1.6.6 with Django</title>

<script src='https://ajax.googleapis.com/ajax/libs/angularjs/1.6.6/angular.min.js'></script>
 <script src='{ % static "js/app.js" % }' ></script>


  </head>
  <body>
    <div class='content'>
        { % block content % }{ % endblock content % }
    </div>
    <div ng-controller="TestController as ctrl">
      {$ ctrl.mymodel $}
    </div>
  </body>
</html>
```

Next create `js/app.js` in your project's static folder and add the following code to create a new AngularJS app and inject `$interpolateProvider` in the *config* function. 

```js
'use strict';

var app = angular.module('demoApp', []);


app.config(function($locationProvider,$interpolateProvider){
    $locationProvider.html5Mode({
              enabled:true
    });
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');


 });    

app.controller('TestController', function() {
      this.mymodel = "I'm using the custom symbols";
});

```


So we have inject the interpolation provider `$interpolateProvider` then used two methods `$interpolateProvider.startSymbol('{$');` and `$interpolateProvider.endSymbol('$}');` to change the default sysmbols to custom ones.

Now you can use `{ {` and `} }` for Django templates and `{$` and `$}` for AngularJS templates.
