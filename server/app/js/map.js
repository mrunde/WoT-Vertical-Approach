'use strict';

let map, markers;

const markerOptions = {
	radius: 3,
	weight: 1,
	opacity: 1,
	fillOpacity: 0.8
};

// Request the data from the REST API
function requestData() {
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

// Draw the markers on the map
function drawMarkers(things) {
	// TODO: This is only a quick-and-dirty version. As soon as the REST API returns valid GeoJSON, this has to be changed adequately
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
				title: '<h5><span class="label label-success">' + thing.name + '</span></h5>',
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
		requestSensors(e.layer.feature.properties.id);
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
			title: '<h5><span class="label label-success">' + thing.name + '</span></h5>',
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

	requestData();
});