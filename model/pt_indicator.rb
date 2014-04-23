require_relative "indicator.rb"
require_relative "client.rb"
require_relative "cache.rb"
require "faraday"
require "json"
require "csv"          
require "redis"  
require "tmpdir"
                               
module PtIndicator 
  
    def self.init
      @@redis = Redis.new({ :db => 1, :timeout => 300})
    end
   
    # time (no date) string to seconds
    def self.time_to_i time
      t_h = time.slice(0,2)
      t_m = time.slice(3,2)
      t_s = time.slice(6,2)  
      return t_h.to_i * 3600 + t_m.to_i * 60 + t_s.to_i
    end

    # time diff in seconds for time (without date)
    # smallest absolute diff is returned, diff is signed      
    def self.time_diff a_t, b_t

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
    
           
    
    def self.get_cache_key admr, param
      return "PtIndicator:#{admr}:#{param}"    
    end
    
    def self.__get_actuals admr
                              
      return if Cache.instance.locked? "__get_actuals", admr, 1800 #not more often then every 30 mins
      
      $logger.info "***** get actuals"
      
      #this should already be cached daily                               
      recs =  Client.instance.get_all_records "/#{admr}/ptlines?"
                                     
      open_ov_lines = Array.new
      recs.each_with_index do |line, line_index|
        begin
          cdk_id = line[:cdk_id]
          op = (cdk_id.split("."))[2]
          linename = (cdk_id.split("."))[3] 
          linenr, dir = linename.split("-")
          ovid = "#{op.upcase()}_#{linenr}"
          ovid = "#{ovid}_#{dir}" if dir
          open_ov_lines.push ovid
        rescue Exception => e          
          $logger.info "self.__process_lines #{e.message}"
          $logger.error "self.__process_lines #{e.message}"
        end
      end                                                
      
      __open_ov_request_actuals open_ov_lines, admr      
    end
                                                          
    #admr is only needed for the cache keys
    def self.__open_ov_request_actuals open_ov_lines, admr
      
      page_size = 50
      offset = 0
      lines = 0
      stops = 0 
      stops_delayed = 0
      avg_delay = 0.0
      lines_delayed = Hash.new
      line_names = Array.new
      Cache.instance.redis.del self.get_cache_key(admr, "delayed_stops")
      
      loop do   
        sub = open_ov_lines.slice(offset,page_size)
        break if sub == nil 
        break if sub.length == 0
        begin #get line info from open ov API
          req = "http://v0.ovapi.nl/line/#{sub.join(",")}"
          response = Faraday.get "http://v0.ovapi.nl/line/#{sub.join(",")}", {"User-Agent" => "CityDashBoard"}
          result = JSON.parse(response.body)
          
          $logger.info "sub with offset #{offset}"
          result.each do |line_name,sched|
             line_names.push name                           
             lines += 1
             actuals = sched["Actuals"]
             actuals.each do |stop,info|  
               stops += 1
               target = info["TargetDepartureTime"]
               expected =  info["ExpectedDepartureTime"]
               if target != expected
                 t = Time.parse(target) 
                 e = Time.parse(expected)
                 diff = e.to_i - t.to_i  
                 if diff > 0
                   stops_delayed += 1 
                   avg_delay += diff.to_f              
                   stop_id = info["UserStopCode"]
                   cdk_stop_id = "gtfs.stop.#{stop_id}"
                   Cache.instance.redis.zadd self.get_cache_key(admr, "delayed_stops"), diff, {"delay" => diff, "cdk_id" => cdk_stop_id}.to_s 
                 end 
               end      
             end                                                     
          end

        rescue Exception => e
          $logger.error "#{e.message}"
        end
        offset += page_size
      end  #loop
      $logger.info "#{stops} stops, #{stops_delayed} stops delayed, #{lines} lines"
      $logger.info "ontime #{(1 - (stops_delayed.to_f / stops.to_f)) * 100} %" 
      $logger.info "avg_delay #{avg_delay / stops_delayed.to_f} %" 
      
      Cache.instance.redis.set self.get_cache_key(admr, "on_time_percentage"), ((1 - (stops_delayed.to_f / stops.to_f)) * 100).to_s
      Cache.instance.redis.set self.get_cache_key(admr, "avg_delay"), (avg_delay / stops.to_f).to_s

    end
    
    #make sure cache gets cleared!!  
    def self.__get_schedules admr
      recs = Client.instance.get_all_records "/#{admr}/ptlines?", 500, (3600 * 24), :cache_mode_none
       
      #cache all schedules for 1 hour but we hope to update them every 5 minutes
      recs.each_with_index do |line, line_index|
        cdk_id = line[:cdk_id]
        begin
          $logger.debug "#{line_index+1}/#{recs.length}"
          response = Client.instance.cached_request "/#{cdk_id}/select/schedule", (3600 * 24), :cache_mode_none   
        rescue Exception => e
          $logger.error "Caught exception in #{PtIndicator}.prepare : #{e.message}"
        end
      end 
    end
    
    #http://127.0.0.1:4567/transport.pt.delay/admr.nl.amsterdam_stadsdeel_oost_ijburg_zuid/live
    #do this daily
    def self.__get_scheduled_now admr
      
       return if Cache.instance.locked? "__get_scheduled_now", admr, 300 #not more often then every 5 mins
       
       $logger.info "**** __get_scheduled_now"
                                 
       trips_scheduled_now = Hash.new
       lines_scheduled_now = Hash.new
       stops_scheduled_now = Hash.new

       #this should all be cached daily                               
       recs =  Client.instance.get_all_records "/#{admr}/ptlines?"
                                     
       now = Time.new                         
       n_t = now.hour * 3600 + now.min * 60 + now.sec 
       #n_t = 0 #midnight offset
       
       #these should all be cached daily
       recs.each_with_index do |line, line_index|
         begin
           cdk_id = line[:cdk_id]                                                       
           #force getting cached version
           cache = Client.instance.cached_request "/#{cdk_id}/select/schedule", 0, :cache_mode_force
           if cache == nil  
              $logger.debug "skipped #{cdk_id}"
              $logger.info "skipped"
              next
           end
           
           response_obj = JSON.parse(cache,{:symbolize_names => true})
                
           response_obj[:results].each do |l| 

             #all trips on this line
             trips = l[:trips]
             
             #all trips of this line
             trips.each_with_index do |trip,i|
               trip_key = "#{cdk_id}-#{i}"
               trip.each_with_index do |stop,j| #delays for pt + and - 5 minutes from now
                  stop_id = stop[0]
                  time = stop[1]
                  sched_time, exp_time = time.split " "
                  
                  s_t = self.time_to_i sched_time

                  #running : only if pt are scheduled to run now within 5min ofset
                  #calculate diff in seconds between now and the scheduled time
                  diff_n = self.time_diff n_t, s_t 
                  if (diff_n > (-900)) && (diff_n < 900)
                    trips_scheduled_now[trip_key] = true
                    lines_scheduled_now[cdk_id] = true
                    stops_scheduled_now[stop_id] = true
                  end
               end 
             end
           end #[:results].each
           $logger.debug "processed #{cdk_id}"
         rescue Exception => e
           $logger.error "Caught exception in #{PtIndicator}.calculate #{line} : #{e.message} \n #{e.backtrace}"
         end 
         
       end #recs.each_with_index 
       
       @trips_active = trips_scheduled_now.keys.length
       @lines_active = lines_scheduled_now.keys.length
       @stops_active = stops_scheduled_now.keys.length
       
       $logger.info "#{trips_scheduled_now.keys.length} trips active"
       $logger.info "#{lines_scheduled_now.keys.length} lines active" 
       $logger.info "#{stops_scheduled_now.keys.length} stops active"
       
       Cache.instance.redis.set self.get_cache_key(admr, "trips_active"), trips_scheduled_now.keys.length.to_i
       Cache.instance.redis.set self.get_cache_key(admr, "lines_active"), lines_scheduled_now.keys.length.to_i
       Cache.instance.redis.set self.get_cache_key(admr, "stops_active"), stops_scheduled_now.keys.length.to_i
       
    end #process
    
    def self.get_trips_active admr
      return eval Cache.instance.redis.get self.get_cache_key(admr,"trips_active")
    end           

    def self.get_lines_active admr
      return eval Cache.instance.redis.get self.get_cache_key(admr,"lines_active")
    end

    def self.get_stops_active admr
      return eval Cache.instance.redis.get self.get_cache_key(admr,"stops_active")
    end

    def self.get_on_time_percentage admr
      return eval Cache.instance.redis.get self.get_cache_key(admr,"on_time_percentage")
    end
    
    def self.get_avg_delay admr
      return eval Cache.instance.redis.get self.get_cache_key(admr,"avg_delay")
    end  
    
    def self.get_delayed_stops admr
      delays = Cache.instance.redis.zrange self.get_cache_key(admr,"delayed_stops"), 0, -1 
      result = Array.new
      if delays
        delays.each do |str| 
           result.push eval(str)
        end 
      end
      return result 
    end
  
end 




#http://127.0.0.1:4567/transport.pt.delay/admr.nl.amsterdam_stadsdeel_oost_ijburg_zuid/live
#do this daily
# def self.__get_scheduled_now admr
#    
#    $logger.info "**** process"
#                              
#    #all lines
#    line_delays = Hash.new
# 
#    #all stops
#    stop_delays = Hash.new
# 
#    #all stops on all lines
#    all_line_stops = 0
#    all_line_stops_delays = 0
# 
#    #this should all be cached daily                               
#    recs =  Client.instance.get_all_records "/#{admr}/ptlines?"
#                                  
#    now = Time.new                         
#    n_t = now.hour * 3600 + now.min * 60 + now.sec
#    
#    #these should all be cached daily
#    recs.each_with_index do |line, line_index|
#      begin
#        cdk_id = line[:cdk_id]                                                       
#        #force getting cached version
#        cache = Client.instance.cached_request "/#{cdk_id}/select/schedule", 0, :cache_mode_force
#        if cache == nil  
#           $logger.debug "skipped #{cdk_id}"
#           $logger.info "skipped"
#           next
#        end
#        
#        response_obj = JSON.parse(cache,{:symbolize_names => true})
#             
#        response_obj[:results].each do |l| 
# 
#          #all trips on this line
#          trips = l[:trips]
# 
#          #add this line
#          if line_delays[cdk_id] == nil
#             line_delays[cdk_id] = Hash.new
#             line_delays[cdk_id]["cnt"] = 0
#             line_delays[cdk_id]["total"] = 0
#          end
#          
#          #all trips of this line
#          trips.each_with_index do |trip,i|
#            trip.each_with_index do |stop,j| #delays for pt + and - 5 minutes from now
#               
#               stop_id = stop[0]
#               time = stop[1]
#               detail = time.split " "
#               delay = 0 
# 
#               #add stop if there's no record yet
#               if stop_delays[stop_id] == nil
#                  stop_delays[stop_id] = Hash.new
#                  stop_delays[stop_id]["cnt"] = 0
#                  stop_delays[stop_id]["total"] = 0
#               end
# 
#               #get scheduled time and now time
#               sched_time = detail[0] 
#               s_t = self.time_to_i sched_time
# 
#               #running : only if pt are scheduled to run now within 5min ofset
#               #calculate diff in seconds between now and the scheduled time
#               diff_n = self.time_diff n_t, s_t 
#               if (diff_n > (-900)) && (diff_n < 900)
#                 line_delays[cdk_id]["running"] = true
#                 stop_delays[stop_id]["active"] = true
#                 all_line_stops += 1 
#                 stop_delays[stop_id]["cnt"] += 1
#                 line_delays[cdk_id]["cnt"] += 1
# 
#                 #there is difference with the scheduled time 
#                 if detail.length == 2
#                   delay_time = /\((.*)\)/.match(detail[1])
#                   d_t = self.time_to_i delay_time[1]
#                   diff_s = self.time_diff s_t, d_t   
# 
#                   #add delay to per line and per stop count
#                   if diff_s > 0
#                     stop_delays[stop_id]["total"] += diff_s 
#                     line_delays[cdk_id]["total"] += diff_s
#                     all_line_stops_delays += diff_s
#                   end
#                 end
#               end
#            end 
#          end
#        end #[:results].each
#        $logger.debug "processed #{cdk_id}"
#      rescue Exception => e
#        $logger.error "Caught exception in #{PtIndicator}.calculate #{line} : #{e.message} \n #{e.backtrace}"
#      end 
# 
#      #percentage of trips delayed
#      #lines running 
#      if all_line_stops > 0
#        $logger.debug "line #{cdk_id} (#{line_index+1} of #{recs.length}) avg delay #{all_line_stops_delays.to_f / all_line_stops.to_f}" 
#      end
# 
#    end #recs.each_with_index 
#    
#    return line_delays, stop_delays 
#    
# end #process   


# def self.__process_stops admr    
#       
#       $logger.info "***** _process_stops"
#        
#       recs = Client.instance.get_all_records "/#{admr}/ptstops?"
# 
#       recs.each_with_index do |stop,index|
#         cdk_id = stop[:cdk_id]   
#         sleep 1
# 
#         begin
#           cache = Client.instance.cached_request "/#{cdk_id}/select/now", 900
#           response_obj= JSON.parse(cache,{:symbolize_names => true})
# 
#           $logger.debug "stop #{index+1} of #{recs.length} : #{cdk_id}"
#           total = 0
#           count = 0  
#           lines = Array.new
# 
#           response_obj[:results].each do |line|
#              times = line[:times]
#              lines.push line[:cdk_id]
# 
#              times.each do |time|    
#                 detail = time.split " "
#                 sched = detail[0]
#                 
#                 #get scheduled time and now time
#                 sched_time = detail[0] 
#                 s_t = time_to_i sched_time
#                 count += 1
# 
#                 if detail.length == 2
#                    delay_time = /\((.*)\)/.match(detail[1])
#                    d_t = time_to_i delay_time[1]
#                    diff_s = time_diff s_t, d_t
#                    total += (diff_s > 0 ? diff_s : 0) #no negative delay
#                     
#                    #line_stops_delay = line_stops_delay + diff_s
#                    $logger.debug "#{line[:cdk_id]} #{time} delay #{diff_s}"
#                 end
#              end
#           end   
#           avg_delay = 0
#           if count > 0
#              avg_delay = total.to_f / count.to_f
#           end  
#           
#           if lines.length  
#             Cache.instance.redis.set "#{cdk_id}:avg_delay", avg_delay.to_s
#             Cache.instance.redis.set "#{cdk_id}:active_lines", lines.to_s 
#           else
#             Cache.instance.redis.del "#{cdk_id}:avg_delay" 
#             Cache.instance.redis.del "#{cdk_id}:active_lines"           
#           end
#         
#         rescue Exception => e
#           $logger.error "Caught exception in #{PtIndicator}._process_stops #{stop} : #{e.message} \n #{e.backtrace}"
#         end
#       end
#       
#     end                                


# def self.update_schedules
#       
#       tmpdir = Dir.tmpdir()
#       tmpfile = "#{tmpdir}/gtfs-kv7-latest.zip"     
#       stopsfile = "#{tmpdir}/stop_times.txt"    
# 
#       $logger.info "#{tmpdir}"
# 
#       system "curl --silent \"http://gtfs.ovapi.nl/govi/gtfs-kv7-latest.zip\" -o #{tmpfile}"
#       system "unzip -o #{tmpfile} -d #{tmpdir}"  
#                
#       lines = (`wc -l #{stopsfile}`).to_i
#       data = CSV.open(stopsfile, 'r:bom|utf-8', :quote_char => '"', :col_sep =>',',:headers => true, :row_sep =>:auto) 
#       
#       def time_to_i time
#         t_h = time.slice(0,2)
#         t_m = time.slice(3,2)
#         t_s = time.slice(6,2)  
#         return t_h.to_i * 3600 + t_m.to_i * 60 + t_s.to_i
#       end                           
# 
#       @@redis.flushdb
#       start = Time.new
# 
#       data.each_with_index do |line,i|  
#         dep_time = time_to_i(line[2])
#         stop_id = line[3]
#         cdk_id = "gtfs.stop.#{stop_id}"           
#         @@redis.zadd cdk_id, dep_time, line.fields.to_s 
#         if i % 100000 == 0 
#           $logger.info "spent #{Time.new.to_f - start.to_f} : #{100 * i.to_f / lines.to_f}%"
#         end
#       end 
#       
#       $logger.info "done all"
# 
#     end