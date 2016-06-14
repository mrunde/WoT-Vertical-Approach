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

// New Feature created
socket.on('features', function(feature) {
	// Add the new Feature to the store
	store.addFeature(feature);
});

// New Thing created
socket.on('things', function(thing) {
	// Add the new Thing as a marker to the map
	addMarker(thing);
});

// New Sensor created
socket.on('sensors', function(sensor) {
	// Add the new Sensor to the list of Sensors for the selected Thing
	if (store.currentThingId && store.currentThingId == sensor.thingId) {
		requestMeasurementsLatest(store.currentThingId);
	}
});

// New Measurement created
socket.on('measurements', function(measurement) {
	// Add the new Measurement to the table and chart
	if (store.currentThingSensors[measurement.sensorId]) {
		requestMeasurementsLatest(store.currentThingId);
		chartHandler.addMeasurement(measurement);
	}
});
