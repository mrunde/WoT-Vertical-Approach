// --------------------------------------------------
// REST API - Errors
// --------------------------------------------------

/**
 * @apiDefine ThingNotFoundError
 * @apiError (404) ThingNotFound The <code>thingId</code> of the Thing was not found.
 *
 * @apiErrorExample {json} ThingNotFound:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ThingNotFound"
 *     }
 */

/**
 * @apiDefine SensorNotFoundError
 * @apiError (404) SensorNotFound The <code>sensorId</code> of the Sensor was not found.
 *
 * @apiErrorExample {json} SensorNotFound:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "SensorNotFound"
 *     }
 */

/**
 * @apiDefine MeasurementNotFoundError
 * @apiError (404) MeasurementNotFound The <code>measurementId</code> of the Measurement was not found.
 *
 * @apiErrorExample {json} MeasurementNotFound:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "MeasurementNotFound"
 *     }
 */

/**
 * @apiDefine UserNotFoundError
 * @apiError (404) UserNotFound The <code>userId</code> of the User was not found.
 *
 * @apiErrorExample {json} UserNotFound:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */

/**
 * @apiDefine FeatureNotFoundError
 * @apiError (404) FeatureNotFound The <code>featureId</code> of the Feature was not found.
 *
 * @apiErrorExample {json} FeatureNotFound:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "FeatureNotFound"
 *     }
 */

/**
 * @apiDefine WaterbodyNotFoundError
 * @apiError (404) WaterbodyNotFound The <code>waterbodyId</code> of the Waterbody was not found.
 *
 * @apiErrorExample {json} WaterbodyNotFound:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "WaterbodyNotFound"
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