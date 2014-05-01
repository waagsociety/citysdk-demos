# require "bundler/capistrano"
# todo :
# - add automatic whenever --update-crontab

puts "*** Deploying to \033[1;41mcitydashboard.waag.org\033[0m"  

set :application, "CityDashBoard"
set :repository,  "."
set :scm, :none


#set :branch, "master"

set :deploy_to, "/var/www/citydashboard"

set :copy_exclude, ['test']

set :deploy_via, :copy

set :use_sudo, false
set :user, "lodewijk"

default_run_options[:shell] = '/bin/bash'

role :web, "195.169.149.30"                          # Your HTTP server, Apache/etc
role :app, "195.169.149.30"                          # This may be the same as your `Web` server
#role :db,  "citydashboard.waag.org", :primary => true       # This is where Rails migrations will run

namespace :deploy do
  task :start do ; end
  task :stop do ; end
  
  # Assumes you are using Passenger
  task :restart, :roles => :app, :except => { :no_release => true } do
    run "touch #{File.join(current_path,'tmp','restart.txt')}"
  end
 
  task :finalize_update, :except => { :no_release => true } do
  end
end  


