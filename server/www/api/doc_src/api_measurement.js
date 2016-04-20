// --------------------------------------------------
// Measurement
// --------------------------------------------------

/**
 * @api {get} /thing/:thingId/measurements GET - Request all Measurements of a single Thing
 * @apiName GetThingMeasurements
 * @apiGroup Measurement
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} thingId			Thing's unique ID.
 *
 * @apiSuccess {Array} measurements		Measurements of the Thing.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         'sensorId': 1,
 *         'measurements': [
 *           {
 *             'measurementId': 1,
 *             'date': '2016-04-19 13:25:39',
 *             'value': 17
 *           },
 *           {
 *             'measurementId': 2,
 *             'date': '2016-04-19 14:25:39',
 *             'value': 15
 *           }
 *         ]
 *       },
 *       {
 *         'sensorId': 2,
 *         'measurements': [
 *           {
 *             'measurementId': 3,
 *             'date': '2016-04-19 13:25:39',
 *             'value': 0.5
 *           },
 *           {
 *             'measurementId': 4,
 *             'date': '2016-04-19 13:30:39',
 *             'value': 0.7
 *           }
 *         ]
 *       }
 *     ]
 *
 * @apiUse ThingNotFoundError
 * @apiUse ServerError
 */

/**
 * @api {get} /thing/:thingId/sensor/:sensorId/measurements GET - Request all Measurements of a single Sensor
 * @apiName GetSensorMeasurements
 * @apiGroup Measurement
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} thingId			Thing's unique ID.
 * @apiParam {Number} sensorId 			Sensor's unique ID.
 *
 * @apiSuccess {Array} measurements		Measurements of the Sensor.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         'measurementId': 1,
 *         'date': '2016-04-19 13:25:39',
 *         'value': 17
 *       },
 *       {
 *         'measurementId': 2,
 *         'date': '2016-04-19 14:25:39',
 *         'value': 15
 *       }
 *     ]
 *
 * @apiUse ThingNotFoundError
 * @apiUse SensorNotFoundError
 * @apiUse ServerError
 */

/**
 * @api {get} /measurement/:id GET - Request single Measurement information
 * @apiName GetMeasurement
 * @apiGroup Measurement
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id 				Measurement's unique ID.
 *
 * @apiSuccess {Date} date				Date of the Measurement.
 * @apiSuccess {Collection} properties	Properties of the Measurement.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       'date': '2016-04-19 13:25:39',
 *       'value': 17
 *     }
 *
 * @apiUse MeasurementNotFoundError
 * @apiUse ServerError
 */

/**
 * @api {post} /sensor/:id/measurement POST - Create a Measurement
 * @apiName PostMeasurement
 * @apiGroup Measurement
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id 				Sensor's unique ID.
 * @apiParam {Date} date				Date of the Measurement.
 * @apiParam {Collection} properties	Properties of the Measurement.
 *
 * @apiSuccess {Number} id				Measurement's unique ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       'id': 1
 *     }
 *
 * @apiUse SensorNotFoundError
 * @apiUse FeatureNotFoundError
 * @apiUse ServerError
 */