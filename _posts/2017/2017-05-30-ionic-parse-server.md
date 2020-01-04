---
layout: post
title: "Ionic 3 - Getting started with the Parse server [Part1]"
image: "images/content/ionic-parse-server.png"
excerpt: "A tutorial series for learning how to use Parse server with Ionic " 
tags : ionic  parse
---

{% include image.html 
    img="images/content/ionic-parse-server.png" 
    title="Ionic 3 and Parse server" 
%}

In this tutorial series we are going to use the open source Parse server to create mobile applications 
for Android and iOS with Ionic 3 framework .

The hosted Parse platform was one of the most popular solutions for building mobile backends without 
any server side experience .In the beginning of this year (2017) the hosted service was shutdown but to enable 
their large base of users to easily and seamlessly migrate their apps ,they decided to open source the platform .
It's now known as the open source Parse server .

The Parse server is a very active repository on Github with 143 contributors and ~13K stars so even if you 
didn't use the hosted Parse platform before ,its open source version is a wise choice if you need to build 
a backend for you mobile app or your clients apps .

In the first part of this getting started with Parse server tutorial for Ionic developers ,we'll cover 
how you can setup and host your own instance of the open source Parse server so lets start !

Parse server install requirements 
----------------------------------------
----------------------------------------

On this tutorial we are going to install Parse server on a local development machine but it can also hosted 
on major PAAS providers such as Heroku, Amazon AWS or Azure.Or even on your own VPS server .

Before you can install the Parse server you need a few requirements on your development machihe :

Node 4.3 or above 

MongoDB version 2.6.X or above 

Python 2.x.x

In case you want to deploy to Heroku you need the Heroku Toolbelt installed .

To install Node.js head over to their official website and download your operating system installer . 

Then you can confirm you have the required version by running : 

    node --version
    v7.9.0

Next you need to install MongoDB which depends on your operating system but you should find tutorials 
on the web for how to do that .

To confirm that you have installed the right version of MongoDB ,run 
    
    MongoDB shell version: 2.6.10
    connecting to: test    

For Python ,you should find it installed on major operating systems but in case it's not you can go to their 
[official website](https://www.python.org/downloads/) and download the Python installer 

Now it's time to install the Parse server .You can do that easily by cloning the parse server example 
from GitHub 

    git clone https://github.com/ParsePlatform/parse-server-example.git IonicParse

Navigate inside the cloned directory :

    cd IonicParse

Then install all dependencies with :

    npm install


Then you can run the start script to run the parse server 


    npm run start

    DATABASE_URI not specified, falling back to localhost.
    parse-server-example running on port 1337.
    info: Parse LiveQuery Server starts running

Next head over to your web browser and visit <em>http://localhost:1337 </em>

You should see a blank webpage with 

    I dream of being a website. Please star the parse-server repo on GitHub!

Congratulations you have successfully installed the Parse server on your development machine .


