'use strict';

// General-Config
const host = 'giv-gwot-va.uni-muenster.de';
const port = 3000;
const secret = '<< Your API secret here >>';

// Twitter Config
const twitterConsumerKey       = '<< Your Consumer Key here >>';
const twitterConsumerSecret    = '<< Your Consumer Secret here >>';
const twitterAccessTokenKey    = '<< Your Access Token here >>';
const twitteraccessTokenSecret = '<< Your Token Secret here >>';

module.exports = {
	express_host: 'http://' + host + ':' + port,
	express_port: port,
	mongodb_host: 'mongodb://' + host + '/wot-vertical-approach',
	mqtt_host: 'mqtt://' + host + '/',
	secret,
	twitterConsumerKey,
	twitterConsumerSecret,
	twitterAccessTokenKey,
	twitteraccessTokenSecret
};