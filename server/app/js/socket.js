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
	let currentSensor = store.currentThingSensors[measurement.sensorId];

	// Add the new Measurement to the table and chart
	if (currentSensor) {
		// Add to table
		requestMeasurementsLatest(store.currentThingId);
		// Add to chart
		chartHandler.addMeasurement(measurement);

		// Check whether the new Measurement is greater than the Sensor's warn or risk level
		if (measurement.value >= currentSensor.warnLevel) {
			let toastrOptions = {
				closeButton       : true,
				newestOnTop       : true,
				onClick           : chartHandler.requestData(measurement.sensorId, store.features[currentSensor.featureId].name),
				positionClass     : 'toast-bottom-right',
				preventDuplicates : true,
				progressBar       : false,
				showDuration      : '0',
				hideDuration      : '0',
				timeOut           : '-1',
				extendedTimeOut   : '0'
			};

			if (measurement.value >= currentSensor.riskLevel) {
				// Risk level reached
				toastr.error('Sensor reached risk level\nID:' + measurement.sensorId, 'DANGER!', toastrOptions);
			} else {
				// Warn level reached
				toastr.warning('Sensor reached warn level\nID:' + measurement.sensorId, 'WARNING!', toastrOptions);
			}
		}
	}
});
