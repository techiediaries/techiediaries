---
layout: post
url: /blogging-jekyll-github-pages
title: Blogging With Jekyll And GitHub Pages
author: mrnerd
tags : jekyll 
---
Jekyll is a Ruby static site/blog generator created by GitHub for GitHub pages .Jekyll allows to create a fully fledged blog using only static files,you don't need anything like database or PHP all you have to do is install Ruby and Jekyll ,choose a template which suits your needs and then start your blog and guess what you can benefit from a high quality hosting for free using GitHub pages so you don't need cheap low quality hosting or otherwise high price hosting .You can use Jekyll instead of WordPress for starting your blog with all the benefits of WordPress .

Jekyll is a static site generator which means you get your static website generated from a bunch of markdown and html files and ready to be served.There exists many static site generators but what's great about Jekyll, among other features,it's the engine behind GitHub Pages. So hosting your Jekyll generated website with GitHub can't get more easy.

Jekyll is blog aware which means it has the tools any blogger needs such as pages ,posts ,permalinks,pagination,categories and custom layouts out of the box and you can install plugins to enhance the features of Jekyll .The community around Jekyll has created all types of plugins a blogger needs and also there are free and paid Jekyll themes or templates ready to use .

Jekyll is Ruby Gem but you don't really need to know Ruby to work with Jekyll.All you have to know is how to install Ruby Gems.

Jekyll uses Markdown ,Yaml and JSON for configuration and for adding meta information to pages and blog posts so you should have some knowledge of them,don't worry they are not hard at all .

If you are asking about SEO(Search Engine Optimization) ,which something every blogger or website owner who needs to get organic traffic from search engines, asks about.Don't worry Jekyll is considered more powerful than WordPress in this area because you have full control of your content structure with Jekyll.You don't need SEO plugins with Jekyll to optimize your blog for SEO.

As i said before GitHub pages uses Jekyll in fact it was created for the sake of hosting GitHub pages .So you can host your Jekyll powered blog or website using GitHub user or project pages and you can link your domain name to your Jekyll website using a CNAME file inside your GitHub repository that contains your blog files .So if you decide to create your blog with Jekyll and host it with GitHub here how :

Many developers don't know that they can use GitHub for hosting their websites for free with GitHub pages with only some limitations:

You can only host static sites ,static here means no server side code like PHP or Python only HTML,CSS and client side JavaScript but don't underestimate what you can do with only JavaScript.

Your website files are stored in a public repository so make sure you don't put sensitive data because it's accessible to anyone.

GitHub offers two types of pages ,user or organisation pages and project pages.Each user has only one user page but unlimited project pages each one linked to a project repository so you can host unlimited static sites with GitHub without paying a dime.

You can have your personal /portfolio website or blogging website for free you only need to pay to purchase a domain name which's around 12$/year so how that sounds ?

Think about it ,why do you need a WordPress hosted website for a personal site or even a blogging platform which costs you money each month if you can have an even faster personal or blogging website with free and great(since it's in GitHub) hosting.

Now lets introduce Jekyll which you can use to create a fully fledged blogging platform as a static website so you have the power and features of a blogging engine without the hassle of server side software.

How to install Jekyll ?

I'm assuming you have Ruby already installed in your computer (I not just follow this small tutorial)

~ $ gem install jekyll

I got two errors ,the first one is related to folder file permissions so make sure you install with

~ $ sudo gem install jekyll

The second error is related to building native gem extensions:

Building native extensions. This could take a while...
ERROR: Error installing jekyll:
ERROR: Failed to build gem native extension.

/usr/bin/ruby1.9.1 extconf.rb
/usr/lib/ruby/1.9.1/rubygems/custom_require.rb:36:in `require': cannot load such file -- mkmf (LoadError)
from /usr/lib/ruby/1.9.1/rubygems/custom_require.rb:36:in `require'
from extconf.rb:4:in `'

This error is solved by installing the Ruby dev files using:

~ $ sudo apt-get install ruby1.9.1-dev

So now try to install Jekyll again

$ sudo gem install jekyll

As you see if you get the same error as me which says
Building native extensions. This could take a while...
Fetching: rb-inotify-0.9.7.gem (100%)
Fetching: listen-3.0.6.gem (100%)
Fetching: jekyll-watch-1.3.1.gem (100%)
Fetching: jekyll-3.1.1.gem (100%)
ERROR: Error installing jekyll:
jekyll requires Ruby version >= 2.0.0.

The Gem package manager is trying the install the latest version of Jekyll which is in the time of writing this tutorial version 3 so either you have to install an older version which works with Ruby version 1.9 or upgrade your Ruby version to 2.

So i ended up with installing an older version

~ $ sudo gem install jekyll -v 2.5.3

If you prefer to install the latest Jekyll version ,you have to install Ruby version 2 ,make sure to check this small guide to show you how to install Ruby 2 if you are under Ubuntu.

Now lets get back to our personal site tutorial.After installing Jekyll create a new static site and serve it locally with :

~ $ jekyll new myPersonalSite

~ $ cd myPersonalSite

You should get an output like this

Configuration file: /media/born2code/glib/static/myPersonalSite/_config.yml
Source: /media/born2code/glib/static/myPersonalSite
Destination: /media/born2code/glib/static/myPersonalSite/_site
Generating...
done.
Auto-regeneration: enabled for '/media/born2code/glib/static/myPersonalSite'
Configuration file: /media/born2code/glib/static/myPersonalSite/_config.yml
Server address: http://127.0.0.1:4000/
Server running... press ctrl-c to stop.

~/myPersonalSite$ jekyll serve # => Browse page at http://0.0.0.0:4000

If your page gets served successfully then you are good to go

You should be able to visit your basic Jekyll site at this address http://127.0.0.1:4000/

Before we continue ,just make sure

You have basic understanding of HTML,CSS and JavaScript

And you have an account on GitHub ,you can get it for free and you can host unlimited public repositories thus unlimited static sites.

If you look inside your generated Jekyll site ,you will find this structure

_posts

css

_includes

_layouts

_sass

about.md

_config.yml

feed.xml

index.html

To Be Continued...
