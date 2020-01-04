---
layout: post
title: "Python Webviews with PyWebView"
image: ""
excerpt: "Have you ever wanted to use your python and web development skills to build cross platform desktop GUI apps? if yes then welcome to this tutorial where we'll show you how to use PyWebView to turn your web application built using python and client side technologies such as HTML, CSS and JavaScript into a standalone cross platform GUI application that runs under major operating systems such as Linux, Windows and MAC"
tags : [python, django]
---
 
Have you ever wanted to use your python and web development skills to build cross platform desktop GUI apps? if yes then welcome to this tutorial where we'll show you how to use PyWebView to turn your web application built using python and client side technologies such as HTML, CSS and JavaScript into a standalone cross platform GUI application that runs under major operating systems such as Linux, Windows and MAC.

You can also use any web framework based on python such as the so popular django framework or also the lightweight web development framework flask to build business logic of your app and then wrap the whole app, server and client side, into a desktop app .

## What is PyWebView?

Before getting started with PyWebView let's first introduce it. 

PyWebView is an open source, cross platform and lightweight wrapper which provides you with a WebKit/MSHTML based webview inside a native GUI window which allows you to render HTML and CSS and execute JavaScript code just like any normal web browser. It's in fact a headless web browser that you can use to run a unique and default web app so the user gets the feeling of having an ordinary GUI application.

PyWebView doesn't re-invent the wheel but instead it uses the existing tools and native platform APIs. For providing a native window

For the target system it uses:

- Win32 API or Win Forms under Windows,
- Cocoa on OS X,
- GTK 3 ,QT4/5 under Linux.

## Getting Started with PyWebView

First of all, make sure you have either Python 2 or 3 installed in your development machine. You also need the pip package manager installed then open up your terminal under Linux/MAC or the command prompt under Windows and run:

```bash
$ pip install pywebview
```

If your installation fails make sure you have the following dependencies installed depending on your target system and re-execute the install command again:

- Under Windows you need to install pywin32, comtypes if you want to use Win32 subsystem to create natives windows or pythonnet if you want to be able to use Windows Forms for native windows.
- Under OS X you need to install pyobjc if it's not already installed in your system.
- Under Linux GTK3 based distributions you have to install PyGObject before you can use PyWebView.
- For QT based systems you need to install PyQt4/PyQt5 .

## How to Use pywebview?

You can easilly get started with pywebview. Just execute the following python code to launch a native window that displays a visited web URL:

```py
import webview

webview.create_window("Techiediaries", "http://www.techiediaries.com",width=800, height=600, resizable=True, fullscreen=False) 
```

So you first start by importing the webview. Next, we use the `create_window` method to create and show  a native window which renders the content of `http://www.techiediaries.com`  with the title "Techiediaries".

All parameters are self explanatory, they just control the width, hieght and other properties of the window.

You can see a full example of a flask app wrapped into a GUI app using pywebview under the  [GitHub repository of pywebview](https://github.com/r0x0r/pywebview/tree/master/examples/flask_app)

## Conclusion

While there are many python based frameworks for building desktop apps which are cross platform since python itself is a portable and cross platform environment, you have to learn these frameworks before you can build your apps but with pywebview you can use your existing web development skills and familiar Python web frameworks to create the web apps you have the skills to build and then wrap them into GUI based apps without starting from scratch.
