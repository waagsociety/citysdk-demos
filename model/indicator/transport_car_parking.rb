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
   
   
   
   def calculate admr
     $logger.debug "calculating key #{self.get_id}:#{admr}"
     
     #get data from source
     results = Client.instance.get_all_records "/#{admr}/nodes?layer=divv.parking.capacity"
                   
     #retrieve the property we're interested in  
     free_short = CdkUtils.m_hash_get_path results, [:layers,:"divv.parking.capacity",:data,:FreeSpaceShort]
     free_long = CdkUtils.m_hash_get_path results, [:layers,:"divv.parking.capacity",:data,:FreeSpaceLong]
     capicity_short = CdkUtils.m_hash_get_path results, [:layers,:"divv.parking.capacity",:data,:ShortCapacity]
     capicity_long = CdkUtils.m_hash_get_path results, [:layers,:"divv.parking.capacity",:data,:LongCapacity]
     
     f_s = CdkUtils.accumulate free_short
     f_l = CdkUtils.accumulate free_long
     c_s = CdkUtils.accumulate capicity_short
     c_l = CdkUtils.accumulate capicity_long
      
     #do calculations
     result = nil
     if (c_s.to_f + c_l.to_f) > 0
       result = (1 - (f_s.to_f + f_l.to_f) / (c_s.to_f + c_l.to_f)) * 100
     end
     
     return result
   end
  
end