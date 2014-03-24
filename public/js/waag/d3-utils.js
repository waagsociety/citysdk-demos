var bisectDate = d3.bisector(function(d) { return d.timestamp; }).left;
var ticksYaxis=2;

function setLabelValue(x, y, mouse, data, focus ) {
    
    var x0 = x.invert(mouse),
        i = bisectDate(data, x0, 1),
        d0 = data[i - 1],
        d1 = data[i],
        d = x0 - d0.timestamp > d1.timestamp - x0 ? d1 : d0;
    
        var label="";
        var entries=d3.entries(d.value); 
        if(entries.length>0){
          focus.attr("transform", "translate(" + x(d.timestamp) + "," + 70 + ")");
          if(d.hour>hNow){
            label+=formatDate(d.realTimestamp)+"<br>"
          }else{
            label+=formatDate(d.realTimestamp)+"<br>"
          }

          entries.sort(function(b, a) { return d3.ascending(a["value"], b["value"])});
      		entries.forEach(function(d){
      		  label+=d.key+": "+d.value+"<br>"
      		});
        }else{
          label=d.mouseLabel;
          focus.attr("transform", "translate(" + x(d.timestamp) + "," + y(d.value) + ")");
        }

  	toolTip.html(label)
  	updateToolTipPosition(d3.event.pageX, d3.event.pageY);
    
}

function showToolTip(label){
  // /console.log(label);
  if(label==undefined || label==null) label=noDataLabel;
  
  toolTip.html(label);
  toolTip.transition()        
      .duration(0)     
      .style("opacity", 0.9);
  
  updateToolTipPosition(d3.event.pageX, d3.event.pageY);    
      
}

function hideToolTip(){
  toolTip.transition()        
      .duration(250)      
      .style("opacity", 0);
   
}
 

function updateToolTipPosition(x, y){
  // toolTip.transition()        
  //     .duration(10)
  //     .style("left", x+10+"px")     
  //     .style("top", y-28-10+"px");
  
  
  toolTip.style("left", x+10+"px")     
      .style("top", y-28-10+"px");
  
}

function formatDate(date){
  var timeLabel=date.toString();
  var n = timeLabel.search("GMT");
  var label=timeLabel.slice(0,n);
  return label;
  
};

function setVisualisationValues(data){
  
};

var timer=setInterval(function(){myTimer()},1000);

function myTimer()
{
  var d=new Date();
  var t=d.toLocaleTimeString();
  //console.log(t);
  
};

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

