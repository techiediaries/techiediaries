---
layout: bpost
title: "Angular 10 Carousel Example with Bootstrap 4"
image: "images/content/angular.png"
excerpt: "In this tutorial, we'll learn how to create a carousel with the latest Angular 10 version and Bootstrap 4"
date: 2020-08-10
tags : [angular]
---

In this tutorial, we'll learn how to create a carousel with the latest Angular 10 version and Bootstrap 4.

> The carousel is a slideshow for cycling through a series of content, built with CSS 3D transforms and a bit of JavaScript. It works with a series of images, text, or custom markup. It also includes support for previous/next controls and indicators. [Source](https://getbootstrap.com/docs/4.4/components/carousel/)

Before getting started you need a few prerequisites:

-   Basic knowledge of TypeScript. Particularly the familiarity with Object Oriented concepts such as TypeScript classes and decorators.
-   A local development machine with  **Node 10+**, together with  **NPM 6+**  installed. Node is required by the Angular CLI like the most frontend tools nowadays. You can simply go to the downloads page of  [the official website](https://nodejs.org/en/download/)  and download the binaries for your operating system. You can also refer to your specific system instructions for how to install Node using a package manager. The recommended way though is using  [NVM](https://github.com/nvm-sh/nvm)  — Node Version Manager — a POSIX-compliant bash script to manage multiple active Node.js versions.

**Note**: If you don't want to install a local environment for Angular development but still want to try the code in this tutorial, you can use  [Stackblitz](https://stackblitz.com/), an online IDE for frontend development that you can use to create an Angular project compatible with Angular CLI.

## Step 1 — Installing Angular CLI 10

Let's start by installing the latest Angular CLI 10 version.

[Angular CLI](https://cli.angular.io/)  is the official tool for initializing and working with Angular projects. Head over to a new command-line interface and run the following command:

```bash
$ npm install -g @angular/cli
```

At the time of writing this tutorial,  **angular/cli v10**  will be installed on your system.

## Step 2 — Creating a New Angular 10 App

In the second step, let's create our project. Head back to your command-line interface and run the following commands:

```bash
$ cd ~
$ ng new angular10carousel
```

The CLI will ask you a couple of questions — If  **Would you like to add Angular routing?**  Type  **y**  for Yes and  **Which stylesheet format would you like to use?**  Choose  **CSS**.

Next, navigate to you project’s folder and run the local development server using the following commands:

```bash
$ cd angular10carousel
$ ng serve    
```

Open your web browser and navigate to the  `http://localhost:4200/`  address to see your app running.  


## Step 3 — Installing Ng-Bootstrap

Next, we need to install `ng-bootstrap` using the following command: 

```bash
$ ng add @ng-bootstrap/ng-bootstrap
```

This library provides an Angular implementation for Bootstrap 4 so you don't need to use jQuery.

Open the `src/app/app.component.ts` file and update it as follows:

```ts
import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers

})
export class AppComponent  {
  
  images = [700, 800, 807].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(config: NgbCarouselConfig) {
    // 
    config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }

}

```

We import `NgbCarouselConfig` and add it to the providers array of the component, next we inject it via the constructor and use it to customize default values of carousels used by this component and its children. We set the interval between slides to two seconds, enabled the keyboard to move slides, and pause on hover on each slide. 

We also defined an array of images to use for slides.

Next, open the `src/app/app.component.html` file and update it as follows:

```html
<div class="container-fluid">
<h1>
Angular 10 Carousel Example
</h1>
<h2>Full tutorial in Techiediaries</h2>
<ngb-carousel *ngIf="images">
  <ng-template ngbSlide>
    <div class="wrapper">
      <img [src]="images[0]" alt="Random first slide">
    </div>
    <div class="carousel-caption">
      <h3>First Slide</h3>
      <p> Angular 10 Carousel Example </p>
    </div>
  </ng-template>
  <ng-template ngbSlide>
    <div class="wrapper">
      <img [src]="images[1]" alt="Random second slide">
    </div>
    <div class="carousel-caption">
      <h3>Second Slide</h3>
      <p> Check out Techiediaries</p>
    </div>
  </ng-template>
  <ng-template ngbSlide>
    <div class="wrapper">
      <img [src]="images[2]"  alt="Random third slide">
    </div>
    <div class="carousel-caption">
      <h3>Third Slide</h3>
      <p>for full tutorial...</p>
    </div>
  </ng-template>
</ngb-carousel>
</div>
```

We use `ng-template` with the `ngbSlide` directive for add a carousel slide and we use HTML to define the content for the slide.

Next, open the `src/app/app.component.html` file and add the following styles:

```css
ngb-carousel .wrapper {
  position: relative;
  height: 0;
  padding-top: 55%; /* Keep ratio for 900x500 images */
}

ngb-carousel .wrapper>img {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
```

You can play with this example from [https://stackblitz.com/edit/angular-10-carousel-example](https://stackblitz.com/edit/angular-10-carousel-example)



## Conclusion

In this tutorial, we've seen how to create a carousel with rich slides in Angular 10 using `ng-bootstrap`. 