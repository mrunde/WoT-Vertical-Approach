'use strict';

let socket = io(getURL());

// check initial connection
socket.on('connect', function() {
	console.log("Socket connected!");
});

// connect to things
socket.on('things', function(thing) {
	console.log(thing);
	// add marker to mapbox
});

// connnect to sensors
socket.on('sensors', function(sensor) {
	console.log(sensor);
});

// connect to measurements
socket.on('measurements', function(measurement) {
	// add measurement to chart
});

socket.on('disconnect', function() {
	console.log("Socket lost connection...");
});

