#encoding: utf-8

module CdkUtils  
  
   def self.distance a, b
     rad_per_deg = Math::PI/180  # PI / 180
     rkm = 6371                  # Earth radius in kilometers
     rm = rkm * 1000             # Radius in meters

     dlon_rad = (b[0]-a[0]) * rad_per_deg  # Delta, converted to rad
     dlat_rad = (b[1]-a[1]) * rad_per_deg

     lon1_rad, lat1_rad  = a.map! {|i| i * rad_per_deg }
     lon2_rad, lat2_rad  = b.map! {|i| i * rad_per_deg }

     a = Math.sin(dlat_rad/2)**2 + Math.cos(lat1_rad) * Math.cos(lat2_rad) * Math.sin(dlon_rad/2)**2
     c = 2 * Math.asin(Math.sqrt(a))

     rm * c # Delta in meters
   end
   
   def self.get_geom_center geom
              
     max_lat = nil
     max_lon = nil
     min_lat = nil
     min_lon = nil   
     
     coordinates = geom[:coordinates].flatten
     coordinates.each_with_index do |lat_or_long, i|  
       if (i%2) == 0 #lon
         if min_lon == nil || lat_or_long < min_lon
              min_lon = lat_or_long
         end
         if max_lon == nil || lat_or_long > max_lon
            max_lon = lat_or_long
         end
       else
         if min_lat == nil || lat_or_long < min_lat
           min_lat = lat_or_long
         end
         if max_lat == nil || lat_or_long > max_lat
           max_lat = lat_or_long
         end
       end
     end          
     
     center_lat =  (max_lat + min_lat) / 2
     center_lon =  (max_lon + min_lon) / 2
     
     range = self.distance [center_lon,center_lat], [min_lon,min_lat]
     return center_lon, center_lat, range                                                                            
   end
   
   #descend into an hash with the specified path                               
   def self.hash_get_path hash, path

     def self._descend record, path
       symbol = path.shift
       obj = record[symbol] 
       #raise "non existing key #{symbol.to_s} in hash #{record} " if obj == nil
       $logger.warn("non existing key #{symbol.to_s} in hash #{record} ") if obj == nil

       if path.length > 0
         obj = self._descend obj, path                                      
       end
       return obj
     end

     value = nil
     begin
       value = self._descend hash, path.dup
     rescue Exception => e
       $logger.error e.message
     end
     return value  
   end

   #retrieve an array of objects by descending into each hash in the array with the specified
   def self.m_hash_get_path records, path
     values = Array.new

     records.each do |record|
       deep_value = hash_get_path record, path
       values.push(deep_value)
     end

     return values     
   end
   
   #calculate the average for value in array 
   #return null when unable to calculate (no records or no relevant info in records)
   #ignore "skip" values and null by default
   def self.calculate_average array, skip = []
     acc = 0
     num = 0

     array.each do |value|
       if value != nil
         v = value.to_f
         if !(skip.include? v)
           acc = acc + v
           num = num + 1
         end 
       end    
     end          

     avg = acc/num rescue nil                                     
     return avg 
   end
   
   def self.accumulate numbers
     total = 0
     numbers.each do |n|
       total += (n.to_i > 0 ? n.to_i : 0)
     end              
     return total     
   end                  

  
  
end