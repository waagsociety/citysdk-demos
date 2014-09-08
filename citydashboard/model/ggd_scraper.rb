#encoding: utf-8 

require "nokogiri"    
require "faraday"
require 'logger'
require_relative "cache.rb"
require_relative "cdk_utils.rb"

module GgdScraper 
    
    def self.scrape admr
      case admr        
      when "admr.nl.amsterdam"
        self._scrape_amsterdam
      end
    end
    
    def self.get_cache_key admr, param
      return "GgdScraper:#{admr}:#{param}"    
    end
    
    def self.get_pm10 admr
      val = eval Cache.instance.redis.get self.get_cache_key(admr,"pm10") rescue nil
      return val
    end
       
    def self.get_no2 admr
      val = eval Cache.instance.redis.get self.get_cache_key(admr,"no2") rescue nil
      return val
    end
               
    def self.get_date admr
      val = eval Cache.instance.redis.get self.get_cache_key(admr,"date") rescue nil
      return val
    end   
       
    def self._get_average doc, sel
      rows = doc.css(sel) 
      total = 0
      count = 0
      rows.each do |cel|   
        v = Integer(cel.text) rescue nil
        if v
          count += 1
          total += v     
        end  
      end
      return nil if count == 0
      return total/count
    end
    
    def self._scrape_amsterdam 
      admr = "admr.nl.amsterdam" 
      resp = Faraday.get "http://www.luchtmetingen.amsterdam.nl"
      d = Nokogiri::HTML(resp.body)
      last_measurement = d.css(".laatstemeting")
      date = Time.parse(last_measurement.text)      
      pm10 = _get_average d, ".col2"  
      no2 = _get_average d, ".col3" 
      
      Cache.instance.redis.set self.get_cache_key(admr, "pm10"), pm10.to_s 
      Cache.instance.redis.set self.get_cache_key(admr, "no2"), no2.to_s 
      Cache.instance.redis.set self.get_cache_key(admr, "date"), date.to_i.to_s                  
      
      $logger.info "date #{date} , pm10 #{pm10}, no2 #{no2}"
    end

end