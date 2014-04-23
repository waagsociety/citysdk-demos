# Schedule for whenever : Learn more: http://github.com/javan/whenever
# After change do: whenever --update-crontab                          
                            
#prepare every five minutes
every 5.minutes do
  rake "background:prepare"
end                                 

#hourly add history records 
every '0 * * * *' do 
  rake "background:add_history"
end 
                        
#do a daily update of some schedules
every '30 6 * * *' do
  rake "background:daily"
end