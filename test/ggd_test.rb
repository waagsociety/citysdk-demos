require "nokogiri"  
require "time"
require "faraday"

resp = Faraday.get "http://www.luchtmetingen.amsterdam.nl"
d = Nokogiri::HTML(resp.body)

#
def getAVG doc, sel
  rows = doc.css(sel) 
  total = 0
  count = 0
  rows.each do |cel|   
    
    v = Integer(cel.text) rescue nil
    if v
      count += 1
      total += v     
    end  
  end
  return nil if count == 0
  return total/count
end      

last_measurement = d.css(".laatstemeting")
puts "#{last_measurement.text}" 
date = Time.parse(last_measurement.text)      

pm10 = getAVG d, ".col2"  
no2 = getAVG d, ".col3"                        

puts "avg pm10: #{pm10}"
puts "avg no2: #{no2}"            

