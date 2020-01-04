---
layout: post
url: /install-ruby-jekyll
title: Installing Ruby 2 And Jekyll 3
author: mrnerd
tags : ruby 
---

If you try to install the latest version of Jekyll under Ubuntu which is when writing this post Jekyll 3, you will get some errors related specifically to the installed version of Ruby since Jekyll is a Ruby Gem and Ruby dev files.

Missing Ruby dev files

So try to install jekyll with Gem ,the Ruby package manager

~ $ sudo gem install jekyll

If you get an error like this one

Building native extensions. This could take a while...
ERROR: Error installing jekyll:
ERROR: Failed to build gem native extension.

/usr/bin/ruby1.9.1 extconf.rb
/usr/lib/ruby/1.9.1/rubygems/custom_require.rb:36:in `require': cannot load such file -- mkmf (LoadError)
from /usr/lib/ruby/1.9.1/rubygems/custom_require.rb:36:in `require'
from extconf.rb:4:in `'

This error is caused by missing dev files you can easily solve this by installing the dev files using apt-get :

~ $ sudo apt-get install ruby1.9.1-dev

Jekyll Requires Ruby version >= 2.0.0

Now if you try to install Jekyll again and you get this error related to Ruby version

Building native extensions. This could take a while...
Fetching: rb-inotify-0.9.7.gem (100%)
Fetching: listen-3.0.6.gem (100%)
Fetching: jekyll-watch-1.3.1.gem (100%)
Fetching: jekyll-3.1.1.gem (100%)
ERROR: Error installing jekyll:
jekyll requires Ruby version >= 2.0.0.

In this case you have two options .Either install a version of Jekyll which uses Ruby 1.9 .To that simply

sudo gem install jekyll -v 2.5.3

But if you want to install the latest version of Jekyll ,which is version 3 .Make sure to first install Ruby 2 .

To install Ruby 2 Under Ubuntu 14

sudo apt-get update

sudo apt-get install git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties

sudo apt-get install libgdbm-dev libncurses5-dev automake libtool bison libffi-dev

Now fetch and install Ruby version manager rvm

curl -L https://get.rvm.io | bash -s stable

source ~/.rvm/scripts/rvm

echo "source ~/.rvm/scripts/rvm" >> ~/.bashrc

rvm install 2.1.2

rvm use 2.1.2 --default
