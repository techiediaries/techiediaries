---
layout: post
title: "Django REST framework (DRF) and Angular 2+ tutorial (Part 2)"
image: "images/content/drf-angular-2.png"
excerpt: "Django REST framework (DRF) and Angular 2+ tutorial (Part 2)" 
tags : "django"
---

{% include image.html 
    img="images/content/drf-angular-2.png" 
    title="Django REST framework (DRF) and Angular 2 tutorial (Part 2)" 
%}

This is part 2 of these tutorial series to learn how to use Python Django framework with Angular 2+ (When writing 
this second tutorial part It's already Angular 4 ) to create Restful or Rest based web apps.

<a href="/django-rest-framework-angular-2" target="_blank">Django REST framework (DRF) with Angular 2+ tutorial (Part 1)</a>

<a href="/django-rest-framework-angular-2-part-2" target="_blank">Django REST framework (DRF) with Angular 2+ tutorial (Part 2)</a>

<a href="/django-rest-framework-angular-2-part-3" target="_blank">Django REST framework (DRF) with Angular 2+ tutorial (Part 3)</a>


There are many frameworks or packages to build Rest APIs with Django .In this tutorial we are going to use 
Django Rest Framework or DRF which makes the process of building restful APIs dead easy .

In the first tutorial part we have seen an introduction to both Django and DRF ,installed Django and DRF then 
created a new project .

In the second part we are going to first see an introduction to Angular 2+ framework ,next we are going to install 
the Angular CLI utility and then use it to generate our Angular 2+ project,or precisely Angular 4 project when writing this tutorial.

<h2>What is Angular 2 ?</h2>

Angular 2+ or officially just Angular is a client side framework built by Google to create Desktop and mobile 
web apps with JavaScript ,TypeScript or Dart . 

Angular was completely rewritten from scratch by Google team using TypeScript to replace its ancestor AngularJS 
which was written In JavaScript .Angular has more performance and more features and it can be used both on the client 
side and server side .

Although it can be used with JavaScript and Dart ,It's recommended to use Angular with TypeScript which is a modern 
strongly typed OOP superset of JavaScript created by Microsoft .

<h2>Getting started with Angular 2+ </h2>

Lets start by installing the Angular CLI so go ahead and open your terminal or command propmt then enter :

    npm install -g @angular/cli 

Make sure you have NodeJS and NPM installed on your machine .

After successfully installing the Angular CLI lets generate a new Angular 2+ project .

First navigate inside your Django project folder then execute :

    ng new client      

A new Angular 2+ will be created for you !

You can serve it using ng serve 

    cd client 
    ng serve 

Now you can visit your app by pointing your browser to http:localhost:4000 

Conclusion 
-------------------
-------------------

In the second part of these tutorial series to learn how to use Django Rest Framework or DRF for building 
a Rest API consumed with an Angular 2+ app ,we have introduced Angular and created the Angular project which 
makes the client part of our Django project .







