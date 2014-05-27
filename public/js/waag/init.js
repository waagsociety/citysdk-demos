var WAAG = WAAG || {};

var widgetHeight = 224;
var menuHeight = 6.5*16; // 6.5em --> css .menu_container
var mapWidth = 768;
var mapHeight = 576;

var toolTip;
var map;
var colorScheme = "Oranges";

var rangeCB = 9; //range colorbrewer
var colorStepper = 3; // use of colors
var infoActive = false;
var menuActive = false;
var language = "eng";
var updatableGraphs=[]; // array for dynamic updating colors etc

var isEven = function(index) {
	return (index % 2 == 0) ? true : false;
};


function initDashboard() {
	
	console.log("day now ="+dayNow);
	if(dayNow==1){
		colorScheme="Blues";
	}
	
	console.log("kick off dashboard");
	
	if (Modernizr.touch){
	   console.log("touch events false");
	}
	
	console.log("touch events :"+Modernizr.touch);
	
	d3.select("#menu_settings").style("background-color", colorbrewer[colorScheme]['9'][0]);
	
	var colorSchemePicker=d3.select("#menu_settings")
	var colorData=[];
	for (var key in colorbrewer) {
		
		//console.log(key);
		if(key=="Oranges" || key=="Blues" || key=="Greens" || key=="Reds" || key=="Purples" || key=="Greys")
		if(colorbrewer[key][rangeCB]){
			colorData.push({key:key, description:key, colors:colorbrewer[key][rangeCB]});
		}
		
	}
	
	setColorPicker(colorData, colorSchemePicker);
	
	toolTip = d3.select("body").append("div")
		.attr("class", "tooltip")
		.attr("id", "toolTip")
		.style("opacity", 0);

	window.addEventListener('resize', onWindowResize, false);
	onWindowResize(null);
	
	d3.select(".menu_container").style("background-color", colorbrewer[colorScheme]['9'][1]);
	
	// set menu header text
	d3.select("#admr").html(admrHeader);

	d3.select("#info_page").style("background-color", colorbrewer[colorScheme]['9'][0]);
	
	// set main info text
	d3.html("text-content/main_info.html", function(d) {
		var t = d.querySelector("#" + language);
		var infoHtml=d3.select("#info_content");
		infoHtml.html(t.innerHTML);
		
		var el = document.getElementById("info_page"); // or other selector like querySelector()
		var rect = el.getBoundingClientRect(); // get the bounding rectangle
		
		d3.select("#info_page").style("top", menuHeight - rect.height - 32 + "px");
		
			
	});
	
	domainList = createDomains(); // set and initiated in repository.js


	for (var i = 0; i < domainList.length; i++) {
		domainList[i].index = i;
		var domain = new WAAG.Domain(domainList[i]);

	};

	map = new WAAG.Map(domainList);

	var yf = menuHeight + (domainList.length * widgetHeight) + mapHeight;

	var footer = d3.select("#stage").append("div")
		.attr("class", "footer")
		.style("top", yf + "px")
		.style("background-color", colorbrewer[colorScheme]['9'][1])

	footer.append("div")
		.attr("class", "logo")
		.style("margin-top", 10 + "px")
		.attr("id", "logo-partners")
		.on("click", function() {
			window.open("http://www.waag.org");
		});
		
		




};

function setInfoPage() {

	var el = document.getElementById("info_page"); // or other selector like querySelector()
	var rect = el.getBoundingClientRect(); // get the bounding rectangle
	var infoPage = d3.select("#info_page");


	if (infoActive) {
		infoPage.transition()
			.duration(500)
			.style("top", menuHeight - rect.height - 32 + "px");

		infoActive = false;

	} else {
		infoPage.transition()
			.duration(500)
			.style("top", menuHeight + "px");

		infoActive = true;
	}

}

function setSettingsPanel() {

	var el = document.getElementById("menu_settings"); // or other selector like querySelector()
	var rect = el.getBoundingClientRect(); // get the bounding rectangle
	var menuPanel = d3.select("#menu_settings");


	if (infoActive) {
		menuPanel.transition()
			.duration(500)
			.style("top", menuHeight - rect.height - 32 + "px");

		infoActive = false;

	} else {
		menuPanel.transition()
			.duration(500)
			.style("top", menuHeight + "px");

		infoActive = true;
	}

}


function change() {
	console.log("value =" + this.value);
	var value = this.value;

};

function onWindowResize(event) {
	console.log('resize');

	w = window.innerWidth;
	h = window.innerHeight;
	var stage = d3.select("#stage").style("left", (window.innerWidth / 2) - (mapWidth / 2) + "px");

};


function setColorPicker(data, colorSchemePicker) {

	
	var table = colorSchemePicker.append("table")
	.style("border-spacing", 0+"px"+" "+6+"px" )
    var tbody = table.append("tbody")
	
    // create a row for each object in the data
    var rows = tbody.selectAll("tr")
        .data(data)
        .enter()
        .append("tr")
		
		
	var columns=["description"];
	for(var i=0; i<4; i++){
		columns.push(i);
	}

    //create a cell in each row for each column
    var cells = rows.selectAll("td")
        .data(function(row) {
			return columns.map(function(column) {
				
				if(column=="description"){
					return {column: column, value: row[column], key:row[column]};
				}else{
					return {column: column, value: false, color:row["colors"][column], key:row["key"]};
				}
			     
			 });
        })
        .enter()
        .append("td")
		.style("height", 24+"px")
		.style("width", 24+"px")
		.style("padding", 0+"px")
		.style("background-color", function(d){return d.color})
		.on("mouseover", function(d) {
			d3.select("body").style("cursor", "pointer");

		})
		.on("mouseout", function(d) {
			d3.select("body").style("cursor", "default");
		})
		.on("click", function(d) {
			console.log(d.key);
			colorScheme=d.key;
			updateMainColors();
			setSettingsPanel();
		})
        .html(function(d) { if(d.value) return d.value; })

}

function updateMainColors(){
	
	console.log("updating main colors");
	d3.select("#info_page").style("background-color", colorbrewer[colorScheme]['9'][0]);
	d3.select(".menu_container").style("background-color", colorbrewer[colorScheme]['9'][1]);
	d3.select(".footer").style("background-color", colorbrewer[colorScheme]['9'][1]);
	d3.select("#menu_settings").style("background-color", colorbrewer[colorScheme]['9'][0]);
	
	for (var i = 0; i < domainList.length; i++) {
		var domain=d3.select("#"+domainList[i].id);
		
		domain.style("background-color", function() {
			console.log("setting color index =" + domainList[i].index % (colorStepper))			
			var color=getColor(domainList[i].index );
			domain.select("#domainHeader").style("background-color", color);
			domain.select(".domainInfo").style("background-color", color);

			return color;
		})


	};
	
	for(var i=0; i<updatableGraphs.length; i++){
		if(updatableGraphs[i].updateColors){
			updatableGraphs[i].updateColors();
		}
		
	}

}

function getColor(index){
	var color;
	if (isEven(parseInt(index / colorStepper))) {
		color = colorbrewer[colorScheme]['9'][index % (colorStepper)];
	} else {
		color = colorbrewer[colorScheme]['9'][colorStepper - index % (colorStepper)];
	}
	return color;
	
	
}


