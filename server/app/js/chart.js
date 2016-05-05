var data = {
	labels: [],
	datasets: [
		{
			label: 'Water Level',
			backgroundColor: 'rgba(31, 75, 255, 1)',
			borderColor: 'rgba(31, 75, 255, 1)',
			data: []
		}
	]
};

var options = {};

var ctx = document.getElementById('waterLevelChart');
var waterLevelChart = new Chart(ctx, {
	type: 'line',
	data: data,
	options: options
});