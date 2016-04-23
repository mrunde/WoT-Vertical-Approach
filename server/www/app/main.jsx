// Required modules
var React = require('react');
var ReactDOM = require('react-dom');
var ThingsList = require('./components/ThingsList.jsx');
var thingsStore = require('./stores/thingsStore');

// Get the things from the associated store
var _things = [];
thingsStore.onChange(function(things) {
	_things = things;
	render();
});

// Render the frontend
function render() {
	ReactDOM.render(<ThingsList things={_things} />, document.getElementById('container'));
}
render();