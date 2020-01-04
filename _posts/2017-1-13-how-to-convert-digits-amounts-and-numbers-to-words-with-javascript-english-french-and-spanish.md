---
layout: post
title: "How To convert digits ,amounts and numbers to words with JavaScript (English,French and Spanish )"
image: "images/content/how-to-convert-digits-amounts-and-numbers-to-words-with-javascript-english-french-and-spanish/titleimage.png"
excerpt: "How To convert digits ,amounts and numbers to words with JavaScript (English,French and Spanish )"
categories : javascript
tags : javascript
---

{% include image.html
   img="images/content/how-to-convert-digits-amounts-and-numbers-to-words-with-javascript-english-french-and-spanish/bigimage.png"
       title="How To convert digits ,amounts and numbers to words with JavaScript (English,French and Spanish )"
%}

When I was developing a business app for a client using Electron and JavaScript the client requested if the app can automatically convert the typed numbers to their equivalent written form in French language I said OK but I was worry about the accuracy of the algorithm that of course i’m going to invent in order to convert numbers into words .This might be simple in English but can be intimidating in French since it has more and complex grammatical rules but thanks God before I even started to think about my own algorithm I stumbled upon a very helpful JavaScript library/npm package that does numbers to words conversions in multiple languages starting with English ,French and Spanish and you can also define your own language files for any other language that you need to support .

You can use the library with Node.js by first installing it via npm 

	npm i --save written-number

Actually the library can also be used without Node.js in the browser .In this case you can install it via Bower

bower install written-number

Next you need to require the library if you are using it with Node.js

	var writtenForm = require('written-number');
	var wf = writtenForm(1000); 
	console.log(wf); // => 'one thousand'

The library converts by default to English language but you can easilly specify your target language .In my case I needed French so all I had to do is adding

	writtenForm.defaults.lang = 'fr';

Just after require 

The full example is

	var writtenForm = require('written-number');
	writtenForm.defaults.lang = 'fr';
	var wf = writtenForm(1000); 
	console.log(wf); // => 'Mille'

You can also change the language with each function call by passing it as a paramter 

	writtenForm(1000, { lang: 'fr' });

And if you want to omit the “AND” between words in the written form you can also specify another option which noAnd .By default it’s set to false 

	writtenForm(1000, { lang: 'fr',noAnd : true });

As I mentioned before you can also add support for your own language if it’s not already supported .For more information you can visit their GitHub repository 

Other librairies for spelling out numbers 

## <a href="https://github.com/jmosbech/spell-it" target="_blank">spell-it</a>
 
It converts numbers to their written form in English, French, Indonesian, Dutch or Danish .

You can install via NPM by 
	
	npm install spell-it

Then use 

	var spell = require('spell-it') ('fr');
	console.log(spell(40));
	// quarante


## <a href="https://github.com/emckean/umpteen" target="_blank">Umpteen</a> 

To install Umpteen use NPM

	npm install umpteen

Then just

	var spellIt = require('umpteen');
	console.log(spellIt.spellItOut(40)); // forty



# Conclusion

I hope this was helpful for you as it was for me .Thanks for reading and see you for another tutorial .








 
  
