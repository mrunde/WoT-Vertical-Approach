'use strict';

/**
 * Store to manage the general application information (e.g. Features).
 */
function Store() {
	
	// Initialize the features store
	this.features = [];

	/**
	 * Request all Feature information.
	 */
	Store.prototype.requestFeatureList = function() {
		let request = $.ajax({
			url: getURL() + '/api/features/',
			global: false,
			type: 'GET',
			async: false,
			success: function(features) {
				return features;
			}
		});
		this.features = request.responseJSON;
		this.features = this.features.reduce(function(arr, val) {
			arr[val._id] = {
				'name': val.name,
				'unit': val.unit
			};
			return arr;
		}, []);
	};


	Store.prototype.getFeature = function(featureId) {
		return store.features[featureId];
	};
}

let store = new Store();
store.requestFeatureList();