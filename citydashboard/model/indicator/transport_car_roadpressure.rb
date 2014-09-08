require_relative "../indicator.rb"
require_relative "../client.rb"
require 'logger'
               
class TrafficCarPressure < Indicator
       
   def get_id
     return "transport.car.pressure"
   end
   
   def get_name
      return "road pressure"
   end
   
   def get_description
      return "average road pressure of cars in this region"
   end
   
   def get_range
      return [0,100]
   end

   def get_unit
      return "%"
   end
   
   def get_cache_time
      return 60
   end
   
   def calculate admr
     $logger.debug "calculating key #{self.get_id}:#{admr}"
     
     #get data from source
     results = Client.instance.get_all_records "/#{admr}/routes?layer=divv.traffic"
                   
     #retrieve the property we're interested in  
     sensors = CdkUtils.m_hash_get_path results, [:layers,:"divv.traffic",:data]
      
     #calc pressure for each sensor as 1 - speed / max_speed
     pressures = Array.new 
     sensors.each do |sensor|
       #$logger.info "sensor #{sensor.inspect}" 
       travel_time = sensor[:traveltime_freeflow]
       velocity = sensor[:velocity]
       if travel_time > 0 && velocity > 0
         max_speed = (sensor[:length]/1000.to_f) / (travel_time/3600.to_f)
         rel_speed = velocity / max_speed
         pressure = 1 - (rel_speed > 1 ? 1 : rel_speed)
         pressures.push pressure 
       end  
     end
                                
     #do calculations
     pressure = CdkUtils.calculate_average pressures
                          
     #return percentage
     return (pressure ? pressure * 100 : nil)
   end
   
  
end