---
layout: bpost
title: "How to Stop Git Always Asking for Username and Password When Using HTTPS"
image: "images/content/updating-angular-cli-projects.png"
excerpt: "If Git is always asking you for your username and password when pushing or pulling from a GitHub repository, This is a common problem if you use HTTPS clone URL for cloning the repository" 
date: 2020-02-11
author: kaima
categories: git
tags : [git] 
---


If Git is always asking you for your username and password when pushing or pulling your code from a GitHub repository, This is a common problem if you use HTTPS clone URL for cloning the repository. 

Let's see how to solve this!

The  `https://`  clone URLs are available on all public and private repositories. These URLs work everywhere, even if you are behind a firewall or proxy.

## Cloning your GitHub Repository Using Https

If you have cloned your repository with HTTPS using your command-line interface, you’ll be prompted for your GitHub username and password.


## Why Git Keeps Prompting you for Username and Password

Using HTTPS remote URL is useful if you need to work through strict firewalls and proxies but this also means that you'll get prompted for your GitHub username and password each time you pull or push your code to your repository.

## Fixing Git Always Asking for Login Credentials

Fortunately, if you want to stop Git from always asking you for the login credentials of your GitHub repository this can be easily done in two ways:

## Using SSH instead of HTTPS

You can update the origin remote using SSH instead of HTTPS:

```bash
git remote set-url origin git@github.com:username/your-repo.git
```

## Configure Git to Store your Password and Username

Here’s how you can make Git store the username and password: 

```bash
git config --global credential.helper store
```

Next, save the username and password for a session:

```bash
git config --global credential.helper cache
```


## Conclusion

We have seen how we can configure Git to stop asking for the username and password when pushing or pulling code from a GitHub repository cloned via HTTPS.
