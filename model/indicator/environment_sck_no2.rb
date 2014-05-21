#encoding: utf-8

require_relative "../indicator.rb"
require_relative "../client.rb"
                               
class EnvironmentSckNo2 < Indicator
       
   def get_id
     return "environment.sck.no2"
   end
   
   def get_name
      return "no2"
   end
   
   def get_description
     return "average no2 of in this region as measured by the crowd"
   end

   def get_range
     return [0,100]
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
     no2s = self.m_hash_get_path results, [:layers,:sck,:data,:no2]  
      
     #do calculations
     no2 = self.calculate_average no2s
     
     #dont cache the raw results if the lead to a nil value
     Client.instance.clear_cache_records cdk_req if no2 == nil

     return no2
   end
  
end