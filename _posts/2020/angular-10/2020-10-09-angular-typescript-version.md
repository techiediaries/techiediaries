---
layout: bpost
title: "Angular 10 TypeScript Version"
image: "images/content/angular.png"
excerpt: "In this tutorial, we'll learn how to check and update the TypeScript version in your Angular 10 project"
date: 2020-10-09
tags : [angular , javascript]
---

In this tutorial, we'll learn how to check and update the TypeScript version in your Angular 10 project.

Angular is based on TypeScript instead of plain JavaScript. TS provides types and OOP constructs on top of JS but it doesn't run in the browser instead gets compiled in the developer's machine to JS before it can be shipped to production and executed in a web browser.

Angular 9 shipped with TypeScript 3.7 while Angular 10 came with TypeScript 3.8.

TS requires some configuration files such as the `tsconfig.json` file which contains various settings to configure the compiler but thanks to Angular CLI, you can scaffold a new project with TS pre-configured and start writing your code without dealing with any complexities related to the front-end development tooling.

Each new version of TypeScript comes packed with many new features that you can use to simply your coding and development journey.
  
## What's TypeScript?

TypeScript is a superset of JavaScript developed and maintained by Microsoft. It adds strong types, better error checking, type safety and integrations with code editors and IDEs which make developer's lives easier when developing large JS apps that scale. 

TS is the primary language for Angular 2+ application development which make writing large apps easier than Angular.JS, the previous version that was based on JS. 

Since web browsers can't execute TypeScript directly. It must be “transpiled” into JavaScript using the _tsc_ compiler, which needs to be first configured. This step is done in the developer's machine before the app runs in the production environment.

Even if TypeScript is configured by default in your Angular projects generated with Angular CLI, it's important to understand some aspects of TypeScript configuration and the TypeScript configuration files such as:

-   `tsconfig.json` which contains configuration options for the TypeScript compiler in a JSON format.
-   `typings` which are TypesScript declaration files.

## TypeScript Configuration File

Before using TypeScript in your Angular projects, you'll need to add a configuration file called `tsconfig.json` which tells the TypeScript compiler how it should generate the JavaScript files. 

For example, the Angular framework makes extensive use of decorators, for various artifacts like components, services and modules, which are still an experimental feature of TS, therefore we need to tell the compiler to makes use of this experimental feature in our project.  

If you used the Angular CLI to generate your project, the `tsconfig.json` file should be created at the root folder of the project.

You can learn more about the `tsconfig.json` file from the official [TypeScript docs](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html).

This a typical  `tsconfig.json` file for an Angular 10 project:

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "module": "esnext",
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "es2015",
    "lib": [
      "es2018",
      "dom"
    ]
  },
  "angularCompilerOptions": {
    "fullTemplateTypeCheck": true,
    "strictInjectionParameters": true
  }
}
```

You can see that Angular adds some configuration options, under the `angularCompilerOptions` entry, designed for its own Ahead-Of-Time compiler. This is not of the standard TypeScript configuration file.

The `angularCompilerOptions` entry is designed to supply [configuration options](https://angular.io/guide/angular-compiler-options)  when you use [AOT compilation](https://angular.io/guide/aot-compiler). You can control how your application gets compiled by specifying _template_ compiler options in the `tsconfig.json` file.

The template options object, `angularCompilerOptions`, is a sibling to the `compilerOptions` object that supplies standard options to the TypeScript compiler.

## How to Get the TypeScript Version Used in your Angular Project?

Let's now see how to get the version of TypeScript installed in your Angular 10 project and update it to the latest version.

You have many ways to check the version of typescript.

You can open the `package.json` file of your Angular project and check the `devDependencies` node. It should contain typescript version used:

```json
"typescript": "^3.8.0",
```

You can also check the version of the terminal using the following command:

```bash
tsc -v
```

This will display the globally installed version of typescript.

You can also check the version of typescript used in your project version, by navigating to the **`node_modules\.bin\`** folder and run the following command:

```bash
./tsc -v
```

Finally, you can also use Angular CLI to check the version of Typescript, as follows:

```bash
ng -v
```

This will out put the typescript version and the versions of the other dependencies:

```bash
Angular CLI: 10.0.5
Node: 12.14.0
OS: linux x64

Angular: 10.0.8
... animations, common, compiler, compiler-cli, core, forms
... platform-browser, platform-browser-dynamic, router
Ivy Workspace: Yes

Package                           Version
-----------------------------------------------------------
@angular-devkit/architect         0.1000.5
@angular-devkit/build-angular     0.1000.5
@angular-devkit/build-optimizer   0.1000.5
@angular-devkit/build-webpack     0.1000.5
@angular-devkit/core              10.0.5
@angular-devkit/schematics        10.0.5
@angular/cli                      10.0.5
@ngtools/webpack                  10.0.5
@schematics/angular               10.0.5
@schematics/update                0.1000.5
rxjs                              6.5.5
typescript                        3.9.7
webpack                           4.43.0
```