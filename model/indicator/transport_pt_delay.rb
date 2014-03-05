require_relative "../pt_indicator.rb"  
require_relative "../cache.rb"
                               
class TransportPtDelay < Indicator
       
   def get_id
     return "transport.pt.delay"
   end
   
   def get_name
     return "delay"
   end         
   
   def get_description
     return "average delay at stops that are delayed"
   end
   
   def get_unit
      return "seconds"
   end
   
   def get_cache_time
     return 300
   end
   
   def prepare admr  
      PtIndicator::__get_actuals admr
   end
   
   def calculate admr
     return PtIndicator::get_avg_delay admr 
   end
   
   
  
end
