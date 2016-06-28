// --------------------------------------------------
// REST API - Success Examples
// --------------------------------------------------

/**
 * @apiDefine SuccessExample_Deleted
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "ok": 1
 *     }
 */

/**
 * @apiDefine SuccessExample_Get_Features
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "<< generated MongoDB ID >>",
 *       "name": "Water Level",
 *       "unit": "m"
 *     }
 */

/**
 * @apiDefine SuccessExample_List_Features
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "_id": "<< generated MongoDB ID >>",
 *         "name": "Temperature",
 *         "unit": "K"
 *       },
 *       {
 *         "_id": "<< generated MongoDB ID >>",
 *         "name": "Water Level",
 *         "unit": "m"
 *       }
 *     ]
 */

/**
 * @apiDefine SuccessExample_Get_Measurements
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "<< generated MongoDB ID >>",
 *       "date": "2016-04-24T16:56:45.000Z",
 *       "value": 7,
 *       "sensorId": "<< generated MongoDB ID >>"
 *     }
 */

/**
 * @apiDefine SuccessExample_List_Measurements
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "_id": "<< generated MongoDB ID >>",
 *         "date": "2016-04-23T22:54:00.000Z",
 *         "value": 7,
 *         "sensorId": "<< generated MongoDB ID >>"
 *       },
 *       {
 *         "_id": "<< generated MongoDB ID >>",
 *         "date": "2016-04-23T22:55:00.000Z",
 *         "value": 7.5,
 *         "sensorId": "<< generated MongoDB ID >>"
 *       }
 *     ]
 */

/**
 * @apiDefine SuccessExample_Get_Sensors
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "<< generated MongoDB ID >>",
 *       "name": "Water Gauge",
 *       "interval": 30000,
 *       "refLevel": 3,
 *       "warnLevel": 8,
 *       "riskLevel": 10,
 *       "thingId": "<< generated MongoDB ID >>",
 *       "featureId": "<< generated MongoDB ID >>"
 *     }
 */

/**
 * @apiDefine SuccessExample_List_Sensors
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "_id": "<< generated MongoDB ID >>",
 *         "name": "water gauge",
 *         "interval": 30000,
 *         "refLevel": 3,
 *         "warnLevel": 8,
 *         "riskLevel": 10,
 *         "thingId": "<< generated MongoDB ID >>",
 *         "featureId": "<< generated MongoDB ID >>"
 *       },
 *       {
 *         "_id": "<< generated MongoDB ID >>",
 *         "name": "water gauge",
 *         "interval": 5000,
 *         "refLevel": 1,
 *         "warnLevel": 12,
 *         "riskLevel": 17,
 *         "thingId": "<< generated MongoDB ID >>",
 *         "featureId": "<< generated MongoDB ID >>"
 *       }
 *     ]
 */

/**
 * @apiDefine SuccessExample_Get_Things
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "<< generated MongoDB ID >>",
 *       "name": "ifgi",
 *       "userId": "<< generated MongoDB ID >>",
 *       "waterbodyId": "<< generatedMongoDB ID >>",
 *       "loc": {
 *         "coordinates": [
 *           51.969114,
 *           7.595794
 *         ],
 *         "type": "Point"
 *       }
 *     }
 */

/**
 * @apiDefine SuccessExample_List_Things
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "_id": "<< generated MongoDB ID >>",
 *         "name": "ifgi",
 *         "userId": "<< generated MongoDB ID >>",
 *         "waterbodyId": "<< generatedMongoDB ID >>",
 *         "loc": {
 *           "coordinates": [
 *             51.969114,
 *             7.595794
 *           ],
 *           "type": "Point"
 *         }
 *       },
 *       {
 *         "_id": "<< generated MongoDB ID >>",
 *         "name": "Wersehaus",
 *         "userId": "<< generated MongoDB ID >>",
 *         "waterbodyId": "<< generatedMongoDB ID >>",
 *         "loc": {
 *           "coordinates": [
 *             51.97338,
 *             7.700234
 *           ],
 *           "type": "Point"
 *         }
 *       }
 *     ]
 */

/**
 * @apiDefine SuccessExample_Get_Users
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "<< generated MongoDB ID >>",
 *       "email": "demo@example.com",
 *       "twitter": {
 *         "twitterConsumerKey": "<< generated Twitter consumer key >>",
 *         "twitterConsumerSecret": "<< generated Twitter consumer secret >>",
 *         "twitterAccessTokenKey": "<< generated Twitter access token key >>",
 *         "twitteraccessTokenSecret": "<< generated Twitter access token secret >>"
 *       }
 *     }
 */

/**
 * @apiDefine SuccessExample_List_Users
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "_id": "<< generated MongoDB ID >>"
 *         "email": "demo@example.com",
 *         "twitter": {
 *           "twitterConsumerKey": "<< generated Twitter consumer key >>",
 *           "twitterConsumerSecret": "<< generated Twitter consumer secret >>",
 *           "twitterAccessTokenKey": "<< generated Twitter access token key >>",
 *           "twitteraccessTokenSecret": "<< generated Twitter access token secret >>"
 *         }
 *       },
 *       {
 *         "_id": "<< generated MongoDB ID >>",
 *         "email": "user@example.com"
 *       }
 *     ]
 */

/**
 * @apiDefine SuccessExample_Get_Waterbodies
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "<< generated MongoDB ID >>",
 *       "type": "Feature",
 *       "geometry": {
 *         "type": "MultiLineString",
 *         "coordinates": [
 *           << Array of LineStrings >>
 *         ]
 *       },
 *       "properties": {
 *         "name": "Werse"
 *       }
 *     }
 */

/**
 * @apiDefine SuccessExample_List_Waterbodies
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "_id": "<< generated MongoDB ID >>",
 *         "type": "Feature",
 *         "geometry": {
 *           "type": "MultiLineString",
 *           "coordinates": [
 *             << Array of LineStrings >>
 *           ]
 *         },
 *         "properties": {
 *           "name": "Werse"
 *         }
 *       },
 *       {
 *         "_id": "<< generated MongoDB ID >>",
 *         "type": "Feature",
 *         "geometry": {
 *           "type": "MultiLineString",
 *           "coordinates": [
 *             << Array of LineStrings >>
 *           ]
 *         },
 *         "properties": {
 *           "name": "Rhein"
 *         }
 *       },
 *     ]
 */

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
 * @apiDefine TokenNotFoundError
 * @apiError (403) TokenNotFoundError The <code>userToken</code> for the API request was not found.
 *
 * @apiErrorExample {json} ServerError:
 *     HTTP/1.1 403 Authorization Error
 *     {
 *       "error": "TokenNotFoundError"
 *     }
 */

/**
 * @apiDefine InvalidTokenError
 * @apiError (403) InvalidTokenError The <code>userToken</code> for the API request was invalid.
 *
 * @apiErrorExample {json} ServerError:
 *     HTTP/1.1 403 Authorization Error
 *     {
 *       "error": "InvalidTokenError"
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