---
layout: post
title: "Angular 2 and Electron starters and boilerplates "
image: "images/content/angular2-and-electron-starters-and-boilerplates/titleimage.png"
excerpt: "In a previous post we have seen how to use the Angular CLI and Electron to build Desktop apps with Angular 2 and Electron .In this post we are going to see a list of Electron and Angular 2 starters and boilerplates for using Electron with Angular 2 without reinventing the wheel ."
categories : github-electron
tags: angular2 angular electron 
---

{% include image.html
   img="images/content/angular2-and-electron-starters-and-boilerplates/bigimage.png"
       title="Electron and Angular 2 starters and boilerplates "
%}


In a previous post we have seen how to use the Angular CLI and Electron to build Desktop apps with Angular 2 and Electron .In this post we are going to see a list of Electron and Angular 2 starters and boilerplates for using Electron with Angular 2 without reinventing the wheel . 

Electron is built by GitHub .It’s the most powerful open source project for using web technologies to build Desktop applications .Thanks to Electron you can take benefits of all the fantastic and powerful modern frameworks such as React , Angularjs or Angular 2 to create cross platform apps for Windows ,Linux and MAC .

Electron is a headless chromium browser plus Node.js and a set of API to communicate with the underlying operating system .You can build web apps that behave and look exactly like native Desktop apps but as you know you are going to lose some bit of performance since there is a web layer between your app code and the operating system resources .

Angular 2 is the new completely rewritten framework built by Google for making Desktop and mobile web apps with a focus on component based architecture and performance .The Angular 2 framework has more native like performance so it’s suitable for developing Desktop applications using Electron since you’ll have a boost of performance which makes your app behaves like any app built with native languages such as C++.

Angular 2 framework was written in TypeScript and can be used either with TypeScript ,JavaScript and dart but the recommended language for building apps with Angular 2 is TypeScript which is simply a superset of JavaScript created by Microsoft which adds OOP or oriented object programing concepts and types to JavaScript .

Now the next question becomes ,how you can integrate Electron and Angular 2 ? 

The process of integrating Electron with Angular 2 is not complicated but needs a little bit of configuration .

Since there already projects and developers who are using Electron and Angular 2 we are not going to reinvent the wheel .So in this post i’ll show best Electron with Angular 2 starters or boilerplates to scaffold if you want to build your Desktop application based on Angular 2 .

This post will be continuously updated with new boilerplates as soon as I discover and test them Angular 2 Electron Boilerplate

This is an easy to use boilerplate which integrates Angular 2 with Electron .It includes Angular 2 features such as forms and ngModule and uses an easy workflow 

# angular2-electron-boilerplate

## How to use ?

To start using this boilerplate all you need to do is first clone its repository so open up your terminal on Linux/MAC or command prompt on Windows and enter the following command

    git clone https://github.com/c4wrd/angular2-electron-boilerplate angular2electron

Also make sure you have Git installed in your system for this to work .

Next  just browse into your project folder using

    cd angular2electron

And then install the requirements 

    npm install 

That’s all .you are ready now .You can run your application with

    npm run start

Finally to build your application just execute 

    npm run build

And you’ll find your built project under dist folder .

# Angular 2 electron app

This is an Electron app which uses Angular 2 as a framework and WebPack as build system and integrates ngrx and material2 .

So go ahead .Open up your terminal/command prompt and clone it 

    git clone https://github.com/joaogarin/angular2-electron.git

Next execute
 
    $ npm install
    $ npm run build
    $ npm run watch
    $ npm run electron

You can also package your app for OSX using 

    npm run package

Currently these are the two projects which i’ve found and test which use Angular 2 and Electron stay tuned this post will be updated regularly for new content 

For a tutorial on how to use the Angular CLI and Electron to scaffold and build Desktop apps checks this tutorial .

For a tutorial on how you can start from scratch and integrate Angular 2 with Electron watch this video tutorial 

<iframe width="640" height="360" src="https://www.youtube.com/embed/8TS2umFMB9Q" frameborder="0" allowfullscreen></iframe>






