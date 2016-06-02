'use strict';

// Load the application's configuration
var config = require('../server/config');
const url  = config.express_host + '/api';

// Required modules
var async   = require('async');
var request = require('request');

// Count, how many things should be created
const countThings   = process.argv[2] || 1; 

// Bounding Box Parameter as a tupel of coordinates
const x1  = process.argv[3] || 52.012677; // p1
const y1  = process.argv[4] || 7.479902;
const x2  = process.argv[5] || 51.927650; // p3
const y2  = process.argv[6] || 7.732587;


// ------------------------------------------------------------

function mainMethod() {
	console.log('Starting to fill Database...');

	for(var i=0; i < countThings; i++) {

		// Create Random Points inside Polygon
		var point = RandomPointInPolygon(x1, y1, x2, y2);

		var thingLocLat = point[0];
		var thingLocLng = point[1];
		
		console.log('Creating thing Nr ' + i);
		createData(countThings, createRandomThingName, thingLocLat, thingLocLng);
	}
	console.log('Filled Database...');
}

	// ------------------------------------------------------------

// Create Random Point and Test if inside polygon, if not creating again
function RandomPointInPolygon (x_min, y_max, x_max, y_min) {

	// Creating Random Points with p1 and p3
	var lat = y_min + (Math.random() * (y_max - y_min));
    var lng = x_min + (Math.random() * (x_max - x_min));

	// Values of two missing points of rectangle (p2 and p4)
	var x3 = x2;
	var y3 = y1;
	var x4 = x1;
	var y4 = y2;

	// 
	var point = [lng, lat];
	var polygon = [ [ x1, y1 ], [ x2, y2 ], [ x3, y3 ], [ x4, y4 ] ];
	// return boolen value
	var pointinside = inside(point, polygon);

	console.log(point);

	return point;
}

// test, if point inside rectangle; return boolean 
function inside(point, vs) {
    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
}	

function createRandomThingName() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for( var i=0; i < 6; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function getRandomInt (min, max) {
    var random =  Math.floor(Math.random() * (max - min + 1)) + min;
    return random;
}

function getRandomBoolean() {
	var randomNumber = Math.random() >= 0.2;
	return randomNumber;
}

	// ------------------------------------------------------------

function createData(countThings, thingName, thingLocLat, thingLocLng) {
	// var createSensor = getRandomBoolean();
	var countMeasurements = getRandomInt(5,50);
	var countsensors = getRandomInt(1,4);

	async.waterfall([
		// Create a new Thing
		function(callback) {
			console.log('Creating a new Thing...');
			
			const thingJson = { name: createRandomThingName(), loc: { coordinates: [ thingLocLat, thingLocLng ] }, userId: '572b5f591d02fae81d017729' };
			
			// Post the new Thing
			request.post({
				headers: {'content-type': 'application/json'},
				url: url + '/things',
				json: thingJson
				}, function(error, response, body) {
					if (!error) {
						console.log('New Thing crcountsensorseated.');
					}
					callback(error, body._id);
			});
		},
		// Create a new Sensor
		function(thingId, callback) {
			for (var i = 0; i < countsensors; i++) {
				console.log('Creating a new Sensor...');
				const sensorJson = { name: 'water gauge test', thingId: thingId, interval: 5000, featureId: '571f3db18727620c03fe94e1' };

				// Post the new Sensor
				request.post({
					headers: {'content-type': 'application/json'},
					url: url + '/sensors',
					json: sensorJson
					}, function(error, response, body) {
						if (!error) {
							console.log('New Sensor created.');
						}
						callback(error, body._id);
				});
			}
		},
		// Create X new Measurements
		function(sensorId, callback) {
			console.log("Insert Measurements now...");
			for (var i = 0; i < countMeasurements; i++) {
				console.log('Creating a new Measurement...');
				
				// Calculate the Measurement's value as a random number between 0 and 10
				let value = Math.random() * 10;
				
				let measurementJson = { date: Date.now(), value: value, sensorId: sensorId };
				
				// Post the new Measurement
				request.post({
					headers: {'content-type': 'application/json'},
					url: url + '/measurements',
					json: measurementJson
					}, function(error, response, body) {
						if (error) {
							callback(error);
						} else {
							console.log('New Measurement created.');
						}
				});
			}
		}
	], function(err, result) {
		if (err) {
			console.log(err);
		}
	});
}

mainMethod();