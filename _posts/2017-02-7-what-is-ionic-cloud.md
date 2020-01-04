---
layout: post
title: "What is Ionic Cloud ? "
image: "images/content/what-is-ionic-cloud.png"
excerpt: "The Ionic Cloud is a set of cloud services offered by the company or team behind the open source hybrid mobile framework Ionic "
categories : mobiledev
tags : ionic 
---

{% include image.html
   img="images/content/what-is-ionic-cloud.png"
       title="What is Ionic Cloud ?"
%}

Many new Ionic developers are asking what is Ionic Cloud ? so here is a small post to answer this repeated question .

The Ionic Cloud is simply a cloud hosted platform just like the popular Parse platform (Recently Shutdown by Facebook ) 
which offers developers many tools and services from creating and managing (testing and building ) Ionic mobile apps  to full fledged
server backends and databases for building your app server side logic without writing a single line of code .

The Ionic Cloud offers all services you or your team need such asking

Ionic View and Creator for visually creating ,packaging and deploying Ionic apps .

Analytics .

Push notifications .

Auth .

Cloud database .

{% include image.html
   img="images/content/what-is-ionic-cloud/ionic-cloud-services.png"
       title="What is Ionic Cloud ?"
%}

To be able to use the Ionic cloud services you have to sign up for an account [here](https://apps.ionic.io/signup)
and then login to your dashboard where you can create apps and activate many services such as the Auth system ,
the IonicDB service or push notifications etc .

How to integrate Ionic Cloud services with Ionic apps ?
-------------------------------------------------------
-------------------------------------------------------

Before you can integrate the Ionic Cloud services with your app you need to add some bit of setup to your app

First of all ,make sure you have the latest versions of Node.js and NPM or at least Node version 4 and NPM version 3

Next open up your terminal ,navigate to your Ionic app and type the following to install the Ionic Cloud client via npm 

    npm install @ionic/cloud-angular --save

Then enter 

    ionic io init

Which is going to do two things for you .First it will create an app in your Ionic Cloud account and then 
will set its id in your local ionic.config.json file .

You can do this manually if you prefer ,you need just to go to your cloud [dashboard](https://apps.ionic.io/)
create an app ,copy the id and paste in ionic.config.json 

{% include image.html
   img="images/content/what-is-ionic-cloud/ionic-cloud-dashboard.png"
       title="What is Ionic Cloud ?"
%}

Now you'll need to add some code in your app so go ahead and open src/app/app.module.ts 

First import the CloudSettings and CloudModule from '@ionic/cloud-angular'


    import { CloudSettings, CloudModule } from '@ionic/cloud-angular';


Then define a CloudSettings object with your APP_ID 


    const cloudSettings: CloudSettings = {
    'core': {
        'app_id': 'APP_ID'
    }
    };


Finally pass your cloud settings into CloudModule.forRoot()


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



That is all ,you can now use all Ionic Cloud services but you need to know that not all of them are freely 
available .Each service has a different pricing policy .  

Ionic Cloud pricing 
----------------------
----------------------

The Ionic cloud has a pay as you grow pricing policy which is the best pricing model .You only pay for 
what you actually use .So you can start a free plan designed for apps in development phase with no hidden fees
and includes all Ionic cloud services but has limitations for things such as storage and bandwidth etc.

Once you are ready to go for production ,yo can upgrade you plan for $20 / MO / APP .

You can see the full pricing information [here](http://ionic.io/pricing)

 