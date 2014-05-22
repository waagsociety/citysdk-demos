require_relative "../indicator.rb"
require_relative "../client.rb"
require_relative "../sck_feed.rb"
                               
class EnvironmentSckTemperature < Indicator
       
   def get_id
     return "environment.sck.temperature"
   end
   
   def get_name
     return "temperature"
   end
   
   def get_description
     return "average temperature of in this region as measured by the crowd"
   end

   def get_range
     return [-20,40]
   end

   def get_unit
     return "&deg;"
   end
   
   def calculate admr
     val = SCKFeed.process "admr.nl.amsterdam", "temp" 
     return val
   end
  
end