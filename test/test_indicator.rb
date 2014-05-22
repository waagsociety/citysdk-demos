require 'thread'
require 'thwait'
require_relative '../model/cache.rb'
require_relative '../model/pt_indicator.rb'

#global logger object needs to exist, is used everywhere
$logger = Logger.new(STDOUT)
$logger.level = Logger::INFO

#require all indicators 
Dir[File.dirname(__FILE__) + '/../model/indicator/*.rb'].each do |file| require file 
  $logger.info "loaded indicator #{file}"
end  
                            

indicator = TourismEventsNexthour.instance


puts indicator.query_history "admr.nl.amsterdam"

res = Cache.instance.cached_call(indicator.method(:query_history), 100, "admr.nl.amsterdam") 

puts res