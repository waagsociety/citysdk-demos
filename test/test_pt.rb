require 'citysdk' 
require 'redis'
require 'scanf'
require 'time'  
require 'logger'
require_relative '../model/client' 
require_relative '../model/pt_indicator'

$logger = Logger.new(STDOUT)

                                                
   

PtIndicator::get_scheduled_now "admr.nl.amsterdam"

PtIndicator::get_actuals "admr.nl.amsterdam"  

PtIndicator::get_schedules "admr.nl.amsterdam"



