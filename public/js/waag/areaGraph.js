WAAG.AreaGraph = function AreaGraph(properties, _subDomain, domainColor) {

	//console.log("linegraph contructor");

	var margin = {
		top: 20,
		right: 40,
		bottom: 30,
		left: 20
	},
		width = 350 - margin.left - margin.right,
		height = 100 - margin.top - margin.bottom;

	var x, y, xaxis, yaxis, line, svgDomain, focus;
	var activeIndex = 0;
	var focus;

	function init() {

		var data = properties.tickerData.data[0].kciData;
		var subDomain = _subDomain;
		svgDomain = subDomain.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.style("position", "absolute")
			.style("left", 1 + "em")
			.style("top", 2.5 + "em")
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		x = d3.time.scale()
			.range([0, width])

		y = d3.scale.linear()
			.range([height, 0]);

		x.domain(d3.extent(data, function(d) {
			return d.timestamp;
		}));
		y.domain([0, d3.max(data, function(d) {
			return d.value;
		})]);

		xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom")
			.ticks(d3.time.hours, 6)
			.tickFormat(d3.time.format('%H'))

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
			.ticks(2);

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



		line = d3.svg.line()
			.interpolate("basis")
			.x(function(d) {
				return x(d.timestamp);
			})
			.y(function(d) {
				return y(d.value);
			});


		area = d3.svg.area()
			.interpolate("basis")
			.x(function(d) {
				return x(d.timestamp);
			})
			.y0(height)
			.y1(function(d) {
				return y(d.value);
			});

		focus = svgDomain.append("g")
			.attr("class", "focus")
			.style("display", "none");


		updateDataSet(properties, properties.tickerData.data[0].kci, 0);

	};

	function updateGraph(data, description, yUnits) {
		var range = getRange(data);

		var dataArea = [];
		data.forEach(function(d) {
			d.units = yUnits;
			d.description = description;
			if (d.value == null || isNaN(d.value) || !d.value) d.value = range.min;
			var timestamp;
			if (d.hour <= hNow) {
				timestamp = d.timestamp;
			} else {
				timestamp = d.realTimestamp;
			}


			if (d.value == range.min) {
				label = noDataLabel;
			} else {
				label = "Time : " + formatDateLabel(timestamp) + "<br/>Description :" + d.description + "<br>Value :" + d.value.toFixed(2) + " " + d.units;
			}
			d.mouseLabel = label;

			if (d.hour <= hNow) {
				dataArea.push(d);
			}
			//console.log("new :"+d.value);  	    
		});

		y.domain([range.min, range.max]);

		yAxis = d3.svg.axis()
			.scale(y)
			.orient("right")
			.ticks(2);

		var time = 250 + (Math.random() * 750);

		svgDomain.select("#y_axis")
			.transition().duration(time) // https://github.com/mbostock/d3/wiki/Transitions#wiki-d3_ease
		.call(yAxis);

		svgDomain.select("#y_axis_label")
			.html(description + " " + yUnits)

		// svgDomain.select("#y_axis_units")
		//     .html(maxRound+" "+yUnits);
		//     
		// svgDomain.select("#y_axis_units_min")
		//     .html(parseInt(min));


		var visLine = svgDomain.selectAll("path.line").data([data], function(d, i) {
			return i;
		});

		//line
		visLine.enter().append("path")
			.attr("class", "line")
			.attr("d", line);

		visLine.transition()
			.duration(time)
			.attr("d", line);

		visLine.exit().transition()
			.duration(time)
			.style("opacity", 0)
			.remove();

		var dataArea = [];
		data.forEach(function(d) {
			if (d.hour <= hNow) {
				dataArea.push(d);
			}

		});

		var visArea = svgDomain.selectAll(".area").data([dataArea], function(d, i) {
			return i;
		});

		//area
		visArea.enter().append("path")
			.attr("class", "area")
			.attr("d", area)

		visArea.transition()
			.duration(time)
			.attr("d", area);

		visArea.exit().transition()
			.duration(time)
			.style("opacity", 0)
			.remove();

		data.forEach(function(d) {
			d.units = yUnits;
			d.description = description;
			if (isNaN(d.value)) d.value = range.min;

		})

		var visDot = svgDomain.selectAll(".dot").data(data, function(d, i) {
			return i
		});

		visDot.enter().append("circle")
			.attr("class", "dot")
			.attr("r", function(d) {
				if (d.hour == hNow) {
					return 1;
				} else if (d.hour < hNow && d.value != null) {
					return 0.5;
				} else {
					return 0;
				}
			})
			.attr("cx", function(d) {
				return x(d.timestamp);
			})
			.attr("cy", function(d) {
				return y(d.value);
			})

		visDot.transition()
			.duration(time)
			.attr("cx", function(d) {
				return x(d.timestamp);
			})
			.attr("cy", function(d) {
				return y(d.value);
			});

		visDot.exit().transition()
			.duration(time)
			.style("opacity", 0)
			.remove();

		svgDomain.select(".overlay").remove();
		svgDomain.append("rect")
			.attr("class", "overlay")
			.attr("width", width)
			.attr("height", height)
			.on("mouseover", function() {
				focus.style("display", null);
				showToolTip("");
			})
			.on("mouseout", function() {
				focus.style("display", "none");
				hideToolTip();
			})
			.on("mousemove", function() {
				setLabelValue(x, y, d3.mouse(this)[0], data, focus);
			})
			.on("click", function() {
				setLabelValue(x, y, d3.mouse(this)[0], data, focus);
			})


		svgDomain.select(".focus").remove();
		focus = svgDomain.append("g")
			.attr("class", "focus")
			.style("display", "none");

		focus.append("circle")
			.attr("r", 4)
			.style("fill", domainColor)


		//setMouseOverLay(svgDomain, data, domainColor, width, height)

	};

	updateDataSet = function(_properties, kci, index) {

		//console.log("updating data set "+kci);
		activeIndex = index;
		updateGraph(_properties.tickerData.data[index].kciData, properties.tickerData.data[index].description, properties.tickerData.data[index].units);
	}

	this.updateDataSet = updateDataSet;
	init();
	return this;

};
