---
layout: post
title: How to setup a custom domain for your github hosted website 
image: "images/content/how-to-setup-a-custom-domain-for-your-github-hosted-website/titleimage.png"
excerpt: "Github pages allows us to host static websites and Jekyll based blogs for free ,you get a free and a good quality hosting with additional options such as adding your custom domain name .
"
tags : jekyll 
---

<a data-pin-do="embedPin" data-pin-width="large" href="https://www.pinterest.com/pin/427490189612752917/"></a>

<br/>

With Github pages you can setup your own personal website,a portfolio website or even a full fledged blog (based on Jekyll) with your own custom domain name and you only have to pay for the domain name (to your domain name seller, around 12$ yearly) isn't that very awesome ?

Your Github hosted website or blog uses the same infrastructure used by Github so you don't have to worry about execeeding bandwidth or anything like that.If you are a blogger who's using popular blogging and CMS platforms such as Wordpress, you may consider switching to Jekyll and GitHub pages.Jekyll allows you to have a full fledged blog where you have posts ,categories,pagination and other cool things with a major difference from the ather platforms ,there is no database ! only static files.Jekyll is the static site generator and engine behind Github pages so you can host any Jekyll based blog on GitHub which will take care of running Jekyll for you and makes your site ready for serving on each commit.

In this tutorial we are going to see how to setup a custom domain name for your website hosted with GitHub Pages.

	We assume you have already a Github page configured and ready for
	a custom domain name and of course you have bought the domain name 
	you want to use.       

There are two slitly different but equivalant methods that you can use to link your custom domain name to your Github page.

Method 1 :Create CNAME file manually
-----------

You first create your local git repository 

{% include image.html
            img="images/content/how-to-setup-a-custom-domain-for-your-github-hosted-website/github-create-repository.png"
            title="Github create new repository"
            caption="Github create new repository"
            %}

Next enter your repository info and other optional things such as the description

{% include image.html
            img="images/content/how-to-setup-a-custom-domain-for-your-github-hosted-website/github-enter-repo-info.png"
            title="Github enter repo info"
            caption="Github enter repo info"
            %}


add some bunch of HTML ,CSS and JavaScript files with an index.html file then create a CNAME file in the root folder ( Where index.html lives)

	
	mkdir my-website && cd my-website
	git init
	mkdir css js
	touch index.html
	echo "hello world" > index.html 
	touch CNAME 
	echo "my-domain-name.com" > CNAME

Next you need just to commit and push files to a GitHub repository you have created.
	
	git remote add origin https://github.com/techiediaries/my-github-website.git
	add .
	commit -m "first website commit"
	git push -u origin master 

You should have your repository source look like the following screenshot

{% include image.html
            img="images/content/how-to-setup-a-custom-domain-for-your-github-hosted-website/github-repo-source.png"
            title="Github repo source"
            caption="Github repo source"
            %}



GitHub pages are disbaled by default ,you need to enable them by going to repository settings ,scroll down until you find Github pages pane ,next select your website source to enable Github pages 

{% include image.html
            img="images/content/how-to-setup-a-custom-domain-for-your-github-hosted-website/github-pages-pane.png"
            title="Github pages pane"
            caption="Github pages pane"
            %}



Choose the master branch as a source and click on save 

{% include image.html
            img="images/content/how-to-setup-a-custom-domain-for-your-github-hosted-website/github-choose-source.png"
            title="Github choose website source"
            caption="Github choose website source"
            %}


Now after the settings page reloads you should see this message

	 Your site is ready to be published at http://my-domain-name.com/.


{% include image.html
            img="images/content/how-to-setup-a-custom-domain-for-your-github-hosted-website/github-website-ready.png"
            title="Github website published "
            caption="Github website published"
            %}


That is all you have to do from GitHub side.



Method 2:Create CNAME from repository settings 
----------

The second method is equivalent to the first one ,you don't need to create the CNAME file manually 

{% include image.html
            img="images/content/how-to-setup-a-custom-domain-for-your-github-hosted-website/github-no-cname.png"
            title="Github no CNAME "
            caption="Github no CNAME"
            %}

After pushing your repository (Without creating a CNAME),go to settings ,choose the source of your website and click on save .

After settings page reloading 

You need to enter your domain name and click on save.

{% include image.html
            img="images/content/how-to-setup-a-custom-domain-for-your-github-hosted-website/github-enter-custom-domain.png"
            title="Github enter custom domain "
            caption="Github enter custom domain name"
            %}

A CNAME file will be created for you automatically ,go to repo source to find it.

{% include image.html
            img="images/content/how-to-setup-a-custom-domain-for-your-github-hosted-website/github-create-cname.png"
            title="Github Create CNAME "
            caption="Github Create CNAME"
            %}


Just make sure to pull out the changes to your local repository so you get no conflicts when you commit and push your local repo next time . 

Pointing your domain name provider DNS to GitHub
--------
-------- 

The next thing to do is setting up your domain name provider DNS to point to GitHub servers.

Whatever DNS provider you use all you have to do is creating an Alias,Aname or A record and point it to Github servers .

So just try following your DNS provider's instructions and create two A records that point your custom domain to these GitHub IP addresses:


	192.30.252.153
	192.30.252.154

Make sure that your apex domain is pointing to both IP addresses you provided.After waiting a while just let DNS information propagate (the period differs between providers).You can then visit your website to see if everything is ok ,if not try to an utility like dig to see if your apex domain is pointing to GitHub IP addresses.

	$ dig my-domain-name.com +nostats +nocomments +nocmd

Normally you should get something like this

	my-domain-name.com.   73  IN  A 192.30.252.153
	my-domain-name.com.   73  IN  A 192.30.252.154


Conclusion
-----------

So congratulations for setting up your custom domain name to point to your GitHub hosted website.As i said earlier if you are a blogger you should consider Jekyll as an alternative to other blogging platforms especillay if you are looking for a good quality hosting for free.You can find the repository we just created at this [link](https://github.com/techiediaries/my-github-website).  