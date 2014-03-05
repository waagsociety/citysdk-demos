require "redis"
require "thread"
require "singleton"

class Cache
   attr_reader :redis
   include Singleton
    
   def initialize 
       $logger.debug("starting redis connection")
       @redis = Redis.new({ :db => 0, :timeout => 300})
       @semaphore = Mutex.new
   end
   
   #set a lock for a period of time, for example for rate limiting a function
   def locked? key, admr, secs
     result = false
     if @semaphore.lock 
       begin
         key = "lock:#{key}:#{admr}"
         if @redis.get(key)
           $logger.info "re-entrant for key #{key}"
           puts "reent ***************************"
           result = true                           
         else
           @redis.set(key,"busy",{:ex => secs}) #set busy 
         end              
       rescue Exception => e
         $logger.error "error in Cache::locked? #{e.message}"
       end
       @semaphore.unlock
     end
     return result
   end
   
   #forward a call to the function with params and cache its result
   #return cached result instead if cached result exists
   def cached_call func, ttl, *params
      cache_key = func.to_s
      cache = @redis.get(cache_key)
      return cache if cache
                                
      puts "new call"
      result = func.call(*params)
      if ttl
        @redis.set(cache_key, result.to_s, {:ex => ttl})
      else
        @redis.set(cache_key, result.to_s)
      end
      
      return result
   end

   
end