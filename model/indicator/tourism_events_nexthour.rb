#encoding: utf-8

require_relative "../cache.rb" 
require "logger"
                               
class TourismEventsNexthour < Indicator
       
   def get_id
     return "tourism.events.nexthour"
   end
   
   def get_name
     return "events"
   end      
   
   def get_description
      return "number of events starting within an hour"
   end
   
   def get_cache_time
     return 900
   end 
   
   def get_unit
     return "events"
   end
   
   def get_type
     return "array"
   end
   
   def prepare admr  

   end
   
   def calculate admr
                          
      recs = Client.instance.get_all_records "/admr.nl.amsterdam/nodes?layer=artsholland"
      
      count = 0  
      result = Array.new
                    
      recs.each do |venue|
        begin
          cdk_id = venue[:cdk_id]
          now = Time.new.to_i
          events = venue[:layers][:artsholland][:data][:events] 
          events.each do |event|
             time = event[:time]
             t = Time.iso8601(time).to_i
             if (t >= now) && (t < now + 3600) 
                count += 1 
                sub = Hash.new
                sub["timestamp"] = t
                sub["description"] = "#{event[:title]} (#{venue[:name]})"
                result.push sub
             end
          end 
        rescue Exception => e
          $logger.error "TourismEventsNexthour #{e.message}"
        end
      end               
      
      return result
   end
   
   
   
  
end