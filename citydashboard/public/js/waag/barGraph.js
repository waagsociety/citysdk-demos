WAAG.BarGraph = function BarGraph(properties, _subDomain) {
	var domainColor=getColor(properties.domainIndex);
	
	console.log("bar graph props :"+properties.domainColor)
	var margin = {
		top: 20,
		right: 40,
		bottom: 30,
		left: 20
	},
		width = 350 - margin.left - margin.right,
		height = 100 - margin.top - margin.bottom;

	var xaxis, yaxis, svgDomain;
	var activeIndex = 0;
	var data;
	
	function init() {

		data = properties.tickerData.data[0].kciData;

		var subDomain = _subDomain;
		svgDomain = subDomain.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.style("position", "absolute")
			.style("left", 1 + "em")
			.style("top", 2.5 + "em")
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		x = d3.scale.ordinal()
			.rangeRoundBands([0, width], 0.1);
		x.domain(data.map(function(d) {
			return d.hour;
		}));

		y = d3.scale.linear()
			.range([height, 0]);
		y.domain([0, d3.max(data, function(d) {
			return d.value;
		})]);

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
			.attr("y", height + 6)
			.attr("x", 8)
			.style("text-align", "right")
		// /.text("test")

		initted = true;

		updateDataSet(properties, properties.tickerData.data[0].kci, 0);


	};

	function updateGraph(data, description, yUnits) {

		var range = getRange(data);

		if (isNaN(range.min) || !range.min || range.min == null) range.min = 0;
		if (isNaN(range.max) || !range.max || range.max == null) range.max = 100;

		y.domain([range.min, range.max]);
		//y.domain([0, max]); 

		var yAxis = d3.svg.axis()
			.scale(y)
			.orient("right")
			.ticks(2)
		//ticksValues([20,30,40]);

		var time = 250 + (Math.random() * 750);

		svgDomain.select("#y_axis")
			.transition().duration(time)
			.call(yAxis);

		svgDomain.select("#y_axis_label")
			.html(description + " " + yUnits)

		var vis = svgDomain.selectAll(".bar").data(data, function(d, i) {
			return d.description + "_" + i;
		});

		vis.enter().append("rect")
			.attr("class", "bar")
			.attr("x", function(d) {
				return x(d.hour);
			})
			.attr("width", x.rangeBand())
			.style("fill", function(d) {
				if (isNaN(d.value) || !d.value || d.value == null || d.hour > hNow) {
					return domainColor
				}
			})
			.style("stroke", function(d) {
				if (isNaN(d.value) || !d.value || d.value == null) {
					return domainColor
				} else if (d.hour > hNow) {
					return "#999"
				}
			})
			.on("mouseover", function(d) {
				showToolTip(d.mouseLabel);
				// if (d.hour > hNow){
				// 	d3.select(this).style("stroke", "#333")
				// }
				
				
			})
			.on("mousemove", function(d) {

				updateToolTipPosition(d3.event.pageX, d3.event.pageY);

			})
			.on("mouseout", function(d) {
				hideToolTip();
			})
			.on("click", function(d) {

			});


		vis.transition()
			.duration(time)
			.attr("y", function(d) {
				if (isNaN(d.value) || !d.value || d.value == null) {
					return y(range.max);
				} else {
					return y(d.value);
				}
			})
			.attr("height", function(d) {
				if (isNaN(d.value) || !d.value || d.value == null) {
					return height - y(range.max);
				} else {
					return height - y(d.value);
				}
			})
			.style("fill", function(d) {
				if (isNaN(d.value) || !d.value || d.value == null || d.hour > hNow) {
					return domainColor
				}
			})
			// .style("fill-opacity", function(d) {
			// 	if (isNaN(d.value) || !d.value || d.value == null || d.hour > hNow) {
			// 		return 0;
			// 	}
			// })
			.style("stroke", function(d) {
				if (isNaN(d.value) || !d.value || d.value == null) {
					return domainColor
				} else if (d.hour > hNow) {
					return "#999"
				}
			})
			.style("opacity", function(d) {
				if (isNaN(d.value) || !d.value || d.value == null) {
					return 0;
				} else {
					return 1;
				}
			})



		vis.exit().transition()
			.duration(time)
			.style("opacity", 0)
			.remove();

	};


	updateDataSet = function(_properties, kci, index) {

		console.log("updating data set " + kci);
		activeIndex = index;
		_properties.tickerData.data[index].kciData.forEach(function(d) {
			for (var i = 0; i < d.value; i++) {
				d.description = properties.tickerData.data[index].description;
				d.units = properties.tickerData.data[index].units;
				var timestamp;
				if (d.hour <= hNow) {
					timestamp = d.timestamp;
				} else {
					timestamp = d.realTimestamp;
				}

				var label;
				if (isNaN(d.value) || !d.value || d.value == null) {
					label = noDataLabel + "<br>" + formatDate(timestamp);
				} else {
					label = formatDateLabel(timestamp) + "<br>Description: " + d.description + "<br>Value: " + d.value.toFixed(2) + " " + d.units;
				}
				d.mouseLabel = label;

			}

		})
		data=_properties.tickerData.data[activeIndex].kciData;
		updateGraph(data, properties.tickerData.data[activeIndex].description, properties.tickerData.data[activeIndex].units);
	}
	
	updateColors = function(){

		domainColor=getColor(properties.domainIndex)
		updateGraph(data, properties.tickerData.data[activeIndex].description, properties.tickerData.data[activeIndex].units);
	}

	this.updateDataSet = updateDataSet;
	this.updateColors = updateColors;
	
	
	init();
	return this;

};
