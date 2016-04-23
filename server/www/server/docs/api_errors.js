// --------------------------------------------------
// Errors
// --------------------------------------------------

/**
 * @apiDefine ThingNotFoundError
 * @apiError (404) ThingNotFound The <code>id</code> of the Thing was not found.
 *
 * @apiErrorExample {json} ThingNotFound:
 *     HTTP/1.1 404 Not Found
 *     {
 *       'error': 'ThingNotFound'
 *     }
 */

/**
 * @apiDefine SensorNotFoundError
 * @apiError (404) SensorNotFound The <code>id</code> of the Sensor was not found.
 *
 * @apiErrorExample {json} SensorNotFound:
 *     HTTP/1.1 404 Not Found
 *     {
 *       'error': 'SensorNotFound'
 *     }
 */

/**
 * @apiDefine MeasurementNotFoundError
 * @apiError (404) MeasurementNotFound The <code>id</code> of the Measurement was not found.
 *
 * @apiErrorExample {json} MeasurementNotFound:
 *     HTTP/1.1 404 Not Found
 *     {
 *       'error': 'MeasurementNotFound'
 *     }
 */

/**
 * @apiDefine FeatureNotFoundError
 * @apiError (404) FeatureNotFound The <code>id</code> of the Feature was not found.
 *
 * @apiErrorExample {json} FeatureNotFound:
 *     HTTP/1.1 404 Not Found
 *     {
 *       'error': 'FeatureNotFound'
 *     }
 */

/**
 * @apiDefine ServerError
 * @apiError (500) ServerError An internal server error occured.
 *
 * @apiErrorExample {json} ServerError:
 *     HTTP/1.1 500 Server Error
 *     {
 *       'error': 'ServerError'
 *     }
 */