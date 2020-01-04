---
layout: post
title: "Getting started with Angular 2 CLI tutorial"
image: "images/content/getting-started-with-angular2-cli-tutorial/titleimage.png"
excerpt: "In this tutorial we are going to get started with Angular 2 CLI "
tags : angular 
---
{% include image.html
       img="images/content/getting-started-with-angular2-cli-tutorial/bigimage.png"
       title="Getting started with Angular 2 CLI tutorial"
%}

The Angular 2 framework comes with A powerful CLI (Command line interface) utility that allows developers to generate new Angular 2 projects and scaffold different components of the project .It's a very handy tool if you want to effectively work with Angular 2 .Before getting started with the Angular 2 CLI lets talk about its key concepts  

It's an official Angular 2 tool built by the Angular 2 team .

It makes tasks such as project generation,components scaffolding quick and easy .

It allows developers to generate projects that works immedialty ,no need to spend hours to settup different configuration files,look for all librairies,that allow you to run your project, without errors .The CLI takes care of all that and gives you nwith a few commands ,a ready to run project .

It helps you generate a project that follows the best practices from the developers of Angualr 2 themseselves .

It makes testing ,debugging and serving Angular 2 projects much easier with one or a few terminal/command prompt commands .

Angular 2 is based on <a href="http://www.ember-cli.com/" rel="nofollow">ember-cli</a>  

The angular 2 CLI is still in beta version .

The recent beta version of Angular 2 CLI uses Webpack as the build system instead of the previously used SyestemJS so your generated projects will use Webpack and you don't have to do any configuration work by yourself just scaffold ,serve your project and start developing your next awesome Angular 2 application .

The Angular 2 CLI is a Node.js utitiy that can be installed from NPM .The CLI requires at least version 4 of Node.js and at least version 3 of NPM(Node Package Manager) so you need to install these requirements before you can install the CLI.

So go ahead and grab the Node installer from their official website or you can follow this tutorial on how to install Node.js using NVM (Node version manager) on Ubuntu .

After installing the requirements you can install the Angular 2 CLI by executing this command from your terminal/command prompt

	npm install -g angular-cli

How to work with Angular 2 CLI
-------------------------------

Working with the Angular 2 CLI is a matter of entering some commands from your terminal .Lets see the most important commands

For generating a new project from scratch .Just make sure you are under your development directory .Launch your terminal and then execute : 

	ng new ng2-project
	cd ng2-project

Next you can easilly serve your application with

	ng serve

And your application will be available at address http://localhost:4200 .

You can also specify the address and port for your development server using 

	ng serve --host 0.0.0.0 --port 4201

An Angular 2 application is a set of components alongside with many constructs such as Services ,Routes and Pipes etc .You can generate all these constrcuts on the fly with ng generate command or its equivalent shortcut  ng g  

Component	
	
	ng g component anew-component

Directive	
	
	ng g directive anew-directive

Pipe	

	ng g pipe anew-pipe

Service	

	ng g service anew-service

Class	

	ng g class anew-class

Interface	

	ng g interface anew-interface

Enum	

	ng g enum anew-enum

Module	

	ng g module amodule


After generating your project and different constructs .You can easilly build the project using 

	ng build 

How to deploy your app to GitHub pages
-------------------------------------

You can very easilly deploy your finished Angular 2 project to GitHub pages using 

	ng github-pages:deploy --message "first commit"

You can also deploy to user page using

	ng github-pages:deploy --user-page --message "First commit"

Conclusion
-----------

In this tutorial i've just introdecud you to Angular 2 CLI to quicky generate working Angular 2 projects/apps .Make sure you visit the <a href="https://github.com/angular/angular-cli" rel="nofollow">official Github repository</a> of Angular 2 CLI for all available commands and the <a href="https://cli.angular.io" rel="nofollow">official website</a> for more information about the Angular 2 CLI .



