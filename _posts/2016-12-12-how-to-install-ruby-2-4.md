---
layout: post
title: "How to install Ruby 2.4 "
image: "images/content/how-to-install-ruby-2-4/titleimage.png"
excerpt: "This post is dedicated to Ruby latest version 2.4 installation procedure and will be updated for new information whenever there are changes or updates"
tags : ruby 
---
{% include image.html
       img="images/content/how-to-install-ruby-2-4/bigimage.png"
       title="This post is dedicated to Ruby latest version 2.4 installation procedure and will be updated for new information whenever there are changes or updates"
%}

Ruby 2.4.0-rc1 is released .This is the first release candidate of Ruby 2.4.0 .The main goal of this release is to get feedback from the Ruby community .

There are many imporvements on this version of Ruby .You can check this article about [new features on Ruby 2.4]().For this post is dedicated to how to install this version of Ruby .

Currently the only way available for installing the release candidate of Ruby version 2.4.0 is by comiling Ruby from the source code available from their official website .

So go ahead and grab the compressed file containig source files of Ruby 2.4.0 from this <a href="https://cache.ruby-lang.org/pub/ruby/2.4/ruby-2.4.0-rc1.tar.gz" rel="nofollow">direct link</a> .

Or open up your terminal if you are using Linux/MAC or your command prompt if you are using Windows and execute the following commands : 

	wget https://cache.ruby-lang.org/pub/ruby/2.4/ruby-2.4.0-rc1.tar.gz

{% include image.html
       img="images/content/how-to-install-ruby-2-4/get-ruby-2-4.png"
       title="get download ruby 2.4.0"
%}

Next unpack the tarball ruby-2.4.0-rc1.tar.gz with

	tar -xzf ruby-2.4.0-rc1.tar.gz

Next execute the compiling commands

	./configure
	make
	sudo make install

The last command will install Ruby 2.4.0 under /usr/local .If you need to install it somewhere else just pass --prefix=DIR to ./configure script . 

	./configure --prefix=DIR 	

This is not the best way to install Ruby but for now it's the only way you can use to install the release candidate of Ruby 2.4.0 until the final version is released .

Note for Windows users 
-------------------------

You might need to install aditional tools to follow the same workflow as I'm.I didn't install Ruby under Windows .I only work with Ubuntu so unfortunatly I can't help you with that .

Conclusion
--------------

So that's it Ruby lovers .If you are like me impatient to play with the latest version of Ruby then you need to install following this post .This post will be updated with additional information once there are other available methods to install Ruby 2.4 which means only after the final stable version will be released .
 