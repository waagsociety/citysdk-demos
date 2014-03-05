require_relative "../pt_indicator.rb"  
require_relative "../cache.rb"
                               
class TransportPtRunning < Indicator
       
   def get_id
     return "transport.pt.running"
   end
   
   def get_name
     return "delay"
   end
   
   def get_cache_time
     return 300
   end  
   
   def get_unit
      return "lines"
   end
   
   def prepare admr  
     PtIndicator::__get_scheduled_now admr
   end
   
   def calculate admr
     return PtIndicator::get_trips_active admr
   end
  
end