#                        
require "json"  
require "time"    

all_lines = `curl http://api.citysdk.waag.org/admr.nl.amsterdam/ptlines?per_page=1000&layer=gtfs`
l = JSON.parse(all_lines) 
lines = Array.new
l["results"].each do |line|                                                                     
  puts "#{line}"
  op = (line["cdk_id"].split("."))[2]
  linename = (line["cdk_id"].split("."))[3] 
  linenr, dir = linename.split("-")
  ovid = "#{op.upcase()}_#{linenr}"
  ovid = "#{ovid}_#{dir}" if dir
  lines.push ovid
end            
 
query_lines = lines[0..49] 

req =  "curl -v http://v0.ovapi.nl/line/#{query_lines.join(',')}" 
puts "#{req}"
scheme = `#{req}`
                
s = JSON.parse(scheme)
 
i = 0  
j = 0
s.each do |line_name,sched|                           
   i += 1
   actuals = sched["Actuals"]
   actuals.each do |stop,info|
     target = info["TargetDepartureTime"]
     expected =  info["ExpectedDepartureTime"]
     if target != expected
       t = Time.parse(target) 
       e = Time.parse(expected)
       diff = e.to_i - t.to_i
       puts "diff #{diff}"       
     end      
     
     #puts "TargetDepartureTime #{info["TargetDepartureTime"]}"
     #puts "ExpectedDepartureTime #{info["ExpectedDepartureTime"]}"
     j += 1 
   end                                                     
end                                                  
         
puts "#{i} lines printed, #{j} stops"

#puts "#{scheme}"         

exit      


all_stops = `curl http://v0.ovapi.nl/tpc/`
a = JSON.parse(all_stops)

stops = a.keys[100..101]

#puts "#{stops.join(',')}"   

scheme = `curl -v http://v0.ovapi.nl/tpc/#{stops.join(',')}`
           
a = JSON.parse(all_stops)

#per 50 lukt

puts "#{scheme}"