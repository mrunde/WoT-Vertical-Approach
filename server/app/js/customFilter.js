'use strict';

let customFilterFactory = null;
let customFilterProperties = {};

let savedCustomFilters = {};

/**
 * Factory class to create and manage custom filters.
 * CustomFilterFactory produces the appropriate 
 * filter for each selection and delegates the user
 * input to the filter methods.
 */
function CustomFilterFactory() {

	this.currentFilter = null;

	/**
	 * Initializes all interactive DOM elements.
	 */
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

	/**
	 * Resets all filters and clears the current filter settings.
	 */
	CustomFilterFactory.prototype.reset = function() {
		$('#custom-filter-datetime').hide();
		$('#custom-filter-spatial').hide();
		$('#custom-filter-river').hide();
		$('#custom-filter-feature').hide();
		customFilterProperties = {};
		$('#custom-filter-selection').show();
	}

	/**
	 * Creates a custom filter depending on the user selection.
	 * @param {String} type Name of the selected filter.
	 */
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
			case 'feature':
				this.currentFilter = new FeatureFilter();
				break;
		}
		this.currentFilter.init();
	}

	/**
	 * Proceed to next filter procedure.
	 */
	CustomFilterFactory.prototype.next = function() {
		this.currentFilter.next();
	}

	/**
	 * Return to last filter procedure.
	 */
	CustomFilterFactory.prototype.back = function() {
		this.currentFilter.back();
	}
}

/**
 * Custom filter class for temporal selection.
 * Provides methods and settings to filter things
 * by time.
 * Product of the CustomFilterFactory.
 */
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

/**
 * Custom filter class for spatial selection.
 * Provides methods and settings to filter things
 * by spatial selection (bounding box).
 * Product of the CustomFilterFactory.
 */
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

/**
 * Custom filter class for spatio-temporal selection.
 * Provides methods and settings to filter things
 * by time and spatial selection (bounding box).
 * Product of the CustomFilterFactory.
 */
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

/**
 * Custom filter class for selection by river name.
 * Provides methods and settings to filter things
 * by river name. Only things close to the given
 * river will be displayed.
 * Product of the CustomFilterFactory.
 */
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

/**
 * Custom filter class for selection by feature name.
 * Provides methods and settings to filter things
 * by feature name. Only things measuring this
 * feature will be displayed.
 * Product of the CustomFilterFactory.
 */
function FeatureFilter() {
	this.steps = ['featureSelection', 'applyFilter'];
	this.currentStep = null;

	FeatureFilter.prototype.init = function() {
		$('#custom-filter-selection').hide();
		$('#custom-filter-feature').show(200);

		this.currentStep = 0;
	}

	FeatureFilter.prototype.next = function() {
		this.currentStep++;

		if (this.steps[this.currentStep] == 'applyFilter') {
			let featureName = $('#custom-filter-feature-input').val();

			customFilterProperties.featureId = store.getFeatureByName(featureName);

			this.applyFilter();
		}
	}

	FeatureFilter.prototype.back = function() {
		if (this.steps[this.currentStep] == 'featureSelection') {
			customFilterFactory.reset();
		}		

		this.currentStep--;
	}

	FeatureFilter.prototype.applyFilter = function() {
		$.ajax({
			url: getURL() + '/api/things/feature/' + customFilterProperties.featureId,
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

// Places a bounding box on the map. The bounding box is draggable and resizable.
// Double clicking the bounding box will init the next filter procedure, depending
// on the filter selected.
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