---
layout: post
title: "Getting started with Cocos2d-x tutorial for beginners "
image: "images/content/getting-started-cocos2d-x-tutorial.png"
excerpt: "Getting started with Cocos2d-x tutorial "
categories : gamedev
tags : [cocos2d , gamedev]
---

{% include image.html
   img="images/content/getting-started-cocos2d-x-tutorial.png"
       title="Getting started with Cocos2d-x tutorial for beginners"
%}

In this getting started with Cocos2d-x tutorial designed for beginners we are going to get familar with 
the Coco2d-x game engine and will create a simple game to showcase the many features of this game engine .

So lets get started 

What is Cocos2d-x ?
---------------------
---------------------

Coco2d-x is an open source game engine for building 2D games for Desktop and mobile devices (Android and iOS) .
Coco2d-x is a C++ port of the well known and the popular Coco2d engine which is a very powerful game engine for making
2d games for IPhone .

Coco2d-x is based on C++ which is the programming language for game development exprets in all times but has also
a script language Lua which is the scripting language used mainly by game developers so as you can see cocos2d-x 
was inspired for an already successful game engine which is built using C++ language and also integrated the most 
powerful scripting language for game development ,this combination makes Coco2d-x one of the best 2D game engines in
the world .

Here is a list of the features of Coco2d-x :

Coco2d-x is open source with a strong community .

Cocos2d-x is very fast .

Coco2d-x is free to use ,you don't need to buy any license either to use or to sell your 2D games .

Coco2d-x is a cross platform 2d game engine ,you can build games for Desktop OSs like Windows ,Linux and MAC
and also for mobile devices such as Android ,iOS and Windows Phone .There is even a JavaScript and HTML5 versions ,Cocos2d-js for
buidling JavaScript and HTML5 targetting the modern web browser .

Getting started with Cocos2d-x
-------------------------------
-------------------------------

First of all ,we need to download the files for Coco2d-x engine so go to the [download page](http://www.cocos2d-x.org/download){:target=_blank} on the official
website and grab the latest version or just get it directly from this [link](http://www.cocos2d-x.org/filedown/cocos2d-x-3.14.1.zip).

Next extract the ZIP file somewhere in your drive .

{% include image.html
   img="images/content/getting-started-cocos2d-x-tutorial/extract-cocos2d-x.png"
       title="Getting started with Cocos2d-x tutorial for beginners"
%}


Then open up your terminal/command prompt ,navigate to coco2d-x folder and run

    python setup.py

For MAC and Ubuntu users Python 2.7+ is already installed which is a requirement for setup .For Windows
you need to install Python 2.7+ in order to continue .

Make sure you follow the instructions ,especially for configuring and activating environment variables .

    source ~/.bash_profile

{% include image.html
   img="images/content/getting-started-cocos2d-x-tutorial/setup-cocos2d-x.png"
       title="Getting started with Cocos2d-x tutorial for beginners"
%}


Now lets scaffold our first Coco2d-x game project ,so navigate to where you want to put your game projects
and run the following with your terminal/command prompt or just specify the folder with -d switch

    cocos new -l cpp -d ~/cocos2d-projects myFirstGame

{% include image.html
   img="images/content/getting-started-cocos2d-x-tutorial/new-cocos2d-x-project.png"
       title="Getting started with Cocos2d-x tutorial for beginners"
%}

Now navigate into your project folder

    cd myFirstGame
    ls

You are going to find many target project folders for Linux , Win32 ,MAC ,Android ,iOS etc .
Choose your target ,since i'm using Ubuntu i'll go with proj.linux 

{% include image.html
   img="images/content/getting-started-cocos2d-x-tutorial/cocos2d-x-platforms.png"
       title="Getting started with Cocos2d-x tutorial for beginners"
%}

Now just run your game with

    cocos run -s . -p linux

If you get this error 

<b>No CMAKE_CXX_COMPILER could be found.</b>

It means g++ is not installed ,you can install it with

    sudo apt-get install build-essential 

Or just 

    sudo apt-get install g++
    

SEE YOU IN THE NEXT PART 







