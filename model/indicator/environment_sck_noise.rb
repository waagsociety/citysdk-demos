require_relative "../indicator.rb"
require_relative "../client.rb"
                               
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
     results = Client.instance.get_all_records "/#{admr}/nodes?layer=sck"
                 
     #retrieve the property we're interested in  
     noises = self.m_hash_get_path results, [:layers,:sck,:data,:noise]  
      
     #puts "noises #{noises}"    
      
     #do calculations
     noise = self.calculate_average noises

     return noise
   end
  
end