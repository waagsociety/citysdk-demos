require_relative "../indicator.rb"
require_relative "../client.rb"
require_relative "../sck_feed.rb" 
                               
class EnvironmentSckHumidity < Indicator
       
   def get_id
     return "environment.sck.humidity"
   end
   
   def get_name
      return "humidity"
   end
   
   def prepare admr  
     SCKFeed.fetch
   end
   
   def get_description
     return "average humidity in this region as measured by the crowd"
   end

   def get_range
     return [0,100]
   end

   def get_unit
     return "%"
   end
   
   def calculate admr
     val = SCKFeed.process "admr.nl.amsterdam", "hum" 
     return val
   end
  
end