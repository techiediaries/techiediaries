---
layout: post
title: "Understanding Angular 1.5/1.6 lifecycle hooks"
image: "images/content/understanding-angular-15-16-lifecycle-hooks/titleimage.png"
excerpt: "Understanding Angular 1.5/1.6 lifecycle hooks "
categories : angular1x
---

{% include image.html
   img="images/content/understanding-angular-15-16-lifecycle-hooks/bigimage.png"
       title="Understanding Angular 1.5/1.6 lifecycle hooks"
%}

  

In the previous post ,we have covered component based architecture in Angular 1.x starting from version 1.5 which introduced the .component() method following the Angular team efforts to make the gap between Angular 1 and Angular 2 as narrow as possible .At least at the level of code writing .In this short post we are going to see another feature introduced in modern Angular 1.x framework which are part of Angular 2 and directly related to components ,lifecycle hooks .

# So what is a component lifecycle hook ?

A lifecycle hook is a method which gets executed at certain point of time during the life cycle of a component .

There are four lifecycle hooks which were introduced in Angular 1.5 which are :

## $onInit()

The $onInit() lifecycle hook is executed when the component’s controller is initialized and its bindings are initialized so it can be used for any initialization code .Let's take an example

	angular.module('app', [])
	.component('myComponent', {
	  template: '<h1>{{$ctrl.message}}</h1>',
	  controller: function(){
	 this.$onInit = function () {
	    this.message = 'Hello world';
	  };}
	});

So we have defined our component .we have specified a template and a controller .
In the controller ,we have added the $onInit hook method which initializes the message property with ‘hello world’ once the controller  has finished initialization .

As you can see we can access the controller instance using $ctrl so we don’t have to use controllerAs because that’s already done for us by default.

Starting from Angular 1.6 you can not do any initialization work which depends on bindings outside of $onInit that’s because Controller’s bindings are not assigned before lifecycle hook $onInit is called .
 
## $onChanges()

This hook is useful if you want to watch for one way data bindings changes .One way data binding is a also a new feature in Angular 1.5 inspired from Angular 2 .So suppose we have a component with one way data binding 

	app.component('myComponent', {
	  template: '<h1>{{$ctrl.message}}</h1>',
	  bindings: {
	    message: '<'
	  },
	  controller: function(){
	 this.$onChanges = function (changes) {
	    if (changes.message) {
	      
	      if(changes.message.currentValue === 'Hello'){
			console.log(“hello”);
		  }
	    }
	  };
		
	}
	});

## $onDestroy()

This hook is called on the component when its scope is destroyed .

## $postLink()

This is the final hook .It’s introduced in Angular 1.5 to use when we want to make any dom manipulation .After this hook is called you can be assured that all child directives are compiled and linked .

 


 

 

 
