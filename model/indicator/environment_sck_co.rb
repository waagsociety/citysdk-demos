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
     results = Client.instance.get_all_records "/#{admr}/nodes?layer=sck"
                   
     #retrieve the property we're interested in  
     cos = self.m_hash_get_path results, [:layers,:sck,:data,:co]  
      
     #do calculations
     co = self.calculate_average cos

     return co
   end
  
end