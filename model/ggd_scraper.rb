require "nokogiri"    
require "faraday"

module GgdScraper 
    
    def self.scrape admr
      case admr        
      when "admr.nl.amsterdam"
        self.__scrape_amsterdam
      end
    end
    
    def self.get_pm10
      return @pm10
    end
       
    def self.get_no2
      return @no2
    end
               
    def self.get_date
      return @date.to_i
    end   
       
    def self.__get_average doc, sel
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
    
    def self.__scrape_amsterdam  
      resp = Faraday.get "http://www.luchtmetingen.amsterdam.nl"
      d = Nokogiri::HTML(resp.body)
      last_measurement = d.css(".laatstemeting")
      date = Time.parse(last_measurement.text)      
      @pm10 = __get_average d, ".col2"  
      @no2 = __get_average d, ".col3" 
      @date = date 
      puts "date #{@date.to_i} , pm10 #{@pm10}, no2 #{@no2}"
    end

end