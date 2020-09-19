---
layout: bpost
title: "Install GitHub CLI on Ubuntu 20"
image: "images/content/bootstrap.png"
excerpt: "In this post, we'll show you how to install GitHub CLI on your Ubuntu 20 machine"
date: 2020-09-19
tags : [ git , github, ubuntu]
author: ahmed
---


[GitHub CLI](https://cli.github.com/) is a free and open source official tool that brings GitHub to your terminal. It' created by the GitHub team.

It allows developress to work with issues, pull requests, checks, releases and the entire workflow and invoke the GitHub APIs in scripts, and set a custom alias for any command.

In this post, we'll show you how to install GitHub CLI on your Ubuntu 20 machine.


## Installing GitHub CLI on Ubuntu 20

Installing GitHub CLI on Ubuntu is quick and easy. 

Head over to a new command-line interface and run the following commands:

```bash
$ sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-key C99B11DEB97541F0
$ sudo apt-add-repository https://cli.github.com/packages
$ sudo apt update
```

This will add the official PPA for GitHub CLI and update your system packages accordingly.

Next, simply run the following command to install GitHub CLI:

```bash
$ sudo apt install gh
```

> **Note**: If you are behind a firewall, the connection to keyserver.ubuntu.com might fail. In that case, try running sudo apt-key adv --keyserver keyserver.ubuntu.com:80 --recv-key C99B11DEB97541F0. Most systems will have apt-add-repository already. If you get a command not found error, try running sudo apt install software-properties-common and trying these steps again.

See all the available [commands](https://cli.github.com/manual/)