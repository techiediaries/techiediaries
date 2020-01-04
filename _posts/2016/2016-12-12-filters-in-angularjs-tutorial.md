---
layout: post
title: "Filters in Angular.js tutorial "
image: "images/content/filters-in-angularjs-tutorial/titleimage.png"
excerpt: "In this tutorial we are going to cover Angularjs filters .Essencially what are they ? and how can be used ? "
tags : angular 
---
{% include image.html
       img="images/content/filters-in-angularjs-tutorial/bigimage.png"
       title="In this tutorial we are going to cover Angularjs filters .Essencially what are they ? and how can be used ?"
%}
Angular.js filters are designed to filter data .They are especially helpful in views templates if you want to transform your data to another format .Filters work by siply take an input array ,filter or select a subset of the input array according to some condition(s) .There are two types of filters in Angular.js

Built in filters .

Angular.js provides developers with a set of filters designed for formatting data in views but can also be called withtin other directives and controllers .

Custom filters .

If the built in filters don't solve your partuclar needs .Angular.js offers you the possibility to build your own custom filter to apply to your views .

You can use filters for diffrent tasks such as

Formatting dates .

Formatting currencies .

Filtering arrays of data etc.

The general syntax of filters looks like 

{% raw %}
	{{ input | filter }} 

{% endraw %}

You use | to apply a filter to some expression .

You can also chain multiple filters by applying all your filters at once  using | 
{% raw %}

	{{ input  filter0 | filter1 | filter 2 | ... | filtern }} 	
{% endraw %}

In this case each filter takes as input the result of the previous filter .

The uppercase filter https://docs.angularjs.org/api/ng/filter/uppercase

This is a string filter that transforms the input string to uppercase .It's useful if you want your data to be deisplayed in uppercase for any input string 
{% raw %}

	{{ textString1 | uppercase }}
{% endraw %}
	
The lowercase filter 

{% raw %}

	{{ textString1 | lowercase }}

{% endraw %}

The limitTo filter

{% raw %}

	{{ textString1 | limitTo: '40' }}
	
	{{ textString1 | limitTo: '-40' }}

{% endraw %}

Angular.js provides filter for working with numbers and currencies 
For rounding a number 

{% raw %}

	{{ number | number: 2 }}

{% endraw %}

The currency filter 

{% raw %}

	{{ price1 | currency }}   //default currency filter

	{{ price | currency:'&euro;' }}

{% endraw %}

Date filters

{% raw %}

{{ date1 | date }}
{{ date1 | date:'fullDate' }}
{{ date1 | date:'MM' }}
{% endraw %}

The orderBy filter

This filter allows you to apply an order by operation to your arrays directly in your views

{% raw %}

	ng-repeat="item in items | orderBy : predicate: reverse "
{% endraw %}

Angular.js custom filters

Angular.js allows you to create your own custom filters just like you create directives and controllers .The general syntax of a custom filter looke like

	app.filter('myFilter', function(){
	 
		//return a function that takes some input and return an ouput after processing the input
		return function (input,args) {
	 	
	 		return output; 
		};
	});

There are two types of custom filters in Angular.js 

Single value filters which take a single value as their input .

Array filters whihc take an array as their input .


