#
#
# fetch and store - all data in db
# process admr - get ids from citysdk, calculate
# sck:982:no
# sck:982:co
# sck:912:no
#
#
# 
#
#

require 'rubygems' 
require 'citysdk'
require "faraday"
require "time" 
require_relative "client.rb"
require_relative "cache.rb" 
require_relative "cdk_utils.rb" 

module SCKFeed
  
  #rate limited call to fetch data
  def self.fetch
    Cache.instance.cached_call(self.method(:_fetch), 300) #use this as a rate limiter           
  end
  
  #
  def self.process
    
  end
  
  #get cache built up from class, method and params
  def self._cache_key
    return eval(Cache.macro_method_and_params)    
  end
  
  #get all data from smartcitizen.me
  def self._fetch
    
    #
    cache_key = self._cache_key 
           
    #
    props = [:temp,:hum,:co,:no2,:light,:noise,:bat,:nets]
    
    now = Time.new
    
    #get all data from all sensors
    resp = Faraday.get "http://www.smartcitizen.me/devices/all.geojson" 
    content = resp.body.force_encoding("UTF-8").gsub!("\xEF\xBB\xBF".force_encoding("UTF-8"), '')
    all = JSON.parse(content, {symbolize_names: true}) 
    all[:features].each do |sck|
      id = sck[:properties][:id]
      if sck[:properties][:exposure] == "outdoor"
        data = sck[:properties][:feeds]
        next if data == nil || data.length == 0
        data[0].each do |sensor,value|
          timestring = data[0][:timestamp]
          time = Time.parse("#{timestring} GMT") rescue nil
          if time && ((now.to_i - time.to_i).abs < 1800)
            $logger.debug "sen: #{sensor} val:#{value} at #{timestring}"
            if props.include? sensor
              skey = "#{cache_key}:#{id}:#{sensor.to_s}"
              $logger.debug "key #{skey}"
              Cache.instance.redis.set skey, value.to_f, {:ex => 1800} if value
            end 
          else
            $logger.debug "invalid timestamp #{timestring}"
          end
        end
      end
    end
  end
  
  #
  def self.process admr, sensor
                         
    #
    cache_key = self._cache_key
    
    #get sensors ids in this adrm
    cdk_req = "/#{admr}/nodes?layer=sck" 
    results = Client.instance.get_all_records cdk_req, 500, (3600 * 2) #store for long time, not much is gonna change
                                     
    values = Array.new
    
    #retrieve the property we're interested in  
    sids = CdkUtils.m_hash_get_path results, [:layers,:sck,:data,:sensorid]
    sids.each do |id| 
      #look up in db
      skey = "#{cache_key}:#{id}:#{sensor}"
      val = eval(Cache.instance.redis.get skey) rescue nil
      values.push val if val                                   
    end
    
    #average
    avg = CdkUtils.calculate_average values
    $logger.debug "avg for #{sensor} : #{avg}"
    return avg

  end
  
end                                 

