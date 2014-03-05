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
   
  
  
end