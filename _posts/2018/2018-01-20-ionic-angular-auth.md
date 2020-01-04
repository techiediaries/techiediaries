---
layout: post
title: "3+ Ways to Add Authentication to Ionic 3 (Angular 4|5) Applications"
image: "images/content/ionic.jpg"
excerpt: "In this article we'll look at the available options for adding authentication to your Ionic 3 application" 
tags : [ionic ,javascript, angular] 
---

**Let's look at the available options for adding authentication (login and registration) into your mobile application built using Ionic 3 and Angular 4|5 such as SaaS (Software As a Service) providers like Firebase, Auth0 and Okta, free third party (Single Sign On) services like Facebook, GitHub and Google, self hosted servers like Parse or building your own auth back-end with PHP, Python, Ruby or Node.js etc.**

More often than not, when building your Ionic 3 mobile application (for Android or iOS), NativeScript mobile app or your Angular 4|5 web application, you would want to authenticate users with a remote HTTP server before authorizing them to access some protected resource(s) or restful API endpoint(s). You would say that's authorization not authentication? You are correct! Authentication i.e verifying the identity of a user is the simplest form of authorization (You can of course build a more advanced authorization system but that's not required in most cases except for multi-tenant apps where there are many users with different roles for the same account). 

I recently intended to build an Ionic app with authentication so I looked for the available choices to build an authentication system with different features such as login, signup, user verification and password recovery via email etc. And found that there are many viable options from building your own hosted solution with a back-end technology, if you've got the required skills in some server side language such as PHP or Python (Django or Flask etc.) to hosted solutions (such as Firebase or Auth0) that allow you to build a back-end for your mobile/web applications with authentication, data storage and many extra features without the prior knowledge of a server side language, without reinventing the wheel and without hiring a back-end developer.

First of all, this article is not intended to show you how to create an Ionic 3 project since we have previously covered this in many tutorials.

With Ionic 3 and Angular you can literally build a fully fledged and complete mobile application for popular platforms such as Android, iOS and the Windows Universal Platform around these hosted services (we'll see them next) or around your own crafted back-end (but it's not that easy if you are not a skilled server side developer)  

In this article, we'll look briefly at different ways to build an authentication system in Ionic 3 and Angular 4 without in-depth details on how to use each option but I will add links for more detailed tutorials on specific technologies if they are available or update the article once I have time to write more tutorials. Also please feel free to ask for a specific tutorial or for more information using the comments area below or via twitter(**@techiediaries**).

## Adding User Authentication with SaaS/PaaS Services

[Wikipedia defines SaaS](https://en.wikipedia.org/wiki/Software_as_a_service) as:

> Software as a service is a software
> licensing and delivery model in which software is licensed on a
> subscription basis and is centrally hosted. It is sometimes
> referred to as "on-demand software",and was formerly referred to
> as "software plus services" by Microsoft. SaaS is typically
> accessed by users using a thin client via a web browser. SaaS has
> become a common delivery model for many business applications,
> including office software, messaging software, payroll processing
> software, DBMS software, management software etc.

So simply put, a SaaS is a software delivery model i.e a way to deliver software, to users, without downloading it from the Internet or copying it from a USB/CD medium and installing it in the local machine.
 
Also from [Wikipedia, here is the definition of PaaS](https://en.wikipedia.org/wiki/Platform_as_a_service)

> Platform as a Service (PaaS) or application platform as a Service
> (aPaaS) is a category of cloud computing services that provides a
> platform allowing customers to develop, run, and manage applications
> without the complexity of building and maintaining the infrastructure
> typically associated with developing and launching an app. PaaS can be
> delivered in two ways: as a public cloud service from a provider,
> where the consumer controls software deployment with minimal
> configuration options, and the provider provides the networks,
> servers, storage, operating system (OS), middleware (e.g. Java
> runtime, .NET runtime, integration, etc.), database and other services
> to host the consumer's application; or as a private service (software
> or appliance) inside the firewall, or as software deployed on a public
> infrastructure as a service.

A PaaS is different than SaaS because it provides developers with a whole platform to develop and run their software.

## Angular Authentication with Firebase (PaaS)

Firebase is a PaaS that provides developers with a back-end which has many features for building mobile applications. Firebase provides many essential services: 

* hosting and a real-time database: all your users get updates (like a broadcasting system) when the database is updated (with Create, Read, Update and Delete operations)
* user authentication and push notifications: you can easily add authentication to your app without building any server side logic
* client SDKs: SDKs provide quick and easy integration with different languages and platforms 
* analytics
* [Cloud Firestore](https://firebase.google.com/docs/firestore/): a new and better alternative to Firebase's real-time database  


## Angular Authentication with Auth0 (SaaS)

Auth0 is a SaaS provider  that helps you to:

* Add authentication with multiple authentication sources, either social like Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, among others, or enterprise identity systems like Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider.
* Add authentication through more traditional username/password databases.
* Add support for linking different user accounts with the same user.
* Support for generating signed Json Web Tokens to call your APIs and flow the user identity securely.
* Analytics of how, when and where users are logging in.
* Pull data from other sources and add it to the user profile, through JavaScript rules.

* Go to http://auth0.com login with your credentials
* Once done with above step, click on clients tab from left tab navigation
* Create new Client with app name and client type as single page app
* If you want to show social login in login widget then enable corresponding social login through clicking on connections -> Social.
* Up to now we’re ok to go ahead.

```bash
npm install –g angular2-jwt auth0-lock --save
```
angular2-jwt is a small and unopinionated library that is useful for automatically attaching a JSON Web Token (JWT) as an Authorization header when making HTTP requests from an Angular 2 app. It also has a number of helper methods that are useful for doing things like decoding JWTs.

This library does not have any functionality for (or opinion about) implementing user authentication and retrieving JWTs to begin with. Those details will vary depending on your setup, but in most cases, you will use a regular HTTP request to authenticate your users and then save their JWTs in local storage or in a cookie if successful.

## Angular Authentication with [Okta](https://www.okta.com/)

Okta provides an API service that allows developers to create, edit, and securely store user accounts and user account data, and connect them with one or multiple applications. We make user account management easier, more secure, and scalable so you can get to production sooner.

The Okta Sign-in Widget provides an embeddable JavaScript sign-in implementation that can be easily customized. The Sign-in Widget carries the same feature set in the standard Okta sign-in page of every tenant – with the added flexibility to change the look-and-feel. Included in the widget is support for password reset, forgotten password and strong authentication – all of which are driven by policies configured in Okta. Developers don’t have to write a single line of code to trigger these functions from within the widget. For consumer facing sites, social providers are also supported in the widget.

## Similar or Alternative Services 

- [Gluu](https://www.gluu.org/)
- [DailyCred](https://www.dailycred.com/)
- [Authrocket](https://authrocket.com/)
- [Keycloak](https://authrocket.com/)
- [Anvil Research](https://github.com/anvilresearch/connect)

### Passport.js
### Self Hosted Server: The Open Source Parse Server 

## Authentication with SSO Services: Facebook, Google or GitHub




