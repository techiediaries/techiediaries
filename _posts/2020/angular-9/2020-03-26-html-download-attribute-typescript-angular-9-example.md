---
layout: bpost
title: "HTML5 Download Attribute with TypeScript and Angular 9"
image: "images/content/angular.png"
excerpt: "In this article, we'll learn by example what's the HTML download attribute and we'll see how to use it with TypeScript and Angular 9/8 by example" 
categories: angular
tags : [html , angular] 
---

In this article, we'll learn by example what's the HTML `download` attribute and we'll see how to use it with TypeScript and Angular 9/8 by example for downloading files from a server or REST API endpoint.

HTML 5 provides many features that are less known by developers but can be useful for quickly solving common development problems.

## What's the Download Attribute in HTML 5?

One of these HTML 5 features is the download attribute which enables developers to use a different file download name other than the name in the URL and even force the downloading of a file by the browser which was only possible via server code before that.

The `download` attribute allows you to instruct the web browser to download the resource specified as the value of the `href` attribute. And also use a default file name for the downloaded resource.

> Note: The download attribute is restricted by the same origin policy.

## The HTML Download Attribute by Example

If you have implemented file downloading before using server-side methods such as the `Content-Disposition` header which is used for specifying the default file name in the browser's Save As dialog. 

The download attribute which is introduced in HTML 5 can be used for:

- Downloading a resource instead of navigating to the resource,
- Providing a default file name for the downloaded resource.

Let's see an example of the download attribute.

We use the attribute with anchor tags, for example:

```html
<a href="/files/sdsdfasd89asd8f.pdf" download="newname.pdf">Download File</a>
```

When the user triggers the download link, the file will be downloaded with the filename in the download attribute. 

This attribute can be useful when the generated file names are used in the server-side so the download attribute enables the file name to be meaningful to users.


> Note: For older web browsers such as Internet Explorer, the  `download`  attribute may not be available. In this cas, you can open the downloaded resource in a new browser tab/window with the  `target`  attribute set to  `_blank`. 

## The Download Attribute in Angular by Example

You can bind the `href` and `download` attributes in Angular to set the URL and filename dynamically as follows:  

```ts
<a [href]="url" [download]="filename">
  {{ download.filename }}
</a>
```


