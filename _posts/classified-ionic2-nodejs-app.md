---
layout: post
title: "Building a classified mobile app with Ionic 2 and Node.js "
image: "images/content/classified-ionic2-nodejs-app.png"
excerpt: "In this tutorial ,we are going to build a fully featured mobile classified app with Ionic 2 and Node.js " 
---

{% include image.html 
    img="images/content/classified-ionic2-nodejs-app.png" 
    title="classified ionic 2 app with Node.js " 
%}

In this tutorial ,we are going to build a fully featured mobile classified app with Ionic 2 and Node.js which has 
the following requirements :

<ul>

<li>
Users can see a list of the latest posted ads .
</li>

<li>
Users can see details for each Ad post .
</li>

<li>
Users can post an Ad but need first to be authenticated .
</li>

</ul>

Tutorial requirements 
------------------
------------------

You need to have the latest version of Node.js installed on your system with NPM (Node Package Manager ) .
If it is not you can go to the official Node.js site and download the version compatible with your system .
If you use Ubuntu you can follow this tutorial to install Node.js from Ubuntu package Manager .


You need to have the latest version of Ionic CLI installed on your system .If not then you can simply install it 
by issuing a few commands on your terminal/command prompt 

    npm install -g cordova 
    npm install -g ionic 

Before you continue with this tutorial you should have a basic understanding of Ionic 2 and how to use the Ionic CLI .

we are going to use MongoDB a NoSQL database which's close enough to SQL databases so if you are only familiar 
with SQL databases such as mySQL or PostgreSQL and want to use or migrate to NoSQL .It is recommended to start with
MongoDB because it has similar SQL concepts .

Since we are going to use MongoDB you have to install it on your system ,the process of installation differs
from one system to another but you shouldn't find any problems installing it .On Ubuntu 16 you can execute 
the following commands to install MongoDB :

    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
    
    echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list

    sudo apt-get update

    sudo apt-get install -y mongodb-org

    cd /lib/systemd/system/
    touch mongod.service

Open mongod.service with a text editor 

    vim mongod.service

Paste the following text 

    [Unit]
    Description=High-performance, schema-free document-oriented database
    After=network.target
    Documentation=https://docs.mongodb.org/manual

    [Service]
    User=mongodb
    Group=mongodb
    ExecStart=/usr/bin/mongod --quiet --config /etc/mongod.conf

    [Install]
    WantedBy=multi-user.target

Save and exit then execute 

    systemctl daemon-reload

Then start mongod

    systemctl start mongod
    systemctl enable mongod


MongoDB is a high performance database system which uses documents to store JSON like objects .

Now let's create a MongoDB database .

Connect to your MongoDB system with mongo client using the command

    mongo 

Or create a MongoDB database and connect to it with

    mongo classifieds     



Create basic Node.js app 
--------------------------
---------------------------

If you have installed everything you need ,let's create a basic Node.js application which does the following things

<ol>
<li>Create a server and start listening on port 4000</li>
<li>Connect to a MongoDB database </li>
<li>Authenticate users via Facebook </li>
</ol>    

So first of all, let's scaffold a new Node.js module .

Open up your terminal ,navigate to your chosen working directory then enter :

    npm init 

Enter the requested information and hit Enter .A package.json should be created for you .

Now we need to install dependencies .For now just ,Restify ,Mongoose ,Passport and Passport Facebook strategy 

Restify ,a lightweight framework for building restful web apps with Node.js .

Mongoose is a JavaScript client which allows you to connect and use a MongoDB database from your Node.js app .

Passport is a Node.js module which allows you to setup traditional and social auth systems without reinventing 
the wheel .  

Open your terminal and execute 

        npm install restify --save 
        npm install mongoose --save 
        npm install passport --save
        npm install passport-facebook --save

Next create an app.js file inside your project folder then copy and paste the following code 

So here is a list of what we need to do now ?

<ul>
<li>Setup a basic Restify server which listens on port 4000 </li>
<li>Connect our server to mongodb database</li>
<li>Add Facebook authentication with Passport</li>
</ul>

So let's start by setting up a basic Restify server which listens by default on 4000

    'use strict';

    var restify = require('restify');

    app.use(restify.queryParser());
    app.use(restify.bodyParser());
    app.use(restify.CORS());

    app.get(/.*/, restify.serveStatic({
        directory: './static',
        default: 'index.html'
    }));

    var port = Number(process.env.PORT || 4000);

    app.listen(port, function () {
        console.log('server listening at %s',app.url);
    });

Create a directory for static files (static)

    mkdir static 
    touch index.html

And copy the following html code 

    <!DOCTYPE html>
    <!--[if lt IE 7]>      <html lang="en"  class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
    <!--[if IE 7]>         <html lang="en"  class="no-js lt-ie9 lt-ie8"> <![endif]-->
    <!--[if IE 8]>         <html lang="en"  class="no-js lt-ie9"> <![endif]-->
    <!--[if gt IE 8]><!--> <html lang="en"> <!--<![endif]-->
    <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Classifieds </title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    </head>
    <body>
        <p>App Works </p>
    </body>
    </html>     

Actually ,we don't need static files because the front end will be created with Ionic 2 ,but just for the sake
of testing if our server is working and also if you decide to add a web version too .

Using your terminal ,navigate to your app folder and run this basic server with :

    node app.js
You should get this message : server listening at http://[::]:4000

And you should be able to visit [http://127.0.0.1:4000](http://127.0.0.1:4000) and see 

        App Works 


The next to do is connecting our server to MongoDB so modify the previous code to the following 

    'use strict';

    var restify = require('restify');

    // We required mongoose

    var mongoose = require('mongoose');

    //use this uri to connect to MongoDB 'classifieds'

    var uri = "mongodb://localhost/classifieds" || String(process.env.MONGODB_URI);


    app.use(restify.queryParser());
    app.use(restify.bodyParser());
    app.use(restify.CORS());

    app.get(/.*/, restify.serveStatic({
        directory: './static',
        default: 'index.html'
    }));

    //connect to MongoDB 

    mongoose.connect(uri);

    var port = Number(process.env.PORT || 4000);


    app.listen(port, function () {
        console.log('server listening at %s',app.url);
    });


Next we need to add Facebook social login with passport and passport-facebook modules 

So first of all ,require them

    var passport         = require('passport')
    var FacebookStrategy = require('passport-facebook').Strategy;

Add these config variables

    var FB_LOGIN_PATH    = '/api/facebook_login'
    var FB_CALLBACK_PATH = '/api/facebook_callback'
    var FB_APPID = 'facebook app id'
    var FB_APPSECRET = 'facebook app secret'
    var SERVER_PREFIX = 'http://localhost:4000'
     
Then add 

    app.use(passport.initialize());  

    var fb_login_handler    = passport.authenticate('facebook', { session: false })
    var fb_callback_handler = passport.authenticate('facebook', { session: false }) 
    var fb_callback_handler2 = function(req, res) {

        res.send('Successfully logged in : ' + req.user.displayName);
    }

    app.get('/api/facebook_login',    fb_login_handler)
    app.get('/api/facebook_callback', fb_callback_handler, fb_callback_handler2)

    passport.use(new FacebookStrategy({
        clientID:     FB_APPID,
        clientSecret: FB_APPSECRET,
        callbackURL:  SERVER_PREFIX + FB_CALLBACK_PATH
    },
    function(accessToken, refreshToken, profile, done) {
        return done(null, profile)
    })
    )     


You need to have a Facebook app which you have configured for social login then grab the app id and the app secret
and add them to previous code .For the callback URL needed by Facebook app just put your local host callback 
for now ,which is :

        http://localhost:4000/api/facebook_callback

Next run your app with 

        node app.js

Then visit  http://localhost:4000/api/facebook_login 

You should be able to login with Facebook ,Facebook will ask you for permissions and then redirects to the 
callback url http://localhost:4000/api/facebook_callback where you should see this message 

    Successfully logged in : <YOUR_NAME>       


Before we build the full server backend of our app let is build our front end with Ionic 2 to test the login 
with Facebook 

Create the front end with Ionic 2  
--------------------------------
--------------------------------

We will start by scaffolding a new Ionic 2 app using the CLI .

    ionic start ionic2classifieds blank --v2
    cd ionic2classifieds

Next we need to add a platform ,I'm only targeting Android but you can add iOS too if you are developing 
under a MAC

    cordova platform add android 

Then we need to add this plugin cordova-plugin-facebook4 to allow your Ionic 2 app to use native 
Facebook SDK  in order to authenticate with Facebook .

    cordova plugin add cordova-plugin-facebook4 --save --variable APP_ID="123456789" --variable APP_NAME="myApplication"

Make sure to replace APP_ID and APP_NAME with your Facebook app values .

Next you need to go to your app dashboard and add native platforms 


Next add a button to Login with Facebook on the home page 

    <ion-header>
    <ion-navbar>
        <ion-title>
        Ionic Blank
        </ion-title>
    </ion-navbar>
    </ion-header>

    <ion-content padding>
    <h3 center>
        Facebook Auth Example
    </h3>

    <button ion-button center (click)="fbLogin()">
        Log In with Facebook
    </button>

    <ion-card *ngIf="userProfile">
        <img [src]="userProfile.photoURL"/>
        <ion-card-content>
        <ion-card-title>
            {{ userProfile.displayName }}
        </ion-card-title>
        <p>
            The UID for this new user is {{userProfile.uid}} and the email is {{userProfile.email}}
        </p>
        </ion-card-content>
    </ion-card>
    </ion-content>


https://gist.github.com/cdnsteve/5396612
https://www.howtoforge.com/tutorial/install-mongodb-on-ubuntu-16.04/
http://ionicframework.com/docs/v2/native/facebook/

