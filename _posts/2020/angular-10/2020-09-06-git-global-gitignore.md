---
layout: bpost
title: "Git - global .gitignore file"
image: "images/content/angular.png"
excerpt: "In this quick tip, we'll see how to configure Git to use a global .gitignore file"
date: 2020-09-06
tags : [git]
---

In this quick tip, we'll see how to configure Git to use a global `.gitignore` file.


Git allows you to use a global `.gitignore` for all your repositories. Let's see how.

First, create a `~/.gitignore `in your home folderand anything that should be ignored when pushing your code. 

Next, instruct Git to use the file using the following command:

```bash
$ git config --global core.excludesfile ~/.gitignore
```

That's, you can now use the global `~/.gitignore` file to exclude files across all your projects, but you can also use a `.gitignore` file inside your project and both will be used by Git.