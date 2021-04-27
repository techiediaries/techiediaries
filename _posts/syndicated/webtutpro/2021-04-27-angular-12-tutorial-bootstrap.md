---
layout: post
title:  "Angular 12: Tutorial and Example (Bootstrap)"
date:   2021-04-27
tags: [angular]
canonical: "https://www.webtutpro.com/angular-12-tutorial-and-example-bootstrap-fa2870f350c3"  
---

In this tutorial, we’ll quickly see how you can generate an Angular 12 project using the official CLI (Command-Line Interface) and then create an application for demonstrating basic concepts of Angular like importing and using built-in modules, creating components and services, and fetching data from a REST API server using HttpClient, the alternative/equivalent to Axios or the Fetch API for Angular developers.

Parts in this series:

-   Angular 12: Tutorial and Example (This one)
-   [Angular 12: Install the CLI & Create a Project](https://www.webtutpro.com/angular-12-install-the-cli-create-a-project-8dfbc94f46b2)

![Angular 12 app from scratch](https://miro.medium.com/max/60/1*JawmLTwwBN_b3XnOLPetMw.jpeg?q=20)

![Angular 12 app from scratch](https://miro.medium.com/max/1000/1*JawmLTwwBN_b3XnOLPetMw.jpeg)

## Introducing Angular 12 and its New Features

Angular 12, which is an upgrade to Google’s popular TypeScript-based web framework, has reached a beta stage, at the time of writing this article, with a preliminary release now available.

Some  features in the beta include:

-   Implementing the  `[appendAll()](https://github.com/angular/angular/pull/20930)` [method on](https://github.com/angular/angular/pull/20930) `[HttpParams](https://github.com/angular/angular/pull/20930)`.
-   For forms,  [min and max validators](https://github.com/angular/angular/pull/39063)  are being introduced.
-   Exporting of a list of  [HTTP status codes](https://github.com/angular/angular/pull/23548).
-   Addition of a feature to the  [Angular Language Service that enables accessing the locations for components that use a template file](https://github.com/angular/angular/pull/40655).
-   The addition of  [diagnostics to suggest turning on strictTemplates](https://github.com/angular/angular/pull/40423), providing a way for the language server to retrieve compiler options diagnostics.
-   A  [patch adding an API to retrieve the template type check block](https://github.com/angular/angular/pull/39974)  for a template, if any, at a file location, and selection of the TS node in the TCB corresponding to the template node at which the request for a TCB was made. This will help with debugging.
-   The addition of  [command for getting components for a template file](https://github.com/angular/angular/pull/40655), for the language service.

You can consult the  [full list of changes](https://github.com/angular/angular/blob/master/CHANGELOG.md)  on GitHub.

## Angular 12 Prerequisites

Before start learning Angular, you need to have the following prerequisites:

-   Knowledge of JavaScript,
-   Familiarity with TypeScript (classes and decorators)
-   Node.js and npm installed on your development machine

We’ll be learning step by step how to build a working application that gets data from a third-party REST API. You’ll get articles including the term “frontend development” on the web and display them using Bootstrap 4.

You’ll learn to use Angular HttpClient to communicate with the API to fetch data and Bootstrap components to display data.

In the next part, we’ll learn how to  [generate a new Angular 12 project using the Angular CLI](https://www.webtutpro.com/angular-12-install-the-cli-create-a-project-8dfbc94f46b2), then we’ll add Bootstrap 4 in the third part.

This post is originally published at [WebTutPro](https://www.webtutpro.com/angular-12-tutorial-and-example-bootstrap-fa2870f350c3)
