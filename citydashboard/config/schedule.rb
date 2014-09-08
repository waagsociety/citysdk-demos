# Schedule for whenever : Learn more: http://github.com/javan/whenever
# After change do: whenever --update-crontab,                          
                            
#prepare every five minutes
every 5.minutes do
  rake "background:prepare"
end                                 

#hourly add history records these are rounded to the hour but doing it more then every hour we have a retry mechanism
every 15.minutes do 
  rake "background:add_history"
end 
                        
#do a daily update of some schedules
every '30 6 * * *' do
  rake "background:daily"
end