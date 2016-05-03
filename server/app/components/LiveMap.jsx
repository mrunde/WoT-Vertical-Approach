// Required modules
var L     = require('leaflet');
var React = require('react');

// Required actions
var actions = require('../actions/ThingActions');

module.exports = React.createClass({
	componentDidMount: function() {
		var map = this.map = L.map('livemap', {
			minZoom: 2,
			maxZoom: 20,
			layers: [
				L.tileLayer(
					'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
					{attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'})
			],
			attributionControl: false,
		});
		map.on('click', this.onMapClick);
		map.fitWorld();
	},
	componentWillUnmount: function() {
		this.map.off('click', this.onMapClick);
		this.map = null;
	},
	onMapClick: function() {
		// Do some wonderful map things...
	},
	render: function() {
		return (
			<div className='map'></div>
		);
	}
});