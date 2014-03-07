WAAG.SunburstGraph = function SunburstGraph(properties, _subDomain, donutType, domainColor) {

  var width=150;
  var height=150;    
  var svgDomain;
  var activeIndex=0;

  var r = Math.min(width, height) / 2;
  var labelR = r + 50; // radius for label anchor
  var arc, pie;
  var donut;
  var partition;
  
  var tickData;
  
  function init(){
    
    //var defaultLayer=properties.tickerData.layers[0].value;    
    var data = prepareDataSet(properties.tickerData.data[0].kciData, properties.tickerData.data[0].description);

	  //var data = properties.tickerData.data[0].kciData;
	  var subDomain = _subDomain;
        
    svgDomain = subDomain.append("svg")
      .attr("width", width+"px")
      .attr("height",height+"px")
      .style("position", "absolute")
      .style("left", 14+"em")
      .style("top", -1.5+"em")
      //.attr("transform", "translate(" + 0 + "," + 240 + ")")
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
                
    pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.tick; });    
         
    partition = d3.layout.partition()
        .sort(null)
        .size([2 * Math.PI, r * r])
        .value(function(d) { return 1; });
        
    arc = d3.svg.arc()
        .startAngle(function(d) { return d.x; })
        .endAngle(function(d) { return d.x + d.dx; })
        .innerRadius(function(d) { return Math.sqrt(d.y)-10; })
        .outerRadius(function(d) { return Math.sqrt(d.y + d.dy)-10; });    
  
    updateGraph(data);

  };
  
  function prepareDataSet(data, description){
    
    // /var dataSunburst=
    data.forEach(function(d){
	    d.tick = 1;
	    d.stackValue=d.value;
	    d.description=description;	     
    });
    
    var dataSunburst={description:description, children:data};
    
    return dataSunburst;
    
  }

  function updateGraph(data){
    
    var time=250+(Math.random()*750);
    var max =  d3.max(data.children, function(d) { return d.value; });
    var min =  d3.min(data.children, function(d) { return d.value; }); 
    var quantizeBrewer = d3.scale.quantile().domain([0, 24]).range(d3.range(rangeCB));
    var value =   function() { return 1; };  
    
    var path = svgDomain.datum(data).selectAll("path")
          .data(partition.nodes)
        .enter().append("path")
          .attr("display", function(d) { 
            return d.depth ? null : "none"; }) // hide inner ring
          .attr("d", arc)
          .style("stroke", "#666")
          .style("fill", function(d){
              return colorbrewer[colorScheme]['9'][quantizeBrewer((d.children ? d : d.parent).hour)]  
              // if((d.children ? d : d.parent).hour>hNow){
              //   //console.log(domainColor);
              //   return domainColor;
              // }else{
              //   //console.log("future");
              //   return colorbrewer[colorScheme]['9'][quantizeBrewer((d.children ? d : d.parent).hour)]
              // }
            })
          .style("stroke-width", function(d){
              if((d.children ? d : d.parent).hour<=hNow){
                return 1+"px";
              }else{
                return 0.5+"px";
              }
            })  
            .on("mouseover", function(d) {
                  var label="time :"+d.hour+":00 hour<br/>Name :"+d.name+"<br> description :"+d.description;
                  if(d.children){
                    label=d.children.length+" - events at "+d.hour+":00";
                  }else{
                     var date=new Date();
                     date.setTime(d.timestamp*1000);
                     d.realTimestamp=date;
                    label=d.description+"<br>"+d.realTimestamp;
                  }

                  toolTip.transition()        
                      .duration(100)      
                      .style("opacity", .9);
         
                  toolTip.html(label)  
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
          .each(stash)

    

    path.data(partition.value(value).nodes)
        .transition()
        .duration(1500)
        .attrTween("d", arcTween);
    

	};
	
	// Stash the old values for transition.
  function stash(d) {
    d.x0 = d.x;
    d.dx0 = d.dx;
  }
  
  // Interpolate the arcs in data space.
  function arcTween(a) {
    var i = d3.interpolate({x: a.x0, dx: a.dx0}, a);
    return function(t) {
      var b = i(t);
      a.x0 = b.x;
      a.dx0 = b.dx;
      return arc(b);
    };
  }

	function updatePie(data){
	    
	    //data.sort(function(a, b) { return d3.ascending(a.value, b.value)});
	    var max =  d3.max(data, function(d) { return d.value; });
      var min =  d3.min(data, function(d) { return d.value; }); 
      var quantizeBrewer = d3.scale.quantile().domain([min, max]).range(d3.range(rangeCB));
	  
      var time=250+(Math.random()*750);
      donut.data(pie(data));
      donut.transition()
        //.style("fill", function(d){ return colorbrewer[colorScheme]['9'][quantizeBrewer(d.value)]})
        .duration(time).attrTween("d", arcTween); // redraw the arcs

  }
  
	
  updateDataSet = function(_properties, index){
    
    // console.log("updating data set "+layer);
    // activeIndex=index;
    // updateGraph(_properties.tickerData.data[index].kciData, properties.tickerData.data[index].description);
    // 
    // 
    // var data = prepareDataSet(layer);
    // 
    // updatePie(data);
  }
    
  this.updateDataSet=updateDataSet;
  init();
  return this;   
 

};