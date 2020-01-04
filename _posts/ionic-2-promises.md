---
layout: post
title: "Ionic 2/Angular 2 promises "
image: "images/content/ionic2-promises.png"
excerpt: "A tutorial of Ionic 2/Angular 2 promises " 
tags : [ionic2]
---


{% include image.html 
    img="images/content/ionic2-promises.png" 
    title="Ionic 2 promises" 
%}

Both Promises and [Observables](/ionic-2-observables) are abstracts for asynchronous programming but promises are 
the de-facto standard for asynchronous JavaScript .

In ES6 and TypeScript promises are part of the language so you don't need to use any external libraries to support 
them and since Angular 2 / Ionic 2 are based on TypeScript promises can be used without including any libraries .

A promise represents data that may be available at the moment of the call or not .For example if you are accessing 
some remote database ,depending on the network state ,data size and other conditions ,a delay may occur .
The promise ensures that your app continues working without any interruption until data becomes available so there will be no UI 
blocking or waiting for data.


In this tutorial ,we are going to learn when and how to use a Promise with an example code .

Now lets get started 

First it is recommended to start a new Ionic 2 app so go ahead ,open up your terminal and scaffold a new Ionic 2
project with 

    ionic start ionic2-promises-example blank --v2

A new blank project will be generated with a home page component which is good enough for testing but we need 
to create a provider for data that can injected by our component to request some data .

So using your Ionic 2 CLI ,generate a provider with 

    cd ionic2-promises-example 
    ionic g provider DataService

A TypeScript file data-service.ts will be generated in src/providers ,go ahead and open it  :


