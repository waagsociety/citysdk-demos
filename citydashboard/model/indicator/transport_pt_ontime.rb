require_relative "../pt_indicator.rb"  
require_relative "../cache.rb"
                               
class TransportPtOntime < Indicator
       
   def get_id
     return "transport.pt.ontime"
   end
   
   def get_name
     return "on time"
   end 
   
   def get_description
     return "percentage of public transport running on time"
   end 
   
   def get_unit
       return "%"
   end
   
   def get_cache_time
     return 3
   end
   
   def prepare admr  
     PtIndicator::get_actuals admr
   end
   
   def calculate admr
     return PtIndicator::get_on_time_percentage admr 
   end
  
end