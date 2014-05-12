require 'thread'
require 'thwait'
require_relative 'model/cache.rb'
require_relative 'model/pt_indicator.rb'  
                                              
#global logger object needs to exist, is used everywhere
$logger = Logger.new("log/dashboard.log")
$logger.level = Logger::INFO  

#call "method" of all indicators with "args"                         
def all_indicators_do method, *args
  Dir[File.dirname(__FILE__) + '/model/indicator/*.rb'].each do |file| require file 
    $logger.info "loaded indicator #{file}"
  end
  #threads = [] 
  Indicator.subclasses.each do |indicator|
     #threads << Thread.new do
       instance = indicator.instance
       begin
         $logger.info "#{method} indicator #{instance.get_id}"
         instance.method(method).call(*args)
       rescue Exception => e
         puts "caught exception in #{instance.get_id}.add_history : #{e.message} \n #{e.backtrace}"
       end
     #end
  end
  #ThreadsWait.all_waits(*threads)
end

#background tasks to be executed from whenever
namespace :background do 

  task :add_history do
    all_indicators_do :add_history, "admr.nl.amsterdam"
    Cache.instance.redis.save
    $logger.info "redis saved"
  end

  task :prepare do
    all_indicators_do :prepare, "admr.nl.amsterdam"
  end 

  task :daily do
    PtIndicator::__get_schedules "admr.nl.amsterdam"
  end

end