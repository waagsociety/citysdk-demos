WAAG.GraphsD3 = function GraphsD3() {
  console.log("graphsD3 constructor");
  //var streamGraph, circlePack, circlePacks;
  var wGraph=window.innerWidth-240;
  var hGraph=320;
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = wGraph - margin.left - margin.right,
      height = hGraph - margin.top - margin.bottom;

  function init(svg){

    var xpos = window.innerWidth - wGraph;
		var ypos = window.innerHeight - hGraph-60;
     
    streamGraph=svg.append("g")
           .attr("id", "streamGraph")
           .attr("class", "Oranges")
           .attr("transform", "translate(" + xpos + "," + ypos + ")")
           .style("fill", "red");
          		  
   	console.log("graphsD3 innited");	  
  }
  
  setStreamGraph = function(dataLayer){
    
    //return;
    console.log("setting stream graph");
    //2009,2010,2011,2012,2013,2015,2020,2025,2030,2035

    //var formatPercent = d3.format(".0%");
    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);
        
    var x1 = d3.scale.ordinal();        

    // var y = d3.scale.linear()
    //     .range([height, 0]);
    var y = d3.scale.linear()
        .rangeRound([height, 0]); 

           

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")


    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("right");
        //.tickFormat(formatPercent);
        
    //var color = d3.scale.category10();
    var color = d3.scale.ordinal().range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);    
 
    var dataSdk=dataLayer.data;
    dataSdk.sort(function(a, b) { return d3.ascending(a.name, b.name)});     
    
    
    var years = d3.keys(dataSdk[0].layers.oens.layers.bevolking_2035).filter(function(key) { 
        if(key == "mannen" || key == "vrouwen" || key == "bc/std"){
          //do nothing
        } else{
          return key;
        }  
    });
    
    dataSdk.forEach(function(d, i) {
          d.layers.oens.layers.bevolking_2035_multi = d.layers.oens.layers.bevolking_2035;
          d.layers.oens.layers.bevolking_2035 = years.map(function(year) { return {year: year, name:d.name, value: +d.layers.oens.layers.bevolking_2035[year]}; });

    });

    
    //color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));
    color.domain(d3.keys(dataSdk[0].layers.oens.layers.bevolking_2035_multi).filter(function(key) { 
        if(key == "mannen" || key == "vrouwen" || key == "bc/std"){
          //do nothing
        } else{
          return key;
        }  
    })
    );
    
    var years = color.domain().map(function(year) {
        //console.log(year);
        return {
          year: year,
          values: dataSdk.map(function(d) {
            return {name: d.name, value: +d.layers.oens.layers.bevolking_2035_multi[year]};
          })
        };
      });

    // interpolation  
    // linear - piecewise linear segments, as in a polyline.
    // linear-closed - close the linear segments to form a polygon.
    // step-before - alternate between vertical and horizontal segments, as in a step function.
    // step-after - alternate between horizontal and vertical segments, as in a step function.
    // basis - a B-spline, with control point duplication on the ends.
    // basis-open - an open B-spline; may not intersect the start or end.
    // basis-closed - a closed B-spline, as in a loop.
    // bundle - equivalent to basis, except the tension parameter is used to straighten the spline.
    // cardinal - a Cardinal spline, with control point duplication on the ends.
    // cardinal-open - an open Cardinal spline; may not intersect the start or end, but will intersect other control points.
    // cardinal-closed - a closed Cardinal spline, as in a loop.
    // monotone - cubic interpolation that preserves monotonicity in y.
    
    var line = d3.svg.line()
        .interpolate("basis")
        .x(function(d) { return x(d.name); })
        .y(function(d) { return y(d.value); });
    
      
    x.domain(dataSdk.map(function(d) {  return d.name; }));

    
    y.domain([
      d3.min(dataSdk, function(c) { return d3.min(c.layers.oens.layers.bevolking_2035, function(v) { return v.value; }); }),
      d3.max(dataSdk, function(c) { return d3.max(c.layers.oens.layers.bevolking_2035, function(v) { return v.value; }); })
    ]);

    streamGraph.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .attr("font-family", "sans-serif")
            .attr("font-size", "8px")
            .style("fill", "#666")
            .selectAll("text")  
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", function(d) {
                    return "rotate(-65)" 
                    });

    streamGraph.append("g")
          .attr("class", "y axis")
          .attr("transform", "translate("+ width +",0)")
          .call(yAxis)
          .attr("font-family", "sans-serif")
          .attr("font-size", "8px")
          .style("fill", "#666")
          .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Aantal inwoners");

  streamGraph.selectAll(".bar_bevolking_2013")
            .data(dataSdk)
          .enter().append("rect")
            .attr("class", "bar_bevolking_2013")
            .attr("x", function(d) { return x(d.name); })
            .attr("width", 2)
            .attr("y", function(d, i) { return y(d.layers.oens.layers.bevolking_2035[0].value); })
            .attr("height", function(d) { return height - y(d.layers.oens.layers.bevolking_2035[0].value); })
            .style("fill", function(d) { return color(d.year); })
            .on("mouseover", function(d){ 
             var tipsy = $(this).tipsy({ 
                 gravity: 'w', 
                 html: true,
                 trigger: 'hover', 
                     title: function() {
                       var string=d.name+"<br> value: "+d.layers.oens.layers.bevolking_2013[0].value;
                       return string; 
                     }
               });
               $(this).trigger("mouseover");

           });
 
 
    streamGraph.selectAll(".bar_bevolking_2035")
              .data(dataSdk)
            .enter().append("rect")
              .attr("class", "bar_bevolking_2035")
              .attr("x", function(d) {
                 var xp= x(d.name);    return xp+3; 
                 })
              .attr("width", 2)
              .attr("y", function(d, i) { return y(d.layers.oens.layers.bevolking_2035[5].value); })
              .attr("height", function(d) { return height - y(d.layers.oens.layers.bevolking_2035[5].value); })
              .style("fill", function(d) { return color(d.year); })
              .on("mouseover", function(d){ 
               var tipsy = $(this).tipsy({ 
                   gravity: 'w', 
                   html: true,
                   trigger: 'hover', 
                       title: function() {
                         var string=d.name+"<br> value: "+d.layers.oens.layers.bevolking_2035[0].value;
                         return string; 
                       }
                 });
                 $(this).trigger("mouseover");
        
             });
             
    
    
    dataSdk.forEach(function(d){	    
       d.layers.oens.layers.inkomen_2010["gemiddeld besteedbaar inkomen per huishouden (x 1.000 euro)"]=parseFloat(d.layers.oens.layers.inkomen_2010["gemiddeld besteedbaar inkomen per huishouden (x 1.000 euro)"])*100;
       var g=d.layers.oens.layers.inkomen_2010["gemiddeld besteedbaar inkomen per huishouden (x 1.000 euro)"];
       if(g<0 || isNaN(g) ){
            d.layers.oens.layers.inkomen_2010["gemiddeld besteedbaar inkomen per huishouden (x 1.000 euro)"]=0;
        }
        //console.log(d.layers.oens.layers.inkomen_2010["gemiddeld besteedbaar inkomen per huishouden (x 1.000 euro)"]);
    });
             
    streamGraph.selectAll(".bar_inkomen")
                 .data(dataSdk)
               .enter().append("rect")
                 .attr("class", "bar_inkomen")
                 .attr("x", function(d) {
                   var xp= x(d.name);    return xp+6; 
                   })
                 .attr("width", 2)
                 .attr("y", function(d) {return y(d.layers.oens.layers.inkomen_2010["gemiddeld besteedbaar inkomen per huishouden (x 1.000 euro)"]); })
                 .attr("height", function(d) { return height - y(d.layers.oens.layers.inkomen_2010["gemiddeld besteedbaar inkomen per huishouden (x 1.000 euro)"]); })
                 .style("fill", function(d) { return color(2013); })
                 .on("mouseover", function(d){ 
                   
                  var tipsy = $(this).tipsy({ 
                      gravity: 'w', 
                      html: true,
                      trigger: 'hover', 
                          title: function() {
                            var string=d.name+"<br> value: "+d.layers.oens.layers.inkomen_2010["gemiddeld besteedbaar inkomen per huishouden (x 1.000 euro)"];
                            return string; 
                          }
                    });
                    $(this).trigger("mouseover");
    
                });       

         var year = streamGraph.selectAll(".year")
               .data(years)
             .enter().append("g")
               .attr("class", function(d) {return d.year});
         
       // year.selectAll("rect")
       //     .data(function(d) { return d.values; })
       //   .enter().append("rect")
       //     .attr("width", x1.rangeBand())
       //     .attr("x", function(d,i) { console.log(i); return x(d.name); })
       //     .attr("y", function(d) { return y(d.value); })
       //     .attr("height", function(d) { return height - y(d.value); })
       //     .style("stroke", function(d) { return color(d.year); })
       //     .style("fill", "none");


         year.append("path")
               .attr("class", "line")
               .attr("d", function(d) { return line(d.values); })
               .style("stroke", function(d) { return color(d.year); })
               .style("stroke-width", 1+"px")
               .style("fill", "none")
               .on("mouseover", function(d){ 
                 d3.select(this).style("stroke-width", 2+"px" );
                var tipsy = $(this).tipsy({ 
                    gravity: 'w', 
                    html: true,
                    trigger: 'hover', 
                        title: function() {
                          var string=d.year;
                          return string; 
                        }
                  });
                  $(this).trigger("mouseover");

              })
            .on("mouseout", function(d){ 
              d3.select(this).style("stroke-width", 1+"px" );
            });



    function type(d) {
      d["2013"]= +d["2013"];
      return d;
    }

  };

  
  
  //init();
  this.init=init;
  this.setStreamGraph=setStreamGraph;

  
}