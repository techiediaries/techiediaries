---
layout: post
title: "What is new with Angular 1.6 ?"
image: "images/content/what-is-new-with-angular16/titleimage.png"
excerpt: "What is new with Angular 1.6 ?"
categories : angular1x
tags : angular 
---

{% include image.html
   img="images/content/what-is-new-with-angular16/bigimage.png"
       title="What is new with Angular 1.6 ?"
%}


  
Some few weeks ago ,Angular 1.6.1 was released by Angular team .The Angular team knows very well that a great portion of developers are still using Angular 1.x so as they have promised they are still working on making Angular 1.x updates in their efforts to make migrations to Angular 2 as painless as possible by first introducing components in Angular 1.5 version which are  the main concept in Angular 2 and  continuing to make improvements on next versions of Angular 1.x . 

Unlike Angularjs 1.5 ,Angularjs 1.6 doesn’t introduce any new concepts but just a set of minor features ,bug fixes and getting rid of deprecations by introducing some breaking changes .

The angular team said ,these breaking changes are minor and are not supposed to affect real applications and they are necessary in order to/for :

jqLite to be aligned with the breaking changes in jQuery 3 

Boost Angular 1.x apps performance .

Fixing Security issues .

Introducing new features and changing the default behavior of existing features to become more consistent with the new improvements and concepts  .

## The Expression Sandbox was removed .

This is a good thing for improving performance because it makes your code fast and small .the expression sandbox is a mechanism which checks expressions in order to discourage business logic from existing in templates .Read more about Expression sandbox and its removal in Angular 1.6 in the official blog of Angularjs http://angularjs.blogspot.com/2016/09/angular-16-expression-sandbox-removal.html

## Angular 1.6 removed $http.success and $http.error  

Since they are deprecated a long time ago and since everybody seems to be moving to use promises in these days and you should do it too if you are still using callbacks because Angular 1.6 finally took the decision to get rid of them .

## Controller’s bindings are not assigned before lifecycle hook $onInit is called 

Let's take an example to see what that means clearly .

Suppose we have this component

  app.component('MyComponent', {
    bindings: {
      aBinding: '<'
    },
    controller: function() {
     	//do something with this.aBinding
    }
  });

Anything you do with this.aBinding inside your component controller won’t work as you may expect because our binding is not assigned yet .So what do you need to do ?

To make this works as before you should put any initialization logic in $onInit lifecycle hook so our component code becomes

  app.component('myComponent', {
    bindings: {
      aBinding: '<'
    },
    controller: function() {
      this.$onInit = function(){
         // do something with this.aBinding
      }
    }
  });
 
So if you're just starting a new app you shouldn’t mind use this but what if you have already an app with a lot of components .Either you need to go over all your components and start changing them by moving any initialization code inside your components controllers to $onInit lifecycle hook . Or in case you don’t have time for now you just instruct the $compiler to enable the old preassignment of controller’s binding  .

So If you want to maintain the old behavior but in the same time using Angular 1.6 .You can re-enable preassignment of controller’s bindings in your config method using the $compiler provider .

  app.config(function($compileProvider) {
    $compileProvider.preAssignBindingsEnabled(true);
  });
 
The complete migration guide can be found <a href="https://docs.angularjs.org/guide/migration#migrating-from-1-5-to-1-6" target="_blank">here</a>



