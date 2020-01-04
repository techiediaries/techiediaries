---
layout: post
title: "Easy ecommerce with Django framework "
image: "images/content/easy-ecommerce-with-django/titleimage.png"
excerpt: "In this post we are going to talk about Ecommerce with Python and the Django framework and what are the available packages/frameworks to use for building your ecommerce website ,shop or platform in a reasonable time ? "
tags : django python 

---
{% include image.html
       img="images/content/easy-ecommerce-with-django/bigimage.png"
       title="In this post we are going to look at available ecommerce frameworks for Django to build an ecommerce website "
%}

One question that I usually stumble upon on online communities is can I use Django to build an ecommerce website ? Or which is the best Django framework/package to build ecommerce websites with Django ? and questions of this type .So throughout this post i'll try to answer these questions and shed some light on the subject of building ecommerce platforms with Django .

The short answer to this question is Yes.You can use Django to build ecommerce websites/platforms but lets go in depth to talk about what are the requirements of an ecommerce website and how can Django framework provide the functionality needed to implement ecommerce related modules for web apps.

Maybe you already know ecommerce platforms are not really easy to build .You have to deal with a lot of tasks beside common web apps things .For example you need to manage your inventory and all information about products ,also different algorithms for inventory management .You need to deal with product shipping ,orders and also invoices just to name a few of them .You need to work with customers and different payment methods and also shopping carts etc.So unless you want to spend a lot of time to just scratch the surface of the ecomerce world you need to have good tools in your toolbox and Django - with its packages - is one of these tools you need to be equipped with ,in order to be able to develop your ecommerce platform in a reasonable amount of time.    

What's an ecommerce website ?
------------------------------

An ecommerce website/app is a web site that can be used to do online commerce where a merchant can list products that he needs to sell to customers online and also provide them with the ability to buy the products and pay for them online.

The fundamental constructs for any ecommerce solution are : 

Products listing and inventory management .

Documents such as orders,invoices etc .

Backend/User admin interface for adding products and tweak site wide and ecommerce related settings .

User and customer auth .

Shoping cart .

Support for online payments methods such as Credit/Visa cards and online payment processors like PayPal,Skrill etc .


Ecommerce frameworks/packages for Django
----------------------------------------------

Django is one of the greatest web frameworks for Python language .It makes buidling web apps an easy task even if you are just beginning with Python language and web development .Once you grasp the required basics you can build a web app .Another great feature of Django is packages you can use them to extend the core functionality of the framework and you don't even need to develop them by yourself.The great and large community around it developed all kind of common packages you can think of ,such as 

Packages for advanced auth ,
Packages for integrating your web app with social media ,

And packages for easily integrating ecommerce functionality on your app.Either if you need just a minimum ecommerce feature on your website or a full fledged heavy ecommerce website it's easy to do it in Django by just installing and leveraging some ready to use packages.

An ecommerce website needs some obligatory functionality to be present such as auth,admin backend ,a shoping cart etc.Implementing them from scratch all by yourself can be a tedious and time consuming task especially for non experienced Django developers without an in depth understanding of ecommerce fundamentals BUT thanks to Django ecommerce packages you can develop your web ecommerce app just like any experienced developer out there.

Now what are the available ecommerce Django packages that you can use ?

<a href="http://cartridge.jupo.org/" rel="nofollow" target="_blank">Mezannine Cartridge </a>
--------------------
--------------------

The first one is Cartridge .It's a mezzanine app which allows you to add ecommerce features to your website easilly without reinventing the wheel .Mezzanine is a Django CMS or Content Management System just like the popular PHP CMS WordPress except that it's not as popular as WordPress.You can install Cartridge via PIP which will also install Mezannine for your because it's a requirement for Cartridge to run.You can find the documentation of Cartridge <a href="http://cartridge.jupo.org/" rel="nofollow" target="_blank">here</a>.

<a href="http://oscarcommerce.com" rel="nofollow" target="_blank">Django Oscar</a> 
--------------
-------------

{% include image.html
       img="images/content/easy-ecommerce-with-django/django-oscar.png"
       title="ecommerce with django oscar "
%}


The second Django package for building ecommerce platforms is Django Oscar .It's open source and free to use designed to build domain driven websites .It's unoppinionated and very extensible framework for buiding your ecommerce store or platform.

Django oscar has well designed models and extensive tests and also a good documentation with code snippets for solving common ecommerce problems.

Django Oscar is built by <a href="http://www.tangentsnowball.com/" rel="nofollow" target="_blank">Tangent Snowball</a> agency which builds ecommerce sites with Django Oscar.

You can look at a demo ecommerce website built by Oscar via this <a href="http://demo.oscarcommerce.com/" rel="nofollow">link</a> and you can also <a href="http://django-oscar.readthedocs.org/en/latest/" rel="nofollow">read the docs</a>  

Oscar has many features that make building ecommerce websites a breeze such as

Multi tenant and mulit site support which means that you can use it to build a multi client ecommerce platforms where people can have their own shops just like saas ecommerce platforms like Shopify so you can leverage Oscar to easilly build your own saas alterantive to Shopify.

Pluggable tax calculations.

PDF Invoice generation.

Customer accounts and and dynamic categories.  

<a href="http://satchless.com" rel="nofollow" target="_blank">Django satchless</a>
----------------
----------------

{% include image.html
       img="images/content/easy-ecommerce-with-django/satchless.png"
       title="ecommerce with satchless "
%}

Stachless is a Python ecommerce framework that can be used by Django,Flask or any other Python based web framework .It has low level classes that and code patterns that you can use to build your ecommerce website by focussing only on your business logic and user experience.

The best features of Satchless are

Free ,open source and BSD licensed .

Extensive tests .

Framework agnostic ,you can use with your prefered Python based web framework . 

You can install Satchess via PyPy with PIP

	pip install satchless


<a href="http://www.django-shop.org/" rel="nofollow" target="_blank"> Django Shop</a>
-----------
---------

It's Django system/framework for building your own online shop which has support for Python 3. 

The goals of Django shop are providing clean ,modular and Pythonic django frameowork for buidling shops.It has support for shoping carts and checkouts and can be extended with plugins.

Django shop features includes

It's multilingual .

Supports multi currencies .

Can be plugged in Django CMS .

It's Rest based and uses the Django Rest framework etc . 


<a href="http://getsaleor.com" rel="nofollow" target="_blank">Saleor</a>
---------
----------
{% include image.html
       img="images/content/easy-ecommerce-with-django/saleor.png"
       title="ecommerce with saleor "
%}

It's a free and open source store front for Python 

Saleor has many great features such as

Support for products,cusomers and orders .

Support for different currencies and payment methods and processors .

It's responsive and mobile friendly.

Can be easilly deployed to Heroku via this <a href="https://heroku.com/deploy?template=https://github.com/mirumee/saleor/" rel="nofollow" target="_blank">link</a> .

Has commercial support .

<a href="https://www.shuup.com/en/" rel="nofollow" target="_blank">Shuup</a>
---------
---------
{% include image.html
       img="images/content/easy-ecommerce-with-django/shuup.png"
       title="ecommerce with shuup "
%}
A relatively new and still in beta Django ecommerce framework .Shuup is avaialble in many editions such as

The paid cloud edition .

The paid entreprise edition .

The open source and free to use edition which can be downloaded from <a href="http://github.com/shoopio/shoop" rel="nofollow" target="_blank">GitHub</a> .


Getting started with Django 1.10 and ecommerce 
----------------------------------------------

When writing this tutorial the latest version of Django is 1.10 which has improvemnts over previous versions so you'll need first to install the Django framework before you can do any web development with it .
To install Django you need to install Python first and pip package manager so you can install any related Python package including Django itself.

After that you can easily install Django framework by opening your terminal on Linux/MAC or your command prompt under Windows and just execute.

	pip install django

This will enough for installing Django on your system.

Next you'll need to pick one of the available Django based ecommerce frameworks install either via pip or from its related GitHub repo and start building your next ecommerce website.

You can also watch this useful Video by Chris Hawkes about Django ecommmerce options in 2016

<iframe width="640" height="360" src="https://www.youtube.com/embed/OQxWBzapy5s" frameborder="0" allowfullscreen></iframe>

Conclusion 
-----------

We have reached the end of this post .If you have suggestions for other Django alternatives that we can use to develop ecommerce platforms ,shops or websites feel free to comment below also if you have problems with one of these frameworks and a problem related to ecommerce with Python and Django framework you can ask for helo in comments area .I have a decent experience with Django ecommerce so i'll be more than happy to help you and voila thanks for reading.   












