'use strict';

// request all sensors of a thing
function requestSensors(thingId) {
	$.ajax({
		url: getURL() + '/api/sensors',
		global: false,
		type: 'GET',
		async: false,
		success: function(sensors) {
			console.log("ID: " + thingId);
			var sensorsOfThing = [];
			for(let x = 0; x < sensors.length; x++) {
				if(sensors[x].thingId == thingId){
					sensorsOfThing.push(sensors[x]);
				}
			}
			console.log(sensorsOfThing);
			if(sensorsOfThing.length == 1) {
				requestMeasurements(sensorsOfThing[0]._id);
			} else {
				//TODO: display selection
				requestMeasurements(sensorsOfThing[0]._id)
			}
		}
	});	
}

// request all measurements of a sensor
function requestMeasurements(sensorId) {
	$.ajax({
		url: getURL() + '/api/sensors/' + sensorId + '/measurements',
		global: false,
		type: 'GET',
		async: false,
		success: function(measurements) {
			chartHandler.sensorId = sensorId;
			chartHandler.setData(measurements);
		}
	});
}

/**
 * Helper class to create and manage the cart.
 * Chart is created with Chart.js
 * @Constructor
 * @param {String} container - The id of the DOM element to render the chart to.
 */
function ChartHandler(container){
	// default data with placeholder values
	this.defaultData = {
		labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		datasets: [
			{
				label: 'Water Level',
				backgroundColor: 'rgba(31,75,255,1)',
				borderColor: 'rgba(31,75,255,1)',
				data: [1,4,7,8,5,2,3,6,9,5,7,3]
			}
		]
	};

	this.container = document.getElementById(container).getContext("2d");

	// init chart
	this.lineChart = new Chart.Line(this.container, {
		data: this.defaultData,
		options: {}
	});

	this.sensorId = null;

	/**
	 * Sets the data of the chart. The data has to fit the
	 * schema of a measurement as described by the REST API.
	 * @param {Measurement[]} measurements - The measurements to display in the chart.
	 */
	ChartHandler.prototype.setData = function(measurements) {
		let labels = [];
		let values = [];

		for(let x = 0; x < measurements.length; x++) {
			labels.push(this.formatDate(new Date(measurements[x].date)));
			values.push(measurements[x].value);
		}
		this.lineChart.data.labels = labels;
		this.lineChart.data.datasets[0].data = values;

		this.lineChart.update();
	}

	/**
	 * Adds a single measurement to the chart data. The chart
	 * is then updated and redrawn.
	 * @param {Measurement} measurement - The measurement to add to the chart.
	 */
	ChartHandler.prototype.addMeasurement = function(measurement) {
		if(measurement.sensorId == this.sensorId) {
			let label = measurement.date;
			let value = measurement.value;

			this.lineChart.data.labels.push(this.formatDate(new Date(label)));
			this.lineChart.data.datasets[0].data.push(value);

			this.lineChart.update();
		}
	}

	/**
	 * Formats a given date into dd.mm.yyyy hh:mm:ss format.
	 * @param {Date} date - The date to format.
	 */
	ChartHandler.prototype.formatDate = function(date) {
		let seconds = date.getSeconds();
		let minutes = date.getMinutes();
		let hours 	= date.getUTCHours();
		let day 	= date.getDate();
		let month 	= date.getMonth() + 1;
		let year 	= date.getFullYear();

		return this.fillZero(day) + "." + this.fillZero(month) + "." + year + " " + this.fillZero(hours) + ":" + this.fillZero(minutes) + ":" + this.fillZero(seconds);
	}

	/**
	 * Inserts leading zero to number.
	 * @param {Number} number
	 */
	ChartHandler.prototype.fillZero = function(number) {
		if(number < 10)
			return "0" + number;
		return number; 
	}
}

let chartHandler = new ChartHandler('waterLevelChart');