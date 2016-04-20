// --------------------------------------------------
// Thing
// --------------------------------------------------

/**
 * @api {get} /thing/:id GET - Request single Thing information
 * @apiName GetThing
 * @apiGroup Thing
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id 			Thing's unique ID.
 *
 * @apiSuccess {String} description	Description of the Thing.
 * @apiSuccess {LatLng} location	Location of the Thing.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       'description': 'Wersehaus',
 *       'location': '51.973331,7.700220'
 *     }
 *
 * @apiUse ThingNotFoundError
 * @apiUse ServerError
 */

/**
 * @api {post} /thing POST - Create a Thing
 * @apiName PostThing
 * @apiGroup Thing
 * @apiVersion 1.0.0
 *
 * @apiParam {String} description	Description of the Thing.
 * @apiParam {LatLng} location		Location of the Thing.
 *
 * @apiSuccess {Number} id 			Thing's unique ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       'id': 1
 *     }
 *
 * @apiUse ServerError
 */