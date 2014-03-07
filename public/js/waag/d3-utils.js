var bisectDate = d3.bisector(function(d) { return d.timestamp; }).left;
var ticksYaxis=2;
function mouseMove(x, y, mouse, data, focus) {
    
    var x0 = x.invert(mouse),
        i = bisectDate(data, x0, 1),
        d0 = data[i - 1],
        d1 = data[i],
        d = x0 - d0.timestamp > d1.timestamp - x0 ? d1 : d0;
    focus.attr("transform", "translate(" + x(d.timestamp) + "," + y(d.value) + ")");
    
    toolTip.transition()        
        .duration(100)      
        .style("opacity", 0.9);
        
    var timeLabel=formatDate(d.realTimestamp);    

    toolTip.html("Time : "+d.realTimestamp+ "<br/>Value "+d.description+" : "  +d.value.toFixed(2)+" "+d.units)  
        .style("left", (d3.event.pageX) + 10+"px")     
        .style("top", (d3.event.pageY - 28 - 10) + "px");
    
}
function mouseMoveMultiGraph(x, y, mouse, data, focus) {
    
    var x0 = x.invert(mouse),
        i = bisectDate(data, x0, 1),
        d0 = data[i - 1],
        d1 = data[i],
        d = x0 - d0.timestamp > d1.timestamp - x0 ? d1 : d0;
    focus.attr("transform", "translate(" + x(d.timestamp) + "," + 0 + ")");
    
    toolTip.transition()        
        .duration(100)      
        .style("opacity", 0.9);
    var label="";
    var v=d.value;  
    for(var key in v) {
			label+=key+": "+v[key]+"<br>"
		};    
    
    var timeLabel=formatDate(d.realTimestamp);
     
    toolTip.html("Time : "+d.realTimestamp+"<br/>"+label)  
        .style("left", (d3.event.pageX) + 10+"px")     
        .style("top", (d3.event.pageY - 28 - 10) + "px");
    
}

function formatDate(date){
  
  

  
}

function setVisualisationValues(data){
  
  
  
  // divv.parking.capacity": {
  //       "data": {
  //         "Name": "CE-P11 Waterlooplein",
  //         "PubDate": "2014-03-07T09:17:22.344Z",
  //         "Type": "parkinglocation",
  //         "Status": "warning",
  //         "FreeSpaceShort": 93,
  //         "FreeSpaceLong": 70,
  //         "ShortCapacity": 119,
  //         "LongCapacity": 79

  
}

function getRange(data) {

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
	var values;
	var ticks; 
	
	if(range<10){
	  min=parseInt(min);
	  max=Math.ceil(max);
	  ticks = (max - min) / 2;
	  values={min:min, max:max, ticks:ticks};
	  return values;
	}
	
	
	
	var ticksRoundUp = roundTicks(range / 2);
	
	/*
	 * Optie 1: yMin en yMax schalen op basis van omhoog afgeronde ticks
	 * Lelijk bij min = 4000.01 en max = 8000.01, wordt 4000-10000
	 * Daarnaast: min = 18 en max = 143 wordt 0-210, ondanks ticks=70 (143 / 70 > 2)
	 */
//	var ticks = ticksRoundUp;
//	ymin = Math.floor(min/ticks) * ticks;
//	ymax = Math.ceil(max/ticks) * ticks;
//	document.write('min = ' + min + '<br>max = ' + max + '<br> range = ' + range + '<br>------<br>ticks = ' + ticks + '<br>ymin = ' + ymin + '<br>ymax = ' + ymax);
	
	/*
	 * Optie 2: yMin en yMax schalen op basis van hun 'orde van grootte' en ticks daar op aanpassen 
	 */ 
	var ticksBase = baseNum(ticksRoundUp);
	
	ymin = Math.floor(min / ticksBase) * ticksBase;
	ymax = Math.ceil(max / ticksBase) * ticksBase;
	ticks = (ymax - ymin) / 2;
	
	console.log("ticks :"+ticks+" --> min :"+ymin+" --> max "+ymax);
  var values={min:ymin, max:ymax, ticks:ticks};
    
	//document.write('min = ' + min + '<br>max = ' + max + '<br> range = ' + range + '<br>baseticks = ' + ticksRoundUp + '<br>base = ' + ticksBase + '<br>---------<br>ymin = ' + ymin + '<br>ymax = ' + ymax + '<br>ticks = ' + ticks);
  return values;
}

function roundTicks(x) {
	if (x == 0) return 0;
	if (x < 10) return 10;
	var log10 = Math.log(x) / Math.log(10);
	var base = Math.pow(10, Math.floor(log10));
	return Math.ceil(x / base) * base;
}

function baseNum(x) {
	if (x == 0) return 0;
	var log10 = Math.log(x) / Math.log(10);
	return Math.pow(10, Math.floor(log10));
}

// function arrangeZindex(, domain){
//   var vis=d3.select("#cbs");
//  vis.moveToFront();
// 
//   vis=d3.select("#barChart");
//   vis.moveToFront();
// }



// function setXaxis(data, svgDomain, width, height, ticks, label, update){
// 
//   function setXaxis(data, svgDomain, width, height, ticks, label, update){
// 
//     var xAxis = d3.svg.axis()
//             .scale(x)
//             .orient("bottom")
//             .tickValues(ticks)
// 
//     if(!update){
//       svgDomain.append("g")
//           .attr("class", "x axis")
//           .attr("id", "x_axis")
//           .attr("transform", "translate(0," + height + ")")
//           .call(xAxis)
//           .append("text")
//             .attr("id", "x_axis_label")
//             .attr("x", 16)
//             .attr("y", 6)
//             .attr("dy", "1em")
//             .style("text-align", "center")
//             .text("time (hours)")
//     };
// 
//     return xAxis;
// 
//   }
// 
//   function setYaxis(data, svgDomain, width, height, ticks, label, update){
// 
// 
//    var yAxis = d3.svg.axis()
//             .scale(y)
//             .orient("right")
//             .ticks(ticks);
// 
//     if(!update){
//       svgDomain.append("g")
//           .attr("class", "y axis")
//           .attr("id", "y_axis")
//           .attr("transform", "translate(" + width + ",0)")
//           .call(yAxis)    
//         .append("text")
//           .attr("id", "y_axis_label")
//           .attr("transform", "rotate(-90)")
//           .attr("y", 6)
//           .attr("dy", "-38em")
//           .style("text-anchor", "end")
//           .style("text-align", "center")
// 
//       svgDomain.selectAll("#y_axis")
//         .append("text")
//           .attr("id", "y_axis_units")
//           .attr("y", 0)
//           .attr("x", 8)
//           .style("text-align", "right")
// 
//       svgDomain.selectAll("#y_axis")
//         .append("text")
//           .attr("id", "y_axis_units_min")
//           .attr("y", height+6)
//           .attr("x", 8)
//           .style("text-align", "right")
//           .text("test")
// 
// 
//     }
// 
// 
//     return yAxis;        
// 
//   }
//                 
//   return xAxis;
// 
// }
// 
// function setYaxis(data, svgDomain, width, height, ticks, label, update){
// 
//  var yAxis = d3.svg.axis()
//           .scale(y)
//           .orient("right")
//           .ticks(ticks);
//   
//   if(!update){
//     svgDomain.append("g")
//         .attr("class", "y axis")
//         .attr("id", "y_axis")
//         .attr("transform", "translate(" + width + ",0)")
//         .call(yAxis)    
//       .append("text")
//         .attr("id", "y_axis_label")
//         .attr("transform", "rotate(-90)")
//         .attr("y", 6)
//         .attr("dy", "-38em")
//         .style("text-anchor", "end")
//         .style("text-align", "center")
//         
//     svgDomain.selectAll("#y_axis")
//       .append("text")
//         .attr("id", "y_axis_units")
//         .attr("y", 0)
//         .attr("x", 8)
//         .style("text-align", "right")
//         
//     svgDomain.selectAll("#y_axis")
//       .append("text")
//         .attr("id", "y_axis_units_min")
//         .attr("y", height+6)
//         .attr("x", 8)
//         .style("text-align", "right")
//         .text("test")
//    
//   }
// 
//   return yAxis;        
// 
// }

