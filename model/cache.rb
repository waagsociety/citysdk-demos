#encoding: utf-8  

require "redis"
require "thread"                                            
require "logger"
require "singleton" 
require 'digest/md5' 

class Cache
   attr_reader :redis
   include Singleton
    
   def initialize 
      $logger.debug("starting redis connection")
      @redis = Redis.new({ :db => 0, :timeout => 300})
      @semaphore = Mutex.new
   end              
   
   def reconnect
     @redis.client.disconnect 
     @redis = Redis.new({ :db => 0, :timeout => 300}) 
   end
   
   #set a lock for a period of time, for example for rate limiting a function
   #deprecated
   def locked? key, admr, secs
     result = false
     if @semaphore.lock 
       begin
         key = "lock:#{key}:#{admr}"
         if @redis.get(key)
           $logger.info "re-entrant for key #{key}"
           $logger.info "reent ***************************"
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
   
   # use like : eval(Cache.macro_method_and_params) 
   # do it like this because if we would put this code in a method we lose the scope of the current function
   # result : a string composed of the name of the function and its params like: #<Method: A#foo>:bar:100
   # use md5 hashes for arrays and objects to prevent very long names
   def self.macro_method_and_params
     <<-eos
        func = self.method(__method__)
        vals = method(__method__).parameters.map { |arg| eval(arg[1].to_s) }
        Cache.key_for_method func, vals 
     eos
   end
     
   #make a key composed of the method and its params
   def self.key_for_method func, params
     cache_key = "#{func.to_s}"
     
     #make a key of the params 
     if params && params.length > 0        
        strings = Array.new 
        params.each do |p|
          if p.class == String || p.class == Fixnum
            strings << p.to_s
          else #hash objects and arrays since we don't want the key to become to long
            strings << Digest::MD5.hexdigest(p.to_s)
          end
        end 
        key = strings.join ":"
        cache_key = "#{cache_key}:#{key}"
     end
     
     return cache_key 
   end
   
   #forward a call to the function with params and cache its result
   #return cached result instead if cached result exists
   def cached_call func, ttl, *params
      
      #
      cache_key = Cache.key_for_method func, params
      
      #check if result for this call is in cache 
      cache = @redis.get(cache_key)
      if cache 
        $logger.info "return cached result with key : #{cache_key}"
        return cache 
      end
                                 
      #store the result with the key
      $logger.info "cached call with key : #{cache_key}"
      result = func.call(*params)
      if ttl
        @redis.set(cache_key, result.to_s, {:ex => ttl})
      else
        @redis.set(cache_key, result.to_s)
      end
      
      return result
   end
   

   
end