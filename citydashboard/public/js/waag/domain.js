WAAG.Domain = function Domain(_propertiesAll) {
	var properties = _propertiesAll;
	var container;
	var subDomianA, subDomianB;
	var domainInfo;
	var infoActive = false;
	var domainHeader;
	var domainGraphA, domainGraphB;
	
	
	var margin = {
		top: 20,
		right: 40,
		bottom: 30,
		left: 20
	},
		width = 350 - margin.left - margin.right,
		height = 90 - margin.top - margin.bottom;

	var x, y, xaxis, yaxis;
	var domainColor;

	function init() {

		
		console.log("is even " + parseInt(properties.index / colorStepper) + " :" + isEven(parseInt(properties.index / colorStepper)))

		var stage = d3.select("#stage")
		container = stage.append("div")
			.attr("class", "domain_container")
			.attr("id", properties.id)
			.style("background-color", function() {
				console.log("setting color index =" + properties.index % (colorStepper))
				if (isEven(parseInt(properties.index / colorStepper))) {
					domainColor = colorbrewer[colorScheme]['9'][properties.index % (colorStepper)];
				} else {
					domainColor = colorbrewer[colorScheme]['9'][colorStepper - properties.index % (colorStepper)];
				}
				
				return domainColor;
			})
			.style("top", menuHeight + (properties.index * widgetHeight) + "px")
			.style("z-index", 100 - properties.index);

		//console.log(stage);  

		domainInfo = container.append("div")
			.attr("class", "domainInfo")
			.style("background-color", domainColor)
			.style("position", "absolute")
			.style("top", -widgetHeight + "px")
			.style("height", widgetHeight + "px")
			.style("width", 100 + "%")
			.style("z-index", -1)
			
			

		domainHeader = container.append("div")
			.attr("id", "domainHeader")
			.style("background-color", domainColor)
			.style("z-index", 0)

		domainHeader.append("object")
			.attr("class", "domainIcon")
			.attr("data", properties.icon)
			.attr("type", "image/svg+xml");

		domainHeader.append("h2")
			.text(properties.label);

		domainHeader.append("div")
			.attr("class", "hLine")
			.style("margin-top", 0.5 + "em")
			.style("margin-bottom", 0.5 + "em")
			.style("left", 6 + "em");

		domainHeader.append("div")
			.attr("class", "vLine")
			.style("position", "absolute")
			.style("margin-top", 0.5 + "em")
			.style("margin-bottom", 0.5 + "em")
			.style("left", mapWidth / 2 + "px")
			.style("height", widgetHeight - 96 + "px");


 		if (properties.map) {
			domainHeader.append("object")
				.attr("class", "mapIcon")
				.attr("data", "images/svg/icon_map-small.svg")
				.attr("type", "image/svg+xml")

			domainHeader.append("div")
				.attr("class", "mapIcon")
				.on("click", function() {
					activateMap(properties);
				})
				.on("mouseover", function(d) {
					d3.select("body").style("cursor", "pointer");
				})
				.on("mouseout", function(d) {
					d3.select("body").style("cursor", "default");
				});
		}


		domainHeader.append("object")
			.attr("class", "domain-infoIcon")
			.attr("data", "images/svg/icon_info-domain.svg")
			.attr("type", "image/svg+xml")

		domainHeader.append("div")
			.attr("class", "domain-infoIcon")
			.on("click", function() {
				setInfo(properties);
			})
			.on("mouseover", function(d) {
				d3.select("body").style("cursor", "pointer");
			})
			.on("mouseout", function(d) {
				d3.select("body").style("cursor", "default");
			});
			
		if (properties.subDomains[0] != false) {
			properties.subDomains[0].domainIndex=properties.index;
			setDomainA(properties.subDomains[0]);
		}
		if (properties.subDomains[1] != false) {
			properties.subDomains[1].domainIndex=properties.index;
			setDomainB(properties.subDomains[1]);
		}

	};

	function setInfo(properties) {

		if (infoActive) {
			domainInfo.transition()
				.duration(500)
				.style("top", -widgetHeight + "px")

			infoActive = false;
		} else {
			domainInfo.transition()
				.duration(350)
				.style("top", 0 + "px")

			infoActive = true;
		}


	}


	function setDomainA(_properties) {
		_properties.domainColor=domainColor;
		if (_properties.active == false) {
			return;
		}

		var infoHtml = "";
		d3.html("text-content/" + _properties.infoHtml + ".html", function(d) {
			var t = d.querySelector("#" + language);
			container.select(".domainInfo").append("div")
				.attr("class", "domainInfoA")
				.style("left", 16 + "px")
				.html(t.innerHTML)
		});

		subDomainA = container.append("div")
			.attr("class", "subDomainA")
			.attr("id", _properties.id);

		subDomainA.append("object")
			.attr("class", "subDomainIcon")
			.attr("data", _properties.icon)
			.attr("type", "image/svg+xml");

		var kci = _properties.tickerData.data[0].kci;
		getGraphData(_properties, subDomainA, kci, null);

		if (_properties.id == "smartcitizen") {
			var domain = d3.select("#" + _properties.id);
			_properties.sckTemp = "loading data";
			d3.json(apiUrlDB + "environment.sck.temperature" + "/" + admr + "/live", function(result) {
				console.log("temp live =" + result);
				var value = result["environment.sck.temperature:admr.nl.amsterdam"].toFixed(1);

				domain.append("object")
					.attr("id", "tempGraph")
					.attr("data", "images/svg/icon_tempGraph.svg")
					.attr("type", "image/svg+xml")
					.style("position", "relative")
					.style("left", 21 + "em")
					.style("top", -0.1 + "em")

				domain.append("div")
					.attr("id", "sck_temp_label")
					.style("left", 345 + "px")
					.style("top", -18 + "px")
					.html(value + " &#176");
			});

		};


	};


	function setDomainB(_properties) {
		_properties.domainColor=domainColor;
		if (_properties == false) {
			return;
		}


		var infoHtml = "";
		d3.html("text-content/" + _properties.infoHtml + ".html", function(d) {
			var t = d.querySelector("#" + language);
			container.select(".domainInfo").append("div")
				.attr("class", "domainInfoB")
				.style("left", 768 / 2 + 16 + "px")
				.style("width", 368 - 16 + "px")
				.html(t.innerHTML)
		});


		subDomainB = container.append("div")
			.attr("class", "subDomainB")
			.attr("id", _properties.id)

		subDomainB.append("object")
			.attr("class", "subDomainIcon")
			.attr("data", _properties.icon)
			.attr("type", "image/svg+xml")
			
		//if subdomainB is different than mainDomain --> set a new header  	
		if(_properties.newDomain){
			console.log("different domain icon :"+_properties.newDomain.icon);
						
			domainHeader.append("div")
				.append("h2")	
					.style("left", 400+"px")
					.text(_properties.newDomain.label);
			
		};	

		var kci = _properties.tickerData.data[0].kci;
		getGraphData(_properties, subDomainB, kci, null);

	};

	function getGraphData(_properties, subDomain, kci, _class) {

		console.log("getting data :" + kci + " --> " + _properties.id);
		// get the data and prepare it for visualisations
		var dummyData = false;
		if (kci == "dummy") {
			dummyData = true;
			kci = "transport.car.pressure";
		}

		var index = 0;
		for (var i = 0; i < _properties.tickerData.data.length; i++) {
			if (kci == _properties.tickerData.data[i].kci) {
				index = i;
				if (_properties.tickerData.data[i].kciData) {
					//console.log("data already loaded");
					//return;
				}

			}
		}

		if (_properties.tickerData.live) {

			d3.json(apiUrlDB + kci + "/" + admr + "/history", function(results) {
				var i = 0;
				var dTemp = new Date();
				var initialTickerData = [];
				for (var i = 0; i < 24; i++) {
					var timeStamp = dTemp.setHours(i);
					var h = dTemp.getHours();
					var object = {
						hour: h,
						timestamp: timeStamp,
						value: null
					}
					initialTickerData.push(object);
				}

				for (i = 0; i < _properties.tickerData.data.length; i++) {
					_properties.tickerData.data[i].kciData = initialTickerData;
				};

				// check for server down time
				for (var i = 0; i < results.length; i++) {
					var date = new Date();
					date.setTime(results[i].timestamp * 1000);
					var realTimestamp = new Date();
					realTimestamp.setTime(results[i].timestamp * 1000);

					var h = date.getHours();
					// adding 24 to sequence in front yesterday data
					if (h >= hNow) {
						var add = (60 * 60 * 24 * 1000) + date.getTime();
						date.setTime(add);
						//console.log("add time" +date);
					}
					var value = 0;
					var children = [];
					if (kci == "transport.pt.stopsdelayed") {
						if (results[i][kci + ":" + admr]) {
							results[i][kci + ":" + admr].forEach(function(d) {
								//console.log("delay "+d.delay);
								value += d.delay;

							});
							value = value / results[i][kci + ":" + admr].length;
							children = results[i][kci + ":" + admr];
						}
					} else if (kci == "tourism.events.nexthour") {
						//console.log("adding tourism events "+results[i][kci+":"+admr]);
						//console.log(results[i][kci+":"+admr])
						if (results[i][kci + ":" + admr]) {
							value = results[i][kci + ":" + admr].length;
							children = results[i][kci + ":" + admr];
						}


					} else {
						value = results[i][kci + ":" + admr]
						if (dummyData) {
							value = 10 + (Math.random() * 90);
							kci = "dummy";
							description = "dummy data";
						}
					};

					var object = {
						hour: h,
						timestamp: date,
						realTimestamp: realTimestamp,
						value: value,
						children: children
					}
					for (j = 0; j < _properties.tickerData.data[0].kciData.length; j++) {
						if (_properties.tickerData.data[0].kciData[j].hour == h) {
							_properties.tickerData.data[0].kciData[j] = object;
						};
					};
				};

				if (_class == null) {
					_properties.tickerData.data[0].kciData.sort(function(a, b) {
						return d3.ascending(a.hour, b.hour)
					});
					setGraph(_properties, subDomain);
				} else {
					_properties.tickerData.data[index].kciData.sort(function(a, b) {
						return d3.ascending(a.hour, b.hour)
					});
					_class.updateDataSet(_properties, kci, index);
				}


			});
		} else {

			console.log("get staticData --> CitySDK");
			d3.json(_properties.tickerData.data[0].kci, function(results) {

				console.log("loosecontrol results static=" + results.results.length);
				_properties.tickerData.data[0].sdkResults = results.results;

				if (_class == null) {
					setGraph(_properties, subDomain);
				}


			});

		};

	}

	function setGraph(_properties, subDomain) {

		    
		
		if (_properties.graphType == "bar") {
			graph = new WAAG.BarGraph(_properties, subDomain);
		} else if (_properties.graphType == "line") {
			graph = new WAAG.LineGraph(_properties, subDomain);
		} else if (_properties.graphType == "multiline") {
			graph = new WAAG.MultiLineGraph(_properties, subDomain);
		} else if (_properties.graphType == "area") {     
			graph = new WAAG.AreaGraph(_properties, subDomain);
		} else if (_properties.graphType == "circlepack") {
			graph = new WAAG.CirclePack(_properties, subDomain);
		} else if (_properties.graphType == "donut") {
			graph = new WAAG.PieGraph(_properties, subDomain, true);
		} else if (_properties.graphType == "pie") {
			graph = new WAAG.PieGraph(_properties, subDomain, false);
		} else if (_properties.graphType == "donutStacked") {
			graph = new WAAG.PieGraphStacked(_properties, subDomain, true);
		} else if (_properties.graphType == "sunburst") {
			graph = new WAAG.SunburstGraph(_properties, subDomain, true);
		} else if (_properties.graphType == "stackedBar") {
			graph = new WAAG.StackedBarGraph(_properties, subDomain);
		}

		if (_properties.tickerData.live) {
			createTickerTable(_properties, ["bullet", "description", "value"], subDomain, graph);
		} else {
			createSelectList(_properties, subDomain, graph);
		}
		
		updatableGraphs.push(graph);


	};

	//createTickerTable(_properties, ["bullet", "description", "value"], subDomain, graph);

	function createTickerTable(_properties, columns, _domain, _class) {

		var data = _properties.tickerData.data;
		//data.active=
		data.forEach(function(d) {
			d.active = false;
			//d.units=
		});
		data[0].active = true;

		var domain = _domain;

		var table = domain.append("table")
			.attr("class", "tickerTable")
			.style("width", function() {
				if (_properties.graphType == "circlepack" || _properties.graphType == "donut" || _properties.graphType == "sunburst") return 150 + "px"
			})
			.style("top", function() {
				if (data.length > 3) return -1.75 + "em";
			})
		//var thead = table.append("thead");
		var tbody = table.append("tbody")


		// create & append the header row
		// thead.append("tr")
		//     .selectAll("th")
		//     .data(columns)
		//     .enter()
		//     .append("th")
		//         .text(function(column) { return column; });

		// create a row for each object in the data
		var rows = tbody.selectAll("tr")
			.data(data)
			.enter()
			.append("tr")


		// create a cell in each row for each column
		var cells = rows.selectAll("td")
			.data(function(row) {
				return columns.map(function(column) {
					return {
						column: column,
						value: row[column],
						units: row["units"],
						kci: row["kci"],
						active: row["active"]
					};
				});
			})
			.enter()
			.append("td")
			.attr("id", function(d, i) {
				if (d.column == "bullet") {
					if (d.active) {
						return "inActive";
					} else {
						return "active";
					}

				} else if (d.column == "value") {
					var o = d.kci.split(".");
					//console.log(o);

					d.valueId = o[o.length - 1];
					return d.valueId;

				}

			})
			.attr("class", function(d) {
				if (d.column == "bullet") {
					return "bullet";
				}
			})
			.style("width", function(d, i) {

				if (d.column == "description") {
					return "50%";
				} else if (d.column == "value") {
					return "40%";
				} else {
					return 6 + "%";
				}

			})
			.style("text-align", function(d) {
				if (d.column == "description") {
					return "left";
				} else {
					return "right";
				}

			})
			.html(function(d, i) {

				//return d.value; 
				//console.log(d.kci+" --> value"+d.value);
				if (d.column == "value") {
					if (d.kci == "dummy") {
						return "(" + d.value + ")";
					} else {
						//console.log("live url ="+"http://loosecontrol.tv:4567/"+d.kci+"/admr.nl.amsterdam/live"); 
						setLiveValue(d, domain);
					}
				} else if (d.column != "bullet") {
					return d.value;
				}
			})

		.on("mouseover", function(d) {
			d3.select("body").style("cursor", "pointer");

		})
			.on("mouseout", function(d) {
				d3.select("body").style("cursor", "default");
			})
			.on("click", function(d) {

				var activeKci = d.kci;
				getGraphData(_properties, null, d.kci, _class);

				domain.selectAll(".bullet").attr("id",
					function(o) {
						if (o.kci == activeKci) {
							return "inActive"
						} else {

							return "active"
						}

					});

			});

		return table;
	}

	function setLiveValue(d, domain) {

		setTimeout(function() {
			setLiveValue(d, domain)
		}, liveUpdateTime);


		d3.json(apiUrlDB + d.kci + "/" + admr + "/live", function(result) {
			if (result[d.kci + ":" + admr] == null) {
				console.log("no live data available");
				domain.select("#" + d.valueId)
					.on("mouseover", function(d) {
						showToolTip("Data source interrupted<br>No live data available :-(");

					})
					.on("mousemove", function(d) {

						updateToolTipPosition(d3.event.pageX, d3.event.pageY);

					})
					.on("mouseout", function(d) {
						hideToolTip();
					})
					.html("<img src=images/icon-broken-link.png>");
				

			} else if (result[d.kci + ":" + admr]!=null) {
				domain.select("#" + d.valueId)
					.on("mouseover", function(d) {
						showToolTip("Live values<br>Click to update graph");

					})
					.on("mousemove", function(d) {

						updateToolTipPosition(d3.event.pageX, d3.event.pageY);

					})
					.on("mouseout", function(d) {
						hideToolTip();
					})

				//console.log("live update ="+result[d.kci+":"+admr]) ;       

				if (result[d.kci + ":" + admr].length > 0) {
					if (d.kci == "transport.pt.stopsdelayed") {
						var delay = 0;
						result[d.kci + ":" + admr].forEach(function(d) {
							delay += d.delay;
						})
						var avgDelay = delay / result[d.kci + ":" + admr].length;
						domain.select("#" + d.valueId).html(avgDelay.toFixed(2) + " " + d.units);
						d.value = avgDelay.toFixed(2) + " " + d.units;
					} else if (d.kci == "tourism.events.nexthour") {
						var events = result[d.kci + ":" + admr].length;
						domain.select("#" + d.valueId).html(Math.round(events) + " " + d.units);
						d.value = Math.round(events) + " " + d.units;
					}
				} else {
					var keys = d3.entries(result[d.kci + ":" + admr]);

					if (keys.length <= 0) {   
						var res = result[d.kci + ":" + admr]
						var val = null;
						if(!isNaN(parseFloat(res)) && isFinite(res)) //a number result
						{
						 	val = res.toFixed(2)
						}                                                         
						else if(res instanceof Array)
						{
							val = res.length 
						}
					 	domain.select("#" + d.valueId).html(val + " " + d.units);
						d.value = val + " " + d.units;
						
					} else {
						var amount = 0;
						keys.forEach(function(d) {
							//console.log(d.value);
							amount += d.value;
						});
						domain.select("#" + d.valueId).html(Math.round(amount) + " " + d.units);
						d.liveValue = Math.round(amount) + " " + d.units;
					}

				}

			}



		});

	}

	function createSelectList(_properties, _domain, _class) {
		console.log("adding select list");
		var data = _properties.tickerData.layers;
		var domain = _domain;

		var layerSelector = domain.append("div")
			.attr("class", "layerSelector")


		var select = layerSelector.append("select")
			.attr("class", "select")
			.on("change", function() {
				_class.updateDataSet(_properties, this.value, _class);
				if (_properties.id == "cbs") {
					map.updateCbs(this.value);
				};

			})
			.on("mouseover", function(d) {
				d3.select("body").style("cursor", "pointer");
			})
			.on("mouseout", function(d) {
				d3.select("body").style("cursor", "default");
			});


		select.selectAll("option")
			.data(data)
			.enter()
			.append("option")
			.attr("value", function(d) {
				return d.value
			})
			.text(function(d) {
				return d.description
			})

	};

	init();

	return this;

};
// end domain class

function activateMap(_properties) {

	var index = parseInt(_properties.index);

	// /console.log("index :"+index);
	var map_container = d3.select("#map_container");
	map_container.style("z-index", 5);

	d3.selectAll(".domainInfo").style("visibility", "hidden");

	map_container.transition()
		.duration(500)
		.style("top", (menuHeight + widgetHeight + (index * widgetHeight)) + "px")
		.each("end", function() {
			map_container.style("z-index", 200);
		});

	for (var i = 0; i < domainList.length; i++) {

		//console.log("domain index :"+parseInt(domainList[i].index)+" --> id :"+domainList[i].mainDomain.id);
		d3.select("#map_container").style("z-index", 5);

		if (parseInt(domainList[i].index) < index) {
			d3.select("#" + domainList[i].id)
				.transition()
				.duration(750)
				.style("top", (menuHeight + (domainList[i].index * widgetHeight)) + "px")


		} else if (parseInt(domainList[i].index) == index) {
			d3.select("#" + domainList[i].id)
				.transition()
				.duration(750)
				.style("top", (menuHeight + (domainList[i].index * widgetHeight)) + "px")
				.each("end", function() {
					d3.selectAll(".domainInfo").style("visibility", "visible");
					map.addDomainLayer(_properties);

				});

		} else if (parseInt(domainList[i].index) > index) {
			d3.select("#" + domainList[i].id)
				.transition()
				.duration(750)
				.style("top", (menuHeight + mapHeight + (domainList[i].index * widgetHeight)) + "px")

		}


	};

};

function deActivateMap() {

	var index = domainList.length-1;

	// /console.log("index :"+index);
	var map_container = d3.select("#map_container");
	map_container.style("z-index", 5);

	d3.selectAll(".domainInfo").style("visibility", "hidden");

	map_container.transition()
		.duration(500)
		.style("top", (menuHeight + widgetHeight + (index * widgetHeight)) + "px")
		.each("end", function() {
			map_container.style("z-index", 200);
		});

	for (var i = 0; i < domainList.length; i++) {

		//console.log("domain index :"+parseInt(domainList[i].index)+" --> id :"+domainList[i].mainDomain.id);
		d3.select("#map_container").style("z-index", 5);

		if (parseInt(domainList[i].index) < index) {
			d3.select("#" + domainList[i].id)
				.transition()
				.duration(750)
				.style("top", (menuHeight + (domainList[i].index * widgetHeight)) + "px")


		} else if (parseInt(domainList[i].index) == index) {
			d3.select("#" + domainList[i].id)
				.transition()
				.duration(750)
				.style("top", (menuHeight + (domainList[i].index * widgetHeight)) + "px")
				.each("end", function() {
					d3.selectAll(".domainInfo").style("visibility", "visible");
				});

		} else if (parseInt(domainList[i].index) > index) {
			d3.select("#" + domainList[i].id)
				.transition()
				.duration(750)
				.style("top", (menuHeight + mapHeight + (domainList[i].index * widgetHeight)) + "px")

		}


	};

};
