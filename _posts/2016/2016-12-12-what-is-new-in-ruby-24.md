---
layout: post
title: "What's new in Ruby 2.4 "
image: "images/content/what-is-new-in-ruby-2-4/titleimage.png"
excerpt: "In this post we are going to see some of the new features introduced in Ruby 2.4 .This post will be updated for new features each time I can play with them ."
tags : ruby 
---
{% include image.html
       img="images/content/what-is-new-in-ruby-2-4/bigimage.png"
       title="In this post we are going to see some of the new features introduced in Ruby 2.4 .This post will be updated for new features each time I can play with them"
%}

In this short post .I'm going to talk about the most important new features coming with the latest version of Ruby 2.4

There are many features introduced in Ruby 2.4 which i'm not going to list them all.I'll show you the fatures I personally like in this version (2.4)

Introducing the Integer#digits methods in Ruby 2.4
-------------------------------------------------------

This method allows you to access any digit within an integer at some position( the digit at most right has index 0) for example

	12346789.digits                  # => [9,8,7,6,5,4,3, 2, 1]
	123456789.digits[0]               # => 9

Introducing the #sum method for Enumerable(s) in Ruby 2.4
-----------------------------------------------

	[1,2,3].sum  # => 6


Introducing Hash#transform_values in Ruby 2.4
-----------------------------------

It works just like  Hash#map

	a = {a: 1, b: 2, c: 3}
	a.transform_values { |value| value * 2 } # {a: 2, b: 4, c: 6}

Use  Hash#transform_values! for changing the target array instead of returning a new one

Introducing Thread.report_on_exception in Ruby 2.4
-----------------------------------------

In Ruby thread exceptions are silent by default which can introduce unreported errors in your code 

So if your using threads on Ruby 2.4 you should enable Thread.report_on_exception using

	Thread.report_on_exception = true

<b>TO BE CONTINUED</b>


Conclusion
-------------

That's not all .This post will be updated when I discover new Ruby 2.4 features to play with them .So stay tuned .



