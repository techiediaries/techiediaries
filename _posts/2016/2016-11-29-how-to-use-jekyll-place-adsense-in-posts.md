---
layout: post
title: "How to use Jekyll like a pro : Place Adsense ads on posts"
image: "images/content/how-to-use-jekyll-place-adsense-in-posts/titleimage.png"
excerpt: "How to Jekyll like a pro : Place Adsense ads inside posts content"
tags : jekyll 
---
{% include image.html
       img="images/content/how-to-use-jekyll-place-adsense-in-posts/bigimage.png"
       title="How to Jekyll like a pro : Place Adsense ads inside posts content"
%}

In this short post i'll show you how you can place or put Adsense Ads or Ads for any other advertising network,if you prefer,inside your posts.
Ad placement is a very important factor if you want to maximize your earning.By experience from many professional publishers out there, placing Ads on content area or inside posts content contribute to a noticeable increase in earning .So if you prefer to put your ads on your post content this is how you can do it.

We need to create a Jekyll Liquid tag and then use it wherever you want to place an Ad when writing your post 

{% raw %}
  {% place_ads %}
{% endraw %}


The code of this tag is inspired from this [gist](https://gist.github.com/sverrirs/633190aa06ea7d7e7f3a){:rel="nofollow"} by Sverrir Sigmundarson

So lets start by creating a simple Liquid tag 

Create or navigate into your Jekyll website _plugins folder then create a new Ruby file .lets name place-ads.rb

Next just paste the following code 

  module Jekyll
    class PlaceAds < Liquid::Tag

      def initialize(tag_name, text, tokens)
        super
        @text = text
      end

      def render(context)
        "#{@text}"
      end
    end
  end

  Liquid::Template.register_tag('place_ads', Jekyll::PlaceAds)

This tag doesn't do anythong for now .All you need to do is modifying the render method to return your ads code 

  module Jekyll
    class PlaceAds < Liquid::Tag

      def initialize(tag_name, text, tokens)
        super
        @text = text
      end

      def render(context)
        "<div>
          <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
            <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-xxxxxxxxxx" data-ad-slot="xxxxxxxxx" data-ad-format="auto"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});
          </script>
        </div>"
      end
    end
  end
  Liquid::Template.register_tag('place_ads', Jekyll::PlaceAds)

You can apply your own CSS styles to the DIV so your ad will be nicely positionned,relatively to your content. 

Conclusion
------------

That's it ! you should be able now to place ads wherever you want inside your post content by just using the tag 

{% raw %}
  {% palce_ads %}
{% endraw %}


References
--------------

[Jekyll tags](https://jekyllrb.com/docs/plugins/#tags){:rel="nofollow"} 