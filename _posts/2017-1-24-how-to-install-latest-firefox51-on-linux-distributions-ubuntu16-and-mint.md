---
layout: post
title: "How to install latest firefox 51 on linux distributions (Ubuntu 16 and Mint)"
image: "images/content/how-to-install-latest-firefox51-on-linux-distributions-ubuntu16-and-mint.png"
excerpt: ""
categories : firefox
tags : firefox 
---

{% include image.html
   img="images/content/how-to-install-latest-firefox51-on-linux-distributions-ubuntu16-and-mint.png"
       title="How to install latest firefox 51 on linux distributions (Ubuntu 16 and Mint)"
%}

Mozilla has made Firefox 51 available for download for GNU Linux ,MAC and Windows both 32bit and 64bit versions .Firefox 51 has an ameliorated video performance for machines with old GPUs  .It also utilizes less processor power than previous versions of Firefox browser .The new version of Firefox offers you a better full screen experience .

Firefox 51 has ameliorated also the gaming experience by implementing WebGL 2 .On Linux Firefox activated by default the open source library for 2D vector images ,Skia .

Firefox 51 has also a nice features such as

Notifications for non secured HTTP websites .

Better built in password manager .
  
Muting sound on inactive tabs .

For developers Firefox 51 does not support anymore a lot of old APIs such as

The social bookmarking API 

Social chat

Social status API

MozSocial API
 
indexedDB v2

Firefox 51 added support for

Clipboard access 

WebRTC supports V9 codec by default

For now Firefox 51 is not available for automatique update so your browser won’t be automatically updated to version 51 but you can manually install so here are the steps to follow if you want to install the latest release of Firefox .


First step :download fireofox 51 for Mozilla FTP servers
--------------------------------------------------------
--------------------------------------------------------

So the first step is to download Firefox 51 from [Mozilla FTP servers](https://ftp.mozilla.org/pub/firefox/releases/51.0/)

The en-US version can be found [here](https://ftp.mozilla.org/pub/firefox/releases/51.0/linux-x86_64/en-US/)

{% include image.html
   img="images/content/how-to-install-latest-firefox51-on-linux-distributions-ubuntu16-and-mint/firefox-ftp-server.png"
       title="How to install latest firefox 51 on linux distributions (Ubuntu 16 and Mint)"
%}

Step 2 Double click on the archive and extract somewhere
--------------------------------------------------------
--------------------------------------------------------

The next step is to open your tar.bz2 archive by double clicking on it and then extract to /tmp

{% include image.html
   img="images/content/how-to-install-latest-firefox51-on-linux-distributions-ubuntu16-and-mint/firefox51-extract.png"
       title="How to install latest firefox 51 on linux distributions (Ubuntu 16 and Mint)"
%}

Step 3 : open up your Terminal window 
-------------------------------------
---------------------------------------

The next step is to open up your terminal window and navigate to /tmp or wherever you have extracted your archive 

Then create a firefox folder under /opt .If you have a previous firefox installation you can either delete it or create a folder with different name such as firefox51

    sudo mkdir /opt/firefox51 

You need to sudo to be able to create a folder under /opt

    sudo mv -v /tmp/firefox/* /opt/firefox51/

Then make a sym link for easy start

    ln -s /opt/firefox51/firefox /usr/local/bin/firefox51

You should be able to launch firefox51 from your terminal 

Step 4 : Make a shortcut on your Desktop 
-------------------------------------------
--------------------------------------------

The last step is to create a shortcut in your Desktop for easy access .

Conclusion
-----------

So this is the method to install Firefox 51 on your Ubuntu 16 system until automatic updates become available .

