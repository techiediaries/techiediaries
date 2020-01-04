---
layout: post
title: "[TIP] $(document).ready() vs window.onload() vs $(window).load()"
image: "images/content/document-ready-vs-window-onload-vs-window-load/titleimage.png"
excerpt: "Before clarifying the difference between $(document).ready() ,window.onload() and $(window).load() let's first understand where we need to use them and when we don’t need to use them at all "
categories : javascript
---

{% include image.html
   img="images/content/document-ready-vs-window-onload-vs-window-load/bigimage.png"
       title="[TIP] $(document).ready() vs window.onload() vs $(window).load()"
%}

Before clarifying the difference between $(document).ready() ,window.onload() and $(window).load() let's first understand where we need to use them and when we don’t need to use them at all .

If you place your JavaScript DOM manipulation code or any code that depends on your DOM elements in the head section of your html page ,this code does execute before your DOM is fully ready so weird errors and things can happen so you have to make sure to wrap your code inside special callbacks that fire only when your DOM is fully loaded .But if you place any JavaScript code after the body element ,you code will be executed after your DOM is fully loaded so you don’t have to worry about wrapping your code inside any callbacks .

Now lets talk about the difference between those methods 
First of all ,all of them can be used to check if the DOM is fully loaded and ready to be manipulated by your JavaScript code .

Secondly , $(document).ready() and $(window).load() are jQuery methods and not pure JavaScript methods so to use them you need to include jQuery library .But window.onload is a pure JavaScript method that you can use without any external libraries

Thirdly ,the most important difference is that 

$(document).ready() uses either the modern browser API event DOMContentLoaded to check if your dom is ready or readyState document variable in older browsers which makes it the best candidate if you need to check if your DOM is fully loaded and ready .On the contrary $(window).load() and window.onload are created to check if the page and its resources are loaded ,resources are images ,texts,css styles and stylesheets and JavaScript files so if you just want to check if the DOM is ready it may be slower than  $(document).ready() .

You can use $(document).ready() in this way 

	$(document).ready(function(){
		//your code here;
	})

You can use the JavaScript pure load event in this way

	window.addEventListener('load', function () {
	//your code right here;
	}, false);








