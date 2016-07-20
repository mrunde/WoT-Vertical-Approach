'use strict';

let map, markers, thingName, thingMetaInformation, thingDetails;
let geojson = [];
let mapInitialization = true, hideDownloadButton = true;

const markerOptions = {
	radius: 3,
	weight: 1,
	opacity: 1,
	fillOpacity: 0.8
};

// Request the data from the REST API
function requestThings() {
	return $.ajax({
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

// Request a waterbody by its name (temporary)
function requestWaterbody(name) {
	$.ajax({
		url: getURL() + '/api/waterbodies/name/' + name,
		global: false,
		type: 'GET',
		async: false,
		success: function(waterbody) {
			addWaterbody(waterbody);
		}
	});
}

// Add a waterbody to the map, remove others (temporary)
function addWaterbody(river) {
	river.properties.stroke = "#0066ff";
	river.properties["stroke-width"] = 3;

	var riverLayer = map.featureLayer.setGeoJSON(river);
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
				$('#chart').attr('hidden', true);

				content = '<div class="well">No measurements available</div>';
				hideDownloadButton = true;

				$.ajax({
					url: getURL() + '/api/sensors',
					global: false,
					type: 'GET',
					async: false,
					success: function(sensors) {
						sensors.forEach(function(sensor) {
							store.addSensor(sensor);
						});
					}
				});
			} else {
				store.currentThingSensors = [];

				content = '<table class="table table-hover table-condensed table-responsive">' +
					'<tr>' +
						'<th class="text-center">ID</th>' +
						'<th class="text-center">Sensor</th>' +
						'<th class="text-center">Feature</th>' +
						'<th class="text-center">Latest</th>' +
						'<th class="text-center">Value</th>' +
						'<th class="text-center bg-warning">Warn</th>' +
						'<th class="text-center bg-danger">Risk</th>' +
						'<th class="text-center">Interval</th>'
					'</tr>';
				
				measurements.forEach(function(measurement, key) {
					let currentDate         = new Date(measurement.date);
					let currentMonth        = (currentDate.getMonth() + 1) < 10 ? '0' + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1);
					let currentDateAsString = currentDate.getFullYear() + '-' + currentMonth  + '-' + currentDate.getDate();
					
					$.ajax({
						url: getURL() + '/api/sensors/' + measurement.sensorId,
						global: false,
						type: 'GET',
						async: false,
						success: function(sensor) {
							store.addSensor(sensor);
						}
					});
					let currentSensor  = store.currentThingSensors[measurement.sensorId];
					
					let currentFeature = store.features[measurement.featureId];

					content += '<tr id="' + measurement.sensorId + '" class="sensor-row" onclick="chartHandler.requestData(\'' + measurement.sensorId + '\', \'' + currentSensor.warnLevel + '\', \'' + currentSensor.riskLevel + '\', \'' + measurement.featureId + '\')">' +
						'<td class="text-center">' + measurement.sensorId + '</td>' +
						'<td class="text-center">' + currentSensor.name + '</td>' +
						'<td class="text-center">' + currentFeature.name + '</td>' +
						'<td class="text-center">' + currentDateAsString + '</td>' +
						'<td class="text-right">' + measurement.value + ' ' + currentFeature.unit + '</td>' +
						'<td class="text-right">' + currentSensor.warnLevel + ' ' + currentFeature.unit + '</td>' +
						'<td class="text-right">' + currentSensor.riskLevel + ' ' + currentFeature.unit + '</td>' +
						'<td class="text-right">' + currentSensor.interval + ' ms</td>' +
					'</tr>';
				});
				content += '</table>';

				if ($('#chart').attr('hidden')) {
					content += '<div id="chartWell" class="well">' +
						'Click on a sensor row for a chart visualisation...' +
					'</div>';
				}
				
				hideDownloadButton = false;
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

		// Set the meta information in the meta section
		thingMetaInformation.innerHTML = '<button type="button" class="btn btn-primary btn-xs" onclick="panTo(' + coords[1] + ', ' + coords[0] + ')">' +
			'<i class="fa fa-map-marker" aria-hidden="true"></i>' +
			'&nbsp;' + coords[1] + ',&nbsp;' + coords[0] +
		'</button>';

		// Set the latest Measurements in the details section
		requestMeasurementsLatest(props.id);

		// Clear the chart
		chartHandler.setData([]);

		// Save Thing's ID + name for download
		store.currentThingId   = props.id;
		store.currentThingName = props.title;

		// Display the download button
		if (hideDownloadButton && !$('#thingDownload').hasClass('hidden')) {
			$('#thingDownload').addClass('hidden');
		} else if (!hideDownloadButton) {
			$('#thingDownload').removeClass('hidden');
		}
		$('#DownloadOptions').html("Download-Options for Thing: " + store.currentThingId);
		$('#downloadFileName').value = store.currentThingName;
		
		// Update the weather
		let forecastUrl = 'http://forecast.io/embed/#lat=' + coords[1] + '&lon=' + coords[0] + '&name=' + props.title + '&units=si';
		let forecast = '<iframe id="forecast_embed" type="text/html" frameborder="0" height="245" width="100%" src="' + forecastUrl + '"> </iframe>';
		$('#forecast').html(forecast);
		$('#radar').html('<img src="http://www.dwd.de/DWD/wetter/radar/radfilm_brd_akt.gif" height="245" />');
	});

	if(geojson.length > 0)
		map.fitBounds(markers.getBounds());
};


function panTo(lat, lng) {
	map.panTo(L.latLng(lat, lng));
}

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
}