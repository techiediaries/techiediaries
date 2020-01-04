---
layout: post
title: "Building Server Side Rendered Apps with the Angular Universal Starter"
image: "images/content/angular-universal-starter.png"
excerpt: "How to build server rendered apps with Angular Universal Starter" 
tags : [angular , express ] 
---

{% include image.html 
    img="images/content/angular-universal-starter.png" 
    title="Universal Angular 2+ Apps" 
%}

Angular Universal Starter is a minimal starter for quickly getting started with an isomorphic Angular 2+ web application. 
You can simply clone it from Github and start building your universal Angular app upon it. Lets see how to do that.

First you need to have Git installed on your system. You need also to have Node.js and NPM installed and configured.

Next clone the Universal Starter from Github with:

    git clone https://github.com/angular/universal-starter.git universal-demo 

Then navigate inside the cloned repo and install the required dependencies with:

    npm install 

After successfully installing all requirements you can start the development server using:

    npm start

After building your application you can create a production bundle using:

    npm run build:prod


 ## Some notes when using Angular Universal 

 You shouldn't use the browser specific objects such as window, document, navigator because they only exist 
 on browser environment and since Angular Universal uses a Node.js express server you can't access them.But 
 what you need to do if you need to manipulate the DOM for example?

 You should do that only on client side code and make sure to wrap them inside <em>isBrowser</em> function 

    import { isBrowser } from 'angular2-universal'   

Make sure to use Angular Renderer class instead of manipulating native elements directly.









