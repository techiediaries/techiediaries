---
layout: post
title: "Build Facebook messenger bots with Python and Django "
image: "images/content/build-facebook-bots-django.png"
excerpt: "In this tutorial we are going to learn how to build Facebook bots using Python and Django framework"
categories: 
tags: [bots, django]
---

{% include image.html 
    img="images/content/build-facebook-bots-django.png" 
    title="In this tutorial we are going to learn how to build Facebook bots using Python and Django framework" 
%}

Throughout this tutorial ,we are going to see how to build a Facebook messenger bot using Python and Django framework .
The Facebook messenger platform is one of the biggest platforms for messaging on the Internet in these days .

<iframe width="560" height="315" src="https://www.youtube.com/embed/EOYnFUJyOlQ" frameborder="0" allowfullscreen></iframe>

If you are a business and your have a Facebook page that it might be a good idea to provide your users with an automatic 
method to get some answers such as the frequently asked questions that get asked all the time by customers but you can 
also build more advanced bots that use artificial intelligence (AI) .

Here is a list of the best messenger bots 

<iframe width="560" height="315" src="https://www.youtube.com/embed/bb7OJnNsVeg" frameborder="0" allowfullscreen></iframe>

Also watch this video from CNNMoney which talks about how Messenger Bots can replace customer service for brands 

<iframe width="560" height="315" src="https://www.youtube.com/embed/5AsgbwK6wfM" frameborder="0" allowfullscreen></iframe>
 
You'll learn how to build a simple Facebook bot step by step .The bot will not use any advanced AI algorithms but only a simple
IF based statements so you need to have some knowledge about Python language and Django framework .

<iframe width="560" height="315" src="https://www.youtube.com/embed/EOYnFUJyOlQ" frameborder="0" allowfullscreen></iframe>
Creating a Facebook app
-------------------------
-------------------------

A Facebook bot is just another type of Facebook apps so we need to create a Facebook app for our bot .

Simply go to [Facebook developers website](https://developers.facebook.com/) then create an app by providing information
details .

For the category of your app select Apps for Messenger then fill in the details and hit Create App ID button .


{% include image.html 
    img="images/content/facebook-bot/create-facebook-app.png" 
    title="In this tutorial we are going to learn how to build Facebook bots using Python and Django framework" 
%}

You will be redirected to your app dashboard so you can tweak different settings .

The most important setting is the associated page since your users will be interacted with your page .

So if you don't have a page yet go ahead and create one or just use an existing page then go to your messenger settings 

{% include image.html 
    img="images/content/facebook-bot/facebook-bot-settings.png" 
    title="In this tutorial we are going to learn how to build Facebook bots using Python and Django framework" 
%}

When you select a page and grant page permissions to your app ,a token to access the page will be generated .

You need this token so your app can be able to send messages to page users .

A Facebook bot needs to have a server side so you need a server to host your bot code which will process messages and 
respond with the appropriate messages depending on the logic you have implemented .This can be a simple IF statements and 
regular expressions or can be more advanced AI algorithms .

Setting up Django 
------------------
------------------

I'm assuming you already have Python and related development tools installed on your system .

Open up your terminal under Linux/MAC or command prompt under Windows and follow these steps .

Create a virtual environment with

     virtualenv env 
     source env/bin/activate 

Next install Django framework with 

    pip install django

Next create a Django project 

    django-admin.py startproject fb-django-bot         
    cd fb-django-bot
    python manage.py runserver

Your Django server will be running at 127.0.0.1:8000

The next thing is to create a Django app 

    python manage.py startapp  bot

Next wire up your app in the settings.py file under INSTALLED_APPS

    INSTALLED_APPS = [
    'django.contrib.admin',

    'django.contrib.staticfiles',
    'bot',]

Now we need to setup the URLS so go ahead and open the project urls.py file and add the app urls 

    urlpatterns = [
        url(r'^admin/', admin.site.urls),
        url(r'^bot/', include('bot.urls')),
    ]

So now we have created both a Facebook app for our bot and a Django project/app for the bot but how can we hook both 
apps to create our complete working Facebook messenger bot .

Hooking up Django server with Facebook messenger platform with Webhooks
------------------------------------------------------------------------
------------------------------------------------------------------------

How can our Django app receives messages sent from Facebook users to page/bot ?

Simply Facebook provides web hooks so whenever there is a realtime message (sent by users to page ) our server receives 
it via a hook .

How to hook up Facebook and our Django server ?

The steps are easy ,you just need to add an URL to your Django App then let Facebook knows about it so open bot/urls.py
and add the following url 

    from .views import bview
    urlpatterns = [
                    url(r'^a_secret_web_hook/?$', bview) 
                ]


Make sure you add a secret name for your web hook so you can avoid any intrusions from bad guys . 

You also need to create a view which handles requests from Facebook .Go ahead and open bot/views.py then add this view

    from django.http.response import HttpResponse
    def bview(request):
        return HttpResponse("Hello World")

So our web hook is 127.0.0.1:8000/bot/a_secret_web_hook/ but that is only accessible locally .To tell Facebook about
our hook we need to put our server online .

I'm going to use the free tier offered by Heroku to host the bot server which provides also HTTPS access required by 
Facebook to accept the url as a webhook for your messenger bot .

Next just copy the web hook and go to your Facebook app dashboard then look for Webhooks which is just below Token Generation
then click on setup WebHooks button 

{% include image.html 
    img="images/content/facebook-bot/setup-webhook.png" 
    title="In this tutorial we are going to learn how to build Facebook bots using Python and Django framework" 
%}


Next fill in the details as in the screen shot below .

{% include image.html 
    img="images/content/facebook-bot/subscription.png" 
    title="In this tutorial we are going to learn how to build Facebook bots using Python and Django framework" 
%}

The verification token is not the Page token your generated before but your own secret token ,you can use any password .
Also make sure you choose the subscription fields .

Next click Verify and Save button .The verification process will fail ,why ? 

Our web hook needs to return a challenge token which gets send with our secret token by Facebook when you hit Verify and Save

So before your verify again ,go to your bview function and modify it to return back the challenge token 


    from django.http.response import HttpResponse
    def bview(request):
        if request.GET['hub.verify_token'] == 'YOUR_SECRET_TOKEN':
            return HttpResponse(request.GET['hub.challenge'])
        else :
            return HttpResponse('Invalid Token !')


Now if you hit Verify and Save ,you should see a success message in the form of a green tick with a "complete" message 


Next hit Subscribe .You Django server will now receive any Page events that you have selected as POST requests .

{% include image.html 
    img="images/content/facebook-bot/subscribe.png" 
    title="In this tutorial we are going to learn how to build Facebook bots using Python and Django framework" 
%}


So that is all for this part ,in the next part we are going to see how to handle POST requests and send feedback to our 
users depending one the sent event .



















