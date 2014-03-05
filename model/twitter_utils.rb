require "singleton"  
require 'twitter'       
require_relative "client.rb"
require_relative "cdk_utils.rb"

ACCESS_TOKEN = "1498026158-8zLBS2E2k7FXrDGhJIsd3C3EuZ7gKrvxG8OsONl"
ACCESS_TOKEN_SECRET = "mrrmSBaeK51pc3y5yL8n17Rlm8iJlM7ybpSkkr0ME" 
CONSUMER_KEY = "ONEnIRxwTHZzfKxp4wCvw"
CONSUMER_KEY_SECRET = "Onpjz5xOQ035xBrkQ4ADusMNcjNHcmsneI6OSdRghg"

class TwitterUtils
    
   include Singleton
   
   def initialize
      begin
        @twitter_client = Twitter::REST::Client.new(
          :oauth_token => ACCESS_TOKEN,
          :oauth_token_secret => ACCESS_TOKEN_SECRET,
          :consumer_key => CONSUMER_KEY,
          :consumer_secret => CONSUMER_KEY_SECRET,
        )
      rescue Twitter::Error => e
    	   puts "twitter error #{e}" 
    	 end
   end   
  
  #all searches are asked in one query, all items are quoted, any tags are bound with OR, all tags are bound with " "                                            
   #for instance search for tweets that must contain amsterdam and either on of pvda, d66, vvd : "amsterdam" "pdva" OR "d66" OR "vvd" 
   def get_tweets phrases_all, phrases_any, lon, lat, radius

     #other options
     options = {}  

   	 #param defaults
   	 options[:lang] = "nl"
   	 options[:result_type] = "recent" 
   	 options[:geocode] =  "#{lat},#{lon},#{radius.to_f/1000.to_f}km"      

   	 #build the query param for searching user,tags and words	  
   	 t = Time.new
   	 query_parts = Array.new
   	 query_parts.push phrases_all.map {|item| "\"#{item}\"" }.join(" ") if !phrases_all.empty?  
   	 query_parts.push phrases_any.map {|item| "\"#{item}\"" }.join(" OR ") if !phrases_any.empty?  #quote all keywords
   	 query_parts.push "since:#{t.year}-#{t.month}-#{t.day}"
   	 param_q = query_parts.join(" ")

     $logger.debug "search #{URI.escape(param_q)}" 

     result = nil 

     begin
   	  result = @twitter_client.search(param_q, options)
   	 rescue Twitter::Error => e
   	  puts "twitter error #{e}"
   	 end

     return result

   end

   def get_tweet_stats admr, tag_map
          
     region = nil
     
     response = Client.instance.cached_request "/#{admr}?geom", 3600
     
     obj = JSON.parse(response,{:symbolize_names => true})  
     geom = obj[:results][0][:geom] 
     center = CdkUtils::get_geom_center geom 
     
     #get tags and synonyms 	                                           
     search = Array.new

     #do twitter search
     tag_map.each do |k,v|
        search.concat v
     end
     result = get_tweets [], search, center[0], center[1], center[2]   

     #init results array
     counts = Hash.new
     tag_map.keys.each do |k|
        counts[k] = 0
     end          

     if result
       #count what we've found
       result.each do |tweet|
          text = ":#{tweet.text}:" #append and preprend non word chars to tweet for regexp
          cnt = 0
          tag_map.each do |k,synonyms|
            synonyms.each do |t|
              #one or more non word chars followed by the tag followed by a non word char, case insensitive 
              if /[^a-zA-Z0-9]+#{t}[^a-zA-Z0-9]+/i.match(text)
                counts[k] = counts[k] + 1 
                $logger.debug "#{tweet.text} => #{k}"
              end
            end
          end
       end
     end  
     
     puts "counts #{counts}"       

     #results map
     return counts
   end 
  
  
end