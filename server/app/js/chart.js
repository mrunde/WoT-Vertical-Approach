'use strict';

/**
 * Helper class to create and manage the chart.
 * Chart is created with Chart.js
 * @Constructor
 * @param {String} container - The id of the DOM element to render the chart to.
 */
function ChartHandler(container){
	this.container = document.getElementById(container).getContext("2d");

	// init chart
	this.lineChart = new Chart.Line(this.container, getDefault());

	this.sensorId = null;

	/**
	 * Gets the default settings for the chart when being cleared or at first initialisation.
	 * @return {JSONObject} Default settings for the chart.
	 */
	function getDefault() {
		const defaultData = {
			data: {
				labels: [],
				datasets: [
					{
						label: 'Water Level',
						backgroundColor: 'rgba(255,255,255,0)',
						borderColor: 'rgba(31,75,255,1)',
						data: []
					}
				]
			},
			options: {}
		};
		return defaultData;
	}

	/**
	 * Request all Measurements of a Sensor.
	 * @param {Number} sensorId Sensor's unique ID.
	 */
	ChartHandler.prototype.requestData = function(sensorId) {
		$.ajax({
			url: getURL() + '/api/sensors/' + sensorId + '/measurements',
			global: false,
			type: 'GET',
			async: false,
			success: function(measurements) {
				// Change the style of all table rows
				let sensorRows = document.getElementsByClassName('sensor-row');
				for (var i = 0; i < sensorRows.length; i++) {
					sensorRows[i].className = 'sensor-row';
				}
				// Change the style of the clicked table row to highlight it
				let selectedRow = document.getElementById(sensorId);
				selectedRow.className += ' info';

				// Store the Sensor's unique ID
				chartHandler.sensorId = sensorId;
				
				// Store the Sensor's Measurements
				chartHandler.setData(measurements);
			}
		});
	}

	/**
	 * Sets the data of the chart. The data has to fit the
	 * schema of a measurement as described by the REST API.
	 * @param {Measurement[]} measurements - The measurements to display in the chart.
	 */
	ChartHandler.prototype.setData = function(measurements) {
		let labels = [];
		let values = [];

		for (let x = 0; x < measurements.length; x++) {
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
		if (measurement.sensorId == this.sensorId) {
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

	ChartHandler.prototype.clear = function() {
		this.lineChart = new Chart.Line(this.container, getDefault());
	}
}

let chartHandler = new ChartHandler('waterLevelChart');