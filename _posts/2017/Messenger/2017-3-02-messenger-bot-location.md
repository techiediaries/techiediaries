---
layout: post
title: "Get user location in Facebook messenger bots "
image: "images/content/messenger-bot-location.png"
excerpt: "In this tutorial we are going to learn how to get user location so you can build messenger bots that offer custom experiences depending on the user location  " 
tags: bots
---

{% include image.html 
    img="images/content/messenger-bot-location.png" 
    title="messenger bot location" 
%}

Requirements 
------------------
------------------

Before we start you need to create a Facebook app for your bot and a page which users will contact to interact
with the bot .For a detailed step by step tutorial on how to do that see this tutorial .

You also need ,either 
<ul>
<li>To setup a new server to host your messenger bot code (You can use Heroku free tier ) or </li>
<li>Use ngrok to publicly expose your local host to the Internet (So your server can receive realtime updates from Facebook) </li>
</ul>

When developing your bot ,the recommended way is to use ngrok and develop your bot on your local machine until 
you finish iterating then you can use a hosting server for production (Heroku or delta now for Node.js hosting) 

I'm using Node.js but feel free to use any programming language for web development you are comfortable with ,  
Such as PHP ,see this tutorial on [how to create a Facebook messenger bot using PHP]() or Python ,feel free to check
this tutorial [how to build messenger bots with Python]().

The purpose of this tutorial is to show you how to use the user location in messenger bots so you can offer a custom 
experience to your bot users .This tutorial doesn't cover every step we need to do to create a bot with Node.js .
For a complete and step by step tutorial see [how to build messenger bots with JavaScript and Node.js]()   

How to get user location 
--------------------------
--------------------------

To get the user location ,the user must send the location ,unfortunately this is only available on messenger app
for mobile .

So we will start by asking the user to send his location .We can do that for example in the first message

You can also use [quick replies]() to enable users to easily send their location .

This is the web hook to subscribe to Facebook realtime updates 

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
            receivedMessage(event);
            } else {
            console.log("Webhook received unknown event: ", event);
            }
        });
        });

        res.sendStatus(200);
    }
    });

Here is the implementation of the receivedMessage function to process incoming events .

    function receivedMessage(event) {
        var senderID = event.sender.id;
        var recipientID = event.recipient.id;
        var timeOfMessage = event.timestamp;
        var message = event.message;
        var messageId = message.mid;
        var messageText = message.text;
        var messageAttachments = message.attachments;
        if (messageText) {
            var msg = "Hi ,I'm LocationBot ,and I was created to echo back your latitude and longitude coordinates "+
                      "You just need to send me your location  \n" + 
                      "Using the send location button on messenger (only available on mobile devices) \n"+
 
            switch (messageText) { 
                case 'getstarted' :
                    sendTextMessage(senderID, msg);   
                default:
                    sendTextMessage(senderID, msg);
            }

        } else if (messageAttachments) {
                var lat = null;
                var long = null;
                if(messageAttachments[0].payload.coordinates)
                {
                    lat = messageAttachments[0].payload.coordinates.lat;
                    long = messageAttachments[0].payload.coordinates.long;
                }
                        
                var msg = "lat : " + lat + " ,long : " + long + "\n";
                
                sendTextMessage(senderID, msg);
                
            }
    }

Bots can not start a conversation with users ,this is a counter measure to prevent spam so you need to initiate 
the conversation with your bot ,in our case we start by sending 'getstarted' message to the bot .The bot then 
will send you a message in which he identifies itself 

    "Hi ,I'm LocationBot ,and I was created to echo back your latitude and longitude coordinates "+
    "You just need to send me your location  \n" + 
    "Using the send location button on messenger (only available on mobile devices) \n"

And asks the user to send his location using the messenger send button .

Well I know this is not the best thing to do so you have better options .You can either :
<ul>
<li>
Send this message whenever the user sends a message other than his location 
</li>

<li>    
Or [add Get Started button to your bot]() which doesn't produce any misunderstanding for the user in his
first experience with the bot .
</li>
</ul>

For the sendMessage logic see [build messenger bots with Node.js tutorial]()

Now lets understand the logic behind getting the sent user location .

We first get the message from the event 

    var message = event.message;

Then we check if it is a text message or a message with an attachment because the location is sent as an attachment 


    if(message.text)
    {
        // it is a text message 
    }
    else if(message.attachments)
    {
        //It is a possible location message
    }    

So if it is a message with attachments we need to check if the first attachment has a payload with a coordinates 
object and then get latitude and longitude from the coordinates object . 

    if(message.attachments[0].payload.coordinates){
        // It is a location object
        var lat = message.attachments[0].payload.coordinates.lat;
        var long = message.attachments[0].payload.coordinates.long;
    }

Conclusion
---------------
---------------

Bots are the new apps for the social media era .Combining them with other features such as the user location 
enables us to offer better experiences to users .

I hope the tutorial was helpful for you and see you on other tutorials .If you have any questions or suggestions
please don't hesitate to drop a comment below .



