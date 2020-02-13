Search Engine Optimization (SEO) is important for many Angular single-page applications (SPAs). You can build SEO-friendly Angular websites with Angular Universal, but how do you make your app SEO-friendly in every language your website supports? Google, Yandex, and Baidu, might request your pages in English, Spanish, Russian, or Chinese: how do you make your server-side rendering return the correct language?

The answer is  [ngx-translate](http://www.ngx-translate.com/), the internationalization ([i18n](https://en.wikipedia.org/wiki/Internationalization_and_localization)) and localization library for Angular. This module makes it easy to use translation files that provide the correct language for both client-side and server-side rendering. This post will show you how to use it.

In this post we will:

-   Create an Angular application with one component, the home page
-   Add server-side rendering for SEO purposes with  [Angular Universal](https://angular.io/guide/universal)
-   Set up internationalization in four languages with  [ngx-translate](https://github.com/ngx-translate/core)

To accomplish the tasks in this post you will need to install the following:

-   [Node.js and npm](https://nodejs.org/)  (The Node.js installation will also install npm.)
-   [Angular CLI](https://cli.angular.io/)

## Set up the Angular project and run Hello World!

Every Angular project begins with installation and initialization of the packages. Type the following at the command prompt:  

```
ng new angular-universal-i18n --style css --routing false

```

When the project is initialized, navigate to its directory:  

```
cd angular-universal-i18n

```

And run the application by typing:  

```
ng serve -o

```

You should see following output in the console:  

```
** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ ** 
Date: 2018-10-29T08:58:37.685Z
Hash: cb54e4608cfb1115882b
Time: 7682mschunk {main} main.js, main.js.map (main) 10.7 kB [initial] [rendered]
chunk {polyfills} polyfills.js, polyfills.js.map (polyfills) 227 kB [initial] [rendered]
chunk {runtime} runtime.js, runtime.js.map (runtime) 5.22 kB [entry] [rendered]
chunk {styles} styles.js, styles.js.map (styles) 15.9 kB [initial] [rendered]
chunk {vendor} vendor.js, vendor.js.map (vendor) 3.29 MB [initial] [rendered]

```

The  `-o`  flag will open the application in your default browser. (In Chrome version 63 or higher you must set flags to open HTTP links and sites without a valid security certificate, such as localhost). You can navigate manually to the URL provided in the command output.

You should see the following screen in your browser:

[![](https://res.cloudinary.com/practicaldev/image/fetch/s---ZZKMSJG--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://s3.amazonaws.com/com.twilio.prod.twilio-docs/images/3tQS0V1Pj7Fqi6dCvBukm0lzpwZDyPUyQKChzWzYREw0ng.width-500.png)](https://res.cloudinary.com/practicaldev/image/fetch/s---ZZKMSJG--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://s3.amazonaws.com/com.twilio.prod.twilio-docs/images/3tQS0V1Pj7Fqi6dCvBukm0lzpwZDyPUyQKChzWzYREw0ng.width-500.png)

## [](https://dev.to/twilio/how-to-create-search-engine-friendly-internationalized-web-apps-with-angular-universal-and-ngx-translate-50gc?utm_source=additional_box&utm_medium=internal&utm_campaign=twilio_boosted&booster_org=twilio#implement-serverside-rendering-with-angular-universal)Implement server-side rendering with Angular Universal

Now we are ready to add server-side rendering to our application with  [Angular Universal](https://angular.io/guide/universal), a technology that renders web pages on the server so your site’s pages can be quickly and easily read by a search engine crawler. To install it, execute this command:  

```
ng add @ng-toolkit/universal

```

## [](https://dev.to/twilio/how-to-create-search-engine-friendly-internationalized-web-apps-with-angular-universal-and-ngx-translate-50gc?utm_source=additional_box&utm_medium=internal&utm_campaign=twilio_boosted&booster_org=twilio#verify-serverside-rendering-is-working)Verify server-side rendering is working

Check to see if Angular Universal is working correctly by running the app and performing a curl request on it:  

```
npm run build:prod;npm run server

curl http://localhost:8080

```

If you don’t want to use curl you can open the URL in a browser and inspect the page source. The results, as follows, should be the same:  

```
<!DOCTYPE html><html lang="en"><head>
  <meta charset="utf-8">
  <title>angular-universal-i18n</title>
  <base href="/">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="stylesheet" href="styles.3bb2a9d4949b7dc120a9.css">
  <style ng-transition="app-root">
/*# sourceMappingURL=data:application/json;
base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */
  </style></head>
<body>
  <app-root _nghost-sc0="" ng-version="7.0.4"><div _ngcontent-sc0="" style="text-align:center"><h1 _ngcontent-sc0=""> Welcome to angular-universal-i18n! </h1>
...
    </div>
    <h2 _ngcontent-sc0="">Here are some links to help you start: </h2>
    <ul _ngcontent-sc0="">
      <li _ngcontent-sc0="">
        <h2 _ngcontent-sc0=""><a _ngcontent-sc0="" href="https://angular.io/tutorial" rel="noopener" target="_blank">Tour of Heroes</a></h2>
      </li>
      <li _ngcontent-sc0="">
        <h2 _ngcontent-sc0=""><a _ngcontent-sc0="" href="https://github.com/angular/angular-cli/wiki" rel="noopener" target="_blank">CLI Documentation</a></h2>
      </li><li _ngcontent-sc0="">
        <h2 _ngcontent-sc0=""><a _ngcontent-sc0="" href="https://blog.angular.io/" rel="noopener" target="_blank">Angular blog</a></h2>
      </li></ul></app-root>

<script type="text/javascript" src="runtime.ec2944dd8b20ec099bf3.js"></script><script type="text/javascript" src="polyfills.c6871e56cb80756a5498.js"></script>
<script type="text/javascript" src="main.f27bf40180c4a8476e2e.js"></script>

<script id="app-root-state" type="application/json">{}</script>
</body></html>

```

If you want to catch up to this step:  

```
git clone https://github.com/maciejtreder/angular-universal-i18n.git
cd angular-universal-i18n
git checkout step1
npm install 
ng serve -o

```

## [](https://dev.to/twilio/how-to-create-search-engine-friendly-internationalized-web-apps-with-angular-universal-and-ngx-translate-50gc?utm_source=additional_box&utm_medium=internal&utm_campaign=twilio_boosted&booster_org=twilio#add-internationalization-to-the-app-with-ngxtranslate)Add internationalization to the app with ngx-translate

Let’s make our application more friendly for users around the world. To achieve that, we are going to add internationalization (i18n) to it with the  [ngx-translate library](https://github.com/ngx-translate/core). We will provide our website visitors with clickable links they can use to switch between different translations. Those translations will be loaded from .json files for each language by  `ngx-translate`. For each  `translate`  key in our  `app.component.html`  template a translated value will be injected.

The first step is installation of dependencies:  

```
npm install @ngx-translate/core @ngx-translate/http-loader

```

Create the following file structure for the translations:  

```
src/assets/i18n/en.json
src/assets/i18n/es.json
src/assets/i18n/ru.json
src/assets/i18n/zh.json

```

Place the following key-value pairs in each file. For  `src/assets/i18n/en.json`:  

```
{
   "Welcome to": "Welcome to",
   "Here are some links to help you start": "Here are some links to help you start"
}

```

`src/assets/i18n/es.json`:  

```
{
   "Welcome to": "Bienvenido a",
   "Here are some links to help you start": "Aquí hay algunos enlaces para ayudarte a comenzar"
}

```

`src/assets/i18n/ru.json`:  

```
{
   "Welcome to": "Добро пожаловать в",
   "Here are some links to help you start": "Вот несколько ссылок, которые помогут вам начать"
}

```

`src/assets/i18n/zh.json`:  

```
{
   "Welcome to": "欢迎来到",
   "Here are some links to help you start": "以下是一些可帮助您入门的链接"
}

```

We have provided translations in four languages. Now we’ll implement the translation mechanism in our application. Import the  `ngx-translate`  module and translations loader by replacing the contents of  `src/app/app.browser.module.ts`  with the following code:  

```
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
      return new TranslateHttpLoader(http);
}

@NgModule({
      bootstrap: [AppComponent],
      imports: [
             BrowserModule.withServerTransition({appId: 'app-root'}),
             AppModule,
             HttpClientModule,
             TranslateModule.forRoot({
                    loader: {provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient]}
             })
      ]
})
export class AppBrowserModule {}

```

What we did here is import  `HttpClientModule`  from the  `@angular/common/http`  library. We need it to provide an  `HttpClient`, which is  [injected](https://en.wikipedia.org/wiki/Dependency_injection)  into the factory method and used for loading translation files using HTTP requests:  

```
export function HttpLoaderFactory(http: HttpClient) {
      return new TranslateHttpLoader(http);
}

```

Finally, we import the TranslateModule and provide our loader into it:  

```
TranslateModule.forRoot({
      loader: {provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient]}
})

```

We also need to import  `TranslateModule`  into the  `src/app/app.module.ts`  file:  

```
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
 declarations: [
   AppComponent
 ],
 imports: [
   CommonModule,
   NgtUniversalModule,
   TranslateModule.forChild(),
 ]
})
export class AppModule { }

```

Replace the code in the  `src/app/app.component.html`  template with the following to provide translation keys and links for switching between languages:  

```
<div style="text-align:center">
    <h1>
        {{'Welcome to' | translate}} {{ title }}!
    </h1>
    <div>
        <span (click)="switchLanguage('en')">English</span>&nbsp;
        <span (click)="switchLanguage('es')">Español</span>&nbsp;
        <span (click)="switchLanguage('ru')">Pусский язык</span>&nbsp;
        <span (click)="switchLanguage('zh')">中文</span>
    </div>

</div>
<h2>{{'Here are some links to help you start' | translate}}: </h2>
<ul>
    <li>
        <h2><a target="_blank" rel="noopener" href="https://angular.io/tutorial">Tour of Heroes</a></h2>
    </li>
    <li>
        <h2><a target="_blank" rel="noopener" href="https://github.com/angular/angular-cli/wiki">CLI Documentation</a></h2>
    </li>
    <li>
        <h2><a target="_blank" rel="noopener" href="https://blog.angular.io/">Angular blog</a></h2>
    </li>
</ul>

```

The final step in providing internationalization in the browser-side code is to implement the  `switchLanguage`  method in our component and provide default translations for the active region. Make following changes in the  `src/app/app.component.ts`:  

```
import { Component, OnInit, Inject, PLATFORM_ID, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
 selector: 'app-root',
 templateUrl: './app.component.html',
 styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 title = 'angular-universal-i18n';

 constructor(private translate: TranslateService) {}

 public ngOnInit(): void {
   this.setDefaultTranslation();
 }

 private setDefaultTranslation(): void {
   if (['en', 'es', 'zh', 'ru'].indexOf(this.translate.getBrowserLang()) > -1) {
     this.translate.setDefaultLang(this.translate.getBrowserLang());
   } else {
     this.translate.setDefaultLang('en');
   }
 }

 public switchLanguage(lang: string): void {
   this.translate.setDefaultLang(lang);
 }
}

```

We got it! Internationalization on the browser side is implemented! Let’s check it out:  

```
ng serve -o

```

After navigating to  [http://localhost:4200](http://localhost:4200/)  and changing the selected language to Español we can see:

[![i18n-spanish-1600w.jpg](https://res.cloudinary.com/practicaldev/image/fetch/s--vwO7hf9I--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://s3.amazonaws.com/com.twilio.prod.twilio-docs/images/i18n-spanish-1600w.width-800.jpg)](https://res.cloudinary.com/practicaldev/image/fetch/s--vwO7hf9I--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://s3.amazonaws.com/com.twilio.prod.twilio-docs/images/i18n-spanish-1600w.width-800.jpg)

If you want to catch up to this step:  

```
git clone https://github.com/maciejtreder/angular-universal-i18n.git
cd angular-universal-i18n
git checkout step2
npm install 
ng serve -o

```

## [](https://dev.to/twilio/how-to-create-search-engine-friendly-internationalized-web-apps-with-angular-universal-and-ngx-translate-50gc?utm_source=additional_box&utm_medium=internal&utm_campaign=twilio_boosted&booster_org=twilio#add-serverside-internationalization)Add server-side internationalization

Check to see if our client-side implementation broke anything on the server side. Start the app in server mode by running the following commands:  

```
npm run build:prod
npm run server

```

After navigating to  [http://localhost:8080](http://localhost:8080/)  we can see that our app is no longer working:

[![](https://res.cloudinary.com/practicaldev/image/fetch/s--ojeEKGXd--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://s3.amazonaws.com/com.twilio.prod.twilio-docs/images/-n8T67Y_qGCTW3j_eGJEHujp2eff-nqypYBE4HULq1VR_s.width-500.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--ojeEKGXd--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://s3.amazonaws.com/com.twilio.prod.twilio-docs/images/-n8T67Y_qGCTW3j_eGJEHujp2eff-nqypYBE4HULq1VR_s.width-500.png)

More error information can be seen in the console:  

```
ERROR { Error: StaticInjectorError(AppServerModule)[TranslateService -> TranslateStore]: 
  StaticInjectorError(Platform: core)[TranslateService -> TranslateStore]: 
    NullInjectorError: No provider for TranslateStore!
    at NullInjector.module.exports.NullInjector.get (/Users/mtreder/angular-universal-i18n/dist/server.js:1361:19)
    at resolveToken (/Users/mtreder/angular-universal-i18n/dist/server.js:1598:24)
    at tryResolveToken (/Users/mtreder/angular-universal-i18n/dist/server.js:1542:16)
    at StaticInjector.module.exports.StaticInjector.get (/Users/mtreder/angular-universal-i18n/dist/server.js:1439:20)
    at resolveToken (/Users/mtreder/angular-universal-i18n/dist/server.js:1598:24)
    at tryResolveToken (/Users/mtreder/angular-universal-i18n/dist/server.js:1542:16)
    at StaticInjector.module.exports.StaticInjector.get (/Users/mtreder/angular-universal-i18n/dist/server.js:1439:20)
    at resolveNgModuleDep (/Users/mtreder/angular-universal-i18n/dist/server.js:18300:29)
    at _createClass (/Users/mtreder/angular-universal-i18n/dist/server.js:18353:32)
    at _createProviderInstance (/Users/mtreder/angular-universal-i18n/dist/server.js:18317:26)
  ngTempTokenPath: null,
  ngTokenPath: [ 'TranslateService', [Function: TranslateStore] ] }

```

To fix this issue we need to provide  `TranslateModule`  in the server module as well. Make following changes in the  `src/app/app.server.module.ts`:  

```
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Observable, Observer } from 'rxjs';
import { readFileSync } from 'fs';

export function universalLoader(): TranslateLoader {
   return {
       getTranslation: (lang: string) => {
           return Observable.create((observer: Observer<any>) => {
               observer.next(JSON.parse(readFileSync(`./dist/browser/assets/i18n/${lang}.json`, 'utf8')));
               observer.complete();
           });
       }
   } as TranslateLoader;
}

@NgModule({
   bootstrap: [AppComponent],
   imports: [
       BrowserModule.withServerTransition({appId: 'app-root'}),
       AppModule,
       ServerModule,
       NoopAnimationsModule,
       ModuleMapLoaderModule,
       ServerTransferStateModule,
       TranslateModule.forRoot({
           loader: {provide: TranslateLoader, useFactory: universalLoader}
       })
   ]
})
export class AppServerModule {}

```

We also need to make changes in  `src/app/app.component.ts`  to implement i18n on the server side. Replace the contents with the following code:  

```
import { Component, OnInit, Inject, PLATFORM_ID, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { isPlatformBrowser } from '@angular/common';

@Component({
 selector: 'app-root',
 templateUrl: './app.component.html',
 styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 title = 'angular-universal-i18n';

 constructor(
   private translate: TranslateService,
   @Optional()
   @Inject(REQUEST) private request: Request,
   @Inject(PLATFORM_ID) private platformId: any
 ) {}

 public ngOnInit(): void {
   const language = this.getLang();
   if (['en', 'es', 'zh', 'ru'].indexOf(language) > -1) {
     this.translate.setDefaultLang(language);
   } else {
     this.translate.setDefaultLang('en');
   }
 }

 public getLang(): string {
   let lang: string;
   if (isPlatformBrowser(this.platformId)) {
     lang = this.translate.getBrowserLang();
   } else {
     lang = (this.request.headers['accept-language'] || '').substring(0, 2);
   }
   return lang;
 }


 public switchLanguage(lang: string): void {
   this.translate.setDefaultLang(lang);
 }
}

```

The additional code determines the current language for the user agent by reading the HTTP  `accept-language`  header sent by user agent (browser or web crawler) when requesting the page at the URI specified by the user agent. To retrieve this header we need to inject a  `@REQUEST`  provided in  `@nguniversal/express-engine/tokens`.

After that we determine if we are executing code on the browser side or server side by using the  `isPlatformBrowser`  method together with the  `@PLATFORM_ID`  token. If we are on the browser side we set the language in the same way as previously, by retrieving it from the translate service. If we are on the server side we read it from the header with:  

```
lang = (this.request.headers['accept-language'] || '').substring(0, 2);

```

We also need to make small change in the typescript configuration file,  `src/tsconfig.app.json`:  

```
{
 "extends": "../tsconfig.json",
 "compilerOptions": {
   "outDir": "../out-tsc/app",
   "types": ["node"]
 },
 "exclude": [
   "test.ts",
   "**/*.spec.ts"
 ]
}

```

We added the  `node`  value to the  `types`  section. We need that because we are using  `fs`  to load translation files directly from the file-system when we are performing server-side rendering.

## [](https://dev.to/twilio/how-to-create-search-engine-friendly-internationalized-web-apps-with-angular-universal-and-ngx-translate-50gc?utm_source=additional_box&utm_medium=internal&utm_campaign=twilio_boosted&booster_org=twilio#test-serverside-internationalization-rendering)Test server-side internationalization rendering

We are done with translations on the server side. Check it out by running the application and performing a curl request with a customized header. Build and run the app as follows:  

```
npm run build:prod
npm run server

```

Then make the curl request specifying Russian (ru_RU) as the current user agent language:  

```
curl http://localhost:8080 --header "accept-language: ru_RU"

```

Alternately, you can inspect the page source in your browser’s  _developer tools_  after clicking Pусский язык on the home page. Note, however, that using “View page source” will reload the page and show you the English (or your default) language version.

The results should look like this:  

```
<!DOCTYPE html><html lang="en"><head>
<meta charset="utf-8">
<title>angular-universal-i18n</title>
<base href="/">

<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" type="image/x-icon" href="favicon.ico">
<link rel="stylesheet" href="styles.3bb2a9d4949b7dc120a9.css"><style ng-transition="app-root">
/*# sourceMappingURL=data:application/json;
base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */
</style></head>
<body>
<app-root _nghost-sc0="" ng-version="7.0.4"><div _ngcontent-sc0="" style="text-align:center"><h1 _ngcontent-sc0=""> Добро пожаловать в angular-universal-i18n! </h1><div _ngcontent-sc0=""><span _ngcontent-sc0="">English</span>&nbsp; <span _ngcontent-sc0="">Español</span>&nbsp; <span _ngcontent-sc0="">Pусский язык</span>&nbsp; <span _ngcontent-sc0="">中文</span></div></div><h2 _ngcontent-sc0="">Вот несколько ссылок, которые помогут вам начать: </h2><ul _ngcontent-sc0=""><li _ngcontent-sc0=""><h2 _ngcontent-sc0=""><a _ngcontent-sc0="" href="https://angular.io/tutorial" rel="noopener" target="_blank">Tour of Heroes</a></h2></li><li _ngcontent-sc0=""><h2 _ngcontent-sc0=""><a _ngcontent-sc0="" href="https://github.com/angular/angular-cli/wiki" rel="noopener" target="_blank">CLI Documentation</a></h2></li><li _ngcontent-sc0=""><h2 _ngcontent-sc0=""><a _ngcontent-sc0="" href="https://blog.angular.io/" rel="noopener" target="_blank">Angular blog</a></h2></li></ul></app-root>
<script type="text/javascript" src="runtime.ec2944dd8b20ec099bf3.js"></script><script type="text/javascript" src="polyfills.c6871e56cb80756a5498.js"></script><script type="text/javascript" src="main.3d5a73b9ae1f4de7b2c1.js"></script>

<script id="app-root-state" type="application/json">{}</script></body></html>

```

Yay! As we expect, our website is rendered on the server side, and the Russian translations have been applied!

If you want to catch up to this step:  

```
git clone https://github.com/maciejtreder/angular-universal-i18n.git
cd angular-universal-i18n
git checkout step3
npm install 
npm run build:prod
npm run server

```

## [](https://dev.to/twilio/how-to-create-search-engine-friendly-internationalized-web-apps-with-angular-universal-and-ngx-translate-50gc?utm_source=additional_box&utm_medium=internal&utm_campaign=twilio_boosted&booster_org=twilio#summary)Summary

Today we covered an important challenge for all mature applications: internationalization. As you can see; you can bring internationalization to server-side rendering, making your application search engine optimized in every language that you support.

If you want to learn more about Angular Universal techniques, check out my post on the Twilio blog:  [Getting Started with Serverless Angular Universal on AWS Lambda](https://www.twilio.com/blog/angular-universal-javascript-node-js-aws-lambda).

The GitHub repository, for the code used in this post can be found here:  [https://github.com/maciejtreder/angular-universal-i18n](https://github.com/maciejtreder/angular-universal-i18n).  
You can also contact me via  [contact@maciejtreder.com](https://mailto:contact@maciejtreder.com/),  [https://www.maciejtreder.com](https://www.maciejtreder.com/)  or  [@maciejtreder](https://dev.to/maciejtreder)  ([GitHub](https://github.com/maciejtreder),  [Twitter](https://twitter.com/MaciejTreder),  [LinkedIn](https://www.linkedin.com/in/maciej-treder/)).