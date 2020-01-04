---
layout: post
title: "YQL an alternative to Google Feed API for displaying RSS feeds"
image: "images/content/yql-an-alternative-of-google-feed-api-to-display-rss-feeds/titleimage.png"
excerpt: "In this tutorial we are going to learn how to use YQL, an alternative for the deprecated Google Feed API,to display RSS feeds in mobile apps or any JavaScript application"
tags : javascript 
---
{% include image.html
       img="images/content/yql-an-alternative-of-google-feed-api-to-display-rss-feeds/bigimage.png"
       title="YQL an alternative of Google Feed API to display RSS feeds"
%}

Many webmasters incoporate external RSS feeds into their websites using the Google Feed API,but lately the service was deprecated and will be shutdown on the end of 2016 so is there  a free alternative which is as good as the Google Feed API was ?

The anwser is yes and no ,yes there is free alternative to Google Feed API which YQL or the Yahoo Query Language and no it is not as good as the Google Feed API,at least in my opinion, but it will do the job for now so lets get started using it. 

How to use Yahoo's YQL API:
---------------------------

It's as simple as that 

		select * from rss where url = 'http://www.techiediaries.com/rss'

But lets show the detailed steps:

First lets grab the Yahoo YUI library by adding this script tag 

		<script src="http://yui.yahooapis.com/3.18.1/build/yui/yui-min.js"></script> 

Then you can execute any query using the following syntax

		YUI().use('yql', function(Y){
		    
		    var query = " select * from rss where url = 'http:www.techiediaries.com/rss.xml' ";
		    var q = Y.YQL(query, function(result) {
		    		
		    		console.log(result)    
		    })
		})

As you can see the query is very similar to SQL 

You can also experiment with YQL queries using the [YQL console](https://developer.yahoo.com/yql/console/)

So we put our query inside the query variable and then we invoke Y.YQL(query,callback) when the query executes successfully it returns a callback with the result in JSON format by default.

You can also get the result as XML by specifying the return format as xml :

		YUI().use('yql', function(Y){
		    var query = select * from rss where url = 'http:www.techiediaries.com/rss.xml' ";
		    var q = Y.YQL(query, function(result){

		    	console.log(result);
		    }, {
		        format: 'xml'
		    })
		})		

But we are going to stick with JSON. 				  

So after building our query and successfully getting the result back we need to parse the result which is simply a JSON object



		YUI().use('yql', function(Y){
		    
		    var query = " select * from rss where url = 'http:www.techiediaries.com/rss.xml' "
		    var items = [];
		    var q = Y.YQL(query, function(result) {
		    		
		    		console.log(result) 
			        var feed = result.query.results.item 
			        for (var i=0 ; i < feed.length; i++){

			        	var item = {
			        		title : feed[i].title,
			        		link : feed[i].link,
			        		description : feed[i].description
			        	}
			        	items.push(item);
			        }

		    })
		})

Now our declared items array has all rss items you can iterate over this array and display them using simple DOM manipulations .

Conclusion
------------------

That's it for this quick tutorial which shows you how to use YQL instead of the deprecated Google Feed API to fetch,parse and display RSS feeds in mobile app or any JavaScript application.
