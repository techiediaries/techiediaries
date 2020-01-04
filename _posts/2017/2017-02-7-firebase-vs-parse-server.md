---
layout: post
title: "Firebase vs Parse server  "
image: "images/content/firebase-vs-parse-server.png"
excerpt: "A comparison between Firebase and the open source Parse server"
categories : mobiledev
tags : firebase parse
---

{% include image.html
   img="images/content/firebase-vs-parse-server.png"
       title="A comparison between Firebase and the open source Parse server"
%}

Firebase is an unified and cloud based platform started in 2011 and now owned by Google which provides
a set of versatile tools for building and growing mobile apps for Android and iOS devices .Firebase has many
integrated services ,that makes the task of building full fledged apps a breeze, such as 

A realtime NoSQL and JSON based database .

An Auth system .

Push notifications .

Admob and Analytics dashboard .

<iframe width="640" height="360" src="https://www.youtube.com/embed/O17OWyx08Cg" frameborder="0" allowfullscreen></iframe>



The Parse server is an open source version of the cloud based platform Parse which was shutdown recently by
Facebook so the team can focus on other projects inside Facebook .To make it easy for their clients to migrate
their existing apps to their own servers they have open sourced the core of the Parse platform .The project has
received millions of stars and forks on GitHub and many developers have contributed to make it even better .

The parse server gives you more power and also more control since you can self host your apps with your own
server but without writing so much code .You can either migrate your already existing Parse apps or even 
build new apps from scratch in less time without actually writing any server side code but that doesn't mean 
you can't ,the Parse server is extensible ,whenever you need you can extend your app with custom code and functionality .

<iframe width="640" height="360" src="https://www.youtube.com/embed/o522ovITvW4" frameborder="0" allowfullscreen></iframe>


In case you have mobile apps hosted with the Parse platform and needs a cloud hosted alternative to Parse 
then Firebase can be what you are looking for since it's now owned by Google which makes it a powerful and 
reliable cloud hosted solution for your apps otherwise you can easily migrate your apps to a self hosted
server with the open source Parse server .

Database storage
-----------------
-----------------

Firebase offers you a realtime database where you can store your data with a NoSQL approach .All data is stored 
and fetched in JSON format and you have automatic REST APIs to do all sort of CRUD operations on your database
using either plain JavaScript to communicate with the available endpoints or the client SDKs .

The open source Parse server provides you also with a NoSQL database but you need to host it by yourself .You have
also automatic REST APIs and client SDKs to do CRUD operations against your self hosted database .


The Firebase database is a realtime database that's most suitable to build apps such as social networks or any 
app that needs real time data synchronization for all connected clients .

While Parse server can be used for building more traditional apps but also has Live queries that permit you
to send queries one time and the server will take care of sending updates whenever there is new data ( which 
was previously queried )

Parse server uses a MongoDB for data storage and Amazon S3 static buckets to store static files .

Authentication and authorization
---------------------------------
---------------------------------

Both Firebase and the Parse server provide machanism and modules for adding security via authentication and 
authorization .They both support normal username and password auth and social based auth with Facebook ,Google etc.


Community 
----------
----------

The Parse server is supported by a strong open source community with millions of developers worldwide who
have helped make the server even more powerful than the cloud hosted Parse platform .




