---
layout: post
title: "How to build a messenger bot with JavaScript and Node.js "
image: "images/content/messenger-bot-nodejs.png"
excerpt: "In this tutorial we are going to learn how to build a Facebook messenger bot with Node.js " 
tags: [bots, nodejs] 
---

{% include image.html 
    img="images/content/messenger-bot-nodejs.png" 
    title="create messenger bot with node.js " 
%}

Facebook allows developers to build bots for messenger platform .The bot can either be a conversational bot which 
uses composer input to communicate with the user or a web like app with menus and buttons which may have composer input 
disabled depending on developer choice.

<iframe width="560" height="315" src="https://www.youtube.com/embed/EOYnFUJyOlQ" frameborder="0" allowfullscreen></iframe>


Before you can build your messenger bot you need to create both a Facebook app and a page which users will
interact with to be able to use or send messages to the bot .

Now lets find out how to create a messenger bot using Node.js

A messenger bot needs its own server for implementing its own logic and to receive realtime events and messages 
from Facebook .

You also need to authenticate your bot with Facebook (will do that via code ) and needs also to be approved to be able to communicate 
with the public (No need to be approved when you are still developing the bot since you ,as a developer ,can use it and you can also 
add testers to use your bot when it is still not approved )

As we said your bot needs to be publicly available so you have three options in this regard :

<ul>
<li>Buy a hosting server if you are building a real bot (not just a demo for learning )</li>
<li>Use free hosting servers such as Heroku or delta now if you are building a demo bot </li>
<li>Use ngrok to expose your local development server to the public Internet </li>
</ul>  

I'm going to use the third option which is ngrok .

Ngrok is a very useful tool which allows you to expose the local network machine to the public Internet so you 
don't have to use a hosting server when you are still developing your projects ,particularly projects such as 
messenger bots that need to be publicly accessible since they have to receive real time messages from Facebook .

To start using ngrok all you have to do is to go to [https://ngrok.com/download](https://ngrok.com/download) then
download the version compatible with your operating system .

The next step is to unzip it somewhere on your machine .

Then just open up a terminal/command prompt and run it with 

    ./ngrok http 8000

which exposes a web server on port 8000 on your local machine to the public Internet .

You can get more information on how to use ngrok from the [documentation](https://ngrok.com/docs/2)

Next we need to start the local server on port 8000 and build our bot .

Since we are using Node.js you need to install both Node.js and NPM (Node Package Manager) on your machine if it is not already installed .
You can download Node.js from its [official website](https://nodejs.org/) .

Now open up your terminal or command prompt ,navigate inside a working directory and create a Node.js project 
with :

    npm init

Just enter the necessary information when prompted and hit enter .

For creating a web app ,we are going to use Express ,a very popular ,powerful and lightweight framework 
for building web apps .     

So you first need to install the required npm packages 

        npm install express request body-parser --save

Request is a Node.js module which allows you to send HTTP requests (to communicate with Facebook API) .

Body-parser is a Node.js module to process incoming requests (Received from Facebook messenger platform )

Express is a framework for building web apps .

Next create an index.js file and put the following code to setup a basic web app

    'use strict'

    //start by requiring the following packages 

    const express = require('express')
    const bodyParser = require('body-parser')
    const request = require('request')
    const app = express()        

    //set the port to 8000 (the port we used with ngrok )

    app.set('port', (process.env.PORT || 8000 ))

    // Process application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({extended: false}))

    // Process application/json
    app.use(bodyParser.json())

    // setup a route 
    app.get('/', function (req, res) {
        res.send("Hello , I'm a bot ")
    });

    app.listen(app.get('port'), function() {
        console.log('server running at : ', app.get('port'))
    });


Now save your index.js and then run your app with 

    node index.js 

You should be able to visit your web app via either 127.0.0.1:8000 or your ngrok generated url .

You should get 

    Hello ,I'm a bot 

Now if everything is OK .Lets add the code required for messenger bots 

To allow your bot to autheticate itself or verify itself with Facebook you need to add another route 

    //Put any token here like your password for example 
    const FACEBOOK_VERIFY_CODE = '0123456789';

    app.get('/webhook/', function (req, res) {
        if (req.query['hub.verify_token'] === FACEBOOK_VERIFY_CODE) {
            res.send(req.query['hub.challenge'])
        }
        res.send('Error : wrong token');
    })

Creating a Facebook app for messenger 
--------------------------------------
--------------------------------------

So now it is time to create a Facebook app .Go to [https://developers.facebook.com/apps/](https://developers.facebook.com/apps/)
and create a Facebook app (choose apps for messenger category)

{% include image.html 
    img="images/content/facebook-bot/create-facebook-app.png" 
    title="create facebook app for messenger" 
%}

Next you need to setup your hook where your server and Facebook will hook up so go to the messenger tab then to
setup webhook and enter the URL of ngrok url ,Mine is https://febc7c34.ngrok.io/webhook/ 

{% include image.html 
    img="images/content/facebook-bot/setup-webhook.png" 
    title="bot webhook" 
%}

Also check the events you want to subscribe for .If you don't know what are they just check all of them for now .


{% include image.html 
    img="images/content/facebook-bot/subscription.png" 
    title="bot subscriptions" 
%}

Now you need to choose the page you want to subscribe to then  grab a page access token and put it in a variable on your index.js (we will need it later )

    const PAGE_ACCESS_TOKEN  = 'your generated page access token '; 


{% include image.html 
    img="images/content/facebook-bot/facebook-bot-settings.png" 
    title="messenger bot settings" 
%}

Now if you click on verify and save you should see a green tick with completed message .This means that Facebook
has successfully verified your bot .

{% include image.html 
    img="images/content/facebook-bot/subscribe.png" 
    title="bot subscribe" 
%}

For the complete step by step guide with screen shots see this [tutorial](/facebook-messenger-bot-python-django)


Securing your messenger bot 
------------------------------
---------------------------

For security reasons you need to remove hard coded secrets from you code ,both your verification token and your 
page access token and instead use environment variables to set and access your tokens .For example  

    const PAGE_ACCESS_TOKEN  = process.env.PAGE_ACCESS_TOKEN;

Before you launch your app in terminal use ,provide the token with :

    export PAGE_ACCESS_TOKEN="your page access token here";

When deploying to a production server you should look for methods to set the environment variables which depend 
on each host .



Setup the bot get started button ,greeting text and persistent menus 
---------------------------------------------------------------------
---------------------------------------------------------------------

Facebook allows you to build bots that look like apps by providing elements to expose the same user interfaces 
you usually use with normal apps .You can even disable composer input and only allow users to interact with your 
bot via menus and buttons .So now we will se how to setup 

<ul>
<li>

<a href="/messenger-bot-get-started-button">A Get started button</a> .  

</li>
<li>

<a href="/messenger-bot-greeting-text">A greeting text</a> .

</li>
<li>

<a href="/messenger-bot-persistent-menu">A persistent menu</a> . 

</li>
</ul>

You can either use curl tool to send post requests to your messenger platform profile to setup these features 
since you only need to do this for one time or you can do this from the code so just add another route to your 
express app

    app.get('/setup',function(req,res){

        setupGetStartedButton(res);
        setupPersistentMenu(res);
        setupGreetingText(res);
    });

You now need to implement these functions .

    function setupGreetingText(res){
    var messageData = {
        "greeting":[
            {
            "locale":"default",
            "text":"Greeting text for default local !"
            }, {
            "locale":"en_US",
            "text":"Greeting text for en_US local !"
            }
        ]};
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

    function setupPersistentMenu(res){
    var messageData = 
        {"persistent_menu":[
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
        ]};  
    // Start the request
    request({
        url: "https://graph.facebook.com/v2.6/me/messenger_profile?access_token="+ PAGE_ACCESS_TOKEN,
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


    function setupGetStartedButton(res){
    var messageData = {
            "get_started":{
                "payload":"getstarted"
            }
    };
    // Start the request
    request({
        url: "https://graph.facebook.com/v2.6/me/messenger_profile?access_token="+ PAGE_ACCESS_TOKEN,
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

For setting up these features you just need to visit your https://febc7c34.ngrok.io/setup url with your browser .
If you get success messages then the features are successfully set .


How to send and receive messages between bot server and Facebook ?
----------------------------------------------
----------------------------------------------

After setting up the greeting text ,the Get started button and the persistent menu we need to be able to communicate
with our bot  i.e the bot needs to be able to process incoming events and messages and send back the appropriate 
messages to users .

So we need add two functions a receivedMessage function and a sendMessage function .

Facebook will send any messages/events as POST requests to our hook url so you just need to add this code 
to your code to listen for POST requets coming from Facebook .

    app.post('/webhook', function (req, res) {
    var data = req.body;

    // Make sure this is a page subscription
    if (data.object === 'page') {

        
        data.entry.forEach(function(entry) {
        var pageID = entry.id;
        var timeOfEvent = entry.time;

        entry.messaging.forEach(function(event) {
            if (event.message) {
                
            //receivedMessage(event);
            
            } else {
            
            if(event.postback)
            {
                //receivedPostback(event);
            }      

            }
        });
        });

        // You should return a 200 status code to Facebook 
        res.sendStatus(200);
    }
    });

We have named our hook path /webhook/ but in practice you should use a hard to guess path to avoid intruders 
spying on your requests .

We just Iterate over all events (There may be multiple messages if they are batched )

Then for each entry we iterate over each messaging event  .

Next we check for the type of the event to process it appropriately .For example if the event has a message 
object then it is a text message and if it has a postback object then it is a postback message etc ..

On the end of the function you should return a response with 200 status code to Facebook so it will knows 
you have successfully received the event .

Next we need to add the receivedMessage function which will be invoked for text messages .

    function receivedMessage(event) {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;

    var messageId = message.mid;

    var messageText = message.text;
    var messageAttachments = message.attachments;
    if (messageText) {

        // If we receive a text message, check to see if it matches a keyword
        // and send back the example. Otherwise, just echo the text we received.
        switch (messageText) { 
        case 'help' :
            var msg = "So you need my help ? ";         
            //sendTextMessage(senderID,msg); 
            break;

        default :
            //sendTextMessage(senderID,"I'm not sure I can understand you !");
        break;
        }
    }
    }     

So when we receive an event with a message object we call the receivedMessage function which in its turn 
checks the message object for text object .If it is available we execute some logic depending on the sent message .

We have just added a switch statement which simply checks for the message sent by user and replies with an 
appropriate action .

If user send message with 'help' text the bot responds with 'So you need my help ?' otherwise it just send back 
"I'm not sure I can understand you !"

You can implement your own logic here for a more useful bot or you can even add AI algorithms to make the bot smarter .
It is really up to you .


Processing postbacks 
------------------------
------------------------

If the event has a postback object then our app calls receivedPostback function

We particularly need to process the postback received event to respond to Get started button we have added before 
since it sends a postback with a payload (any text message we choose )  when clicked 

here is a possible implementation of this function :


    function receivedPostback(event) {
        var senderID = event.sender.id;
        var recipientID = event.recipient.id;
        var timeOfMessage = event.timestamp;
        var payload = event.postback.payload;
        switch(payload)
        {
            case 'getstarted':
                var msg =" Hi,I'm a bot created as a demo for a \n"+
                         " tutorial to build messenger bots by techiediaries.com\n" ;

                //sendTextMessage(senderID,msg);
                break;
            default :
                var msg = "Implement logic for this Postback";
                //sendTextMessage(senderID,msg); 
            break;
        }
        
    }


Now lets add code for the sendTextMessage function which communicates with Facebook API to send text messages 
to bot users .

    function sendTextMessage(recipientId, messageText) {
        var messageData = {
            recipient: {
            id: recipientId
            },
            message: {
            text: messageText
            }
        };
        // call the send API
        callSendAPI(messageData);
    }  

And here is the implementation of callSendAPI


    function callSendAPI(messageData) {
        request({
            uri: 'https://graph.facebook.com/v2.6/me/messages',
            qs: { access_token: PAGE_ACCESS_TOKEN },
            method: 'POST',
            json: messageData

        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
            var recipientId = body.recipient_id;
            var messageId = body.message_id;
            //successfull 

            } else {
                console.error("Unable to send message.");
                console.error(response);
                console.error(error);
            }
        });  
    }

You can send any types of messages not just text messages such as location and button messages or messages with
quick replies etc.

You can also see this tutorial for Python : [How to build messenger bot with Python and Django](/facebook-messenger-bot-python-django)






