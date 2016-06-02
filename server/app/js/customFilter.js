'use strict';

let savedCustomFilters = {};
let customFilterProperties = {};

function CustomFilterFactory() {

	this.temporalFilter = null;

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
	}

	CustomFilterFactory.prototype.reset = function() {
		$('#custom-filter-datetime').hide();
		customFilterProperties = {};
		$('#custom-filter-selection').show();
	}

	CustomFilterFactory.prototype.createTemporalFilter = function() {
		customFilterProperties.filter = 'temporal';
		this.temporalFilter = new TemporalFilter();
		this.temporalFilter.init();
	}

	CustomFilterFactory.prototype.next = function() {
		switch(customFilterProperties.filter) {
			case 'temporal':
				this.temporalFilter.next();
				break;
		}
	}

	CustomFilterFactory.prototype.back = function() {
		switch(customFilterProperties.filter) {
			case 'temporal':
				this.temporalFilter.back();
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

let customFilterFactory = new CustomFilterFactory();
customFilterFactory.init();