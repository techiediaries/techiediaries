---
layout: post
title: "Deployment to Firebase Using Angular CLI 8.3+ in 5 Easy Steps"
image: "images/content/angular.png"
excerpt: "You have finally developed your Angular application and you are ready to deploy it to a hosting provider and show it to the world! But, you think, you still have to do so much work to host the application. Fortunately for you, that's not true any more thanks to the latest 8.3+ version of Angular CLI which added a new command to the Angular developer arsenal" 
tags : [angular, angular8]
---

You have finally developed your Angular application and you are ready to deploy it to a hosting provider and show it to the world! But, you think, you still have to do so much work to host the application. Fortunately for you, that's not true any more thanks to the latest 8.3+ version of Angular CLI which added a new command to the Angular developer arsenal, just like the `ng add` command introduced in Angular 7. 

The command is `ng deploy` and as you can guess, it allows you to deploy your Angular application from the command-line using Angular CLI. The command doesn't work out of the box as you need to use it with the `ng add` command to install a |CLI builder](https://angular.io/guide/cli-builder) that gives your project the required deployment capability to work with a specific hosting provider. This is quite expected since there are various providers, each one with its own configuration.

- For [Firebase hosting](https://firebase.google.com/docs/hosting) ng add [`@angular/fire`](https://npmjs.org/package/@angular/fire),
- [Azure](https://azure.microsoft.com/en-us/) ng add [`@azure/ng-deploy`](https://npmjs.org/package/@azure/ng-deploy)
- For [Now](https://zeit.co/now) add [`@zeit/ng-deploy`](https://npmjs.org/package/@zeit/ng-deploy)
- For [Netlify](https://www.netlify.com/) add [`@netlify-builder/deploy`](https://npmjs.org/package/@netlify-builder/deploy)
- For [GitHub pages](https://pages.github.com/) add [`angular-cli-ghpages`](https://npmjs.org/package/angular-cli-ghpages)

In this tutorial, we’ll create the production bundles of our Angular application and deploy it to Firebase using Angular CLI 8.3+.

We assume that you already have initialized a project with Angular CLI and that you have installed or updated your project to the latest version of Angular CLI.

How to automatically deploy your Angular project to Firebase? This can be done in 5 easy steps:

- Step 0 - Setting up your Firebase account and creating a project
- Step 1 - Adding the Firebase deployment capability to your Angular project
- Step 2 - Providing the authorization code to Firebase CLI
- Step 3 - Selecting a Firebase project
- Step 4 - Building & deploying your Angular project to Firebase

## Step 0 - Setting up your Firebase account and creating a project

In the first step, you need to set up a Firebase account and create a project.

Go to the [Getting started page](https://console.firebase.google.com/) and simply follow the instructions there to set up a Firebase account.

Once you have created a Firebase account, you need to create a project in Firebase's dashboard. Simply click on **Add project** to create a new project.

 

![](https://screenshots.firefoxusercontent.com/images/d0ea922a-1591-4dd8-8080-3b8f186f0c79.png)

 

A box will show up asking you to provide some information about your project. Provide a name for your project and click on the **CREATE PROJECT** button.

 

![](https://screenshots.firefoxusercontent.com/images/095d11c2-ddf5-45b2-90c3-ecd0a8dfea7e.png)


That's it! You have successfully created a Firebase account and project. Let's now head back to the Angular project.

## Step 1 - Adding the Firebase deployment capability to your Angular project

The first step is to navigate to your Angular project and add the deployment capability for your target hosting provider. In our case, it's Firebase.

Go to your terminal, and run the following command from the root of your project:

```bash
$ ng add @angular/fire
```

This will add the Firebase deployment capability to your project.

## Step 2 - Providing the authorization code to Firebase CLI

The CLI will ask you to **Paste authorization code here:****** and will open your default web browser and ask you to give Firebase CLI permissions to administer your Firebase account:

![](https://cdn-images-1.medium.com/max/800/0*5ciHDZUOAZM0iZGY)

After you log in with the Google account, you’ll be provided with the authorization code:

![](https://cdn-images-1.medium.com/max/800/0*RpakxP5MbwVOrbfw)

## Step 3 - Selecting a Firebase project

Next, you’ll be asked: **Please select a project: (Use arrow keys or type to search)**. You should have created a Firebase project before.

The CLI will create the `firebase.json` and `.firebaserc` files and update the `angular.json` file accordingly.

## Step 4 - Building & deploying your Angular project to Firebase

Finally, you can deploy your application to Firebase, using the following command:

```bash
$ ng deploy
```

The command will build your application (similarly to the `ng deploy --prod` command), and send the production assets to Firebase.

## Conclusion

Thanks to Angular CLI 8.3+, it's now easier than ever to deploy your Angular project to popular hosting and cloud platforms such as Firebase, GitHub, Now and Netlify. You can also search npm for the required package to target your platform, if one doesn't exist or if you're deploying to a self-managed server, you can either create a builder that allows you to use the `ng deploy` command or manually deploy your app. Check out [the official docs](https://angular.io/guide/deployment) for more information.