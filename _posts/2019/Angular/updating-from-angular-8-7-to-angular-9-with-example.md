---
layout: post
title: "Updating from Angular 7/8 to Latest Angular 9 Version With Step By Step Example"
image: "images/content/angular.png"
excerpt: "In this tutorial, we'll see step by step how to upgrade an example Angular 7 project to the latest Angular 9 version" 
tags : [angular , angular9] 
---


In this tutorial, we'll see step by step how to upgrade an example Angular 7 project to the latest [Angular 9](https://www.techiediaries.com/angular/ionic-chat-ui-jwt-auth/) version. 

- Step 1 - Cloning the Project from GitHub
- Step 2 - Identifying the Used Angular Version in The Project 
- Step 3 - Identifying how To Upgrade
- Step 4 - Updating from Angular 7 to v8
- Step 5 - Updating from Angular v8.2.3 to The Latest Angular 9 Pre-Release Version
- Step 6 - Serving the App


## Why Upgrade to Angular 9

Why upgrading to Angular 9?

Angular comes with the Ivy renderer by default which provides increased performance and smaller bundles but also [many new features that you can check from here](https://www.techiediaries.com/angular-features). 

Also updating your project to the latest version provides bug fixes and less security issues. 

## Steps for Upgrading from Angular 7 to Angular 9 

We have previously started a tutorial series for building a portfolio web application with Angular 7 and Firebase. Before we continue building our app, let's upgrade it to Angular 9.


## Step 1 - Cloning the Project from GitHub


Let's start with the first step in which we'll clone the Angular 7 project from the GitHub repository.

Open a new command-line interface and run the following command:

```bash
$ git clone https://github.com/techiediaries/angular-portfolio
```

Next, navigate to your project's folder and install the project's dependencies using the following commands:

```bash
$ cd angular-portfolio
$ npm install
```

## Step 2 - Identifying the Used Angular Version in The Project 

Head back to your command-line interface and run the following command:

```bash
$ ng version
``` 

You'll get the following output:

```bash
Your global Angular CLI version (9.0.0-rc.2) is greater than your local
version (7.1.4). The local Angular CLI version is used.

To disable this warning use "ng config -g cli.warnings.versionMismatch false".

Angular CLI: 7.1.4
Node: 10.16.3
OS: win32 ia32
Angular: 7.1.4
... animations, cli, common, compiler, compiler-cli, core, forms
... language-service, platform-browser, platform-browser-dynamic
... router

Package                           Version
-----------------------------------------------------------
@angular-devkit/architect         0.11.4
@angular-devkit/build-angular     0.11.4
@angular-devkit/build-optimizer   0.11.4
@angular-devkit/build-webpack     0.11.4
@angular-devkit/core              7.1.4
@angular-devkit/schematics        7.1.4
@ngtools/webpack                  7.1.4
@schematics/angular               7.1.4
@schematics/update                0.11.4
rxjs                              6.3.3
typescript                        3.1.6
webpack                           4.23.1

```

This indicates that the Angular CLI v7.1.4 is used in our project and that the local version is used instead of the global version  (v9.0.0-rc.2) that we already have installed on our system.

## Step 3 - Identifying how To Upgrade

The Angular team made upgrading much easier than before. You can get the commands that you need to run to update your project from an Angular version to another one by using the [Angular Update Guide](https://update.angular.io/).

Head to that interactive guide and specify 7.1.4 as the current version and the target version which is v9.0.0-rc.2 and click the **Show me how to update!** button

After specifying the versions, you'll get a warning saying **We do not recommend moving across multiple major versions.**  since we are moving from v7 to v9:

![](https://www.diigo.com/file/image/badcbccczodadadpoazeaaeeorb/Angular+Update+Guide.jpg)

We'll take this warning into consideration and we'll first upgrade our project from Angular 7 to Angular 8.

So change the target version to v8.0

It will show you a list of the things you need to do:

![](https://www.diigo.com/file/image/badcbccczodadaebcczeaaeepbc/Angular+Update+Guide.jpg)

![](https://www.diigo.com/file/image/badcbccczodadaeoqpzeaaeepee/Angular+Update+Guide.jpg)

> **Note**: The tool indicates that if we are using the legacy `HttpModule` and the `Http` service in our project, we need to switch to `HttpClientModule` and the `HttpClient` service but we are not making use of `Http` in this project. 



## Step 4 - Updating from Angular 7 to v8

Angular 8 uses TypeScript 3.4,  [read more about errors that might arise from improved type checking](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html).

Make sure you are using  [Node 10 or later](http://www.hostingadvice.com/how-to/update-node-js-latest-version/).

In you command-line interface run the following command:

```bash
$ ng update
``` 

This will analyze the `package.json` file of your project and give you a list of packages to update with the  required commands:

```bash
    We analyzed your package.json, there are some packages to update:

      Name                               Version                  Command to update
     --------------------------------------------------------------------------------
      @angular/cli                       7.1.4 -> 8.3.19          ng update @angular/cli
      @angular/core                      7.1.4 -> 8.2.14          ng update @angular/core
      rxjs                               6.3.3 -> 6.5.3           ng update rxjs


    There might be additional packages that are outdated.
    Run "ng update --all" to try to update all at the same time.
```

So, let's start by updating the core framework and the CLI to **v8.2.14** and **v8.3.19** respectively using the following command:

```bash
$ ng update @angular/cli @angular/core
```
 
This will update the core framework and CLI to Angular 8:

```bash
    Updating package.json with dependency @angular/compiler @ "8.2.14" (was "7.1.4")...
    Updating package.json with dependency @angular/language-service @ "8.2.14" (was "7.1.4")...
    Updating package.json with dependency @angular/forms @ "8.2.14" (was "7.1.4")...
    Updating package.json with dependency @angular/platform-browser @ "8.2.14" (was "7.1.4")...
    Updating package.json with dependency @angular/platform-browser-dynamic @ "8.2.14" (was "7.1.4")...
    Updating package.json with dependency @angular/cli @ "8.3.19" (was "7.1.4")...
    Updating package.json with dependency @angular/animations @ "8.2.14" (was "7.1.4")...
    Updating package.json with dependency @angular/common @ "8.2.14" (was "7.1.4")...
    Updating package.json with dependency zone.js @ "0.9.1" (was "0.8.26")...
    Updating package.json with dependency rxjs @ "6.5.3" (was "6.3.3")...
    Updating package.json with dependency @angular/router @ "8.2.14" (was "7.1.4")...
    Updating package.json with dependency @angular/core @ "8.2.14" (was "7.1.4")...
    Updating package.json with dependency @angular/compiler-cli @ "8.2.14" (was "7.1.4")...
    Updating package.json with dependency typescript @ "3.5.3" (was "3.1.6")...
``` 

> **Note**: On Windows I had to run `npm install` after `ng update @angular/cli @angular/core` to install the new versions of the dependencies.

Now, let's check the new version of Angular using the following command:

```bash
$ ng --version
``` 

This is the output of the command:

```bash
Angular CLI: 8.3.19
Node: 10.16.3
OS: win32 ia32
Angular: 8.2.14
... animations, common, compiler, compiler-cli, core, forms
... language-service, platform-browser, platform-browser-dynamic
... router

Package                           Version
-----------------------------------------------------------
@angular-devkit/architect         0.11.4
@angular-devkit/build-angular     0.11.4
@angular-devkit/build-optimizer   0.11.4
@angular-devkit/build-webpack     0.11.4
@angular-devkit/core              7.1.4
@angular-devkit/schematics        8.3.19
@angular/cli                      8.3.19
@ngtools/webpack                  7.1.4
@schematics/angular               8.3.19
@schematics/update                0.803.19
rxjs                              6.5.3
typescript                        3.5.3
webpack                           4.23.1
```

You can see that we have successfully updated Angular CLI to  **v8.3.19**, Angular to **v8.2.14** and different core packages. Even TypeScript is bumped to **v3.5.3**.


## Step 5 - Updating from Angular v8.2.3 to The Latest Angular 9 Pre-Release Version

After updating our project to Angular 8, we will proceed to update it to the latest Angular 9 version. 

Head back to your terminal and run the `ng update` command again. You will get the following output:

```bash
Using package manager: 'npm'
Collecting installed dependencies...
Found 32 dependencies.
    We analyzed your package.json and everything seems to be in order. Good work!
```
This is because Angular 9 is still in RC version ie in pre release but the tool gives only stable versions.   

If you want to get pre-release versions, you need to use the `--next` flag as follows:

```bash
$ ng update --next
```
And this is the output:

```bash
...
Name                               Version                  Command to update--------------------------------------------------------------------------------
@angular/cli                       8.3.19 -> 9.0.0-rc.2     ng update @angular/cli --next
@angular/core                      8.2.14 -> 9.0.0-rc.2     ng update @angular/core --next
```

Next, you can update to the latest versions of the CLI and core framework using the following command:

```bash
$ ng update @angular/cli @angular/core --next  
```

In my case, I had an error saying **Repository is not clean. Please commit or stash any changes before updating**.



It seems this is a kind of a[bug](https://stackoverflow.com/questions/56773528/repository-is-not-clean-please-commit-or-stash-any-changes-before-updating-in-a) that you can solve using the `--allow-dirty` flag:

```bash
$ ng update @angular/cli @angular/core --next --allow-dirty
```

Our project is successfully updated to Angular 9. This is the output of the command:

```bash
Using package manager: 'npm'
Collecting installed dependencies...
Found 32 dependencies.
Fetching dependency metadata from registry...
    Updating package.json with dependency @angular/cli @ "9.0.0-rc.2" (was "8.3.19")...
    Updating package.json with dependency @angular/core @ "9.0.0-rc.2" (was "8.2.14")...
    Updating package.json with dependency @angular-devkit/build-angular @ "0.900.0-rc.2" (was "0.11.4")...
    Updating package.json with dependency @angular/compiler-cli @ "9.0.0-rc.2" (was "8.2.14")...
    Updating package.json with dependency @angular/animations @ "9.0.0-rc.2" (was "8.2.14")...
    Updating package.json with dependency @angular/language-service @ "9.0.0-rc.2" (was "8.2.14")...
    Updating package.json with dependency tslib @ "1.10.0" (was "1.9.3")...
    Updating package.json with dependency @angular/forms @ "9.0.0-rc.2" (was "8.2.14")...
    Updating package.json with dependency @angular/platform-browser @ "9.0.0-rc.2" (was "8.2.14")...
    Updating package.json with dependency @angular/platform-browser-dynamic @ "9.0.0-rc.2" (was "8.2.14")...

    Updating package.json with dependency @angular/common @ "9.0.0-rc.2" (was "8.2.14")...
    Updating package.json with dependency zone.js @ "0.10.2" (was "0.9.1")...
    Updating package.json with dependency @angular/router @ "9.0.0-rc.2" (was "8.2.14")...
    Updating package.json with dependency @angular/compiler @ "9.0.0-rc.2" (was "8.2.14")...
    Updating package.json with dependency typescript @ "3.6.4" (was "3.5.3")...
UPDATE package.json (1400 bytes)
√ Packages installed successfully.
** Executing migrations of package '@angular/cli' **

> Angular Workspace migration.
  Update an Angular CLI workspace to version 9.
UPDATE angular.json (4186 bytes)
UPDATE tsconfig.json (457 bytes)
UPDATE src/tsconfig.app.json (170 bytes)
UPDATE src/tsconfig.spec.json (274 bytes)
UPDATE package.json (1403 bytes)
√ Packages installed successfully.
  Migration completed.

> Lazy loading syntax migration.
  Update lazy loading syntax to use dynamic imports.
  Migration completed.

** Executing migrations of package '@angular/core' **

> Static flag migration.
  Removes the `static` flag from dynamic queries.
  As of Angular 9, the "static" flag defaults to false and is no longer required for your view and content q
ueries.
  Read more about this here: https://v9.angular.io/guide/migration-dynamic-flag
  Migration completed.

> Missing @Injectable migration.
  In Angular 9, enforcement of @Injectable decorators for DI is a bit stricter.
  Read more about this here: https://v9.angular.io/guide/migration-injectable
  Migration completed.

> ModuleWithProviders migration.
  In Angular 9, the ModuleWithProviders type without a generic has been deprecated.
  This migration adds the generic where it is missing.
  Read more about this here: https://v9.angular.io/guide/migration-module-with-providers
  Migration completed.

> Renderer to Renderer2 migration.
  As of Angular 9, the Renderer class is no longer available.
  Renderer2 should be used instead.
  Read more about this here: https://v9.angular.io/guide/migration-renderer
  Migration completed.

> Undecorated classes with decorated fields migration.
  As of Angular 9, it is no longer supported to have Angular field decorators on a class that does not have
an Angular decorator.
  Read more about this here: https://v9.angular.io/guide/migration-undecorated-classes
  Migration completed.

> Undecorated classes with DI migration.
  As of Angular 9, it is no longer supported to use Angular DI on a class that does not have an Angular deco
rator.
  Read more about this here: https://v9.angular.io/guide/migration-undecorated-classes
  Migration completed.


Your project has been updated to Angular version 9!
For more info, please see: https://v9.angular.io/guide/updating-to-version-9
```

## Step 6 - Serving the App

You can see if your application still works by simply serving it:

```bash
$ ng serve
```  

## Conclusion

In this tutorial, we've seen step by step how to update our old Angular 7 project to Angular 8 and finally to Angular 9.

 

