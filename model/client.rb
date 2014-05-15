require "singleton" 
require "cgi"
require "uri"
require_relative "cache.rb" 

class CitySDK::API

   def get_raw path
     return @connection.get(path)
   end

end

class ClientException < ::Exception
    
    attr_reader :status
    attr_reader :message
    
    def initialize status, message
       @status = status
       @message = message                 
    end
                         
end

class Client
   include Singleton
            
   def initialize
      @api = CitySDK::API.new('api.citysdk.waag.org')
   end
   
   #cache_ttl 0 => clear cache
   def cached_request req, cache_ttl, cache_mode = :cache_mode_normal
          
     $logger.debug "request for cache = #{req}"     
                           
     #return from cache if it is in the cache
     if cache_mode != :cache_mode_none
       result = Cache.instance.redis.get(req)
       if result                                 
         $logger.debug("*************** request from cache : #{req}")
         return result
       end
    
       #if there's no cache but we don't want to wait for a api call
       return nil if :cache_mode_force == true  
     end
     
     #do a faraday request to city sdk, don't interpret json                                 
     response = @api.get_raw req 
     if response.status == 200
       Cache.instance.redis.set(req,response.body,{:ex => (cache_ttl > 0 ? cache_ttl : 1)})
       return response.body
     else
       raise ClientException.new(response.status,response.body) #so we can give the same response and status code as citysdk 
     end 

     return nil
   end
      
   #get all records for this request by getting per_page
   #cache_ttl 0 forces to get the result not from cache (clear cache)
   def get_all_records req, per_page = 500, cache_ttl = 300, cache_mode = :cache_mode_normal
     
     if cache_mode != :cache_mode_none
       if Cache.instance.redis.exists req
         $logger.debug("get cached result from redis for key : #{req}") 
         cache = Cache.instance.redis.get(req)
         return JSON.parse(cache,{:symbolize_names => true})
       end
       return nil if :cache_mode_force == true 
     end
     
     #do paged request to get all
     page = 1   
     all = Array.new  
     begin
       loop do
         params = Hash.new
         path = URI.parse(req).path
         query = URI.parse(req).query
         if query
           p = CGI.parse(query)
           p.each do |k,v| params[k] = v.join(",") end
         end      
         
         #add paging params 
         params["per_page"] = per_page.to_s
         params["page"] = page.to_s 
                           
         #generate query string
         querystring = params.map{|k,v| "#{CGI.escape(k)}=#{CGI.escape(v)}"}.join("&")
                  
         #sub request for page
         subreq = "#{path}?#{querystring}" 
                              
         #result
         result  = @api.get(subreq)
                
         #add to all results and do next page
         all.concat(result[:results]) 
         $logger.debug "sub results : #{result[:results].length}"  
         if result[:results].length.to_i != per_page
            break
         end
         page = page + 1    
       end 
     rescue Exception => e
       $logger.error("City SDK : #{e.message}") 
     end
       
     if all.length 
       $logger.debug("writing key to redis : #{req}")                                    
       Cache.instance.redis.set(req,JSON.generate(all),{:ex => (cache_ttl > 0 ? cache_ttl : 1)})
     end

     $logger.info("#{req} : #{all.length} results")
     return all
   end
   
   
   
   
   
   
end