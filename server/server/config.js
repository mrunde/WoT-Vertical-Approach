var host 		= 'giv-gwot-va.uni-muenster.de';
var port 		= 3000;
var mongoUser 	= '';
var mongoPass	= '';

module.exports = {
	express_host: 'http://' + host + ':' + port,
	express_port: port,
	mongodb_host: 'mongodb://' + mongoUser + ':' + mongoPass + '@' + host + '/wot-vertical-approach',
	mqtt_host: 'mqtt://' + host + '/'
};