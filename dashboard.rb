require 'rubygems'
require 'sinatra'  
require 'logger'
require 'citysdk'  
require 'rufus-scheduler' 
require_relative 'model/cache.rb'
require_relative 'model/pt_indicator.rb'
   
#`export LC_CTYPE=en_US.UTF-8`                          
FileUtils.mkdir_p "log"

#global stuff
$logger = Logger.new("log/dashboard.log") #dashboard.log 
$logger.level = Logger::INFO
$indicators = Hash.new 
$scheduler = Rufus::Scheduler.new   

PtIndicator::init 

#called hourly add a history records for all indicators
def on_history_schedule
  Indicator.subclasses.each do |indicator|
     instance = indicator.instance
     begin
       instance.add_history "admr.nl.amsterdam"
     rescue Exception => e
       $logger.error "caught exception in #{instance.get_id}.add_history : #{e.message} \n #{exception.backtrace}"
     end
  end 
  Cache.instance.redis.bgsave
end

#called every 5 minutes give indicators the chance to prepare (do request) 
#so calculated can use cached requests
def on_prepare
  Indicator.subclasses.each do |indicator|
     instance = indicator.instance
     Thread.new do 
       begin
         instance.prepare "admr.nl.amsterdam"
       rescue Exception => e
         $logger.error "caught exception in #{instance.get_id}.prepare : #{e.message} \n #{exception.backtrace}"
       end 
     end
  end
end 

def on_daily
  PtIndicator::__get_schedules "admr.nl.amsterdam"
  
  #make sure cache gets cleared!!  
  
  #PtIndicator::update_schedules
end
   
$scheduler.cron '30 6 * * *' do
  puts "daily cron" 
  on_daily  
end  
     
#every hour
$scheduler.cron '0 * * * *' do
  puts "******* cron" 
  on_history_schedule  
end     
  
#every 5 minutes
$scheduler.every '5m' do 
  puts "******* prepare"
  on_prepare  
end     

#add to header
before do 
	content_type 'application/json'
	headers 'Access-Control-Allow-Origin' => '*'
end
              
#initialize                       
configure do
  $logger.info "dashboard service started" 
  
  #load indicator files
  $logger.info "adding indicators"
  Dir[File.dirname(__FILE__) + '/model/indicator/*.rb'].each do |file| require file 
    $logger.info "loaded indicator #{file}"
  end    
  
  #get all indicator subclasses
  Indicator.subclasses.each do |indicator|
     instance = indicator.instance
     id = instance.get_id
     $indicators[id] = instance 
     puts "indicator loaded:#{id}"
  end
                     
  #do initial history
  Thread.new do
    on_history_schedule 
  end
  
  #do initial prepare
  Thread.new do
    on_prepare 
  end
 
  #do initial daily
  Thread.new do
    on_daily 
  end

end

set :server, 'webrick'

get '/' do
  'Dashboard service!'
end 

#build up all static info for the dashboard
get '/dashboard' do
  return Indicator.dashboard  
end

#do forward call to citysdk and cache the result for seconds 
get '/cache/:seconds/*' do
     
  query_string = request.env["QUERY_STRING"]
  seconds = params[:seconds]
  cdk_request = params[:cdk_request]
  
  cache_ttl = Integer(seconds) rescue nil
  if cache_ttl == nil
     halt 400, "expected integer value"
  end                                 
        
  cdk_request = request.env["PATH_INFO"].sub!("/cache/#{seconds}/","/")
  
  begin
    result = Client.instance.cached_request "#{cdk_request}?#{query_string}", cache_ttl
    return result
  rescue ClientException => exception
    halt exception.status, exception.message
  end
  
end

#return list of indicators
get '/indicator' do
  return Indicator.list
end

#get info about specific indicator
get '/:indicator/info' do 
  #arguments
  indicator_id = params[:indicator]

  #find the indicator plugin
  indicator = $indicators[indicator_id]
  halt 400, "indicator not found" if indicator == nil
  
  return JSON.generate(indicator.get_info)
end
  
#get live value or history for an indicator on a cdk region  
get '/:indicator/:cdk_id/:method' do
  
  #arguments
  indicator_id = params[:indicator]
  cdk_id = params[:cdk_id]
  method = params[:method]  
                                                     
  #find the indicator plugin
  indicator = $indicators[indicator_id]
  halt 400, "indicator not found" if indicator == nil
  
  #call the right method
  result = nil
  ttl = 3600 - Time.new.to_i % 3600 #cache ttl
  case method
  when "live"
      result = indicator.get_value cdk_id
  when "history" 
      result = Cache.instance.cached_call(indicator.method(:query_history), ttl, cdk_id) #indicator.query_history cdk_id
  when "day"   
      result = Cache.instance.cached_call(indicator.method(:query_history), ttl, cdk_id) #indicator.query_history cdk_id
  when "week"
      result = Cache.instance.cached_call(indicator.method(:query_history_week), ttl, cdk_id) #
  when "info"
      result = indicator.get_info 
  else
      halt 400, "method not found"
  end   
  
  $logger.info "result for cdk_id #{cdk_id}:#{indicator_id}.#{method} => #{result}"
  return result  
end 


