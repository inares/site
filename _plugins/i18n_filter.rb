# require 'i18n'

# LOCALE = Jekyll.configuration({})['language'] # set your locale from config var
# Create folder "_locales" and put some locale file from https://github.com/svenfuchs/rails-i18n/tree/master/rails/locale

module Jekyll
  module DateFilter
    # Example:
    #   {{ post.date | long_date }}
    @@months = {
      "01" => "janvier",
      "02" => "février",
      "03" => "mars",
      "04" => "avril",
      "05" => "mai",
      "06" => "juin",
      "07" => "juillet",
      "08" => "août",
      "09" => "septembre",
      "10" => "octobre",
      "11" => "novembre",
      "12" => "décembre"
    }
    @@months.default = "mois inconnu"

    # def i18n_month(input)
      # level = case input
        # when "01" then "janvier"
        # when "02" then "février"
        # when "03" then "mars"
        # when "04" then "avril"
        # when "05" then "mai"
        # when "06" then "juin"
        # when "07" then "juillet"
        # when "08" then "août"
        # when "09" then "septembre"
        # when "10" then "octobre"
        # when "11" then "novembre"
        # when "12" then "décembre"
        # else "mois inconnu (" + input + ")"
      # end
    # rescue
      # "Erreur"
    # end

    def i18n_date_long(input)
      # t = Time.parse(input)
      mois = input.strftime("%m")
      # mois = i18n_month(mois)
      mois = @@months[mois]
      # mydate = input.strftime("%-d") + " " + mois + " " + input.strftime("%Y")
      input.strftime("%-d #{mois} %Y")
    end
  end
end

Liquid::Template.register_filter(Jekyll::DateFilter)
