'use strict';


var contentOfFile = null;

$("#btn-download").click( function() {
 	$.ajax({
		url: getURL() + '/api/things/' + DownloadThingID,
		global: false,
		type: 'GET',
		async: false,
		success: function(thing) {
			contentOfFile = thing;
			querySensors();
		},
		error: function(jqXHR, exception) {
				alert("Query of requested Thing didn't work.");
		}
	});  
});

function querySensors() {
	$.ajax({
		url: getURL() + '/api/things/' + DownloadThingID + '/sensors',
		global: false,
		type: 'GET',
		async: false,
		success: function(sensors) {
			queryFeatureOfEachSensor(0, sensors);
		},
		error: function(jqXHR, exception) {
				alert("Query of requested Sensor didn't work");
		}
	}); 
}

function queryFeatureOfEachSensor(pos, sensors) {
	if(pos == sensors.length) {
		queryMeasurementsOfEachSensor(0, sensors);
	} else {
		$.ajax({
			url: getURL() + '/api/features/' + sensors[pos].featureId,
			global: false,
			type: 'GET',
			async: false,
			success: function(feature) {
				sensors[pos].feature = feature;
				delete sensors[pos].featureId;
				queryFeatureOfEachSensor(pos + 1, sensors);
			},
			error: function(jqXHR, exception) {
				alert("Query of requested Feature belonging to a Sensor didn't work");
			}
		}); 
	}
}

function queryMeasurementsOfEachSensor(pos, sensors) {
	if(pos == sensors.length) {
		contentOfFile.sensors = sensors;
		saveToFile();
	} else {
		$.ajax({
			url: getURL() + '/api/sensors/' + sensors[pos]._id + '/measurements',
			global: false,
			type: 'GET',
			async: false,
			success: function(measurements) {
				sensors[pos].measurements = measurements;
				queryMeasurementsOfEachSensor(pos + 1, sensors);
			},
			error: function(jqXHR, exception) {
				alert("Query of requested Measurements belonging to a Sensor didn't work");
			}
		});
	}
}

function saveToFile() {
	var filename = $("#downloadFileName").val();
	var blob = new Blob([JSON.stringify(contentOfFile, null, 3)], {type: "text/plain;charset=utf-8"});
	saveAs(blob, filename + ".json");
}


