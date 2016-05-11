'use strict';

let map, markers, thingName, thingDetails;

const markerOptions = {
	radius: 3,
	weight: 1,
	opacity: 1,
	fillOpacity: 0.8
};

// Request the data from the REST API
function requestThings() {
	$.ajax({
		url: getURL() + '/api/things',
		global: false,
		type: 'GET',
		async: false,
		success: function(things) {
			drawMarkers(things);
		}
	});
};

function requestMeasurementsLatest(id) {
	$.ajax({
		url: getURL() + '/api/things/' + id + '/measurements/latest',
		global: false,
		type: 'GET',
		async: false,
		success: function(measurements) {
			let content = '';
			if (measurements.length == 0) {
				content = '<strong>Keine Messwerte vorhanden</strong>';
			} else {
				content = '<table class="table table-hover table-condensed table-responsive"><tr><th>Sensor</th><th>Datum</th><th>Wert</th></tr>';
				measurements.forEach(function(measurement, key) {
					let date = new Date(measurement.date);
					content += '<tr id="' + measurement.sensorId + '" class="sensor-row">' +
						'<td><a href="#" onclick="chartHandler.requestData(\'' + measurement.sensorId + '\')">' + measurement.sensorId + '</a></td>' +
						'<td>' + date.toDateString() + '</td>' +
						'<td>' + measurement.value + '</td>' +
					'</tr>';
				});
				content +=  '</table>';
			}
			thingDetails.innerHTML = content;
		}
	});
}

// Draw the markers on the map
function drawMarkers(things) {
	let geoJsonFeatures = [];
	things.forEach(function(thing, key) {
		geoJsonFeatures.push({
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [
					thing.loc.coordinates[1],
					thing.loc.coordinates[0]
				]
			},
			properties: {
				title: thing.name,
				id: thing._id				
			}
		});
	});

	// Add markers to the map
	markers = L.mapbox.featureLayer(geoJsonFeatures, {
		pointToLayer: function(feature, latlon) {
			return L.circleMarker(latlon, markerOptions);
		}
	}).addTo(map);

	markers.on('click', function(e) {
		// Get the marker's properties
		let props = e.layer.feature.properties;
		// Set the name in the details section
		thingName.innerHTML = 'Details - ' + props.title;
		// Set the latest Measurements in the details section
		requestMeasurementsLatest(props.id);
		// Clear the chart
		chartHandler.clear();
	});

	updateMap();
};

function addMarker(thing) {
	let geoJsonFeature = {
		type: 'Feature',
		geometry: {
			type: 'Point',
			coordinates: [
				thing.loc.coordinates[1],
				thing.loc.coordinates[0]
			]
		},
		properties: {
			title: thing.name,
			id: thing._id
		}
	};
	markers.addLayer(L.mapbox.featureLayer(geoJsonFeature, {
		pointToLayer: function(feature, latlon) {
			return L.circleMarker(latlon, markerOptions);
		}
	}));

	updateMap();
}

function updateMap() {
	// Pan the map so that all markers are visible
	map.fitBounds(markers.getBounds());
}

// Initialize the map
$(document).ready(function() {
	L.mapbox.accessToken = getMapboxAccessToken();
	
	map = L.mapbox.map('livemap', 'mapbox.streets')
		.setView([51.973387, 7.700213], 10)
		.addControl(L.mapbox.geocoderControl('mapbox.places'));
	
	thingName    = document.getElementById('thingname');
	thingDetails = document.getElementById('thingdetails');

	requestThings();
});