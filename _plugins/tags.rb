module Jekyll

    class TagPage < Page
      def initialize(site, base, dir, tag)
        @site = site
        @base = base
        @dir = dir
        @name = 'index.html'
  
        self.process(@name)
        self.read_yaml(File.join(base, '_layouts'), 'tag-index.html')
        self.data['tag'] = tag
  
        tag_title_prefix = site.config['tag_title_prefix'] || 'Tag: '
        self.data['title'] = "#{tag_title_prefix}#{tag}"
      end
    end

    class SpecificTagPage < Page
      def initialize(site, base, dir, tag)
        @site = site
        @base = base
        @dir = dir
        @name = 'index.html'
  
        self.process(@name)
        self.read_yaml(File.join(base, '_layouts'), '#{tag}.html')
        self.data['tag'] = tag
  
        tag_title_prefix = site.config['tag_title_prefix'] || 'Tag: '
        self.data['title'] = "#{tag_title_prefix}#{tag}"
      end
    end    

    class TagPageGenerator < Generator
      safe true
  
      def generate(site)
        site.tags.keys.each do |tag|
          if site.layouts.key? tag
            site.pages << SpecificTagPage.new(site, site.source, File.join(dir, tag), tag)
          else
            site.pages << TagPage.new(site, site.source, File.join(dir, tag), tag)
          end

        end
      end
    end
  end