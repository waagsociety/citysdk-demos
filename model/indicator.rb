# encoding: utf-8

require "singleton"
require "citysdk"
require "logger" 
require_relative "cache.rb"    
                             
class Class
  def subclasses
    ObjectSpace.each_object(Class).select { |klass| klass < self }
  end
end

class Indicator
   include Singleton
   
   def initialize
   end
   
   def self.list
     list = Array.new
     Indicator.subclasses.each do |indicator|
       id = indicator.instance.get_id
       list.push(id)
     end           
     return JSON.generate(list)
   end  
   
   def self.dashboard
      
      dashboard = Hash.new
      
      Indicator.subclasses.each do |indicator|
         id = indicator.instance.get_id
         parts = id.split(".")
         if parts.length != 3
            raise "invalid indicator id"
         end
         
         domain = parts[0]
         subdomain = parts[1]
         indicator_name = parts[2]
                  
         if dashboard[domain] == nil
            dashboard[domain] = Hash.new
         end                            
         
         if dashboard[domain][subdomain] == nil
            dashboard[domain][subdomain] = Hash.new
         end
         
         dashboard[domain][subdomain][indicator_name] = indicator.instance.get_info
      end
      
      return JSON.generate(dashboard)
   end
       
   def get_id
     raise "not implemented"
   end
   
   def get_name
     return "not implemented"
   end
   
   def get_description
     return "not implemented"
   end

   def get_range
     return "not implemented"
   end
   
   def get_type
     return "number"
   end

   def get_unit
     return "not implemented"
   end
   
   def get_cache_time
     return 60
   end

   def calculate
     raise "not implemented"
   end 
   
   #descend into an hash with the specified path                               
   def hash_get_path hash, path

     def descend record, path
        symbol = path.shift
        obj = record[symbol] 
        #raise "non existing key #{symbol.to_s} in hash #{record} " if obj == nil
        $logger.error("non existing key #{symbol.to_s} in hash #{record} ") if obj == nil

        if path.length > 0
          obj = descend obj, path                                      
        end
        return obj
     end

     value = nil
     begin
       value = descend hash, path.dup
     rescue Exception => e
       $logger.error e.message
     end
     return value  
   end

   #retrieve an array of objects by descending into each hash in the array with the specified
   def m_hash_get_path records, path
     values = Array.new

     records.each do |record|
       deep_value = hash_get_path record, path
       values.push(deep_value)
     end

     return values     
   end
   
   def create_record admr, value, time
     key = self.get_key admr
     record = { "timestamp" => time, key => value}
     return record
   end
                         
   def get_key admr
     return "#{self.get_id}:#{admr}"
   end
                                                
   #methods are live and history
   def get_cache_key admr, method
     cache_key = "#{self.get_key admr}:#{method}"
     return cache_key
   end
   
   def get_time_stamp admr
     Time.new.to_i 
   end
           
   #return json string 
   #cache is only kept for 1 minute 
   def get_value admr
      time = self.get_time_stamp admr 
      cache_key = self.get_cache_key admr, "live"      
      
      #try to get indicator in current time grain from cache 
      cache = Cache.instance.redis.get(cache_key);
      return cache if cache
                                                  
      #not in cache -> calculate
      value = nil
      begin
        value = self.calculate admr
        $logger.debug("calculated new result for #{self.get_key admr} : #{value}")
      rescue Exception => e
        $logger.error("caught exception #{e.message} \n #{e.backtrace}")
      end 
                       
      #create record and store the value in cache for one minute
      result = self.create_record admr, value, time.to_i 
      json = JSON.generate(result)
      
      #store
      if value
        Cache.instance.redis.set(cache_key, json, {:ex => self.get_cache_time}) #1 minute cache      
      end  
      
      return json
   end
   
   #calculate the average for value in array 
   #return null when unable to calculate (no records or no relevant info in records)
   #ignore "skip" values and null by default
   def calculate_average array, skip = []
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
   
   #should be called at interval to cache requests for calculate
   def prepare admr
     
   end
                 
   #should be called at beginning of every hour, should prevent over population by checking current history
   def add_history admr         
     
     #get the current value
     record = self.get_value admr                                     
                          
     #we are called approximately at the begin of each our, but in case we we're called a little to late or to early, round it to the hour
     time = self.get_time_stamp admr
     closest_hour = time + 1800 - (time + 1800) % 3600     
     
     #check if we have already a record for this time frame 
     cache_key = self.get_cache_key admr, "history"
     cache = Cache.instance.redis.zrangebyscore(cache_key, closest_hour, closest_hour);
     if cache[0]
        $logger.debug("history #{cache_key} at #{closest_hour} already in cache")
        return 
     end     
     
     #get value from existing record
     obj = JSON.parse(record,{:symbolize_names => true})
     key = self.get_key admr
     value = obj[key.to_sym] 
     if value == nil
       $logger.warn("not going put record with nil value in history")
       return
     end
     
     #create new record with quantized time
     history_record = self.create_record admr, value, closest_hour
     
     #cache the record 
     Cache.instance.redis.zadd(cache_key, closest_hour, JSON.generate(history_record)) 
   end 
   
   def query_history_week admr
     cache_key = self.get_cache_key admr, "history"
     
     t = Time.new 
     s = t.to_i - (t.hour * 3600) - (t.min * 60) - t.sec #beginning of today
     d = s - (3600 * 24 * 6)
               
     week = Array.new
     
     7.times do
      up = d + (3600 * 24) - 1 
      cache = Cache.instance.redis.zrangebyscore(cache_key, d, up) 

      #calculate average of one day
      total = 0
      cnt = 0       
      key = (self.get_key admr).to_sym
      cache.each do |record|
        obj = JSON.parse(record,{:symbolize_names => true})
        stamp = obj[:timestamp]
        value = obj[key] 
        if value != nil
          if value.is_a? Numeric
            total += value
            cnt += 1
          end
        end              
      end           
      avg = nil
      if cnt > 0
        avg = total / cnt
      end
       
      #create a record
      record = create_record admr, avg, d
      week.push record                                           
      
      d += (3600 * 24)
     end             
         
     return JSON.generate week
     
   end
   
   #get history records 
   def query_history admr                           
     cache_key = self.get_cache_key admr, "history"
     
     #go back one day
     time = Time.new.to_i 
     last_hour = time - (time % 3600)
     yesterday = last_hour - (3600 * 24)

     #make initial history with 24 times nil   
     history = Hash.new
     stamp = yesterday
     24.times do
       history[stamp] = self.create_record admr, nil, stamp 
       stamp += 3600
     end 

     #get individual records within time range of one day                                                                       
     cache = Cache.instance.redis.zrangebyscore(cache_key, yesterday, last_hour) 
     
     #replace nil values for hours that have a value                                                        
     cache.each do |record|      
       obj = JSON.parse(record,{:symbolize_names => true})
       stamp = obj[:timestamp]
       if history.has_key? stamp 
         history[stamp] = obj 
       end
     end 
     $logger.debug "return history of #{history.values.length} records"

     #store this history query for on hour     
     json = JSON.generate(history.values) 
     return json
   end
   
   #return indicator info
   def get_info
     record = { "kci" => self.get_id,
                "name" => self.get_name,
                "description" => self.get_description,
                "range" => self.get_range,
                "type" => self.get_type,
                "unit" => self.get_unit
              } 
     return record                 
   end  
  
end            


# def get_history admr
#      #try to get indicator in current time grain from cache 
#      cache_key = self.get_cache_key admr, "history:last"
#      cache = Cache.instance.redis.get(cache_key)
#      return cache if cache
#      
#      json = self.query_history admr
#      cache_time = 3600 - Time.new.to_i % 3600
#                                                  
#      #cache till next hour
#      Cache.instance.redis.set(cache_key, json, {:ex => cache_time})
#      
#      return json
#    end