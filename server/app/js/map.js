'use strict';

let map, markers, thingName, thingDetails, riverTiles;
let geojson = [];
let mapInitialization = true;

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

// Request the last 24h from the REST API
function requestLast24h() {
	
	let dateFrom = new Date();
	let dateTo = new Date();
	dateFrom.setHours(dateTo.getHours() - 24);

	$.ajax({
		url: getURL() + '/api/things/temporal/' + dateFrom.toISOString()  + '/'  + dateTo.toISOString(),
		global: false,
		type: 'GET',
		async: false,
		success: function(things) {
			drawMarkers(things);
		}
	});
}

// Request the last 7d from the REST API
function requestLast7d() {
	
	let dateFrom = new Date();
	let dateTo = new Date();
	dateFrom.setHours(dateTo.getHours() - 7 * 24);

	$.ajax({
		url: getURL() + '/api/things/temporal/' + dateFrom.toISOString()  + '/'  + dateTo.toISOString(),
		global: false,
		type: 'GET',
		async: false,
		success: function(things) {
			drawMarkers(things);
		}
	});
}

// Request a river by its name (temporary)
function requestRiver(name) {
	$.ajax({
		url: getURL() + '/api/waterbodies/name/' + name,
		global: false,
		type: 'GET',
		async: false,
		success: function(data) {
			console.log(data);
			addRiver(data);
		}
	});
}

// Add a river to the map, remove others (temporary)
function addRiver(river) {
	var coordinates = [];
	for(var i = 0; i < river.length; i++) {
		coordinates.push(river[i].loc.coordinates);
	}
	river[0].loc.coordinates = coordinates;
	river[0].loc.type = "MultiLineString";

	var riverJSON = {
		"type": "Feature",
		"geometry": river[0].loc,
		"properties": {
			"title": river[0].name,
			"stroke": "#0066ff",
			"stroke-width": 3	
		}
	}

	var riverLayer = map.featureLayer.setGeoJSON(riverJSON);
}

// Request the latest Measurements of the selected Thing
function requestMeasurementsLatest(id) {
	$.ajax({
		url: getURL() + '/api/things/' + id + '/measurements/latest',
		global: false,
		type: 'GET',
		async: false,
		success: function(measurements) {
			let content = '';
			if (measurements.length == 0) {
				content = '<div class="well">No measurements available</div>';
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
	// Remove any existing markers from the map before drawing new ones
	if (markers) {
		map.removeLayer(markers);
	}

	geojson = [];
	things.forEach(function(thing, key) {
		geojson.push({
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
				id: thing._id,
				icon: {
					iconUrl: '../img/marker.png',
					iconSize: [32, 32],
					iconAnchor: [16, 16],
					popupAnchor: [0, -16]
				}
			}
		});
	});

	// Add markers to the map
	markers = L.mapbox.featureLayer().addTo(map);
	markers.on('layeradd', function(e) {
		var marker = e.layer;
		marker.setIcon(L.icon(marker.feature.properties.icon));
	});
	markers.setGeoJSON(geojson);

	markers.on('click', function(e) {
		// Get the marker's location and properties
		let coords = e.layer.feature.geometry.coordinates;
		let props  = e.layer.feature.properties;

		// Set the name in the details section
		thingName.innerHTML = 'Details - ' + props.title;
		// Set the latest Measurements in the details section
		requestMeasurementsLatest(props.id);

		// Clear the chart
		chartHandler.setData([]);

		// Update the weather forecast
		let forecastUrl = 'http://forecast.io/embed/#lat=' + coords[1] + '&lon=' + coords[0] + '&name=' + props.title + '&units=si';
		$('#forecast_embed').attr('src', forecastUrl);
	});

	updateMap();
};

// Add a new marker to the map
function addMarker(thing) {
	let newFeature = {
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
			id: thing._id,
			userId: thing.userId,
			icon: {
				iconUrl: '../img/marker.png',
				iconSize: [32, 32],
				iconAnchor: [16, 16],
				popupAnchor: [0, -16]
			}
		}
	};
	
	geojson.push(newFeature);

	markers.setGeoJSON(geojson);

	updateMap();
}

function updateMap() {
	// Pan the map so that all markers are visible
	if (geojson.length > 0 && mapInitialization) {
		map.fitBounds(markers.getBounds());
		mapInitialization = false;
	}
}

// Handle filter events

$('#filter_all').on('click', function() {
	$('#filter_all').removeClass('btn-default').addClass('btn-primary');
	$('#filter_last_24h').removeClass('btn-primary').addClass('btn-default');
	$('#filter_last_7d').removeClass('btn-primary').addClass('btn-default');
	$('#filter_my_things').removeClass('btn-primary').addClass('btn-default');
	$('#filter_custom').removeClass('btn-primary').addClass('btn-default');
	requestThings();
});

$('#filter_last_24h').on('click', function() {
	$('#filter_all').removeClass('btn-primary').addClass('btn-default');
	$('#filter_last_24h').removeClass('btn-default').addClass('btn-primary');
	$('#filter_last_7d').removeClass('btn-primary').addClass('btn-default');
	$('#filter_my_things').removeClass('btn-primary').addClass('btn-default');
	$('#filter_custom').removeClass('btn-primary').addClass('btn-default');
	requestLast24h();
});

$('#filter_last_7d').on('click', function() {
	$('#filter_all').removeClass('btn-primary').addClass('btn-default');
	$('#filter_last_24h').removeClass('btn-primary').addClass('btn-default');
	$('#filter_last_7d').removeClass('btn-default').addClass('btn-primary');
	$('#filter_my_things').removeClass('btn-primary').addClass('btn-default');
	$('#filter_custom').removeClass('btn-primary').addClass('btn-default');
	requestLast7d();
});

$('#filter_my_things').on('click', function() {
	$('#filter_all').removeClass('btn-primary').addClass('btn-default');
	$('#filter_last_24h').removeClass('btn-primary').addClass('btn-default');
	$('#filter_last_7d').removeClass('btn-primary').addClass('btn-default');
	$('#filter_my_things').removeClass('btn-default').addClass('btn-primary');
	$('#filter_custom').removeClass('btn-primary').addClass('btn-default');
	// TODO requestMyThings();
});

$('#filter_custom').on('click', function() {
	$('#filter_all').removeClass('btn-primary').addClass('btn-default');
	$('#filter_last_24h').removeClass('btn-primary').addClass('btn-default');
	$('#filter_last_7d').removeClass('btn-primary').addClass('btn-default');
	$('#filter_my_things').removeClass('btn-primary').addClass('btn-default');
	$('#filter_custom').removeClass('btn-default').addClass('btn-primary');
	// TODO requestCustom();
});

// Initialize the map
$(document).ready(function() {
	L.mapbox.accessToken = getMapboxAccessToken();
	
	map = L.mapbox.map('livemap')
		.setView([51.973387, 7.700213], 10)
		.addControl(L.mapbox.geocoderControl('mapbox.places'));
	
	L.control.layers({
		'Mapbox Streets':   L.mapbox.tileLayer('mapbox.streets').addTo(map),
		'Mapbox Dark':      L.mapbox.tileLayer('mapbox.dark'),
		'Mapbox Satellite': L.mapbox.tileLayer('mapbox.satellite')
	}).addTo(map);

	riverTiles = new L.TileLayer.MVTSource({
		// osm river data
		//url: "https://a.tiles.mapbox.com/v4/avi92.1hej6w31/{z}/{x}/{y}.vector.pbf?access_token=" + getMapboxAccessToken(),
		// mapbox water and waterway data
		url: "https://a.tiles.mapbox.com/v4/mapbox.mapbox-streets-v6/{z}/{x}/{y}.vector.pbf?access_token=" + getMapboxAccessToken(),
		debug: false,
		visibleLayers: ['water', 'waterway'],
		clickableLayers: ['water', 'waterway'],
		getIDForLayerFeature: function(feature) {
			return feature.id;
		},

		style: function(feature) {
			let style = {
				color: 'rgba(102, 217, 255, 0.8)',
				size: 2
			};

			return style;
		}
	});

	// riverTiles.addTo(map);
	map.on('zoomend', function() {
		riverTiles.setZIndex(5);
	});
	
	thingName    = document.getElementById('thingname');
	thingDetails = document.getElementById('thingdetails');

	requestThings();
});