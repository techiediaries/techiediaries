---
layout: post
title: "How to add a Greeting text for Facebook messenger bot "
image: "images/content/messenger-bot-greeting-text.png"
excerpt: "In this tutorial we are going to learn how to add a greeting text to Facebook messenger bot  " 
tags: bots
---

{% include image.html 
    img="images/content/messenger-bot-greeting-text.png" 
    title="messenger bot greeting text " 
%}

On the previous posts ,we have seen how to add a [Get started button to messenger bot]() and how to add a [persistent 
menu]() .On this tutorial we are going to see another option to customize your bot using a personalized and localized greeting text .

The greeting text is only shown on the first interaction of a user with the bot ,you can use it to tell or introduce
the bot to users .

The greeting text is local aware which means that you can add multiple greeting texts ,one for each local and 
a greeting text for the default local which will be set if no greeting text is matching the user's local .

How to add a greeting text to messenger bots ?
-----------------------------------------------
-----------------------------------------------

So now after ,we have seen where and when greeting texts are used ,how can we add a greeting text to a messenger bot ?

To set a greeting text we just need to send a Post request to your messenger profile url with your page access token
https://graph.facebook.com/v2.6/me/messenger_profile?access_token=PAGE_ACCESS_TOKEN

So using a curl 

    curl -X POST -H "Content-Type: application/json" -d '{
    "greeting":[
        {
        "locale":"default",
        "text":"Greeting text for default local !"
        }, {
        "locale":"en_US",
        "text":"Greeting text for en_US local !"
        }
    ] 
    }' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=PAGE_ACCESS_TOKEN"    

Replace PAGE_ACCESS_TOKEN with your generated page access token .

If the operation is successful you'll get the following response

    {
    "result":"success"
    }

On the same way you can delete the greeting text using a DELETE request .

So again using curl 

    curl -X DELETE -H "Content-Type: application/json" -d '{
    "fields":[
        "greeting"
    ]
    }' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=PAGE_ACCESS_TOKEN"    

How to personalize greeting text ?
-----------------------------------
-----------------------------------

You can add a bit of personalization to your greeting text using user's name via three template strings 

{{user_first_name}}

{{user_last_name}}

{{user_full_name}}

For example 

    curl -X POST -H "Content-Type: application/json" -d '{
    "greeting":[
        {
        "locale":"default",
        "text":"Welcome {{user_first_name}}!"
        }
    ] 
    }'  "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=PAGE_ACCESS_TOKEN"    

