'use strict';

/**
 * Store to manage the general application information (e.g. Features).
 */
function Store() {
	
	this.features            = [];
	this.waterbodies         = [];
	this.currentThingId      = null;
	this.currentThingName    = null;
	this.currentThingSensors = [];

	/**
	 * Initialize the stores.
	 */
	Store.prototype.init = function() {
		
		// Initialize the Features store
		let requestFeatures = $.ajax({
			url: getURL() + '/api/features/',
			global: false,
			type: 'GET',
			async: false,
			success: function(features) {
				return features;
			}
		});
		this.features = requestFeatures.responseJSON;
		this.features = this.features.reduce(function(arr, val) {
			arr[val._id] = {
				'name': val.name,
				'unit': val.unit
			};
			return arr;
		}, []);

		// Initialize the Waterbodies store
		this.waterbodies = []; // TODO
	};

	Store.prototype.addSensor = function(sensor) {
		if (!this.currentThingSensors[sensor._id]) {
			this.currentThingSensors[sensor._id] = {
				'name': sensor.name,
				'refLevel': sensor.refLevel,
				'warnLevel': sensor.warnLevel,
				'riskLevel': sensor.riskLevel
			};
		}
	};

	/**
	 * Add a Feature to the Features store.
	 * @param {Feature} feature New Feature object.
	 */
	Store.prototype.addFeature = function(feature) {
		if (!this.features[feature._id]) {
			this.features[feature._id] = {
				'name': feature.name,
				'unit': feature.unit
			};
		}
	};
}

let store = new Store();
store.init();