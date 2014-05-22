require 'citysdk' 
require 'redis'
require 'scanf'
require 'time'  
require 'logger'
require_relative 'model/client' 
    
$logger = Logger.new(STDOUT)                 
$redis = Redis.new({ :db => 0, :timeout => 300})     



   
#all lines
line_delays = Hash.new

  
recs =  Client.instance.get_all_records "/admr.nl.amsterdam/ptstops?layer=gtfs"
       

begin
  t = Time.new
  time = t.hour * 3600 + t.min * 60 + t.sec   
  time -= 10000
  b = time - 600
  e = time + 600
              
  i = 0
  stops_accounted = 0
  stops_active = 0
  active_lines = Hash.new
  active_trips = Hash.new

  recs.each_with_index do |line, line_index|
    cdk_id = line[:cdk_id]
    
    if ($redis.zcard cdk_id).to_i == 0  #only take in account the ones we have info on
       next
    end
    
    stops_accounted += 1 
    res = $redis.zrangebyscore(cdk_id, b, e)
    if res.length == 0
       next
    end   

    res.each do |info|
       gtfs = eval info 
       trip = gtfs[0] 
       op,nr = trip.split("|") #split tripnr
       active_lines["#{op}#{nr}"] = true
       active_trips[trip] = true
    end
    
    stops_active += 1
  end     
  
  puts "#{stops_active} of #{stops_accounted} stops active"
  puts "lines active #{active_lines.keys.length}"
  puts "trips active #{active_trips.keys.length}"
  

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




