WAAG.PieGraphStacked = function PieGraphStacked(properties, _subDomain, donutType) {

  var width=150;
  var height=150;    
  var svgDomain;
  var activeIndex=0;

  var r = Math.min(width, height) / 2;
  var labelR = r + 30; // radius for label anchor
  var arc, pie;
  var donut;
  
  function init(){
    
    //var defaultLayer=properties.tickerData.layers[0].value;    
    var data = prepareDataSet(properties.tickerData.data[0].kciData);
	  
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
         
    arc = d3.svg.arc()
      .outerRadius(r - 10)
      .innerRadius(function(){
        if(donutType){
          return r - 40
        }else{
          return 0
        }
      });

    pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.tick; });  
  
    updateGraph(data);

  };
  
  function prepareDataSet(data){
    
    data.forEach(function(d){
	    d.tick = 1;
	    d.stackValue=d.value;
	    //console.log("value ="+d.value);
	    //d.value=parseInt(Math.random()*10)
	     
    });
    
    return data;
    
  }

  function updateGraph(data){
    
    var time=250+(Math.random()*750);
    var max =  d3.max(data, function(d) { return d.value; });
    var min =  d3.min(data, function(d) { return d.value; }); 
    var quantizeBrewer = d3.scale.quantile().domain([min, max]).range(d3.range(rangeCB));
    
    //data.sort(function(a, b) { return d3.ascending(a.value, b.value)});
    
    donut = svgDomain.selectAll("path")
        .data(pie(data))
        .enter()
        .append("path")
        .style("opacity", 0.75)
        .style("stroke", "#666")
        .style("stroke-width", 0.25+"px")        
        .on("mouseover", function(d) {
              toolTip.transition()        
                  .duration(100)      
                  .style("opacity", .9);
              //console.log(d);          
              toolTip.html("value: "  + d.data.stackValue)  
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

      donut.transition()
          .duration(500)
          .style("fill", function(d){ 
            return colorbrewer[colorScheme]['9'][quantizeBrewer(d.data.stackValue)]})
          //.attr("d", arc) 
          .attr("d",
              d3.svg.arc()
              .outerRadius(r - 10)
              .innerRadius(r - 40)
              ) 
          .each(function(d) { this._current = d; }); // store the initial angles
          
      
      //var     
      var ticks = svgDomain.selectAll("line").data(pie(data)).enter().append("line");
      ticks.attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", -r+4)
      .attr("y2", -r-2)
      .attr("stroke", "gray")
      .attr("transform", function(d) {
        return "rotate(" + (d.startAngle+d.endAngle)/2 * (180/Math.PI) + ")";
      });      

	};
	
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
	
	// Store the displayed angles in _current.
  // Then, interpolate from _current to the new angles.
  // During the transition, _current is updated in-place by d3.interpolate.
  function arcTween(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
      return arc(i(t));
    };
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