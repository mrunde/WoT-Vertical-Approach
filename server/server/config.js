'use strict';

// General-Config
const host = 'giv-gwot-va.uni-muenster.de';
const port = 3000;

// Twitter Config

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