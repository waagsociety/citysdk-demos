require "uri"
require 'twitter'
                  
ACCESS_TOKEN = "1498026158-8zLBS2E2k7FXrDGhJIsd3C3EuZ7gKrvxG8OsONl"
ACCESS_TOKEN_SECRET = "mrrmSBaeK51pc3y5yL8n17Rlm8iJlM7ybpSkkr0ME" 
CONSUMER_KEY = "ONEnIRxwTHZzfKxp4wCvw"
CONSUMER_KEY_SECRET = "Onpjz5xOQ035xBrkQ4ADusMNcjNHcmsneI6OSdRghg"                  

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

   puts "search #{URI.escape(param_q)}" 

   result = nil 

   begin
 	  result = @twitter_client.search(param_q, options)
 	 rescue Twitter::Error => e
 	  puts "twitter error #{e}"
 	 end

   return result

end


result = get_tweets ["#p2000"], [], "5.478745", "51.441597", 100000	
result.each do |tweet|
    puts ":#{tweet.text}:"
    puts "#{tweet.user.name}"
end


