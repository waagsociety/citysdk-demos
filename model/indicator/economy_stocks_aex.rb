# encoding: utf-8
require_relative "../indicator.rb"
require "faraday"           
require 'logger'
                               
class EconomyStocksAex < Indicator
       
   def get_id
     return "economy.stocks.aex"
   end
   
   def prepare admr  

   end
   
   def get_cache_time
     return 120
   end
   
   def get_name
     return "Aex N25 index"
   end  

   def get_unit
     return "points"
   end
   
   def get_description
     return "average nh10"
   end
   
   def calculate admr
     resp = Faraday.get "http://marketools.plus500.com/Feeds/UpdateTable?instsIds=102"
     d = JSON.parse(resp.body)   
     $logger.info "d #{d}"
     b = d["Feeds"][0]["B"].to_f
     s = d["Feeds"][0]["S"].to_f
     return ((b + s) / 2) #same calc as http://nl.investing.com/indices/netherlands-25
   end
  

end