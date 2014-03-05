require_relative "../indicator.rb"
require_relative "../client.rb"
require_relative "../twitter_utils.rb"
require "uri"

                               
class SocialTwitterSentiment < Indicator
   
     
   def initialize
 
   end
       
   def get_id
     return "social.twitter.sentiment"
   end
   
   def get_name
     return "political sentiment"
   end
   
   def get_description
     return "popularity of predefined set of tags"
   end

   def get_unit
     return "map"
   end
   
   def get_type
     return "hash"
   end
   
   def get_cache_time
     return 900 #keep at least 15 minutes
   end
   
   def calculate admr
     return TwitterUtils.instance.get_tweet_stats admr, self.get_tag_map
   end
   
   def get_tag_map
     tags =  { "pvda" => ["pvda", "partij van de arbeid"], 
                "vvd" => ["vvd"], 
                "groenlinks" => ["groenlinks","gl"], 
                "d66" => ["d66"],
                "sp" => ["sp"],
                "cda" => ["cda"],
                "red amsterdam" => ["red amsterdam"],
                "pvdd" => ["pvdd","partij voor de dieren"],
                "trotsopnl" => ["trotsopnl"],
                "witte stad" => ["witte stad"],
                "pvv" => ["pvv"]
              }
     return tags
   end

   def get_range
     map = get_tag_map
     return map.keys
   end

   def query_history_week admr
     return "not implemented"
   end
  
end