require_relative "../indicator.rb"
require_relative "../client.rb"
                               
class EnvironmentSckLight < Indicator
       
   def get_id
     return "environment.sck.light"
   end
   
   def get_name
     return "light"
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
     $logger.debug "calculating key #{self.get_id}:#{admr}"
     
     #get data from source
     cdk_req = "/#{admr}/nodes?layer=sck" 
     results = Client.instance.get_all_records cdk_req
                   
     #retrieve the property we're interested in  
     lights = self.m_hash_get_path results, [:layers,:sck,:data,:light]  
      
     #do calculations
     light = self.calculate_average lights
     
     #dont cache the raw results if the lead to a nil value
     Client.instance.clear_cache_records cdk_req if light == nil

     return light
   end
  
end