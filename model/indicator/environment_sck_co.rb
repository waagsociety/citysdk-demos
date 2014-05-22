#encoding: utf-8

require_relative "../indicator.rb"
require_relative "../client.rb"
require_relative "../sck_feed.rb" 
                               
class EnvironmentCoNoise < Indicator
       
   def get_id
     return "environment.sck.co"
   end
   
   def get_name
      return "co"
   end
   
   def prepare admr  
     SCKFeed.fetch
   end
   
   def get_description
     return "average co of in this region as measured by the crowd"
   end

   def get_range
     return [0,1000]
   end

   def get_unit
     return "KΩ"
   end
   
   def calculate admr
     val = SCKFeed.process "admr.nl.amsterdam", "co" 
     return val
   end
  
end