// General-Config
var host = 'giv-gwot-va.uni-muenster.de';
var port = 3000;

// Twitter Config
var twitterConsumerKey			= '<< Your Consumer Key here >>';
var twitterConsumerSecret		= '<< Your Consumer Secret here >>';
var twitterAccessTokenKey		= '<< Your Access Token here >>';
var twitteraccessTokenSecret	= '<< Your Token Secret here >>';

module.exports = {
	express_host: 'http://' + host + ':' + port,
	express_port: port,
	mongodb_host: 'mongodb://' + host + '/wot-vertical-approach',
	mqtt_host: 'mqtt://' + host + '/',
	twitterConsumerKey,
	twitterConsumerSecret,
	twitterAccessTokenKey,
	twitteraccessTokenSecret
};