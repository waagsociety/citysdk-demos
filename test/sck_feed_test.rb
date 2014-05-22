require_relative '../model/sck_feed' 
require 'digest/md5'

$logger = Logger.new(STDOUT)   

SCKFeed.fetch

SCKFeed.process "admr.nl.amsterdam", "temp" 
SCKFeed.process "admr.nl.amsterdam", "hum" 
SCKFeed.process "admr.nl.amsterdam", "no2" 
SCKFeed.process "admr.nl.amsterdam", "co" 
SCKFeed.process "admr.nl.amsterdam", "light" 
SCKFeed.process "admr.nl.amsterdam", "noise" 

                                                                                           
                                                      
