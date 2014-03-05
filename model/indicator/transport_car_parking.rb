require_relative "../indicator.rb"
require_relative "../client.rb"
                               
class TrafficCarParking < Indicator
       
   def get_id
     return "transport.car.parking"
   end
   
   def get_name
       return "parking pressure"
   end 
   
   def get_cache_time
       return 1
   end
   
   def get_description
      return "amount of parking capacity occupied"
   end
   
   def get_range
      return [0,100]
   end

   def get_unit
      return "%"
   end 
   
   def accumulate numbers
     total = 0
     numbers.each do |n|
       total += (n.to_i > 0 ? n.to_i : 0)
     end              
     return total     
   end
   
   def calculate admr
     $logger.debug "calculating key #{self.get_id}:#{admr}"
     
     #get data from source
     results = Client.instance.get_all_records "/#{admr}/nodes?layer=divv.parking.capacity"
                   
     #retrieve the property we're interested in  
     free_short = self.m_hash_get_path results, [:layers,:"divv.parking.capacity",:data,:FreeSpaceShort]
     free_long = self.m_hash_get_path results, [:layers,:"divv.parking.capacity",:data,:FreeSpaceLong]
     capicity_short = self.m_hash_get_path results, [:layers,:"divv.parking.capacity",:data,:ShortCapacity]
     capicity_long = self.m_hash_get_path results, [:layers,:"divv.parking.capacity",:data,:LongCapacity]
     
     f_s = self.accumulate free_short
     f_l = self.accumulate free_long
     c_s = self.accumulate capicity_short
     c_l = self.accumulate capicity_long
      
     
     #puts "free_s #{free_short}"
     #puts "caps #{capicity_short}" 
      
     #do calculations
     
     return (1 - (f_s.to_f + f_l.to_f) / (c_s.to_f + c_l.to_f)) * 100
   end
  
end