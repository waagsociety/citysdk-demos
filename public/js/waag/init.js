var WAAG = WAAG || {};

var widgetHeight = 224;
var menuHeight = 128;
var mapWidth = 768;
var mapHeight = 576;

var toolTip;
var map;
var colorScheme = "Oranges";

var rangeCB = 9; //range colorbrewer
var infoActive = false;


function initDashboard() {

	console.log("kick off dashboard");

	toolTip = d3.select("body").append("div")
		.attr("class", "tooltip")
		.attr("id", "toolTip")
		.style("opacity", 0);

	window.addEventListener('resize', onWindowResize, false);
	onWindowResize(null);

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
		.attr("id", "logo-waag")
		.on("click", function() {
			window.open("http://www.waag.org");
		});


	// footer.append("div")
	//     .attr("class", "logo")
	//     .style("margin-top", -46+"px")
	//     .style("margin-left", 478+"px")
	//     .attr("id", "logo-cc")


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
			.style("top", 128 + "px");

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
