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
     results = Client.instance.get_all_records "/#{admr}/nodes?layer=sck"
                   
     #retrieve the property we're interested in  
     temperatures = self.m_hash_get_path results, [:layers,:sck,:data,:temperature]  
      
     #do calculations
     temperature = self.calculate_average temperatures

     return temperature
   end
  
end