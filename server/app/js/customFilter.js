'use strict';

let customFilterFactory = null;

let savedCustomFilters = {};
let customFilterProperties = {};

let riverNames = null;

function CustomFilterFactory() {

	this.currentFilter = null;

	CustomFilterFactory.prototype.init = function() {
		// init datetimepickers
		$('#datetimepicker-start').datetimepicker();
	    $('#datetimepicker-end').datetimepicker();

	    // connect datetimepickers with each other
	    $("#datetimepicker-start").on("dp.change", function (e) {
	    	$('#datetimepicker-end').data("DateTimePicker").minDate(e.date);
	    });
	    $("#datetimepicker-end").on("dp.change", function (e) {
	    	$('#datetimepicker-start').data("DateTimePicker").maxDate(e.date);
	    });

	    // init autocomplete input
	    $('.typeahead').typeahead({minLength: 3});

	    // hide other modal windows
	    $('#custom-filter-datetime').hide();
	    $('#custom-filter-spatial').hide();
	}

	CustomFilterFactory.prototype.reset = function() {
		$('#custom-filter-datetime').hide();
		$('#custom-filter-spatial').hide();
		$('#custom-filter-river').hide();
		customFilterProperties = {};
		$('#custom-filter-selection').show();
	}

	CustomFilterFactory.prototype.createCustomFilter = function(type) {
		customFilterProperties.filter = type;
		switch(type) {
			case 'temporal':
				this.currentFilter = new TemporalFilter();
				break;
			case 'spatial':
				this.currentFilter = new SpatialFilter();
				break;
			case 'spatiotemporal':
				this.currentFilter = new SpatioTemporalFilter();
				break;
			case 'river':
				this.currentFilter = new RiverFilter();
				break;	
		}
		this.currentFilter.init();
	}

	CustomFilterFactory.prototype.next = function() {
		this.currentFilter.next();
	}

	CustomFilterFactory.prototype.back = function() {
		this.currentFilter.back();
	}
}

function RiverFilter() {
	this.steps = ['riverSelection', 'applyFilter'];
	this.currentStep = null;

	RiverFilter.prototype.init = function() {
		$('#custom-filter-selection').hide();
		$('#custom-filter-river').show(200);
		this.currentStep = 0;
	}

	RiverFilter.prototype.next = function() {
		this.currentStep++;

		if(this.steps[this.currentStep] == 'applyFilter') {
			customFilterProperties.river = $('#custom-filter-river-input').val();
			this.applyFilter();
		}
	}

	RiverFilter.prototype.back = function() {
		if(this.steps[this.currentStep] == 'riverSelection') {
			customFilterFactory.reset();
		}		

		this.currentStep--;
	}

	RiverFilter.prototype.applyFilter = function() {
		$.ajax({
			url: getURL() + '/api/things/spatial/waterbodies/' + customFilterProperties.river,
			global: false,
			type: 'GET',
			async: false,
			success: function(things) {
				drawMarkers(things);
				$('#customFilterModal').modal('hide');
			}
		});
	}
}

function TemporalFilter() {
	this.steps = ["timeSelection", "applyFilter"];
	this.currentStep = null;

	TemporalFilter.prototype.init = function() {
		$('#custom-filter-selection').hide();
		$('#custom-filter-datetime').show(200);
		this.currentStep = 0;
	} 

	TemporalFilter.prototype.next = function() {
		this.currentStep++;

		if(this.steps[this.currentStep] == 'applyFilter') {
			customFilterProperties.startTime = $('#datetimepicker-start').data("DateTimePicker").date().tz('Europe/Berlin').toISOString();
			customFilterProperties.endTime = $('#datetimepicker-end').data("DateTimePicker").date().tz('Europe/Berlin').toISOString();
			this.applyFilter();
		}
	}

	TemporalFilter.prototype.back = function() {
		if(this.steps[this.currentStep] == 'timeSelection') {
			customFilterFactory.reset();
		}

		this.currentStep--;
	}

	TemporalFilter.prototype.applyFilter = function() {
		$.ajax({
			url: getURL() + '/api/things/temporal/' + customFilterProperties.startTime  + '/'  + customFilterProperties.endTime,
			global: false,
			type: 'GET',
			async: false,
			success: function(things) {
				drawMarkers(things);
				$('#customFilterModal').modal('hide');
			}
		});
	}
}

function SpatioTemporalFilter() {
	this.steps = ['spatialSelectionInfo', 'spatialSelection', 'timeSelection', 'applyFilter'];
	this.currentStep = null;

	SpatioTemporalFilter.prototype.init = function() {
		$('#custom-filter-selection').hide();
		$('#custom-filter-spatial').show(200);
		this.currentStep = 0;
	}

	SpatioTemporalFilter.prototype.next = function() {
		this.currentStep++;

		if(this.steps[this.currentStep] == 'spatialSelection') {
			$('#customFilterModal').modal('hide');
			enterDrawingMode();	
		}
		else if(this.steps[this.currentStep] == 'timeSelection') {
			$('#custom-filter-spatial').hide();
			$('#customFilterModal').modal('show');
			$('#custom-filter-datetime').show(200);
		}
		else if(this.steps[this.currentStep] == 'applyFilter') {
			customFilterProperties.startTime = $('#datetimepicker-start').data("DateTimePicker").date().tz('Europe/Berlin').toISOString();
			customFilterProperties.endTime = $('#datetimepicker-end').data("DateTimePicker").date().tz('Europe/Berlin').toISOString();
			this.applyFilter();
		}
	}

	SpatioTemporalFilter.prototype.back = function() {
		if(this.steps[this.currentStep] == 'spatialSelectionInfo') {
			customFilterFactory.reset();
		}
		else if(this.steps[this.currentStep] == 'timeSelection') {
			$('#custom-filter-datetime').hide();
			$('#custom-filter-spatial').show(200);
		}

		this.currentStep--;
	}

	SpatioTemporalFilter.prototype.applyFilter = function() {
		$.ajax({
			url: getURL() + '/api/things/temporal/' + customFilterProperties.startTime  + '/'  + customFilterProperties.endTime + '/spatial/' + customFilterProperties.bounds,
			global: false,
			type: 'GET',
			async: false,
			success: function(things) {
				drawMarkers(things);
				$('#customFilterModal').modal('hide');
			}
		});
	}
}

function SpatialFilter() {
	this.steps = ['spatialSelectionInfo', 'spatialSelection', 'applyFilter'];
	this.currentStep = null;

	SpatialFilter.prototype.init = function() {
		$('#custom-filter-selection').hide();
		$('#custom-filter-spatial').show(200);
		this.currentStep = 0;
	}

	SpatialFilter.prototype.next = function() {
		this.currentStep++;

		if(this.steps[this.currentStep] == 'spatialSelection') {
			$('#customFilterModal').modal('hide');
			enterDrawingMode();	
		}
		else if(this.steps[this.currentStep] == 'applyFilter') {
			this.applyFilter();
		}
	}

	SpatialFilter.prototype.back = function() {
		if(this.steps[this.currentStep] == 'spatialSelectionInfo') {
			customFilterFactory.reset();
		}

		this.currentStep--;
	}

	SpatialFilter.prototype.applyFilter = function() {
		$.ajax({
			url: getURL() + '/api/things/spatial/bbox/' + customFilterProperties.bounds,
			global: false,
			type: 'GET',
			async: false,
			success: function(things) {
				drawMarkers(things);
			}
		});
	}
}

function enterDrawingMode() {
	let mapCenter = map.getCenter();
	let bounds = map.getBounds();

	let distance = Math.sqrt(Math.pow((mapCenter.lat - bounds._northEast.lat), 2) + Math.pow((mapCenter.lng - bounds._northEast.lng), 2));

	let rectangle = new L.rectangle([[mapCenter.lat - distance / 8, mapCenter.lng - distance / 4], [mapCenter.lat + distance / 8, mapCenter.lng + distance / 4]]);
	rectangle.editing.enable();

	rectangle.on('dblclick', function() {
		let res = rectangle.getBounds();
		customFilterProperties.bounds = res._southWest.lat + ',' + res._southWest.lng + ',' + res._northEast.lat + ',' + res._northEast.lng;
		map.removeLayer(rectangle);
		customFilterFactory.next();
	}, {draggable: true});

	// L.marker([mapCenter.lat + distance / 4, mapCenter.lng - distance / 4]).addTo(map);
	// L.marker([mapCenter.lat + distance / 4, mapCenter.lng + distance / 4]).addTo(map);
	// L.marker([mapCenter.lat - distance / 4, mapCenter.lng + distance / 4]).addTo(map);
	// L.marker([mapCenter.lat - distance / 4, mapCenter.lng - distance / 4]).addTo(map);

	// let polygon = new L.Polygon([
	// 	[mapCenter.lat + distance / 4, mapCenter.lng - distance / 4],
	// 	[mapCenter.lat + distance / 4, mapCenter.lng + distance / 4],
	// 	[mapCenter.lat - distance / 4, mapCenter.lng + distance / 4],
	// 	[mapCenter.lat - distance / 4, mapCenter.lng - distance / 4]
	// ]);

	// polygon.editing.enable();

	// polygon.on('dblclick', function() {
	// 	// let res = rectangle.getBounds();
	// 	// customFilterProperties.bounds = res._southWest.lat + ',' + res._southWest.lng + ',' + res._northEast.lat + ',' + res._northEast.lng;
	// 	// map.removeLayer(rectangle);
	// 	// customFilterFactory.next();
	// 	console.log(polygon.toString());
	// }, {draggable: true});

	// map.addLayer(polygon);

	map.addLayer(rectangle);
}

$(document).ready(function() {
	customFilterFactory = new CustomFilterFactory();
	customFilterFactory.init();

	$.ajax({
		url: getURL() + '/api/waterbodies/names/names',
		global: false,
		type: 'GET',
		async: false,
		success: function(names) {
			riverNames = names;
			$("#custom-filter-river-input").typeahead({ source:riverNames });
		}
	});
});