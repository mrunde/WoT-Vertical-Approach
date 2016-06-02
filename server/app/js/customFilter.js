'use strict';

let savedCustomFilters = {};
let customFilterProperties = {};

function CustomFilterFactory() {

	this.temporalFilter = null;
	this.SpatialFilter = null;

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

	    // hide other modal windows
	    $('#custom-filter-datetime').hide();
	    $('#custom-filter-spatial').hide();
	}

	CustomFilterFactory.prototype.reset = function() {
		$('#custom-filter-datetime').hide();
		$('#custom-filter-spatial').hide();
		customFilterProperties = {};
		$('#custom-filter-selection').show();
	}

	CustomFilterFactory.prototype.createTemporalFilter = function() {
		customFilterProperties.filter = 'temporal';
		this.temporalFilter = new TemporalFilter();
		this.temporalFilter.init();
	}

	CustomFilterFactory.prototype.createSpatialFilter = function() {
		customFilterProperties.filter = 'spatial';
		this.spatialFilter = new SpatialFilter();
		this.spatialFilter.init();
	}

	CustomFilterFactory.prototype.next = function() {
		switch(customFilterProperties.filter) {
			case 'temporal':
				this.temporalFilter.next();
				break;
			case 'spatial':
				this.spatialFilter.next();
				break;
		}
	}

	CustomFilterFactory.prototype.back = function() {
		switch(customFilterProperties.filter) {
			case 'temporal':
				this.temporalFilter.back();
				break;
			case 'spatial':
				this.spatialFilter.back();
				break;
		}
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
			}
		});
		$('#customFilterModal').modal('hide');
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
			this.enterDrawingMode();	
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

	SpatialFilter.prototype.enterDrawingMode = function() {
		let mapCenter = map.getCenter();
		let bounds = map.getBounds();

		let distance = Math.sqrt(Math.pow((mapCenter.lat - bounds._northEast.lat), 2) + Math.pow((mapCenter.lng - bounds._northEast.lng), 2));

		let rectangle = L.rectangle([[mapCenter.lat - distance / 8, mapCenter.lng - distance / 4], [mapCenter.lat + distance / 8, mapCenter.lng + distance / 4]]);
		rectangle.editing.enable();

		rectangle.on('dblclick', function() {
			let res = rectangle.getBounds();
			customFilterProperties.bounds = res._southWest.lat + ',' + res._southWest.lng + ',' + res._northEast.lat + ',' + res._northEast.lng;
			map.removeLayer(rectangle);
			customFilterFactory.next();
		});

		map.addLayer(rectangle);
	}
}

let customFilterFactory = new CustomFilterFactory();
customFilterFactory.init();
