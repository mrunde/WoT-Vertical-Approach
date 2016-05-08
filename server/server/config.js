var host 		= 'giv-gwot-va.uni-muenster.de';
var port 		= 3000;

module.exports = {
	express_host: 'http://' + host + ':' + port,
	express_port: port,
	mongodb_host: 'mongodb://' + host + '/wot-vertical-approach',
	mqtt_host: 'mqtt://' + host + '/'
};