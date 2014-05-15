require_relative "../indicator.rb"
require_relative "../client.rb"
                               
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
     $logger.debug "calculating key #{self.get_id}:#{admr}"
     
     #get data from source
     cdk_req = "/#{admr}/nodes?layer=sck" 
     results = Client.instance.get_all_records cdk_req
                   
     #retrieve the property we're interested in  
     temperatures = self.m_hash_get_path results, [:layers,:sck,:data,:temperature]  
      
     #do calculations
     temperature = self.calculate_average temperatures
     
     #dont cache the raw results if the lead to a nil value
     Client.instance.clear_cache_records cdk_req if temperature == nil

     return temperature
   end
  
end