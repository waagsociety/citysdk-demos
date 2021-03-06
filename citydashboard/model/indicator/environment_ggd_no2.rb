#encoding: utf-8
require_relative "../indicator.rb"
require_relative "../client.rb" 
require_relative "../ggd_scraper"
                               
class EnvironmentGgdNo2 < Indicator
       
   def get_id
     return "environment.ggd.no2"
   end
   
   def prepare admr  
     GgdScraper::scrape admr #scrape the page and store live values persistent
   end
   
   def get_name
     return "no2"
   end 
   
   def get_unit
     return "μg/m3"
   end 
   
   def get_time_stamp admr  
     return GgdScraper::get_date admr
   end
   
   def get_description
     return "average no2"
   end
   
   def calculate admr
     return GgdScraper::get_no2 admr  #get persistent value, which was scraped in prepare
   end
  
end