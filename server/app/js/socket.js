'use strict';

let socket = io(getURL());

// Connection established
socket.on('connect', function() {
	console.log('Socket connected!');
});

// Connection lost
socket.on('disconnect', function() {
	console.log('Socket lost connection...');
});

// New Thing created
socket.on('things', function(thing) {
	// Add marker on map
	addMarker(thing);
});

// New Sensor created
socket.on('sensors', function(sensor) {
	// Do nothing so far...
});

// New Measurement created
socket.on('measurements', function(measurement) {
	// add measurement to chart
});
