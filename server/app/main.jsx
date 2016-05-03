// Required modules
var React    = require('react');
var ReactDOM = require('react-dom');

// Required stores
var thingsStore = require('./stores/thingsStore');

// Required components
var LiveMap    = require('./components/LiveMap.jsx');
var ThingsList = require('./components/ThingsList.jsx');

// Get the things from the associated store
var _things = [];
thingsStore.onChange(function(things) {
	_things = things;
	render();
});

// Render the frontend
function render() {
	ReactDOM.render(<ThingsList things={_things} />, document.getElementById('container'));
	ReactDOM.render(<LiveMap />, document.getElementById('livemap'));
}
render();