---
layout: post
title: "Run Sudo Without Password on Ubuntu 20.04"
image: "images/content/ubuntu.png"
excerpt: "We'll see how to configure sudo with no password for all commands in your system and also for specific commands" 
categories: ubuntu
tags : [ubuntu]
--- 

In this article, you'll see how to configure and run `sudo` without a password on your Ubuntu 20.04 password.

This will prevent Ubuntu 20.04 from prompting to enter a password each time you execute a command that requires `sudo`. While this is convenient if you need to avoid repeating your password for sudo access each time, it's also not recommended in most cases because of security reasons.

We'll see how to configure `sudo` with no password for all commands in your system and also for specific commands.

## What's `sudo`?

According to [Wikipedia](https://en.wikipedia.org/wiki/Sudo):

>sudo is a program for [Unix-like](https://en.wikipedia.org/wiki/Unix-like "Unix-like") computer operating systems that allows users to run programs with the security privileges of another user, by default the superuser. It originally stood for "superuser do" as the older versions of `sudo` were designed to run commands only as the superuser.

The `sudo` command is used to run a command with elevated privileges, in most times as root but it can also be used to run commands as some other user, not necessarily a root user or super user.

## Which Users Can Use `sudo`?

Not all Ubuntu users can use `sudo` to execute commands as root or as another user but onlu users that 
exist or added to the `/etc/sudoers` file. 

According to the official Ubuntu website:

>The `/etc/sudoers` file controls who can run what commands as what users on what machines and can also control special things such as whether you need a password for particular commands. The file is composed of aliases (basically variables) and user specifications (which control who can run what).

If you install your Ubuntu 20.04 system or any previous version for the first time, you'll have a default user with an account of type `administrator` which can execute `sudo`. If you create any other users at a later point, you can use the  `sudo visudo` command to add them to the `sudoers` group.

According to the [visudo manual](https://www.sudo.ws/man/1.8.13/visudo.man.html):

> `visudo` edits the _sudoers_ file in a safe fashion, analogous to vipw(8). `visudo` locks the _sudoers_ file against multiple simultaneous edits, provides basic sanity checks, and checks for parse errors. If the _sudoers_ file is currently being edited you will receive a message to try again later.

## How to Run the `sudo` Commands Without Entering a Password on Ubuntu 20.04?

Since disabling passwords for commands that require `sudo` is not recommended, you may want to apply that to only a specific command. You can do that by changing the `/etc/sudoers` file via the `sudo visudo` editor.

Head over to a new terminal and simply run the following command:

```bash
$ sudo visudo
```

You'll be prompted for your sudo password, enter it and you'll be presented with an editor where you can configure the commands you want to run with a password-less `sudo` 

Let's see an example. Head back to your terminal and add the following line to the `/etc/sudoers` file via the `visudo` editor:

```
ahmed ALL=(ALL) NOPASSWD:/usr/bin/apt 
```

Change `ahmed` with your username.

After saving and exiting the `/etc/sudoers` file with `Ctrl+S` and `Ctrl+X`, next, go ahead and try to run the `sudo apt` command or one of its sub-commands -- you will not be prompted for a password.

Now, what if you want to run all commands that require `sudo` without a password?

Simply add this configuration line instead of the previous one:

```
ahmed ALL=(ALL) NOPASSWD:ALL
```

You can also disable `sudo` password for all the members of `sudoers` group by adding this configuration line instead:

```
%sudo   ALL=(ALL:ALL) NOPASSWD:ALL
```

## Conclusion

In this article, we have seen what `sudo` is, which users can use `sudo` and we configured `sudo` to run commands without being prompted for a password each time on our Ubuntu 20.04 machine.

    


