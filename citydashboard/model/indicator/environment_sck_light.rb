require_relative "../indicator.rb"
require_relative "../client.rb"
require_relative "../sck_feed.rb" 
                               
class EnvironmentSckLight < Indicator
       
   def get_id
     return "environment.sck.light"
   end
   
   def get_name
     return "light"
   end
   
   def prepare admr  
     SCKFeed.fetch
   end
   
   def get_description
     return "average light in this region as measured by the crowd"
   end

   def get_range
     return [0,2000]
   end

   def get_unit
     return "lux"
   end
   
   def calculate admr
     val = SCKFeed.process "admr.nl.amsterdam", "light" 
     return val
   end
  
end