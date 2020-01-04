---
layout: post
title: "Jekyll SEO"
image: "images/content/how-to-use-jekyll-like-a-pro-improving-seo/titleimage.png"
excerpt: "How to Jekyll like a pro: improving SEO"
categories : jekyll
tags : jekyll 
---
{% include image.html
       img="images/content/how-to-use-jekyll-like-a-pro-improving-seo/bigimage.png"
       title="How to use Jekyll like a pro : building contact forms"
%}

In this post; we'll learn about some techniques used for improving the SEO of Jekyll websites.

Jekyll is a static site generator that takes a bunch of html and markdown files and generates a static site ready for hosting for free with GitHub pages, GitLab or using your own server (Cheap cost). Jekyll is by far the most popular static site generator out there.

Jekyll is blog aware which means that things such as posts, categories, permalinks are first class citizens so you don’t need to worry if you are intending to build your blog with Jekyll, It should be easy and straightforward.

Jekyll is all about static files which means there is no database and no need for security patches, your website is more secure and very fast(no time spent accessing database).

Unlike other blogging platforms Jekyll gives you a total control over your SEO.
 
If you are building a static website or a blog with Jekyll and you care about SEO (You should!) in this post I’ll try to show you how to deal with some important SEO tricks when using Jekyll.

## URL redirection

URL redirection means redirecting an old url to a new url so you can tell browsers and search engines that some resource has moved to a new location. This is just one of the reasons, you can read this wikipedia article for other [reasons](http://en.wikipedia.org/wiki/URL_redirection#Purposes) why need URL redirection.

You can do url redirection using [301 redirect](http://en.wikipedia.org/wiki/HTTP_301) which means moved permanently to search engines but that’s only possible if you are in control of the web server. In case of a Jekyll website hosted with GitHub or GitLab you need to implement client side redirection 

To implement client side redirection you can use the Meta refresh tag which redirects the visitor to a new location after some controlled amount of time has passed.

```
    <meta http-equiv=”Refresh” content=”0; url=http://www.domain.com/newlocation" />
```

You can put the amount of time and the url to the new location in the content attribute separated by a semi-colon.

So how to do URL redirection the Jekyll way, you have two options either use a plugin or a layout.

### Jekyll Redirect From Plugin

The `Redirect From` plugin allows you to do redirects and is white listed by GitHub so you can use it ith your GitHub pages,This is a GEM package so all you have to do is installing it from your terminal and start using it by adding either `redirect_from` or `redirect_to` in YAML FrontMatter of a post or page that you want to redirect from or to. For more information on how to use this plugin head over to its GitHub repo(https://github.com/jekyll/jekyll-redirect-from).

If you are not fan of plugins you can use a layout that redirects you using the `Meta refresh` tag

```html
      <!DOCTYPE html>
      <html>
      <head>
      <link rel="canonical" href="{{ page.redirect_to }}"/>
      <meta http-equiv="content-type" content="text/html; charset=utf-8" />
      <meta http-equiv="refresh" content="0;url={{ page.redirect_to }}" />
      </head>
      <body>
          <h1>Redirecting...</h1>
            <a href="{{ page.redirect_to }}">Click here if you are not redirected.<a>
            <script>location='{{ page.redirect_to }}'</script>
      </body>
      </html>
```

Then you can add redirection from any post or page by extending the layout and specify the redirect_to parameter

```
      ---
      layout: redirected
      sitemap: false
      permalink: /oldlocation/
      redirect_to:  /newlocation/
      ---
```

You should put `sitemap: false` in the front matter so your redirected page won’t get included in your sitemap.

Link building, use `rel= nofollow` with external links

If you include external links in your website then a good seo measure you should be aware of is to specify `rel=”nofollow”` which tells search engines not to follow these links which preserves your page rank from being transmitted to these urls websites it’s also used to preserve you website authority if the external links you are pointing to are more than the backlinks you have (urls pointing to you)

So how to add `rel=”nofollow”` automatically to your external links 

You should install first Nokogiri a Ruby XML and HTML library

```     
      gem install nokogiri
```

```
    require 'nokogiri'

    module Jekyll
      module ExtLinks
        # Access plugin config in _config.yml
        def config
          @context.registers[:site].config['extlinks']
        end

        # Checks if str contains any fragment of the fragments array
        def contains_any(str, fragments)
          return false unless Regexp.union(fragments) =~ str
          true
        end

        def extlinks(content)
          # Process configured link attributes and whitelisted hosts
          if config
            if config['attributes']
              attributes = Array(config['attributes'])
            end
            if config['rel_exclude']
              rel_exclude = Array(config['rel_exclude'])
            end
          end
          # Stop if no attributes were specified
          return content unless attributes

          doc = Nokogiri::HTML.parse(content)
          # Stop if we could't parse with HTML
          return content unless doc

          doc.css('a').each do |a|
            # If this is a local link don't change it
            next unless a.get_attribute('href') =~ /\Ahttp/i

            attributes.each do |attr, value|
              if attr.downcase == 'rel'
                # If there's a rel already don't change it
                next unless !a.get_attribute('rel') || a.get_attribute('rel').empty?
                # Skip whitelisted hosts for the 'rel' attribute
                next if rel_exclude && contains_any(a.get_attribute('href'), rel_exclude)
              end
              a.set_attribute(attr, value)
            end
          end

          doc.to_s
        end

      end
    end
Liquid::Template.register_filter(Jekyll::ExtLinks)
#Developed by Dmitry Ogarkov - #http://ogarkov.com/jekyll/plugins/extlinks/
```

To configure the plugin add this to your `_config.yml`

```
     
      # extlinks:
      #   attributes: {rel: nofollow, target: _blank}
      #   rel_exclude: ['host1.com', 'host2.net']
      Now you can use it in the layout 
      {{ content | extlinks }}
```

## Cloacking External Links

Masking external links by using internal links so instead of going to `www.example.com` your visitor will visit first, for example `www.yoursite.com/go/examplecom` and then gets redirected to `www.example.com`. So how we can achieve URL cloaking or masking using Jekyll.

## Conclusion

In this article, we've seen many techniques for improving the SEO of your Jekyll website.
