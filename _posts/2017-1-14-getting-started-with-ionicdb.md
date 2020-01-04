---
layout: post
title: "Getting started with IonicDB (A Parse alternative)"
image: "images/content/getting-started-with-ionicdb/titleimage.png"
excerpt: "In this post we are going to see how to work with IonicDB a Parse alternative for cloud storage which allows you to build your mobile app backend without writing server side code "
categories : mobiledev
tags : ionic 
---

{% include image.html
   img="images/content/getting-started-with-ionicdb/bigimage.png"
       title="Getting started with IonicDB"
%}

Ionic the company behind the popular open source framework for building mobile apps with web technologies has recently launched a new service for cloud database storage which allows mobile apps developers to build backends for their apps without writing server side code just like the popular Parse service that was recently shutdown by FaceBook .

So thanks to IonicDB you don't have to build a server side application for dealing with any CRUD operations .Ionic has also many other cloud services that you can integrate with IonicDB to build a full fledged mobile app ,for example for authenticating and authorizing your app users you can use the [Ionic Auth](http://docs.ionic.io/services/auth/) service .

IonicDB ,Ionic Auth and other Ionic services can be integrated into your Ionic app very easily thanks to official modules from Ionic team .

IonicDB features
------------------
------------------

NoSQL and real time database with JSON like documents .

You can store ,find and listen for data changes in real time .

Integration with Ionic Auth service for adding a security layer . 


How to start working with IonicDB ?
-------------------------------------
-------------------------------------

The first thing you need to do is installing the Ionic Cloud client which requires you to have an Ionic app already created also you need to have at least Node.js 4 and NPM 3 installed in your system .

The cloud client allows you to use any Ionic service from your Ionic app but you'll have to install it first via npm so open up your terminal and navigate to your app directory and enter 

	npm install @ionic/cloud-angular --save

Next you need some bit of setup so just go ahead and enter the following with your terminal

	ionic io init

This will create an app in your dashboard and set the generated app id in the ionic.config.json file of your Ionic project .

That's the first method .You can also manually create and app in your dashboard and set its id in ionic.config.json 

Now you need to configure the cloud client so just follow the instructions which are available from [Ionic docs](http://docs.ionic.io/setup.html#installation)


Next you have to enable IonicDB service so go to Ionic apps [https://apps.ionic.io/](https://apps.ionic.io/) .

You'll prompted for login information so enter your email and password 

{% include image.html
   img="images/content/getting-started-with-ionicdb/ionic-apps-login.png"
       title="Getting started with IonicDB"
%}


You'll be presented with a list of your previously created apps .Look for your app or create a new one if you need to .

{% include image.html
   img="images/content/getting-started-with-ionicdb/ionic-apps-select.png"
       title="Getting started with IonicDB"
%}

Go to your database tab and then click Get Started to enable IonicDB for your app .

{% include image.html
   img="images/content/getting-started-with-ionicdb/enable-ionicdb.png"
       title="Getting started with IonicDB"
%}


After that ,a database will be created for the specified app then you'll be taken to a kind of statistics view which shows you many important numbers about your database use .

{% include image.html
   img="images/content/getting-started-with-ionicdb/ionicdb-overview.png"
       title="Getting started with IonicDB"
%}

You can use this dashboard to create collections and permissions .

Collections can also be created which is the default option that IonicDB uses but you can also turn it off and only creates collections manually .

{% include image.html
 img="images/content/getting-started-with-ionicdb/ionicdb-autocreate-collections.png"
       title="Getting started with IonicDB"
%}

Collections are just the NO-SQL term for tables used in SQL world .

Creating collections manually 
-----------------------------
-----------------------------

To create a collection manually go to the collection tab and click on new and then just provide the collection name .

{% include image.html
   img="images/content/getting-started-with-ionicdb/ionicdb-create-collection.png"
       title="Getting started with IonicDB"
%}

You data is stored as JSON objects which are organized in collections .

Conclusion
------------

The IonicDB is still in beta service so you may experience some problems when using it for now but it is a really good alternative to Parse for creating app back-ends without writing any server side code .





