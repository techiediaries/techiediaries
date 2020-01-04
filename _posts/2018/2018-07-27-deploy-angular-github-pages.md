---
layout: post
title: "Deploying Angular 6|7 Apps to Github Pages"
image: "images/content/deploy-angular-github-pages.png"
excerpt: "In this tutorial we'll see how to deploy Angular 6 apps to Github pages" 
tags : [angular ] 
---

Throughout this tutorial, you'll learn to deploy an Angular 6|7 application to GitHub Pages.

Github pages allows you to host static websites and web apps for free using the same workflow you use to host repositories, you just commit and push. You can even associate a custom top level domain name to your website or web app by adding a *CNAME* file.

In this tutorial we'll see how to host an Angular 6 web application using Github Pages. Let's get started.

## Prerequisites

You need to have Node.js, NPM and Angular CLI 6 installed, you also need to generate a new Angular 6 project using Angular CLI 6 or you can also apply this to an existing project that you want to deploy to Github Pages.

Next you also need to install a package which makes the process of deploying to Github pages easy.

```bash
$ npm install -g angular-cli-ghpages
```

## Building the Angular 6 Application

The next step is to build your web application for production and with the base href location set to your Github Page URL.

```bash
$ ng build --prod --base-href "https://<YOUR_GITHUB_USER-NAME>.github.io/<YOUR_REPO_NAME>/"
```

## Deploying to Github Pages 

Now you are ready to deploy your web app to Github pages. Thanks to [angular-cli-ghpages](https://github.com/angular-buch/angular-cli-ghpages
) this is a one command process so just run:

```bash
$ ngh
```

You web app will be depoyed to `https://username.github.io/app-name/`.

## Conclusion

In this short tutorial, we've seen how we can quickly deploy Angular 6 applications to GitHub Pages.


    