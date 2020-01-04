---
layout: post
title: "Angular 7/8 Tutorial Course — Build a Portfolio Web Application with Angular"
image: "images/content/angular.png"
excerpt: "Angular 8 is out and we'll use it to continue with our front-end tutorial series designed for Python developers.
This tutorial is part of an ongoing series for teaching Angular to Python developers. Saying that; this tutorial can be also followed by front-end developers that don't use Python as their back-end language."
tags : [angular, angular8]
---

In this Angular 8 tutorial course, we'll learn to build a complete web application from scratch.

This tutorial is part of an ongoing series for teaching Angular for beginner developers. 


Before diving into practical steps for developing an Angular 8 web application. Let’s first learn about the basics of this front-end framework and how to get started using it.


> **Note**: If you are familiar with the basics of Angular and the new features of Angular 7, you can skip this part and directly check out how to build a developer's portfolio web application with Angular 7.1, Firebase and Firestore from the following series:
>
>- [Angular 7|6 Tutorial Course: CLI, Components, Routing & Bootstrap 4](https://www.techiediaries.com/angular-course),
>- [Angular 7|6 Tutorial Course: Angular NgModules (Feature and Root Modules)](https://www.techiediaries.com/angular-course-modules),
>- [Angular 7|6 Tutorial Course: Nested Router-Outlet, Child Routes & forChild()](https://www.techiediaries.com/angular-course-child-routes),
>- [Angular 7|6 Tutorial Course: Authentication with Firebase (Email & Password)](https://www.techiediaries.com/angular-course-firebase-authentication),
>- [Angular 7|6 Tutorial Course: Securing the UI with Router Guards and UrlTree Parsed Routes](https://www.techiediaries.com/angular-course-router-guards)


> You can also learn how we consume a Django RESTful API from an Angular interface in this [tutorial](https://www.techiediaries.com/angular-tutorial) which uses v8.

Throughout this beginner's series, you'll learn how you can use Angular 8 to build client side web applications for mobile and desktop.

<div  id="toc_container">
<p  class="toc_title">Angular 7 Tutorial: Introducing Angular to Python Developers</p>
<ul  class="toc_list">
<li><a href="#What_Is_JavaScript_Framework">What's a JavaScript Framework and Why Using it</a></li>
<li><a href="#Introducing_Angular"> Introducing Angular</a></li>
<li><a href="#Angular_Features">Angular Features</a></li>
<li>  <a  href="#Angular_7_New_Features">Angular 7 New Features</a></li>
<li>  <a  href="#Angular_6_New_Features">Angular 6 New Features</a></li>
<li><a  href="#Angular_5_Features">Angular 5 Features</a></li>
<li><a  href="#Angular_4_Features">Angular 4 Features</a></li>
<li><a href="#jQuery_vs_Angular">jQuery vs. Angular</a></li>
<li><a href="#Why_Use_Angular">Why Would you Use Angular</a></li>
<li><a href="#What_Is_TypeScript">What is TypeScript</a></li>
<li><a href="#Angular_vs_React_vs_Vue">Angular  vs. React vs. Vue</a></li>
<li><a href="#Angular_7_Concepts">Angular 7 Concepts</a></li>
<li><a href="#Angular_7_Libraries">Angular 7 Libraries</a></li>
<li><a href="#Angular_CLI_7_Primer">A Primer on Angular CLI 7</a></li>
<li><a href="#Updating_Angular_7">Updating to Angular 7 from v6</a></li>
<li><a href="#Github_Project_Angular_7">Using GitHub Repository To Generate a Project</a></li>
<li><a href="#Getting_Started_with_Angular_7">Getting Started with Angular 7</a></li>
<li><a  href="#Getting_Started_with_The_Angular_CLI">Getting Started with The Angular CLI 7</a></li>
<li><a href="#Conclusion">Conclusion</a></li>
</ul>
</div>

Angular 8, was just released and has many new features under the hood particularly regarding the Angular CLI tool-chain and performance.

Throughout this tutorial series, we’ll learn:

- How to use the Angular CLI 8 for quickly creating a front-end project, generating components, pipes, directives and services.
- routing using Angular router
- forms — dynamic and template based
- use Bootstrap 4 for building professional-grade UIs.


This first tutorial is a sort of in depth introduction to Angular aimed at new developers who have little experience with JavaScript client-side frameworks and want to learn the essential concepts of Angular.

## <a id="What_Is_JavaScript_Framework" name="What_Is_JavaScript_Framework">What's a Framework and Why Using it</a>

A JavaScript or client-side framework is an abstraction that provides developers with a set of tools to easily and efficiently develop front-end web applications. Most frameworks dictate many aspects of your web projects like directory structure and configuration files and different tools that can be used for adding essential functionalities like testing.

A client-side framework is built on top of a client side programming language to help abstract the low level APIs of programming languages and client APIs and makes developers more productive. In fact there is only one client-side language which is JavaScript; the plethora of the web and the only language that web browsers understand but there also more sophisticated and modern programming languages that compile to JavaScript such as TypeScript and CoffeeScript. Which means they can also be the base of a client side framework.

Frameworks are all the rage nowadays and most serious JS developers use a framework for building front-end apps and interfaces instead of using plain JavaScript or jQuery.

Most JavaScript frameworks are said to be **opinionated** which means their creators enforce their opinions or their own philosophy of how web projects should be configured and organized. This also means, developers should learn the new abstractions provided by the framework and any new concepts besides learning the base programming language.

Frameworks provide abstractions for working with many aspects like for example DOM manipulation and Ajax/HTTP. if the technology deals with only one aspect, it's mostly called a library. For example popular libraries like React or Vue.js deal only with the view or the UI of an application by using a virtual DOM and diffing with the real DOM which provides better performance.

Nowadays powerful and modern JavaScript frameworks have emerged and taken the web by storm. Instead of websites with poorly structured JS or jQuery code we have now complete web apps with best practices and code structure with complex and rich UIs. These modern client-side web apps use heavy JavaScript which impacts performance and by result the user experience; and as such even if web browsers became more powerful we still need to follow best practices and battle tested tools and patterns which client-side frameworks try to help with.


## <a name="Introducing_Angular"> Introducing Angular</a>

[AngularJS](https://angularjs.org/) was the most popular client-side framework among JavaScript developers for many years. Google introduced AngularJS in 2012. It's based on a variation of the very popular [Model-View-Controller pattern](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) which is called Model-View-*.

The AngularJS framework, was built on top of JavaScript with the aim to decouple the business logic of an application from the low level DOM manipulation and create dynamic websites. Developers could use it to either create full-fledged SPAs and rich web applications or simply control a portion of a web page which makes it suitable for different scenarios and developer requirements.

### Data Binding

Among the powerful concepts that were introduced by AngularJS, is the concept of [data binding](https://docs.angularjs.org/guide/databinding) which enables the view to get automatically updated whenever the data (the model layer) is changed and inversely.
  
### Directives

The concept of [directives](https://docs.angularjs.org/guide/directive) was also introduced by AngularJS, which allows developers to create their own custom HTML tags.

### Dependency Injection

The other introduced concept is [Dependency Injection](https://docs.angularjs.org/guide/di), which allows developers to inject what's called services (singletons that encapsulates a unique and re-usable functionality within an application) into other components which encourages re-usability of the code.

## <a name="Angular_Features">Angular Features</a>

In the beginning there was Angular.js which has taken the web by storm. It became very popular among client side JavaScript developers and has supercharged them with a set of best patterns in the software development world like the popular MVC (Model-View-Controller) architectural pattern and Dependency Injection alongside with factories, services and modules etc. Which made structuring large JavaScript apps more easier than before. After that, Google continued its innovation by creating Angular 2, the next version of Angular that was completely re-written from scratch but with TypeScript instead of JavaScript which has opened the door for a new set of features, since TypeScript is a statically typed language with strong types and OOP (Object Oriented Programming) concepts similar to popular language like Java. The Angular team has then concentrated on improving Angular by releasing a new version each six months and following semantic versioning, starting with v4 (v3 skipped) then v5, v6 and v7. Each version introduced many new features including performance and new tooling. Let's briefly see the new features which came with each version:

### Angular 8 Features

Angular 8 has added a few features and enhancements to the platform, such as:

- Differential loading support by default,
- The use of dynamic imports in lazy routes,
- The support of web workers,
- Better CLI Builder API,
- Support for TypeScrit 3.4. 

### <a name="Angular_7_New_Features">Angular 7 New Features</a>

In this section we'll see a subset of the features of v7:

#### The CLI Prompts

Angular 7 introduced a new needed feature that enables the CLI to interactively running commands like `ng new` or `ng add`. For example, of you want to create a project using the `ng new` command , the CLI will ask you if you would like to add routing. If your answer is Yes, It will install the required dependencies and setup a routing module and import it into the main module automatically and add a router outlet in the main component.  anything except. The CLI will also ask you of the format you want to use for stylesheets and give you options (CSS, Sass, SCSS etc.) to choose from.

CLI Prompts can be also customized using the `angular.json` file. No just that,they can be also used with Angular Schematics to enable developers to prompt users when installing their libraries which can be done by using the `x-prompt` key inside a Schematics collection.

#### Using CLI Budgets by Default

With Angular 7, new projects are defaulted to use Budgets in the CLI which will notify developers  when the initial bundle has more than *2MB* in size and will throw an error when it has *5MB* in size. These limits can be easily changed from the `angular.json` file.

#### Virtual Scrolling

Virtual scrolling is a strategy mostly used in mobile UI libraries which allows developers to maintain performance while scrolling a large set of items. 

Now the Angular 7 Material CDK has added support for virtual scrolling. You need to simply use the `<cdk-virtual-scroll-viewport>` component to work with large lists of items. This works by simply rendering the only items that actually fit on the visible part of the app's UI.

You can read more information from [Angular Material docs](https://material.angular.io/cdk/scrolling/overview).

#### Support for Drag and Drop

With Angular 7, you can use drag and drop without resorting rto any external libraries for that matter as the support is built right into the CDK.

You can read more about [drag and drop](https://material.angular.io/cdk/drag-drop/overview).

### <a name="Angular_6_New_Features">Angular 6 New Features</a>

Angular 6 brought a set of new features and additions. The most work that was done in this version was about the tool-chain and the CLI.

Let's briefly go over the most important ones:

#### `ng add` and `ng update` Commands

The Angular CLI v6 introduces two useful commands:

-  `ng add`: This new commands allows you to quickly add or install new libraries including adding configuration for you behind the curtain. Popular libraries such as Angular Material or `ng-bootstrap` can now be added on the fly without adding any settings manually from your part. For example, to add Bootstrap to your project you only to issue the following command:

```bash
$ ng add @ng-bootstrap/schematics
```

You can also add new libraries by using **Angular 6 Schematics** to create schematics for new libraries.

- Using `ng update`, It's easy than before to update your Angular 4|5 projects to use Angular 6. And you can also use Schematics to make it easy to integrate third-party libraries with `ng update`.

#### New Configuration File: `angular.json` instead of `.angulac-cli.json`

With Angular 6, the configuration file for the CLI `.angular-cli.json` is renamed to `angular.json`. The overall strcuture of `angular.json` has also changed.

The Angular CLI 6 now generates a work-space which includes multiple apps, among them one default app. So you can have multiple apps per one project and you can also add libraries as a part of the project (`ng g library my-lib`).

#### Schematics

Schematics is a powerful workflow tool for Angular. It can be used to apply transforms to your project, such as creating new components, updating old code automatically etc. This will allow you to build frameworks on top of your project which can boost your productivity like never before.

#### Ivy: The New Renderer

The Angular team has done a re-write of the Angular renderer. It's code named `Ivy`. This new renderer will allow you to produce smaller bundles in size like Preact for example. Ivy has experimental support in Angular 6 and can be enabled with a configuration option.

#### Angular Elements

With Angular 6 Elements, we can develop standard web components or custom elements that can be used natively in modern web browsers with other Angular projects and also with any other framework such as React or Vue or even with plain vanilla JavaScript.

#### Support for TypeScript 2.7

Angular 6 depends on TypeScript 2.7.

#### Support for RxJS 6

Angular 6 has support for RxJS 6. RxJS brings new changes and features such as new import paths, tree-shakablility resulting in even smaller Angular bundles etc.

### <a id="Angular_5_Features">Angular 5 Features</a>

Angular 5, code named pentagonal-donut, was just released. It has new features and internal changes which make Angular applications faster and smaller. In this section we will go over the most important changes and instructions on how to upgrade your existing Angular 2+ project to latest version.

* As of Angular 5.0.0, the build optimizer is enabled by default which applies a series of optimizations to builds.

* The Angular team has also improved the compiler which can make now faster rebuilds (especially for production and AOT builds) thanks to incremental compilation.

* The Angular team has added many features to Angular decorators.

* Developers can now ship faster and smaller bundles by removing white spaces.

* The Angular compiler now supports **TypeScript 2.3 Transforms** a new feature that enables you to hook into the standard TypeScript compilation pipeline. Make sure to use the **--aot** switch to enable this feature.

```bash
$ ng serve --aot
```

* You can now get rid of white spaces in template's code by setting `preserveWhitespaces` to **false** in the component's decorator. You can also turn it on globally by setting `"preserveWhitespaces":false`under`angularCompilerOptions` in `tsconfig.json`. This will help reduce your app's final bundle size.

* You can now use lambdas inside Angular component's decorator.
* New improved number, date, and currency pipes that have better standardization support across browsers without `i18n` polyfills.
* The old HTTP module is now deprecated in favor of `HttpClient` which was introduced in Angular 4.3
* 
### <a name="Angular_4_Features">Angular 4 Features</a>

Angular 4 came with many improvements and new features such as:

* Size and performance: Angular 4 applications are smaller by hundreds of kilobytes, thanks to the improvements to the **View Engine** which have reduced the size of generated components code by around **60%** .

* The Animations are no longer part of Angular core which means that the apps which don't use them don't need to include the extra code in their final bundles. You can use animations in your apps by using *BrowserAnimationsModule* which can be imported from *@angular/platform-browser/animations*.

* Improved **ngIf* and **ngFor*: **ngIf* now supports the *else* syntax, for example it's easy now to write templates in this way

```html

<div *ngIf="ready ; else loading">

<p>Hello Angular 4</p>

</div>

<ng-template #loading>Still loading</ng-template>

```

If the *ready* variable is false Angular will show the loading template.

You can also assign and use local variables inside both **ngIf* and **ngFor* expressions, for example:

  

{% raw %}

```html

<div *ngFor="let el of list as users; "  >

{{ el }}

</div>

```

{% endraw %}

  

* The adoption of Angular universal as part of Angular: the Angular team has adopted Angular Universal which is a community driven project that allows developers

to use server side rendering for Angular apps. It's available from *@angular/platform-server*.

## <a name="jQuery_vs_Angular">jQuery vs. Angular</a>

jQuery is a library that sits on top of vanilla JavaScript and provides a rich set of features that can be easily learned. It can be used across all web browsers to manipulate the DOM.

jQuery was the most popular front-end library for many years and nowadys it's still used to power the front-end for many websites

One of the reasons jQuery was popular is the difficulty to manipulate the DOM in the browser. jQuery came with an easy to use API to can be used across all the popular browsers without worrying about your website not working on some browser.

Nowadays, browsers and JavaScript are more mature and browser compatibility are nicely addressed with API standards also the front-end ecosystem becomes more vibrant with sophisticated tools, frameworks and libraries like Webpack, Angular, React, Vue.js and Axios (or the standard Fetch API for doing HTTP) etc.

jQuery now is a library that's used by developers who have no idea of what vanilla JavaScript can do nowadays and the new browser APIs that can replace most of and the commonly used jQuery APIs.

Modern frameworks like Angular, React or Vue.js share a common general philosophy which is abstracting all direct operations with the DOM and using a component-based architecture.

Here is a list of differences between jQuery and Angular:

  
- jQuery is primarly a DOM manipulation library; Angular is a complete platform for creating client side mobile and web apps.
- jQuery is mostly used to add interactivity to web pages; Angular is used to create full-fledged SPAs with advanced features such as routing.
- jQuery does not offer advanced patterns like components, directives, pipes and two-way binding; Angular is all about a component-based architecture with features like routing, dependency injection etc.
- jQuery can become very difficult to maintain when the project grows but in the case of Angular, different tools, such as feature modules, are introduced to make working with large project easier.

- etc.

## <a name="Why_Use_Angular">Why Would you Use Angular</a>

  

Angular is an open-source and TypeScript-based platform for building client-side web applications as Single Page Applications. Angular provides features such as declarative templates, dependency injection and best patterns to solve everyday development problems.

  

But precisly, why Angular? Because:

  

- It provides support for most platform and web browsers such as web, mobile, and desktop.

- It's powerful and modern with a complete ecosystem,

- It can be used to developer native mobile apps with frameworks such as NativeScript and Ionic

- It convenient and can be used with Electron to develop native desktop apps etc.

- Angular provides you with the tools and also with powerful software design patterns to easily manage your project.

- It's using TypeScript instead of plain JavaScript, a strongly typed and OOP-based language created by Microsoft which provides features like strong types, classes, interfaces and even decorators etc.

- It's batteries-included which means you don't have to look for a separate tool for different tasks. With Angular, you have built-in libraries for routing, forms and HTTP calls etc. You have templates with powerful directives and pipes. You can use the forms APIs to easily create, manipulate and validate forms.

- Angular uses RxJS which is powerful reactive library for working with Observables.

- Angular is a component-based framework which means decoupled and re-usable components are the basic building of your application.

- In Angular DOM manipulation is abstracted with a set of powerful APIs.

- Angular is a powerful framework that can be also used to build PWAs (Progressive Web Apps).

  
  

## <a name="Getting_Started_with_Angular_7">Getting Started with Angular 8</a>

Now let's see how we can start using the latest Angular 8 version.

Prior knowledge of Angular is not required for this tutorial series but you'll need to have a few requirements:

* Prior working experience or understanding of HTML and CSS.
* Familiarity with of TypeScript/JavaScript.

### <a name="Updating_Angular_7">Updating to Angular 8 from Angular 7</a>

In case you have started a project with Angular v7, you can update it to Angular 8 instead of creating a new one from scratch. This can be done in a few steps. Please refer to this [tutorial on how to update existing Angular CLI projects](https://www.techiediaries.com/updating-angular-cli-projects) for the full list of instructions. In fact thanks to the amazing work done in v6 it's now more easier than ever to upgrade to the latest version.

### <a name="Github_Project_Angular_7">Using GitHub Repository To Generate a Project</a>

You can clone a quick-start Angular project from GitHub to generate a new project.

You need to have Git installed on your system then run the following:

```bash

git clone https://github.com/angular/quickstart my-angular-project
cd my-angular-project
npm install
npm start
```

You can find more information [here](https://github.com/angular/quickstart).

In this tutorial, we’ll use the Angular CLI v7 to generate our Angular 8 front-end project. It’s also the recommended way by the Angular team.

### Generating a New Angular 8 Project with Angular CLI v7

Developers can use different ways to to start a new project; such as:

- Installing Angular 8 by hand in a new project generated with **npm**  **init**,
- Installing and using CLI v8 to generate a new project,
- Upgrading from an existing Angular 6 project or any previous version (refer to sections on top for more information).
- 
The best way though is using the Angular CLI which is recommended by the Angular team. A project generated via the CLI has many features and tools built-in like testing for example which makes easy to start developing enterprise-grade apps in no time and without dealing with complex configurations and tools like Webpack.

#### Requirements

This tutorial has a few requirements. Angular CLI depends on Node.js so you need to have Node and NPM — Node 8.9 or higher, together with NPM 5.5.1 — installed on your development machine. The easy way, is to go [their](https://nodejs.org/en/download/)[website](https://nodejs.org/en/download/) [official](https://nodejs.org/en/download/) and get the appropriate installer for your operating system.

![Angular 8 tutorial basics](https://qph.fs.quoracdn.net/main-qimg-eb2aefa41b3b1c702bb8717513cecdeb)


For Ubuntu 16.04 users I recommend following this [tutorial](https://www.techiediaries.com/ubuntu-install-nodejs-npm) to successfully install Node.js and NPM on your Ubuntu machine.

Now, just to make sure you have Node.js installed. Open a terminal and run the following command:

```bash
node -v
```
You should get the version of the installed **Node.js 8.9+** platform.

  

![Angular 8 tutorial - node version ](https://qph.fs.quoracdn.net/main-qimg-51149eea9ddcace6c420555c4781770e)

**Node version ~8.9+**

### Installing Angular CLI 8

The Angular CLI is a powerful command line utility built by the Angular team to make it easy for developers to generate Angular projects without dealing with the complex Webpack configurations or any other tool. It provides a fully-featured tool for working with your project from generating constructs such as components, pipes and services to serving and building production ready bundles etc.

To use the Angular CLI — you first need to install it via npm  package manager.  Head over to your terminal and enter the following command:

```bash
$ npm install -g @angular
```

> Depending on your npm configuration, you may need to add **_sudo_** to install global packages.

## <a name="Angular_CLI_7_Primer">A Primer on Angular CLI 8</a>

After installing Angular CLI 8, you can run many commands. Let’s start by checking the version of the installed CLI:

```bash
$ ng version
```

You should get a similar output:

![Angular 8 tutorial - CLI version](https://i.imgur.com/dDFdLO0.png)
**Angular CLI version ~ ng version**

A second command that you might need to run is the **_help_** command:

```bash
$ ng help
```

To get a complete usage help.  

![Angular 7 tutorial - CLI help](https://i.imgur.com/TE89cfg.png)

**Angular CLI Usage ~ ng help**

The CLI provides the following commands:

- `add`: Adds support for an external library to your project.

- `build (b)`: Compiles an Angular app into an output directory named `dist/` at the given output path. Must be executed from within a workspace directory.

- `config`: Retrieves or sets Angular configuration values.

- `doc (d)`: Opens the official Angular documentation (angular.io) in a browser, and searches for a given keyword.

- `e2e (e)`: Builds and serves an Angular app, then runs end-to-end tests using Protractor.

- `generate (g)`: Generates and/or modifies files based on a schematic.

- `help`: Lists available commands and their short descriptions.

- `lint (l)`: Runs linting tools on Angular app code in a given project folder.

- `new (n)`: Creates a new workspace and an initial Angular app.

- `run`: Runs a custom target defined in your project.

- `serve (s)`: Builds and serves your app, rebuilding on file changes.

- `test (t)`: Runs unit tests in a project.

- `update`: Updates your application and its dependencies. See https://update.angular.io/

- `version (v)`: Outputs Angular CLI version.

- `xi18n`: Extracts i18n messages from source code.


### Angular CLI 8 — Generating a New Project from Scratch

You can use Angular CLI 8 to quickly generate your Angular 8 project by running the following command in your terminal:

```bash
$ ng new frontend
```

> frontend _is the name of the project. You can — obviously— choose any valid name for your project. Since we’ll create a full-stack application I’m using_ frontend _as a name for the front-end application._

As mentioned earlier, the CLI v7 will ask you about if *Would you like to add Angular routing?*, you can answer by y (Yes) or No which is the default option. Ii will also ask you about the stylesheet format, you want to use (such as CSS). Choose your options and hit `Enter` to continue. 

![Angular 8 project structure](https://i.imgur.com/vQaSm5I.png)

After that; you'll have your project created with directory structure and a bunch of configurations and code files. Mostly in TypeScript and JSON formats. Let's see the role of each file:

- `/e2e/`: This folder contains end-to-end (simulating user behavior) tests of the website. 
- `/node_modules/`: All 3rd party libraries are installed to this folder using `npm install`. 
- `/src/`: It contains the source code of the application. Most work will be done here.
	 - `/app/`: It contains modules and components. 
	 - `/assets/`: It contains static assets like images, icons and styles etc.
	 - `/environments/`: It contains environment (production and development) specific configuration files.
	 -  `browserslist`: Needed by autoprefixer for CSS support.
	 -   `favicon.ico`: The favicon.
	 -   `index.html`: The main HTML file.
	 -   `karma.conf.js`: The configuration file for Karma (a testing tool) 	
	 -   `main.ts`: The main starting file from where the *AppModule* is bootstrapped.
	 -    `polyfills.ts`: Polyfills needed by Angular.
	 -    `styles.css`: The global stylesheet file for the project.
	 -    `test.ts`: This is a configuration file for Karma 
	 -    `tsconfig.*.json`: The configuration files for TypeScript.
- `angular.json`: It contains the configurations for CLI
- `package.json`: It contains basic information of the project (name, description and dependencies etc.)
-   `README.md`: A Markdown file that contains a description of the project.
-   `tsconfig.json`: The configuration file for TypeScript.
-   `tslint.json`: The configuration file for TSlint (a static analysis tool) 


### Angular CLI 8 — Serving your Project with a Development Server

Angular CLI provides a complete tool-chain for developing front-end apps on your local machine. As such, you don’t need to install a local server to serve your project — you can simply, use the `ng serve` from your terminal to serve your project locally. First navigate inside your project's folder and run the following commands:

```bash
$ cd frontend
$ ng serve
```

You can now navigate to the `http://localhost:4200/` address to start playing with your front-end application. The page will automatically live-reload if you change any source file.

You can also use different host address and port other than the default HTTP host and port by providing new options. For example:

```bash
$ ng serve --host 0.0.0.0 --port 8080
```

### Agular CLI 8— Generating Components, Directives, Pipes, Services and Modules

To bootstrap your productivity, Angular CLI provides a **generate** command modules etc. For example to generate a component run:and to quickly generate basic Angular constructs such as components, directives, pipes, services

```bash
$ ng generate component account-list
```

> account-list is the name of the component. You can also use just **g** instead of **generate**
> The Angular CLI will automatically add reference to `components`, `directives` and `pipes` in the `app.module.ts`.

If you want to add your component, directive or pipe to another module — other than the main application module i.e `app.module.ts`—for example to a feature module, you can simply prefix the name of the component with the module name and a slash — like a path.

```bash
$ ng g component account-module/account-list
```

> account-module is the name of an existing module.


## <a name="Angular_vs_React_vs_Vue">Angular  vs. React vs. Vue</a>

Angular, React and Vue are nowadys the most popular frameworks for front-end web development. This is one common thing between them but they have many differences.

The first difference is that Angular a complete platform for building front-end web apps, while React and Vue.js are only libraries that only deal with the view layer of a front-end web application.

Now let's see some statistics about them:
   
 - Angular has [57 developers](https://angular.io/about?group=Angular) on their team while Vue has [25 developers](https://vuejs.org/v2/guide/team.html). For React the number of developers in the team are unknown.
 - On Github, Angular has more 40k stars and 755 contributors, React has more than 113k stars and 1,251 contributors, and Vue has more than 117k stars and 215 contributors. 

This a Github Stars History for Angular vs React and Vue from [timqian](http://www.timqian.com/star-history/#facebook/react&angular/angular&vuejs/vue)
 
![Angular 7 vs React vs Vue](https://i.imgur.com/Up8mhY9.png)

[npm trends](http://www.npmtrends.com/angular-vs-react-vs-vue-vs-@angular/core) is a website that displays the number of downloads for npm packages and compare between them. This is graph for Angular vs React and Vue:
 ![Angular vs React vs Vue](https://i.imgur.com/G4OLLHx.png)
      

## <a name="Angular_7_Concepts">Angular 8 Concepts</a>

Angular is a component based framework with many new concepts that encourages DRY and separation of concerns principles. In this section, we'll briefly explain the most common used concepts in Angular.
 
### Components

Components are the basic building of an Angular 8 application. A component controls a part of app's UI. It's encapsulated and reusable.

You can create a component by creating a TypeScript class and decorate with the `@Component` decorator available from the Angular core package ( `@angular/core`)

A component's view is built using a unique HTML template associated with the component's class and also a stylesheet file that's used to style the HTML view.

This is an example of an Angular component:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular7-router-demo';
}
```
We start by importing `Component` from the Angular Core package and we use it to decorate a TypeScript class.
 
The `@Component` decorator takes some meta information about the component:

- `selector`: It's used to call the component from an HTML template e.g. `<app-component></app-component>` just like any other HTML tag.
- `templateUrl`: It' used to specify the relative path to an HTML file that will be used as the component's template 
- `styleUrls`: It's an array that specifies one or more stylesheets that can be used to style the component's view.

An Angular's component has a life-cycle from it's creation to destruction. There are many events that you can listen to for executing code at these events.


### Services

Angular services are singleton TypeScript classes that has only one instance throughout the app and its lifetime. They provide methods that maintain data from the start of the application to its end. 

A service is used to encapsulate the business logic that can be repeated in mu areas of your code. This helps the developers to follow the DRY (Don't Repeat Yourself) software concept. 

The service can be called by components and even other services in the app. It's injected in the component's constructor via Dependency Injection.

Services are used to achieve DRY and separation of concerns into an Angular application. Along with components, they help make the application into re-usable and maintainable pieces of code that can be separated and even used throughout other apps.

Let's suppose that your application has many components that need to fetch data from a remote HTTP resource. 

If you are making and HTTP call to fetch the remote resource from a server in your component. This means that each component is repeating the similar code for getting the same resource. Instead, you can use a service that encapsulates the part of the code that only deals with fetching the remote resources (The server address and the specific resource to fetch can be passed via parameters to a service method). Then we can simply inject the service wherever we want to call the fetching logic.  This is what's called **Separation of Concerns**  that states that components are not responsible for doing a specific tasks (in our case fetch data), instead a service can do the task and pass data back to the components.

## <a name="Angular_7_Libraries">Angular 8 Libraries</a>

Angular 8 provides the same libraries as the previous versions. Let's see the most important ones: 

### HttpClient

Angular has its own powerful HTTP client that can be used to make calls to remote API servers so you don't need to use external libraries like Axios for example or even the standard Fetch API. In fact, the HttpClient is based on the old [`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) interface available in all major browsers.

HttpClient is an Angular Service that's available from the `@angular/common/http` 
### Angular Router

The Angular router is a powerful client-side routing library that allows you to add build SPAs or Single Page Apps. It provides advanced features such as multiple router outlets, auxiliary paths and nested routing.

Angular 8 didn't add much features to the router, except for dynamic imports for lazy-loaded modules.
  
### Angular Forms

Angular provides developers with powerful APIs to create and work with forms and two approaches that you can choose from when you are dealing with forms: **Template-based** and **model-based or reactive** forms.

Again Angular 8, didn't add  any features to the forms APIs.
 
### Angular Material

[Angular Material](https://material.angular.io) is a modern UI library based on Google's Material Design spec which provides common internationalized and themable UI components that work across the web, mobile and desktop. It's built by the Angular team and integrate well with Angular ecosystem.

In Angular 8, you can use CLI  `ng add`  command for quickly add the required dependencies and configure Material into your project:

```bash
ng add @angular/material
```

Angular 7 has added new features to this library including drag and drop support so you don't need to use an external library anymore and also virtual scrolling which allows you to efficiently scroll large set of items without performance issues, particualrly on mobile devices.

## <a name="Conclusion">Conclusion</a>

Thanks to **Angular CLI 8**, you can get started with Angular 8 by generating a new project quickly with a variety of flags to customize and control the generation process.

As a recap, we have seen different ways to create a new Angular 8 project.

We have also seen the new features of all Angular versions up until v8 such as `ng add`, `ng update`, Angular Schematics, Angular Elements, CLI Prompts, CLI Budgets and the minimal CLI flag etc.

We’ve generated a new Angular 8 project and seen the different CLI commands to serve, build and work with our project.

Check out the next tutorials:

- [Angular 7|6 Tutorial Course: CLI, Components, Routing & Bootstrap 4](https://www.techiediaries.com/angular-course),
- [Angular 7|6 Tutorial Course: Angular NgModules (Feature and Root Modules)](https://www.techiediaries.com/angular-course-modules),
- [Angular 7|6 Tutorial Course: Nested Router-Outlet, Child Routes & forChild()](https://www.techiediaries.com/angular-course-child-routes),
- [Angular 7|6 Tutorial Course: Authentication with Firebase (Email & Password)](https://www.techiediaries.com/angular-course-firebase-authentication),
- [Angular 7|6 Tutorial Course: Securing the UI with Router Guards and UrlTree Parsed Routes](https://www.techiediaries.com/angular-course-router-guards)
