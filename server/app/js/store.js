'use strict';

/**
 * Store to manage the general application information (e.g. Features).
 */
function Store() {
	
	this.features            = [];
	this.featureNames        = [];
	this.waterbodies         = [];
	this.currentThingId      = null;
	this.currentThingName    = null;
	this.currentThingSensors = [];
	this.showNotifications   = true;

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

		this.featureNames = requestFeatures.responseJSON;
		this.featureNames = this.featureNames.reduce(function(arr, val) {
			arr[val.name] = {
				'id': val._id
			}
			return arr;
		}, []);

		// Initialize the Waterbodies store
		this.waterbodies = waterbody_names;
	};

	Store.prototype.addSensor = function(sensor) {
		if (!this.currentThingSensors[sensor._id]) {
			this.currentThingSensors[sensor._id] = {
				'name': sensor.name,
				'interval': sensor.interval,
				'refLevel': sensor.refLevel,
				'warnLevel': sensor.warnLevel,
				'riskLevel': sensor.riskLevel,
				'featureId': sensor.featureId
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

	Store.prototype.getFeatureByName = function(featureName) {
		if (this.featureNames[featureName]) {
			return this.featureNames[featureName].id;
		} else {
			return -1;
		}
	}

	/**
	 * Turn the notifcations on or off.
	 */
	Store.prototype.toggleNotifications = function() {
		if (this.showNotifications) {
			this.showNotifications = false;
			toastr.clear();
		} else {
			this.showNotifications = true;
		}
	}
}

let store = new Store();
store.init();