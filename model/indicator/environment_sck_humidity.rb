require_relative "../indicator.rb"
require_relative "../client.rb"
                               
class EnvironmentSckHumidity < Indicator
       
   def get_id
     return "environment.sck.humidity"
   end
   
   def get_name
      return "humidity"
   end
   
   def get_description
     return "average humidity in this region as measured by the crowd"
   end

   def get_range
     return [0,100]
   end

   def get_unit
     return "%"
   end
   
   def calculate admr
     $logger.debug "calculating key #{self.get_id}:#{admr}"
     
     #get data from source
     cdk_req = "/#{admr}/nodes?layer=sck" 
     results = Client.instance.get_all_records cdk_req
                   
     #retrieve the property we're interested in  
     humidities = self.m_hash_get_path results, [:layers,:sck,:data,:humidity]  
      
     #do calculations
     humidity = self.calculate_average humidities
     
     #dont cache the raw results if the lead to a nil value
     Client.instance.clear_cache_records cdk_req if humidity == nil

     return humidity
   end
  
end