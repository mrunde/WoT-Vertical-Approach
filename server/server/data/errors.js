module.exports = {
	FeatureNotFoundError:     '{ "error": "FeatureNotFound" }',
	MeasurementNotFoundError: '{ "error": "MeasurementNotFound" }',
	SensorNotFoundError:      '{ "error": "SensorNotFound" }',
	ServerError:              function(msg) { return '{ "error": "ServerError", "message": "' + msg + '" }'; },
	ThingNotFoundError:       '{ "error": "ThingNotFound" }',
	UserNotFoundErrerkey:     '{ "error": "UserNotFound" }',
	TokenNotFoundError:       '{ "error": "TokenNotFoundError" }',
	InvalidTokenError:        '{ "error": "InvalidTokenError" }'
};