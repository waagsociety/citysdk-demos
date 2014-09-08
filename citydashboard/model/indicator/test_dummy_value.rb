require_relative "../indicator.rb"
                               
class TestDummyValue < Indicator
       
   def get_id
     return "test.dummy.value"
   end
   
   def get_name
     return "random"
   end                        
   
   def calculate admr
      return 10
   end
   
   
  
end