---
layout: post
title: "Angular 9/8 SEO: Adding Title and Meta Tags to Your Universal App"
image: "images/content/angular.png"
excerpt: "In this tutorial, we'll see in a 3 easy steps how you can render your Angular 8 application on the server to make it SEO-friendly and boost its performance using the Angular Universal technology" 
tags : [angular , angular8] 
---

In the previous tutorial, we've seen how to do server-side rendering of our Angular 9 application to make our app SEO friendly and increase the performance. Let's now learn how to add  meta tags to our app which is also important for SEO.


## Setting Meta and Title Tags in Angular 9 for SEO Purposes

Angular provides the `Meta` and `Title` services that allows you to either get or set the HTML meta tags and title.

In the previous tutorial, we've performed the following steps:

- Step 1 - Setting up Angular 9 CLI and Initializing a Project
- Step 2 - Setting up Angular 9 Universal 
- Step 3 - Building and Serving the App with Express Server

Now, let's do one more step!

## Step 4 - Setting Meta Tags and Title

Open the `src/app/app.component.ts` file and start by importing the Meta and Title services as follows:

```ts
import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

```

Next, inject both Angular 9 services via the component constructor:

```ts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular 9 Universal Example';

  constructor(private titleService: Title, private metaService: Meta) {}
}
```

Next, import OnInit and implement it:

```ts
import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
```

Next, add the `ngOnInit()` method:

```ts
  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      {name: 'keywords', content: 'Angular, Universal, Example'},
      {name: 'description', content: 'Angular Universal Example'},
      {name: 'robots', content: 'index, follow'}
    ]);
  }
```

## Step 5 - Rebuild and Serve your Angular 9 App

Head back to your terminal, rebuild and serve your Angular 9 app using the following commands:

```bash
$ npm run build:ssr 
$ npm run serve:ssr
```

If you go to the [http://localhost:4000/](http://localhost:4000/) address and inspect the source code, you should see the title changed to **Angular Universal Example** and the meta tags added:
![Angular SEO Meta Tags](https://www.techiediaries.com/assets/images/angular-meta-tags.png)

