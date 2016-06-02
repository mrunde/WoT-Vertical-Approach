'use strict';

 function downloadThingData() {

 	// Variable for File Content
 	var contentOfFile;

 	// get all sensors of one thing
 	$.ajax({
		url: getURL() + '/api/things/' + DownloadThingID + '/sensors',
		global: false,
		type: 'GET',
		async: false,
		success: function(sensors) {

			// über onclick callback function id des things abfragen
			console.log("sucessfully get sensors");

			var file = new File(["Hello, world!"], "hello world.txt", {type: "text/plain;charset=utf-8"});
			saveAs(file);

			// var file = new File(["Hello, world!"], "hello world.txt", {type: "text/plain;charset=utf-8"});
			var fileToDownload = new File(sensors, DownloadThingID + ".json", {type: "text/plain;charset=utf-8"});
			console.log("funktioniert");
			saveAs(fileToDownload);
		}
	});

 	

	//var fileToDownload = new File(contentOfFile, fileName + ".json", {type: "text/plain;charset=utf-8"});
	//saveAs(fileToDownload);
}