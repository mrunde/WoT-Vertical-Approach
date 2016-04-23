// Required modules
var dispatcher     = require('../dispatcher');
var featureService = require('../services/featureService');

function FeatureStore() {
	var listeners = [];

	function onChange(listener) {
		getFeatures(listener);
		listeners.push(listener);
	}

	function getFeatures(callback) {
		featureService.getFeatures().then(function(res) {
			callback(res);
		});
	}

	function addFeature(feature) {
		featureService.addFeature(feature).then(function(res) {
			console.log(res);
			triggerListeners();
		});
	}

	function deleteFeature(feature) {
		featureService.deleteFeature(feature).then(function(res) {
			console.log(res);
			triggerListeners();
		});
	}

	function triggerListeners() {
		getFeatures(function(res) {
			listeners.forEach(function(listener) {
				listener(res);
			});
		});
	}

	dispatcher.register(function(payload) {
		var split = payload.type.split(':');
		if (split[0] === 'feature') {
			switch (split[1]) {
				case 'addFeature':
					addFeature(payload.feature);
					break;
				case 'deleteFeature':
					deleteFeature(payload.feature);
					break;
			}
		}
	});

	return {
		onChange: onChange
	}
}

module.exports = FeatureStore();