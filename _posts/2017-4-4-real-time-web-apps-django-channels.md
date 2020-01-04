---
layout: post
title: "Building Real time web apps with Django channels"
image: "images/content/real-time-web-apps-django-channels.png"
excerpt: "In this tutorial we are going to learn how to Django channels to build real time web apps " 
tags : django

---

{% include image.html 
    img="images/content/real-time-web-apps-django-channels.png" 
    title="real time apps with django channels " 
%}

Django is a fully featured web framework for building web applications using the general purpose Python language .
Django creators call it the pragmatic framework for perfectionists with deadlines which is really true .If you have
already used Django for building web apps for clients then you already know how Django makes it dead easy to build 
a web application from the initial prototype to the final product .But Django was created ten years ago for 
satisfying the requirements for that era .Back then the web wasn't as modern and complex as today since 
the great portion of web apps were a bunch of static pages rendered on the server after fetching and formatting 
some data from a database .Developers used the popular MVC (Model View Controller ) design pattern to structure 
their code .Now it is 2017 ,the web has dramatically changed the web is seeing or has already seen the rise 
of the real time apps with a lot of interactions .Users don't have to refresh the page each time to see the updates .Apps can send 
real time notifications and updates whenever they are available etc .This is all possible thanks to the new technologies that emerged 
such as 

<ul>
<li>
WebRTC
</li>
<li> 
WebSockets
</li>  
<li>
HTTP 2
</li>
</ul>

Which are protocols or set of protocols designed for browsers to allow two-way communications by providing 
mechanisms to open persistent connections between browsers and servers in the case of WebSockets and direct
peer to peer communication between browsers without servers (Only for signaling) as in the case of WebRTC .

When Django was created ,these technologies did not exist and real time wasn't a requirement so the framewok 
was built around strict HTTP request and response cyles .

When you visit a web application ,the browser simply makes an HTTP request .On the server where your app lives 
Django calls the associated view ,which is simply a function that do some work such as processing ,getting 
data from database and formatting it then returns a response which gets sent to the browser with the HTML 
content (Plus styles and JavaScript ) as a payload ,the browser then renders the web pages .

In the traditional HTTP Request - HTTP Response cycle ,the Django view function which gets called when 
a new request is made ,stays only as long as the request lives and we can't hold a connection open or communicate 
with the browser (client) when the request dies so we can't take benefits from the new real time protocol 
or WebSockets .

But since Django is still a very popular framework that's still adopted by a huge base of web developers ,the team
behind this framework decided to support the real time web but without changing the way the framework is used so they have
come up with Django channels .

So what is Django Channels ?

Channels extends Django to add tow crucial features of realtime web which are 

<ul>
<li>Support of WebSockets but still using the old views </li>
<li>Runnung background tasks in parallel with Django </li>
</ul>

To use Django Channels you just need to install it via PIP with any version of Django starting from 1.8 

Building a simple real time echo app with Django Channels 
---------------------------------------------------------
---------------------------------------------------------

After creating a virtual environment and installing Django ,you can then install Channels with PIP 

    pip install -U channels

Next you need to add channels to your project installed apps 

    INSTALLED_APPS = (
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.sites',
        ...
        'channels',
    )    

Thanks to Channels ,Django is still the framewok you are familiar with but has some new concepts which you need
to know if you want to build real time web apps .

<ul>
<li>
Channel layer which is simply a kind of a message queue such as Redis 
</li>
<li>Producers</li> are webscockets clients which send messages 

<li>Consumers </li> are functions which consume sent messages (like views )
</ul>

You can use any ASGI-compliant channel layer with Django Channels or you can even write your own custom 
channel .In this example we will use Redis so let is install it first with PIP

    pip install asgi_redis

Next we need to specify the channel we want to use in CHANNEL_LAYERS

    CHANNEL_LAYERS = {
        "default": {
            "BACKEND": "asgi_redis.RedisChannelLayer",
            "CONFIG": {
                "hosts": [os.environ.get('REDIS_URL', 'redis://localhost:6379')],
            },
            "ROUTING": "echo.routing.channel_routing",
        },
    }

Next create a Django app inside your project ,let is call it chat 

    manage.py startapp echo

Then add the app to your installed apps in settings.py 

    INSTALLED_APPS = (
        #...
        'echo',
    )

With Django Channels ,terminologies are different so keep in mind views become consumers and urls are simply 
routes 

Now lets create our first consumer (view) which will handle messages sent through WebSockets from a browser .

The consumer is very simple it just echo back the messages it receives to the client .

    def ws_receive(message):
        message.reply_channel.send({
            'text': message.content['text'],
        })

 
Next we need to create a route so under your echo app create a routing.py file

    cd echo 
    touch routing.py

Open routing.py and add this code to create a route 

    from channels.routing import route

    channel_routing = [
        route('websocket.receive', 'echo.consumers.ws_receive'),
    ]



