'use strict';




$("#btn-download").click( function() {
	console.log("test");

	console.log("Download starting");

 	// Variable for File Content
 	var contentOfFile = null;
 	var temp = null;

 	// get all information about one thing
 	$.ajax({
		url: getURL() + '/api/things/' + DownloadThingID,
		global: false,
		type: 'GET',
		async: false,
		success: function(thing) {
			console.log("1 ajax call works");
			contentOfFile = thing;
			console.log(contentOfFile);
		} // sucess GET THING
	});  // END AJAX CALL THING

	$.ajax({
		url: getURL() + '/api/things/' + DownloadThingID + '/sensors',
		global: false,
		type: 'GET',
		async: false,
		success: function(sensors) {
			console.log("2 ajax call works");
			$.extend(true, contentOfFile, sensors);
		} // sucess GET SENSORS
	}); // END AJAX CALL SENSORS


 	var content = JSON.stringify(contentOfFile);
 	console.log(content);

	var filename = $("#downloadFileName").val();
	var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
	saveAs(blob, filename + ".json");
});


