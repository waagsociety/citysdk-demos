# installation 

### install ruby  
- install rvm [http://rvm.io](http://rvm.io)
- $ rvm install 2.1 
                
### install required gems
- projroot$ gem install bundler
- projroot$ bundle install

### install other components
- install redis 2.8 [http://redis.io/download](http://redis.io/download)
                                 
# run locally with WEBrick 
                
### start redis:

- $ redis-server

### start dashboard:

- projroot$ ruby dashboard.rb 

A local instance of the dashboard should now be running at [http://127.0.0.1:4567](http://127.0.0.1:4567)
                                         

# cronjob for background tasks

Some background tasks should be running at intervals to fetch and process data from data providers
                                                                                                  
### install the cronjob using:
- projroot$ bundle exec whenever --update-crontab -i citydashboard

### check:
- $ crontab -e

### running background task manually:
- projroot$ rake background:add_history
- projroot$ rake background:daily
- projroot$ rake background:prepare  
            

# twitter oauth api keys
                   
To make use of twitter feed, get the following oAuth keys 

- ACCESS_TOKEN 
- ACCESS_TOKEN_SECRET 
- CONSUMER_KEY (API key)
- CONSUMER_KEY_SECRET (API secret)

Create a "Twitter application" here: [https://apps.twitter.com](https://apps.twitter.com). Generate the keys in the Twitter App web interface. Paste them into [model/twitter_utils.rb](model/twitter_utils.rb)

# api

### GET Interface:

- /indicator
- /[indicator]/info 
- /[indicator]/[cdk_id]/live
- /[indicator]/[cdk_id]/day
- /[indicator]/[cdk_id]/week

### parameters                                                                                                  
- indicator:   
City indicator, calculation on dataset (for example environment temperature based)
- cdk_id:  
Citydashboard strongly depends on the [citysdk](http://citysdk.waag.org/) API. For specifying the geographic boundary of the indicator a cdk_id is used (for example admr.nl.amsterdam)
    
### example:
[http://citydashboard.waag.org/environment.sck.temperature/admr.nl.amsterdam/live](http://citydashboard.waag.org/environment.sck.temperature/admr.nl.amsterdam/live)

# front-end

The front-end code (Graphic dashboard) currently contains an implementation for an Amsterdam dashboard (Amsterdam is currently the only city that has all indicators implemented). By default it connects to the back-end running on the same server. 

### back-end configuration
Change the configuration lines in [public/js/waag/repository.js](public/js/waag/repository.js) to make the front-end connect to another server (for example http://citydashboard.waag.org/).

# deploying

The dashboard can be run with Phusion Passenger on a production server.

                               



