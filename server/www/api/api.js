// --------------------------------------------------
// Errors
// --------------------------------------------------

/**
 * @apiDefine SensorNotFoundError
 * @apiError (404) SensorNotFound The <code>id</code> of the Sensor was not found.
 *
 * @apiErrorExample {json} SensorNotFound:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "SensorNotFound"
 *     }
 */

/**
 * @apiDefine MeasurementNotFoundError
 * @apiError (404) MeasurementNotFound The <code>id</code> of the Measurement was not found.
 *
 * @apiErrorExample {json} MeasurementNotFound:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "MeasurementNotFound"
 *     }
 */

/**
 * @apiDefine FeatureNotFoundError
 * @apiError (404) FeatureNotFound The <code>id</code> of the Feature was not found.
 *
 * @apiErrorExample {json} FeatureNotFound:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "FeatureNotFound"
 *     }
 */

/**
 * @apiDefine ServerError
 * @apiError (500) ServerError An internal server error occured.
 *
 * @apiErrorExample {json} ServerError:
 *     HTTP/1.1 500 Server Error
 *     {
 *       "error": "ServerError"
 *     }
 */

// --------------------------------------------------
// Requests
// --------------------------------------------------

/**
 * @api {get} /sensor/:id GET - Request single Sensor information
 * @apiName GetSensor
 * @apiGroup Sensor
 *
 * @apiParam {Number} id 			Sensor's unique ID.
 *
 * @apiSuccess {String} description	Description of the Sensor.
 * @apiSuccess {LatLng} location	Location of the Sensor.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "description": "Wersehaus",
 *       "location": "51.973331,7.700220"
 *     }
 *
 * @apiUse SensorNotFoundError
 */

/**
 * @api {post} /sensor POST - Create a Sensor
 * @apiName PostSensor
 * @apiGroup Sensor
 *
 * @apiParam {String} description	Description of the Sensor.
 * @apiParam {LatLng} location		Location of the Sensor.
 *
 * @apiSuccess {Number} id 			Sensor's unique ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1
 *     }
 *
 * @apiUse ServerError
 */

/**
 * @api {get} /sensor/:id/measurements GET - Request all Measurements of a single Sensor
 * @apiName GetSensorMeasurements
 * @apiGroup Sensor
 *
 * @apiParam {Number} id 					Sensor's unique ID.
 *
 * @apiSuccess {Collection} measurements	Measurements of the Sensor.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "measurements": "[
 *      {
 *        'measurementId': 1,
 *        {
 *          'date': '2016-04-19 13:25:39',
 *          'properties': [
 *            {
 *              'featureId': 1,
 *              'value': 17
 *            },
 *            {
 *              'featureId': 2,
 *              'value': 0.5
 *            }
 *          ]
 *        }
 *      },
 *      {
 *        'measurementId': 2,
 *        {
 *          'date': '2016-04-19 14:25:39',
 *          'properties': [
 *            {
 *              'featureId': 1,
 *              'value': 15
 *            },
 *            {
 *              'featureId': 2,
 *              'value': 0.7
 *            }
 *          ]
 *        }
 *      }
 *     }
 *
 * @apiUse SensorNotFoundError
 */

/**
 * @api {get} /measurement/:id GET - Request single Measurement information
 * @apiName GetMeasurement
 * @apiGroup Measurement
 *
 * @apiParam {Number} id 				Measurement's unique ID.
 *
 * @apiSuccess {Date} date				Date of the Measurement.
 * @apiSuccess {Collection} properties	Properties of the Measurement.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "date": "2016-04-19 13:25:39",
 *       "properties": [
 *         {
 *           'featureId': 1,
 *           'value': 17
 *         },
 *         {
 *           'featureId': 2,
 *           'value': 0.5
 *         }
 *       ]
 *     }
 *
 * @apiUse MeasurementNotFoundError
 */

/**
 * @api {post} /sensor/:id/measurement POST - Create a Measurement
 * @apiName PostMeasurement
 * @apiGroup Measurement
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
 *       "id": 1
 *     }
 *
 * @apiUse SensorNotFoundError
 * @apiUse FeatureNotFoundError
 * @apiUse ServerError
 */

/**
 * @api {get} /feature/:id GET - Request single Feature information
 * @apiName GetFeature
 * @apiGroup Feature
 *
 * @apiParam {Number} id 			Feature's unique ID.
 *
 * @apiSuccess {String} description	Description of the Feature.
 * @apiSuccess {String} unit		Unit of the Feature.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "description": "water level",
 *       "unit": "dm"
 *     }
 *
 * @apiUse FeatureNotFoundError
 * @apiUse ServerError
 */

/**
 * @api {post} /feature POST - Create a Feature
 * @apiName PostFeature
 * @apiGroup Feature
 *
 * @apiParam {String} description	Description of the Feature.
 * @apiParam {String} unit			Unit of the Feature.
 *
 * @apiSuccess {Number} id			Feature's unique ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1
 *     }
 *
 * @apiUse ServerError
 */