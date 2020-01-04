---
layout: post
title: "How to Check Installed Angular CLI Version & Update to Latest Angular 9 Version Globally"
image: "images/content/angular.png"
excerpt: "In this quick tutorial, we'll see how to check the currently-installed Angular CLI version and update it to the latest Angular 9" 
tags : [angular , angular9] 
---


In this quick tutorial, we'll see how to check the currently-installed Angular CLI version and update it to the latest Angular 9 globally.


## Step 1 - Checking Angular CLI Version  

In the first step, we'll check for the current version of Angular CLI installed on our local development machine. Open a new command-line interface and run one of the following commands:

```bash
$ ng --version
$ ng v
$ npm list --global --depth 0
```

The `ng --version`  command outputs the details of the installed Angular CLI version and the versions of the Angular packages:

```bash
Angular CLI: 8.3.19
Node: 10.16.3
OS: win32 ia32
Angular:
...

Package                      Version
------------------------------------------------------
@angular-devkit/architect    0.803.19
@angular-devkit/core         8.3.19
@angular-devkit/schematics   8.3.19
@schematics/angular          8.3.19
@schematics/update           0.803.19
rxjs                         6.4.0

```


The  `npm list --global --depth 0`  prints a list of all the packages installed on our machine at the top level. This is the output in my machine: 

```bash
+-- @angular/cli@8.3.19
+-- create-react-app@3.1.1
+-- expo-cli@3.2.3
+-- now@16.2.0
`-- npm@6.9.0
```

The `ng v` command is equivalent to `ng --version`.

So we have `@angular/cli v8.3.19` installed, now how we can update it to the latest Angular 9 .

## Step 2 - Updating Angular CLI to Angular 9 Version

To update the Angular CLI to the latest version 9, first you need to update to the latest Angular 8:

```bash
$ npm install --no-save @angular/cli@^8.3.19
```
    
After that run the following command to update Angular CLI to Angular 9
    
```bash
 $ ng update @angular/cli @angular/core --next
```

Since Angular 9 is in RC version, you'll need to use the `--next` flag. 

## Step 3 - Updating Angular CLI Version Globally

To update Angular CLI version globally in your system use the following commands

```bash
$ npm uninstall -g angular-cli
$ npm cache verify
$ npm install -g @angular/cli@latest
```

You can also install a specific version using the following command:

```bash
$ npm install -g @angular/cli@9.0.0-rc.2
```

Here I'm installing Angular CLI v9.0.0-rc.2, the latest version as of this writing.

This is the output of `ng v`:

```bash

Angular CLI: 9.0.0-rc.2
Node: 10.16.3
OS: win32 ia32
Angular:
...

Package                      Version
------------------------------------------------------
@angular-devkit/architect    0.900.0-rc.2
@angular-devkit/core         9.0.0-rc.2
@angular-devkit/schematics   9.0.0-rc.2
@schematics/angular          9.0.0-rc.2
@schematics/update           0.900.0-rc.2
rxjs                         6.5.3
```
