---
layout: post
title: "Getting started with Angular 2 tutorial series - Part 1"
image: "images/content/getting-started-with-angular2-tutorial-series/titleimage.png"
excerpt: "In this tutorial,which belongs to a series of tutorials, we are going to cover Angular 2 .What is it ? Why use it ? and how to use it ?"
tags : angular 
---
{% include image.html
       img="images/content/getting-started-with-angular2-tutorial-series/bigimage.png"
       title="In this tutorial,which belongs to a series of tutorials, we are going to cover Angular 2 .What is it ? Why use it ? and how to use it ?"
%}

This tutorial is the first one from a series of tutorials about getting started with Angular 2 framework .In this first tutorial we are going to introduce the framework to developers who don't know it yet .So lets get started .

What is Angular 2
------------------

In the past last Six years ,Angular becomes the most popular client side JavaScript framework used by front end developers and development companies around the world .We are Precisely talking about the Angular.js 1.x branch (when writing this tutorial it's Angular.js 1.5 ) .But recently ,the Google team behind the Angular framework decided to write a completely rewritten from scratch version of Angular framework ,Angular 2 ,which is better in terms of performance and embraces a modern component based software architecture and patterns .Angular 2 is designed for Mobile and Desktop platforms not just the web . Unlike Angular 1.x ,Angular 2 doesn't require and it's not coupled with the browser DOM so it's possible to use it outside the browser to build Desktop and mobile applications with native like performance and speed .Many popular frameworks have already embraced Angular 2 such as the hybrid mobile framework Ionic 2 and the native mobile framework NativeScript which allows you to use JavaScript to build real native and cross platform mobile apps .

Angular 2 is a free and open source JavaScript framework built by Google .It was built using TypeScript and can be used with many languages such as JavaScript ,TypeScript and Dart but it's recommended to use TypeScript with Angular 2 .It's a superset of JavaScript,that favors an object oriented and strongly typed approach ,built by Microsoft .If you are familiar with OOP concepts and OOP languages such Java or C++ you should have no problem learning/using TypeScript .    

On September 14 ,2016 The Google team announced the final release of Angular 2 as a successor to Angular 1.x ,so the API is now stable and there will be no breaking features for the API .As a developer this means that you can start using Angular 2 for building production ready applications for the platform of your choice .

Why using Angular 2 ?
-----------------------

In our days ,there are many great frameworks ,either free and oepn source frameworks or proprietary and paid frameworks .One of the most asked questions by developers is why I should use the framework x instead of the framework y ? we are not going to talk about why we need to use a framework because that's another subject .But just why Angular 2 over other available frameworks .

First of all ,Angular 2 targets the already existing community around its first version Angular 1,which is huge .So if you are already an Angular 1 developer and you are fascinated by the great features of Angular 1 then you should be more than fascinated by Angular 2 since it's a better version with increased performance ,stability and modernity .Angular 2 uses a modern compoenent based software architecture that makes you more productive and makes building complex and large applications painless .You might find problems making the transition or migrations your apps from Angular 1 to Angular 2 depending on your trade-offs  but the Google team is already doing a great job to ease the transition or migration by adding modern Angular 2 features in Angular 1 starting with version 1.5 .  

For developers using other frameworks other than Angular or about to decide which framework to choose .We are not going to enter a debate of the like ,Angular 2 versus another framework ,say for example React by FaceBook ,Ember.js or Backbone etc .There are already many articles comparing these frameworks versus the others on the web  But it should be enough to know about these points .

<ul>
	<li>Angular 1/2 has a huge community around it </li>
	<li>It's built and backed by the giant Google which has already many great products </li>
	<li>Companies around the world are embracing it quickly </li>
	<li>It's modern and uses advanced software architecture patterns</li>
	<li>Targets all platforms ,the Web ,Desktop and Mobile </li>
	<li>Makes building complex applications easier </li>
	<li>It's the most popular open source and free framework etc.</li>
	<li>Using TypeScript means better development ecosystem and tools ,better IDEs integration with features such as auto completion and type suggestions </li>
	<li>Angular 2 is easier than Angular.js </li>
	<li>Angular 2 use modern tools such as the ES6+ module system </li>
	<li>Angular 2 use modern tool-chain such as Webpack or SystemJS </li>

</ul>

Angular 2 can be also a good choice of another part of developers .If you are one of those developers who tried Angular 1 before but did not feel at home when using it ,because they didn't feel comfortable working with the JavaScript way which is really intimidating when you are just starting .Many developers don't even consider JavaScript as a programming language because of its awkward and ugly syntax . I personally was one of these developers ,I liked all the great and powerful features in Angular like dependency injection and separation of concerns but I didn't like the way you need to use them using the JavaScript syntax .

Angular 2 gives you a second chance to benefit from all its features using TypeScript which is modern ,easy to use,clean and  classical( versus prototypical ) OOP language .If you are familiar with OOP languages such as Java you now have the chance to use Angular 2 using familiar classical concepts instead of the JavaScript-esh prototype based way .

Angular.js already helped developers and teams build large scale applications accumulating an experience and community feedback of more than Five years of what is should be added ,changed or removed so Angular 2 takes all that into consideration to build a better and modern framework with the best features of Angular 1 plus other modern features used by modern frameworks or libraries such as React .You know what I mean Components .

Angular 2 has also many other features such as a modern routing ,templating system ,Shadow DOM ,Annotations and Observables etc.

Angular 2 versus Angular 1 or Angular.js 1.x
----------------------------------------------

Angular 2 is the next version of Angular 1 which is totally built from scratch which means they have many differences and similarities .

Angular uses a bunch of directives ,controllers ,services and factories together to build the app .Angular 2 focus mainly on the concept of components .You apps is basically a parent root component which has child components .

Angular.js 1.x makes heavy use of $scope and $watch (bad for performance) both are not available on Angular 2 .

Angular 2 replaces the directive concept of Angular 1 with components which a more powerful and modern concept .But you can also use directives in Angular 2 and also components in Angular 1 started with version 1.5 and even patched in Angular 1.3 by the community. 

Angular 2 uses OOP ,ES6 and TypeScript, classes .Angular 1 is focused around functions to create everything from modules, directives ,filters ,controllers ,services and factories . 

Angular 2 uses the modular system of ES6+ but Angular 1 uses its own modular system .

Angular 2 has a modern and powerful router for implementing navigations between different components .Angular 1 used many implementations for routing .The latest one is the ui-router which uses the concept of states for navigation . 

Angular 2 is designed mainly with TypeScript integration and built with TypeScript.Angular 1 built by and to be used with JavaScript .

Angular 2 is independent of browser DOM .Angular 1 can not be used without the browser DOM .

Conclusion
--------------

So that was the first tutorial in a series of tutorials to get started with Angular 2 . We have tried answer many developers questions such as what is Angular 2 ? and why you should use Angular ? So i hope this post answered your questions or encouraged to try Angular 2 .The second tutorial is about [using the Angular 2 CLI (Command line interface) tool](http://www.techiediaries.com/angular2-cli-tutorial) to quickly bootstrap and generate your first Angular 2 project and to assist you in the scaffolding of different Angular 2 constructs such as components,pipes and services etc.



