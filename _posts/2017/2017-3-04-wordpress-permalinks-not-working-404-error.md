---
layout: post
title: "How to fix WordPress permalinks not working (Posts returning 404 error)"
image: "images/content/wordpress-permalinks-not-working-404-error.png"
excerpt: "How to fix WordPress permalinks not working (Posts returning 404 error)"
categories: 
tags : wordpress
---

{% include image.html 
    img="images/content/wordpress-permalinks-not-working-404-error.png" 
    title="How to fix WordPress permalinks not working (Posts returning 404 error)" 
%}

I have spent a couple of hours today trying to fix WordPress broken permalinks for posts and categories and maybe 
other resources .

All posts returned 404 errors when I changed the format of my links to the beautiful permalinks instead of 
classic links with the ugly series of id numbers . 

Please note that I was using WordPress 4.7 in my local Ubuntu 16 development machine not on a production server
so if this is your case too and you are looking for a solution .Here is what you need to do .

There are many things that can cause your WordPress parmalinks not to work so lets check them one by one .

First you need to have rewrite module enabled .If it not enabled then just open up your terminal and enable it
with : 

sudo a2enmod rewrite

If you get 

    Module rewrite already enabled

That is OK .It only means you have the rewrite module enabled .

Now restart your Apache server with

    sudo service apache2 restart


If this doesn't solve your problem then continue to the next step .

Open .htaccess file and make sure these lines exist 

    # BEGIN WordPress
    <IfModule mod_rewrite.c>
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.php$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.php [L]
    </IfModule>

    # END WordPress

If not ,then just copy them and save the file then restart Apache with 

    sudo service apache2 restart

Next you need to open apache2.conf with a text editor 

    sudo nano /etc/apache2/apache2.conf

Make sure you add sudo then enter your root password .

Look for 

    <Directory /var/www/>
	    Options Indexes FollowSymLinks
	    AllowOverride None 
	    Require all granted
    </Directory>     

Then change it to 

    <Directory /var/www/>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory> 

So this is the last thing that helped me save my day .Actually all what we have seen before this last change
was alreay set so the solution was changing AllowOverride from None to All.

I hope this solves your problem too and see you in another post .


