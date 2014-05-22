require 'citysdk' 
require 'redis'

class CitySDK::API
   #attr_accessor :connection  

   def get_raw path
     resp = @connection.get(path)
     return resp.body if resp.status == 200
     error = CitySDK::parseJson(resp.body)[:message]
     raise HostException.new(error) 
   end

end

                     
$redis = Redis.new 
$api = CitySDK::API.new('api.citysdk.waag.org') 

result = $api.get_raw("/nodes?")
puts result     


   
            


def pp obj
  puts obj.inspect
end

def get_all_records req
  
  if $redis.exists req    
    puts "return cached version"
    cache = $redis.get(req)
    return JSON.parse(cache,{:symbolize_names => true}) 
  end
  
  per_page = 100
  page = 1   
  all = Array.new  
  cache_ttl = 300
              
  loop do
    subreq = "#{req}&per_page=#{per_page}&page=#{page}"
    result  = $api.get(subreq)
    all.concat(result[:results]) 
    puts "num sub results : #{result[:results].length}"  
    if result[:results].length.to_i != per_page
       break
    end
    page = page + 1    
  end 
          
  if all.length 
    puts "write to redis"
    $redis.set(req,JSON.generate(all),{:ex => cache_ttl})
  end
  
  puts "total results = #{all.length}"  
  
  return all


end 

#descend into an hash with the specified path                               
def hash_get_path hash, path
  
  def descend record, path
    symbol = path.shift
    obj = record[symbol]
    raise 'non existing key in hash' if obj == nil

    if path.length > 0
      obj = descend obj, path                                      
    end
    return obj
  end
  
  value = nil
  begin
    value = descend hash, path.dup
  rescue Exception => e
    puts e.message
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

def get_current_time_grain
   timestamp_granulariy = 300
   q_time = Time.now.to_i 
   q_time = q_time - q_time % timestamp_granulariy
   return q_time
end

#check for cached version with exactly this stamp
def get_indicator_cache admr, kci, time
  #redis key for storing
  key = "#{admr}:#{kci}"
  cache = $redis.zrangebyscore(key, time, time);
  if cache[0]
    cached_indicator = JSON.parse(cache[0],{:symbolize_names => true})
    puts "**** retrieved from cache #{admr} #{kci} => #{cached_indicator[kci.to_sym]}"
    return cached_indicator
  end  
  return nil  
end  

def store_indicator admr, kci, value, time
  key = "#{admr}:#{kci}"
  indicator = { "timestamp" => time, kci => value}

  #store in redis
  $redis.zadd(key, time, JSON.generate(indicator))
  return indicator  
end  

def calulate_speed admr
  #get data source
  results = get_all_records "/#{admr}/routes?layer=divv.traffic"  

  #retrieve the property we're interested in  
  speeds = m_hash_get_path results, [:layers,:"divv.traffic",:data,:velocity]
  
  #do calculations
  speed = calculate_average speeds, [-1] #skip the -1 values in the array
  
  return speed

end
  
#  
# retrieve list from cache ZRANGE "admr.nl.amsterdam:transport.car.speed" 0 -1  
def get_speed admr
                                      
  #make get value generic with specific calculate function per indicator
  time = get_current_time_grain
  kci = "transport.car.speed"
    
  res = get_indicator_cache admr, kci, time
  if res
     return res
  end
  
  return calulate_speed admr

end  

def get_sck admr
  
  #get data source
  results = get_all_records "/#{admr}/nodes?layer=sck"                       
  
  #retrieve the property we're interested in  
  temperatures = m_hash_get_path results, [:layers,:"sck",:data,:temperature]
  noises = m_hash_get_path results, [:layers,:"sck",:data,:noise]
  
  #do calculations
  temperature = calculate_average temperatures
  noise = calculate_average noises
  
  puts "temperature #{temperature}"
  puts "noise #{noise}"
end  

  
start_time = Time.now.to_f

get_speed "admr.nl.amsterdam_stadsdeel_oost_oostelijk_havengebied"   #amsterdam_stadsdeel_oost_oostelijk_havengebied
get_sck "admr.nl.amsterdam"   

#puts "time = #{Time.now.to_f - start_time}"






#results = get_all_records "/routes?layer=divv.traffic"  #amsterdam_stadsdeel_oost_oostelijk_havengebied




