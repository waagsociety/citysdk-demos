WAAG.Map = function Map(domains) {

  console.log("map constructor");
  var container;
  var mapScale=125000;
	var svg, projection, path, map, main_map;
	var centered, zoom;
	var defs, filter, feMerge;
	var rangeCB=9; //range colorbrewer
  var mapMenu;
  var llActive=false;
  var dropDownLayers;
  var cachedLayers=[];
  
  var labelSCK;
  var labelTextCloud;
  var dataMenu=[];

	function init(){
      
    var stage = d3.select("#stage");
    container = stage.append("div")
      .attr("class", "map_container")
      .attr("id", "map_container")
      .style("top", menuHeight+(domains.length*widgetHeight)+"px");
      
  		projection = d3.geo.mercator()
  			     .translate([ (mapWidth)/2 , (mapHeight)/2 ])
  			     .scale([mapScale]);

  		projection.center([4.9000,52.3725])

  		path = d3.geo.path()
  		      .projection(projection)
  		      .pointRadius(10);

  		zoom = d3.behavior.zoom()
          .translate([0, 0])
          .scale(1)
          .scaleExtent([0.05, 18])
          .on("zoom", zoomed);

  		//create svg element            
  		svg = d3.select("#map_container").append("svg")
  		    .attr("width", mapWidth+"px")
  		    .attr("height", mapHeight+"px")
  		    .style("position", "absolute")
  		    .style("z-index", 0)
  		    .call(zoom);   

  		map = svg.append("g")
  		   .attr("id", "map")
  		   .style("position", "absolute")
         .style("width", mapWidth)
         .style("height", mapHeight)
  		   


  	// set dropshadow filters	   
     defs = map.append("defs");

     filter = defs.append("filter")
           .attr("id", "dropshadow")

       filter.append("GaussianBlur")
           .attr("in", "SourceAlpha")
           .attr("stdDeviation", 1)
           .attr("result", "blur");
       filter.append("feOffset")
           .attr("in", "blur")
           .attr("dx", 0.5)
           .attr("dy", 0.5)
           .attr("result", "offsetBlur");

       feMerge = filter.append("feMerge");

       feMerge.append("feMergeNode")
           .attr("in", "offsetBlur")
       feMerge.append("feMergeNode")
           .attr("in", "SourceGraphic");
           
       d3.xml("images/svg/label_sck.svg", "image/svg+xml", function(xml) {
          var label = document.importNode(xml.documentElement, true);
           d3.select("#map_container").node().appendChild(label);

       });

       d3.xml("images/svg/label_parking-building.svg", "image/svg+xml", function(xml) {
          var label = document.importNode(xml.documentElement, true);
           d3.select("#map_container").node().appendChild(label);

       });



       createMapMenu();    
     		   

  };
  

  
  function createMapMenu(){
    
          
    domains.forEach(function(d){
        if(d.map){

          dataMenu.push(d);
        }
    
    });
    
    
    dataMenu.forEach(function(d){
      d.subDomains.forEach(function(s){
          s.domainId=d.id;
          if(s.mapLayers){
            s.mapLayers.forEach(function(layer){
              layer.domainId=d.id;

            });
          }
      });
    });
    
    container.append("div")
          .attr("id", "layerOverlay")
          .style("position", "absolute")
          .style("background-color", "#F9F1EA")
          .style("top", 0+"px")
          .style("left", -mapWidth+"px")
          .style("height", mapHeight+"px")
          .style("width", mapWidth+"px")
          .style("z-index", 15)
   
    mapMenu = container.append("div")
          .attr("id", "mapMenu")
          .attr("class", "mapMenu")
          .style("position", "absolute")
          .style("background-color", "#e3ddd7")
          .style("top", 0+"px")
          .style("height", 48+"px")
          .style("width", 100+"%")
          .style("opacity", 0.95)
          .style("z-index", 10)
          
      
          
    // mapMenu.append("div")
    //       .attr("id", "mapMenu")
    //       .attr("class", "mapMenu")
    //       .style("position", "absolute")
    //       .style("background-color", "#e3ddd7")
    //       .style("top", 0+"px")
    //       .style("height", 48+"px")
    //       .style("width", 100+"%")
    //       .style("z-index", 10)      

    mapMenu.append("div")
      .attr("class", "vLine")
      .style("position", "absolute")
      .style("margin-top", 0.5+"em")
      .style("margin-bottom", 0.5+"em")
      .style("left", mapWidth/2+"px")
      .style("height", 2+"em")
      .style("z-index", 15);


     var layerList = mapMenu.append('div')
        .attr("class", "layerList")
        .attr("id", "layerList")
        .style("position", "absolute")
        .style("top", 4+"px")
        .style("left", 0.25+"em,")
        .style("padding", 8+"px")
        .style("width", mapWidth/2-16+"px")
        .style("z-index", 10)
        .on("mouseover", function(d) {
            d3.select("body").style("cursor", "pointer");
          })                  
         .on("mouseout", function(d) {       
            d3.select("body").style("cursor", "default");
          })
        .on("click", function(d){
            if(llActive){
              llActive=false;
              deActivateLayerMenu(dataMenu.length);

            }else{
              llActive=true;
              activateLayerMenu(dataMenu.length);

            }

         });

    layerList.append("object")
      .attr("class", "mapIcon")
      .attr("data", "images/svg/icon_layers.svg")
      .attr("type", "image/svg+xml") 
      .style("position", "relative")
      .style("left", 0.5+"em")

    layerList.append("vLine")
      .attr("class", "vLine")
      .style("position", "absolute")
      .style("margin-top", 0.5+"em")
      .style("margin-bottom", 0.5+"em")
      .style("left", 3+"em")
      .style("top", 0+"em")
      .style("height", 1.5+"em"); 

     layerList.append("h3")
        .style("position", "absolute")
        .style("margin-top", 0.5+"em")
        .style("margin-bottom", 0.5+"em")
        .style("left", 3+"em")
        .style("top", 0+"em")
        .style("height", 1.5+"em")
        .text("Layers")

     dropDownLayers=container.append('div')
        .attr("id", "dropDownLayers")  
        .style("background-color", "#e3ddd7")
        .style("position", "absolute")
        //.style("top", -mapWidth+"px")
        .style("top", 48+"px")
        .style("left", -300+"px")
        .style("width", mapHeight/2+"px")
        .style("z-index", 0)
        .style("opacity", 0)
    
        dropDownLayers.append("hLine")
          .attr("class", "hLine")
          .style("position", "relative")
          .style("margin-top", 0+"em")
          .style("left", 1+"em")
          .style("width", 90+"%")    

    var div = dropDownLayers.selectAll("div")
      .data(dataMenu)
      .enter().append("div")
        
        .style("background-color", "#e3ddd7")
        .style("position", "relative")
        //.style("top", 48+"px")
        //.style("height", 100+"px")
        .style("width", 100+"%")
        
    div.append("object")
          .attr("class", "mapIcon")
          .attr("id", function(d) { return "icon_"+d.id} )
          .attr("data", function(d) { return d.icon})
          .attr("type", "image/svg+xml")
          .attr("transform", function() { return "translate(" + 0 + "," + 0 + ")scale("+ 0.5 +")"; })
          .style("position", "relative")
          // .style("width", 24+"px")
          // .style("height", "auto")
          .style("top", 0.5+"em")
          .style("left", 0.5+"em");
     
    div.append("h3")
          .style("position", "absolute")
          .style("top", 0.5+"em")
          .style("left", 3+"em")
          .text(function(d) { return d.id}) 
          
    div.append("hLine")
      .attr("class", "hLine")
      .style("position", "relative")
      .style("margin-top", 0+"em")
      .style("left", 3.5+"em")
      .style("width", 76+"%") 
      
    div.append("vLine")
        .attr("class", "vLine")
        .style("position", "absolute")
        .style("margin-top", 0+"em")
        .style("left", 3+"em")
        .style("top", 0.5+"em")
        .style("height", 80+"%")
    
    div.selectAll("ul")
      .data(function(d) { 
        var layers=[];
        d.subDomains.forEach(function(domain){
            if(domain.mapLayers){
              //console.log(domain.mapLayers);
              domain.mapLayers.forEach(function(layer){
                layers.push(layer)
              })
              //return d.mapLayers;
            }
            
        })
        return layers;

      }) 
      .enter()
        .append("li")
        .attr("id", "inActive")
        .style("position", "relative")
        .style("left", 4+"em")
        .style("top", -0.5+"em")
        .style("list-style-type", "none")
        .append("h4")
        .html(function(d) {
          var label="<img src=images/icon_plus-8.png> "+d.label 
          return label;
          
          })
        .on("mouseover", function(d) {
            d3.select("body").style("cursor", "pointer");
          })                  
         .on("mouseout", function(d) {       
            d3.select("body").style("cursor", "default");
          })
        .on("click", function(d){
              var label;
              if(d.sdkData){
                if(d.mapActive){
                  label="<img src=images/icon_plus-8.png> "+d.label;
                  d.mapActive=false;
                }else{
                  label="<img src=images/icon_min-8.png> "+d.label 
                  d.mapActive=true;
                }
                setMap(d);
                
              }else{
                label="<img src=images/icon_min-8.png> "+d.label 
                createLayerObject(d);
              }
              
              d3.select(this).html(label);         
              
         })
    deActivateLayerMenu();     
        
    div.append("hLine")
      .attr("class", "hLine")
      .style("position", "relative")
      .style("margin-top", 0+"em")
      .style("left", 1+"em")
      .style("width", 90+"%") 

      setMainMap();   
        
  }
  
  function updateMenuLayerList(){
    
  }
  
  function setMainMap(){
    var layer={};
    layer.id="mainMap";
    layer.layerId="map_"+layer.id;
    layer.url=mainMapUrl;
    layer.mapId="main-map";
    layer.sdkPath=false;  
    layer.mapActive=true;
    layer.sdkData=[];
    layer.mapData=[];
    layer.page=1;
    map.append("g")
      .attr("id", layer.mapId)
      .attr("class", "Oranges")
      .style("position", "absolute")
      .style("width", mapWidth)
      .style("height", mapHeight)
      .style("top", 0+"px")
      .style("left", 0+"px")
            
    getGeoData(layer);
        
  }
  
  
  function activateLayerMenu(){
      //console.log(index);

      dropDownLayers.transition()
          .duration(250)
          .style("top", 48+"px")
          .style("left", 0+"px")
          .style("opacity", 0.95)   
    
  }
  
  function deActivateLayerMenu(){
          
      dropDownLayers.transition()
          .duration(250)
          .style("top", 48+"px")
          .style("left", -(mapWidth/2)+"px")  
          //.style("opacity", 0) 
          //.each("end", function() { dropDownLayers.style("visibility", "hidden") }); 
    
  }
  
  function getGeoData(layer){
      
      console.log("loading layer data :"+layer.mapId+" --> page:"+layer.page);
      d3.json(layer.url+"&page="+layer.page, function(results){
    		//console.log("results :"+results.results.length);
    		layer.sdkData=layer.sdkData.concat(results.results);

    		if(results.results.length>=1000){

    		  var newPage=parseInt(layer.page+1);
    		  //console.log("getting data page :"+newPage);
    		  layer.page=newPage;
    		  getGeoData(layer);
    		  return;
    		}
        // rewrite results to geojson and prepare v=isualisation values

        layer.sdkData.forEach(function(d){
                   
          // redefine data structure for d3.geom
          if(d.geom){
              d.label="";
            
            	d.type="Feature";
        			d.geometry=d.geom;
        			delete d.geom;
        			d.centroid = path.centroid(d);
        			d.bounds= path.bounds(d);
              layer.geomType=d.geometry.type;
              if(layer.sdkPath=="mainMap"){
                d.value=8;
              }else if(layer.id=="cbs"){
                d.value=d.layers.cbs.data[layer.defaultLayer];
                //console.log(d.value);
              
              }else if(layer.sdkPath=="layers:divv.parking.capacity:data"){
                d.value= (d.layers["divv.parking.capacity"].data.FreeSpaceShort+d.layers["divv.parking.capacity"].data.FreeSpaceLong)/(d.layers["divv.parking.capacity"].data.ShortCapacity+d.layers["divv.parking.capacity"].data.LongCapacity)
                if(d.value<0 || isNaN(d.value) || d.value=="Infinity" || d.value==null){
                  d.value=Math.random();
                };
                
                //console.log("parking value ="+d.value);
              }else if(layer.sdkPath=="layers:divv.traffic:data"){
                  var g= d.layers["divv.traffic"];
                  var tt=parseInt(g.data.traveltime);
                  var tt_ff=parseInt(g.data.traveltime_freeflow);
                  d.value=tt/tt_ff;            
                  d.velocity=g.data.velocity;
                  d.maxVelocity=Math.round(d.value*tt_ff);
              }else if(layer.id=="ptstops"){
                  d.value=0.5;
                                    
              }else if(layer.id=="sck"){
                d.value=0.25;
              }else{
                  d.value=0.1+(Math.random()*0.9);
              }
              
              //console.log("trafel perc ="+d.value);
              if(d.value<0 || isNaN(d.value) || d.value=="Infinity" || d.value==null){
                d.value=0;
              };

          }
           
      	  });

          layer.range=getRange(layer);
          
          // get the delayed stops
          if(layer.id=="ptstops"){
            d3.json(apiUrlDB+"/transport.pt.stopsdelayed/admr.nl.amsterdam/live", function(results){
                comparePTstops(results["transport.pt.stopsdelayed:admr.nl.amsterdam"]);
                //console.log("results ptstops live "+results);
            });
            
            
          }else{
            setMap(layer);
          }

          

    		});
      

  };
  
  function comparePTstops(data){
    
    for(var i=0; i<cachedLayers.length; i++){
      if(cachedLayers[i].mapId=="map_transport_ptstops"){
        cachedLayers[i].sdkData.forEach(function(d){
          for(var j=0; j<data.length; j++){
            if(d.cdk_id==data[j].cdk_id){
              d.value=parseInt(data[j].delay);
              //console.log("changing value --> delayed:"+d.cdk_id);
            }            
          }

        });        
        cachedLayers[i].range=getRange(cachedLayers[i]);
            
        setMap(cachedLayers[i]);
        
        return;
        
      }
    
    };    
  }
  
  function getRange(layer){
    
    var data=layer.sdkData;
      
    
    var min=d3.min(data, function(d) { 
      if(d.value!=null && isNaN(d.value)==false && d.value){
        return d.value; 
      }
    });

    var max=d3.max(data, function(d) { 
      if(d.value!=null && isNaN(d.value)==false && d.value){
        return d.value; 
      }

    });
  	var range = max-min;
  	var values={min:min, max:max, range:range};
	  return values;

  }
  
  function setMap(layer){
    console.log("updating map layer :"+layer.mapId);   
    if(layer.mapActive){
      layer.mapData=layer.sdkData;
    }else{
      layer.mapData=[];
    }

    if(layer.geomType=="MultiPolygon" || layer.geomType=="Polygon"){
      updatePolygonMap(layer);
    }else if(layer.geomType=="MultiLineString" || layer.geomType=="LineString"){
      updateLinestringMap(layer);
    }else if(layer.geomType=="MultiPoint" || layer.geomType=="Point"){
      updatePointMap(layer);
    }
  }

   updatePolygonMap = function (layer){
          
     var data = layer.mapData;
     var layerId=layer.mapId;

     var max =  d3.max(data, function(d) { return d.value; });
     var min =  d3.min(data, function(d) { return d.value; }); 
     var quantizeBrewer = d3.scale.quantile().domain([min, max]).range(d3.range(rangeCB));

     var visMap=d3.select("#"+layerId);
     var vis=visMap.selectAll("path").data(data, function(d, i){return d.cdk_id});

     vis.enter().append("path")
   			  .attr("id", function(d, i){return d.cdk_id;})
   			  .attr("d", path)
   			  .style("fill", function(d){ 
   			    if(layer.id!="mainMap"){
   			      return colorbrewer[colorScheme]['9'][quantizeBrewer([d.value])] }
   			    })
   			  .style("fill-opacity", function(){
   			    if(layer.id=="mainMap")  return 0.35  
   			    })  
   			  .style("opacity", 0)
   			  .on("mouseover", function(d){
   			    
   			    if(layer.id=="mainMap")return;
   			    d3.select(this).style("stroke-width", 0.25+"px" );
   			    d3.select(this).style("fill", "#f3ece5" );
  			    
  			    var label = setToolTipLabel(d, layer.sdkPath);
  			    showToolTip(label);
         
            })
      			.on("mouseout", function(d){
      			  if(layer.id=="mainMap")return;
      			  d3.select(this).style("stroke-width", 0.05+"px" );
      			  d3.select(this).style("fill", function(d){ return colorbrewer[colorScheme]['9'][quantizeBrewer([d.value])] })
              hideToolTip();
      			})
      			.on("mousemove", function(d){
      			  updateToolTipPosition(d3.event.pageX, d3.event.pageY)      			  
      			})
    			  .on("click", function(d){
    			    if(layer.id=="mainMap")return;
    			        			    
      			})
      			
        vis.transition()
            .duration(1000)
            .style("fill", function(d){ 
              if(layer.id!="mainMap"){
     			      return colorbrewer[colorScheme]['9'][quantizeBrewer([d.value])] }
     			    })
            .style("opacity", 0.75)

         vis.exit().transition()
             .duration(500)
            .style("opacity", 0 )
            .remove();			

  };
  
  updateLinestringMap = function(layer){
    
    var data=layer.mapData;
    var layerId=layer.mapId;

    
    var quantizeBrewer = d3.scale.quantile().domain([layer.range.min, layer.range.max]).range(d3.range(9));
    var scalingGeo = d3.scale.linear().domain([layer.range.min, layer.range.max]).range(d3.range(100));
	  
    // var color = d3.scale.linear()
    //             .domain([1, max])
    //             .range(['#333', '#F16912']);

  	var visMap=d3.select("#"+layerId);
    var vis=visMap.selectAll("path").data(data, function(d, i){return d.cdk_id});

		vis.enter().append("path")
  			  .attr("id", function(d, i){return d.cdk_id})
  			  .attr("d", path)
  			  .style("fill", "none")
  			  .style("stroke-width", function(d){return 0})
  			  .style("stroke", function(d){ return colorbrewer[colorScheme]['9'][quantizeBrewer([d.value])] })
  			  .on("mouseover", function(d){
  			    var label = setToolTipLabel(d, layer.sdkPath);
  			    showToolTip(label);   
            })
      		.on("mouseout", function(d){
			      hideToolTip();			  
    			})
    			.on("mousemove", function(d){
    			  updateToolTipPosition(d3.event.pageX, d3.event.pageY)      			  
    			})
  			  .on("click", function(d){
  			        			    
    			})
  			
  	    vis.transition()
            .duration(500)
            .style("stroke", function(d){ return colorbrewer[colorScheme]['9'][quantizeBrewer([d.value])] })
            .style("stroke-width", function(d){return (d.value/2)})

         vis.exit().transition()
            .duration(250)
            .style("opacity", 0)
            .remove();		  

	}
	
	updatePointMap = function(layer){

	  if(layer.id=="sck" || layer.id=="parking"){
	    updateLabelsMap(layer);
	    return;
	  };
	  
	  var data=layer.mapData;
    var layerId=layer.mapId;

    var quantizeBrewer = d3.scale.quantile().domain([layer.range.min, layer.range.max]).range(d3.range(9));
    var scalingGeo = d3.scale.linear().domain([layer.range.min, layer.range.max]).range(d3.range(100));

  	var visPointMap=d3.select("#"+layerId);
    var vis = visPointMap.selectAll("path").data(data, function(d, i){return d.cdk_id});

		vis.enter().append("path")
		     //.filter(function(d){ return d.value > 2; })
  			  .attr("id", function(d, i){return d.cdk_id})
  			  .attr("d", function(d){
            path.pointRadius(1);
            return path(d);
          })
  			  //.style("fill-opacity", 1)
  			  .style("stroke-width", 0.1+"px")
  			  //.style("opacity", 0)
  			  .style("fill", function(d){ return colorbrewer[colorScheme]['9'][quantizeBrewer([d.value])] })
          .on("mouseover", function(d){
            var label;                    
              if(layer.sdkPath=="dummy"){
                  label+="value : (dummy) "+d.value.toFixed(2);  
              }else if(layer.type=="realtime"){
                 d3.select("body").style("cursor", "pointer");
                  if(d.value>0.5){
                    label="Name :"+d.name+"<br>avg. delay:"+d.value+" sec.<br>Click to load realtime schedule";
                  }else{
                    label="Name :"+d.name+"<br>Trips on schedule<br>Click to load realtime schedule";
                  }
                 
                  
              }else{
                  label = setToolTipLabel(d, layer.sdkPath);
                
              }
              showToolTip(label);
            })
      		.on("mouseout", function(d){
      		  d3.select("body").style("cursor", "default");			  
    			  hideToolTip();
    			})
    			.on("mousemove", function(d){
    			  updateToolTipPosition(d3.event.pageX, d3.event.pageY)      			  
    			})
  			  .on("click", function(d){
  			    if(layer.type=="realtime"){
      			    toolTip.transition()        
                  .duration(100)      
                  .style("opacity", .9); 
                  toolTip.html("name :"+d.name+"<br>Loading realtime schedules")  
                      .style("left", (d3.event.pageX) + 5+"px")     
                      .style("top", (d3.event.pageY - 28 - 5) + "px");
                  var label;
                    var url ="http://api.citysdk.waag.org/"+d.cdk_id+"/select/now";
                    console.log(url);
                
                    d3.json(url, function(results){
                      label="";
                  
                      results.results.forEach(function(d){

                        label+=d.route_id+" - "+d.headsign+"<br>";
                        d.times.forEach(function(k){
                          label+=k+"<br>"
                        });
                    
                    
                      });

                      toolTip.html("name :"+d.name+"<br>"+label)  
                    });   
                  }
  			        			    
    			})
    		  	    
  	    vis.transition()
            .duration(1000)
            //.style("opacity", 1)
            .style("fill", function(d){ 
                if(d.layer=="divv.parking.capacity"){
                    return colorbrewer[colorScheme]['9'][0];
                 }else{
                   return colorbrewer[colorScheme]['9'][quantizeBrewer([d.value])]
                 }
              })
            .style("stroke-width", function(d){ 
                if(d.layer=="divv.parking.capacity"){
                    return 0.5+"px";
                 }
              })  
            .attr("d", function(d){
              if(d.layer=="divv.parking.capacity"){
    			      var v= d.value;
    			      if(d.value!=null || isNaN(d.value)==false){
                  v=Math.random();
                }
    			      path.pointRadius(3+(v*4));
    			    }else if(d.layer=="gtfs"){

    			      var v=0.5+(d.value/60);
    			      if(v<0.5) v=0.5;
    			      if(d.value==null || isNaN(d.value) ){
                  v=0.5;
                }
                if(v>5) v=5;
                
    			      path.pointRadius(v);
    			    }else{
    			      path.pointRadius(d.value);
    			    }
              
              return path(d);
            })

         vis.exit().transition()
            .duration(500)
            .style("opacity", 0 )
            .remove();
        
  
	};
	
	updatePieCharts = function (layer){
	  
	}
	
	updateLabelsMap = function(layer){
	  
	  var labelId;
	  if(layer.id=="sck"){
	    labelId="#label_sck";
	  }else if(layer.id=="parking"){
	    labelId="#label_parking-building";
    }
	  
	  
	  var data=layer.mapData;
    var layerId=layer.mapId;
    
  	var visPointMap=d3.select("#"+layerId);
    //var vis = visPointMap.selectAll("path").data(data, function(d, i){return d.cdk_id});

	  var labels = visPointMap.selectAll("use").data(data, function(d, i){return d.cdk_id}); 
    
    var s=0.25;
    var wLabel=32;
    
    labels.enter().append("use")
          .attr("transform", function(d) { 
            var s=d.value/2;
            if(s<0.25) s=0.25;
            var w=(wLabel/2)*s;
            return "translate(" + ( (d.centroid[0])- w ) + "," + ( (d.centroid[1])- w )+ ")scale("+ s +")"; })
          .attr("width", 10+"px")
          .attr("height", 10+"px")
          .attr("xlink:href", labelId)
          .style("fill", "#666")
          .on("mouseover", function(d){
            
            var label;
            toolTip.transition()        
              .duration(100)      
              .style("opacity", .9); 
                    
              if(layer.sdkPath=="dummy"){
                  label+="value : (dummy) "+d.value.toFixed(2);  
              }else if(layer.type=="realtime"){
                  label="Name :"+d.name+"<br>Click to load realtime schedule";
              }else{
                  label = setToolTipLabel(d, layer.sdkPath);
                
              }
              showToolTip(label);
   
          })
      		.on("mouseout", function(d){		  
    			  hideToolTip();
    			})
    			.on("mousemove", function(d){
    			  updateToolTipPosition(d3.event.pageX, d3.event.pageY)      			  
    			})
    			
	    labels.exit().remove();		
	  
  }

  
  addDomainLayer = function(_properties){

    var layers=_properties.subDomains;
    var dataLoaded=false;
    
    for(var i=0; i<cachedLayers.length; i++){
      cachedLayers[i].mapActive=false;
    };
 
    for(var i=0; i<layers.length; i++){
          if(layers[i].mapLayers){
            for(var j=0; j<layers[i].mapLayers.length; j++){
              if(layers[i].mapLayers[j].sdkData){
                    for(var l=0; l<cachedLayers.length; l++){
                      if(cachedLayers[l].mapId==layers[i].mapLayers[j].mapId){
                        console.log("already loaded map data");
                        layers[i].mapLayers[j].mapActive=true;
                      }
                    }

                   dataLoaded=true;

              }
            }
          }
      }
      
      for(var i=0; i<cachedLayers.length; i++){
        setMap(cachedLayers[i]);
        //cachedLayers[i].mapActive=false;
      };  

    
    if(dataLoaded) {
      console.log("data loaded --> no api call")
      return;
    };

    for (var i=0; i<layers.length; i++){
      
      if(layers[i]!=false && layers[i].mapLayers!="dummy" && layers[i].mapLayers!=false ){
        
        for(var j=0; j<layers[i].mapLayers.length; j++){
            layers[i].mapLayers[j].domainId=_properties.id;
            var layer=createLayerObject(layers[i].mapLayers[j]);
            
        }
           
      }
      
    }

  };
  
  function createLayerObject(layer){
    
    //layer.domainId=mapId;
    layer.mapId="map_"+layer.domainId+"_"+layer.id;

    console.log("creating map layer :"+layer.mapId);
      
      map.append("g")
        .attr("id", layer.mapId)
        .attr("class", "Oranges")
        .style("position", "absolute")
        .style("width", mapWidth)
        .style("height", mapHeight)
        
      layer.mapActive=true;
      layer.sdkData=[];
      layer.mapData=[];
      layer.page=1;
    
      cachedLayers.push(layer);  
 
      getGeoData(layer);
    
  }
  
  function zoomed() {
	    //console.log(d3.event);
      map.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  };
  
  
  
  function setToolTipLabel(_data, _path){
    var v = _data;
    _path.split(":").forEach(function(d) { v = v[d]; });
    
    var label=_data.name+"<br>";
		for(var key in v) {
			label+=key+": "+v[key]+"<br>"
			//console.log(key+" --> "+v[key])
		};
		
		return label;

  };
  
  updateCbs = function(_properties){
    _properties.mapLayers[0].sdkData.forEach(function(d){
      d.value=parseInt(d.layers.cbs.data[_properties.mapLayers[0].defaultLayer]);
      if(d.value<0 || isNaN(d.value) || d.value=="Infinity"){
        d.value=0;
      };
      
    })
    setMap(_properties.mapLayers[0]);
    
    console.log("updating cbs "+_properties.mapLayers[0].defaultLayer);
  };

  init();
  this.addDomainLayer=addDomainLayer;
  this.updateCbs=updateCbs;
  return this;   

};