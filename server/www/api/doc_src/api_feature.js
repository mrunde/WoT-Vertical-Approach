// --------------------------------------------------
// Feature
// --------------------------------------------------

/**
 * @api {get} /feature/:id GET - Request single Feature information
 * @apiName GetFeature
 * @apiGroup Feature
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id 			Feature's unique ID.
 *
 * @apiSuccess {String} description	Description of the Feature.
 * @apiSuccess {String} unit		Unit of the Feature.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       'description': 'water level',
 *       'unit': 'dm'
 *     }
 *
 * @apiUse FeatureNotFoundError
 * @apiUse ServerError
 */

/**
 * @api {post} /feature POST - Create a Feature
 * @apiName PostFeature
 * @apiGroup Feature
 * @apiVersion 1.0.0
 *
 * @apiParam {String} description	Description of the Feature.
 * @apiParam {String} unit			Unit of the Feature.
 *
 * @apiSuccess {Number} id			Feature's unique ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       'id': 1
 *     }
 *
 * @apiUse ServerError
 */