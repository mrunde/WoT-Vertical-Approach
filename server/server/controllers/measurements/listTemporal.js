// Required modules
var moment   = require('moment');
var mongoose = require('mongoose');

// Required data schema 	
var Measurement = require('../../data/measurement');

/**
 * @api {get} /measurements/temporal/:dateFrom/:dateTo GET - all in time interval
 * @apiName ListTemporalMeasurement
 * @apiGroup Measurement
 * @apiVersion 1.0.0
 *
 * @apiParam {Date} dateFrom				Date from which the time frame begins.
 * @apiParam {Date} dateTo					Date at which the time frame ends.
 *
 * @apiSuccess {Measurement[]} measurements	Array of Measurement information.
 *
 * @apiUse SuccessExample_List_Measurements
 * @apiUse ServerError
 */
exports.request = function(req, res) {
	var dateFrom = req.params.dateFrom;
	var dateTo   = req.params.dateTo;

	var startDate, endDate;

	if (dateFrom.toUpperCase().charAt(0) == 'P') {
		startDate = moment(dateTo).subtract(moment.duration(dateFrom)).toISOString();
		endDate = moment(dateTo).toISOString();
	} else if (dateTo.toUpperCase().charAt(0) == 'P') {
		startDate = moment(dateFrom).toISOString();
		endDate = moment(dateFrom).add(moment.duration(dateTo)).toISOString();
	} else {
		startDate = moment(dateFrom).toISOString();
		endDate = moment(dateTo).toISOString();
	}

	Measurement.find({ date: { $gte: startDate, $lte: endDate } }, function(err, measurements) {
		if (err) {
			res.send(err);
		} else {
			res.json(measurements);
		}
	});
}