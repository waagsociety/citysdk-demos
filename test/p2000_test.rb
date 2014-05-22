require_relative '../model/p2000_feed' 
require 'digest/md5'

$logger = Logger.new(STDOUT)   
    
P2000Feed.fetch