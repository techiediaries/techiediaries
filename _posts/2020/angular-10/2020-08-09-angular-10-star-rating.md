---
layout: bpost
title: "Angular 10 Star Rating Example"
image: "images/content/angular.png"
excerpt: "In this tutorial, we'll build a star rating component with the latest Angular 10 version and Bootstrap"
date: 2020-08-09
tags : [angular]
---


In this tutorial, we'll build a star rating component with the latest Angular 10 version and Bootstrap.

Star rating is a common feature in product recommendation and eCommerce websites 

We commonly rate something between zero and five stars.

Before getting started you need a few prerequisites:

-   Basic knowledge of TypeScript. Particularly the familiarity with Object Oriented concepts such as TypeScript classes and decorators.
-   A local development machine with  **Node 10+**, together with  **NPM 6+**  installed. Node is required by the Angular CLI like the most frontend tools nowadays. You can simply go to the downloads page of  [the official website](https://nodejs.org/en/download/)  and download the binaries for your operating system. You can also refer to your specific system instructions for how to install Node using a package manager. The recommended way though is using  [NVM](https://github.com/nvm-sh/nvm)  — Node Version Manager — a POSIX-compliant bash script to manage multiple active Node.js versions.

**Note**: If you don't want to install a local environment for Angular development but still want to try the code in this tutorial, you can use  [Stackblitz](https://stackblitz.com/), an online IDE for frontend development that you can use to create an Angular project compatible with Angular CLI.

## Step 1 — Installing Angular CLI 10

Let's begin by installing the latest Angular CLI 10 version (at the time of writing this tutorial).

[Angular CLI](https://cli.angular.io/)  is the official tool for initializing and working with Angular projects. To install it, open a new command-line interface and run the following command:

```bash
$ npm install -g @angular/cli
```

At the time of writing this tutorial,  **angular/cli v10**  will be installed on your system.

## Step 2 — Creating a New Angular 10 App

In the second step, let's create our project. Head back to your command-line interface and run the following commands:

```bash
$ cd ~
$ ng new angular10star-rating
```

The CLI will ask you a couple of questions — If  **Would you like to add Angular routing?**  Type  **y**  for Yes and  **Which stylesheet format would you like to use?**  Choose  **CSS**.

Next, navigate to you project’s folder and run the local development server using the following commands:

```bash
$ cd angular10star-rating
$ ng serve    
```

Open your web browser and navigate to the  `http://localhost:4200/`  address to see your app running.  


## Step 3 — Installing Ng-Bootstrap

Next, we need to install `ng-bootstrap` using the following command: 

```bash
$ ng add @ng-bootstrap/ng-bootstrap
```

This library provides an Angular implementation for Bootstrap 4 and also provides some useful components such as **NgbRating** -- a directive that allows you to display star rating bar.

Open the `src/app/app.component.ts` file and update it as follows:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentRate = 0;
}
```

Next, open the `src/app/app.component.html` file and update it as follows:

```html
<h1 class="text-primary">
Angular 10 Start Rating Example
</h1>
<ngb-rating [max]="5" [(rate)]="currentRate" [readonly]="false"></ngb-rating>
<p>Rate: {{currentRate}}</p>
```

Next, open the `src/app/app.component.css` file and add the following CSS styles:

```css
ngb-rating {
  font-size: 100px;
  color:brown;
  background: rgba(23, 221, 16, 0.815);
}
```

This is a screenshot of the output:

![Angular 10 Star Rating](https://www.techiediaries.com/assets/angular-star-rating.png)

You can find this example in [https://stackblitz.com/edit/angular-10-star-rating-example](https://stackblitz.com/edit/angular-10-star-rating-example)



## Conclusion

In this short article, we've seen how to create a star rating component with Angular 10 and `ng-bootstrap`. Read the [official docs](https://ng-bootstrap.github.io/#/components/rating/examples) for more details.
