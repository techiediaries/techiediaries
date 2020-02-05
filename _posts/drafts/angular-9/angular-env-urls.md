# 

Separating production and development HTTP URLs using environment.ts file in Angular

# Separating production and development HTTP URLs using environment.ts file in Angular

[![Balram Chavan](https://miro.medium.com/fit/c/96/96/2*HxHbdh7fSrARkSp6tvfudA.jpeg)](https://medium.com/@balramchavan?source=post_page-----4c2dd0c5a8b0----------------------)

[Balram Chavan](https://medium.com/@balramchavan?source=post_page-----4c2dd0c5a8b0----------------------)

Follow

[Mar 16, 2018](https://medium.com/@balramchavan/separating-production-and-development-http-urls-using-environment-ts-file-in-angular-4c2dd0c5a8b0?source=post_page-----4c2dd0c5a8b0----------------------)  ·  2  min read

[](https://medium.com/@balramchavan/configure-and-build-angular-application-for-different-environments-7e94a3c0af23)

## 

Configure and build Angular application for different environments

### 

By default Angular application can be built to development environment or to production environment. Based on target…

#### 

medium.com

During development of Angular application, we use some mock REST APIs or development specific APIs. Once we are done with development, we would like to point our Angular application to production server APIs.

I have seen many developers switching between development URLs and production URLs by commenting out one on other.

Ideally, Angular application shouldn’t require any code change to point to either development or production server HTTP URL. It should use relative HTTP URLs for consuming REST APIs and base URL which should be kept at only one place so that just by changing base URL, application should point to either development or production server.

That’s where  `environment.ts`  files comes into picture. In a Angular-Cli project, we get  `environment`  folder with two files

-   `environment.ts`
-   `environment.prod.ts`

## environment.ts

This file exports a constant JSON object  `environment`. If you refer  `environment`  object properties in your Angular project, during development mode i.e.  `ng serve`  or  `ng build`  all values shall be read from this file.

## environment.prod.ts

This file exports same JSON object and should have same properties as of  `environment.ts`  file. When you build your application for production mode using  `ng build --prod`  in that case, all values of  `environment.ts`  file shall get overridden by  `environment.prod.ts`  files.

With above understanding, we can separate development and production HTTP URL using  `environment.ts`  files.

-   Put development HTTP Url inside  `environment.ts`  file

-   Put production HTTP URL inside  `environment.prod.ts`  file

-   In rest of Angular application, refer  `environment.baseUrl`

-   In development mode, run  `ng serve`  or  `ng build`  command.

In our example,  `baseUrl`  shall read value as if development URL:  `[http://fakerestapi.azurewebsites.net/api](http://fakerestapi.azurewebsites.net/api)`

-   For production mode, run  `ng build --prod`  command.

In our example,  `baseUrl`  shall read value as if production URL:  `[https://jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com/)`

This eases build process. Based on type of build, specific base URL shall be picked up by Angular-CLI and output  `dist`  folder shall be generated.

Here is the complete source code of example referred in this article.

[](https://github.com/ultrasonicsoft/configurable-http-url-demo)

## 

ultrasonicsoft/configurable-http-url-demo

### 

configurable-http-url-demo - Separating production and development HTTP URLs using environment.ts file in Angular

#### 

github.com
