require 'cgi'

module JekyllFootnotes

  class FootnotesGenerator < Jekyll::Generator
    safe true
    priority :low
    
    def generate(site)
      if site.config.has_key?("JekyllFootnotes") and !site.config["JekyllFootnotes"]
        return
      end
      
      # updates = site.data['articles']['updates']

      # if no updates found, exit here
      # if updates.nil?
        # return
      # end
      
      site.posts.docs.each { |p| substitute(p) }
    end

    def substitute(obj)
      if obj.data.has_key?("footnotes") and obj.data["footnotes"]=="no"
        return
      end
      
      i = 0
      footer = ''
      
      obj.content.gsub!(/\[N\]\{(?!exemple)(.*?)\}/) do |_str|
        i += 1
        footer += "<li id='foot-#{i}'><a href='#note-#{i}' title='Note #{i}' onclick='ga(\"send\", \"event\", \"footnote\", \"go_from_footnote\", \"note-#{i}\");'>&uarr;</a> #{$1}</li>"
        # "<footNoteRef id='note-#{i}'><a href='#foot-#{i}' title='Note #{i}' rel='footnote'>#{i}</a></footNoteRef>"
        
        # Suppression de <a href="">xxx</a> dans les notes à droite
        desc = $1
        desc.gsub!(/<a\s+(?:[^>]*?\s+)?href="([^"]*)">(.*)<\/a>/) do |_str2|
          $2 + " (" + $1 + ")"
        end
        # "<span class='sidenote' desc='#{desc}'></span><footNoteRef id='note-#{i}'><a href='#foot-#{i}' title='Note #{i}' rel='footnote'>#{i}</a></footNoteRef>"
        # https://developers.google.com/analytics/devguides/collection/analyticsjs/command-queue-reference#send
        
        desc = CGI.escapeHTML( desc )
        "<a href='#foot-#{i}' id='note-#{i}' title='Note #{i}' rel='footnote' class='sidenote' desc='#{desc}' onclick='ga(\"send\", \"event\", \"footnote\", \"go_to_footnote\", \"note-#{i}\");'></a>"
      end
      
      if footer != ''
        Jekyll.logger.info ' * Footnotes found for', obj.url
        footer = "\n<br />\n<hr />\n<h3>Notes</h3><ol>" + footer + '</ol>'
        obj.content << footer
      end
      
      # obj.content.gsub!(/\[footnotes\]/) do |str|
        # footer
      # end
    end

  end
  

  
  # class FootnotesInclude < Liquid::Tag
    # def initialize(tag_name, input, tokens)
      # super
    # end

    ## Lookup allows access to the page/post variables through the tag context
    # def lookup(context, name)
      # lookup = context
      # name.split(".").each { |value| lookup = lookup[value] }
      # lookup
    # end

    # def render(context)
      ## Write the output HTML string
      # site    = context.registers[:site]
      # content = super
      # output  =  ""
      # page    = context.environments.first["page"]
      # Jekyll.logger.info 'FootnotesInclude', site.source
      # content.gsub(/Fellay/) do |str|
        # Jekyll.logger.info 'FootnotesInclude', str
        # output += str
      # end

      ## Render it on the page by returning it
      # return output;
    # end
  # end
  
end



# Liquid::Template.register_tag('footnotes', JekyllFootnotes::FootnotesInclude)
