---
layout: post
title: "Building realtime apps with Horizon and RethinkDB without writing server side/backend code"
image: "images/content/building-realtime-apps-with-horizon-and-rethinkdb-without-writing-backend-code.png"
excerpt: ""
categories : webdev
tags : javascript 
---

{% include image.html
   img="images/content/building-realtime-apps-with-horizon-and-rethinkdb-without-writing-backend-code.png"
       title="Building realtime apps with Horizon and RethinkDB without writing server side/backend code"
%}

Horizon is a realtime and open source JavaScript backend which allows you to build realtime mobile and desktop web applications 
without actually writing any server side code so if you are a fronend mobile or web developer ,you don't have experience with
server side frameworks and technologies  and you don't want to hire a backend developer you take advantage of Horizon to build
a backend for your web or mobile app .

Horizon is built by the team behind RethinkDB and contributions from an open source community .

Horizon has all features needed by a modern and realtime web or mobile application such as

Modularity and extensibility :

You can have a full and ready backend with an API for your apps .You just need to focus on the frontend of your app 
and then plug in your app to Horizon backend in no time .Horizon is also very extensible so if your app grows up to a level
where it needs custom code you can easily write backend code and extend your app capability without rewriting your app from
scratch .

Horizon has powerful realtime features

Since horizon is built on top of RethinkDB which a realtime database built by the same team behind Horizon ,you have powerful
realtime features backed in your app with no extra code .RethinkDB has a powerful builtin query language and can push realtime data 
updates to your app users without writing extra code or sacrificing performance .

Built in Auth and permissions system

Horizon has an API for authenticating users with common providers such as Facebook ,GitHub or Google and a permission system
for protecting data from unauthorized access .


How to get started with Horizon ?

So the first thing you need to do is to install Horizon or precisly the Horizon CLI (Command Line Interface) via NPM .So
go ahead and open up your terminal then type the following 

    npm install -g horizon

Next cd into your working directory 

    cd into-working-directory

And scaffold a new Horizon app with hz CLI 

    hz init my-horizon-app

{% include image.html
   img="images/content/building-realtime-apps-with-horizon-and-rethinkdb-without-writing-backend-code/init-horizon-app.png"
       title="Building realtime apps with Horizon and RethinkDB without writing server side/backend code"
%}


You can also create your app folder by yourself ,navigate to it and then execute without folder name to use the current 
folder as your app root folder . 

    hz init

hz init will copy a bunch of files and create a directory structure for your app which looks like 

{% include image.html
   img="images/content/building-realtime-apps-with-horizon-and-rethinkdb-without-writing-backend-code/horizon-app-structure.png"
       title="Building realtime apps with Horizon and RethinkDB without writing server side/backend code"
%}

The dist folder contains static files and it is used as an output folder for a build system of your choice .

The src folder is the input folder for your build system if you choose to use a build system .

You can also directly create files inside dist folder which can be then served .

Now lets serve our app 

    hz serve --dev

If you haven't installed RethinkDB you are going to get an error message

    `rethinkdb` not found in $PATH, please install RethinkDB.    

So you need to [install RethinkDB by following this tutoriat](http://www.techiediaries.com/webdev/getting-started-with-realtime-web-apps-and-rethinkdb/) .

After installing RethinkDB serve your app again .If you get 

    Horizon ready for connections

{% include image.html
   img="images/content/building-realtime-apps-with-horizon-and-rethinkdb-without-writing-backend-code/horizon-app-served.png"
       title="Building realtime apps with Horizon and RethinkDB without writing server side/backend code"
%}

Then congratulations your app is served .Go to  http://localhost:8181 

You should see “App works!” message .

{% include image.html
   img="images/content/building-realtime-apps-with-horizon-and-rethinkdb-without-writing-backend-code/horizon-app-works.png"
       title="Building realtime apps with Horizon and RethinkDB without writing server side/backend code"
%}

Conclusion
------------

So congratulation ,you have created your first realtime app with Horizon .This is a tutorial for introducing Horizon and show
you how you can start building realtime apps without writing any backend code .In next tutorials we are going to see how to build
fully fledged realtime app with Horizon and RethinkDB .







