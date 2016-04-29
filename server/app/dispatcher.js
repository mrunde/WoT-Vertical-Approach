// Required modules
var Guid = require ('guid');

var listeners = {};

function dispatch(payload) {
	for (var id in listeners) {
		listeners[id](payload);
	}
}

function register(callback) {
	var id = Guid.create();
	listeners[id] = callback;
}

module.exports = {
	register: register,
	dispatch: dispatch
};