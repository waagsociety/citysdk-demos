require_relative "../indicator.rb" 
require_relative "../p2000_feed.rb" 
                               
class EmergencyP2000Alarms < Indicator
       
   def get_id
     return "emergency.p2000.alarms"
   end
   
   def get_name
     return "p2000 alarms"
   end 
   
   def get_description
     return "number of alarms per hour"
   end 
   
   def get_unit
      return "alarms"
   end
   
   def prepare admr 
     P2000Feed::fetch
   end                        
   
   def calculate admr
     result = 0
     locations = P2000Feed::process admr
     if locations
        result = locations.length
     end
     
     return result
   end
end