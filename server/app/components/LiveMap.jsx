// Load the application's configuration
var config = require('../../server/config');

// Required modules
require('mapbox.js');
var React = require('react');

module.exports = React.createClass({

	componentDidMount: function() {
		L.mapbox.accessToken = config.mapbox_token;
		L.mapbox.map('livemap', 'mapbox.streets').setView([51.973387, 7.700213], 10);
	},

	componentWillUnmount: function() {
		// TODO
	},

	onMapClick: function() {
		// TODO
	},

	render: function() {
		return (
			<div className='map'></div>
		);
	}
});