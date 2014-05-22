require_relative "../indicator.rb"
require_relative "../client.rb"
require_relative "../sck_feed.rb"                  
require 'logger'
                               
class EnvironmentSckNoise < Indicator
       
   def get_id
     return "environment.sck.noise"
   end
   
   def get_name
      return "noise"
   end
   
   def get_description
     return "average noise of in this region as measured by the crowd"
   end

   def get_range
     return [0,140]
   end

   def get_unit
     return "DB"
   end
   
   def calculate admr
     val = SCKFeed.process "admr.nl.amsterdam", "noise" 
     return val
   end
  
end