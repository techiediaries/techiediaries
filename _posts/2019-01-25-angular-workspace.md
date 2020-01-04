---
layout: post
title: "What is an Angular 6|7 Workspace?"
image: "images/content/angular.png"
excerpt: "What is an Angular 6|7 Workspace?" 
tags : [angular] 
---

An [Angular workspace](https://angular.io/guide/glossary#workspace) allows you to organize your whole web application into smaller and multiple projects. Most small Angular apps will only contain one or two projects per workspace. For example, when you generate an Angular project with Angular CLI, the workspace contains a project for the actual app and a project for e2e tests.    

The [Angular docs](https://angular.io/guide/file-structure) describes a project as:

> A set of files that comprise a standalone app, a library, or a set of end-to-end (e2e) tests.   

You can create two types of projects: **Application** or **Library**.

Just like the typical concept of a library in software development, a library refers to a set of reusable code that can be shared between many projects.  Angular CLI also makes it easy to publish your library to a central registry like npm to be used by other developers.

The **Application** type refers to standalone Angular application. 

Workspaces are first introduced in Angular 6 and got some updates in Angular 7.

## Angular CLI 7: Create Empty Workspaces

Angular CLI 7 introduced a new CLI option (`--create-application`) that you can add to your `ng new` command to create an empty workspace. This is especially useful if you only intend to create a library that you can import in other projects ot publish for other developers.

The `--create-application` option is used with the `ng new` command which can take either true or false. By default it's set true so whenever you create a new project it comes with the initial application. You can also set `--create-application` to **false** to instruct the CLI to not create the initial Angular application in the workspace. 

Let's now see this in practice!

Make sure you have Angular CLI 7 installed on your system then open your terminal and run the following command:

```bash
$ ng new angular-apps --create-application=false
```

Angular CLI will still prompt you if you ? **Would you like to add Angular routing?** and **Which stylesheet format would you like to use?** 

But will only generate these files:
 
- `angular-apps/README.md` for introductory documentation,
- `angular-apps/angular.json` for the CLI configuration for build, serve, and test tools of all projects in the workspace,
- `angular-apps/package.json` for npm configuration. Check out [npm documentation](https://docs.npmjs.com/files/package.json) for more details,
- `angular-apps/tsconfig.json` for [TypeScript](https://www.typescriptlang.org/) configuration,
- `angular-apps/tslint.json` for [TSLint](https://palantir.github.io/tslint/) configuration,
- `angular-apps/.editorconfig` for the configuration of code editors. See [EditorConfig](https://editorconfig.org/),
- `angular-apps/.gitignore` for specifying files that should be ignored by [Git](https://git-scm.com/). 

The CLI will also install the Angular dependencies into a `node_modules` folder.

Head back to your terminal, navigate in your Angular workspace:

```bash
$ cd angular-apps
```

Next, [generate an app/project](https://angular.io/cli/generate#application) using the following command:

```bash
$ ng generate application admin
```

This will generate two projects, `admin` and `admin-e2e` (for end to end tests) into a `projects` folder.

You can also [generate libraries](https://angular.io/guide/creating-libraries) in your workspace using this command:

```bash
$ ng generate library ngx-qrcode
```

`ngx-qrcode` is the name of the library. It will be also added inside the `projects` folder just like the other applications.

After generating multiple applications with no default application for your workspace, you can generate modules, service, components and other artifacts into specific projects using the `--project` option.

Let's for example generate a service inside the `admin` project:

```bash
$ ng generate service auth --project=admin
```

Two `projects/admin/src/app/auth.service.spec.ts` and `projects/admin/src/app/auth.service.ts` files will be generated.

## Serving Specific Apps in Your Workspace

You can serve a specif application in your workspace using the following command:

```bash
$ ng serve admin
```

Where `admin` is the name of the application that you want to serve.


##  Conclusion

In this quick post, we've seen what is an Angular Workspace and how to create an empty workspace, how to create applications and libraries into the Workspace.
