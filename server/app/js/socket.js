'use strict';

let socket = io(getURL());
let socketEnabled = true;

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
	if (currentSensor && socketEnabled) {
		// Add to table
		requestMeasurementsLatest(store.currentThingId);
		// Add to chart
		chartHandler.addMeasurement(measurement);

		// Check whether the new Measurement is greater than the Sensor's warn or risk level
		// Then notify the user, if notifcations are enabled
		if (measurement.value >= currentSensor.warnLevel && store.showNotifications) {
			
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

			let title, message, icon = 'https://raw.githubusercontent.com/mrunde/WoT-Vertical-Approach/master/server/app/img/marker.png';

			if (measurement.value >= currentSensor.riskLevel) {
				// Risk level reached
				title = 'DANGER!';
				message = 'Sensor reached risk level\nID: ' + measurement.sensorId;

				if (window.Notification && Notification.permission === 'granted') {
					let notification = new Notification(title, { body: message, tag: measurement.sensorId, icon: icon });
				} else {
					toastr.error(message, title, toastrOptions);
				}
			} else {
				// Warn level reached
				title = 'WARNING!';
				message = 'Sensor reached warn level\nID: ' + measurement.sensorId;

				if (window.Notification && Notification.permission === 'granted') {
					let notification = new Notification(title, { body: message, tag: measurement.sensorId, icon: icon });
				} else {
					toastr.warning(message, title, toastrOptions);
				}
			}
		}
	}
});

window.addEventListener('load', function () {
	// Check for browser notification permission
	if (window.Notification && Notification.permission !== 'granted') {
		Notification.requestPermission(function(status) {
			if (Notification.permission !== status) {
				Notification.permission = status;
			}
		});
	}
});