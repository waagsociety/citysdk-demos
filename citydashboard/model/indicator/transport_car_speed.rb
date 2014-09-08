require_relative "../indicator.rb"
require_relative "../client.rb"
                               
class TrafficCarSpeed < Indicator
       
   def get_id
     return "transport.car.speed"
   end
   
   def get_name
       return "average speed"
   end
   
   def get_description
      return "average speed of cars in this region"
   end
   
   def get_range
      return [0,80]
   end

   def get_unit
      return "km/h"
   end
   
   def calculate admr
     $logger.debug "calculating key #{self.get_id}:#{admr}"
     
     #get data from source
     results = Client.instance.get_all_records "/#{admr}/routes?layer=divv.traffic"
                   
     #retrieve the property we're interested in  
     speeds = CdkUtils.m_hash_get_path results, [:layers,:"divv.traffic",:data,:velocity]
      
     #do calculations
     speed = CdkUtils.calculate_average speeds, [-1] #skip the -1 values in the array
     
     return speed
   end
  
end