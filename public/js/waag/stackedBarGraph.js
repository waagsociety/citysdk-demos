WAAG.StackedBarGraph = function StackedBarGraph(properties, _subDomain) {

	//console.log("bargraph contructor");

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
	var domainColor=getColor(properties.domainIndex);
	var data;
	
	function init() {
		data = properties.tickerData.data[0].kciData;

		data.forEach(function(d) {
			d.children.forEach(function(c, i) {
				c.y0 = i;
				c.y1 = i + 1;
				c.hour = d.hour;
				c.timestamp = d.timestamp;
				c.realTimestamp = d.realTimestamp;
			})

		});


		var subDomain = _subDomain;

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
		y.domain([d3.min(data, function(d) {
			return d.value;
		}), d3.max(data, function(d) {
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

		y.domain([d3.min(data, function(d) {
			return d.value;
		}), d3.max(data, function(d) {
			return d.value;
		})]);
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

		// To Do: make updateble    
		var vis = svgDomain.selectAll(".bar").data(data, function(d, i) {
			return i
		});

		vis.enter().append("g")
			.attr("class", "events")
			.attr("transform", function(d) {
				return "translate(" + x(d.hour) + ",0)";
			});


		vis.selectAll("rect")
			.data(function(d) {
				return d.children;
			})
			.enter().append("rect")
			.attr("width", x.rangeBand())
			.attr("y", function(d) {
				return y(d.y1);
			})
			.attr("height", function(d) {
				return y(d.y0) - y(d.y1);
			})
			.style("fill", function(d) {
				if (d.hour <= hNow) {
					return "#666";
				} else {
					return domainColor;
				}

			})
			.style("stroke", "none")
			.style("stroke", function(d) {
				if (d.hour <= hNow) {
					return domainColor;
				} else {
					return "#666";
				}

			})
			.style("stroke-width", 0.5 + "px")
			.on("mouseover", function(d) {
				var timestamp;
				if (d.hour <= hNow) {
					timestamp = d.timestamp;
				} else {
					timestamp = d.realTimestamp;
				}


				var label = "time :" + d.hour + ":00 hour<br/>Name :" + d.name + "<br> description :" + d.description;
				if (d.children) {
					label = d.children.length + " - events at " + d.hour + ":00";
				} else {
					label = d.description + "<br>" + formatDateLabel(timestamp);
				}
				showToolTip(label);
			})
			.on("mouseout", function(d) {
				hideToolTip();
			})
			.on("mousemove", function(d) {
				updateToolTipPosition(d3.event.pageX, d3.event.pageY);
			})
			.on("click", function(d) {
				//updateDummySet(data);
			})



	};


	updateDataSet = function(_properties, kci, index) {

		console.log("updating data set " + kci);
		activeIndex = index;
		_properties.tickerData.data[index].kciData.forEach(function(d) {
			for (var i = 0; i < d.value; i++) {
				d.description = properties.tickerData.data[index].description;
				d.units = properties.tickerData.data[index].units;
			}

		})
		data=_properties.tickerData.data[index].kciData;

		updateGraph(data, properties.tickerData.data[index].description, properties.tickerData.data[index].units);
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
