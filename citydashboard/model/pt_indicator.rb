require_relative "indicator.rb"
require_relative "client.rb"
require_relative "cache.rb"
require_relative "cdk_utils.rb"
require "cgi"
require "faraday"
require "json"
require "csv"          
require "redis"  
require "tmpdir"
                               
module PtIndicator 
  
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
        
    #cache key for persistent "class" variables    
    def self.get_cache_key admr, param
      return "PtIndicator:#{admr}:#{param}"    
    end
    
    #rate limited call to get_actual data
    def self.get_actuals admr
      Cache.instance.cached_call(self.method(:_get_actuals), 1800, admr) #use this as a rate limiter           
    end
    
    #rate limited call to get_actual data
    def self.get_scheduled_now admr
      Cache.instance.cached_call(self.method(:_get_scheduled_now), 1800, admr) #use this as a rate limiter           
    end
    
    #make sure cache gets cleared!!  
    def self.get_schedules admr
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
    
    def self._get_actuals admr
      
      $logger.info "***** get actuals"
      
      #this should already be cached daily                               
      recs =  Client.instance.get_all_records "/#{admr}/ptlines?layer=gtfs"
                                     
      open_ov_lines = Array.new
      recs.each_with_index do |line, line_index|
        begin    
          cdk_id = line[:cdk_id]
          line_name = line[:layers][:gtfs][:data][:route_short_name]
          agency_id = line[:layers][:gtfs][:data][:agency_id]
          if line_name && agency_id
            $logger.debug "cdk id #{cdk_id}" 
            cid, dir = cdk_id.split("-")
            ovid = "#{CGI.escape(agency_id.upcase())}_#{CGI.escape(line_name)}"
            ovid = "#{ovid}_#{dir}" if dir
            open_ov_lines.push ovid  
            $logger.debug "ovid #{ovid}" 
          end
        rescue Exception => e          
          $logger.info "self.__process_lines #{e.message}"
          $logger.error "self.__process_lines #{e.message}"
        end
      end                                                
      
      _open_ov_request_actuals open_ov_lines, admr      
    end
                                                          
    #admr is only needed for the cache keys
    def self._open_ov_request_actuals open_ov_lines, admr
      
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
          $logger.info "doing req: #{req}"
          response = Faraday.get req, {"User-Agent" => "CityDashBoard"}
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
    
    #http://127.0.0.1:4567/transport.pt.delay/admr.nl.amsterdam_stadsdeel_oost_ijburg_zuid/live
    #do this daily
    def self._get_scheduled_now admr
      
       $logger.info "**** get_scheduled_now"
                                 
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
       
       $logger.info "#{trips_scheduled_now.keys.length} trips active"
       $logger.info "#{lines_scheduled_now.keys.length} lines active" 
       $logger.info "#{stops_scheduled_now.keys.length} stops active"
       
       Cache.instance.redis.set self.get_cache_key(admr, "trips_active"), trips_scheduled_now.keys.length.to_i
       Cache.instance.redis.set self.get_cache_key(admr, "lines_active"), lines_scheduled_now.keys.length.to_i
       Cache.instance.redis.set self.get_cache_key(admr, "stops_active"), stops_scheduled_now.keys.length.to_i
       
    end #process
    
    def self.get_trips_active admr
      val = eval Cache.instance.redis.get self.get_cache_key(admr,"trips_active") rescue nil
      return val 
    end           

    def self.get_lines_active admr
      val = eval Cache.instance.redis.get self.get_cache_key(admr,"lines_active") rescue nil
      return val
    end

    def self.get_stops_active admr
      val = eval Cache.instance.redis.get self.get_cache_key(admr,"stops_active") rescue nil
      return val
    end

    def self.get_on_time_percentage admr
      val = eval Cache.instance.redis.get self.get_cache_key(admr,"on_time_percentage") rescue nil
      return val
    end
    
    def self.get_avg_delay admr
      val = eval Cache.instance.redis.get self.get_cache_key(admr,"avg_delay") rescue nil
      return val
    end  
    
    def self.get_delayed_stops admr
      delays = Cache.instance.redis.zrange self.get_cache_key(admr,"delayed_stops"), 0, -1 
      result = Array.new
      if delays
        delays.each do |str|
           result.push eval(str) if str
        end 
      end
      return result 
    end
  
end 


