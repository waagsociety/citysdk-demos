# encoding: utf-8

require_relative "../indicator.rb"
require_relative "../client.rb"
                               
class EnvironmentCoNoise < Indicator
       
   def get_id
     return "environment.sck.co"
   end
   
   def get_name
      return "co"
   end
   
   def get_description
     return "average co of in this region as measured by the crowd"
   end

   def get_range
     return [0,1000]
   end

   def get_unit
     return "KΩ"
   end
   
   def calculate admr
     $logger.debug "calculating key #{self.get_id}:#{admr}"
     
     #get data from source
     cdk_req = "/#{admr}/nodes?layer=sck" 
     results = Client.instance.get_all_records cdk_req
                   
     #retrieve the property we're interested in  
     cos = self.m_hash_get_path results, [:layers,:sck,:data,:co]  
      
     #do calculations
     co = self.calculate_average cos
     
     #dont cache the raw results if the lead to a nil value
     Client.instance.clear_cache_records cdk_req if co == nil
     

     return co
   end
  
end