// Required modules
var dispatcher   = require('../dispatcher');
var thingService = require('../services/thingService');

function ThingStore() {
	var listeners = [];

	function onChange(listener) {
		getThings(listener);
		listeners.push(listener);
	}

	function getThings(callback) {
		thingService.getThings().then(function(res) {
			callback(res);
		});
	}

	function addThing(thing) {
		thingService.addThing(thing).then(function(res) {
			console.log(res);
			triggerListeners();
		});
	}

	function deleteThing(thing) {
		thingService.deleteThing(thing).then(function(res) {
			console.log(res);
			triggerListeners();
		});
	}

	function triggerListeners() {
		getThings(function(res) {
			listeners.forEach(function(listener) {
				listener(res);
			});
		});
	}

	dispatcher.register(function(payload) {
		var split = payload.type.split(':');
		if (split[0] === 'thing') {
			switch (split[1]) {
				case 'addThing':
					addThing(payload.thing);
					break;
				case 'deleteThing':
					deleteThing(payload.thing);
					break;
			}
		}
	});

	return {
		onChange: onChange
	}
}

module.exports = ThingStore();