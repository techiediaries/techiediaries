---
layout: post
title: "How to fix Facebook share uses wrong image or thumbnail ? "
image: "images/content/facebook-share-wrong-image-thumbnail.png"
excerpt: "How to fix Facebook share uses wrong image or thumbnail ? "
categories : socialmedia
tags : facebook 
---

{% include image.html
   img="images/content/facebook-share-wrong-image-thumbnail.png"
       title="How to fix Facebook share uses wrong image or thumbnail ?"
%}

I have recently shared one of my posts on Techiediaries to Facebook but the share box always uses a wrong image 
so why Facebook is showing wrong image/thumbnail and how to fix that ?

Facebook provides a set of Open Graph tags to let websites owners specify the social properties 
of their web pages and posts so when they are shared on their platform,Facebook is pulling things such as the title ,description ,image ,
locale and site name from your website uby refering to these tags .

So the first thing to fix Facebook showing wrong thumbnails is to make sure you have these tags on the head of your 
web pages  .If not then you need to add them ,otherwise Facebook will try to infer or guess these properties without
refering to the tags since they are not present .If Facebook doesn't get the correct ones don't blame it and simply add
the Open Graph tags .

How to verify if you have Open Graph tags on your web pages ?
--------------------------------------------------------------
--------------------------------------------------------------

You have two options ,both of them are easy 

The first option is to visit the page with your web browser then check the page source .On the head look for these
tags 

    <meta property="og:locale" content="en_US">
    <meta property="og:type" content="article">
    <meta property="og:title" content="Angular 2 CRUD generator ">
    <meta property="og:description" content="How to quickly generate a CRUD app based on Angular 2 tutorial ">
    <meta property="og:url" content="http://www.techiediaries.com/webdev/angular2-crud-generator/">
    <meta property="og:site_name" content="techiediaries">  
    <meta property="og:image" content=" http://www.techiediaries.com/images/content/angular2-crud-generator.png "> 

The second option is to use the [Open Graph Debugger](https://developers.facebook.com/tools/debug/og/object/) which shows you detaild problems and their descriptions

Then just provide the url of the page you want to check and click on “Show Existing Scrape Information” 

That is it if any of the open graph tags is missing or not properly specified you will get warnings telling either
to explicitly set the tag 

    “The’ og:image’ property should be explicitly provided, even if a value can be inferred from other tags.”

Or the tag is not correctly specified if you set the content to unsupported value .


How to add the Open Graph tags ?
-----------------------------------
-----------------------------------

There are also two options if you want to set the open graph tags .You can either add them manually but only
if you have manual control over the HTML source of your web pages ,for example if you are using a static generator
like Jekyll .Here is my own configuration of open graph tags 

    <meta property="og:locale" content="{{ site.locale }}">
    <meta property="og:type" content="article">
    <meta property="og:title" content="{% if page.title %}{{ page.title }}{% else %}{{ site.title }}{% endif %}">
    {% if page.excerpt %}<meta property="og:description" content="{{ page.excerpt | strip_html }}">{% endif %}
    <meta property="og:url" content="{{ page.url | replace:'index.html','' | prepend: site.url }}">
    <meta property="og:site_name" content="{{ site.title }}">  
    <meta property="og:image" content="{% if page.image %} {{ site.url }}/{{ page.image}} {% endif %}">  

How to add the Open Graph tags to WordPress ?
----------------------------------------------
----------------------------------------------

In case you don't have control of your HTML source ,for example if you are using Wordpress you have to use 
plugins such as 

Yoast WordPress SEO or  

[Facebook Open Graph, Google+ and Twitter Card Tags](http://wordpress.org/plugins/wonderm00ns-simple-facebook-open-graph-tags/)

Some bloggers are getting also wrong thumbnail when they are sharing Wordpress posts on Facebook even if they 
have the Yoast WordPress SEO .The only solution in this case is to update your plugin to the latest version 

For any problems like this ,the Open graph debugger is your solution just play with it and read carefully the 
warnings you get .Also when you fix all the warnings and still get wrong thumbnails especially for previously shared
posts or pages then you have to know that Facebook keeps track of your last 3 submitted/posted URLS so you need to
reset or clear the Facebook cache or otherwise the wrong post information will continue to circle on social feeds .

How to reset/clear Facebook cache ?
-------------------------------------
--------------------------------------

To clear and reset the Facebook cache you need to go to [open graph debugger](https://developers.facebook.com/tools/debug/)
then enter your page/post URL and hit Debug button .

Next click on "Fetch new scrape infomation " sometimes it still get wrong information so you need to wait some time
and hit the button again .

 





