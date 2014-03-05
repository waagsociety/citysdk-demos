require_relative "../pt_indicator.rb"  
require_relative "../cache.rb"
                               
class TransportPtStopsdelayed < Indicator
       
   def get_id
     return "transport.pt.stopsdelayed"
   end
   
   def get_name
     return "delay stops"
   end 
   
   def get_description
     return "array of stops and their delays"
   end 
   
   def get_unit
     return "array"
   end
   
   def get_cache_time
     return 900
   end
   
   def prepare admr  
     PtIndicator::__get_actuals admr
   end
   
   def calculate admr
     return PtIndicator::get_delayed_stops admr 
   end
   
   def query_history_week admr
     return "not implemented"
   end
   
end