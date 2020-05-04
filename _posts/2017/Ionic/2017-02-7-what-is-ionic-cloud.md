---
layout: bpost
title: "Ionic 5 Cloud"
image: "images/content/what-is-ionic-cloud.png"
excerpt: "The Ionic Cloud is a set of cloud services offered by the company or team behind the open source hybrid mobile framework Ionic "
categories : mobiledev
date: 2020-05-03
tags : ionic 
---

Many new Ionic developers are asking what is Ionic Cloud? So here is a small post to answer this repeated question.

The Ionic Cloud is simply a cloud hosted platform just like the popular Parse platform (Now Shutdown by Facebook ) which offers developers many tools and services from creating and managing (testing and building ) Ionic mobile apps to full fledged
server backends and databases for building your app server side logic without writing a single line of code.

The Ionic Cloud offers all services you or your team need such as: 

- Ionic View and Creator for visually creating, packaging and deploying Ionic apps,
- Analytics,
- Push notifications,
- Auth,
- Cloud database, etc.

{% include image.html
   img="images/content/what-is-ionic-cloud/ionic-cloud-services.png"
       title="What is Ionic Cloud ?"
%}

To be able to use the Ionic cloud services you have to sign up for an account [here](https://apps.ionic.io/signup) and then login to your dashboard where you can create apps and activate many services such as the Auth system, the IonicDB service or push notifications etc.

## How to integrate Ionic Cloud services with Ionic 5 apps?

Before you can integrate the Ionic Cloud services with your app you need to add some bit of setup to your app.

First of all, make sure you have the latest versions of Node.js and NPM installed on your development machine.

Next open up your terminal, navigate to your Ionic 5 app and type the following to install the Ionic Cloud client via npm 

```bash
$ npm install @ionic/cloud-angular --save
```

Next, enter: 

```bash
$ ionic io init
```

This is going to do two things. First, it will create an app in your Ionic Cloud account and then will set its ID in your local `ionic.config.json` file.

You can do this manually if you prefer, you just need to go to your cloud [dashboard](https://apps.ionic.io/), create an app, copy the ID and paste in the `ionic.config.json` file. 

{% include image.html
   img="images/content/what-is-ionic-cloud/ionic-cloud-dashboard.png"
       title="What is Ionic Cloud ?"
%}

Now, you'll need to add some code in your Ionic 5 app so go ahead and open the `src/app/app.module.ts` file and start by importing the `CloudSettings` and `CloudModule` from `@ionic/cloud-angular`:


    import { CloudSettings, CloudModule } from '@ionic/cloud-angular';


Next, define a `CloudSettings` object with your `APP_ID`: 


    const cloudSettings: CloudSettings = {
    'core': {
        'app_id': 'APP_ID'
    }
    };


Finally, pass your cloud settings into `CloudModule.forRoot()` as follows:


    @NgModule({
    declarations: [ ... ],
    imports: [
        IonicModule.forRoot(MyApp),
        CloudModule.forRoot(cloudSettings)
    ],
    bootstrap: [IonicApp],
    entryComponents: [ ... ],
    providers: [ ... ]
    })
    export class AppModule {}



That's all, you can now use all Ionic 5 Cloud services but you need to know that not all of them are freely available. Each service has a different pricing policy.  

## Ionic 5 Cloud Pricing 

The Ionic 5 cloud has a pay as you grow pricing policy which is the best pricing model.You only pay for what you actually use. So you can start a free plan designed for apps in development phase with no hidden fees and include all Ionic 5 cloud services but has limitations for things such as storage, and bandwidth, etc.

Once you are ready to go for production, you can upgrade you plan.

You can see the full pricing information [here](http://ionic.io/pricing)

 