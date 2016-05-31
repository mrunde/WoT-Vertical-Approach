'use strict';

/**
 * Helper class to create and manage the chart.
 * Chart is created with Chart.js
 * @param {String} container - The id of the DOM element to render the chart to.
 */
function ChartHandler(container){
	this.container = document.getElementById(container).getContext("2d");

	// init chart
	this.lineChart = new Chart.Line(this.container, getDefault());

	this.sensorId = null;

	this.maxElements = 25;

	/**
	 * Gets the default settings for the chart at first initialisation.
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
			options: {
				scales: {
					xAxes: [{
						type: 'time',
						time: {
							displayFormats: {
								millisecond: 'HH:mm:ss',
								second: 'HH:mm:ss',
								minute: 'HH:mm:ss',
								hour: 'HH:mm:ss',
								day: 'DD.MM.YYYY HH:mm:ss',
								week: 'DD.MM.YYYY HH:mm:ss',
								month: 'DD.MM.YYYY HH:mm:ss',
								quarter: 'DD.MM.YYYY HH:mm:ss',
								year: 'DD.MM.YYYY HH:mm:ss'
							}
						}
					}]
				}
			}
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
		measurements.sort(this.compareMeasurements);

		let labels = [];
		let values = [];

		for (let x = 0; x < measurements.length; x++) {
			labels.push(moment(measurements[x].date));
			values.push(measurements[x].value);
		}

		this.lineChart.data.labels = labels;
		this.lineChart.data.datasets[0].data = values;

		// if chart contains too many elements, remove oldest element
		if(this.lineChart.data.labels.length > this.maxElements) {
			this.lineChart.data.labels.splice(0, (this.lineChart.data.labels.length - this.maxElements));
			this.lineChart.data.datasets[0].data.splice(0, (this.lineChart.data.datasets[0].data.length - this.maxElements));
		}

		this.lineChart.update();
	}

	/**
	 * Adds a single measurement to the chart data. The chart
	 * is then updated and redrawn.
	 * @param {Measurement} measurement - The measurement to add to the chart.
	 */
	ChartHandler.prototype.addMeasurement = function(measurement) {
		if (measurement.sensorId == this.sensorId) {
			let label = moment(measurement.date);
			let value = measurement.value;

			// search for insertion point
			let insertPos = 0;
			for(let i = this.lineChart.data.labels.length; i > 0 ; i--) {
				if(this.lineChart.data.labels[i-1].isBefore(label)) {
					insertPos = i;
					break;
				}
			}
			this.lineChart.data.labels.splice(insertPos, 0, label);
			this.lineChart.data.datasets[0].data.splice(insertPos, 0, value);

			// if chart contains too many elements, remove oldest element
			if(this.lineChart.data.labels.length > this.maxElements) {
				this.lineChart.data.labels.splice(0, 1);
				this.lineChart.data.datasets[0].data.splice(0, 1);
			}

			this.lineChart.update();
		}
	}

	/**
	 * Comparison function for measurement objects. Compares by date.
	 * @param (Measurement) measurementA - First measurement.
	 * @param (Measurement) measurementB - Second measurement.
	 */
	ChartHandler.prototype.compareMeasurements = function(measurementA, measurementB) {
		return new Date(measurementA.date) - new Date(measurementB.date);
	}
}

let chartHandler = new ChartHandler('waterLevelChart');