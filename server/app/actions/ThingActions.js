// Required modules
var dispatcher = require('../dispatcher');

module.exports = {
	addThing: function(thing) {
		dispatcher.dispatch({
			thing: thing,
			type: 'thing:addThing'
		});
	},
	deleteThing: function(thing) {
		dispatcher.dispatch({
			thing: thing,
			type: 'thing:deleteThing'
		});
	}
};