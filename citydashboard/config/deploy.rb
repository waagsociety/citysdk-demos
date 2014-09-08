puts "*** Deploying to \033[1;41mcitydashboard.waag.org\033[0m"  

#set right ruby environment 
ruby_version = 'ruby-2.0.0-p195'
set :default_environment, {
  :PATH => "/usr/local/rvm/gems/#{ruby_version}/bin:/usr/local/rvm/gems/#{ruby_version}@global/bin:/usr/local/rvm/rubies/#{ruby_version}/bin:/usr/local/rvm/bin:/usr/local/rvm/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games",
  :RUBY_VERSION => ruby_version,
  :GEM_HOME => "/usr/local/rvm/gems/#{ruby_version}",
  :GEM_PATH => "/usr/local/rvm/gems/#{ruby_version}:/usr/local/rvm/gems/#{ruby_version}@global"
}

#options
set :application, "CityDashBoard"
set :repository,  "."
set :scm, :none
set :deploy_to, "/var/www/citydashboard"
set :copy_exclude, ['test','log']
set :deploy_via, :copy
set :use_sudo, false
set :user, "lodewijk"
default_run_options[:shell] = '/bin/bash'
role :web, "195.169.149.30"                          # Your HTTP server, Apache/etc
role :app, "195.169.149.30"                          # This may be the same as your `Web` server

#define our own tasks
namespace :deploy do
  task :start do ; end
  task :stop do ; end
  
  # we are using Passenger
  task :restart, :roles => :app, :except => { :no_release => true } do
    run "export LC_CTYPE=en_US.UTF-8"
    run "touch #{File.join(current_path,'tmp','restart.txt')}"
  end
 
  task :finalize_update, :except => { :no_release => true } do
  end
end  

#run whenever task after symlink is c
after 'deploy:create_symlink' do
  run <<-CMD
    cd #{current_path} && bundle exec whenever --update-crontab -i citydashboard
  CMD
end
