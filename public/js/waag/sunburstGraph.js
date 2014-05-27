WAAG.SunburstGraph = function SunburstGraph(properties, _subDomain, donutType) {

	var width = 150;
	var height = 150;
	var svgDomain;
	var activeIndex = 0;

	var r = Math.min(width, height) / 2;
	var labelR = r + 50; // radius for label anchor
	var arc, pie;
	var donut;
	var partition;

	var tickData;
	var domainColor=getColor(properties.domainIndex);
	var data;
	function init() {

		data = prepareDataSet(properties.tickerData.data[0].kciData, properties.tickerData.data[0].description);
		var subDomain = _subDomain;

		svgDomain = subDomain.append("svg")
			.attr("width", width + "px")
			.attr("height", height + "px")
			.style("position", "absolute")
			.style("left", 14 + "em")
			.style("top", -1.5 + "em")
		//.attr("transform", "translate(" + 0 + "," + 240 + ")")
		.append("g")
			.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

		pie = d3.layout.pie()
			.sort(null)
			.value(function(d) {
				return d.tick;
			});

		partition = d3.layout.partition()
			.sort(null)
			.size([2 * Math.PI, r * r])
			.value(function(d) {
				return 1;
			});

		arc = d3.svg.arc()
			.startAngle(function(d) {
				return d.x;
			})
			.endAngle(function(d) {
				return d.x + d.dx;
			})
			.innerRadius(function(d) {
				return Math.sqrt(d.y) - 10;
			})
			.outerRadius(function(d) {
				return Math.sqrt(d.y + d.dy) - 10;
			});

		updateGraph(data);

	};

	function prepareDataSet(data, description) {

		data.forEach(function(d) {
			d.tick = 1;
			d.stackValue = d.value;
			d.description = description;

		});

		var dataSunburst = {
			description: description,
			children: data
		};

		return dataSunburst;

	}

	function updateGraph(data) {

		var time = 250 + (Math.random() * 750);
		var max = d3.max(data.children, function(d) {
			return d.value;
		});
		var min = d3.min(data.children, function(d) {
			return d.value;
		});
		var quantizeBrewer = d3.scale.quantile().domain([0, 24]).range(d3.range(rangeCB));
		var value = function() {
			return 1;
		};

		var path = svgDomain.datum(data).selectAll("path")
			.data(partition.nodes)
			.enter().append("path")
			.attr("display", function(d) {
				return d.depth ? null : "none";
			}) // hide inner ring
		.attr("d", arc)
			.style("stroke", function(d) {
				if ((d.children ? d : d.parent).hour > hNow) {
					return "#666";
				} else {
					return domainColor;
				}
			})
			.style("fill", function(d) {
				if ((d.children ? d : d.parent).hour > hNow) {
					return domainColor;
				} else {
					return "#666";
				}

			})
			.style("stroke-width", 0.25 + "px")
			.on("mouseover", function(d) {

				var label = "time :" + d.hour + ":00 hour<br/>Name :" + d.name + "<br> description :" + d.description;
				if (d.children) {
					label = d.children.length + " - events at " + d.hour + ":00";
				} else {
					var timestamp = new Date();
					timestamp.setTime(d.timestamp * 1000);
					var h = timestamp.getHours();
					if (h == hNow) {
						timestamp.setTime((d.timestamp * 1000) + (60 * 60 * 24 * 1000));
					}
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
			.each(stash)

		path.data(partition.value(value).nodes)
			.transition()
			.duration(1000)
			.attrTween("d", arcTween);


	};

	// Stash the old values for transition.

	function stash(d) {
		d.x0 = d.x;
		d.dx0 = d.dx;
	}

	// Interpolate the arcs in data space.

	function arcTween(a) {
		var i = d3.interpolate({
			x: a.x0,
			dx: a.dx0
		}, a);
		return function(t) {
			var b = i(t);
			a.x0 = b.x;
			a.dx0 = b.dx;
			return arc(b);
		};
	}

	function updatePie(data) {

		//data.sort(function(a, b) { return d3.ascending(a.value, b.value)});
		var max = d3.max(data, function(d) {
			return d.value;
		});
		var min = d3.min(data, function(d) {
			return d.value;
		});
		var quantizeBrewer = d3.scale.quantile().domain([min, max]).range(d3.range(rangeCB));

		var time = 250 + (Math.random() * 750);
		donut.data(pie(data));
		donut.transition()
		//.style("fill", function(d){ return colorbrewer[colorScheme]['9'][quantizeBrewer(d.value)]})
		.duration(time).attrTween("d", arcTween); // redraw the arcs

	}


	updateDataSet = function(_properties, index) {

		// console.log("updating data set "+layer);
		// activeIndex=index;
		// updateGraph(_properties.tickerData.data[index].kciData, properties.tickerData.data[index].description);
		// 
		// 
		// var data = prepareDataSet(layer);
		// 
		// updatePie(data);
	}
	
	updateColors = function (){
		domainColor=getColor(properties.domainIndex);
		var path = svgDomain.datum(data).selectAll("path")
			.style("stroke", function(d) {
				if ((d.children ? d : d.parent).hour > hNow) {
					return "#666";
				} else {
					return domainColor;
				}
			})
			.style("fill", function(d) {
				if ((d.children ? d : d.parent).hour > hNow) {
					return domainColor;
				} else {
					return "#666";
				}

			})
		
		
		
		
		//updateGraph(data);
	}

	this.updateDataSet = updateDataSet;
	this.updateColors = updateColors;
	init();
	return this;


};
