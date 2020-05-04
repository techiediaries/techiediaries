---
layout: post
title: "Getting started with realtime web apps and RethinkDB"
image: "images/content/getting-started-with-realtime-web-apps-and-rethinkdb.png"
excerpt: ""
categories : webdev
tags : javascript 
---

{% include image.html
   img="images/content/getting-started-with-realtime-web-apps-and-rethinkdb-big.png"
       title="Getting started with realtime web apps and RethinkDB"
%}

If you are paying some attention then you definitely know that the web is going real time or has already gone 
real time .No one wants to refresh the web page to get real time data and everyone is looking for applications
which send notifications when new things happen .Big social media websites like Facebook have implemented 
great real time and notification based apps using many technologies and there are many open source frameworks
nowadays which focus on building real time apps instead of traditional web apps ,even traditional frameworks
started to integrate functionality to make it easy to build real time apps .

What is RethinkDB ?

RethinkDB is an open source real time and NoSQL document based database system just like any other NoSQL database 
such as MongoDB but with real time capability .It's designed to make it easy to build real time apps without 
sacrificing performance or easiness of use .If you have previously developed a real time app then you know that
in order to keep users notified of new data changes you need to create some sort of polling system on client side 
which checks constantly in some predefined time interval a remote database and when there is some changed data it then
notifies the connected users .

Polling is the technique used for many years for building apps with real time features
with trade offs in performance and server resources (latency and load) also developers need to implement well
engineered polling systems to prevent any extra performance degradation or technical issues .

For years ,developers used Ajax polling which opens many connections to the server to continuously check for changes .After that web sockets
were implemented on the majority of modern web browsers ,the socket keeps an open connection from the client to the server which has reduced
the server work resulted from continuously handling the opening of incoming connections.Although sockets have simplified making realtime apps
on the client side but they didn't simplified server side logic .So here comes the job of RethinkDB which is a realtime database that's capable
of notifying apps for data changes without writing complex code just for checking data changes .

Now lets understand where the role of RethinkDB fits in 

The blueprint of any real time web application can be described with three steps

First step : Initially pull data from database tables/documents .

Second step : Polling remote database for new data changes which simply means keep checking from time to time for changes .

Third step : Sending notifications to all connected clients or broadcasting 

So if you need to implement this real time system .step 2 can be intimidating and resource consuming .RethinkDB

Will take care of step 2 and let you have a real time system without writing any extra logic by yourself .

By using RethinkDB ,the blueprint of your system becomes 

First step : Initially pull data from database tables/documents .

Second step : RethinkDB notifies your server side code of any data changes which broadcasts them to connected clients

<h2>How to install RethinkDB ?</h2>

RethinkDB like any database system has server side and client side components so you need to install them both to be
able to use the database .The actual database resides on the server part of RethinkDB ,for the client you need to have
the RethinkDB driver installed to communicate with server side .

RethinkDB is available for all major operating systems such as Linux ,Windows and OS X .

For Linux there are official packages for Ubuntu ,CentOS and Debian distributions and community supported packages for 
Arch Linux ,openSUSE ,Fedora ,Linux Mint and Raspbian distributions .

You can also use RethinkDB with Docker which provides and [official repository for RethinkDB](https://registry.hub.docker.com/_/rethinkdb/)

If you use any other platform that's not supported either officially or by community you can still build RethinkDB 
from the source .Visit thier official website for more information .

RethinkDB is available for both 32bit and 64bit architectures .

The RethinkDB client drivers are available for JavaScript and Node.js ,Python ,Java and Ruby and there also no official
and community supported drivers for C++ and C# and many other programming languages .

<h3>
How to install RethinkDB under Linux and Ubuntu 16 ?
</h3>

    source /etc/lsb-release && echo "deb http://download.rethinkdb.com/apt $DISTRIB_CODENAME main" | sudo tee /etc/apt/sources.list.d/rethinkdb.list

    wget -qO- https://download.rethinkdb.com/apt/pubkey.gpg | sudo apt-key add -

    sudo apt-get update

    sudo apt-get install rethinkdb


<h3>
How to install RethinkDB under OS X/MAC ?
</h3>

Using the Homebrew package manager

    brew update  
    brew install rethinkdb

<h3>
How to install RethinkDB under Windows ?
</h3>

First of all ,you need to have a 64-bit system then download this [zip](https://download.rethinkdb.com/windows/rethinkdb-2.3.5.zip) file open it and extract 
on some location of your choice .

Then you can execute by simply going into where you have extracted it 

    cd RethinkDB
    rethinkdb.exe


For Linux/MAC you can simply execute RethinkDB by opening a terminal and typing

    rethinkdb


In order to be able to communicate with RethinkDB from your apps you need to install the driver designed
for your specific language .

For Node.js you can simply install with NPM

    npm install --save rethinkdb

For Python you can install RethinkDB using PIP package manager

    sudo pip install rethinkdb

    
<h2>How to administrate your RethinkDB database system ?</h2>

RethinkDB provides a web interface for administration and management tasks .To be able to access the web interface you
need to provide these parameters when executing RethinkDB from your terminal 

    rethinkdb --bind all

Next just visit http://localhost:8080

Conclusion
------------

The realtime web is the future of web applications and while there are many frameworks which implement real time features
using various methods and techniques RethinkDB simplifies dramatically real time web development which make it easy to build
realtime apps that are powerful and easy maintainable with less efforts and resource usage.





