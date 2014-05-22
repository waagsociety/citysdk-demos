require_relative '../model/cache' 

$logger = Logger.new(STDOUT)   
    
class A
  def foo a,b,c
    puts eval(Cache.macro_method_and_params) 
  end
end

def foo(x, y)
  puts eval(Cache.macro_method_and_params)
end
                     

a = A.new
obj = Object.new
a.foo "a",100, obj
a.foo "a",100, obj
a.foo "a",100, Object.new

foo 10,"a"

                                                                                           
                                                      
