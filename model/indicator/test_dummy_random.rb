require_relative "../indicator.rb"
                               
class TestDummyRandom < Indicator
       
   def get_id
     return "test.dummy.random"
   end
   
   def get_name
     return "random"
   end                        
   
   def calculate admr
      return Random.rand
   end
   
   
  
end