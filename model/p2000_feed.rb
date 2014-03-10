require "faraday"
require_relative "client.rb"
require_relative "cache.rb" 
require "time" 
require 'rexml/document'

module P2000Feed 
    
    def self.fetch
      
      return if Cache.instance.locked? "P2000Feed::fetch", "", 100
      
      puts "prepare p2000"                     
      resp = Faraday.get "http://feeds.livep2000.nl"
      doc = REXML::Document.new(resp.body) 
      doc.root.elements.each('channel/item') do |item|
        lat = (item.elements["geo:lat"])
        lon = (item.elements["geo:long"])
        id = (item.elements["guid"])
        desc = (item.elements["description"])
        title = (item.elements["title"])
        time = (item.elements["pubDate"])  
        guid =  (item.elements["guid"])
        
        if (lat != nil) && (lon != nil)
          node = Hash.new
          lat = lat.text.to_f
          lon = lon.text.to_f
          id = id.text        
          time = Time.parse(time.text).to_i
          node["type"] = "node"
          node["geom"] = { "type" => "Point", "coordinates" => [lon,lat]} 
          node["title"] = title.text.to_s
          node["description"] = desc.text.to_s
          node["cdk_id"] = "p2000_#{guid.text}"
          node["timestamp"] = time
          Cache.instance.redis.zadd("p2000:alerts", time, node.to_s)
        end
      end 
    end
    
    def self.process admr
       #get center of geometry
       response = Client.instance.cached_request "/#{admr}?geom", 3600
       obj = JSON.parse(response,{:symbolize_names => true})  
       geom = obj[:results][0][:geom] 
       lon, lat, radius = CdkUtils::get_geom_center geom  
       time = Time.new.to_i

       #count alarms for last hour and filter by their distance to center
       locations = Array.new
       count = 0
       cache = Cache.instance.redis.zrangebyscore("p2000:alerts", time - 3600, time) 
       cache.each do |val| 
         node = eval val 
         
         coordinates = node["geom"]["coordinates"]
         distance = CdkUtils::distance coordinates.dup, [lon,lat] 
         if(distance < radius)
           count += 1
           locations.push (node)
         end
       end
       return locations
    end
    

end