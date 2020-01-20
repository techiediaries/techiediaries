---
layout: bpost
title: "How To Upgrade Ubuntu To 20.04 LTS Focal Fossa"
image: "images/content/angular.jpg"
excerpt: "In this post, we'll create a simple example with Angular 9/8 and HttpClient that sends Get and Post requests to fetch and post data from/to a backend server" 
skipRss: true
tags : [drafts] 
---


## Objective

Upgrade an existing Ubuntu installation to 18.04 Bionic Beaver

## Distributions

You need an existing Ubuntu 18.04 LTS or 19.10 install.

## Requirements

An existing Ubuntu 18.04 LTS or 19.10 install with root privileges.


[![Upgrade from Ubuntu 19.10 to Ubuntu 20.04](https://linuxconfig.org/images/02-how-to-upgrade-ubuntu-to-20-04-lts-focal-fossa.png)](https://linuxconfig.org/images/02-how-to-upgrade-ubuntu-to-20-04-lts-focal-fossa.png "Upgrade from Ubuntu 19.10 to Ubuntu 20.04")

Upgrade from Ubuntu 19.10 to Ubuntu 20.04

## Introduction

**PLEASE NOTE**  
This article is constantly updated. At this stage it might be too early to upgrade to Ubuntu 20.04, hence you are recommended to wait as your upgrade might have unexpected results.

The latest Ubuntu release, 20.04, marks an opportunity for both LTS users and people on the previous 19.10 release to update Ubuntu and take advantage of the latest features. Thanks to Debian's upgrade process, it should be relatively simple to either upgrade Ubuntu 18.04 to 20.04 (both LTS) or to upgrade Ubuntu 19.10 to 20.04 LTS Focal Fossa.

Check your current Ubuntu version by following:  [How to check Ubuntu version](https://linuxconfig.org/how-to-check-ubuntu-version)  article.

## Run your Ubuntu Update

Before you do anything, make sure that your system is already up-to-date. Run a full Ubuntu update and upgrade with Apt.

$ sudo apt update 
$ sudo apt upgrade
$ sudo apt dist-upgrade

This will help to ensure that the difference between packages is as small as possible. It also will be the way that Canonical has most likely tested the upgrade themselves, so it's least likely to encounter bugs. Lastly, before you begin to upgrade Ubuntu to 20.04 LTS Focal Fossa you may also want to remove all no longer required packages using:

$ sudo apt autoremove


## How to Upgrade Ubuntu The Ubuntu Way

Ubuntu have developed their own automatic way of upgrading between releases. It essentially scripts the traditional Debian approach. This way, you can set it up to upgrade and walk away. Ubuntu will handle the rest.

**PLEASE NOTE**

  

> _Upgrades from 19.10 will not be enabled until a few days after 20.04's release. Upgrades from 18.04 LTS will not be enabled until a few days after the 20.04.1 release expected in late July 2020. There are no offline upgrade options for Ubuntu Desktop and Ubuntu Server._

If you want to take this route, you're going to need to install one package first. So, do that.

$ sudo apt install update-manager-core

When that finishes, run the Ubuntu upgrade utility.

$ sudo do-release-upgrade

If you're doing this too soon, it will tell you that there is  `No new release found`. In that case, and at your own risk, add the  `-d`  flag at the end of the command to force the upgrade.  **For more information read the below "No new release found" section.**

$ sudo do-release-upgrade -d

Ubuntu will ask you a couple of questions about how you want to handle the upgrade, and it'll start off upgrading your system.

### No new release found

As already mentioned above, upgrades from 19.10 will not be enabled until a few days after 20.04's release and upgrades from 18.04 LTS will not be enabled until a few days after the 20.04.1 release which is expected in late July 2020.

As a result, your upgrade attempt may result in a message  `No new release found`  while trying to upgrade your Ubuntu system by using  `sudo do-release-upgrade`  command. In this case read the following sections.

#### Upgrading from Ubuntu 18.04 LTS

Start by executing the  `sudo do-release-upgrade`  command. In case you receive the  `No new release found`  message you have four options:

-   The first and recommended approach is to simply wait. Direct upgrades from Ubuntu 18.04 LTS to Ubuntu 20.04 Focal Fossa LTS will most likely be unavailable until late July 2020.
-   Force direct upgrade by using the  `-d`  switch. In this case  `sudo do-release-upgrade -d`  will force upgrade from Ubuntu 20.04 LTS to Ubuntu 20.04 LTS. In case you receive an "_Upgrades to the development release are only available from the latest supported release._" message, make sure that release upgrader default behavior is set to  `lts`within  `/etc/update-manager/release-upgrades`.
-   Upgrade to 19.10 first by changing the default behavior of the release upgrader to  `normal`within the  `/etc/update-manager/release-upgrades`  file. When ready, execute the  `sudo do-release-upgrade`  command again. Once your system is upgraded to Ubuntu 19.10 then follow the Ubuntu 19.10 to Ubuntu 20.04 upgrade procedure while keeping the release upgrader behavior set to  `normal`.
-   Use the Debian way described below to upgrade your Ubuntu 18.04 system.

#### Upgrading from Ubuntu 19.10

Start by executing the  `sudo do-release-upgrade`  command. In case you receive the  `No new release found`message, ensure that the default release upgrader is set to  `normal`  and re-execute the  `sudo do-release-upgrade`  command.

## How to Upgrade Ubuntu The Debian Way

### Change Your Sources

If you've selected the traditional Debian path, you're going to need to change the  `/etc/apt/sources.list`  file and replace the name of your previous release with  `bionic`. So, if you're on 18.04, replace every instance of  `bionic`  with  `focal`. If you currently have 19.10, replace  `eoan`  with  `focal`.

This process can be automated by using the following  `sed`  command:

$ sudo sed -i 's/bionic/focal/g' /etc/apt/sources.list
OR
$ sudo sed -i 's/eoan/focal/g' /etc/apt/sources.list

Then, look in  `/etc/apt/sources.list.d/`. Change any files in there the same way.

### Ubuntu Update and Ubuntu Upgrade

Now, you can run the Ubuntu dist upgrade. First, update the Apt sources. Then, run the Ubuntu upgrade.

$ sudo apt update && sudo apt -y dist-upgrade

The upgrade should take a bit of time. Chances are, every package on the system will be upgraded. When the Ubuntu upgrade does finish, reboot the system. When the system comes back up, you'll be running Ubuntu 20.04 LTS Focal Fossa!

## Closing Thoughts

That's all there really is to it. You should notice that your login screen is different, especially if you were on 18.04.