#  



class Forwarder
   def forward func, ttl, *params
     puts "key #{func.to_s}"
     puts "ttl #{ttl}"
     return func.call(*params)
   end 
end
  
class A
  def plus a, b
    a + b
  end
end
  

obj = A.new

f = Forwarder.new
result = f.forward obj.method(:plus), 60, 3, 1
         
puts "result #{result}"