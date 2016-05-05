define({ "api": [
  {
    "type": "delete",
    "url": "/features/:featureId",
    "title": "DELETE - Delete a Feature",
    "name": "DeleteFeature",
    "group": "Feature",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "featureId",
            "description": "<p>Feature's unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"ok\": 1,\n  \"n\": 0\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/controllers/features/delete.js",
    "groupTitle": "Feature",
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "FeatureNotFound",
            "description": "<p>The <code>featureId</code> of the Feature was not found.</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An internal server error occured.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "FeatureNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"FeatureNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Server Error\n{\n  \"error\": \"ServerError\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/features/:id",
    "title": "GET - Request single Feature information",
    "name": "GetFeature",
    "group": "Feature",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "featureId",
            "description": "<p>Feature's unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the Feature.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "unit",
            "description": "<p>Unit of the Feature.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"_id\": \"<< generated MongoDB ID >>\",\n  \"description\": \"Temperature\",\n  \"unit\": \"°C\",\n  \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/controllers/features/get.js",
    "groupTitle": "Feature",
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "FeatureNotFound",
            "description": "<p>The <code>featureId</code> of the Feature was not found.</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An internal server error occured.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "FeatureNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"FeatureNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Server Error\n{\n  \"error\": \"ServerError\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/features",
    "title": "GET - Request all Feature information",
    "name": "ListFeature",
    "group": "Feature",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "features",
            "description": "<p>Array of Feature information.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"_id\": \"<< generated MongoDB ID >>\",\n    \"description\": \"Temperature\",\n    \"unit\": \"°C\",\n    \"__v\": 0\n  },\n  {\n    \"_id\": \"<< generated MongoDB ID >>\",\n    \"description\": \"Water Level\",\n    \"unit\": \"m\",\n    \"__v\": 0\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "server/controllers/features/list.js",
    "groupTitle": "Feature",
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An internal server error occured.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Server Error\n{\n  \"error\": \"ServerError\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/feature",
    "title": "POST - Create a Feature",
    "name": "PostFeature",
    "group": "Feature",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the Feature.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "unit",
            "description": "<p>Unit of the Feature.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "featureId",
            "description": "<p>Feature's unique ID.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"__v\": 0,\n  \"description\": \"Water Level\",\n  \"unit\": \"m\",\n  \"_id\": \"571ce8a799d9232813f01666\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/controllers/features/post.js",
    "groupTitle": "Feature",
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An internal server error occured.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Server Error\n{\n  \"error\": \"ServerError\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/measurements/:measurementId",
    "title": "DELETE - Delete a Measurement",
    "name": "DeleteMeasurement",
    "group": "Measurement",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "measurementId",
            "description": "<p>Measurement's unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"ok\": 1,\n  \"n\": 0\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/controllers/measurements/delete.js",
    "groupTitle": "Measurement",
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "MeasurementNotFound",
            "description": "<p>The <code>measurementId</code> of the Measurement was not found.</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An internal server error occured.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "MeasurementNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"MeasurementNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Server Error\n{\n  \"error\": \"ServerError\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/measurements/:measurementId",
    "title": "GET - Request single Measurement information",
    "name": "GetMeasurement",
    "group": "Measurement",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "measurementId",
            "description": "<p>Measurement's unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Date of the Measurement.</p>"
          },
          {
            "group": "Success 200",
            "type": "Collection",
            "optional": false,
            "field": "properties",
            "description": "<p>Properties of the Measurement.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sensorId",
            "description": "<p>Sensor's unique ID.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"_id\": \"<< generated MongoDB ID >>\",\n  \"date\": \"2016-04-24T16:56:45.000Z\",\n  \"value\": 7,\n  \"sensorId\": \"<< generated MongoDB ID >>\",\n  \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/controllers/measurements/get.js",
    "groupTitle": "Measurement",
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "MeasurementNotFound",
            "description": "<p>The <code>measurementId</code> of the Measurement was not found.</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An internal server error occured.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "MeasurementNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"MeasurementNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Server Error\n{\n  \"error\": \"ServerError\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/measurements",
    "title": "GET - Request all Measurement information",
    "name": "ListMeasurement",
    "group": "Measurement",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "measurements",
            "description": "<p>Array of Measurement information.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"_id\": \"<< generated MongoDB ID >>\",\n    \"date\": \"2016-04-23T22:54:00.000Z\",\n    \"value\": 7,\n    \"sensorId\": \"<< generated MongoDB ID >>\",\n    \"__v\": 0\n  },\n  {\n    \"_id\": \"<< generated MongoDB ID >>\",\n    \"date\": \"2016-04-23T22:55:00.000Z\",\n    \"value\": 7.5,\n    \"sensorId\": \"<< generated MongoDB ID >>\",\n    \"__v\": 0\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "server/controllers/measurements/list.js",
    "groupTitle": "Measurement",
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "MeasurementNotFound",
            "description": "<p>The <code>measurementId</code> of the Measurement was not found.</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An internal server error occured.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "MeasurementNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"MeasurementNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Server Error\n{\n  \"error\": \"ServerError\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/measurements/spatial/:bbox",
    "title": "GET - Request all Measurement information within one bounding box",
    "name": "ListSpatialMeasurement",
    "group": "Measurement",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bbox",
            "description": "<p>Bounding box information.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "things",
            "description": "<p>Array of Measurement information.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"date\": \"2016-04-23T22:54:00.000Z\",\n    \"value\": 7,\n    \"sensorId\": \"<< generated MongoDB ID >>\",\n    \"_id\": \"<< generated MongoDB ID >>\",\n    \"__v\": 0\n  },\n  {\n    \"date\": \"2016-05-03T15:46:55.000Z\",\n    \"value\": 15,\n    \"sensorId\": \"<< generated MongoDB ID >>\",\n    \"_id\": \"<< generated MongoDB ID >>\",\n    \"__v\": 0\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "server/controllers/measurements/listSpatial.js",
    "groupTitle": "Measurement",
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An internal server error occured.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Server Error\n{\n  \"error\": \"ServerError\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/measurements",
    "title": "POST - Create a Measurement",
    "name": "PostMeasurement",
    "group": "Measurement",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sensorId",
            "description": "<p>Sensor's unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Date of the Measurement.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "value",
            "description": "<p>Value of the Measurement.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "measurementId",
            "description": "<p>Measurement's unique ID.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"__v\": 0,\n  \"date\": \"2016-04-23T22:54:00.000Z\",\n  \"value\": 7,\n  \"sensorId\": \"<< generated MongoDB ID >>\",\n  \"_id\": \"<< generated MongoDB ID >>\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/controllers/measurements/post.js",
    "groupTitle": "Measurement",
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "SensorNotFound",
            "description": "<p>The <code>sensorId</code> of the Sensor was not found.</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An internal server error occured.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SensorNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"SensorNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Server Error\n{\n  \"error\": \"ServerError\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/sensors/:sensorId",
    "title": "DELETE - Delete a Sensor",
    "name": "DeleteSensor",
    "group": "Sensor",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sensorId",
            "description": "<p>Sensor's unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"ok\": 1,\n  \"n\": 0\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/controllers/sensors/delete.js",
    "groupTitle": "Sensor",
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "SensorNotFound",
            "description": "<p>The <code>sensorId</code> of the Sensor was not found.</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An internal server error occured.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SensorNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"SensorNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Server Error\n{\n  \"error\": \"ServerError\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/sensors/:sensorId",
    "title": "GET - Request single Sensor information",
    "name": "GetSensor",
    "group": "Sensor",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sensorId",
            "description": "<p>Sensor's unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the Sensor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thingId",
            "description": "<p>Thing's unique ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "featureId",
            "description": "<p>Feature's unique ID.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"_id\": \"<< generated MongoDB ID >>\",\n  \"description\": \"Water Gauge\",\n  \"thingId\": \"<< generated MongoDB ID >>\",\n  \"featureId\": \"<< generated MongoDB ID >>\",\n  \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/controllers/sensors/get.js",
    "groupTitle": "Sensor",
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "SensorNotFound",
            "description": "<p>The <code>sensorId</code> of the Sensor was not found.</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An internal server error occured.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SensorNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"SensorNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Server Error\n{\n  \"error\": \"ServerError\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/sensors",
    "title": "GET - Request all Sensor information",
    "name": "ListSensor",
    "group": "Sensor",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "sensors",
            "description": "<p>Array of Sensor information.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"_id\": \"<< generated MongoDB ID >>\",\n    \"description\": \"water gauge\",\n    \"thingId\": \"<< generated MongoDB ID >>\",\n    \"featureId\": \"<< generated MongoDB ID >>\",\n    \"__v\": 0\n  },\n  {\n    \"_id\": \"<< generated MongoDB ID >>\",\n    \"description\": \"water gauge\",\n    \"thingId\": \"<< generated MongoDB ID >>\",\n    \"featureId\": \"<< generated MongoDB ID >>\",\n    \"__v\": 0\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "server/controllers/sensors/list.js",
    "groupTitle": "Sensor",
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An internal server error occured.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Server Error\n{\n  \"error\": \"ServerError\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/sensors/:sensorId/measurements",
    "title": "GET - Request all Sensor's measurements",
    "name": "ListSensorMeasurements",
    "group": "Sensor",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sensorId",
            "description": "<p>Sensor's unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "measurements",
            "description": "<p>Array of Measurement information.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"_id\": \"<< generated MongoDB ID >>\",\n    \"date\": \"2016-04-23T22:54:00.000Z\",\n    \"value\": 7,\n    \"sensorId\": \"<< generated MongoDB ID >>\",\n    \"__v\": 0\n  },\n  {\n    \"_id\": \"<< generated MongoDB ID >>\",\n    \"date\": \"2016-04-23T22:55:00.000Z\",\n    \"value\": 7.5,\n    \"sensorId\": \"<< generated MongoDB ID >>\",\n    \"__v\": 0\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "server/controllers/sensors/listMeasurements.js",
    "groupTitle": "Sensor",
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "SensorNotFound",
            "description": "<p>The <code>sensorId</code> of the Sensor was not found.</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An internal server error occured.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "SensorNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"SensorNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Server Error\n{\n  \"error\": \"ServerError\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/sensors/spatial/:bbox",
    "title": "GET - Request all Sensor information within one bounding box",
    "name": "ListSpatialSensor",
    "group": "Sensor",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bbox",
            "description": "<p>Bounding box information.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "things",
            "description": "<p>Array of Sensor information.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"description\": \"water gauge\",\n    \"thingId\": \"<< generated MongoDB ID >>\",\n    \"featureId\": \"<< generated MongoDB ID >>\",\n    \"_id\": \"<< generated MongoDB ID >>\",\n    \"__v\": 0\n  },\n  {\n    \"description\": \"water gauge\",\n    \"thingId\": \"<< generated MongoDB ID >>\",\n    \"featureId\": \"<< generated MongoDB ID >>\",\n    \"_id\": \"<< generated MongoDB ID >>\",\n    \"__v\": 0\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "server/controllers/sensors/listSpatial.js",
    "groupTitle": "Sensor",
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An internal server error occured.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Server Error\n{\n  \"error\": \"ServerError\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/sensors",
    "title": "POST - Create a Sensor",
    "name": "PostSensor",
    "group": "Sensor",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the Sensor.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "thingId",
            "description": "<p>Thing's unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "featureId",
            "description": "<p>Feature's unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sensorId",
            "description": "<p>Sensor's unique ID.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"__v\": 0,\n  \"description\": \"Water Gauge\",\n  \"thingId\": \"<< generated MongoDB ID >>\",\n  \"featureId\": \"<< generated MongoDB ID >>\",\n  \"_id\": \"<< generated MongoDB ID >>\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/controllers/sensors/post.js",
    "groupTitle": "Sensor",
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "ThingNotFound",
            "description": "<p>The <code>thingId</code> of the Thing was not found.</p>"
          },
          {
            "group": "404",
            "optional": false,
            "field": "FeatureNotFound",
            "description": "<p>The <code>featureId</code> of the Feature was not found.</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An internal server error occured.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "ThingNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"ThingNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "FeatureNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"FeatureNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Server Error\n{\n  \"error\": \"ServerError\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/things/:thingId",
    "title": "DELETE - Delete a Thing",
    "name": "DeleteThing",
    "group": "Thing",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "thingId",
            "description": "<p>Thing's unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"ok\": 1,\n  \"n\": 0\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/controllers/things/delete.js",
    "groupTitle": "Thing",
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "ThingNotFound",
            "description": "<p>The <code>thingId</code> of the Thing was not found.</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An internal server error occured.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "ThingNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"ThingNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Server Error\n{\n  \"error\": \"ServerError\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/things/:thingId/nearest",
    "title": "GET - Request nearest other single Thing information",
    "name": "GetNearestThing",
    "group": "Thing",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "thingId",
            "description": "<p>Thing's unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the Thing.</p>"
          },
          {
            "group": "Success 200",
            "type": "Point",
            "optional": false,
            "field": "location",
            "description": "<p>Location of the Thing.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"__v\": 0,\n  \"description\": \"ifgi\",\n  \"location\": [\n    51.969113,\n    7.595793\n  ],\n  \"_id\": \"<< generated MongoDB ID >>\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/controllers/things/getNearest.js",
    "groupTitle": "Thing",
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "ThingNotFound",
            "description": "<p>The <code>thingId</code> of the Thing was not found.</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An internal server error occured.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "ThingNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"ThingNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Server Error\n{\n  \"error\": \"ServerError\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/things/:thingId",
    "title": "GET - Request single Thing information",
    "name": "GetThing",
    "group": "Thing",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "thingId",
            "description": "<p>Thing's unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the Thing.</p>"
          },
          {
            "group": "Success 200",
            "type": "Point",
            "optional": false,
            "field": "location",
            "description": "<p>Location of the Thing.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"__v\": 0,\n  \"description\": \"ifgi\",\n  \"location\": [\n    51.969113,\n    7.595793\n  ],\n  \"_id\": \"<< generated MongoDB ID >>\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/controllers/things/get.js",
    "groupTitle": "Thing",
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "ThingNotFound",
            "description": "<p>The <code>thingId</code> of the Thing was not found.</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An internal server error occured.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "ThingNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"ThingNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Server Error\n{\n  \"error\": \"ServerError\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/things/spatial/:bbox",
    "title": "GET - Request all Thing information within one bounding box",
    "name": "ListSpatialThing",
    "group": "Thing",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bbox",
            "description": "<p>Bounding box information.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "things",
            "description": "<p>Array of Thing information.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"description\": \"REST API Test\",\n    \"location\": [\n      52,\n      7\n    ],\n    \"_id\": \"<< generated MongoDB ID >>\",\n    \"__v\": 0\n  },\n  {\n    \"description\": \"ifgi\",\n    \"location\": [\n      51.969113,\n      7.595793\n    ],\n    \"_id\": \"<< generated MongoDB ID >>\",\n    \"__v\": 0\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "server/controllers/things/listSpatial.js",
    "groupTitle": "Thing",
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An internal server error occured.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Server Error\n{\n  \"error\": \"ServerError\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/things",
    "title": "GET - Request all Thing information",
    "name": "ListThing",
    "group": "Thing",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "things",
            "description": "<p>Array of Thing information.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"description\": \"REST API Test\",\n    \"location\": [\n      52,\n      7\n    ],\n    \"_id\": \"<< generated MongoDB ID >>\",\n    \"__v\": 0\n  },\n  {\n    \"description\": \"ifgi\",\n    \"location\": [\n      51.969113,\n      7.595793\n    ],\n    \"_id\": \"<< generated MongoDB ID >>\",\n    \"__v\": 0\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "server/controllers/things/list.js",
    "groupTitle": "Thing",
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An internal server error occured.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Server Error\n{\n  \"error\": \"ServerError\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/things/:thingId/measurements",
    "title": "GET - Request all Thing's measurements",
    "name": "ListThingMeasurements",
    "group": "Thing",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "thingId",
            "description": "<p>Thing's unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Measurements",
            "description": "<p>Array of Measurements.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"_id\": \"<< generated MongoDB ID >>\",\n    \"sensorId\": \"<< generated MongoDB ID >>\",\n    \"date\": \"2016-04-24T16:56:45.000Z\",\n    \"value\": 7,\n    \"__v\": 0\n  },\n  {\n    \"_id\": \"<< generated MongoDB ID >>\",\n    \"sensorId\": \"<< generated MongoDB ID >>\",\n    \"date\": \"2016-04-24T16:59:45.000Z\",\n    \"value\": 8,\n    \"__v\": 0\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "server/controllers/things/listMeasurements.js",
    "groupTitle": "Thing",
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "ThingNotFound",
            "description": "<p>The <code>thingId</code> of the Thing was not found.</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An internal server error occured.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "ThingNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"ThingNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Server Error\n{\n  \"error\": \"ServerError\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/things/:thingId/sensors",
    "title": "GET - Request all Thing's sensors",
    "name": "ListThingSensors",
    "group": "Thing",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "thingId",
            "description": "<p>Thing's unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "sensors",
            "description": "<p>Array of Sensor information.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"_id\": \"<< generated MongoDB ID >>\",\n    \"description\": \"water gauge\",\n    \"thingId\": \"<< generated MongoDB ID >>\",\n    \"featureId\": \"<< generated MongoDB ID >>\",\n    \"__v\": 0\n  },\n  {\n    \"_id\": \"<< generated MongoDB ID >>\",\n    \"description\": \"water gauge\",\n    \"thingId\": \"<< generated MongoDB ID >>\",\n    \"featureId\": \"<< generated MongoDB ID >>\",\n    \"__v\": 0\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "server/controllers/things/listSensors.js",
    "groupTitle": "Thing",
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "ThingNotFound",
            "description": "<p>The <code>thingId</code> of the Thing was not found.</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An internal server error occured.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "ThingNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"ThingNotFound\"\n}",
          "type": "json"
        },
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Server Error\n{\n  \"error\": \"ServerError\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/things",
    "title": "POST - Create a Thing",
    "name": "PostThing",
    "group": "Thing",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the Thing.</p>"
          },
          {
            "group": "Parameter",
            "type": "Point",
            "optional": false,
            "field": "location",
            "description": "<p>Location of the Thing.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thingId",
            "description": "<p>Thing's unique ID.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"__v\": 0,\n  \"description\": \"ifgi\",\n  \"location\": [\n    51.969113,\n    7.595793\n  ],\n  \"_id\": \"<< generated MongoDB ID >>\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "server/controllers/things/post.js",
    "groupTitle": "Thing",
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An internal server error occured.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "ServerError:",
          "content": "HTTP/1.1 500 Server Error\n{\n  \"error\": \"ServerError\"\n}",
          "type": "json"
        }
      ]
    }
  }
] });