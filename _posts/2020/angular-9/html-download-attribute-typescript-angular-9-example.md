---
layout: bpost
title: "HTML5 Download Attribute with TypeScript and Angular 9"
image: "images/content/angular.png"
excerpt: "In this article, we'll learn by example what's the HTML `download` attribute and we'll see how to use it with TypeScript and Angular 9/8 by example" 
categories: angular
tags : [html , angular] 
---

In this article, we'll learn by example what's the HTML `download` attribute and we'll see how to use it with TypeScript and Angular 9/8 by example for downloading files from a server or REST API endpoint.

HTML 5 provides many features that are less known by developers but can be useful for quickly solving common development problems.

## What's the Download Attribute in HTML?

One of these HTML 5 features is the download attribute which enables developers to use a different file download name other than the name in the URL and even force the downloading of a file by the browser which was only possible via server code before that.

> The download attribute tells the web browser to download the resource specified in the `href` attribute. And also specify a default file name for the downloaded resource.

> Note: The download attribute works only for same origin URLs.

## The HTML Download Attribute by Example

If you worked with file downloading with ASP.NET before you are probably aware of Content-Disposition header that can be used to specify the default file name in the browser's Save As dialog. The download attribute introduced in HTML5 comes handy in the following situations :

- You want the user to download a resource rather than navigating to it.
- You want to assign some default file name for the file being downloaded.

Let's see an example of the download attribute.

We use the attribute with anchor tags, for example:

```html
<a href="/files/sdsdfasd89asd8f.pdf" download="newname.pdf">Download File</a>
```

When the user triggers the download link, the file will be downloaded with the filename in the download attribute. 

This attribute can be useful when the generated file names are used in the server-side so the download attribute enables the file name to be meaningful to users.

You know there is a HTTP header to do this? http://www.php.net/manual/en/function.header.php#example-4133

element.setAttribute( 'download', whatever_string_you_want );
