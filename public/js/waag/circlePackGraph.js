WAAG.CirclePack = function CirclePack(properties, _subDomain, domainColor) {

  //console.log("linegraph contructor");
  
  var margin = {top: 20, right: 40, bottom: 30, left: 20},
      width = 350 - margin.left - margin.right,
      height = 90 - margin.top - margin.bottom;
      
  var svgDomain;
  var activeIndex=0;
  var pack;
  var circlePackSize=140;
  // var quantizeBrewer;
  // var min, max;
  
  function init(){
    var defaultLayer=properties.tickerData.layers[0].value;    
    var data = prepareDataSet(defaultLayer);
        
	  var subDomain = _subDomain;

    svgDomain = subDomain.append("svg")
      .attr("width", 140+"px")
      .attr("height", 140+"px")
      .style("position", "absolute")
      .style("left", 14+"em")
      .style("top", -1+"em")
      //.attr("transform", "translate(" + 0 + "," + 240 + ")")
      .append("g")
         
    pack = d3.layout.pack()
      .size([circlePackSize, circlePackSize])
      .value(function(d) { return d.value })
      
                

    updateGraph(data);

  };
  
  function prepareDataSet(layer){
    var data=[];
    for(var i=0; i<properties.tickerData.data[0].sdkResults.length; i++){
      
      if(properties.tickerData.data[0].sdkResults[i].layers.cbs.data[layer]){
        
        var v=properties.tickerData.data[0].sdkResults[i].layers.cbs.data[layer]
        var name=properties.tickerData.data[0].sdkResults[i].name
        var object={name:name, value:parseInt(v)};
        
        data.push(object);
      }
    };
    
    for(var i=0; i<data.length; i++){
      //console.log("value "+data[i].value+" -->"+data[i].name);
      if(data[i].value<=0){
        console.log("value "+data[i].value+" -->"+data[i].name);
        data[i].value=1;
        
      }
      
    };
    
    return data;
    
  }
  
  function updateGraph(data){
    var time=250+(Math.random()*750);
    
    var max =  d3.max(data, function(d) { return d.value; });
    var min =  d3.min(data, function(d) { return d.value; }); 
    var quantizeBrewer = d3.scale.quantile().domain([min, max]).range(d3.range(rangeCB));
        
    var dataPack={children:data};
   
    var node = svgDomain.selectAll(".node").data(pack.nodes(dataPack), function(d){return d.name});

    node.enter().append("g")
            .classed("node", true)
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        .append("circle")
            .attr("fill", function(d){ return colorbrewer[colorScheme]['9'][quantizeBrewer(d.value)]})
            .attr("r", function(d) { return d.r; })
            .style("fill-opacity", 0.5)
            .style("stroke-width", 0.25+"px")
            .style("stroke", "#666")
            .style("stroke-width", 0.25+"px")
            .on("mouseover", function(d) {

                  toolTip.transition()        
                      .duration(100)      
                      .style("opacity", .9);      
                  toolTip.html("Name :"+d.name+"<br/>value: "  + parseInt(d.value))  
                      .style("left", (d3.event.pageX) + 10+"px")     
                      .style("top", (d3.event.pageY - 28 - 10) + "px");    
                  })                  
             .on("mouseout", function(d) {       
                toolTip.transition()        
                    .duration(250)      
                    .style("opacity", 0);   
            })
            .on("click", function(d){
                //updateDummySet(data);

    			    })

        
        //node.append("title").text(function(d) { return parseInt(d.value)})    

        node.transition()
            .duration(1000)
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        
        
        node.select("circle")
            .transition()
            .duration(1000)
            .attr("fill", function(d){ return colorbrewer[colorScheme]['9'][quantizeBrewer(d.value)]})
            .attr("r", function(d) { return d.r; })
             
        node.exit().transition()
          .attr("r", 0)
          .remove();

	};
  
	
  updateDataSet = function(_properties, layer){
    
    console.log("updating data set "+layer);
    var data = prepareDataSet(layer);

    updateGraph(data);
  }
    
  this.updateDataSet=updateDataSet;
  init();
  return this;   

};