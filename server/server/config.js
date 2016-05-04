var host = 'giv-gwot-va.uni-muenster.de';
var port = 3000;

var mapbox_token = '<< your Mapbox access token >>';

module.exports = {
	express_host: 'http://' + host + ':' + port,
	express_port: port,
	mapbox_token: mapbox_token,
	mongodb_host: 'mongodb://' + host + '/wot-vertical-approach',
	mqtt_host: 'mqtt://' + host + '/'
};