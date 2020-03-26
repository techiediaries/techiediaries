---
layout: bpost
title: "Angular 9.1+ Local Direction Query API: getLocaleDirection Example"
image: "images/content/angular.png"
excerpt: "With Angular 9.1, you can query for the current local direction at runtime using the getLocaleDirection method"
categories: angular
date: 2020-03-26 
tags : [angular, angular-9]
--- 


When building apps that are accessed by users across the world, you may need to add support for more than one language and local to target different cultures that's what called internationalization or i18n. Also adapting your app to various locals is called localization or l10n. 

For example, if you need to target users in the Arabic world, you need to translate your app to Arabic using various i18n techniques but since Arabic is a [Right to Left](https://en.wikipedia.org/wiki/Right-to-left) language you need to change the local direction in your app when needed. 

With Angular 9.1, you can query for the current local direction at runtime using the `getLocaleDirection` method.

## Updating your Project to Angular 9.1

Before you can use the local direction API, you need to update to the latest Angular 9.1.

Open your terminal and navigate to your project's folder then run the following command:

```bash
$ ng update @angular/cli @angular/core
``` 

## Getting the Local Direction with Angular 9.1 by Example

This is an example of getting the local direction.

Open the `src/app/app.component.ts` file and start by adding the following imports: 
 
```ts
import { getLocaleDirection } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
```

Next, you need to inject the `LOCALE_ID` token as follows:

```ts
class App{
  constructor(@Inject(LOCALE_ID) locale) {}
}
```

Next, you can call the `getLocaleDirection` method for getting the current local as follows:

```ts    
getLocaleDirection(locale); // 'rtl' or 'ltr' 
```

  

