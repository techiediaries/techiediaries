---
layout: post
title: "Jekyll Nofollow Links"
image: "images/content/how-to-use-jekyll-like-a-pro-nofollow-links/titleimage.png"
excerpt: "How to use Jekyll like a Pro: Nofollow Links"
tags : jekyll 
---
{% include image.html
       img="images/content/how-to-use-jekyll-like-nofollow-links/bigimage.png"
       title="How to use Jekyll like a pro : nofollow links"
%}

Jekyll is a static site generator that takes a bunch of HTML and Markdown files and generates a static site ready for hosting for free with GitHub pages,GitLab or using your own server(Cheap cost).Jekyll is by far the most popular static site generator out there.

Jekyll is blog aware which means that things such as posts , categories , permalinks are first class citizens so you don’t need to worry if you are intending to build your blog with Jekyll,it should be easy and straightforward.

Jekyll is all about static files which means there is no database and no need for security patches ,your website is more secure and very fast(no time spent accessing database).

Unlike other blogging platforms Jekyll gives you a total control over your SEO.
 
If you are building a static website or a blog with Jekyll and you care about SEO ( You should ! ) in this post i’ll show one important SEO measure that you must adhere to nofollow links .

What's a nofollow link ?
-------------------------

Nofollow links are just links with the attribue rel="nofollow" which tells Google not to follow an external link when it finds one during your website crawling so the external link won't get any link juice which simply means no authority will pass to the external website from yours.The opposite is a dofollow links .Any link without rel="nofollow" is dofollow.According to Google having many dofollow links to external websites will hurt your website ranking so you should always do follow external links especially in user submitted content such as comments,guess posting author bios  etc.

How to add rel="nofollow" to your links using Makdown
------------------------------------------------------

If you are adding some links by yourself and want to make them nofollow then your job is very easy .All you have to do is 

{% raw %}
  [Techiediaries](https://www.techiediaries.com/){:rel="nofollow"}  
{% endraw %}

In fact you can add any attribute to your link using this method .For example to add a target attribute

{% raw %}
  [Techiediaries](https://www.techiediaries.com/){:target="_blank"}
{% endraw %}

So as you can see that's very easy to do if you are adding your link manually but what if you need to no follow other existing links that you've previously added on your website or what if you prefer to do it automatically so you won't forget or whatever your reasons are (there are many).In this case you need to implement a jekyll plugin  so lets do .

First if it does not exist create a _plugins folder under your jekyll root folder.

Next create a Ruby file to host plugin code,lets name auto-nofollow.rb

    cd into_my_website_folder
    mkdir _plugins && cd _plugins
    touch auto-nofollow.rb

Open the file and add the following code

require 'nokogiri'

  Jekyll::Hooks.register :posts, :post_render do |post|
    # code to call after Jekyll renders a post
    content = Nokogiri::HTML(post.content)
    
      content.css("a").each do |a|
              next unless a.get_attribute('href') =~ /\Ahttp/i
              a.set_attribute("rel", "external nofollow")
              a.set_attribute("target","_blank")
            
      end

      post.content = content.to_s
    

  end

Lets break our code 

We started by requiring nokogiri which's a Ruby module for parsing HTML so you'll have to install via 

  gem install nokogiri

Next we have registered Jekyll hook which fired after rendering posts 

Next we parse the post content with   Nokogiri::HTML(post.content)

Then we simply select all a tags and iterate over the array returend by content.css('a')

If it's an external link (begins with http) we add the attribute rel="external nofollow" and optionally we add target="_blank" which opens the link in a new window/tab.

And then we assign the content back to our post.content variable.

Remember the plugin checks for external links using the http string so you need to always write the full URL to external websites so it can properly recognize external links.

You can also easilly extend the plugin to add a list of excluded domains which the plugin will ignore.You can check this [GitHub repo for the complete plugin](https://github.com/techiediaries/jekyll-autonofollow){:rel="nofollow"} and give it a star if it was helpful for you.    


Conclusion
-------------

I hope this tutorial was helpful for you and remember to always nofollow your external links unless you want to attribute some of your domain authority to some selected domains.

References
-------------

[http://www.codestub.com/jekyll-markdown-nofollow/](http://www.codestub.com/jekyll-markdown-nofollow/){:rel="nofollow"}



