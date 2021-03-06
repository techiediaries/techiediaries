---
layout: post
title: "Fixing Dual Booting Windows 10 with Ubuntu 19.04: Grub not Showing and Machine Booting Straight to Windows"
image: "images/content/how-to-install-java-8-jdk-8u101-on-ubuntu-via-ppa/titleimage.png"
excerpt: "This post shows you how you can fix Grub not showing and machine booting straight to Windows when dual booting Windows 10 with Ubuntu 19.04"
tags : [ ubuntu  ] 
---

This post shows you how you can fix Grub not showing and machine booting straight to Windows when dual booting Windows 10 with Ubuntu 19.04.

I have recently installed Windows 10 and Ubuntu 19.04 on the same machine for dual booting. I installed Windows 10 first as recommended and then installed Ubuntu 19.04. But when restarted the machine, it was booted straight to Windows 10 without showing the Grub boot menu to select a system as expected. If this is your case, don't worry there is an easy fix for this problem. 

**You simply need to set the boot manager to Grub**.

> **Note**: Please note that this solution can be also applied to Windows 8 and other versions of Ubuntu and Linux distributions.

## Setting Grub as the Boot Manager from Windows 10

Let's see how we can set Grub as the boot manager in our machine from Windows 10.

Since, you can boot to your Windows 10 system, open the **Command Prompt** as administrator. You can do that by going to your Windows menu and simply search for command prompt then right click with your mouse and choose **Run as administrator** from the contextual menu.

![Windows 10 with Ubuntu 19.04 fix](https://www.diigo.com/file/image/badcbccczobbqqqobdzdrpddasb/Capture.jpg?k=86cf786154b84bce27a197f64bfb32df)


In your command prompt, run the following command:

```bash
bcdedit /set {bootmgr} path \EFI\ubuntu\grubx64.efi
```

That's it! This is how I was able to fix dual boot from booting straight into Windows 10.  Restart your machine, you should be presented with the Grub screen with your two installed operating systems, Windows 10 and Ubuntu 19.04.

If after this fix, dual booting is still not working for you, you can also use a virtual machine like Virtualbox or VMware to run your Ubuntu system from inside your Windows 10 system without the need for dual boot.