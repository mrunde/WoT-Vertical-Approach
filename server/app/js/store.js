'use strict';

/**
 * Store to manage the general application information (e.g. Features).
 */
function Store() {
	
	this.features    = [];
	this.waterbodies = [];

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
		this.waterbodies = waterbody_names;
	};
}

let store = new Store();
store.init();