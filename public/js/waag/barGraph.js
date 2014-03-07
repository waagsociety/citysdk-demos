WAAG.BarGraph = function BarGraph(properties, _subDomain, domainColor) {

  //console.log("bargraph contructor");
  
  var margin = {top: 20, right: 40, bottom: 30, left: 20},
      width = 350 - margin.left - margin.right,
      height = 100 - margin.top - margin.bottom;
      
  var xaxis, yaxis, svgDomain;
  var activeIndex=0;  

	function init(){

    var data = properties.tickerData.data[0].kciData;
	  
	  var subDomain = _subDomain;
      svgDomain = subDomain.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .style("position", "absolute")
        .style("left", 1+"em")
        .style("top", 2.5+"em")
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    x = d3.scale.ordinal()
       .rangeRoundBands([0, width], 0.1);
    x.domain(data.map(function(d) { return d.hour; }));
    
    y = d3.scale.linear()
       .range([height, 0]);
    y.domain([0, d3.max(data, function(d) { return d.value; })]);    

   xAxis = d3.svg.axis()
         .scale(x)
         .orient("bottom")
         .tickValues([0, 6, 12, 18, 23])

   svgDomain.append("g")
       .attr("class", "x axis")
       .attr("id", "x_axis")
       .attr("transform", "translate(0," + height + ")")
       .call(xAxis)
       .append("text")
         .attr("id", "x_axis_label")
         .attr("x", 16)
         .attr("y", 6)
         .attr("dy", "1em")
         .style("text-align", "center")
         .text("time (hours)")

    yAxis = d3.svg.axis()
             .scale(y)
             .orient("right")
             .ticks(4);

       svgDomain.append("g")
           .attr("class", "y axis")
           .attr("id", "y_axis")
           .attr("transform", "translate(" + width + ",0)")
           .call(yAxis)    
         .append("text")
           .attr("id", "y_axis_label")
           .attr("transform", "rotate(-90)")
           .attr("y", 6)
           .attr("dy", "-38em")
           .style("text-anchor", "end")
           .style("text-align", "center")

       svgDomain.selectAll("#y_axis")
         .append("text")
           .attr("id", "y_axis_units")
           .attr("y", 0)
           .attr("x", 8)
           .style("text-align", "right")

       svgDomain.selectAll("#y_axis")
         .append("text")
           .attr("id", "y_axis_units_min")
           .attr("y", height+6)
           .attr("x", 8)
           .style("text-align", "right")
           // /.text("test")
              
    initted=true;

    updateDataSet(properties, properties.tickerData.data[0].kci, 0);      
    

  };

	function updateGraph(data, description, yUnits){
	  	  	  
	  var range=getRange(data);
	  
	  data.forEach(function(d){ 
	      if(isNaN(d.value)) d.value=range.min;
	      if(!d.value) d.value=range.min;
	      //console.log(d.value);
  
	  });
	  
	  y.domain([range.min, range.max]); 
	  //y.domain([0, max]); 
	  
	  var yAxis = d3.svg.axis()
             .scale(y)
             .orient("right")
             .ticks(2)
             //ticksValues([20,30,40]);
    
    var time=250+(Math.random()*750);
	  
    svgDomain.select("#y_axis")
        .transition().duration(time)
        .call(yAxis);  

    svgDomain.select("#y_axis_label")
        .html(description+" "+yUnits)
        
    // svgDomain.select("#y_axis_units")
    //     .text(maxRound+" "+yUnits);
    //     
    // svgDomain.select("#y_axis_units_min")
    //     .text(parseInt(min));
   
    var vis=svgDomain.selectAll(".bar").data(data, function(d, i){return i});
    
    vis.enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.hour); })
        .attr("width", x.rangeBand())
        //.attr("y", function(d) {  return y(0); })
        .attr("y", 0)
        .attr("height", function(d) { 
            //console.log("heigth ="+height - y(0))
            if(d.value==range.min){
              //console.log(d);
            }
            
            if(height - y(0)<0){
              return height-0;
            }else{
              return height - y(0); 
            }  
          })
          
          
        .style("fill", function(d) { if(d.hour>hNow) return domainColor })
        .style("stroke-width", function(d) { if(d.hour>hNow) return 0.25+"px" })
        //.style("shape-rendering", function(d) { if(d.hour>hNow) return "crispEdges" })
        .style("stroke", function(d) { if(d.hour>hNow) return "#666" })
        .on("mouseover", function(d) {
          
              toolTip.transition()        
                  .duration(100)      
                  .style("opacity", .9);
              toolTip.html(d.realTimestamp+ "<br>Description: "+d.description+"<br>Value: "  + d.value.toFixed(2)+" "+d.units)  
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
			      
			    });

        
    vis.transition()
        .duration(time)
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); });
        
    vis.exit().transition()
        .duration(time)
        .style("opacity", 0 )
        .remove();        

	};
	
  
  updateDataSet = function(_properties, kci, index){
    
    console.log("updating data set "+kci);
    activeIndex=index;
    _properties.tickerData.data[index].kciData.forEach(function(d){
      for(var i=0; i<d.value; i++){
        d.description=properties.tickerData.data[index].description;
        d.units=properties.tickerData.data[index].units;
      }
      
    })

    updateGraph(_properties.tickerData.data[index].kciData, properties.tickerData.data[index].description, properties.tickerData.data[index].units);
  }
  
  this.updateDataSet=updateDataSet;
  init();
  return this;   

};