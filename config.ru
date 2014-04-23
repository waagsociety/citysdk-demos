require 'rubygems'
require 'bundler'
Bundler.require

require './dashboard.rb'

set :environment, :production
run Sinatra::Application

