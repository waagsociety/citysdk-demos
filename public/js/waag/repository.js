var domainList;
//http://loosecontrol.tv:4567/transport.car.pressure/admr.nl.amsterdam/live;
var apiUrlSDK="http://api.citysdk.waag.org/";
var apiGeom="&geom&per_page=1000";
var apiUrlDB="http://195.169.149.30/";
var admr="admr.nl.amsterdam";
var assetsImages="images/images/";
var assetsSvg="images/svg/";
var mainMapUrl="http://195.169.149.30/cache/3600/admr.nl.amsterdam/regions?admr::admn_level=5&geom&per_page=1000";
var dNow = new Date();
var timeNow=dNow.getTime();
var hNow = dNow.getHours();
var mNow = dNow.getMinutes();


//var initialTickerData=[];
var admrData=[];
var dashBoardData=[];
//http://loosecontrol.tv:4567/dashboard

function getInitialData(){
  var apiCall="transport.car.pressure";

  d3.json("http://loosecontrol.tv:4567/dashboard", function(results){

    var domains=d3.entries(results);

    for(var i=0; i<domains.length; i++){
        var subdomains=[];  
        var subs=d3.entries(domains[i].value);  
        
        for(var j=0; j<subs.length; j++){
          var subDomain={};
          subDomain.id=subs[j].key;
          subDomain.label=subs[j].key;
          subDomain.icon="/images/svg/icon_"+domains[i].key+"."+subs[j].key+".svg";
          subDomain.tickerData=d3.entries(subs[j].value);
          subdomains[j]=subDomain;
          
        }
        
        var domain={
          color:"#ccc",
          id:domains[i].key,
          label:domains[i].key,
          icon:"/images/svg/icon_"+domains[i].key+".svg",
          graphType:"bar",
          subdomains:subdomains
        }
        
        dashBoardData.push(domain);
           
    }

    getAdmrData()
       
  });
  
}

function getAdmrData(){
  
  //var url="http://loosecontrol.tv:4567/cache/3600/admr.nl.amsterdam/regions?admr::admn_level=5&layer=cbs&geom&per_page=1000"
  
  var url=apiUrlDB+"cache/3600/admr.nl.amsterdam/regions?admr::admn_level=5&geom&per_page=1000";
  // d3.json(url, function(results){
  //     admrData=results.results;
  //     initDashboard();  
  // }); 
  
  initDashboard();  
    
}


function createDomains(){
  
  // http://loosecontrol.tv:4567/transport.car.pressure/admr.nl.amsterdam/info
  // http://loosecontrol.tv:4567/transport.car.pressure/admr.nl.amsterdam/live
  // http://loosecontrol.tv:4567/transport.car.pressure/admr.nl.amsterdam/history
  // http://loosecontrol.tv:4567/cache/3600/admr.nl.amsterdam/nodes?admr::admn_level=5&geom&per_page=1000
  
  var list=[];
  // domain Traffic
  
  var tickerData = {
      live:true,
      data:[
      {bullet:"", description: "Avg. speed", value: "", units:"km/h", kci:"transport.car.speed"},
      {bullet:"", description: "Road pressure", value: "", units:"%", kci:"transport.car.pressure"},  
      {bullet:"", description: "Parking", value: "", units:"%", kci:"transport.car.parking"}
      ]
  };
  
  // for(var i=0; i<dashBoardData.length; i++){
  //   if(dashBoardData[i].id=="transport"){
  //     var tickerData=dashBoardData[i].subdomains[0].tickerData.value;
  //   }
  //   
  // }
  
  // domain Transport
  var subDomainA={id:"traffic", 
    label:"Traffic", 
    icon:"images/svg/icon_transport.car.svg", 
    tickerData:tickerData, 
    graphType:"bar",
    mapLayers:[
      {url:apiUrlDB+"cache/3600/nodes?layer=divv.traffic&geom&per_page=1000", type:"static", id:"traffic", label:"Traffic", userCallBacks:false, sdkPath:"layers:divv.traffic:data"},
      {url:apiUrlDB+"cache/3600/nodes?layer=divv.parking.capacity&geom&per_page=1000", type:"static", id:"parking", label:"Parking", userCallBacks:false, sdkPath:"layers:divv.parking.capacity:data"}
    ]
  };
  
  var tickerData = {
      live:true,
      data:[
        {bullet:">", description: "Ontime", value: "", units:"%", kci:"transport.pt.ontime"},
        {bullet:"+", description: "Avg. delay time", value: "", units:"sec", kci:"transport.pt.stopsdelayed"},
        {bullet:"+", description: "Actual trips", value: "", units:"", kci:"transport.pt.running"},
      ]
  };  
  var subDomainB={id:"pt", 
    label:"Public transport", 
    icon:"images/svg/icon_transport.pt.svg", 
    tickerData:tickerData, 
    graphType:"bar",
    mapLayers:[
      {url:apiUrlDB+"/cache/3600/admr.nl.amsterdam/ptstops?geom&per_page=1000", type:"realtime", id:"ptstops", label:"Public transport", userCallBacks:"/select/now", sdkPath:false}
    ]
  
    };
	var properties={
	  id:"transport",
	  label:"Transport",
	  color:"#FFCC99",
	  icon:"images/svg/icon_transport.svg",
	  map:true, 
	  subDomains:[subDomainA, subDomainB]
	};
	list.push(properties);
  
  // domain economy 

  
  // domain environment  
  var tickerData = {
      live:true,
      data:[
      {bullet:">", description: "no2", value: "", units:"&#181g/m&#179", kci:"environment.sck.no2"},
      {bullet:"+", description: "co", value: "", units:"K&#937", kci:"environment.sck.co"},
      {bullet:"+", description: "Noise level", value: "", units:"dB", kci:"environment.sck.noise"},
      {bullet:"+", description: "Light", value: "", units:"lux", kci:"environment.sck.light"}
      //{bullet:">", description: "Temperature", value: "", units:"&#176C", kci:"environment.sck.temperature"},
      //{bullet:"+", description: "Humidity", value: "", units:"%", kci:"environment.sck.humidity"},
      //{bullet:"+", description: "Light", value: "", units:"lux", kci:"environment.sck.light"}   
  ]};
  subDomainA={id:"smartcitizen",
    label:"Smartcitizen", 
    icon:"images/svg/icon_environment.sck.svg", 
    tickerData:tickerData, 
    graphType:"line",
    mapLayers:[
      {url:apiUrlDB+"/cache/3600/admr.nl.amsterdam/nodes?layer=sck&geom&per_page=1000", type:"static", id:"sck", label:"Smart citizens", userCallBacks:false, sdkPath:"layers:sck:data"}
    ]

  };
  

  var tickerData = {
      live:true,
      data:[
      {bullet:">", description: "no2", value: "", units:"&#181g/m&#179", kci:"environment.ggd.no2"},
      {bullet:"+", description: "nh10", value: "", units:"&#181g/m&#179", kci:"environment.ggd.nh10"}
      
      
  ]};
  subDomainB={id:"ggd-airquality",
    label:"GGD airquality", 
    icon:"images/svg/icon_environment.ggd-airquality.svg", 
    tickerData:tickerData, 
    graphType:"area",
    mapLayers:false
  };
  var properties={
    id:"environment",
    label:"Environment",
	  icon:"images/svg/icon_environment.svg", 
	  color:"#FFB27D",
	  map:true,
    subDomains:[subDomainA, subDomainB]

	};
	list.push(properties);
  

  // domain cbs 
  var tickerData = {
      live:false,
      data:[{bullet:">", description: "value A_1", value: "0.00 ", units:"%", kci:apiUrlDB+"/cache/3600/admr.nl.amsterdam/regions?admr::admn_level=5&layer=cbs&per_page=1000 "}],
      layers:cbsLayers
  };
    
  subDomainA={id:"cbsA", 
    label:"CBS Statistics", 
    icon:"images/svg/icon_statistics.cbs.svg", 
    tickerData:tickerData, 
    graphType:"donut",
    mapLayers:false
    // mapLayers:[
    //   {url:"http://loosecontrol.tv:4567/cache/3600/admr.nl.amsterdam/regions?admr::admn_level=5&layer=cbs&geom&per_page=1000", id:"cbs", type:"static", userCallBacks:false, sdkPath:"layers:cbs:data"}
    // ]
  };
  
  var tickerData = {
      live:false,
      data:[{bullet:">", description: "value A_1", value: "0.00 ", kci:apiUrlDB+"/cache/3600/admr.nl.amsterdam/regions?admr::admn_level=5&layer=cbs&per_page=1000 "}],
      layers:cbsLayers
  };
  
  subDomainB={id:"cbsB",
    label:"CBS Statistics", 
    icon:"images/svg/icon_statistics.cbs.svg", 
    tickerData:tickerData, 
    graphType:"circlepack",
    mapLayers:[
      {url:apiUrlDB+"/cache/3600/admr.nl.amsterdam/regions?admr::admn_level=5&layer=cbs&geom&per_page=1000", type:"static", id:"cbs", label:"CBS statistics", userCallBacks:false, sdkPath:"layers:cbs:data"}
    ]
  };

  var properties={
    id:"statistics",
    label:"Statistics",
	  icon:"images/svg/icon_statistics.svg", 
	  color:"#EF7714",//F16912
	  map:true,
    subDomains:[subDomainA, subDomainB]

	};
	list.push(properties);
	
	// domain economy 
  var tickerData = {
      live:true,
      data:[
      {bullet:">", description: "AEX", value: "", units:"points", kci:"economy.stocks.aex"}

  ]};
  subDomainA={id:"stocks",
    label:"E.A.X.", 
    icon:"images/svg/icon_economy.stocks.svg", 
    tickerData:tickerData, 
    graphType:"line",
    mapLayers:false

  };

  var properties={
    id:"economy",
    label:"Economy",
	  icon:"images/svg/icon_economy.svg", 
	  color:"#FFB27D",
	  map:false,
    subDomains:[subDomainA, false]

	};
	list.push(properties);
	
	
	// domain cultural  
  var tickerData = {
      live:true,
      data:[
      {bullet:">", description: "Events at this moment", value: "20.27 ", units:"events",  kci:"tourism.events.nexthour"}
  ]};
  subDomainA={id:"events",
    label:"Events", 
    icon:"images/svg/icon_tourism.events.svg", 
    tickerData:tickerData, 
    graphType:"sunburst",
    mapLayers:[
      {url:apiUrlDB+"/cache/3600/admr.nl.amsterdam/nodes?layer=artsholland&geom&per_page=1000", id:"artsholland", type:"static", label:"Arts Holland Events", userCallBacks:false, sdkPath:"layers:artsholland:data"}
    ]

  };

  var properties={
    id:"cultural",
    label:"Cultural",
	  icon:"images/svg/icon_tourism.svg", 
	  color:"#FFB27D",
	  map:true,
    subDomains:[subDomainA, false]

	};
	list.push(properties);

	
	// domain social
	var tickerData = {
      live:true,
      data:[
        {bullet:">", description: "Political parties", value: "", units:"tweets", kci:"social.twitter.sentiment"}
      ]
  };

  subDomainA={id:"sentiment", 
    label:"Sentiment", 
    icon:"images/svg/icon_social.twitter.svg", 
    tickerData:tickerData, 
    graphType:"multiline",
    mapLayers:false

    };

  	var tickerData = {
        live:true,
        data:[
          {bullet:">", description: "Soccer", value: "20.27" , units:"tweets", kci:"social.twitter.soccer"}
        ]
    };
    subDomainB={id:"soccer", 
      label:"Soccer", 
      icon:"images/svg/icon_social.twitter.svg", 
      tickerData:tickerData, 
      graphType:"multiline",
      mapLayers:"false"
    };
  var properties={
    id:"social",
    label:"Social",
	  icon:"images/svg/icon_social.svg", 
	  color:"#EF7714",//F16912
	  map:false,
    subDomains:[subDomainA, subDomainB]

	};
	list.push(properties);
	
  return list;
}

var cbsLayers=[
      {value:"bev_dichth", description:"Bev. dichtheid"},
      {value:"aant_inw", description:"Aantal inwoners"},
      {value:"aant_vrouw", description:"Aantal vrouwen"},
      {value:"aant_man", description:"Aantal mannen"},
      {value:"aantal_hh", description:"Aantal huishoudens"},
      {value:"gem_hh_gr", description:"Gemm. hh grote"},
      {value:"p_gehuwd", description:"Perc. gehuwd"},
      {value:"p_hh_m_k", description:"Perc. hh met kinderen"},
      {value:"p_hh_z_k", description:"Perc. hh zonder kinderen"},
      {value:"p_eenp_hh", description:"Perc. 1pers. hh"},
      {value:"p_gescheid", description:"Perc. gescheiden"},
      {value:"p_ongehuwd", description:"Perc. ongehuwd"},
      {value:"p_verweduw", description:"Perc. weduw"},
      
      {value:"p_surinam", description:"Perc. Surninaams"},
      {value:"p_ant_aru", description:"Perc. Antiliaans"},
      {value:"p_marokko", description:"Perc. Marokaans"},
      {value:"p_turkije", description:"Perc. Turks"},
      {value:"p_west_al", description:"Perc. west. allochtoon"},
      {value:"p_n_w_al", description:"Perc. niet west. allochtoon"},
      {value:"p_over_nw", description:"Perc. overig niet west."},

      {value:"p_00_14_jr", description:"Perc. 0 - 14 jaar"},
      {value:"p_15_24_jr", description:"Perc. 15 - 24 jaar"},
      {value:"p_25_44_jr", description:"Perc. 25 - 44 jaar"},
      {value:"p_45_64_jr", description:"Perc. 45 - 64 jaar"},
      {value:"p_65_eo_jr", description:"Perc. 65+ jaar"},
      
      
      {value:"opp_tot", description:"Opp. totaal"},
      {value:"opp_land", description:"Opp. land"},
      {value:"opp_water", description:"Opp. water"},
];

