'use strict';

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

	/**
	 * Sets the data of the chart. The data has to fit the
	 * schema of a measurement as described by the REST API.
	 * @param {Measurement[]} measurements - The measurements to display in the chart.
	 */
	ChartHandler.prototype.setData = function(measurements) {
		let labels = [];
		let values = [];

		for(let x = 0; x < measurements.length; x++) {
			labels.push(measurements[x].date);
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
		let label = measurement.date;
		let value = measurement.value;

		this.lineChart.data.labels.push(label);
		this.lineChart.data.datasets[0].data.push(value);

		this.lineChart.update();
	}
}

let chartHandler = new ChartHandler('waterLevelChart');