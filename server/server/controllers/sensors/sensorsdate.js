// Required modules
var mongoose = require('mongoose');

// Required data schema 	
var Sensor = require('../../data/sensor');

/**
 * @api {get} /sensors/temporal/:date GET - Request all sensors within one time frame
 * @apiName ListMeasurementsBySensor
 * @apiGroup Sensor
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Array} measurements	Array of Sensor information.
 *
 * @apiSuccessExample Success-Response:
 *    
 *
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var dateFrom = req.params.dateFrom;
	var dateTo = req.params.dateTo;

	var startDate, endDate;

	if(dateFrom.toUpperCase().charAt(0) == 'P'){
		startDate = moment(dateTo).subtract(moment.duration(dateFrom)).toISOString();
		endDate = moment(dateTo).toISOString();
	} else if(dateTo.toUpperCase().charAt(0) == 'P'){
				startDate = moment(dateFrom).toISOString();
				endDate = moment(dateFrom).add(moment.duration(dateTo)).toISOString();
			} else{
				startDate = moment(dateFrom).toISOString();
				endDate = moment(dateTo).toISOString();
			}


	Sensor.find({date: {$gte: startDate, $lte: endDate }}, function(err, sensors){
		if(err){
			res.send(err);
		} else{
			res.json(sensor);
		}
	});
}
