---
layout: post
title: "Add and Remove a PPA Repository on Ubuntu 20.04 LTS"
image: "images/content/ubuntu.png"
excerpt: "In this article, we will see what a PPA is and how to add and remove a PPA in your Ubuntu 20.04 system" 
categories: ubuntu
tags : [ubuntu]
---

Ubuntu is a popular Linux-based system that allows users to install applications and programs from official  and third-party repositories via the [apt](https://wiki.debian.org/Apt) utility that can be invoked from a command-line interface.

In this article, we'll see what a PPA is and how to add and remove a PPA in your Ubuntu 20.04 system.

We'll be using the latest Ubuntu 20.04 version at the time of writing this article.

## How to Add and Remove a PPA Repository on Ubuntu 20.04?

As mentioned, users mostly use the apt utility to install packages from both official and third-party Ubuntu repositories.

When you invoke the command for installing a new package from your terminal i.e the `apt install <package>` command, Ubuntu looks for the package inside a package archive which contains most software needed by Ubuntu users but sometimes newer versions of the same apps or apps that are not very popular among users don't exist in the official repository. This where a PPA repository comes in.  

If you look for a way to install a software that doesn't exist in the official Ubuntu repositories, you'll be provided with a similar code to type in your terminal:


```bash
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt-get update
sudo apt-get install python
```

This is an example for installing the latest versions of Python in your Ubuntu system.

For example, Ubuntu 20.04 comes with Python 3.8 preinstalled but doesn't have Python 3.9 in the official repository  so you'll need to add the `ppa:deadsnakes/ppa` PPA and update your system repositories before you can install the latest Python 3.9 version.

So, what is PPA? What's the use of a PPA? How to add PPA? And, how to delete a PPA?

## What’s a PPA?

PPA stands for Personal Package Archive.

Ubuntu provides a set of official repositories that allow users to install software for their system which are divided into four registries:

-   **Main** – Canonical-supported free and open-source software.
    
-   **Universe** – Community-maintained free and open-source software.
    
-   **Restricted** – Proprietary drivers for devices.
    
-   **Multiverse** – Software restricted by copyright or legal issues.

 This is where your system looks for information about the software requested by users via a command like `apt install`. 

Your Ubuntu system know about these registries from the `/etc/apt/sources.list` file.

If you often use Ubuntu, then you are familiar with the `sudo apt update` command, this is an important command that is used to to fetch the latest information about the software and their version and store them in your system cache. Based on these information, if you run the `sudo apt install <package>` command to install a specific package, the system can figure out the URL where the actual software exists and download it.

There some cases when you get the famous error: 

```bash
E: Unable to locate package
```

This simply tells you that Ubuntu is unable to find the information needed for downloading and installing the requested package. It's not the package itself but the information about it.

This is where a PPA is needed which is simply a personal package archive used to provide Ubuntu with the information required to install a specific package. This is personal not official and is provided by third parties.

## What's the Use of a PPA?

Now, we understand that Ubuntu has an official set of repositories that are used to provide information about common software. This means you can only install the software pointed to by Ubuntu and only the specific versions pointed to by the official repositories but what if you need to install a software that's less popular or a newest version of a software which is not included in the official repository?

> Note: Ubuntu doesn't not immediately include a new version of a software right after it's released because it needs to ensure it's compatible with the system for stability reasons.    

This is where you need a PPA which can be used by the developer of the software to provide users with the information needed to install their software or newer versions before they are supported by the official Ubuntu repositories. 

## How to Use a PPA?

So, a PPA is a personal package archive that can be used by developers to enable Ubuntu users to install their software. but how exactly?

Ubuntu provides a website called Launchpad that allows software developers to create their own repositories. 

Users can then add the PPA repository to their `sources.list` file and update their system to inform it about the availability of a new software which they can finally install it via the familiar `sudo apt install` command:

```bash
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt-get update
sudo apt-get install python
```

Now we know why a PPA is important and how to use it to install software that's not available from the official Ubuntu center.

## How to Remove a PPA on Ubuntu 20.04?

Now, how to remove a PPA?

PPA are not removed automatically so you need to do this manually. This is very important because if you add a lot of PPAs during a period of time, your system will end up going through a lot of irrelevant PPA repositories each time you install or update a package. In this section, we'll see how to list and delete the PPA repositories on Ubuntu 20.04 after that we have seen how to add them.

In this section, we'll see:

-   How to get all added PPA repositories via your command-line interface,
-   How to delete PPA repositories via your command-line interface,
-   How to get and delete PPA repositories via GUI.

### How to Get all Added PPA Repositories?

Let's now see how you can get all the added PPA repositories in your Ubuntu 20.04 system.

Head over to a new command-line interface and run the following command:

```bash
$ apt policy
```

The `apt policy` command will display PPA repositories first, then below them the official package archives of Ubuntu. This is an example:

```bash
 500 http://ppa.launchpad.net/sylvain-pineau/kazam/ubuntu focal/main i386 Packages
     release v=18.04,o=LP-PPA-sylvain-pineau-kazam,a=focal,n=focal,l=kazam,c=main,b=i386
     origin ppa.launchpad.net
 500 http://ppa.launchpad.net/sylvain-pineau/kazam/ubuntu focal/main amd64 Packages
     release v=18.04,o=LP-PPA-sylvain-pineau-kazam,a=focal,n=focal,l=kazam,c=main,b=amd64
     origin ppa.launchpad.net
```


### How to Delete a PPA Repository? 

After you get the name of a PPA repository with `apt policy` that you want to remove from your Ubuntu 20.04 system, you can use the following command to delete it:

```bash
$ sudo add-apt-repository --remove ppa:PPA_REPOSITORY_NAME/PPA
```

For example:

```bash
$ sudo add-apt-repository --remove ppa:sylvain-pineau-kazam
```

## Conclusion

In this article, we have seen what a PPA is. As a wrap-up PPA stands for Personal Package Archive and it's used by software developers to provide information to Ubuntu about where the `apt` command can download and install their software. We have also seen how to add and remove a PPA in your Ubuntu 20.04 system.


