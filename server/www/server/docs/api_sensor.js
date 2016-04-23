// --------------------------------------------------
// Sensor
// --------------------------------------------------

/**
 * @api {get} /thing/:thingId/sensor/:sensorId GET - Request single Sensor information
 * @apiName GetSensor
 * @apiGroup Sensor
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} thingId		Thing's unique ID.
 * @apiParam {Number} sensorId 		Sensor's unique ID.
 *
 * @apiSuccess {String} description	Description of the Sensor.
 * @apiSuccess {Number} featureId	Feature's unique ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       'description': 'Wersehaus',
 *       'featureId': 1
 *     }
 *
 * @apiUse ThingNotFoundError
 * @apiUse SensorNotFoundError
 * @apiUse ServerError
 */

/**
 * @api {post} /thing/:thingId/sensor POST - Create a Sensor
 * @apiName PostSensor
 * @apiGroup Sensor
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} thingId		Thing's unique ID.
 * @apiParam {String} description	Description of the Sensor.
 * @apiParam {Number} featureId		Feature's unique ID.
 *
 * @apiSuccess {Number} id 			Sensor's unique ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       'id': 1
 *     }
 *
 * @apiUse ThingNotFoundError
 * @apiUse FeatureNotFoundError
 * @apiUse ServerError
 */