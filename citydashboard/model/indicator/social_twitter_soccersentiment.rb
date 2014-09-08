require_relative "../indicator.rb"
require_relative "../client.rb"
require_relative "../twitter_utils.rb"
require "uri"

                  
                  
                               
class SocialSoccerSentiment < Indicator
   
     
   def initialize
 
   end
       
   def get_id
     return "social.twitter.soccer"
   end
   
   def get_name
     return "sentiment"
   end
   
   def get_description
     return "amount of tweets about soccer clubs "
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
     tags =  { "Ajax" => ["ajax"], 
               "PSV" => ["psv"], 
               "Feyenoord" => ["feyenoord"], 
               "Vitesse" => ["vitesse"],
               "FC Twente" => ["fc twente"],
               "AZ" => ["az"],
               "Heerenveen" => ["Heerenveen"],
               "PEC Zwolle" => ["pec","pec zwolle"],
               "FC Groningen" => ["FC Groningen"],
               "Heracles" => ["Heracles"],
               "NAC" => ["NAC"],
               "FC Utrecht" => ["FC Utrecht"],
               "Go Ahead" => ["Go Ahead"],
               "RKC" => ["RKC"],
               "Cambuur" => ["Cambuur"],
               "Roda JC" => ["Roda"],
               "NEC" => ["NEC"],
               "ADO Den Haag" => ["Ado"]
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