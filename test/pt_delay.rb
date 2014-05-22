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
   
def get_range
  tags =  { "pvda" => ["pvda", "partij van de arbeid"], 
            "vvd" => ["vvd"], 
            "groenlinks" => ["groenlinks","gl"], 
            "d66" => ["d66"],
            "sp" => ["sp"],
            "cda" => ["cda"],
            "red amsterdam" => ["red amsterdam"],
            "pvdd" => ["pvdd","partij voor de dieren"],
            "trotsopnl" => ["trotsopnl"],
            "witte stad" => ["witte stad"]
          }
  return tags
end
  
#all searches are asked in one query, all items are quoted, any tags are bound with OR, all tags are bound with " "                                            
#for instance search for tweets that must contain amsterdam and either on of pvda, d66, vvd : "amsterdam" "pdva" OR "d66" OR "vvd" 
def get_tweets phrases_all, phrases_any

  #other options
  options = {}  

	#param defaults
	options[:lang] = "nl"

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

def get_tweet_stats
  #get tags and synonyms 	                                           
  tags = get_range
  search = Array.new

  #do twitter search
  tags.each do |k,v|
     search.concat v
  end
  result = get_tweets ["amsterdam"], search 

  #count what we've found
  counts = {}
  result.each do |tweet|
     text = ":#{tweet.text}:" #append and preprend non word chars to tweet for regexp
     cnt = 0
     tags.each do |k,synonyms|
       synonyms.each do |t|
         #default count
         if counts[k] == nil
            counts[k] = 0
         end
         #one or more non word chars followed by the tag followed by a non word char, case insensitive 
         if /[^a-zA-Z0-9]+#{t}[^a-zA-Z0-9]+/i.match(text)
           counts[k] = counts[k] + 1 
           puts "#{tweet.text} => #{k}"
         end
       end
     end
  end         

  #results map
  puts "results #{counts.inspect}"
end                                       

get_tweet_stats  	




