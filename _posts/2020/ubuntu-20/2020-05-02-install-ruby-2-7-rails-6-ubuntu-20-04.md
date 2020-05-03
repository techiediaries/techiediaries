---
layout: post
title: "How to Install Ruby 2.7 & Rails 6 on Ubuntu 20.04"
image: "images/content/ruby.png"
excerpt: "In this tutorial, we'll see how we can install the latest version of Ruby v2.7 on Ubuntu 20.04 Disco Dingo. and next we'll see how to set up a development environment for Ruby on Rails 6" 
tags : [ ruby, rails, ubuntu] 
---

In this tutorial, we'll see how we can install the latest version of Ruby v2. 7on Ubuntu 20.04 Disco Dingo. and next we'll see how to set up a development environment for Ruby on Rails 6.

As of this writing, the current stable version of Ruby is **v2.7.1**.

## How to Install Ruby 2.7 on Ubuntu 20.04?

You can install Ruby 2.7 on Ubuntu 20.04 using three different methods:

- Using `rbenv`
- Using RVM or Ruby Version Manager
- From the source 

So let's use `rbenv`.

## Installing Ruby 2.7 with `rbenv`

You first need to install `rbenv` and then use it to install Ruby v2.7.

Open your terminal and run the following command:

```bash
$ git clone https://github.com/rbenv/rbenv.git ~/.rbenv
```

We simply clone `rbenv` GitHub repository into the `~/.rbenv` folder. 

You need to have Git installed on your system. If not, simply run `sudo apt install git` from your command line.

Next, run the following commands to set up `rbenv`:

```bash
$ echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
$ echo 'eval "$(rbenv init -)"' >> ~/.bashrc
$ exec $SHELL
```
 
Next, you need to download the [ruby-build](https://github.com/rbenv/ruby-build) plugin into the `plugins` folder of `rbenv` as follows:

```bash
$ git clone https://github.com/rbenv/ruby-build.git "$(rbenv root)"/plugins/ruby-build
```

The `ruby-build` plugin adds the `install` command to `rbenv`.

> **Note**: You can also install `rbenv` and `ruby-build` using the `sudo apt-get install rbenv ruby-build` command.

Finally, you can install Ruby 2.7.1 using the following command:

```bash
$ rbenv install 2.7.1
$ rbenv global 2.7.1
```

This is the output in the terminal:

```bash
Downloading ruby-2.7.1.tar.bz2...
-> https://cache.ruby-lang.org/pub/ruby/2.7/ruby-2.7.1.tar.bz2
Installing ruby-2.7.1...
Installed ruby-2.7.1 to /home/<user_name>/.rbenv/versions/2.7.1
```

If your installation fails, make sure you install the `libreadline-dev` and `zlib1g-dev` dependencies:

```bash
$ sudo apt-get install -y libreadline-dev zlib1g-dev
```

You can check out your Ruby version using the following command:

```bash
$ ruby -v
```

Next, you need to install `bundler` with `gem`:

```bash
$ gem install bundler
```

This will install `bundler` **v2.0.2**.

After installing `bundler`, you need to run:

```bash
$ rbenv rehash
``` 

## Installing Ruby on Rails 6 on Ubuntu 20.04

After installing Ruby 2.7, let's now see how we can install Ruby on Rails 6.

As of this writing, Rails 6 is released. Let's see how to install it. Open a new terminal and run the following command:

```bash
$ gem install rails -v 6.0.0
```

Next, run the following command to make the rails executable available:

```bash
$ rbenv rehash
```

That's it! You can verify your installed Rails version by running the following command:

```bash
$ rails -v
# Rails 6.0.0
```

Congratulations! You have set up your development environment for Ruby on Rails 6 development on your Ubuntu 20.04 machine.