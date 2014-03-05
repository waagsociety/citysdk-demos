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
     results = Client.instance.get_all_records "/#{admr}/nodes?layer=sck"
                   
     #retrieve the property we're interested in  
     lights = self.m_hash_get_path results, [:layers,:sck,:data,:light]  
      
     #do calculations
     light = self.calculate_average lights

     return light
   end
  
end