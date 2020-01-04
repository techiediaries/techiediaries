---
layout: post
title: "Jekyll JSON API"
image: "images/content/how-to-use-jekyll-like-a-pro-build-api/titleimage.png"
excerpt: "How to use Jekyll like a pro: build a JSON API for your static website"
tags : jekyll 
---
{% include image.html

       img="images/content/how-to-use-jekyll-like-a-pro-build-api/bigimage.png"
       title="How to use Jekyll like a pro :build a JSON API for your static website"
%}

Throughout this tutorial we are going to learn how to build an API for static websites powered by Jekyll, so you can consume static data via any web/mobile application. 

So first of all let's talk about the basics. If you just need to output some data as JSON you can easily do that using the `jsonify` filter. For example, if you have an array in your front matter such as: 

		---
		myArray:
		  - a1
		  - a2
		  - a3
		  - a4
		---	 

You can easily get `myArray` as JSON using:

	  var myArray = {{ page.myArray | jsonify }};

After building/serving your website, the result will be as you may expect:

	  var myArray = ["a1","a2","a3","a4"];

All variables in the front matter of your page will be accessible via page variable so we took our YAML array `page.myArray` and convert it to JSON with the `jsonify` liquid filter.  

Now let's try with a more practical example. What if you want to get the JSON output of all your posts in a JSON file. That's also not hard using Jekyll. You can do it following these two steps:

First create the output file with a name, let's call it `output.json`.

Next open the `output.json` file and add the following code:

{% highlight ruby %}
{% raw %}
		---
		limit: 100
		---

		{% for post in site.posts limit: page.limit %}
		    
		    {
		      "title": "{{ post.title }}",
		      "date"     : "{{ post.date | date: "%B %d, %Y" }}",

		      "excerpt" : "{{ post.excerpt }}",
		      {% if post.categories %} "categories"  : [
		        {% for category in post.categories %} "{{ category }}"
		        {% if forloop.last %}{% else %},{% endif %}
		        {% endfor %}
		        ],
		      {% endif %}
		      {% if post.categories == nil %} "categories"  : [],  {% endif %}
		      "url": "{{ post.url }}",
		      {% if post.tags %} "tags"  : [
		        {% for tag in post.tags %} "{{ tag }}"
		        {% if forloop.last %}{% else %},{% endif %}
		        {% endfor %}
		        ]
		      {% endif %}
		      {% if post.tags == nil %} "tags"  : []  {% endif %}

		    }

		    {% unless forloop.last %},{% endunless %}
		
		{% endfor %}

{% endraw %}
{% endhighlight %}

The limit meta in the front matter controls the number of posts to output as JSON.

We have looped through all `site.posts` and created a JSON object with each post data separating the objects with a comma. After building your website, Jekyll will take care of parsing the YAML and Liquid data and outputting `output.json` with your posts data in the JSON format.

Go ahead and test it with a Jekyll blog, serve it or build it then look inside of your `_site` folder for your `output.json` with posts data. Or just visit `127.0.0.1:4000/output.json` to see the result.

You can consume this JSON data from any JavaScript application or mobile application but what if you need more control such as pagination and pagination by categories like any decent API endpoint? To do that, we need a plugin, so go ahead and create a `_plugins` folder under your Jekyll website root folder.

For pagination you need to have `jekyll-paginate` installed so first install it with: 

		gem install jekyll-paginate

Next under your `_plugins` folder create a new ruby file, let's name it `api.rb` and add the following code to the file.		

```
module Jekyll
  module Paginate
    module Api
      
      class Pagination < Generator
        safe true
        priority :lowest

        def generate(site)
          if Paginate::Pager.pagination_enabled?(site)
            site.categories.each do |category, posts|
              total = Paginate::Pager.calculate_pages(posts, site.config['paginate'])
              (1..total).each do |i|
                site.pages << JsonPage.new(site, category, i,site.categories[category])
                
              end
            end
            total = Paginate::Pager.calculate_pages(site.posts, site.config['paginate'])
            (1..total).each do |i|
                site.pages << JsonPage.new(site, 'all', i,site.posts)
            end  


          end
        end
      end
      
      class JsonPage < Page
        def initialize(site, category, num_page,posts)
          @site = site
          @base = site.source
          @total = posts.length()
          @current = num_page

          @previous = -1
          @next = -1
          @paginator = Paginate::Pager.new(site, num_page, posts)
          @length = @paginator.posts.length()

          if(@paginator.previous_page)
            @previous = @current - 1
          end
          if(@paginator.next_page)
            @next = @current + 1
          end
          category_dir = site.config['api_category_dir'] || 'api'

          @dir = File.join(category_dir,category)

          #@name = Paginate::Pager.paginate_path(site, num_page)
          #@name.concat '/' unless @name.end_with? '/'
          
          @name = num_page.to_s + '.json' 

          self.process(@name)

          category_layout = site.config['api_layout'] || '_layouts/api.md'
          self.read_yaml(@base, category_layout)
          
          self.data.merge!(
                           'title'     => category,
                           'category' => category,
                           'length' => @length,
                           'total' => @total,
                           'current' => @current,
                           'next' => @next,
                           'previous' => @previous,
                           'paginator' => @paginator
                          )
        end
      end

      
    end
  end
end
</pre>
```

Now create the `api_by_category.rb` file and add:

```
module Jekyll
  module Paginate
    module Api
      
      class Pagination < Generator
        safe true
        priority :lowest

        def generate(site)
          if Paginate::Pager.pagination_enabled?(site)
            site.categories.each do |category, posts|
              total = Paginate::Pager.calculate_pages(posts, site.config['paginate'])
              (1..total).each do |i|
                
                site.pages << JsonPage.new(site, category, i)
                
              end
            end
          end
        end
      end
    end
  end
end
```

