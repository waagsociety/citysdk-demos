var WAAG = WAAG || {};

var widgetHeight = 224;
var menuHeight = 6.5*16; // 6.5em --> css .menu_container
var mapWidth = 768;
var mapHeight = 576;

var toolTip;
var map;
var colorScheme = "Oranges";

var rangeCB = 9; //range colorbrewer
var colorStepper = 2; // use of colors
var infoActive = false;
var language = "eng";


function initDashboard() {

	console.log("kick off dashboard");
	
	if (Modernizr.touch){
	   console.log("touch events false");
	}
	
	console.log("touch events :"+Modernizr.touch);

	toolTip = d3.select("body").append("div")
		.attr("class", "tooltip")
		.attr("id", "toolTip")
		.style("opacity", 0);

	window.addEventListener('resize', onWindowResize, false);
	onWindowResize(null);
	
	// set menu header text
	d3.select("#admr").html(admrHeader);
	
	// set main info text
	d3.html("text-content/main_info.html", function(d) {
		var t = d.querySelector("#" + language);
		var infoHtml=d3.select("#info_content");
		infoHtml.html(t.innerHTML);
		
		var el = document.getElementById("info_page"); // or other selector like querySelector()
		var rect = el.getBoundingClientRect(); // get the bounding rectangle
		
		d3.select("#info_page").style("top", menuHeight - rect.height - 32 + "px")
			
	});
	

	domainList = createDomains();


	for (var i = 0; i < domainList.length; i++) {
		domainList[i].index = i;
		var domain = new WAAG.Domain(domainList[i]);

	};

	map = new WAAG.Map(domainList);

	var yf = menuHeight + (domainList.length * widgetHeight) + mapHeight;

	var footer = d3.select("#stage").append("div")
		.attr("class", "footer")
		.style("top", yf + "px")

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
	//infoPage.style("top", menuHeight-rect.height-32+"px");

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
