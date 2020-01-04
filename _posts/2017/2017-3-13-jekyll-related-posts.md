---
layout: post
title: "Revised Jekyll related posts "
image: "images/content/jekyll-related-posts.png"
excerpt: "In this tutorial ,we are going to see a revised and better Jekyll related posts  " 
tags : jekyll
---

{% include image.html 
    img="images/content/jekyll-related-posts.png" 
    title="Jekyll related posts " 
%}

Bloggers who have development skills use tools like Jekyll as a blogging
platform instead of many other popular options especially designed for people
without technical background .

Jekyll is a static site generator and blog aware tool written in Ruby which allows 
to create fully fledged blogs without the need for a database to store the 
content because everything from configuration files to content files are static 
files .    

Jekyll related posts can only show recent posts (related in time ) who may not necessarilly 
be related in terms of subject so the name needs to be page.recent_posts instead
of page.related_posts .

In this post we are going to see how we can implement a real related posts 
feature which looks at different post indicators such as that categories and 
tags to figure out similar and related posts .

We are going also to see available Jekyll plugin(s) built by the community 
which use advanced algorithms such as [TFIDF](https://en.wikipedia.org/wiki/Tf%E2%80%93idf) and [LSI](https://en.wikipedia.org/wiki/Latent_semantic_indexing) . to further analyze the post content to guess 
related posts instead of the trivial categories and tags .

Implementing Jekyll related posts based on tags and/or categories
------------------------------------------------------------------
-------------------------------------------------------------------

First you need to assign proper tags (or categories or both ) to your posts to 
use this technique for related posts .

For tags ,this was picked up from this [StackOverflow answer](http://stackoverflow.com/questions/25348389/jekyll-and-liquid-show-related-posts-by-amount-of-equal-tags-2)

Under your _includes folder create a related-posts.html file and copy the
following Liquid code 

{% raw %}

    {% assign maxRelated = 5 %}

    {% assign minCommonTags =  3 %}

    {% assign maxRelatedCounter = 0 %}

    {% for post in site.posts %}

        {% assign sameTagCount = 0 %}
        {% assign commonTags = '' %}

        {% for tag in post.tags %}

        {% if post.url != page.url %}
            {% if page.tags contains tag %}
            {% assign sameTagCount = sameTagCount | plus: 1 %}
            {% capture tagmarkup %} <span class="label label-default">{{ tag }}</span> {% endcapture %}
            {% assign commonTags = commonTags | append: tagmarkup %}
            {% endif %}
        {% endif %}
        {% endfor %}

        {% if sameTagCount >= minCommonTags %}
        <div>
        <h5><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}{{ commonTags }}</a></h5>
        </div>
        {% assign maxRelatedCounter = maxRelatedCounter | plus: 1 %}
        {% if maxRelatedCounter >= maxRelated %}
            {% break %}
        {% endif %}
        {% endif %}

    {% endfor %}

{% endraw %}

Then to include it in any post :

{% raw %}
    {% include related-posts.html %}

{% endraw %}

You can do the same with categories by just changing the few lines referring 
to tags and replace them with categories .

As you may see to Liquid code looks for most recent posts that have common 
tags (and categories if you need ) which may not be the best result you want 
so lets see another way which use content correlation algorithms .

Advanced Jekyll related posts 
-------------------------------
-------------------------------

We are going to use a Jekyll plugin that can be installed from gem .

First of all ,since the plugin is a native extension we need to install Ruby dev 
files so gem can built it without errors .

So go ahead and open your terminal and install Ruby dev files .

For Ubuntu ,you can install them with :

    sudo apt-get install ruby-dev

Next lets install the gem by entering 

    gem install jekyll-related-posts

Next open _config.yml and add 'jekyll-related-posts' to gems array .

Now open your post layout (_layouts/post.html ) and insert 

    <related-posts />

Where you want your related posts to appear .

You can further cutomize the plugin by setting configuration variables in 
_config.yml

    related:
        max_count: 5
        min_score: 0.1
        accuracy: 0.75

And you can also cutomize the related posts template by creating related.html
template under layouts folder .Here the default content of related.html

{% raw %}
    {% if related_posts != empty %}
    <div id="related-posts">
    <h3>Related posts</h3>
    <ul>
        {% for p in related_posts %}
        <li>
            <a href="{{ p.url }}" data-score="{{ p.score }}">{{ p.title }}</a>
        </li>
        {% endfor %}
    </ul>
    </div>
    {% endif %}

{% endraw %}
For more information about the plugin visit its <a href="https://github.com/alfanick/jekyll-related-posts" target="_blank">Github repo</a>

Conclusion
-------------
-------------

So as we have seen ,The default Jekyll related posts use a time basis to 
tell if posts are related ,which is in reality recent posts ,that may not be 
the required behavior desired by many bloggers ,instead we have used a Liquid 
code to check for tags to show most recent and related posts and for advanced
related posts based on analyzing the posts content we have used a Jekyll plugin 
installable for GEM .   

