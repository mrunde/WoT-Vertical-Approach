// General-Config
var host = 'localhost';
var port = 3000;

// Twitter Config
var consumer_key 		= '<< Your Consumer Key here >>';
var consumer_secret 	= '<< Your Consumer Secret here >>';
var access_token_key 	= '<< Your Access Token here >>';
var access_token_secret = '<< Your Token Secret here >>';

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