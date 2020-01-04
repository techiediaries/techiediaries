---
layout: post
title: "Ruby on Rails 6 Tutorial: Build your First Rails 6 App"
image: "images/content/rails.png"
excerpt: "In this tutorial, you'll learn to build your first Ruby on Rails 6 application from scratch. Rails 6 is the latest version of the RoR framework which brings new improvements and features." 
tags : [ rails ]
---

In this tutorial, you'll learn to build your first Ruby on Rails 6 application from scratch. Rails 6 is the latest version of the RoR framework which brings new improvements and features. 

Big companies like Basecamp, Shopify and GitHub have already started using Rails 6 in production.

In Rails 6, we have two major frameworks newly added, Action Mailbox and Action Text. 

Action Text allows you to quickly add rich text content and editing to your Rails app. 


## Prerequisites

You need a few prerequisites for this tutorial such as:

- Familiarity with Ruby. Rails is a Ruby framework so you need to be comfortable with this programming language.
- RVM (Ruby Version Manager) installed on your system. This will be used to install Ruby so if you alreay have a recent version of Ruby installed you don't need RVM. Rails 6 requires at least Ruby 1.5

Now, you are good to go!

## Installing Ruby 2.6.2

We'll be using the latest stable [release of Ruby - v2.6.2](https://www.ruby-lang.org/en/news/2019/03/13/ruby-2-6-2-released/) 

You can install Ruby 2.6.2 using RVM. So go ahead and open a new terminal and run the following command:

```bash
$ rvm install 2.6.2
```

## Installing Rails 6.0.0.rc1

Next, let's install Rails 6.0.0.rc1. Head back to your terminal and run the following command:

```bash
$ gem install rails -v 6.0.0.rc1
```

## Creating a Rails 6 Application

Next, you can create a Rails 6 application using the following command:

```bash
$ rails new rails-first-app
```  

Next, navigate inside your newly created application's folder and start your development server:

```bash
$ cd rails-first-app
$ rails s
```

You can then access your web application from your web browser at the `http://localhost:3000` address.




