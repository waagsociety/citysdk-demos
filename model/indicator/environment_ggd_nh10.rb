# encoding: utf-8
require_relative "../indicator.rb"
require_relative "../client.rb" 
require_relative "../ggd_scraper"
                               
class EnvironmentGgdNh10 < Indicator
       
   def get_id
     return "environment.ggd.nh10"
   end
   
   def prepare admr  
     GgdScraper::scrape admr
   end
   
   def get_name
     return "nh10"
   end  

   def get_unit
     return "μg/m3"
   end
   
   def get_time_stamp  
     return GgdScraper::get_date
   end
   
   def get_description
     return "average nh10"
   end
   
   def calculate admr
     return GgdScraper::get_pm10
   end
  
end