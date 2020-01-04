---
layout: post
title: "[TIP] Pure JavaScript equivalent or alternative to jquery.ready()"
image: "images/content/pure-javascript-equivalent-or-alternative-to-jquery-ready/titleimage.png"
excerpt: "Throughout this post we are going to see a pure JavaScript equivalent or alternative to the jquery.ready() method"
categories : javascript
tags : javascript
---

{% include image.html
   img="images/content/pure-javascript-equivalent-or-alternative-to-jquery-ready/bigimage.png"
       title="Pure JavaScript equivalent or alternative to jquery.ready()"
%}


There is no doubt that jQuery is a very useful and powerful DOM manipulation library that is used nowadays by the majority of ,if not all ,web developers but many times developers are using it without really thinking if it’s absolutely necessary to use it or not .For example in situations when you just need to use one method from the whole library ,in our tutorial case what if you need to check if the DOM is fully loaded so you can execute your JavaScript code safely  ,perhaps the only method that comes to your mind is jQuery.ready() which is a nice method to check for ,if the DOM is ready but it’s not logical at all to include a whole library just for the sake of utile method even if it's the awesome jQuery .So  is there any equivalent or alternative in pure JavaScript for doing the same thing jquery.ready() does for us ?

The short answer is Yes but how ? 

Lets see how we can check if the DOM is ready using pure JavaScript code without the help of DOM master jQuery .

In fact there is more than one method you can use in pure JavaScript not just one so lets start with our first method 

## Listen for DOMContentLoaded event 
 
First check for DOMContentLoaded documentation in [mozilla](https://developer.mozilla.org/en/docs/Web/Events/DOMContentLoaded) 

DOMContentLoaded event is only available for modern browsers and for IE9+ and you can simply use 

	document.addEventListener("DOMContentLoaded", function(){
	  // DOM is ready 
	});

To check if The DOM is ready .

This method has two drawbacks .First as we have mentioned before it works only on modern browsers and second your callback may not get called if the event is already fired so how you can solve this issue ?
You are going to do it as jQuery does it .It checks for your document readySate if it is “complete” or not “loading” then it executes your callback anyway 

Here our full implementation 

	function ready(fn) {
	  if (document.readyState !== 'loading'){
	    fn();
	  } else {
	    document.addEventListener('DOMContentLoaded', fn);
	  }
	}


## Use onreadystatechange for older versions of IE 

In the first method ,we have used a bunch of pure JavaScript code to implement our equivalent or alternative version of jquery.ready() method but unfortunately it only works on modern browsers and IE9+ so how we can do it in older Internet Explorer versions ?


	document.attachEvent("onreadystatechange", function(){
	  // check if the DOM is ready
	  if(document.readyState === "complete"){
	   
	    document.detachEvent("onreadystatechange", arguments.callee);
	    // your code here 
	  }
	});



## Listen for load event

Our third method can be implemented by listening for the load event but you need to know that this event is fired when all assets resources such as JavaScript files,CSS files and images are completely loaded and when the DOM is completely ready  so it maybe a slower than other alternatives 

	document.addEventListener("load", function(){
	  // your code handler when the DOM is completely loaded
	});

Or you can also use the onload event on your HTML body tag.
Use domready lightweight library
The last method is using domready ,a very small and lightweight library which only helps you check if the DOM is ready nothing more .It’s a wrapper around the methods we have seen before .You can grab this small lib from GitHub https://github.com/ded/domready

Then you can simply check if the DOM is fully loaded with 

	$(document).ready(function () {
	  $('body').html('<p>boosh</p>')
	})

# Conclusion

So that’s all the methods I know and use to check for if the DOM is fully ready to execute any JavaScript DOM manipulation code safely and successfully .If you know any other alternative to jquery.ready() please make sure to let me know by posting a comment .Thanks for reading and see you in another dev tip .


