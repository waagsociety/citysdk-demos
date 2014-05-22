require 'sinatra'

get '/hi' do
  puts "#{Thread.current.object_id}"
  sleep 10
  "Hello World!"
end

get '/lo' do
  "bla"
end
