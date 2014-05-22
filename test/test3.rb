require 'citysdk' 
require 'redis'
require 'scanf'
require 'time'
                     
$redis = Redis.new 

begin
  $api = CitySDK::API.new('api.citysdk.waag.org')    
rescue Exception => e
   puts "e #{e}"
end     

def pp obj
  puts obj.inspect
end

def get_all_records req
  per_page = 1000
  page = 1   
  all = Array.new  
  cache_ttl = 300
              
  loop do
    subreq = "#{req}&per_page=#{per_page}&page=#{page}"
    result  = $api.get subreq
    all.concat(result[:results]) 
    puts "num sub results : #{result[:results].length}"  
    if result[:results].length.to_i != per_page
       break
    end
    page = page + 1    
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
 


                         
#
#
# all routes and all stop
#
#


def time_to_i time
  #t_h, t_m, t_s = time.scanf("%d:%d:%d") incredibly slow
  #t_h, t_m, t_s = time.split(":")
  t_h = time.slice(0,2)
  t_m = time.slice(3,2)
  t_s = time.slice(6,2)  
  return t_h.to_i * 3600 + t_m.to_i * 60 + t_s.to_i
end

# time diff in seconds for time without date
# smallest absolute diff is returned, diff is signed      
def time_diff a_t, b_t
  
  half_day = 12 * 3600
  full_day = 24 * 3600
  
  #theoritically this pt could be more then 12 hours to early, but we assume this is not the case 
  diff = b_t - a_t
  if diff < (-half_day) 
    diff = diff + full_day
  end                          
  if diff > half_day
    diff = diff - full_day
  end
  
  return diff
end  

#gtfs.stop.050221/select/now
recs = get_all_records "/admr.nl.amsterdam/nodes?layer=artsholland"
   
recs.each do |venue|
  cdk_id = venue[:cdk_id]
  now = Time.new.to_i
  events = venue[:layers][:artsholland][:data][:events] 
  events.each do |event|
     time = event[:time]
     t = Time.iso8601(time).to_i
     if (t >= now) && (t < now + 3600) 
        puts "event #{event[:title]}" 
     end
  end
end 

#gtfs.stop.010882:avg_delay
#gtfs.stop.010882:cnt_delay
#gtfs.stop.010882:avg_delay

#gtfs.stop.010882:lines delay line


# gtfs.stop.010882 = { gtfs.line.gvb.15-1 => { total => 123 , cnt => 10 }, gtfs.line.gvb.15-1 => { total => 10 , cnt => 1 }}
#
# gtfs.stop.010882 redis zrange delay 
#
   
#all lines
line_delays = Hash.new

#all stops
stop_delays = Hash.new
  
recs =  get_all_records "/admr.nl.amsterdam/ptlines?"

begin

  recs.each_with_index do |line, line_index|
    cdk_id = line[:cdk_id]
    puts "#{cdk_id}"                
    response = $api.get "/#{cdk_id}/select/schedule"
    
    t1 = Time.new.to_f
  
    response[:results].each do |l| 
    
      trips = l[:trips]
      #all stops on all lines
      all_line_stops = 0
      all_line_stops_delays = 0
    
      #add this line
      if line_delays[cdk_id] == nil
         line_delays[cdk_id] = Hash.new
         line_delays[cdk_id]["cnt"] = 0
         line_delays[cdk_id]["total"] = 0
      end
              
      now = Time.new                         
      n_t = now.hour * 3600 + now.min * 60 + now.sec
   
      trips.each_with_index do |trip,i|
        trip.each_with_index do |stop,j| #delays for pt + and - 5 minutes from now
           stop_id = stop[0]
           time = stop[1]
           detail = time.split " "
           delay = 0   
           
         
           #add stop if there's no record yet
           if stop_delays[stop_id] == nil
              stop_delays[stop_id] = Hash.new
              stop_delays[stop_id]["cnt"] = 0
              stop_delays[stop_id]["total"] = 0
           end
                        
           #get scheduled time and now time
           sched_time = detail[0] 
           
           s_t = time_to_i sched_time
           
           #calculate diff in seconds between now and the scheduled time
           diff_n = time_diff n_t, s_t          
           
         
           #only include trains that are scheduled to run now within 5min ofset
           #if (diff_n > (-300)) && (diff_n < 300)
             all_line_stops += 1 
             stop_delays[stop_id]["cnt"] += 1
             line_delays[cdk_id]["cnt"] += 1
             line_delays[cdk_id]["running"] = true
           
             #there is difference with the scheduled time 
             if detail.length == 2
               delay_time = /\((.*)\)/.match(detail[1])
               d_t = time_to_i delay_time[1]
               diff_s = time_diff s_t, d_t   
               
               #add delay to per line and per stop count
               stop_delays[stop_id]["total"] += diff_s 
               line_delays[cdk_id]["total"] += diff_s
               all_line_stops_delays += diff_s
               puts "trip nr #{i} #{time} at #{stop} delay with schedule #{diff_s}, time from now #{diff_n}" 
             end
           #end
        end 
      end
                              
      #percantage of trips delayed
      #lines running
      puts "line #{cdk_id} (#{line_index+1} of #{recs.length}) avg delay #{all_line_stops_delays.to_f / all_line_stops.to_f}" if all_line_stops > 0
      puts "proc time #{Time.new.to_f - t1}"

    end 

  end
  
  

rescue Exception => e
  puts "error processing line : #{e.message}"
end   

# keys       
# gtfs.stop.074902:geom
# transport.pt.delay:gtfs.stop.074902
# transport.pt.delay:gtfs.line.gvb.63-1





# puts "all lines #{line_delays.inspect}"
# 
# stop_delays.each do |key,val| 
#   if val["cnt"] > 0
#      puts "#{key} #{val.inspect}"
#   end     
# end
 

#puts "recs #{JSON.generate(recs)}"


#puts "time = #{Time.now.to_f - start_time}"






#results = get_all_records "/routes?layer=divv.traffic"  #amsterdam_stadsdeel_oost_oostelijk_havengebied




