require_relative "../indicator.rb" 
require_relative "../p2000_feed.rb" 
                               
class EmergencyP2000Locations < Indicator
       
   def get_id
     return "emergency.p2000.locations"
   end
   
   def get_name
     return "p2000 alarm locations"
   end 
   
   def get_description
     return "locations for p2000 alarms last hour"
   end 
   
   def get_unit
      return "locations"
   end
   
   def get_type
      return "array"
   end
   
   def prepare admr 
     P2000Feed::fetch
   end                        
   
   def calculate admr
     locations = P2000Feed::process admr
     return locations
   end
   
   def query_history_week admr
      return "not implemented"
   end
   
end