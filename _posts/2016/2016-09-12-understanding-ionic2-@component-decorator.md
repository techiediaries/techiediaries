---
layout: post
title: "Understanding Ionic 4/Angular : @Component decorator"
image: "images/content/understanding-ionic2-@component-decorator/titleimage.png"
excerpt: "In this tutorial we are going to discuss the @Component decorator in Ionic 2 and learn how to use it"
categories: building-hybride-mobile-apps-with-ionic1-and-ionic2-tutorials
tags : ionic 

---

<a data-pin-do="embedPin" data-pin-width="large" href="https://www.pinterest.com/pin/427490189612764245/"></a>


Thanks to ES6+ and TypeScript, Ionic/Angular v4 has access to object oriented and modern features such as classes and decorators. 

Decorators are used to decorate classes. 

Decorating a class specify its role and provides it with specific functionality.

The `@Component` decorator exists in the `@angular/core` package and used to make a class as a component.

A component is a software pattern adopted by many modern and popular frameworks like React and Angular. In these frameworks we build our app by composing components that use and communicate with each other.

Each component is self dependent and standalone. 

This way of building apps has many advanatages and encourages separation of concerns and easy team collaboration.

In this tutorial, we are going to discuss the `@Component` decorator and learn how to use it.



## The Basic `@Component` Syntax 

To use the `@component` decorator we first need to import it using the simple and modern import system supported by ES6+ and TypeScript: 

{% highlight javascript %}

	import {Component} from '@angular/core';
	
	@Component({})
	class MyApp {

	}


{% endhighlight %}

## The `@Component` Decorator Options


The `@Component` decorator has many options that you can specify for you decorated class to use. The most used parameters are:

### template 

Which used to directly specify the html code that should be used as the template 

### templateUrl

Used to specify the relative path of the HTML file to use as a template by the component which should live in `www/build/` folder

## Examples

{% highlight html %}
	
	<ion-header>
	  <ion-navbar>
	    <ion-title>
	      Main
	    </ion-title>
	  </ion-navbar>
	</ion-header>

	<ion-content padding class="main">
	<h1> This is the main page </h1>
	</ion-content>

{% endhighlight %}


{% highlight javascript %}
	
	import {Component} from '@angular/core';
	import {NavController} from 'ionic-angular';

	@Component({
	  templateUrl: 'build/pages/main/main.html'
	})
	export class MainPage {
	  constructor(private navController: NavController) {
	  }
	}

{% endhighlight %}

{% highlight javascript %}

	import {Component} from '@angular/core';
	import {Platform, ionicBootstrap} from 'ionic-angular';
	import {MainPage} from './pages/main/main';


	@Component({
	  template: '<ion-nav [root]="mainPage"></ion-nav>'
	})
	export class MyApp {

	  private mainPage:any;

	  constructor(private platform:Platform) {
	    this.mainPage = MainPage;
	  }
	}

	ionicBootstrap(MyApp)

{% endhighlight %}



## Conclusion


As we have seen in this tutorial. The `@Component` decorator is the most important decorator used by Ionic 4/Angular. This decorator is a part of Angular core and is used to create Angular components which are the basic buildings of any Angular application.


