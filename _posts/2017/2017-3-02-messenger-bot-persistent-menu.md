---
layout: post
title: "How to add a persistent menu to Facebook messenger bot "
image: "images/content/messenger-bot-persistent-menu.png"
excerpt: "In this tutorial we are going to learn how to add a persistent menu to Facebook messenger bot  " 
tags: bots 
---

{% include image.html 
    img="images/content/messenger-bot-persistent-menu.png" 
    title="messenger bot persistent menu " 
%}

On the previous tutorial ,we have seen [how to add a Get started button to your bot]() so your users can clearly  
understand how they can interact with your bot on their first experience .Now we will see another cool messenger bot
user experience feature added by Facebook to improve the bot platform which are persistent menus .Yes you can 
add menus to your bot just like any normal app .

Instead of talking to bot via text messages the developer have the choice of creating persistent menus which has 
multiple and nested items so users can interact with bot via clickable menus .

Developers can even create bots that prevent users from typing in and entering text messages as the way 
of interaction and reply ,instead offering persistent menus and other UI elements as an alternative to 
use the bot .

A persistent menu is a menu which is always available to the user .

<iframe width="640" height="360" src="https://www.youtube.com/embed/AL-jFEFamTU" frameborder="0" allowfullscreen></iframe>


You can either add text or URLs to your menu or another nested menu  .

If you click on url you will be taken to that URL website .

If you click on text item the value will be sent as postback message .

How to add a persistent menu to messenger bot ?
------------------------------------------------
------------------------------------------------
 
Now lets find out how to add a persistent menu to your messenger bot .

Just like we did with the Get started button on the previous tutorial we can add a persistent menu by 
sending a Post request to https://graph.facebook.com/v2.6/me/thread_settings?access_token=PAGE_ACCESS_TOKEN

Before you can add a persistent menu you need to add a Get started button first .

Using cUrl you can send a POST request with these parameters 

    curl -X POST -H "Content-Type: application/json" -d '{
    "persistent_menu":[
        {
        "locale":"default",
        "composer_input_disabled":true,
        "call_to_actions":[
            {
            "title":"Info",
            "type":"nested",
            "call_to_actions":[
                {
                "title":"Help",
                "type":"postback",
                "payload":"HELP_PAYLOAD"
                },
                {
                "title":"Contact Me",
                "type":"postback",
                "payload":"CONTACT_INFO_PAYLOAD"
                }
            ]
            },
            {
            "type":"web_url",
            "title":"Visit website ",
            "url":"http://www.techiediaries.com",
            "webview_height_ratio":"full"
            }
        ]
        },
        {
        "locale":"zh_CN",
        "composer_input_disabled":false
        }
    ]
    }' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=YOUR_ACCESS_TOKEN_HERE"


Don't forget to replace PAGE_ACCESS_TOKEN with your bot page access token .

If the request succeeded and a menu was added you will get a success response 

    {
    "result":"success"
    }  


How to delete the persistent menu ?
------------------------------------
------------------------------------

If you don't want the persistent menu you can delete it easily by sending a delete request 

    curl -X DELETE -H "Content-Type: application/json" -d '{
    "fields":[
        "persistent_menu"
    ]
    }' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=PAGE_ACCESS_TOKEN"    


How to disable composer input ?
--------------------------------
--------------------------------

You can build bots that interact with users without using text input but only via menus ,quick replies ,structured
messages and buttons .

To disable the composer input all you need to do is to set composer_input_disabled attribute to true when you are
adding your persistent menu .


Conclusion
----------
----------

By adding persistent menus messenger bots become more like a stripped version of a web app inside messenger which
make it easy for people to understand how to use the bot and what to expect from the bot but also rises another
questions such as why do we even need to use the bots instead of existing normal web apps ?

[Persistent menus documentation](https://developers.facebook.com/docs/messenger-platform/thread-settings/persistent-menu)

[Facebook’s new Messenger menus could mean the end of chatting with chatbots](http://www.digitaltrends.com/mobile/facebook-messenger-chatbot-menus/)

Feel free to add your question by droping a comment below .
