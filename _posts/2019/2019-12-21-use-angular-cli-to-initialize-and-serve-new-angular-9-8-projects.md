---
layout: post
title: "Angular 9/8 How-To: Use Angular CLI to Initialize & Serve New Angular Projects"
image: "images/content/angular-by-example-httpclient-get.png"
excerpt: "In this quick how-to tutorial, we'll see how to use Angular CLI v9, as of this writing, to generate a project and serve it locally using a live-reload development server." 
tags : [angular, angular-how-tos, angular9] 
---

In this quick how-to tutorial, we'll see how to use Angular CLI v9, as of this writing, to generate a project and serve it locally using a live-reload development server. 

## Step 1  — Checking the Angular CLI Version
 
After installing Angular 9 CLI, you can run many commands. Let’s start by checking the version of the installed CLI:

```bash
$ ng version

```

You should get a similar output:

```bash
Angular CLI: 9.0.0-rc.2
Node: 10.16.3
OS: win32 ia32
Angular: <error>
... animations, cli, common, compiler, compiler-cli, core, forms
... language-service, platform-browser, platform-browser-dynamic
... router

Package                         Version
---------------------------------------------------------
@angular-devkit/architect       0.900.0-rc.2 (cli-only)
@angular-devkit/build-angular   <error>
@angular-devkit/core            9.0.0-rc.2 (cli-only)
@angular-devkit/schematics      9.0.0-rc.2 (cli-only)
@schematics/angular             9.0.0-rc.2 (cli-only)
@schematics/update              0.900.0-rc.2 (cli-only)
rxjs                            6.5.3 (cli-only)
typescript                      3.6

```

## Step 2  — Displaying the Help of Angular 9 CLI

A second command that you might need to run is the  **_help_**  command:

```bash
$ ng help

```

To get a complete usage help.

![Angular 7 tutorial - CLI help](https://www.techiediaries.com/ezoimgfmt/i.imgur.com/TE89cfg.png?ezimgfmt=rs:652x387/rscb1/ng:webp/ngcb1)

**Angular CLI Usage ~ ng help**

The CLI provides the following commands:

-   `add`: Adds support for an external library to your project.    
-   `build (b)`: Compiles an Angular app into an output directory named  `dist/`  at the given output path. Must be executed from within a workspace directory.
-   `config`: Retrieves or sets Angular configuration values.
-   `doc (d)`: Opens the official Angular documentation (angular.io) in a browser, and searches for a given keyword.    
-   `e2e (e)`: Builds and serves an Angular app, then runs end-to-end tests using Protractor.    
-   `generate (g)`: Generates and/or modifies files based on a schematic.    
-   `help`: Lists available commands and their short descriptions.    
-   `lint (l)`: Runs linting tools on Angular app code in a given project folder.   
-   `new (n)`: Creates a new workspace and an initial Angular app.    
-   `run`: Runs a custom target defined in your project.   
-   `serve (s)`: Builds and serves your app, rebuilding on file changes.    
-   `test (t)`: Runs unit tests in a project.    
-   `update`: Updates your application and its dependencies. See  [https://update.angular.io/](https://update.angular.io/)    
-   `version (v)`: Outputs Angular CLI version.    
-   `xi18n`: Extracts i18n messages from source code.
    

## Step 3  —  Generating a New Angular 9 Project

You can use Angular CLI  to quickly generate your Angular 9 project by running the following command in your terminal:

```bash
$ ng new frontend
```

> frontend  _is the name of the project. You can — obviously— choose any valid name for your project. Since we’ll create a full-stack application I’m using_  frontend  _as a name for the front-end application._

As mentioned earlier, the CLI will ask you if  _Would you like to add Angular routing? You can answer by y (Yes) or No which is the default option. It will also ask you about the stylesheet format, you want to use (such as CSS). Choose your options and hit  `Enter`  to continue.

![Angular 8 project structure](https://www.techiediaries.com/ezoimgfmt/i.imgur.com/vQaSm5I.png?ezimgfmt=rs:316x265/rscb1/ng:webp/ngcb1)

After that; you'll have your project created with a directory structure and a bunch of configurations and code files. Mostly in TypeScript and JSON formats. Let's see the role of each file:

-   `/e2e/`: This folder contains end-to-end (simulating user behavior) tests of the website.
-   `/node_modules/`: All 3rd party libraries are installed to this folder using  `npm install`.
-   `/src/`: It contains the source code of the application. Most work will be done here.
    -   `/app/`: It contains modules and components.
    -   `/assets/`: It contains static assets like images, icons and styles etc.
    -   `/environments/`: It contains environment (production and development) specific configuration files.
    -   `browserslist`: Needed by autoprefixer for CSS support.
    -   `favicon.ico`: The favicon.
    -   `index.html`: The main HTML file.
    -   `karma.conf.js`: The configuration file for Karma (a testing tool)  
        
    -   `main.ts`: The main starting file from where the  _AppModule_  is bootstrapped.
    -   `polyfills.ts`: Polyfills needed by Angular.
    -   `styles.css`: The global stylesheet file for the project.
    -   `test.ts`: This is a configuration file for Karma
    -   `tsconfig.*.json`: The configuration files for TypeScript.
-   `angular.json`: It contains the configurations for CLI
-   `package.json`: It contains basic information of the project (name, description and dependencies etc.)
-   `README.md`: A Markdown file that contains a description of the project.
-   `tsconfig.json`: The configuration file for TypeScript.
-   `tslint.json`: The configuration file for TSlint (a static analysis tool)

## Step 4  —  Serving your Project with a Development Server

Angular CLI provides a complete tool-chain for developing front-end apps on your local machine. As such, you don’t need to install a local server to serve your project — you can simply, use the  `ng serve`  from your terminal to serve your project locally. First navigate inside your project's folder and run the following commands:

```bash
$ cd frontend
$ ng serve

```

You can now navigate to the  `[http://localhost:4200/](http://localhost:4200/)`  address to start playing with your front-end application. The page will automatically live-reload if you change any source file.

You can also use different host address and port other than the default HTTP host and port by providing new options. For example:

```bash
$ ng serve --host 0.0.0.0 --port 8080

```

##  Step 5 —  Generating Angular Artifacts: Components, Directives, Pipes, Services and Modules

To bootstrap your productivity, Angular CLI provides a  `generate`  command to quickly generate basic Angular constructs such as components, directives, pipes, services and modules:

```bash
$ ng generate component account-list
```

> account-list is the name of the component. You can also use just  **g**  instead of  **generate**  The Angular CLI will automatically add reference to  `components`,  `directives`  and  `pipes`  in the  `app.module.ts`.

If you want to add your component, directive or pipe to another module — other than the main application module i.e  `app.module.ts`—for example to a feature module, you can simply prefix the name of the component with the module name and a slash — like a path.

```bash
$ ng g component account-module/account-list

```

> account-module is the name of an existing module.
