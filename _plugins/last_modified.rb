module Jekyll
  module LastModified
    def file_date(input)
      if File.exist?(input)
          File.mtime( input )
      else
          DateTime.now 
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::LastModified)