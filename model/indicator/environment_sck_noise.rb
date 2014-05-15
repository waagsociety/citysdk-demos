require_relative "../indicator.rb"
require_relative "../client.rb"                 
require 'logger'
                               
class EnvironmentSckNoise < Indicator
       
   def get_id
     return "environment.sck.noise"
   end
   
   def get_name
      return "noise"
   end
   
   def get_description
     return "average noise of in this region as measured by the crowd"
   end

   def get_range
     return [0,140]
   end

   def get_unit
     return "DB"
   end
   
   def calculate admr
     $logger.debug "calculating key #{self.get_id}:#{admr}"
     
     #get data from source
     cdk_req = "/#{admr}/nodes?layer=sck" 
     results = Client.instance.get_all_records cdk_req
                 
     #retrieve the property we're interested in  
     noises = self.m_hash_get_path results, [:layers,:sck,:data,:noise]  
      
     #$logger.info "noises #{noises}"    
      
     #do calculations
     noise = self.calculate_average noises
     
     #dont cache the raw results if the lead to a nil value
     Client.instance.clear_cache_records cdk_req if noise == nil

     return noise
   end
  
end