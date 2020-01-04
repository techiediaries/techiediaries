---
layout: post
title: "Python PIP local cache"
image: "images/content/python-pip-local-cache.png"
excerpt: "Python PIP local cache" 
tags : "django"
---

{% include image.html 
    img="images/content/python-pip-local-cache.png" 
    title="Python PIP local cache" 
%}

PIP is the Python Package Manager that allows Python developers and users to easily install Python packages 
published on the pip remote register by other developers .

If you are using the pip manager frequently then you may find this quick tip useful ,where I'll show
how you can activate or enable the local cache of pip which is going to boost the download speed of 
pip packages . 

The idea behind the pip cache is simple ,when you install a Python package using pip for the first time ,it gets
saved on the cache .If you try to download/install the same version of the package on a second time ,pip 
will just use the local cached copy instead of retrieving it from the remote register .

Enabling the local cache of pip 
----------------------------------
----------------------------------

Enabling the local cache of pip is fairly simple so let's do it step by step .

First open the pip configuration file located at <em>~/.pip/pip.conf</em> with your preferred text editor .

    vim ~/.pip/pip.con

<div class="note">
On Windows <em>%HOME%\pip\pip.ini</em>   
</div>
The configuration file can be also located in <em>~/.config/pip/pip.conf</em> or in <em>/etc/pip.conf</em>    

<div class="note">

There also legacy per user config files for PIP which are located in :<br>
<em>$HOME/.pip/pip.conf</em> on Unix and MAC <br>
<em>%HOME%\pip\pip.ini</em> on Windows .<br>

Or you can even use a custom file and location for PIP config file using the environment variable 

<em>PIP_CONFIG_FILE</em>
<br>
If you are inside a virtualenv ,you can find the config file in <em>$VIRTUAL_ENV/pip.conf</em> on Unix 
based systems and <em>%VIRTUAL_ENV%\pip.ini</em> on Windows . 
<br>
You can find more information about the PIP configuration file <a href="https://pip.pypa.io/en/latest/user_guide/#config-file">here</a>
</div>


Then copy and add this 

    [global]
    no-cache-dir = false
    download-cache=/usr/local/pip/cache

Next create the folder

    mkdir -p /usr/local/pip/cache

Then give it write access 

    chmod -R 755 /usr/local/pip/cache

You can instead use your profile config file <em>~/.bash_profile</em>

So open <em>~/.bash_profile</em> .

And add 

    export PIP_DOWNLOAD_CACHE=$HOME/.pip_download_cache

That is it ! I hope this was helpful for you .

    