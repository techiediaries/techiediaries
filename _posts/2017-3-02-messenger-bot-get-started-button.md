---
layout: post
title: "How to add a Get started button to Facebook messenger bot "
image: "images/content/messenger-bot-get-started-button.png"
excerpt: "In this tutorial we are going to learn how to add a Get started button to Facebook messenger bot  " 
tags: bots 
---

{% include image.html 
    img="images/content/messenger-bot-get-started-button.png" 
    title="messenger bot get started button " 
%}

Bots are on their way to become the new apps and Facebook is constantly improving its messenger 
platform to support app like interfaces and other features so developers can build messenger bots which offer
more advanced user experiences .

In this tutorial we are going to learn about an important messenger bot setting which allows you to add a Get 
started button to your bot so users get a clear idea on how to start interacting with the bot .

As you may know ,in order to avoid bot spam ,bots can not start conversations with users so the first ever message 
has to be always sent by a user not the bot .In this case the user may not have a clear idea on how to start 
interacting with the bot ,well he can send any message such as Hi but there is a better option which is adding 
a Get started button to your bot ,the user can clearly see it and start talking to the bot by clicking on the 
obvious Get started button .

Once the user taps the Get started button you can send a personlized message to tell the user how he can use the 
bot or add buttons to allow him to take actions .

This tutorial shows you only how to add a Get started button to your messenger bot .See this tutorial for a complete tutorial on 
[how to build a messenger bot with Node.js](/build-messenger-bot-nodejs) .You can also use [Python to build bots](/facebook-messenger-bot-python-django) , PHP , or any server side programming
language .


How to add a Get started button ?
--------------------------------
--------------------------------

You can easily add a Get started button to your bot by sending a Post request to this URL :

https://graph.facebook.com/v2.6/me/thread_settings?access_token='+ PAGE_ACCESS_TOKEN

Of course you need to replace PAGE_ACCESS_TOKEN by your page access token that you can get from your bot app .

The form data of the POST request must contain these parameters :

    var formData = {
            "get_started":[
            {
                "payload":"USER_DEFINED_PAYLOAD"
                }
            ]
    };

You can send this using either cUrl :

    curl -X POST -H "Content-Type: application/json" -d '{ 
    "get_started":{
        "payload":"GET_STARTED_PAYLOAD"
    }
    }' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=PAGE_ACCESS_TOKEN"    



Make sure you replace both USER_DEFINED_PAYLOAD and PAGE_ACCESS_TOKEN with concrete values .

USER_DEFINED_PAYLOAD can be any value you wish for example action@getStarted .      

Since this is only a one time setting or you can send using code on your prefered language .For example using 
JavaScript and Node.js here is how to send this post using the request module 

First install the request module from npm 

    npm install request --save

Then you need to import it on your code with 

    const request = require('request')

The add a function to handle the setup logic 

        function setupGetStartedButton(res){
            var messageData = {
                    "get_started":[
                    {
                        "payload":"USER_DEFINED_PAYLOAD"
                        }
                    ]
            };

            // Start the request
            request({
                url: 'https://graph.facebook.com/v2.6/me/messenger_profile?access_token='+ PAGE_ACCESS_TOKEN,
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                form: messageData
            },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    // Print out the response body
                    res.send(body);

                } else { 
                    // TODO: Handle errors
                    res.send(body);
                }
            });
        }        

This function needs to be triggered only one time so just add a route with any name which you need to 
visit with your web browser to trigger the setup function .


Using Express framework on Node.js you can easily add a GET route with 

    const express = require('express')
    const app = express()
    app.get('/setup',function(req,res){

        setupGetStartedButton(res);
    });


Make sure your bot app is subscribed to postbacks on your webhook .

If the setup of the setting is succesful you will get this message 

    {
    "result":"success"
    }  

How to handle Get started button response ?
--------------------------------------------
--------------------------------------------

When the users taps or clicks on the Get started button a postback received button will be triggered  with the 
user defined payload you have provided on the setting setup .

Here is the JavaScript code which receives realtime updates sent by Facebook to your bot server 

    app.post('/webhook', function (req, res) {
    var data = req.body;

    // Make sure this is a page subscription
    if (data.object === 'page') {

        // Iterate over each entry - there may be multiple if batched
        data.entry.forEach(function(entry) {
        var pageID = entry.id;
        var timeOfEvent = entry.time;

        // Iterate over each messaging event
        entry.messaging.forEach(function(event) {
            if (event.message) {
            //receivedMessage(event);
            } else {
                // If the event is a postback and has a payload equals USER_DEFINED_PAYLOAD 
            if(event.postback && event.postback.payload === USER_DEFINED_PAYLOAD )
            {
                    //present user with some greeting or call to action
                    var msg = "Hi ,I'm a Bot ,and I was created to help you easily .... "
                    //sendMessage(event.sender.id,msg);      
            }      

            }
        });
        });

        res.sendStatus(200);
    }
    });

How to delete the Get started button ?
---------------------------------------
---------------------------------------

You can delete the Get started button by sending a DELETE request using cUrl

    curl -X DELETE -H "Content-Type: application/json" -d '{
    "fields":[
        "get_started"
    ]
    }' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=PAGE_ACCESS_TOKEN"    



Conclusion
-------------
-------------

That is all for this tutorial ,I sincerely hope this post help you clarify things about the Get started button
for messenger bot .

If you have any suggestion or question don not hesitate to drop me a comment below .I'll be more than happy to 
help you .

[Facebook Get started documentation](https://developers.facebook.com/docs/messenger-platform/messenger-profile/get-started-button)

