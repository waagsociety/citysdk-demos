module Thing 
  
  attr_reader :a

  def self.yo
     @a = 10
  end
  
  def self.get_yo 
    return @a
  end
  
end    

#Thing::yo



puts "#{Thing::a}" 

