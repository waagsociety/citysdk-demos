#encoding: utf-8

require_relative "../indicator.rb"
require_relative "../client.rb"
require_relative "../sck_feed.rb" 
                               
class EnvironmentSckNo2 < Indicator
       
   def get_id
     return "environment.sck.no2"
   end
   
   def get_name
      return "no2"
   end
   
   def prepare admr  
     SCKFeed.fetch
   end
   
   def get_description
     return "average no2 of in this region as measured by the crowd"
   end

   def get_range
     return [0,100]
   end

   def get_unit
     return "KΩ"
   end
   
   def calculate admr
     val = SCKFeed.process "admr.nl.amsterdam", "no2" 
     return val
   end
  
end