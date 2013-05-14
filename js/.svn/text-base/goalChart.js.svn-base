// Our Axes
var axes = ["Career","Soft skills","Hard skills","Work-life balance","Entrepreneurship"];

// Label positions
var labelPosX = [150, 10, 50, 185, 200];
var labelPosY = [20, 110, 280, 280, 110];

// Default state
var def = [
	{axis: axes[0], value: 5}, 
	{axis: axes[1], value: 5}, 
	{axis: axes[2], value: 5},  
	{axis: axes[3], value: 5},  
	{axis: axes[4], value: 5}
];

// Initialize the goals chart
function initGoals() {
	// Local storage not supported - use default values
	if (!supportsLocalStorage()) {
		RadarChart.draw("#goal_chart",[def]);
		return;
	}
	
	// Local storage supported but not initialized - use default values; store them
	if (getLocal("profileStored") != "true") {
		storeLocally("profileStored", "true");
		for (i=0; i<5; i++) { 
			storeLocally("axis"+i+"-input",5); 
		}
		RadarChart.draw("#goal_chart",[def]);
	}

	// Use locally stored values
	radar = [];
		for (i=0; i<5; i++) {
		t = getLocal("axis"+i+"-input");
		radar.push({axis: axes[i], value: t/10});
		$("#axis"+i+"-input").attr("value",t);
	}
	RadarChart.draw("#goal_chart", [radar]);
}

// Initialize goal form
function initGoalForm() {
	// Turn those mofos into buttons
	$("#cpop").button();
	$("#spop").button();
	$("#hpop").button();
	$("#wlpop").button();
	$("#epop").button();
	
	// Add event handlers to sliders
	$(".ipt_slider").on('slidestop', function(e) {
		storeLocally(e.currentTarget.id,e.currentTarget.value);
		d = [[
			{axis: axes[0], value: ($("#axis0-input").val()/10)},
			{axis: axes[1], value: ($("#axis1-input").val()/10)},
			{axis: axes[2], value: ($("#axis2-input").val()/10)},
			{axis: axes[3], value: ($("#axis3-input").val()/10)},
			{axis: axes[4], value: ($("#axis4-input").val()/10)},
		]];
		RadarChart.draw("#goal_chart", d);
	});
	
	// Update sliders if needed
	try { $(".ipt_slider").slider('refresh'); } 
	catch (e) { console.log(e); $(".ipt_slider").slider(); }
}

// Local storage utility functions

function supportsLocalStorage() {
	try {
		return 'localStorage' in window && window['localStorage'] !== null;
	} catch (e) {
		return false;
	}
}

function storeLocally(idx, v) {
	if (supportsLocalStorage()) {
		localStorage[idx] = v;
		return true;
	} else return false;
}

function getLocal(idx) {
	if (supportsLocalStorage()) return localStorage[idx];
	else return false;
}


