'use strict';

let customFilterFactory = null;
let customFilterProperties = {};

let customFilterSaves = [];

/**
 * Factory class to create and manage custom filters.
 * CustomFilterFactory produces the appropriate 
 * filter for each selection and delegates the user
 * input to the filter methods.
 */
function CustomFilterFactory() {

	this.currentFilter = null;
	this.currentUser = null;

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

	CustomFilterFactory.prototype.setUser = function(user) {
		this.currentUser = user;
	}

	/**
	 * Resets all filters and clears the current filter settings.
	 */
	CustomFilterFactory.prototype.reset = function() {
		$('#custom-filter-datetime').hide();
		$('#custom-filter-spatial').hide();
		$('#custom-filter-river').hide();
		$('#custom-filter-feature').hide();
		$('#custom-filter-saves').hide();
		$('#custom-filter-details').hide();
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
			case 'Temporal':
				this.currentFilter = new TemporalFilter();
				break;
			case 'Spatial':
				this.currentFilter = new SpatialFilter();
				break;
			case 'Spatio-Temporal':
				this.currentFilter = new SpatioTemporalFilter();
				break;
			case 'River Filter':
				this.currentFilter = new RiverFilter();
				break;
			case 'Feature Filter':
				this.currentFilter = new FeatureFilter();
				break;
			case 'saves':
				this.currentFilter = new FilterStore();
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


	CustomFilterFactory.prototype.save = function() {
		if(this.currentUser) {

			let filter = {
				token: customFilterFactory.currentUser.token,
				userId: customFilterFactory.currentUser._id,
				settings: JSON.stringify({
					filter: customFilterProperties.filter,
					startTime: customFilterProperties.startTime,
					endTime: customFilterProperties.endTime,
					bounds: customFilterProperties.bounds,
					river: customFilterProperties.river,
					featureId: customFilterProperties.featureId,
					featureName: customFilterProperties.featureName
				})
			};

			$.ajax({
				url: getURL() + '/api/filters/',
				global: false,
				type: 'POST',
				async: true,
				data: filter,
				success: function(filter) {
					filter.settings = JSON.parse(filter.settings);
					customFilterSaves.push(filter);
				}
			});	
		}
	}

	CustomFilterFactory.prototype.loadFilter = function(index) {
		let filter = customFilterSaves[index].settings;
		this.currentFilter.setFilter(filter);
	}

	CustomFilterFactory.prototype.removeFilter = function(index) {
		$.ajax({
			url: getURL() + '/api/filters/' + customFilterSaves[index]._id,
			global: false,
			type: 'DELETE',
			async: true,
			data: {token: customFilterFactory.currentUser.token},
			success: function(response) {
				customFilterSaves.splice(index, 1);
				customFilterFactory.currentFilter.updateCustomFilterList();
			}
		});	
	}
}


/**
 * Custom filter class for temporal selection.
 * Provides methods and settings to filter things
 * by time.
 * Product of the CustomFilterFactory.
 */
function TemporalFilter() {
	this.steps = ["timeSelection", "filterDetails", "applyFilter"];
	this.currentStep = null;

	TemporalFilter.prototype.init = function() {
		$('#custom-filter-selection').hide();
		$('#custom-filter-datetime').show(200);
		this.currentStep = 0;
	} 

	TemporalFilter.prototype.next = function() {
		this.currentStep++;

		if(this.steps[this.currentStep] == 'filterDetails') {
			customFilterProperties.startTime = $('#datetimepicker-start').data("DateTimePicker").date().tz('Europe/Berlin').toISOString();
			customFilterProperties.endTime = $('#datetimepicker-end').data("DateTimePicker").date().tz('Europe/Berlin').toISOString();
			this.fillSettings();

			$('#custom-filter-datetime').hide();
			$('#custom-filter-details').show(200);
		}
		if(this.steps[this.currentStep] == 'applyFilter') {
			this.applyFilter(true);
		}
	}

	TemporalFilter.prototype.back = function() {
		if(this.steps[this.currentStep] == 'timeSelection') {
			customFilterFactory.reset();
		}
		else if(this.steps[this.currentStep] == 'filterDetails') {
			$('#custom-filter-details').hide();
			$('#custom-filter-datetime').show(200);
		}

		this.currentStep--;
	}

	TemporalFilter.prototype.fillSettings = function() {
		let details = '<tr><td>Filter Type</td><td>' + customFilterProperties.filter + '</td></tr><tr><td>Start Time</td><td>' + customFilterProperties.startTime + '</td></tr><tr><td>End Time</td><td>' + customFilterProperties.endTime + '</td></tr>';
		$('#custom-filter-details-table').html(details);
	}

	TemporalFilter.prototype.applyFilter = function(save) {
		$.ajax({
			url: getURL() + '/api/things/temporal/' + customFilterProperties.startTime  + '/'  + customFilterProperties.endTime,
			global: false,
			type: 'GET',
			async: false,
			success: function(things) {
				drawMarkers(things);
				if(save)
					customFilterFactory.save();
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
	this.steps = ['spatialSelectionInfo', 'spatialSelection', 'filterDetails', 'applyFilter'];
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
		else if(this.steps[this.currentStep] == 'filterDetails') {
			this.fillSettings();
			$('#custom-filter-spatial').hide();
			$('#custom-filter-details').show(200);
			$('#customFilterModal').modal('show');
		}
		else if(this.steps[this.currentStep] == 'applyFilter') {
			this.applyFilter(true);
		}
	}

	SpatialFilter.prototype.back = function() {
		if(this.steps[this.currentStep] == 'spatialSelectionInfo') {
			customFilterFactory.reset();
		}
		else if(this.steps[this.currentStep] == 'filterDetails') {
			$('#custom-filter-details').hide();
			$('#custom-filter-spatial').show(200);
			this.currentStep--; // go back one step extra
		}

		this.currentStep--;
	}

	SpatialFilter.prototype.fillSettings = function() {
		let details = '<tr><td>Filter Type</td><td>' + customFilterProperties.filter + '</td></tr><tr><td>Bounds</td><td>' + customFilterProperties.bounds + '</td></tr>';
		$('#custom-filter-details-table').html(details);
	}

	SpatialFilter.prototype.applyFilter = function(save) {
		$.ajax({
			url: getURL() + '/api/things/spatial/bbox/' + customFilterProperties.bounds,
			global: false,
			type: 'GET',
			async: false,
			success: function(things) {
				if(save)
					customFilterFactory.save();
				drawMarkers(things);
				$('#customFilterModal').modal('hide');
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
	this.steps = ['spatialSelectionInfo', 'spatialSelection', 'timeSelection', 'filterDetails', 'applyFilter'];
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
		else if(this.steps[this.currentStep] == 'filterDetails') {
			customFilterProperties.startTime = $('#datetimepicker-start').data("DateTimePicker").date().tz('Europe/Berlin').toISOString();
			customFilterProperties.endTime = $('#datetimepicker-end').data("DateTimePicker").date().tz('Europe/Berlin').toISOString();
			this.fillSettings();

			$('#custom-filter-datetime').hide();
			$('#custom-filter-details').show(200);
		}
		else if(this.steps[this.currentStep] == 'applyFilter') {
			this.applyFilter(true);
		}
	}

	SpatioTemporalFilter.prototype.back = function() {
		if(this.steps[this.currentStep] == 'spatialSelectionInfo') {
			customFilterFactory.reset();
		}
		else if(this.steps[this.currentStep] == 'timeSelection') {
			$('#custom-filter-datetime').hide();
			$('#custom-filter-spatial').show(200);
			this.currentStep--; // go back one step extra
		}
		else if(this.steps[this.currentStep] == 'filterDetails') {
			$('#custom-filter-details').hide();
			$('#custom-filter-datetime').show(200);
		}

		this.currentStep--;
	}

	SpatioTemporalFilter.prototype.fillSettings = function() {
		let details = '<tr><td>Filter Type</td><td>' + customFilterProperties.filter + '</td></tr><tr><td>Start Time</td><td>' + customFilterProperties.startTime + '</td></tr><tr><td>End Time</td><td>' + customFilterProperties.endTime + '</td></tr><tr><td>Bounds</td><td>' + customFilterProperties.bounds + '</td></tr>';
		$('#custom-filter-details-table').html(details);
	}

	SpatioTemporalFilter.prototype.applyFilter = function(save) {
		$.ajax({
			url: getURL() + '/api/things/temporal/' + customFilterProperties.startTime  + '/'  + customFilterProperties.endTime + '/spatial/' + customFilterProperties.bounds,
			global: false,
			type: 'GET',
			async: false,
			success: function(things) {
				if(save)
					customFilterFactory.save();
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
	this.steps = ['riverSelection', 'filterDetails', 'applyFilter'];
	this.currentStep = null;

	RiverFilter.prototype.init = function() {
		$('#custom-filter-selection').hide();
		$('#custom-filter-river').show(200);
		this.currentStep = 0;
	}

	RiverFilter.prototype.next = function() {
		this.currentStep++;

		if(this.steps[this.currentStep] == 'filterDetails') {
			customFilterProperties.river = $('#custom-filter-river-input').val();
			this.fillSettings();

			$('#custom-filter-river').hide();
			$('#custom-filter-details').show(200);
		}
		else if(this.steps[this.currentStep] == 'applyFilter') {
			this.applyFilter(true);
		}
	}

	RiverFilter.prototype.back = function() {
		if(this.steps[this.currentStep] == 'riverSelection') {
			customFilterFactory.reset();
		}		
		else if(this.steps[this.currentStep] == 'filterDetails') {
			$('#custom-filter-details').hide();
			$('#custom-filter-river').show(200);
		}

		this.currentStep--;
	}

	RiverFilter.prototype.fillSettings = function() {
		let details = '<tr><td>Filter Type</td><td>' + customFilterProperties.filter + '</td></tr><tr><td>River Selection</td><td>' + customFilterProperties.river + '</td></tr>';
		$('#custom-filter-details-table').html(details);
	}

	RiverFilter.prototype.applyFilter = function(save) {
		$.ajax({
			url: getURL() + '/api/things/spatial/waterbodies/' + customFilterProperties.river,
			global: false,
			type: 'GET',
			async: false,
			success: function(things) {
				if(save)
					customFilterFactory.save();
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
	this.steps = ['featureSelection', 'filterDetails', 'applyFilter'];
	this.currentStep = null;

	FeatureFilter.prototype.init = function() {
		$('#custom-filter-selection').hide();
		$('#custom-filter-feature').show(200);

		this.currentStep = 0;
	}

	FeatureFilter.prototype.next = function() {
		this.currentStep++;

		if (this.steps[this.currentStep] == 'filterDetails') {
			let featureName = $('#custom-filter-feature-input').val();

			customFilterProperties.featureId = store.getFeatureByName(featureName);
			customFilterProperties.featureName = featureName;
			this.fillSettings();

			$('#custom-filter-feature').hide();
			$('#custom-filter-details').show(200);
		}
		else if (this.steps[this.currentStep] == 'applyFilter') {
			this.applyFilter(true);
		}
	}

	FeatureFilter.prototype.back = function() {
		if (this.steps[this.currentStep] == 'featureSelection') {
			customFilterFactory.reset();
		}		
		else if (this.steps[this.currentStep] == 'filterDetails') {
			$('#custom-filter-details').hide();
			$('#custom-filter-feature').show(200);
		}

		this.currentStep--;
	}

	FeatureFilter.prototype.fillSettings = function() {
		let details = '<tr><td>Filter Type</td><td>' + customFilterProperties.filter + '</td></tr><tr><td>Feature Selection</td><td>' + customFilterProperties.featureName + '</td></tr>';
		$('#custom-filter-details-table').html(details);
	}

	FeatureFilter.prototype.applyFilter = function(save) {
		$.ajax({
			url: getURL() + '/api/things/feature/' + customFilterProperties.featureId,
			global: false,
			type: 'GET',
			async: false,
			success: function(things) {
				if(save)
					customFilterFactory.save();
				drawMarkers(things);
				$('#customFilterModal').modal('hide');
			}
		});
	}
}

/**
 * Class to store and manage saved filters.
 * Stored filters can be reapplied or removed.
 * Product of the CustomFilterFactory.
 */
function FilterStore() {
	this.steps = ['filterSelection', 'filterDetails', 'applyFilter'];
	this.currentStep = null;
	this.filter = null;

	FilterStore.prototype.init = function() {
		this.updateCustomFilterList();
		$('#custom-filter-selection').hide();
		$('#custom-filter-saves').show(200);

		this.currentStep = 0;
	}

	FilterStore.prototype.updateCustomFilterList = function() {
		let html = '';

		if(customFilterSaves.length == 0)
			html = '';
		else {
			for(let x = 0; x < customFilterSaves.length; x++) {
				html += '<tr><td style="width: 30%;"><a href="#" onclick="customFilterFactory.loadFilter(' + x + ')">' + customFilterSaves[x].settings.filter + '</a></td><td>' + customFilterSaves[x].created + '</td><td><button type="button" onclick="customFilterFactory.loadFilter(' + x + ')" class="btn btn-success">Details</button><button type="button" onclick="customFilterFactory.removeFilter(' + x + ')" class="btn btn-danger">Remove</button></td></tr>';
			}
		}
		$('#customFilterElements').html(html);
	}

	FilterStore.prototype.next = function() {
		this.currentStep++;

		if(this.steps[this.currentStep] == 'filterDetails') {
			$('#custom-filter-saves').hide();
			this.filter.fillSettings();
			$('#custom-filter-details').show(200);
		}
		if(this.steps[this.currentStep] == 'applyFilter') {
			this.filter.applyFilter(false);
		}
	}

	FilterStore.prototype.back = function() {
		if(this.steps[this.currentStep] == 'filterSelection') {
			customFilterFactory.reset();
		}
		if(this.steps[this.currentStep] == 'filterDetails') {
			$('#custom-filter-details').hide();
			$('#custom-filter-saves').show(200);
		}

		this.currentStep --;
	}

	FilterStore.prototype.setFilter = function(filter) {
		customFilterProperties = filter;
		switch (filter.filter) {
			case 'Temporal':
				this.filter = new TemporalFilter();
				break;
			case 'Spatial':
				this.filter = new SpatialFilter();
				break;
			case 'Spatio-Temporal':
				this.filter = new SpatioTemporalFilter();
				break;
			case 'River Filter':
				this.filter = new RiverFilter();
				break;
			case 'Feature Filter':
				this.filter = new FeatureFilter();
				break;
		}
		this.next();
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