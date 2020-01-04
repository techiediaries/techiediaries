---
layout: post
title: "How to access the Clipboard in GitHub Electron Apps"
image: "images/content/how-to-access-clipboard-in-github-electron-apps/titleimage.png"
excerpt: "In this tutorial ,we are going to learn how to use the system clipboard in GitHub Electron apps "
categories : github-electron
tags: electron
---
{% include image.html
   img="images/content/how-to-access-clipboard-in-github-electron-apps/bigimage.png"
       title="In this tutorial ,we are going to learn how to use the system clipboard in GitHub Electron apps "
%}



There are many situations when your app needs access to operating system Clipboard so in this tutorial we are going to learn how to access your system clipboard from your Electron desktop app .

Electron framework has a rich and cross platform API to communicate with the underlying operating system services such as the filesystem or the clipboard so let's see how you can easily access your clipboard with a bunch of some api calls .

# How to access the ClipBoard in Electron apps ?

To access the clipboard you need first to import clipboard class/object from electron 

	const {clipboard} = require('electron');

The clipboard object has all methods which allows you to access copy ,paste and other clipboard related methods to interact with your operating system clipboard .

## How to get your clipboard content ?

In order to retrieve your clipboard content you have three methods at your disposal depending on the kind of content you want to get ,either if it is plain text , HTML or RTF .

### Plain text content

To access plain text content in your clipboard use the .ReadText() method .For example

	const {clipboard} = require('electron');
	var txtContent = clipboard.readText();
	console.log(“clipboard content as plain text : ” + txtContent);

### HTML content 

If your clipboard contain HTML content then you can retrieve the content as html using .readHtml() method just like the previous .readText() method .For example 


	const {clipboard} = require('electron');
	var htmlContent = clipboard.readHtml();
	console.log(“your clipboard content as html : ” + htmlContent);
 
### RTF or Rich Text Format content 

The third method .readRtf() allows you to access your clipboard content as RTF (Rich Text Format)

	const {clipboard} = require('electron');
	var rtfContent = clipboard.readRtf();
	console.log(“clipboard content as RTF ” + rtfContent);

So we have seen the three methods to get or retrieve the content of system clipboard as plain text ,HTML and RTF now how to set the content of your clipboard from your app’s code .

## How to set your clipboard content ?

In the same way ,we have three methods at our disposal to set the content of clipboard depending on data format .

### Plain text content with .writeText() method

If you need to set the content of clipboard from you code as plain text you need to use the .writeText() method which works in this way :

	const {clipboard} = require('electron');
	var txt = "hello electron ";
	clipboard.writeText(txt);

### HTML content with .writeHtml() method

In the same way if you need to put some HTML content in your clipboard you can use .writeHtml() method 

	const {clipboard} = require('electron');
	var html = "<p>hello electron </p>";
	clipboard.writeHtml(html);

### RTF content with .writeRtf() method

The last method is .writeRtf() which allows you to put some RTF content in your system clipboard from code 

	const {clipboard} = require('electron');
	var rtf = "{\rtf1\ansi{\fonttbl\f0\fswiss Helvetica;}\f0\pard RTF {\b bold} content \par }";
	clipboard.writeRtf(rtf);



# Conclusion

So this is how you can access your clipboard content either for get or set operations .Now you can easily work with the clipboard from your Electron app and you can even build your own clipboard manager with Electron framework .Thanks for reading and see in another post .




 



