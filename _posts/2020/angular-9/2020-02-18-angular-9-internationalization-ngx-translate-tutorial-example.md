---
layout: post
title: "Angular 9 Internationalization/Localization with ngx-translate Tutorial and Example"
image: "images/content/angular.png"
excerpt: "In this tutorial, we'll see by example how to make your Angular 9 app available in multiple languages (English and French) using ngx-translate, the internationalization (i18n) and localization library for Angular" 
categories: angular
tags : [angular, angular-9] 
---

In this tutorial, we'll see by example how to make your Angular 9 app available in multiple languages (English and French) using [ngx-translate](http://www.ngx-translate.com/), the internationalization (i18n) and localization library for Angular. 

## Using `ngx-translate` for Internationalizating your Angular 9 App

The `ngx-translate` package makes it easy to translate your Angular app in multiple languages.

In this tutorial. we'll learn how to:

-   Create an Angular 9 project with Angular CLI,
-   Set up internationalization with english and french languages using `ngx-translate`

You will need to have the following prerequisites:

-   [Node.js and npm](https://nodejs.org/)  installed on your development machine,
-   [Angular CLI v9](https://cli.angular.io/) installed on your machine.

That's all, let's get started!

## Creating the Angular 9 Project

Let's start by creating our Angular 9 project using Angular CLI:  

```bash
ng new angular-9-i18n --style css --routing false
```

Next, navigate to your project's folder and run the development server:  

```bash
cd angular-9-i18n
ng serve -o
```

## Add Internationalization to Angular 9 Apps with `ngx-translate`

Let’s now implement internationalization in our Angular 9 application. 

We can add internationalization (i18n) in Angular 9 via the  [ngx-translate](https://github.com/ngx-translate/core) package. 

We'll see how to enable users to switch between multiple languages using various translation files imported from by  `ngx-translate`. 

Let's get started by installing the required dependencies using the following command:

```bash
npm install @ngx-translate/core @ngx-translate/http-loader
```

Next, add the following translations files:  

```bash
cd src/assets/
mkdir i18n 
cd i18n
touch en.json
touch fr.json
```

Open the  `src/assets/i18n/en.json` file and the following JSON content:  

```json
{
   "appTitle": "Angular 9 Example",
   "appText": "Welcome to our app!"
}
```

Next, open the `src/assets/i18n/fr.json`:  

```json
{
   "appTitle": "Exemple d'Angular 9",
   "appText": "Bienvenue dans notre application!"
}
```


Now that we have created the translation files, we need to import the  `ngx-translate`  module and loading the translations by adding the following code in the  `src/app/app.module.ts`  file:  

```ts
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function TranslationLoaderFactory(http: HttpClient) {
      return new TranslateHttpLoader(http);
}

@NgModule({
      bootstrap: [AppComponent],
      imports: [
             AppModule,
             HttpClientModule,
             TranslateModule.forRoot({
                    loader: {provide: TranslateLoader, useFactory: TranslationLoaderFactory, deps: [HttpClient]}
             })
      ]
})
export class AppModule {}
```

We import  `HttpClient` with `TranslateHttpLoader` to load translation files using this factory method:  

```ts
export function TranslationLoaderFactory(http: HttpClient) {
      return new TranslateHttpLoader(http);
}

```

Next, we import `TranslateModule` and provide the loader factory:  

```ts
TranslateModule.forRoot({
      loader: {provide: TranslateLoader, useFactory: TranslationLoaderFactory, deps: [HttpClient]}
})

```

Next, open the  `src/app/app.component.html`  file and update it as follows:  

```html

<h1>
  {{'appTitle' | translate}}
</h1>
<div>
  <button (click)="useLanguage('en')">English</button>
  <button (click)="useLanguage('fr')">French</button>
</div>

<p>{{'appText' | translate }}: </p>
```

Next, we need to implement the  `useLanguage()` method in our `App` component.

Open the  `src/app/app.component.ts` file and update it as folows:  

```ts
import { Component, OnInit, Inject, PLATFORM_ID, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
 selector: 'app-root',
 templateUrl: './app.component.html',
 styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 title = 'angular-9-i18n';
 langs = ['en', 'fr'];

 constructor(private translateService: TranslateService) {}

 public ngOnInit(): void {
   let browserlang = this.translateService.getBrowserLang();
   if (langs.indexOf(browserLang) > -1) {
     this.translateService.setDefaultLang(browserlang);
   } else {
     this.translateService.setDefaultLang('en');
   }
 }


 public useLanguage(lang: string): void {
   this.translateService.setDefaultLang(lang);
 }
}

```

We simply inject `TranslateService` in our component and use the `getBrowserLang` and `setDefaultLang` methods to get the default browser language and set the default language.

Now, that we have implemented internationalization in our Angular 9 app, let's run it using the following command:  

```bash
ng serve -o
```

## Conclusion

In this tutorial, we've created an Angular 9 app with internationalization using `ngx-translate`.

