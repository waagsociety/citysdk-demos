require 'rexml/document' 
require "time"  

xml = `curl -s http://feeds.livep2000.nl`

doc = REXML::Document.new(xml)  
                            
doc.root.elements.each('channel/item') do |item|
  
  lat = (item.elements["geo:lat"])
  lon = (item.elements["geo:long"])
  id = (item.elements["guid"])
  time = (item.elements["pubDate"])  
  
  if (lat != nil) && (lon != nil) 
    lat = lat.text.to_f
    lon = lon.text.to_f
    time = Time.parse(time.text).to_i 
    id = id.text
    puts "#{id} #{lat} #{lon} #{time}"
  end
  
end